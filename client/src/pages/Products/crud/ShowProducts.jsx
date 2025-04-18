import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from './ApiCommon';

const ShowProducts = () => {
    const [Products, setProducts] = useState([]);
    const [deletingId, setDeletingId] = useState(null);

    const loadProducts = () => {
        fetchProducts()
            .then(res => {
                setProducts(res.data.users || []);
            })
            .catch(err => console.error('Error fetching products:', err));
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            setDeletingId(id);
            await deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
            alert('Failed to delete product.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <>
            <section className='container pb-5'>
                <h1>Show All Products</h1>

                <div className='d-flex justify-content-between mb-3'>
                    <h4>Total Products: {Products.length}</h4>
                    <button><Link to="/admin/addproducts">Add New Product</Link></button>
                </div>
                <table class="table table-bordered table-striped">
                    <thead className='thead-dark'>
                        <tr>
                            <th>Index</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Products.map((props, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <th>{props.title}</th>
                                <td>{props.price}</td>
                                <td>         <button>
                                    <Link to={`/admin/editproduct/${props.id}`}><CiEdit /></Link>
                                </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(props.id)}
                                        disabled={deletingId === props.id}
                                    >
                                        {deletingId === props.id ? 'Deleting…' : <FaRegTrashAlt />}
                                    </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default ShowProducts