import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
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

gestionNotification(typeNotification: string): void {

  const telephone = this.problemeForm.get('telephone');
  telephone.clearValidators();
  telephone.reset();
  telephone.disable();
  telephone.updateValueAndValidity();
  


  const courrielControl = this.problemeForm.get('courrielGroup.courriel');
  const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
  const courrielGroupControl = this.problemeForm.get('courrielGroup'); 

  courrielControl.clearValidators();
  courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
  courrielControl.disable();

  courrielConfirmationControl.clearValidators();
  courrielConfirmationControl.reset();
  courrielConfirmationControl.disable();


  if (typeNotification === 'notifier par courriel') {   
    courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
    courrielControl.enable();  
    courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
    courrielConfirmationControl.enable();  
    // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
    // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
    courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);                       
}   

if(typeNotification === 'notifier par messagerie texte')
{
  
  telephone.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);      
  telephone.enable();
          
}

  telephone.updateValueAndValidity();
  courrielControl.updateValueAndValidity();
  courrielConfirmationControl.updateValueAndValidity(); 

}
  save(): void {
  }

}
