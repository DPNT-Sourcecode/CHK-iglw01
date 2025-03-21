'use strict';

/*Our price table and offers:
+------+-------+------------------------+
| Item | Price | Special offers         |
+------+-------+------------------------+
| A    | 50    | 3A for 130, 5A for 200 |
| B    | 30    | 2B for 45              |
| C    | 20    |                        |
| D    | 15    |                        |
| E    | 40    | 2E get one B free      |
| F    | 10    | 2F get one F free      |
| G    | 20    |                        |
| H    | 10    | 5H for 45, 10H for 80  |
| I    | 35    |                        |
| J    | 60    |                        |
| K    | 80    | 2K for 150             |
| L    | 90    |                        |
| M    | 15    |                        |
| N    | 40    | 3N get one M free      |
| O    | 10    |                        |
| P    | 50    | 5P for 200             |
| Q    | 30    | 3Q for 80              |
| R    | 50    | 3R get one Q free      |
| S    | 30    |                        |
| T    | 20    |                        |
| U    | 40    | 3U get one U free      |
| V    | 50    | 2V for 90, 3V for 130  |
| W    | 20    |                        |
| X    | 90    |                        |
| Y    | 10    |                        |
| Z    | 50    |                        |
+------+-------+------------------------+


For any illegal input return -1

checkout(string) -> integer
 - param[0] = a string containing the SKUs of all the products in the basket
 - @return = an integer representing the total checkout value of the items
 */

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    const itemPrices= new Map([
        ["A", 50],
        ["B", 30],
        ["C", 20],
        ["D", 15],
        ["E", 40],
        ["F", 10],
        ["G", 20],  
        ["H", 10],    
        ["I", 35],
        ["J", 60],
        ["K", 80],
        ["L", 90],
        ["M", 15],
        ["N", 40],
        ["O", 10],
        ["P", 50],
        ["Q", 30],
        ["R", 50],
        ["S", 30],
        ["T", 20],
        ["U", 40],
        ["V", 50],
        ["W", 20],
        ["X", 90],
        ["Y", 10],
        ["Z", 50],
    ]);

    // Stores the offers:
    const offers = {
        "A": [
            [5, 200],  
            [3, 130], 
        ],
        "B": [
            [2, 45],
        ],
        "H": [
            [10, 80],
            [5, 45],
        ],
        "K": [
            [2, 150],
        ],
        "P": [
            [5, 200],
        ],
        "Q": [
            [3, 80],
        ],
        "V": [
            [3, 130],
            [2, 90],
        ]
    };


    //Stores the Freebies:
    const freebies = {
        "E": [2, "B"],
        "F": [2, "F"],
        "N": [3, "M"],
        "R": [3, "Q"],
        "U": [3, "U"],

    }


    const itemCount = {};
    for (let item of skus){
        if(itemPrices.has(item)){
           itemCount[item] = (itemCount[item] || 0) + 1;
        }else{
            return -1;
        }
    }
    
    let total = 0;

    // uses itemCount and friebies Dictionary
    function ComputeFreebies(letter){
        if (freebies.hasOwnProperty(letter)){
            const count = itemCount[letter];
            const [freebieCount,freebieLetter] = freebies[letter]; // [number, letter]
            // Letter is the same as the Freebie letter
            if(freebieLetter === letter){
                const free = Math.floor(count / freebieCount+1);
                itemCount[letter] = itemCount[letter]-free;
            }
            // Letter isnt the same - (free item is something else):
            else{
                const free = Math.floor(count/ freebieCount);
                itemCount[freebieLetter] = Math.max(0, itemCount[freebieLetter]-free);
            }
        }
    }

    // Calculate the Freebies:
    for(let item in itemCount){
        ComputeFreebies(item);
    }

    // Compute the Actual Cost:
    function ComputeCost(letter){
        let count = itemCount[letter];
        // Has offers:
        if(offers.hasOwnProperty(letter)){
            const offersForLetter = offers[letter];/* [ [5, 200], [3, 130]], */
            let countOffers = [];
            // Stores the offers and their relative price:
            for(let i = 0; i < offersForLetter.length; i++){
                const [offer, price] = offersForLetter[i];
                const specialOfferCount = (Math.floor(count/offer));
                count -= specialOfferCount * offer;
                countOffers.push([specialOfferCount, price]);
            }

            // loop through the count of the offers and add them to the total:
            for(let i = 0; i < countOffers.length; i++){
                const [offer, price] = countOffers[i];
                total += offer*price;
            };
            // finally compute whats left:
            total += count*itemPrices.get(letter);
        }
        // No offers:
        else{
            const cost = itemPrices.get(letter);
            total += (cost*count);
        }
    }


    for(let item in itemCount){
        ComputeCost(item);
    }

    return total;
};

