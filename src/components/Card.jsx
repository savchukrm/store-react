import { useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import SkeletonBrowser from './SkeletonBrowser';
import SkeletonApp from './SkeletonApp';

import AppContext from '../context';

import styles from './Card.module.css';

function Card({
  id,
  name,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  isLoading = false,
}) {
  const { isItemAdded, isFavoriteAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, name, imageUrl, price };

  const isDesktop = useMediaQuery({ maxWidth: 555 });

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        isDesktop ? (
          <SkeletonApp />
        ) : (
          <SkeletonBrowser />
        )
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite} c>
              <img
                src={
                  isFavoriteAdded(id) ? 'img/liked.svg' : 'img/heart-off.svg'
                }
                alt="Is Favorite"
              />
            </div>
          )}
          <img className={styles.bag} src={imageUrl} alt="bag"></img>
          <h5 className={styles.title}>{name}</h5>
          <div className={styles.cardInfo}>
            <div className={styles.cardPrice}>
              <p>Price:</p>
              <b>{price}$</b>
            </div>
            {onPlus && (
              <img
                onClick={onClickPlus}
                className="button"
                width={28}
                height={28}
                src={
                  isItemAdded(id) ? 'img/tick_icon.svg' : 'img/plus_icon.png'
                }
                alt="plus-icon"
              />
            )}
          </div>{' '}
        </>
      )}
    </div>
  );
}

export default Card;
