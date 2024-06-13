import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { getEmployees } from "../services/api";

const AddEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <EmployeeForm loadEmployees={loadEmployees} />
      <EmployeeList employees={employees} loadEmployees={loadEmployees} />
    </div>
  );
};

export default AddEmployees;
