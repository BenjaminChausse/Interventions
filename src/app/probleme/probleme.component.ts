import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme : ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeproblemeService: ProblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
    prenom: ['',[Validators.required, VerifierCaracteresValidator.longueurMinimum(3)]],
    nom: ['',[Validators.required, VerifierCaracteresValidator.longueurMinimum(3)]],
    noTypeProbleme: ['',[Validators.required]],
    typeProbleme: ['', Validators.required],
    courrielGroup: this.fb.group({
      courriel: [{value: '', disabled: true}],
      courrielConfirmation: [{value: '', disabled: true}],
    }),
  telephone: [{value: '', disabled: true}]
    })
    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);
  }
  gestionTelephone(typeTelephone: string): void { 
    const telephone = this.problemeForm.get('telephone');
    telephone.clearValidators();
    telephone.reset();
    telephone.disable();
    telephone.updateValueAndValidity();
    telephone.updateValueAndValidity();
}
gestionCourriel(typeCourriel: string): void {
  const courrielControl = this.problemeForm.get('courrielGroup.courriel');
  const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
  const courrielGroupControl = this.problemeForm.get('courrielGroup'); 

  courrielControl.clearValidators();
  courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
  courrielControl.disable();

  courrielConfirmationControl.clearValidators();
  courrielConfirmationControl.reset();
  courrielConfirmationControl.disable();

  courrielControl.updateValueAndValidity();
  courrielConfirmationControl.updateValueAndValidity(); 

}
  save(): void {
  }

}
