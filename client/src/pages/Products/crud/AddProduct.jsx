import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from './ApiCommon';

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if updating rating
    if (name === 'rate' || name === 'count') {
      setFormData(prev => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        rating: {
          rate: parseFloat(formData.rating.rate),
          count: parseInt(formData.rating.count, 10)
        }
      };
console.log('payload',payload)
      await createProduct(payload);
      alert('Product created successfully!');
      navigate('/admin/showproducts');
    } catch (err) {
      console.error('Failed to create product:', err);
      alert('Failed to create product. See console for details.');
    }
  };

  return (
    <section id='main'>
      <div className="add-product">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
          <input
            name="rate"
            value={formData.rating.rate}
            onChange={handleChange}
            placeholder="Rating Rate"
            type="number"
            step="0.1"
            required
          />
          <input
            name="count"
            value={formData.rating.count}
            onChange={handleChange}
            placeholder="Rating Count"
            type="number"
            required
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
