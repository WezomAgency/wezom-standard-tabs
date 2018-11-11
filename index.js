'use strict';

/**
 * Wezom Standard Tabs
 * @module
 */

// ----------------------------------------
// Imports
// ----------------------------------------

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
function noReact ($button) {
	return $button.hasClass(wsTabs.cssClass.active) || $button.hasClass(wsTabs.cssClass.disabled) || $button.prop('disabled');
}

/**
 * @param {jQuery} $button
 * @param {jQuery} $context
 * @private
 */
function changeTab ($button, $context) {
	let myNs = $button.data(wsTabs.keys.ns);
	let myName = $button.data(wsTabs.keys.button);

	let buttonsSelector = `[data-${wsTabs.keys.ns}="${myNs}"][data-${wsTabs.keys.button}]`;
	let buttonSyncSelector = `[data-${wsTabs.keys.ns}="${myNs}"][data-${wsTabs.keys.button}="${myName}"]`;
	let blocksSelector = `[data-${wsTabs.keys.ns}="${myNs}"][data-${wsTabs.keys.block}]`;
	let blockSelector = `[data-${wsTabs.keys.ns}="${myNs}"][data-${wsTabs.keys.block}="${myName}"]`;

	/**
	 * @type {jQuery}
	 */
	let $block = $button.getMyElements(wsTabs.keys.myBlock, blockSelector);
	if (noReact($button)) {
		wsTabs.hooks.beforeAgain.forEach(hook => {
			if (typeof hook === 'function') {
				hook(myNs, myName, $button, $block);
			}
		});
		$button.add($block).trigger(wsTabs.events.again);
		wsTabs.hooks.again.forEach(hook => {
			if (typeof hook === 'function') {
				hook(myNs, myName, $button, $block);
			}
		});
		return false;
	}

	/**
	 * @type {jQuery}
	 */
	let $siblingBlocks = $block.getMyElements(wsTabs.keys.myBlocks, blocksSelector, $context, true);

	/**
	 * @type {jQuery}
	 */
	let $siblingButtons = $button.getMyElements(wsTabs.keys.myButtons, buttonsSelector, $context, true);
	let $syncButtons = $siblingButtons.filter(buttonSyncSelector);
	if ($syncButtons.length) {
		$siblingButtons = $siblingButtons.not($syncButtons);
	}

	wsTabs.hooks.beforeOff.forEach(hook => {
		if (typeof hook === 'function') {
			hook(myNs, myName, $siblingButtons, $siblingBlocks);
		}
	});

	wsTabs.hooks.beforeOn.forEach(hook => {
		if (typeof hook === 'function') {
			hook(myNs, myName, $button, $block, $syncButtons);
		}
	});

	$siblingButtons.add($siblingBlocks).removeClass(wsTabs.cssClass.active).trigger(wsTabs.events.off);
	$button.add($syncButtons).add($block).addClass(wsTabs.cssClass.active).trigger(wsTabs.events.on);

	wsTabs.hooks.off.forEach(hook => {
		if (typeof hook === 'function') {
			hook(myNs, myName, $siblingButtons, $siblingBlocks);
		}
	});

	wsTabs.hooks.on.forEach(hook => {
		if (typeof hook === 'function') {
			hook(myNs, myName, $button, $block, $syncButtons);
		}
	});
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
			changeTab($group.eq(0), $context);
		}

		if ($group.length < $buttons.length) {
			setActiveIfNotHave($buttons.not(selector), $context);
		}
	}
}

/**
 * Сброс зависимолстей
 * @param {jQuery} $list
 * @param {Array.<string>} keys
 * @private
 */
function dropDependencies ($list, keys) {
	$list.each((i, el) => {
		let $item = $(el);
		wsTabs.keys.forEach(key => {
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
	 * @enum {string}
	 * @sourceCode
	 */
	events: {
		on: 'wstabs-on',
		off: 'wstabs-off',
		again: 'wstabs-again'
	},

	/**
	 * @enum {Array}
	 * @sourceCode
	 */
	hooks: {
		beforeOn: [],
		beforeOff: [],
		beforeAgain: [],
		on: [],
		off: [],
		again: []
	},

	/**
	 * CSS классы
	 * @enum {string}
	 * @sourceCode
	 */
	cssClass: {
		active: 'is-active',
		disabled: 'is-disabled'
	},

	/**
	 * Ключи
	 * @enum {string}
	 * @sourceCode
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
	 * @param {jQuery} [$context=$(document)]
	 * @sourceCode
	 */
	init ($context = $(document)) {
		$context.on('click', `[data-${wsTabs.keys.button}]`, {$context}, function () {
			changeTab($(this), $context);
		});

		$context.on('keydown', `[data-${wsTabs.keys.button}]`, {$context}, function (event) {
			let code = null;
			if (event.key !== undefined) {
				code = event.key
			} else if (event.keyIdentifier !== undefined) {
				code = event.keyIdentifier
			} else if (event.keyCode !== undefined) {
				code = event.keyCode
			}
			if (code === 13 || code.toLowerCase() === 'enter') {
				changeTab($(this), $context);
			}
		});
	},

	/**
	 * Принудительная активация табов, если нету активных
	 * @param {jQuery} [$context=$(document)]
	 * @sourceCode
	 */
	setActive ($context = $(document)) {
		let $buttons = $context.find(`[data-${wsTabs.keys.button}]`);
		setActiveIfNotHave($buttons, $context);
	},

	/**
	 * Сброс всех связей.
	 * Актуально при динамическом добавление новый кнопок и блоков в уже существующие группы табов
	 * @param {jQuery} [$context=$(document)]
	 * @sourceCode
	 */
	dropDependencies ($context = $(document)) {
		let $buttons = $context.find(`[data-${wsTabs.keys.button}]`);
		let $blocks = $context.find(`[data-${wsTabs.keys.block}]`);
		dropDependencies($buttons, [wsTabs.keys.myBlock, wsTabs.keys.myButtons]);
		dropDependencies($blocks, [wsTabs.keys.myBlocks]);
	}
};

// ----------------------------------------
// Exports
// ----------------------------------------

export default wsTabs;
