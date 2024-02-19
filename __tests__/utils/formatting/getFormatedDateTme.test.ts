import { getFormatedDateTime } from "@/utils/formatting/getFormatedDateTime";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("utils", () => {
  describe("formatting", () => {
    describe("getFormatedDateTime", () => {
      let languageGetter: any;
      beforeEach(() => {
        languageGetter = vi.spyOn(window.navigator, "language", "get");
      });

      it("should format the date according to navigator locale (fr)", () => {
        languageGetter.mockReturnValue("fr");
        const stringDate = "2021-01-01T00:00:00.000Z";
        const result = getFormatedDateTime(stringDate);

        expect(result).toBe("1 janv. 2021, 01:00");
      });

      it("should format the date according to navigator locale (en)", () => {
        languageGetter.mockReturnValue("en");
        const stringDate = "2021-01-01T00:00:00.000Z";
        const result = getFormatedDateTime(stringDate);

        expect(result).toBe("Jan 1, 2021, 1:00 AM");
      });

      it("should format the date according to navigator locale (es)", () => {
        languageGetter.mockReturnValue("es");
        const stringDate = "2021-01-01T00:00:00.000Z";
        const result = getFormatedDateTime(stringDate);

        expect(result).toBe("1 ene 2021, 1:00");
      });
    });
  });
});
