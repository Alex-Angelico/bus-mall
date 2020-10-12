'use strict';

var productVote = document.getElementById('productselector');
var productList = [];

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
  this.voteCount = 0;
  this.votePercentage = 0;
  productList.push(this);
}

Product.prototype.galleryPresent = function () {

};

console.log(productList);

var firstProductImage = document.getElementById('firstproduct_img');
firstProductImage.src = productList[3].file;

var firstProductLabel = document.getElementById('firstproduct_lbl');
firstProductLabel.textContent = productList[3].name;

var secondProductImage = document.getElementById('secondproduct_img');
secondProductImage.src = productList[6].file;

var secondProductLabel = document.getElementById('secondproduct_lbl');
secondProductLabel.textContent = productList[6].name;

var thirdProductImage = document.getElementById('thirdproduct_img');
thirdProductImage.src = productList[17].file;

var thirdProductLabel = document.getElementById('thirdproduct_lbl');
thirdProductLabel.textContent = productList[17].name;

var i = 0;
productVote.addEventListener('submit', console.log('confirm', i++));