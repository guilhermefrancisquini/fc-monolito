import GenerateInvoiceUseCase from "./generate-invoice.usercase"

describe("Generate Invoice use case unit test", () => {

    it("should generate an invoice", async () => {

        const MockRepository = () => {
            return {
                add: jest.fn(),
                find: jest.fn()
            }
        }

        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

        const input = {
            name: "Lucian",
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
                    price: 10
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 20
                }
            ]
        }

        const result = await usecase.execute(input)

        expect(repository.add).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(input.name)
        expect(result.document).toEqual(input.document)
        expect(result.street).toEqual(input.street)
        expect(result.number).toEqual(input.number)
        expect(result.complement).toEqual(input.complement)
        expect(result.city).toEqual(input.city)
        expect(result.state).toEqual(input.state)
        expect(result.zipCode).toEqual(input.zipCode)
        expect(result.items.length).toEqual(2)
        expect(result.total).toEqual(30)

    })
})