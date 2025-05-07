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

  @Column({ type: 'int', nullable: true })
  houseOwnerId?: number;

  @Column({ type: 'int', nullable: true })
  tenantId?: number;

  @Column({ default: false })
  phoneNumberVerified: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ type: 'datetime', nullable: true })
  reverficationTime?: Date;

  @Column({ type: 'datetime', nullable: true })
  phoneNumberVerifiedDate?: Date;

  @Column({ type: 'datetime', nullable: true })
  emailIdVerifiedDate?: Date;

  @Column({ default: false })
  mandatoryVerification: boolean;

  @Column({ default: false })
  reVerification: boolean; 

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @Column()
  createdBy: string;

  @Column()
  modifiedBy: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'int', default: 0 })
  nonPaidedContactViewed: number;

  @Column({ type: 'int', default: 0 })
  paidedContactViewed: number;

  @Column({ default: false })
  paid: boolean;

  @Column({ type: 'int', default: 0 })
  noOfNonPaidedContact: number;

  @Column({ type: 'text', nullable: true })
  nonPaidContactList?: string;
}
