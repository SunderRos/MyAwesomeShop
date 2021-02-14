function confirmAddToCart(id){
    console.log(id);
    if(id=="true")
        alert('Products have been added to cart!');
}

function getUserComment(){

}

function saveUserComment() {
    const formData = new FormData(document.getElementById("form-comment"))
    let dataToSubmit = {};
    for (var pair of formData.entries()) {
      dataToSubmit[pair[0]] = pair[1];
    }
    axios.post('http://localhost:3000/createUserComment', {
        comment: dataToSubmit.comment,
        productId: dataToSubmit.productId
    }).then(result =>{
        if(!result.data.success){
            console.log(result.data.success)
            console.log("Fuck you")
            location.replace('/signin');
        }
        else{
            console.log(result.success)
            console.log(result);
            let parentComment = document.getElementById("list-comment");
            console.log(parentComment);
            let childComment = document.createElement("li");
            childComment.classList.add("list-group-item");
            childComment.innerHTML= `
                <div class="card mb-3">
                    <table class="table align-middle">
                        <tbody>
                            <tr >
                                <td style="width: 20px;">
                                    <img src="assets/picture/Profile-PNG-Clipart.png" alt="..." width="60px">
                                </td>
                                <td>
                                    <h6>${result.data.data.username}</h6>
                                    <p>${result.data.data.postAt}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="card-body">
                    <p class="card-text">${result.data.data.comment}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>`;
                let referenceNode = document.getElementById("form-section");
                parentComment.insertBefore(childComment, referenceNode);
        }
       
    }).catch(err =>{
        console.log(err);
    })
    document.getElementById('exampleFormControlTextarea1').value='';
}

function getUserComment(){
    console.log(document.getElementById("productId").value);
    axios.post('http://localhost:3000/getUserComment', {
        productId: document.getElementById("productId").value
    }).then(result =>{
        console.log(result.data)
        let parentComment = document.getElementById("list-comment");
            console.log(parentComment);
            result.data.forEach(element =>{
                let childComment = document.createElement("li");
                childComment.classList.add("list-group-item");
                childComment.innerHTML= `
                    <div class="card mb-3">
                        <table class="table align-middle">
                            <tbody>
                                <tr >
                                    <td style="width: 20px;">
                                        <img src="assets/picture/Profile-PNG-Clipart.png" alt="..." width="60px">
                                    </td>
                                    <td>
                                        <h6>${element.username}</h6>
                                        <p>${element.postAt}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="card-body">
                        <p class="card-text">${element.comment}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>`;
                    let referenceNode = document.getElementById("form-section");
                    parentComment.insertBefore(childComment, referenceNode);
            });
           
    }).catch(err =>{
        console.log(err);
    })
}

getUserComment();