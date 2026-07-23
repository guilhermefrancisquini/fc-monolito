import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"
import OrderModel from "./order.model";
import OrderProductModel from "./order-product.model";
import Product from "../domain/product.entity";
import CheckoutRepository from "./checkout.repository";
import Order from "../domain/order.entity";
import Client from "../domain/client.entity";

describe("Checkout Repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([OrderModel, OrderProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create an order", async () => {
        const order = new Order({
            id: new Id("1"),
            client: new Client({
                id: new Id("1"),
                name: "Client 1",
                email: "client1@email.com",
                address: new Address(
                    "Rua 123",
                    "99",
                    "Casa Verde",
                    "Criciúma",
                    "SC",
                    "88888-888"
                )
            }),
            products: [
                new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    salesPrice: 100,
                    description: "Description 1"
                })
            ]
        })

        const checkoutRepository = new CheckoutRepository()
        await checkoutRepository.addOrder(order)

        const orderDb = await OrderModel.findOne({ where: { id: "1" }, include: ["products"] })

        expect(orderDb).toBeDefined()
        expect(orderDb.id).toEqual(order.id.id)
        expect(orderDb.clientId).toEqual(order.client.id.id)
        expect(orderDb.clientName).toEqual(order.client.name)
        expect(orderDb.clientEmail).toEqual(order.client.email)
        expect(orderDb.clientStreet).toEqual(order.client.address.street)
        expect(orderDb.clientNumber).toEqual(order.client.address.number)
        expect(orderDb.clientComplement).toEqual(order.client.address.complement)
        expect(orderDb.clientCity).toEqual(order.client.address.city)
        expect(orderDb.clientState).toEqual(order.client.address.state)
        expect(orderDb.clientZipCode).toEqual(order.client.address.zipCode)
        expect(orderDb.createdAt).toStrictEqual(order.createdAt)
        expect(orderDb.updatedAt).toStrictEqual(order.updatedAt)
        expect(orderDb.products.length).toEqual(1)
        expect(orderDb.products[0].id).toEqual(order.products[0].id.id)
        expect(orderDb.products[0].productId).toEqual(order.products[0].id.id)
        expect(orderDb.products[0].productName).toEqual(order.products[0].name)
        expect(orderDb.products[0].productSalesPrice).toEqual(order.products[0].salesPrice)
    })

    it("should find a order", async () => {
        
        const order = await OrderModel.create({
            id: "1",
            clientId: "1",
            clientName: "Client 1",
            clientEmail: "client1@email.com",
            clientStreet: "Rua 123",
            clientNumber: "99",
            clientComplement: "Casa Verde",
            clientCity: "Criciúma",
            clientState: "SC",
            clientZipCode: "88888-888",
            total: 100,
            status: "approved",
            createdAt: new Date(),
            updatedAt: new Date(),
            products: [
                {
                    id: "1",
                    order_id: "1",
                    productId: "1",
                    productName: "Product 1",
                    productDescription: "Description 1",
                    productSalesPrice: 100,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        }, {
            include: [{ model: OrderProductModel, as: "products" }]
        })

        const checkoutRepository = new CheckoutRepository()
        const orderDb = await checkoutRepository.findOrder(order.id)

        expect(orderDb).toBeDefined()
        expect(orderDb.id.id).toEqual(order.id)
        expect(orderDb.client.name).toEqual(order.clientName)
        expect(orderDb.client.email).toEqual(order.clientEmail)
        expect(orderDb.client.address.street).toEqual(order.clientStreet)
        expect(orderDb.client.address.number).toEqual(order.clientNumber)
        expect(orderDb.client.address.complement).toEqual(order.clientComplement)
        expect(orderDb.client.address.city).toEqual(order.clientCity)
        expect(orderDb.client.address.state).toEqual(order.clientState)
        expect(orderDb.client.address.zipCode).toEqual(order.clientZipCode)
        expect(orderDb.products.length).toEqual(1)
        expect(orderDb.products[0].id.id).toEqual(order.products[0].id)
        expect(orderDb.products[0].name).toEqual(order.products[0].productName)
        expect(orderDb.products[0].salesPrice).toEqual(order.products[0].productSalesPrice)
    })

})