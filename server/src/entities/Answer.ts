import { Question } from "./Question";
import { User } from "./User";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity("answer")
export class Answer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.answers, {
    nullable: true
  })
  user: User;

  @ManyToOne((type) => Question, (question) => question.answers)
  question: Question;

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field(() => Int)
  @Column()
  questionId!: number;

  @Field()
  @Column()
  content!: string;

  @Field(() => Int)
  @Column("int", { default: 1, nullable: true })
  upvotes: number;

  @Field(() => Int)
  @Column("int", { default: 0, nullable: true })
  downvotes: number;
}
