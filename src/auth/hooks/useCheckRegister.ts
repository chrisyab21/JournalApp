import { useMemo} from "react";
import { useAppSelector } from "../../Redux/Hooks/Typedhooks";
import { useForm } from "../../hooks/useForm";
import { emailValidator, nameValidator, passwordValidator } from "../../utils/Validator";

type form = {
    nombre: string,
    email:string,
    password: string,
  }
  
  const initial:form= {
  
    nombre: '',
    email:'',
    password: '',
  }

export const useCheckRegister = () => {
 
    const {onInputChange, formState} = useForm(initial);
  
    const isNameValid = useMemo(() => nameValidator(formState.nombre), [formState.nombre]);
    const isEmailValid = useMemo(() => emailValidator(formState.email), [formState.email]);
    const isPasswordValid = useMemo(() => passwordValidator(formState.password), [formState.password]);
   
    const {status, errorMessage} = useAppSelector((state)=> state.auth);
    
    const isCheckingAuth =  useMemo(() => status === 'checking' , [status])
  
    
   return {

        onInputChange,
        formState,
        errorMessage,
        isNameValid,
        isEmailValid,
        isPasswordValid,
        isCheckingAuth,

   }

}
