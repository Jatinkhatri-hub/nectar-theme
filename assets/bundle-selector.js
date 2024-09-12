


document.addEventListener('DOMContentLoaded', function() {
  const storedVariantData = localStorage.getItem('variantData');
  const storedSelectedVariants = localStorage.getItem
  ('packageRequired');

  let selectedVariants = {};

  function update

  
  
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
  }

  if (storedVariantData) {
    const variantData = JSON.parse(storedVariantData);
    rebuildVariantCards(variantData);
  }


});