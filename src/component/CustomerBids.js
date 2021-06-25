import React from 'react';
import { withRouter } from 'react-router-dom';

const CustomerBids = (props) => {
  let id = props.match.params.id;
  let userBid = props.data?.filter((obj) => obj.id === id)[0];
  console.log(userBid);

  return (
    <div className='customer'>
      <img src={userBid.avatarUrl} alt='' className='customer__avatar' />
      <p className='customer__name'>
        Name: {userBid?.firstname} {userBid?.lastname}
      </p>
      <p className='customer__name'>Email: {userBid?.email}</p>
      <p className='customer__name'>Phone: {userBid?.phone}</p>
      <p className='customer__name'>
        Premium: {userBid?.hasPremium ? 'Yes' : 'No'}
      </p>
      <p className='customer__name'>Highed Bid: {userBid?.highest}</p>
      <p className='customer__name'>Lowest Bid: {userBid?.lowest}</p>

      <div className='customer__bids'>
        {userBid.bids.map((bid, idx) => {
          return (
            <div className='customer__bid' key={bid.id}>
              <p className='customer__bid--carTitle'>
                Car Title: {bid.carTitle}
              </p>
              <p className='customer__bid--amount'>Amount: {bid.amount}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(CustomerBids);
