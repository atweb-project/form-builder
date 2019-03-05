import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { FormsService } from './forms.service';
import {
  ApiBearerAuth,
  ApiUseTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './interfaces/form.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiUseTags('form-builder')
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @UseGuards(AuthGuard())
  @Post('addForm')
  @ApiOperation({ title: 'Create form' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createFormDto: CreateFormDto) {
    /* const email = createUserDto.email;
        let exist: any;
        try {
            exist = await this.usersService.findOne({ email });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${email} exists`, HttpStatus.BAD_REQUEST);
        } */
    const newForm = await this.formsService.create(createFormDto);
    return newForm;
  }

  @UseGuards(AuthGuard())
  @Get('getAll')
  async findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }
}
