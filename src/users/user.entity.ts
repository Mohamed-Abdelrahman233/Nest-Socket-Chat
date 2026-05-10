
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany  } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Message } from 'src/messages/message.entity';

@Entity("users")
export class User { 
    @PrimaryGeneratedColumn() 
    id: number; 

    @Column({ type: "varchar", length: "50" }) 
    username: string;

    @Column({ unique: true }) 
    email: string;

    @Column({ type: "varchar", length: "150" })
    @Exclude() 
    password: string;

    @Column({ type: "varchar", length: "20", nullable: true })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: false })
    isVerified: boolean;

   @Column({ type: 'varchar', nullable: true }) 
   verificationToken?: string | null;

    @OneToMany(() => Message, (message) => message.senderId)
    sentmessage : Message[];

    @OneToMany(()=> Message , (message)=>message.receiverId)
    receivermessage : Message[]
    
}