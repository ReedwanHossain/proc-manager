import { Controller, Query, Param, Post, Delete, Get } from '@nestjs/common';
import { ProcessService } from './process.service';
import { DeleteProcessDto } from './dto/delete-process.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('')
@Controller()
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post('/create-process')
  async create() {
    return await this.processService.create();
  }

  @Delete('/delete-process')
  async delete(@Query() deleteProcessDto: DeleteProcessDto) {
    return await this.processService.delete(deleteProcessDto);
  }

  @Get('/get-all')
  async getAll() {
    return await this.processService.getAll();
  }

  @Get('/get-single/:pid')
  async getSingle(@Param('pid') pid: string) {
    return await this.processService.getSingle(pid);
  }
}
