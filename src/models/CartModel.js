import mongoose from "mongoose";

let Schema = mongoose.Schema ; 

let CartSchema = new Schema({
   idUser: String,
   product: {
    idProduct: String,
    nameProduct: String,
    imgProduct: String,
    quantity: {type: Number, default: 1},
    unit_price: Number,
   },
   createAt: {type: Number, default: Date.now},
   updateAt: {type: Number, default: null}, 
   deleteAt: {type: Number, default: null}
}); 

CartSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    getCartByIdUser(idUser){
        return this.find({idUser: idUser}).exec(); 
    },
    getOrderById(id){
        return this.findById(id).exec(); 
    },
    removeProduct(idUser, idProduct){
        return this.remove(
            {$and: [
                {"idUser": idUser}, 
                {"product.idProduct":  idProduct}
            ]}
            ).exec() ; 
    }
}

export default mongoose.model("cart", CartSchema); 

