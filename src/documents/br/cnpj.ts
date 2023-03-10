import { BaseDocuments } from "../BaseDocuments";

/**
 * 
 */
export class Cnpj extends BaseDocuments {
  /**
   * 
   */
  readonly cnpjRegex: string = "(?!(\\d)\\1{14})\\d{14}";

  /**
   * CNPJ constructor
   */
  constructor() {
    super();
  }

  /**
   * Cpf validate
   * 
   * @returns 
   */
  public validate(cnpj: string | null) : boolean {
    if (super.isNull(cnpj)){
      return false;
    } 

    const cnpjReadonly: string = "" + cnpj?.padStart(11, "0");
    if (cnpj?.padStart(11, "0").match(this.cnpjRegex)) {
      return false;
    }

    let dig13, dig14: string = "";
    let sm, i, r, num, verify: number = 0;
    sm = 0;
    verify = 2;
        
    for (i=11; i>=0; i--) {
      num = Number(cnpjReadonly.charAt(i)) - 48;
      sm = sm + (num * verify);
      verify = verify + 1;
      
      if (verify == 10) {
        verify = 2;
      }
    }

    r = sm % 11;
    
    if ((r == 0) || (r == 1)) {
      dig13 = '0'; 
    } else {
      dig13 = String((11-r) + 48);
    }
      
    sm = 0;
    verify = 2;
    
    for (i=12; i>=0; i--) {
      num = Number(cnpjReadonly.charAt(i)) - 48;
      sm = sm + (num * verify);
      verify = verify + 1;
      
      if (verify == 10) {
        verify = 2;
      }
    }

    r = sm % 11;
    
    if ((r == 0) || (r == 1)) {
      dig14 = '0';
    } else {
      dig14 = String((11-r) + 48);
    }

    if ((dig13 == cnpjReadonly.charAt(12)) 
        && (dig14 == cnpjReadonly.charAt(13))) {
      return true;
    } 
      
    return false;
  }
}