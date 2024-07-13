import { Coach } from "./Coach";

export class CricketCoach implements Coach{
   
    getDailyWorkOut() {
        return "Practise spin bowling for 30 mins";
    }
    
}