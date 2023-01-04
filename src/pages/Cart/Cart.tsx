/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// scss
import './Cart.scss';
import { Link } from 'react-router-dom';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import Loading from 'src/components/Loading/Loading';
import ItemList from 'src/components/Item/ItemList';
import CartItems from 'src/components/CartItems/CartItems';
import { ICart } from '@/store/interface';
import { getCartAll } from 'src/API/cart-service';

const Cart = () => {
  const { loading, setLoading, getSneakers, sneakers, cart, setCart } = useContext(GlobalContextProvider);
  const [shipFee, setShipFee] = useState(100);

  const userId = sessionStorage.getItem('userId');
  const getUserCart = async () => {
    try {
      if (userId) {
        const res = await getCartAll(userId);
        setCart(res);
        setLoading(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSneakers();
  }, []);

  useEffect(() => {
    getUserCart();
  }, [cart]);

  const cartPrice = React.useMemo(
    () =>
      cart.reduce(
        (previousValue, currentValue) => previousValue + currentValue.productPrice * currentValue.quantity,
        0
      ),
    [cart]
  );

  const totalPrice = React.useMemo(() => cartPrice + shipFee, [cartPrice]);

  const [advertising, setAdvertising] = useState(true);
  return (
    <React.Fragment>
      {!loading ? (
        <Loading />
      ) : (
        <div className="my-5 container text-center">
          <div className="row">
            <div className="col-8">
              {advertising ? (
                <div className="bg-custom d-flex justify-content-between align-items-center py-1 px-3 mb-3">
                  <div className="text-start">
                    <p className="mb-1">FREE DELIVERY</p>
                    <p className="mb-1">Applies to orders of 5.000.000₫ or more. View details.</p>
                  </div>
                  <button className="btn-close float-end" onClick={() => setAdvertising(false)}></button>
                </div>
              ) : null}
              {cart.length ? (
                cart.map((cart, index) => <CartItems key={index} getUserCart={getUserCart} cart={cart} />)
              ) : (
                <div>Your cart is empty</div>
              )}
            </div>
            <div className="col-4">
              <div className="text-start">
                <h3>Summary</h3>
                <div className="w-100 d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p className="text-end">{`$${cartPrice}`}</p>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <p>Estimated Delivery & Handling</p>
                  <p className="text-end">{`$${shipFee}`}</p>
                </div>
                <hr />
                <div className="w-100 d-flex justify-content-between">
                  <p>Total</p>
                  <p className="text-end">{`$${totalPrice}`}</p>
                </div>
                <hr />
                <button className="w-100 btn btn-dark rounded-pill py-3 px-4">Checkout</button>
              </div>
            </div>

            <div className="text-start mt-5">
              <h3>You Might Also Like</h3>
              <div className="overflow-auto text-nowrap">
                {!loading ? (
                  <Loading />
                ) : (
                  sneakers.length &&
                  sneakers.slice(0, 7).map((sneaker, index) => (
                    <div key={index} className="w-25 d-inline-block p-2 text-wrap">
                      <ItemList sneaker={sneaker} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Cart;
