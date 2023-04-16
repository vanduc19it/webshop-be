export const transValidation = {
    data_empty: "Không nhận được dữ liều đầu vào. Vui lòng thử lại sau!",
    category_exists: "Phân loại sản phẩm này đã tồn tại", 
    search_empty: "Chúng tôi không biết bạn tìm kiếm gì"
    
};

export const transSuccess = {
    login_user: "Đăng nhập thành công", 
    register_user: (username) => {
        return `Tài khoản <b>${username}</b> đã được tạo thành công`; 
    },
    addNewCategory: (nameCategory) => {
        return `Phân loại <b> ${nameCategory}</b> đã được thêm thành công`;
    },
    addNewProduct: "Thêm sản phẩm thành công",
    updateUser: "Cập nhật thông tin người dùng thành công",
    uploadImg: "Đã tải ảnh lên thành công",
    updateProduct: "Cập nhật sản phẩm thành công",
    not_search_result: "không tìm thấy kết quả cần tìm kiếm",
    createNewShop: (nameShop) => {
        return `Cửa hàng ${nameShop} của bạn đã được tạo thành công`;
    },
    getProductByIdCateogry: "Hiển thị kết quả danh mục thành cônng",
    orderCart: "Đơn hàng của bạn đã được tạo thành công",
    changeStatus: true,
    update: "Bạn đã cập nhật thành công",

}; 

export const transError = {
    login_user: "Đăng nhập thất bại.", 
    register_user: "Đăng ký thất bại.",

    getCategory: "Không tìm thấy dữ liệu.",
    upImage: "Lỗi không tải ảnh lên được.", 
    addNewCategory: (nameCategory) => {
        return `Thêm phân loại </b>${nameCategory}</b> thất bại.`;
    },
    addNewProduct: "Thêm sản phẩm thất bại, Vui lòng thử lại sau.",
    product_detail: "Rất tiếc chúng tôi không tìm thấy sản phẩm này.",
    error_data: "Rất tiếc, đã xảy ra lỗi. Vui lòng kiểm tra.",
    updateUser: "Cập nhật thông tin người dùng thất bại",
    uploadImg: "Lỗi khi tải ảnh lên. Vui lòng thử lại sau",
    updateProduct: "Cập nhật sản phẩm thất bại",
    not_page: "Rất tiếc, trang này không tồn tại!",
    createNewShop: "Tạo của hàng thất bại. Vui lòng thử lại sau :)",
    existShop: "Xin lỗi, Mỗi người dùng chỉ có thể tạo một cửa hàng duy nhất.",
    getProductByIdCateogry: "Xin lỗi, chúng tôi không tìm thấy kết quả cần tìm. Vui lòng thử lại sau",
    orderCart: "Tạo đơn hàng thất bại. Vui lòng thử lại sau",
    outOfProduct: "Xin lỗi, một số sản phẩm đã hết:((",
    changeStatus: false, 
    update: "Rất tiếc, cập nhật thất bại. Vui lòng thử lại sau"



}
