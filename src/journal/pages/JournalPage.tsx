import {IconButton } from '@mui/material'
import { AddOutlined} from '@mui/icons-material'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/Typedhooks'
import { startNewNote } from '../../Redux/store/journal/thunks'
import { NoteView } from '../views/NoteView'



export const JournalPage = () => {

  const dispatch = useAppDispatch();

  const {active} = useAppSelector(state => state.journal);

  const {isSaving} = useAppSelector(state => state.journal);

   const onClickNewNote = () => {

      dispatch(startNewNote());

   }


  return (
    <JournalLayout>
      <>
      
        {!!active ? <NoteView/> : <NothingSelectedView/> }

        <IconButton
          onClick={() => onClickNewNote()}
          size='large'
          sx={{ 
            color: 'white',
            backgroundColor:'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9},
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
          disabled={isSaving}
        
        >
          <AddOutlined sx={{fontSize:30}}/>
        </IconButton>
         
      </>
    </JournalLayout>
  )
}
