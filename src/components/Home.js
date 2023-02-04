import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <center className="  h4">
      <h3 className="mb-5 pt-3">
        <b>CRUD Operations</b>
      </h3>
      <nav>
        <Link to="/employeeslist">Employees List</Link>
        <Link to={"/employee/addemployee"} className=" ms-5">
          Add New Employee
        </Link>
      </nav>
      <p className="m-5">
        This project is related to CRUD operations. This consist of create or
        add an employee and retrive to the table of employees list, also perform
        update and delete operations on the employee data which is in the
        employees list
      </p>
    </center>
  );
};

export default Home;
