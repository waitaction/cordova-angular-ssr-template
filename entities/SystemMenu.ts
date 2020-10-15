import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SystemAction } from "./SystemAction";

@Entity("system_menu", { schema: "demo-ssr" })
export class SystemMenu {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "label", length: 255 })
  label: string;

  @Column("varchar", { name: "router", length: 255 })
  router: string;

  @Column("varchar", { name: "icon", length: 255 })
  icon: string;

  @Column("text", { name: "path", nullable: true })
  path: string | null;

  @Column("int", { name: "sort" })
  sort: number;

  @OneToMany(() => SystemAction, (systemAction) => systemAction.menu)
  systemActions: SystemAction[];

  @ManyToOne(() => SystemMenu, (systemMenu) => systemMenu.systemMenus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "parentId", referencedColumnName: "id" }])
  parent: SystemMenu;

  @OneToMany(() => SystemMenu, (systemMenu) => systemMenu.parent)
  systemMenus: SystemMenu[];
}
