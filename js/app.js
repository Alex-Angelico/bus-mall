'use strict';

var productList = [];
var productGallerySize = 3;
var displayProducts = [];
var surveyRounds = 25;
var voteRounds = 0;
var productVote = document.getElementById('productselector');

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

function Product(name = '', file = '') {
  this.name = name;
  this.file = file;
  this.votes = 0;
  this.appearances = 0;
  productList.push(this);
}

function randomProduct() {
  return Math.floor(Math.random() * (productList.length - 1));
}

function productRender() {
  // var displayProducts = [];
  for (var i = 1; i <= productGallerySize; i++) {
    var selectProduct = randomProduct();
    while (displayProducts.includes(selectProduct)) {
      selectProduct = randomProduct();
    }
    displayProducts.push(selectProduct);
    var productImage = document.getElementById(`product${i}_img`);
    var productLabel = document.getElementById(`product${i}_lbl`);
    productImage.src = productList[selectProduct].file;
    productLabel.textContent = productList[selectProduct].name;
  }
}

var addVote = function (event) {
  event.preventDefault();
  productList[displayProducts[event.target.select.value]].votes += 1;
  productList[displayProducts[event.target.select.value]].appearances += 1;
  voteRounds += 1;
  if (voteRounds === surveyRounds) {
    displayProducts = [];
    var voteButtonAnchor = document.getElementById('selectormenu');
    var voteButton = document.getElementById('votebutton');
    voteButtonAnchor.removeChild(voteButton);
    resultsButton();
  } else {
    displayProducts = [];
    productRender();
  }
};

var resultsButton = function () {
  var resultsHeader = document.getElementById('resultsheader');
  var buttonContainer = document.createElement('form');
  buttonContainer.setAttribute('id', 'resultscheck')
  var buttonAnchor = document.createElement('fieldset');
  var resultsButton = document.createElement('input');
  resultsButton.setAttribute('id', 'resultsbutton');
  resultsButton.setAttribute('type', 'submit');
  resultsButton.setAttribute('value', 'View Results');
  buttonAnchor.appendChild(resultsButton);
  buttonContainer.appendChild(buttonAnchor);
  resultsHeader.appendChild(buttonContainer);
  resultsTrigger();
};

var resultsTrigger = function () {
  var checkResults = document.getElementById('resultscheck');
  checkResults.addEventListener('submit', resultsTabulation);
};

var resultsTabulation = function (event) {
  event.preventDefault();
  var resultsAnchor = document.getElementById('resultslist');
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].appearances > 0) {
      var resultsEntry = document.createElement('li');
      resultsEntry.textContent = `${productList[i].name} had ${productList[i].votes} votes, and was seen ${productList[i].appearances} times.`;
      resultsAnchor.appendChild(resultsEntry);
    }
  }
};

productRender();

productVote.addEventListener('submit', addVote);
