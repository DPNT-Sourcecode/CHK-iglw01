let total = 0;
count = 19;
const specialOfferFiveCount = (Math.floor(count/5));
count -= specialOfferFiveCount*5;
console.log(count)
const specialOfferThreeCount = (Math.floor(count/3));
count -= specialOfferThreeCount*3;
console.log(count)
const price = count*50;
total += price+specialOfferFiveCount*200+specialOfferThreeCount*130;
console.log(total)
