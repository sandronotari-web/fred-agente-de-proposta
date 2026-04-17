import prisma from '@/lib/db';
import { meetingAnalysisService, type FullDiagnosis } from './meeting-analysis.service';

export class DiagnosisService {
  async generateForProjeto(projetoId: string): Promise<FullDiagnosis> {
    const projeto = await prisma.projeto.findUnique({
      where: { id: projetoId },
      include: {
        cliente: true,
        servicosVendidos: true,
      },
    });

    if (!projeto) {
      throw new Error('Projeto não encontrado');
    }

    if (!projeto.transcricao) {
      throw new Error('Transcrição não disponível');
    }

    const servicos = projeto.servicosVendidos.map(s => s.nome);

    const diagnosis = await meetingAnalysisService.analyzeMeeting({
      transcricao: projeto.transcricao,
      servicos,
    });

    await prisma.projeto.update({
      where: { id: projetoId },
      data: {
        diagnosticoJson: JSON.stringify(diagnosis),
        status: 'analise',
      },
    });

    return diagnosis;
  }

  async getByProjeto(projetoId: string): Promise<FullDiagnosis | null> {
    const projeto = await prisma.projeto.findUnique({
      where: { id: projetoId },
    });

    if (!projeto?.diagnosticoJson) {
      return null;
    }

    return JSON.parse(projeto.diagnosticoJson) as FullDiagnosis;
  }

  async update(projetoId: string, diagnosis: Partial<FullDiagnosis>): Promise<FullDiagnosis> {
    const existing = await this.getByProjeto(projetoId);
    const updated = { ...existing, ...diagnosis };

    await prisma.projeto.update({
      where: { id: projetoId },
      data: {
        diagnosticoJson: JSON.stringify(updated),
      },
    });

    return updated as FullDiagnosis;
  }
}

export const diagnosisService = new DiagnosisService();