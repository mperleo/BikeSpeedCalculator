import { Component, OnInit } from '@angular/core';
import { LANGUAJES, PI, UNITS } from '../emuns';
import { SpeedRegistry } from 'src/interfaces/SpeedRegistry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  public title: string = 'bikeSpeedCalculador';
  public lang: string = LANGUAJES.ES;

  public unit: string = 'mm';

  public distancePerStroke: number = 0;
  public speedCalculated: number = 0;

  public sprocketTeeth: number = 11;
  public chainringTeeth: number = 50;
  public diameter: number = 700;
  public cadence: number = 60;

  public savedCalcs: SpeedRegistry[] = [];

  ngOnInit(): void {}

  public onReset(): void {
    this.sprocketTeeth = 0;
    this.chainringTeeth = 0;
    this.diameter = 0;
    this.cadence = 0;
  }

  public onCalculateSpeed(): void{
    const diameterInMM = this.unitConverter(this.diameter, this.unit);
    console.log(this.diameter);
    this.distancePerStroke = (PI * diameterInMM * this.chainringTeeth) / this.sprocketTeeth;
    this.speedCalculated = (this.cadence * 60 * this.distancePerStroke) / 1000;

    const newCalc: SpeedRegistry = {
      distancePerStroke: this.distancePerStroke,
      speedCalculated: this.speedCalculated,
      sprocketTeeth: this.sprocketTeeth,
      chainringTeeth: this.chainringTeeth,
      cadence: this.cadence,
      diameter: this.diameter,
    }
    this.savedCalcs.push(newCalc);
  }

  public onChangeLang(newLang:string) {
    this.lang = newLang;
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
