import { email } from "@/validators";

const expectAllToBeInvalid = (...args) => {
  return args.every((arg) => {
    const validation = email(arg);

    expect(validation).toBeFalsy();
  });
};
const oneForEachUsername = (...usernames) => usernames.map((username) => `${username}@mail.com`);

describe("Email Validator", () => {
  it("Should allow one character before and after @", () => {
    expect(email("a@a")).toBeTruthy();
  });

  it("Should allow digit characters", () => {
    expect(email("1@2")).toBeTruthy();
  });

  it("Should allow dashes and underscores", () => {
    expect(email("a-b@c_d")).toBeTruthy();
  });

  it("Should disallow empty emails", () => {
    expect(email("")).toBeFalsy();
  });

  it("Should disallow double @", () => {
    expect(email("test@@email")).toBeFalsy();
  });

  it("Should disallow special characters (not exhaustive)", () => {
    expectAllToBeInvalid(
      ...oneForEachUsername("!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", ",", "/", "?", "~")
    );
  });

  it("Should disallow single dots", () => {
    expect(email(".@mail")).toBeFalsy();
    expect(email("mail@.")).toBeFalsy();
  });

  it("Should disallow initial and final dots", () => {
    expect(email(".a@mail")).toBeFalsy();
    expect(email("mail@a.")).toBeFalsy();
  });

  it("Should disallow initial and final dashes", () => {
    expect(email("-a@mail")).toBeFalsy();
    expect(email("mail@a-")).toBeFalsy();
  });
});
