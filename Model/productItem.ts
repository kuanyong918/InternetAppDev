import { IProduct } from '../Model/product';

export class productItem {
    Id: string // added Id for remove function
    Quantity: number;
    SubTotal: number;
    product: IProduct;
}