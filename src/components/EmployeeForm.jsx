import { useState, useEffect } from "react";
import { getDepartments, getPositions, createEmployee } from "../services/api";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = ({ loadEmployees }) => {
  const notify = () => toast("Employee created successfully!");
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    gender: "",
    tanggal_lahir: "",
    alamat: "",
    id_department: "",
    id_jabatan: "",
  });

  const getAllDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPositions = async () => {
    try {
      const res = await getPositions();
      setPositions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllDepartments();
    getAllPositions();
  }, []);

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setEmployee({ ...employee, id_department: departmentId, id_jabatan: "" });
    setFilteredPositions(
      positions.filter(
        (position) => position.id_department === parseInt(departmentId)
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(employee);
      notify();
      loadEmployees();
      setEmployee({
        name: "",
        age: "",
        gender: "",
        tanggal_lahir: "",
        alamat: "",
        id_department: "",
        id_jabatan: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg"
    >
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="age"
          value={employee.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <div>
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="L"
              checked={employee.gender === "L"}
              onChange={handleChange}
              required
              className="mr-2"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="P"
              checked={employee.gender === "P"}
              onChange={handleChange}
              required
              className="mr-2"
            />
            Female
          </label>
        </div>
        <input
          type="date"
          name="tanggal_lahir"
          value={employee.tanggal_lahir}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="alamat"
          value={employee.alamat}
          onChange={handleChange}
          placeholder="Address"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          name="id_department"
          value={employee.id_department}
          onChange={handleDepartmentChange}
          required
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.nama_department}
            </option>
          ))}
        </select>
        <select
          name="id_jabatan"
          value={employee.id_jabatan}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Job</option>
          {filteredPositions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.nama_jabatan}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

EmployeeForm.propTypes = {
  loadEmployees: PropTypes.func.isRequired,
};

export default EmployeeForm;
