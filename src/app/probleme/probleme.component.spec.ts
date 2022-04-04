import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

describe('ProblemeComponent', () => {
let component: ProblemeComponent;
let fixture: ComponentFixture<ProblemeComponent>;

beforeEach(async () => {
TestBed.configureTestingModule({
imports: [ReactiveFormsModule, HttpClientModule],
declarations: [ ProblemeComponent ],
providers:[ProblemeService]
})
.compileComponents();
});

beforeEach(() => {
fixture = TestBed.createComponent(ProblemeComponent);
component = fixture.componentInstance;
fixture.detectChanges();
});
it("#1 | Zone PRÉNOM invalide avec 2 caractèress", () =>{
let zone = component.problemeForm.controls['prenom'];
zone.setValue("a".repeat(2));
let errors = zone.errors || {};
expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
});

it("#2 | Zone PRÉNOM valide avec 3 caractèress", () =>{
let zone = component.problemeForm.controls['prenom'];
zone.setValue("a".repeat(3));
let errors = zone.errors || {};
expect(errors['nbreCaracteresInsuffisant']).toBeFalsy();
});

it("#3 | Zone PRÉNOM valide avec 200 caractèress", () =>{
let zone = component.problemeForm.controls['prenom'];
zone.setValue("a".repeat(200));
let errors = zone.errors || {};
expect(errors['nbreCaracteresInsuffisant']).toBeFalsy();
});

it("#4 | Zone PRÉNOM invalide avec aucune valeur", () =>{
let zone = component.problemeForm.controls['prenom'];
zone.setValue("a".repeat(0));
let errors = zone.errors || {};
expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
});

it("#5 | Zone PRÉNOM invalide avec 10 espaces", () =>{
let zone = component.problemeForm.controls['prenom'];
zone.setValue(" ".repeat(10));
let errors = zone.errors || {};
expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
});

it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère", () =>{
let zone = component.problemeForm.controls['prenom'];
zone.setValue(" ".repeat(2)+"a".repeat(1));
let errors = zone.errors || {};
expect(errors['nbreCaracteresInsuffisant']).toBeTruthy();
});
it("#15| Zone TELEPHONE  est désactivée quand ne pas me notifier", () =>{
component.gestionNotification('Ne pas me notifier');

let zone = component.problemeForm.get('telephone')
expect(zone.disabled).toBeTrue();
});
it("#16| Zone TELEPHONE  est vide quand ne pas me notifier", () =>{
component.gestionNotification('Ne pas me notifier');

let zone = component.problemeForm.get('telephone');

expect(zone.value).toBeNull();
});
it("#17| Zone ADRESE COURRIEL  est désactivée quand ne pas me notifier", () =>{
component.gestionNotification('Ne pas me notifier');

let zone = component.problemeForm.get('courrielGroup.courriel')
expect(zone.disabled).toBeTrue();
});
it("#18| Zone CONFIRMER COURRIEL  est désactivée quand ne pas me notifier", () =>{
component.gestionNotification('Ne pas me notifier');

let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
expect(zone.disabled).toBeTrue();
});
it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
component.gestionNotification('pasnotification');
let zone = component.problemeForm.get('telephone');
expect(zone.disabled).toBeTrue(); 
});
it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
expect(zone.enabled).toBeTrue(); 
});
it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
expect(zone.enabled).toBeTrue(); 
});
it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
let errors = zone.errors || {};
expect (errors['required']).toBeTruthy(); 
});
it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
let errors = zone.errors || {};
expect (errors['required']).toBeTruthy(); 
});
it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
zone.setValue("   ");
let errors = zone.errors || {};
expect (errors['pattern']).toBeTruthy(); 
});
it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
let zone3 = component.problemeForm.get('courrielGroup');

zone1.setValue("go@gfjdio");
let errors = zone3.errors || null;
expect (errors).toBeNull(); 
});
it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
let zone3 = component.problemeForm.get('courrielGroup');

zone.setValue("go@gfjdio");
let errors = zone3.errors || null;
expect (errors).toBeNull(); 
});
it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
let zone3 = component.problemeForm.get('courrielGroup');
zone.setValue("go@gfjdio");
zone1.setValue("go@gfjio");
let errors = zone3.errors || {};
expect (errors['match']).toBeTrue(); 
});
it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
component.gestionNotification('notifier par courriel');
let zone = component.problemeForm.get('courrielGroup.courriel');
let zone1 = component.problemeForm.get('courrielGroup.courrielConfirmation');
let zone3 = component.problemeForm.get('courrielGroup');
zone.setValue("go@gfjdio");
zone1.setValue("go@gfjdio");
let errors = zone3.errors || {};
expect (errors['match']).toBeFalsy(); 
});
it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('telephone');
expect(zone.enabled).toBeTrue(); 
});
it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('courrielGroup.courriel');
expect(zone.disabled).toBeTrue(); 
});
it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
expect(zone.disabled).toBeTrue(); 
});
it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('telephone');
let errors = zone.errors || {};
expect (errors['required']).toBeTruthy(); 
});
it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('telephone');
zone.setValue("gfhui");
let errors = zone.errors || {};
expect (errors['pattern']).toBeTruthy(); 
});
it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('telephone');
zone.setValue("999999999");
let errors = zone.errors || {};
expect (errors['minlength']).toBeTruthy(); 
});
it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('telephone');
zone.setValue("99999999999");
let errors = zone.errors || {};
expect (errors['maxlength']).toBeTruthy(); 
});
it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
component.gestionNotification('notifier par messagerie texte');
let zone = component.problemeForm.get('telephone');
zone.setValue("9999999999");
let errors = zone.errors || {};
expect (errors['maxlength']).toBeFalsy(); 
expect (errors['minlength']).toBeFalsy();
});




});
