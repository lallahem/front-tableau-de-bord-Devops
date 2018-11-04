import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {User} from "../user";
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit, OnDestroy {

  id: string;
  user: User;
  userForm: FormGroup;
  private sub: any;
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
    if (this.id) {
      let user: User = new User(this.id,
        this.userForm.controls['nom'].value,
        this.userForm.controls['prenom'].value,
        this.userForm.controls['post'].value,
        this.userForm.controls['mail'].value,
        this.userForm.controls['pwd'].value,
        this.userForm.controls['role'].value);
      this.userService.updateUser(user).subscribe();
    } else {
      let user: User = new User(null,
        this.userForm.controls['nom'].value,
        this.userForm.controls['prenom'].value,
        this.userForm.controls['post'].value,
        this.userForm.controls['mail'].value,
        this.userForm.controls['pwd'].value,
        this.userForm.controls['role'].value);
      this.userService.saveUser(user).subscribe();

    }

      this.userForm.reset();
      this.router.navigate(['/user']); 

  }
}
  redirectUserPage() {
    this.router.navigate(['/user']);

  }





  

}