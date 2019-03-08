import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import {
  ApiBearerAuth,
  ApiUseTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './models/form.model';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiUseTags('form-builder')
@Controller('api/forms')
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
    const userId = createFormDto.userId;
    let userExists: any;
    try {
      userExists = await this.formsService.findById(userId);
      if (!userExists) {
        throw new HttpException(
          `User with user id ${userId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const newForm = await this.formsService.create(createFormDto);
      return newForm;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard())
  @Get('getAll')
  async findAll(): Promise<Form[]> {
    return this.formsService.findAll();
  }
}
