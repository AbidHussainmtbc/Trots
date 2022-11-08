export class User {
    authtoken: string;
    email: string;
    firstname: string;
    lastname: string;
    refreshtoken: string;
    tutorid: number;
    studentid: number;
    id: number;
    /**
     *
     */
    constructor() {
        this.id = 0;
        this.authtoken = "";
        this.email = "";
        this.firstname = "";
        this.lastname = "";
        this.refreshtoken = "";
        this.tutorid = 0;
        this.studentid = 0;
    }
}
export class signupFin{
    apikey : string ;
    userguid : string ;
    esignature : string ;
    currentdatetime : string ;

    /**
     *
     */
    constructor() {
        this.apikey = "";
        this.userguid = "";
        this.esignature = "";
        this.currentdatetime = "";
                
    }
  }
