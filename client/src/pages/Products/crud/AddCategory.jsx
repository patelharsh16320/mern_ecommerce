import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory, deleteCategory } from './ApiCommon';
import { toast } from 'react-toastify';
import { fetchCategory } from './ApiCommon';
import { Link } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const AddCategory = () => {
  const [form, setForm] = useState({
    name: '',
    desc: ''
  });

  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [returnData, setReturnData] = useState();
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  // create category 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form };
      const response = await createCategory(payload);
      console.log('response.data', response.data);
      setReturnData(response.data);

      if (returnData.status === 201) {
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

  // delete category
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      setDeletingId(id);
      const response = await deleteCategory(id);
      if (response.data.status === 201) {
        toast.success(response.data.message);
        setCategory(prev => prev.filter(p => p.id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete category');
    } finally {
      setDeletingId(null);
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Category.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Category.length / itemsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <>
      <section id='main' className='container pb-5'>
        <h1>Show All Products</h1>        
        <div className='d-flex justify-content-between mb-3 align-items-center'>
          <nav>
            <h4>Total Category: {Category.length}</h4>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="d-flex align-items-center">
            <label className="me-2">Show:</label>
            <input
              type="number"
              min="1"
              max={Category.length}
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-control me-2"
              style={{ width: "80px" }}
            />
            <span>entries</span>
          </div>

          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
            Add Category
          </button>
        </div>
        <div className='d-flex justify-content-between mb-3'>
          <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <form className="modal-content" onSubmit={handleSubmit}>
                <div className="modal-header">
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
              <th>Desc</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((props, index) => (
              <tr key={index}>
                <th>{indexOfFirstItem + index + 1}</th>
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

export default AddCategory;
