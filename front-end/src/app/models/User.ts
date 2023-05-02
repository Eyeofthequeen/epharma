import { Permission, Professionnal, Role, TypeOfRegistering } from "../../assets/ts/shared/constants"
import { Address } from "./Address"
import { Pharmacy } from "./Pharmacy"
import { Position } from "./Point"

export class User {
    email: string
    password: string
    username: string
    firstName: string
    lastName: string
    telephon: string
    address: Address
    type: TypeOfRegistering
    roles: Role[]
    professional: Professionnal
    maximumDistance: number
    position: Position
    pharmacy: Pharmacy | null
}