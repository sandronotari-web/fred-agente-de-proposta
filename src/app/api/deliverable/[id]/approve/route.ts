import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { observacoes } = body;

    await prisma.servicoVendido.update({
      where: { id },
      data: {
        escopo: observacoes,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao aprovar deliverable' }, { status: 500 });
  }
}