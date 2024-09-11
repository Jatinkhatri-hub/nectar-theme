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
              badgeColor: '#FFCC00',
              isPopular: false
          }
          {
            badge: 'Most Popular',
            title: '90 Packets',
            discount: 'Save 30%',
            pricePerPacket: '$0.99/Packet',
            badgeColor: '#F9E450',
            isPopular: true
          },
          {
            badge: '',
            title: '60 Packets',
            discount: 'Save 30%',
            pricePerPacket: '$0.99/Packet',
            badgeColor: '#FFCC00',
            isPopular: false
          },
          {
            badge: 'Best Value',
            title: '120 Packets',
            discount: 'Save 30%',
            pricePerPacket: '$0.99/Packet',
            badgeColor: '#FFCC00',
            isPopular: false
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
              badgeColor: '#FFCC00',
              isPopular: false
          },
          {
            badge: 'Best Value',
            title: '120 Packets',
            discount: 'Save 30%',
            pricePerPacket: '$0.99/Packet',
            badgeColor: '#FFCC00',
            isPopular: false
          },
          {
            badge: 'Best Value',
            title: '120 Packets',
            discount: 'Save 30%',
            pricePerPacket: '$0.99/Packet',
            badgeColor: '#FFCC00',
            isPopular: false
          },
          {
            badge: 'Best Value',
            title: '120 Packets',
            discount: 'Save 30%',
            pricePerPacket: '$0.99/Packet',
            badgeColor: '#FFCC00',
            isPopular: false
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

document.addEventListener('DOMContentLoaded', () => {

})