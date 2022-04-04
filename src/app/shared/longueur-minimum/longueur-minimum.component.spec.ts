import {VerifierCaracteresValidator} from "./longueur-minimum.component";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {
    it('#7 | une chaîne avec 10 espaces est invalide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });
        it('#8 | Une phrase avec des mots est valide', () => {
        let control = { value: ' '.repeat(3) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });
        it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let control = { value: ' '.repeat(9) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });
        it('#10 | Une phrase avec 1 espace et 2 caractères est invalide', () => {
        let control = { value: ' '.repeat(3) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });
        it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () => {
        let control = { value: ' '.repeat(3) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });
        it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
        let control = { value: ' '.repeat(6) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });
        it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let control = { value: ' '.repeat(10) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });
        it('#14 | Une chaîne nulle est invalide', () => {
        let control = { value: ' '.repeat(0) }
        let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
        let result= validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresInsuffisant']).toBe(true);
        });

});