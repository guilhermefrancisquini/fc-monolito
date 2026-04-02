import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    generateUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateInvoiceUseCase: UseCaseInterface
    private _findInvoiceUseCase: UseCaseInterface

    constructor(props: UseCaseProps) {
        this._generateInvoiceUseCase = props.generateUsecase
        this._findInvoiceUseCase = props.findUsecase
    }

    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return this._findInvoiceUseCase.execute(input);
    }

    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateInvoiceUseCase.execute(input);
    }
    
}

