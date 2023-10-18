import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";

@Injectable({
    providedIn: 'root'
})
export class SignalrService {
    public char: any;
    public convertResult: string = "test";

    public hubConnection: any;

    public setupConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7035/converter')
            .build();
    }
    public startConnection = (input: any) => {
        this.hubConnection
            .start()
            .then(() => console.log('Connection Started'))
            .then(() => this.startConversion(input))
            .catch((err: any) => console.log('Error while starting connection: ' + err));
    }

    public startConversion = (input: any) => {
        this.hubConnection.invoke('startconvert', input)
            .catch((err: any) => console.error(err));
    }

    public stopConversion = () => {
        this.hubConnection.stop();
    }

    public addStopConversionListener = () => {
        this.hubConnection.on('stopconverter', (data: any) => {
            console.log(data);
        })
    }


}