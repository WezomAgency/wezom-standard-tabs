# Wezom Standard Tabs

---

[![npm](https://img.shields.io/badge/npm-install-red.svg)](https://www.npmjs.com/package/wezom-standard-tabs)
[![WezomAgency](https://img.shields.io/badge/wezom-agency-red.svg)](https://github.com/WezomAgency)
[![Javascript Style Guide](https://img.shields.io/badge/code_style-wezom_relax-red.svg)](https://github.com/WezomAgency/eslint-config-wezom-relax)

## Usage

### Markup

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
<div data-wstabs-ns="group-a" data-wstabs-block="2" class="my-block is-active">Second block content</div>
<div data-wstabs-ns="group-a" data-wstabs-block="3" class="my-block is-active">Third block content</div>
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
