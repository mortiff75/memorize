import * as jose from "jose";

export async function verifyToken(token) {
  const encodeJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const {
      payload: { id },
    } = await jose.jwtVerify(token, encodeJwtSecret);

    if (!id) return false;

    return id;
  } catch (error) {
    return false;
  }
}
