import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto/assignment.dto';
import { RequestStatus, AssetStatus, AccountStatus } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const { requestId, assetId, accountId, assignedBy } = createAssignmentDto;

    if (!assetId && !accountId) {
      throw new BadRequestException('Either assetId or accountId must be provided');
    }

    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException(`Request with ID ${requestId} not found`);
    }

    if (assetId) {
      const asset = await this.prisma.asset.findUnique({
        where: { id: assetId },
      });

      if (!asset) {
        throw new NotFoundException(`Asset with ID ${assetId} not found`);
      }

      if (asset.status !== 'IN_STOCK') {
        throw new BadRequestException('Asset is not available');
      }

      await this.prisma.$transaction(async (tx) => {
        await tx.asset.update({
          where: { id: assetId },
          data: { status: 'IN_USE', currentUserId: request.employeeName },
        });

        await tx.resourceAssignment.create({
          data: {
            requestId,
            assetId,
            assignedBy,
          },
        });
      });
    }

    if (accountId) {
      const account = await this.prisma.account.findUnique({
        where: { id: accountId },
      });

      if (!account) {
        throw new NotFoundException(`Account with ID ${accountId} not found`);
      }

      if (account.status !== 'AVAILABLE') {
        throw new BadRequestException('Account is not available');
      }

      await this.prisma.$transaction(async (tx) => {
        await tx.account.update({
          where: { id: accountId },
          data: { status: 'ASSIGNED' },
        });

        await tx.resourceAssignment.create({
          data: {
            requestId,
            accountId,
            assignedBy,
          },
        });
      });
    }

    return this.prisma.request.findUnique({
      where: { id: requestId },
      include: {
        assignments: {
          include: {
            asset: true,
            account: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.resourceAssignment.findMany({
      include: {
        request: true,
        asset: true,
        account: true,
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });
  }

  async findByRequest(requestId: string) {
    return this.prisma.resourceAssignment.findMany({
      where: { requestId },
      include: {
        asset: true,
        account: true,
      },
      orderBy: {
        assignedAt: 'desc',
      },
    });
  }

  async remove(id: string) {
    const assignment = await this.prisma.resourceAssignment.findUnique({
      where: { id },
      include: {
        asset: true,
        account: true,
      },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }

    await this.prisma.$transaction(async (tx) => {
      if (assignment.assetId) {
        await tx.asset.update({
          where: { id: assignment.assetId },
          data: { status: 'IN_STOCK', currentUserId: null },
        });
      }

      if (assignment.accountId) {
        await tx.account.update({
          where: { id: assignment.accountId },
          data: { status: 'AVAILABLE' },
        });
      }

      await tx.resourceAssignment.delete({
        where: { id },
      });
    });

    return { message: 'Assignment removed successfully' };
  }
}
