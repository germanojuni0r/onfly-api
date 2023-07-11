/**
 * Classe que define as variaveis do sistema.
 *
 * @author Germano Junior
 */

export class SystemProperties {
  private static readonly TOKEN_EXPIRATION_HOURS = 24;

  /** Retorna o ambiente atual. */
  static environment(): string | undefined {
    return process.env['NODE_ENV'];
  }

  /** Porta que está rodando a aplicação. */
  static port(): number | undefined {
    const port = process.env['PORT'];
    return !!port ? +port : undefined;
  }

  static dbHost(): string | undefined {
    return process.env['DB_HOST'];
  }

  static dbUser(): string | undefined {
    return process.env['DB_USER'];
  }

  static dbPassword(): string | undefined {
    return process.env['DB_PASS'];
  }

  static dbName(): string | undefined {
    return process.env['DB_NAME'];
  }

  static dbPort(): number | undefined {
    const dbPort = process.env['DB_PORT'];
    return !!dbPort ? +dbPort : undefined;
  }

  static authSecretKey(): string | undefined {
    return process.env['AUTH_SECRET_KEY'];
  }

  static getTokenExpirationHours(): number {
    return SystemProperties.TOKEN_EXPIRATION_HOURS;
  }
}
