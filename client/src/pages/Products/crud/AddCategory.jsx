import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory, deleteCategory } from './ApiCommon';
import { toast } from 'react-toastify';
import { fetchCategory } from './ApiCommon';
import { Link } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    desc: ''
  });

  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState();
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const loadProducts = () => {
    fetchCategory()
      .then(res => {
        setCategory(res.data.users || []);
      })
      .catch(err => console.error('Error fetching products:', err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form };
      const response = await createCategory(payload);
      console.log('response', response.data);
      setReturnData(response.data);

      if (response.status === 201) {
        setForm({ name: '', desc: '' });
        toast.success(returnData.message);
        navigate('/admin/addcategery');
      }
      else {
        toast.error(returnData.message);
      }
    } catch (err) {
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };
  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setDeletingId(id);
      const response = await deleteCategory(id);
      console.log('response', response.data);
      if (response.status !== 201) {
        toast.success(response.data.message);
        setCategory(prev => prev.filter(p => p.id !== id));
      }else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete category');
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };



  return (
    // <section id='main' className="container d-flex align-items-center">
    //   <div className=''>
    //     <h2>Add New Product Category</h2>
    //     <form onSubmit={handleSubmit} className="row g-3 ">
    //       <div className="col-md-6">
    //         <label className="form-label">Name</label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={form.name}
    //           onChange={handleChange}
    //           className="form-control"
    //           required
    //         />
    //       </div>

    //       <div className="col-md-6">
    //         <label className="form-label">Description</label>
    //         <textarea
    //           name="desc"
    //           value={form.desc}
    //           onChange={handleChange}
    //           className="form-control"
    //         />
    //       </div>

    //       <div className="col-12">
    //         <button type="submit" className="btn btn-primary" disabled={loading}>
    //           {loading ? 'Saving…' : 'Create Category'}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
    <>
      <section className='container pb-5'>
        <h1>Show All Products</h1>

        <div className='d-flex justify-content-between mb-3'>
          <h4>Total Category: {Category.length}</h4>
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
            Add Category
          </button>
          <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="addCategoryModalLabel">Add New Category</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="desc"
                      value={form.desc}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving…' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>

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
            {Category.map((props, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{props.name}</th>
                <td>{props.desc}</td>
                <td>
                  <button>
                    <Link to={`/admin/addcategery/${props.id}`}><CiEdit /></Link>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(props.id)}
                    disabled={deletingId === props.id}
                  >
                    {deletingId === props.id ? 'Deleting…' : <FaRegTrashAlt />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AddProduct;
