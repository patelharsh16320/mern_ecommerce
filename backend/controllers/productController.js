const conn = require('../utils/db');

//! create product 
//! create product 
const createProduct = async (req, res) => {
    try {
        const { title, price, description, image, rating, category_id, inventory_id, discount_id } = req.body;

        console.log('title', title);
        console.log('price', price);
        console.log('description', description);
        console.log('image', image);
        console.log('rating', rating);
        console.log('category_id', category_id);
        console.log('inventory_id', inventory_id);
        console.log('discount_id', discount_id);

        const query = `
            INSERT INTO product (
                id, title, price, description, image, rating_rate, rating_count, 
                category_id, inventory_id, discount_id, created_at, modified_at, deleted_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)
        `;

        const [result] = await conn.promise().query(query, [
            null,                // id (auto-increment assumed)
            title,
            price,
            description,     
            image,
            rating?.rate || null,
            rating?.count || null,
            category_id || null,
            inventory_id || null,
            discount_id || null,
            null                 // deleted_at initially null
        ]);

        res.status(201).json({ 
            message: 'Product created successfully', 
            product_id: result.insertId, 
            status: 201 
        });

    } catch (err) {
        console.error('Error while inserting product:', err);
        res.status(500).json({
            message: 'Internal server error to create product',
            error: err.message,
            status: 500
        });
    }
};


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

const UpdateProduct = async (req, res) => {
    try {
        const {
            id,
            title,
            price,
            description,            
            image,
            rating_rate,
            rating_count,
            category_id,
            inventory_id,
            discount_id,
            deleted_at = null
        } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'Product ID is required',
                status: 400
            });
        }

        const query = `
            UPDATE product SET
                title = ?,
                price = ?,
                description = ?,
                image = ?,
                rating_rate = ?,
                rating_count = ?,
                category_id = ?,
                inventory_id = ?,
                discount_id = ?,
                modified_at = NOW(),
                deleted_at = ?
            WHERE id = ?
        `;

        const [result] = await conn.promise().query(query, [
            title,
            price,
            description,
            image,
            rating_rate,
            rating_count,
            category_id,
            inventory_id,
            discount_id,
            deleted_at,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Product not found or no changes made',
                status: 404
            });
        }

        res.status(201).json({
            message: 'Product updated successfully',
            status: 201
        });

    } catch (err) {
        console.log('err', err)
        res.status(500).json({
            message: 'Internal server error to update product',
            error: err,
            status: 500
        });
    }
};

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

//! Update Product  
const UpdateCategory = async (req, res) => {
    try {
        const { id, name, desc } = req.body;

        if (!id || !name || !desc) {
            return res.status(400).json({
                message: 'ID, name, and description are required',
                status: 400
            });
        }

        const query = `UPDATE product_category SET name = ?, \`desc\` = ?, modified_at = NOW() WHERE id = ?`;

        const [result] = await conn.promise().query(query, [name, desc, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Category not found',
                status: 404
            });
        }

        res.status(201).json({
            message: 'Product category updated successfully',
            status: 201
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error while updating category',
            error: err,
            status: 500
        });
    }
};

module.exports = {
    createProduct, createProductCategory, createProductDiscount, createProductInventory, createProductSession, UpdateProduct,
    DeleteProduct, DeleteCategory, UpdateCategory
}
