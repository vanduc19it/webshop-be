import mongoose from "mongoose";

let Schema = mongoose.Schema ; 

let FeedbackSchema = new Schema({
    idUser: {type: String, default: null},
    idShop: {type:String, default: null},
    product: {
        idProduct: {type: String, default: null},
        idShop: {type: String, default: null}
    },
    rate: {type: Number, default: null }, // value: 1, 2,3 ,4 ,5 
    comment: {type: String, default: null},
    createAt: {type: String, default:Date.now},
    updateAt: {type: String, default: Date.now},
    deleteAt: {type: String, default: null}
});

FeedbackSchema.statics = {
    createNew(item){
        return this.create(item);
    },
    getFeedBack(skipNumber, idProduct, feedback_limit){
        return this.find({"product.idProduct": idProduct}).sort({createAt: "desc"}).skip(skipNumber).limit(feedback_limit).exec();
    },
    getCountFeedBack(idProduct){
        return this.where({"product.idProduct": idProduct}).count();

    }, 
    getNormalFeedBack(idProduct){
        return this.find({"product.idProduct": idProduct}).exec();

    },
    getStatiFeedBackByIdShop(idShop){
        return this.find({"product.idShop": idShop}).exec();

    }
} ; 

export default  mongoose.model("Feedback", FeedbackSchema)  ;

