var reviews = [5, 5, 4.5, 4, 3];
var total = 0;
var average = 0;
for (var i = 0; i < reviews.length; i++) {
    console.log("The reviews are ==> " + reviews[i]);
    total += reviews[i];
}
console.log("The total is ==>" + total);
console.log("The average is ==>" + (total / reviews.length));
