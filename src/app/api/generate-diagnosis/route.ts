import { NextResponse } from 'next/server';
import { diagnosisService } from '@/services/diagnosis.service';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projetoId } = body;

    if (!projetoId) {
      return NextResponse.json({ error: 'Projeto ID é obrigatório' }, { status: 400 });
    }

    const diagnosis = await diagnosisService.generateForProjeto(projetoId);

    return NextResponse.json({ data: diagnosis });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}