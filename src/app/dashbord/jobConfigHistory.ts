export class jobConfigHistory {

    currentName: string;
    date: string;
    hasConfig: boolean;
    job: string;
    oldName:  string;
    operation: string;
    user: string;
    userID: string;

   
    constructor(currentName: string, date: string, hasConfig: boolean, job: string, operation: string ,user:string,userID: string,oldName:  string){
      this.currentName = currentName;
      this.date = date;
      this.hasConfig = hasConfig;
      this.job = job;
      this.oldName = oldName;
      this.operation = operation;
      this.user = user;
      this.userID = userID;
    }
  
  }
  