import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/app/interfaces/type';
import { Ability } from 'src/app/interfaces/ability';
import { Weakness } from 'src/app/interfaces/weakness';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls: ['./pokemon-create.component.css']
})
export class PokemonCreateComponent implements OnInit {

  formPokemon: FormGroup;
  listTypes:Type[] = [];
  listAbilities:Ability[] = [];
  listWeaknesses:Weakness[] = [];

  constructor(private pokemonService:PokemonService, private router:Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.createFormRegister();
  }
  createFormRegister(){
    this.formPokemon = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      height: [''],
      weight: [''],
      description: [''],
      type: [''],
      descriptionType: [''],
      descriptionAbility: [''],
      descriptionWeakness: [''],
      ability: [''],
      weakness: ['']
    });
  }

  create(): void {
    //console.log(this.formPokemon);
    const register = this.formPokemon.value;
    const newPokemon: Pokemon = {
      id: 0,
      name: register.name,
      category: register.category,
      height: register.height,
      weight: register.weight,
      description: register.description,
      image: '',
      type: this.listTypes,
      abilities: this.listAbilities,
      weaknesses: this.listWeaknesses
    }
    console.log(newPokemon);
    this.pokemonService.createPokemon(newPokemon).subscribe(
      response=>this.router.navigate(['/'])
    )
  }

  addType(){
    const type = {
      id: 0,
      name: this.formPokemon.value.type,
      description: this.formPokemon.value.descriptionType
    }
    this.listTypes.push(type);
    this.formPokemon.controls['type'].reset();
    this.formPokemon.controls['descriptionType'].reset();
    Swal.fire({
      icon: 'success',
      title: 'Tipo de pokémon',
      text: '¡Adicionado correctamente!',
    })
  }

  addAbility(){
    const ability = {
      id: 0,
      name: this.formPokemon.value.ability,
      description: this.formPokemon.value.descriptionAbility
    }
    this.listAbilities.push(ability);
    this.formPokemon.controls['ability'].reset();
    this.formPokemon.controls['descriptionAbility'].reset();
    Swal.fire({
      icon: 'success',
      title: 'Habilidad del pokémon',
      text: '¡Adicionada correctamente!',
    })
  }

  addWeakness(){
    const weakness = {
      id: 0,
      name: this.formPokemon.value.weakness,
      description: this.formPokemon.value.descriptionWeakness
    }
    this.listWeaknesses.push(weakness);
    this.formPokemon.controls['weakness'].reset();
    this.formPokemon.controls['descriptionWeakness'].reset();
    Swal.fire({
      icon: 'success',
      title: 'Debilidad del pokémon',
      text: '¡Adicionada correctamente!',
    })
  }

  deleteType(index:number) {
    this.listTypes.splice(index, 1);
  }

  deleteAbility(index:number) {
    this.listAbilities.splice(index, 1);
  }

  deleteWeakness(index:number) {
    this.listWeaknesses.splice(index, 1);
  }
}
