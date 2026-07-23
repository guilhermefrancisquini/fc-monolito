import { Sequelize } from "sequelize-typescript"
import express, { Express } from 'express'
import request from 'supertest'
import { migrator } from "../../../databases/sequelize/config/migrator"
import { Umzug } from "umzug"
import { ClientModel } from "../../client-adm/repository/client.model";
import { clientCreateRoute } from "../../client-adm/routes/clients.post.route";
import { productCreateRoute } from "../../product-adm/routes/products.post.route";
import { ProductModel as ProductAdmModel } from "../../product-adm/repository/product.model";
import StoreCatalogProductModel from "../../store-catalog/repository/product.model";
import TransactionModel from "../../payment/repository/transaction.model";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import { InvoiceItemModel } from "../../invoice/repository/invoice-item.model";
import { checkoutCreateRoute } from "../../checkout/routes/checkout.post.route";
import OrderModel from "../../checkout/repository/order.model";
import OrderProductModel from "../../checkout/repository/order-product.model";
import { invoiceRoute } from "./invoice.get.route";


describe("Invoice tests", () => {
    const app: Express = express()
    app.use(express.json())
    app.use("/checkout", checkoutCreateRoute)
    app.use("/clients", clientCreateRoute)
    app.use("/products", productCreateRoute)
    app.use("/invoice", invoiceRoute)

    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ":memory:",
        logging: false
        })
        
        sequelize.addModels([
            OrderModel,
            OrderProductModel,
            ClientModel, ProductAdmModel,
            StoreCatalogProductModel,
            TransactionModel,
            InvoiceModel,
            InvoiceItemModel
        ])
        migration = migrator(sequelize)
        await migration.up()
    })

    afterEach(async () => {
        if (!migration || !sequelize) {
            return 
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
    })

    it("should create checkout registration", async () => {
        const responseClient = await request(app).post("/clients").send({
            id: "1",
            name: "Client 1",
            email: "client1@example.com",
            document: "12345678900",
            address: {
                street: "Street 1",
                number: "1",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "12345678"
            }
        });

        expect(responseClient.status).toBe(201);
        expect(responseClient.body.id).toBe("1");

        const responseProduct = await request(app).post("/products").send({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            salesPrice: 200,
            stock: 100
        })

        expect(responseProduct.status).toBe(201);
        expect(responseProduct.body.id).toBe("1")

        const responseCheckout = await request(app).post("/checkout").send({
           clientId: "1",
           products: [
            {
                productId: '1'
            }
           ]
        })

        expect(responseCheckout.status).toBe(201);
        expect(responseCheckout.body.status).toBe("approved")
        expect(responseCheckout.body.total).toBe(200)
        expect(responseCheckout.body.products.length).toBe(1)
        expect(responseCheckout.body.products[0].productId).toBe("1")

        const invoiceId = responseCheckout.body.invoiceId;
        const response = await request(app).get(`/invoice/${invoiceId}`).set('Accept', 'application/json').send();

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Client 1")
        expect(response.body.items[0].id).toBe("1")
        expect(response.body.items[0].name).toBe("Product 1")
        expect(response.body.items[0].price).toBe(200)
    })

})