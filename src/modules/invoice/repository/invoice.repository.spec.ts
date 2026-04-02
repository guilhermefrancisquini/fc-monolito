import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import { InvoiceItemModel } from "./invoice-item.model"
import InvoiceRepository from "./invoice.repository"
import Invoice from "../domain/invoice.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import InvoiceItem from "../domain/invoice-items.entity"
import Address from "../../@shared/domain/value-object/address"

describe("Invoice Repository test", () => {

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

    it("should create a invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            ),
            items: [
                new InvoiceItem({
                    id: new Id("1"),
                    name: "Item 1",
                    price: 10
                })
            ]
        })

        const repository = new InvoiceRepository()
        await repository.add(invoice)

        const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" }, include: ["items"] })

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual(invoice.id.id)
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.street).toEqual(invoice.address.street)
        expect(invoiceDb.number).toEqual(invoice.address.number)
        expect(invoiceDb.complement).toEqual(invoice.address.complement)
        expect(invoiceDb.city).toEqual(invoice.address.city)
        expect(invoiceDb.state).toEqual(invoice.address.state)
        expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
        expect(invoiceDb.items.length).toEqual(1)
        expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.id)
        expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name)
        expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price)
    })

    it("should find a invoice", async () => {
        const invoice = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipcode: "Zipcode 1",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 10,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        }, {
            include: [{ model: InvoiceItemModel, as: "items" }]
        })

        const repository = new InvoiceRepository()
        const invoiceDb = await repository.find(invoice.id)

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id.id).toEqual(invoice.id)
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.address.street).toEqual(invoice.street)
        expect(invoiceDb.address.number).toEqual(invoice.number)
        expect(invoiceDb.address.complement).toEqual(invoice.complement)
        expect(invoiceDb.address.city).toEqual(invoice.city)
        expect(invoiceDb.address.state).toEqual(invoice.state)
        expect(invoiceDb.address.zipCode).toEqual(invoice.zipcode)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
        expect(invoiceDb.items.length).toEqual(1)
        expect(invoiceDb.items[0].id.id).toEqual(invoice.items[0].id)
        expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name)
        expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price)
    })

})