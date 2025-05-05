import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
  

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  houseOwnerId?: number;

  @Column({ nullable: true })
  tenantId?: number;

  @Column({ default: false })
  phoneVerified: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ default: 0 })
  verificationAttempts: number;

  @Column({ nullable: true })
  phoneVerifiedAt?: Date;

  @Column({ nullable: true })
  emailVerifiedAt?: Date;

  @Column({ default: false })
  mandatoryVerification: boolean;

  @Column({ default: false })
  reVerificationRequired: boolean;

  @Column({ nullable: true })
  status?: string;

  @Column({ default: 0 })
  nonPaidContactViewed: number;

  @Column({ default: 0 })
  paidContactViewed: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ default: 0 })
  nonPaidContactCount: number;

  @Column({ nullable: true })
  nonPaidContactList?: string;

  @Column()
  createdBy: string;

  @Column()
  modifiedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
