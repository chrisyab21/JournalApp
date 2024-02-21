import { useEffect, useState } from "react"

type Objeto = {
    target: {

        value: any
        name: string
    }
}

type Data = React.ChangeEvent<HTMLInputElement> | Objeto



export const useForm = <T>(initialForm:T) => {

    console.log('Hola desde userForm');

      const [formState, setformState] = useState(initialForm);
    
      const FormaBase:T = initialForm;

      useEffect(() => {  

        setformState(initialForm);
        

      }, [initialForm]);

      


      const onInputChange = (event:Data) =>{

        const  {value, name } = event.target;
    
            setformState({  

                  ...formState,
                  [name]: value,
               });
                                
        }
        

     const OnResetForm = ():void => {

         setformState(FormaBase); 
         
         console.log('Reseteando formulario');

     }



    
  return (  {

            formState: formState,
            onInputChange: onInputChange,
            OnResetForm: OnResetForm


        }

     )
}
