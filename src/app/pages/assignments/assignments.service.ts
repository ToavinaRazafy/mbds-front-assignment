import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Assignment} from './assignment.model';
import {catchError, map, tap} from 'rxjs/operators';
import {LoggingService} from '../../user/logging.service';

@Injectable({
    providedIn: 'root'
})
export class AssignmentsService {
    assignments: Assignment[];

    uri = 'http://localhost:8010/api/assignments';

    constructor(private loggingService: LoggingService, private http: HttpClient) {
    }

    getAssignments(): Observable<any> {
        console.log('Dans le service de gestion des assignments...')
        //return of(this.assignments);
        return this.http.get<Assignment[]>(this.uri);
    }

    // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
    // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
    // Angular
    getAssignmentsAsPromise(): Promise<Assignment[]> {
        console.log('Dans le service de gestion des assignments...')
        //return of(this.assignments);
        return this.http.get<Assignment[]>(this.uri).toPromise();
    }

    getAssignment(id: number): Observable<Assignment> {
        //let assignementCherche = this.assignments.find(a => a.id === id);

        //return of(assignementCherche);

        return this.http.get<Assignment>(this.uri + '/' + id)
            .pipe(
                // traitement 1
                map(a => {
                    a.nom += ' MODIFIE PAR MAP';
                    return a;
                }),
                tap(a => {
                    console.log('TRACE DANS TAP : j\'ai reçu ' + a.nom);
                }),
                /*
                filter(a => {
                  return (a.rendu)
                })
                */
                catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
            );
    }

    private handleError<T>(operation: any, result?: T) {
        return (error: any): Observable<T> => {
            console.log(error); // pour afficher dans la console
            console.log(operation + ' a échoué ' + error.message);

            return of(result as T);
        };
    }

    generateId(): number {
        return Math.round(Math.random() * 100000);
    }

    addAssignment(assignment: Assignment): Observable<any> {
        assignment.id = this.generateId();
        this.loggingService.log(assignment.nom, ' a été ajouté');

        /*this.assignments.push(assignment);


        return of("Service: assignment ajouté !");*/

        return this.http.post(this.uri, assignment);
    }

    updateAssignment(assignment: Assignment): Observable<any> {
        // besoin de ne rien faire puisque l'assignment passé en paramètre
        // est déjà un élément du tableau

        //let index = this.assignments.indexOf(assignment);

        //console.log("updateAssignment l'assignment passé en param est à la position " + index + " du tableau");
        this.loggingService.log(assignment.nom, ' a été modifié');

        return this.http.put(this.uri, assignment);
    }

    deleteAssignment(assignment: Assignment): Observable<any> {
        /*
        let index = this.assignments.indexOf(assignment);

        this.assignments.splice(index, 1);
        */


        this.loggingService.log(assignment.nom, ' a été supprimé');

        return this.http.delete(this.uri + '/' + assignment.id);

    }
}
