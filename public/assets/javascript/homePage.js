function getProduct(){
    axios.get('http://localhost:3000/products').then(result =>{
        let parentProduct = document.getElementById("product-list");
        result.data.forEach(element =>{
            let childProduct = document.createElement("div");
            childProduct.classList.add("card");
            childProduct.style.cssText = 'width: 18rem;';
            childProduct.innerHTML = `
                        <div class="row justify-content-end" style="text-align: end; margin-top: 8px;">
                          <div class="col-4">
                            <h5 style="margin: 0;">${element.price}$</h5>
                          </div>
                        </div>
                        <form id="myform${element._id}" action="http://localhost:3000/productpage" method="POST">
                          <input type="text" name="productId" value="${element._id}" style="display: none;">
                          <a href="javascript:;" onclick="document.getElementById('myform${element._id}').submit()"><img src="http://localhost:3000/assets/upload/${element._id}.png" class="card-img-top" alt="..."></a>
                        </form>
                        <div class="card-body">
                          <h5 class="card-title">${element.productName}</h5>
                          <p class="card-text" style="color: black;">${element.detail}</p>
                          <form action="http://localhost:3000/addToCart" method="POST">
                            <input type="text" name="productId" value="${element._id}" style="display: none;">
                            <input type="text" name="productName" value="${element.productName}" style="display: none;">
                            <input type="text" name="detail" value="${element.detail}" style="display: none;">
                            <input type="text" name="price" value="${element.price}" style="display: none;">
                            <br>
                            <div class="row justify-content-between" style="align-items: center;">
                              <div class="col-7">
                                <button class="btn btn-primary" type="submit" onclick = "confirmAddToCart()"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg> Cart</button>
                              </div>
                              <div class="col-5">
                                <input type="number" class="form-control" name="quantity" value="1", min="1">
                              </div>
                            </div>
                          </form>
                        </div>`;
            parentProduct.appendChild(childProduct);     
        });

    }).catch(err =>{
        console.log(err);
    })
}

// function confirmAddToCart(){
//       alert('Products have been added to cart!');
// }

// function getProductDetail(id){
//     console.log(id);
//     axios.post('http://localhost:3000/productpage', {
//       productId: id
//     }).then(result=>{
//       location.href('')
//     }).catch(err=>{
//       console.log(err)
//     })
// }

getProduct();