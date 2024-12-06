var str = "a2b4c6";

var result = "";
var strArray = str.split("");

const map1 = new Map();
for (var i = 0; i < strArray.length-1; i++) {
    if(isNaN(strArray[i])) {
        map1.set(strArray[i], strArray[i+1]);
    }
}

console.log(map1);
map1.forEach((value, key) => {
    for (var i = 0; i < value; i++) {
        result += key;
    }   
})
console.log(result);