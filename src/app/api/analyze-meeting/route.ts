import { NextResponse } from 'next/server';
import { meetingAnalysisService } from '@/services/meeting-analysis.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcricao, servicos } = body;

    if (!transcricao) {
      return NextResponse.json({ error: 'Transcrição é obrigatória' }, { status: 400 });
    }

    const analise = await meetingAnalysisService.analyzeMeeting({
      transcricao,
      servicos: servicos || [],
    });

    return NextResponse.json({ data: analise });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}