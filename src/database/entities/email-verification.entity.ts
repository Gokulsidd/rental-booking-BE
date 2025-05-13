import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class EmailVerification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
  email: string;

  @Column()
  otp: string;

  @Column()
  expiresAt: Date;

  @Column({ default: 'SENT' }) // SENT | VERIFIED | EXPIRED
  status: string;

  @CreateDateColumn()
  createdOn: Date;

  @Column()
  createdBy: string;
}
