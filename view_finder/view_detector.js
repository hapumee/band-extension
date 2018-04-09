function makeViewNamePanel() {
    if (document.body.getAttribute('viewname_panel_flag') == 'true') {
        document.body.setAttribute('viewname_panel_flag', false);

        let viewElements = document.querySelectorAll('[data-viewname]');

        viewElements.forEach(function(element) {
            let viewname = element.getAttribute('data-viewname');
            let panelId = 'viewname_panel_' + viewname;
            let panel = document.getElementById(panelId);

            if (panel) {
                element.removeChild(panel);
                element.classList.remove('element_style');
                element.style = '';
            } else {
                alert('loading.....');
            }
        });

    } else {
        document.body.setAttribute('viewname_panel_flag', true);

        let viewElements = document.querySelectorAll('[data-viewname]');

        viewElements.forEach(function(element) {
            let viewname = element.getAttribute('data-viewname');
            let panelId = 'viewname_panel_' + viewname;

            let div = document.createElement('div');

            div.id = panelId;
            div.innerHTML = viewname;
            div.title = viewname;
            div.className = 'viewname_panel_style';

            div.addEventListener('click', (event) => {
                event.stopPropagation();

                element.classList.toggle('element_style', (element.classList.contains('element_style')) ? false : true);
            });

            element.insertBefore(div, element.childNodes[0]);
            element.style = 'display: block !important';
        });
    }
    // console.log(document.body);
}

chrome.browserAction.onClicked.addListener((tab) => {
    // console.log(tab);

    chrome.tabs.executeScript({
        code: '(' + makeViewNamePanel + ')();'
    });
});
