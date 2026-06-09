import { Injectable } from '@nestjs/common';
import {CreateCustomerDto as DTO}  from './CustomerDTO/customer.DTO';

@Injectable()
export class CustomerService {
    private database: DTO[] = [];


    getAll() {
        // Logic to get all customers
        return this.database;
    }

    create(dto: DTO) {
        // Logic to create a customer
        this.database.push(dto);
        return { message: 'Customer created successfully', data: dto };
    }
}
