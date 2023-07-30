
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navi=useNavigate()
  
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => setProducts(json));
    }, []);
  
    const categories = [...new Set(products.map((product) => product.category))];
    const [selectedCategory, setSelectedCategory] = useState(null);
  
    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    };
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
    const filteredProducts = products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      if (!searchTerm || product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      return false;
    });
  return (
    <div>


      {/* navbar */}
      <div className='back d-flex flex-column justify-content-between'>
        <div>
        <h1 className='text-white text-center p-2 ' style={{fontSize:"50px"}}>Eflyer</h1>

     <nav class="navbar navbar-expand-lg bg-transparent mx-auto " style={{width:"1000px"}}>
  <div class="container-fluid ">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarScroll">

    <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {selectedCategory ? selectedCategory:"Select Catagory"}
        </button>
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li key={category}>
              <a
                className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                href="#"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </div>
  
      <form className="d-flex" role="search">
        <input
        style={{ width:"450px"}}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="btn  btn-light" type="submit">Search</button>
      </form>
    
      <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    English
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">English</a></li>
  
  </ul>
</div>

   <div className='text-white '>
    Cart 
   </div>


    </div>
  </div>
     </nav>
     </div>
     <div className='mx-auto '>
     <h1 className='text-white text-center ' style={{fontSize:"100px"}}>Get Start</h1>
     <h1 className='text-white text-center  ' style={{fontSize:"100px"}}>Your Favourite Shoping</h1>
     
     </div>
     </div>

    


  <h2 class="text-center mt-2">Man and Women Fashion</h2>
<div className='d-flex justify-content-center flex-wrap'>


 { filteredProducts.map((e)=>

  
  ( <div class="card m-5 p-2" style={{width: "18rem"}}>
    <div class="card-body">
     <h5 class="card-title text-center fw-bold">{e.title}</h5>
      <p className='text-center'><span className='text-danger fw-bold '>Price</span>: $ {e.price}</p>
   </div>
   <img src={e.image} className='p-2' height="300px" class="card-img-top" alt="..."/>
    
   <button className='btn btn-success m-2' onClick={()=>navi(`/update/${e.id}`)}>Update</button>

 </div>)
 )
}

</div>

    </div>
  )
}

export default Home