import { useEffect, useState } from "react"
import { useAppSelector } from "../Redux/Hooks/Typedhooks"
import { Note } from "../Redux/store/journal/journalSlice"


type Objeto = {
    target: {

        value: any
        name: string
    }
}

type Data = React.ChangeEvent<HTMLInputElement> | Objeto



export const useFormNote = (initialForm:Note) => {

    console.log('Hola desde userForm');

      const [formState, setformState] = useState(initialForm);

      const {active, notes} = useAppSelector(state => state.journal);
    
      let FormaBase:Note;

      notes.forEach(nota => {
        if(nota.id === active?.id){
          const base:Note = {
                        ...nota,
                        imageUrls: active!.imageUrls
                        }

          FormaBase = base; 
        }              
      });


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
