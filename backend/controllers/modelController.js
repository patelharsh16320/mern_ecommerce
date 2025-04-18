const conn = require('../utils/db');

//! Display All data 
const getAllData = async (req, res) => {
    try {
        const tableName = req.params.table;
        const validTables = [
            'product_category',
            'product_inventory',
            'product_discount',
            'product',
            'user',
            'user_address',
            'user_payment',
            'shopping_session',
            'cart_item',
            'payment_details',
            'order_details',
            'order_items'
        ];

        if (!validTables.includes(tableName)) {
            return res.status(500).json({ message: 'Invalid Table Name...!' })
        }
        const query = `SELECT * FROM \`${tableName}\` WHERE 1`;
        conn.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' })
            }
            return res.status(201).json({ users: result,status: 201 });
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error on get all records', });
    }
}

module.exports = { getAllData }