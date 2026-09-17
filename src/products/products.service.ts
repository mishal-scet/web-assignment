import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];
  private nextId = 1;

  findAll(): Product[] {
    return this.products;
  }

  create(createProductDto: CreateProductDto): Product {
    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
    };

    this.products.push(product);
    return product;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  remove(id: number): Product {
    const productIndex = this.products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const [deletedProduct] = this.products.splice(productIndex, 1);
    return deletedProduct;
  }
}
