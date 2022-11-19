const { dbConf } = require("../config/db")

module.exports = {
    get: (req, res) => {
        dbConf.query(`SELECT pr.province, c.city, d.district, p.postalcode FROM postalcode p join district d on d.iddistrict=p.district_id
        join city c on c.idcity=d.city_id join province pr on pr.idprovince=c.province_id`,
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.status(200).send(result)
            })
    },
    getProvince: (req, res) => {
        dbConf.query(`SELECT * FROM province`,
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.status(200).send(result)
            })
    },
    getCity: (req, res) => {
        let idprovince = req.query.idprovince;

        dbConf.query(`SELECT * FROM city
        WHERE province_id=${dbConf.escape(idprovince)}`,
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.status(200).send(result)
            })
    },
    getDistrict: (req, res) => {
        let idcity = req.query.idcity;

        dbConf.query(`SELECT * FROM district
        WHERE city_id=${dbConf.escape(idcity)}`,
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.status(200).send(result)
            })
    },
    getPostalcode: (req, res) => {
        let iddistrict = req.query.iddistrict;

        dbConf.query(`SELECT * FROM postalcode
        WHERE district_id=${dbConf.escape(iddistrict)}`,
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.status(200).send(result)
            })
    },
    add: (req, res, next) => {
        let { full_address, province, idprovince, city, idcity, district, iddistrict, postalcode, idpostalcode } = req.body;

        dbConf.query(`INSERT INTO address (user_id, full_address, province, province_id, city, city_id, district, district_id, postalcode, postalcode_id)
        VALUES (${userId},
            ${dbConf.escape(full_address)},
            ${dbConf.escape(province)},
            ${dbConf.escape(idprovince)},
            ${dbConf.escape(city)},
            ${dbConf.escape(idcity)},
            ${dbConf.escape(district)},
            ${dbConf.escape(iddistrict)},
            ${dbConf.escape(postalcode)},
            ${dbConf.escape(idpostalcode)})`,
            (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }
                next()
            })
    }
}