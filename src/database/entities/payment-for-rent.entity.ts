import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HouseOwner } from './house-owner.entity';
import { RentalHouseDetails } from './rental-house-details.entity';
import { Scheme } from './scheme.entity';

@Entity()
export class PaymentForRent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  house_owner_id: number;

  @Column()
  rental_house_id: number;

  @Column({ type: 'datetime' })
  payment_date: Date;

  @Column({ type: 'datetime' })
  payment_received: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount_paid: number;

  @Column()
  scheme_id: number;

  @Column({ length: 100, nullable: true })
  reference_number: string;

  @Column({ type: 'text', nullable: true })
  bank_details: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  transaction_successful: boolean;

  @Column({ type: 'datetime', nullable: true })
  payment_expiry: Date;

  @ManyToOne(() => HouseOwner, owner => owner.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'house_owner_id' })
  house_owner: HouseOwner;

  @ManyToOne(() => RentalHouseDetails, rental => rental.rent_payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rental_house_id' })
  rental_house: RentalHouseDetails;

  @ManyToOne(() => Scheme, scheme => scheme.rent_payments)
  @JoinColumn({ name: 'scheme_id' })
  scheme: Scheme;
}