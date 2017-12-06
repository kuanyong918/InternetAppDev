export class Cart { //Parent
  //  constructor(
    userId: number;
    userName: string; 
    productItemList: List[];  
   // ) { }
}
export interface List { //Child
   // constructor(
        Quantity: number,
        SubTotal: number,
        product: Product[]

   // ) { }
}
export interface Product { //child of child
   // constructor(
        Id: number,
        MaterialCode: string,
        Description: string,
        Price: number,
   // ) { }
}