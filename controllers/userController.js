const User = require('../models/userModels');
const Product = require('../models/productModels');
const Cart = require('../models/cartModel');
const UserComment = require('../models/userCommentModel');
const UserHistoryPurchase = require('../models/userHistoryPurchase');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const params = require('params');
const fs = require('fs');

exports.signIn = (req, res) =>{
    if(req.session.userId){
        User.findById(req.session.userId).then(result =>{
            res.redirect('/');
        }).catch(err =>{
            console.log(err)
        })
    }
    else{
        res.render('signin', error = false);
        console.log(error);
    }
    
}

exports.historyPage = (req, res) =>{
    if(req.session.userId){
        res.render('historypage');
    }
    else{
        res.redirect('/signin');
    }
}

exports.signup = (req, res) =>{
    res.render('signup', errorPassword = false, errorEmail = false, errorCheckbox = false, errorEmailExist = false, errorUsername = false, errorConfirmPassword = false, errorPasswordCompare = false, errorPasswordLenght = false);
}
exports.homePage = (req, res) =>{
    btnAlert = false;
    if(req.session.userId){
        btnAlert = true;
    }
    isAdmin = false;
    if(req.session.userId){
        isAdmin = req.session.admin;
    }
    userName = req.session.username
    res.render('homepage', {confirmAlert: btnAlert});
}

//to access the admin page, go to mongodb and change admin status to be true ! (required to create a user first to be able to change the status)
exports.adminPage = (req, res) =>{
    if(req.session.admin){
        res.render('adminpage');
    }
    else{
        res.json({"Message": "You're not admin"})
    }
    
}
exports.addProductPage = (req, res)=>{
    res.render('addproductpage', errFile = false, errProductName = false, errDetail = false, errCategory = false, errQuantity = false, errPrice = false);
}
exports.shoppingCartPage = (req, res)=>{
    if(req.session.userId){
        res.render('shoppingcartpage');
    }
    else{
        res.redirect('/signin');
    }
    
}
exports.productPage = (req, res)=>{
    btnAlert = false;
    if(req.session.userId){
        btnAlert = true;
    }
   
    console.log(btnAlert);
    const id = req.body.productId;
    Product.findById(id).then(result=>{
        console.log(result);
        console.log(id)
        res.render('productpage', {
            id: id,
            productName: result.productName,
            detail: result.detail,
            price: result.price,
            confirmAlert: btnAlert,
            userName: req.session.username
        });
    }).catch(err=>{
        console.log(err);
    })
}


exports.register = (req, res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const checkbox = req.body.checkbox;

    errorUsername = false;
    errorEmail = false;
    errorPassword = false;
    errorConfirmPassword = false;
    errorCheckbox = false;
    errorPasswordCompare = false;
    errorEmailExist = false;
    errorPasswordLenght = false;
    if(!username){
        errorUsername = true
    }
    if(!email){
        errorEmail = true
    }
    if(!confirmPassword){
        errorConfirmPassword = true
    }
    if(!password){
        errorPassword = true
    }
    if(!checkbox){
        errorCheckbox = true
    }

    if(password.length<3){
        errorPasswordLenght = true;
        res.render('signup');
    }
    else{
        const user = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10),
            checkbox: checkbox,
            admin: false,
        });
    
        if(confirmPassword == password){
            user.save().then(result =>{
                res.redirect('signin');
            }).catch(err=>{
                if(err.code == 11000){
                    res.render('signup', {errorEmailExist: true, message: '(Email is already existed!)'});
                }
                else{
                    res.render('signup');
                }
            });
        }
        else{
            res.render('signup', {errorPasswordCompare: true, message: '(Password and Confirm Password must be the same!)'});
        }
    }
    
}

exports.login = (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.find({email:email}).then(result=>{
        if(result.length){
            bcrypt.compare(password, result[0].password).then(isMatch=>{
                if(isMatch){
                    res.cookie('email', email, {expire: 3600*1000});
                    res.cookie('logged-time', new Date().toLocaleString(), {expire: 3600*1000});
                    req.session.userId = result[0]._id;
                    req.session.username = result[0].username;
                    req.session.admin = result[0].admin;
                    res.redirect('/');
                }
                else{
                    res.render('signin', {error: true, message: '(Email or password is wrong!)'});
                }
            })
        }
        else{
            res.render("signin", {error: true, message: '(Email or password is wrong!)'});
        }
    }).catch(err=>{
        console.log(err);
    });
}

