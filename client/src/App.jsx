import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AdminPage from "./components/admin/AdminPage"
import AllProducts from "./components/admin/AllProducts"
import AddProductForm from "./components/admin/AddProducts";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./components/user/UserDashboard";
import ProductDetails from "./components/user/ProductDetails";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/add-product" element={<AddProductForm />} />
            <Route path="/admin/all-products" element={<AllProducts />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/dashboard/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
