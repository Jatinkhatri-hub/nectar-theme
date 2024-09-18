

document.addEventListener('DOMContentLoaded', function() {
  const storedVariantData = localStorage.getItem('variantData');
  const storedSelectedVariants = localStorage.getItem('packageRequired');

  const productUrl = localStorage.getItem('productURL');

  const backBtn = document.querySelector('.back-btn');
  backBtn.setAttribute.href = `${productUrl}`;

  const state = {
    selectedVariants: {},
    totalSelected: 0,
    subtotals: 0,
    requiredCount: (parseInt(storedSelectedVariants) / 30),
    savings: 0.00,
    sellingPlanId: localStorage.getItem('sellingPlanId')
  }

  // const selectedVariants = {}; // To keep track of selected variants

  function rebuildVariantCards(variantData) {
    const container = document.querySelector('.product-bundle__wrapper');
    container.innerHTML = '';

    variantData.forEach(variant => {
      const card = createVariantCard(variant);
      container.appendChild(card);
      state.selectedVariants[variant.id] = {
        quantity: 0,
        price: variant.price
      }
    });



    // Attach event listeners after rendering the cards
    attachEventListeners();
  }

  function createVariantCard(variant) {
    const card = document.createElement('div');
    card.classList.add('product-selector__card');
    card.setAttribute('data-variant-id', variant.id);
    card.setAttribute('data-variant-price', variant.price);

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


  const updateSubtotal = () => {
    state.subtotal = Object.values(state.selectedVariants).reduce((total, product) => {
      return total + (product.quantity * product.price);
    }, 0);

    const savingsElement = document.querySelector('.money-saved');
    let discount = 0;

    switch (true) {
      case 1 === state.totalSelected:
        discount = 10;
        break;
      case 2 === state.totalSelected:
        discount = 20;
        break;
      case 3 === state.totalSelected:
        discount = 30;
        break;
      case 4 >= state.totalSelected:
        discount = 40;
        break;
    }

    const subTotal = (state.subtotal / 100).toFixed(2);
    state.savings = ((subTotal / 100) * discount).toFixed(2);
    document.querySelector('.money-saved').innerText = `$${state.savings}`


    // updateSavings();

    // const subTotal = (state.subtotal / 100).toFixed(2);
    // const subtotalAfterSavings = (subTotal - state.savings).toFixed(2);

    // if( state.totalSelected >= state.requiredCount) {
    //   document.querySelector('.bundle-selector__subtotal-price').innerHTML =`$${subtotalAfterSavings}`
    // } else {
    //   document.querySelector('.bundle-selector__subtotal-price').innerText = `$${subTotal}`;
    // }
    
  };

  const updateSavings = () => {

    const savingsElement = document.querySelector('.money-saved');
    if (!savingsElement) {
      console.error('Element .bundle-selector__savings-price not found.');
      return;
    }

    if( state.totalSelected >= state.requiredCount ) {
      const discount = 15;
      const subTotal = (state.subtotal / 100).toFixed(2);
      state.savings = ((subTotal / 100) * discount).toFixed(2);
      document.querySelector('.bundle-selector__savings-price').innerText = `$${state.savings}`
      savingsElement.style.display = 'flex';
    } else {
      savingsElement.style.display = 'none';      
    }
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

  updateShopNowButton();

  // Toggle controls based on quantity
  function toggleControls(variantId) {
    const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
    if (state.selectedVariants[variantId] && state.selectedVariants[variantId].quantity > 0) {
      card.querySelector('.product-add__btn').style.display = 'none';
      card.querySelector('.variant__quantity-controls').style.display = 'flex';
    } else {
      card.querySelector('.product-add__btn').style.display = 'flex';
      card.querySelector('.variant__quantity-controls').style.display = 'none';
    }
  }

  // Handle increase button click
  function handleIncreaseClick(variantId) {
    if (!state.selectedVariants[variantId]) {
      state.selectedVariants[variantId] = { quantity: 0 };
    }
    state.selectedVariants[variantId].quantity++;
    state.totalSelected++;
    updateShopNowButton();
    updateSubtotal();
    toggleControls(variantId);
    console.log(state.selectedVariants);

    const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
    card.querySelector('.variant__added-no').innerText = state.selectedVariants[variantId].quantity;
    card.querySelector('.variant-input').value = state.selectedVariants[variantId].quantity;
  }

  // Handle decrease button click
  function handleDecreaseClick(variantId) {
    if (state.selectedVariants[variantId].quantity > 0) {
      state.selectedVariants[variantId].quantity--;
    }

    state.totalSelected--;
    updateShopNowButton();
    toggleControls(variantId);
    updateSubtotal();

    const card = document.querySelector(`.product-selector__card[data-variant-id="${variantId}"]`);
    card.querySelector('.variant__added-no').innerText = state.selectedVariants[variantId].quantity;
    card.querySelector('.variant-input').value = state.selectedVariants[variantId].quantity;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      if (value > 0) {
        data[key] = value;
      }
    });

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: Object.keys(data).map(variantId => ({
            id: variantId,
            quantity: parseInt(data[variantId]),
            selling_plan: state.sellingPlanId ? state.sellingPlanId : null
          }))
        })
      });
      const result = await response.json();
      console.log('Products added to cart:', result);
      window.location.href = '/cart';
    } catch (error) {
      console.error('Error adding products to cart:', error);
    } finally {
      document.querySelector('.bundle-atc__btn').innerText = "Added"
    }
  };

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

    document.querySelector('.bundle-selector__wrapper').addEventListener('submit', handleFormSubmit);

  }

  // Rebuild cards with stored variant data
  if (storedVariantData) {
    const variantData = JSON.parse(storedVariantData);
    rebuildVariantCards(variantData);
  }

  console.log(state);

 // console.log(selectedVariants)
});
