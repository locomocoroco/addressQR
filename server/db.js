const mongoose = require('mongoose');

const DBNAME = process.env.DBNAME;
const DBPORT = process.env.DBPORT;

mongoose.connect(`mongodb://localhost:${DBPORT}/${DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log(`could not connect to db ${DBPORT} : ${DBNAME}!`);
    else console.log(`connected to db at ${DBPORT}`);
});

module.exports = mongoose;