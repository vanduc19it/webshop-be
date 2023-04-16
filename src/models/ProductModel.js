import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    nameProduct: {type: String, default: null},
    idShop: {type: String, default: null},
    idCategory: {type: String, default: null},
    imageProduct: {type: String, default: null},
    classify: {
        color: {type: String, default: null},
        size: {type: String, default: null},
        other: {type: Object, default: null},
    },
    price: {type: Number, default: 0},
    quantity: {type: Number, default: 1},
    description: {type:String, default: null},
    createAt: {type: Number, default: Date.now},
    updateAt:  {type: Number, default: Date.now},
    deleteAt: {type: Number, default: null}
}); 

ProductSchema.statics = {
    createNew(item){
        return this.create(item); 
    }, 

    findProductById(idProduct){
        return this.findById(idProduct).exec(); 
        
    },

    findAllProduct(skipNumber, product_limit, search = ""){
        return this.find({nameProduct: {"$regex": new RegExp(search, "i")}}).skip(skipNumber).limit(product_limit).exec();
    },

    getCountProduct(filter={}){
        return this.where(filter).count(); 
    }, 

    updateProduct(idShop, idProduct, item){
        return this.update({
            $and: [
                {idShop: idShop},
                {_id: idProduct}
            ]
        }, item).exec();
    },
    // searchProduct(search){
    //     return this.find({nameProduct: {"$regex": new RegExp(search, "i")}},'_id nameProduct idSeller idCategory imageProduct price updateAt' ).exec();
    // },
    getProductByIdCategory(idCategory){
        return this.find({idCategory: idCategory}).exec();
    },
    
    getQuantityById(idProduct){
        return this.findOne({_id: idProduct},"quantity" ).exec() ; 
    },

    updateQuantity(idProduct, dataUpdate){
        return this.findOneAndUpdate({"_id": idProduct}, dataUpdate ).exec() ;
    },
    findProductByIdShop(skipNumber, product_limit, filter){
        return this.find(filter).skip(skipNumber).limit(product_limit).exec();
    },
    
    
};


export default mongoose.model("product", ProductSchema) ; 
