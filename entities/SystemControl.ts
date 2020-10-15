import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SystemPage } from "./SystemPage";

@Entity("system_control", { schema: "demo-ssr" })
export class SystemControl {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("tinyint", { name: "required", nullable: true })
  required: number | null;

  @Column("tinyint", { name: "disabled", nullable: true })
  disabled: number | null;

  @Column("tinyint", { name: "readonly", nullable: true })
  readonly: number | null;

  @Column("tinyint", { name: "hide", nullable: true })
  hide: number | null;

  @Column("tinyint", { name: "primary" })
  primary: number;

  @Column("int", { name: "sort" })
  sort: number;

  @Column("json", { name: "col", nullable: true })
  col: object | null;

  @Column("json", { name: "type" })
  type: object;

  @Column("json", { name: "group", nullable: true })
  group: object | null;

  @ManyToOne(() => SystemPage, (systemPage) => systemPage.systemControls, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "pageId", referencedColumnName: "id" }])
  page: SystemPage;
}
