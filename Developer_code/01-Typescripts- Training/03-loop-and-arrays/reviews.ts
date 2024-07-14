let reviews:number[]=[5,5,4.5,4,3];
let total:number=0;
let average :number=0;

for(let i=0;i<reviews.length;i++){
    console.log("The reviews are ==> "+reviews[i]);
    total +=reviews[i];

}
console.log("The total is ==>"+total);
console.log("The average is ==>"+(total/reviews.length))