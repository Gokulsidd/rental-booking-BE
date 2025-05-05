import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RentalHouseDetails } from './rental-house-details.entity';

@Entity()
export class RentalsImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rental_house_id: number;

  @Column({ length: 255, nullable: true })
  filename: string;

  @Column({ type: 'longblob', nullable: true })
  filebytes: Buffer;

  @ManyToOne(() => RentalHouseDetails, rental => rental.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rental_house_id' })
  rental_house: RentalHouseDetails;
}