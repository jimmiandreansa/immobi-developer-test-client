import { useState } from "react";
import { updateEmployee, deleteEmployee } from "../services/api";
import PropTypes from "prop-types";

const EmployeeList = ({ employees, loadEmployees }) => {
  const [editEmployee, setEditEmployee] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(editEmployee.id, editEmployee);
      setEditEmployee(null);
      loadEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee({ ...editEmployee, [name]: value });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      <ul className="space-y-4">
        {employees.map((employee) => (
          <li
            key={employee.id}
            className="p-4 bg-white border border-gray-300 rounded-md"
          >
            {editEmployee && editEmployee.id === employee.id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  type="text"
                  name="name"
                  value={editEmployee.name}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="age"
                  value={editEmployee.age}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="gender"
                  value={editEmployee.gender}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="tanggal_lahir"
                  value={editEmployee.tanggal_lahir}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="alamat"
                  value={editEmployee.alamat}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <button
                  type="submit"
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                >
                  Update
                </button>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>Name:</strong> {employee.name}
                  </p>
                  <p>
                    <strong>Position:</strong> {employee.jabatan?.nama_jabatan}
                  </p>
                  <p>
                    <strong>Department:</strong>{" "}
                    {employee.jabatan?.department?.nama_department}
                  </p>
                  <p>
                    <strong>Age:</strong> {employee.age}
                  </p>
                  <p>
                    <strong>Gender:</strong> {employee.gender}
                  </p>
                  <p>
                    <strong>Date of Birth: </strong>
                    {formatDate(employee.tanggal_lahir)}
                  </p>{" "}
                  {/* Format date */}
                  <p>
                    <strong>Address:</strong> {employee.alamat}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

EmployeeList.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      tanggal_lahir: PropTypes.string.isRequired,
      alamat: PropTypes.string.isRequired,
      jabatan: PropTypes.shape({
        nama_jabatan: PropTypes.string,
        department: PropTypes.shape({
          nama_department: PropTypes.string,
        }),
      }),
    })
  ).isRequired,
  loadEmployees: PropTypes.func.isRequired,
};

export default EmployeeList;
