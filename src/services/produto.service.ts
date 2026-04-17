import prisma from '@/lib/db';
import type { CreateProdutoInput, UpdateProdutoInput } from '@/types/produto.types';
import { parseProduto } from '@/schemas/produto.schema';

function toJson(val: string[] | string | undefined): string {
  if (!val) return '[]';
  if (Array.isArray(val)) return JSON.stringify(val);
  return val;
}

export class ProdutoService {
  async findAll() {
    const raw = await prisma.produto.findMany({
      where: { isActive: true },
      orderBy: { productName: 'asc' },
    });
    return raw.map((p) => parseProduto(p as Record<string, unknown>));
  }

  async findById(id: string) {
    const raw = await prisma.produto.findUnique({ where: { id } });
    return raw ? parseProduto(raw as Record<string, unknown>) : null;
  }

  async findByKey(productKey: string) {
    const raw = await prisma.produto.findUnique({ where: { productKey } });
    return raw ? parseProduto(raw as Record<string, unknown>) : null;
  }

  async create(data: CreateProdutoInput) {
    const raw = await prisma.produto.create({
      data: {
        productKey: data.productKey,
        productName: data.productName,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        idealFor: toJson(data.idealFor),
        mainPainsSolved: toJson(data.mainPainsSolved),
        deliverablesJson: toJson(data.deliverablesJson),
        differentialsJson: toJson(data.differentialsJson),
        priorityRulesJson: toJson(data.priorityRulesJson),
      },
    });
    return parseProduto(raw as Record<string, unknown>);
  }

  async update(id: string, data: UpdateProdutoInput) {
    const raw = await prisma.produto.update({
      where: { id },
      data: {
        productKey: data.productKey,
        productName: data.productName,
        shortDescription: data.shortDescription,
        fullDescription: data.fullDescription,
        idealFor: toJson(data.idealFor),
        mainPainsSolved: toJson(data.mainPainsSolved),
        deliverablesJson: toJson(data.deliverablesJson),
        differentialsJson: toJson(data.differentialsJson),
        priorityRulesJson: toJson(data.priorityRulesJson),
        isActive: data.isActive,
      },
    });
    return parseProduto(raw as Record<string, unknown>);
  }

  async delete(id: string) {
    return prisma.produto.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async listAll() {
    const raw = await prisma.produto.findMany({
      orderBy: { productName: 'asc' },
    });
    return raw.map((p) => parseProduto(p as Record<string, unknown>));
  }
}

export const produtoService = new ProdutoService();
