import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto, UpdateRequestDto } from './dto/request.dto';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async create(createRequestDto: CreateRequestDto) {
    return this.prisma.request.create({
      data: {
        ...createRequestDto,
        status: 'PENDING',
      },
    });
  }

  async findAll() {
    return this.prisma.request.findMany({
      include: {
        assignments: {
          include: {
            asset: true,
            account: true,
          },
        },
      },
      orderBy: {
        requestDate: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const request = await this.prisma.request.findUnique({
      where: { id },
      include: {
        assignments: {
          include: {
            asset: true,
            account: true,
          },
        },
      },
    });

    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }

    return request;
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    const existingRequest = await this.findOne(id);
    return this.prisma.request.update({
      where: { id },
      data: updateRequestDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.request.delete({
      where: { id },
    });
  }
}