exports.createProduct = (req, res)=>{
    const productName = req.body.productName;
    const quantity = req.body.quantity;
    const detail = req.body.detail;
    const category = req.body.category;
    const price = req.body.price;
    const uploadAt = new Date().toLocaleString();

    errPrice = false
    errProductName = false;
    errCategory = false;
    errFile = false;
    errDetail = false;
    errQuantity = false;
    
    if(!productName){
        errProductName = true;
    }
    if(!detail){
        errDetail = true;
    }
    if(!category){
        errCategory = true;
    }
    if(!quantity){
        errQuantity = true;
    }
    if(!price){
        errPrice = true
    }
    let image;
    let uploadPath;
    console.log(__dirname);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).render('addproductpage', {errFile:true, message: "No file is uploaded!"});
      }
    image = req.files.image;
   
    const product = new Product({
        productName: productName,
        quantity: quantity,
        detail: detail,
        category: category,
        uploadAt: uploadAt,
        price: price,
    });
    product.save().then(result =>{
        console.log("Product is added!");
        uploadPath = path.join(__dirname ,'../public/assets/upload/') + result._id+ '.png';
        console.log(uploadPath);
        image.mv(uploadPath, function(err){
            return res.status(500).send(err);
        });
        res.redirect('/admin');
    }).catch(err=>{
        console.log(err);
        res.render('addproductpage');
    })
}

exports.getProduct = (req, res)=>{
    Product.find().then(result =>{
        console.log(result);
        res.json(result);
    }).catch(err=>{
        console.log(err);
    })
}

exports.deleteProduct = (req, res)=>{
    const productId = req.params.productId;
    let deletePath = path.join(__dirname ,'../public/assets/upload/') + productId + '.png';
    console.log(deletePath);
    Product.findByIdAndDelete(productId, function(err){
        if(err) console.log(err);
        fs.unlink(deletePath, function(err){
            if(err) console.log(err);
            console.log('File is deleted!')
        })
        console.log('Successfull detete!');
        res.render('adminpage');
    });
}

exports.updateProduct=(req, res)=>{
    const id = req.body.productId;
    const productName = req.body.productName;
    const quantity = req.body.quantity;
    const detail = req.body.detail;
    const price = req.body.price;
    const category = req.body.category;
    const uploadAt = new Date().toLocaleString();

    let image;
    let uploadPath;
    console.log(__dirname);
    if (!req.files || Object.keys(req.files).length === 0) {
        Product.findByIdAndUpdate(id, {
            productName: productName,
            detail: detail,
            quantity: quantity,
            category: category,
            uploadAt: uploadAt,
            price: price,
        }).then(result =>{
            res.redirect('/admin')
        }).catch(err=>{
            console.log(err);
        })
    }
    else{
        image = req.files.image;

        Product.findByIdAndUpdate(id, {
            productName: productName,
            detail: detail,
            quantity: quantity,
            category: category,
            uploadAt: uploadAt,
            price: price,
        }).then(result =>{
            uploadPath = path.join(__dirname ,'../public/assets/upload/') + id+ '.png';
            console.log(uploadPath);
            image.mv(uploadPath, function(err){
                return res.status(500).send(err);
            });
            res.redirect('/admin')
        }).catch(err=>{
            console.log(err);
        })
    }
    
}

exports.addToCart = (req, res) =>{
    if(req.session.userId){
        const productId = req.body.productId;
        const userId = req.session.userId;
        const quantity = parseInt(req.body.quantity, 10);
        const productName = req.body.productName;
        const detail = req.body.detail;
        const price = req.body.price;

        Cart.findOne({productId: productId, userId: userId}).then(result =>{
            if(result){
                Cart.findByIdAndUpdate(result._id, {
                    quantity: quantity + result.quantity
                    
                }).then(result=>{
                    res.status(204).send();
                }).catch(err =>{
                    console.log(err);
                });
            }
            else{
                const cart = new Cart({
                    userId: userId,
                    productId: productId,
                    quantity: quantity,
                    productName: productName,
                    detail: detail,
                    price: price,
                });
        
                cart.save().then(result =>{
                    res.status(204).send();
                }).catch(err=>{
                    console.log(err);
                })
            }
        }).catch(err=>{
            console.log(err);
        });
    }
    else{
        res.redirect('/signin');
    }
    
}

