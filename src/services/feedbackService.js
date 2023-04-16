import feedbackModel from "../models/FeedbackModel" ; 
import {app} from "../config/app";
import userModel from "../models/userModel";
import ProductModel from "../models/ProductModel";

const limit_feedback = app.limit_feedback; 
let createNew = (item) => {
    console.log("service") ;

    return new Promise( async(resolve, reject) => {
        try {
            
            let data1 = await ProductModel.findProductById(item.idProduct) ; 
            let data = {
                idUser: item.idUser,
                product: {
                    idProduct: item.idProduct,
                    idShop: data1.idShop
                },
                rate: item.rate,
                comment: item.comment
            }; 
            let result = await feedbackModel.createNew(data) ; 

            console.log(result);  
            if(result){
                resolve(true); 
            }else{
                resolve(false);
            } 
        } catch (error) {
            reject(error) ; 
        }

    }); 
}
let getfeedback = async(page, idProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            let count_feedback = await feedbackModel.getCountFeedBack(idProduct);
            console.log(count_feedback)
            if(page == "all"){
                let result = await feedbackModel.getFeedBack(1,idProduct, count_feedback);
                let newResult = result.map(async(item) => {
                    let userInfor = await userModel.findUserById(item.idUser);                            
                    item = {
                        "_id": item._id,
                        "user": {
                            _idUser: userInfor._id,
                            email: userInfor.local.email,
                            username: userInfor.username,
                            avatar: userInfor.avatar
                        }, 
                        "idProduct": item.product.idProduct,
                        "rate": item.rate,
                        "comment": item.comment,
                        "createAt": item.createAt,
                        "updateAt": item.updateAt,
                        "deleteAt": item.deleteAt

                    }; 

                    return item; 
                }); 
                let result1 = await Promise.all(newResult);
                resolve(result1);

            }else if(!isNaN(page)){
                let current_page = page; 
                if(count_feedback){
                        let total_page = Math.ceil((count_feedback / limit_feedback)); 
                        if (current_page > total_page){
                            resolve(false); 
                        }
                        else if (current_page < 1){
                            current_page = 1;
                        }
                         
                        let skipNumber = (current_page -1) * limit_feedback;
                        let result = await feedbackModel.getFeedBack(skipNumber,idProduct, limit_feedback);
                        let newResult = result.map(async(item) => {
                            let userInfor = await userModel.findUserById(item.idUser);                            
                            item = {
                                "_id": item._id,
                                "user": {
                                    _idUser: userInfor._id,
                                    email: userInfor.local.email,
                                    username: userInfor.username,
                                    avatar: userInfor.avatar
                                }, 
                                "idProduct": item.product.idProduct,
                                "rate": item.rate,
                                "comment": item.comment,
                                "createAt": item.createAt,
                                "updateAt": item.updateAt,
                                "deleteAt": item.deleteAt

                            }; 

                            return item; 
                        }); 
                        let result1 = await Promise.all(newResult);
                        // setTimeout(() => { console.log(newResult); }, 5000);

                        resolve(result1) ; 
                
                }else{
                    resolve(false);
                }
            }else{
                resolve(false); 
            }
           
        } catch (error) {
            reject(false);
        }
        
    }); 
}


// thống kê theo id product
let getStatiFeedBackByIdProduct = async(idProduct) => {
    return new Promise(async (resolve, reject) => {
        console.log("service") ; 
        try {
           let result = await feedbackModel.getNormalFeedBack(idProduct); 
           let star = {
            star_1 : 0, 
            star_2 : 0, 
            star_3 : 0, 
            star_4 : 0, 
            star_5 : 0, 
           }
           result.map((item) => {
            if(item.rate === 1)
                star.star_1 += 1  ;
            else if(item.rate === 2)
                star.star_2 += 1  ;
            else if(item.rate === 3)
                star.star_3 += 1  ;
            else if(item.rate === 4)
                star.star_4 += 1  ;
            else if(item.rate === 5)
                star.star_5 += 1  ;
           })
           let result_ = {
                quanityFeedback: result.length,
                star: star,
           }
           resolve(result_) ; 
        } catch (error) {
            reject(false);
        }
        
    }); 
}

let getStatiFeedBackByIdShop = async(idShop) => {
    return new Promise(async (resolve, reject) => {
        console.log("service") ; 
        try {
           let result = await feedbackModel.getStatiFeedBackByIdShop(idShop); 
           let star = {
            star_1 : 0, 
            star_2 : 0, 
            star_3 : 0, 
            star_4 : 0, 
            star_5 : 0, 
           }
           result.map((item) => {
            if(item.rate === 1)
                star.star_1 += 1  ;
            else if(item.rate === 2)
                star.star_2 += 1  ;
            else if(item.rate === 3)
                star.star_3 += 1  ;
            else if(item.rate === 4)
                star.star_4 += 1  ;
            else if(item.rate === 5)
                star.star_5 += 1  ;
           })
           let result_ = {
                quanityFeedback: result.length,
                star: star,
           }
           resolve(result_) ; 
        } catch (error) {
            reject(false);
        }
        
    }); 
}
export default {
    createNew,
    getfeedback,
    getStatiFeedBackByIdProduct,
    getStatiFeedBackByIdShop
}

