export class Twillio {
}
// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);

export class Room
{
    sid:string;
    status :string;
    dateCreated:string;
    dateUpdated:string;
    accountSid :string;
    enableTurn :boolean;
    uniqueName :string;
    statusCallback :string;
    statusCallbackMethod :string;
    endTime : string;
    duration  : string;
    type : string;
    maxParticipants : number;
    maxConcurrentPublishedTracks: number;
    recordParticipantsOnConnect : boolean;
    videoCodecs : string;
    mediaRegion :string;
    audioOnly : boolean;
    url :string;

    /**
     *
     */
    constructor() {
        this.sid= "";
        this.status = "";
        this.dateCreated= "";
        this.dateUpdated= "";
        this.accountSid = "";
        this.enableTurn = false;
        this.uniqueName = "";
        this.statusCallback = "";
        this.statusCallbackMethod = "";
        this.endTime = "";
        this.duration  = "";
        this.type = "";
        this.maxParticipants = 0;
        this.maxConcurrentPublishedTracks= 0;
        this.recordParticipantsOnConnect = false;
        this.videoCodecs = "";
        this.mediaRegion = "";
        this.audioOnly = false;
        this.url = "";
    

    }
}
export class roomRequest{
    authtoken : string;
  roomname : string;
  /**
   *
   */
  constructor() {
    this.authtoken ="";
    this.roomname ="";

  }

}