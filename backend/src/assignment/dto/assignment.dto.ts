export class CreateAssignmentDto {
  requestId: string;
  assetId?: string;
  accountId?: string;
  assignedBy: string;
}

export class UpdateAssignmentDto {
  assetId?: string;
  accountId?: string;
}

export class AssignmentResponseDto {
  id: string;
  requestId: string;
  assetId: string | null;
  accountId: string | null;
  assignedAt: Date;
  assignedBy: string;
}
