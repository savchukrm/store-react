import { useContext } from 'react';
import AppContext from '../context';

import styles from './Info.module.css';

const Info = ({ title, image }) => {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className={styles.info}>
      <img width={150} height={150} src={image} alt="bag" />
      <h3 className={styles.title}>{title}</h3>
      <button className="redButton" onClick={() => setCartOpened(false)}>
        keep shopping
      </button>
    </div>
  );
};

export default Info;
