import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Task } from "./tasks.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {}

  async create(req, taskDto: CreateTaskDto) {
    const user = req.user;
    const newTask = { ...taskDto, id: uuidv4(), createdBy: user.id };
    return await this.taskRepository.create(newTask);
  }

  async getAll(req: any) {
    return await this.taskRepository.findAll({ where: { createdBy: req.user.id } });
  }

  async getOneById(id: string) {
    return await this.taskRepository.findOne({ where: { id } });
  }
}
