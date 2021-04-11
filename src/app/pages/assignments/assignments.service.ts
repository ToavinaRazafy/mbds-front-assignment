import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assignment} from './assignment.model';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AssignmentsService {
    uri = 'api/assignments';

    constructor(private http: HttpClient) {
    }

    getAssignments(): Observable<any> {
        console.log('Dans le service de gestion des assignments...')
        return this.http.get<any>(this.uri);
    }

    addAssignment(assignment: Assignment): Observable<any> {
        return this.http.post(this.uri, assignment);
    }

    updateAssignment(assignment: Assignment): Observable<any> {
        return this.http.put(this.uri, assignment);
    }

    deleteAssignment(assignment: Assignment): Observable<any> {
        return this.http.delete(this.uri + '/' + assignment.id);
    }
}
