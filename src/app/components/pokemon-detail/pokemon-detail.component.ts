import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  pokemon:Pokemon = {
    id: 0,
    name: '',
    category: '',
    height: 0,
    weight: 0,
    description: '',
    image: '',
    type: [],
    abilities: [],
    weaknesses: []
  };

  constructor(private pokemonService:PokemonService, private route:ActivatedRoute, private redirect:Router) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonService.retriveEspecificPokemon(this.route.snapshot.paramMap.get('id')).subscribe(pokemon=>this.pokemon=pokemon);
  }

  deletePokemon(id:number) {
    this.pokemonService.deletePokemon(id).subscribe(data=>this.pokemon=data);
    this.redirect.navigate(['/']);
  }
}
