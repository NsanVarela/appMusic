import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AlbumService } from '../../album.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/album';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.scss']
})
export class UpdateAlbumComponent implements OnInit {

  id: string;
  messageError: string;
  updateForm: FormGroup;
  album: Album;

  constructor(
    private albumS: AlbumService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get(`id`);
    this.initUpdateAlbum();

    this.albumS.getAlbum(id).subscribe( album => {
      this.updateForm.patchValue(album);
    });
  }

  initUpdateAlbum() {
    this.updateForm = this.fb.group(
      {
        id: ``,
        name: new FormControl(``, [
          Validators.required,
          Validators.minLength(5)
        ]),
        title: new FormControl(``, [
          Validators.required,
        ]),
        ref: new FormControl(``, [
          Validators.required,
          Validators.pattern(`[a-zA-Z0-9_]{5}`)
        ]),
        duration: new FormControl(``, [
          Validators.required,
          Validators.max(960)
        ]),
        description: ``,
        status: ``,
        price: ``,
        priceTTC: ``
      }
    );
  }

  get name() { return this.updateForm.get(`name`); }
  get title() { return this.updateForm.get('title'); }
  get ref() { return this.updateForm.get('ref'); }
  get duration() { return this.updateForm.get('duration'); }
  get description() { return this.updateForm.get('description'); }
  get price() { return this.updateForm.get(`price`); }
  get priceTTC() { return this.updateForm.get(`priceTTC`); }

}
