const mysql = require("mysql");

const dbConf = mysql.createPool({
    host: "localhost",
    user: "tika",
    password: "Nurfatihasj18",
    database: "dbfamily"
})

module.exports = { dbConf }