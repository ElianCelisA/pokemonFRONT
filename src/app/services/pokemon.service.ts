import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlEndpoint:string = 'http://localhost:8092/api/v1/pokemon';
  private headers:HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  private headers2:HttpHeaders = new HttpHeaders({'Content-Type': 'multipart/form-data'})
  
  constructor(private http:HttpClient) { }

  retrieveAllPokemones():Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.urlEndpoint+"/retrieve-all");
  }

  createPokemon(pokemon:Pokemon):Observable<Pokemon>{
    return this.http.post<Pokemon>(this.urlEndpoint+"/save-pokemon", pokemon, {headers: this.headers});
  }

  retriveEspecificPokemon(id:string):Observable<Pokemon> {
    return this.http.get<Pokemon>(this.urlEndpoint+"/retrieve-especific/"+id);
  }

  deletePokemon(id:number):Observable<Pokemon> {
    return this.http.delete<Pokemon>(this.urlEndpoint+"/delete-pokemon/"+id);
  }

  updatePokemon(pokemon:Pokemon, id:number):Observable<Pokemon>{
    return this.http.put<Pokemon>(this.urlEndpoint+"/update-pokemon/"+id, pokemon, {headers: this.headers});
  }

  uploadImage(file:File, id:string):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('file', file, file.name);
    return this.http.post<any>(this.urlEndpoint+"/upload-pokemon-image", formData);

  }
}
