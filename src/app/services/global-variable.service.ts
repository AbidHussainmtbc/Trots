import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {
  loginUserName :string ="";
  FormName:string =""
  constructor() { }
}
