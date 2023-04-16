import _ from "lodash" ; 
import multer from "multer"; 

import {app} from "../config/app";
import {user} from "../services/index";
import { transSuccess, transValidation, transError } from "../../lang/vi";


let storageImageAvatar = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , app.image_user_directory);
    },
    filename: (req , file , cb) => {
        try{
            let math = app.image_type; 
            if(math.indexOf(file.mimetype) === -1){
                return cb("lỗi chọn file", null ,  )
            }
            let imageName =  `${Date.now()}-${Math.floor(Math.random() * 101)}-${file.originalname}`; 
            cb(null, imageName) ; 
        }catch(error){
            return cb("lỗi chọn file", null ,  )

        }

    }

}); 

let ImgAvatarUploadFile = multer({
    storage: storageImageAvatar,

}).single("avatarImg"); 

let regissterUser = async(req , res) => {
    if(_.isEmpty(req.body)){
        res.status(400).send(transValidation.data_empty)
    }else {
        let result = await user.createNew(req.body); 
        if(result){
            res.status(200).send(transSuccess.register_user(req.body.username)); 

        }else{
            res.status(500).send(transError.register_user); 

        }
    }
  

   
};

let loginUser = async(req, res) => {
    if(_.isEmpty(req.body)){
        res.status(400).send(transValidation.data_empty) ; 
    }else {
        try {
            let result = await user.loginUser(req.body); 
            if(result){
                res.status(200).send(result); 
    
            }else{
                res.status(500).send( transError.login_user); 
    
            }
        } catch (error) {
            res.status(500).send(error); 

        }
 
        
    }
}; 

let getNormalUser = async(req, res) => {
    if(_.isEmpty(req.params)) {
        res.send("lỗi");
    }else{  
        console.log(req.params.idUser);
        let result = await user.getNormalUser(req.params.idUser) ; 
        if(result){
            res.status(200).send({result: result, message: null}); 
        }else{
            res.send({result: false, message: "không tìm thấy dữ liệu"});
        }
    }
}

let updateImgUser = async(req, res)  => {
    // console.log(req);
    // console.log(req.body);
    // console.log(req.file);
    ImgAvatarUploadFile(req, res, async(error)=> {
        if(error){
            res.status(500).send("lỗi");
        }else{
            let idUser = req.params.idUser; 
            let namImage = req.file.filename; 
            let result = await user.updateImageUser(idUser, namImage);
            if(result)
                res.status(200).send({result: true, message: transSuccess.uploadImg});
            else
                res.status(200).send({result: true, message:transError.upImage});
        }
    })
}

let updateUser = async(req, res) => {
    
    if(_.isEmpty(req.body)){
        res.send(transValidation.data_empty);
    }else{

        let result = await user.updateUser(req.params.idUser, req.body);
        if(result){
            res.status(200).send(transSuccess.updateUser);
        }else{
            res.status(500).send(transError.updateUser); 
        }
    }
}

let checkPassUser = async(req, res) => {
    if(req.params.idUser && req.body.password){
        let idUser = req.params.idUser ;
        let password = req.body.password; 
        let result = await user.checkPassUser(idUser, password) ;
        if(result){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    }
}

let verifyEmail = async(req, res) => {
    if(!_.isEmpty(req.body)){
        let idUser = req.body.idUser; 
        let result = await user.verifyEmail(idUser); 
        res.send(result);
    }
    res.send(result);

}

let getListUser = async(req, res) => {
    let result = await user.getListUser() ; 
    if(result){
        res.status(200).send({result: result, message: null}); 
    }else{
        res.send({result: false, message: "không tìm thấy dữ liệu"});
    }
}
let getQuanity = async(req, res) => {
    let result = await user.getQuanity() ; 
    if(result){
        res.status(200).send({result: result, message: null}); 
    }else{
        res.send({result: false, message: "không tìm thấy dữ liệu"});
    }
}

export default  {regissterUser, loginUser, updateUser, checkPassUser, updateImgUser, getNormalUser, verifyEmail, getListUser, getQuanity} ; 
