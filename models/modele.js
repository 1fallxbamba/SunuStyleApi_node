let connection = require('../config/database')


class Modele {

    constructor(row) {

        this.row = row

    }

    static all(callbackfn) {

        connection.query('SELECT * FROM modele', (err, rows) => {

            if (err) {

                callbackfn(err) 

            } else {

                callbackfn(null, rows.map((row) => new Modele(row)))

            }


        })

    }


    static bestSellers(callbackfn) {

        connection.query('SELECT * FROM modele WHERE paid = ? ', ['Oui'] , (err, rows) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, rows.map((row) => new Modele(row)))

            }

        })

    }


    static find(id, callbackfn) {

        connection.query('SELECT * FROM modele WHERE id = ?', [id], (err, rows) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, new Modele(rows[0]))

            }

            

        } )

    }


    static search(name, callbackfn) {

        connection.query('SELECT * FROM modele WHERE nom LIKE ?', ['%' + name + '%'], (err, rows) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, new Modele(rows))

            }

            

        })

    }

    static byStylist(stylist_num, callbackfn) {

        connection.query('SELECT * FROM modele WHERE num_tailleur = ?', [stylist_num], (err, rows) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, new Modele(rows))

            }


        } )

    }


}


module.exports = Modele