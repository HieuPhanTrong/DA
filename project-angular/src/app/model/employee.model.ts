export class Employee {
  [x: string]: any;
  GetCarts(): any {
    throw new Error('Method not implemented.');
  }
  id: number = 0 ;
  name: string = "";
  imgUrl: string = "";
  gender: string = "";
  phone: number = 0;
  address: string = "";
  email: string = "";
}
