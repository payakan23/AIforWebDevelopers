import {BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Message from "./message";
import Conversation from "./conversation";

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    username: string

    @Column({select: false})
    password: string

    @Column({select: false})
    authToken: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[]

    @ManyToMany(() => Conversation, (conversation) => conversation.users)
    conversations: Conversation[]
}