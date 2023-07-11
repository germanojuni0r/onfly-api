import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * MODELO: TOKEN DE ACESSO
 *
 * @author Germano Junior
 */

@Entity('accesstoken')
export class AccessTokenEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id?: number;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  userId!: number;

  @Column({
    type: 'varchar',
    name: 'token',
  })
  token!: string;

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
