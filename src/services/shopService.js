import ShopModel from "../models/ShopModel";
import fs from "fs-extra" ; 
import {app} from "../config/app";

let createNew = (item) => {
    return new Promise(async(resolve, reject) => {
        try{
            console.log("shop service create new "); 
            let result = await ShopModel.createNew(item);
            console.log(result);
            resolve(result);
        } catch (error) {
            reject(false);
        }
    })
}; 

let checkShopUserExit = (idUser) => {
    return new Promise(async(resolve, reject) => {
        try{
            let check = await ShopModel.countByIdUser(idUser);
            console.log(check);
            if(check > 0){
                resolve(true);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

let getShopById = (idShop) =>{
    return new Promise(async(resolve, reject) => {
        try{
            console.log(idShop);
            let result = await ShopModel.getShopById(idShop); 
            console.log(result);
            if(result){
                resolve(result);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

let getShopByIdUser = (idUser) =>{
    return new Promise(async(resolve, reject) => {
        try{
            // console.log(idUser);
            let result = await ShopModel.getShopByIdUser(idUser); 
            // console.log(result);
            if(result){
                resolve(result);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}; 

let updateShopImage = (fillter , data_update) => {
    return new Promise(async(resolve, reject) => {
        try{
            let result_image = await ShopModel.getImageShop(fillter) ; 
            let result = await ShopModel.updateShop(fillter , data_update); 
            // console.log(result);
            if(result.matchedCount == 1){
                if(result_image.imgShop !== "default-shop.png" && data_update.imgShop){
                    await fs.remove(`${app.image_shop_directory}/${result_image.imgShop}`); 
    
                }
                resolve(result);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

let countShop = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let quanity = await ShopModel.countShop() ; 

            if(quanity){
               
                resolve(quanity);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

let updateShopInfor = (fillter , data_update) => {
    return new Promise(async(resolve, reject) => {
        try{
            let result = await ShopModel.updateShop(fillter , data_update); 
            // console.log(result);
            if(result.matchedCount == 1){
                resolve(result);
            }else{
                resolve(false);
            }
        } catch (error) {
            reject(false);
        }
    })
}

let getStatistical = (idShop) => {
    return new Promise(async(resolve, reject) => {
        try{
                // get số lượng đơn hàng

                // get tổng doanh thu 

                // get tổng sản phẩm

                
                let result = {
                    total_order: 1111, 
                    total_revenue: 2222,
                    stati_order: [
                        [
                            { time : "jfksdf"}, 
                            {revenue: 4328940}
                        ],
                        [
                            { time : "jfksdf"}, 
                            {revenue: 4328940}
                        ],
                    ]
                }


        } catch (error) {
            reject(false);
        }
    })

}

export default {
    createNew,
    checkShopUserExit,
    getShopById,
    getShopByIdUser, 
    updateShopInfor,
    updateShopImage,
    countShop
}
