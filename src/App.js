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
