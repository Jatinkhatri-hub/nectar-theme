// document.addEventListener('DOMContentLoaded', () => {
//   // Ensure openTab function is globally available
//   window.openTab = function(event, tabName) {
//     // Get all tab content and hide them
//     const tabContents = document.getElementsByClassName("tab-content");
//     for (let i = 0; i < tabContents.length; i++) {
//       tabContents[i].style.display = "none";
//     }

//     // Get all tab buttons and remove active class
//     const tabButtons = document.getElementsByClassName("tab-button");
//     for (let i = 0; i < tabButtons.length; i++) {
//       tabButtons[i].className = tabButtons[i].className.replace(" active", "");
//     }

//     // Show the current tab and add an active class to the button that opened it
//     document.getElementById(tabName).style.display = "block";
//     event.currentTarget.className += " active";
//   };

//   // Initialize the first tab to be active
//   document.getElementById("Tab1").style.display = "block";
// });
const tabData = {
  autoShip: {
      headerTitle: 'Up to 40% Off + Free Gifts',
      totalPrice: '',
      discountedPrice: '',
      packages: [
          {
              badge: 'Best Value',
              title: '120 Packets',
              discount: 'Save 40%',
              pricePerPacket: '$0.86/Packet',
              badgeColor: '#00a039',
              isPopular: false,
              textColor: 'white'
          },
          {
            badge: 'Most Popular',
            title: '90 Packets',
            discount: 'Save 30%',
            pricePerPacket: '$0.99/Packet',
            badgeColor: '#F9E450',
            isPopular: true,
            textColor: '#0d3063'
            
          },
          {
            badge: '',
            title: '60 Packets',
            discount: 'Save 20%',
            pricePerPacket: '$1.10/Packet',
            badgeColor: 'transparent',
            isPopular: false,
            textColor: ''
          },
          {
            badge: '',
            title: '30 Packets',
            discount: 'Save 10%',
            pricePerPacket: '$1.17/Packet',
            badgeColor: 'transparent',
            isPopular: false,
            textColor: ''
          }
          // Add other package options
      ],
      footerPoints: [
          'Free Shipping With Every Order',
          'Ships Within 12 Hours',
          'No Contract - cancel or adjust with ease'
      ],
      showCongrats: true
  },
  oneTime: {
      headerTitle: 'Up to 30% Off + Free Gifts',
      totalPrice: '',
      discountedPrice: '',
      packages: [
          {
              badge: 'Best Value',
              title: '120 Packets',
              discount: 'Save 30%',
              pricePerPacket: '$0.99/Packet',
              badgeColor: '#00a039',
              isPopular: false,
              textColor: 'white'
          },
          {
            badge: 'Most Popular',
            title: '90 Packets',
            discount: 'Save 20%',
            pricePerPacket: '$1.10/Packet',
            badgeColor: '#F9E450',
            isPopular: true,
            textColor: '#0d3063'
          },
          {
            badge: '',
            title: '60 Packets',
            discount: 'Save 10%',
            pricePerPacket: '$1.19/Packet',
            badgeColor: 'transparent',
            isPopular: false,
            textColor: ''
          },
          {
            badge: '',
            title: '30 Packets',
            discount: '',
            pricePerPacket: '$1.25/Packet',
            badgeColor: 'transparent',
            isPopular: false,
            textColor: ''
          }

          // Add other package options
      ],
      footerPoints: [
          'Happiness Guarantee',
          'Ships Within 12 Hours',
          'No Contract - cancel or adjust with ease'
      ],
      showCongrats: false
  }
};

const radioClosed = [
  'Free shipping with every order',
  'No Contact - cancel with ease',
  'Happiness Guarantee'
]

