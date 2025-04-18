import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
      });
  }, [id]);

  if (!product) {
    return <div className='p-5'>Loading product...</div>;
  }

  return (
    <div className='single-product container'>
      <div className='main-section'>
        <div className="row container">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '300px', borderRadius: '10px' }}
            />
          </div>
          <div className="col-md-6">
            <div className="heading"><h1>{product.title}</h1></div>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Category:</b> {product.category}</p>
            <p><b>Description:</b> {product.description}</p>
            <p><b>Rating:</b> {product.rating?.rate} / 5 ({product.rating?.count} reviews)</p>
            <div className='d-flex gap-3'>
              <button>Add to Cart</button>
              <button>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
