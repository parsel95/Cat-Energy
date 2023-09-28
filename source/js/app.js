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

// Padding для изображений котов до и после на Планшетном разрешении

let imagesFrame = document.querySelector('.example__imgages');
const tabletWidthMediaQuery = window.matchMedia('(min-width: 768px) and (max-width: 1299px)');
const notMobileWidthMediaQuery = window.matchMedia('(min-width: 768px)');

function printLog (isMobileSize) {
  let imagesFramePadding = (window.innerWidth - 768) / 2 + 58 + 'px';

  const size = isMobileSize ? imagesFrame.style.padding = '0 ' + imagesFramePadding : imagesFrame.style.padding = 0

  console.log(`Padding у Images: ${size}`)
}

printLog(tabletWidthMediaQuery.matches)

tabletWidthMediaQuery.addEventListener('change', function (event) {
  printLog(event.matches)
});

function resizeWidthOnly(a,b) {
  var c = [window.innerWidth];
  return onresize = function() {
    var d = window.innerWidth,
        e = c.length;
    c.push(d);
    if(c[e]!==c[e-1]){
      clearTimeout(b);
      b = setTimeout(a, 50);
    }
  }, a;
}

resizeWidthOnly(function() {
  imagesFramePadding = (window.innerWidth - 768) / 2 + 58 + 'px';
});

// Кастомная Иконка на яндекс карте

let center = [59.938631, 30.323037];

function init() {
  let map = new ymaps.Map('map', {
    center: center,
    zoom: 15.5
  });

  let placemark = new ymaps.Placemark(center, {}, {
    iconLayout: 'default#image',
    iconImageHref: './img/map-pin-small.png',
    iconImageSize: [57, 53],
    iconImageoffset: [0, 0]
  });

  if (notMobileWidthMediaQuery.matches) {
    placemark = new ymaps.Placemark(center, {}, {
      iconLayout: 'default#image',
      iconImageHref: './img/map-pin-large.png',
      iconImageSize: [113, 103],
      iconImageoffset: [0, 0]
    });
  }

  map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  map.controls.remove('trafficControl'); // удаляем контроль трафика
  map.controls.remove('typeSelector'); // удаляем тип
  map.controls.remove('rulerControl'); // удаляем контрол правил

  map.geoObjects.add(placemark);
}

ymaps.ready(init);
