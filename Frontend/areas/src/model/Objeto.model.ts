export class Objeto {
  id?: number;
  nombre: string = '';
  descripcion: string = '';
  categoria: string = '';
  lugar: string = '';
  fecha: string = '';
  imagen?: string;

  constructor(init?: Partial<Objeto>) {
    Object.assign(this, init);
  }
}