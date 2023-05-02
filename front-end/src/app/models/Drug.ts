import { TypeOfDrug } from "src/assets/ts/shared/constants"

export class Drug {
    id?: number
    name: string
    concentration: string
    description: string
    price: number
    type: TypeOfDrug
    total: number
}