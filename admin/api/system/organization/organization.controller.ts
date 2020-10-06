import { Controller, UseGuards } from '@nestjs/common';
import { XControllerService, XQuery } from 'admin/api/core';
import { Organization } from 'entities/organization.entity';
import { AuthGuard } from '@nestjs/passport';
import { OrganizationService } from './organization.service';

@Controller('admin/organization')
@UseGuards(AuthGuard('jwt'))
export class OrganizationController extends XControllerService<Organization, XQuery> {
  constructor(private readonly organizationService: OrganizationService) {
    super(organizationService);
  }
}
