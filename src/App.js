import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { GridList, Typography } from '@material-ui/core';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Header from './components/Header';
import Pin from './components/Pin';
import OpenPin from './components/OpenPin';
import HomePageFade from './components/HomePageFade';

function App() {
  const [pins, setPins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/pins/${searchTerm}`);

      // if there is a search, only populate page with searched images, and remove all others
      if (searchTerm.length) {
        setPins(data);
      } else setPins([...pins, ...data]);
    } catch (error) {
      console.log('Error getting pins!', error);
    }
  };

  const getFirstData = async () => {
    try {
      const { data } = await axios.get(`/api/pins/`);
      setPins(data);
    } catch (error) {
      console.log('Error getting pins!', error);
    }
  };

  const customClick = (p) => {
    setShowModal(true);
    setSelectedPin(p);
  };

  useEffect(() => {
    getFirstData();

    // eslint-disable-next-line
  }, [searchTerm]);

  return (
    <>
      <Cursor />
      <HomePageFade />
      <Header setSearchTerm={setSearchTerm} />
      {selectedPin && (
        <OpenPin pin={selectedPin} show={showModal} setShow={setShowModal} />
      )}
      {pins.length ? (
        <InfiniteScroll
          dataLength={pins.length}
          next={getData}
          hasMore={true}
          loader={<Loader />}
        >
          <GridList
            cols={5}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {pins.map((pin) => (
              <Pin
                url={pin.images.orig.url}
                key={pin.id}
                pinInfo={pin}
                customClick={() => customClick(pin)}
              />
            ))}
          </GridList>
        </InfiniteScroll>
      ) : (
        searchTerm.length && (
          <Typography
            variant="h3"
            style={{ color: 'white', textAlign: 'center' }}
          >
            All out of kittens!
          </Typography>
        )
      )}
    </>
  );
}

export default App;
