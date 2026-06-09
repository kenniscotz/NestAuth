import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [ CustomerService],
})
export class AppModule {}
