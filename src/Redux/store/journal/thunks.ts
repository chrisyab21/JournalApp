import { createAsyncThunk } from "@reduxjs/toolkit";
import { Note, addNewEmpyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { RootState } from "../store";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { FireBaseDB } from "../../../firebase/config";
import { fileUpload } from "../../../journal/helpers/fileUpload";




export const startNewNote = createAsyncThunk('new/Note',
    async(_, thunkApi) => {

      thunkApi.dispatch(savingNewNote());

       const repo = thunkApi.getState() as RootState;
       
       const {uid} = repo.auth;

        const newNote:Note = {

            title: '',
            body:'',
            date: new Date().getTime(),
            imageUrls: []

        }


     const collRef = collection(FireBaseDB, `${uid}`, `journal`, 'notes');
     
     const docRef = await addDoc(collRef, newNote);

     newNote.id = docRef.id;
     
     console.log(newNote);
     thunkApi.dispatch(addNewEmpyNote(newNote));
     thunkApi.dispatch(setActiveNote(newNote));


    // const newDoc2 = doc(collection(FireBaseDB, `${uid}`, `journal`, 'notes'));
     
    //const newDoc4 = doc(FireBaseDB, `${uid}`, `journal`, 'notes', 'L2sQEIVXsXKQ3Pd0lbXH');
     
    // console.log(newDoc4);  
    
    // await setDoc(newDoc4, newNote);

});




export const startLoadingNotes= createAsyncThunk('Loading/Notes',
    async(_, thunkApi) => {


        const repo = thunkApi.getState() as RootState;

        const {uid} = repo.auth;

        if(!uid) throw new Error('El Uid del usuario no existe');
      
        const collRef = collection(FireBaseDB, `${uid}`, `journal`, 'notes');
        
        const {docs} = await getDocs(collRef);

        const notes:Note[] = [];

        docs.forEach(doc => {
            const datos = doc.data();
            const nota:Note = {
                id: doc.id,
                title: !!datos.title ? datos.title : 'No hay titulo',
                body: !!datos.body ? datos.body : '',
                date: datos.date,
                imageUrls: !!datos.imageUrls ? datos.imageUrls : [],
            }
            notes.push(nota);
        

       });

      // console.log(notes);

       thunkApi.dispatch(setNotes(notes));

});



export const SaveNote= createAsyncThunk('save/Note',
    async(_, thunkApi) => {

        try {

            thunkApi.dispatch(setSaving());

            const repo = thunkApi.getState() as RootState;

            const {uid} = repo.auth;
            const {active} = repo.journal;
    
            const noteToFirestore = { ...active} ;
    
            delete noteToFirestore.id;
    
            const docRef = doc(FireBaseDB, `${uid}`, `journal`, 'notes', `${active!.id}`);
    
            await setDoc(docRef, noteToFirestore);

            thunkApi.dispatch(updateNote(active!));
         
            console.log(noteToFirestore);


            
        } catch (error) {

            console.log('Error al actualizar la nota');
            
        }
       

});


export const startUploadingFiles= createAsyncThunk('upload/images',
    async(files:FileList | null, thunkApi) => {

        try {

            thunkApi.dispatch(setSaving());
            
            if(files === null) {
                console.log('Error archivos nulos');
                return;
            }

            const Promesas:Promise<string>[] = [];

            for (const file of files) {
                
                Promesas.push(fileUpload(file));
            }

            const photosUrls = await Promise.all(Promesas);

            console.log(photosUrls);

            thunkApi.dispatch(setPhotosToActiveNote(photosUrls));
            
        } catch (error) {

            console.log('Error al actualizar la nota');
            
        }       

});



export const startDeletingNote= createAsyncThunk('delete/Note',
    async(_, thunkApi) => {

        try {

            const repo = thunkApi.getState() as RootState;

            const {uid} = repo.auth;
            const {active} = repo.journal;

            console.log({uid, active});

            const docRef = doc(FireBaseDB, `${uid}`, 'journal', 'notes', `${active!.id}` );

            await deleteDoc(docRef);

            thunkApi.dispatch(deleteNoteById(active!));



        } catch (error) {

            console.log('Error al eliminar la nota');
            
        }       

});