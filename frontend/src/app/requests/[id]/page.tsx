'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Request, Asset, Account } from '@/types';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<Request | null>(null);
  const [availableAssets, setAvailableAssets] = useState<Asset[]>([]);
  const [availableAccounts, setAvailableAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  useEffect(() => {
    if (params.id) {
      loadRequest();
      loadAvailableResources();
    }
  }, [params.id]);

  const loadRequest = async () => {
    try {
      const data = await api.requests.getById(params.id as string);
      setRequest(data);
    } catch (error) {
      console.error('Failed to load request:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableResources = async () => {
    try {
      const [assets, accounts] = await Promise.all([
        api.assets.getAvailable(),
        api.accounts.getAvailable(),
      ]);
      setAvailableAssets(assets);
      setAvailableAccounts(accounts);
    } catch (error) {
      console.error('Failed to load available resources:', error);
    }
  };

  const handleAssignAsset = async () => {
    if (!selectedAsset) return;

    try {
      await api.assignments.create({
        requestId: params.id as string,
        assetId: selectedAsset,
        assignedBy: 'MIS',
      });
      setSelectedAsset('');
      loadRequest();
      loadAvailableResources();
    } catch (error) {
      console.error('Failed to assign asset:', error);
      alert('指派資產失敗');
    }
  };

  const handleAssignAccount = async () => {
    if (!selectedAccount) return;

    try {
      await api.assignments.create({
        requestId: params.id as string,
        accountId: selectedAccount,
        assignedBy: 'MIS',
      });
      setSelectedAccount('');
      loadRequest();
      loadAvailableResources();
    } catch (error) {
      console.error('Failed to assign account:', error);
      alert('指派賬號失敗');
    }
  };

  const handleUpdateStatus = async (status: string) => {
    try {
      await api.requests.update(params.id as string, { status });
      loadRequest();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('更新狀態失敗');
    }
  };

  const handleRemoveAssignment = async (assignmentId: string) => {
    try {
      await api.assignments.delete(assignmentId);
      loadRequest();
      loadAvailableResources();
    } catch (error) {
      console.error('Failed to remove assignment:', error);
      alert('移除指派失敗');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'READY': return 'bg-green-100 text-green-800';
      case 'DELIVERED': return 'bg-purple-100 text-purple-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">載入中...</div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">請求不存在</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
          >
            ← 返回列表
          </button>
          <h1 className="text-3xl font-bold text-gray-900">請求詳情</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">員工姓名</label>
                <div className="mt-1 text-sm text-gray-900">{request.employeeName}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">部門</label>
                <div className="mt-1 text-sm text-gray-900">{request.department}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">職位</label>
                <div className="mt-1 text-sm text-gray-900">{request.jobRole}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">狀態</label>
                <div className="mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">申請日期</label>
                <div className="mt-1 text-sm text-gray-900">
                  {new Date(request.requestDate).toLocaleDateString('zh-TW')}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">更新狀態</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateStatus('PROCESSING')}
                  className="px-3 py-1 border border-blue-500 rounded-md text-sm text-blue-600 hover:bg-blue-50"
                >
                  處理中
                </button>
                <button
                  onClick={() => handleUpdateStatus('READY')}
                  className="px-3 py-1 border border-green-500 rounded-md text-sm text-green-600 hover:bg-green-50"
                >
                  已就緒
                </button>
                <button
                  onClick={() => handleUpdateStatus('DELIVERED')}
                  className="px-3 py-1 border border-purple-500 rounded-md text-sm text-purple-600 hover:bg-purple-50"
                >
                  已交付
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">指派資產</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">選擇資產</label>
                  <select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  >
                    <option value="">請選擇資產</option>
                    {availableAssets.map((asset) => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetTag} - {asset.category} ({asset.model})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleAssignAsset}
                  disabled={!selectedAsset}
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  指派資產
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">指派賬號</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">選擇賬號</label>
                  <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  >
                    <option value="">請選擇賬號</option>
                    {availableAccounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.serviceName} - {account.accountId}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleAssignAccount}
                  disabled={!selectedAccount}
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  指派賬號
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">已指派資源</h2>
          {request.assignments && request.assignments.length > 0 ? (
            <div className="space-y-4">
              {request.assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    {assignment.asset && (
                      <div className="text-sm">
                        <span className="font-medium">資產:</span> {assignment.asset.assetTag} - {assignment.asset.category}
                      </div>
                    )}
                    {assignment.account && (
                      <div className="text-sm">
                        <span className="font-medium">賬號:</span> {assignment.account.serviceName} - {assignment.account.accountId}
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      指派時間: {new Date(assignment.assignedAt).toLocaleString('zh-TW')}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveAssignment(assignment.id)}
                    className="px-3 py-1 border border-red-500 rounded-md text-sm text-red-600 hover:bg-red-50"
                  >
                    移除
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">尚未指派任何資源</div>
          )}
        </div>
      </div>
    </div>
  );
}
