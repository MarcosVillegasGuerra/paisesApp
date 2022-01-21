import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [],
})
export class PorRegionComponent {
  public regiones: string[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  public regionActiva: string = '';
  public paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  activarRegion(region: string) {
    if(region === this.regionActiva) return;

    this.paises = [];
    this.regionActiva = region;
    this.paisService
      .buscarPaisesPorRegion(region)
      .subscribe((paises) => this.paises = paises);
  }

  getClaseCss(region: string): string {
    return region === this.regionActiva
      ? 'me-1 btn btn-primary'
      : 'me-1 btn btn-outline-primary';
  }
}
