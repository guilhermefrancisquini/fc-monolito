import InvoiceRepository from "../../repository/invoice.repository"
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto"

export default class FindInvoiceUseCase {

  private _invoiceRepository: any

  constructor(InvoiceRepository: any) {
    this._invoiceRepository = InvoiceRepository
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this._invoiceRepository.find(input.id)
    return invoice
  }
} 