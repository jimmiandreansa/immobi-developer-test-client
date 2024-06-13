import { useState } from "react";
import { createDepartment } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepartmentForm = () => {
  const notify = () => toast("Department added successfully!");
  const [department, setDepartment] = useState({ nama_department: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDepartment(department);
      notify()
      setDepartment({ nama_department: "" });
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
      <h2 className="text-xl font-semibold mb-4">Add Department</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="nama_department"
          value={department.nama_department}
          onChange={handleChange}
          placeholder="Department Name"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
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

export default DepartmentForm;
