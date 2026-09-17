import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  PipeTransform,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.interface';
import { ProductsService } from './products.service';

class ParsePositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
      throw new BadRequestException('Product ID must be a positive integer');
    }

    return parsedValue;
  }
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createProductDto: CreateProductDto): Product {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id', ParsePositiveIntPipe) id: number): Product {
    return this.productsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParsePositiveIntPipe) id: number): Product {
    return this.productsService.remove(id);
  }
}
