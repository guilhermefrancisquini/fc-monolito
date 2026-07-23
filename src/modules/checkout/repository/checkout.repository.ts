import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";
import OrderProductModel from "./order-product.model";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Address from "../../@shared/domain/value-object/address";

export default class CheckoutRepository implements CheckoutGateway {

    async addOrder(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id.id,
            clientId: entity.client.id.id,
            clientName: entity.client.name,
            clientEmail: entity.client.email,
            clientStreet: entity.client.address.street,
            clientNumber: entity.client.address.number,
            clientComplement: entity.client.address.complement,
            clientCity: entity.client.address.city,
            clientState: entity.client.address.state,
            clientZipCode: entity.client.address.zipCode,
            total: entity.total,
            status: entity.status,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            products: entity.products.map((item: Product) => ({
                id: item.id.id,
                order_id: entity.id.id,
                productId: item.id.id,
                productName: item.name,
                productDescription: item.description,
                productSalesPrice: item.salesPrice
            })),
        }, {
            include: [{ model: OrderProductModel, as: "products" }]
        })
    }

    async findOrder(id: string): Promise<Order> {
        const order = await OrderModel.findOne({ where: { id }, include: ["products"] })

        if (!order) {
            throw new Error("Order not found")
        }

        return new Order({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.clientId),
                name: order.clientName,
                email: order.clientEmail,
                address: new Address(
                    order.clientStreet,
                    order.clientNumber,
                    order.clientComplement,
                    order.clientCity,
                    order.clientState,
                    order.clientZipCode 
                ),
            }),
            products: order.products.map((item: OrderProductModel) => (new Product({
                id: new Id(item.productId),
                name: item.productName,
                salesPrice: item.productSalesPrice,
                description: item.productDescription,
            }))),
        })      
    }
}