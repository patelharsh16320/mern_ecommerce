import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory, deleteCategory, fetchCategory, updateCategory } from './ApiCommon';
import { toast } from 'react-toastify';
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

const AddCategory = () => {
  const [form, setForm] = useState({ name: '', desc: '' });
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPageError, setItemsPerPageError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
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

  const resetForm = () => {
    setForm({ name: '', desc: '' });
    setIsEditMode(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = isEditMode ? { ...form, id: editId } : form;
      const response = isEditMode ? await updateCategory(payload) : await createCategory(payload);

      if (response.data.status === 201) {
        toast.success(response.data.message);
        resetForm();
        loadProducts();

        // Close modal via Bootstrap
        const modal = window.bootstrap.Modal.getInstance(document.getElementById('addCategoryModal'));
        if (modal) modal.hide();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('Failed to process category');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setForm({ name: category.name, desc: category.desc });
    setIsEditMode(true);
    setEditId(category.id);
    const modal = new window.bootstrap.Modal(document.getElementById('addCategoryModal'));
    modal.show();
  };

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
      toast.error('Failed to delete category');
      console.error('Delete error:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Category.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Category.length / itemsPerPage);

  return (
    <section id='' className='container my-5'>
      <h1>Show All Categories</h1>

      <div className='d-flex justify-content-between mb-3 align-items-center'>
        <nav>
          <h4>Total Category: {Category.length}</h4>
          <ul className="pagination gap-1 d-flex">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item dark-clr-page ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="dark-clr" onClick={() => setCurrentPage(index + 1)}>
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
            min="5"
            max={Category.length}
            value={itemsPerPage}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 5) {
                setItemsPerPageError('Minimum value is 5');
              } else {
                setItemsPerPage(value);
                setItemsPerPageError('');
                setCurrentPage(1);
              }
            }}
            className="form-control"
            style={{ width: "80px" }}
          />
          <span className="ms-2">entries</span>
          {itemsPerPageError && (
            <div className="text-danger mt-1 ms-2" style={{ fontSize: '0.9rem' }}>
              {itemsPerPageError}
            </div>
          )}
        </div>

        <button className="dark-clr" data-bs-toggle="modal" data-bs-target="#addCategoryModal" onClick={resetForm}>
          Add Category
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{isEditMode ? 'Edit Category' : 'Add Category'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
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
              <button type="button" className="dark-clr" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="dark-clr" disabled={loading}>
                {loading ? 'Saving…' : isEditMode ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className='thead-dark'>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Desc</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((props, index) => (
            <tr key={props.id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{props.name}</td>
              <td>{props.desc}</td>
              <td>
                <button onClick={() => handleEdit(props)}>
                  <CiEdit />
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
  );
};

export default AddCategory;
