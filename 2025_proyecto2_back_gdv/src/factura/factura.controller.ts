import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { JwtAuthGuard } from '../auth/auth-roles.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';
import { Role } from '../common/enums/roles.enums';

@Controller('facturas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FacturaController {
  constructor(private readonly service: FacturaService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Delete(':id')
  @Roles(Role.AUDITOR)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}
