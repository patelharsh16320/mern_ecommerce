const conn = require('../utils/db');

//! create product 
const createProduct = async (req, res) => {
    try {
        const { title, price, description, category, image, rating } = req.body;

        const query = `
            INSERT INTO products (
                title, price, description, category, image, rating_rate, rating_count, created_at, modified_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const [result] = await conn.promise().query(query, [
            title,
            price,
            description,
            category,
            image,
            rating?.rate || null,
            rating?.count || null
        ]);

        res.status(201).json({ message: 'Product created successfully', product_id: result.insertId, status: 201 });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error to create product', err,
            status: 500
        });
    }
};

//! create product category 
const createProductCategory = async (req, res) => {
    try {
        const { name, desc } = req.body;
        const query = `INSERT INTO product_category (name, \`desc\`, created_at, modified_at) VALUES (?,?,NOW(),NOW())`;

        const [result] = await conn.promise().query(query, [name, desc]);

        res.status(201).json({
            message: 'Product category created successfully',
            category_id: result.insertId,
            status: 201
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error to create product category', err,
            status: 500
        })
    }
}

//! create product discount 
const createProductDiscount = async (req, res) => {
    try {
        const { name, desc, discount_percent, active } = req.body;

        const query = `INSERT INTO product_discount(name,  \`desc\`, discount_percent, active, created_at, modified_at) VALUES (?,?,?,?,NOW(),NOW())`;

        const [result] = await conn.promise().query(query, [name, desc, discount_percent, active]);

        res.status(201).json({
            message: 'Product discount created successfully',
            category_id: result.insertId,
            status: 201
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error to create product discount', err,
            status: 500
        })
    }
}

//! create Product Inventory 
const createProductInventory = async (req, res) => {
    try {
        const { quantity } = req.body;

        const query = `INSERT INTO product_inventory( quantity, created_at, modified_at) VALUES (?,NOW(),NOW())`;

        const [result] = await conn.promise().query(query, [quantity]);

        res.status(201).json({
            message: 'Product Inventory created successfully',
            category_id: result.insertId,
            status: 201
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error to create product Inventory', err,
            status: 500
        })
    }
}

//! create Product Session 
const createProductSession = async (req, res) => {
    try {
        const { user_id, total } = req.body;

        const query = `INSERT INTO shopping_session( user_id, total, created_at, modified_at) VALUES (?,?,NOW(),NOW())`;

        const [result] = await conn.promise().query(query, [user_id, total]);

        res.status(201).json({
            message: 'Product Session created successfully',
            category_id: result.insertId,
            status: 201
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error to create product Session', err,
            status: 500
        })
    }
}

//! Delete Product  
const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conn.promise().query(`DELETE FROM product WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(201).json({
            message: 'Product and related orders deleted successfully',
            status: 201
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error while deleting Product', err,
            status: 500
        });
    }
};
//! Delete Product  
const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await conn.promise().query(`DELETE FROM product_category WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(201).json({
            message: 'Category and related orders deleted successfully',
            status: 201
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error while deleting Product', err,
            status: 500
        });
    }
};

module.exports = {
    createProduct, createProductCategory, createProductDiscount, createProductInventory, createProductSession,
    DeleteProduct, DeleteCategory
}
