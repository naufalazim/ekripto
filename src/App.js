import { selectOptions } from '@testing-library/user-event/dist/select-options';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Coin from './components/coinitem/Coin';





function App() {

  //set useState:
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");


  //Connect with axios:
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.error(error));
  }, []);


  //Create handleChange for searchbar:
  const handleChange = (e) => {
    setSearch(e.target.value);
  };


  //filter for searchbar typecase:
  const filteredCoins = coins.filter(
    (coin) => coin.name.toLowerCase().includes(search.toLowerCase())
  );


  //Body in web app:
  return (
    <div>
      <div className="header">
        <h1 className="brand">
           eKripto
        </h1>

      <h3 className='creator'>
      Created by <a href="https://www.linkedin.com/in/mohdnaufalazim/" target="_blank">Naufal Azim.</a>
      </h3>

      {/* SearchBar  */}
        <form>
          <input
            className="inputField"
            type="text"
            onChange={handleChange}
            placeholder="Find Crypto Coin"
          />
        </form>
      </div>

     

      <div className="coinContainer">

        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          ); 
        })}
      </div>
    </div>
  );
}


export default App;