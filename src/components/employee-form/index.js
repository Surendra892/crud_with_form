import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./add-employee.css";

const countryList = [
  {
    name: "India",
    states: [
      {
        name: "Andhra Pradesh",
        cities: ["Tirupati", "Visakapatnam", "Kurnool", "Kadapa"],
      },
      {
        name: "Telangana",
        cities: ["Hyderabad", "Karimnagar", "Adilabad", "Nalgonda"],
      },
    ],
  },
  {
    name: "Russia",
    states: [
      {
        name: "Adygea",
        cities: ["Maykop", "Shaumyan", "Rodnikovyi"],
      },
      {
        name: "Altai",
        cities: ["Aleysk", "Barnaul", "Kulunda"],
      },
    ],
  },
  {
    name: "Germany",
    states: [
      {
        name: "Berlin",
        cities: ["Nordend", "Hamburg", "Munich"],
      },
      {
        name: "Bavaria",
        cities: ["Nuremberg", "Augsburg", "Landshut"],
      },
    ],
  },
];
const hobbies = ["Music", "TV", "Playing Shuttle", "Reading Books"];

const EmployeeForm = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const empArr = JSON.parse(sessionStorage.getItem("employeeData")) || [];
  console.log(empArr);

  const initialUser = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    country: "",
    state: "",
    city: "",
    address: "",
    hobbies: [],
    agree: false,
  };

  const [countries] = useState([...countryList]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [initialValues, setIntialValues] = useState(initialUser);

  useEffect(() => {
    if (employeeId) {
      const singleEmp = empArr.find((obj) => obj.id == employeeId);
      console.log(singleEmp);
      setIntialValues(singleEmp);
      changeCountry(singleEmp.country);
      changeState(singleEmp.state, singleEmp.country);
    }
  }, [employeeId]);

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    for (let key in values) {
      if (!values[key]) {
        if (
          key === "country" ||
          key === "city" ||
          key === "state" ||
          key === "agree" ||
          key === "gender"
        ) {
          errors[key] = "Please select " + key;
        } else {
          errors[key] = "Please enter " + key;
        }
      } else if (values[key] && key === "email" && !regex.test(values[key])) {
        errors.email = "Please enter valid email";
      } else if (key === "hobbies" && !values.hobbies.length) {
        errors[key] = "select atleast one hobby";
      } /* else if (values[key] && key === "dob") {
        var bday = values.dob;
        bday = bday.split("-");
        var bday_in_milliseconds = new Date(
          parseInt(bday[2], 10),
          parseInt(bday[1], 10) - 1,
          parseInt(bday[0]),
          10
        ).getTime(); //birth-date in milliseconds
        var now = new Date().getTime(); //current time in milliseconds
        if (bday_in_milliseconds >= now) {
          errors[key] = "select before current date";
        } else {
          return;
        }
      } */
    }
    return errors;
  };

  const changeCountry = (countryName) => {
    let countriesCopy = countryList.find((val) => val.name == countryName);
    if (countriesCopy.states) {
      setStates(countriesCopy.states);
    }
  };
  const changeState = (stateName, countryName) => {
    let countriesCopy = countryList.find((val) => val.name == countryName);
    //console.log(countryName);
    if (countriesCopy.states) {
      let statesCopy = countriesCopy.states.find(
        (val) => val.name == stateName
      );
      if (statesCopy) {
        setCities(statesCopy.cities);
      }
    }
  };

  const changeHobbie = (formik, e) => {
    const { checked, name } = e.target;
    if (checked) {
      formik.setFieldValue("hobbies", [...formik.values.hobbies, name]);
    } else {
      formik.setFieldValue(
        "hobbies",
        formik.values.hobbies.filter((v) => v !== name)
      );
    }
    // console.log(formik.values.hobbies);
  };

  const submitForm = (empData) => {
    const id =
      Math.round(Math.random() * 100000) + Math.round(Math.random() * 1000);
    empData.id = id;
    if (employeeId) {
      const empIndex = empArr.findIndex((obj) => obj.id == employeeId);
      empArr.splice(empIndex, 1, empData);
      sessionStorage.setItem("employeeData", JSON.stringify(empArr));
      navigate("/employeeslist");
    } else {
      empArr.push(empData);
      sessionStorage.setItem("employeeData", JSON.stringify(empArr));
      navigate("/employeeslist");
    }
  };

  return (
    <div className="add-employee">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center p-2">
            {employeeId ? "Edit" : "Add"} Employee
          </h5>
          <div className="logo">
            <i className="bi bi-person-fill"></i>
          </div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
            enableReinitialize
          >
            {(formik) => {
              const { values, handleChange, errors, touched, handleBlur } =
                formik;
              return (
                <Form noValidate>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">First Name</label>
                    <div className="col-7">
                      <input
                        type="email"
                        name="firstname"
                        id="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-control"}
                      />
                      {errors.firstname && touched.firstname && (
                        <div className="invalid-feedback">
                          {errors.firstname}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">Last Name</label>
                    <div className="col-7">
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-control"}
                      />
                      {errors.lastname && touched.lastname && (
                        <div className="invalid-feedback">
                          {errors.lastname}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">Email</label>
                    <div className="col-7">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-control"}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">Contact no</label>
                    <div className="col-7">
                      <input
                        pattern="\d{10}"
                        placeholder="10 digit mobile number only"
                        type="number"
                        name="mobile"
                        id="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-control"}
                      />
                      {errors.mobile && touched.mobile && (
                        <div className="invalid-feedback">{errors.mobile}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">
                      Date of Birth
                    </label>
                    <div className="col-7">
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={values.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-control"}
                      />
                      {errors.dob && touched.dob && (
                        <div className="invalid-feedback">{errors.dob}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">Gender</label>
                    <div className="col-7">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={values.gender === "Male"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label className="form-check-label">Male</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={values.gender === "Female"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <label className="form-check-label">Female</label>
                      </div>
                      {errors.gender && touched.gender && (
                        <div className="invalid-feedback">{errors.gender}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">Country</label>
                    <div className="col-7">
                      <select
                        name="country"
                        id="country"
                        value={values.country}
                        onChange={(event) => {
                          handleChange(event);
                          changeCountry(event.target.value);
                        }}
                        onBlur={handleBlur}
                        className={"form-control"}
                      >
                        <option hidden>Select Country</option>
                        {countries.map((country) => (
                          <option
                            key={country.name}
                            name="country"
                            value={country.name}
                          >
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && touched.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">State</label>
                    <div className="col-7">
                      <select
                        name="state"
                        id="state"
                        value={values.state}
                        onChange={(event) => {
                          handleChange(event);
                          changeState(event.target.value, values.country);
                        }}
                        onBlur={handleBlur}
                        className={"form-control"}
                      >
                        <option hidden>Select State</option>
                        {states.map((state) => (
                          <option
                            key={state.name}
                            name="state"
                            value={state.name}
                          >
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && touched.state && (
                        <div className="invalid-feedback">{errors.state}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">City</label>
                    <div className="col-7">
                      <select
                        name="city"
                        id="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-control"}
                      >
                        <option hidden>Select City</option>
                        {cities.map((city) => (
                          <option key={city} name="city" value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      {errors.city && touched.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">Address</label>
                    <div className="col-7">
                      <textarea
                        type="text"
                        name="address"
                        id="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-control"}
                      ></textarea>
                      {errors.address && touched.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label">Hobbies</label>

                    <div className="col-7">
                      <div className="row">
                        {hobbies.map((hobbie) => (
                          <div className="col-sm-6">
                            <div className="form-check">
                              <input
                                key={hobbie}
                                className="form-check-input"
                                type="checkbox"
                                id={hobbie}
                                name={hobbie}
                                checked={formik.values.hobbies.includes(hobbie)}
                                onChange={(e) => changeHobbie(formik, e)}
                                onBlur={handleBlur}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={hobbie}
                              >
                                {hobbie}
                              </label>
                            </div>
                          </div>
                        ))}
                        {errors.hobbies && touched.hobbies && (
                          <div className="invalid-feedback">
                            {errors.hobbies}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <div className="col-sm-12">
                      <input
                        required
                        type="checkbox"
                        id="agree"
                        checked={values.agree}
                        value={values.agree}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={"form-check-input"}
                      />
                      <label className="form-check-label" htmlFor="agree">
                        &nbsp; I agree
                      </label>
                      {errors.agree && touched.agree && (
                        <div className="invalid-feedback">{errors.agree}</div>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <Link to={"/"}>Go Back Home</Link>{" "}
                    <button
                      className="btn btn-danger m-2"
                      type="reset"
                      onClick={() => navigate("/employeeslist")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      {employeeId ? "Update" : "Add"} Employee
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
