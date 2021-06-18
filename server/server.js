const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const fs = require('fs');
const data = fs.readFileSync('nyc_ttp_pins.json', { encoding: 'utf-8' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/pins', async (req, res) => {
  const count = 10;

  try {
    let pins = JSON.parse(data);

    let randomIndex = Math.floor(Math.random() * (pins.length - count));

    res.status(200).send(pins.slice(randomIndex, randomIndex + count));
  } catch (error) {
    console.log('Error getting pins data', error);
  }
});

app.get('/api/pins/:term/', async (req, res) => {
  const count = 5

  try {
    let pins = JSON.parse(data);
    let filtered = pins.filter((pin) => {
      let str = JSON.stringify(pin.description)
      return str.includes(req.params.term);
    });

    let randomIndex = Math.floor(
      Math.random() * (filtered.length - count),
    );

    res
      .status(200)
      .send(filtered.slice(randomIndex, randomIndex + count));
  } catch (error) {
    console.log('Error getting pins data', error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
