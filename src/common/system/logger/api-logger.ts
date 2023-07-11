import { ILogger } from './i-logger';
import { LogLevelEnum } from '../enums/log-level.enum';
import { LogLevelUtils } from '../utils/log-level-utils';

/**
 * LOGGER
 * Implementa logger customizado da api do sistema
 *
 * @author Germano Junior
 */

export class ApiLogger implements ILogger {
  public static muteLogger = false;

  /** @var {LogLevelEnum} Nivel de log a ser utilizado. */
  private static logLevel: LogLevelEnum = LogLevelEnum.DEBUG;
  // private static config: LoggerConfig

  public static setLogLevel(level: LogLevelEnum) {
    this.logLevel = level || this.logLevel;
  }

  // public static setLoggerConfig(logConfig: LoggerConfig) {
  //     this.config = logConfig
  // }

  /**
   * @inheritDoc
   */
  public critical(jsonPayload: Object | null, ...args: any[]): void {
    this.executeLog(LogLevelEnum.CRITICAL, args, jsonPayload);
  }

  /**
   * @inheritDoc
   */
  public error(
    jsonPayload: Object | null,
    ...args: Array<any | string>
  ): void | any {
    this.executeLog(LogLevelEnum.ERROR, args, jsonPayload);
  }

  /**
   * @inheritDoc
   */
  public warn(
    jsonPayload: Object | null,
    ...args: Array<any | string>
  ): void | any {
    this.executeLog(LogLevelEnum.WARNING, args, jsonPayload);
  }

  /**
   * @inheritDoc
   */
  public info(jsonPayload: Object | null, ...args: any[]): void {
    this.executeLog(LogLevelEnum.INFO, args, jsonPayload);
  }

  /**
   * Alias para info.
   *
   * @param {string} message
   * @return {undefined}
   */
  public log(message: string): any {
    this.info(null, message);
  }

  /**
   * @inheritDoc
   */
  public debug(...args: any[]): void {
    this.executeLog(LogLevelEnum.DEBUG, args, null);
  }

  /**
   * Unifica chamadas para geracao de logs de qualquer nivel.
   *
   * @param {LogLevelEnum} logLevel
   * @param {any[]} args
   * @return {undefined}
   */
  private async executeLog(
    logLevel: LogLevelEnum,
    args: any,
    jsonPayload: any | null,
  ) {
    // Verifica se log deve ser escrito
    if (logLevel > ApiLogger.logLevel || ApiLogger.muteLogger) {
      return;
    }

    // const logging = new Logging({
    //   projectId: SystemProperties.googleCloudPlatformProjectId(),
    // });

    // const logName = SystemProperties.googleCloudPlatformLogName();

    // if (!logName) console.error(`Log com o nome ${logName} não encontrado`);
    // else {
    const logLevelString = LogLevelUtils.getLogLevelString(logLevel);
    //   const log = logging.log(logName);

    //   const metadata: LogEntry = {
    //     resource: { type: 'global' },
    //     severity: logLevelString,
    //   };

    //   let entry = log.entry(metadata, ...args);
    //   await log.write(entry);

    //   if (jsonPayload && jsonPayload !== null) {
    //     entry = log.entry(metadata, { ...jsonPayload });
    //     await log.write(entry);
    //   }

    // Escreve log no console
    switch (logLevel) {
      case LogLevelEnum.CRITICAL:
      case LogLevelEnum.ERROR:
        console.error(`[${logLevelString}]`, ...args);
        break;

      case LogLevelEnum.WARNING:
        console.warn(`[${logLevelString}]`, ...args);
        break;

      case LogLevelEnum.INFO:
        console.info(`[${logLevelString}]`, ...args);
        break;

      case LogLevelEnum.DEBUG:
        console.debug(`[${logLevelString}]`, ...args);
        break;
      default:
        break;
    }
  }
}
