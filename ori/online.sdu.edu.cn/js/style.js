var _hide = true;
var _lastClientMode;

window.onload = function() {
    this.updateClientMode();
    if (this._lastClientMode === 'mobile') {
        // 把搜索框放到最下面
        let containers = document.querySelectorAll('.menu-container');
        let search = document.querySelectorAll('.searchbar')[0];
        if (search !== undefined && containers.length > 0) {
            containers[0].removeChild(search);
            containers[0].appendChild(search);
        }
    }
}

window.onresize = function() {
    if (this._lastClientMode !== 'desktop' && this.getWidth() > 1000) {
        // 1000px 是移动端页面的宽度阈值
        if (!this._hide) {
            // 如果从移动端进入PC端，遮罩没收起来，就把遮罩收起来
            this.hideOrShowMenu();
        }

        let containers = document.querySelectorAll('.menu-container');
        for (var i = 0; i < containers.length; i++) {
            let elm = containers[i];
            elm.style.display = 'block';
        }

        // 把搜索框放到最上面
        let menu = document.querySelectorAll('.menu-wrapper')[0];
        if (menu !== undefined && containers.length > 0) {
            containers[0].removeChild(menu);
            containers[0].appendChild(menu);
        }

        this.updateClientMode();
    } else if (this._lastClientMode !== 'mobile' && this.getWidth() <= 1000) {
        if (!this._hide) {
            // 如果从PC端进入移动端，遮罩没收起来，就把遮罩收起来
            this.hideOrShowMenu();
        }
        let containers = document.querySelectorAll('.menu-container');
        for (var i = 0; i < containers.length; i++) {
            let elm = containers[i];
            elm.style.display = 'none';
        }

        let search = document.querySelectorAll('.searchbar')[0];
        if (search !== undefined && containers.length > 0) {
            containers[0].removeChild(search);
            containers[0].appendChild(search);
        }
        this.updateClientMode();
    }
}

function getWidth() {
    if (window.innerWidth != undefined) {
        return window.innerWidth;
    } else {
        var b = document.body;
        var d = document.documentElement;
        return Math.min(b.clientWidth, d.clientWidth);
    }
}

function updateClientMode() {
    _lastClientMode = this.getWidth() > 1000 ? 'desktop' : 'mobile';
}

function hideOrShowMenu() {
    let containers = document.querySelectorAll('.menu-container');
    let mask = document.querySelectorAll('.menu-mask');
    updateClientMode();

    if (_hide) {
        for (var i = 0; i < containers.length; i++) {
            let elm = containers[i];
            elm.style.display = 'block';
        }
        for (var i = 0; i < mask.length; i++) {
            let elm = mask[i];
            elm.style.display = 'block';
        }

        _hide = false;
    } else {
        for (var i = 0; i < containers.length; i++) {
            let elm = containers[i];
            elm.style.display = 'none';
        }
        for (var i = 0; i < mask.length; i++) {
            let elm = mask[i];
            elm.style.display = 'none';
        }

        _hide = true;
    }
}