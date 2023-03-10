/**
 * 
 */
export abstract class BaseDocuments {
  /**
   * 
   * @param value 
   * @returns 
   */
  isNull(value: string | null) : boolean {
    return value === null;
  }
}