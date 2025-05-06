import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { HouseOwner } from './house-owner.entity';
import { Tenant } from './tenant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ nullable: true })
  house_owner_id: number;

  @Column({ nullable: true })
  tenant_id: number;

  @Column({ length: 20 })
  phone_number: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  phone_verified: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  email_verified: boolean;

  @Column({ default: 0 })
  verification_attempts: number;

  @Column({ type: 'datetime', nullable: true })
  phone_verified_at: Date;

  @Column({ type: 'datetime', nullable: true })
  email_verified_at: Date;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  mandatory_verification: boolean;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  re_verification_required: boolean;

  @Column({ length: 50, nullable: true })
  status: string;

  @Column({ default: 0 })
  non_paid_contact_viewed: number;

  @Column({ default: 0 })
  paid_contact_viewed: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  is_paid: boolean;

  @Column({ default: 0 })
  non_paid_contact_count: number;

  @Column({ type: 'text', nullable: true })
  non_paid_contact_list: string;

  @Column({ length: 100 })
  created_by: string;

  @Column({ length: 100 })
  modified_by: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ 
    type: 'datetime', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP' 
  })
  updated_at: Date;

  // A user can be linked to one house owner
  @OneToOne(() => HouseOwner, owner => owner.user, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'house_owner_id' })
  house_owner: HouseOwner;

  // A user can also be linked to one tenant 
  @OneToOne(() => Tenant, tenant => tenant.user, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}