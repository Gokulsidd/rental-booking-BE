import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { HouseOwnerResidingAddress } from './house-owner-residing-address.entity';
import { RentalHouseDetails } from './rental-house-details.entity';
import { User } from './user.entity';
import { PaymentForRent } from './payment-for-rent.entity';

@Entity()
export class HouseOwner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  first_name: string;

  @Column({ length: 100, nullable: true })
  last_name: string;

  @Column({ length: 100, nullable: true })
  father_name: string;

  @Column({ length: 100, nullable: true })
  mother_name: string;

  @Column({ length: 50, nullable: true })
  aadhar_no: string;

  @Column({ length: 30 })
  phone_primary: string;

  @Column({ length: 30, nullable: true })
  phone_secondary: string;

  @Column({ length: 30, nullable: true })
  landline1: string;

  @Column({ length: 30, nullable: true })
  landline2: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 30, nullable: true })
  address1: string;

  @Column({ length: 30, nullable: true })
  address2: string;

  @Column({ length: 30, nullable: true })
  city: string;

  @Column({ length: 30, nullable: true })
  district: string;

  @Column({ length: 30, nullable: true })
  state: string;

  @Column({ length: 30, nullable: true })
  pincode: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  residing_address: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ 
    type: 'datetime', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => HouseOwnerResidingAddress, address => address.house_owner)
  residing_addresses: HouseOwnerResidingAddress[];

 
}