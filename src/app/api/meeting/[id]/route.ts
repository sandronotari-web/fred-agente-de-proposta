import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projeto = await prisma.projeto.findUnique({
      where: { id },
      include: {
        cliente: true,
        servicosVendidos: true,
      },
    });

    if (!projeto) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        id: projeto.id,
        transcricao: projeto.transcricao,
        observacoes: projeto.observacoes,
        diagnostico: projeto.diagnosticoJson
          ? JSON.parse(projeto.diagnosticoJson)
          : null,
        cliente: projeto.cliente,
        servicos: projeto.servicosVendidos,
        createdAt: projeto.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar reunião' }, { status: 500 });
  }
}