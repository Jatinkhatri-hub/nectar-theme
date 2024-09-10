let button2=document.getElementsByClassName("button2");
  let button1=document.getElementsByClassName("button1");
  let flavors_elements=document.getElementsByClassName("product-variant-select-a");
  let global_price=0;
  let global_quantity=0;
  let cart_btn_text = document.getElementById("addtoCart");
  let saved_price_container = document.getElementById("savingprice");
  let priceSaved = document.getElementById("saved");
  let perItemSaved = document.getElementById("perItem_saved");
  let overall_price=0;
  let before_quantity=0;
  let totalBags = document.querySelector('.total-bags-qty');
  let totalValueSum = document.querySelector('.total-value-sum');
  let totalCompareSum = document.querySelector('.total-compare-sum');
  let totalSaveQty = document.querySelector('.total-save-qty');

    for(let i=0;i<4;i++){
      button2[i] && button2[i].addEventListener("click",(e)=>{
        e.preventDefault();
        var arr3=Array.from(Array.from(flavors_elements[0].children[1].children)[0].children);
        
        let price;
        let compare_price;
        let element=document.getElementById(`myNumber${i+1}`);
        price=arr3[0].getAttribute("price");
        price=parseInt(price)/100;
        let quantity=parseInt(element.innerHTML)+1;
        element.innerHTML=quantity;
        global_quantity+=1;
        before_quantity+=1;
        totalBags.innerHTML = global_quantity;

        console.log(price)
        
        if(global_quantity==1){
          rechargeprice=arr3[0].getAttribute("price");
          rechargeprice=parseInt(rechargeprice)/100;
          global_price+=price;
          cart_btn_text.innerHTML = "Start your hydration habit";
          saved_price_container.classList.remove("active");
          priceSaved.innerHTML = "10%";
          perItemSaved.innerHTML = rechargeprice*0.9;
          totalValueSum.innerHTML = (rechargeprice*0.9).toFixed(2);
          totalCompareSum.innerHTML = rechargeprice.toFixed(2);
          totalSaveQty.innerHTML = (totalCompareSum.innerText - totalValueSum.innerText).toFixed(2);
          
        }
        else if(global_quantity==2) {
          global_price+=price;
          priceSaved.innerHTML = "15%";
          perItemSaved.innerHTML = (((global_quantity*price)-((global_quantity*price)*0.15))/global_quantity);
          totalValueSum.innerHTML = ((global_quantity*price)-((global_quantity*price)*0.15)).toFixed(2);
          totalCompareSum.innerHTML = (global_quantity*price).toFixed(2);
          totalSaveQty.innerHTML = (totalCompareSum.innerText - totalValueSum.innerText).toFixed(2);
        }
        else if(global_quantity==3) {
          global_price+=price;
          priceSaved.innerHTML = "20%";
          perItemSaved.innerHTML = (((global_quantity*price)-((global_quantity*price)*0.20))/global_quantity);
          totalValueSum.innerHTML = ((global_quantity*price)-((global_quantity*price)*0.20)).toFixed(2);
          totalCompareSum.innerHTML = (global_quantity*price).toFixed(2);
          totalSaveQty.innerHTML = (totalCompareSum.innerText - totalValueSum.innerText).toFixed(2);
        }
        else if (global_quantity>=4) {
          global_price+=price;
          priceSaved.innerHTML = "30%";
          perItemSaved.innerHTML = (((global_quantity*price)-((global_quantity*price)*0.30))/global_quantity);
          totalValueSum.innerHTML = ((global_quantity*price)-((global_quantity*price)*0.30)).toFixed(2);
          totalCompareSum.innerHTML = (global_quantity*price).toFixed(2);
          totalSaveQty.innerHTML = (totalCompareSum.innerText - totalValueSum.innerText).toFixed(2);
        }
        else {
          saved_price_container.classList.add("active");
          cart_btn_text.innerHTML = "Select at least one pouch";
          totalValueSum.innerHTML = 0.00;
          totalCompareSum.innerHTML = 0.00;
          totalSaveQty.innerHTML = (0.00).toFixed(2);
        }
      });
      
       button1[i] && button1[i].addEventListener("click",(e)=>{
        e.preventDefault();
        let element=document.getElementById(`myNumber${i+1}`);
        let quantity=parseInt(element.innerHTML);
        totalBags.innerHTML = global_quantity -1;
         
        if(quantity>=1){
            quantity=quantity-1;
            element.innerHTML=quantity;
            before_quantity-=1;
            var arr3=Array.from(Array.from(flavors_elements[0].children[1].children)[0].children);
            let price;
            let compare_price;
            price=arr3[0].getAttribute("price");
            price=parseInt(price)/100;
        
            if(global_quantity==0){
              saved_price_container.classList.add("active");
              cart_btn_text.innerHTML = "Select at least one pouch";
              global_price=0;
              priceSaved.innerHTML = "0%";
              perItemSaved.innerHTML = price*0.9;
              totalValueSum.innerHTML = (0.00).toFixed(2);
              totalCompareSum.innerHTML = (0.00).toFixed(2);
              totalSaveQty.innerHTML = (0.00).toFixed(2);
            }
            else if(global_quantity==1){
              saved_price_container.classList.add("active");
              cart_btn_text.innerHTML = "Select at least one pouch";
              let rechargeprice = arr3[0].getAttribute("price");
              rechargeprice=parseInt(rechargeprice)/100;
              let original_price_item=global_quantity*rechargeprice;
              let previous_item_price=0;
              let difference=original_price_item-previous_item_price;
              let new_price=original_price_item-difference;
              global_price-=price;
              totalValueSum.innerHTML = (0.00).toFixed(2);
              totalCompareSum.innerHTML = (0.00).toFixed(2);
              totalSaveQty.innerHTML = (0.00).toFixed(2);
              if(global_price>=0){
                priceSaved.innerHTML = "0%";
                perItemSaved.innerHTML = rechargeprice*0.9;
              }
              else {
                priceSaved.innerHTML = "$"+0;
                global_price=0;
                perItemSaved.innerHTML = 0;
              }
            }
            else if(global_quantity==2){
              cart_btn_text.innerHTML = "Start your hydration habit";
              saved_price_container.classList.remove("active");
              let rechargeprice = arr3[0].getAttribute("price");
              rechargeprice=parseInt(rechargeprice)/100;
              global_price-=price;
              totalValueSum.innerHTML = (rechargeprice*0.9).toFixed(2);
              totalCompareSum.innerHTML = (price).toFixed(2);
              totalSaveQty.innerHTML = (totalCompareSum.innerText - totalValueSum.innerText).toFixed(2);
              if(global_price>=0){
                priceSaved.innerHTML = "10%";
                perItemSaved.innerHTML = rechargeprice*0.9;
              }
              else {
                priceSaved.innerHTML = "$"+0;
                perItemSaved.innerHTML = 0;
                global_price=0;
              }
            }
           else if(global_quantity==3){
              let original_price_item=((global_quantity*price)-((global_quantity*price)*0.20));
              let previous_item_price=(((global_quantity-1)*price)-(((global_quantity-1)*price)*0.15));
              let difference=original_price_item-previous_item_price;
              let new_price=original_price_item-difference;
              global_price-=price;
             totalValueSum.innerHTML = previous_item_price.toFixed(2);
              totalCompareSum.innerHTML = (price*2).toFixed(2);
             totalSaveQty.innerHTML = (totalCompareSum.innerText - totalValueSum.innerText).toFixed(2);
              if(global_price>=0){
                priceSaved.innerHTML = "15%";
                perItemSaved.innerHTML = new_price/(global_quantity-1);
              }
              else {
                priceSaved.innerHTML = "$"+0;
                global_price=0;
                perItemSaved.innerHTML=0;
              }
            }
           else if(global_quantity>=4){
              let original_price_item=((global_quantity*price)-((global_quantity*price)*0.30));
              let previous_item_price;
              if(global_quantity-1>3){
                previous_item_price=(((global_quantity-1)*price)-(((global_quantity-1)*price)*0.30));
              }
              else {
                previous_item_price=(((global_quantity-1)*price)-(((global_quantity-1)*price)*0.20));
              }
              let difference=original_price_item-previous_item_price;
              let new_price=original_price_item-difference;
              global_price-=price;
             totalValueSum.innerHTML = previous_item_price.toFixed(2);
              totalCompareSum.innerHTML = (price*3).toFixed(2);
             totalSaveQty.innerHTML = (totalCompareSum.innerText - totalValueSum.innerText).toFixed(2);
              if(global_price>=0){
                perItemSaved.innerHTML = new_price/(global_quantity-1);
                if(global_quantity-1>3){
                  priceSaved.innerHTML = "30%";
                }
                else {
                  priceSaved.innerHTML = "20%";
                }
              }
              else {
                priceSaved.innerHTML = "$"+0;
                perItemSaved.innerHTML=0;
                global_price=0;
              }
            }
            global_quantity-=1;
        }
      });
    }
window.onload = function() {
  global_quantity = 2;
}