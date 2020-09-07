import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import gif from '../../images/giphy.gif';


const Review = () => {
    const [cart,setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd =>pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        console.log('remove click',productKey)
    }
    useEffect(()=>{
      const savedCart = getDatabaseCart();
     const productKeys = Object.keys(savedCart);

     const cartProducts = productKeys.map(key =>{
         const product = fakeData.find(pd =>pd.key ===key)
         product.quantity = savedCart[key];
         return product;
     });
     setCart(cartProducts)
    },[])
    
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={gif} alt=""/>
    } 

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
                <button onClick={handlePlaceOrder} className='button'>Place Order</button>
            </div>

        </div>
    );
};

export default Review;