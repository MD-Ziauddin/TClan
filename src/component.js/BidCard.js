import React, { useEffect, useState } from 'react';

const BidCard = (props) => {
  const [maxBid, setMaxBid] = useState(null);
  const [minBid, setMinBid] = useState(null);
  const [showMax, setShowMax] = useState(true);

  useEffect(() => {
    fetch('https://intense-tor-76305.herokuapp.com/merchants').then(
      async (result) => {
        let res = await result.json();
        // console.log(res);

        for (let i = 0; i < res.length; i++) {
          let lowest = Number.MAX_SAFE_INTEGER + 1,
            highest = Number.MIN_SAFE_INTEGER + 1;

          for (let j = 0; j < res[i].bids.length; j++) {
            if (lowest > res[i].bids[j].amount) {
              lowest = res[i].bids[j].amount;
            }
            if (highest < res[i].bids[j].amount) {
              highest = res[i].bids[j].amount;
            }
          }

          if (highest < 0) highest = 0;
          if (lowest > Number.MAX_SAFE_INTEGER) lowest = 0;

          res[i].highest = highest;
          res[i].lowest = lowest;
        }

        // console.log(res);
        let max = [...res];
        let min = [...res];
        setMaxBid(max.sort((a, b) => b.highest - a.highest));
        setMinBid(min.sort((a, b) => a.lowest - b.lowest));
        console.log(max);
      }
    );
  }, []);
  return (
    <div className='bidCards'>
      <button onClick={() => setShowMax((showMax) => !showMax)}>toggle</button>
      {showMax === true
        ? maxBid?.map((bid, idx) => {
            return (
              <div key={bid.id} className='bidCard'>
                <img src={bid.avatarUrl} alt='' className='bidCard__avatae' />
                <p className='bidCard__name'>
                  Full Name: {bid.firstname} {bid.lastname}
                </p>
                <p className='bidCard__name'>Email: {bid.email}</p>
                <p className='bidCard__name'>Phone: {bid.phone}</p>
                <p className='bidCard__name'>
                  Premium: {bid.hasPremium ? 'Yes' : 'No'}
                </p>
                <p className='bidCard__name'>Highed Bid: {bid.highest}</p>
              </div>
            );
          })
        : minBid?.map((bid, idx) => {
            return (
              <div key={bid.id} className='bidCard'>
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
              </div>
            );
          })}
    </div>
  );
};

export default BidCard;
