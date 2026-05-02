export class CreateAccountDto {
  serviceName: string;
  accountId: string;
  initialPassword: string;
}

export class UpdateAccountDto {
  serviceName?: string;
  accountId?: string;
  initialPassword?: string;
  status?: string;
}

export class AccountResponseDto {
  id: string;
  serviceName: string;
  accountId: string;
  initialPassword: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