function updateProgressBar(packageSize) {
  const progressBar = document.querySelector('.progress');
  const freeShippingWrapper = document.querySelector('.free-shipping__wrapper');
  const freeBottleWrapper = document.querySelector('.free-bottle__wrapper');

  let progress = 0;

  switch (packageSize) {
    case '30 Packets':
      progress = 0;
      freeShippingWrapper.querySelector('img').src = 'https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581370_3c58fdb8-a0cc-462b-a05f-661094df1554.png?v=1726118773'; 
      freeBottleWrapper.querySelector('img').src = 'https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581369_2a028111-9d2d-484c-b05e-3c58c0c41847.png?v=1726119192';
      break;
    case '60 Packets':
      progress = 50; // Free Shipping unlocked
      // freeShippingWrapper.classList.add('unlocked');
      freeShippingWrapper.querySelector('img').src = 'https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581368_1.png?v=1726119249'; 
      freeBottleWrapper.querySelector('img').src = 'https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581369_2a028111-9d2d-484c-b05e-3c58c0c41847.png?v=1726119192';
      // freeBottleWrapper.classList.remove('unlocked');
      break;
    case '90 Packets':
    case '120 Packets':
      progress = 100; // Both Free Shipping and Bottle unlocked
      freeShippingWrapper.querySelector('img').src = 'https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581368_1.png?v=1726119249'; 

      freeBottleWrapper.querySelector('img').src = 'https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581369_2.png?v=1726119247'
      // freeShippingWrapper.classList.add('unlocked');
      // freeBottleWrapper.classList.add('unlocked');
      break;
    default:
      break;
  }

 
  progressBar.style.width = `${progress}%`;
}

