import { User } from 'src/User/user.entity'
import { 
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity, 
    OneToOne, 
    JoinColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import * as securePin from "secure-pin";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User) @JoinColumn()
    user_id: User;

    @Column()
    name: string;

    @Column()
    pinCode: string;

    @BeforeInsert()
    async addPinCode() {
        securePin.generatePin(6, (pin) => {
            this.pinCode = pin;
        });
    }

    @Column({ default: 15 })
    timeUp: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}