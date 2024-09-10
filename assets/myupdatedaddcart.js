let elements=document.getElementsByClassName("bundle-item");
let elements2=document.getElementsByClassName("product-variant-select-a");
let button=document.getElementById("addtoCart");

let data_array=[]
button && button.addEventListener("click",async ()=>{

  button.disabled = true;

  for(let i=0;i<elements.length;i++){
    let quantity=document.getElementById(`myNumber${i+1}`);
    let options=document.getElementById(`product_swatches_row${i+1}`);
    let flavors=document.getElementById(`product-flavor_dropdown${i+1}`);
    if(parseInt(quantity.innerHTML)>0){
      var arr = Array.from(Array.from(flavors.children[1].children)[0].children);
      var quant=parseInt(quantity.innerHTML);
      let flavor_value;
      for(let j=0;j<arr.length;j++){
        if(arr[j].classList.contains("active")){
          flavor_value=arr[j].getAttribute("data-option");
        }
      }
      var arr2=Array.from(options.children);
      let option_value;
      for(let j=0;j<arr2.length;j++){
        if(arr2[j].classList.contains("active")){
           option_value=arr2[j].getAttribute("data-value");
        }
      }
      var arr3=Array.from(Array.from(elements2[0].children[1].children)[0].children);
      let variant_id;
      for(let j=0;j<arr3.length;j++){
        if(arr3[j].getAttribute("data-value")==`${option_value}-${flavor_value}`){
          variant_id=arr3[j].getAttribute("id");
        }
      }

      let data = {
        "id": variant_id,
        "quantity": quant
      }
      data_array.push(data);
    }
  }

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"items":data_array})
  })
  .then((response) => response.json())
  .then((response) => {
    //console.log(response);
    window.location.href = '/checkout';
  })
  .catch((error) => {
    console.log(`error adding item to cart: `, error);
  });
 
});