import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

/**
 *
 * @param userPassword "password that user send it"
 * @param encryptedPassword password that save in database
 * @returns boolean
 */
async function comparePassword(userPassword, encryptedPassword) {
  const isValidPassword = await compare(userPassword, encryptedPassword);

  return isValidPassword;
}

async function createToken(payload) {
  const token = await sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
}

export { comparePassword, createToken };
