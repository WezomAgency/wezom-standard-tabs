'use strict';

/**
 * Wezom Standard Tabs
 * @module
 */

// ----------------------------------------
// Imports
// ----------------------------------------

import $ from 'jquery';
import 'custom-jquery-methods/fn/get-my-elements';

// ----------------------------------------
// Private
// ----------------------------------------

/**
 * Не реагировать на клик
 * @param {jQuery} $button
 * @return {boolean|undefined}
 * @private
 */
function _noReact ($button) {
	return $button.hasClass(wsTabs.cssClass.active) || $button.hasClass(wsTabs.cssClass.disabled) || $button.prop('disabled');
}

/**
 * @param {jQuery} $button
 * @param {jQuery} $context
 * @return {{myNs:string, myName:string, buttonsSelector:string, buttonSyncSelector:string, blocksSelector:string, blockSelector:string, $block:jQuery, $siblingBlocks:jQuery, $siblingButtons:jQuery, $syncButtons:jQuery}}
 * @private
 */
function _ejectData ($button, $context) {
	let $sibling = null;
	const data = {
		myNs: $button.data(wsTabs.keys.ns),
		myName: $button.data(wsTabs.keys.button),
		get buttonsSelector () {
			return `[data-${wsTabs.keys.ns}="${this.myNs}"][data-${wsTabs.keys.button}]`;
		},
		get buttonSyncSelector () {
			return `[data-${wsTabs.keys.ns}="${this.myNs}"][data-${wsTabs.keys.button}="${this.myName}"]`;
		},
		get blocksSelector () {
			return `[data-${wsTabs.keys.ns}="${this.myNs}"][data-${wsTabs.keys.block}]`;
		},
		get blockSelector () {
			return `[data-${wsTabs.keys.ns}="${this.myNs}"][data-${wsTabs.keys.block}="${this.myName}"]`;
		},
		get $block () {
			return $button.getMyElements(wsTabs.keys.myBlock, this.blockSelector);
		},
		get $siblingBlocks () {
			let $blocks = this.$block.getMyElements(wsTabs.keys.myBlocks, this.blocksSelector, $context, true);
			return $blocks.not(this.blockSelector);
		},
		get $siblingButtons () {
			return $sibling || $button.getMyElements(wsTabs.keys.myButtons, this.buttonsSelector, $context, true);
		},
		get $syncButtons () {
			return this.$siblingButtons.filter(this.buttonSyncSelector);
		}
	};
	if (data.$syncButtons.length) {
		$sibling = data.$siblingButtons.not(data.$syncButtons);
	}
	return data;
}

/**
 * @param {string} name
 * @param {*} ...args
 * @private
 */
function _runHook (name, ...args) {
	const hooks = wsTabs.hooks[name];
	if (Array.isArray(hooks)) {
		hooks.forEach(hook => {
			if (typeof hook === 'function') {
				hook(...args);
			}
		});
	}
}

/**
 * @param {jQuery} $button
 * @param {jQuery} $context
 * @private
 */
function _changeTab ($button, $context) {
	const { myNs, myName, $block, $siblingBlocks, $siblingButtons, $syncButtons } = _ejectData($button, $context);
	if (_noReact($button)) {
		_runHook('beforeAgain', myNs, myName, $button, $block);
		$button.add($block).trigger(wsTabs.events.again);
		_runHook('again', myNs, myName, $button, $block);
		return false;
	}

	_runHook('beforeOff', myNs, myName, $siblingButtons, $siblingBlocks);
	_runHook('beforeOn', myNs, myName, $button, $block, $syncButtons);

	$siblingButtons.add($siblingBlocks).removeClass(wsTabs.cssClass.active).trigger(wsTabs.events.off);
	$button.add($syncButtons).add($block).addClass(wsTabs.cssClass.active).trigger(wsTabs.events.on);

	_runHook('off', myNs, myName, $siblingButtons, $siblingBlocks);
	_runHook('on', myNs, myName, $button, $block, $syncButtons);
}

/**
 * Активация табов, если нету активных
 * @param {jQuery} $buttons
 * @param {jQuery} $context
 * @private
 */
