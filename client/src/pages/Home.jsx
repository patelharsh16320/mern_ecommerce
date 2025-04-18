import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCar } from "react-icons/fa";
import { SiFsecure } from "react-icons/si";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";


const Home = () => {
    return (
        <>
            {/* slider  */}
            <section id="main" className='section1'>
                <div className="container main-section">
                    <h1><b>Grow</b> <span className='green'>Plants</span> for a better Environment</h1>
                    <div className='btn-section'>
                        <button className='btn-design'><a href='#' className='text-decoration-none'>Contact Us</a></button>
                    </div>

                </div>
            </section>

            {/* About us  */}
            <section id="main" className='section2'>
                <div className="container row inner-section">
                    <div className="col-6">
                        {/* <img src="../../upload/about-us.png" alt="" /> */}
                    </div>
                    <div className="col-6 p-10">
                        <div className='heading'>
                            <p>About Us</p>
                            <h2>Keep your <br />plants <span className='green'>alive</span> </h2>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, veniam consectetur, sit corporis reiciendis officia ut numquam error ducimus illum asperiores maxime commodi, temporibus velit nam praesentium adipisci quos nostrum?</p>
                        <div className='btn-section'>
                            <button className='btn-design'><a href='#' className='text-decoration-none'>Know More</a></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service section */}
            {/* <section id="half-main" className='section3'>
                <div className="row container">
                    <div className="col-md-4 grey-clr">
                        <div className="inner-section">
                            <span className='icon-design'><FaCar /></span>
                            <p>Super Fast and Free Delivery</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="main-section row">
                            <div className="inner-section col-md-12 mb-2">
                                <span className='icon-design'><SiFsecure /></span>
                                <p>Non-contact Shipping</p>
                            </div>
                            <div className="inner-section col-md-12">
                                <span className='icon-design'><GiReceiveMoney /></span>
                                <p>Money-back Guranteed</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 grey-clr">
                        <div className="inner-section">
                            <span className='icon-design'><RiSecurePaymentFill /></span>
                            <p>Super Secure Payment System</p>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default Home
