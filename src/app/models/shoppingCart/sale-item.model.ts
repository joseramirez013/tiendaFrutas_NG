import { ProductImageModel } from "../products/product-image.model";

export class SaleItemModel{
    json() {
      throw new Error('Method not implemented.');
    }
    id?: String;
    ammount: number;
    price: number;
    productId: string;
    shoppingCartId: String;
    images: ProductImageModel[];
}