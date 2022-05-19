import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemones:Pokemon[] = [];

  constructor(private pokemon:PokemonService, private router:Router) { }

  ngOnInit(): void {
    this.pokemonList();
  }

  pokemonList(): void {
    this.pokemon.retrieveAllPokemones().subscribe(data=>this.pokemones=data);
  }

  detailPokemon(id:number) {
    this.router.navigate(['pokemon-detail/'+id])
  }
}
