import { describe, expect, it } from "vitest";
import Utils from "../utils/utils";

describe("Class Utils - CurrencyFormat Method", (): void => {
    it("should return the number correctly", ()=>{
        var number = 12;
        expect(Utils.currencyFormat(number)).toBe(number + ".00");
    })
});