document.addEventListener('DOMContentLoaded', () => {

  function openBuybox(e, sub) {
    let i, buyBoxDetails, buyBox;
    buyBoxDetails = document.querySelector('.buy-box__details');
    for(i = 0; i < buyBoxDetails.length; i++) {
      buyBoxDetails[i].style.display = "none";
    }
    buyBox = document.querySelector('.buy-box__btn');
    for(i = 0; i < buyBox.length; i++) {
      buyBox[i].className = buyBox[i].className.replace("active", "");
    }
    document.getElementById(buyOption).style.display = "flex";
    e.currentTarget.className += "active";
  }

});