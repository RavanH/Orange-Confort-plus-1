const selectEditValueLayout: HTMLTemplateElement = document.createElement('template');
selectEditValueLayout.innerHTML = `
	<div class="d-flex align-items-center justify-content-between gap-2">
		<button type="button" class="btn btn-icon btn-primary">
			<span class="visually-hidden" data-i18n="prevValue"></span>
			<app-icon data-name="Form_Chevron_left"></app-icon>
		</button>
		<output></output>
		<button type="button" class="btn btn-icon btn-primary">
			<span class="visually-hidden" data-i18n="nextValue"></span>
			<app-icon data-name="Form_Chevron_right"></app-icon>
		</button>
	</div>
`;

class SelectEditValueComponent extends HTMLElement {
	static observedAttributes = ['data-name', 'data-index', 'data-setting-values'];
	selectedValue: HTMLOutputElement | null = null;
	btnPrevValue: HTMLButtonElement | null = null;
	btnNextValue: HTMLButtonElement | null = null;

	name = '';
	values: string[] = [];
	currentIndex: number = null;
	currentValue: string = null;

	handler: any;

	constructor() {
		super();

		this.name = this.dataset?.name || this.name;

		this.appendChild(selectEditValueLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectedValue = this.querySelector('output');
		this.btnPrevValue = this.querySelector('button:first-of-type');
		this.btnNextValue = this.querySelector('button:last-of-type');

		this.btnPrevValue?.addEventListener('click', this.handler);
		this.btnNextValue?.addEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-index' === name) {
			this.currentIndex = Number(newValue);
			this.moveEditValue(this.currentIndex);
		}
		if ('data-setting-values' === name) {
			this.values = newValue.split(',');
		}
	}

	moveEditValue = (index: number): void => {
		this.currentIndex = index;
		this.btnPrevValue!.disabled = false;
		this.btnNextValue!.disabled = false;

		if (this.currentIndex <= 0) {
			this.currentIndex = 0;
			this.btnPrevValue!.disabled = true;
			this.btnNextValue!.disabled = false;
		} else if (this.currentIndex >= this.values.length - 1) {
			this.currentIndex = this.values.length - 1;
			this.btnPrevValue!.disabled = false;
			this.btnNextValue!.disabled = true;
		}

		this.currentValue = this.values[this.currentIndex];
		this.selectedValue!.innerText = i18nServiceInstance.getMessage(this.currentValue.replace(/\s/g, ''));

		this.changeEditValue();
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				switch (event.currentTarget) {
					case this.btnPrevValue:
						this.moveEditValue(this.currentIndex - 1);
						break;
					case this.btnNextValue:
						this.moveEditValue(this.currentIndex + 1);
						break;
				}
			}
		}
	}

	private changeEditValue = (): void => {
		let editValueEvent = new CustomEvent(`editSetting${this.name}`,
			{
				bubbles: true,
				detail: {
					newValue: this.currentValue
				}
			});
		this.dispatchEvent(editValueEvent);
	}
}

customElements.define('app-select-edit-value', SelectEditValueComponent);