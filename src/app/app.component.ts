import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Occupation } from './model/Occupations';
import { UserPolicyDetails } from './model/UserPolicyDetails';
import { HttpService } from './services/httpServices';
import Validation from './utils/validation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    age: new FormControl(''),
    dob: new FormControl(''),
    occupation: new FormControl(''),
    sumInsured: new FormControl('')
  });
  submitted = false;
  occupationList:Occupation[]=[];  
  resPremium:number = 0;

  constructor(private formBuilder: FormBuilder, private httpService : HttpService) {
  }

  ngOnInit(): void {
    this.getOccupationList();

    this.form = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        age: ['', Validators.required],
        dob: ['', Validators.required],
        occupation: ['', Validators.required],
        sumInsured: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  getOccupationList(){
    this.httpService.getOccupationList().subscribe(
      occupationList=>(this.occupationList = occupationList));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    this.httpService.getPremium(this.form.value).subscribe(premium=>this.resPremium = premium);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
