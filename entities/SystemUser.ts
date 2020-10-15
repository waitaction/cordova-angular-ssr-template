import { Column, Entity, ManyToMany } from "typeorm";
import { SystemOrganization } from "./SystemOrganization";
import { SystemRole } from "./SystemRole";

@Entity("system_user", { schema: "demo-ssr" })
export class SystemUser {
  @Column("varchar", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", { name: "account", length: 255 })
  account: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("varchar", { name: "phone", length: 255 })
  phone: string;

  @Column("varchar", { name: "name", length: 36 })
  name: string;

  @ManyToMany(
    () => SystemOrganization,
    (systemOrganization) => systemOrganization.systemUsers
  )
  systemOrganizations: SystemOrganization[];

  @ManyToMany(() => SystemRole, (systemRole) => systemRole.systemUsers)
  systemRoles: SystemRole[];
}
