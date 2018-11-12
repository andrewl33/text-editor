import modDate from "./modDate";

const RESULT = "1-1-2001";

const DATE_ARRAY = ["2001-01-01T03:24:00", "January 1, 2001 03:24:00"];

describe("modDate", () => {
  it("correctly processes date strings", () => {
    DATE_ARRAY.forEach(inDate => {
      expect(modDate(inDate)).toEqual(RESULT);
    });
  });
});
