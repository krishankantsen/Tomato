import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

// import Carousal from "../components/Carousal";
export default function Home() {
  const [search, setsearch] = useState("");
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://tomato-backend-krishankantsen.vercel.app/foodData", {
          method: "GET",
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();

        setfoodItem(data.foodItems);
        setfoodCat(data.foodCats);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className=" carousel-inner" id="carousel">
          <div className="carousel-caption " style={{ zIndex: "10" }}>
            <h1 className="mb-5" style={{ fontSize: "5rem" }}>
              TOMATO
            </h1>
            <p className="mb-5" style={{ marginTop: "-20px" }}>
              💁 Flavors to Your Door💁
            </p>
            <div className="d-flex justify-content-center">
              <input
                className=" form-control me-2 bg-transparent text-white border-2 w-50"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
                style={{ color: "white", "::placeholder": { color: "white" } }}
              />

              {/* <button className="btn btn-outline-danger text-white " type="submit" style={{"border":"solid #f43f5e"}}>Search</button> */}
            </div>
          </div>

          <div className="carousel-item active ">
            <img
              src="https://source.unsplash.com/random/900x600/?pizza"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="https://source.unsplash.com/random/900*700/pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x600/?burger"
              className="d-block w-100"
              style={{ filter: "brightness(30%)" }}
              alt="https://source.unsplash.com/random/900*700/pizza"
            />
          </div>
          <img
            src="https://source.unsplash.com/random/900x600/?biryani"
            className="d-block  w-100"
            style={{ filter: "brightness(30%)" }}
            alt="https://source.unsplash.com/random/900*700/pizza"
          />
        </div>
        <div className="carousel-item"></div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container col ">
      {foodCat.map((data) => {
       (
        <div className="row mb-3" key={data._id}>
          <div className="fs-3 fs-bold mt-3">{data.CategoryName}</div>
          <hr />
          {foodItem && foodItem.length !== 0 ? (
            foodItem
              .filter(
                (item) =>
                  item.CategoryName === data.CategoryName &&
                  item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((filterItems) => {
               (
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 ml-3">
                    <Card
                      foodItem={filterItems}
                      options={filterItems.options[0]}
                    ></Card>
                  </div>
                );
              })
          ) : (
            <div>No Such Data Found</div>
          )}
        </div>
      );
    })
  : ""}


      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
