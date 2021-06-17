import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import { GridList, Typography } from '@material-ui/core';

import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Header from './components/Header';
import Pin from './components/Pin';
import OpenPin from './components/OpenPin';

function App() {
  const [pins, setPins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/pins/${searchTerm}`);

      if (searchTerm.length) {
        setPins(data);
      } else setPins([...pins, ...data]);

      console.log(data);
    } catch (error) {
      console.log('Error getting pins!', error);
    }
  };

  const customClick = (p) => {
    setShowModal(true);
    setSelectedPin(p);
  };

  useEffect(() => {
    getData();
  }, [searchTerm]);

  console.log(selectedPin);

  return (
    <>
      <Cursor />
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
        <Typography
          variant="h3"
          style={{ color: 'white', textAlign: 'center' }}
        >
          All out of kittens!
        </Typography>
      )}
    </>
  );
}

export default App;
