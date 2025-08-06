//Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//Pages
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import About from "../About/About";
import Inventory from "../Inventory/Inventory";
import Services from "../Services/Services";
import Contact from "../Contact/Contact";
import CarDetails from "../CarDetails/CarDetails";
import Tracking from "../Tracking/Tracking";
import Nopage from "../NoPage/Nopage";
import Login from "../Login/Login";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard";
import CarEdit from "../CarEdit/CarEdit";
import AddCar from "../AddCar/AddCar";

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
      <Route
        path="/dashboard/add-car"
        element={
          <ProtectedRoute>
            <AddCar />
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
