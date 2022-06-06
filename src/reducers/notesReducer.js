import { types } from '../types/types'

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload // { id: '', title: '', body: '', date: '' }
        }
      }
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }
    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.payload.id ? action.payload.note : note)
      }
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    case types.notesLogoutCleaning:
      return {
        ...state,
        notes: [],
        active: null
      }
    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      }
    default:
      return state
  }
}
