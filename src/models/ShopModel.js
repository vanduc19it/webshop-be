import mongoose from "mongoose";

let Schema = mongoose.Schema; 

let ShopSchema = new Schema({
    nameShop: {type:String, default: null},
    idUser: {type: String, default: null},
    imgShop: {type:String, default: "default-shop.png"},
    quantityProduct: {type:Number, default: 0},
    followers: {type:Number, default: 0} ,
    address: {type: String, default:null},
    phone: {type:String, default: null},
    createAt: {type: String, default: Date.now}, 
    updateAt: {type: String, default: null}, 
    deleteAt: {type:String, default: null},
}); 

ShopSchema.statics = {
    createNew(item) {
        return this.create(item) ;
    },
    countShop(){
        return this.count({}).exec() ;
    },
    countByIdUser(idUser){
        return this.count({"idUser": idUser}).exec();
    },
    getShopById(id){
        return this.findById(id).exec();
    },
    getShopByIdUser(idUser){
        return this.findOne({idUser: idUser}).exec(); 
    },
    getImageShop(filter){
        return this.findOne(filter, "imgShop").exec();
    },
    updateShop(fillter, data_update){
        return this.update(fillter, data_update).exec();
    }
} ; 

export default  mongoose.model("Shop", ShopSchema); 
