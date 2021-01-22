import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Drink from './Drinks';
import User from './User';
import { BookmarkDrinks } from '../definitions';

@Entity()
export default class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  drinkId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.bookmark, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  @ManyToOne(() => Drink, (drink) => drink.bookmark, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'drinkId' })
  public drink: Drink;

  static async bookMarkList(userId: number): Promise<BookmarkDrinks[]> {
    return await this.createQueryBuilder('bookmark')
      .select([
        'bookmark.id',
        'drink.id',
        'drink.drinkName',
        'drink.drinkImage',
      ])
      .leftJoin('bookmark.drink', 'drink')
      .where('bookmark.userId = :userId', { userId })
      .getMany();
  }
}
