import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { SystemOrganization } from "./SystemOrganization";
import { SystemAction } from "./SystemAction";
import { SystemUser } from "./SystemUser";

@Entity("system_role", { schema: "demo-ssr" })
export class SystemRole {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @ManyToOne(
    () => SystemOrganization,
    (systemOrganization) => systemOrganization.systemRoles,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "organizationId", referencedColumnName: "id" }])
  organization: SystemOrganization;

  @ManyToMany(() => SystemAction, (systemAction) => systemAction.systemRoles)
  @JoinTable({
    name: "system_role_action",
    joinColumns: [{ name: "roleId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "actionId", referencedColumnName: "id" }],
    schema: "demo-ssr",
  })
  systemActions: SystemAction[];

  @ManyToMany(() => SystemUser, (systemUser) => systemUser.systemRoles)
  @JoinTable({
    name: "system_user_role",
    joinColumns: [{ name: "roleId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "userId", referencedColumnName: "id" }],
    schema: "demo-ssr",
  })
  systemUsers: SystemUser[];
}
