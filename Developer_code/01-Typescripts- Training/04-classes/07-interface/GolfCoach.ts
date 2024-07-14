import { Coach } from "./Coach";

export class GolfCoach implements Coach{
   
    getDailyWorkOut() {
        return "Hit 100 balls at Golf range";
    }
    
}