import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../cryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@material-ui/core";
import { numberWithCommas } from "../components/Banner/Carausel";
// import ReactHtmlParser from 'react-html-parser';

// import ReactHtmlParser from 'react-html-parser'

// import React from 'react';

function HTMLRenderer({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}


function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState("");
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, [id]);
  console.log(coin)

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>
  return (
    <div className="coin__container">
      <div className="coin__sidebar">
        <img
        src={coin?.image?.large}
        alt={coin?.name}
        height="200"
        style={{marginBottom:20}}
        />
        <Typography variant="h3" className='coin__sidebar__title'>
        {coin.name}
        </Typography>
        <Typography  className='coin__sidebar__description' >
          
        <span> {coin?.description?.en.split('.')[0]}.</span>
        <span> {coin?.description?.en.split('.')[1]}.</span>
        
        </Typography>
        <div className="coin__sidebar__data">
          <span style={{display:"flex"}}>
            <Typography  variant="h5" className='coin__sidebar__title'>Rank: {coin?.market_cap_rank}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography  variant="h5" className='coin__sidebar__title'>Current Price: {symbol}{''}{numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}</Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography  variant="h5" className='coin__sidebar__title'>Market Cap: {symbol}{''}{numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M</Typography>
          </span>
        </div>
      </div>

      <CoinInfo coin={coin} />
    </div>
  );
}


export default CoinPage;
