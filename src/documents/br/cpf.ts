import { BaseDocuments } from "../BaseDocuments";

/**
 * 
 */
export class Cpf extends BaseDocuments {
  /**
   * 
   */
  readonly cpfRegex: string = "(?!(\\d)\\1{10})\\d{11}";

  /**
   * CPF constructor
   */
  constructor() {
    super();
  }

  /**
   * Cpf validate
   * 
   * @returns 
   */
  public validate(cpf: string | null) : boolean {
    if (super.isNull(cpf)){
      return false;
    } 
    
    const cpfReadonly: string = "" + cpf?.padStart(11, "0");
    if (cpf?.padStart(11, "0").match(this.cpfRegex)) {
      return false;
    }

    let dig10, dig11: string = "";
    let sm, i, r, num, verify: number = 0;
    sm = 0;
    verify = 10;
    
    for (let i: number = 0; i<9; i++) {
      num = Number(cpfReadonly.charAt(i)) - 48;
      sm = sm + (num * verify);
      verify = verify - 1;
    }
    
    r = 11 - (sm % 11);
    if ((r == 10) || (r == 11)) {
      dig10 = '0';
    } else {
      dig10 = String(r + 48);
    }

    sm = 0;
    verify = 11;
    
    for(i=0; i<10; i++) {
      num = Number(cpfReadonly.charAt(i)) - 48;
      sm = sm + (num * verify);
      verify = verify - 1;
    }

    r = 11 - (sm % 11);
    if ((r == 10) || (r == 11)) {
      dig11 = '0';
    }  else {
      dig11 = String(r + 48);
    }

    if ((dig10 == cpfReadonly.charAt(9)) 
        && (dig11 == cpfReadonly.charAt(10))) {
      return true;
    }

    return false;
  }
}