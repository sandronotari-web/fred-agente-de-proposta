import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projetoId } = body;

    if (!projetoId) {
      return NextResponse.json({ error: 'Projeto ID é obrigatório' }, { status: 400 });
    }

    const projeto = await prisma.projeto.findUnique({
      where: { id: projetoId },
      include: {
        cliente: true,
        servicosVendidos: true,
      },
    });

    if (!projeto) {
      return NextResponse.json({ error: 'Projeto não encontrado' }, { status: 404 });
    }

    const diagnostico = projeto.diagnosticoJson
      ? JSON.parse(projeto.diagnosticoJson)
      : null;

    const lrpConteudo = {
      hero: {
        titulo: `Proposta para ${projeto.cliente?.empresa}`,
        subtitulo: 'Proposta customizada',
      },
      contexto: projeto.transcricao || '',
      pontosObservados: diagnostico?.sintomas || [],
      prioridades: [],
      escopoContratado: projeto.servicosVendidos.map(s => ({
        produtoId: s.produtoId,
        nome: s.nome,
        escopo: s.escopo,
      })),
      explicacaoServicos: projeto.servicosVendidos.map(s => ({
        nome: s.nome,
        descricao: s.escopo,
        beneficios: [],
      })),
      cronograma: [],
      materiaisNecessarios: diagnostico?.materiaisNecessarios || [],
      proximosPassos: diagnostico?.proximosPassos || [],
      dataGeracao: new Date(),
    };

    await prisma.projeto.update({
      where: { id: projetoId },
      data: {
        lrpConteudoJson: JSON.stringify(lrpConteudo),
        status: 'revisao',
      },
    });

    return NextResponse.json({ 
      data: { 
        conteudo: lrpConteudo, 
        slug: projeto.slug 
      } 
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}