import { Component, OnInit } from '@angular/core';
import { PI, SpeedRegistry, UNITS } from './app.component.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  public title: string = 'bikeSpeedCalculador';

  public unit: string = 'mm';

  public distancePerStroke: number = 0;
  public speedCalculated: number = 0;

  public dientesPinon: number = 11;
  public dientesPlato: number = 50;
  public diameter: number = 700;
  public cadence: number = 60;

  public savedCalcs: SpeedRegistry[] = [];

  ngOnInit(): void {}

  public onReset(): void {
    this.dientesPinon = 0;
    this.dientesPlato = 0;
    this.diameter = 0;
    this.cadence = 0;
  }

  public onCalculateSpeed(): void{
    const diameterInMM = this.unitConverter(this.diameter, this.unit);
    console.log(this.diameter);
    this.distancePerStroke = (PI * diameterInMM * this.dientesPlato) / this.dientesPinon;
    this.speedCalculated = (this.cadence * 60 * this.distancePerStroke) / 1000;

    const newCalc: SpeedRegistry = {
      distancePerStroke: this.distancePerStroke,
      speedCalculated: this.speedCalculated,
      dientesPinon: this.dientesPinon,
      dientesPlato: this.dientesPlato,
      cadence: this.cadence,
      diameter: this.diameter,
    }
    this.savedCalcs.push(newCalc);
  }

  private unitConverter(value: number, unit: string) : number{
    let valueConverted: number = 0;

    switch(unit){
      case UNITS.MILIMETERS:
        valueConverted = value / 1000;
        break;
      case UNITS.INCHES:
        valueConverted = value * 0.0254;
        break;
      default:
        break;
    }

    return valueConverted;
  }

}
