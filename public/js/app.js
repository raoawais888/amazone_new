const addTOCart = () =>{
 let notifier = new AWN();

 let cart_btn = document.querySelector("#add_cart_btn");
 let cart_counter = document.querySelector("#cart_counter");

    const updateCart = (cart) =>{
      var headers = new Headers();
      headers.append('Accept', 'application/json'); // This one is enough for GET requests
      headers.append('Content-Type', 'application/json'); // This one sends body
      fetch('/add-cart', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(cart),
      }).then(resp => {
        return resp.json()
      }).then((json) => {
        
           cart_counter.innerText = json.data;
           new AWN().success('Item Added in to cart', {durations: {Added: 0}})
              
           setTimeout(()=>{
            $(".loader").fadeOut(3000);
           },2000)
     }).catch(err => { 
      })
    }
    let cart_data =  cart_btn.dataset.product;
    updateCart(JSON.parse(cart_data)); 
}

  // update cart qty code 

    
  let total_price = document.querySelector("#total_price");
 
  const update_cart_btn = document.querySelectorAll("#update_btn");

  update_cart_btn.forEach((btn)=>{

     btn.addEventListener("click", (e)=>{
       e.preventDefault();
        const id = btn.dataset.id;
         const qty = btn.closest('tr').querySelector(".form-control").value;
         const price = btn.closest('tr').querySelector("#price");
         const qty_price = btn.closest('tr').querySelector("#qty_price");
         console.log(qty_price);
        
         const s_id = JSON.parse(id);
           
          
        var headers_2 = new Headers();
        headers_2.append('Accept', 'application/json'); // This one is enough for GET requests
        headers_2.append('Content-Type', 'application/json'); // This one sends body
        fetch('/update-cart', {
            method: 'POST',
            headers: headers_2,
            body: JSON.stringify({id:s_id,qty}),
        }).then(resp => {
          return resp.json();
        }).then((json) => {

          setTimeout(()=>{
            $(".loader").fadeOut(3000);
           },2000)
          
           console.log(json.price);
             total_price.innerText = json.price;
             cart_counter.innerText = json.qty
             qty_price.innerText = json.new_price;
             price.innerText = json.new_price;
        
             new AWN().success('Item Updated in to cart', {durations: {Added: 0}})
  
              
       }).catch(err => {
           
        })

     })
   

  })



  // delete cart function 

  let delete_btn = document.querySelectorAll("#delete_cart");

   delete_btn.forEach((btn)=>{

      btn.addEventListener("click", (e)=>{

          let id = btn.dataset.did;
        
          var headers_3 = new Headers();
          headers_3.append('Accept', 'application/json'); // This one is enough for GET requests
          headers_3.append('Content-Type', 'application/json'); // This one sends body
         fetch('/delete_Cart',{
          
          method: 'POST',
          headers: headers_3,
          body: JSON.stringify({id}),

         }).then(resp => {
          return resp.json();
        }).then((json) => {
         console.log(json);      
         setTimeout(()=>{
          $(".loader").fadeOut(3000);
         },2000)
        
            total_price.innerText = json.price;
             cart_counter.innerText = json.qty 
             btn.closest('tr').style.display = "none";
             new AWN().alert('Item Remove in to cart', {durations: {Added: 0}})

       }).catch(err => {
           
        console.log(err)
        })



      })


   })





 





