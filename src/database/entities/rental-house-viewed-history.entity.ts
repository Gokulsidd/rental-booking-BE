import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class RentalHouseViewedHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @Column()
  rentalHouseId: string;

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
