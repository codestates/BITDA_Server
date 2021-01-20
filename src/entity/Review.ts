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

@Entity()
export default class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  rating: number;

  @Column()
  public userId: number;

  @Column()
  public drinkId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Drink, (drink) => drink.review, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'drinkId' })
  public drink: Drink;

  @ManyToOne(() => User, (user) => user.review, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn({ name: 'userId' })
  public user: User;

  static async addReview(
    userId: number,
    drinkId: number,
    text: string,
    rating: number
  ): Promise<Review> {
    const { id } = (
      await this.createQueryBuilder()
        .insert()
        .into(Review)
        .values([
          {
            userId,
            drinkId,
            text,
            rating,
          },
        ])
        .execute()
    ).identifiers[0];
    return this.findOne({ id });
  }

  static async reviewList(drinkId: number): Promise<object[]> {
    const reviews = await this.createQueryBuilder('review')
      .select([
        'user.id',
        'user.userName',
        'user.userImage',
        'review.id',
        'review.text',
        'review.rating',
      ])
      .leftJoin('review.user', 'user')
      .where('review.drinkId = :drinkId', { drinkId })
      .orderBy('review.createdAt', 'DESC')
      .getMany();

    return reviews;
  }

  static async deleteReview(id: number): Promise<void> {
    await this.createQueryBuilder()
      .softDelete()
      .from(Review)
      .where('id = :id', { id })
      .execute();
  }
}
