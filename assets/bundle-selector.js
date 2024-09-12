


document.addEventListener('DOMContentLoaded', function() {
  const storedVariantData = localStorage.getItem('variantData');
  const storedSelectedVariants = localStorage.getItem('packageRequired');
  
  
  function rebuildVariantCards(variantData) {
    const container = document.querySelector('product-bundle__wrapper');
  
    container.innerHTML = '';
  
    variantData.forEach(variant => {
      const card = createVariantCard(variant);
      container.appendChild(card);
    });
  }

  function createVariantCard(variant) {
    const card = document.createElement('div');
    card.classList.add('.product-selector__card');

    card.innerHTML = `
      <div class="product-img__wrapper">
        <img src="${variant.featured_image.src}" class="product-img">
      </div>
      <div class="product-card__info">
        <h1 class="product-title">${variant.title}</h1>
        <button class="product-add__btn" data-variant-id="${variant.id}">Add+</button>
      </div>
    `;

    return card;
  }

  if (storedVariantData) {
    const variantData = JSON.parse(storedVariantData);

  }
  rebuildVariantCards(storedVariantData);


});