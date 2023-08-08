const navElement = document.querySelector('.page-header__nav');
const buttonElement = document.querySelector('.page-header__toggler');

navElement.classList.add('page-header__nav--closed');

buttonElement.addEventListener('click', () => {
  if (navElement.classList.contains('page-header__nav--closed')) {
    navElement.classList.add('page-header__nav--opened');
    navElement.classList.remove('page-header__nav--closed');
  } else {
    navElement.classList.add('page-header__nav--closed');
    navElement.classList.remove('page-header__nav--opened');
  }
});

let exampleImgages = document.querySelector('.example__imgages');
let switcherButtonBefore = document.querySelector('.switcher__button--before');
let switcherButtonAfter = document.querySelector('.switcher__button--after');
let switcherBar = document.querySelector('.switcher__bar');
let switcherToggler = document.querySelector('.switcher__toggler');
let exampleImgageBefore = document.querySelector('.example__image--before');
let exampleImgageAfter = document.querySelector('.example__image--after');

switcherButtonBefore.onclick = function () {
  exampleImgages.style.gridTemplateColumns = '100% 1fr';
  switcherBar.value = '0';
  exampleImgageBefore.classList.add('example__image--active');
  exampleImgageAfter.classList.remove('example__image--active');
  switcherToggler.classList.add('switcher__toggler--before');
  switcherToggler.classList.remove('switcher__toggler--after');
}

switcherButtonAfter.onclick = function () {
  exampleImgages.style.gridTemplateColumns = '0% 1fr';
  switcherBar.value = '100';
  exampleImgageAfter.classList.add('example__image--active');
  exampleImgageBefore.classList.remove('example__image--active');
  switcherToggler.classList.add('switcher__toggler--after');
  switcherToggler.classList.remove('switcher__toggler--before');
}

switcherBar.oninput = function () {
  exampleImgages.style.gridTemplateColumns = '1fr ' + switcherBar.value + '%';
}
