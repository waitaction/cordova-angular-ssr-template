import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'entities/role.entity';
import { Action } from 'entities/action.entity';
import { filter, find, remove } from 'lodash';
import { XIdType, XQuery, XRepositoryService } from 'admin/api/core';

@Injectable()
export class RolesService extends XRepositoryService<Role, XQuery> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>
  ) {
    super(roleRepository);
  }

  async get(id: XIdType): Promise<Role> {
    return await this.roleRepository.findOne(id, { relations: ['organization'] });
  }

  async getActions(id: XIdType, menuId: XIdType): Promise<Action[]> {
    let qb = this.actionRepository
      .createQueryBuilder('entity')
      .leftJoin('entity.roles', 'role')
      .select(['entity.id', 'entity.name', 'entity.code'])
      .where('entity.menuId = :menuId')
      .andWhere('role.id = :id');

    qb.setParameters({
      id: id,
      menuId: menuId
    });

    return await qb.getMany();
  }

  async putActions(id: XIdType, menuId: XIdType, actions: Action[]): Promise<any> {
    let role = await this.roleRepository.findOne(id, { relations: ['actions'] });
    remove(role.actions, y => !find(actions, z => z.id === y.id) && y.menuId === menuId);
    role.actions = [...role.actions, ...filter(actions, y => !find(role.actions, z => y.id === z.id))];
    await this.roleRepository.save(role);
  }
}
