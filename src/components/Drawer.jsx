import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { useCart } from '../hooks/useCart';
import Info from './Info';

import styles from './Drawer.module.css';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, items = [], onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://6351072b3e9fa1244e535a4a.mockapi.io/orders',
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          'https://6351072b3e9fa1244e535a4a.mockapi.io/cart/' + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert('Error during creation of an order');
    }
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

        {items.length > 0 ? (
          <>
            <div className={styles.items}>
              {items.map((obj) => (
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
                className="redButton"
                onClick={onClickOrder}
              >
                proceed to checkout
              </button>
            </div>
          </>
        ) : (
          <Info
            title={
              isOrderComplete
                ? `Your order #${orderId} has been successfully completed`
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
