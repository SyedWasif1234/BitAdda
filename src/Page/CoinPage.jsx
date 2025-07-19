import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import CoinChart from '../components/CoinChart';



const CoinPage = () => {
  const { id } = useParams();

  const [chart, setChart] = useState([]);
  const [coinData, setCoinData] = useState(null);
  const [day , setDay] = useState(" ");

   


  useEffect(() => {
    const fetchData = async () => {
      const chartRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
      );
      const chartData = await chartRes.json();
      console.log("chart data :", chartData);
      setChart(chartData.prices);

      const coinRes = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      const coinDetail = await coinRes.json();
      setCoinData(coinDetail);
    };

    fetchData();
  }, [id]);

  if (!coinData) return  <div className='flex justify-center items-center h-screen'>
              <span className="loading loading-dots loading-xl"></span>
            </div>

  const marketData = coinData.market_data;


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">{coinData.name}</h1>
          <p className="text-gray-500 uppercase">{coinData.symbol}</p>
        </div>
      </div>

      {/* Price and % change */}
      <div className="text-4xl font-bold mb-2">
        ${marketData.current_price.usd.toLocaleString()}
      </div>
      {typeof marketData.price_change_percentage_7d_in_currency?.usd === 'number' && (
        <p
            className={`font-medium mb-6 ${
            marketData.price_change_percentage_7d_in_currency.usd >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
        >
            <p className='text-gray-500 inline'>Last 7 Days:{' '}</p>
            {marketData.price_change_percentage_7d_in_currency.usd >= 0 ? '+' : '-'}
            {marketData.price_change_percentage_7d_in_currency.usd.toFixed(2)}%
        </p>
      )}

      {/* Chart (Fake line for now) */}
      <div className="h-32 bg-gradient-to-t from-base-300 to-transparent rounded-lg mb-10 relative overflow-hidden">
        <CoinChart chart={chart} />
      </div>

      {/* Stats */}
      <div className=' text-2xl font-semibold'>{`${coinData.name} stats`}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-base-300 pt-6">
        <div>
          <p className="text-gray-500">Market Cap</p>
          <p className="font-medium">${(marketData.market_cap.usd / 1e9).toFixed(2)}B</p>
        </div>
        <div>
          <p className="text-gray-500">Volume (24h)</p>
          <p className="font-medium">${(marketData.total_volume.usd / 1e9).toFixed(2)}B</p>
        </div>
        <div>
          <p className="text-gray-500">Circulating Supply</p>
          <p className="font-medium">{marketData.circulating_supply.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Total Supply</p>
          <p className="font-medium">{marketData.total_supply?.toLocaleString() || '—'}</p>
        </div>
        <div>
          <p className="text-gray-500">Max Supply</p>
          <p className="font-medium">{marketData.max_supply?.toLocaleString() || '—'}</p>
        </div>
        <div>
          <p className="text-gray-500">Fully Diluted Valuation</p>
          <p className="font-medium">${(marketData.fully_diluted_valuation?.usd / 1e9).toFixed(2)}B</p>
        </div>
        <div>
          <p className="text-gray-500">All Time High</p>
          <p className="font-medium">
            ${marketData.ath.usd.toLocaleString()} ({new Date(marketData.ath_date.usd).toDateString()})
          </p>
        </div>
        <div>
          <p className="text-gray-500">All Time Low</p>
          <p className="font-medium">
            ${marketData.atl.usd.toLocaleString()} ({new Date(marketData.atl_date.usd).toDateString()})
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
