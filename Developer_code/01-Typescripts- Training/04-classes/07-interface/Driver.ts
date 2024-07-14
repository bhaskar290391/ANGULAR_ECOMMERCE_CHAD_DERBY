import { Coach } from "./Coach";
import { CricketCoach } from "./CricketCoach";
import { GolfCoach } from "./GolfCoach";

let cricketCoach=new CricketCoach()
let golfCaoch=new GolfCoach()

let coaches:Coach[]=[];

coaches.push(cricketCoach);
coaches.push(golfCaoch);

for(let coachData of coaches){
    console.log(coachData.getDailyWorkOut())
}