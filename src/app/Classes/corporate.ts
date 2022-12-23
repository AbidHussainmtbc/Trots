export class Corporate {
}


export class ViewDeleteStudent {
    isView: boolean
    stdID: string

    /**
     *
     */
    constructor() {
        this.isView = false;
        this.stdID = "";
    }
}

export class CorpTutor {
    authtoken: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    mobile: string;
    gender: string;
    id:number;
    subjectIds:string 
    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.email = "";
        this.password = "";
        this.firstname = "";
        this.lastname = "";
        this.mobile = "";
        this.gender = "";
        this.id = 0
        this.subjectIds= ""; 
    }
}


export class CorpStudent {
    authtoken: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    mobile: string;
    gender: string;
    classid: number;
    id:number
    selected:boolean
    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.email = "";
        this.password = "";
        this.firstname = "";
        this.lastname = "";
        this.mobile = "";
        this.gender = "";
        this.classid = 0;
        this.id =0;
        this.selected = false;
    }
}

export class subjectResp{
id: number
name: string 
shortname : string
selected: boolean 
/**
 *
 */
constructor() {
    this.id = 0
    this.name = "" 
    this.shortname = ""
    this.selected = false 
}
}

export class corpSubject {
    authtoken: string;
    corporateAccId: number;
    subjectName: string;
    shortName: string;

    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.corporateAccId = 0;
        this.subjectName = "";
        this.shortName = "";
    }
}


export class createbooking {
    authtoken: string;
    corporateAccId: number;
    tutorId: number;
    subjectId: number;
    studentIds: string;
    startDate: Date;
    timeFrom: string;
    timeTo: string;
    noOfClasses: number;
    

    /**
     *
     */
    constructor() {
        this.authtoken = "";
        this.corporateAccId = 0;
        this.tutorId = 0;
        this.subjectId = 0;
        this.studentIds = "";
        this.startDate = new Date();
        this.timeFrom = "";
        this.timeTo = "";
        this.noOfClasses = 0;
    }
}


export class CorpSignin {
    apikey: string;
    username: string;
    password: string;

    /**
     *
     */
    constructor() {
        this.apikey = "";
        this.username = "";
        this.password = "";
    
    }
}


export class dashboard_corp{
    completedCourses:number
    haserror:boolean;
    message:string
    pendingCourses:number;
    remainingStudentQuota :number;
    remainingTeacherQuota:number;
    statuscode:number;
    totalStudentQuota:number;
    totalTeacherQuota:number;
    upcomingCourses:number;

    /**
     *
     */
    constructor() {
        this.completedCourses = 0
        this.haserror = false;
        this.message = ""
        this.pendingCourses = 0
        this.remainingStudentQuota = 0;
        this.remainingTeacherQuota = 0;
        this.statuscode = 0;
        this.totalStudentQuota = 0;
        this.totalTeacherQuota = 0;
        this.upcomingCourses = 0;
    }

}


export class Bookings {
    bookingId: number;
    sessionId: number;
    tutorId: number;
    firstName: string;
    lastName: string;
    sessionDate: string;
    totalStudents: number;
    timeFrom: string;
    timeTo: string;
    subjectId: number;
    subjectName: string;

    /**
     *
     */
    constructor() {
        this.bookingId = 0;
        this.sessionId = 0;
        this.tutorId = 0;
        this.firstName = "";
        this.lastName = "";
        this.sessionDate = "";
        this.totalStudents = 0;
        this.timeFrom = "";
        this.timeTo = "";
        this.subjectId = 0;
        this.subjectName = "";
    }
}


export class report{
    isTutor:boolean
reportReason:string
reportedBy:string
reportedTime:string
reportedUser:string
sessionId :number
subjectName:string

/**
 *
 */
constructor() {
    this.isTutor = false
    this.reportReason = ""
    this.reportedBy = ""
    this.reportedTime = ""
    this.reportedUser = ""
    this.sessionId = 0
    this.subjectName = ""
    

}
}
export class viewActivity
{
    authtoken: string
    corporateAccId: number
    reportedId: number
    reportedById: number
    sessionId: number
    reportReason: string
    reportTime: string

    /**
     *
     */
    constructor() {
        this.authtoken=""
        this.corporateAccId = 0
        this.reportedId = 0
        this.reportedById = 0
        this.sessionId = 0
        this.reportReason =""
        this.reportTime =""
    }
  }