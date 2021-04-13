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
    getPager(totalItems: number = 1, currentPage: number = 1, pageSize: number = 50) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);
        // ensure current page isn't out of range
        if (currentPage <= 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = 49;

        // create an array of pages to ng-repeat in the pager control
        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    getAssignments(rendu: number, auteur: string, matiere: string, page: number, limit: number): Observable<any> {
        console.log('Dans le service de gestion des assignments...')
        console.log(rendu)
        let uri = this.uri + '?rendu=' + rendu;
        if (auteur) {
            uri = uri + '&auteur=' + auteur;
        }
        if (matiere) {
            uri = uri + '&matiere=' + matiere;
        }
        uri = uri + '&page=' + page + '&limit=' + limit;
        return this.http.get<any>(uri);
    }

    addAssignment(assignment: Assignment): Observable<any> {
        return this.http.post(this.uri, assignment);
    }

    updateAssignment(assignment: Assignment): Observable<any> {
        return this.http.put(this.uri, assignment);
    }

    deleteAssignment(assignment: Assignment): Observable<any> {
        console.log('>>>>>>>>>' + assignment._id)
        return this.http.delete(this.uri + '/' + assignment._id);

    }
}
