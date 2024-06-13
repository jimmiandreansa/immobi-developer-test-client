import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Immobi Solusi Prima
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Add Employees
          </Link>
          <Link
            to="/add-departments"
            className="text-gray-300 hover:text-white"
          >
            Add Departments
          </Link>
          <Link to="/add-positions" className="text-gray-300 hover:text-white">
            Add Positions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
