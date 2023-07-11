import {
  Body,
  Controller,
  Delete,
  Get,
  OnApplicationBootstrap,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user';
import { IApiReturn } from 'src/common/system/enums/generics/interfaces/i-api-return';
import { UserEntity } from 'src/modules/user/src/models/user.entity';
import { CreateExpenseRequestDTO } from './dtos/request/create-expense.request.dto';
import { UpdateExpenseRequestDTO } from './dtos/request/update-expense.request.dto';
import { ExpenseResponseDTO } from './dtos/response/expense-response.dto';
import { ExpenseExceptionFilter } from './errors/expense-exception-filter';
import { ExpenseService } from './services/expense.service';

/**
 * Controller das despesas. Onde as requisições são tratadas.
 * @author Germano Junior
 */

@Controller('expenses')
@UseGuards(AuthGuard('jwt'))
@UseFilters(ExpenseExceptionFilter)
export class ExpenseController implements OnApplicationBootstrap {
  constructor(private readonly _expenseService: ExpenseService) {}

  onApplicationBootstrap() {
    console.log(`Expense module has been initialized.`);
  }

  @Get('/')
  async findExpenses(
    @User() user: UserEntity,
  ): Promise<IApiReturn<ExpenseResponseDTO[]>> {
    const data = await this._expenseService.findExpenses(user.id);
    return { data: data.map((i) => new ExpenseResponseDTO(i)) };
  }

  @Post('/')
  async createExpense(
    @User() user: UserEntity,
    @Body() dto: CreateExpenseRequestDTO,
  ): Promise<IApiReturn<ExpenseResponseDTO>> {
    const data = await this._expenseService.createExpense(user.id, dto);
    return { data: new ExpenseResponseDTO(data) };
  }

  @Put('/:id')
  async editExpense(
    @User() user: UserEntity,
    @Param('id') id: number,
    @Body() dto: UpdateExpenseRequestDTO,
  ): Promise<IApiReturn<ExpenseResponseDTO>> {
    const data = await this._expenseService.editExpense(user.id, id, dto);
    return { data: new ExpenseResponseDTO(data) };
  }

  @Delete('/:id')
  async deleteExpense(
    @User() user: UserEntity,
    @Param('id') id: number,
  ): Promise<void> {
    await this._expenseService.deleteExpense(user.id, id);
  }
}
