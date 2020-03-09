import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from '../model/registration';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  reg: Registration;
  msg: string;
  isNew: boolean;


  constructor(private service: RegistrationService,
    private actRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.params.id;

    if (id) {
      this.isNew = false;
      this.service.getById(id).subscribe(
        (data) => {
          this.reg = data;
        }
      );
    } else {
      this.isNew = true;
      this.reg = {
        id: 0,
        username: '',
        password: '',
        confirmPassword: ''
      };
    }
  }

  save() {
    let ob: Observable<Registration>;

    if (this.isNew) {
      ob = this.service.add(this.reg);
    }
    ob.subscribe(
      (data) => {
        
        this.router.navigateByUrl("/cat");
      },
      (errResponse) => {
        this.msg = errResponse.error;

      }
    );
  }
}