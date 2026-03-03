import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDto) {
    return this.prisma.project.create({ data });
  }

  // Busca pública: Traz apenas projetos com isVisible = true
  findAllPublic() {
    return this.prisma.project.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' }, // Mais recentes primeiro
    });
  }

  // Busca Admin: Traz TODOS os projetos
  findAllAdmin() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Projeto não encontrado.');
    return project;
  }

  async update(id: string, data: UpdateProjectDto) {
    await this.findOne(id); // Verifica se existe antes de atualizar
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica se existe antes de deletar
    return this.prisma.project.delete({
      where: { id },
    });
  }
}