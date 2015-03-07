// =================================================================================================
// Boost.js | Cookie Utilities
// (c) 2015 Mathigon / Philipp Legner
// =================================================================================================


M.cookie = {

    get: function get(name) {
        return M.cookie.has(name) ? M.cookie.list()[name] : null;
    },

    has: function has(name) {
        return new RegExp('(?:;\\s*|^)' + encodeURIComponent(name) + '=').test(document.cookie);
    },

    list: function list() {
        var pairs = document.cookie.split(';'), pair, result = {};
        for (var i = 0, n = pairs.length; i < n; ++i) {
            pair = pairs[i].split('=');
            pair[0] = pair[0].replace(/^\s+|\s+$/, '');
            result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return result;
    },

    remove: function remove(name, options) {
        if (!options) options = {};
        options.expires = new Date(0);
        options.maxAge = -1;
        return M.cookie.set(name, null, options);
    },

    // Possible optional options:
    // path     Specify path within the current domain, for example '/'
    // domain   Specify the (sub)domain the cookie pertains to. Can range from the root domain
    //          ('mathigon.org') up to the current subdomain ('test.world.mathigon.org').
    // maxAge   Specify, in seconds, the lifespan of the cookie.
    // expires  Set cookie expiry using an absolute GMT date/time string with an RFC2822 format
    //          (e.g. 'Tue, 02 Feb 2010 22:04:47 GMT')or a JS Date object.
    // secure   Specify whether the cookie should only be passed through HTTPS connections.
    set: function set(name, value, options) {
        options = options || {};
        var cookie = [encodeURIComponent(name) + '=' + encodeURIComponent(value)];
        if (options.path)    cookie.push('path=' + options.path);
        if (options.domain)  cookie.push('domain=' + options.domain);
        if (options.maxAge)  cookie.push('max-age=' + options.maxAge);
        if (options.expires) cookie.push('expires=' + (M.isDate(options.expires) ?
			                 	         options.expires.toUTCString() : options.expires));
        if (options.secure)  cookie.push('secure');
        document.cookie = cookie.join(';');
    }

};
