import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config'
import { fileUpload } from '../helpers/fileUpload'
import { loadNotes } from '../helpers/loadNotes'
import { types } from '../types/types'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
    dispatch(activeNote(doc.id, newNote))
    dispatch(notesAddNew(doc.id, newNote))
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if (!note.url) {
      delete note.url
    }
    const noteToFirestore = { ...note }
    delete noteToFirestore.id
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
    dispatch(refreshNote(note.id, noteToFirestore))
    dispatch(activeNote(note.id, noteToFirestore))
    Swal.fire('Saved', note.title, 'success')
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note
    }
  }
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      }
    })
    const fileUrl = await fileUpload(file)
    const noteWithUrl = { ...activeNote, url: fileUrl }
    dispatch(startSaveNote(noteWithUrl))
    Swal.close()
  }
}

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid
    await db.doc(`${uid}/journal/notes/${id}`).delete()
    dispatch(deleteNote(id))
  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
})

export const notesLogoutCleaning = () => ({
  type: types.notesLogoutCleaning
})

export const notesAddNew = (idnote, note) => ({
  type: types.notesAddNew,
  payload: {
    id: idnote,
    ...note
  }
})
