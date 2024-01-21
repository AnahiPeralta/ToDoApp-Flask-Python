document.addEventListener('DOMContentLoaded', function () {
    const hamburgerIcon = document.querySelector('.btn-hamburguer');
    const contentHeader = document.querySelector('.content-header');
    const navListItems = document.querySelectorAll('.nav li');
  
    hamburgerIcon.addEventListener('click', function () {
      contentHeader.classList.toggle('full-width');
      
      navListItems.forEach(function (item) {
        const spanElement = item.querySelector('span');
        if (spanElement) {
          spanElement.classList.toggle('show-span');
        }
      });
    });
  });