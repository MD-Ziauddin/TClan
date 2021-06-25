import React, { useEffect, useState } from 'react';

import BidCard from './component/BidCard';
import Paginate from './component/Pagination';

import './App.css';
import './sass/main.scss';

const App = () => {
  const [maxBid, setMaxBid] = useState(null);
  const [minBid, setMinBid] = useState(null);
  const [userBid, setUserBid] = useState(null);
  const [showMax, setShowMax] = useState(true);

  useEffect(() => {
    fetch('https://intense-tor-76305.herokuapp.com/merchants').then(
      async (result) => {
        let res = await result.json();
        // console.log(res);
        setUserBid(res);

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
    <div className='App'>
      <button onClick={() => setShowMax((showMax) => !showMax)}>toggle</button>
      <Paginate
        data={userBid}
        RenderComponent={BidCard}
        highestBid={maxBid}
        lowestBid={minBid}
        title='Post'
        pageLimit={3}
        dataLimit={5}
        show={showMax}
      />
    </div>
  );
};

export default App;
