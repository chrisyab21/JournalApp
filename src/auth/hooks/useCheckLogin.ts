import { useMemo} from "react";
import { useAppSelector } from "../../Redux/Hooks/Typedhooks";
import { useForm } from "../../hooks/useForm";
import { emailValidator, passwordValidator } from "../../utils/Validator";

type form = {
    email:string,
    password: string,
  }
  
  const initial:form= {
    email:'',
    password: '',
  }

export const useCheckLogin = () => {
 
    const {onInputChange, formState} = useForm(initial);

    const isEmailValid = useMemo(() => emailValidator(formState.email), [formState.email]);
    const isPasswordValid = useMemo(() => passwordValidator(formState.password), [formState.password]);
   

    const {status, errorMessage} = useAppSelector((state)=> state.auth);
    
    const isCheckingAuth =  useMemo(() => status === 'checking' , [status])
  
    
   return {

        onInputChange,
        formState,
        errorMessage,
        isEmailValid,
        isPasswordValid,
        isCheckingAuth,

   }

}
