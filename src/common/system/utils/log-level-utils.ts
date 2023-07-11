import { LogLevelEnum } from '../enums/log-level.enum';

/**
 * UTILS
 * Encapsula metodos uteis para lidar com NIVEIS DE LOG na api do sistema
 *
 * @author Germano Junior
 */
export class LogLevelUtils {
  private constructor() {
    /** Construtor privado impede instanciacao. */
  }

  /**
   * Retorna string com o nome de um 'nivel de log' a partir de seu respectivo codigo.
   *
   * @param {LogLevelEnum} logLevel Codigo do nivel de log.
   * @return {string}
   */
  public static getLogLevelString(logLevel: LogLevelEnum): string {
    switch (logLevel) {
      case LogLevelEnum.CRITICAL:
        return 'CRITICAL';

      case LogLevelEnum.ERROR:
        return 'ERROR';

      case LogLevelEnum.WARNING:
        return 'WARNING';

      case LogLevelEnum.INFO:
        return 'INFO';

      case LogLevelEnum.DEBUG:
        return 'DEBUG';

      default:
        return 'DEBUG';
    }
  }
}
