import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        projetos: {
          include: {
            servicosVendidos: true,
          },
        },
      },
    });

    if (!cliente) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ data: cliente });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar cliente' }, { status: 500 });
  }
}