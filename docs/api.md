# API

:arrow_left: [Wezom Standard Tabs](../README.md)

#### *Table of contents*

- [Methods](#methods)
    - [init()](#init)
    - [setActive()](#setactive)
    - [dropDependencies()](#dropdependencies)
    - [updateDependencies()](#updatedependencies)
    - [ejectData()](#ejectdata)
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
| **$context**  | `jQuery` |  &lt;optional> | `$(document)` | Parent container where tabs are to be initialized |

_Returns:_ `undefined`

```js
import wsTabs from 'wezom-standard-tabs';
wsTabs.init();
```

---

### setActive()

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

Forced activation of tabs if there are no active one.  
May helps if you do not have the opportunity to set the class of the desired tab. The method will detect all groups (at the time of the call) and activate the first tab in each group where there are no active elements.


```js
wsTabs.setActive([$context]): void
```

_Parameters:_

| Name | Type | Attributes | Default | Description |
| :--- | :--- | :--------- | :------ | :---------- |
| **$context**  | `jQuery` | &lt;optional> | `$(document)` | Parent container where needs to look up for tab groups |

_Returns:_ `undefined`

Call this method after setup tabs dependencies ([`init()`](#init) or [`updateDependencies()`](#updatedependencies) methods)

```js
import wsTabs from 'wezom-standard-tabs';
wsTabs.init();
wsTabs.setActive();
```

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
| **$context**  | `jQuery` | &lt;optional> | `$(document)` | Parent container where needs to look up for tab groups |

_Returns:_ `Object` with two properties `$buttons` and `$blocks` - jQuery elements, where tabs dependencies was removed

```js
import wsTabs from 'wezom-standard-tabs';
wsTabs.init();
// ... some code
const elements = wsTabs.dropDependencies();
console.log(elements);
```

---

### updateDependencies()

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

Update all dependencies with pre-reset.  
Actual when dynamically adding new buttons and blocks to existring tab groups

```js
wsTabs.updateDependencies([$context]): void
```

_Parameters:_

| Name | Type | Attributes | Default | Description |
| :--- | :--- | :--------- | :------ | :---------- |
| **$context**  | `jQuery` | &lt;optional> | `$(document)` | Parent container where needs to look up for tab groups |

_Returns:_ `undefined`

```js
import wsTabs from 'wezom-standard-tabs';
wsTabs.init();
// ... some code
wsTabs.updateDependencies();
```

---

---

### ejectData()

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

Get all data from tabs button.

```js
wsTabs.ejectData($button, [$context]): Object
```

_Parameters:_

| Name | Type | Attributes | Default | Description |
| :--- | :--- | :--------- | :------ | :---------- |
| **$button**  | `jQuery` |    |   | Tabs button |
| **$context**  | `jQuery` | &lt;optional> | `$(document)` | Parent container where needs to look up for tab groups |

_Returns:_ `Object` see table below

| Name | Type | Description |
| :--- | :--- | :---------- |
| **myNs**  | `string` | Tabs _group_ namespace |
| **myNs**  | `string` | Button name in _group_ |
| **buttonsSelector**  | `string` | --- |
| **buttonSyncSelector**  | `string` | --- |
| **blocksSelector**  | `string` | --- |
| **blockSelector**  | `string` | --- |
| **$block**  | `jQuery` | Tabs block for current button |
| **$siblingBlocks**  | `jQuery` | Other blocks in group, except current block |
| **$siblingButtons**  | `jQuery` | Other buttons in group, except current button |
| **$syncButtons**  | `jQuery` | Synchronized buttons with current button |

```js
// ... initialized
const tabsButton = $('.my-button');
const tabsData = wsTabs.ejectData(tabsButton);
console.log(tabsData.$block);
```

---


## Properties

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

### cssClass

type `Object`

Contains properties with used CSS classes.


---

#### cssClass.active

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

type `string`  
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

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

type `string`  
default `"is-disabled"`

CSS class for disabled tab buttons. This elements are ignored on trying to activate them.  
Checking for ignore is executed at the moment of on activation try.

You can change this property value  to your discretion or needs.  
_You don't need to calling extra methods to update the plugin, after changing the value._

```js
wsTabs.cssClass.disabled = 'ignore-this'; // example
```

> _**Note!** If button has attribute `disabled` - button will be ignored_  
> _no matter which class is present there_ 


```html
<button data-wstabs-ns="group-a" data-wstabs-button="1" class="my-button is-active">First button</button>
<button disabled data-wstabs-ns="group-a" data-wstabs-button="2" class="my-button">Blocked button</button>
<button data-wstabs-ns="group-a" data-wstabs-button="3" class="my-button">Third button</button>
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
