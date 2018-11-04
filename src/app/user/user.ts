export class User {

  id: string;
  nom: string;
  prenom: string;
  post: string;
  mail:  string;
  pwd: string;
  role: string;
 
  constructor(id: string, nom: string, prenom: string, post: string, mail: string, pwd:string, role: string ){
    this.id = id
    this.nom = nom;
    this.prenom = prenom;
    this.post = post;
    this.mail = mail;
    this.pwd = pwd;
    this.role = role;
    
  }
  

}
