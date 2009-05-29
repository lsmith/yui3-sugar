YUI.add('sugar', function (Y) {
    function $(x) {
        if (x) {
            if (x === window || x === 'window') {
                return $.get('win');
            } else if (x === document || x === 'document') {
                return $.get('doc');
            } else if (x.indexOf('<') !== -1) {
                return $.Node.create.apply($.Node,arguments);
            } else {
                return $.all.apply($, arguments);
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
