const service = require('../services/employees.service');

function getAll(req, res) {
  res.json(service.listEmployees());
}

function getById(req, res) {
  const employee = service.getEmployee(Number(req.params.id));
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  res.json(employee);
}

function create(req, res) {
  const { employee, error } = service.createEmployee(req.body || {});
  if (error) {
    return res.status(400).json({ error });
  }
  res.status(201).json(employee);
}

function update(req, res) {
  const { employee, error, notFound } = service.updateEmployee(
    Number(req.params.id),
    req.body || {}
  );
  if (notFound) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  if (error) {
    return res.status(400).json({ error });
  }
  res.json(employee);
}

function remove(req, res) {
  const deleted = service.deleteEmployee(Number(req.params.id));
  if (!deleted) {
    return res.status(404).json({ error: 'Employee not found' });
  }
  res.status(204).send();
}

module.exports = { getAll, getById, create, update, remove };
