import _ from "lodash";
import {feedback} from "../services/index" ; 

let createNew = async(req , res) => {
    if(_.isEmpty(req.body)){
        res.send("ko tìm thấy dữ liêu được gửi đến");
    }else{
        let result = await feedback.createNew(req.body); 
        if(result)
            res.status(200).send("Bạn đã tạo dữ liệu thành công"); 
        else
            res.send("Phản hồi thất bại"); 
    }
};

let getFeedback = async(req, res) => {
    if(req.params.page && req.params.idProduct){
        let result = await feedback.getfeedback(req.params.page, req.params.idProduct); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: true, message: transError.error_data});
        }
    }
}; 

let getStatiFeedBackByIdProduct = async(req, res) => {
    if(req.params.idProduct){
        console.log("phản hồi controller ") ;
        console.log(req.params.idProduct);
        let result = await feedback.getStatiFeedBackByIdProduct(req.params.idProduct); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: true, message: transError.error_data});
        }
    }
};

let getStatiFeedBackByIdShop = async(req, res) => {
    if(req.params.idShop){
        console.log("phản hồi controller ") ;
        console.log(req.params.idShop);
        let result = await feedback.getStatiFeedBackByIdShop(req.params.idShop); 
        if(result){
            res.status(200).send(result);
        }else{
            res.send({result: true, message: transError.error_data});
        }
    }
}

export default {
    createNew,
    getFeedback,
    getStatiFeedBackByIdProduct,
    getStatiFeedBackByIdShop
}

