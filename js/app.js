'use strict';

var productList = [];
// var displayProducts = [];
var memoryProducts = [];
var productGallerySize = 3;
var surveyRounds = 25;
var voteRounds = 0;

function Product(name = '', file = '') {
  this.name = name;
  this.file = file;
  this.votes = 0;
  this.appearances = 0;
  productList.push(this);
}

new Product('R2-D2 Carry-On Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Floor Stand', 'img/bathroom.jpg');
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

function productRender() {
  var checkProducts = [];
  for (var i = 1; i <= productGallerySize; i++) {
    var selectProduct = randomProduct();
    while (checkProducts.includes(selectProduct) || memoryProducts.includes(selectProduct)) {
      selectProduct = randomProduct();
      if (checkProducts.includes(selectProduct)) {
        console.log('checkProducts duplicate detected:', selectProduct + ' random value');
      } else if (memoryProducts.includes(selectProduct)) {
        console.log('memoryProducts duplicate detected:', selectProduct + ' random value');
      }
    }
    checkProducts.push(selectProduct);
    document.getElementById(`product${i}_img`).src = productList[selectProduct].file;
    document.getElementById(`product${i}_lbl`).textContent = productList[selectProduct].name;
    productList[selectProduct].appearances++;
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

var addVote = function (event) {
  event.preventDefault();
  productList[memoryProducts[event.target.select.value - 1]].votes++;
  voteRounds++;
  if (voteRounds >= surveyRounds) {
    document.getElementById('selectormenu').removeChild(document.getElementById('votebutton'));
    resultsButton();
  } else {
    productRender();
  }
};

function resultsButton() {
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
    if (productList[i].appearances > 0) {
      var resultsEntry = document.createElement('li');
      resultsEntry.textContent = `${productList[i].name} had ${productList[i].votes} votes, and was seen ${productList[i].appearances} times.`;
      document.getElementById('resultslist').appendChild(resultsEntry);
    }
  }
};

productRender();

document.getElementById('productselector').addEventListener('submit', addVote);
