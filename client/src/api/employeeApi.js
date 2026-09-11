const BASE_URL = 'http://localhost:4000/employees';

async function getEmployees() {
  const res = await fetch(BASE_URL);
  return res.json();
}

async function getEmployee(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}

async function createEmployee(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function updateEmployee(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function deleteEmployee(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
}

export { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };
