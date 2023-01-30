import { Column, DataType, Table, Model } from "sequelize-typescript";
import { TaskStatus } from "../shared/enum/task-status.enum";

interface TaskCreationAttrs {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  createdBy: string;

  @Column({ type: DataType.ENUM(...Object.values(TaskStatus)), defaultValue: TaskStatus.TO_DO })
  status: TaskStatus;

  @Column({ type: DataType.DATE, allowNull: true })
  doneAt: Date;
}
