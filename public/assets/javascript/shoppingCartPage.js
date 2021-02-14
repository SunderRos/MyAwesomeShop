function getCart(){
    axios.get('http://localhost:3000/carts').then(result =>{
        console.log(result);
        let parentProduct = document.getElementById("parent-product");
        console.log(parentProduct);
        result.data.forEach(element =>{
            let chileProduct = document.createElement("tr");
            // chileProduct.id = element._id +"1";
            chileProduct.innerHTML = `
                        <td><img src="http://localhost:3000/assets/upload/${element.productId}.png" alt=""></td>
                        <td>${element.productName}</td>
                        <td>${element.quantity}</td>
                        <td>${element.detail}</td>
                        <td>${element.price}$</td>
                        <td>
                            <button class="btn btn-danger btn-detele" id="${element._id}" onclick="deleteCart(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button >
                        </td>`;
                parentProduct.appendChild(chileProduct);
            
        });
    }).catch(err=>{
        console.log(err);
    })
}

function deleteCart(id){
    axios.delete('http://localhost:3000/deleteCart/'+id).then(result =>{
        if(result.success=true){
            location.reload();
        }
    }).catch(err =>{
        console.log(err);
    })
}

function getCartTotal(){
    axios.get('http://localhost:3000/carts').then(result=>{
        let subTotal = 0;
        result.data.forEach(element =>{
            subTotal = subTotal + element.price*element.quantity;
        });
        let total = (subTotal + subTotal*0.05).toFixed(3);
        let parentTotalCart = document.getElementById("cart-total");
        console.log(parentTotalCart)
        let childTotalCart = document.createElement("tbody");
        childTotalCart.innerHTML = `
                        <tr>
                            <td class="col-3" style="background-color: rgb(214, 211, 211);"><h5>SUBTOTAL</h5></td>
                            <td class="col-4"><h5>${subTotal}$</h5></td>
                        </tr>
                        <tr>
                            <td class="col-3" style="background-color: rgb(214, 211, 211);"><h5>TAX</h5></td>
                            <td class="col-4"><h5>5%</h5></td>
                        </tr>
                        <tr>
                          <td class="col-3" style="background-color: rgb(214, 211, 211);"><h5>TOTAL</h5></td>
                          <td class="col-4"><h5>${total}$</h5></td>
                        </tr>`;
            parentTotalCart.appendChild(childTotalCart);
    }).catch(err=>{
        console.log(err);
    })
}

function purchaseSuccess(){
    alert('Thank you for buying our product!');
}

getCart();
getCartTotal();