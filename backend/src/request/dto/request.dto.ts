import { RequestStatus } from '@prisma/client';

export class CreateRequestDto {
  employeeName: string;
  department: string;
  jobRole: string;
  createdBy: string;
}

export class UpdateRequestDto {
  employeeName?: string;
  department?: string;
  jobRole?: string;
  status?: RequestStatus;
}

export class RequestResponseDto {
  id: string;
  employeeName: string;
  department: string;
  jobRole: string;
  status: RequestStatus;
  requestDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