function setActiveIfNotHave ($buttons, $context) {
	let ns = $buttons.data(wsTabs.keys.ns);
	let selector = `[data-${wsTabs.keys.ns}="${ns}"]`;
	let $group = $buttons.filter(selector);

	if ($group.length) {
		let $active = $group.filter(`.${wsTabs.cssClass.active}`);
		if (!$active.length) {
			_changeTab($group.eq(0), $context);
		}

		if ($group.length < $buttons.length) {
			setActiveIfNotHave($buttons.not(selector), $context);
		}
	}
}

/**
 * Сброс зависимолстей
 * @param {jQuery} $list
 * @param {strig[]} keys
 * @private
 */
function dropDependencies ($list, keys) {
	const wsTabsKeys = Object.keys(wsTabs.keys);
	$list.each((i, el) => {
		let $item = $(el);
		wsTabsKeys.forEach(key => {
			$item.data(key, null);
		});
	});
}

// ----------------------------------------
// Public
// ----------------------------------------

/**
 * @namespace
 */
const wsTabs = {
	/**
	 * События
	 * @sourceCode
	 * @enum {string}
	 */
	events: {
		on: 'wstabs-on',
		off: 'wstabs-off',
		again: 'wstabs-again'
	},

	/**
	 * @sourceCode
	 * @enum {function[]}
	 */
	hooks: {
		beforeOn: [],
		beforeOff: [],
		beforeAgain: [],
		on: [],
		off: [],
		again: [],
		update: []
	},

	/**
	 * CSS классы
	 * @sourceCode
	 * @enum {string}
	 */
	cssClass: {
		active: 'is-active',
		disabled: 'is-disabled'
	},

	/**
	 * Ключи
	 * @sourceCode
	 * @enum {string}
	 */
	keys: {
		ns: 'wstabs-ns',
		button: 'wstabs-button',
		block: 'wstabs-block',
		myBlock: '$myWsTabsBlock',
		myBlocks: '$myWsTabsBlocks',
		myButtons: '$myWsTabsButtons'
	},

	/**
	 * Инициализация
	 * @sourceCode
	 * @param {jQuery} [$context=$(document)]
	 */
	init ($context = $(document)) {
		this.updateDependencies($context);
		$context.on('click', `[data-${this.keys.button}]`, { $context }, function () {
			_changeTab($(this), $context);
		});

		$context.on('keydown', `[data-${this.keys.button}]`, { $context }, function (event) {
			let code = null;
			if (event.key !== undefined) {
				code = event.key;
			} else if (event.keyIdentifier !== undefined) {
				code = event.keyIdentifier;
			} else if (event.keyCode !== undefined) {
				code = event.keyCode;
			}
			if (code === 13 || code.toLowerCase() === 'enter') {
				_changeTab($(this), $context);
			}
		});
	},

	/**
	 * Принудительная активация табов, если нету активных
	 * @sourceCode
	 * @param {jQuery} [$context=$(document)]
	 */
	setActive ($context = $(document)) {
		let $buttons = $context.find(`[data-${this.keys.button}]`);
		setActiveIfNotHave($buttons, $context);
	},

	/**
	 * Сброс всех связей.
	 * @sourceCode
	 * @param {jQuery} [$context=$(document)]
	 * @return {{$buttons: $jQuery, $blocks: $jQuery}}
	 */
	dropDependencies ($context = $(document)) {
		let $buttons = $context.find(`[data-${this.keys.button}]`);
		let $blocks = $context.find(`[data-${this.keys.block}]`);
		dropDependencies($buttons, [this.keys.myBlock, this.keys.myButtons]);
		dropDependencies($blocks, [this.keys.myBlocks]);
		return { $buttons, $blocks };
	},

	/**
	 * Обновление всех связей с предварительным сбросом.
	 * Актуально при динамическом добавление новый кнопок и блоков в уже существующие группы табов
	 * @sourceCode
	 * @param {jQuery} [$context=$(document)]
	 */
	updateDependencies ($context = $(document)) {
		const { $buttons } = this.dropDependencies($context);
		$buttons.each((i, button) => {
			const $button = $(button);
			const { myNs, myName, $block, $syncButtons } = _ejectData($button, $context);
			_runHook('update', myNs, myName, $button, $block, $syncButtons);
		});
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

export default wsTabs;
