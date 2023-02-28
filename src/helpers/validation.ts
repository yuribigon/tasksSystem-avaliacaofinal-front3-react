import { User } from "../types/users";

export default function userValidation(email : string, password : string, users : Array<User>): string | boolean {
    let validation : string | boolean = true;
    if (users.length) {
        let index : number = users.findIndex((user : User) => user.email === email);
        if (index !== -1){
            if (users[index].password === password) {
                return validation;
            }
            else {
                validation = "Senha ou login incorretos."  
            }
        }
        else {
            validation = "Senha ou login incorretos."
        }
    }
    else {
        validation = "Esse usuário não existe.";
    };
    return validation;
};