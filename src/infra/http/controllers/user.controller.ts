import { SwaggerTags } from '@/enums';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete as DeleteMethod,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestBody,
  UserCreateBody,
  UserUpdateBody,
  UserDTO,
  UserListResponse,
  UserCreateResponse,
  UserResponse,
  UserFilterBody,
} from '../dtos';
import {
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetUser,
  ListUsers,
  GetUsersByMinAge,
} from '@application/use-cases/user';
import { Public } from '../decorators';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Public()
@Controller('users')
@ApiTags(SwaggerTags.USERS)
export class UserController {
  constructor(
    private createUser: CreateUser,
    private updateUser: UpdateUser,
    private deleteUser: DeleteUser,
    private getUser: GetUser,
    private getUsersByMinAge: GetUsersByMinAge,
    private listUsers: ListUsers,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: UserCreateResponse })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async create(@Body() body: UserCreateBody): Promise<UserCreateResponse> {
    const { user } = await this.createUser.execute({ body });
    return {
      message: 'User created successfully',
      user,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDTO })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async getById(@Param('id') id: number): Promise<UserDTO | null> {
    const { user } = await this.getUser.execute({ body: { userId: id } });
    return user;
  }

  @Put(':id')
  @ApiOkResponse({ type: UserDTO })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async update(
    @Param('id') id: number,
    @Body() body: UserUpdateBody,
  ): Promise<UserResponse> {
    await this.updateUser.execute({ userId: id, body });
    return {
      message: 'User updated successfully',
    };
  }

  @DeleteMethod(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<UserResponse> {
    await this.deleteUser.execute({ body: { userId: id } });
    return {
      message: 'User deleted successfully',
    };
  }

  @Get()
  @ApiOkResponse({ type: UserListResponse })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async list(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() filters: UserFilterBody,
  ): Promise<any> {
    const options: IPaginationOptions = { page, limit };
    return await this.listUsers.execute({ options, filters });
  }

  @Get('/min-age/:minAge')
  @ApiOkResponse({ type: UserListResponse })
  @ApiBadRequestResponse({ type: BadRequestBody })
  async getByMinAge(
    @Param('minAge') minAge: number,
  ): Promise<UserListResponse> {
    const { users } = await this.getUsersByMinAge.execute({
      body: { minAge },
    });
    return { users };
  }
}
