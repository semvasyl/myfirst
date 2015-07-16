function BrowserType() {
    var userAgent = navigator.userAgent.toLowerCase();

    var agentContains = function() {
        var result = true;
        for (var i = 0; i < arguments.length; i++)
        {
            var subString = arguments[i].toLowerCase();
            result = result && userAgent.indexOf(subString) >= 0
        }
        return result;
    };

    this.isMobile = function () {
        return agentContains('iphone') || agentContains('ipod') || agentContains('android', 'mobile');
    };

    this.isTablet = function () {
        return agentContains('ipad') || agentContains('android') && !this.isMobile();
    };

    this.isOldIE = function () {
        return agentContains('msie 7.') || agentContains('msie 8.')|| agentContains('msie 9.') ;
    };

    this.isIE8 = function () {
        return agentContains('msie 8.');
    };

    this.isIE = function() {
        return agentContains('msie') || agentContains('trident');
    };

    this.isIE9 = function() {
        return agentContains('msie 9.0');
    };

    this.isSafari = function() {
        return agentContains('safari') && !agentContains('chrome')
    };

    this.isOldSafari = function() {
        return agentContains('safari') && !agentContains('chrome') && (agentContains('version/5'))
    };
}

var browserType =new BrowserType();