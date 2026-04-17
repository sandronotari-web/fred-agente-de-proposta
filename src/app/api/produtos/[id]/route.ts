import { NextResponse } from 'next/server';
import { produtoService } from '@/services/produto.service';
import { produtoSchema } from '@/schemas/produto.schema';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const produto = await produtoService.findById(id);
    
    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ data: produto });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = produtoSchema.parse(body);
    
    const produto = await produtoService.update(id, validatedData);
    return NextResponse.json({ data: produto });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await produtoService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    );
  }
}