exports.getCart = (req, res) =>{
    Cart.find({userId:req.session.userId}).then(result=>{
        console.log(result);
        res.json(result);
    }).catch(err=>{
        console.log(err);
    })
}
exports.deteleCart = (req,res)=>{
    const id = req.params.cartId
    Cart.findByIdAndDelete(id, function(err){
        if(err) console.log(err)
        console.log('Successfull detete!');
        res.json({success: true});
    })
}

exports.logout = (req, res)=>{
    req.session.destroy();
    res.redirect('/signin');
}

exports.createUserComment = (req, res) =>{
    if(req.session.userId){
        const productId = req.body.productId;
        const comment = req.body.comment;
        const postAt = new Date().toLocaleString();
        console.log(productId)
        console.log(comment)
        console.log(postAt)

        const userComment = new UserComment({
            username: req.session.username,
            productId: productId,
            comment: comment,
            postAt : postAt,
        });
        userComment.save().then(result=>{
            res.json({"message" : "success!", "data": result, success: true});
        }).catch(err=>{
            console.log(err);
        })
    }
    else{
        res.json({success: false});
    }
}

exports.getUserComment = (req, res) =>{
    const productId = req.body.productId;
    console.log(productId)
    UserComment.find({productId: productId}).then(result=>{
        console.log(result)
        res.json(result);
    }).catch(err =>{
        console.log(err);
    })
}

exports.purchaseProduct = (req, res)=>{
    Cart.find({userId: req.session.userId}).then(result=>{
        for(i=0; i<result.length; i++){
            historyPurchase = new UserHistoryPurchase({
                userId: result[i].userId,
                productId: result[i].productId,
                quantity: result[i].quantity,
                productName: result[i].productName,
                detail: result[i].detail,
                price: result[i].price,
                purchasedAt: new Date().toLocaleString(),
            });
            historyPurchase.save().then(result =>{
                console.log(result);
            }).catch(err=>{
                console.log(err);
            })
        }
        Cart.deleteMany({userId: req.session.userId}).then(function(){ 
                res.render('shoppingcartpage');
            }).catch(function(error){ 
                console.log(error); 
            }); 

    })
}
exports.deleteHistory = (req, res) =>{
    UserHistoryPurchase.collection.deleteMany({userId: req.session.userId}).then(result =>{
        res.render('historypage');
    }).catch(err =>{
        console.log(err);
    })
}

exports.getHistory = (req, res)=>{
    UserHistoryPurchase.find({userId: req.session.userId}).then(result =>{
        res.json(result);
    }).catch(err=>{
        console.log(err);
    })
}

// exports.update = (req, res)=>{
//     const productName = req.body.productName;
//     const detail = req.body.detail;
//     const quantity = req.body.quantity;
//     const category = req.body.category;
//     const uploadAt = new Date().toLocaleString();
//     const id = req.body.productId;
//     console.log(productName);
//     console.log(detail);
//     console.log(quantity);
//     console.log(category);
//     console.log(id);
//     Product.findByIdAndUpdate(id, {
//         productName: productName,
//         detail: detail,
//         quantity: quantity,
//         category: category,
//         uploadAt: uploadAt
//     }).then(result=>{
//         res.json({success: true});
//     }).catch(err=>{
//         console.log(err);
//     })
// }

// exports.purchaseProduct = (req, res)=>{
//     Cart.find({userId: req.session.userId}).then(result=>{
//         UserHistoryPurchase.collection.insertMany(result).then(success =>{
            
//             Cart.deleteMany({userId: req.session.userId}).then(function(){ 
//                 res.render('shoppingcartpage');
//             }).catch(function(error){ 
//                 console.log(error); 
//             }); 
            
//         }).catch(err =>{
//             console.log(err);
//         })
//     })
// }