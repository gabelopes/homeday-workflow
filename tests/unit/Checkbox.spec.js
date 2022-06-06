import { mount } from "@vue/test-utils";
import Checkbox from "@/components/Checkbox.vue";

const mountCheckbox = (errorMessage, dirty, required) => {
  return mount(Checkbox, {
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

describe("Checkbox.vue", () => {
  it("Should not show error message when not dirty", () => {
    const wrapper = mountCheckbox("Error message");
    const errorMessage = wrapper.find("[data-test='error-message']");

    expect(errorMessage.exists()).toBeFalsy();
  });

  it("Should not show error message when dirty, but no error message is passed", () => {
    const wrapper = mountCheckbox(null, true);
    const errorMessage = wrapper.find("[data-test='error-message']");

    expect(errorMessage.exists()).toBeFalsy();
  });

  it("Should show error message when dirty and error message is passed", () => {
    const wrapper = mountCheckbox("Error message", true);
    const errorMessage = wrapper.find("[data-test='error-message']");

    expect(errorMessage.exists()).toBeTruthy();
    expect(errorMessage.text()).toEqual("Error message");
  });

  it("Should show required asterisk when required", () => {
    const wrapper = mountCheckbox(null, false, true);
    const requiredAsterisk = wrapper.find("[data-test='required-asterisk']");

    expect(requiredAsterisk.exists()).toBeTruthy();
  });

  it("Should hide required asterisk when required", () => {
    const wrapper = mountCheckbox(null);
    const requiredAsterisk = wrapper.find("[data-test='required-asterisk']");

    expect(requiredAsterisk.exists()).toBeFalsy();
  });
});
