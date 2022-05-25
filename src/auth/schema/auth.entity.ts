import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './enum';

@Entity()
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  public role: UserRole;

  @Exclude()
  @Column({ type: 'varchar' })
  public password: string;
}
