import { Column, Entity, OneToMany } from "typeorm";
import { SystemPage } from "./SystemPage";
import { SystemTable } from "./SystemTable";

@Entity("system_module", { schema: "demo-ssr" })
export class SystemModule {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("varchar", { name: "icon", nullable: true, length: 255 })
  icon: string | null;

  @Column("datetime", {
    name: "createTime",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createTime: Date;

  @Column("datetime", {
    name: "updateTime",
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updateTime: Date;

  @OneToMany(() => SystemPage, (systemPage) => systemPage.module)
  systemPages: SystemPage[];

  @OneToMany(() => SystemTable, (systemTable) => systemTable.module)
  systemTables: SystemTable[];
}
