import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PhraseService} from '../../../services/phrase.service';
import {Phrase} from '../../../interfaces/phrase';
import {AlertService} from '../../../alert/alert.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  @Input({required:true}) id:string='';
  phrase: Phrase | undefined;
  phraseForm!: FormGroup; // FormGroup to manage the form
  submitted = false; // Track if the form was submitted
  constructor(
    private fb: FormBuilder,
    private phraseService: PhraseService,
    private alertService: AlertService,
    private router: Router,
    private location: Location
  ) {
  }
  ngOnInit() {
    this.phrase = this.phraseService.getPhrase(this.id)
    this.createForm(); // Initialize the form

  }

  createForm() {
    console.log(this.phrase);
    this.phraseForm = this.fb.group({
      title: [this.phrase?.title, [Validators.required, Validators.minLength(2)]],
      description: [this.phrase?.description, [Validators.required, Validators.minLength(10)]],
      example: [this.phrase?.example],
      seen: [this.phrase?.seen],
      needToReview: [this.phrase?.needToReview],
      hide: [this.phrase?.hide],
      createdAt: [this.phrase?.createdAt],
      updatedAt: [new Date()]
    });
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.phraseForm.controls;
  }

  // Handle form submission
  onSubmit() {
    this.submitted = true;

    // Stop if the form is invalid
    if (this.phraseForm.invalid) {
      return;
    }

    // Collect form data into a Phrase object
    const editedPhrase: Phrase = {
      ...this.phraseForm.value
    };

    editedPhrase.id = this. id;
    console.log(editedPhrase)
    // Save the phrase using the service
    this.phraseService.updatePhrase(editedPhrase);
    this.alertService.showAlert('Phrase Updated successfully!', 'success',3000);

    // Reset the form
    this.phraseForm.reset({
      seen: false,
      needToReview: true,
      hide: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    this.submitted = false;
    this.goBack()
  }
  goBack() {
    this.location.back()
  }
}
