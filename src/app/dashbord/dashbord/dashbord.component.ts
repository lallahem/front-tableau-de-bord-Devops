import { Component, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions , Response } from '@angular/http';
import { jobConfigHistory } from '../jobConfigHistory';
import {  jobConfigHistoryservice } from '../jobConfigHisory.service';
import { Router } from '@angular/router';
import "rxjs/add/operator/map";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  providers: [jobConfigHistoryservice]
})
export class DashbordComponent implements OnInit {

  private jobConfigHistorys: jobConfigHistory[];
  private builds :any [] = [];
  private jacoco : any [] = [];

  i:string;
  l:number;
  public barChartLabels: string[] = [];
 // public barChartLabels:string[];
  //title = 'app';
  dd: any;
  ddd : any;
  aa:any
  datearray : any[] = [];
  arr : number [] = [];
  buildarray : any[] = [];
  jacocoarray : any[]=[];
  build : any ;
   constructor(private router: Router,private http: Http,
  private jobConfigHistoryservices: jobConfigHistoryservice) { }
//Chart Labels
// public barChartLabels:string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
 
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

//Chart data
public BarChartData: Array<any>;
 public barChartData: Array<any> = [
   {data:  [12, 15, 80, 29, 42, 60, 19], label: 'build failed'},
   {data: [29, 38, 40, 21, 82, 30, 89], label: 'build success'}
 ];

  // lineChart
  public lineChartData: Array<any> ;
  // = [
  //   {data: [28, 48, 11,52, 88, 30, 50,36,78,56,44,36 ], label: 'Series A'},
    // {data: [28, 48, 40,19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 95, 27, 40], label: 'Series C'}
  // ];
  public lineChartLabels: Array<any>;
  public BarChartLabels:string[]=['branch', 'class', 'complexityScore', 'instruction', 'line', 'methode'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public BarChartColours: Array<any> = [{
    backgroundColor: 'rgba(51, 179, 90, 0.6)',
    borderColor: 'rgba(51, 179, 90, 1)',
    borderWidth: 1,
                    }];
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

   ngOnInit()  {
     
//this.createRange();
    //this.getAllJobConfigHistorys();
    //this.createRange()
    //alert(this.jobConfigHistorys.length);
     let username : string = 'wissem';
     let password : string = '123';
     let headers = new Headers({
       'Content-Type': 'application/json; charset=utf-8',
       'Accept':'application/json',
       "Authorization": "Basic d2lzc2VtOjEyMw==" 
       //+ btoa(username + ":" + password)
       //"Content-Type": "application/x-www-form-urlencoded"
     });
     // headers.append();   
     // headers.append();
     // headers.append("Authorization", "Basic " + btoa(username + ":" + password)); 
     // headers.append("Content-Type", "application/x-www-form-urlencoded");
         // headers.append('Access-Control-Allow-Origin', '*');
       headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
       headers.append('Content-Type', 'application/json; charset=utf-8');
 
 
     //console.log(headers);
     this.http.get('/api/job/wissem/api/json', new RequestOptions({ headers: headers }))
       .map((res: Response) => <any>res.json())
       .subscribe((data: any) => {
         this.dd = data.builds;
         //console.log(this.dd);
         this.dd.forEach(element => {
           //console.log(element.number);
           this.buildarray.push(element.number)

         });
         this.build = {data: this.buildarray , label : 'build' };
         
         //console.log("build");
         //console.log(this.build);
         this.lineChartData = Array(this.build);
         //console.log(this.lineChartData);

       });
       // git projects 
       //localhost/api/v4/projects
       var projects=[];
       var pre_commits=[];
       var commit=[];
       this.http.get('http://localhost/api/v4/projects',new RequestOptions({headers: headers}))
       .map((res:Response) => <any>res.json())
       .subscribe((data: any) => {
         projects=data;
         console.log(projects);
         this.http.get('http://localhost/api/v4/projects/'+projects[0].id+'/repository/commits',new RequestOptions({headers: headers}))
       .map((res:Response) => <any>res.json())
       .subscribe((data: any) => {
        pre_commits=data; // commites with all info 
        
        console.log(pre_commits);
        var dictionary_commit  = {};

         //console.log(pre_commits);
         for (let i=0;i<pre_commits.length;i++){
           if (pre_commits[i].committed_date in dictionary_commit)
         dictionary_commit[pre_commits[i].committed_date]++;
         else
         dictionary_commit[pre_commits[i].committed_date]=1;
         //console.log(dictionary_commit[pre_commits[i].committed_date]);
        }
        var dates=Object.keys(dictionary_commit);
        var commits = [dates.length] // nombre commits
        var i=0; 
        for(var key in dictionary_commit) commits[i++]=( dictionary_commit[key] );
        console.log(dates); /// es dates 
        console.log(commits); // nbr commit 

        
          
        });
        
          
        });

     this.http.get('/api/job/wissem/jobConfigHistory/api/json',new RequestOptions({headers: headers}))
     .map((res:Response) => <any>res.json())
     .subscribe((data: any) => {
       //console.log(data.jobConfigHistory);
       this.ddd = data.jobConfigHistory;
      this.ddd.forEach(element => {
        //console.log(element.date); 
        this.datearray.push(element.date.split("_")[0]) 
        
      });

     this.lineChartLabels =this.datearray;
     //console.log(this.lineChartLabels)



     this.http.get('/api/job/wissem/lastBuild/jacoco/api/json',new RequestOptions({headers: headers}))
     .map((res:Response) => <any>res.json())
     .subscribe((data: any) => {
       console.log(data);
      this.aa = data;
      this.arr.push(this.aa.branchCoverage.total);
      this.arr.push(this.aa.classCoverage.total);
      
      // this.arr = [test,test1];
      
      this.arr.push(this.aa.complexityScore.total);
      this.arr.push(this.aa.instructionCoverage.total);
      this.arr.push(this.aa.lineCoverage.total);
      this.arr.push(this.aa.methodCoverage.total);
      
//      for (let i=0 ; i<10 ; i++){
// console.log(this.arr[i]);
//      }


      //  this.arr.forEach(element => {
      // console.log(element[0]);
      // this.arr.push(element);
        
      //   });
      console.log(this.arr);
      let x = {data: this.arr,label :'Coverage'};
      this.BarChartData= Array(x);
      console.log(this.barChartData);
 
    });

     });
    
   }

 

  getAllJobConfigHistorys() {
    this.jobConfigHistoryservices.findAll().subscribe(
     jobConfigHistorys => {
        this.jobConfigHistorys = jobConfigHistorys;
       //console.log(JSON.stringify(this.jobConfigHistorys))
      },
      errr => {
        //console.log(errr);
        
      }

    );
  }

  
  

   
   // Chart events
   public chartClicked(e:any):void {
     //console.log(e);
   }
 
   // Chart events
   public chartHovered(e:any):void {
     //console.log(e);
   }

}

