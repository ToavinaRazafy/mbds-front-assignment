import { InMemoryDbService } from 'angular-in-memory-web-api';
export class AssignmentsData implements InMemoryDbService {
  createDb() {
    const users = [
        {

            nom:"Pennsylvania Institute of Technology",
            auteur:"Randy Heggy LOYENS",
            matiere:"BIG_DATA",
            matiereimage:"fa fa-css3",
            dateDerendu:"2021-02-12",
            note:null,
            remarques:null,
            rendu: false,
            image: "assets/img/profile/bruno.jpg"
        },
        {

            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-drupal",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,
            image: "assets/img/profile/adam.jpg"
            
        },
        {

            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-gg",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: false,
            image: "assets/img/profile/adam.jpg"
            
        },
        {

            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-lastfm",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,
            image: "assets/img/profile/adam.jpg"
            
        },
        {

            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-snapchat",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,

            image: "assets/img/profile/adam.jpg"
            
        },
        {

            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-stumbleupon",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,
            image: "assets/img/profile/adam.jpg"
            
        },
        {

            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-windows",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,
            image: "assets/img/profile/adam.jpg"
            
        },
        {

            id: 8,
            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-wikipedia-w",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,
            image: "assets/img/profile/adam.jpg"
            
        },
        {

            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-html5",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,
            image: "assets/img/profile/adam.jpg"
            
        },
        {

            id: 10,
            nom:"Andrana vaovao",
            auteur:"Toavina RAZAFY",
            matiere:"GRAILS",
            matiereimage:"fa fa-android",
            dateDerendu:"2021-02-12",
            note:10,
            remarques:"Bien zkgehj ",
            rendu: true,
            image: "assets/img/profile/adam.jpg"
            
            
        }
       
    ];
    return {users};
  }
}
