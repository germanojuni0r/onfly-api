import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExpenseEntity } from '../../models/Expense.entity';
import { CreateExpenseRequestDTO } from '../../dtos/request/create-expense.request.dto';
import { UpdateExpenseRequestDTO } from '../../dtos/request/update-expense.request.dto';

/**
 * DAO (Data Access Object) das despesas. Acesso ao banco.
 * @author Germano Junior
 */

@Injectable()
export class ExpenseDAO {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly _expenseRepository: Repository<ExpenseEntity>,
  ) {}

  async findExpenses(userId: number): Promise<ExpenseEntity[]> {
    return await this._expenseRepository.find({ where: { userId } });
  }

  async createExpense(
    userId: number,
    dto: CreateExpenseRequestDTO,
  ): Promise<ExpenseEntity> {
    return this._expenseRepository.save({
      description: dto.description,
      value: dto.value,
      date: dto.date,
      userId,
    });
  }

  async editExpense(
    userId: number,
    id: number,
    dto: UpdateExpenseRequestDTO,
  ): Promise<ExpenseEntity> {
    await this._expenseRepository.update(
      { id, userId },
      { ...dto, date: new Date(dto.date) },
    );
    return await this._expenseRepository.findOneBy({ id });
  }

  async deleteExpense(userId: number, id: number): Promise<void> {
    await this._expenseRepository.softDelete({ id, userId });
  }
}
