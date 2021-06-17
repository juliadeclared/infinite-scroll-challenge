const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const fs = require('fs');
const data = fs.readFileSync('nyc_ttp_pins.json', { encoding: 'utf-8' });

app.use(express.json());
app.use(express.urlencoded());

app.get('/api/pins', async (req, res) => {
  try {
    let pins = JSON.parse(data);
    
    let randomIndex = Math.floor(Math.random() * (pins.length - 5));

    res.status(200).send(pins.slice(randomIndex, randomIndex + 5));
  } catch (error) {
    console.log('Error getting pins data', error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
