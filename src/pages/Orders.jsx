import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import Card from '../components/Card';
import styles from './Orders.module.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
