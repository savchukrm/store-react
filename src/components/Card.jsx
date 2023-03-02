import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../redux/drawer/slice';
import { addFavorite } from '../redux/favorite/slice';

import { useMediaQuery } from 'react-responsive';

import SkeletonBrowser from './SkeletonBrowser';
import SkeletonApp from './SkeletonApp';

import styles from './Card.module.css';

function Card({ id, name, imageUrl, price }) {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ maxWidth: 555 });

  const { cells } = useSelector((state) => state.drawer);
  const { status } = useSelector((state) => state.data);
  const { items } = useSelector((state) => state.favorite);

  const obj = { id, name, imageUrl, price };

  const onClickAdd = () => {
    dispatch(addItem(obj));
  };
  const onClickFavorite = () => {
    dispatch(addFavorite(obj));
  };

  const findItem = cells.some((i) => i.id === obj.id);
  const findFavorite = items.some((i) => i.id === obj.id);

  return (
    <div className={styles.card}>
      {status === 'loading' ? (
        isDesktop ? (
          <SkeletonApp />
        ) : (
          <SkeletonBrowser />
        )
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite} c>
            <img
              src={findFavorite ? 'img/liked.svg' : 'img/heart-off.svg'}
              alt="Is Favorite"
            />
          </div>
          <img className={styles.bag} src={imageUrl} alt="bag"></img>
          <h5 className={styles.title}>{name}</h5>
          <div className={styles.cardInfo}>
            <div className={styles.cardPrice}>
              <p>Price:</p>
              <b>{price}$</b>
            </div>
            <img
              onClick={onClickAdd}
              className="button"
              width={28}
              height={28}
              src={findItem ? 'img/tick_icon.svg' : 'img/plus_icon.png'}
              alt="plus-icon"
            />
          </div>{' '}
        </>
      )}
    </div>
  );
}

export default Card;
