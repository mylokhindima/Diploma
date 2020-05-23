import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../+auth/guards/jwt-auth.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderEntity } from './order.entity';
import { OrdersStore } from './orders.store';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
    constructor(private readonly _ordersStore: OrdersStore) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async uploadReport(@Body() dto: CreateOrderDTO): Promise<OrderEntity> {
        return await this._ordersStore.create(dto);
    }
}
