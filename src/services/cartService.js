import CartModel from "../models/CartModel" ; 

let addItemCart = (data) => {
    return new Promise(async(resolve, reject)=> {
        try {
            
            let result = await CartModel.createNew(data) ; 
            if(result) {
                resolve(result) ; 
            }else{
                resolve(false) ; 
            }

        } catch (error) {
            reject(false); 
        }
    });
}; 
let getItemCartByIdUser = (idUser) => {
    return new Promise(async(resolve, reject)=> {
        try {
            
            let result = await CartModel.getCartByIdUser(idUser) ; 
            if(result) {
                resolve(result) ; 
            }else{
                resolve(false) ; 
            }

        } catch (error) {
            reject(false); 
        }
    });
}
let removeCart = (idUser, idProduct) => {
    return new Promise(async(resolve, reject)=> {
        try {
            
            let result = await CartModel.removeProduct(idUser, idProduct);
            console.log(result); 
            if(result) {
                resolve(result) ; 
            }else{
                resolve(false) ; 
            }

        } catch (error) {
            reject(false); 
        }
    });
}; 
export default{
    addItemCart,
    getItemCartByIdUser,
    removeCart,
}
