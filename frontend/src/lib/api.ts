// 在 Codespace 環境中，使用 API 代理
const API_BASE = '/api';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  return response.json();
}

export const api = {
  requests: {
    getAll: () => fetch(`${API_BASE}/requests`).then(handleResponse),
    getById: (id: string) => fetch(`${API_BASE}/requests/${id}`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE}/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE}/requests/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  assets: {
    getAll: () => fetch(`${API_BASE}/assets`).then(handleResponse),
    getAvailable: () => fetch(`${API_BASE}/assets/available`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE}/assets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE}/assets/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  accounts: {
    getAll: () => fetch(`${API_BASE}/accounts`).then(handleResponse),
    getAvailable: () => fetch(`${API_BASE}/accounts/available`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE}/accounts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE}/accounts/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  assignments: {
    getAll: () => fetch(`${API_BASE}/assignments`).then(handleResponse),
    getByRequest: (requestId: string) => fetch(`${API_BASE}/assignments/request/${requestId}`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE}/assignments/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
};
