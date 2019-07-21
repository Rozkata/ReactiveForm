import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visitValue } from '@angular/compiler/src/util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rForm: FormGroup;
  post: any;
  description: string = '';
  name: string = '';
  titleAlert: string = 'This field is required';

  constructor(private fb: FormBuilder) {
    /*We are describing the form here-> Validators.required
    means that there will be a required validation on those fields */
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'description': [null,Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'validate': ''
    });
  }

  ngOnInit() {

  
    this.rForm.get('validate').valueChanges.subscribe (
      (validate) => {
        if (validate == '1') {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        }
        else {
          this.rForm.get('name').setValidators(Validators.required);
        }
      }
    )
  
    this.rForm.get('name').setValidators(Validators.required);

  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }
}
