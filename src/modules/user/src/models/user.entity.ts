import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * MODELO: USUARIOS
 *
 * @author Germano Junior
 */

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id?: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name!: string;

  @Column({
    type: 'varchar',
    name: 'cpf',
  })
  cpf!: string;

  @Column({
    type: 'varchar',
    name: 'email',
  })
  email!: string;

  @Column({
    type: 'varchar',
    name: 'password',
  })
  password!: string;

  @Column({
    type: 'varchar',
    name: 'salt',
  })
  salt!: string;

  @Column({
    type: 'varchar',
    name: 'is_active',
  })
  isActive!: number;

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
