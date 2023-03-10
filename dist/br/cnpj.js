"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cnpj = void 0;
const BaseDocuments_1 = require("../BaseDocuments");
/**
 *
 */
class Cnpj extends BaseDocuments_1.BaseDocuments {
    /**
     * CNPJ constructor
     */
    constructor() {
        super();
        /**
         *
         */
        this.cnpjRegex = "(?!(\\d)\\1{14})\\d{14}";
    }
    /**
     * Cpf validate
     *
     * @returns
     */
    validate(cnpj) {
        if (super.isNull(cnpj)) {
            return false;
        }
        const cnpjReadonly = "" + (cnpj === null || cnpj === void 0 ? void 0 : cnpj.padStart(11, "0"));
        if (cnpj === null || cnpj === void 0 ? void 0 : cnpj.padStart(11, "0").match(this.cnpjRegex)) {
            return false;
        }
        let dig13, dig14 = "";
        let sm, i, r, num, verify = 0;
        sm = 0;
        verify = 2;
        for (i = 11; i >= 0; i--) {
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
        }
        else {
            dig13 = String((11 - r) + 48);
        }
        sm = 0;
        verify = 2;
        for (i = 12; i >= 0; i--) {
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
        }
        else {
            dig14 = String((11 - r) + 48);
        }
        if ((dig13 == cnpjReadonly.charAt(12))
            && (dig14 == cnpjReadonly.charAt(13))) {
            return true;
        }
        return false;
    }
}
exports.Cnpj = Cnpj;
