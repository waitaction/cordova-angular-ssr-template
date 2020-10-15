import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SystemTable } from "./SystemTable";

@Entity("system_col", { schema: "demo-ssr" })
export class SystemCol {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "label", length: 255 })
  label: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "sort" })
  sort: number;

  @Column("json", { name: "type", nullable: true })
  type: object | null;

  @Column("int", { name: "length", nullable: true })
  length: number | null;

  @Column("tinyint", { name: "primary", nullable: true })
  primary: number | null;

  @Column("tinyint", { name: "nullable", nullable: true })
  nullable: number | null;

  @Column("tinyint", { name: "unique", nullable: true })
  unique: number | null;

  @Column("varchar", { name: "default", nullable: true, length: 255 })
  default: string | null;

  @ManyToOne(() => SystemTable, (systemTable) => systemTable.systemCols, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "tableId", referencedColumnName: "id" }])
  table: SystemTable;
}
