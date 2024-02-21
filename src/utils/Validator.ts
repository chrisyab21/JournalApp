
const emailRegex = /^[a-zA-Z0-9_]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s]{1,20}$/;

type validate ={

    error: string | null,
    valid: boolean,
    empty: boolean
}




export const nameValidator = (cadena:string) => {

    const validator: validate =  {

        error: null,
        valid: true,
        empty: true
    }

    if(cadena.length === 0){

        validator.error = 'El nombre es requerido'
        validator.valid = false 
        validator.empty = true

        return validator;
    } 


    if(cadena.length > 0) validator.empty = false;


    if(!nameRegex.test(cadena)){

        validator.error = 'El nombre es invalido',
        validator.valid = false     
    }

    return validator;

}


export const emailValidator = (cadena:string) => {

    const validator: validate =  {

        error: null,
        valid: true,
        empty: true
    }

    if(cadena.length === 0){

        validator.error = 'El email es requerido'
        validator.valid = false
        validator.empty = true

        return validator;
    }
    

    if(cadena.length > 0) validator.empty = false;


    if(!emailRegex.test(cadena)){

        validator.error = 'El email es invalido',
        validator.valid = false     
    }

    return validator;

}


export const passwordValidator  = (cadena:string) => {
   
    const validator: validate =  {

        error: null,
        valid: true,
        empty: true
    }

    if(cadena.length === 0){

        validator.error = 'La contraseña es requerida'
        validator.valid = false
        validator.empty = true

        return validator;
    }
    
    if(cadena.length > 0) validator.empty = false;

    if(cadena.length < 6){

        validator.error = 'La contraseña debe tener minimo 6 caracteres',
        validator.valid = false     
    }

    if(cadena.length > 10){

        validator.error = 'La contraseña no puede exceder los 10 caracteres',
        validator.valid = false     
    }

    return validator;  
    
}

