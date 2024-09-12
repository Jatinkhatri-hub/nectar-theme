


document.addEventListener('DOMContentLoaded', function() {
  const storedVariantData = localStorage.getItem('variantData');
  const storedSelectedVariants = localStorage.getItem
  ('packageRequired');

  let selectedVariants = {};

  // function updateSelectedVariants(variantId, quantity) {
  //   selectedVariants[variantId] = quantity;
  //   console.log(selectedVariants);
  // }

  
  
  function rebuildVariantCards(variantData) {
    const container = document.querySelector('.product-bundle__wrapper');
  
    container.innerHTML = '';
  
    variantData.forEach(variant => {
      const card = createVariantCard(variant);
      container.appendChild(card);
    });
  }

  function createVariantCard(variant) {
    const card = document.createElement('div');
    card.classList.add('product-selector__card');

    card.innerHTML = `
      <div class="product-img__wrapper">
        <img src="${variant.featured_image.src}" class="product-img">
      </div>
      <div class="product-card__info">
        <h1 class="product-title">${variant.title}</h1>
        <button class="product-add__btn" data-variant-id="${variant.id}">Add+</button>
        <div class="variant__quantity-controls" style="display: none;">
          <button class="variant__decrease-btn">-</button>
          <span class="variant__added-no">0</span>
          <button class="variant__increase-btn">+</button>
          <input type="hidden" class="variant-input" name="${ variant.id }" value="0">
         </div>
      </div>
    `;

    return card;
  };

  const variantCards = document.querySelectorAll('.product-selector__card');
  variantCards.forEach(card => {
    const variantId = card.dataset.variantId;
    selectedVariants[variantId] = {
      quantity: 0
    };
  });

  console.log(selectedVariants);


  const handleIncreaseClick = (variantId) => {
  
      selectedVariants[variantId].quantity++

      
      
      toggleControls(variantId);

      const card = document.querySelector(`.bundle-variant__card[data-variant-id="${variantId}"]`);
      card.querySelector('.variant__added-no').innerText = state.selectedProducts[variantId].quantity;
      card.querySelector('.variant-input').value = state.selectedProducts[variantId].quantity;
  
  };

  const handleDecreaseClick = (variantId) => {
    if (variantId in state.selectedProducts && state.selectedProducts[variantId].quantity > 0) {
      state.selectedProducts[variantId].quantity--;
      state.totalSelected--;
      updateIndicator();
      updateSubtotal();
      updateSavings();
      updateShopNowButton();
      toggleControls(variantId);

      const card = document.querySelector(`.bundle-variant__card[data-variant-id="${variantId}"]`);
      card.querySelector('.variant__added-no').innerText = state.selectedProducts[variantId].quantity;
      card.querySelector('.variant-input').value = state.selectedProducts[variantId].quantity;

      
    } else {
      console.error(`Variant ID ${variantId} not found in state or quantity is already 0`);
    }

  

  };

  if (storedVariantData) {
    const variantData = JSON.parse(storedVariantData);
    rebuildVariantCards(variantData);
  }


});