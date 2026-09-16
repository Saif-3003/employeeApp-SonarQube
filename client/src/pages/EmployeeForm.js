import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../api/employeeApi";

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isEditing) {
      getEmployee(id).then((employee) => {
        if (employee) {
          setName(employee.name);
          setRole(employee.role);
          setEmail(employee.email);
        }
      });
    }
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { name, role, email };
    if (isEditing) {
      await updateEmployee(id, data);
    } else {
      await createEmployee(data);
    }
    navigate("/");
  }

  return (
    <div className="container form-page">
      <h1>{isEditing ? "Edit Employee" : "Add Employee"}</h1>
      <form onSubmit={handleSubmit} className="xyzz">
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Role</label>
          <input value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-actions">
          
            <button type="submit" className="btn">
              Save
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
