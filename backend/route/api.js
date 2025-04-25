const express = require('express');
const router = express.Router();
const {
    Home,
    About
} = require('../controllers/auth');
const { getAllData } = require('../controllers/modelController');
const {
    createProduct,
    UpdateProduct,
    createProductCategory,
    createProductDiscount,
    createProductInventory,
    createProductSession,
    DeleteProduct,
    DeleteCategory,
    UpdateCategory
} = require('../controllers/productController');
const {
    createUser,
    creatUserAddress,
    userPayment,
    deleteUser
} = require('../controllers/userController');

//! Get API
router.route('/').get(Home);
router.route('/about').get(About);
router.route('/show-:table').get(getAllData);

//! Post APi
// Product 
router.route('/create-product').post(createProduct);
router.route('/create-product-category').post(createProductCategory);
router.route('/create-product-discount').post(createProductDiscount);
router.route('/create-product-inventory').post(createProductInventory);
router.route('/create-product-session').post(createProductSession);

router.route('/product-delete/:id').delete(DeleteProduct);
router.route('/category-delete/:id').delete(DeleteCategory);

router.route('/update-category').post(UpdateCategory);
router.route('/update-product').post(UpdateProduct);

// Users 
router.route('/create-user').post(createUser);
router.route('/create-user-address').post(creatUserAddress);
router.route('/user-payment').post(userPayment);
router.route('/user-delete/:id').delete(deleteUser);

module.exports = router;