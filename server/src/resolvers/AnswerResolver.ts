import { User } from "./../entities/User";
import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Answer } from "../entities/Answer";

@InputType()
class AnswerInput {
  @Field(() => Int)
  questionId!: number;

  @Field()
  content!: string;
}

@InputType()
class AnswerUpdateInput {
  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Int, { nullable: true })
  upvotes?: number;

  @Field(() => Int, { nullable: true })
  downvotes?: number;
}

@Resolver()
export class AnswerResolver {
  @Mutation(() => Boolean)
  async createAnswer(
    @Arg("userId", () => Int) userId: number,
    @Arg("options", () => AnswerInput) options: AnswerInput
  ) {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("No such user exists");
    }

    const enhancedOptions = {
      ...options,
      userId
    };

    try {
      const ans = await Answer.create(enhancedOptions).save();
      console.log(ans);
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async updateAnswer(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => AnswerUpdateInput) input: AnswerUpdateInput
  ) {
    const answer = await Answer.findOne({ where: { id } });

    if (!answer) {
      throw new Error("No such question exists");
    }

    await Answer.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteAnswer(@Arg("id", () => Int) id: number) {
    await Answer.delete({ id });
    return true;
  }

  @Query(() => [Answer])
  answers() {
    return Answer.find();
  }
}
