import { Injectable } from '@angular/core';
import { RepositoryService } from 'src/app/rbac/services/repository.service';
import { HttpService } from 'src/app/rbac/services/http.service';
import { XTreeNode } from '@ng-nest/ui/tree';

@Injectable({ providedIn: 'root' })
export class OrganizationService extends RepositoryService<Organization> {
  constructor(public http: HttpService) {
    super(http, { controller: { name: 'organization' } });
  }
}

export interface Organization extends XTreeNode {
  label?: string;
  type?: string;
  icon?: string;
  pid?: string;
  path?: string;
}
