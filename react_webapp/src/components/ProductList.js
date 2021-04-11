import React from "react";
import ProductItem from "./ProductItem";
import withContext from "../containers/withContext";

const ProductList = props => {
  const { products } = props.context;

  return (
    <>
      <div className="jumbotron is-primary">
        <div className="jumbotron-body container">
          <h4 className="title">Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
                removeFromCart={props.context.removeFromCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(ProductList);