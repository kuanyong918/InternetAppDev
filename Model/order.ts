import { productItem } from '../Model/productItem';

export interface Order {
    Id: number,
    orderId: string,
    userId: number;
    userName: string, //added username
    productItemList: string
}
