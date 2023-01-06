/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateBill } from 'src/API/bill-service';
import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IBillData } from 'src/store/interface';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

const BillDetails: React.FC = () => {
  const location = useLocation();
  const { bill } = location.state;
  const navigate = useNavigate();

  const serverPublic = 'http://localhost:5000/images/';

  const updateBillDetails = async (bill: IBillData) => {
    try {
      await updateBill(bill._id, { ...bill, status: 'Confirmed' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirm = (bill: IBillData) => {
    updateBillDetails(bill).then(() => navigate('/bill'));
  };

  console.log(bill._id);

  return (
    <React.Fragment>
      <div className="container p-5">
        <Grid container spacing={2}>
          <Grid xs={8} item>
            {bill.cart?.map((cart, index) => (
              <div key={index} className="d-flex gap-3 mb-3 align-items-center justify-content-between bg-fa">
                <img src={serverPublic + cart.productImage} alt="" width={150} />
                <div className="w-75">
                  <p>{cart.productName}</p>
                  <p>
                    Size: {cart.productSize} <span className="ms-4">Quantity: {cart.quantity}</span>
                  </p>
                </div>
                <p className="w-25">{`$${cart.productPrice}`}</p>
              </div>
            ))}
          </Grid>
          <Grid xs={4} item>
            <div className="ms-4 text-start">
              <h3>Summary</h3>
              <hr />
              <div className="w-100 d-flex justify-content-between">
                <h5>Total:</h5>
                <h5 className="text-end">{`$${bill.totalPrice}`}</h5>
              </div>
              <hr />
              <button className="w-100 btn btn-dark rounded-pill py-3 px-4" onClick={() => handleConfirm(bill)}>
                Confirm
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default BillDetails;