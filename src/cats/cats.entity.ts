import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cats')

export class CatsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The Cats unique identifier',
  })
  id: number;

  @Column({
    type: 'varchar',
  })
  age: number;

  @Column({
    type: 'text',
  })
  breed: string;

  @Column({
    type: 'text',
  })
  name: string;
}