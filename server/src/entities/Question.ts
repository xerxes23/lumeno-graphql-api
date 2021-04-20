import { User } from "./User";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Answer } from "./Answer";

@ObjectType()
@Entity("question")
export class Question extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.questions, { nullable: true })
  user: User;

  @Field(() => [Answer])
  @OneToMany((type) => Answer, (answer: Answer) => answer.question, {
    nullable: true,
    cascade: true,
    eager: true
  })
  answers: Answer[];

  @Field(() => Int)
  @Column()
  userId!: number;

  @Field()
  @Column()
  text!: string;

  @Field(() => Int)
  @Column("int", { default: 0, nullable: true })
  upvotes: number;

  @Field(() => Int)
  @Column("int", { default: 0, nullable: true })
  downvotes: number;
}
