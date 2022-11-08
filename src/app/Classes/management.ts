export class Management {

}
export class tutorCounter{
    totalstudents: number;
totalsubjects: number;
totaltutors: number;

declinedusers: number;
pendingusers: number;
verfiedusers: number;

/**
 *
 */
constructor() {
    this.totalstudents = 0;;
    this.totalsubjects = 0;;
    this.totaltutors = 0;;
    this.declinedusers= 0;
    this.pendingusers= 0;
    this.verfiedusers= 0;
}
}

export class allstudents{
    className: string; 
    countryName: string; 
    fullname: string; 
    id: number; 
    imagePath: string; 
    joinDate: string; 
    mobile: string; 
    phone: string; 
/**
 *
 */
constructor() {
    this.className = ""; 
    this.countryName = ""; 
    this.fullname = ""; 
    this.id = 0; 
    this.imagePath = ""; 
    this.joinDate = ""; 
    this.mobile = ""; 
    this.phone = ""; 
}
}

export class classesdetails{
    classname: string;
endtime: string;
startdate: string;
starttime: string;
subjectname: string;
topic: string;

/**
 *
 */
constructor() {
    this.classname = "";
    this.endtime = "";
    this.startdate = "";
    this.starttime = "";
    this.subjectname = "";
    this.topic = "";
        
}
}

export class subjects{
    subjectFee :number;
    subjectname :string;
    subjectshortname :string;
    testPercentage :number;
    ctgry:string;
    certificatepath:string;

    /**
     *
     */
    constructor() {
        this.subjectFee =0;
        this.subjectname =""
        this.subjectshortname  ="";
        this.testPercentage =0;
        this.ctgry = "";
    }
}

export class completeProfile{
    classesdetails:classesdetails[];
educationlist:education[];
email: string;
fullname: string;
gender: string;
imagepath: string;
mobile: string;
phone: string;
ratings: number;
subjects: subjects[];

}


export class education{
    grade: number
institutename: string
passingyear: number

/**
 *
 */
constructor() {
    this.grade = 0
    this.institutename = "";
    this.passingyear = 0
            
}
}

export class subjectswithcategories{
    subjectid:number;
    subjecname: string;
    categorylist:categorylist[];
    /**
     *
     */
    constructor() {
        this.subjectid= 0;
        this.subjecname = "";
        this.categorylist = [];
    }
}

export class categorylist{
    id: number;
    name: string;
    /**
     *
     */
    constructor() {
        this.id = 0;
        this.name= "";
    }
}

export class pagination{
    PageNumber: number;
    Index: number;

    constructor() {
        this.PageNumber = 0;
        this.Index = 0;
    }
}


export class dashboardSubject{
    subjectname : string;
    authorname : string;
    classname: string ;
    bgcolor : string;
    fontcolor:string;

    /**
     *
     */
    constructor() {
        this.subjectname ="";
        this.authorname ="";
        this.classname ="";
        this.bgcolor ="";
        this.fontcolor ="";
    }
}
