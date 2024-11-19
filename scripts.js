let cart = [];

function addToCart(productName, basePricePerKg, idSuffix) {
    const weightAmount = parseFloat(document.getElementById(`weightAmount${idSuffix}`).value); // Lấy số lượng
    const weightType = document.getElementById(`weightType${idSuffix}`).value; // Lấy đơn vị (kg hoặc g)

    if (isNaN(weightAmount) || weightAmount <= 0) {
        alert('Vui lòng nhập số lượng hợp lệ.');
        return;
    }

    // Tính giá dựa trên loại đơn vị (g hoặc kg)
    let totalPrice;
    if (weightType === 'kg') {
        totalPrice = basePricePerKg * weightAmount; // Giá tiền theo kg
    } else if (weightType === 'g') {
        totalPrice = (basePricePerKg / 1000) * weightAmount; // Giá tiền theo gram (chia cho 1000)
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(product => product.name === productName && product.weightType === weightType);

    if (existingProductIndex !== -1) {
        // Nếu đã tồn tại, cập nhật số lượng và giá
        cart[existingProductIndex].quantity += weightAmount;
        cart[existingProductIndex].totalPrice += totalPrice;
    } else {
        // Nếu chưa, thêm sản phẩm mới vào giỏ hàng
        cart.push({
            name: productName,
            basePricePerKg: basePricePerKg,
            weightType: weightType,
            quantity: weightAmount,
            totalPrice: totalPrice
        });
    }

    alert(`Đã thêm ${weightAmount} ${weightType} ${productName} vào giỏ hàng với giá ${totalPrice.toLocaleString()} VNĐ.`);
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function searchProduct() {
    const searchValue = document.getElementById('search').value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường
    const products = document.querySelectorAll('.product'); // Lấy tất cả các sản phẩm

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase(); // Lấy tên sản phẩm và chuyển thành chữ thường

        if (productName.includes(searchValue)) { // Kiểm tra nếu tên sản phẩm chứa giá trị tìm kiếm
            product.style.display = 'block'; // Hiện sản phẩm
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm
        }
    });
}

window.onload = () => {
    // Khôi phục giỏ hàng từ localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
    }
};
