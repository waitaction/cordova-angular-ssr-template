import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SystemControl } from "./SystemControl";
import { SystemModule } from "./SystemModule";
import { SystemPageRelation } from "./SystemPageRelation";

@Entity("system_page", { schema: "demo-ssr" })
export class SystemPage {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @OneToMany(() => SystemControl, (systemControl) => systemControl.page)
  systemControls: SystemControl[];

  @ManyToOne(() => SystemModule, (systemModule) => systemModule.systemPages, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "moduleId", referencedColumnName: "id" }])
  module: SystemModule;

  @OneToMany(
    () => SystemPageRelation,
    (systemPageRelation) => systemPageRelation.toPage
  )
  systemPageRelations: SystemPageRelation[];

  @OneToMany(
    () => SystemPageRelation,
    (systemPageRelation) => systemPageRelation.fromPage
  )
  systemPageRelations2: SystemPageRelation[];
}
