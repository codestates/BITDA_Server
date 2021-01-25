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
export default class Drink extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drinkName: string;

  @Column()
  type: string;

  @Column()
  price: string;

  @Column()
  taste: string;

  @Column()
  ingredient: string;

  @Column()
  alcohol: number;

  @Column()
  origin: string;

  @Column()
  url: string;

  @Column()
  desc: string;

  @Column()
  drinkImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany((type) => Review, (review) => review.drink)
  review: Review[];

  @OneToMany((type) => Bookmark, (bookmark) => bookmark.drink)
  bookmark: Bookmark[];

  static allDrinkList(skip: number) {
    return this.createQueryBuilder('drink').skip(skip).take(15).getMany();
  }

  static detailView(id) {
    return this.createQueryBuilder('drink')
      .where('drink.id = :id', { id })
      .getOne();
  }

  static addDrinkList(
    drinkName: string,
    type: string,
    price: string,
    taste: string,
    ingredients: string,
    alcohol: number,
    origin: string,
    url: string,
    desc: string,
    img: string
  ) {
    return this.createQueryBuilder()
      .insert()
      .into(Drink)
      .values([
        {
          drinkName: drinkName,
          type: type,
          price: price,
          taste: taste,
          ingredient: ingredients,
          alcohol: alcohol,
          origin: origin,
          url: url,
          desc: desc,
          drinkImage: img,
        },
      ])
      .execute();
  }
}
