import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { XQuery, XRepositoryService } from 'rbac/api/core';
import { Repository } from 'typeorm';
import { Action } from 'entities/action.entity';


export interface ActionQuery {
  menuId: string;
}

@Injectable()
export class ActionsService extends XRepositoryService<Action, XQuery> {
  constructor(
    @InjectRepository(Action)
    private readonly entityRepository: Repository<Action>
  ) {
    super(entityRepository);
  }

  //   async findAll(index: number, size: number, query: ActionQuery): Promise<XResultList<Action>> {
  //     return new Promise<XResultList<Action>>(async x => {
  //       let querys = this.entityRepository.createQueryBuilder('action');
  //       if (query.menuId) {
  //         querys = querys.where('action.menuId = :id', { id: query.menuId });
  //       }
  //       let result: XResultList<Action> = {
  //         list: await querys
  //           .skip(size * (index - 1))
  //           .take(size)
  //           .getMany(),
  //         total: await querys.getCount(),
  //         query: {
  //           index: index,
  //           size: size
  //         }
  //       };
  //       x(result);
  //     });
  //   }
}
