import { TestBed } from '@angular/core/testing';
import { PersonService } from './Person.service';
import { Person } from 'src/app/interfaces/person.interface';
import { take } from 'rxjs/operators';

describe('PersonService', () => {
    let service: PersonService;
    let localStorageMock: { [key: string]: string };

    beforeEach(() => {
        localStorageMock = {};
        TestBed.configureTestingModule({});
        service = TestBed.inject(PersonService);

        jest.spyOn(localStorage, 'getItem').mockImplementation((key) => localStorageMock[key] || null);
        jest.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
            localStorageMock[key] = value;
        });
        jest.spyOn(localStorage, 'clear').mockImplementation(() => {
            localStorageMock = {};
        });

        (service as any).personsSubject.next([]); 
    });

  

    it('should update a person in the localStorage', (done) => {
        const person: Person = { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890', cpf: '123.456.789-00', rg: '12.345.678-9', gender: 'Male' };
        service.addPerson(person);

        const updatedPerson: Person = { ...person, name: 'Johnny Doe', email: 'johnny@example.com' };
        service.updatePerson(updatedPerson);

        service.getPersons().pipe(take(1)).subscribe((persons) => {
            expect(persons[0].name).toBe('Johnny Doe');
            expect(persons[0].email).toBe('johnny@example.com');
            done();
        });
    });

    it('should delete a person from the localStorage', (done) => {
        const person: Person = { id: 1, name: 'John Doe', email: 'john@example.com', mobile: '1234567890', cpf: '123.456.789-00', rg: '12.345.678-9', gender: 'Male' };
        service.addPerson(person);

        service.deletePerson(1);

        service.getPersons().pipe(take(1)).subscribe((persons) => {
            expect(persons.length).toBe(0);
            done();
        });
    });
});
