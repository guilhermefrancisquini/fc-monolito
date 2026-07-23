import express, { Request, Response } from "express"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto } from "../facade/invoice.facade.interface";

export const invoiceRoute = express.Router()

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const clientFacade: InvoiceFacadeInterface = InvoiceFacadeFactory.create();
    
    const findInvoiceDto: FindInvoiceFacadeInputDto = {
        id: req.params.id
    }

    const output = await clientFacade.find(findInvoiceDto)

    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})