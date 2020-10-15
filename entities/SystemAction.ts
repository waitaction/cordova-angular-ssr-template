import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { SystemMenu } from "./SystemMenu";
import { SystemRole } from "./SystemRole";

@Entity("system_action", { schema: "demo-ssr" })
export class SystemAction {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("varchar", { name: "icon", length: 255 })
  icon: string;

  @Column("int", { name: "sort" })
  sort: number;

  @ManyToOne(() => SystemMenu, (systemMenu) => systemMenu.systemActions, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "menuId", referencedColumnName: "id" }])
  menu: SystemMenu;

  @ManyToMany(() => SystemRole, (systemRole) => systemRole.systemActions)
  systemRoles: SystemRole[];
}
