import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import { InvoiceItemModel } from "../repository/invoice-item.model"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"

describe("Invoice Facade test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel, InvoiceItemModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should generate an invoice", async () => {

        const facade = InvoiceFacadeFactory.create()

        const input = {
            name: "Invoice 1",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipCode: "88888-888",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200,
                }
            ],
        }

        const result = await facade.generate(input)
        const invoice = await facade.find({ id: result.id })

        expect(input).toBeDefined()
        expect(result.id).toBe(invoice.id)
        expect(input.name).toBe(invoice.name)
        expect(input.document).toBe(invoice.document)
        expect(input.street).toBe(invoice.address.street)
        expect(input.number).toBe(invoice.address.number)
        expect(input.complement).toBe(invoice.address.complement)
        expect(input.city).toBe(invoice.address.city)
        expect(input.state).toBe(invoice.address.state)
        expect(input.zipCode).toBe(invoice.address.zipCode)
        expect(input.items.length).toBe(2)
        expect(input.items[0].id).toBe(invoice.items[0].id)
        expect(input.items[0].name).toBe(invoice.items[0].name)
        expect(input.items[0].price).toBe(invoice.items[0].price)
        expect(input.items[1].id).toBe(invoice.items[1].id)
        expect(input.items[1].name).toBe(invoice.items[1].name)
        expect(input.items[1].price).toBe(invoice.items[1].price)
    })

    it("should find an invoice", async () => {
        const facade = InvoiceFacadeFactory.create()

        const invoice = {
            name: "Invoice 1",
            document: "1234-5678",
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipCode: "88888-888",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200,
                }
            ],
        }
        const result = await facade.generate(invoice)
        const output = await facade.find({ id: result.id })

        expect(output).toBeDefined()
        expect(output.id).toBe(result.id)
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.address.street).toBe(invoice.street)
        expect(output.address.number).toBe(invoice.number)
        expect(output.address.complement).toBe(invoice.complement)
        expect(output.address.city).toBe(invoice.city)
        expect(output.address.state).toBe(invoice.state)
        expect(output.address.zipCode).toBe(invoice.zipCode)
        expect(output.items.length).toBe(2)
        expect(output.items[0].id).toBe("1")
        expect(output.items[0].name).toBe("Item 1")
        expect(output.items[0].price).toBe(100)
        expect(output.items[1].id).toBe("2")
        expect(output.items[1].name).toBe("Item 2")
        expect(output.items[1].price).toBe(200)
    })
})
