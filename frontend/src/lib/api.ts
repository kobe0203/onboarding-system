const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// 在 Codespace 環境中，使用正確的 URL
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    // 在瀏覽器中，檢查是否在 Codespace 環境
    const hostname = window.location.hostname;
    if (hostname.includes('github.dev') || hostname.includes('app.github.dev')) {
      // 在 Codespace 中，使用相對路徑
      return '';
    }
  }
  return API_BASE_URL;
};

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  return response.json();
}

export const api = {
  requests: {
    getAll: () => fetch(`${getApiUrl()}/requests`).then(handleResponse),
    getById: (id: string) => fetch(`${getApiUrl()}/requests/${id}`).then(handleResponse),
    create: (data: any) => fetch(`${getApiUrl()}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${getApiUrl()}/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${getApiUrl()}/requests/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  assets: {
    getAll: () => fetch(`${getApiUrl()}/assets`).then(handleResponse),
    getAvailable: () => fetch(`${getApiUrl()}/assets/available`).then(handleResponse),
    create: (data: any) => fetch(`${getApiUrl()}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${getApiUrl()}/assets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${getApiUrl()}/assets/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  accounts: {
    getAll: () => fetch(`${getApiUrl()}/accounts`).then(handleResponse),
    getAvailable: () => fetch(`${getApiUrl()}/accounts/available`).then(handleResponse),
    create: (data: any) => fetch(`${getApiUrl()}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${getApiUrl()}/accounts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${getApiUrl()}/accounts/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  assignments: {
    getAll: () => fetch(`${getApiUrl()}/assignments`).then(handleResponse),
    getByRequest: (requestId: string) => fetch(`${getApiUrl()}/assignments/request/${requestId}`).then(handleResponse),
    create: (data: any) => fetch(`${getApiUrl()}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${getApiUrl()}/assignments/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
};
