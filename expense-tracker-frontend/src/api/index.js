// Income API
export async function getIncomes(token) {
  const res = await fetch(`${API_BASE}/incomes`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch incomes');
  return res.json();
}

export async function createIncome(token, { amount, source, date }) {
  const res = await fetch(`${API_BASE}/incomes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount, source, date })
  });
  if (!res.ok) throw new Error('Failed to create income');
  return res.json();
}

export async function updateIncome(token, id, { amount, source, date }) {
  const res = await fetch(`${API_BASE}/incomes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount, source, date })
  });
  if (!res.ok) throw new Error('Failed to update income');
  return res.json();
}

export async function deleteIncome(token, id) {
  const res = await fetch(`${API_BASE}/incomes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete income');
  return true;
}
export async function getExpenses(token) {
  const res = await fetch(`${API_BASE}/expenses`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}


export async function createExpense(token, { name, amount, date, categoryId }) {
  const res = await fetch(`${API_BASE}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      amount,
      description: name,  
      date,
      categoryId: Number(categoryId)
    })
  });
  if (!res.ok) throw new Error('Failed to create expense');
  return res.json();
}


export async function updateExpense(token, id, { name, amount, date, categoryId }) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      amount,
      description: name, 
      date,
      categoryId: Number(categoryId)
    })
  });
  if (!res.ok) throw new Error('Failed to update expense');
  return res.json();
}

export async function deleteExpense(token, id) {
  const res = await fetch(`${API_BASE}/expenses/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete expense');
  return true;
}

export async function getExpenseSummary(token) {
  const res = await fetch(`${API_BASE}/expenses/summary`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch expense summary');
  return res.json();
}

export async function getExpenseTrends(token) {
  const res = await fetch(`${API_BASE}/expenses/trends`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch expense trends');
  return res.json();
}
const API_BASE = 'http://localhost:5000/api';

export async function loginUser({ username, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function registerUser({ name, username, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, username, password })
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function updateProfile(token, { username, password }) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}


// Category API
export async function getCategories(token) {
  const res = await fetch(`${API_BASE}/categories`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createCategory(token, { name, budget }) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, budget })
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function updateCategory(token, id, { name, budget }) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name, budget })
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function deleteCategory(token, id) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return true;
}
