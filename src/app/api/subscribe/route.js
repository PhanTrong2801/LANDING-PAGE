import { createClient } from '@vercel/kv';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: "Email không hợp lệ." }, { status: 400 });
    }

    const apiUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const apiToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!apiUrl || !apiToken) {
      console.warn("⚠️ Vercel KV / Upstash chưa được cấu hình. Giả lập đăng ký thành công.");
      return Response.json({ message: "Giả lập đăng ký thành công!" });
    }

    const db = createClient({ url: apiUrl, token: apiToken });

    // Thêm email vào tập hợp (Set) 'subscribers'. 
    const isAdded = await db.sadd('subscribers', email);

    if (isAdded === 0) {
      return Response.json({ error: "Email này đã được đăng ký trước đó." }, { status: 409 });
    }

    // Ghi lại mốc thời gian đăng ký (Tùy chọn)
    await db.hset(`user:${email}`, { 
      registeredAt: new Date().toISOString(),
      source: 'NovaVision Pre-order'
    });

    return Response.json({ message: "Đăng ký thành công!" });

  } catch (error) {
    console.error("Lỗi Database:", error);
    return Response.json({ error: "Lỗi hệ thống máy chủ." }, { status: 500 });
  }
}
