import { AccountStatus } from '@prisma/client';

export class CreateAccountDto {
  serviceName: string;
  accountId: string;
  initialPassword: string;
}

export class UpdateAccountDto {
  serviceName?: string;
  accountId?: string;
  initialPassword?: string;
  status?: AccountStatus;
}

export class AccountResponseDto {
  id: string;
  serviceName: string;
  accountId: string;
  initialPassword: string;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}
