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
  status?: string;
}

export class RequestResponseDto {
  id: string;
  employeeName: string;
  department: string;
  jobRole: string;
  status: string;
  requestDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
