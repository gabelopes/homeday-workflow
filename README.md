# Homeday Workflow Assignment

Workflow-like wizard that takes the user through steps to collect their name, GitHub user, email and a "licence agreement", to later on show the consolidated data, along with GitHub user's avatar fetched from GitHub's User API.

## Overall Description

The whole idea was to create a generic Wizard component, that would allow the configuration of as many steps as needed. The Wizard allows to externally control steps, offering the possibility to validate each step also externally. This way, the wizard can be used in any situation and controlled in a very customizable way. The rest of the assignment was built on top of the Wizard component.

### Wizard Steps Interface

The wizard receives a `steps` property that configure its whole behavior. `steps` is an array of step objects, each of which has the following attributes:

| Attribute Name  | Attribute Type                                               | Description                                                  |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `code`          | String                                                       | Attribute used to identify each step (thus it must be unique), also used when routing to a given step |
| `mainComponent` | Vue Component                                                | Component displayed in the main portion of the wizard, it is also the component that receives the validation results returned from the validator. To understand what is the main portion head to [Wizard Split Layout](#wizard-split-layout). |
| `sideComponent` | Vue Component                                                | Makes the Wizard be displayed as a Split Layout, also showing the Steps Indicator, shows `sideComponent` in the (left) side portion of the split layout, whereas `mainComponent` shows in the main portion. |
| `validator`     | Function in the following format:<br />`() => ValidationResult[]` | A validator function used to validate the current step. Receives no parameter and returns an array of validation results that is passed to the current step's main component for optional rendering and further UI changes. A validation result is any object decided by the developer. It should fit whatever is the best interface decided by the developer to be used inside `mainComponent`. A step is deemed as **valid**, if the returned array is empty! |

### Wizard Split Layout

Whenever a `sideComponent` is passed to a step, the Wizard will change it's layout to a Split Layout. Essentially, instead of showing only one main stage, it will show two. One smaller to the left (the side one), and one bigger to the right (the main one). It will also add the steps indicator as part of the UI.

On the smaller left stage, it will render the `sideComponent`, on the bigger right stage it will render the `mainComponent`.

When no `sideComponent` is present it will render only the main stage without the steps indicator.

### Wizard Step Management & Validation

As mentioned, the Wizard allows steps to be controlled externally, offering external validation. As seen on the attributes table above, each step can provide a `validator`, which will tell the Wizard whether a step is valid or not. In turn, Wizard will receive the code of the current step via props. The Wizard will then validate the matching step and emit one event if the step is valid and another event if the step is invalid. This allows for the interested party (component listening to those events) to take an action (if wanted) in case something goes right or wrong.

There are two events emitted, each will send different arguments, as seen in the table below:

| Event Name      | Argument                                           | Description                                                  |
| --------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| `commit:step`   | Step object matching the code passed to the wizard | This event means that the passed step code points to a valid step, so the Wizard is telling the interested party that that step is okay to be kept as-is, meaning all prior steps are also valid. |
| `rollback:step` | Step object matching the first invalid step found  | This event means that the there is at least one step that is not valid prior to the step passed to the Wizard. The argument tells the interested party which step the Wizard should be at, so to say, it should rollback to that step. |

It is up to the interested party  to act upon the events. For example, if a `rollback` is emitted, it does not meant that the Wizard will automatically switch to the step it should be rolled back to, instead the interested party should set it in the Wizard.

### Router paths

To access a given step at any time, just navigate to `/<step-code>`, and the wizard will take you there. However, if any steps before it is invalid, then the wizard will only take you up to that step.

## Project Setup

Project setup is as usual for a Vue project, `npm i` then `npm run serve` and the project is up and running. As usual:
  * Build to production: `npm run build`
  * Run test suite: `npm run test:unit`
  * Linting files: `npm run lint`
