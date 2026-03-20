import bcrypt from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 10;

// Simple, URL-safe random ID generator for share links
export async function hashValue(_value: string): Promise<string> {
  // We intentionally ignore the input and just generate a random ID
  return crypto.randomBytes(16).toString("hex"); // e.g. "a3f9c1..."
}

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
