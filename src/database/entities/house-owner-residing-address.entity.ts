import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { HouseOwner } from './house-owner.entity';

@Entity()
export class HouseOwnerResidingAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  address1: string;

  @Column({ length: 255, nullable: true })
  address2: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 10, nullable: true })
  pincode: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
 
  @Column()
house_owner_id: string; 

@ManyToOne(() => HouseOwner, owner => owner.residing_addresses, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'house_owner_id' })
house_owner: HouseOwner;
}