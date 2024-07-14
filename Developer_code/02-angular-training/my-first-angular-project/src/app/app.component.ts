import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'This is my First Angular App';

  firstName:string="Bhaskar";
  lastname:string="Mudaliyar";
}
