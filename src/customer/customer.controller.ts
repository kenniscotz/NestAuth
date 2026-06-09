import { Controller, Post, Get , Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {CreateCustomerDto as DTO}  from './CustomerDTO/customer.DTO';

@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}


        // Endpoint to create a new customer
        //Only post re for this project        

    @Get()
    async getAllCustomers() {
        // Logic to get all customers
        return this.customerService.getAll();
    }

    @Post()
    async createCustomer(@Body() DTO: DTO ) {
        // Logic to create a customer
        return this.customerService.create(DTO);
        console.log('Customer created:');
    }
}
