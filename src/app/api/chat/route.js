import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages } = body; // Nhận toàn bộ lịch sử chat từ client

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `Bạn là Nova - Trợ lý ảo AI của thương hiệu NovaVision. 
Nhiệm vụ của bạn là tư vấn cho khách hàng về sản phẩm kính thực tế ảo NovaVision Pro.
Thông tin sản phẩm:
- Màn hình: Micro-OLED 4K kép siêu nét.
- Tính năng: Theo dõi mắt thông minh (điều khiển bằng ánh nhìn), Trợ lý AI tích hợp.
- Giá dự kiến: 499 USD.
- Khuyến mãi: Đăng ký đặt trước hôm nay giảm ngay 20% (chỉ còn 100 suất).
Quy tắc:
- Chỉ trả lời các câu hỏi liên quan đến NovaVision Pro hoặc kính thực tế ảo. Nếu người dùng hỏi chuyện khác, hãy khéo léo chuyển chủ đề về sản phẩm.
- Thái độ: Lịch sự, chuyên nghiệp, nhiệt tình, có dùng emoji hợp lý.
- Luôn cố gắng thuyết phục khách hàng kéo lên điền form đăng ký nhận ưu đãi.
- Trả lời ngắn gọn, súc tích (dưới 3 câu).`;

    // Chuyển đổi định dạng messages của client sang định dạng Gemini history
    // History của Gemini yêu cầu 'user' hoặc 'model'
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.isBot ? "model" : "user",
      parts: [{ text: msg.text }]
    }));

    const lastUserMessage = messages[messages.length - 1].text;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Vâng, tôi đã hiểu. Tôi sẽ đóng vai trợ lý Nova và tư vấn theo đúng yêu cầu." }] },
        ...history
      ]
    });

    const result = await chat.sendMessage(lastUserMessage);
    const responseText = result.response.text();

    return Response.json({ reply: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({ error: "Lỗi kết nối máy chủ AI" }, { status: 500 });
  }
}
