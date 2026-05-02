import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // ✅ 修正方法 1：直接呼叫 super()，使用預設配置
    super(); 
    
    // 或者 ✅ 修正方法 2：傳入有效選項 (例如開啟查詢日誌方便除錯)
    // super({
    //   log: ['query', 'info', 'warn', 'error'],
    // });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
