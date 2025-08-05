import React, { useState, useEffect } from 'react';
import { CartState } from '../../../context/CartContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';

export default function CardsLocal() {
  const { state: { cart }, dispatch } = CartState();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, 'Products'), orderBy('dateCreated', 'asc')),
      (querySnapshot) => {
        const productsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProducts(productsData);

        const categoryList = ["All", ...new Set(productsData.map(p => p.category))];
        setCategories(categoryList);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container pt-3">
      <h1 className="text-center my-4" style={{ fontFamily: 'fantasy' }}>Our Products</h1>

      {/* Category Buttons */}
      <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`btn ${selectedCategory === cat ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="row justify-content-center mt-3">
        {filteredProducts.map((prod) => {
          const originalPrice = prod.price || 0;
          const discountAmount = prod.discount || 0;
          const finalPrice = originalPrice - discountAmount;
          const discountPercent = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;

          return (
            <div className="flip-card col-12 col-sm-6 col-md-4 col-lg-3 m-3" key={prod.id}>
              <div className="flip-card-inner">
                <div
                  className="flip-card-front"
                  style={{
                    backgroundImage: `url(${prod.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="overlay">
                    <h3 className="product-title">{prod.title}</h3>
                    <div className="price-tag-box text-center bg-light rounded">
                      {discountAmount > 0 ? (
                        <>
                          <span className="d-block fw-bold pt-1 text-danger">Rs {finalPrice}</span>
                          <span className="text-muted text-decoration-line-through pe-1 d-inline-block small">
                            Rs {originalPrice}
                          </span>
                          <span className="text-success d-inline-block ps-2 fw-bold small">
                            {discountPercent}% OFF
                          </span>
                        </>
                      ) : (
                        <span className="fw-bold text-danger">Rs {finalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flip-card-back d-flex flex-column justify-content-between p-3">
                  <div>
                    <h5 className="product-title">{prod.title}</h5>
                    <p className="description mt-2 rounded">
                      {prod.description?.slice(0, 300) || "No description available."}
                    </p>
                    {discountAmount > 0 && (
                      <p className="discount mb-1 text-success rounded-5 text-center">
                        Discount: Rs {discountAmount} 
                      </p>
                    )}
                  </div>

                  {cart.some(p => p.id === prod.id) ? (
                    <button
                      className="btn mt-auto btn-card"
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod })}
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      className="btn mt-auto btn-card"
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: { ...prod, price: finalPrice } })
                      }
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
