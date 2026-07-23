import { Sequelize } from "sequelize-typescript"
import express, { Express } from 'express'
import request from 'supertest'
import { migrator } from "../../../databases/sequelize/config/migrator"
import { Umzug } from "umzug"
import { clientCreateRoute } from "./clients.post.route";
import { ClientModel } from "../repository/client.model";


describe("Clients tests", () => {
    const app: Express = express()
    app.use(express.json())
    app.use("/clients", clientCreateRoute)

    let sequelize: Sequelize

    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ":memory:",
        logging: false
        })
        
        sequelize.addModels([ClientModel])
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

    it("should create client registration", async () => {
        const req = {
            id: "2",
            name: "Client 2",
            email: "client2@example.com",
            document: "12345678900",
            address: {
                street: "Street 2",
                number: "2",
                complement: "Complement 1",
                city: "City 1",
                state: "State 1",
                zipCode: "12345678"
            }
        }
        const response = await request(app).post("/clients").send(req)

        expect(response.status).toBe(201);
        expect(response.body.id).toBe("2")
        expect(response.body.name).toBe("Client 2")
        expect(response.body.email).toBe("client2@example.com")
        expect(response.body.document).toBe("12345678900")
    })

})