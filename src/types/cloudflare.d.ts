export interface CloudflareEnv {
  DB: D1Database;
  ANTHROPIC_API_KEY: string;
  AI_MODEL?: string;
}

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    ANTHROPIC_API_KEY: string;
    AI_MODEL?: string;
  }
}
