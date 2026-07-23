import express, { Request, Response } from "express"
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { AddProductFacadeInputDto } from "../facade/product-adm.facade.interface";

export const productCreateRoute = express.Router()

productCreateRoute.post("/", async (req: Request, res: Response) => {
  try {
    const productFacade = ProductAdmFacadeFactory.create()

    const productAddDto: AddProductFacadeInputDto = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        purchasePrice: req.body.purchasePrice,
        salesPrice: req.body.salesPrice,
        stock: req.body.stock
    }

    const output = await productFacade.addProduct(productAddDto)

    res.status(201).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})