const { dbConf } = require("../config/db")

module.exports = {
    all: (req, res) => {
        dbConf.query(`Select distinct u.*, a.city, d.name as dad_name, m.name as mom_name from user u 
        JOIN child c on c.child_id=u.iduser
        JOIN family f on c.family_id=f.idfamily
        JOIN user m on m.iduser=f.mom_id
        JOIN user d on d.iduser=f.dad_id
        JOIN address a on a.user_id=u.iduser`,
            (err, results) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.status(200).send(results)
            })
    },
    add: (req, res, next) => {
        console.log('mw add')

        let { name, phone_number, birth_date, mom, dad, gender } = req.body;

        dbConf.query(`INSERT INTO user(name, gender, phone_number, birth_date) 
        SELECT ${dbConf.escape(name)},
        ${dbConf.escape(gender)},
        ${dbConf.escape(phone_number)},
        ${dbConf.escape(birth_date)}
            FROM dual
            WHERE NOT EXISTS (SELECT * FROM user
                                WHERE name = ${dbConf.escape(name)})`,
            (err, results) => {
                if (err) {
                    return res.status(500).send('MW add fail', err)
                }

                if (results.insertId != 0) {
                    console.log('data belum tersedia, mw add data success')

                    userId = results.insertId
                    next()
                } else {
                    dbConf.query(`Select f.mom_id, u.iduser from family f join child c on c.family_id = f.idfamily
                            join user u on u.iduser = c.child_id
                            where u.name=${dbConf.escape(name)}`,
                        (err, results) => {
                            if (err) {
                                return res.status(500).send('MW cek nama fail', err)
                            }

                            if (JSON.stringify(results) != '[]') {
                                return res.status(200).send({
                                    success: false,
                                    message: "data already existed"
                                })
                            } else {
                                dbConf.query(`UPDATE user 
                                        SET birth_date=${dbConf.escape(birth_date)},
                                        phone_number=${dbConf.escape(phone_number)}
                                        WHERE name=${dbConf.escape(name)}`,
                                    (err, results) => {
                                        if (err) {
                                            return res.status(500).send('MW cek nama fail', err)
                                        }

                                        dbConf.query(`SELECT iduser from user where name=${dbConf.escape(name)}`,
                                            (err, results) => {
                                                if (err) {
                                                    return res.status(500).send('MW cek nama fail', err)
                                                }
                                                userId = results[0].iduser;
                                                next()
                                            }
                                        )
                                    })
                            }
                        })
                }
            })
    },
    addMom: (req, res, next) => {
        console.log('mw mom')

        let { mom, gender } = req.body;
        dbConf.query(`INSERT INTO user(name, gender) 
        SELECT ${dbConf.escape(mom)},${dbConf.escape(gender)}
            FROM dual
            WHERE NOT EXISTS (SELECT * FROM user
                                 WHERE name = ${dbConf.escape(mom)}
                                   )`,
            (err, results) => {
                if (err) {
                    return res.status(500).send('MW addMom fail', err)
                }

                if (results.insertId == 0) {
                    dbConf.query(`SELECT iduser from user WHERE name = ${dbConf.escape(mom)}`,
                        (err, results) => {
                            if (err) {
                                return res.status(500).send(err)
                            }
                            mom_id = results[0].iduser
                            console.log('mom id yang sudah exist', mom_id)
                            console.log('results yang sudah exist', results)

                            next()
                        })
                } else {
                    mom_id = results.insertId
                    console.log('mom id baru', mom_id)

                    next()
                }

            })
    },
    addDad: (req, res, next) => {
        console.log('mw addad')

        let { dad, gender } = req.body;
        dbConf.query(`INSERT INTO user(name, gender) 
        SELECT ${dbConf.escape(dad)},${dbConf.escape(gender)}
            FROM dual
            WHERE NOT EXISTS (SELECT * FROM user
                                 WHERE name = ${dbConf.escape(dad)}
                                   )`,
            (err, results) => {
                if (err) {
                    return res.status(500).send('MW addDad fail', err)
                }

                if (results.insertId == 0) {
                    dbConf.query(`SELECT iduser from user WHERE name = ${dbConf.escape(dad)}`,
                        (err, results) => {
                            if (err) {
                                return res.status(500).send(err)
                            }
                            dad_id = results[0].iduser
                            next()
                        })
                } else {
                    dad_id = results.insertId
                    next()
                }
            })
    },
    addFamily: (req, res, next) => {
        console.log('mw addfam')
        console.log(dad_id, mom_id)

        dbConf.query(`INSERT INTO family(dad_id,mom_id) 
    SELECT ${dad_id},${mom_id}
        FROM dual
        WHERE NOT EXISTS (SELECT * FROM family
                             WHERE dad_id = ${dad_id} AND mom_id=${mom_id} 
                               )`,
            (err, results) => {
                if (err) {
                    return res.status(500).send('MW addFamily fail', err)
                }

                if (results.insertId == 0) {
                    console.log('mw addfam exist')

                    dbConf.query(`SELECT idfamily from family WHERE dad_id = ${dad_id}`,
                        (err, results) => {
                            if (err) {
                                return res.status(500).send(err)
                            }
                            console.log('mw addfam exist + get idfam', results.idfamily)

                            family_id = results[0].idfamily
                            next()
                        })
                } else {
                    console.log('mw addfam new', results.insertId)

                    family_id = results.insertId
                    next()
                }
            })
    },
    addChild: (req, res) => {
        console.log('mw addchild')
        console.log(userId, family_id)

        dbConf.query(`INSERT INTO child(child_id,family_id) 
        SELECT ${userId},${family_id}
            FROM dual
            WHERE NOT EXISTS (SELECT * FROM child
                                 WHERE child_id = ${userId}
                                   )`,
            (err, results) => {
                if (err) {
                    return res.status(500).send('MW addFamily fail', err)
                }

                res.status(200).send({
                    success: true,
                    message: 'add data succes'
                })
            })
    }
}