import { Types } from 'mongoose';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { BaseUser, UserType } from '../../../domain/entities/user.entity';
import { UserModel, UserLean } from '../models/user.model';

export class UserRepository implements IUserRepository {
  async findAll(): Promise<BaseUser[]> {
    const docs = await UserModel
      .find()
      .lean<UserLean[]>()
      .exec();
    return docs.map((doc: UserLean) => this.toDomain(doc));
  }

  async findById(id: string): Promise<BaseUser | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await UserModel
      .findById(id)
      .lean<UserLean>()
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async findByEmail(email: string): Promise<BaseUser | null> {
    const doc = await UserModel
      .findOne({ email })
      .lean<UserLean>()
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async create(data: Omit<BaseUser, 'id'>): Promise<BaseUser> {
    const created = await UserModel.create(data);
    const doc = created.toObject() as UserLean;
    return this.toDomain(doc);
  }

  async update(
    id: string,
    data: Partial<Omit<BaseUser, 'id'>>
  ): Promise<BaseUser | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await UserModel
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean<UserLean>()
      .exec();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) return;
    await UserModel.findByIdAndDelete(id).exec();
  }

  private toDomain(doc: UserLean): BaseUser {
    return {
      id:       doc._id.toHexString(),
      email:    doc.email,
      password: doc.password,
      userType: doc.userType as UserType,
    };
  }
}
