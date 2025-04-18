import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from './ApiCommon';

const AddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating_rate: '',
    rating_count: '',
    category_id: '',
    inventory_id: '',
    discount_id: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert numeric fields
      const payload = {
        ...form,
        price: parseFloat(form.price),
        rating_rate: parseFloat(form.rating_rate),
        rating_count: parseInt(form.rating_count, 10),
        category_id: parseInt(form.category_id, 10),
        inventory_id: parseInt(form.inventory_id, 10),
        discount_id: parseInt(form.discount_id, 10),
      };

      await createProduct(payload);
      alert('Product created successfully');
      navigate('/admin/showproducts');
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='main' className="container d-flex align-items-center">
      <div>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          {[
            { label: 'Title', name: 'title', type: 'text' },
            { label: 'Price', name: 'price', type: 'number' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Category', name: 'category', type: 'text' },
            { label: 'Image URL', name: 'image', type: 'file' },
            { label: 'Rating Rate', name: 'rating_rate', type: 'number' },
            { label: 'Rating Count', name: 'rating_count', type: 'number' },
            { label: 'Category ID', name: 'category_id', type: 'number' },
            { label: 'Inventory ID', name: 'inventory_id', type: 'number' },
            { label: 'Discount ID', name: 'discount_id', type: 'number' }
          ].map(field => (
            <div key={field.name} className="col-md-6">
              <label className="form-label">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}

          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
