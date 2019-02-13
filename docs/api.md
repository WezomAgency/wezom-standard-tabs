# API

:arrow_left: [Wezom Standard Tabs](../README.md)

#### *Sections*

- [Methods](#helpers)
    - [init()](#init)
    - [setActive()](#setactive)

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
