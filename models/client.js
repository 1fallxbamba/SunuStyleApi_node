let connection = require('../config/database')

class Client {

    constructor(row) {

        this.row = row

    }

    static sendMessage(m_data, callbackfn) {

        connection.query(`
        INSERT INTO message SET nom_client = ?, numero_client = ?, message = ?, couturier = ?`,
        [m_data.clientName, m_data.clientPhone, m_data.message, m_data.stylist], (err, result) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, result)

            }

        })


    }


    static order(orderData) {

        return Promise.all(orderData.products.map((product) => {

            return new Promise((resolve, reject) => {

                connection.query(`
                    INSERT INTO ordersonline SET
                    nom_modele = ?, couturier = ?, quantite = ?, prix = ?, code_client = ?, nom_client = ?, numero_client = ?, adresse_client = ?`,
                    [product.nom, product.num_tailleur, product.count, product.prix,
                    orderData.clientCode, orderData.clientName, orderData.clientPhone, orderData.clientLoc], (err, result) => {

                        if (err) {

                            reject(err)

                        } else {

                            resolve()

                        }

                    })

            })

        }))

    }


    // static order(orderData, callbackfn) {

    //     orderData.products.map((product) => {

    //         connection.query(`INSERT INTO ordersonline SET
    //             nom_modele = ?, couturier = ?, quantite = ?, prix = ?, code_client = ?, nom_client = ?, numero_client = ?, adresse_client = ?`,
    //             [product.nom, product.num_tailleur, product.count, 
    //             product.prix, orderData.clientCode, orderData.clientName, 
    //             orderData.clientPhone, orderData.clientLoc], (err, result) => {

    //                 if (err) {

    //                     callbackfn(err)

    //                 } else {

    //                     callbackfn(null, result)

    //                 }

    //             })

    //     })


    // }

}

module.exports = Client