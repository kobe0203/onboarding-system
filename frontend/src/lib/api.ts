const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error: ${response.status} - ${error}`);
  }
  return response.json();
}

export const api = {
  requests: {
    getAll: () => fetch(`${API_BASE_URL}/requests`).then(handleResponse),
    getById: (id: string) => fetch(`${API_BASE_URL}/requests/${id}`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  assets: {
    getAll: () => fetch(`${API_BASE_URL}/assets`).then(handleResponse),
    getAvailable: () => fetch(`${API_BASE_URL}/assets/available`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  accounts: {
    getAll: () => fetch(`${API_BASE_URL}/accounts`).then(handleResponse),
    getAvailable: () => fetch(`${API_BASE_URL}/accounts/available`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
  assignments: {
    getAll: () => fetch(`${API_BASE_URL}/assignments`).then(handleResponse),
    getByRequest: (requestId: string) => fetch(`${API_BASE_URL}/assignments/request/${requestId}`).then(handleResponse),
    create: (data: any) => fetch(`${API_BASE_URL}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
    delete: (id: string) => fetch(`${API_BASE_URL}/assignments/${id}`, {
      method: 'DELETE',
    }).then(handleResponse),
  },
};
