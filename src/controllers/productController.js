import multer from "multer"; 
import _ from "lodash" ; 

import {product} from "../services/index"
import { transError, transSuccess, transValidation } from "../../lang/vi";
import {app} from "../config/app"; 

let storageImageProduct = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , app.image_product_directory);
    },
    filename: (req , file , cb) => {
        try{
            let math = app.image_type; 
            if(math.indexOf(file.mimetype) === -1){
                return cb("lỗi chọn file", null ,  )
            }
            let imageName =  `${Date.now()}-${file.originalname}`; 
            return cb(null, imageName) ; 
        }catch(error){
            return cb("lỗi chọn file", null ,  )

        }

    }

}); 

let ImgProductUploadFile = multer({
    storage: storageImageProduct,

}).single("image_product"); 

let createNewProduct = (req , res) => {
    console.log("đã gửi product") ; 
    console.log(req) ; 
    ImgProductUploadFile(req, res, async(error)=> {
        if (error instanceof multer.MulterError) {
            return res.send("lỗi multer"); 
        }else if(error){
            console.log(error);
            return res.send(transError.upImage);   
        }else{
            let newItem = {
                nameProduct: req.body.nameProduct,
                idShop: req.body.idShop,
                idCategory: req.body.idCategory,
                imageProduct: req.file.filename,
                classify: {
                    color: req.body.color,
                    size: req.body.size,
                    other: req.body.other,
                },
                price: req.body.price,
                quantity: req.body.quantity,
                description: req.body.description
            }

            let result = await product.addNewProduct(newItem) ; 
            if(result){
                res.status(200).send(transSuccess.addNewProduct);
            }else{
                res.status(500).send(transError.addNewProduct);
            }
        }
    }); 
}

let getProductById = async(req, res) => {
    if(req.query.idProduct){
        try {
            let result = await product.getProductById(req.query.idProduct) ; 
            if(result){
                res.status(200).send(result); 
            }else{  
                res.send(transError.product_detail)
            }
        } catch (error) {
            res.status(500).send(transError.product_detail)

        }
       
    }
    res.status(500).send()
}

let getAllProduct = async( req, res) => {
      
    if(req.params.page){
        let key_search = "" ; 
        if(req.query.search)
            key_search = req.query.search ; 
        if(req.query.idcategory)
            key_idCategory = req.query.idcategory ; 
        let result = await product.getAllProduct(req.params.page, key_search); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: false, message: transError.error_data});
        }
    }
} ; 

let updateProduct = async(req, res) => {
    console.log("update product"); 
    if(_.isEmpty(req.body)){
        
        res.send(transValidation.data_empty);
    }else{
        console.log(req.body) ; 
        let result = await product.updateProduct(req.params.idproduct, req.body);
        if(result){
            res.status(200).send({result: true, message: transSuccess.updateProduct});
        }else{
            res.send({result: false, message: transError.updateProduct}); 
        }
    }
}; 

let updateImage = async(req, res) => {
    
    ImgProductUploadFile(req, res, async(error)=> {
        if(error){
            res.status(500).send("lỗi");
        }else{
            console.log(req.body); 
            let idShop = req.body.idShop; 
            let nameImage = req.file.filename; 
            let idProduct = req.params.idproduct;
            let result = await product.updateImage(idShop,idProduct, nameImage);
            if(result)
                res.status(200).send({result: true, message:transSuccess.uploadImg});
            else
                res.send({result: false, message: transError.upImage});
        }
    })
};

let countProduct = async(req, res) => {
    let result = await product.getQuantityAllProduct(); 
    if(result){
        res.status(200).send({result: result, message: null});
    }
}; 

// let searchProduct = async(req, res) => {
//     console.log(req.query);
//     if(req.query.search){
//         let result = await product.searchProduct(req.query.search); 
//         res.status(200).send(result) ; 
//     }else{
//         res.send(transValidation.search_empty);

//     }
// }

let getProductByIdCategory = async(req, res) => {
    if(req.params.idCategory){
        let idCategory = req.params.idCategory; 
        let result = await product.getProductByIdCategory(idCategory);
        if(!_.isEmpty(result)){
            res.status(200).send({result: result, message: transSuccess.getProductByIdCateogry}); 

        }else{
            res.send({result: false, message: transError.getProductByIdCateogry})
        }
    }else{
        res.send({result: false, message: transValidation.data_empty});
    }
}

let getListProductByidShop = async(req, res) =>{
    if(req.params.page  || req.params.idShop){
        let idShop = req.params.idShop ; 
        let page = req.params.page;
        let result = await product.getProductByIdShop(page, idShop); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: false, message: transError.error_data});
        }
    }
}

export default {
    createNewProduct, 
    getProductById, 
    getAllProduct, 
    updateProduct, 
    updateImage, 
    countProduct, 
    // searchProduct,
    getProductByIdCategory, 
    getListProductByidShop
}; 

