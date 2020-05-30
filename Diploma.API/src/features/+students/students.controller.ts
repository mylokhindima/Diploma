import { SearchStudentsDTO } from './dtos/search-students.dto';
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../+auth/guards/jwt-auth.guard';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { StudentEntity } from './student.entity';
import { StudentsService } from './students.service';
import { StudentsStore } from './students.store';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('students')
export class StudentsController {
  constructor(
    private readonly _studentsStore: StudentsStore,
    private readonly _studentsService: StudentsService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async create(@Body() studentDTO: CreateStudentDTO): Promise<StudentEntity> {
    return await this._studentsStore.create(studentDTO);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async getAll(): Promise<StudentEntity[]> {
    return await this._studentsStore.findAll();
  }

  @Get('filter')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async filter(@Query() dto: SearchStudentsDTO): Promise<StudentEntity[]> {
    return await this._studentsStore.filter(dto);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  public async get(@Param('id') id: string): Promise<StudentEntity> {
    return await this._studentsStore.find(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  public async uploadFile(@UploadedFile() file) {
    return await this._studentsService.upload(file);
  }
}
