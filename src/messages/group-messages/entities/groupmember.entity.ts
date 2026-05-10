import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../../users/user.entity';
import { Group } from './group.entity';
import { GroupRole } from "../enums/enum";

@Entity('group_members')
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

@Column({
  type: 'enum',
  enum: GroupRole,
  default: GroupRole.MEMBER,
})
 role : GroupRole

  @CreateDateColumn()
  joinedAt: Date;

  @Column({ name: 'creator_id', nullable: true }) 
  creatorId: number

  @Column({ name: 'group_id' }) 
  groupId: number
 
  @ManyToOne(() => User, (user) => user.id )
  @JoinColumn({ name: 'creator_id' })
  user: User;

  @ManyToOne(() => Group, (group) => group.members)
  group: Group;
}