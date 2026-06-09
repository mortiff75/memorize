import * as jose from "jose";

const encodeJwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyToken(token) {
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
