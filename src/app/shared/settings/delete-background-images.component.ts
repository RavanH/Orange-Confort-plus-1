const tmplDeleteBackgroundImages: HTMLTemplateElement = document.createElement('template');
tmplDeleteBackgroundImages.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class DeleteBackgroundImagesComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.setCallback(deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this));

		this.appendChild(tmplDeleteBackgroundImages.content.cloneNode(true));
	}
}

customElements.define('app-delete-background-images', DeleteBackgroundImagesComponent);