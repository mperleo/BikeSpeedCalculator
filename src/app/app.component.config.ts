export const PI: number = 3.14;

export const enum UNITS {
  MILIMETERS = 'mm',
  INCHES = 'inch'
}

export interface SpeedRegistry {
    distancePerStroke: number,
    speedCalculated: number,
    dientesPinon: number,
    dientesPlato: number,
    cadence: number,
    diameter: number,
}