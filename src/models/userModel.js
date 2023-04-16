import mongoose from "mongoose";


let Schema = mongoose.Schema; 

let userSchema = new Schema({
    username: String,
    gender:{type: String, default: "male"},
    phone: {type: Number, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "avatar-default.jpg"},
    role: {type: String, default: "user"} ,//  // user, seller, admin
    local: {
        email: {type: String, trim: true},
        password: String,
        
    },
    google: {
        uid: String,
        token: String,
        email: {type: String, trim: true} 
    }, 
    createAt: {type: Number, default: Date.now},
    updateAt:  {type: Number, default: Date.now},
    deleteAt: {type: Number, default: null}
}); 

userSchema.statics = {

    createNew(item){
        return this.create(item);
    },

    findByEmail(emailUser){
        return this.findOne({"local.email": emailUser}).exec();
    },

    updateInfor(idUser, item){
        return this.findByIdAndUpdate(idUser, item).exec();
    },
    findUserById(idUser){
        return this.findById(idUser).exec();
    },
    getListUser(){
        return this.find({}).exec() ; 
    },
    getQuanity(){
        return this.count({}).exec() ;
    }
  
}
export default mongoose.model("user", userSchema) ; 
