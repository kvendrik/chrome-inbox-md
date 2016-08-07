const inboxMd = {

	init(){
		this._bindEvents();

		marked.setOptions({
  			highlight(code) {
    			return hljs.highlightAuto(code).value;
  			}
		});
	},

	_bindEvents(){
		const btnEl = document.querySelector('.y.hC');
		let editorCount = 0;

		btnEl.addEventListener('click', () => {
			setTimeout(() => {
				this._insertPlugin(editorCount);
				editorCount++;
			}, 0);
		}, false);
	},

	_insertPlugin(editorCount){
		const previewEl = document.querySelector('#aR-'+editorCount);
		const parentEl = previewEl.parentNode;

		// hide inbox editor
		previewEl.setAttribute('style', 'display: none;');

		// hide inbox placeholder label
		const label = parentEl.getElementsByTagName('label')[0];
		if (label) {
			label.setAttribute('style', 'display: none;');
		}

		//append editor
		const editorWapperEl = document.createElement('div');
		parentEl.appendChild(editorWapperEl);
		this._editor = this._insertEditor(editorWapperEl);

		//add switch button
		const btnEl = this._getButtonEl(editorWapperEl, previewEl);
		parentEl.appendChild(btnEl);
	},

	_getButtonEl(editorWapperEl, previewEl){
		const el = document.createElement('a');
		el.className = 'btn';
		el.innerHTML = 'Switch to preview';

		el.addEventListener('click', (e) => {
			const target = e.target;

			if (target.innerHTML === 'Switch to preview') {
                this._parseMdToPreview(previewEl);
				editorWapperEl.style = 'display:none;';
				previewEl.style = '';
				target.innerText = 'Switch to markdown';
			} else {
				editorWapperEl.style = '';
				previewEl.style = 'display:none;';
				target.innerText = 'Switch to preview';
			}
		}, false);

		return el;
	},

	_parseMdToPreview(previewEl){
        // parse markdown to str
		const mdHTML = marked(this._editor.getValue());
			
        // parse md string to nodes
		const frag = document.createElement('div');
		frag.innerHTML = mdHTML;
		
		const els = frag.getElementsByTagName('*');

        // loop through all nodes
        // and add their styles inline
		[].forEach.call(els, (el) => {
			const style = utils.getCodeCssInline(el);
			el.style = style;
		});

        // append all parsed data to preview
        previewEl.innerHTML = '';
		previewEl.appendChild(frag);
	},

	_insertEditor(parentEl){
		const el = document.createElement('textarea');
		el.className = 'editor';
		el.placeholder = 'Start typing...';
		
		parentEl.appendChild(el);

		return CodeMirror.fromTextArea(el, {
			lineNumbers: true,
			mode: 'gfm', //Github Flavored Markdown
			theme: 'default'
		});
	}

};