function updatePrices(selectedPackage, isAutoship) {
  // Base price of the product (assuming it's available)
  const buyBoxWrapper = document.querySelector('.buy-box__wrapper');
  const productPrice = buyBoxWrapper.getAttribute('data-product-price');

  let basePrice = parseFloat(productPrice) / 100;
  console.log(basePrice); // Example price for one quantity
  let totalPrice = 0;
  let discountedPrice = 0;
  let discountPercentage = 0;
  let quantity = 1;

  // Discount logic based on package selection and autoship/one-time purchase
  if (isAutoship) {
    switch (selectedPackage) {
      case 30:
        discountPercentage = 10; // 10% discount
        quantity = 1; // 1 quantity
        break;
      case 60:
        discountPercentage = 20; // 20% discount
        quantity = 2; // 2 quantities
        break;
      case 90:
        discountPercentage = 30; // 30% discount
        quantity = 3; // 3 quantities
        break;
      case 120:
        discountPercentage = 40; // 40% discount
        quantity = 4; // 4 quantities
        break;
      default:
        discountPercentage = 0;
    }
  } else {
    switch (selectedPackage) {
      case 30:
        discountPercentage = 0; // No discount
        quantity = 1;
        break;
      case 60:
        discountPercentage = 10; // 10% discount
        quantity = 2;
        break;
      case 90:
        discountPercentage = 20; // 20% discount
        quantity = 3;
        break;
      case 120:
        discountPercentage = 30; // 30% discount
        quantity = 4;
        break;
      default:
        discountPercentage = 0;
    }
  }

  // Calculate the total and discounted prices
  totalPrice = basePrice * quantity;
  discountedPrice = totalPrice - (totalPrice * (discountPercentage / 100));

  // Update the prices in the HTML
  document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
  document.getElementById('discountedPrice').textContent = `$${discountedPrice.toFixed(2)}`;

  const activeRadioLabel = document.querySelector(`input[name="purchaseType"]:checked`).closest('.radio-label');
  const discountedPriceElement = activeRadioLabel.querySelector('.details__discounted-price');

  if (discountedPriceElement) {
    discountedPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
  }

  // Update total price if needed in a similar way
  const totalPriceElement = activeRadioLabel.querySelector('.details__total-price');
  if (totalPriceElement) {
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

}



function openTab(event, tabName) {
  // Update active tab button
  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.toggle("active");
  }
  if (event) event.currentTarget.classList.add("active");

  // Get the data for the selected tab
  const data = tabData[tabName];

  // Update header content
  document.getElementById('headerTitle').textContent = data.headerTitle;
  document.getElementById('totalPrice').textContent = data.totalPrice;
  document.getElementById('discountedPrice').textContent = data.discountedPrice;

  // Update package selector
  const packageSelector = document.getElementById('packageSelector');
  packageSelector.innerHTML = ''; // Clear previous packages
  data.packages.forEach((pkg, index) => {
      const packageBox = document.createElement('label');
      packageBox.className = 'details__package-box';
      if (pkg.badge) {
          const badge = document.createElement('span');
          badge.className = 'package__badge';
          badge.textContent = pkg.badge;
          if (pkg.badgeColor) badge.style.backgroundColor = pkg.badgeColor;
          if (pkg.textColor) badge.style.color = pkg.textColor;
          packageBox.appendChild(badge);
      }
      // const radio = document.createElement('input');
      // radio.type = 'radio';
      // radio.className = 'radio__package-box';
      // packageBox.appendChild(radio);

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'package';
      radio.value = pkg.title;
      radio.className = 'radio__package-box';
      radio.addEventListener('change', () => {
        updateProgressBar(pkg.title);
        const pack = parseInt(pkg.title);
        if ( tabName === "autoShip") {
          updatePrices(pack, true );
        }
        else {
          updatePrices(pack, false);
        };
      }); // Update progress bar on selection

      if (index === 0) {
        radio.checked = true;
        setTimeout( () => {
          updateProgressBar(pkg.title); // Initialize the progress bar for the first package
        }, 1000);
        const pack = parseInt(pkg.title);
        localStorage.setItem('packageRequired', JSON.stringify(pack));
  
        // Determine if it's Auto-Ship or One-Time
        if (tabName === "autoShip") {
          updatePrices(pack, true);
        } else {
          updatePrices(pack, false);
        }
      }

      packageBox.appendChild(radio);

      const details = document.createElement('div');
      details.className = 'package-details';
      details.innerHTML = `
          <h6 class="package-title">${pkg.title}</h6>
          <p class="package-discount">${pkg.discount}</p>
          <p class="packet-individual">${pkg.pricePerPacket}</p>
      `;
      packageBox.appendChild(details);
      packageSelector.appendChild(packageBox);
  });


  const giftWrapper = document.querySelector('.details__gift-wrapper');
  //giftWrapper.classList.add('details__gift-wrapper');
  giftWrapper.innerHTML = `
      <h6 class="gift-wrapper__title">You've unlocked $23.95 of free gifts!</h6>
       <div class="gift-progress-bar__wrapper">
         <div class="progressBar">
           <div class="progress" ></div>
         </div>
         <div class="free-shipping__wrapper">
           <div class="image-wrapper">
             <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581370.png?v=1726118319" class="free-shipping-img">
           </div>
           <span class="gift-title">Free Shipping</span>
         </div>
         <div class="free-bottle__wrapper">
           <div class="image-wrapper">
             <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581369_2a028111-9d2d-484c-b05e-3c58c0c41847.png?v=1726119192" class="nectar-bottle-img">
           </div>
           <span class="gift-title">Nectar Bottle</span>
         </div>
       </div>
  `;

  //container.appendChild(giftWrapper);


  // Update footer points
  const footer = document.querySelector('.details__footer');
  footer.innerHTML = ''; // Clear previous footer content

  if (data.showCongrats) {
      const congratsDiv = document.createElement('div');
      congratsDiv.className = 'details__footer-congrats';
      congratsDiv.innerHTML = `
          <div class="footer__icon-wrapper"><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group.png?v=1726037024" class="footer-img"></div>
          <p class="congrats-text"><span>Congrats!</span> You’re making proper Hydration and all the benefits that come with it a habit!</p>
      `;
      footer.appendChild(congratsDiv);
  }

  data.footerPoints.forEach(point => {
      const p = document.createElement('p');
      p.className = 'footer-value__point';
      p.innerHTML = `<span><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group_1484580410.png?v=1726037646" class="value-point__icon"></span> ${point}`;
      footer.appendChild(p);
  });

  // Add a subscription button if needed
  if (tabName === 'oneTime') {
      const button = document.createElement('button');
      button.className = 'sub-and-save__btn';
      button.innerHTML = `
          <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/file_4_1.png?v=1726036951" class="icon-gift">
          Tap here to subscribe and save $50.95
      `;
      footer.appendChild(button);
  }

  if (document.querySelector('.sub-and-save__btn')) {
    document.querySelector('.sub-and-save__btn').addEventListener('click', () => {
        
        if (selectedPackage) {
            const pack = parseInt(selectedPackage.value);
            updatePrices(pack, true);
            updateProgressBar(pack);
        }
        document.querySelector('.details__package-selector').scrollIntoView({ behavior: 'smooth' });
    });
}

  // if (tabName == 'autoShip') {
  //   updatePrices()
  // }
}



