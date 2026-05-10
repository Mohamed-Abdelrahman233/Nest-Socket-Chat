import { GroupRole } from "src/messages/group-messages/enums/enum"

export type JwtpayloadtypeRoles ={
    id : number
    email : string
    roles  : GroupRole
}