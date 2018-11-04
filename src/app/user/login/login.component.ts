
import {Component, OnDestroy, OnInit, Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../user";
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs/Rx";




@Component({
  selector: 'app-user-create',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit, OnDestroy {

  id: string;
  user: User;
  userForm: FormGroup;
  private sub: any;
 msg: string;
 messageErreurConx: string;
  
     errorLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });


    this.userForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      post: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      mail: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])
    });



    if (this.id) { //edit form
      this.userService.findById(this.id).subscribe(
        user => {
            this.id = user.id;
            this.userForm.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            post: user.post,
            mail: user.mail,
            pwd: user.pwd,
            role: user.role,
         
          });
         }
      );
    }


  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

 onSubmit() {
  if (this.userForm.valid) {
  
      let user: User = new User(null,
        this.userForm.controls['nom'].value,
        this.userForm.controls['prenom'].value,
        this.userForm.controls['post'].value,
        this.userForm.controls['mail'].value,
        this.userForm.controls['pwd'].value,
        this.userForm.controls['role'].value);
     // this.userService.loginUser(user).subscribe(
       /* todos => {
          
          this.msg = "true";
          this.router.navigate(['/dashbord']);
        }
        */
       
    
    //  );
      let response = this.userService.loginUser(user);
     
    //response.$observable.toPromise().then((res: any) => {
      response.subscribe(
        (res:any) => {
         // window.location.href = '/dashbord';
          this.errorLoggedIn = false;
          console.log("login error"+this.errorLoggedIn);
          console.log("login error"+res.status);
          if(res.status=== 200)
          {
            this.router.navigate(['/dashbord']); 
          }
         // this.router.navigate(['/dashbord']);  

        },
        (error: any) => {
            this.errorLoggedIn = true;
           // window.location.href = '/logintest';

            if (this.errorLoggedIn === true) {

                this.messageErreurConx = "Votre email ou mot de passe est incorrecte";
                console.log("login error"+this.errorLoggedIn);
            }
          //  window.location.href = '/accueil';
         
        }
        
    );
    

   

      this.userForm.reset();
       

  }
}
  redirectUserPage() {
    this.router.navigate(['/user']);

  }





  

}

