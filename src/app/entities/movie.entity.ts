import { ObjectType, Field, ID } from 'type-graphql'
import {
  Column,
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm'
import { Actor } from './actor.entity'
import { Category } from './category.entity'
import { getDateColumnType } from './helpers'

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @CreateDateColumn({ type: getDateColumnType() })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ type: getDateColumnType() })
  updatedAt: Date

  @Field({ nullable: true })
  @Column()
  title: string

  @Field(() => [Actor], { nullable: true })
  @ManyToMany(() => Actor, (actor) => actor.movies)
  @JoinTable()
  actors?: Actor[]

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, (category) => category.movies)
  @JoinTable()
  categories?: Category[]
}
