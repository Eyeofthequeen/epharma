import { Availability } from "src/assets/ts/shared/constants"
import { Client } from "./Client"
import { Drug } from "./Drug"
import { Pharmacy } from "./Pharmacy"

export class DrugRequest {
    id: number
    date: Date
    quantity: number
    drug: Drug
    client: Client
    pharmacy?: Pharmacy | null
    response?: Response | null
}

export class Response {
    hasGeneric: boolean | {gen: boolean}
    availability: Availability
    price: number
    comment: string
}