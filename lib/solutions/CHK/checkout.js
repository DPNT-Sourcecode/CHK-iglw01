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

    const itemCount = {"A": 0, "B": 0, "C": 0, "D": 0, "E": 0};
    for (let item of skus){
        if(itemPrices.has(item)){
           itemCount[item] = (itemCount[item] || 0) + 1;
        }else{
            return -1;
        }
    }
    
    let total = 0;

    // Compute the Free Values:
    let countE = itemCount["E"];
    const specialOfferE = Math.floor(countE/2);
    itemCount["B"] = (itemCount["B"] || 0) - specialOfferE;
    if (itemCount["B"] <= 0){
         delete itemCount["B"];
    }

    for(let item in itemCount){
        let count = itemCount[item];
        if(item === "A"){
            // Check Special Offer with 5 As
            const specialOfferFiveCount = (Math.floor(count/5));
            count -= specialOfferFiveCount*5;
            const specialOfferThreeCount = (Math.floor(count/3));
            count -= specialOfferThreeCount*3;
            const price = count*itemPrices.get(item);
            total += price+specialOfferFiveCount*200+specialOfferThreeCount*130;
        } else if(item === "B"){
            const specialCount = Math.floor(count/2);
            const specialTotal = specialCount*45;
            const rest = (count%2)*itemPrices.get(item);
            total += rest+specialTotal;
        }
        else{
            // C, D and E
            const cost = itemPrices.get(item);
            total += (cost*count);
        }
    }

    return total;
};




