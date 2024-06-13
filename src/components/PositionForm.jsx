import { useState, useEffect } from "react";
import { getDepartments, createPosition } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PositionForm = () => {
  const notify = () => toast("Position added successfully!");
  const [departments, setDepartments] = useState([]);
  const [position, setPosition] = useState({
    nama_jabatan: "",
    id_department: "",
  });

  const getAllDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosition({ ...position, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPosition(position);
      notify();
      setPosition({ nama_jabatan: "", id_department: "" });
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
      <h2 className="text-xl font-semibold mb-4">Add Position</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="nama_jabatan"
          value={position.nama_jabatan}
          onChange={handleChange}
          placeholder="Job Name"
          required
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          name="id_department"
          value={position.id_department}
          onChange={handleChange}
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

export default PositionForm;
