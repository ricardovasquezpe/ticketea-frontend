import { describe, expect, it } from "vitest";
import { getEventByText } from "../services/event.service";

describe("EventService Class - getEventByText Method", (): void => {
    it("should return the list of events", ()=>{
        expect(getEventByText("libido")).toHaveLength(1);
    })
});