# 新人入職資源管理系統

一個用於管理新員工入職資源分配的全棧應用程式，包括 HR 入職請求、MIS 資產管理和賬號配置。

## 技術棧

### 後端
- **NestJS** - Node.js 框架
- **Prisma** - ORM
- **SQLite** - 資料庫

### 前端
- **Next.js** - React 框架
- **Tailwind CSS** - CSS 框架
- **TypeScript** - 類型安全

## 功能特性

### P0 核心功能
- ✅ HR 創建入職請求
- ✅ 請求狀態看板
- ✅ MIS 資產管理（CRUD）
- ✅ MIS 賬號管理（CRUD）
- ✅ 資源指派（資產/賬號）
- ✅ 請求狀態更新

### 數據模型
- **Request** - 入職請求
- **Asset** - 硬體資產
- **Account** - 軟體賬號
- **ResourceAssignment** - 資源指派關係

## 快速開始

### 前置要求
- Node.js 18+
- npm 或 yarn

### 安裝步驟

#### 1. 克隆儲存庫
```bash
git clone https://github.com/kobe0203/onboarding-system.git
cd onboarding-system
```

#### 2. 安裝後端依賴
```bash
cd backend
npm install
```

#### 3. 設置資料庫
```bash
# 執行 Prisma 遷移
npx prisma migrate dev --name init

# 生成 Prisma Client
npx prisma generate
```

#### 4. 啟動後端服務
```bash
npm run start:dev
```

後端服務將運行在 `http://localhost:3000`

#### 5. 安裝前端依賴
```bash
cd frontend
npm install
```

#### 6. 啟動前端服務
```bash
npm run dev
```

前端服務將運行在 `http://localhost:3001`

## API 端點

### 請求管理
- `GET /requests` - 獲取所有請求
- `GET /requests/:id` - 獲取單個請求
- `POST /requests` - 創建請求
- `PATCH /requests/:id` - 更新請求
- `DELETE /requests/:id` - 刪除請求

### 資產管理
- `GET /assets` - 獲取所有資產
- `GET /assets/available` - 獲取可用資產
- `GET /assets/:id` - 獲取單個資產
- `POST /assets` - 創建資產
- `PATCH /assets/:id` - 更新資產
- `DELETE /assets/:id` - 刪除資產

### 賬號管理
- `GET /accounts` - 獲取所有賬號
- `GET /accounts/available` - 獲取可用賬號
- `GET /accounts/:id` - 獲取單個賬號
- `POST /accounts` - 創建賬號
- `PATCH /accounts/:id` - 更新賬號
- `DELETE /accounts/:id` - 刪除賬號

### 資源指派
- `GET /assignments` - 獲取所有指派
- `GET /assignments/request/:requestId` - 獲取請求的指派
- `POST /assignments` - 創建指派
- `DELETE /assignments/:id` - 刪除指派

## 頁面路由

- `/` - 主頁（請求列表）
- `/new-request` - 創建入職請求
- `/requests/:id` - 請求詳情（資源指派）
- `/assets` - 資產管理
- `/accounts` - 賬號管理

## 開發指南

### 添加新的 API 端點
1. 在 `backend/src` 中創建新的模組
2. 定義 DTO、Service 和 Controller
3. 在 `app.module.ts` 中註冊模組

### 添加新的前端頁面
1. 在 `frontend/src/app` 中創建新的路由目錄
2. 創建 `page.tsx` 文件
3. 使用 `api` 客戶端調用後端 API

## 部署

### 後端部署
```bash
cd backend
npm run build
npm run start:prod
```

### 前端部署
```bash
cd frontend
npm run build
npm run start
```

## 許可證

MIT

## 貢獻

歡迎提交 Issue 和 Pull Request！
