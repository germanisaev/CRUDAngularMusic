import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveService {
    private subject = new BehaviorSubject<number>(0);
    private status = new BehaviorSubject<boolean>(null);

    sendStep(active: number) {
        this.subject.next(active);
    }

    clearSteps() {
        this.subject.next(0);
    }

    getStep() {
        return this.subject.asObservable();
    }

    // status method
    setStatus(value: boolean) {
        this.status.next(value);
    }

    getStatus() {
        return this.status.asObservable();
    }
}