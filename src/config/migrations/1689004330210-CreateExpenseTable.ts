import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpenseTable1689004330210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE onfly.expense (
                id INT NOT NULL AUTO_INCREMENT,
                description VARCHAR(191) NOT NULL,
                date TIMESTAMP NOT NULL,
                user_id INT NOT NULL,
                value DOUBLE NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL,
                PRIMARY KEY (id),
                UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE onfly.expense;`);
  }
}
