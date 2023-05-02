import { TypeOfDrug } from "src/assets/ts/shared/constants"
import { Drug } from "./Drug"

export class Lot {
    type: TypeOfDrug
    number: number
    quantity: number
    expiration: Date
    drug: Drug
}