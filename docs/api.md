# API

:arrow_left: [Wezom Standard Tabs](../README.md)

#### *Sections*

- [Methods](#methods)
    - [init()](#init)
    - [setActive()](#setactive)
    - [dropDependencies()](#dropdependencies)
    - [updateDependencies()](#updatedependencies)
- [Properties](#properties)
    - [cssClass](#cssclass)
        - [active](#active)
        - [disable](#disable)
    - [keys](#keys)
        - [ns](#ns)
        - [button](#button)
        - [block](#block)
    - [events](#events)
        - [on](#on)
        - [off](#off)
        - [again](#again)
    - [hooks](#hooks)
        - [beforeOn](#beforeon)
        - [beforeOff](#beforeoff)
        - [beforeAgain](#beforeagain)
        - [on](#on-1)
        - [off](#off-1)
        - [again](#again-1)
        - [update](#update)

---

## Methods

### init()

:arrow_left: [Wezom Standard Tabs](./index.md) | :arrow_up: [Top](#readme)

Initialize.  
Set dependencies and delegated handlers

```js
wsTabs.init([$context]): void
```

_Parameters:_

| Name | Type | Attributes | Default | Description |
| :--- | :--- | :--------- | :------ | :---------- |
| **$context**  | `jQuery` |  `$(document)` |     | Parent container where tabs are to be initialized |

_Returns:_ `undefined`

---

### setActive()

:arrow_left: [Wezom Standard Tabs](./index.md) | :arrow_up: [Top](#readme)

Forced activation of tabs if there are no active one.  
May helps if you do not have the opportunity to set the class of the desired tab. The method will detect all groups (at the time of the call) and activate the first tab in each group where there are no active elements.

Call this method after setup tabs dependencies ([init()](#init) method)


```js
wsTabs.setActive([$context]): void
```

_Parameters:_

| Name | Type | Attributes | Default | Description |
| :--- | :--- | :--------- | :------ | :---------- |
| **$context**  | `jQuery` |  `$(document)` |     | Parent container where needs to look up for tab groups |

_Returns:_ `undefined`

---

### dropDependencies()

:arrow_left: [Wezom Standard Tabs](./index.md) | :arrow_up: [Top](#readme)

Remove all dependencies

```js
wsTabs.dropDependencies([$context]): {$buttons: $jQuery, $blocks: $jQuery}
```

_Parameters:_

| Name | Type | Attributes | Default | Description |
| :--- | :--- | :--------- | :------ | :---------- |
| **$context**  | `jQuery` |  `$(document)` |     | Parent container where needs to look up for tab groups |

_Returns:_ `Object` with two properties `$buttons` and `$blocks` - jQuery elements, where tabs dependencies was removed

---

### updateDependencies()

:arrow_left: [Wezom Standard Tabs](./index.md) | :arrow_up: [Top](#readme)

Update all dependencies with pre-reset.  
Actual when dynamically adding new buttons and blocks to existing tab groups

```js
wsTabs.updateDependencies([$context]): void
```

_Parameters:_

| Name | Type | Attributes | Default | Description |
| :--- | :--- | :--------- | :------ | :---------- |
| **$context**  | `jQuery` |  `$(document)` |     | Parent container where needs to look up for tab groups |

_Returns:_ `undefined`

---


## Properties

### cssClass

#### active

#### disable

---

### keys

#### ns

#### button

#### block

---

### events

#### on

#### off

#### again

---

### hooks

#### beforeOn

#### beforeOff

#### beforeAgain

#### on

#### off

#### again

#### update

---
