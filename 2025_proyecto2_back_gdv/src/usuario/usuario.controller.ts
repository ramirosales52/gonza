import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { JwtAuthGuard } from '../auth/auth-roles.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorators';
import { Role } from '../common/enums/roles.enums';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.usuarioService.findById(req.user.id);
  }

  @Post()
  @Roles(Role.AUDITOR)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @Roles(Role.AUDITOR)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('email/:email')
  @Roles(Role.AUDITOR)
  findByEmail(@Param('email') email: string) {
    return this.usuarioService.findByEmail(email);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findById(id);
  }
  
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles(Role.AUDITOR)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(id);
  }
}
