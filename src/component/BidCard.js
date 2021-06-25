import React from 'react';

import { Link } from 'react-router-dom';

const BidCard = ({ data, showMax }) => {
  let bid = data;
  return (
    // <div className='bidCards'>
    <>
      {
        showMax === true ? (
          // data.map((bid, idx) => {
          //     return (
          <Link to={`/bids/${bid.id}`} className='bidCard'>
            <img src={bid.avatarUrl} alt='' className='bidCard__avatar' />
            <p className='bidCard__name'>
              Full Name: {bid.firstname} {bid.lastname}
            </p>
            <p className='bidCard__name'>Email: {bid.email}</p>
            <p className='bidCard__name'>Phone: {bid.phone}</p>
            <p className='bidCard__name'>
              Premium: {bid.hasPremium ? 'Yes' : 'No'}
            </p>
            <p className='bidCard__name'>Highed Bid: {bid.highest}</p>
          </Link>
        ) : (
          //   );
          // })
          // data.map((bid, idx) => {
          //     return (
          <Link to={`/bids/${bid.id}`} key={bid.id} className='bidCard'>
            <img src={bid.avatarUrl} alt='' className='bidCard__avatae' />
            <p className='bidCard__name'>
              Full Name: {bid.firstname} {bid.lastname}
            </p>
            <p className='bidCard__name'>Email: {bid.email}</p>
            <p className='bidCard__name'>Phone: {bid.phone}</p>
            <p className='bidCard__name'>
              Premium: {bid.hasPremium ? 'Yes' : 'No'}
            </p>
            <p className='bidCard__name'>Lowest Bid: {bid.lowest}</p>
          </Link>
        )
        //   );
        // })
      }
    </>
    // </div>
  );
};

export default BidCard;
