import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import Review from './Review';
import Bookmark from './Bookmark';
@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column({ default: 'localUser' })
  socialId: string;

  @Column({ default: 'socialPassword' })
  password: string;

  @Column({ default: 'noPath' })
  userImage: string;

  @Column({ default: 'local' })
  provider: string;

  @Column({ default: 0 })
  admin: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => Review, (review) => review.user)
  review: Review[];

  @OneToMany((type) => Bookmark, (bookmark) => bookmark.user)
  bookmark: Bookmark[];

  static async localRegister(
    email: string,
    password: string,
    userName: string
  ): Promise<User | undefined> {
    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email,
            password,
            userName,
          },
        ])
        .execute()
    ).identifiers[0];
    return this.findOne({ id });
  }

  static async socialRegister(
    email: string,
    socialId: string,
    userName: string,
    userImage: string,
    provider: string
  ): Promise<User | undefined> {
    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email,
            socialId,
            userName,
            userImage,
            provider,
          },
        ])
        .execute()
    ).identifiers[0];
    return this.findOne({ id });
  }

  static async modifyPassword(id: number, password: string): Promise<void> {
    await this.createQueryBuilder()
      .update(User)
      .set({
        password,
      })
      .where('id= :id', { id })
      .execute();
  }

  static async modifyUser(
    id: number,
    userName: string,
    userImage: string
  ): Promise<User> {
    await this.createQueryBuilder()
      .update(User)
      .set({
        userName,
        userImage,
      })
      .where('id= :id', { id })
      .execute();
    return this.findOne({ id });
  }

  static async bookMarkList(id: number): Promise<User> {
    const drinks = await this.createQueryBuilder('user')
      .select(['user.id', 'drinks.id', 'drinks.drinkName', 'drinks.drinkImage'])
      .leftJoin('user.drinks', 'drinks')
      .where('user.id = :id', { id })
      .getOne();
    return drinks;
  }
}
