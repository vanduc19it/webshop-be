import mongoose from "mongoose";

let Schema = mongoose.Schema ; 

let OrderSchema = new Schema({
    idUser: String,
    idShop: String,
    productItems:[{
        idProduct: String,
        nameProduct: String,
        imgProduct: String,
        quantity: {type: Number, default: 1},
        unit_price: Number,
    }],
    namedReceiver: {type: String, default: null},   // tên người nhận hàng
    addressReceiver: {type: String, default: null}, // địa chỉ người nhận hàng 
    phoneReceiver: {type: Number, default: null},   // số điện thoại người nhận hàng
    status: {type: Number, default:1},          // trạng thái đơn hàng 
    // ["đang chờ xác nhận", "đang vận chuyển", "đang giao hàng", "đã giao hàng", "đã thanh toán", "đơn hàng đã bị hủy"]
    payment:{type:String, default: ""},             // phương thức thanhh toán
    totalPrice: {type: String, default: 0},
    message: {type: String, default: ""},
    // orderDate: {type: Date, default: null},         // ngày đặt hàng
    createAt: {type: Number, default: Date.now},      // ngày tạo đơn hàng 
    updateAt: {type: Number, default: null}, 
    deleteAt: {type: Number, default: null}
}); 

OrderSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    getOrderByIdUser(idUser){
        return this.find({idUser: idUser}).exec(); 
    },
    getOrderById(id){
        return this.findById(id).exec(); 
    },
    updateStatus(idOrder, statusChange){
        return this.update({_id: idOrder}, {status: statusChange}).exec() ; 
    },
    
    getStatisticalOrderByIdShop(idShop){
        return this.find({idShop: idShop}, "idShop totalPrice createAt")
    }, 
    getListOrderByIdShop(idShop) {
        return this.find({idShop: idShop}).sort({'updatedAt': -1});
    }
}

export default mongoose.model("order", OrderSchema); 

