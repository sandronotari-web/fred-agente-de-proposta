import { NextResponse } from 'next/server';
import { projetoService } from '@/services/projeto.service';
import { clienteSchema, projetoSchema } from '@/schemas/projeto.schema';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const projetos = await projetoService.findAll({ status: status as import('@/types').ProjetoStatus | undefined, search, limit, offset });
    return NextResponse.json({ data: projetos });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar projetos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const clienteData = clienteSchema.parse({
      nome: body.nome,
      empresa: body.empresa,
      email: body.email,
      telefone: body.telefone,
    });
    
    const existingCliente = await prisma.cliente.findUnique({
      where: { email: clienteData.email },
    });
    
    let cliente;
    if (existingCliente) {
      cliente = existingCliente;
    } else {
      cliente = await prisma.cliente.create({ data: clienteData });
    }
    
    const projeto = await projetoService.create({
      clienteId: cliente.id,
      nomeProjeto: body.nomeProjeto,
    });
    
    return NextResponse.json({ data: projeto }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}