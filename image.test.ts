import { format } from "./image";

test("formats full URL", () => {
    const testURL =
        "http://media.guim.co.uk/67222cbde87dc147dd34041c2e8692b81f24f546/0_0_1204_1181/500.jpg";
    const salt = "foo";
    const profile = {
        width: 600,
        quality: 45,
        sharpen: "a0.8,r1,t1",
        dpr: 2
    };
    const got = format(testURL, salt, profile);
    const want =
        "https://i.guim.co.uk/img/media/67222cbde87dc147dd34041c2e8692b81f24f546/0_0_1204_1181/500.jpg?width=600&quality=45&sharpen=a0.8,r1,t1&dpr=2&s=def8618d4d850a3a270498da0bf92955";

    expect(got).toEqual(want);
});
