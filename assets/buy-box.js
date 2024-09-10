document.addEventListener('DOMContentLoaded', () => {

  const openBuybox = (e) => {
    let i, buyBoxDetails, buyBox;
    buyBoxDetails = document.querySelector('.buy-box__details');
    for(i = 0; i < buyBoxDetails.length; i++) {
      buyBoxDetails[i].style.display = "none";
    }
    buyBox = document.querySelector('.buy-box__btn');
    for(i = 0; i < buyBox.length; i++) {
      buyBox[i].className = buyBox[i].className.replace("active", "");
    }
    document.getElementById(buyOption).style.d
  }

});