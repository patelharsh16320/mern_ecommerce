import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="footer-section w-100">
                <div className="row container">
                    <div className="col-md-6 logo px-5">
                        <Link to="/">Logo</Link>
                    </div>
                    <div className="col-md-6 links d-flex gap-3 justify-content-end">
                        <Link to="/">Home</Link>
                        <Link to="/admin/showproducts">Show Products</Link>
                        <Link to="/admin/addproducts">Add Products</Link>
                        <Link to="/admin/addcategery">Add Categery</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Footer;