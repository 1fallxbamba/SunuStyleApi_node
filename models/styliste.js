let connection = require('../config/database')

const bcrypt = require('bcrypt')
const saltRounds = 10;


class Styliste {

    constructor(row) {

        this.row = row

    }

    static all(callbackfn) {

        connection.query('SELECT * FROM couturier', (err, rows) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, rows.map((row) => new Styliste(row)))

            }

        })

    }


    static find(id, callbackfn) {

        connection.query('SELECT * FROM couturier WHERE id = ?', [id], (err, rows) => {

            if (err) throw err

            callbackfn(new Styliste(rows[0]))

        })

    }


    static search(name, callbackfn) {

        connection.query('SELECT * FROM couturier WHERE nom LIKE ?', ['%' + name + '%'], (err, rows) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, new Styliste(rows))

            }

        })

    }



    static register(user_data, callbackfn) {

        bcrypt.hash(user_data.pwd, saltRounds, (err, hash) => {

            if (err) {

                callbackfn(err)

            } else {

                connection.query('INSERT INTO user SET username = ?, password = ?', [user_data.uname, hash], (err, result) => {

                    if (err) {

                        callbackfn(err)

                    } else {

                        connection.query(`
                        INSERT INTO couturier SET nom = ?, numero_couturier = ?, nom_boutique = ?, adresse_boutique = ?`,
                            [user_data.name, user_data.uname, user_data.shopName, user_data.shopLoc],
                            (err, result) => {

                                if (err) {

                                    callbackfn(err)

                                } else {

                                    callbackfn(null, result)

                                }

                            })

                    }

                })

            }

        })

    }




}


module.exports = Styliste