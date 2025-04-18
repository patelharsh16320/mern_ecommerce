import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import About from "../pages/About"
import Error from "../pages/Error";
import Product from "../pages/Products/AllProducts";
import SingleProduct from "../pages/Products/SingleProduct";
import Checkout from "../pages/Products/Checkout";
import Cart from "../pages/Products/Cart";
import MyAccount from "../pages/User/MyAccount";
import Login from "../pages/User/Login";
import ShowProducts from "../pages/Products/crud/ShowProducts";
import AddProduct from "../pages/Products/crud/AddProduct";
import AddCategery from "../pages/Products/crud/AddCategory";

const auth = () => {
  return (
    <>
      <Routes>
        {/* pages  */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact/>} /> */}
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />

        {/* Admin Panel  */}
        <Route path="/admin/showproducts" element={<ShowProducts />} />
        <Route path="/admin/addproducts" element={<AddProduct />} />
        <Route path="/admin/addcategery" element={<AddCategery />} />
      </Routes>
    </>
  )
}

export default auth