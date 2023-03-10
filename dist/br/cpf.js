"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpf = void 0;
const BaseDocuments_1 = require("../BaseDocuments");
/**
 *
 */
class Cpf extends BaseDocuments_1.BaseDocuments {
    /**
     * CPF constructor
     */
    constructor() {
        super();
        /**
         *
         */
        this.cpfRegex = "(?!(\\d)\\1{10})\\d{11}";
    }
    /**
     * Cpf validate
     *
     * @returns
     */
    validate(cpf) {
        if (super.isNull(cpf)) {
            return false;
        }
        const cpfReadonly = "" + (cpf === null || cpf === void 0 ? void 0 : cpf.padStart(11, "0"));
        if (cpf === null || cpf === void 0 ? void 0 : cpf.padStart(11, "0").match(this.cpfRegex)) {
            return false;
        }
        let dig10, dig11 = "";
        let sm, i, r, num, verify = 0;
        sm = 0;
        verify = 10;
        for (let i = 0; i < 9; i++) {
            num = Number(cpfReadonly.charAt(i)) - 48;
            sm = sm + (num * verify);
            verify = verify - 1;
        }
        r = 11 - (sm % 11);
        if ((r == 10) || (r == 11)) {
            dig10 = '0';
        }
        else {
            dig10 = String(r + 48);
        }
        sm = 0;
        verify = 11;
        for (i = 0; i < 10; i++) {
            num = Number(cpfReadonly.charAt(i)) - 48;
            sm = sm + (num * verify);
            verify = verify - 1;
        }
        r = 11 - (sm % 11);
        if ((r == 10) || (r == 11)) {
            dig11 = '0';
        }
        else {
            dig11 = String(r + 48);
        }
        if ((dig10 == cpfReadonly.charAt(9))
            && (dig11 == cpfReadonly.charAt(10))) {
            return true;
        }
        return false;
    }
}
exports.Cpf = Cpf;
