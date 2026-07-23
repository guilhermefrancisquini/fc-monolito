import express, { Request, Response } from "express"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import Address from "../../@shared/domain/value-object/address";
import { AddClientFacadeInputDto } from "../facade/client-adm.facade.interface";

export const clientCreateRoute = express.Router()

clientCreateRoute.post("/", async (req: Request, res: Response) => {

  try {
    const clientFacade = ClientAdmFacadeFactory.create()

    const clientAddDto: AddClientFacadeInputDto = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: new Address(
        req.body.address.street,
        req.body.address.number,
        req.body.address.complement,
        req.body.address.city,
        req.body.address.state,
        req.body.address.zipCode
      )
    }

    const output = await clientFacade.add(clientAddDto)

    res.status(201).send(output)
  } catch (error) {
    console.error("Error in clientCreateRoute: ", error)
    res.status(500).send(error)
  }
})