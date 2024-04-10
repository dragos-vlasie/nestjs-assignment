import { User } from '../user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'cats'})

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

   // ManyToMany relationship with User entity (referencing the same relationship from User)
   @ManyToMany(() => User, (user) => user.cats, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
   users: User[]; // Array of User entities
}