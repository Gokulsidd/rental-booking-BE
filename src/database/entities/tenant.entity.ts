import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { RentalHouseViewedHistory } from './rental-house-viewed-history.entity';
import { Scheme } from './scheme.entity';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
address1: string;

@Column({ nullable: true })
address2: string;

@Column({ nullable: true })
city: string;

@Column({ nullable: true })
district: string;

@Column({ nullable: true })
state: string;

@Column({ nullable: true })
pincode: string;



  @Column({ default: true }) 
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Scheme)
  @JoinColumn({ name: 'schemeId' })
  scheme: Scheme;
  

@Column({ nullable: true })
schemeId?: string;

  


}
