import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PaymentForRent } from './payment-for-rent.entity';
import { PaymentForTenant } from './payment-for-tenant.entity';

@Entity()
export class Scheme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  duration_months: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount_percentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  for_rental_owner: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  for_tenant: boolean;

  @OneToMany(() => PaymentForRent, payment => payment.scheme)
  rent_payments: PaymentForRent[];

  @OneToMany(() => PaymentForTenant, payment => payment.scheme)
  tenant_payments: PaymentForTenant[];
}