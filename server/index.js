const express = require("express");
const app = express();
const cors = require('cors');
const PORT = 2626;

app.use(express.json());
app.use(cors());

const configRouter = require('./routers');
app.use('/api', configRouter);

app.listen(PORT, () => {
    console.log("REST API is running on port :", PORT)
})