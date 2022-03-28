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
                component.gestionTelephone('Ne pas me notifier');

                let zone = component.problemeForm.get('telephone')
                expect(zone.disabled).toBeTrue();
                });
                it("#16| Zone TELEPHONE  est vide quand ne pas me notifier", () =>{
                  component.gestionTelephone('Ne pas me notifier');

                  let zone = component.problemeForm.get('telephone');

                  expect(zone.value).toBeNull();
                  });
                  it("#17| Zone ADRESE COURRIEL  est désactivée quand ne pas me notifier", () =>{
                    component.gestionCourriel('Ne pas me notifier');

                    let zone = component.problemeForm.get('courrielGroup.courriel')
                    expect(zone.disabled).toBeTrue();
                    });
                    it("#18| Zone CONFIRMER COURRIEL  est désactivée quand ne pas me notifier", () =>{
                      component.gestionCourriel('Ne pas me notifier');

                      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation')
                      expect(zone.disabled).toBeTrue();
                      });
});
