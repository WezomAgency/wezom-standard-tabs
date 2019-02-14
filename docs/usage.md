# Usage

:arrow_left: [Wezom Standard Tabs](../README.md)

#### *Table of contents*

- [Markup](#markup)
- [CSS](#css)
- [JavaScript](#javascript)

---

### Markup

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

Setup buttons to toggle tabs blocks.

```html
<button data-wstabs-ns="group-a" data-wstabs-button="1" class="my-button is-active">First button</button>
<button data-wstabs-ns="group-a" data-wstabs-button="2" class="my-button">Second button</button>
<button data-wstabs-ns="group-a" data-wstabs-button="3" class="my-button">Third button</button>
```

_also you can have more buttons in other places, and they can have same `data-wstabs-button` values_

```html
<button data-wstabs-ns="group-a" data-wstabs-button="1" class="another-button is-active">Synced first button</button>
<button data-wstabs-ns="group-a" data-wstabs-button="2" class="another-button">Synced second button</button>
<button data-wstabs-ns="group-a" data-wstabs-button="3" class="another-button">Synced third button</button>
```

Setup blocks with content you needed

```html
<div data-wstabs-ns="group-a" data-wstabs-block="1" class="my-block is-active">First block content</div>
<div data-wstabs-ns="group-a" data-wstabs-block="2" class="my-block">Second block content</div>
<div data-wstabs-ns="group-a" data-wstabs-block="3" class="my-block">Third block content</div>
```

_Explanations:_

- attribute`data-wstabs-ns`
    - with its help, we create dependencies to create a single group, of buttons and blocks
    - this way we can create as many tabs on one page by linking them in different namespaces
    - as an example, recall how radio or checkbox inputs are grouped by name - we use the same approach
- attributes `data-wstabs-block` and `data-wstabs-button`
    - in the same namespace, these attributes are related to each other in case of their identical values.
    - if you click on button `data-wstabs-ns="A" data-wstabs-button="1"` - we would looking for element with _namespace_ `A` and _block_ `1`, something like this `data-wstabs-ns="A" data-wstabs-block="1"` 
- CSS class `is-active`
    - this is the default class for active buttons and block.
    - when you activate a tab, this class will be added to the corresponding buttons and block. When deactivated, it will be removed from the elements.

---

### CSS

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

> Wezom Standard Tabs do not have any default style solutions!  
> You can specify your own visualization with your own CSS code

A simple example, based on the code presented in the section `Markup` above.

_style the buttons_

```css
/* Not active state */
.my-button {
    border-color: #444;
    background: #ccc;
    cursor: pointer;
}

/* Make more brighter on active state
 * with tab's default CSS class */
.my-button.is-active {
    border-color: #999;
    background: #eee;
    cursor: default;
}
```

_style the blocks_

```css
/* Hide on inactive the state */
.my-block {
    display: none;
}

/* Show block on active state
 * with tab's default CSS class */
.my-button.is-active {
    display: block;
}
```

_alternate way to style the blocks_

```css
.my-block:not(.is-active) {
    display: none;
}
```

---

### JavaScript

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)

_**Note!** Wezom Standard Tabs is based on jQuery library._  
_It's has inner import for jQuery from `node_modules`_ 

```js
import wsTabs from 'wezom-standard-tabs';

// initialize for the whole document
wsTabs.init();

// or local initialize in some container
const $myContainer = $('#my-parent-container');
wsTabs.init($myContainer);
```

----

:arrow_left: [Wezom Standard Tabs](../README.md) | :arrow_up: [Top](#readme)
