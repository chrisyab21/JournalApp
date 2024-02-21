
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type Note = {
    id?: string,
    title: string,
    body: string,
    date: number
    imageUrls: string[]
  }

export type journalState = {
  isSaving: boolean,
  savedMessage: string,
  notes: Note[],
  active: Note | null

}

const initialState: journalState = {
    isSaving: false,
    savedMessage: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState: initialState,
  reducers: {
    savingNewNote: (state) => {

      state.isSaving = true   
    },
    addNewEmpyNote: (state, action: PayloadAction<Note>) => {
      
      state.notes.push(action.payload);
      state.isSaving = false;
      
    },
    setActiveNote: (state, action: PayloadAction<Note>) => {
      state.active = action.payload;
      state.savedMessage = '';

    },
    setNotes: (state, action: PayloadAction<Note[]>) => {

      state.notes = action.payload;

    },
    setSaving: (state) => {

        state.isSaving = true
        state.savedMessage = '';
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.isSaving = false;
      state.notes = state.notes.map(
          (nota) => {
            if(nota.id === action.payload.id){             
              return action.payload;
             }
           return nota;
        });

      state.savedMessage = `${action.payload.title}, actualizada correctamente`;
        
    },
    setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {

      if(state.active === null) return;

      state.active.imageUrls = [...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;
    },
    clearNotesLogout: (state) =>{

      state.notes = [] ; 
      state.active = null;
      state.isSaving= false;
      state.savedMessage= '';

    },
    deleteNoteById: (state, action: PayloadAction<Note>) => {

        state.active = null;

        state.notes = state.notes.filter((nota) => nota.id !== action.payload.id);
       
    },
  },
});

// Action creators are generated for each case reducer function
export const { 
                addNewEmpyNote, 
                setActiveNote,
                deleteNoteById,
                setNotes,
                setSaving,
                updateNote,
                savingNewNote,
                setPhotosToActiveNote,
                clearNotesLogout
                                } = journalSlice.actions