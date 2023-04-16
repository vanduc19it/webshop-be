import _ from "lodash" ; 
import {cart} from "../services/index" ;
 
let addItemCart = async(req ,res) => {
    if(!_.isEmpty(req.body)){
        let data = {
            idUser: req.body.idUser,
            product: {
                idProduct: req.body.idProduct,
                nameProduct: req.body.nameProduct,
                imgProduct: req.body.imgProduct,
                quantity: req.body.quantity,
                unit_price: req.body.unit_price,
            },
        }
        console.log(data) ; 
        let result = await cart.addItemCart(data); 
        if(result){
            res.status(200).send(result); 
        }else{
            res.send("lỗi rùi bạn ơi") ; 
        }
    }   
};
let getItemCartByIdUser = async(req, res) => {
    if(req.params.idUser){
        let idUser = req.params.idUser; 
        let result = await cart.getItemCartByIdUser(idUser) ; 
        if(result){
            res.status(200).send(result); 
        }else{
            res.send("lỗi rùi bạn ơi") ; 
        }
    }
}
let removeCart = async(req, res) => {
    if(!_.isEmpty(req.body)){
        let idUser = req.body.idUser ; 
        let idProduct  = req.body.idProduct ; 
        let result = await cart.removeCart(idUser, idProduct);
        if(result){
            res.status(200).send(result); 
        }else{
            res.send("lỗi rùi bạn ơi") ; 
        }
    }
}; 

export default{
    addItemCart,
    getItemCartByIdUser,
    removeCart,
}