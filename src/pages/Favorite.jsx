import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Card from '../components/Card';

import styles from './Favorite.module.css';

const Favorite = () => {
  const { items } = useSelector((state) => state.favorite);

  return (
    <div className={styles.favorite}>
      {items.length > 0 ? (
        <>
          <div className={styles.favoriteTop}>
            <Link to="/">
              <img width={35} height={35} src="img/back_icon.svg" alt="Back" />
            </Link>
            <h2 className={styles.title}>Wishlist</h2>
          </div>
          <div className={styles.cardsBlock}>
            {items.map((obj) => (
              <Card {...obj} onPlus={true} />
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
