import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1666375829192 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE onfly.user (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                cpf VARCHAR(11) NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                salt VARCHAR(255) NOT NULL,
                is_active BOOLEAN DEFAULT false,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL,
                PRIMARY KEY (id),
                UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
                UNIQUE INDEX cpf_UNIQUE (cpf ASC) VISIBLE,
                UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE onfly.user;`);
  }
}
