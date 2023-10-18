import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { SignalrService } from 'src/core/singalrService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  convertString = "testString";
  serverMessage: string = "";
  userInput: string = "";
  inputError: boolean = false;
  constructor(public signalrService: SignalrService, public http: HttpClient) { }

  ngOnInit(): void {
    this.signalrService.setupConnection();
    this.addSendCharacterListener();
    this.signalrService.addStopConversionListener();
  }

  convert() {
    if (this.userInput == "") {
      this.inputError = true;
    }
    else {
      this.inputError = false;
      this.serverMessage = "";
      this.signalrService.startConnection(this.userInput);
    }
  }

  cancel() {
    this.signalrService.stopConversion();
  }

  public addSendCharacterListener = () => {
    this.signalrService.hubConnection.on('sendcharacter', (data: any) => {
      this.serverMessage += data;
      console.log(data);
    })
  }
}
