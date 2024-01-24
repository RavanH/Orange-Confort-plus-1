const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header id="header"></app-header>

<app-home class="d-none"></app-home>
<app-modes class="d-none"></app-modes>
<app-settings class="d-none"></app-settings>
<app-edit-setting class="d-none"></app-edit-setting>
`;

class ToolbarComponent extends HTMLElement {
	header: HTMLElement | null = null;
	home: HTMLElement | null = null;
	modes: HTMLElement | null = null;
	settings: HTMLElement | null = null;
	historyRoute: string[] = [];
	json: ModeOfUseModel;
	defaultJson: ModeOfUseModel;

	constructor() {
		super();
		this.appendChild(tmplToolbar.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.header = this.querySelector('#header');
		this.home = this.querySelector('app-home');
		this.modes = this.querySelector('app-modes');
		this.settings = this.querySelector('app-settings');

		filesServiceInstance.getModesOfUse().then((result: any) => {
			this.defaultJson = result;

			// @todo Contrôler si le JSON du local correspond au JSON de la version de Confort+ via un numéro de version ?
			localStorageServiceInstance.getItem(jsonName).then((result: any) => {
				if (result && Object.keys(result).length !== 0) {
					this.json = result;
				} else {
					this.json = this.defaultJson;
					localStorageServiceInstance.setItem(jsonName, this.defaultJson);
				}
				this.setCurrentMode();
			});
		});

		window.addEventListener(`storage-${jsonName}`, (event: any) => {
			localStorageServiceInstance.getItem(jsonName).then((result: any) => {
				this.json = result;
				this.setCurrentMode();
			});
		});

		routeServiceInstance.initPages(this);

		this.addEventListener('changeRoute', (event) => {
			/* Creating a tree structure to get the previous route */
			if ((event as CustomEvent).detail.isPrev) {
				this.historyRoute.pop();
			} else {
				this.historyRoute.push(routeServiceInstance.currentRoute);
			}

			/* If editing setting */
			if ((event as CustomEvent).detail.setting) {
				this.json.selectedMode = (event as CustomEvent).detail.mode;
				this.setCurrentMode();
			}

			routeServiceInstance.navigate((event as CustomEvent).detail.route);
			this.setHeaderDisplay((event as CustomEvent).detail.route);
			this.header?.focus();
			this.header?.setAttribute('data-prev-route', this.historyRoute[this.historyRoute.length - 1]);
		});
	}

	setHeaderDisplay = (page: string): void => {
		switch (page) {
			case routeServiceInstance.PAGE_HOME: {
				this.header?.setAttribute('data-display', 'primary');
				this.header?.setAttribute('data-title-page', '');
				break;
			}
			case routeServiceInstance.PAGE_MODES: {
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-title-page', 'pageTitleModes');
				break;
			}
			case routeServiceInstance.PAGE_SETTINGS: {
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-title-page', 'pageTitleSettings');
				break;
			}
			case routeServiceInstance.PAGE_EDIT_SETTING: {
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-title-page', 'pageTitleEditSetting');
				break;
			}
		}
	}

	setCurrentMode = (): void => {
		if (this.json.selectedMode) {
			this.json.modes.forEach((mode: any) => {
				if (Object.entries(mode)[0][0] === this.json.selectedMode) {
					this.header?.setAttribute('data-selected-mode', this.json.selectedMode);
					this.home?.setAttribute('data-mode', JSON.stringify(mode));
					this.settings?.setAttribute('data-mode', JSON.stringify(mode));
					this.modes?.setAttribute('data-list-mode', JSON.stringify(this.json));
				}
			});
		} else {
			routeServiceInstance.navigate(routeServiceInstance.PAGE_MODES);
		}

		this.setCustomState();
	}

	setCustomState = (): void => {
		let defaultMode: any;
		let currentMode: any;
		this.defaultJson.modes.forEach((mode: any) => {
			if (Object.keys(mode)[0] === this.json.selectedMode) {
				defaultMode = JSON.stringify(mode);
			}
		});
		this.json.modes.forEach((mode: any) => {
			if (Object.keys(mode)[0] === this.json.selectedMode) {
				currentMode = JSON.stringify(mode);
			}
		});
		const isCustomMode = !(currentMode === defaultMode);
		this.home?.setAttribute('data-custom', isCustomMode.toString());
	}
}

customElements.define('app-toolbar', ToolbarComponent);