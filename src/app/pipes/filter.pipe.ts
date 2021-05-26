import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /*
    transform(value: unknown, ...args: unknown[]): unknown {
      return null;
    }
    */
   /*
   El metodo IndexOf devuelve un indice dentro de un objeto con el primer match, si encuentra algo lo devuelve, 
   en caso de que no entonces devuelve un -1
   */
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value; //Si el campo esta vacio o es menor a 3 devuelve la lista completa de productos
    const resultProducts = [];
    for (const product of value) {
      if (product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) { 
        resultProducts.push(product);
      };
    };
    return resultProducts;
  }
}
