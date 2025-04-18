import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Index = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [showCart, setShowCart] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const apiUrl = `${import.meta.env.VITE_BACKEND_API}/show-product`;
        console.log(apiUrl);
        axios.get(apiUrl)
            .then((res) => {
                setProducts(res.data.users);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });

        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const savedQuantities = JSON.parse(localStorage.getItem('quantities')) || {};

        setCart(savedCart);
        setQuantities(savedQuantities);
    }, []);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [cart, quantities]);

    const isInCart = (id) => cart.some(item => item.id === id);

    const handleQuantityChange = (id, value) => {
        const quantity = Math.max(1, parseInt(value) || 1);
        setQuantities(prev => ({ ...prev, [id]: quantity }));
    };

    const handleAddToCart = (product) => {
        const qty = quantities[product.id] || 1;
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: qty }];
        });
    };

    const handleDecreaseQty = (id) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const handleRemoveFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));

        setQuantities(prev => {
            const newQuantities = { ...prev };
            delete newQuantities[id];
            return newQuantities;
        });
    };

    const filteredProducts = products
        .filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            p.price >= priceRange[0] &&
            p.price <= priceRange[1]
        )
        .sort((a, b) => {
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            if (sortOption === 'name-asc') return a.title.localeCompare(b.title);
            if (sortOption === 'name-desc') return b.title.localeCompare(a.title);
            return 0;
        });


    const handleShowCart = () => setShowCart(true);
    const handleCloseCart = () => setShowCart(false);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className='px-5 pb-5'>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Products List</h1>
                <button className='dark-clr' onClick={handleShowCart}>
                    🛒 Cart Items: {cart.length}
                </button>
            </div>
            <h5>Total Products: {products.length}</h5>
            <div className="d-flex justify-content-between my-3">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="form-control"
                    style={{ width: '250px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="d-flex align-items-center">
                    <label className="me-2">Price: </label>
                    <input
                        type="number"
                        min="0"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        className="form-control"
                        style={{ width: '100px' }}
                    />
                    <span className="mx-2">to</span>
                    <input
                        type="number"
                        min="0"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        className="form-control"
                        style={{ width: '100px' }}
                    />
                </div>
                {/* Sort Dropdown */}
                <select
                    className="form-select"
                    style={{ width: '200px' }}
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                </select>
                <button onClick={() => {
                    setSearchTerm('');
                    setPriceRange([0, 1000]);
                    setSortOption('');
                }}>Reset Filter</button>
            </div>
            <hr />
            {products.length > 0 ? (
                <div className='product-list row'>
                    {filteredProducts.map((props, index) => (
                        <div key={index} className='inner-section col-lg-4 col-md-4 col-12'>
                            <div className='img-section mb-3'>
                                <div className="img-sec text-center">
                                    <img src={props.image} alt={props.title} style={{ maxHeight: '150px', objectFit: 'contain' }} />
                                </div>
                                <div className='price-txt d-flex justify-content-between mt-3 align-items-center'>
                                    <p className='price mb-0'>${props.price}</p>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantities[props.id] || 1}
                                        onChange={(e) => handleQuantityChange(props.id, e.target.value)}
                                        style={{ width: '60px', marginRight: '8px' }}
                                    />
                                    <button onClick={() => handleAddToCart(props)}>
                                        {isInCart(props.id) ? 'Add More' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                            <div className='content-section'>
                                <h5 className='head'>
                                    <Link to={`/product/${props.id}`}>
                                        {props.title}
                                    </Link>
                                </h5>
                                <p><b>Category:</b> {props.category}</p>
                                <p><b>Rating:</b> {props.rating_rate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products found</p>
            )}

            {/* Cart Modal */}
            <Modal show={showCart} onHide={handleCloseCart}>
                <Modal.Header closeButton>
                    <Modal.Title>🛒 Cart Items ({cart.length})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {cart.length > 0 ? (
                        <ul className="list-unstyled">
                            {cart.map(item => (
                                <li key={item.id} className="mb-3 border-bottom pb-2">
                                    <div className='d-flex justify-content-between'>
                                        <strong>{item.title}</strong>
                                        <span><b>x{item.quantity}</b></span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                        <span>Price: ${item.price} × {item.quantity} = <b>${(item.price * item.quantity).toFixed(2)}</b></span>
                                        <div>
                                            <button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => handleAddToCart(item)}
                                            >+</button>
                                            <button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="mx-2"
                                                onClick={() => handleDecreaseQty(item.id)}
                                            >-</button>
                                            <button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRemoveFromCart(item.id)}
                                            >Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items in cart</p>
                    )}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-between">
                    <h5>Total: ${cartTotal}</h5>
                    <button className='close-btn' variant="secondary" onClick={handleCloseCart}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Index;