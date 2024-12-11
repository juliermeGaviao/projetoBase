import { Component } from '@angular/core'
import { SharedService } from 'src/app/services/shared.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  constructor(public sharedService: SharedService) {}

}
