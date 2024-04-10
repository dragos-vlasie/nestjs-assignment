import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Request, UseGuards, UsePipes } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsEntity } from './cats.entity';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('cats')
@ApiTags('cats')
@UseGuards(JwtAuthGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Get()
  async findAll(): Promise<CatsEntity[]> {
    try {
      return await this.catsService.findAll();
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<CatsEntity> {
    const cat = await this.catsService.getOneById(id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto): Promise<CatsEntity> {
    try {
      return await this.catsService.create(createCatDto);
    } catch (error) {
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto): Promise<CatsEntity> {
    const updatedCat = await this.catsService.update(id, updateCatDto);
    if (!updatedCat) {
      throw new NotFoundException('Cat not found');
    }
    return updatedCat;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<{ removedCat: void; description: string; }> {
    try {
      const removedCat = await this.catsService.remove(id);
      return { removedCat, description: 'Cat successfully removed' }
    } catch (error) {
      if (error.message === 'Cat not found') {
        throw new NotFoundException(error.message);
      } else {
        throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
