import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ability } from 'src/app/interfaces/ability';
import { Type } from 'src/app/interfaces/type';
import { Weakness } from 'src/app/interfaces/weakness';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pokemon-update',
  templateUrl: './pokemon-update.component.html',
  styleUrls: ['./pokemon-update.component.css']
})
export class PokemonUpdateComponent implements OnInit {

  formPokemonUpdate: FormGroup;
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
  listTypes: Type[] = [];
  listAbilities: Ability[] = [];
  listWeaknesses: Weakness[] = [];

  constructor(private pokemonService:PokemonService, private route:ActivatedRoute, public fb:FormBuilder, private redirect:Router) { }

  ngOnInit(): void {
    this.createFormUpdate();
    this.loadPokemon();
  }

  loadPokemon(): void {
    this.pokemonService.retriveEspecificPokemon(this.route.snapshot.paramMap.get('id')).subscribe(response=>{
      this.formPokemonUpdate.controls['id'].setValue(response.id);
      this.formPokemonUpdate.controls['name'].setValue(response.name);
      this.formPokemonUpdate.controls['category'].setValue(response.category);
      this.formPokemonUpdate.controls['height'].setValue(response.height);
      this.formPokemonUpdate.controls['weight'].setValue(response.weight);
      this.formPokemonUpdate.controls['description'].setValue(response.description);
      this.formPokemonUpdate.controls['image'].setValue(response.image);
      this.listTypes = response.type;
      this.listAbilities = response.abilities;
      this.listWeaknesses = response.weaknesses;
    });
  }

  createFormUpdate(){
    this.formPokemonUpdate = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      category: [''],
      height: [''],
      weight: [''],
      description: [''],
      image: [''],
      type: [''],
      descriptionType: [''],
      descriptionAbility: [''],
      descriptionWeakness: [''],
      ability: [''],
      weakness: ['']
    });
  }
  update(): void {
    const register = this.formPokemonUpdate.value;
    const updatePokemon: Pokemon = {
      id: register.id,
      name: register.name,
      category: register.category,
      height: register.height,
      weight: register.weight,
      description: register.description,
      image: register.image,
      type: this.listTypes,
      abilities: this.listAbilities,
      weaknesses: this.listWeaknesses
    }
    console.log(updatePokemon);
    this.pokemonService.updatePokemon(updatePokemon, register.id).subscribe(
      response=>this.redirect.navigate(['pokemon-detail/'+register.id])
    )
  }

  addType(){
    const type = {
      id: 0,
      name: this.formPokemonUpdate.value.type,
      description: this.formPokemonUpdate.value.descriptionType
    }
    this.listTypes.push(type);
    this.formPokemonUpdate.controls['type'].reset();
    this.formPokemonUpdate.controls['descriptionType'].reset();
    Swal.fire({
      icon: 'success',
      title: 'Tipo de pokémon',
      text: '¡Adicionado correctamente!',
    })
  }

  addAbility(){
    const ability = {
      id: 0,
      name: this.formPokemonUpdate.value.ability,
      description: this.formPokemonUpdate.value.descriptionAbility
    }
    this.listAbilities.push(ability);
    this.formPokemonUpdate.controls['ability'].reset();
    this.formPokemonUpdate.controls['descriptionAbility'].reset();
    Swal.fire({
      icon: 'success',
      title: 'Habilidad del pokémon',
      text: '¡Adicionada correctamente!',
    })
  }

  addWeakness(){
    const weakness = {
      id: 0,
      name: this.formPokemonUpdate.value.weakness,
      description: this.formPokemonUpdate.value.descriptionWeakness
    }
    this.listWeaknesses.push(weakness);
    this.formPokemonUpdate.controls['weakness'].reset();
    this.formPokemonUpdate.controls['descriptionWeakness'].reset();
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

  redirectDetalle() {
    this.redirect.navigate(['/pokemon-detail/'+this.formPokemonUpdate.value.id]);
  }
}
