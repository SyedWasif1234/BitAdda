import React from 'react'
import {useState , useEffect } from 'react'

import CoinTable from './CoinTable'

async function fetchData(){
   
}

const Homepage = () => {

  const[coinData , setCoinData] = useState([]);
  
  useEffect(() => {
    const fetchCoin = async()=>{
     try {
       const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
       const data = await res.json();   
       setCoinData(data);
     } catch (error) {
        console.log("error occured while fetching coins",error)
      }
    }
    fetchCoin();
    
  },[])

  console.log(coinData)

  return (
    <div className="min-h-screen flex flex-col items-center  px-2 dark:bg-base-100" >
      {coinData?.length > 0 ? <CoinTable coinData = {coinData} /> : (
            <div className='flex justify-center items-center h-screen'>
              <span className="loading loading-dots loading-xl"></span>
            </div>
    )}
    </div>
  )
}

export default Homepage
