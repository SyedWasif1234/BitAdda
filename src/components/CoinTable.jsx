import React from 'react'
import { useState , useMemo} from 'react'
import { Link } from 'react-router-dom'

const CoinTable = ({coinData}) => {

    const[search , setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1); 

    console.log("coindata: ",coinData);

    const filteredCoins = useMemo(() => {
        return (coinData || [])
        .filter((coin) =>
             coin.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [coinData, search]);

    const coinsPerPage = 10;
        const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);
        const paginatedCoins = useMemo(() => {
            return filteredCoins.slice(
            (currentPage - 1) * coinsPerPage,
            currentPage * coinsPerPage
            );
        }, [filteredCoins, currentPage]);



  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col justify-between items-center mt-20 mb-4 gap-4 w-full ">
            <input
            type="text"
            placeholder="Search coins..."
            className="input input-bordered w-full  bg-base-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* table */}
        <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="table table-zebra table-lg bg-base-200 text-base-content">
            <thead className="bg-base-300">
                <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Prise</th>
                <th>24h %</th>
                <th>Market Cap</th>
                </tr>
            </thead>
            <tbody>

                {/* Render paginated problems */}

            {paginatedCoins.length > 0 ? (
                paginatedCoins.map((coin , index) => {
                    return (
                    <tr key={coin.id}>
                        <td >{(index + 1)+ coinsPerPage * (currentPage - 1)}</td>
                        <td className='flex gap-2'>
                        <img src={coin.image} alt={coin.name} className="w-4 h-4 rounded-full mt-2" />
                        <Link to={`/coin/${coin.id}`} className="font-semibold hover:underline">
                            { coin.name}
                        </Link>
                        </td>
                        <td>{`$${coin.current_price}`}</td>
                        <td>{`${coin.price_change_percentage_24h}%`}</td>
                        <td>{`${(coin.market_cap/1e9).toFixed(2)}B`}</td>
                    </tr>
                    );
                })
                ) : (
                    <tr>
                    <td colSpan="5">No coins found</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* pagination */}
        <div className="flex justify-center mt-6 mb-10 gap-2">
            <button
            className="btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            >
            Prev
            </button>
            <span className="btn btn-ghost btn-sm">
            {currentPage} / {totalPages}
            </span>
            <button
            className="btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            >
            Next
            </button>
       </div>
    </div>
  )
}

export default CoinTable
