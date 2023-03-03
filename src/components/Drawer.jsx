import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { removeItem, clearDrawer } from '../redux/drawer/slice';
import { addOrder } from '../redux/orders/slice';

import { v4 as uuidv4 } from 'uuid';

import Info from './Info';
import styles from './Drawer.module.css';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, opened }) => {
  const dispatch = useDispatch();

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { cells, totalPrice } = useSelector((state) => state.drawer);

  const onRemove = (a) => {
    dispatch(removeItem(a));
  };

  const onAddOrder = async () => {
    setIsLoading(true);
    await delay(1000);
    dispatch(addOrder(cells));
    dispatch(clearDrawer());
    setIsOrderComplete(true);
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <div className={styles.basketTop}>
          <h2 className={styles.name}>Shopping basket</h2>
          <img
            onClick={onClose}
            className="removeBtn"
            src="img/btn-off.svg"
            alt="remove"
          />
        </div>

        {cells.length > 0 ? (
          <>
            <div className={styles.items}>
              {cells.map((obj) => (
                <div key={uuidv4()} className={styles.cartItem}>
                  <img
                    className="mr-15"
                    width={86}
                    height={115}
                    src={obj.imageUrl}
                    alt="bag"
                  />
                  <div className="mr-20 flex">
                    <p className={styles.title}>{obj.name}</p>
                    <b>{obj.price}$</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-off.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div>
              <ul>
                <li className={styles.subtotal}>
                  <span>Subtotal</span>
                  <b>{totalPrice}$</b>
                </li>
                <li className={styles.shipping}>
                  <span>Shipping</span>
                  <b>For free</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onAddOrder}
                className="redButton"
              >
                proceed to checkout
              </button>
            </div>
          </>
        ) : (
          <Info
            title={
              isOrderComplete
                ? `Thank you for your purchase. You can see the order set in the section 'Profile'.`
                : 'You have no items in your shopping bag'
            }
            image={
              isOrderComplete ? 'img/success_icon.png' : 'img/empty_bag.png'
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
