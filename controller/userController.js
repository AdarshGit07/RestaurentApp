const userModel = require('../models/userModel');

module.exports.getUser=async function getUser(req,res){
    let id = req.id;
    let user= await userModel.findById(id);
    if(user){
       return res.json(user);
    }
    else{
       return res.json({
         message:'users not found'
       });
    }
}
    // res.send(users);

// module.exports.postUser=function postUser(req,res){
//     console.log(req.body); 
//     users = req.body; 
//     res.json({
//         message:"Data received successfully",
//         // user = req.body
//     })
// }

module.exports.updateUser=async function updateUser(req,res){
    // console.log("req.body->",req.body);
    try{
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataTobeUpdated = req.body;
    if(user){
        const keys=[];
        for(let key in dataTobeUpdated){
            keys.push(key);
        }

        for(let i=0;i<keys.length;i++){
            user[keys[i]]=dataTobeUpdated[keys[i]];
        }
        user.confirmPassword=user.password;
        const updatedData = await user.save();
        res.json({
            message: "data updated successfully",
            data:updatedData,
        });
    }
    else{
        res.json({message:"user not found"});
    }
    }
    catch(err){
       res.json({
        message:err.message,
       });
    }
}

module.exports.deleteUser=async function deleteUser(req,res){
    try{
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if(!user){
        res.json({
            message:'user not found'
         });
    }
    res.json({
      message:"data has been deleted",
      data:user,
    })
   }
   catch(err){
     res.json({
        message:err.message
     });
   }
   
}

module.exports.getAllUser=async function getAllUser(req,res){
    try{
    let users= await userModel.find();
    if(users){
        res.json({
            message:'Users retreived',
            data:users
        });
    }
   }   
   catch(err){
    res.json({message:err.message})
   }
}

module.exports.updateProfileImage=function updateProfileImage(req,res){
    res.json({
      message:'file uploaded succesfully'
    });
}
// function setCookies(req,res){
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('Cookies have been set');
// }

// function getCookies(req,res){
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send('cookies received');
// }
