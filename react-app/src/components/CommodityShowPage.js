import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { commodity, transaction, user } from '../services';
import {
  XYPlot,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
  XAxis,
  YAxis,
} from 'react-vis';


const makeDataPoint = (item) => {
  let y = item.last_price;
  let x = Date.parse(item.price_date) * 0.2;
  return { x, y };
};


const CommodityShowPage = (props) => {
  const [ error, setError ] = useState(null);
  const [ commodityItems, setCommodityItems ] = useState(null);
  const [ commodityInfo, setCommodityInfo ] = useState(null);
  const [ userCommodities, setUserCommodities ] = useState(null);
  const [ amount, setAmount ] = useState(1);
  const { symbol } = useParams();
  const history = useHistory();

  const fetchCommodity = async () => {
    const fetchCommodity = await commodity.getCommodity({ symbol });
    setCommodityInfo(fetchCommodity);
    const sorted = fetchCommodity.price_points.sort(
      (a, b) => Date.parse(a.price_date) - Date.parse(b.price_date)
    );
    setCommodityItems(sorted);
  };

  const fetchUserCommodities = async () => {
    const userCommodityInfo = await user.getUserCommodities( props.currentUser.id )
    setUserCommodities(userCommodityInfo)
  }

  useEffect(() => {
    fetchCommodity();
    fetchUserCommodities();
  }, []);

  if (commodityItems === null) return <h3>loading</h3>;

  const latestCommodityItem = commodityItems[commodityItems.length - 1];

  const dataPoints = commodityItems.map((commodityItem) =>
    makeDataPoint(commodityItem)
  );

  const handleChange = (e) => {
    if (e.target.value > 0) {
      setAmount(e.target.value);
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    if (parseFloat(props.currentUser.balance) < amount * latestCommodityItem.last_price) {
      setError("Not Enough Funds!")
      return;
    }
    
    await transaction.createTransaction({
      id: latestCommodityItem.commodity_id,
      amount,
      price: latestCommodityItem.last_price,
      buy_sell: true,
    });
    await props.authenticateUser()
    history.push('/home');
  };

  const handleSell = async (e) => {
    e.preventDefault();
    if (userCommodities[commodityInfo.name] === 0) {
      setError("You do not own any amount of this commodity.");
      return;
    } 

    if (userCommodities[commodityInfo.name] < amount) {
      setError("You do not own enough to sell this amount.");
      return;
    }

    await transaction.createTransaction({
      id: latestCommodityItem.commodity_id,
      amount,
      price: latestCommodityItem.last_price,
      buy_sell: false,
    });
    await props.authenticateUser()
    history.push('/home');
  };

  return (
    <div className="commodity-wrapper">
      <div className="home-content-wrapper">
        <div className="chart-page-wrapper">
          <div className="chart-wrapper">
            <XYPlot height={300} width={500} color={'#7289da'}>
              {/* <XAxis title="Date" /> */}
              {/* <YAxis /> */}
              <VerticalGridLines />
              <HorizontalGridLines />
              <LineSeries data={dataPoints} />
            </XYPlot>
          </div>
          <div className="label commodity-price">
            ${latestCommodityItem.last_price}
          </div>
          <form>
            <div className="label-wrapper">
              <label className="label">quantity</label>
              <input
                className="input"
                type="number"
                value={amount}
                onChange={handleChange}
              />
            </div>
            <button className="general-button-green" onClick={handleBuy}>
              Buy
            </button>
            <button className="general-button-green" onClick={handleSell}>
              Sell
            </button>
            <div className="error-disclaimer">
              {error}
            </div>
          </form>
        </div>
      </div>
      <div className="commodity-content-wrapper_card">
        <div className="label commodity-info-name_card">{commodityInfo.name}</div>
        <div className="commodity-price_card">
        Current Trading Price: ${latestCommodityItem.last_price}
        </div>
      </div>
    </div>
  );
};

export default CommodityShowPage;
