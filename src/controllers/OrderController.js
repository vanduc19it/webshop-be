import _ from "lodash";

import { transError, transSuccess, transValidation } from "../../lang/vi";
import {order, product} from "../services/index" ; 

let orderCart = async(req, res) => {
    if(!_.isEmpty(req.body)) {

        let cartUser = req.body.shippintInfor;
        cartUser.productItems = req.body.cartItems; 
        let result = await order.orderCart(cartUser);
        if(result){
            res.status(200).send({result:result, message: transSuccess.orderCart});
        
        }else{
            res.send({result: false, message: transError.orderCart}) ; 
        }

    }else{
        res.send({result: false, message: transValidation.data_empty}); 
    }
}


let getOrderByIdUser = async(req, res) => {
    if(req.params.idUser) {
        let result = await order.getOrderByIdUser(req.params.idUser) ; 
        if(result){
            res.status(200).send(result) ; 

        }else{
            res.send([])
        }
    }else{
        res.send([]) ; 

    }
} ; 

let getOrderById = async(req, res) => {
    if(req.params.idOrder) {
        let result = await order.getOrderById(req.params.idOrder) ; 
        if(result){
            res.status(200).send(result) ; 

        }else{
            res.send([])
        }
    }else{
        res.send([]) ; 

    }
}; 

let getListOrderByIdShop = async(req, res) => {
    if(req.params.idShop) {
        let result = await order.getListOrderByIdShop(req.params.idShop) ; 
        if(result){
            res.status(200).send(result) ; 

        }else{
            res.send([])
        }
    }else{
        res.send([]) ; 

    }
}; 

let changeStatus = async(req, res) => {
    if(_.isEmpty(req.body)){
        res.send(transValidation.data_empty) ; 
    }else{
        let idOrder = req.body.idOrder ; 
        let status = Number(req.body.statusOrder); 
        let result = await order.changeStatus(idOrder, status) ;   
        if(result){
            res.status(200).send(transSuccess.changeStatus) ; 
        }else{
            res.send(transError.changeStatus) ; 
        }
    }
}; 

export default {
    orderCart, 
    getOrderByIdUser,
    getOrderById, 
    changeStatus,
    getListOrderByIdShop
}


/*
[
    {Infor: }
]
*/
