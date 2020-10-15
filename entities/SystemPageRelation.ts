import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { SystemPage } from "./SystemPage";

@Index("IDX_6c166329aff74304c4c25390a5", ["toPageId"], {})
@Index("IDX_6d3a58ca78d46588756f27fdff", ["fromPageId"], {})
@Entity("system_page_relation", { schema: "demo-ssr" })
export class SystemPageRelation {
  @Column("char", { primary: true, name: "fromPageId", length: 36 })
  fromPageId: string;

  @Column("char", { primary: true, name: "toPageId", length: 36 })
  toPageId: string;

  @ManyToOne(() => SystemPage, (systemPage) => systemPage.systemPageRelations, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "toPageId", referencedColumnName: "id" }])
  toPage: SystemPage;

  @ManyToOne(
    () => SystemPage,
    (systemPage) => systemPage.systemPageRelations2,
    { onDelete: "CASCADE", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "fromPageId", referencedColumnName: "id" }])
  fromPage: SystemPage;
}
