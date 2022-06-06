import { mount } from "@vue/test-utils";
import InputBox from "@/components/InputBox.vue";

const mountInputBox = (errorMessage, dirty, required) => {
  return mount(InputBox, {
    props: {
      id: "test",
      label: "test",
      errorMessage,
      required
    },
    data() {
      return {
        dirty
      };
    }
  });
};

describe("InputBox.vue", () => {
  it("Should not show error message when not dirty", () => {
    const wrapper = mountInputBox("Error message");
    const errorMessage = wrapper.find("[data-test='error-message']");

    expect(errorMessage.exists()).toBeFalsy();
  });

  it("Should not show error message when dirty, but no error message is passed", () => {
    const wrapper = mountInputBox(null, true);
    const errorMessage = wrapper.find("[data-test='error-message']");

    expect(errorMessage.exists()).toBeFalsy();
  });

  it("Should show error message when dirty and error message is passed", () => {
    const wrapper = mountInputBox("Error message", true);
    const errorMessage = wrapper.find("[data-test='error-message']");

    expect(errorMessage.exists()).toBeTruthy();
    expect(errorMessage.text()).toEqual("Error message");
  });

  it("Should show required asterisk when required", () => {
    const wrapper = mountInputBox(null, false, true);
    const requiredAsterisk = wrapper.find("[data-test='required-asterisk']");

    expect(requiredAsterisk.exists()).toBeTruthy();
  });

  it("Should hide required asterisk when required", () => {
    const wrapper = mountInputBox(null);
    const requiredAsterisk = wrapper.find("[data-test='required-asterisk']");

    expect(requiredAsterisk.exists()).toBeFalsy();
  });
});
