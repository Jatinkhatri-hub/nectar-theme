document.addEventListener('DOMContentLoaded', () => {

  const openBuybox = (e) => {
    let i, buyBoxDetails, buyBox;
    buyBoxDetails = document.querySelector('.buy-box__details');
    for(i = 0; i < buyBoxDetails.length; i++) {
      buyBoxDetails[i].style.display = "none";
    }
    buyBox = document.querySelector('.buy-box__btn');
  }

});