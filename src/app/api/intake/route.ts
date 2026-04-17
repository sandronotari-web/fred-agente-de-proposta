import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      nome,
      empresa,
      email,
      telefone,
      nomeProjeto,
      transcricao,
      servicos,
      observacoes,
    } = body;

    let cliente = await prisma.cliente.findUnique({ where: { email } });
    
    if (!cliente) {
      cliente = await prisma.cliente.create({
        data: { nome, empresa, email, telefone },
      });
    }

    const slug = slugify(nomeProjeto || empresa);
    const projeto = await prisma.projeto.create({
      data: {
        slug,
        clienteId: cliente.id,
        nomeProjeto: nomeProjeto || empresa,
        transcricao,
        observacoes,
        status: 'analise',
      },
    });

    if (servicos?.length > 0) {
      await prisma.servicoVendido.createMany({
        data: servicos.map((s: { produtoId: string; nome: string; escopo: string }) => ({
          projetoId: projeto.id,
          produtoId: s.produtoId,
          nome: s.nome,
          escopo: s.escopo,
        })),
      });
    }

    return NextResponse.json({ data: projeto }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}