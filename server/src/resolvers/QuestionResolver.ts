import { User } from "../entities/User";
import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Question } from "../entities/Question";

@InputType()
class QuestionInput {
  @Field()
  text: string;
}

@InputType()
class QuestionUpdateInput {
  @Field(() => String, { nullable: true })
  text?: string;

  @Field(() => Int, { nullable: true })
  upvotes?: number;

  @Field(() => Int, { nullable: true })
  downvotes?: number;
}

@Resolver()
export class QuestionResolver {
  @Mutation(() => Question)
  async createQuestion(
    @Arg("userId", () => Int) userId: number,
    @Arg("options", () => QuestionInput) options: QuestionInput
  ) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("No such user exists");
    }

    const enhancedOptions = {
      ...options,
      userId
    };

    const question = await Question.create(enhancedOptions).save();
    return question;
  }

  @Mutation(() => Boolean)
  async updateQuestion(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => QuestionUpdateInput) input: QuestionUpdateInput
  ) {
    await Question.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteQuestion(@Arg("id", () => Int) id: number) {
    await Question.delete({ id });
    return true;
  }

  @Query(() => [Question])
  questions() {
    return Question.find({});
  }
}
