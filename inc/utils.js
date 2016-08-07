const utils = {
    getCodeCssInline(el){
		if (!el.className) {
			return '';
		}
		
		const styles = HIGHLIGHTJS_CSS_JSON[el.className];
		let str = '';

		if (styles) {
			for (const prop in styles) {
				str += `${prop}: ${styles[prop]};`;
			}
		}

		return str;
	},

    insertAtCaret(text){
        const txtarea = document.activeElement;
        const scrollPos = txtarea.scrollTop;
        let strPos = 0;

        const br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false ));

        if (br == "ie") { 
            txtarea.focus();
            var range = document.selection.createRange();

            range.moveStart('character', -txtarea.value.length);
            strPos = range.text.length;
        } else if (br == "ff") {
            strPos = txtarea.selectionStart;
        }

        const front = (txtarea.value).substring(0,strPos);  
        const back = (txtarea.value).substring(strPos,txtarea.value.length); 

        txtarea.value = front+text+back;
        strPos = strPos + text.length;

        if (br == "ie") { 
            txtarea.focus();

            const range = document.selection.createRange();
            range.moveStart ('character', -txtarea.value.length);
            range.moveStart ('character', strPos);
            range.moveEnd ('character', 0);
            range.select();
        } else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }

        txtarea.scrollTop = scrollPos;
    }
};