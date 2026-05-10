import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Message } from '../../message.entity';
import { GroupMember } from './groupmember.entity';


@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column({ type: 'text', nullable: true })
  description: string; 

  @CreateDateColumn()
  createdAt: Date; 

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];

  @OneToMany(() => GroupMember, (member) => member.group)
  members: GroupMember[];
}