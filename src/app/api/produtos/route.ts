import { NextResponse } from 'next/server';
import { produtoService } from '@/services/produto.service';
import { produtoSchema } from '@/schemas/produto.schema';

export const runtime = 'edge';

export async function GET() {
  try {
    const produtos = await produtoService.findAll();
    return NextResponse.json({ data: produtos });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = produtoSchema.parse(body);
    
    const existing = await produtoService.findByKey(validatedData.productKey);
    if (existing) {
      return NextResponse.json(
        { error: 'Product key já existe' },
        { status: 400 }
      );
    }

    const produto = await produtoService.create(validatedData);
    return NextResponse.json({ data: produto }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}