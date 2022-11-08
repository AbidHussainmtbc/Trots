import { connect, ConnectOptions, LocalTrack, Room } from 'twilio-video';
import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ReplaySubject , Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from '../../environments/environment';

interface AuthToken {
    token: string;
}

export interface NamedRoom {
    id: string;
    name: string;
    maxParticipants?: number;
    participantCount: number;
}

export type Rooms = NamedRoom[];

@Injectable({
    providedIn: 'root'
})
export class VideoChatService {
    $roomsUpdated: Observable<boolean>;

    private roomBroadcast = new ReplaySubject<boolean>();
    authtoken: string="";
    constructor(private readonly http: HttpClient) {
        this.$roomsUpdated = this.roomBroadcast.asObservable();
        this.envData = environment;
    }
    envData;
    private async getAuthToken(roomname:any) {
        var url = `${this.envData.apiConn}`;
        var token = sessionStorage.getItem("token");
    const headers = {
      'content-type': 'application/json',
      apikey: this.envData.apiAccessKey,
      'Authorization': 'Bearer ' + token
    };
    // alert('Video/token')
    // alert(this.authtoken)
    // if(this.authtoken ==""){
        const Parameter = new HttpParams().set('roomname',roomname.toString() )
        const auth =
            await this.http
                      .get<AuthToken>(url +'Video/token', { params: Parameter , headers: headers })
                      .toPromise();
        this.authtoken =auth.token; 
        return auth.token;
    // }
    // else 
    // {
    //     return this.authtoken
    // }

    }

    getAllRooms() {
        debugger;
        var url = `${this.envData.apiConn}`;
        var token = sessionStorage.getItem("token");
        const headers = {
          'content-type': 'application/json',
          apikey: this.envData.apiAccessKey,
          'Authorization': 'Bearer ' + token
        };
        debugger;
        return this.http
                   .get<Rooms>(url+ 'video/rooms', {headers: headers })
                   .toPromise();
    }

    async joinOrCreateRoom(name: string, tracks: LocalTrack[]) {
        let room: Room = null;
        // alert('test');
        debugger;

        try {
            const token = await this.getAuthToken(name);
            console.log('RoomToken');
            console.log(token);
            console.log('RoomToken');
            debugger;
            room =
                await connect(
                    token, {
                        name,
                        tracks,
                        dominantSpeaker: true
                    } as ConnectOptions);
        } catch (error) {
            console.error(`Unable to connect to Room: ${error.message}`);
        } finally {
            if (room) {
                this.roomBroadcast.next(true);
            }
        }

        return room;
    }

    nudge() {
        this.roomBroadcast.next(true);
    }
}
