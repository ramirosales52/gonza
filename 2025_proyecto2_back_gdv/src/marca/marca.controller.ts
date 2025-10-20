import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { JwtAuthGuard } from '../auth/auth-roles.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';
import { Role } from '../common/enums/roles.enums';

@Controller('marcas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarcaController {
  constructor(private readonly service: MarcaService) {}

  @Post()
  @Roles(Role.AUDITOR)
  create(@Body() dto: CreateMarcaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  @Patch(':id')
  @Roles(Role.AUDITOR)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMarcaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.AUDITOR)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
