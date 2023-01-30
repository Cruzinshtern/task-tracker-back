import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(@Req() req: any, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req, createTaskDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Req() req: any) {
    return this.tasksService.getAll(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string) {
    return this.tasksService.getOneById(id);
  }
}
