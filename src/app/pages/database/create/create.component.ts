import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PhraseService} from '../../../services/phrase.service';
import {Phrase} from '../../../interfaces/phrase';
import {AlertService} from '../../../alert/alert.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  phraseForm!: FormGroup; // FormGroup to manage the form
  submitted = false; // Track if the form was submitted
  constructor(
    private fb: FormBuilder,
    private phraseService: PhraseService,
    private alertService: AlertService,
    private location: Location
  ) {
  }
  ngOnInit() {
    this.createForm(); // Initialize the form

  }

  createForm() {
    this.phraseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      example: [''],
      seen: [false],
      needToReview: [true],
      hide: [false],
      createdAt: [new Date()],
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
    const newPhrase: Phrase = {
      ...this.phraseForm.value
    };
    // Save the phrase using the service
    this.phraseService.savePhrase(newPhrase);
    this.alertService.showAlert('Phrase saved successfully!', 'success',3000);
    this.goBack()
  }

  goBack() {
    this.location.back()
  }
}
