//Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//Pages
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Inventory from "./Inventory";
import Services from "./Services";
import Contact from "./Contact";
import CarDetails from "./CarDetails";
import Tracking from "./Tracking";
import Nopage from "./Nopage";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import CarEdit from "./CarEdit";

//Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/edit-car/:id"
        element={
          <ProtectedRoute>
            <CarEdit />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Nopage />} />
    </Route>
  )
);

//Main_Function
function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
