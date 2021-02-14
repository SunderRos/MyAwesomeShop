const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/signin', userController.signIn);
router.get('/signup', userController.signup);
router.get('/', userController.homePage);
router.get('/admin', userController.adminPage);
router.get('/addproduct', userController.addProductPage);
router.get('/products', userController.getProduct);
router.get('/carts', userController.getCart);
router.get('/shoppingcartpage', userController.shoppingCartPage);
router.get('/historypage', userController.historyPage);
router.get('/getHistory', userController.getHistory);

router.post('/productpage', userController.productPage)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/createproduct', userController.createProduct);
router.post('/addToCart', userController.addToCart);
router.post('/logout', userController.logout);
router.post('/createUserComment', userController.createUserComment);
router.post('/updateProduct', userController.updateProduct);
router.post('/getUserComment', userController.getUserComment);
router.post('/deleteHistory', userController.deleteHistory);
router.post('/purchaseProduct', userController.purchaseProduct);
router.delete('/product/:productId', userController.deleteProduct);
router.delete('/deleteCart/:cartId', userController.deteleCart);

// router.post('/update', userController.update);


module.exports = router;