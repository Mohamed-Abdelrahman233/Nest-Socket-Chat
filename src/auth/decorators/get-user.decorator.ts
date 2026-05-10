import { createParamDecorator , ExecutionContext} from "@nestjs/common";
import { Jwtpayloadtype } from "../Jwtpayload";


export const currrentuser = createParamDecorator(
    (data , context :ExecutionContext) =>{
        const request = context.switchToHttp().getRequest()
        const payload : Jwtpayloadtype = request["user"]
        return payload ;
    })

