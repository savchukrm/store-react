import { Link, Outlet } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

import { useContext } from 'react';
import AppContext from '../context';

import styles from './Header.module.css';

function Header({ onClickCart }) {
  const { totalPrice } = useCart();
  const { favorites } = useContext(AppContext);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/">
            <div>
              <h3 className={styles.logo}>Bags store</h3>
              <p className={styles.p}>Store branded bags</p>
            </div>
          </Link>
        </div>
        <div className={styles.headerRight}>
          <ul className={styles.ul}>
            <li onClick={onClickCart} className={styles.mr20}>
              <img width={38} height={38} src="img/bag_icon.png" alt="Drawer" />
              <span>{totalPrice}$</span>
            </li>
            <li>
              <Link to="/favorites">
                <img
                  width={38}
                  height={38}
                  className={styles.mr20}
                  src={
                    favorites.length > 0
                      ? 'img/fill_heart.svg'
                      : 'img/heart_icon.svg'
                  }
                  alt="Favorites"
                />
              </Link>
              <Link to="/orders">
                <img
                  width={38}
                  height={38}
                  src="img/profile_icon.png"
                  alt="Profile"
                />
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
