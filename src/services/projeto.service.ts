import prisma from '@/lib/db';
import type { CreateProjetoInput, UpdateProjetoInput, ListProjetosQuery } from '@/types/projeto.types';
import { slugify } from '@/lib/utils';

export class ProjetoService {
  async findAll(query?: ListProjetosQuery) {
    const where: Record<string, unknown> = {};
    
    if (query?.status) {
      where.status = query.status;
    }
    
    if (query?.search) {
      where.OR = [
        { nomeProjeto: { contains: query.search } },
        { cliente: { empresa: { contains: query.search } } },
      ];
    }
    
    return prisma.projeto.findMany({
      where,
      include: {
        cliente: true,
        servicosVendidos: true,
      },
      orderBy: { createdAt: 'desc' },
      take: query?.limit || 50,
      skip: query?.offset || 0,
    });
  }
  
  async findById(id: string) {
    return prisma.projeto.findUnique({
      where: { id },
      include: {
        cliente: true,
        servicosVendidos: true,
      },
    });
  }
  
  async findBySlug(slug: string) {
    return prisma.projeto.findUnique({
      where: { slug },
      include: {
        cliente: true,
        servicosVendidos: true,
      },
    });
  }
  
  async create(data: CreateProjetoInput) {
    const slug = slugify(data.nomeProjeto);
    
    const existingSlug = await prisma.projeto.findUnique({ where: { slug } });
    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;
    
    return prisma.projeto.create({
      data: {
        slug: finalSlug,
        clienteId: data.clienteId,
        nomeProjeto: data.nomeProjeto,
        status: 'intake',
      },
      include: {
        cliente: true,
      },
    });
  }
  
  async update(id: string, data: UpdateProjetoInput) {
    const servicosVendidos = data.servicosVendidos?.map(s => ({
      produtoId: s.produtoId,
      nome: s.nome,
      escopo: s.escopo,
    }));
    
    return prisma.projeto.update({
      where: { id },
      data: {
        nomeProjeto: data.nomeProjeto,
        transcricao: data.transcricao,
        observacoes: data.observacoes,
        diagnosticoJson: data.diagnostico ? JSON.stringify(data.diagnostico) : undefined,
        lrpConteudoJson: data.lrpConteudo ? JSON.stringify(data.lrpConteudo) : undefined,
        status: data.status,
      },
      include: {
        cliente: true,
        servicosVendidos: true,
      },
    });
  }
  
  async updateServicos(projetoId: string, servicos: { produtoId: string; nome: string; escopo: string }[]) {
    await prisma.servicoVendido.deleteMany({ where: { projetoId } });
    
    if (servicos.length > 0) {
      await prisma.servicoVendido.createMany({
        data: servicos.map(s => ({
          projetoId,
          produtoId: s.produtoId,
          nome: s.nome,
          escopo: s.escopo,
        })),
      });
    }
    
    return this.findById(projetoId);
  }
  
  async completeIntake(
    projetoId: string,
    data: {
      transcricao: string;
      servicos: { produtoId: string; nome: string; escopo: string }[];
      observacoes?: string;
      diagnostico?: unknown;
    }
  ) {
    await prisma.$transaction(async (tx) => {
      await tx.projeto.update({
        where: { id: projetoId },
        data: {
          transcricao: data.transcricao,
          observacoes: data.observacoes || null,
          diagnosticoJson: data.diagnostico ? JSON.stringify(data.diagnostico) : null,
          status: data.diagnostico ? 'analise' : 'intake',
        },
      });
      
      await tx.servicoVendido.deleteMany({ where: { projetoId } });
      
      if (data.servicos.length > 0) {
        await tx.servicoVendido.createMany({
          data: data.servicos.map(s => ({
            projetoId,
            produtoId: s.produtoId,
            nome: s.nome,
            escopo: s.escopo,
          })),
        });
      }
    });
    
    return this.findById(projetoId);
  }
  
  async delete(id: string) {
    return prisma.projeto.delete({ where: { id } });
  }
  
  async count() {
    return prisma.projeto.count();
  }
  
  async getStats() {
    const [total, draft, intake, analise, revisao, publicado] = await Promise.all([
      this.count(),
      prisma.projeto.count({ where: { status: 'draft' } }),
      prisma.projeto.count({ where: { status: 'intake' } }),
      prisma.projeto.count({ where: { status: 'analise' } }),
      prisma.projeto.count({ where: { status: 'revisao' } }),
      prisma.projeto.count({ where: { status: 'publicado' } }),
    ]);
    
    return { total, draft, intake, analise, revisao, publicado };
  }
}

export const projetoService = new ProjetoService();