const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const configRouter = require('./routers');
app.use('/api', configRouter);

app.listen(PORT, () => {
    console.log("REST API is running on port :", PORT)
})