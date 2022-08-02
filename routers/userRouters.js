//check->true
const express = require('express');
const userRouter = express.Router();
const multer=require('multer');
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage} = require('../controller/userController');
const {signup,login,isAuthorised,protectRoute,resetpassword,forgetpassword,logout} = require('../controller/authController');

//user options
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)

userRouter
.route('/forgetpassword')
.post(forgetpassword)

userRouter
.route('/resetpassword/:token')
.post(resetpassword)

userRouter
.route('/logout')
.get(logout)

// profile page

const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      cb(new Error("Not an Image! Please upload an image"), false)
    }
  }

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
  });

userRouter.post("/ProfileImage", upload.single('photo') ,updateProfileImage);
  //get request
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile("/home/adarsh/practice/multer.html");
});

userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin specific
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)

module.exports=userRouter;
