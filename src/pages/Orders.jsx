import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import Card from '../components/Card';
import styles from './Orders.module.css';

const Orders = () => {
  const { orders } = useSelector((state) => state.orders);

  const isLoading = false;

  return (
    <div className={styles.order}>
      <div>
        {orders.length > 0 ? (
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
                <h4 className={styles.h4}>
                  Order{' '}
                  <span className={styles.span}>
                    #{Math.floor(100000 + Math.random() * 900000)}
                  </span>{' '}
                  for the amount of{` `}
                  <span className={styles.span}>
                    {obj
                      .map((obj) => obj.price)
                      .reduce((sum, price) => sum + Number(price), 0)}
                    $
                  </span>
                </h4>
                <div className={styles.card}>
                  {obj.map((obj) => (
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
