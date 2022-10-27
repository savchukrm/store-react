import { v4 as uuidv4 } from 'uuid';

import Card from '../components/Card';

import styles from './Home.module.css';

const data = [
  { name: 'All bags' },
  { name: 'Guess' },
  { name: 'Michael Kors' },
  { name: 'Tommy Hilfiger' },
  { name: 'Saint Laurent' },
];

function Home({
  items,
  searchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
  categoryId,
  setCategoryId,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((item) => (
      <Card
        key={uuidv4()}
        {...item}
        onPlus={(item) => onAddToCart(item)}
        onFavorite={(obj) => onAddToFavorite(obj)}
        isLoading={isLoading}
      />
    ));
  };

  return (
    <div>
      <div className={styles.homeTop}>
        <ul className="tags">
          {data.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? 'active' : ''}
              key={uuidv4()}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <div className={styles.search}>
          <img src="img/search_icon1.png" alt="search"></img>
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className={styles.cardsBlock}>{renderItems()}</div>
    </div>
  );
}

export default Home;
