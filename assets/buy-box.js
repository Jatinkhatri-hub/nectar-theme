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
      totalPrice: '$134.95',
      discountedPrice: '$89.95',
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
      totalPrice: '$134.95',
      discountedPrice: '$99.95',
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


function openTab(event, tabName) {
  // Update active tab button
  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
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
  data.packages.forEach(pkg => {
      const packageBox = document.createElement('div');
      packageBox.className = 'details__package-box';
      if (pkg.badge) {
          const badge = document.createElement('span');
          badge.className = 'package__badge';
          badge.textContent = pkg.badge;
          if (pkg.badgeColor) badge.style.backgroundColor = pkg.badgeColor;
          if (pkg.textColor) badge.style.color = pkg.textColor;
          packageBox.appendChild(badge);
      }
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.className = 'radio__package-box';
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
}


// function renderTabContentDesktop (tabName, container) {
//   const data = tabData[tabName];
//   container.innerHTML = '';

//   // const content = document.createElement('div');
//   // content.innerHTML = ""
//   // document.getElementById('headerTitle').textContent = data.headerTitle;
//   // document.getElementById('totalPrice').textContent = data.totalPrice;
//   // document.getElementById('discountedPrice').textContent = data.discountedPrice;

//   // Update package selector
//   const packageSelector = document.getElementById('packageSelector');
//   packageSelector.innerHTML = ''; // Clear previous packages
//   data.packages.forEach(pkg => {
//       const packageBox = document.createElement('div');
//       packageBox.className = 'details__package-box';
//       if (pkg.badge) {
//           const badge = document.createElement('span');
//           badge.className = 'package__badge';
//           badge.textContent = pkg.badge;
//           if (pkg.badgeColor) badge.style.backgroundColor = pkg.badgeColor;
//           if (pkg.textColor) badge.style.color = pkg.textColor;
//           packageBox.appendChild(badge);
//       }
//       const radio = document.createElement('input');
//       radio.type = 'radio';
//       radio.className = 'radio__package-box';
//       packageBox.appendChild(radio);
//       const details = document.createElement('div');
//       details.className = 'package-details';
//       details.innerHTML = `
//           <h6 class="package-title">${pkg.title}</h6>
//           <p class="package-discount">${pkg.discount}</p>
//           <p class="packet-individual">${pkg.pricePerPacket}</p>
//       `;
//       packageBox.appendChild(details);
//       packageSelector.appendChild(packageBox);
//   });

//   // Update footer points
//   const footer = document.querySelector('.details__footer');
//   footer.innerHTML = ''; // Clear previous footer content

//   if (data.showCongrats) {
//       const congratsDiv = document.createElement('div');
//       congratsDiv.className = 'details__footer-congrats';
//       congratsDiv.innerHTML = `
//           <div class="footer__icon-wrapper"><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group.png?v=1726037024" class="footer-img"></div>
//           <p class="congrats-text"><span>Congrats!</span> You’re making proper Hydration and all the benefits that come with it a habit!</p>
//       `;
//       footer.appendChild(congratsDiv);
//   }

//   data.footerPoints.forEach(point => {
//       const p = document.createElement('p');
//       p.className = 'footer-value__point';
//       p.innerHTML = `<span><img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group_1484580410.png?v=1726037646" class="value-point__icon"></span> ${point}`;
//       footer.appendChild(p);
//   });

//   // Add a subscription button if needed
//   if (tabName === 'oneTime') {
//       const button = document.createElement('button');
//       button.className = 'sub-and-save__btn';
//       button.innerHTML = `
//           <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/file_4_1.png?v=1726036951" class="icon-gift">
//           Tap here to subscribe and save $50.95
//       `;
//       footer.appendChild(button);
//   }
// }

function renderTabContentDesktop(tabName, container) {
  const data = tabData[tabName];
  container.innerHTML = ''; // Clear previous content

  container.innerHTML = `
    <div class="details__package-selector" id="packageSelector">
      ${data.packages.map(pkg => `
        <label class="details__package-box">
          <span class="package__badge" style="background-color: ${pkg.badgeColor}; color: ${pkg.textColor};">${pkg.badge}</span>
          <input type="radio" class="radio__package-box">
          <div class='package-details'>
            <h6 class="package-title">${pkg.title}</h6>
            <p class="package-discount">${pkg.discount}</p>
            <p class="packet-individual">${pkg.pricePerPacket}</p>
          </div>
        </label>
        `).join('')}
    </div>
    <div class="details__gift-wrapper">
                    <h6 class="gift-wrapper__title">You've unlocked $23.95 of free gifts!</h6>
                    <div class="gift-progress-bar__wrapper">
                      <div class="progressBar">
                        <div class="progress" style="width: 50%;"></div>
                      </div>
                      <div class="free-shipping__wrapper">
                        <div class="image-wrapper">
                          <img src="https://cdn.shopify.com/s/files/1/0852/8553/6031/files/Group_1484580827_1.png?v=1726084589" class="free-shipping-img">
                        </div>
                        <span class="gift-title">Free Shipping</span>
                      </div>
                      <div class="free-bottle__wrapper">
                        <div class="image-wrapper">
                          <img src="{{ 'nectar-bottle.png' |  asset_url}}" class="nectar-bottle-img">
                        </div>
                        <span class="gift-title">Nectar Bottle</span>
                      </div>
                    </div>
                 </div>
  `;
  
  
};




document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const tabName = event.currentTarget.getAttribute('data-tab');
          openTab(event, tabName);
      });
  });

  const desktopRadioButtons = document.querySelectorAll('.radio-tab');
  desktopRadioButtons.forEach(radio => {
    radio.addEventListener('change', (event) => {
      const tabName = event.currentTarget.getAttribute('data-tab');
      const container = event.currentTarget.closest('.radio-label').querySelector('.radio-content-container');
      renderTabContentDesktop(tabName, container);
    });
  });

  // Initialize the first tab content on load for desktop
  if (window.innerWidth >= 768) { 
    const firstRadio = document.querySelector('.radio-tab[data-tab="autoShip"]');
    if (firstRadio) {
      firstRadio.checked = true;
      renderTabContentDesktop('autoShip', firstRadio.closest('.radio-label').querySelector('.radio-content-container'));
    }
  } else {
    openTab(null, 'autoShip');
  }

  //  // Desktop radio buttons event listeners
  //  const desktopRadioButtons = document.querySelectorAll('.radio-tab');
  //  desktopRadioButtons.forEach(radio => {
  //    radio.addEventListener('change', (event) => {
  //      const tabName = event.currentTarget.getAttribute('data-tab');
  //      const container = event.currentTarget.closest('.radio-label').querySelector('.radio-content-container');
  //      renderTabContentDesktop(tabName, container);
  //    });
  //  });

  // // Initialize the first tab
  // // openTab(null, 'autoShip');
  //  // Initialize the first tab/radio content
  // if (window.innerWidth >= 768) { // Desktop
  //   const firstRadio = document.querySelector('.radio-tab[data-tab="autoShip"]');
  //   if (firstRadio) {
  //     firstRadio.checked = true;
  //     renderTabContentDesktop('autoShip', firstRadio.closest('.radio-label').querySelector('.radio-content-container'));
  //   }
  // } else { // Mobile
  //   renderTabContentMobile('autoShip');
  // }
});