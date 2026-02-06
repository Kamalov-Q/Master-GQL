import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/profile.entity';
import { Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  private readonly logger = new Logger();

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int, nullable: false }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField(() => Profile)
  async getProfile(@Parent() user: User) {
    this.logger.debug(`Fetching profile for user ${user?.id}`);
    return (await user.profile);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.delete(id);
  }

}
