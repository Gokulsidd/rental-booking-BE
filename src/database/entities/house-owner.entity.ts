import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { HouseOwnerResidingAddress } from './house-owner-residing-address.entity';
import { RentalHouseDetails } from './rental-house-details.entity';
import { User } from './user.entity';
import { PaymentForRent } from './payment-for-rent.entity';

@Entity()
export class HouseOwner {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column({ type: 'tinyint', width: 1, default: 0 })
  has_residing_address: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ 
    type: 'datetime', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;

  @OneToMany(() => HouseOwnerResidingAddress, address => address.house_owner)
  residing_addresses: HouseOwnerResidingAddress[];

  @OneToOne(() => User, user => user.house_owner)
  user: User;

  @OneToMany(() => RentalHouseDetails, rental => rental.house_owner)
  rental_houses: RentalHouseDetails[];

  @OneToMany(() => PaymentForRent, payment => payment.house_owner)
  payments: PaymentForRent[];
}