import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText  } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import {FC, useMemo} from 'react';
import { Note, setActiveNote } from '../../Redux/store/journal/journalSlice';
import { useAppDispatch } from '../../Redux/Hooks/Typedhooks';

type props = {

    nota: Note
}

export const SideBarItem:FC<props> = ({nota}) => {

    const dispatch = useAppDispatch();

    const shortTittle = useMemo(() => {

        if(!!nota.title){ 

            return (nota.title.length > 17 
                ? nota.title.substring(0,17) + '...'
                : nota.title);         
        }

        return '';
              

    }, [nota.title]);


    const onClickNote = () => {

        dispatch(setActiveNote(nota));

    }

  return (
    <ListItem key={nota.id} disablePadding>
        <ListItemButton
         onClick={() => onClickNote()}
         >
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={shortTittle} />
                <ListItemText secondary={nota.body} />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
