import * as _ from 'lodash';

import { Injectable } from '@nestjs/common';

import { ExpenseEntity } from '../models/Expense.entity';
import { ApiErrorCodeEnum } from 'src/common/system/enums/api-error-code.enum';
import { IError } from 'src/common/system/enums/generics/interfaces/i-error';
import { ExpenseDAO } from './daos/expense.dao';
import { CreateExpenseRequestDTO } from '../dtos/request/create-expense.request.dto';
import { UpdateExpenseRequestDTO } from '../dtos/request/update-expense.request.dto';

/**
 * Service das despesas. Onde as requisições são processadas.
 * @author Germano Junior
 */

@Injectable()
export class ExpenseService {
  constructor(private readonly _expenseDAO: ExpenseDAO) {}

  async findExpenses(userId: number): Promise<ExpenseEntity[]> {
    return await this._expenseDAO.findExpenses(userId);
  }

  async createExpense(
    userId: number,
    dto: CreateExpenseRequestDTO,
  ): Promise<ExpenseEntity> {
    await this._validateItems(dto);
    return await this._expenseDAO.createExpense(userId, dto);
  }

  async editExpense(
    userId: number,
    id: number,
    dto: UpdateExpenseRequestDTO,
  ): Promise<ExpenseEntity> {
    await this._validateItems(dto);
    return await this._expenseDAO.editExpense(userId, id, dto);
  }

  async deleteExpense(userId: number, id: number): Promise<void> {
    await this._expenseDAO.deleteExpense(userId, id);
  }

  private async _validateItems(
    dto: CreateExpenseRequestDTO | UpdateExpenseRequestDTO,
  ) {
    if (!!dto.date && new Date(dto.date).getTime() > new Date().getTime()) {
      throw { code: ApiErrorCodeEnum.INVALID_DATE } as IError;
    }

    if (!!dto.description && dto.description.length > 191) {
      throw { code: ApiErrorCodeEnum.DESCRIPTION_IS_BIGGER_THAN_MAX } as IError;
    }

    if (!_.isUndefined(dto.value) && dto.value <= 0) {
      throw { code: ApiErrorCodeEnum.INVALID_VALUE } as IError;
    }
  }
}
