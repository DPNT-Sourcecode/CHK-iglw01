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
+------+--

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
    ])

    const itemCount = {"A": 0, "B": 0, "C": 0, "D": 0};
    for (let item of skus){
        if(itemPrices.has(item)){
           itemCount[item] = (itemCount[item] || 0) + 1;
        }else{
            return -1;
        }
    }
    
    let total = 0;
    for(let item in itemCount){
        const count = itemCount[item];
        if(item === "A"){
            // Check Special Offer with 5 As
            const specialOfferFive = (Math.floor(count/5));
            const currentTotal = count-specialOfferFive;
            const specialOfferThree = (Math.floor(count/3));

            const specialCount = Math.floor(count/3);
            const specialTotal = specialCount*130;
            const rest = (count%3)*itemPrices.get(item);
            total += rest+specialTotal;
        } else if(item === "B"){
            const specialCount = Math.floor(count/2);
            const specialTotal = specialCount*45;
            const rest = (count%2)*itemPrices.get(item);
            total += rest+specialTotal;
        }
        else{
            // C and D
            const cost = itemPrices.get(item);
            total += (cost*count);
        }
    }

    return total;


};