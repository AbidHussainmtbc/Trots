import { subjects } from "./management";

export class Tutor {
    id: number;
    jobdate: string;
    subjectname: string;
    timefrom: string;
    timeto: string;
    topic: string;

    /**

     */
    constructor() {
        this.id = 0;
        this.jobdate = "";
        this.subjectname = "";
        this.timefrom = "";
        this.timeto = "";
        this.topic = "";
    }
}

export class tutorEarning {
    weekearning: number;
    monthearning: number;
    totalearning: number;
    /**
     *
     */
    constructor() {
        this.weekearning = 0;
        this.monthearning = 0;
        this.totalearning = 0;

    }
}

export class allRating {
    id: number;
    bookingid: number;
    subjectname: string;
    topic: string;
    rating: number;
    jobdate: string;
    /**
     *
     */
    constructor() {
        this.id = 0
        this.bookingid = 0;
        this.subjectname = "";
        this.topic = "";
        this.rating = 0;
        this.jobdate = "";

    }
}

export class Agrement {

    compliancetext: string;
    haserror: boolean;
    message: string;
    statuscode: number

    /**
     *
     */
    constructor() {
        this.compliancetext = "";
        this.haserror = false
        this.message = "";
        this.statuscode = 0;


    }
}

export class subjectList {
    id: number;
    name: string;
    hasquestions: boolean;
    shortdescription: string;
    totalattempts: number;
    attemptsdone: number;
    testresult: ""

}


//AssessmentTest/getquestions")




export class ResponseGetTutorSubjectsQuestion {
    statuscode: number;
    haserror: Boolean;
    message: string;
    result: ResultResponseGetTutorSubjectsQuestion[];
    /**
     *
     */
    constructor() {
        this.statuscode =0;
        this.haserror = false;
        this.message= "";
        this.result = [];

    }
}

export class ResultResponseGetTutorSubjectsQuestion {
    id: number;
    question: String;
    questiontime: number;
    correctanswer: string;
    options: ResultResponseGetTutorSubjectsQuestionOption[];

    /**
     *
     */
    
    constructor() {
        this.id= 0;
        this.question= "";
        this.questiontime= 0  
        this.correctanswer= "";
        this.options= [];
    }
}

export class ResultResponseGetTutorSubjectsQuestionOption {
    id: number;
    value: string;

    /**
     *
     */
    constructor() {
        this.id = 0;
        this.value = "";
    }
}


//////Catagory////
export class Categorylist {
    id: number;
    name: string;
    /**
     *
     */
    constructor() {
        this.id = 0;
        this.name = "";                
    }
}

export class Result {
    subjectid: number;
    subjecname: string;
    categorylist: Categorylist[];
    /**
     *
     */
    constructor() {
        this.subjectid= 0;
        this.subjecname = "";
        this.categorylist = [];
    }
}

export class gettutorsubjects{
            id:number;
            name: string; 
            hasquestions:boolean;
            shortdescription: string; 
            totalattempts:number;
            attemptsdone:number;
            testresult: string;    
            subjectcategoryid: number
            subjectcategoryname: string
            /**
             *
             */
            constructor() {
                this.id = 0;
                this.name = ""; 
                this.hasquestions=false;
                this.shortdescription = ""; 
                this.totalattempts = 0;
                this.attemptsdone = 0;
                this.testresult = "";
            }
}

export class QuizAnswer{
    apikey: string;
    userid: number;
    subjectid: number;
    answers:Quizanswerslist[]

    /**
     *
     */
    constructor() {
        this.apikey = "";
        this.userid =0;
        this.subjectid = 0;
        this.answers = []
                
    }
}

export class Quizanswerslist{
questionid: number;
selectedoption: string;
/**
 *
 */
constructor() {
    this.questionid = 0;
    this.selectedoption ="";

}
}


export class tutorList{
email:string;
fullname: string;
id: number;
mobile: string;
phone: string;
subjects:subjects[]

/**
 *
 */
constructor() {
    this.email= "";
    this.fullname= "";
    this.id = 0;
    this.mobile= "";
    this.phone = "";
    this.subjects = []
}
}

