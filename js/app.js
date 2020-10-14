'use strict';

var productList = [];
var memoryProducts = [];
var productGallerySize = 4;
var productSelectorTitle = document.getElementById('selectortitle');
var surveyRounds = 5;
var voteRounds = 0;
var names = [];
var votes = [];
var views = [];

function Product(name = '', file = '') {
  this.name = name;
  this.file = file;
  this.votes = 0;
  this.views = 0;
  productList.push(this);
}

new Product('R2-D2 Carry-On Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Entertainment System', 'img/bathroom.jpg');
new Product('Open-Toed Rainboots', 'img/boots.jpg');
new Product('All-In-One Breakfast Machine', 'img/breakfast.jpg');
new Product('Meatball Bubble Gum', 'img/bubblegum.jpg');
new Product('Curious Chair', 'img/chair.jpg');
new Product('Cthulhu Action Figure', 'img/cthulhu.jpg');
new Product('Duckbill Dog Muzzle', 'img/dog-duck.jpg');
new Product('Canned Dragon Meat', 'img/dragon.jpg');
new Product('Pentensils', 'img/pen.jpg');
new Product('Pet Sweeper Booties', 'img/pet-sweep.jpg');
new Product('Pizza Scissors', 'img/scissors.jpg');
new Product('Shark Sleeping Bag', 'img/shark.jpg');
new Product('Baby Sweeper Onesie', 'img/sweep.png');
new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new Product('Canned Unicorn Meat', 'img/unicorn.jpg');
new Product('Tentacle USB Dongle', 'img/usb.gif');
new Product('Self-Watering Can', 'img/water-can.jpg');
new Product('Weird Wine Glass', 'img/wine-glass.jpg');

function dataRetrieval() {
  if (localStorage.getItem('storedProductList')) {
    var storedProductData = localStorage.getItem('storedProductList');
    // console.log('stored', storedProductData);
    var parsedProductData = JSON.parse(storedProductData);
    productList = parsedProductData;
    console.log('converted', productList);
  } else {
    alert('No stored data. Loading new survey.');
  }
}

function productRender() {
  var checkProducts = [];
  for (var i = 1; i <= productGallerySize; i++) {
    var selectProduct = randomProduct();
    while (checkProducts.includes(selectProduct) || memoryProducts.includes(selectProduct)) {
      selectProduct = randomProduct();
    }
    checkProducts.push(selectProduct);
    galleryElementCreator(i);
    document.getElementById(`product${i}_img`).src = productList[selectProduct].file;
    document.getElementById(`product${i}_lbl`).textContent = productList[selectProduct].name;
    productList[selectProduct].views++;
  }
  for (var j = 0; j < productGallerySize; j++) {
    memoryProducts.push(checkProducts[j]);
    if (memoryProducts.length > productGallerySize) {
      memoryProducts.shift();
    }
  }
}

function randomProduct() {
  return Math.floor(Math.random() * (productList.length - 1));
}

function galleryElementCreator(x) {
  var galleryElementAnchor = document.createElement('div');
  var galleryElementImage = document.createElement('img');
  var galleryElementSelect = document.createElement('input');
  var galleryElementLabel = document.createElement('label');
  galleryElementImage.setAttribute('id', `product${x}_img`);
  galleryElementSelect.setAttribute('id', `product${x}`);
  galleryElementSelect.setAttribute('type', 'radio');
  galleryElementSelect.setAttribute('name', 'select');
  galleryElementSelect.setAttribute('value', `${x}`);
  galleryElementLabel.setAttribute('id', `product${x}_lbl`);
  galleryElementLabel.setAttribute('for', `product${x}`);
  galleryElementAnchor.appendChild(galleryElementImage);
  galleryElementAnchor.appendChild(galleryElementSelect);
  galleryElementAnchor.appendChild(galleryElementLabel);
  document.getElementById('galleryanchor').appendChild(galleryElementAnchor);
}

var addVote = function (event) {
  event.preventDefault();
  productList[memoryProducts[event.target.select.value - 1]].votes++;
  voteRounds++;
  if (voteRounds >= surveyRounds) {
    document.getElementById('selectormenu').removeChild(document.getElementById('votebutton'));
    dataStorage();
    resultsButtonCreator();
  } else {
    var gallery = document.getElementById('galleryanchor');
    while (gallery.firstChild) {
      gallery.removeChild(gallery.firstChild);
    }
    productRender();
  }
};

function resultsButtonCreator() {
  var buttonContainer = document.createElement('form');
  var buttonAnchor = document.createElement('fieldset');
  var resultsButton = document.createElement('input');
  buttonContainer.setAttribute('id', 'resultscheck');
  buttonAnchor.setAttribute('id', 'resultstrigger');
  resultsButton.setAttribute('id', 'resultsbutton');
  resultsButton.setAttribute('type', 'submit');
  resultsButton.setAttribute('value', 'View Results');
  buttonAnchor.appendChild(resultsButton);
  buttonContainer.appendChild(buttonAnchor);
  document.getElementById('resultsheader').appendChild(buttonContainer);
  document.getElementById('resultscheck').addEventListener('submit', resultsTabulation);
}

var resultsTabulation = function (event) {
  document.getElementById('resultstrigger').removeChild(document.getElementById('resultsbutton'));
  event.preventDefault();
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].views) {
      var resultsEntry = document.createElement('li');
      resultsEntry.textContent = `${productList[i].name} had ${productList[i].votes} votes, and was viewed ${productList[i].views} times.`;
      document.getElementById('resultslist').appendChild(resultsEntry);
    }
  }
  resultsChartFiller();
  resultsChartBuilder();
};

function resultsChartFiller() {
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].views) {
      names.push(productList[i].name);
      votes.push(productList[i].votes);
      views.push(productList[i].views);
    }
  }
}

function resultsChartBuilder() {
  var chartAnchor = document.createElement('canvas');
  chartAnchor.setAttribute('id', 'resultschart');
  document.getElementById('survey').appendChild(chartAnchor);
  var ctx = document.getElementById('resultschart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'Votes',
        data: votes,
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        borderWidth: 1
      }, {
        label: 'Views',
        data: views,
        backgroundColor: '#0000FF',
        borderColor: '#0000FF',
        borderWidth: 1
      }],
      labels: names
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function dataStorage() {
  var convertedProductData = JSON.stringify(productList);
  localStorage.setItem('storedProductList', convertedProductData);
}

productSelectorTitle.textContent = `Vote for your favorite of the ${productGallerySize} products below:`;
document.getElementById('productselector').addEventListener('submit', addVote);

dataRetrieval();
productRender();
