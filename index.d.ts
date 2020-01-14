export module 'wezom-standard-tabs' {
	type hook = (...args: any) => void;

	interface WSTabs {
		events: {
			on: string;
			off: string;
			again: string;
		};

		hooks: {
			beforeOn: hook[];
			beforeOff: hook[];
			beforeAgain: hook[];
			on: hook[];
			off: hook[];
			again: hook[];
			update: hook[];
		};

		cssClass: {
			active: string;
			disabled: string;
		};

		keys: {
			ns: string;
			button: string;
			block: string;
		};

		/**
		 * Initialize.
		 * Set dependencies and delegated handlers
		 */
		init<TContext = Document>($context: JQuery<TContext> = $(document)): void;

		/**
		 * Forced activation of tabs if there are no active one
		 */
		setActive<TContext = Document>($context: JQuery<TContext> = $(document)): void;

		/**
		 * Remove all dependencies
		 */
		dropDependencies<
			TButtons = HTMLElement,
			TBlocks = HTMLElement,
			TContext = Document
			>(
			$context: JQuery<TContext> = $(document)
		): {
			$buttons: JQuery<TButtons>;
			$blocks: JQuery<TBlocks>;
		};

		/**
		 * Update all dependencies with pre-reset.
		 * Actual when dynamically adding new buttons and blocks to existing tab groups
		 */
		updateDependencies<TContext = Document>(
			$context: JQuery<TContext> = $(document)
		): void;

		/**
		 * Ejecting tabs data from given tab button
		 */
		ejectData<TButtons = HTMLElement, TBlocks = HTMLElement, TContext = Document>(
			$button: JQuery<TButtons>,
			$context: JQuery<TContext> = $(document)
		): {
			myNs: string;
			myName: string;
			buttonsSelector: string;
			buttonSyncSelector: string;
			blocksSelector: string;
			blockSelector: string;
			$block: JQuery<TBlocks>;
			$siblingBlocks: JQuery<TBlocks>;
			$siblingButtons: JQuery<TButtons>;
			$syncButtons: JQuery<TButtons>;
		};
	}

	const wsTabs: WSTabs;
	export = wsTabs;
}
