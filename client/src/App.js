import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <BrowserRouter>
      <div className="navbar">Employee Management</div>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id/edit" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
