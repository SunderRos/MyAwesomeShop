function getHistory(){
    axios.get('http://localhost:3000/getHistory').then(result=>{
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
                        <td>${element.purchasedAt}</td>`;
                parentProduct.appendChild(chileProduct);
            
        });
    }).catch(err=>{
        console.log(err);
    })
}

getHistory();