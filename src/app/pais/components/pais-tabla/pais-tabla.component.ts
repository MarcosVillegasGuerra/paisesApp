import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styleUrls: ['./pais-tabla.component.css']
})
export class PaisTablaComponent implements OnInit {

  @Input() paises: Country[] = [];

  constructor( private ngZone: NgZone, private router: Router) { }

  ngOnInit(): void {
  }

  irVerPais( alpha: string ){
    this.ngZone.run(() => this.router.navigate(['/pais/'+alpha]));
  }

}
