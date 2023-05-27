import {
    AfterLoad,
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    body: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date

    formattedCreatedDate: string

    @AfterLoad()
    setComputedText(){
        this.formattedCreatedDate = new Intl.DateTimeFormat("en-US").format(this.createdDate);
    }

}


export default Note;