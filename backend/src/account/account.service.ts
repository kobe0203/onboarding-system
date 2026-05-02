import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      return await this.prisma.account.create({
        data: {
          ...createAccountDto,
          status: 'AVAILABLE',
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Account ID already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.account.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAvailable() {
    return this.prisma.account.findMany({
      where: {
        status: 'AVAILABLE',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    await this.findOne(id);
    return this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.account.delete({
      where: { id },
    });
  }
}
