import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { SystemRole } from "./SystemRole";
import { SystemUser } from "./SystemUser";

@Entity("system_organization", { schema: "demo-ssr" })
export class SystemOrganization {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "label", length: 255 })
  label: string;

  @Column("varchar", { name: "type", length: 255 })
  type: string;

  @Column("varchar", { name: "icon", length: 255 })
  icon: string;

  @Column("text", { name: "path", nullable: true })
  path: string | null;

  @Column("int", { name: "sort" })
  sort: number;

  @ManyToOne(
    () => SystemOrganization,
    (systemOrganization) => systemOrganization.systemOrganizations,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "parentId", referencedColumnName: "id" }])
  parent: SystemOrganization;

  @OneToMany(
    () => SystemOrganization,
    (systemOrganization) => systemOrganization.parent
  )
  systemOrganizations: SystemOrganization[];

  @OneToMany(() => SystemRole, (systemRole) => systemRole.organization)
  systemRoles: SystemRole[];

  @ManyToMany(() => SystemUser, (systemUser) => systemUser.systemOrganizations)
  @JoinTable({
    name: "system_user_organization",
    joinColumns: [{ name: "organizationId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "userId", referencedColumnName: "id" }],
    schema: "demo-ssr",
  })
  systemUsers: SystemUser[];
}
