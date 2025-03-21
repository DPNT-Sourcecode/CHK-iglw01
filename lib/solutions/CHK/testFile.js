//Stores the Freebies:
const freebies = {
    "E": [2, "B"],
    "F": [2, "F"],
    "N": [3, "M"],
    "R": [3, "Q"],
    "U": [3, "U"],

}

const skus = "E";


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


const itemCount = {};
for (let item of skus){
    if(itemPrices.has(item)){
        itemCount[item] = (itemCount[item] || 0) + 1;
    }else{
        return -1;
    }
}


function ComputeFreebies(letter){
    if (freebies.hasOwnProperty(letter)){

        const count = itemCount[letter]; // 1
        const [freebieCount, freebieLetter] = freebies[letter]; // [number, letter] 2, "B"

        console.log("Freebie count", freebieCount, freebieLetter)
        // Letter is the same as the Freebie letter
        if(freebieLetter === letter){
            console.log("Count and Freebie count:", count, freebieCount);
            const free = Math.floor(count / freebieCount+1);
            console.log("Called!", count, free)
            itemCount[letter] = itemCount[letter]-free;
        }
        // Letter isn't the same - (free item is something else):
        else{
            const free = Math.floor(count/ freebieCount); // 1 / 2
            itemCount[freebieLetter] = Math.max(0, (itemCount[freebieLetter] || 0) - free);
        }
    }
}


console.log(ComputeFreebies("F"));

console.log(itemCount)


