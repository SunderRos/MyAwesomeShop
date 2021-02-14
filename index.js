const express = require('express');
const app = new express();
const port = 3000;
const router = require('./routes/admin');
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cookiePaser = require('cookie-parser');
const session = require('express-session');


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(__dirname + '/public'));

app.use(cookiePaser());
app.use(session({
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000*60*60,
        sameSite: true,
        secure: false

    },
    secret: "shh, it's a secrete",
    name: 'sid',
    saveUninitialized: true,
    resave: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
// app.post('/upload', function(req, res) {
//     let image;
//     let uploadPath;
//     console.log(__dirname);

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//       }
//     image = req.files.image;
//     uploadPath = __dirname + '/public/assets/uploads' + image.name;
//     image.mv(uploadPath, function(err){
//         return res.status(500).send(err);
//     });
// });

app.use(router);

mongoose.connect('mongodb+srv://user12:12345@cluster0.xf9dt.mongodb.net/myshop?retryWrites=true&w=majority', { useFindAndModify: true }).then(result =>{
    console.log('DB is connected');
    app.listen(port);
}).catch(err=>{
    console.log(err);
})


