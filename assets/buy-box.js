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


document.addEventListener('DOMContentLoaded', () => {
  
})