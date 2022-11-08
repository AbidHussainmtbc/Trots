import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Room, roomRequest } from 'src/app/Classes/twillio';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NamedRoom, VideoChatService } from 'src/app/shared/services/videochat.service';
//import { NamedRoom, VideoChatService } from '../services/videochat.service';

@Component({
    selector: 'app-rooms',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {
    @Output() roomChanged = new EventEmitter<string>();
    @Input() activeRoomName: string;

    roomName: string;
    rooms: NamedRoom[];
    objRoom: Room;
    objRoomRequest : roomRequest;
    private subscription: Subscription;

    constructor(
        private readonly videoChatService: VideoChatService,
        private apiService: ApiServiceService) {
        this.objRoomRequest = new  roomRequest();
         }

    async ngOnInit() {
        await this.updateRooms();
        this.subscription =
            this.videoChatService
                .$roomsUpdated
                .pipe(tap(_ => this.updateRooms()))
                .subscribe();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onTryAddRoom() {
        if (this.roomName) {
            this.onAddRoom(this.roomName);
        }
    }

    onAddRoom(roomName: string) {
        debugger;
        if(roomName == null || roomName == "" || roomName == undefined){
            var n =     sessionStorage.getItem("romname")
            this.objRoomRequest.roomname = n;
            this.RoomGenerated(n);
        }
        else{
  // this.objRoomRequest.roomname = roomName;
        // this.apiService.GetDetails("Video/token").subscribe(rtnData => {
        //     debugger;
        //     console.log(rtnData)
        this.RoomGenerated("");
        // }, (err) => {
        //     debugger;
        //     alert("Error occured.");
        // });

        // alert("test")
        // this.roomName = null;
        // roomName = "abidTesting"

        }
    }
    RoomGenerated(token: string){
            // this.objRoomRequest.authtoken = token;  
            var token =  sessionStorage.getItem("token");
            this.objRoomRequest.authtoken =token;
            // "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMjgiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJzdHVkZW50IiwiZXhwIjoxNjQ4MjQwNTA3LCJpc3MiOiJUcm90cy5FZHVjYXRpb24iLCJhdWQiOiJUcm90c0FwaVVzZXIifQ.4SYF_ZUNghG4Q-HAuvDLRN15WT_qZSqGp6KBrrtVV2Q";
            this.apiService.tawillio_Room(this.objRoomRequest , "Video/CreateRoom").subscribe(rtnData => {
                debugger;
                console.log(rtnData)

                if(rtnData.message =="Room exists"){
                    this.onJoinRoom(this.objRoomRequest.roomname)
                }

            }, (err) => {
                debugger;
               // alert("Error occured.");
            });
            this.roomChanged.emit(this.objRoomRequest.roomname);
    }
    onJoinRoom(roomName: string) {
        this.roomChanged.emit(roomName);
    }

    async updateRooms() {
        this.rooms = (await this.videoChatService.getAllRooms()) as NamedRoom[];
    }
}
