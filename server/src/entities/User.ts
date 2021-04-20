import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Answer } from "./Answer";
import { IsEmail } from "class-validator";
import { Question } from "./Question";

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstname!: string;

  @Field()
  @Column()
  lastname!: string;

  @Field()
  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  password!: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @Field(() => [Answer])
  @OneToMany((type) => Answer, (answer) => answer.user, {
    nullable: true,
    cascade: true,
    eager: true
  })
  answers: Answer[];

  @Field(() => [Question])
  @OneToMany((type) => Question, (question) => question.user, {
    nullable: true,
    cascade: true,
    eager: true
  })
  questions: Question[];
}
