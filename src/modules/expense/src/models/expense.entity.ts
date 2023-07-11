import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * MODELO: DESPESAS
 *
 * @author Germano Junior
 */

@Entity('expense')
export class ExpenseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id?: number;

  @Column({
    type: 'varchar',
    name: 'description',
  })
  description!: string;

  @Column({
    type: 'varchar',
    name: 'date',
  })
  date!: Date;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  userId!: number;

  @Column({
    type: 'double',
    name: 'value',
  })
  value!: number;

  @CreateDateColumn({
    type: 'varchar',
    name: 'created_at',
  })
  createdAt?: string;

  @UpdateDateColumn({
    type: 'varchar',
    name: 'updated_at',
  })
  updatedAt?: string;

  @DeleteDateColumn({
    type: 'varchar',
    name: 'deleted_at',
  })
  deletedAt?: string;
}
