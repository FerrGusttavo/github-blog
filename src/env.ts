import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  GITHUB_TOKEN: z.string(),
});

const env = envSchema.safeParse({
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

if (!env.success) {
  console.error("Invalid environment variables", env.error.format());
  throw new Error("Invalid environment variables");
}

export const { GITHUB_TOKEN } = env.data;
