import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const navi=useNavigate();
    const { id } = useParams();
    const [productData, setProductData] = useState({
      title: '',
      price: 0,
      description: '',
      image: '',
      category: '',
    });
  
    const [updateStatus, setUpdateStatus] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
  
    useEffect(() => {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductData(data);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }, [id]);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setProductData({ ...productData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsUpdating(true);
  
      fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUpdateStatus(data); // Display response data after update
          setIsUpdating(false);
        })
        .catch((error) => {
          console.error('Error updating product:', error);
          setIsUpdating(false);
        });
    };
  return (
    <div className="container">
      <h2 className="my-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" name="title" value={productData.title} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" name="price" value={productData.price} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" name="description" value={productData.description} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL:</label>
          <input type="text" className="form-control" name="image" value={productData.image} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" className="form-control" name="category" value={productData.category} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary me-2" disabled={isUpdating} onClick={() => navi('/')}>
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
        <button className="btn btn-secondary" onClick={() => navi('/')}>Cancel</button>
      </form>
      {updateStatus && (
        <div className="my-4">
          <h3>Update Status:</h3>
          <pre>{JSON.stringify(updateStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
