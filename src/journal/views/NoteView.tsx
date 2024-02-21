

import {ChangeEvent, FC, useEffect, useMemo, useRef} from 'react';
import { Button, Grid, IconButton, TextField, Typography} from '@mui/material';
import { DeleteOutline, Restore, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components/ImageGallery';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/Typedhooks';
import { Note, setActiveNote } from '../../Redux/store/journal/journalSlice';
import { SaveNote, startDeletingNote, startUploadingFiles } from '../../Redux/store/journal/thunks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'
import { useFormNote } from '../../hooks/useFormEspecial';

export const NoteView:FC = () => {

    
    const {active, savedMessage, isSaving} = useAppSelector(state => state.journal);

    const dispatch = useAppDispatch();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useMemo(() => {

        const newform:Note = active!
        return newform ;

     }, [active]);
   

    const {formState, onInputChange, OnResetForm} = useFormNote(form);

    console.log('Renderizando note view')

    useEffect(() => {
        
        dispatch(setActiveNote(formState));
 
      }, [formState])


    useEffect(() => {
        
        if(savedMessage.length > 0){

            Swal.fire('Nota actualizada', savedMessage, 'success');
        }
 
      }, [savedMessage])




    const dateString = useMemo(() => {

    const newDate = new Date(formState.date!).toUTCString();

    return newDate;

    }, [formState.date])



    const onSaveNotes = () => {

        dispatch(SaveNote());

    }


    const onFileInputChange = (event:ChangeEvent<HTMLInputElement>) => {
        const {target} = event;

        if(target.files?.length === 0) return;
      
        dispatch(startUploadingFiles(target.files));
    }


    const onDelete = () => {

        dispatch(startDeletingNote());

    }


    
  return (
    <Grid container 
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        >
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>
         
        <Grid item>
            <input 
            type='file' 
            color='red'
            ref={fileInputRef}
            multiple={true}
            style={{display: 'none'}}
            onChange={(event) => onFileInputChange(event)}
            />

            <IconButton
             onClick={() => fileInputRef.current?.click()}
             disabled={isSaving}
             >         
                <UploadOutlined/>
            </IconButton>

            <Button
             disabled={isSaving} 
             color='primary'
             onClick={() => onSaveNotes()}
             >
                <SaveOutlined sx={{ fontSize:30, mr:1}}/>
            </Button>
        </Grid>
       
        <Grid container
        >
            <TextField
                type='text'
                variant='filled'
                fullWidth
                name='title'
                placeholder='Ingrese un titulo'
                value={formState.title}
                onChange={(event) => onInputChange(event)}
                label='title'
                sx={{ border:'solid', borderWidth: 0.5, borderRadius: 2, mb:1}}
            >
            </TextField>
           
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                name='body'
                placeholder='Que sucedio el dia de hoy'
                value={formState.body}
                onChange={(event) => onInputChange(event)}
                minRows={4}
                sx={{ border:'solid', borderWidth: 0.5, borderRadius: 1, mb:1, borderColor:'darkviolet'}}
            >
            </TextField>

        </Grid>

        <Grid container justifyContent='end'>
            
            <Button
             onClick={() => OnResetForm()}
             >
              <Restore/>
            </Button>

            <Button
             onClick={() => onDelete()}
             color='error'
             >
                <DeleteOutline/>
            </Button>
        </Grid>

        <ImageGallery images={active!.imageUrls}/>

    
            
    </Grid>
  )
}
