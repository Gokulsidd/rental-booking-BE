import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserDisplayFields {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    fieldName: string;
  
    @Column({ name: 'userType' }) // or 'user_type' if DB uses snake_case
userType: 'PUBLIC' | 'NON_PAID' | 'PAID';
}
