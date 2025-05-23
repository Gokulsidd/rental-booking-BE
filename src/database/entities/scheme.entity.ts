import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PaymentForRent } from './payment-for-rent.entity';
import { PaymentForTenant } from './payment-for-tenant.entity';
import { RentalHouseViewedHistory } from './rental-house-viewed-history.entity';

@Entity()
export class Scheme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  duration_months: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount_percentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'boolean',  default: 0 })
  for_rental_owner: boolean;

  @Column({ type: 'boolean',  default: 0 })
  for_tenant: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => PaymentForRent, payment => payment.scheme)
  rent_payments: PaymentForRent[];

  @OneToMany(() => PaymentForTenant, payment => payment.scheme)
  tenant_payments: PaymentForTenant[];



}