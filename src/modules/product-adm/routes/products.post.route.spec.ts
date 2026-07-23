import { Sequelize } from "sequelize-typescript"
import express, { Express } from 'express'
import request from 'supertest'
import { migrator } from "../../../databases/sequelize/config/migrator"
import { productCreateRoute } from "./products.post.route"
import { Umzug } from "umzug"
import { ProductModel } from "../repository/product.model";


describe("Products tests", () => {
    const app: Express = express()
    app.use(express.json())
    app.use("/products", productCreateRoute)

    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ":memory:",
        logging: false
        })
        
        sequelize.addModels([ProductModel])
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

    it("should create product registration", async () => {
        const response = await request(app).post("/products").send({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 10,
            salesPrice: 20,
            stock: 100
        })

        expect(response.status).toBe(201);
        expect(response.body.id).toBe("1")
        expect(response.body.name).toBe("Product 1")
        expect(response.body.description).toBe("Product 1 description")
        expect(response.body.purchasePrice).toBe(10)
        expect(response.body.salesPrice).toBe(20)
        expect(response.body.stock).toBe(100)
    })

})