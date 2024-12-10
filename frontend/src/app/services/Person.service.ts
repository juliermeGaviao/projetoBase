import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from 'src/app/interfaces/person.interface';

@Injectable({
    providedIn: 'root',
})
export class PersonService {
    private readonly personsKey = 'personsData';
    private readonly personsSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
    private readonly persons$: Observable<Person[]> = this.personsSubject.asObservable();

    constructor() {
        this.loadFromLocalStorage();
    }

    private loadFromLocalStorage(): void {
        const personsData = localStorage.getItem(this.personsKey);
        if (personsData) {
            this.personsSubject.next(JSON.parse(personsData));
        }
    }

    private saveToLocalStorage(): void {
        localStorage.setItem(this.personsKey, JSON.stringify(this.personsSubject.value));
    }

    getPersons(): Observable<Person[]> {
        return this.persons$;
    }

    addPerson(person: Person): void {
        const persons = this.personsSubject.value;
        person.id = persons.length ? Math.max(...persons.map(p => p.id)) + 1 : 1; 
        persons.push(person);
        this.personsSubject.next([...persons]);
        this.saveToLocalStorage();
    }

    updatePerson(updatedPerson: Person): void {
        const persons = this.personsSubject.value.map(person =>
            person.id === updatedPerson.id ? updatedPerson : person
        );
        this.personsSubject.next([...persons]);
        this.saveToLocalStorage();
    }

    deletePerson(id: number): void {
        const persons = this.personsSubject.value.filter(person => person.id !== id);
        this.personsSubject.next([...persons]);
        this.saveToLocalStorage();
    }
}
