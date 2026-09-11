const store = require('../data/employees.store');

const REQUIRED_FIELDS = ['name', 'role', 'email'];

function validate(data) {
  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length > 0) {
    return `Missing required field(s): ${missing.join(', ')}`;
  }
  return null;
}

function listEmployees() {
  return store.getAll();
}

function getEmployee(id) {
  return store.getById(id);
}

function createEmployee(data) {
  const error = validate(data);
  if (error) {
    return { error };
  }
  const employee = store.create({
    name: data.name,
    role: data.role,
    email: data.email,
  });
  return { employee };
}

function updateEmployee(id, data) {
  const existing = store.getById(id);
  if (!existing) {
    return { notFound: true };
  }
  const error = validate({ ...existing, ...data });
  if (error) {
    return { error };
  }
  const employee = store.update(id, data);
  return { employee };
}

function deleteEmployee(id) {
  return store.remove(id);
}

module.exports = {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
