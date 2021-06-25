import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BidCard from './component/BidCard';
import Paginate from './component/Pagination';
import CustomerBids from './component/CustomerBids';

import './App.css';
import './sass/main.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontWeight: 'bold',
  },
}));

const App = (props) => {
  const classes = useStyles();

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
      }
    );
  }, []);
  return (
    <Router>
      <div className='App'>
        {/* <button onClick={() => setShowMax((showMax) => !showMax)}>
          Swith Bid Amount Order
        </button> */}
        <AppBar position='sticky'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Biding Site
            </Typography>
            <Button
              color='inherit'
              onClick={() => setShowMax((showMax) => !showMax)}
            >
              Toggle
            </Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path='/'>
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
          </Route>
          {/* <Route path={'/bids'} component={CustomerBids} /> */}
          <Route path='/bids/:id'>
            <CustomerBids data={userBid} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
