import { Route, Router, Routes } from "react-router-dom";
import "./App.css";

import EmployeeForm from "./components/employee-form";
import EmployeeList from "./components/employee-list";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<EmployeeList />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/employees/addemployee" element={<EmployeeForm />} />
      
      /> */}
      <Route
        path="/employee/editemployee/:employeeId"
        exact
        element={<EmployeeForm />}
      />
      <Route path="/" element={<Home />} role="navigation" />
      <Route path="/home" element={<Home />} />
      <Route path="/employee/addemployee" element={<EmployeeForm />} />
      <Route path="/employeeslist" element={<EmployeeList />} />
    </Routes>
  );
}

export default App;
