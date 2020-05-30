import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, Delete, Param, Get } from '@nestjs/common';
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
    public async createOrder(@Body() dto: CreateOrderDTO): Promise<OrderEntity> {
        return await this._ordersStore.create(dto);
    }

    @Get('file/:id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async findByFileId(@Param('id') id: string): Promise<OrderEntity> {
        return await this._ordersStore.findByFileId(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    public async removeOrder(@Param('id') id: string): Promise<void> {
        return await this._ordersStore.removeOrder(id);
    }
}
