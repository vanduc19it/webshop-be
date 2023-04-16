import _ from "lodash";  
import multer from "multer"; 

import {shop, order} from "../services/index" ; 
import {app} from "../config/app"; 
import {transError, transSuccess, transValidation} from "../../lang/vi";

let storageImageProduct = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , app.image_shop_directory);
    },
    filename: (req , file , cb) => {
        try{
            let math = app.image_type; 
            if(math.indexOf(file.mimetype) === -1){
                return cb("lỗi chọn file", null ,  )
            }
            let imageName =  `${Date.now()}-${Math.floor(Math.random() * 101)}-${file.originalname}`; 
            return cb(null, imageName) ; 
        }catch(error){
            return cb("lỗi chọn file", null ,  )

        }

    }

}); 
let ImgShopUploadFile = multer({
    storage: storageImageProduct,

}).single("img_shop"); 


let createNew = async(req , res) => {
    if(!_.isEmpty(req.body)){

        let checkShop = await shop.checkShopUserExit(req.body.idUser);
        console.log(checkShop)
        if(!checkShop){
            let data = {
                nameShop: req.body.nameShop,
                idUser: req.body.idUser,
                phone: String(req.body.phone),
                address: req.body.address
            }
            console.log(data);
            let result = await shop.createNew(data);
            console.log("chuẩn bị trả về kết quả nè");
            console.log(result);
            if(result){
                res.status(200).send({result: result, message: transSuccess.createNewShop(data.nameShop)});
            }
            else{
                res.send({result: false, message: transError.createNewShop}); 

            }
        }else{
            res.send({result:false, message: transError.existShop}); 
        }

    }else{
        res.send({result:false, message: transValidation.data_empty});
    }
    // ImgProductUploadFile(req, res, async(error)=> {
    //     if(error){
    //         res.send("lỗi ko upload được ảnh");
    //     }else{
            

    //     }
    // })

}; 

let getShopById = async(req, res) => {

    if(req.params.idShop){
        let idShop = req.params.idShop; 
        let result = await shop.getShopById(idShop); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: [], message: transError.error_data}); 
        }

    }else{
        res.send({result:[], message: transValidation.data_empty});
    }
}

let getShopByIdUser = async(req, res) => {

    if(req.params.idUser){
        let idUser = req.params.idUser; 
        let result = await shop.getShopByIdUser(idUser); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: [], message: transError.error_data}); 
        }

    }else{
        res.send({result:[], message: transValidation.data_empty});
    }
}; 

let updateShopImage = async(req, res) => {
    console.log("oke jlkjdsaaaaaaaaaaaaaaa")
    console.log(req) ; 
    ImgShopUploadFile(req, res, async(error)=> {
        if(error){
            res.send(transError.uploadImg);
        }else{
            if(!_.isEmpty(req.body)){
                let data_update = {
                    imgShop :req.file.filename,
                    updateAt: Date.now()
                };

                let filter = {
                    idUser: req.body.idUser,
                    _id: req.body.idShop
                };
        
                let result = await shop.updateShopImage(filter, data_update); 
                if(result){
                    res.status(200).send({result:true, message: transSuccess.update});
                }else{
                    res.send({result:false, message: transError.update});
                }
            }else{
                res.send({result:false, message: transValidation.data_empty});
            }
        
        }
    })
}

let updateShopInfor = async(req, res) => {
    if(!_.isEmpty(req.body)){
        let data_update = {
            nameShop: req.body.nameShop,
            phone: req.body.phone,
            address: req.body.address,
            updateAt: Date.now()
        };
        let filter = {
            idUser: req.body.idUser,
            _id: req.body.idShop
        }

        let result = await shop.updateShopInfor(filter, data_update); 
        if(result){
            res.status(200).send({result:true, message: transSuccess.update});
        }else{
            res.send({result:false, message: transError.update});
        }
    }else{
        res.send({result:false, message: transValidation.data_empty});
    }
}


let getStatistical = async(req, res) => {
    if(req.params.idShop){
        let result = await order.getStatisticalOrderByIdShop(req.params.idShop); 
        
        res.status(200).send(result)  
    }else{
        res.send("lỗi qq") ; 
    }

}

let countShop  = async(req, res) => {
    let result = await shop.countShop(); 
        console.log(result)
        if(result){
            res.send((result).toString());
        }else{
            res.send({result: [], message: transError.error_data}); 
        }
}

export default {
    createNew,
    getShopById,
    getShopByIdUser,
    updateShopInfor,
    updateShopImage,
    getStatistical,
    countShop
}
