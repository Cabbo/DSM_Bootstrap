import React from "react";

const CartItem = props => {
    const { cartItem } = props;

    const { product, amount } = cartItem;
    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media">
                    <div className="media-left ms-3">
                        <figure className="image ">
                            <img 
                                width="100" height="100"
                                src={product.image}
                                alt={product.name}
                            />
                        </figure>
                    </div>
                    <div className="media-body align-self-center">
                        <b style={{ textTransform: "capitalize" }}>
                            {product.name}{"  "}
                            <h5 className="d-inline">
                                <span className="badge badge-primary">€ {product.price}</span>{" "}
                                <small className="badge badge-info">{`✕ ${amount} in cart`}</small>
                            </h5>
                        </b>
                        {/* <div>{product.shortDesc}</div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;