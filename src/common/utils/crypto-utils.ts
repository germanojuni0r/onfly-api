/**
 * UTILS
 * Encapsula metodos para criptografar dados.
 *
 * @author Germano Junior
 */
export class CryptoUtils {
  private constructor() {
    /** Construtor privado impede instanciacao. */
  }

  /**
   * Criptografa string passada.
   *
   * @param data
   * @param salt
   * @return {string} hash do dado
   */
  public static encrypt(data: string, salt: string): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const md5 = require('md5');
    return md5(data + salt);
  }

  /**
   * Valida se o dado entrado condiz com o hash recebido
   * @param hash
   * @param data
   * @param salt
   * @return {boolean} TRUE caso seja igual, FALSE caso contrario
   */
  public static compareHash(hash: string, data: string, salt: string): boolean {
    return this.encrypt(data, salt) === hash;
  }

  /**
   * Cria um hash reversivel encriptado.
   * @param text
   * @return {string}
   */
  public static reversibleEncrypt(text: string): string {
    return Buffer.from(text).toString('base64');
  }

  /**
   * Descripta um hash reversivel
   * @param text
   * @return {string}
   */
  public static decrypt(text: string): string {
    return Buffer.from(text, 'base64').toString('utf8');
  }

  /** Gera & retorna string com salt de senha padrao NAO criptografado. */
  public static getDefaultDecryptedSalt(email: string): string {
    return `${new Date()}onfly${email}`;
  }
}
