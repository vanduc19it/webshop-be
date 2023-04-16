import express from "express"; 
import { user, product, category, feedback, shop, order, cart} from "../controllers/index" ; 
import getFileImage from "../helpers/getFile";

let router = express.Router(); 

let initRouter = (app) => {
    router.get("/chao", function(req, res){
        res.send("xin chào mọi người");
    }); 

    router.get("/", function(req, res){
        res.send("trang chủ");
    }); 

    router.post("/register", user.regissterUser ); 
    router.post("/login-user", user.loginUser); 
    router.post("/update-user/:idUser", user.updateUser);
    router.post("/update-image-user/:idUser", user.updateImgUser);
    router.post("/check-pass-user/:idUser", user.checkPassUser);
    router.get("/get-normal-user/:idUser", user.getNormalUser) ; 
    router.post("/user/active-email", user.verifyEmail);
    router.get("/getQuanityUser", user.getQuanity) ;
    router.get("/get-list-user", user.getListUser) ; 
    // router.post("/user/change-password/", user.changePassWord) ; 

    router.post("/add-new-product/", product.createNewProduct); // thêm sản phẩm   
    router.get("/detail-product", product.getProductById); // lấy thông tin chi tiết một sản phẩm theo id
    router.get("/all-product/:page", product.getAllProduct) ; // lấy sản phẩm theo tìm kiếm hoặc ko và có phân trang
    router.post("/updae-image-product/:idproduct",product.updateImage ); // cập nhật hình ảnh sản phẩm
    router.post("/update-product/:idproduct", product.updateProduct); // cập nhật thông tin sản phẩm
    router.get("/count-all-product", product.countProduct);  // đếm số lượng sản phẩm
    // router.get("/product-search/", product.searchProduct);
    router.get("/product/get-by-idcategory/:idCategory", product.getProductByIdCategory); // lấy danh sách sản phẩm theo id hàng hóa
    router.get("/product/get-product-idShop/:idShop/:page", product.getListProductByidShop); // lấy danh sách sản phẩm theo id hàng hóa

    
    router.get('/images/:path/:name_image', getFileImage);

    // category
    router.post("/add-new-category", category.createNewCategory); 
    router.get("/category", category.getNormalCategoies); 

    // feedback ( comment, rate star)
    router.post("/feedback-user", feedback.createNew); 
    router.get("/get-feedback/:idProduct/:page", feedback.getFeedback);
    router.get("/feedback/get-statistical-idproduct/:idProduct", feedback.getStatiFeedBackByIdProduct) ; 
    router.get("/feedback/get-statistical-idshop/:idShop", feedback.getStatiFeedBackByIdShop) ; 


    // Shop
    router.post("/shop/create-new", shop.createNew);
    router.get("/shop/get-shop/:idShop", shop.getShopById); 
    router.get("/shop/get-shop-by-user/:idUser", shop.getShopByIdUser);
    router.post("/shop/update-shop-info", shop.updateShopInfor);
    router.post("/shop/update-shop-image", shop.updateShopImage);
    router.get("/shop/count-shop", shop.countShop) ;
    router.get("/shop/statistical-by-idShop/:idShop", shop.getStatistical) ; 

    // Order
    router.post("/order/create-new",order.orderCart  );
    router.get("/order/getall/:idUser", order.getOrderByIdUser) ; 
    router.get("/order/get-id/:idOrder", order.getOrderById) ; 
    router.post("/order/change-status-order", order.changeStatus); 
    router.get("/order/get-listorder-by-idshop/:idShop", order.getListOrderByIdShop); 

    // Cart ----------
    router.post("/cart/add-new-product", cart.addItemCart) ; // thêm một sản phẩm vào trong giỏ hàng 
    router.get("/cart/get-cart-by-idUser/:idUser", cart.getItemCartByIdUser) ; // lấy danh sách giỏ hàng theo id người dùng 
    router.post("/cart/remove-product-cart", cart.removeCart) ; // xóa một sản phẩm nào đó trong giỏ hàng 

    
    return app.use("/", router);
}
export default initRouter; 
