import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SystemCol } from "./SystemCol";
import { SystemModule } from "./SystemModule";

@Entity("system_table", { schema: "demo-ssr" })
export class SystemTable {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("json", { name: "transform", nullable: true })
  transform: object | null;

  @OneToMany(() => SystemCol, (systemCol) => systemCol.table)
  systemCols: SystemCol[];

  @ManyToOne(() => SystemModule, (systemModule) => systemModule.systemTables, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "moduleId", referencedColumnName: "id" }])
  module: SystemModule;
}
