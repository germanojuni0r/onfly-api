import { LoggerService } from '@nestjs/common';

/**
 * INTERFACE
 * Define a interface de uma classe generica que implemente a funcao de logger.
 *
 * @author Germano Junior
 */

export interface ILogger extends LoggerService {
  /**
   * Gera registro de activity-activity-log do tipo: Debug:
   *
   * @return {void}
   */
  debug(...args: any[]): void;

  /**
   * Gera registro de activity-activity-log do tipo: Info (informacao):
   *
   * @return {void}
   */
  info(...args: any[]): void;

  /**
   * Gera um registro de activity-activity-log do tipo: Warning (alerta):
   *
   * @return {void}
   */
  warn(...args: any[]): void;

  /**
   * Gera um registro de activity-activity-log do tipo: Erro:
   *
   * @return {void}
   */
  error(...args: any[]): void;

  /**
   * Gera um registro de activity-activity-log do tipo: Critical:
   *
   * @return {void}
   */
  critical(...args: any[]): void;
}
