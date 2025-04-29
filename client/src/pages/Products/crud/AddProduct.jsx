import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct, fetchCategory } from './ApiCommon';

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
  const [categoryData, setcategoryData] = useState([]);

  const loadCategory = async () => {
    const res = await fetchCategory();
    setcategoryData(res.data.users || []);
  }

  useEffect(() => {
    loadCategory();
  }, [])

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
      await createProduct(payload);
      alert('Product created successfully!');
      navigate('/admin/showproducts');
    } catch (err) {
      alert('Failed to create product. See console for details.');
    }
  };

  return (
    <section id='main'>
      <div className="add-product px-5">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='form-control mb-3'
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            className='form-control mb-3'
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            required
          />
          <textarea
            className='form-control mb-3'
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <div class="dropdown mb-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Select Category
            </button>
            <ul class="dropdown-menu">
              {categoryData.map((props, index) => (
                <li key={index}><a class="dropdown-item">{props.name}</a></li>
              ))}
            </ul>
          </div>
          <input
            className='form-control mb-3'
            name="image"
            type='file'
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
          <input
            className='form-control mb-3'
            name="rate"
            value={formData.rating.rate}
            onChange={handleChange}
            placeholder="Rating Rate"
            type="number"
            step="0.1"
            required
          />
          <input
            className='form-control mb-3'
            name="count"
            value={formData.rating.count}
            onChange={handleChange}
            placeholder="Rating Count"
            type="number"
            required
          />
          <button type="submit">Create Product</button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
