import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToCart } from "../slices/cartSlice";
import { useGetAllProductsQuery } from "../slices/productsApi";
import React, { useState, useMemo } from 'react'



const Home = () => {
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory();
  let [filter1, setFilter1] = useState('all');


  function onFilter(event) {
    setFilter1(event.target.value)
    console.log(event.target.value)

  }


  let { data, error, isLoading } = useGetAllProductsQuery();
  console.log("Api", isLoading);

  const [selectedCategory, setSelectedCategory] = useState();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    console.log(event.target.value)
  }
  function getFilteredList() {
    if (!selectedCategory) {
      return data;
    }
    return data.filter((item) => item.category === selectedCategory);
  }
  var filteredList = useMemo(getFilteredList, [selectedCategory, data]);

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <select name="isAvailable" onChange={onFilter}>
            <option value="all">all</option>
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>

          </select>
          <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Aquatics">Aquatics</option>
          </select>

          <div className="products">
            {data &&

              filteredList.filter((product) => {
                if (filter1 === 'available') {
                  return product.isAvailable === true
                } else if (filter1 === 'unavailable') {
                  return product.isAvailable === false


                } else {


                  return product
                }

              }).map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))
            }
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
