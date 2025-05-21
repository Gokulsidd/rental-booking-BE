import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { HouseOwner } from './house-owner.entity';
import { PaymentForRent } from './payment-for-rent.entity';
import { PaymentForTenant } from './payment-for-tenant.entity';
import { RentalsImage } from './rentals-image.entity';

@Entity()
export class RentalHouseDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: true })
  flat_no_or_door_no: string;

  @Column({ length: 255, nullable: true })
  address1: string;

  @Column({ length: 255, nullable: true })
  address2: string;

  @Column({ length: 255, nullable: true })
  address3: string;

  @Column({ length: 100, nullable: true })
  area: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  district: string;

  @Column({ length: 100, nullable: true })
  state: string;

  @Column({ length: 20, nullable: true })
  pincode: string;

  @Column({ length: 10, nullable: true })
  floor: string;

  @Column({ type: 'boolean', default: 0 })
  vasthu: boolean;

  @Column({ type: 'boolean',  default: 0 })
  corporation_water: boolean;

  @Column({ type: 'boolean',  default: 0 })
  bore_water: boolean;

  @Column({ type: 'boolean', default: 0 })
  separate_eb: boolean;

  @Column({ type: 'boolean',  default: 0 })
  two_wheeler_parking: boolean;

  @Column({ type: 'boolean',  default: 0 })
  four_wheeler_parking: boolean;

  @Column({ type: 'boolean', default: 0 })
  separate_house: boolean;

  @Column({ type: 'boolean',  default: 0 })
  owner_in_same_building: boolean;

  @Column({ type: 'boolean', default: 0 })
  rental_occupied: boolean;

  @Column({ type: 'boolean', default: 0 })
  apartment: boolean;

  @Column({ nullable: true })
  apartment_floor: number;

  @Column({ type: 'date', nullable: true })
  rent_from: Date;

  @Column({ type: 'date', nullable: true })
  rent_to: Date;

  @Column({ type: 'boolean',  default: 0 })
  pets_allowed: boolean;

  @Column()
  bhk: number;

  @Column({ type: 'boolean', default: 0 })
  bachelor_allowed: boolean;

  @Column({ type: 'boolean', default: 0 })
  non_veg_allowed: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  deposit: number;

  @Column({ type: 'boolean',  default: 0 })
  payment_active: boolean;

  @Column({ length: 20, nullable: true })
  phone_number: string;

  @Column({ length: 20, nullable: true })
  phone_number_primary: string;

  @Column({ length: 30, nullable: true })
  landline_number: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column()
  house_owner_id: string; 
  
  @ManyToOne(() => HouseOwner, owner => owner.residing_addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'house_owner_id' })
  house_owner: HouseOwner;
  
  @OneToMany(() => PaymentForRent, payment => payment.rental_house)
  rent_payments: PaymentForRent[];

  @OneToMany(() => PaymentForTenant, payment => payment.rental_house)
  tenant_payments: PaymentForTenant[];

  @OneToMany(() => RentalsImage, image => image.rental_house)
  images: RentalsImage[];
}
