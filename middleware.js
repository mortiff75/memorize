import { NextResponse } from "next/server";
import { verifyToken } from "./utils/auth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // ۱. مشخص میکنیم آیا کاربر در صفحات لاگین/رجیستر است یا خیر
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  const token = req.cookies.get("userId")?.value;

  // ۲. اگر توکن اصلاً وجود نداشت
  if (!token) {
    if (isAuthRoute) {
      // اگر توکن نداره و تو صفحه لاگینه، اجازه بده صفحه رو ببینه
      return NextResponse.next();
    }
    // اگر توکن نداره و میخواد بره صفحات خصوصی، بفرستش لاگین
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ۳. توکن وجود دارد، حالا آن را اعتبارسنجی می‌کنیم
  let isVerify = false;
  try {
    isVerify = await verifyToken(token);
  } catch (error) {
    isVerify = false;
  }

  // ۴. اگر توکن معتبر بود
  if (isVerify) {
    if (isAuthRoute) {
      // کاربر لاگین کرده عمداً میخواد بره صفحه لاگین -> هدایت به صفحه اصلی
      return NextResponse.redirect(new URL("/", req.url));
    }
    // میخواد بره صفحات خصوصی -> اجازه بده بره
    return NextResponse.next();
  }

  // ۵. اگر توکن وجود داشت اما نامعتبر یا منقضی بود
  if (!isVerify) {
    if (isAuthRoute) {
      return NextResponse.next();
    }

    // توکن خرابه، هدایتش کن به لاگین و توکن خراب رو هم پاک کن
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("userId");
    return response;
  }
}

export const config = {
  // 🚨 تغییر مهم: حتما باید صفحات لاگین و رجیستر رو اینجا اضافه کنید
  // نکته: استفاده از /memories/:path* باعث میشه تمام زیرمجموعه های این مسیر (مثل create) هم شامل بشن
  matcher: ["/", "/memories/:path*", "/login", "/register"],
};
