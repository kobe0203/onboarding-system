const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = {
  requests: {
    getAll: () => fetch(`${API_BASE_URL}/requests`).then(res => res.json()),
    getById: (id: string) => fetch(`${API_BASE_URL}/requests/${id}`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/requests/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
  },
  assets: {
    getAll: () => fetch(`${API_BASE_URL}/assets`).then(res => res.json()),
    getAvailable: () => fetch(`${API_BASE_URL}/assets/available`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/assets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
  },
  accounts: {
    getAll: () => fetch(`${API_BASE_URL}/accounts`).then(res => res.json()),
    getAvailable: () => fetch(`${API_BASE_URL}/accounts/available`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    update: (id: string, data: any) => fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
  },
  assignments: {
    getAll: () => fetch(`${API_BASE_URL}/assignments`).then(res => res.json()),
    getByRequest: (requestId: string) => fetch(`${API_BASE_URL}/assignments/request/${requestId}`).then(res => res.json()),
    create: (data: any) => fetch(`${API_BASE_URL}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(res => res.json()),
    delete: (id: string) => fetch(`${API_BASE_URL}/assignments/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()),
  },
};
