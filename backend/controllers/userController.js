const conn = require('../utils/db');

//! User create 
const createUser = async (req, res) => {
    try {
        const { email, password, first_name, last_name, mobile } = req.body;
        const query = `INSERT INTO user(email, password, first_name, last_name, mobile, created_at, modified_at) VALUES (?,?,?,?,?,NOW(),NOW())`;
        const [result] = await conn.promise().query(query, [
            email, password, first_name, last_name, mobile
        ]);

        res.status(201).json({ message: 'User created successfully', user_id: result.insertId, status: 201 });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error to User create', status: 500 })
    }
}
//! User Address 
const creatUserAddress = async (req, res) => {
    try {
        const { user_id, address_line1, address_line2, city, postal_code, country, mobile } = req.body;
        const query = `INSERT INTO user_address(user_id, address_line1, address_line2, city, postal_code, country, mobile) VALUES (?,?,?,?,?,?,?)`;

        const [result] = await conn.promise().query(query, [
            user_id, address_line1, address_line2, city, postal_code, country, mobile
        ]);

        res.status(201).json({ message: 'User Address created successfully', user_id: result.insertId, status: 201 });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error to User create', status: 500 })
    }
}

//! Create Payment  
const userPayment = async (req, res) => {
    try {
        const { user_id, payment_type, provider, account_no, expiry } = req.body;

        const query = `INSERT INTO user_payment(user_id, payment_type, provider, account_no, expiry) VALUES (?,?,?,?,?)`;
        const [result] = await conn.promise().query(query, [
            user_id, payment_type, provider, account_no, expiry
        ]);

        res.status(201).json({ message: 'User Payment created successfully', user_id: result.insertId, status: 201 });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error to User create', status: 500 })
    }
}

//! Delete User 
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Step 1: Delete orders related to the user
        await conn.promise().query(`DELETE FROM order_details WHERE user_id = ?`, [id]);

        // Step 2: Delete the user
        const [result] = await conn.promise().query(`DELETE FROM user WHERE id = ?`, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found', status: 404 });
        }

        res.status(201).json({ message: 'User and related orders deleted successfully', status: 201 });

    } catch (err) {
        res.status(500).json({ message: 'Internal server error while deleting user', status: 500 });
    }
};


module.exports = {
    createUser, creatUserAddress, userPayment, deleteUser
}
