import { Permission, Professionnal, Role, TypeOfRegistering } from "src/assets/ts/shared/constants"
import { Address } from "./Address"
import { Pharmacy } from "./Pharmacy"

export class Employee {
    id: number
    email: string
    password: string
    username: string
    firstName: string
    lastName: string
    telephon: string
    address: Address
    type: TypeOfRegistering
    permissions: Permission[] // to be deleted
    roles: Role[]
    professional: Professionnal
    pharmacy: Pharmacy
    hiringDate: Date
    dateOfBirth: Date
}