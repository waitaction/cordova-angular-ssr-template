import { Entity, Column, ManyToOne, PrimaryColumn, ManyToMany } from 'typeorm';
import { Menu } from './menu.entity';
import { Role } from './role.entity';

@Entity('system_action')
export class Action {
  @PrimaryColumn('uuid', { length: 36, type: 'char' })
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  sort?: number;

  @Column()
  icon: string;

  @Column({ length: 36 })
  menuId: string;

  @ManyToOne(
    type => Menu,
    menu => menu.actions,
    { onDelete: 'CASCADE' }
  )
  menu: Menu;

  @ManyToMany(
    type => Role,
    role => role.actions
  )
  roles: Role[];
}
