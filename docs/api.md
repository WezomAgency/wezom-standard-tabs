# API

:arrow_left: [Wezom Standard Tabs](../README.md)

#### *Table of contents*

- [Methods](#methods)
    - [init()](#init)
    - [setActive()](#setactive)
    - [dropDependencies()](#dropdependencies)
    - [updateDependencies()](#updatedependencies)
- [Properties](#properties)
    - [cssClass](#cssclass)
        - [active](#cssclassactive)
        - [disable](#cssclassdisable)
    - [keys](#keys)
        - [ns](#keysns)
        - [button](#keysbutton)
        - [block](#keysblock)
    - [events](#events)
        - [on](#eventson)
        - [off](#eventsoff)
        - [again](#eventsagain)
    - [hooks](#hooks)
        - [beforeOn](#hooksbeforeon)
        - [beforeOff](#hooksbeforeoff)
        - [beforeAgain](#hooksbeforeagain)
        - [on](#hookson)
        - [off](#hooksoff)
        - [again](#hooksagain)
        - [update](#hooksupdate)

---

## Methods

### init()

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

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

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

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

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

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

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

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

type `Object`

Contains properties with used CSS classes.

#### cssClass.active

type `sting`  
default `"is-active"`

CSS class for active tab elements (buttons and block).  

You can change this property value  to your discretion or needs.  
_We recommend to do that before calling [`init()` method](#init)_

```js
import wsTabs from 'wezom-standard-tabs';
wsTabs.cssClass.active = 'is-current'; // example
wsTabs.init();
```

If you change this property after initialization - call [`updateDependencies()`](#updatedependencies) and [`setActive()`](#setactive) methods;

```js
// ... initialized
wsTabs.cssClass.active = 'new-active-class';
wsTabs.updateDependencies();
wsTabs.setActive();
```


---

#### cssClass.disable

type `sting`  
default `"is-disabled"`

CSS class for disabled tab buttons. This elements are ignored on trying to activate them.

Checking for ignore is executed at the moment of on activation try.

You can change this property value  to your discretion or needs.  
_You can change this property at any time, without calling extra methods to update plugin_

```js
wsTabs.cssClass.disabled = 'ignore-this'; // example
```

> _**Note!** If button has attribute `disabled` - button will be ignored_  
> _no matter which class is present there_ 

If you change this property after initialization - call [`updateDependencies()`](#updatedependencies) and [`setActive()`](#setactive) methods;


```html
<button data-wstabs-ns="group-a" data-wstabs-button="1" class="my-button is-active">First button</button>
<button disabled data-wstabs-ns="group-a" data-wstabs-button="2" class="my-button">Blocked button</button>
<button data-wstabs-ns="group-a" data-wstabs-button="3" class="my-button">Third button</button>
```
```

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

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)