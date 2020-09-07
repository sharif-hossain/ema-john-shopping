import React from 'react';
import "./Cart.css";


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart)
    
    // let p = props.price;
    // const total = cart.reduce((total,prd) =>total +prd.price,0);
    let total = 0;
    for(let i=0;i<cart.length;i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
        // debugger;
    }
    
    let shipping = 0;
    if(total >135){
        shipping = 0;
    }
    else if(total>50){
        shipping = 4.99;
    }

    else if(total >0){
        shipping = 12.99;
    }
    const tax = (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered:{cart.length}</p>
            <p>Product Price:{formatNumber(total)}</p>
            <p>Shipping Cost:{shipping}</p>
            <p>TAx: {tax}</p>
            <p>Total:{grandTotal }</p>
           {
               props.children
           }
        </div>
    );
};

export default Cart;