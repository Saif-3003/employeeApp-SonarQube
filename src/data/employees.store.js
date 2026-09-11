let employees = [];
let nextId = 1;

function getAll() {
  return employees;
}

function getById(id) {
  return employees.find((employee) => employee.id === id);
}

function create(data) {
  const employee = { id: nextId++, ...data };
  employees.push(employee);
  return employee;
}

function update(id, data) {
  const employee = getById(id);
  if (!employee) {
    return null;
  }
  Object.assign(employee, data);
  return employee;
}

function remove(id) {
  const index = employees.findIndex((employee) => employee.id === id);
  if (index === -1) {
    return false;
  }
  employees.splice(index, 1);
  return true;
}

function reset() {
  employees = [];
  nextId = 1;
}

module.exports = { getAll, getById, create, update, remove, reset };
