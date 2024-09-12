


// document.addEventListener('DOMContentLoaded', function() {
//   const storedVariantData = localStorage.getItem('variantData');
//   const storedSelectedVariants = localStorage.getItem
//   ('packageRequired');

//   //let selectedVariants = {};

//   // function updateSelectedVariants(variantId, quantity) {
//   //   selectedVariants[variantId] = quantity;
//   //   console.log(selectedVariants);
//   // }

  
  
//   function rebuildVariantCards(variantData) {
//     const container = document.querySelector('.product-bundle__wrapper');
  
//     container.innerHTML = '';
  
//     variantData.forEach(variant => {
//       const card = createVariantCard(variant);
//       container.appendChild(card);
//     });
//   }

//   function createVariantCard(variant) {
//     const card = document.createElement('div');
//     card.classList.add('product-selector__card');
//     card.setAttribute('data-variant-id', variant.id);

//     card.innerHTML = `
//       <div class="product-img__wrapper">
//         <img src="${variant.featured_image.src}" class="product-img">
//       </div>
//       <div class="product-card__info">
//         <h1 class="product-title">${variant.title}</h1>
//         <button class="product-add__btn" data-variant-id="${variant.id}">Add+</button>
//         <div class="variant__quantity-controls" style="display: none;">
//           <button class="variant__decrease-btn">-</button>
//           <span class="variant__added-no">0</span>
//           <button class="variant__increase-btn">+</button>
//           <input type="hidden" class="variant-input" name="${ variant.id }" value="0">
//          </div>
//       </div>
//     `;

//     return card;
//   };

//   const variantCards = document.querySelectorAll('.product-selector__card');
//   const selectedVariants = {};
//   variantCards.forEach(card => {
//     const variantId = card.dataset.variantId;
//     selectedVariants[variantId] = {
//       quantity: 0
//     };
//   });

//   console.log(selectedVariants);

//   const toggleControls = (variantId) => {
//     const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
//     if (state.selectedProducts[variantId].quantity > 0) {
//        card.querySelector('.product-add__btn').style.display = 'none';
//        card.querySelector('.variant__quantity-controls').style.display = 'flex';
//     } else {
//       card.querySelector('.variant__atb-btn').style.display = 'flex';
//       card.querySelector('.variant__quantity-controls').style.display = 'none';
//     }
//   };


//   const handleIncreaseClick = (variantId) => {
  
//       selectedVariants[variantId].quantity++;
//       toggleControls(variantId);

//       const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
//       card.querySelector('.variant__added-no').innerText = selectedVariants[variantId].quantity;
//       card.querySelector('.variant-input').value = selectedVariants[variantId].quantity;
  
//   };

//   const handleDecreaseClick = (variantId) => {
//       selectedVariants[variantId].quantity--;
//       toggleControls(variantId);

//       const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
//       card.querySelector('.variant__added-no').innerText = selectedVariants[variantId].quantity;
//       card.querySelector('.variant-input').value = selectedVariants[variantId].quantity;

//   };

//   document.querySelectorAll('.variant__increase-btn').forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault(); // Prevent form submission
//       const variantId = e.target.closest('.product-selector__card').dataset.variantId;
//       handleIncreaseClick(variantId);
//     });
//   });

//   document.querySelectorAll('.variant__decrease-btn').forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault(); // Prevent form submission
//       const variantId = e.target.closest('.product-selector__card').dataset.variantId;
//       handleDecreaseClick(variantId);
//     });
//   });

//   document.querySelectorAll('.variant__atb-btn').forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault();
//       const variantId = e.target.closest('.product-selector__card').dataset.variantId;
//       handleIncreaseClick(variantId);
//     });
//   })

//   if (storedVariantData) {
//     const variantData = JSON.parse(storedVariantData);
//     rebuildVariantCards(variantData);
//   }


// });

document.addEventListener('DOMContentLoaded', function() {
  const storedVariantData = localStorage.getItem('variantData');
  const storedSelectedVariants = localStorage.getItem('packageRequired');

  const state = {
    selectedVariants: {},
    totalSelected: 0,
    subtotals: 0,
    requiredCount: (parseInt(storedSelectedVariants) / 30),
    savings: 0.00
  }

  const selectedVariants = {}; // To keep track of selected variants

  function rebuildVariantCards(variantData) {
    const container = document.querySelector('.product-bundle__wrapper');
    container.innerHTML = '';

    variantData.forEach(variant => {
      const card = createVariantCard(variant);
      container.appendChild(card);
    });

    // Attach event listeners after rendering the cards
    attachEventListeners();
  }

  function createVariantCard(variant) {
    const card = document.createElement('div');
    card.classList.add('product-selector__card');
    card.setAttribute('data-variant-id', variant.id);

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

  const updateShopNowButton = () => {
    const shopBtn = document.querySelector('.bundle-atc__btn');
    shopBtn.disabled = (state.totalSelected < state.requiredCount);

    if( state.totalSelected >= state.requiredCount ) {
      shopBtn.innerText = 'Shop now';
      shopBtn.classList.add('active');
      shopBtn.classList.remove('disable');
    } else {
      shopBtn.innerText = `Select ${state.requiredCount - state.totalSelected} more packs`;
      shopBtn.classList.add('disable');
      shopBtn.classList.remove('active');
    }

  };

  // Toggle controls based on quantity
  function toggleControls(variantId) {
    const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
    if (selectedVariants[variantId] && selectedVariants[variantId].quantity > 0) {
      card.querySelector('.product-add__btn').style.display = 'none';
      card.querySelector('.variant__quantity-controls').style.display = 'flex';
    } else {
      card.querySelector('.product-add__btn').style.display = 'flex';
      card.querySelector('.variant__quantity-controls').style.display = 'none';
    }
  }

  // Handle increase button click
  function handleIncreaseClick(variantId) {
    if (!selectedVariants[variantId]) {
      selectedVariants[variantId] = { quantity: 0 };
    }
    selectedVariants[variantId].quantity++;
    toggleControls(variantId);
    console.log(selectedVariants);

    const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
    card.querySelector('.variant__added-no').innerText = selectedVariants[variantId].quantity;
    card.querySelector('.variant-input').value = selectedVariants[variantId].quantity;
  }

  // Handle decrease button click
  function handleDecreaseClick(variantId) {
    if (selectedVariants[variantId].quantity > 0) {
      selectedVariants[variantId].quantity--;
    }
    toggleControls(variantId);

    const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
    card.querySelector('.variant__added-no').innerText = selectedVariants[variantId].quantity;
    card.querySelector('.variant-input').value = selectedVariants[variantId].quantity;
  }

  // Attach event listeners to buttons
  function attachEventListeners() {
    document.querySelectorAll('.product-add__btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const variantId = e.target.closest('.product-selector__card').dataset.variantId;
        handleIncreaseClick(variantId);
      });
    });

    document.querySelectorAll('.variant__increase-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const variantId = e.target.closest('.product-selector__card').dataset.variantId;
        handleIncreaseClick(variantId);
      });
    });

    document.querySelectorAll('.variant__decrease-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const variantId = e.target.closest('.product-selector__card').dataset.variantId;
        handleDecreaseClick(variantId);
      });
    });
  }

  // Rebuild cards with stored variant data
  if (storedVariantData) {
    const variantData = JSON.parse(storedVariantData);
    rebuildVariantCards(variantData);
  }

  console.log(selectedVariants)
});
