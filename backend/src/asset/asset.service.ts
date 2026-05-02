import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  async create(createAssetDto: CreateAssetDto) {
    try {
      return await this.prisma.asset.create({
        data: {
          ...createAssetDto,
          status: 'IN_STOCK',
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Asset tag already exists');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.asset.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAvailable() {
    return this.prisma.asset.findMany({
      where: {
        status: 'IN_STOCK',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }

    return asset;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    await this.findOne(id);
    return this.prisma.asset.update({
      where: { id },
      data: updateAssetDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
