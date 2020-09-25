import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiHeader } from '@nestjs/swagger/dist/decorators/api-header.decorator';
import { ApiParam } from '@nestjs/swagger/dist/decorators/api-param.decorator';
import { ApiQuery } from '@nestjs/swagger/dist/decorators/api-query.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Request } from 'express';

@ApiTags('猫')
@Controller('cats')
export class CatsController {

  @ApiOperation({ summary: '查找这只猫来自哪里' })
  @ApiParam({ name: 'id', description: '猫的id' })
  @ApiQuery({ name: 'city', description: '猫来自哪座城市' })
  @ApiHeader({ name: 'authoriation', required: true, description: '本次请求请带上token' })
  @Get("/get/:id")
  find(@Req() request: Request, @Param('id') id: string, @Query('city') city: string): string {
    return `${id},这只猫是黑色的,来自${city}`;
  }
}
