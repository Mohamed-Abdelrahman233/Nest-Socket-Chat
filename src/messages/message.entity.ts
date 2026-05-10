
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './group-messages/entities/group.entity';

@Entity("messages")
export class Message { 
    @PrimaryGeneratedColumn() 
    id: number; 

    @Column({type:"text"}) 
    content: string;

    @CreateDateColumn()
    createdAt: Date;

     @Column({default : false})
    isRead : boolean;
 
    @Column({ nullable: true })
    senderId : number;
    
    @Column({ nullable: true })
    receiverId : number;

    @Column({ nullable: true })
    groupId: number;

    @ManyToOne(()=> User,(user)=>user.sentmessage ,{ nullable: true })
    @JoinColumn({name: "senderId"})
    sender: User ;

    @ManyToOne(()=>User , (user)=> user.receivermessage, {nullable : true})
    @JoinColumn({name: "receiverId"})
    receiver : User

   @ManyToOne(() => Group, (group) => group.messages,{nullable : true})
   @JoinColumn({ name: 'groupId' })
   group: Group;
}