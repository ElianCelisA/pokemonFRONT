import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-upload',
  templateUrl: './pokemon-upload.component.html',
  styleUrls: ['./pokemon-upload.component.css']
})
export class PokemonUploadComponent implements OnInit {

  formUpload: FormGroup;
  fileTopUpload: File | null = null;

  constructor(public fb:FormBuilder, private redirect:Router, private route:ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formUpload = this.fb.group({
      id: [this.route.snapshot.paramMap.get('id')],
      file: ['']
    })
    console.log(this.formUpload);
  }

  redirectDetalle(){
    const register = this.formUpload.value;
    this.redirect.navigate(['pokemon-detail/'+register.id])
  }

  handleFileInput(event) {
    const files = event.target.files;
    this.fileTopUpload = files.item(0);
  }

  uploadFile(){
    const register = this.formUpload.value;
    this.pokemonService.uploadImage(this.fileTopUpload, register.id).subscribe(
      response=>this.redirect.navigate(['pokemon-detail/'+register.id])
    )
  }
}
