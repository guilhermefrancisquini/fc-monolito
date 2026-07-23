import express, { Request, Response } from "express"
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutGateway from "../gateway/checkout.gateway";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import CheckoutRepository from "../repository/checkout.repository";
import StoreCatalogFacade from "../../store-catalog/facade/store-catalog.facade";
import InvoiceFacadeInterface from "../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../payment/facade/facade.interface";
import { PlaceOrderInputDto } from "../usecase/place-order/place-order.dto";
import ProductAdmFacadeInterface from "../../product-adm/facade/product-adm.facade.interface";

export const checkoutCreateRoute = express.Router()

checkoutCreateRoute.post("/", async (req: Request, res: Response) => {
  try {

    const clientFacade: ClientAdmFacadeInterface = ClientAdmFacadeFactory.create();
    const productFacade: ProductAdmFacadeInterface = ProductAdmFacadeFactory.create();
    const catalogFacade: StoreCatalogFacade = StoreCatalogFacadeFactory.create();
    const repository: CheckoutGateway = new CheckoutRepository();
    const invoiceFacade: InvoiceFacadeInterface = InvoiceFacadeFactory.create();
    const paymentFacade: PaymentFacadeInterface = PaymentFacadeFactory.create();
    
    const checkoutUsecase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        catalogFacade,
        repository,
        invoiceFacade,
        paymentFacade
    );

    const placeOrderInputDto: PlaceOrderInputDto = {
        clientId: req.body.clientId,
        products: req.body.products.map((product: any) => ({
            productId: product.productId
        }))
    }

    const output = await checkoutUsecase.execute(placeOrderInputDto)

    res.status(201).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

