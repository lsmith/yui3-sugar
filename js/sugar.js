YUI.add('sugar', function (Y) {
    var isString = Y.Lang.isString;

    function $(x) {
        if (x) {
            if (!isString(x)) {
                if (x instanceof $.NodeList || x instanceof $.Node) {
                    return x;
                } else {
                    x = x === window ? 'win' :
                        x === document ? 'doc' : x;
                }
            }

            if (isString(x)) {
                if (x.indexOf('<') !== -1) {
                    return $.Node.create.apply($.Node,arguments);
                } else if (!x.indexOf('doc') || !x.indexOf('win')) {
                    return $.one.apply($, arguments);
                } else {
                    return $.all.apply($, arguments);
                }
            }
        }

        return $;
    }

    Y.sugar = function () {

        if (!$.Node) {
            Y.Do.before(function () {
                var args = Y.Array(arguments,0,true),
                    callback = args.length ? args.pop() : null;

                if (Y.Lang.isFunction(callback)) {
                    args.push( function (Y, fromLoader) {
                            Y.sugar();
                            callback($, fromLoader);
                        });

                    return new Y.Do.AlterArgs("Swapping $ for Y",args);
                }
            },Y,"use");
        }

        for (var k in Y) {
            $[k] = Y[k];
        }

        return $;
    };
        
},'@VERSION@', {requires:['node']});
