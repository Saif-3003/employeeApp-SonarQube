import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/employeeApi";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  async function loadEmployees() {
    const data = await getEmployees();
    setEmployees(data);
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleDelete(id) {
    await deleteEmployee(id);
    loadEmployees();
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Employees</h1>
        <Link to="/employees/new" className="btn">
          + Add Employee
        </Link>
      </div>
      {employees.length === 0 ? (
        <div className="card empty-state">
          No employees yet. Add your first one.
        </div>
      ) : (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.email}</td>
                  <td>
                    <div className="actions">
                      <Link
                        to={`/employees/${employee.id}/edit`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
