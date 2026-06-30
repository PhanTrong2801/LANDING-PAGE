import { kv } from '@vercel/kv';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: "Email không hợp lệ." }, { status: 400 });
    }

    // Nếu chưa cấu hình KV trên Vercel, giả lập thành công để không lỗi web
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.warn("⚠️ Vercel KV chưa được cấu hình. Giả lập đăng ký thành công.");
      return Response.json({ message: "Giả lập đăng ký thành công!" });
    }

    // Thêm email vào tập hợp (Set) 'subscribers'. 
    // Tập hợp (Set) sẽ tự động loại bỏ các email trùng lặp.
    const isAdded = await kv.sadd('subscribers', email);

    if (isAdded === 0) {
      // 0 nghĩa là email này đã tồn tại trong Set
      return Response.json({ error: "Email này đã được đăng ký trước đó." }, { status: 409 });
    }

    // Ghi lại mốc thời gian đăng ký (Tùy chọn)
    await kv.hset(`user:${email}`, { 
      registeredAt: new Date().toISOString(),
      source: 'NovaVision Pre-order'
    });

    return Response.json({ message: "Đăng ký thành công!" });

  } catch (error) {
    console.error("Lỗi Database:", error);
    return Response.json({ error: "Lỗi hệ thống máy chủ." }, { status: 500 });
  }
}
