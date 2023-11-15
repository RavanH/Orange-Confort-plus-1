const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<style>
	.sc-confort-plus {
			border-radius: 50%;
			position: fixed;
			top: 50%;
			right: 1rem;
			padding: 0 !important;
			transform: translate(-50%, -50%);
	}
</style>
<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">
	<span class="visually-hidden" data-i18n="mainButton"></span>
	<app-icon data-size="3rem" data-name="Accessibility"></app-icon>
</button>
<app-toolbar class="d-none bg-body" id="toolbar"></app-toolbar>
`

class AppComponent extends HTMLElement {
	private openConfortPlus: boolean = false;
	confortPlusBtn: HTMLElement | null | undefined = null;
	confortPlusToolbar: HTMLElement | null | undefined = null;
	i18nService: any;
	pathService: any;
	path: string | undefined;
	link: HTMLLinkElement;

	constructor() {
		super();

		this.pathService = new pathService();
		this.path = this.pathService.path;
		this.i18nService = new i18nService(this.path);

		this.attachShadow({ mode: 'open' });
		this?.shadowRoot?.appendChild(template.content.cloneNode(true));

		this.link = document.createElement('link');
		this.link.rel = 'stylesheet';
		this.link.href = `${this.path}css/styles.min.css`;
		this.shadowRoot?.appendChild(this.link);
	}

	connectedCallback(): void {
		customElements.upgrade(this);

		// @note Tick until everything loaded
		setTimeout(() => {
			this.i18nService.translate(this.shadowRoot);
		});

		this.confortPlusBtn = this?.shadowRoot?.getElementById('confort');
		this.confortPlusToolbar = this?.shadowRoot?.getElementById('toolbar');
		if (!this.confortPlusBtn || !this.confortPlusToolbar) {
			return;
		}

		template.addEventListener('closeEvent', this.toggleToolbar);
		this.confortPlusBtn.addEventListener('click', this.toggleToolbar);
	}

	disconnectedCallback(): void {
		this.confortPlusBtn?.removeEventListener('click', this.toggleToolbar);
	}

	toggleToolbar = (): void => {
		this.openConfortPlus = !this.openConfortPlus;
		this?.confortPlusToolbar?.classList.toggle('d-none');
		this?.confortPlusBtn?.classList.toggle('d-none');
	}
}

customElements.define('app-root', AppComponent);
