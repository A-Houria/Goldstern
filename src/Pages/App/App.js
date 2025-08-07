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
import Blogs from "../Blogs/Blogs";
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
import AddBlog from "../AddBlog/AddBlog";
import BlogDetails from "../BlogDetails/BlogDetails";
import BlogEdit from "../BlogEdit/BlogEdit";

//Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
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
        path="/dashboard/edit-blog/:blogId"
        element={
          <ProtectedRoute>
            <BlogEdit />
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
      <Route
        path="/dashboard/add-blog"
        element={
          <ProtectedRoute>
            <AddBlog />
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
