import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AlbumService } from '../../album.service';
import { Router } from '@angular/router';
import { Album } from 'src/app/album';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm: FormGroup;
  messageError: string;
  album: Album;

  constructor(private albumS: AlbumService, private fb: FormBuilder, private router: Router) {
    // STUB
    this.album = {
      id: Math.random().toString(32),
      name: ``,
      title: ``,
      ref: ``,
      duration: null,
      description: '',
      status: 'off',
      note: [],
      price: null,
      priceTTC: null
    };
  }

  ngOnInit() {
    this.initAlbum();

    this.albumForm.get(`price`).valueChanges.pipe(
      map(price => Math.floor(price * 1.08 * 100) / 100)
    ).subscribe(
      p => {
        this.albumForm.controls[`priceTTC`].setValue(p);
        console.log(p);
      }
    );
  }

  initAlbum() {
    this.albumForm = this.fb.group(
      {
        id: this.album.id,
        name: new FormControl(this.album.name, [
          Validators.required,
          Validators.minLength(5)
        ]),
        title: new FormControl(this.album.title, [
          Validators.required,
        ]),
        ref: new FormControl(this.album.ref, [
          Validators.required,
          Validators.pattern(`[a-zA-Z0-9_]{5}`)
        ]),
        duration: new FormControl(this.album.duration, [
          Validators.required,
          Validators.max(960)
        ]),
        description: this.album.description,
        status: this.album.status,
        price: this.album.price,
        priceTTC: this.album.priceTTC
      }
    );
  }

  get name() { return this.albumForm.get(`name`); }
  get title() { return this.albumForm.get('title'); }
  get ref() { return this.albumForm.get('ref'); }
  get duration() { return this.albumForm.get('duration'); }
  get description() { return this.albumForm.get('description'); }
  get price() { return this.albumForm.get(`price`); }
  get priceTTC() { return this.albumForm.get(`priceTTC`); }

  onSubmit() {
    // console.log(`value : `, this.albumForm.value);
    const album = this.albumForm.value;

    // name correspond à la clé générée par Firebase
    this.albumS.addAlbum(album).subscribe((snap: { name: string }) => {
      // console.log(`snap`, snap)
      // console.log(`album id`, album.id);
      // update de l'id
      const { name } = snap;
      album.id = name;
      // console.log('name', name);
      // put pour l'update HttpClient
      this.albumS.updateAlbum(snap.name, album).subscribe( a => {
        this.router.navigate([`dashboard`], {
          queryParams: {
            message: `success`
          }
        });
      },
        error => this.messageError = `Error DataBase`
      );
    });
  }



}
