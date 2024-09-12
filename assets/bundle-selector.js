


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

  function createVariantCard



});