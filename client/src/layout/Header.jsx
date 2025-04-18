import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="navbar-section">
        <div className="row">
          <div className="col-md-6 logo px-5">
            <Link to="/">Logo</Link>
          </div>
          <div className="col-md-6 links d-flex gap-3">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/product">Product</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
            <Link to="/account">My Account</Link>
            <Link to="/login">login</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;