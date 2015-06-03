(function () {
    'use strict';
    
    /*---------- FUNCTIONS ----------*/
    
    // wrap content in a div
    function wrapContent() {
        var wrapper = document.createElement('div');
        wrapper.id = 'wrapper';
        var content = document.createElement('div');
        content.id = 'content';
        while (document.body.firstChild) {
            content.appendChild(document.body.firstChild);
        }
        wrapper.appendChild(content);
        document.body.appendChild(wrapper);
    }
    
    // load HTML
    function loadHTML(url, target, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status !== 200) return;
            target.innerHTML = this.responseText + target.innerHTML;
            if (callback) callback();
        };
        xhr.send();
    }

    // load CSS
    function loadCSS(url, callback) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        if (link.readyState) { //IE
            link.onreadystatechange = function () {
                if (link.readyState === "loaded" || link.readyState === "complete") {
                    link.onreadystatechange = null;
                    if (callback) callback();
                }
            };
        } else { //Others
            link.onload = function () {
                if (callback) callback();
            };
        }
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    // load Javascript
    //function loadJS(url, callback) {
    //    var script = document.createElement("script");
    //    script.type = "text/javascript";
    //    if (script.readyState) { //IE
    //        script.onreadystatechange = function () {
    //            if (script.readyState === "loaded" || script.readyState === "complete") {
    //                script.onreadystatechange = null;
    //                if (callback) callback();
    //            }
    //        };
    //    } else { //Others
    //        script.onload = function () {
    //            if (callback) callback();
    //        };
    //    }
    //    script.src = url;
    //    document.getElementsByTagName("head")[0].appendChild(script);
    //}
    
    // add to page title
    function suffixTitle() {
        if (document.title !== 'Greenlight Style Guide') {
            document.title += ' | Greenlight Style Guide';
        }
    }
    
    // add icons
    function addIcons() {
        var nav = document.getElementsByTagName('nav')[0];
        var links = nav.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            links[i].innerHTML = '<i class="fa fa-book"></i> ' + links[i].innerHTML;
        }
    }
    
    /*---------- PAGE LOAD ----------*/
    
    // wrap content in div
    wrapContent();

    // suffix page title
    suffixTitle();
    
    // load the CSS
    loadCSS('styleguide.css');
    loadCSS('content.css');
    loadCSS('//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');
    //loadCSS('codemirror/lib/codemirror.css');
    
    // inject the nav HTML
    loadHTML('nav.html', document.getElementById('wrapper'), function(){
        // then inject the header HTML
        loadHTML('header.html', document.body);
        addIcons();
    });

    // load JS
    //loadJS('codemirror/lib/codemirror.js');
    //loadJS('codemirror/mode/css/css.js');
    
})();