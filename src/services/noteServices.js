import http from "./httpServices";
import config from '../config.json'; 

export function getNotes() {
 return  http.get(config.apiEndpoint);
}

export function addNote(note) {
  return http.post(config.apiEndpoint+"/new", note);
}
export function deleteNote(noteId){
   return http.delete(config.apiEndpoint + noteId);
}
export function updateNote(noteId){
 return http.put(config.apiEndpoint+ noteId);
}