import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';

import AppContext from '../context';
import Card from '../components/Card';

import styles from './Favorite.module.css';

const Favorite = () => {
  const { favorites, onAddToCart } = useContext(AppContext);

  return (
    <div className={styles.favorite}>
      {favorites.length > 0 ? (
        <>
          <div className={styles.favoriteTop}>
            <Link to="/">
              <img width={35} height={35} src="img/back_icon.svg" alt="Back" />
            </Link>
            <h2 className={styles.title}>Wishlist</h2>
          </div>
          <div className={styles.cardsBlock}>
            {favorites.map((obj) => (
              <Card
                {...obj}
                key={uuidv4()}
                onPlus={(item) => onAddToCart(item)}
                favorited={true}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="emptyBlock">
          <div className={styles.info}>
            <h2 className="subtitleEmptyBlock">your wishlist is still empty</h2>
            <Link to="/">
              <button className="redButton">come back</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;
