import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsEntity } from './cats.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@UseGuards(RolesGuard)
@Controller('cats')
@ApiTags('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Array of cats' })
  @ApiResponse({ status: 500, description: 'Internal server error' }) 
  async findAll(): Promise<Cat[]> {
    try {
      return await this.catsService.findAll();
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Cat created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' }) 
  @UsePipes(ValidationPipe) 
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

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Cat> {
    const cat = await this.catsService.getOneById(id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat;
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Cat details updated' })
  @UsePipes(ValidationPipe) 
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto): Promise<CatsEntity> {
    const updatedCat = await this.catsService.update(id, updateCatDto);
    if (!updatedCat) {
      throw new NotFoundException('Cat not found');
    }
    return updatedCat;
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cat successfully removed' })
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    try {
      await this.catsService.remove(id);
    } catch (error) {
      if (error.message === 'Cat not found') { 
        throw new NotFoundException(error.message);
      } else {
        throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
