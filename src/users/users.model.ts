import { Column, DataType, Table, Model } from "sequelize-typescript";
import { UserPositions } from "../shared/enum/user-positions.enum";

interface UserCreationAttrs {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.STRING, unique: true, primaryKey: true })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.ENUM(...Object.values(UserPositions)), defaultValue: UserPositions.DEVELOPER })
  position: UserPositions;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
