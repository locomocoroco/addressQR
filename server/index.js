const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

app.use(cors());
app.use(express.json())
app.use(router);
app.get('*', (req, res) => {
    res.status(404).send('Sorry, not found');
  });

const SERVERPORT = process.env.PORT;

app.listen(SERVERPORT, (err) => {
   if (err) console.log(`smth went wrong ${SERVERPORT}`);
   else console.log(`listening on port ${SERVERPORT}`);
});