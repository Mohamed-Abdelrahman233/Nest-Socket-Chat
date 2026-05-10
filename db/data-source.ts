
import { DataSource  , DataSourceOptions} from "typeorm";
import { User } from "../src/users/user.entity";
import { Message } from "../src/messages/message.entity";
import { GroupMember } from "../src/messages/group-messages/entities/groupmember.entity";
import { Group } from "../src/messages/group-messages/entities/group.entity";
import { config } from "dotenv";

config({path : ".env.development"});

export const DataSourcepptions: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Group, GroupMember, Message, User],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],

    synchronize: false
}

const dataSource = new DataSource(DataSourcepptions)
export default dataSource ;

