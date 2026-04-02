import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object"
import InvoiceItem from "../../domain/invoice-items.entity"
import Invoice from "../../domain/invoice.entity"
import FindInvoiceUseCase from "./find-invoice.usecase"

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "Document 1",
  address: new Address(
    "Street 1",
    "1",
    "Complement 1",
    "City 1",
    "State 1",
    "1"
  ),
  items: [
    new InvoiceItem({
      id: new Id("1"),
      name: "Item 1",
      price: 10
    }),
    new InvoiceItem({
      id: new Id("2"),
      name: "Item 2",
      price: 20
    })
  ]
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe("Find Invoice use case unit test", () => {

  it("should find a invoice", async () => {

    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const input = {
      id: "1234"
    }

    const result =  await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(invoice.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address).toEqual(invoice.address)
    expect(result.items).toEqual(invoice.items)

  })
})