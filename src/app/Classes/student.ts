export class Student {
    name: string;
    id: number;
    classname : string;
    image: string;
    constructor() {
        this.name ="";
        this.id = 0;
        this.classname ="";
        this.image ="";
    }
}

export class studentAccount{
    id: number;
    fullname: string;
    createdon: string;
    countryname: string;
    status: string;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.fullname= '';
        this.createdon= '';
        this.countryname= '';
        this.status = '';

    }
} 


export class searchOnsiteTutor{
        authtoken : string;
        studentid : number;
        subjectid : number;
        subjectcategoryid : number;
        fromprice : number;
        toprice : number;
        fromtime : string;
        totime : string;
        radius : number;
        startdate : string;
        numberofweek : number;

        /**
         *
         */
        constructor() {
            this.authtoken = "";
            this.studentid = 0;
            this.subjectid = 0;
            this.subjectcategoryid = 0;
            this.fromprice = 0;
            this.toprice = 0;
            this.fromtime  ="";
            this.totime  ="";
            this.radius = 0;
            this.startdate  ="";
            this.numberofweek = 1;
        }
      
}

export class searchOnsiteTutor_Result{
    id: number;
    firstname: string;
    lastname: string;
    latitude: number;
    longitude: number;
    distanceinkm: number;
    rating: number;
    subjectfee: number;
    currency : string;
    address :  string;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.firstname= "";
        this.lastname= "";
        this.latitude = 0;
        this.longitude = 0;
        this.distanceinkm = 0;
        this.rating = 0;
        this.subjectfee = 0;
        this.currency = "";  
        this.address = "";          
    }
}

export class booking{
    authtoken : string;
    studentid : number;
    tutorid : number;
    subjectid : number;
    subjectcategoryid : number;
    bookingtype : string;
    timefrom : string;
    timeto : string;
    addressid : number;
    deviceplatform : string;
    devicemodel : string;
    startdate : string;

    /**
     *
     */
    constructor() {
        this.authtoken ="";
        this.studentid = 0;
        this.tutorid = 0;
        this.subjectid = 0;
        this.subjectcategoryid = 0;
        this.bookingtype ="";
        this.timefrom ="";
        this.timeto ="";
        this.addressid = 0;
        this.deviceplatform ="";
        this.devicemodel ="";
        this.startdate ="";
    }
  } 


export class capturePayment{
    authtoken:string;
    bookingid:number;
    paymentmethodid:string;
    amount:number;
    currency: string;
    useremail: string;

    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.bookingid = 0;
        this.paymentmethodid = "";
        this.amount = 0;
        this.currency = "";;
        this.useremail = "";;
    }
}

export class savePayment{
    authtoken:string;
    bookingid:number;
    paymentmethodid:string;
    amount:string;
    customerid:string;
    transactionid:string;
    chargeid:string;
    numberofweek:number;

    /**
     *
     */
    constructor() {
        this.authtoken = ""
        this.bookingid = 0;
        this.paymentmethodid = ""
        this.amount = ""
        this.customerid = ""
        this.transactionid = ""
        this.chargeid = ""
        this.numberofweek = 0;
    }
}

export class bookingpushnotification{;
    authtoken: string;
    bookingid: string;
    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.bookingid = "";
            
    }
}

export class pushtoken  {
    authtoken:string;
    userid: 0;
    pushtoken: string;
    deviceid: string;
    deviceplatform: string;

    /**
     *
     */
    constructor() {
        this.authtoken = ""
        this.userid = 0;
        this.pushtoken = "";
        this.deviceid = "";
        this.deviceplatform = "";
    
    }
}