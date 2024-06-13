import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import AddEmployees from "./pages/AddEmployees";
import AddDepartments from "./pages/AddDepartments";
import AddPositions from "./pages/AddPositions";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AddEmployees />} />
        <Route path="add-departments" element={<AddDepartments />} />
        <Route path="add-positions" element={<AddPositions />} />
      </Route>
    </Routes>
  );
};

export default App;
