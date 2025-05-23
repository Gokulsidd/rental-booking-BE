import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn,JoinColumn } from 'typeorm';
import { Tenant } from './tenant.entity';
import { Scheme } from './scheme.entity';
import { RentalHouseDetails } from './rental-house-details.entity';

@Entity()
export class RentalHouseViewedHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column()
  tenantId: string;

  @ManyToOne(() => RentalHouseDetails)
  @JoinColumn({ name: 'rentalHouseId' })
  rentalHouse: RentalHouseDetails;

  @Column()
  rentalHouseId: string;

  @ManyToOne(() => Scheme)
  @JoinColumn({ name: 'schemeId' })
  scheme: Scheme;

  @Column()
  schemeId: string;

  @Column({ type: 'time' })
  viewedTime: string;

  @Column({ type: 'date' })
  viewedDate: string;

  @CreateDateColumn()
  createdAt: Date;

   @Column({ default: true }) 
  status: boolean;

}