function renderTabContentDesktop(tabName) {
  const data = tabData[tabName];
  const container = document.getElementById(`${tabName}Content`);
  

  container.innerHTML = ''; // Clear previous content

  const packageSelector = document.createElement('div');
  packageSelector.classList.add('details__package-selector');

  // Render packages
  data.packages.forEach((pkg, index) => {
    const packageBox = document.createElement('label');
    packageBox.className = 'details__package-box';

    if (pkg.badge) {
      const badge = document.createElement('span');
      badge.className = 'package__badge';
      badge.textContent = pkg.badge;
      badge.style.backgroundColor = pkg.badgeColor;
      badge.style.color = pkg.textColor;
      packageBox.appendChild(badge);
    }

    const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'package';
      radio.value = pkg.title;
      radio.className = 'radio__package-box';
      radio.addEventListener('change', () => {
        updateProgressBar(pkg.title);
        const pack = parseInt(pkg.title);
        localStorage.setItem('packageRequired', JSON.stringify(pack));
        if ( tabName === "autoShip") {
          updatePrices(pack, true );
        }
        else {
          updatePrices(pack, false);
        };
      }); // Update progress bar on selection

      if (index === 0) {
        radio.checked = true;
        setTimeout( () => {
          updateProgressBar(pkg.title); // Initialize the progress bar for the first package
        }, 1000);
        const pack = parseInt(pkg.title);
        localStorage.setItem('packageRequired', JSON.stringify(pack));
  
        // Determine if it's Auto-Ship or One-Time
        if (tabName === "autoShip") {
          updatePrices(pack, true);
        } else {
          updatePrices(pack, false);
        }
      }

      packageBox.appendChild(radio);

    const details = document.createElement('div');
    details.className = 'package-details';
    details.innerHTML = `
      <h6 class="package-title">${pkg.title}</h6>
      <p class="package-discount">${pkg.discount}</p>
      <p class="packet-individual">${pkg.pricePerPacket}</p>
    `;
    packageBox.appendChild(details);
    packageSelector.appendChild(packageBox);
  });

  container.appendChild(packageSelector);

  const giftWrapper = document.createElement('div');
  giftWrapper.classList.add('details__gift-wrapper');
  giftWrapper.innerHTML = `
      <h6 class="gift-wrapper__title">You've unlocked $23.95 of free gifts!</h6>
       <div class="gift-progress-bar__wrapper">
         <div class="progressBar">
           <div class="progress"></div>
         </div>
         <div class="free-shipping__wrapper">
           <div class="image-wrapper">
             <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581370.png?v=1726118319" class="free-shipping-img">
           </div>
           <span class="gift-title">Free Shipping</span>
         </div>
         <div class="free-bottle__wrapper">
           <div class="image-wrapper">
             <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Frame_1484581369_2a028111-9d2d-484c-b05e-3c58c0c41847.png?v=1726119192" class="nectar-bottle-img">
           </div>
           <span class="gift-title">Nectar Bottle</span>
         </div>
       </div>
  `;

  container.appendChild(giftWrapper);

  // Render footer points
  const footer = document.createElement('div');
  footer.classList.add('details__footer');

  if (data.showCongrats) {
    const congratsDiv = document.createElement('div');
    congratsDiv.className = 'details__footer-congrats';
    congratsDiv.innerHTML = `
        <div class="footer__icon-wrapper"><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group.png?v=1726037024" class="footer-img"></div>
        <p class="congrats-text"><span>Congrats!</span> You’re making proper Hydration and all the benefits that come with it a habit!</p>
    `;
    footer.appendChild(congratsDiv);
}

if (tabName === 'oneTime') {
  const button = document.createElement('button');
  button.className = 'sub-and-save__btn';
  button.innerHTML = `
      <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/file_4_1.png?v=1726036951" class="icon-gift">
      Tap here to subscribe and save $50.95
  `;
  footer.appendChild(button);
}

  const valuePointsWrapper = document.createElement('div');
  valuePointsWrapper.classList.add('value-points__container');

  data.footerPoints.forEach(point => {
    const p = document.createElement('p');
    p.className = 'footer-value__point';
    p.innerHTML = `<span><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group_1484580410.png?v=1726037646"  class="value-point__icon"></span> ${point}`;
    valuePointsWrapper.appendChild(p);
  });

  footer.appendChild(valuePointsWrapper);


  const flavorBtnWrapper = document.createElement('div');
  flavorBtnWrapper.classList.add = 'choose-flavor__btn-wrapper'
  flavorBtnWrapper.innerHTML = `
  <button class="choose-flavor__btn" id="flavorSelectionBtnDesktop">Choose Your Flavors</button>
           <div class="delivery-text"><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group_1484580410.png?v=1726037646" class="value-point__icon"><span>Expected delivery in 3-5 business days<span></div>
  `;
  footer.appendChild(flavorBtnWrapper);


  container.appendChild(footer);


  // if (document.querySelector('.sub-and-save__btn')) {
  //   document.querySelector('.sub-and-save__btn').addEventListener('click', () => {

  //     renderTabContentDesktop('autoShip');
  //       const autoShipRadio = document.querySelector('input[name="purchaseType"][value="autoShip"]');
  //       autoShipRadio.checked = true;
  //       const selectedPackage = document.querySelector('input[name="package"]:checked');
  //       if (selectedPackage) {
  //           const pack = parseInt(selectedPackage.value);
  //           updatePrices(pack, true);
  //           updateProgressBar(pack);
  //       }
  //       document.querySelector('.details__package-selector').scrollIntoView({ behavior: 'smooth' });
  //   });
  // }

  if (document.querySelector('.sub-and-save__btn')) {
    document.querySelector('.sub-and-save__btn').addEventListener('click', () => {
      const autoShipDiv = document.getElementById('autoShipDiv');
      const oneTimeContent = document.getElementById('oneTimeContent');
      // Switch to the "Auto-Ship" tab
      renderTabContentDesktop('autoShip');
      if(autoShipDiv) {
        autoShipDiv.innerHTML = '';
      }
  
      // Set the "Auto-Ship" radio button as checked
      const autoShipRadio = document.querySelector('input[name="purchaseType"][value="autoShip"]');
      const oneTimeRadio = document.querySelector('input[name="purchaseType"][value="oneTime"]');
      if (autoShipRadio) {
        autoShipRadio.checked = true;  // Select Auto-Ship
      }
  
      // Uncheck the "One-Time" radio button (not necessary but for clarity)
      if (oneTimeRadio) {
        oneTimeRadio.checked = false;
      //  oneTimeContent.innerHTML = '';
      }
      handleRadioSwitch();
  
      // Update the prices and progress bar for the selected package in the Auto-Ship tab
      const selectedPackage = document.querySelector('input[name="package"]:checked');
      if (selectedPackage) {
        const pack = parseInt(selectedPackage.value);
        updatePrices(pack, true);  // Pass true for "Auto-Ship"
        updateProgressBar(pack);
      }
  
      // Scroll to the package selector if necessary
      const packageSelector = document.querySelector('.details__package-selector');
      if (packageSelector) {
        packageSelector.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

}

// Function to handle switching between radio buttons
function handleRadioSwitch() {
  const autoShipContent = document.getElementById('autoShipContent');
  const oneTimeContent = document.getElementById('oneTimeContent');

  const selectedRadio = document.querySelector('input[name="purchaseType"]:checked');
  const autoShipDiv = document.getElementById('autoShipDiv');

  // Clear both containers before rendering new content
  autoShipContent.innerHTML = '';
  oneTimeContent.innerHTML = '';

  if (selectedRadio.value === 'autoShip') {
    renderTabContentDesktop('autoShip');

    if(autoShipDiv) {
      autoShipDiv.innerHTML = '';
    }

  } else {
    renderTabContentDesktop('oneTime');

    if (autoShipDiv) {
      // const newDiv = document.createElement('div');
      // newDiv.id = 'autoShipDiv';
      const footer = document.createElement('div');
      footer.classList.add('details__footer');

      const valuePointsWrapper = document.createElement('div');
      valuePointsWrapper.classList.add('value-points__container');
      valuePointsWrapper.classList.add('radio-closed');

      radioClosed.forEach(point => {
        const p = document.createElement('p');
        p.className = 'footer-value__point';
        p.innerHTML = `<span><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group_1484580410.png?v=1726037646"  class="value-point__icon"></span> ${point}`;
        valuePointsWrapper.appendChild(p);
      });

      footer.appendChild(valuePointsWrapper);

      const congratsDiv = document.createElement('div');
      congratsDiv.className = 'details__footer-habit';
      congratsDiv.innerHTML = `
          <div class="footer__icon-wrapper"><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/research_2374492_1.png?v=1726210046" class="footer-img"></div>
          <p class="congrats-text">Studies show it takes on average 66 days to form a habit. Commit to making Hydration A Habit by subscribing.</p>
      `;
      footer.appendChild(congratsDiv);

      autoShipDiv.appendChild(footer);


      // document.querySelector('[data-tab="autoShip"]').appendChild(newDiv);
    }


  }
}

// Event listener for the radio buttons
document.querySelectorAll('input[name="purchaseType"]').forEach(radio => {
  radio.addEventListener('change', handleRadioSwitch);
});












document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const tabName = event.currentTarget.getAttribute('data-tab');
          openTab(event, tabName);
      });
  });

  renderTabContentDesktop('autoShip');


  

  // Initialize the first tab content on load for desktop
  if (window.innerWidth >= 768) { 
    renderTabContentDesktop('autoShip');
   
  } else {
    openTab(null, 'autoShip');
  }

  document.getElementById('flavorSelectionBtnDesktop').addEventListener('click', function() {
  
    // Navigate to the bundle selection page
    window.location.href = '/pages/brand-bundle/brand-bundle-bdsgucxe'; // Replace with your actual URL
  });

  document.getElementById('flavorSelectionBtnMobile').addEventListener('click', function() {
  
    // Navigate to the bundle selection page
    window.location.href = '/pages/brand-bundle/brand-bundle-bdsgucxe'; // Replace with your actual URL
  });

  const buyBox = document.querySelector('.buy-box__wrapper');

  const variantsData = buyBox.getAttribute('data-product-variants');



  const variants = JSON.parse(variantsData);

  localStorage.setItem('variantData', JSON.stringify(variants));

  // console.log(variants);
  



});