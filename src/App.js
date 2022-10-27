import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';

import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorite';
import Orders from './pages/Orders';
import Footer from './pages/Footer';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const category = categoryId ? `category=${categoryId}` : ' ';
      try {
        const itemResponse = await axios.get(
          `https://6351072b3e9fa1244e535a4a.mockapi.io/items?${category}`
        );
        const cartResponse = await axios.get(
          'https://6351072b3e9fa1244e535a4a.mockapi.io/cart'
        );
        const favoriteResponse = await axios.get(
          'https://6351072b3e9fa1244e535a4a.mockapi.io/favorites'
        );

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        alert('Error when requesting data');
      }
    }
    fetchData();
  }, [categoryId]);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://6351072b3e9fa1244e535a4a.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://6351072b3e9fa1244e535a4a.mockapi.io/cart',
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Error when requesting data');
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6351072b3e9fa1244e535a4a.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert('Error when deleting an item');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findFavorite = favorites.find(
        (favObj) => Number(favObj.parentId) === Number(obj.id)
      );
      if (findFavorite) {
        setFavorites((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://6351072b3e9fa1244e535a4a.mockapi.io/favorites/${findFavorite.id}`
        );
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post(
          'https://6351072b3e9fa1244e535a4a.mockapi.io/favorites',
          obj
        );
        setFavorites((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Error while adding the favorites');
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isFavoriteAdded = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
        isFavoriteAdded,
      }}
    >
      <div className="App clear">
        <div>
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
        </div>

        <Routes>
          <Route
            path="/"
            element={<Header onClickCart={() => setCartOpened(true)} />}
          >
            <Route
              index={true}
              element={
                <Home
                  items={items}
                  cartItems={cartItems}
                  searchValue={searchValue}
                  onAddToCart={onAddToCart}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorite={onAddToFavorite}
                  isLoading={isLoading}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
              }
            />
            <Route path="favorites" element={<Favorites />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer></Footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
