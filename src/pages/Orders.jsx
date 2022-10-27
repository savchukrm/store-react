import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

import axios from 'axios';

import Card from '../components/Card';
import styles from './Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://6351072b3e9fa1244e535a4a.mockapi.io/orders'
        );
        setOrders(data.map((obj) => obj));
        setIsLoading(false);
      } catch (error) {
        alert('Error when requesting orders');
        console.error(error);
      }
    })();
  }, []);
  return (
    <div className={styles.order}>
      <div>
        {isLoading ? (
          <div className={styles.loading}>
            <h2>Is loading...</h2>
          </div>
        ) : orders.length > 0 ? (
          <>
            {' '}
            <div className={styles.orderTop}>
              <Link to="/">
                <img
                  width={35}
                  height={35}
                  src="img/back_icon.svg"
                  alt="Back"
                />
              </Link>
              <h2 className={styles.title}>Your orders</h2>
            </div>{' '}
            {orders.map((obj) => (
              <div className={styles.block} key={uuidv4()}>
                <h3 className="mb-20">
                  Order #{obj.id} for the amount of{' '}
                  {obj.items
                    .map((obj) => obj.price)
                    .reduce((sum, price) => sum + Number(price), 0)}
                  ${' '}
                </h3>
                <div className={styles.card}>
                  {obj.items.map((obj) => (
                    <Card key={uuidv4()} {...obj} loading={isLoading} />
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="emptyBlock">
            <h2 className="subtitleEmptyBlock">
              you don't have any orders yet
            </h2>
            <Link to="/">
              <button className="redButton">come back</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
