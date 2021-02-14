function deleteProduct(id){
    console.log(id);
    axios.delete('http://localhost:3000/product/'+id).then(result =>{
        location.reload();
    }).catch(err => {
        console.log(err);
      })
}

function getProduct(){
    axios.get('http://localhost:3000/products').then(result =>{
        let parentProduct = document.getElementById("parent-product");
        console.log(parentProduct);
        result.data.forEach(element =>{
            let chileProduct = document.createElement("tr");
            // chileProduct.id = element._id +"1";
            chileProduct.innerHTML = `
                        <td><img src="http://localhost:3000/assets/upload/${element._id}.png" alt=""></td>
                        <td>${element.productName}</td>
                        <td>${element.quantity}</td>
                        <td>${element.detail}</td>
                        <td>${element.price}$</td>
                        <td>${element.uploadAt}</td>
                        <td>${element.category}</td>
                        <td>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${element._id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="${element._id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="text-align: left;">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Update Product</h5>
                                        </div>
                                        <div class="modal-body">
                                            <form action="http://localhost:3000/updateProduct" method="POST" id="form-addproduct" enctype="multipart/form-data">
                                                <div class="mb-3" style="display: none;">
                                                    <input type="text" class="form-control" id="exampleInputProductName" aria-describedby="emailHelp" name="productId" value="${element._id}">
                                                </div>
                                                <div class="mb-3">
                                                <label class="form-label">Product Name</label>
                    
                                                <input type="text" class="form-control" id="exampleInputProductName" aria-describedby="emailHelp" name="productName" value="${element.productName}">
                                                <div id="emailHelp" class="form-text">Please input your product's name</div>
                                            
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Detail</label>
                                                    
                                                    <input type="text" class="form-control" id="exampleInputDetail" aria-describedby="emailHelp" name="detail" value="${element.detail}">
                                                    <div id="emailHelp" class="form-text">Write detail of your product</div>
                                                    
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Price($)</label>
                                                    
                                                    <input type="number" class="form-control" id="exampleInputPrice" aria-describedby="emailHelp" step="0.01" min=0 name="price" value="${element.price}">
                                                    <div id="emailHelp" class="form-text">Input price of your product</div>
                                                    
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Category</label>
                                                    
                                                    <input type="text" class="form-control" id="exampleInputCategory" aria-describedby="emailHelp" name="category" value="${element.category}">
                                                    <div id="emailHelp" class="form-text">Category of your product</div>
                                                    
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">Quantity</label>
                                                    
                                                    <input type="number" class="form-control" id="exampleInputQuantity" aria-describedby="emailHelp" name="quantity" value="${element.quantity}">
                                                    <div id="emailHelp" class="form-text">Quantity of your product</div>
                                                    
                                                </div>
                                    
                                                <div class="mb-3">
                                                    <label class="form-label">Product Picture</label>
                                                    
                                                    <input type="file" class="form-control" id="inputGroupFile02" name="image">
                                                    
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    <button type="submit" class="btn btn-primary" id="btn-upload">Update</button>
                                                </div>
                                            </form>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-danger btn-detele" id="${element._id}" onclick="deleteProduct(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button >
                        </td>`;
                parentProduct.appendChild(chileProduct);
            
        });

    }).catch(err =>{
        console.log(err);
    })
}
// function appendUpdateProduct(id){
//         const newUplaodAt = new Date().toLocaleString();
//         let parentProduct = document.getElementById(id + "1");
//         console.log(parentProduct);
//         let childProduct = document.createElement("tr");
//         childProduct.innerHTML = `
//             <td><img src="http://localhost:3000/assets/upload/${id}.png" alt=""></td>
//             <td>
//                 <div class="input-group md-3">
//                     <input type="text" class="form-control" placeholder="Product Name" aria-label="Username" aria-describedby="basic-addon1" id="${id}productName">
//                 </div>
//             </td>
//             <td>
//                 <div class="input-group md-3">
//                     <input type="number" class="form-control" placeholder="Quantity" aria-label="Username" aria-describedby="basic-addon1" id="${id}quantity">
//                 </div>
//             </td>
//             <td>
//                 <div class="input-group md-3">
//                     <input type="text" class="form-control" placeholder="Product Detail" aria-label="Username" aria-describedby="basic-addon1" id="${id}detail">
//                 </div>
//             </td>
//             <td>${newUplaodAt}</td>
//             <td>
//                 <div class="input-group md-3">
//                     <input type="text" class="form-control" placeholder="Category" aria-label="Username" aria-describedby="basic-addon1" id="${id}category">
//                 </div>
//             </td>
//             <td>
//                 <button type="button" class="btn btn-primary" id="${id}" onclick="updateProduct(this.id)">Update</button>
//             </td>`;
//             parentProduct.insertAdjacentElement("afterend", childProduct);
   
// }
// function updateProduct(id){
//     console.log(id);
//     axios.post('http://localhost:3000/update', {
//         productName: document.getElementById(id+"productName").value,
//         quantity: document.getElementById(id+"quantity").value,
//         detail: document.getElementById(id+"detail").value,
//         category: document.getElementById(id+"category").value,
//         productId: id

//     }).then(result=>{
//         if(result.success=true){
//             location.reload();
//         }
//     })
    
// }
getProduct();
