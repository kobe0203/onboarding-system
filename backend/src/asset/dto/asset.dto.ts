export class CreateAssetDto {
  assetTag: string;
  category: string;
  model: string;
}

export class UpdateAssetDto {
  assetTag?: string;
  category?: string;
  model?: string;
  status?: string;
  currentUserId?: string;
}

export class AssetResponseDto {
  id: string;
  assetTag: string;
  category: string;
  model: string;
  status: string;
  currentUserId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
