// --- EXTERN IMPORTS ---
import { Navigate, Route, Routes } from "react-router";

// --- INTERN IMPORTS ---
import Layout from "../components/Layout";
import Detail from "../views/Detail/Detail";
import Home from "../views/Home/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={"/countries/"} replace={true} />}
      />
      <Route path="/countries/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":cca3" element={<Detail />} />
      </Route>
    </Routes>
  );
}
