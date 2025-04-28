import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from './tenant.entity';
import { RentalHouseDetails } from './rental-house-details.entity';
import { Scheme } from './scheme.entity';

@Entity()
export class PaymentForTenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number;

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

  @Column({ length: 100 })
  reference_number: string;

  @Column({ type: 'text' })
  bank_details: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  transaction_successful: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  payment_expired: boolean;

  @Column({ type: 'datetime', nullable: true })
  payment_expiry_date: Date;

  @ManyToOne(() => Tenant, tenant => tenant.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => RentalHouseDetails, rental => rental.tenant_payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rental_house_id' })
  rental_house: RentalHouseDetails;

  @ManyToOne(() => Scheme, scheme => scheme.tenant_payments)
  @JoinColumn({ name: 'scheme_id' })
  scheme: Scheme;
}