import mongoose from "mongoose" ; 

let Schema = mongoose.Schema; 

let CategorySchema = new Schema({
    nameCategory: {type: String, default: null},
    idUser: {type:String, default: null},
    imageCategory: {type:String, defautl: "default-category.png"},
    createAt: {type: Number, default: Date.now},
    updateAt:  {type: Number, default: Date.now},
    deleteAt: {type: Number, default: null}
})

CategorySchema.statics ={
    createNew(item){
        return this.create(item); 
    },
    getCategoryByName(nameCategory){
        return this.findOne({nameCategory: nameCategory}).exec() ; 
    },
    getNormalCategoies(){
        return this.find().exec() ; 
    }
}; 

export default mongoose.model("category", CategorySchema); 
