import prisma from '@/lib/db';

export interface Deliverable {
  id: string;
  projetoId: string;
  nome: string;
  descricao?: string;
  status: 'pendente' | 'em_progresso' | 'entregue' | 'aprovado';
  arquivoUrl?: string;
  observacoes?: string;
  aprovadoEm?: Date;
  criadoEm: Date;
  atualizadoEm: Date;
}

export class DeliverableService {
  async findByProjeto(projetoId: string): Promise<Deliverable[]> {
    return prisma.$queryRaw`
      SELECT * FROM servicos_vendidos 
      WHERE projeto_id = ${projetoId}
      ORDER BY created_at DESC
    ` as Promise<Deliverable[]>;
  }

  async findById(id: string): Promise<Deliverable | null> {
    return prisma.$queryRaw`
      SELECT * FROM servicos_vendidos 
      WHERE id = ${id}
    ` as Promise<Deliverable | null>;
  }

  async approve(
    id: string,
    observacoes?: string
  ): Promise<{ success: boolean }> {
    await prisma.$executeRaw`
      UPDATE servicos_vendidos 
      SET status = 'aprovado', 
          aprovado_em = NOW(),
          observacoes = ${observacoes || null},
          updated_at = NOW()
      WHERE id = ${id}
    `;

    return { success: true };
  }

  async updateStatus(
    id: string,
    status: 'pendente' | 'em_progresso' | 'entregue'
  ): Promise<{ success: boolean }> {
    await prisma.$executeRaw`
      UPDATE servicos_vendidos 
      SET status = ${status},
          updated_at = NOW()
      WHERE id = ${id}
    `;

    return { success: true };
  }

  async addArquivo(id: string, arquivoUrl: string): Promise<{ success: boolean }> {
    await prisma.$executeRaw`
      UPDATE servicos_vendidos 
      SET arquivo_url = ${arquivoUrl},
          status = 'entregue',
          updated_at = NOW()
      WHERE id = ${id}
    `;

    return { success: true };
  }
}

export const deliverableService = new DeliverableService();