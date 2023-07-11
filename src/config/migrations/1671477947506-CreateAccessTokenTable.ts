import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccessTokenTable1671477947506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
            CREATE TABLE onfly.accesstoken (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                token VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL,
                PRIMARY KEY (id),
                UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE onfly.accesstoken;`);
  }
}
