import { PrismaClient } from '@prisma/client';

function createPrismaClient() {
  if (process.env.CF_PAGES === '1' || process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaD1 } = require('@prisma/adapter-d1');
    // D1Database is injected into globalThis by the Cloudflare Workers runtime
    const db = (globalThis as Record<string, unknown>).DB;
    const adapter = new PrismaD1(db);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new PrismaClient({ adapter } as any);
  }
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
