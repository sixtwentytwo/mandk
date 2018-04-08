/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *	// update the viewport, in case the window size has changed
 *	viewport = updateViewportDimensions();
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
  jQuery('.comment img[data-gravatar]').each(function(){
    jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
  });
	}
} // end function


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {

  /*
   * Let's fire off the gravatar function
   * You can remove this if you don't need it
  */
  loadGravatars();


}); /* end of as page load scripts */



!function() {
    "use strict";
    var e, t, n, r, o, i, u = tinymce.util.Tools.resolve("tinymce.PluginManager"), a = function(e) {
        return function() {
            return e
        }
    }, y = {
        noop: function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t]
        },
        noarg: function(n) {
            return function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return n()
            }
        },
        compose: function(n, r) {
            return function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return n(r.apply(null, arguments))
            }
        },
        constant: a,
        identity: function(e) {
            return e
        },
        tripleEquals: function(e, t) {
            return e === t
        },
        curry: function(i) {
            for (var e = [], t = 1; t < arguments.length; t++)
                e[t - 1] = arguments[t];
            for (var u = new Array(arguments.length - 1), n = 1; n < arguments.length; n++)
                u[n - 1] = arguments[n];
            return function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
                    n[r] = arguments[r];
                var o = u.concat(n);
                return i.apply(null, o)
            }
        },
        not: function(n) {
            return function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return !n.apply(null, arguments)
            }
        },
        die: function(e) {
            return function() {
                throw new Error(e)
            }
        },
        apply: function(e) {
            return e()
        },
        call: function(e) {
            e()
        },
        never: a(!1),
        always: a(!0)
    }, c = y.never, l = y.always, s = function() {
        return f
    }, f = (r = {
        fold: function(e, t) {
            return e()
        },
        is: c,
        isSome: c,
        isNone: l,
        getOr: n = function(e) {
            return e
        }
        ,
        getOrThunk: t = function(e) {
            return e()
        }
        ,
        getOrDie: function(e) {
            throw new Error(e || "error: getOrDie called on none.")
        },
        or: n,
        orThunk: t,
        map: s,
        ap: s,
        each: function() {},
        bind: s,
        flatten: s,
        exists: c,
        forall: l,
        filter: s,
        equals: e = function(e) {
            return e.isNone()
        }
        ,
        equals_: e,
        toArray: function() {
            return []
        },
        toString: y.constant("none()")
    },
    Object.freeze && Object.freeze(r),
    r), d = function(n) {
        var e = function() {
            return n
        }
          , t = function() {
            return o
        }
          , r = function(e) {
            return e(n)
        }
          , o = {
            fold: function(e, t) {
                return t(n)
            },
            is: function(e) {
                return n === e
            },
            isSome: l,
            isNone: c,
            getOr: e,
            getOrThunk: e,
            getOrDie: e,
            or: t,
            orThunk: t,
            map: function(e) {
                return d(e(n))
            },
            ap: function(e) {
                return e.fold(s, function(e) {
                    return d(e(n))
                })
            },
            each: function(e) {
                e(n)
            },
            bind: r,
            flatten: e,
            exists: r,
            forall: r,
            filter: function(e) {
                return e(n) ? o : f
            },
            equals: function(e) {
                return e.is(n)
            },
            equals_: function(e, t) {
                return e.fold(c, function(e) {
                    return t(n, e)
                })
            },
            toArray: function() {
                return [n]
            },
            toString: function() {
                return "some(" + n + ")"
            }
        };
        return o
    }, x = {
        some: d,
        none: s,
        from: function(e) {
            return null === e || e === undefined ? f : d(e)
        }
    }, m = (o = Array.prototype.indexOf) === undefined ? function(e, t) {
        return S(e, t)
    }
    : function(e, t) {
        return o.call(e, t)
    }
    , g = function(e, t) {
        return -1 < m(e, t)
    }, p = function(e, t) {
        for (var n = e.length, r = new Array(n), o = 0; o < n; o++) {
            var i = e[o];
            r[o] = t(i, o, e)
        }
        return r
    }, h = function(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            t(e[n], n, e)
    }, v = function(e, t) {
        for (var n = e.length - 1; 0 <= n; n--)
            t(e[n], n, e)
    }, b = function(e, t) {
        for (var n = [], r = 0, o = e.length; r < o; r++) {
            var i = e[r];
            t(i, r, e) && n.push(i)
        }
        return n
    }, w = function(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            if (t(e[n], n, e))
                return x.some(n);
        return x.none()
    }, S = function(e, t) {
        for (var n = 0, r = e.length; n < r; ++n)
            if (e[n] === t)
                return n;
        return -1
    }, C = Array.prototype.push, R = function(e) {
        for (var t = [], n = 0, r = e.length; n < r; ++n) {
            if (!Array.prototype.isPrototypeOf(e[n]))
                throw new Error("Arr.flatten item " + n + " was not an array, input: " + e);
            C.apply(t, e[n])
        }
        return t
    }, T = function(e, t) {
        for (var n = 0, r = e.length; n < r; ++n)
            if (!0 !== t(e[n], n, e))
                return !1;
        return !0
    }, D = Array.prototype.slice, A = {
        map: p,
        each: h,
        eachr: v,
        partition: function(e, t) {
            for (var n = [], r = [], o = 0, i = e.length; o < i; o++) {
                var u = e[o];
                (t(u, o, e) ? n : r).push(u)
            }
            return {
                pass: n,
                fail: r
            }
        },
        filter: b,
        groupBy: function(e, t) {
            if (0 === e.length)
                return [];
            for (var n = t(e[0]), r = [], o = [], i = 0, u = e.length; i < u; i++) {
                var a = e[i]
                  , c = t(a);
                c !== n && (r.push(o),
                o = []),
                n = c,
                o.push(a)
            }
            return 0 !== o.length && r.push(o),
            r
        },
        indexOf: function(e, t) {
            var n = m(e, t);
            return -1 === n ? x.none() : x.some(n)
        },
        foldr: function(e, t, n) {
            return v(e, function(e) {
                n = t(n, e)
            }),
            n
        },
        foldl: function(e, t, n) {
            return h(e, function(e) {
                n = t(n, e)
            }),
            n
        },
        find: function(e, t) {
            for (var n = 0, r = e.length; n < r; n++) {
                var o = e[n];
                if (t(o, n, e))
                    return x.some(o)
            }
            return x.none()
        },
        findIndex: w,
        flatten: R,
        bind: function(e, t) {
            var n = p(e, t);
            return R(n)
        },
        forall: T,
        exists: function(e, t) {
            return w(e, t).isSome()
        },
        contains: g,
        equal: function(e, n) {
            return e.length === n.length && T(e, function(e, t) {
                return e === n[t]
            })
        },
        reverse: function(e) {
            var t = D.call(e, 0);
            return t.reverse(),
            t
        },
        chunk: function(e, t) {
            for (var n = [], r = 0; r < e.length; r += t) {
                var o = e.slice(r, r + t);
                n.push(o)
            }
            return n
        },
        difference: function(e, t) {
            return b(e, function(e) {
                return !g(t, e)
            })
        },
        mapToObject: function(e, t) {
            for (var n = {}, r = 0, o = e.length; r < o; r++) {
                var i = e[r];
                n[String(i)] = t(i, r)
            }
            return n
        },
        pure: function(e) {
            return [e]
        },
        sort: function(e, t) {
            var n = D.call(e, 0);
            return n.sort(t),
            n
        },
        range: function(e, t) {
            for (var n = [], r = 0; r < e; r++)
                n.push(t(r));
            return n
        },
        head: function(e) {
            return 0 === e.length ? x.none() : x.some(e[0])
        },
        last: function(e) {
            return 0 === e.length ? x.none() : x.some(e[e.length - 1])
        }
    }, k = (i = Object.keys) === undefined ? function(e) {
        var t = [];
        for (var n in e)
            e.hasOwnProperty(n) && t.push(n);
        return t
    }
    : i, N = function(e, t) {
        for (var n = k(e), r = 0, o = n.length; r < o; r++) {
            var i = n[r];
            t(e[i], i, e)
        }
    }, E = function(r, o) {
        var i = {};
        return N(r, function(e, t) {
            var n = o(e, t, r);
            i[n.k] = n.v
        }),
        i
    }, O = function(e, n) {
        var r = [];
        return N(e, function(e, t) {
            r.push(n(e, t))
        }),
        r
    }, B = function(e) {
        return O(e, function(e) {
            return e
        })
    }, P = {
        bifilter: function(e, n) {
            var r = {}
              , o = {};
            return N(e, function(e, t) {
                (n(e, t) ? r : o)[t] = e
            }),
            {
                t: r,
                f: o
            }
        },
        each: N,
        map: function(e, r) {
            return E(e, function(e, t, n) {
                return {
                    k: t,
                    v: r(e, t, n)
                }
            })
        },
        mapToArray: O,
        tupleMap: E,
        find: function(e, t) {
            for (var n = k(e), r = 0, o = n.length; r < o; r++) {
                var i = n[r]
                  , u = e[i];
                if (t(u, i, e))
                    return x.some(u)
            }
            return x.none()
        },
        keys: k,
        values: B,
        size: function(e) {
            return B(e).length
        }
    }, I = function(t) {
        return function(e) {
            return function(e) {
                if (null === e)
                    return "null";
                var t = typeof e;
                return "object" === t && Array.prototype.isPrototypeOf(e) ? "array" : "object" === t && String.prototype.isPrototypeOf(e) ? "string" : t
            }(e) === t
        }
    }, W = {
        isString: I("string"),
        isObject: I("object"),
        isArray: I("array"),
        isNull: I("null"),
        isBoolean: I("boolean"),
        isUndefined: I("undefined"),
        isFunction: I("function"),
        isNumber: I("number")
    }, M = function(e) {
        return e.slice(0).sort()
    }, L = {
        sort: M,
        reqMessage: function(e, t) {
            throw new Error("All required keys (" + M(e).join(", ") + ") were not specified. Specified keys were: " + M(t).join(", ") + ".")
        },
        unsuppMessage: function(e) {
            throw new Error("Unsupported keys for object: " + M(e).join(", "))
        },
        validateStrArr: function(t, e) {
            if (!W.isArray(e))
                throw new Error("The " + t + " fields must be an array. Was: " + e + ".");
            A.each(e, function(e) {
                if (!W.isString(e))
                    throw new Error("The value " + e + " in the " + t + " fields was not a string.")
            })
        },
        invalidTypeMessage: function(e, t) {
            throw new Error("All values need to be of type: " + t + ". Keys (" + M(e).join(", ") + ") were not.")
        },
        checkDupes: function(e) {
            var n = M(e);
            A.find(n, function(e, t) {
                return t < n.length - 1 && e === n[t + 1]
            }).each(function(e) {
                throw new Error("The field: " + e + " occurs more than once in the combined fields: [" + n.join(", ") + "].")
            })
        }
    }, q = {
        immutable: function() {
            for (var t = [], e = 0; e < arguments.length; e++)
                t[e] = arguments[e];
            return function() {
                for (var n = [], e = 0; e < arguments.length; e++)
                    n[e] = arguments[e];
                if (t.length !== n.length)
                    throw new Error('Wrong number of arguments to struct. Expected "[' + t.length + ']", got ' + n.length + " arguments");
                var r = {};
                return A.each(t, function(e, t) {
                    r[e] = y.constant(n[t])
                }),
                r
            }
        },
        immutableBag: function(o, i) {
            var u = o.concat(i);
            if (0 === u.length)
                throw new Error("You must specify at least one required or optional field.");
            return L.validateStrArr("required", o),
            L.validateStrArr("optional", i),
            L.checkDupes(u),
            function(t) {
                var n = P.keys(t);
                A.forall(o, function(e) {
                    return A.contains(n, e)
                }) || L.reqMessage(o, n);
                var e = A.filter(n, function(e) {
                    return !A.contains(u, e)
                });
                0 < e.length && L.unsuppMessage(e);
                var r = {};
                return A.each(o, function(e) {
                    r[e] = y.constant(t[e])
                }),
                A.each(i, function(e) {
                    r[e] = y.constant(Object.prototype.hasOwnProperty.call(t, e) ? x.some(t[e]) : x.none())
                }),
                r
            }
        }
    }, F = q.immutable("width", "height"), j = q.immutable("rows", "columns"), z = q.immutable("row", "column"), _ = q.immutable("x", "y"), H = q.immutable("element", "rowspan", "colspan"), V = q.immutable("element", "rowspan", "colspan", "isNew"), U = {
        dimensions: F,
        grid: j,
        address: z,
        coords: _,
        extended: q.immutable("element", "rowspan", "colspan", "row", "column"),
        detail: H,
        detailnew: V,
        rowdata: q.immutable("element", "cells", "section"),
        elementnew: q.immutable("element", "isNew"),
        rowdatanew: q.immutable("element", "cells", "section", "isNew"),
        rowcells: q.immutable("cells", "section"),
        rowdetails: q.immutable("details", "section"),
        bounds: q.immutable("startRow", "startCol", "finishRow", "finishCol")
    }, G = function(e) {
        if (null === e || e === undefined)
            throw new Error("Node cannot be null or undefined");
        return {
            dom: y.constant(e)
        }
    }, X = {
        fromHtml: function(e, t) {
            var n = (t || document).createElement("div");
            if (n.innerHTML = e,
            !n.hasChildNodes() || 1 < n.childNodes.length)
                throw console.error("HTML does not have a single root node", e),
                "HTML must have a single root node";
            return G(n.childNodes[0])
        },
        fromTag: function(e, t) {
            var n = (t || document).createElement(e);
            return G(n)
        },
        fromText: function(e, t) {
            var n = (t || document).createTextNode(e);
            return G(n)
        },
        fromDom: G,
        fromPoint: function(e, t, n) {
            return x.from(e.dom().elementFromPoint(t, n)).map(G)
        }
    }, Y = 8, K = 9, $ = 1, J = 3, Q = $, Z = K, ee = function(e) {
        return e.nodeType !== Q && e.nodeType !== Z || 0 === e.childElementCount
    }, te = {
        all: function(e, t) {
            var n = t === undefined ? document : t.dom();
            return ee(n) ? [] : A.map(n.querySelectorAll(e), X.fromDom)
        },
        is: function(e, t) {
            var n = e.dom();
            if (n.nodeType !== Q)
                return !1;
            if (n.matches !== undefined)
                return n.matches(t);
            if (n.msMatchesSelector !== undefined)
                return n.msMatchesSelector(t);
            if (n.webkitMatchesSelector !== undefined)
                return n.webkitMatchesSelector(t);
            if (n.mozMatchesSelector !== undefined)
                return n.mozMatchesSelector(t);
            throw new Error("Browser lacks native selectors")
        },
        one: function(e, t) {
            var n = t === undefined ? document : t.dom();
            return ee(n) ? x.none() : x.from(n.querySelector(e)).map(X.fromDom)
        }
    }, ne = function(e, t) {
        for (var n = [], r = function(e) {
            return n.push(e),
            t(e)
        }, o = t(e); (o = o.bind(r)).isSome(); )
            ;
        return n
    }, re = "undefined" != typeof window ? window : Function("return this;")(), oe = function(e, t) {
        for (var n = t !== undefined && null !== t ? t : re, r = 0; r < e.length && n !== undefined && null !== n; ++r)
            n = n[e[r]];
        return n
    }, ie = function(e, t) {
        var n = e.split(".");
        return oe(n, t)
    }, ue = function(e, t) {
        var n = ie(e, t);
        if (n === undefined || null === n)
            throw e + " not available on this browser";
        return n
    }, ae = function() {
        return ue("Node")
    }, ce = function(e, t, n) {
        return 0 != (e.compareDocumentPosition(t) & n)
    }, le = function(e, t) {
        return ce(e, t, ae().DOCUMENT_POSITION_CONTAINED_BY)
    }, se = function(e) {
        var t, n = !1;
        return function() {
            return n || (n = !0,
            t = e.apply(null, arguments)),
            t
        }
    }, fe = function(e, t) {
        var n = function(e, t) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n];
                if (r.test(t))
                    return r
            }
            return undefined
        }(e, t);
        if (!n)
            return {
                major: 0,
                minor: 0
            };
        var r = function(e) {
            return Number(t.replace(n, "$" + e))
        };
        return me(r(1), r(2))
    }, de = function() {
        return me(0, 0)
    }, me = function(e, t) {
        return {
            major: e,
            minor: t
        }
    }, ge = {
        nu: me,
        detect: function(e, t) {
            var n = String(t).toLowerCase();
            return 0 === e.length ? de() : fe(e, n)
        },
        unknown: de
    }, pe = "Firefox", he = function(e, t) {
        return function() {
            return t === e
        }
    }, ve = function(e) {
        var t = e.current;
        return {
            current: t,
            version: e.version,
            isEdge: he("Edge", t),
            isChrome: he("Chrome", t),
            isIE: he("IE", t),
            isOpera: he("Opera", t),
            isFirefox: he(pe, t),
            isSafari: he("Safari", t)
        }
    }, be = {
        unknown: function() {
            return ve({
                current: undefined,
                version: ge.unknown()
            })
        },
        nu: ve,
        edge: y.constant("Edge"),
        chrome: y.constant("Chrome"),
        ie: y.constant("IE"),
        opera: y.constant("Opera"),
        firefox: y.constant(pe),
        safari: y.constant("Safari")
    }, we = "Windows", ye = "Android", xe = "Solaris", Se = "FreeBSD", Ce = function(e, t) {
        return function() {
            return t === e
        }
    }, Re = function(e) {
        var t = e.current;
        return {
            current: t,
            version: e.version,
            isWindows: Ce(we, t),
            isiOS: Ce("iOS", t),
            isAndroid: Ce(ye, t),
            isOSX: Ce("OSX", t),
            isLinux: Ce("Linux", t),
            isSolaris: Ce(xe, t),
            isFreeBSD: Ce(Se, t)
        }
    }, Te = {
        unknown: function() {
            return Re({
                current: undefined,
                version: ge.unknown()
            })
        },
        nu: Re,
        windows: y.constant(we),
        ios: y.constant("iOS"),
        android: y.constant(ye),
        linux: y.constant("Linux"),
        osx: y.constant("OSX"),
        solaris: y.constant(xe),
        freebsd: y.constant(Se)
    }, De = function(e, t) {
        var n = String(t).toLowerCase();
        return A.find(e, function(e) {
            return e.search(n)
        })
    }, Ae = function(e, n) {
        return De(e, n).map(function(e) {
            var t = ge.detect(e.versionRegexes, n);
            return {
                current: e.name,
                version: t
            }
        })
    }, ke = function(e, n) {
        return De(e, n).map(function(e) {
            var t = ge.detect(e.versionRegexes, n);
            return {
                current: e.name,
                version: t
            }
        })
    }, Ne = function(e, t) {
        return t + e
    }, Ee = function(e, t) {
        return e + t
    }, Oe = function(e, t) {
        return e.substring(t)
    }, Be = function(e, t) {
        return e.substring(0, e.length - t)
    }, Pe = function(e) {
        return "" === e ? x.none() : x.some(e.substr(0, 1))
    }, Ie = function(e) {
        return "" === e ? x.none() : x.some(e.substring(1))
    }, We = function(e, t, n) {
        return "" === t || !(e.length < t.length) && e.substr(n, n + t.length) === t
    }, Me = function(e, t) {
        return We(e, t, 0)
    }, Le = function(e, t) {
        return We(e, t, e.length - t.length)
    }, qe = {
        supplant: function(e, o) {
            return e.replace(/\${([^{}]*)}/g, function(e, t) {
                var n, r = o[t];
                return "string" == (n = typeof r) || "number" === n ? r : e
            })
        },
        startsWith: Me,
        removeLeading: function(e, t) {
            return Me(e, t) ? Oe(e, t.length) : e
        },
        removeTrailing: function(e, t) {
            return Le(e, t) ? Be(e, t.length) : e
        },
        ensureLeading: function(e, t) {
            return Me(e, t) ? e : Ne(e, t)
        },
        ensureTrailing: function(e, t) {
            return Le(e, t) ? e : Ee(e, t)
        },
        endsWith: Le,
        contains: function(e, t) {
            return -1 !== e.indexOf(t)
        },
        trim: function(e) {
            return e.replace(/^\s+|\s+$/g, "")
        },
        lTrim: function(e) {
            return e.replace(/^\s+/g, "")
        },
        rTrim: function(e) {
            return e.replace(/\s+$/g, "")
        },
        capitalize: function(e) {
            return Pe(e).bind(function(t) {
                return Ie(e).map(function(e) {
                    return t.toUpperCase() + e
                })
            }).getOr(e)
        }
    }, Fe = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/, je = function(t) {
        return function(e) {
            return qe.contains(e, t)
        }
    }, ze = [{
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function(e) {
            return qe.contains(e, "edge/") && qe.contains(e, "chrome") && qe.contains(e, "safari") && qe.contains(e, "applewebkit")
        }
    }, {
        name: "Chrome",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, Fe],
        search: function(e) {
            return qe.contains(e, "chrome") && !qe.contains(e, "chromeframe")
        }
    }, {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: function(e) {
            return qe.contains(e, "msie") || qe.contains(e, "trident")
        }
    }, {
        name: "Opera",
        versionRegexes: [Fe, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search: je("opera")
    }, {
        name: "Firefox",
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: je("firefox")
    }, {
        name: "Safari",
        versionRegexes: [Fe, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: function(e) {
            return (qe.contains(e, "safari") || qe.contains(e, "mobile/")) && qe.contains(e, "applewebkit")
        }
    }], _e = [{
        name: "Windows",
        search: je("win"),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "iOS",
        search: function(e) {
            return qe.contains(e, "iphone") || qe.contains(e, "ipad")
        },
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
    }, {
        name: "Android",
        search: je("android"),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
    }, {
        name: "OSX",
        search: je("os x"),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
    }, {
        name: "Linux",
        search: je("linux"),
        versionRegexes: []
    }, {
        name: "Solaris",
        search: je("sunos"),
        versionRegexes: []
    }, {
        name: "FreeBSD",
        search: je("freebsd"),
        versionRegexes: []
    }], He = {
        browsers: y.constant(ze),
        oses: y.constant(_e)
    }, Ve = function(e) {
        var t, n, r, o, i, u, a, c, l, s, f, d = He.browsers(), m = He.oses(), g = Ae(d, e).fold(be.unknown, be.nu), p = ke(m, e).fold(Te.unknown, Te.nu);
        return {
            browser: g,
            os: p,
            deviceType: (n = g,
            r = e,
            o = (t = p).isiOS() && !0 === /ipad/i.test(r),
            i = t.isiOS() && !o,
            u = t.isAndroid() && 3 === t.version.major,
            a = t.isAndroid() && 4 === t.version.major,
            c = o || u || a && !0 === /mobile/i.test(r),
            l = t.isiOS() || t.isAndroid(),
            s = l && !c,
            f = n.isSafari() && t.isiOS() && !1 === /safari/i.test(r),
            {
                isiPad: y.constant(o),
                isiPhone: y.constant(i),
                isTablet: y.constant(c),
                isPhone: y.constant(s),
                isTouch: y.constant(l),
                isAndroid: t.isAndroid,
                isiOS: t.isiOS,
                isWebView: y.constant(f)
            })
        }
    }, Ue = {
        detect: se(function() {
            var e = navigator.userAgent;
            return Ve(e)
        })
    }, Ge = function(e, t) {
        return e.dom() === t.dom()
    }, Xe = Ue.detect().browser.isIE() ? function(e, t) {
        return le(e.dom(), t.dom())
    }
    : function(e, t) {
        var n = e.dom()
          , r = t.dom();
        return n !== r && n.contains(r)
    }
    , Ye = {
        eq: Ge,
        isEqualNode: function(e, t) {
            return e.dom().isEqualNode(t.dom())
        },
        member: function(e, t) {
            return A.exists(t, y.curry(Ge, e))
        },
        contains: Xe,
        is: te.is
    }, Ke = function(e) {
        return X.fromDom(e.dom().ownerDocument)
    }, $e = function(e) {
        var t = e.dom();
        return x.from(t.parentNode).map(X.fromDom)
    }, Je = function(e) {
        var t = e.dom();
        return x.from(t.previousSibling).map(X.fromDom)
    }, Qe = function(e) {
        var t = e.dom();
        return x.from(t.nextSibling).map(X.fromDom)
    }, Ze = function(e) {
        var t = e.dom();
        return A.map(t.childNodes, X.fromDom)
    }, et = function(e, t) {
        var n = e.dom().childNodes;
        return x.from(n[t]).map(X.fromDom)
    }, tt = q.immutable("element", "offset"), nt = {
        owner: Ke,
        defaultView: function(e) {
            var t = e.dom().ownerDocument.defaultView;
            return X.fromDom(t)
        },
        documentElement: function(e) {
            var t = Ke(e);
            return X.fromDom(t.dom().documentElement)
        },
        parent: $e,
        findIndex: function(n) {
            return $e(n).bind(function(e) {
                var t = Ze(e);
                return A.findIndex(t, function(e) {
                    return Ye.eq(n, e)
                })
            })
        },
        parents: function(e, t) {
            for (var n = W.isFunction(t) ? t : y.constant(!1), r = e.dom(), o = []; null !== r.parentNode && r.parentNode !== undefined; ) {
                var i = r.parentNode
                  , u = X.fromDom(i);
                if (o.push(u),
                !0 === n(u))
                    break;
                r = i
            }
            return o
        },
        siblings: function(t) {
            return $e(t).map(Ze).map(function(e) {
                return A.filter(e, function(e) {
                    return !Ye.eq(t, e)
                })
            }).getOr([])
        },
        prevSibling: Je,
        offsetParent: function(e) {
            var t = e.dom();
            return x.from(t.offsetParent).map(X.fromDom)
        },
        prevSiblings: function(e) {
            return A.reverse(ne(e, Je))
        },
        nextSibling: Qe,
        nextSiblings: function(e) {
            return ne(e, Qe)
        },
        children: Ze,
        child: et,
        firstChild: function(e) {
            return et(e, 0)
        },
        lastChild: function(e) {
            return et(e, e.dom().childNodes.length - 1)
        },
        childNodesCount: function(e) {
            return e.dom().childNodes.length
        },
        hasChildNodes: function(e) {
            return e.dom().hasChildNodes()
        },
        leaf: function(e, t) {
            var n = Ze(e);
            return 0 < n.length && t < n.length ? tt(n[t], 0) : tt(e, t)
        }
    }, rt = function(e, t, n) {
        return A.bind(nt.children(e), function(e) {
            return te.is(e, t) ? n(e) ? [e] : [] : rt(e, t, n)
        })
    }, ot = {
        firstLayer: function(e, t) {
            return rt(e, t, y.constant(!0))
        },
        filterFirstLayer: rt
    }, it = function(e) {
        return e.dom().nodeName.toLowerCase()
    }, ut = function(e) {
        return e.dom().nodeType
    }, at = function(t) {
        return function(e) {
            return ut(e) === t
        }
    }, ct = at($), lt = at(J), st = at(K), ft = {
        name: it,
        type: ut,
        value: function(e) {
            return e.dom().nodeValue
        },
        isElement: ct,
        isText: lt,
        isDocument: st,
        isComment: function(e) {
            return ut(e) === Y || "#comment" === it(e)
        }
    }, dt = function(e, t, n) {
        if (!(W.isString(n) || W.isBoolean(n) || W.isNumber(n)))
            throw console.error("Invalid call to Attr.set. Key ", t, ":: Value ", n, ":: Element ", e),
            new Error("Attribute value was not simple");
        e.setAttribute(t, n + "")
    }, mt = function(e, t, n) {
        dt(e.dom(), t, n)
    }, gt = function(e, t) {
        var n = e.dom().getAttribute(t);
        return null === n ? undefined : n
    }, pt = function(e, t) {
        var n = e.dom();
        return !(!n || !n.hasAttribute) && n.hasAttribute(t)
    }, ht = {
        clone: function(e) {
            return A.foldl(e.dom().attributes, function(e, t) {
                return e[t.name] = t.value,
                e
            }, {})
        },
        set: mt,
        setAll: function(e, t) {
            var n = e.dom();
            P.each(t, function(e, t) {
                dt(n, t, e)
            })
        },
        get: gt,
        has: pt,
        remove: function(e, t) {
            e.dom().removeAttribute(t)
        },
        hasNone: function(e) {
            var t = e.dom().attributes;
            return t === undefined || null === t || 0 === t.length
        },
        transfer: function(o, i, e) {
            ft.isElement(o) && ft.isElement(i) && A.each(e, function(e) {
                var t, n, r;
                n = i,
                pt(t = o, r = e) && !pt(n, r) && mt(n, r, gt(t, r))
            })
        }
    }, vt = se(function() {
        return bt(X.fromDom(document))
    }), bt = function(e) {
        var t = e.dom().body;
        if (null === t || t === undefined)
            throw "Body is not available yet";
        return X.fromDom(t)
    }, wt = {
        body: vt,
        getBody: bt,
        inBody: function(e) {
            var t = ft.isText(e) ? e.dom().parentNode : e.dom();
            return t !== undefined && null !== t && t.ownerDocument.body.contains(t)
        }
    }, yt = function(e, t) {
        var n = [];
        return A.each(nt.children(e), function(e) {
            t(e) && (n = n.concat([e])),
            n = n.concat(yt(e, t))
        }),
        n
    }, xt = {
        all: function(e) {
            return yt(wt.body(), e)
        },
        ancestors: function(e, t, n) {
            return A.filter(nt.parents(e, n), t)
        },
        siblings: function(e, t) {
            return A.filter(nt.siblings(e), t)
        },
        children: function(e, t) {
            return A.filter(nt.children(e), t)
        },
        descendants: yt
    }, St = {
        all: function(e) {
            return te.all(e)
        },
        ancestors: function(e, t, n) {
            return xt.ancestors(e, function(e) {
                return te.is(e, t)
            }, n)
        },
        siblings: function(e, t) {
            return xt.siblings(e, function(e) {
                return te.is(e, t)
            })
        },
        children: function(e, t) {
            return xt.children(e, function(e) {
                return te.is(e, t)
            })
        },
        descendants: function(e, t) {
            return te.all(t, e)
        }
    };
    function Ct(e, t, n, r, o) {
        return e(n, r) ? x.some(n) : W.isFunction(o) && o(n) ? x.none() : t(n, r, o)
    }
    var Rt, Tt, Dt, At, kt, Nt = function(e, t, n) {
        for (var r = e.dom(), o = W.isFunction(n) ? n : y.constant(!1); r.parentNode; ) {
            r = r.parentNode;
            var i = X.fromDom(r);
            if (t(i))
                return x.some(i);
            if (o(i))
                break
        }
        return x.none()
    }, Et = function(e, t) {
        return A.find(e.dom().childNodes, y.compose(t, X.fromDom)).map(X.fromDom)
    }, Ot = function(e, r) {
        var o = function(e) {
            for (var t = 0; t < e.childNodes.length; t++) {
                if (r(X.fromDom(e.childNodes[t])))
                    return x.some(X.fromDom(e.childNodes[t]));
                var n = o(e.childNodes[t]);
                if (n.isSome())
                    return n
            }
            return x.none()
        };
        return o(e.dom())
    }, Bt = {
        first: function(e) {
            return Ot(wt.body(), e)
        },
        ancestor: Nt,
        closest: function(e, t, n) {
            return Ct(function(e) {
                return t(e)
            }, Nt, e, t, n)
        },
        sibling: function(t, n) {
            var e = t.dom();
            return e.parentNode ? Et(X.fromDom(e.parentNode), function(e) {
                return !Ye.eq(t, e) && n(e)
            }) : x.none()
        },
        child: Et,
        descendant: Ot
    }, Pt = function(e, t, n) {
        return Bt.ancestor(e, function(e) {
            return te.is(e, t)
        }, n)
    }, It = {
        first: function(e) {
            return te.one(e)
        },
        ancestor: Pt,
        sibling: function(e, t) {
            return Bt.sibling(e, function(e) {
                return te.is(e, t)
            })
        },
        child: function(e, t) {
            return Bt.child(e, function(e) {
                return te.is(e, t)
            })
        },
        descendant: function(e, t) {
            return te.one(t, e)
        },
        closest: function(e, t, n) {
            return Ct(te.is, Pt, e, t, n)
        }
    }, Wt = function(e, t, n) {
        var r = n !== undefined ? n : y.constant(!1);
        return r(t) ? x.none() : A.contains(e, ft.name(t)) ? x.some(t) : It.ancestor(t, e.join(","), function(e) {
            return te.is(e, "table") || r(e)
        })
    }, Mt = function(t, e) {
        return nt.parent(e).map(function(e) {
            return St.children(e, t)
        })
    }, Lt = y.curry(Mt, "th,td"), qt = y.curry(Mt, "tr"), Ft = function(e, t) {
        return parseInt(ht.get(e, t), 10)
    }, jt = {
        cell: function(e, t) {
            return Wt(["td", "th"], e, t)
        },
        firstCell: function(e) {
            return It.descendant(e, "th,td")
        },
        cells: function(e) {
            return ot.firstLayer(e, "th,td")
        },
        neighbourCells: Lt,
        table: function(e, t) {
            return It.closest(e, "table", t)
        },
        row: function(e, t) {
            return Wt(["tr"], e, t)
        },
        rows: function(e) {
            return ot.firstLayer(e, "tr")
        },
        notCell: function(e, t) {
            return Wt(["caption", "tr", "tbody", "tfoot", "thead"], e, t)
        },
        neighbourRows: qt,
        attr: Ft,
        grid: function(e, t, n) {
            var r = Ft(e, t)
              , o = Ft(e, n);
            return U.grid(r, o)
        }
    }, zt = function(e) {
        var t = jt.rows(e);
        return A.map(t, function(e) {
            var t = e
              , n = nt.parent(t).bind(function(e) {
                var t = ft.name(e);
                return "tfoot" === t || "thead" === t || "tbody" === t ? t : "tbody"
            })
              , r = A.map(jt.cells(e), function(e) {
                var t = ht.has(e, "rowspan") ? parseInt(ht.get(e, "rowspan"), 10) : 1
                  , n = ht.has(e, "colspan") ? parseInt(ht.get(e, "colspan"), 10) : 1;
                return U.detail(e, t, n)
            });
            return U.rowdata(t, r, n)
        })
    }, _t = function(e, n) {
        return A.map(e, function(e) {
            var t = A.map(jt.cells(e), function(e) {
                var t = ht.has(e, "rowspan") ? parseInt(ht.get(e, "rowspan"), 10) : 1
                  , n = ht.has(e, "colspan") ? parseInt(ht.get(e, "colspan"), 10) : 1;
                return U.detail(e, t, n)
            });
            return U.rowdata(e, t, n.section())
        })
    }, Ht = function(e, t) {
        return e + "," + t
    }, Vt = function(e, t) {
        var n = A.bind(e.all(), function(e) {
            return e.cells()
        });
        return A.filter(n, t)
    }, Ut = {
        generate: function(e) {
            var s = {}
              , t = []
              , n = e.length
              , f = 0;
            A.each(e, function(e, c) {
                var l = [];
                A.each(e.cells(), function(e, t) {
                    for (var n = 0; s[Ht(c, n)] !== undefined; )
                        n++;
                    for (var r = U.extended(e.element(), e.rowspan(), e.colspan(), c, n), o = 0; o < e.colspan(); o++)
                        for (var i = 0; i < e.rowspan(); i++) {
                            var u = n + o
                              , a = Ht(c + i, u);
                            s[a] = r,
                            f = Math.max(f, u + 1)
                        }
                    l.push(r)
                }),
                t.push(U.rowdata(e.element(), l, e.section()))
            });
            var r = U.grid(n, f);
            return {
                grid: y.constant(r),
                access: y.constant(s),
                all: y.constant(t)
            }
        },
        getAt: function(e, t, n) {
            var r = e.access()[Ht(t, n)];
            return r !== undefined ? x.some(r) : x.none()
        },
        findItem: function(e, t, n) {
            var r = Vt(e, function(e) {
                return n(t, e.element())
            });
            return 0 < r.length ? x.some(r[0]) : x.none()
        },
        filterItems: Vt,
        justCells: function(e) {
            var t = A.map(e.all(), function(e) {
                return e.cells()
            });
            return A.flatten(t)
        }
    }, Gt = {
        isSupported: function(e) {
            return e.style !== undefined
        }
    }, Xt = function(e, t, n) {
        if (!W.isString(n))
            throw console.error("Invalid call to CSS.set. Property ", t, ":: Value ", n, ":: Element ", e),
            new Error("CSS value must be a string: " + n);
        Gt.isSupported(e) && e.style.setProperty(t, n)
    }, Yt = function(e, t) {
        Gt.isSupported(e) && e.style.removeProperty(t)
    }, Kt = function(e, t, n) {
        var r = e.dom();
        Xt(r, t, n)
    }, $t = function(e, t) {
        return Gt.isSupported(e) ? e.style.getPropertyValue(t) : ""
    }, Jt = function(e, t) {
        var n = e.dom()
          , r = $t(n, t);
        return x.from(r).filter(function(e) {
            return 0 < e.length
        })
    }, Qt = {
        copy: function(e, t) {
            var n = e.dom()
              , r = t.dom();
            Gt.isSupported(n) && Gt.isSupported(r) && (r.style.cssText = n.style.cssText)
        },
        set: Kt,
        preserve: function(e, t) {
            var n = ht.get(e, "style")
              , r = t(e);
            return (n === undefined ? ht.remove : ht.set)(e, "style", n),
            r
        },
        setAll: function(e, t) {
            var n = e.dom();
            P.each(t, function(e, t) {
                Xt(n, t, e)
            })
        },
        setOptions: function(e, t) {
            var n = e.dom();
            P.each(t, function(e, t) {
                e.fold(function() {
                    Yt(n, t)
                }, function(e) {
                    Xt(n, t, e)
                })
            })
        },
        remove: function(e, t) {
            var n = e.dom();
            Yt(n, t),
            ht.has(e, "style") && "" === qe.trim(ht.get(e, "style")) && ht.remove(e, "style")
        },
        get: function(e, t) {
            var n = e.dom()
              , r = window.getComputedStyle(n).getPropertyValue(t)
              , o = "" !== r || wt.inBody(e) ? r : $t(n, t);
            return null === o ? undefined : o
        },
        getRaw: Jt,
        getAllRaw: function(e) {
            var t = {}
              , n = e.dom();
            if (Gt.isSupported(n))
                for (var r = 0; r < n.style.length; r++) {
                    var o = n.style.item(r);
                    t[o] = n.style[o]
                }
            return t
        },
        isValidValue: function(e, t, n) {
            var r = X.fromTag(e);
            return Kt(r, t, n),
            Jt(r, t).isSome()
        },
        reflow: function(e) {
            return e.dom().offsetWidth
        },
        transfer: function(r, o, e) {
            ft.isElement(r) && ft.isElement(o) && A.each(e, function(e) {
                var t, n;
                t = o,
                Jt(r, n = e).each(function(e) {
                    Jt(t, n).isNone() && Kt(t, n, e)
                })
            })
        }
    }, Zt = function(t, n) {
        nt.parent(t).each(function(e) {
            e.dom().insertBefore(n.dom(), t.dom())
        })
    }, en = function(e, t) {
        e.dom().appendChild(t.dom())
    }, tn = {
        before: Zt,
        after: function(e, t) {
            nt.nextSibling(e).fold(function() {
                nt.parent(e).each(function(e) {
                    en(e, t)
                })
            }, function(e) {
                Zt(e, t)
            })
        },
        prepend: function(t, n) {
            nt.firstChild(t).fold(function() {
                en(t, n)
            }, function(e) {
                t.dom().insertBefore(n.dom(), e.dom())
            })
        },
        append: en,
        appendAt: function(e, t, n) {
            nt.child(e, n).fold(function() {
                en(e, t)
            }, function(e) {
                Zt(e, t)
            })
        },
        wrap: function(e, t) {
            Zt(e, t),
            en(t, e)
        }
    }, nn = {
        before: function(t, e) {
            A.each(e, function(e) {
                tn.before(t, e)
            })
        },
        after: function(r, o) {
            A.each(o, function(e, t) {
                var n = 0 === t ? r : o[t - 1];
                tn.after(n, e)
            })
        },
        prepend: function(t, e) {
            A.each(e.slice().reverse(), function(e) {
                tn.prepend(t, e)
            })
        },
        append: function(t, e) {
            A.each(e, function(e) {
                tn.append(t, e)
            })
        }
    }, rn = function(e) {
        var t = e.dom();
        null !== t.parentNode && t.parentNode.removeChild(t)
    }, on = {
        empty: function(e) {
            e.dom().textContent = "",
            A.each(nt.children(e), function(e) {
                rn(e)
            })
        },
        remove: rn,
        unwrap: function(e) {
            var t = nt.children(e);
            0 < t.length && nn.before(e, t),
            rn(e)
        }
    }, un = q.immutable("minRow", "minCol", "maxRow", "maxCol"), an = function(e, t) {
        var n, i, r, u, a, c, l, o, s, f, d = function(e) {
            return te.is(e.element(), t)
        }, m = zt(e), g = Ut.generate(m), p = (i = d,
        r = (n = g).grid().columns(),
        u = n.grid().rows(),
        a = r,
        l = c = 0,
        P.each(n.access(), function(e) {
            if (i(e)) {
                var t = e.row()
                  , n = t + e.rowspan() - 1
                  , r = e.column()
                  , o = r + e.colspan() - 1;
                t < u ? u = t : c < n && (c = n),
                r < a ? a = r : l < o && (l = o)
            }
        }),
        un(u, a, c, l)), h = "th:not(" + t + "),td:not(" + t + ")", v = ot.filterFirstLayer(e, "th,td", function(e) {
            return te.is(e, h)
        });
        return A.each(v, on.remove),
        function(e, t, n, r) {
            for (var o, i, u, a = t.grid().columns(), c = t.grid().rows(), l = 0; l < c; l++)
                for (var s = !1, f = 0; f < a; f++)
                    l < n.minRow() || l > n.maxRow() || f < n.minCol() || f > n.maxCol() || (Ut.getAt(t, l, f).filter(r).isNone() ? (o = s,
                    i = e[l].element(),
                    u = X.fromTag("td"),
                    tn.append(u, X.fromTag("br")),
                    (o ? tn.append : tn.prepend)(i, u)) : s = !0)
        }(m, g, p, d),
        o = e,
        s = p,
        f = A.filter(ot.firstLayer(o, "tr"), function(e) {
            return 0 === e.dom().childElementCount
        }),
        A.each(f, on.remove),
        s.minCol() !== s.maxCol() && s.minRow() !== s.maxRow() || A.each(ot.firstLayer(o, "th,td"), function(e) {
            ht.remove(e, "rowspan"),
            ht.remove(e, "colspan")
        }),
        ht.remove(o, "width"),
        ht.remove(o, "height"),
        Qt.remove(o, "width"),
        Qt.remove(o, "height"),
        e
    }, cn = function(e, t) {
        return X.fromDom(e.dom().cloneNode(t))
    }, ln = function(e) {
        return cn(e, !0)
    }, sn = function(e, t) {
        var n = X.fromTag(t)
          , r = ht.clone(e);
        return ht.setAll(n, r),
        n
    }, fn = function(e) {
        return cn(e, !1)
    }, dn = ln, mn = function(e, t) {
        var n = sn(e, t)
          , r = nt.children(ln(e));
        return nn.append(n, r),
        n
    }, gn = (Rt = ft.isText,
    Tt = "text",
    Dt = function(e) {
        return Rt(e) ? x.from(e.dom().nodeValue) : x.none()
    }
    ,
    At = Ue.detect().browser,
    {
        get: function(e) {
            if (!Rt(e))
                throw new Error("Can only get " + Tt + " value of a " + Tt + " node");
            return kt(e).getOr("")
        },
        getOption: kt = At.isIE() && 10 === At.version.major ? function(e) {
            try {
                return Dt(e)
            } catch (t) {
                return x.none()
            }
        }
        : Dt,
        set: function(e, t) {
            if (!Rt(e))
                throw new Error("Can only set raw " + Tt + " value of a " + Tt + " node");
            e.dom().nodeValue = t
        }
    }), pn = {
        get: function(e) {
            return gn.get(e)
        },
        getOption: function(e) {
            return gn.getOption(e)
        },
        set: function(e, t) {
            gn.set(e, t)
        }
    }, hn = function(e) {
        return "img" === ft.name(e) ? 1 : pn.getOption(e).fold(function() {
            return nt.children(e).length
        }, function(e) {
            return e.length
        })
    }, vn = ["img", "br"], bn = hn, wn = function(e) {
        var t;
        return t = e,
        pn.getOption(t).filter(function(e) {
            return 0 !== e.trim().length || -1 < e.indexOf("\xa0")
        }).isSome() || A.contains(vn, ft.name(e))
    }, yn = function(e, i) {
        var u = function(e) {
            for (var t = nt.children(e), n = t.length - 1; 0 <= n; n--) {
                var r = t[n];
                if (i(r))
                    return x.some(r);
                var o = u(r);
                if (o.isSome())
                    return o
            }
            return x.none()
        };
        return u(e)
    }, xn = {
        first: function(e) {
            return Bt.descendant(e, wn)
        },
        last: function(e) {
            return yn(e, wn)
        }
    }, Sn = function() {
        var e = X.fromTag("td");
        return tn.append(e, X.fromTag("br")),
        e
    }, Cn = function(e, t, n) {
        var r = mn(e, t);
        return P.each(n, function(e, t) {
            null === e ? ht.remove(r, t) : ht.set(r, t, e)
        }),
        r
    }, Rn = function(e) {
        return e
    }, Tn = function(e) {
        return function() {
            return X.fromTag("tr", e.dom())
        }
    }, Dn = function(c, e, l) {
        return {
            row: Tn(e),
            cell: function(e) {
                var r, o, i, t = nt.owner(e.element()), n = X.fromTag(ft.name(e.element()), t.dom()), u = l.getOr(["strong", "em", "b", "i", "span", "font", "h1", "h2", "h3", "h4", "h5", "h6", "p", "div"]), a = 0 < u.length ? (r = e.element(),
                o = n,
                i = u,
                xn.first(r).map(function(e) {
                    var t = i.join(",")
                      , n = St.ancestors(e, t, function(e) {
                        return Ye.eq(e, r)
                    });
                    return A.foldr(n, function(e, t) {
                        var n = fn(t);
                        return tn.append(e, n),
                        n
                    }, o)
                }).getOr(o)) : n;
                return tn.append(a, X.fromTag("br")),
                Qt.copy(e.element(), n),
                Qt.remove(n, "height"),
                1 !== e.colspan() && Qt.remove(e.element(), "width"),
                c(e.element(), n),
                n
            },
            replace: Cn,
            gap: Sn
        }
    }, An = function(e) {
        return {
            row: Tn(e),
            cell: Sn,
            replace: Rn,
            gap: Sn
        }
    }, kn = function(e, t) {
        var n = (t || document).createElement("div");
        return n.innerHTML = e,
        nt.children(X.fromDom(n))
    }, Nn = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "li", "table", "thead", "tbody", "tfoot", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"];
    function En() {
        return {
            up: y.constant({
                selector: It.ancestor,
                closest: It.closest,
                predicate: Bt.ancestor,
                all: nt.parents
            }),
            down: y.constant({
                selector: St.descendants,
                predicate: xt.descendants
            }),
            styles: y.constant({
                get: Qt.get,
                getRaw: Qt.getRaw,
                set: Qt.set,
                remove: Qt.remove
            }),
            attrs: y.constant({
                get: ht.get,
                set: ht.set,
                remove: ht.remove,
                copyTo: function(e, t) {
                    var n = ht.clone(e);
                    ht.setAll(t, n)
                }
            }),
            insert: y.constant({
                before: tn.before,
                after: tn.after,
                afterAll: nn.after,
                append: tn.append,
                appendAll: nn.append,
                prepend: tn.prepend,
                wrap: tn.wrap
            }),
            remove: y.constant({
                unwrap: on.unwrap,
                remove: on.remove
            }),
            create: y.constant({
                nu: X.fromTag,
                clone: function(e) {
                    return X.fromDom(e.dom().cloneNode(!1))
                },
                text: X.fromText
            }),
            query: y.constant({
                comparePosition: function(e, t) {
                    return e.dom().compareDocumentPosition(t.dom())
                },
                prevSibling: nt.prevSibling,
                nextSibling: nt.nextSibling
            }),
            property: y.constant({
                children: nt.children,
                name: ft.name,
                parent: nt.parent,
                isText: ft.isText,
                isComment: ft.isComment,
                isElement: ft.isElement,
                getText: pn.get,
                setText: pn.set,
                isBoundary: function(e) {
                    return !!ft.isElement(e) && ("body" === ft.name(e) || A.contains(Nn, ft.name(e)))
                },
                isEmptyTag: function(e) {
                    return !!ft.isElement(e) && A.contains(["br", "img", "hr", "input"], ft.name(e))
                }
            }),
            eq: Ye.eq,
            is: Ye.is
        }
    }
    q.immutable("left", "right");
    var On = function(r, o, e, t) {
        var n = o(r, e);
        return A.foldr(t, function(e, t) {
            var n = o(r, t);
            return Bn(r, e, n)
        }, n)
    }
      , Bn = function(t, e, n) {
        return e.bind(function(e) {
            return n.filter(y.curry(t.eq, e))
        })
    }
      , Pn = function(e, t, n) {
        return 0 < n.length ? On(e, t, (r = n)[0], r.slice(1)) : x.none();
        var r
    }
      , In = function(e, t) {
        return y.curry(e.eq, t)
    }
      , Wn = function(t, e, n, r) {
        var o = r !== undefined ? r : y.constant(!1)
          , i = [e].concat(t.up().all(e))
          , u = [n].concat(t.up().all(n))
          , a = function(t) {
            return A.findIndex(t, o).fold(function() {
                return t
            }, function(e) {
                return t.slice(0, e + 1)
            })
        }
          , c = a(i)
          , l = a(u)
          , s = A.find(c, function(e) {
            return A.exists(l, In(t, e))
        });
        return {
            firstpath: y.constant(c),
            secondpath: y.constant(l),
            shared: y.constant(s)
        }
    }
      , Mn = Wn
      , Ln = function(e, t, n) {
        return Pn(e, t, n)
    }
      , qn = function(e, t, n, r) {
        return Mn(e, t, n, r)
    }
      , Fn = En()
      , jn = function(n, e) {
        return Ln(Fn, function(e, t) {
            return n(t)
        }, e)
    }
      , zn = function(e, t, n) {
        return qn(Fn, e, t, n)
    }
      , _n = function(e, t) {
        return t.column() >= e.startCol() && t.column() + t.colspan() - 1 <= e.finishCol() && t.row() >= e.startRow() && t.row() + t.rowspan() - 1 <= e.finishRow()
    }
      , Hn = function(e, t) {
        var n = t.column()
          , r = t.column() + t.colspan() - 1
          , o = t.row()
          , i = t.row() + t.rowspan() - 1;
        return n <= e.finishCol() && r >= e.startCol() && o <= e.finishRow() && i >= e.startRow()
    }
      , Vn = function(e, t) {
        for (var n = !0, r = y.curry(_n, t), o = t.startRow(); o <= t.finishRow(); o++)
            for (var i = t.startCol(); i <= t.finishCol(); i++)
                n = n && Ut.getAt(e, o, i).exists(r);
        return n ? x.some(t) : x.none()
    }
      , Un = function(e, t, n) {
        var r = Ut.findItem(e, t, Ye.eq)
          , o = Ut.findItem(e, n, Ye.eq);
        return r.bind(function(r) {
            return o.map(function(e) {
                return t = r,
                n = e,
                U.bounds(Math.min(t.row(), n.row()), Math.min(t.column(), n.column()), Math.max(t.row() + t.rowspan() - 1, n.row() + n.rowspan() - 1), Math.max(t.column() + t.colspan() - 1, n.column() + n.colspan() - 1));
                var t, n
            })
        })
    }
      , Gn = Un
      , Xn = function(t, e, n) {
        return Un(t, e, n).bind(function(e) {
            return Vn(t, e)
        })
    }
      , Yn = function(r, e, o, i) {
        return Ut.findItem(r, e, Ye.eq).bind(function(e) {
            var t = 0 < o ? e.row() + e.rowspan() - 1 : e.row()
              , n = 0 < i ? e.column() + e.colspan() - 1 : e.column();
            return Ut.getAt(r, t + o, n + i).map(function(e) {
                return e.element()
            })
        })
    }
      , Kn = function(n, e, t) {
        return Gn(n, e, t).map(function(e) {
            var t = Ut.filterItems(n, y.curry(Hn, e));
            return A.map(t, function(e) {
                return e.element()
            })
        })
    }
      , $n = function(e, t) {
        return Ut.findItem(e, t, function(e, t) {
            return Ye.contains(t, e)
        }).bind(function(e) {
            return e.element()
        })
    }
      , Jn = function(e) {
        var t = zt(e);
        return Ut.generate(t)
    }
      , Qn = function(n, r, o) {
        return jt.table(n).bind(function(e) {
            var t = Jn(e);
            return Yn(t, n, r, o)
        })
    }
      , Zn = function(e, t, n) {
        var r = Jn(e);
        return Kn(r, t, n)
    }
      , er = function(e, t, n, r, o) {
        var i = Jn(e)
          , u = Ye.eq(e, n) ? t : $n(i, t)
          , a = Ye.eq(e, o) ? r : $n(i, r);
        return Kn(i, u, a)
    }
      , tr = function(e, t, n) {
        var r = Jn(e);
        return Xn(r, t, n)
    }
      , nr = function(e, t) {
        return It.ancestor(e, "table")
    }
      , rr = q.immutableBag(["boxes", "start", "finish"], [])
      , or = function(a, c, r) {
        var l = function(t) {
            return function(e) {
                return r(e) || Ye.eq(e, t)
            }
        };
        return Ye.eq(a, c) ? x.some(rr({
            boxes: x.some([a]),
            start: a,
            finish: c
        })) : nr(a).bind(function(u) {
            return nr(c).bind(function(i) {
                if (Ye.eq(u, i))
                    return x.some(rr({
                        boxes: Zn(u, a, c),
                        start: a,
                        finish: c
                    }));
                if (Ye.contains(u, i)) {
                    var e = 0 < (t = St.ancestors(c, "td,th", l(u))).length ? t[t.length - 1] : c;
                    return x.some(rr({
                        boxes: er(u, a, u, c, i),
                        start: a,
                        finish: e
                    }))
                }
                if (Ye.contains(i, u)) {
                    var t, n = 0 < (t = St.ancestors(a, "td,th", l(i))).length ? t[t.length - 1] : a;
                    return x.some(rr({
                        boxes: er(i, a, u, c, i),
                        start: a,
                        finish: n
                    }))
                }
                return zn(a, c).shared().bind(function(e) {
                    return It.closest(e, "table", r).bind(function(e) {
                        var t = St.ancestors(c, "td,th", l(e))
                          , n = 0 < t.length ? t[t.length - 1] : c
                          , r = St.ancestors(a, "td,th", l(e))
                          , o = 0 < r.length ? r[r.length - 1] : a;
                        return x.some(rr({
                            boxes: er(e, a, u, c, i),
                            start: o,
                            finish: n
                        }))
                    })
                })
            })
        })
    }
      , ir = {
        identify: or,
        retrieve: function(e, t) {
            var n = St.descendants(e, t);
            return 0 < n.length ? x.some(n) : x.none()
        },
        shiftSelection: function(e, t, n, r, o) {
            return (i = e,
            u = o,
            A.find(i, function(e) {
                return te.is(e, u)
            })).bind(function(e) {
                return Qn(e, t, n).bind(function(e) {
                    return t = e,
                    n = r,
                    It.ancestor(t, "table").bind(function(e) {
                        return It.descendant(e, n).bind(function(e) {
                            return or(e, t).bind(function(t) {
                                return t.boxes().map(function(e) {
                                    return {
                                        boxes: y.constant(e),
                                        start: y.constant(t.start()),
                                        finish: y.constant(t.finish())
                                    }
                                })
                            })
                        })
                    });
                    var t, n
                })
            });
            var i, u
        },
        getEdges: function(e, t, r) {
            return It.descendant(e, t).bind(function(n) {
                return It.descendant(e, r).bind(function(t) {
                    return jn(nr, [n, t]).map(function(e) {
                        return {
                            first: y.constant(n),
                            last: y.constant(t),
                            table: y.constant(e)
                        }
                    })
                })
            })
        }
    }
      , ur = function(e, t) {
        return ir.retrieve(e, t)
    }
      , ar = function(o, e, t) {
        return ir.getEdges(o, e, t).bind(function(n) {
            var e = function(e) {
                return Ye.eq(o, e)
            }
              , t = It.ancestor(n.first(), "thead,tfoot,tbody,table", e)
              , r = It.ancestor(n.last(), "thead,tfoot,tbody,table", e);
            return t.bind(function(t) {
                return r.bind(function(e) {
                    return Ye.eq(t, e) ? tr(n.table(), n.first(), n.last()) : x.none()
                })
            })
        })
    }
      , cr = "data-mce-selected"
      , lr = "data-mce-first-selected"
      , sr = "data-mce-last-selected"
      , fr = {
        selected: y.constant(cr),
        selectedSelector: y.constant("td[data-mce-selected],th[data-mce-selected]"),
        attributeSelector: y.constant("[data-mce-selected]"),
        firstSelected: y.constant(lr),
        firstSelectedSelector: y.constant("td[data-mce-first-selected],th[data-mce-first-selected]"),
        lastSelected: y.constant(sr),
        lastSelectedSelector: y.constant("td[data-mce-last-selected],th[data-mce-last-selected]")
    }
      , dr = function(u) {
        if (!W.isArray(u))
            throw new Error("cases must be an array");
        if (0 === u.length)
            throw new Error("there must be at least one case");
        var a = []
          , n = {};
        return A.each(u, function(e, r) {
            var t = P.keys(e);
            if (1 !== t.length)
                throw new Error("one and only one name per case");
            var o = t[0]
              , i = e[o];
            if (n[o] !== undefined)
                throw new Error("duplicate key detected:" + o);
            if ("cata" === o)
                throw new Error("cannot have a case named cata (sorry)");
            if (!W.isArray(i))
                throw new Error("case arguments must be an array");
            a.push(o),
            n[o] = function() {
                var e = arguments.length;
                if (e !== i.length)
                    throw new Error("Wrong number of arguments to case " + o + ". Expected " + i.length + " (" + i + "), got " + e);
                for (var n = new Array(e), t = 0; t < n.length; t++)
                    n[t] = arguments[t];
                return {
                    fold: function() {
                        if (arguments.length !== u.length)
                            throw new Error("Wrong number of arguments to fold. Expected " + u.length + ", got " + arguments.length);
                        return arguments[r].apply(null, n)
                    },
                    match: function(e) {
                        var t = P.keys(e);
                        if (a.length !== t.length)
                            throw new Error("Wrong number of arguments to match. Expected: " + a.join(",") + "\nActual: " + t.join(","));
                        if (!A.forall(a, function(e) {
                            return A.contains(t, e)
                        }))
                            throw new Error("Not all branches were specified when using match. Specified: " + t.join(", ") + "\nRequired: " + a.join(", "));
                        return e[o].apply(null, n)
                    },
                    log: function(e) {
                        console.log(e, {
                            constructors: a,
                            constructor: o,
                            params: n
                        })
                    }
                }
            }
        }),
        n
    }
      , mr = dr([{
        none: []
    }, {
        multiple: ["elements"]
    }, {
        single: ["selection"]
    }])
      , gr = {
        cata: function(e, t, n, r) {
            return e.fold(t, n, r)
        },
        none: mr.none,
        multiple: mr.multiple,
        single: mr.single
    }
      , pr = function(e, t) {
        return gr.cata(t.get(), y.constant([]), y.identity, y.constant([e]))
    }
      , hr = function(n, e) {
        return gr.cata(e.get(), x.none, function(t, e) {
            return 0 === t.length ? x.none() : ar(n, fr.firstSelectedSelector(), fr.lastSelectedSelector()).bind(function(e) {
                return 1 < t.length ? x.some({
                    bounds: y.constant(e),
                    cells: y.constant(t)
                }) : x.none()
            })
        }, x.none)
    }
      , vr = function(e, t) {
        var n = pr(e, t);
        return 0 < n.length && A.forall(n, function(e) {
            return ht.has(e, "rowspan") && 1 < parseInt(ht.get(e, "rowspan"), 10) || ht.has(e, "colspan") && 1 < parseInt(ht.get(e, "colspan"), 10)
        }) ? x.some(n) : x.none()
    }
      , br = pr
      , wr = function(e) {
        return {
            element: y.constant(e),
            mergable: x.none,
            unmergable: x.none,
            selection: y.constant([e])
        }
    }
      , yr = q.immutable("element", "clipboard", "generators")
      , xr = {
        noMenu: wr,
        forMenu: function(e, t, n) {
            return {
                element: y.constant(n),
                mergable: y.constant(hr(t, e)),
                unmergable: y.constant(vr(n, e)),
                selection: y.constant(br(n, e))
            }
        },
        notCell: function(e) {
            return wr(e)
        },
        paste: yr,
        pasteRows: function(e, t, n, r, o) {
            return {
                element: y.constant(n),
                mergable: x.none,
                unmergable: x.none,
                selection: y.constant(br(n, e)),
                clipboard: y.constant(r),
                generators: y.constant(o)
            }
        }
    }
      , Sr = {
        registerEvents: function(a, e, c, l) {
            a.on("BeforeGetContent", function(n) {
                !0 === n.selection && gr.cata(e.get(), y.noop, function(e) {
                    var t;
                    n.preventDefault(),
                    (t = e,
                    jt.table(t[0]).map(dn).map(function(e) {
                        return [an(e, fr.attributeSelector())]
                    })).each(function(e) {
                        n.content = A.map(e, function(e) {
                            return t = e,
                            a.selection.serializer.serialize(t.dom(), {});
                            var t
                        }).join("")
                    })
                }, y.noop)
            }),
            a.on("BeforeSetContent", function(u) {
                !0 === u.selection && !0 === u.paste && x.from(a.dom.getParent(a.selection.getStart(), "th,td")).each(function(e) {
                    var i = X.fromDom(e);
                    jt.table(i).bind(function(t) {
                        var e = A.filter(kn(u.content), function(e) {
                            return "meta" !== ft.name(e)
                        });
                        if (1 === e.length && "table" === ft.name(e[0])) {
                            u.preventDefault();
                            var n = X.fromDom(a.getDoc())
                              , r = An(n)
                              , o = xr.paste(i, e[0], r);
                            c.pasteCells(t, o).each(function(e) {
                                a.selection.setRng(e),
                                a.focus(),
                                l.clear(t)
                            })
                        }
                    })
                })
            })
        }
    };
    function Cr(r, o) {
        var e = function(e) {
            var t = o(e);
            if (t <= 0 || null === t) {
                var n = Qt.get(e, r);
                return parseFloat(n) || 0
            }
            return t
        }
          , i = function(o, e) {
            return A.foldl(e, function(e, t) {
                var n = Qt.get(o, t)
                  , r = n === undefined ? 0 : parseInt(n, 10);
                return isNaN(r) ? e : e + r
            }, 0)
        };
        return {
            set: function(e, t) {
                if (!W.isNumber(t) && !t.match(/^[0-9]+$/))
                    throw r + ".set accepts only positive integer values. Value was " + t;
                var n = e.dom();
                Gt.isSupported(n) && (n.style[r] = t + "px")
            },
            get: e,
            getOuter: e,
            aggregate: i,
            max: function(e, t, n) {
                var r = i(e, n);
                return r < t ? t - r : 0
            }
        }
    }
    var Rr = Cr("height", function(e) {
        return wt.inBody(e) ? e.dom().getBoundingClientRect().height : e.dom().offsetHeight
    })
      , Tr = function(e) {
        return Rr.get(e)
    }
      , Dr = function(e) {
        return Rr.getOuter(e)
    }
      , Ar = Cr("width", function(e) {
        return e.dom().offsetWidth
    })
      , kr = function(e) {
        return Ar.get(e)
    }
      , Nr = function(e) {
        return Ar.getOuter(e)
    }
      , Er = Ue.detect()
      , Or = function(e, t, n) {
        return r = Qt.get(e, t),
        o = n,
        i = parseFloat(r),
        isNaN(i) ? o : i;
        var r, o, i
    }
      , Br = function(e) {
        return Er.browser.isIE() || Er.browser.isEdge() ? (n = Or(t = e, "padding-top", 0),
        r = Or(t, "padding-bottom", 0),
        o = Or(t, "border-top-width", 0),
        i = Or(t, "border-bottom-width", 0),
        u = t.dom().getBoundingClientRect().height,
        "border-box" === Qt.get(t, "box-sizing") ? u : u - n - r - (o + i)) : Or(e, "height", Tr(e));
        var t, n, r, o, i, u
    }
      , Pr = /(\d+(\.\d+)?)(\w|%)*/
      , Ir = /(\d+(\.\d+)?)%/
      , Wr = /(\d+(\.\d+)?)px|em/
      , Mr = function(e, t) {
        Qt.set(e, "height", t + "px")
    }
      , Lr = function(e, t, n, r) {
        var o, i, u, a, c, l = parseInt(e, 10);
        return qe.endsWith(e, "%") && "table" !== ft.name(t) ? (o = t,
        i = l,
        u = n,
        a = r,
        c = jt.table(o).map(function(e) {
            var t = u(e);
            return Math.floor(i / 100 * t)
        }).getOr(i),
        a(o, c),
        c) : l
    }
      , qr = function(e) {
        var t, n = (t = e,
        Qt.getRaw(t, "height").getOrThunk(function() {
            return Br(t) + "px"
        }));
        return n ? Lr(n, e, Tr, Mr) : Tr(e)
    }
      , Fr = function(e, t) {
        return ht.has(e, t) ? parseInt(ht.get(e, t), 10) : 1
    }
      , jr = function(e) {
        return Qt.getRaw(e, "width").fold(function() {
            return x.from(ht.get(e, "width"))
        }, function(e) {
            return x.some(e)
        })
    }
      , zr = function(e, t) {
        return e / t.pixelWidth() * 100
    }
      , _r = {
        percentageBasedSizeRegex: y.constant(Ir),
        pixelBasedSizeRegex: y.constant(Wr),
        setPixelWidth: function(e, t) {
            Qt.set(e, "width", t + "px")
        },
        setPercentageWidth: function(e, t) {
            Qt.set(e, "width", t + "%")
        },
        setHeight: Mr,
        getPixelWidth: function(t, n) {
            return jr(t).fold(function() {
                var e = kr(t);
                return parseInt(e, 10)
            }, function(e) {
                return function(e, t, n) {
                    if (Wr.test(t)) {
                        var r = Wr.exec(t);
                        return parseInt(r[1], 10)
                    }
                    if (Ir.test(t)) {
                        var o = Ir.exec(t)
                          , i = parseFloat(o[1]);
                        return i / 100 * n.pixelWidth()
                    }
                    var u = kr(e);
                    return parseInt(u, 10)
                }(t, e, n)
            })
        },
        getPercentageWidth: function(n, r) {
            return jr(n).fold(function() {
                var e = kr(n)
                  , t = parseInt(e, 10);
                return zr(t, r)
            }, function(e) {
                return function(e, t, n) {
                    if (Ir.test(t)) {
                        var r = Ir.exec(t);
                        return parseFloat(r[1])
                    }
                    var o = kr(e)
                      , i = parseInt(o, 10);
                    return zr(i, n)
                }(n, e, r)
            })
        },
        getGenericWidth: function(e) {
            return jr(e).bind(function(e) {
                if (Pr.test(e)) {
                    var t = Pr.exec(e);
                    return x.some({
                        width: y.constant(t[1]),
                        unit: y.constant(t[3])
                    })
                }
                return x.none()
            })
        },
        setGenericWidth: function(e, t, n) {
            Qt.set(e, "width", t + n)
        },
        getHeight: function(e) {
            return n = "rowspan",
            qr(t = e) / Fr(t, n);
            var t, n
        },
        getRawWidth: jr
    }
      , Hr = function(n, r) {
        _r.getGenericWidth(n).each(function(e) {
            var t = e.width() / 2;
            _r.setGenericWidth(n, t, e.unit()),
            _r.setGenericWidth(r, t, e.unit())
        })
    }
      , Vr = function(e, t) {
        var n = t || X.fromDom(document.documentElement);
        return Bt.ancestor(e, y.curry(Ye.eq, n)).isSome()
    }
      , Ur = function(e) {
        var t = e.dom();
        return t === t.window ? e : ft.isDocument(e) ? t.defaultView || t.parentWindow : null
    }
      , Gr = function(n, r) {
        return {
            left: y.constant(n),
            top: y.constant(r),
            translate: function(e, t) {
                return Gr(n + e, r + t)
            }
        }
    }
      , Xr = function(e, t) {
        return e !== undefined ? e : t !== undefined ? t : 0
    }
      , Yr = function(e) {
        var t, n = e.dom(), r = n.ownerDocument, o = r.body, i = X.fromDom(r.documentElement);
        return o === n ? Gr(o.offsetLeft, o.offsetTop) : Vr(e, i) ? (t = n.getBoundingClientRect(),
        Gr(t.left, t.top)) : Gr(0, 0)
    }
      , Kr = function(e) {
        var t = e.dom().ownerDocument
          , n = t.body
          , r = Ur(X.fromDom(t))
          , o = t.documentElement
          , i = Xr(r.pageYOffset, o.scrollTop)
          , u = Xr(r.pageXOffset, o.scrollLeft)
          , a = Xr(o.clientTop, n.clientTop)
          , c = Xr(o.clientLeft, n.clientLeft);
        return Yr(e).translate(u - c, i - a)
    }
      , $r = q.immutable("row", "y")
      , Jr = q.immutable("col", "x")
      , Qr = function(e) {
        return Kr(e).left() + Nr(e)
    }
      , Zr = function(e) {
        return Kr(e).left()
    }
      , eo = function(e, t) {
        return Jr(e, Zr(t))
    }
      , to = function(e, t) {
        return Jr(e, Qr(t))
    }
      , no = function(e) {
        return Kr(e).top()
    }
      , ro = function(n, t, r) {
        if (0 === r.length)
            return [];
        var e = A.map(r.slice(1), function(e, t) {
            return e.map(function(e) {
                return n(t, e)
            })
        })
          , o = r[r.length - 1].map(function(e) {
            return t(r.length - 1, e)
        });
        return e.concat([o])
    }
      , oo = {
        delta: y.identity,
        positions: y.curry(ro, function(e, t) {
            return $r(e, no(t))
        }, function(e, t) {
            return $r(e, no(t) + Dr(t))
        }),
        edge: no
    }
      , io = {
        delta: y.identity,
        edge: Zr,
        positions: y.curry(ro, eo, to)
    }
      , uo = {
        height: oo,
        rtl: {
            delta: function(e, t) {
                return -e
            },
            edge: Qr,
            positions: y.curry(ro, to, eo)
        },
        ltr: io
    }
      , ao = {
        ltr: uo.ltr,
        rtl: uo.rtl
    };
    function co(t) {
        var n = function(e) {
            return t(e).isRtl() ? ao.rtl : ao.ltr
        };
        return {
            delta: function(e, t) {
                return n(t).delta(e, t)
            },
            edge: function(e) {
                return n(e).edge(e)
            },
            positions: function(e, t) {
                return n(t).positions(e, t)
            }
        }
    }
    var lo = function(e) {
        var t = zt(e);
        return Ut.generate(t).grid()
    }
      , so = function(e) {
        var t = e
          , n = function() {
            return t
        };
        return {
            get: n,
            set: function(e) {
                t = e
            },
            clone: function() {
                return so(n())
            }
        }
    }
      , fo = function(e, t) {
        return mo(e, t, {
            validate: W.isFunction,
            label: "function"
        })
    }
      , mo = function(r, o, i) {
        if (0 === o.length)
            throw new Error("You must specify at least one required field.");
        return L.validateStrArr("required", o),
        L.checkDupes(o),
        function(t) {
            var n = P.keys(t);
            A.forall(o, function(e) {
                return A.contains(n, e)
            }) || L.reqMessage(o, n),
            r(o, n);
            var e = A.filter(o, function(e) {
                return !i.validate(t[e], e)
            });
            return 0 < e.length && L.invalidTypeMessage(e, i.label),
            t
        }
    }
      , go = y.noop
      , po = {
        exactly: y.curry(fo, function(t, e) {
            var n = A.filter(e, function(e) {
                return !A.contains(t, e)
            });
            0 < n.length && L.unsuppMessage(n)
        }),
        ensure: y.curry(fo, go),
        ensureWith: y.curry(mo, go)
    }
      , ho = function(e) {
        var t = ht.has(e, "colspan") ? parseInt(ht.get(e, "colspan"), 10) : 1
          , n = ht.has(e, "rowspan") ? parseInt(ht.get(e, "rowspan"), 10) : 1;
        return {
            element: y.constant(e),
            colspan: y.constant(t),
            rowspan: y.constant(n)
        }
    }
      , vo = po.exactly(["cell", "row", "replace", "gap"])
      , bo = function(r, e) {
        vo(r);
        var n = so(x.none())
          , o = e !== undefined ? e : ho
          , i = function(e) {
            var t, n = o(e);
            return t = n,
            r.cell(t)
        }
          , u = function(e) {
            var t = i(e);
            return n.get().isNone() && n.set(x.some(t)),
            a = x.some({
                item: e,
                replacement: t
            }),
            t
        }
          , a = x.none();
        return {
            getOrInit: function(t, n) {
                return a.fold(function() {
                    return u(t)
                }, function(e) {
                    return n(t, e.item) ? e.replacement : u(t)
                })
            },
            cursor: n.get
        }
    }
      , wo = function(o, a) {
        return function(n) {
            var r = so(x.none());
            vo(n);
            var i = []
              , u = function(e) {
                var t = n.replace(e, a, {
                    scope: o
                });
                return i.push({
                    item: e,
                    sub: t
                }),
                r.get().isNone() && r.set(x.some(t)),
                t
            };
            return {
                replaceOrInit: function(t, n) {
                    return (r = t,
                    o = n,
                    A.find(i, function(e) {
                        return o(e.item, r)
                    })).fold(function() {
                        return u(t)
                    }, function(e) {
                        return n(t, e.item) ? e.sub : u(t)
                    });
                    var r, o
                },
                cursor: r.get
            }
        }
    }
      , yo = function(n) {
        vo(n);
        var e = so(x.none());
        return {
            combine: function(t) {
                return e.get().isNone() && e.set(x.some(t)),
                function() {
                    var e = n.cell({
                        element: y.constant(t),
                        colspan: y.constant(1),
                        rowspan: y.constant(1)
                    });
                    return Qt.remove(e, "width"),
                    Qt.remove(t, "width"),
                    e
                }
            },
            cursor: e.get
        }
    }
      , xo = ["body", "p", "div", "article", "aside", "figcaption", "figure", "footer", "header", "nav", "section", "ol", "ul", "table", "thead", "tfoot", "tbody", "caption", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "address"]
      , So = function(e, t) {
        var n = e.property().name(t);
        return A.contains(xo, n)
    }
      , Co = function(e, t) {
        return A.contains(["br", "img", "hr", "input"], e.property().name(t))
    }
      , Ro = So
      , To = function(e, t) {
        var n = e.property().name(t);
        return A.contains(["ol", "ul"], n)
    }
      , Do = Co
      , Ao = En()
      , ko = function(e) {
        return Ro(Ao, e)
    }
      , No = function(e) {
        return To(Ao, e)
    }
      , Eo = function(e) {
        return Do(Ao, e)
    }
      , Oo = function(e) {
        var t, i = function(e) {
            return "br" === ft.name(e)
        }, r = function(o) {
            return xn.last(o).bind(function(n) {
                var e, r = (e = n,
                nt.nextSibling(e).map(function(e) {
                    return !!ko(e) || (Eo(e) ? "img" !== ft.name(e) : void 0)
                }).getOr(!1));
                return nt.parent(n).map(function(e) {
                    return !0 === r || (t = e,
                    "li" === ft.name(t) || Bt.ancestor(t, No).isSome()) || i(n) || ko(e) && !Ye.eq(o, e) ? [] : [X.fromTag("br")];
                    var t
                })
            }).getOr([])
        }, n = 0 === (t = A.bind(e, function(e) {
            var t, n = nt.children(e);
            return t = n,
            A.forall(t, function(e) {
                return i(e) || ft.isText(e) && 0 === pn.get(e).trim().length
            }) ? [] : n.concat(r(e))
        })).length ? [X.fromTag("br")] : t;
        on.empty(e[0]),
        nn.append(e[0], n)
    }
      , Bo = function(u) {
        return function() {
            for (var e = new Array(arguments.length), t = 0; t < e.length; t++)
                e[t] = arguments[t];
            if (0 === e.length)
                throw new Error("Can't merge zero objects");
            for (var n = {}, r = 0; r < e.length; r++) {
                var o = e[r];
                for (var i in o)
                    o.hasOwnProperty(i) && (n[i] = u(n[i], o[i]))
            }
            return n
        }
    }
      , Po = Bo(function(e, t) {
        return W.isObject(e) && W.isObject(t) ? Po(e, t) : t
    })
      , Io = Bo(function(e, t) {
        return t
    })
      , Wo = {
        deepMerge: Po,
        merge: Io
    }
      , Mo = function(e) {
        for (var t = [], n = function(e) {
            t.push(e)
        }, r = 0; r < e.length; r++)
            e[r].each(n);
        return t
    }
      , Lo = function(e, t) {
        for (var n = 0; n < e.length; n++) {
            var r = t(e[n], n);
            if (r.isSome())
                return r
        }
        return x.none()
    }
      , qo = function(e, t) {
        return U.rowcells(t, e.section())
    }
      , Fo = function(e, t) {
        return e.cells()[t]
    }
      , jo = {
        addCell: function(e, t, n) {
            var r = e.cells()
              , o = r.slice(0, t)
              , i = r.slice(t)
              , u = o.concat([n]).concat(i);
            return qo(e, u)
        },
        setCells: qo,
        mutateCell: function(e, t, n) {
            e.cells()[t] = n
        },
        getCell: Fo,
        getCellElement: function(e, t) {
            return Fo(e, t).element()
        },
        mapCells: function(e, t) {
            var n = e.cells()
              , r = A.map(n, t);
            return U.rowcells(r, e.section())
        },
        cellLength: function(e) {
            return e.cells().length
        }
    }
      , zo = function(e, t) {
        if (0 === e.length)
            return 0;
        var n = e[0];
        return A.findIndex(e, function(e) {
            return !t(n.element(), e.element())
        }).fold(function() {
            return e.length
        }, function(e) {
            return e
        })
    }
      , _o = function(e, t, n, r) {
        var o, i, u, a, c = (o = e,
        i = t,
        o[i]).cells().slice(n), l = zo(c, r), s = (u = e,
        a = n,
        A.map(u, function(e) {
            return jo.getCell(e, a)
        })).slice(t), f = zo(s, r);
        return {
            colspan: y.constant(l),
            rowspan: y.constant(f)
        }
    }
      , Ho = function(o, i) {
        var u = A.map(o, function(e, t) {
            return A.map(e.cells(), function(e, t) {
                return !1
            })
        });
        return A.map(o, function(e, r) {
            var t = A.bind(e.cells(), function(e, t) {
                if (!1 === u[r][t]) {
                    var n = _o(o, r, t, i);
                    return function(e, t, n, r) {
                        for (var o = e; o < e + n; o++)
                            for (var i = t; i < t + r; i++)
                                u[o][i] = !0
                    }(r, t, n.rowspan(), n.colspan()),
                    [U.detailnew(e.element(), n.rowspan(), n.colspan(), e.isNew())]
                }
                return []
            });
            return U.rowdetails(t, e.section())
        })
    }
      , Vo = function(e, t, n) {
        for (var r = [], o = 0; o < e.grid().rows(); o++) {
            for (var i = [], u = 0; u < e.grid().columns(); u++) {
                var a = Ut.getAt(e, o, u).map(function(e) {
                    return U.elementnew(e.element(), n)
                }).getOrThunk(function() {
                    return U.elementnew(t.gap(), !0)
                });
                i.push(a)
            }
            var c = U.rowcells(i, e.all()[o].section());
            r.push(c)
        }
        return r
    }
      , Uo = function(e, t, n, r) {
        n === r ? ht.remove(e, t) : ht.set(e, t, n)
    }
      , Go = function(o, e) {
        var i = []
          , u = []
          , t = function(e, t) {
            var n;
            0 < e.length ? function(e, t) {
                var n = It.child(o, t).getOrThunk(function() {
                    var e = X.fromTag(t, nt.owner(o).dom());
                    return tn.append(o, e),
                    e
                });
                on.empty(n);
                var r = A.map(e, function(e) {
                    e.isNew() && i.push(e.element());
                    var t = e.element();
                    return on.empty(t),
                    A.each(e.cells(), function(e) {
                        e.isNew() && u.push(e.element()),
                        Uo(e.element(), "colspan", e.colspan(), 1),
                        Uo(e.element(), "rowspan", e.rowspan(), 1),
                        tn.append(t, e.element())
                    }),
                    t
                });
                nn.append(n, r)
            }(e, t) : (n = t,
            It.child(o, n).bind(on.remove))
        }
          , n = []
          , r = []
          , a = [];
        return A.each(e, function(e) {
            switch (e.section()) {
            case "thead":
                n.push(e);
                break;
            case "tbody":
                r.push(e);
                break;
            case "tfoot":
                a.push(e)
            }
        }),
        t(n, "thead"),
        t(r, "tbody"),
        t(a, "tfoot"),
        {
            newRows: y.constant(i),
            newCells: y.constant(u)
        }
    }
      , Xo = function(e) {
        return A.map(e, function(e) {
            var n = fn(e.element());
            return A.each(e.cells(), function(e) {
                var t = dn(e.element());
                Uo(t, "colspan", e.colspan(), 1),
                Uo(t, "rowspan", e.rowspan(), 1),
                tn.append(n, t)
            }),
            n
        })
    }
      , Yo = function(e, t) {
        for (var n = [], r = 0; r < e; r++)
            n.push(t(r));
        return n
    }
      , Ko = function(e, t) {
        for (var n = [], r = e; r < t; r++)
            n.push(r);
        return n
    }
      , $o = function(t, n) {
        if (n < 0 || n >= t.length - 1)
            return x.none();
        var e = t[n].fold(function() {
            var e = A.reverse(t.slice(0, n));
            return Lo(e, function(e, t) {
                return e.map(function(e) {
                    return {
                        value: e,
                        delta: t + 1
                    }
                })
            })
        }, function(e) {
            return x.some({
                value: e,
                delta: 0
            })
        })
          , r = t[n + 1].fold(function() {
            var e = t.slice(n + 1);
            return Lo(e, function(e, t) {
                return e.map(function(e) {
                    return {
                        value: e,
                        delta: t + 1
                    }
                })
            })
        }, function(e) {
            return x.some({
                value: e,
                delta: 1
            })
        });
        return e.bind(function(n) {
            return r.map(function(e) {
                var t = e.delta + n.delta;
                return Math.abs(e.value - n.value) / t
            })
        })
    }
      , Jo = function(e, t, n) {
        var r = e();
        return A.find(r, t).orThunk(function() {
            return x.from(r[0]).orThunk(n)
        }).map(function(e) {
            return e.element()
        })
    }
      , Qo = function(n) {
        var e = n.grid()
          , t = Ko(0, e.columns())
          , r = Ko(0, e.rows());
        return A.map(t, function(t) {
            return Jo(function() {
                return A.bind(r, function(e) {
                    return Ut.getAt(n, e, t).filter(function(e) {
                        return e.column() === t
                    }).fold(y.constant([]), function(e) {
                        return [e]
                    })
                })
            }, function(e) {
                return 1 === e.colspan()
            }, function() {
                return Ut.getAt(n, 0, t)
            })
        })
    }
      , Zo = function(n) {
        var e = n.grid()
          , t = Ko(0, e.rows())
          , r = Ko(0, e.columns());
        return A.map(t, function(t) {
            return Jo(function() {
                return A.bind(r, function(e) {
                    return Ut.getAt(n, t, e).filter(function(e) {
                        return e.row() === t
                    }).fold(y.constant([]), function(e) {
                        return [e]
                    })
                })
            }, function(e) {
                return 1 === e.rowspan()
            }, function() {
                return Ut.getAt(n, t, 0)
            })
        })
    }
      , ei = function(e, t, n, r, o) {
        var i = X.fromTag("div");
        return Qt.setAll(i, {
            position: "absolute",
            left: t - r / 2 + "px",
            top: n + "px",
            height: o + "px",
            width: r + "px"
        }),
        ht.setAll(i, {
            "data-column": e,
            role: "presentation"
        }),
        i
    }
      , ti = function(e, t, n, r, o) {
        var i = X.fromTag("div");
        return Qt.setAll(i, {
            position: "absolute",
            left: t + "px",
            top: n - o / 2 + "px",
            height: o + "px",
            width: r + "px"
        }),
        ht.setAll(i, {
            "data-row": e,
            role: "presentation"
        }),
        i
    }
      , ni = function(e) {
        var t = e.replace(/\./g, "-");
        return {
            resolve: function(e) {
                return t + "-" + e
            }
        }
    }
      , ri = {
        resolve: ni("ephox-snooker").resolve
    }
      , oi = function(e, t) {
        var n = ht.get(e, t);
        return n === undefined || "" === n ? [] : n.split(" ")
    }
      , ii = oi
      , ui = function(e, t, n) {
        var r = oi(e, t).concat([n]);
        ht.set(e, t, r.join(" "))
    }
      , ai = function(e, t, n) {
        var r = A.filter(oi(e, t), function(e) {
            return e !== n
        });
        0 < r.length ? ht.set(e, t, r.join(" ")) : ht.remove(e, t)
    }
      , ci = function(e) {
        return ii(e, "class")
    }
      , li = function(e, t) {
        return ui(e, "class", t)
    }
      , si = function(e, t) {
        return ai(e, "class", t)
    }
      , fi = ci
      , di = li
      , mi = si
      , gi = function(e, t) {
        A.contains(ci(e), t) ? si(e, t) : li(e, t)
    }
      , pi = function(e) {
        return e.dom().classList !== undefined
    }
      , hi = function(e, t) {
        return pi(e) && e.dom().classList.contains(t)
    }
      , vi = {
        add: function(e, t) {
            pi(e) ? e.dom().classList.add(t) : di(e, t)
        },
        remove: function(e, t) {
            var n;
            pi(e) ? e.dom().classList.remove(t) : mi(e, t),
            0 === (pi(n = e) ? n.dom().classList : fi(n)).length && ht.remove(n, "class")
        },
        toggle: function(e, t) {
            return pi(e) ? e.dom().classList.toggle(t) : gi(e, t)
        },
        toggler: function(e, t) {
            var n, r, o, i, u, a, c = pi(e), l = e.dom().classList;
            return n = function() {
                c ? l.remove(t) : mi(e, t)
            }
            ,
            r = function() {
                c ? l.add(t) : di(e, t)
            }
            ,
            o = hi(e, t),
            i = o || !1,
            {
                on: u = function() {
                    r(),
                    i = !0
                }
                ,
                off: a = function() {
                    n(),
                    i = !1
                }
                ,
                toggle: function() {
                    (i ? a : u)()
                },
                isOn: function() {
                    return i
                }
            }
        },
        has: hi
    }
      , bi = ri.resolve("resizer-bar")
      , wi = ri.resolve("resizer-rows")
      , yi = ri.resolve("resizer-cols")
      , xi = function(e) {
        var t = St.descendants(e.parent(), "." + bi);
        A.each(t, on.remove)
    }
      , Si = function(n, e, r) {
        var o = n.origin();
        A.each(e, function(e, t) {
            e.each(function(e) {
                var t = r(o, e);
                vi.add(t, bi),
                tn.append(n.parent(), t)
            })
        })
    }
      , Ci = function(e, t, n, r, o, i) {
        var u, a, c, l, s = Kr(t), f = 0 < n.length ? o.positions(n, t) : [];
        u = e,
        a = f,
        c = s,
        l = Nr(t),
        Si(u, a, function(e, t) {
            var n = ti(t.row(), c.left() - e.left(), t.y() - e.top(), l, 7);
            return vi.add(n, wi),
            n
        });
        var d, m, g, p, h = 0 < r.length ? i.positions(r, t) : [];
        d = e,
        m = h,
        g = s,
        p = Dr(t),
        Si(d, m, function(e, t) {
            var n = ei(t.col(), t.x() - e.left(), g.top() - e.top(), 7, p);
            return vi.add(n, yi),
            n
        })
    }
      , Ri = function(e, t) {
        var n = St.descendants(e.parent(), "." + bi);
        A.each(n, t)
    }
      , Ti = {
        refresh: function(e, t, n, r) {
            xi(e);
            var o = zt(t)
              , i = Ut.generate(o)
              , u = Zo(i)
              , a = Qo(i);
            Ci(e, t, u, a, n, r)
        },
        hide: function(e) {
            Ri(e, function(e) {
                Qt.set(e, "display", "none")
            })
        },
        show: function(e) {
            Ri(e, function(e) {
                Qt.set(e, "display", "block")
            })
        },
        destroy: xi,
        isRowBar: function(e) {
            return vi.has(e, wi)
        },
        isColBar: function(e) {
            return vi.has(e, yi)
        }
    }
      , Di = function(e, r) {
        return A.map(e, function(e) {
            var t, n = (t = e.details(),
            Lo(t, function(e) {
                return nt.parent(e.element()).map(function(e) {
                    var t = nt.parent(e).isNone();
                    return U.elementnew(e, t)
                })
            }).getOrThunk(function() {
                return U.elementnew(r.row(), !0)
            }));
            return U.rowdatanew(n.element(), e.details(), e.section(), n.isNew())
        })
    }
      , Ai = function(e, t) {
        var n = Ho(e, Ye.eq);
        return Di(n, t)
    }
      , ki = function(e, t) {
        var n = A.flatten(A.map(e.all(), function(e) {
            return e.cells()
        }));
        return A.find(n, function(e) {
            return Ye.eq(t, e.element())
        })
    }
      , Ni = function(a, c, l, s, f) {
        return function(n, r, e, o, i) {
            var t = zt(r)
              , u = Ut.generate(t);
            return c(u, e).map(function(e) {
                var t = Vo(u, o, !1)
                  , n = a(t, e, Ye.eq, f(o))
                  , r = Ai(n.grid(), o);
                return {
                    grid: y.constant(r),
                    cursor: n.cursor
                }
            }).fold(function() {
                return x.none()
            }, function(e) {
                var t = Go(r, e.grid());
                return l(r, e.grid(), i),
                s(r),
                Ti.refresh(n, r, uo.height, i),
                x.some({
                    cursor: e.cursor,
                    newRows: t.newRows,
                    newCells: t.newCells
                })
            })
        }
    }
      , Ei = Ai
      , Oi = function(t, e) {
        return jt.cell(e.element()).bind(function(e) {
            return ki(t, e)
        })
    }
      , Bi = function(t, e) {
        var n = A.map(e.selection(), function(e) {
            return jt.cell(e).bind(function(e) {
                return ki(t, e)
            })
        })
          , r = Mo(n);
        return 0 < r.length ? x.some(r) : x.none()
    }
      , Pi = function(t, n) {
        return jt.cell(n.element()).bind(function(e) {
            return ki(t, e).map(function(e) {
                return Wo.merge(e, {
                    generators: n.generators,
                    clipboard: n.clipboard
                })
            })
        })
    }
      , Ii = function(t, e) {
        var n = A.map(e.selection(), function(e) {
            return jt.cell(e).bind(function(e) {
                return ki(t, e)
            })
        })
          , r = Mo(n);
        return 0 < r.length ? x.some(Wo.merge({
            cells: r
        }, {
            generators: e.generators,
            clipboard: e.clipboard
        })) : x.none()
    }
      , Wi = function(e, t) {
        return t.mergable()
    }
      , Mi = function(e, t) {
        return t.unmergable()
    }
      , Li = function(n) {
        return {
            is: function(e) {
                return n === e
            },
            isValue: y.always,
            isError: y.never,
            getOr: y.constant(n),
            getOrThunk: y.constant(n),
            getOrDie: y.constant(n),
            or: function(e) {
                return Li(n)
            },
            orThunk: function(e) {
                return Li(n)
            },
            fold: function(e, t) {
                return t(n)
            },
            map: function(e) {
                return Li(e(n))
            },
            each: function(e) {
                e(n)
            },
            bind: function(e) {
                return e(n)
            },
            exists: function(e) {
                return e(n)
            },
            forall: function(e) {
                return e(n)
            },
            toOption: function() {
                return x.some(n)
            }
        }
    }
      , qi = function(n) {
        return {
            is: y.never,
            isValue: y.never,
            isError: y.always,
            getOr: y.identity,
            getOrThunk: function(e) {
                return e()
            },
            getOrDie: function() {
                return y.die(String(n))()
            },
            or: function(e) {
                return e
            },
            orThunk: function(e) {
                return e()
            },
            fold: function(e, t) {
                return e(n)
            },
            map: function(e) {
                return qi(n)
            },
            each: y.noop,
            bind: function(e) {
                return qi(n)
            },
            exists: y.never,
            forall: y.always,
            toOption: x.none
        }
    }
      , Fi = {
        value: Li,
        error: qi
    }
      , ji = function(e, t) {
        return A.map(e, function() {
            return U.elementnew(t.cell(), !0)
        })
    }
      , zi = function(t, e, n) {
        return t.concat(Yo(e, function(e) {
            return jo.setCells(t[t.length - 1], ji(t[t.length - 1].cells(), n))
        }))
    }
      , _i = function(e, t, n) {
        return A.map(e, function(e) {
            return jo.setCells(e, e.cells().concat(ji(Ko(0, t), n)))
        })
    }
      , Hi = function(e, t, n) {
        if (e.row() >= t.length || e.column() > jo.cellLength(t[0]))
            return Fi.error("invalid start address out of table bounds, row: " + e.row() + ", column: " + e.column());
        var r = t.slice(e.row())
          , o = r[0].cells().slice(e.column())
          , i = jo.cellLength(n[0])
          , u = n.length;
        return Fi.value({
            rowDelta: y.constant(r.length - u),
            colDelta: y.constant(o.length - i)
        })
    }
      , Vi = function(e, t) {
        var n = jo.cellLength(e[0])
          , r = jo.cellLength(t[0]);
        return {
            rowDelta: y.constant(0),
            colDelta: y.constant(n - r)
        }
    }
      , Ui = function(e, t, n) {
        var r = t.colDelta() < 0 ? _i : y.identity;
        return (t.rowDelta() < 0 ? zi : y.identity)(r(e, Math.abs(t.colDelta()), n), Math.abs(t.rowDelta()), n)
    }
      , Gi = function(e, t, n, r) {
        if (0 === e.length)
            return e;
        for (var o = t.startRow(); o <= t.finishRow(); o++)
            for (var i = t.startCol(); i <= t.finishCol(); i++)
                jo.mutateCell(e[o], i, U.elementnew(r(), !1));
        return e
    }
      , Xi = function(e, t, n, r) {
        for (var o = !0, i = 0; i < e.length; i++)
            for (var u = 0; u < jo.cellLength(e[0]); u++) {
                var a = n(jo.getCellElement(e[i], u), t);
                !0 === a && !1 === o ? jo.mutateCell(e[i], u, U.elementnew(r(), !0)) : !0 === a && (o = !1)
            }
        return e
    }
      , Yi = function(i, u, a, c) {
        if (0 < u && u < i.length) {
            var e = i[u - 1].cells()
              , t = (n = e,
            r = a,
            A.foldl(n, function(e, t) {
                return A.exists(e, function(e) {
                    return r(e.element(), t.element())
                }) ? e : e.concat([t])
            }, []));
            A.each(t, function(e) {
                for (var t = x.none(), n = u; n < i.length; n++)
                    for (var r = 0; r < jo.cellLength(i[0]); r++) {
                        var o = i[n].cells()[r];
                        a(o.element(), e.element()) && (t.isNone() && (t = x.some(c())),
                        t.each(function(e) {
                            jo.mutateCell(i[n], r, U.elementnew(e, !0))
                        }))
                    }
            })
        }
        var n, r;
        return i
    }
      , Ki = function(n, r, o, i, u) {
        return Hi(n, r, o).map(function(e) {
            var t = Ui(r, e, i);
            return function(e, t, n, r, o) {
                for (var i, u, a, c, l, s, f, d = e.row(), m = e.column(), g = d + n.length, p = m + jo.cellLength(n[0]), h = d; h < g; h++)
                    for (var v = m; v < p; v++) {
                        i = t,
                        u = h,
                        a = v,
                        c = o,
                        s = l = void 0,
                        l = jo.getCell(i[u], a),
                        s = y.curry(c, l.element()),
                        f = i[u],
                        1 < i.length && 1 < jo.cellLength(f) && (0 < a && s(jo.getCellElement(f, a - 1)) || a < f.length - 1 && s(jo.getCellElement(f, a + 1)) || 0 < u && s(jo.getCellElement(i[u - 1], a)) || u < i.length - 1 && s(jo.getCellElement(i[u + 1], a))) && Xi(t, jo.getCellElement(t[h], v), o, r.cell);
                        var b = jo.getCellElement(n[h - d], v - m)
                          , w = r.replace(b);
                        jo.mutateCell(t[h], v, U.elementnew(w, !0))
                    }
                return t
            }(n, t, o, i, u)
        })
    }
      , $i = function(e, t, n, r, o) {
        Yi(t, e, o, r.cell);
        var i = Vi(n, t)
          , u = Ui(n, i, r)
          , a = Vi(t, u)
          , c = Ui(t, a, r);
        return c.slice(0, e).concat(u).concat(c.slice(e, c.length))
    }
      , Ji = function(n, r, e, o, i) {
        var t = n.slice(0, r)
          , u = n.slice(r)
          , a = jo.mapCells(n[e], function(e, t) {
            return 0 < r && r < n.length && o(jo.getCellElement(n[r - 1], t), jo.getCellElement(n[r], t)) ? jo.getCell(n[r], t) : U.elementnew(i(e.element(), o), !0)
        });
        return t.concat([a]).concat(u)
    }
      , Qi = function(e, n, r, o, i) {
        return A.map(e, function(e) {
            var t = 0 < n && n < jo.cellLength(e) && o(jo.getCellElement(e, n - 1), jo.getCellElement(e, n)) ? jo.getCell(e, n) : U.elementnew(i(jo.getCellElement(e, r), o), !0);
            return jo.addCell(e, n, t)
        })
    }
      , Zi = function(e, r, o, i, u) {
        var a = o + 1;
        return A.map(e, function(e, t) {
            var n = t === r ? U.elementnew(u(jo.getCellElement(e, o), i), !0) : jo.getCell(e, o);
            return jo.addCell(e, a, n)
        })
    }
      , eu = function(e, t, n, r, o) {
        var i = t + 1
          , u = e.slice(0, i)
          , a = e.slice(i)
          , c = jo.mapCells(e[t], function(e, t) {
            return t === n ? U.elementnew(o(e.element(), r), !0) : e
        });
        return u.concat([c]).concat(a)
    }
      , tu = function(e, t, n) {
        return e.slice(0, t).concat(e.slice(n + 1))
    }
      , nu = function(e, n, r) {
        var t = A.map(e, function(e) {
            var t = e.cells().slice(0, n).concat(e.cells().slice(r + 1));
            return U.rowcells(t, e.section())
        });
        return A.filter(t, function(e) {
            return 0 < e.cells().length
        })
    }
      , ru = function(e, n, r, o) {
        return A.map(e, function(e) {
            return jo.mapCells(e, function(e) {
                return t = e,
                A.exists(n, function(e) {
                    return r(t.element(), e.element())
                }) ? U.elementnew(o(e.element(), r), !0) : e;
                var t
            })
        })
    }
      , ou = function(e, t, n, r) {
        return jo.getCellElement(e[t], n) !== undefined && 0 < t && r(jo.getCellElement(e[t - 1], n), jo.getCellElement(e[t], n))
    }
      , iu = function(e, t, n) {
        return 0 < t && n(jo.getCellElement(e, t - 1), jo.getCellElement(e, t))
    }
      , uu = function(n, r, o, e) {
        var t = A.bind(n, function(e, t) {
            return ou(n, t, r, o) || iu(e, r, o) ? [] : [jo.getCell(e, r)]
        });
        return ru(n, t, o, e)
    }
      , au = function(n, r, o, e) {
        var i = n[r]
          , t = A.bind(i.cells(), function(e, t) {
            return ou(n, r, t, o) || iu(i, t, o) ? [] : [e]
        });
        return ru(n, t, o, e)
    }
      , cu = function(e) {
        return {
            fold: e
        }
    }
      , lu = function() {
        return cu(function(e, t, n, r, o) {
            return e()
        })
    }
      , su = function(i) {
        return cu(function(e, t, n, r, o) {
            return t(i)
        })
    }
      , fu = function(i, u) {
        return cu(function(e, t, n, r, o) {
            return n(i, u)
        })
    }
      , du = function(i, u, a) {
        return cu(function(e, t, n, r, o) {
            return r(i, u, a)
        })
    }
      , mu = function(i, u) {
        return cu(function(e, t, n, r, o) {
            return o(i, u)
        })
    }
      , gu = function(e, t, i, u) {
        var n, r, a = e.slice(0), o = (r = t,
        0 === (n = e).length ? lu() : 1 === n.length ? su(0) : 0 === r ? fu(0, 1) : r === n.length - 1 ? mu(r - 1, r) : 0 < r && r < n.length - 1 ? du(r - 1, r, r + 1) : lu()), c = function(e) {
            return A.map(e, y.constant(0))
        }, l = y.constant(c(a)), s = function(e, t) {
            if (0 <= i) {
                var n = Math.max(u.minCellWidth(), a[t] - i);
                return c(a.slice(0, e)).concat([i, n - a[t]]).concat(c(a.slice(t + 1)))
            }
            var r = Math.max(u.minCellWidth(), a[e] + i)
              , o = a[e] - r;
            return c(a.slice(0, e)).concat([r - a[e], o]).concat(c(a.slice(t + 1)))
        }, f = s;
        return o.fold(l, function(e) {
            return u.singleColumnWidth(a[e], i)
        }, f, function(e, t, n) {
            return s(t, n)
        }, function(e, t) {
            if (0 <= i)
                return c(a.slice(0, t)).concat([i]);
            var n = Math.max(u.minCellWidth(), a[t] + i);
            return c(a.slice(0, t)).concat([n - a[t]])
        })
    }
      , pu = function(e, t) {
        return ht.has(e, t) && 1 < parseInt(ht.get(e, t), 10)
    }
      , hu = {
        hasColspan: function(e) {
            return pu(e, "colspan")
        },
        hasRowspan: function(e) {
            return pu(e, "rowspan")
        },
        minWidth: y.constant(10),
        minHeight: y.constant(10),
        getInt: function(e, t) {
            return parseInt(Qt.get(e, t), 10)
        }
    }
      , vu = function(e, t, n) {
        return Qt.getRaw(e, t).fold(function() {
            return n(e) + "px"
        }, function(e) {
            return e
        })
    }
      , bu = function(e) {
        return vu(e, "width", _r.getPixelWidth)
    }
      , wu = function(e) {
        return vu(e, "height", _r.getHeight)
    }
      , yu = function(e, t, n, r, o) {
        var i = Qo(e)
          , u = A.map(i, function(e) {
            return e.map(t.edge)
        });
        return A.map(i, function(e, t) {
            return e.filter(y.not(hu.hasColspan)).fold(function() {
                var e = $o(u, t);
                return r(e)
            }, function(e) {
                return n(e, o)
            })
        })
    }
      , xu = function(e) {
        return e.map(function(e) {
            return e + "px"
        }).getOr("")
    }
      , Su = function(e, t, n, r) {
        var o = Zo(e)
          , i = A.map(o, function(e) {
            return e.map(t.edge)
        });
        return A.map(o, function(e, t) {
            return e.filter(y.not(hu.hasRowspan)).fold(function() {
                var e = $o(i, t);
                return r(e)
            }, function(e) {
                return n(e)
            })
        })
    }
      , Cu = {
        getRawWidths: function(e, t) {
            return yu(e, t, bu, xu)
        },
        getPixelWidths: function(e, t, n) {
            return yu(e, t, _r.getPixelWidth, function(e) {
                return e.getOrThunk(n.minCellWidth)
            }, n)
        },
        getPercentageWidths: function(e, t, n) {
            return yu(e, t, _r.getPercentageWidth, function(e) {
                return e.fold(function() {
                    return n.minCellWidth()
                }, function(e) {
                    return e / n.pixelWidth() * 100
                })
            }, n)
        },
        getPixelHeights: function(e, t) {
            return Su(e, t, _r.getHeight, function(e) {
                return e.getOrThunk(hu.minHeight)
            })
        },
        getRawHeights: function(e, t) {
            return Su(e, t, wu, xu)
        }
    }
      , Ru = function(e, t, n) {
        for (var r = 0, o = e; o < t; o++)
            r += n[o] !== undefined ? n[o] : 0;
        return r
    }
      , Tu = function(e, n) {
        var t = Ut.justCells(e);
        return A.map(t, function(e) {
            var t = Ru(e.column(), e.column() + e.colspan(), n);
            return {
                element: e.element,
                width: y.constant(t),
                colspan: e.colspan
            }
        })
    }
      , Du = function(e, n) {
        var t = Ut.justCells(e);
        return A.map(t, function(e) {
            var t = Ru(e.row(), e.row() + e.rowspan(), n);
            return {
                element: e.element,
                height: y.constant(t),
                rowspan: e.rowspan
            }
        })
    }
      , Au = function(e, n) {
        return A.map(e.all(), function(e, t) {
            return {
                element: e.element,
                height: y.constant(n[t])
            }
        })
    }
      , ku = function(e) {
        var t = parseInt(e, 10)
          , n = y.identity;
        return {
            width: y.constant(t),
            pixelWidth: y.constant(t),
            getWidths: Cu.getPixelWidths,
            getCellDelta: n,
            singleColumnWidth: function(e, t) {
                return [Math.max(hu.minWidth(), e + t) - e]
            },
            minCellWidth: hu.minWidth,
            setElementWidth: _r.setPixelWidth,
            setTableWidth: function(e, t, n) {
                var r = A.foldr(t, function(e, t) {
                    return e + t
                }, 0);
                _r.setPixelWidth(e, r)
            }
        }
    }
      , Nu = function(e, t) {
        if (_r.percentageBasedSizeRegex().test(t)) {
            var n = _r.percentageBasedSizeRegex().exec(t);
            return o = n[1],
            i = e,
            u = parseFloat(o),
            a = kr(i),
            {
                width: y.constant(u),
                pixelWidth: y.constant(a),
                getWidths: Cu.getPercentageWidths,
                getCellDelta: function(e) {
                    return e / a * 100
                },
                singleColumnWidth: function(e, t) {
                    return [100 - e]
                },
                minCellWidth: function() {
                    return hu.minWidth() / a * 100
                },
                setElementWidth: _r.setPercentageWidth,
                setTableWidth: function(e, t, n) {
                    var r = u + n;
                    _r.setPercentageWidth(e, r)
                }
            }
        }
        if (_r.pixelBasedSizeRegex().test(t)) {
            var r = _r.pixelBasedSizeRegex().exec(t);
            return ku(r[1])
        }
        var o, i, u, a, c = kr(e);
        return ku(c)
    }
      , Eu = function(t) {
        return _r.getRawWidth(t).fold(function() {
            var e = kr(t);
            return ku(e)
        }, function(e) {
            return Nu(t, e)
        })
    }
      , Ou = function(e) {
        return Ut.generate(e)
    }
      , Bu = function(e) {
        var t = zt(e);
        return Ou(t)
    }
      , Pu = {
        adjustWidth: function(e, t, n, r) {
            var o = Eu(e)
              , i = o.getCellDelta(t)
              , u = Bu(e)
              , a = o.getWidths(u, r, o)
              , c = gu(a, n, i, o)
              , l = A.map(c, function(e, t) {
                return e + a[t]
            })
              , s = Tu(u, l);
            A.each(s, function(e) {
                o.setElementWidth(e.element(), e.width())
            }),
            n === u.grid().columns() - 1 && o.setTableWidth(e, l, i)
        },
        adjustHeight: function(e, n, r, t) {
            var o = Bu(e)
              , i = Cu.getPixelHeights(o, t)
              , u = A.map(i, function(e, t) {
                return r === t ? Math.max(n + e, hu.minHeight()) : e
            })
              , a = Du(o, u)
              , c = Au(o, u);
            A.each(c, function(e) {
                _r.setHeight(e.element(), e.height())
            }),
            A.each(a, function(e) {
                _r.setHeight(e.element(), e.height())
            });
            var l, s = (l = u,
            A.foldr(l, function(e, t) {
                return e + t
            }, 0));
            _r.setHeight(e, s)
        },
        adjustWidthTo: function(e, t, n) {
            var r = Eu(e)
              , o = Ou(t)
              , i = r.getWidths(o, n, r)
              , u = Tu(o, i);
            A.each(u, function(e) {
                r.setElementWidth(e.element(), e.width())
            });
            var a = A.foldr(i, function(e, t) {
                return t + e
            }, 0);
            0 < u.length && r.setElementWidth(e, a)
        }
    }
      , Iu = function(e) {
        0 === jt.cells(e).length && on.remove(e)
    }
      , Wu = q.immutable("grid", "cursor")
      , Mu = function(e, t, n) {
        return Lu(e, t, n).orThunk(function() {
            return Lu(e, 0, 0)
        })
    }
      , Lu = function(e, t, n) {
        return x.from(e[t]).bind(function(e) {
            return x.from(e.cells()[n]).bind(function(e) {
                return x.from(e.element())
            })
        })
    }
      , qu = function(e, t, n) {
        return Wu(e, Lu(e, t, n))
    }
      , Fu = function(e) {
        return A.foldl(e, function(e, t) {
            return A.exists(e, function(e) {
                return e.row() === t.row()
            }) ? e : e.concat([t])
        }, []).sort(function(e, t) {
            return e.row() - t.row()
        })
    }
      , ju = function(e) {
        return A.foldl(e, function(e, t) {
            return A.exists(e, function(e) {
                return e.column() === t.column()
            }) ? e : e.concat([t])
        }, []).sort(function(e, t) {
            return e.column() - t.column()
        })
    }
      , zu = function(e, t, n) {
        var r = _t(e, n)
          , o = Ut.generate(r);
        return Vo(o, t, !0)
    }
      , _u = Pu.adjustWidthTo
      , Hu = {
        insertRowBefore: Ni(function(e, t, n, r) {
            var o = t.row()
              , i = t.row()
              , u = Ji(e, i, o, n, r.getOrInit);
            return qu(u, i, t.column())
        }, Oi, y.noop, y.noop, bo),
        insertRowsBefore: Ni(function(e, t, n, r) {
            var o = t[0].row()
              , i = t[0].row()
              , u = Fu(t)
              , a = A.foldl(u, function(e, t) {
                return Ji(e, i, o, n, r.getOrInit)
            }, e);
            return qu(a, i, t[0].column())
        }, Bi, y.noop, y.noop, bo),
        insertRowAfter: Ni(function(e, t, n, r) {
            var o = t.row()
              , i = t.row() + t.rowspan()
              , u = Ji(e, i, o, n, r.getOrInit);
            return qu(u, i, t.column())
        }, Oi, y.noop, y.noop, bo),
        insertRowsAfter: Ni(function(e, t, n, r) {
            var o = Fu(t)
              , i = o[o.length - 1].row()
              , u = o[o.length - 1].row() + o[o.length - 1].rowspan()
              , a = A.foldl(o, function(e, t) {
                return Ji(e, u, i, n, r.getOrInit)
            }, e);
            return qu(a, u, t[0].column())
        }, Bi, y.noop, y.noop, bo),
        insertColumnBefore: Ni(function(e, t, n, r) {
            var o = t.column()
              , i = t.column()
              , u = Qi(e, i, o, n, r.getOrInit);
            return qu(u, t.row(), i)
        }, Oi, _u, y.noop, bo),
        insertColumnsBefore: Ni(function(e, t, n, r) {
            var o = ju(t)
              , i = o[0].column()
              , u = o[0].column()
              , a = A.foldl(o, function(e, t) {
                return Qi(e, u, i, n, r.getOrInit)
            }, e);
            return qu(a, t[0].row(), u)
        }, Bi, _u, y.noop, bo),
        insertColumnAfter: Ni(function(e, t, n, r) {
            var o = t.column()
              , i = t.column() + t.colspan()
              , u = Qi(e, i, o, n, r.getOrInit);
            return qu(u, t.row(), i)
        }, Oi, _u, y.noop, bo),
        insertColumnsAfter: Ni(function(e, t, n, r) {
            var o = t[t.length - 1].column()
              , i = t[t.length - 1].column() + t[t.length - 1].colspan()
              , u = ju(t)
              , a = A.foldl(u, function(e, t) {
                return Qi(e, i, o, n, r.getOrInit)
            }, e);
            return qu(a, t[0].row(), i)
        }, Bi, _u, y.noop, bo),
        splitCellIntoColumns: Ni(function(e, t, n, r) {
            var o = Zi(e, t.row(), t.column(), n, r.getOrInit);
            return qu(o, t.row(), t.column())
        }, Oi, _u, y.noop, bo),
        splitCellIntoRows: Ni(function(e, t, n, r) {
            var o = eu(e, t.row(), t.column(), n, r.getOrInit);
            return qu(o, t.row(), t.column())
        }, Oi, y.noop, y.noop, bo),
        eraseColumns: Ni(function(e, t, n, r) {
            var o = ju(t)
              , i = nu(e, o[0].column(), o[o.length - 1].column())
              , u = Mu(i, t[0].row(), t[0].column());
            return Wu(i, u)
        }, Bi, _u, Iu, bo),
        eraseRows: Ni(function(e, t, n, r) {
            var o = Fu(t)
              , i = tu(e, o[0].row(), o[o.length - 1].row())
              , u = Mu(i, t[0].row(), t[0].column());
            return Wu(i, u)
        }, Bi, y.noop, Iu, bo),
        makeColumnHeader: Ni(function(e, t, n, r) {
            var o = uu(e, t.column(), n, r.replaceOrInit);
            return qu(o, t.row(), t.column())
        }, Oi, y.noop, y.noop, wo("row", "th")),
        unmakeColumnHeader: Ni(function(e, t, n, r) {
            var o = uu(e, t.column(), n, r.replaceOrInit);
            return qu(o, t.row(), t.column())
        }, Oi, y.noop, y.noop, wo(null, "td")),
        makeRowHeader: Ni(function(e, t, n, r) {
            var o = au(e, t.row(), n, r.replaceOrInit);
            return qu(o, t.row(), t.column())
        }, Oi, y.noop, y.noop, wo("col", "th")),
        unmakeRowHeader: Ni(function(e, t, n, r) {
            var o = au(e, t.row(), n, r.replaceOrInit);
            return qu(o, t.row(), t.column())
        }, Oi, y.noop, y.noop, wo(null, "td")),
        mergeCells: Ni(function(e, t, n, r) {
            var o = t.cells();
            Oo(o);
            var i = Gi(e, t.bounds(), n, y.constant(o[0]));
            return Wu(i, x.from(o[0]))
        }, Wi, y.noop, y.noop, yo),
        unmergeCells: Ni(function(e, t, n, r) {
            var o = A.foldr(t, function(e, t) {
                return Xi(e, t, n, r.combine(t))
            }, e);
            return Wu(o, x.from(t[0]))
        }, Mi, _u, y.noop, yo),
        pasteCells: Ni(function(e, n, t, r) {
            var o, i, u, a, c = (o = n.clipboard(),
            i = n.generators(),
            u = zt(o),
            a = Ut.generate(u),
            Vo(a, i, !0)), l = U.address(n.row(), n.column());
            return Ki(l, e, c, n.generators(), t).fold(function() {
                return Wu(e, x.some(n.element()))
            }, function(e) {
                var t = Mu(e, n.row(), n.column());
                return Wu(e, t)
            })
        }, Pi, _u, y.noop, bo),
        pasteRowsBefore: Ni(function(e, t, n, r) {
            var o = e[t.cells[0].row()]
              , i = t.cells[0].row()
              , u = zu(t.clipboard(), t.generators(), o)
              , a = $i(i, e, u, t.generators(), n)
              , c = Mu(a, t.cells[0].row(), t.cells[0].column());
            return Wu(a, c)
        }, Ii, y.noop, y.noop, bo),
        pasteRowsAfter: Ni(function(e, t, n, r) {
            var o = e[t.cells[0].row()]
              , i = t.cells[t.cells.length - 1].row() + t.cells[t.cells.length - 1].rowspan()
              , u = zu(t.clipboard(), t.generators(), o)
              , a = $i(i, e, u, t.generators(), n)
              , c = Mu(a, t.cells[0].row(), t.cells[0].column());
            return Wu(a, c)
        }, Ii, y.noop, y.noop, bo)
    }
      , Vu = function(e) {
        return X.fromDom(e.getBody())
    }
      , Uu = {
        getBody: Vu,
        getIsRoot: function(t) {
            return function(e) {
                return Ye.eq(e, Vu(t))
            }
        },
        addSizeSuffix: function(e) {
            return /^[0-9]+$/.test(e) && (e += "px"),
            e
        },
        removePxSuffix: function(e) {
            return e ? e.replace(/px$/, "") : ""
        }
    }
      , Gu = function(e) {
        return "rtl" === Qt.get(e, "direction") ? "rtl" : "ltr"
    }
      , Xu = {
        onDirection: function(t, n) {
            return function(e) {
                return "rtl" === Gu(e) ? n : t
            }
        },
        getDirection: Gu
    }
      , Yu = {
        isRtl: y.constant(!1)
    }
      , Ku = {
        isRtl: y.constant(!0)
    }
      , $u = {
        directionAt: function(e) {
            return "rtl" === Xu.getDirection(e) ? Ku : Yu
        }
    }
      , Ju = ["tableprops", "tabledelete", "|", "tableinsertrowbefore", "tableinsertrowafter", "tabledeleterow", "|", "tableinsertcolbefore", "tableinsertcolafter", "tabledeletecol"]
      , Qu = {
        "border-collapse": "collapse",
        width: "100%"
    }
      , Zu = {
        border: "1"
    }
      , ea = function(e) {
        return e.getParam("table_tab_navigation", !0, "boolean")
    }
      , ta = function(e) {
        return e.getParam("table_cell_advtab", !0, "boolean")
    }
      , na = function(e) {
        return e.getParam("table_row_advtab", !0, "boolean")
    }
      , ra = function(e) {
        return e.getParam("table_advtab", !0, "boolean")
    }
      , oa = function(e) {
        return e.getParam("table_style_by_css", !1, "boolean")
    }
      , ia = function(e) {
        return e.getParam("table_cell_class_list", [], "array")
    }
      , ua = function(e) {
        return e.getParam("table_row_class_list", [], "array")
    }
      , aa = function(e) {
        return e.getParam("table_class_list", [], "array")
    }
      , ca = function(e) {
        return !1 === e.getParam("table_responsive_width")
    }
      , la = function(e, t) {
        return e.fire("newrow", {
            node: t
        })
    }
      , sa = function(e, t) {
        return e.fire("newcell", {
            node: t
        })
    }
      , fa = function(f, e) {
        var t, n = function(e) {
            return "table" === ft.name(Uu.getBody(e))
        }, d = (t = f.getParam("table_clone_elements"),
        W.isString(t) ? x.some(t.split(/[ ,]/)) : Array.isArray(t) ? x.some(t) : x.none()), r = function(a, c, l, s) {
            return function(e, t) {
                var n = St.descendants(e, "td[data-mce-style],th[data-mce-style]");
                A.each(n, function(e) {
                    ht.remove(e, "data-mce-style")
                });
                var r = s()
                  , o = X.fromDom(f.getDoc())
                  , i = co($u.directionAt)
                  , u = Dn(l, o, d);
                return c(e) ? a(r, e, t, u, i).bind(function(e) {
                    return A.each(e.newRows(), function(e) {
                        la(f, e.dom())
                    }),
                    A.each(e.newCells(), function(e) {
                        sa(f, e.dom())
                    }),
                    e.cursor().map(function(e) {
                        var t = f.dom.createRng();
                        return t.setStart(e.dom(), 0),
                        t.setEnd(e.dom(), 0),
                        t
                    })
                }) : x.none()
            }
        };
        return {
            deleteRow: r(Hu.eraseRows, function(e) {
                var t = lo(e);
                return !1 === n(f) || 1 < t.rows()
            }, y.noop, e),
            deleteColumn: r(Hu.eraseColumns, function(e) {
                var t = lo(e);
                return !1 === n(f) || 1 < t.columns()
            }, y.noop, e),
            insertRowsBefore: r(Hu.insertRowsBefore, y.always, y.noop, e),
            insertRowsAfter: r(Hu.insertRowsAfter, y.always, y.noop, e),
            insertColumnsBefore: r(Hu.insertColumnsBefore, y.always, Hr, e),
            insertColumnsAfter: r(Hu.insertColumnsAfter, y.always, Hr, e),
            mergeCells: r(Hu.mergeCells, y.always, y.noop, e),
            unmergeCells: r(Hu.unmergeCells, y.always, y.noop, e),
            pasteRowsBefore: r(Hu.pasteRowsBefore, y.always, y.noop, e),
            pasteRowsAfter: r(Hu.pasteRowsAfter, y.always, y.noop, e),
            pasteCells: r(Hu.pasteCells, y.always, y.noop, e)
        }
    }
      , da = function(e, t, r) {
        var n = zt(e)
          , o = Ut.generate(n);
        return Bi(o, t).map(function(e) {
            var t = Vo(o, r, !1).slice(e[0].row(), e[e.length - 1].row() + e[e.length - 1].rowspan())
              , n = Ei(t, r);
            return Xo(n)
        })
    }
      , ma = tinymce.util.Tools.resolve("tinymce.util.Tools")
      , ga = {
        applyAlign: function(e, t, n) {
            n && e.formatter.apply("align" + n, {}, t)
        },
        applyVAlign: function(e, t, n) {
            n && e.formatter.apply("valign" + n, {}, t)
        },
        unApplyAlign: function(t, n) {
            ma.each("left center right".split(" "), function(e) {
                t.formatter.remove("align" + e, {}, n)
            })
        },
        unApplyVAlign: function(t, n) {
            ma.each("top middle bottom".split(" "), function(e) {
                t.formatter.remove("valign" + e, {}, n)
            })
        },
        getTDTHOverallStyle: function(o, e, i) {
            var t;
            return t = function(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = o.getStyle(t[n], i);
                    if (void 0 === e && (e = r),
                    e !== r)
                        return ""
                }
                return e
            }(t, o.select("td,th", e))
        }
    }
      , pa = function(e, t) {
        var n = e.dom
          , r = t.control.rootControl
          , o = r.toJSON()
          , i = n.parseStyle(o.style);
        "style" === t.control.name() ? (r.find("#borderStyle").value(i["border-style"] || "")[0].fire("select"),
        r.find("#borderColor").value(i["border-color"] || "")[0].fire("change"),
        r.find("#backgroundColor").value(i["background-color"] || "")[0].fire("change"),
        r.find("#width").value(i.width || "").fire("change"),
        r.find("#height").value(i.height || "").fire("change")) : (i["border-style"] = o.borderStyle,
        i["border-color"] = o.borderColor,
        i["background-color"] = o.backgroundColor,
        i.width = o.width ? Uu.addSizeSuffix(o.width) : "",
        i.height = o.height ? Uu.addSizeSuffix(o.height) : ""),
        r.find("#style").value(n.serializeStyle(n.parseStyle(n.serializeStyle(i))))
    }
      , ha = {
        createStyleForm: function(n) {
            var e = function() {
                var e = n.getParam("color_picker_callback");
                if (e)
                    return function(t) {
                        return e.call(n, function(e) {
                            t.control.value(e).fire("change")
                        }, t.control.value())
                    }
            };
            return {
                title: "Advanced",
                type: "form",
                defaults: {
                    onchange: y.curry(pa, n)
                },
                items: [{
                    label: "Style",
                    name: "style",
                    type: "textbox"
                }, {
                    type: "form",
                    padding: 0,
                    formItemDefaults: {
                        layout: "grid",
                        alignH: ["start", "right"]
                    },
                    defaults: {
                        size: 7
                    },
                    items: [{
                        label: "Border style",
                        type: "listbox",
                        name: "borderStyle",
                        width: 90,
                        onselect: y.curry(pa, n),
                        values: [{
                            text: "Select...",
                            value: ""
                        }, {
                            text: "Solid",
                            value: "solid"
                        }, {
                            text: "Dotted",
                            value: "dotted"
                        }, {
                            text: "Dashed",
                            value: "dashed"
                        }, {
                            text: "Double",
                            value: "double"
                        }, {
                            text: "Groove",
                            value: "groove"
                        }, {
                            text: "Ridge",
                            value: "ridge"
                        }, {
                            text: "Inset",
                            value: "inset"
                        }, {
                            text: "Outset",
                            value: "outset"
                        }, {
                            text: "None",
                            value: "none"
                        }, {
                            text: "Hidden",
                            value: "hidden"
                        }]
                    }, {
                        label: "Border color",
                        type: "colorbox",
                        name: "borderColor",
                        onaction: e()
                    }, {
                        label: "Background color",
                        type: "colorbox",
                        name: "backgroundColor",
                        onaction: e()
                    }]
                }]
            }
        },
        buildListItems: function(e, r, t) {
            var o = function(e, n) {
                return n = n || [],
                ma.each(e, function(e) {
                    var t = {
                        text: e.text || e.title
                    };
                    e.menu ? t.menu = o(e.menu) : (t.value = e.value,
                    r && r(t)),
                    n.push(t)
                }),
                n
            };
            return o(e, t || [])
        },
        updateStyleField: pa,
        extractAdvancedStyles: function(e, t) {
            var n = e.parseStyle(e.getAttrib(t, "style"))
              , r = {};
            return n["border-style"] && (r.borderStyle = n["border-style"]),
            n["border-color"] && (r.borderColor = n["border-color"]),
            n["background-color"] && (r.backgroundColor = n["background-color"]),
            r.style = e.serializeStyle(n),
            r
        }
    }
      , va = function(r, o, e) {
        var i, u = r.dom;
        function a(e, t, n) {
            n && u.setAttrib(e, t, n)
        }
        function c(e, t, n) {
            n && u.setStyle(e, t, n)
        }
        ha.updateStyleField(r, e),
        i = e.control.rootControl.toJSON(),
        r.undoManager.transact(function() {
            ma.each(o, function(e) {
                var t, n;
                a(e, "scope", i.scope),
                1 === o.length ? a(e, "style", i.style) : (t = e,
                n = i.style,
                delete t.dataset.mceStyle,
                t.style.cssText += ";" + n),
                a(e, "class", i["class"]),
                c(e, "width", Uu.addSizeSuffix(i.width)),
                c(e, "height", Uu.addSizeSuffix(i.height)),
                i.type && e.nodeName.toLowerCase() !== i.type && (e = u.rename(e, i.type)),
                1 === o.length && (ga.unApplyAlign(r, e),
                ga.unApplyVAlign(r, e)),
                i.align && ga.applyAlign(r, e, i.align),
                i.valign && ga.applyVAlign(r, e, i.valign)
            }),
            r.focus()
        })
    }
      , ba = function(t) {
        var e, n, r, o = [];
        if (o = t.dom.select("td[data-mce-selected],th[data-mce-selected]"),
        e = t.dom.getParent(t.selection.getStart(), "td,th"),
        !o.length && e && o.push(e),
        e = e || o[0]) {
            var i, u, a, c;
            1 < o.length ? n = {
                width: "",
                height: "",
                scope: "",
                "class": "",
                align: "",
                valign: "",
                style: "",
                type: e.nodeName.toLowerCase()
            } : (u = e,
            a = (i = t).dom,
            c = {
                width: a.getStyle(u, "width") || a.getAttrib(u, "width"),
                height: a.getStyle(u, "height") || a.getAttrib(u, "height"),
                scope: a.getAttrib(u, "scope"),
                "class": a.getAttrib(u, "class"),
                type: u.nodeName.toLowerCase(),
                style: "",
                align: "",
                valign: ""
            },
            ma.each("left center right".split(" "), function(e) {
                i.formatter.matchNode(u, "align" + e) && (c.align = e)
            }),
            ma.each("top middle bottom".split(" "), function(e) {
                i.formatter.matchNode(u, "valign" + e) && (c.valign = e)
            }),
            ta(i) && ma.extend(c, ha.extractAdvancedStyles(a, u)),
            n = c),
            0 < ia(t).length && (r = {
                name: "class",
                type: "listbox",
                label: "Class",
                values: ha.buildListItems(ia(t), function(e) {
                    e.value && (e.textStyle = function() {
                        return t.formatter.getCssText({
                            block: "td",
                            classes: [e.value]
                        })
                    }
                    )
                })
            });
            var l = {
                type: "form",
                layout: "flex",
                direction: "column",
                labelGapCalc: "children",
                padding: 0,
                items: [{
                    type: "form",
                    layout: "grid",
                    columns: 2,
                    labelGapCalc: !1,
                    padding: 0,
                    defaults: {
                        type: "textbox",
                        maxWidth: 50
                    },
                    items: [{
                        label: "Width",
                        name: "width",
                        onchange: y.curry(ha.updateStyleField, t)
                    }, {
                        label: "Height",
                        name: "height",
                        onchange: y.curry(ha.updateStyleField, t)
                    }, {
                        label: "Cell type",
                        name: "type",
                        type: "listbox",
                        text: "None",
                        minWidth: 90,
                        maxWidth: null,
                        values: [{
                            text: "Cell",
                            value: "td"
                        }, {
                            text: "Header cell",
                            value: "th"
                        }]
                    }, {
                        label: "Scope",
                        name: "scope",
                        type: "listbox",
                        text: "None",
                        minWidth: 90,
                        maxWidth: null,
                        values: [{
                            text: "None",
                            value: ""
                        }, {
                            text: "Row",
                            value: "row"
                        }, {
                            text: "Column",
                            value: "col"
                        }, {
                            text: "Row group",
                            value: "rowgroup"
                        }, {
                            text: "Column group",
                            value: "colgroup"
                        }]
                    }, {
                        label: "H Align",
                        name: "align",
                        type: "listbox",
                        text: "None",
                        minWidth: 90,
                        maxWidth: null,
                        values: [{
                            text: "None",
                            value: ""
                        }, {
                            text: "Left",
                            value: "left"
                        }, {
                            text: "Center",
                            value: "center"
                        }, {
                            text: "Right",
                            value: "right"
                        }]
                    }, {
                        label: "V Align",
                        name: "valign",
                        type: "listbox",
                        text: "None",
                        minWidth: 90,
                        maxWidth: null,
                        values: [{
                            text: "None",
                            value: ""
                        }, {
                            text: "Top",
                            value: "top"
                        }, {
                            text: "Middle",
                            value: "middle"
                        }, {
                            text: "Bottom",
                            value: "bottom"
                        }]
                    }]
                }, r]
            };
            ta(t) ? t.windowManager.open({
                title: "Cell properties",
                bodyType: "tabpanel",
                data: n,
                body: [{
                    title: "General",
                    type: "form",
                    items: l
                }, ha.createStyleForm(t)],
                onsubmit: y.curry(va, t, o)
            }) : t.windowManager.open({
                title: "Cell properties",
                data: n,
                body: l,
                onsubmit: y.curry(va, t, o)
            })
        }
    }
      , wa = function(e, t, n) {
        var r = e.getParent(t, "table")
          , o = t.parentNode
          , i = e.select(n, r)[0];
        i || (i = e.create(n),
        r.firstChild ? "CAPTION" === r.firstChild.nodeName ? e.insertAfter(i, r.firstChild) : r.insertBefore(i, r.firstChild) : r.appendChild(i)),
        i.appendChild(t),
        o.hasChildNodes() || e.remove(o)
    };
    function ya(o, e, i, t) {
        var u = o.dom;
        function a(e, t, n) {
            n && u.setAttrib(e, t, n)
        }
        ha.updateStyleField(o, t);
        var c = t.control.rootControl.toJSON();
        o.undoManager.transact(function() {
            ma.each(e, function(e) {
                var t, n, r;
                a(e, "scope", c.scope),
                a(e, "style", c.style),
                a(e, "class", c["class"]),
                t = e,
                n = "height",
                (r = Uu.addSizeSuffix(c.height)) && u.setStyle(t, n, r),
                c.type !== e.parentNode.nodeName.toLowerCase() && wa(o.dom, e, c.type),
                c.align !== i.align && (ga.unApplyAlign(o, e),
                ga.applyAlign(o, e, c.align))
            }),
            o.focus()
        })
    }
    var xa = function(t) {
        var e, n, r, o, i, u, a, c, l, s, f = t.dom, d = [];
        e = f.getParent(t.selection.getStart(), "table"),
        n = f.getParent(t.selection.getStart(), "td,th"),
        ma.each(e.rows, function(t) {
            ma.each(t.cells, function(e) {
                if (f.getAttrib(e, "data-mce-selected") || e === n)
                    return d.push(t),
                    !1
            })
        }),
        (r = d[0]) && (1 < d.length ? i = {
            height: "",
            scope: "",
            style: "",
            "class": "",
            align: "",
            type: r.parentNode.nodeName.toLowerCase()
        } : (c = r,
        l = (a = t).dom,
        s = {
            height: l.getStyle(c, "height") || l.getAttrib(c, "height"),
            scope: l.getAttrib(c, "scope"),
            "class": l.getAttrib(c, "class"),
            align: "",
            style: "",
            type: c.parentNode.nodeName.toLowerCase()
        },
        ma.each("left center right".split(" "), function(e) {
            a.formatter.matchNode(c, "align" + e) && (s.align = e)
        }),
        na(a) && ma.extend(s, ha.extractAdvancedStyles(l, c)),
        i = s),
        0 < ua(t).length && (o = {
            name: "class",
            type: "listbox",
            label: "Class",
            values: ha.buildListItems(ua(t), function(e) {
                e.value && (e.textStyle = function() {
                    return t.formatter.getCssText({
                        block: "tr",
                        classes: [e.value]
                    })
                }
                )
            })
        }),
        u = {
            type: "form",
            columns: 2,
            padding: 0,
            defaults: {
                type: "textbox"
            },
            items: [{
                type: "listbox",
                name: "type",
                label: "Row type",
                text: "Header",
                maxWidth: null,
                values: [{
                    text: "Header",
                    value: "thead"
                }, {
                    text: "Body",
                    value: "tbody"
                }, {
                    text: "Footer",
                    value: "tfoot"
                }]
            }, {
                type: "listbox",
                name: "align",
                label: "Alignment",
                text: "None",
                maxWidth: null,
                values: [{
                    text: "None",
                    value: ""
                }, {
                    text: "Left",
                    value: "left"
                }, {
                    text: "Center",
                    value: "center"
                }, {
                    text: "Right",
                    value: "right"
                }]
            }, {
                label: "Height",
                name: "height"
            }, o]
        },
        na(t) ? t.windowManager.open({
            title: "Row properties",
            data: i,
            bodyType: "tabpanel",
            body: [{
                title: "General",
                type: "form",
                items: u
            }, ha.createStyleForm(t)],
            onsubmit: y.curry(ya, t, d, i)
        }) : t.windowManager.open({
            title: "Row properties",
            data: i,
            body: u,
            onsubmit: y.curry(ya, t, d, i)
        }))
    }
      , Sa = tinymce.util.Tools.resolve("tinymce.Env")
      , Ca = {
        styles: {
            "border-collapse": "collapse",
            width: "100%"
        },
        attributes: {
            border: "1"
        },
        percentages: !0
    }
      , Ra = function(e, t, n, r, o) {
        void 0 === o && (o = Ca);
        var i = X.fromTag("table");
        Qt.setAll(i, o.styles),
        ht.setAll(i, o.attributes);
        var u = X.fromTag("tbody");
        tn.append(i, u);
        for (var a = [], c = 0; c < e; c++) {
            for (var l = X.fromTag("tr"), s = 0; s < t; s++) {
                var f = c < n || s < r ? X.fromTag("th") : X.fromTag("td");
                s < r && ht.set(f, "scope", "row"),
                c < n && ht.set(f, "scope", "col"),
                tn.append(f, X.fromTag("br")),
                o.percentages && Qt.set(f, "width", 100 / t + "%"),
                tn.append(l, f)
            }
            a.push(l)
        }
        return nn.append(u, a),
        i
    }
      , Ta = function(e) {
        return e.dom().innerHTML
    }
      , Da = function(e) {
        var t = X.fromTag("div")
          , n = X.fromDom(e.dom().cloneNode(!0));
        return tn.append(t, n),
        Ta(t)
    }
      , Aa = function(e, t) {
        e.selection.select(t.dom(), !0),
        e.selection.collapse(!0)
    }
      , ka = function(i, e, t) {
        var n, r, o = i.getParam("table_default_styles", Qu, "object"), u = {
            styles: o,
            attributes: (r = i,
            r.getParam("table_default_attributes", Zu, "object")),
            percentages: (n = o.width,
            W.isString(n) && -1 !== n.indexOf("%") && !ca(i))
        }, a = Ra(t, e, 0, 0, u);
        ht.set(a, "data-mce-id", "__mce");
        var c = Da(a);
        return i.insertContent(c),
        It.descendant(Uu.getBody(i), 'table[data-mce-id="__mce"]').map(function(e) {
            var t, n, r, o;
            return ca(i) && Qt.set(e, "width", Qt.get(e, "width")),
            ht.remove(e, "data-mce-id"),
            t = i,
            n = e,
            A.each(St.descendants(n, "tr"), function(e) {
                la(t, e.dom()),
                A.each(St.descendants(e, "th,td"), function(e) {
                    sa(t, e.dom())
                })
            }),
            r = i,
            o = e,
            It.descendant(o, "td,th").each(y.curry(Aa, r)),
            e.dom()
        }).getOr(null)
    };
    function Na(e, t, n, r) {
        if ("TD" === t.tagName || "TH" === t.tagName)
            e.setStyle(t, n, r);
        else if (t.children)
            for (var o = 0; o < t.children.length; o++)
                Na(e, t.children[o], n, r)
    }
    var Ea = function(e, t, n) {
        var r, o, i = e.dom;
        ha.updateStyleField(e, n),
        !1 === (o = n.control.rootControl.toJSON())["class"] && delete o["class"],
        e.undoManager.transact(function() {
            t || (t = ka(e, o.cols || 1, o.rows || 1)),
            function(e, t, n) {
                var r = e.dom
                  , o = {}
                  , i = {};
                if (o["class"] = n["class"],
                i.height = Uu.addSizeSuffix(n.height),
                r.getAttrib(t, "width") && !oa(e) ? o.width = Uu.removePxSuffix(n.width) : i.width = Uu.addSizeSuffix(n.width),
                oa(e) ? (i["border-width"] = Uu.addSizeSuffix(n.border),
                i["border-spacing"] = Uu.addSizeSuffix(n.cellspacing),
                ma.extend(o, {
                    "data-mce-border-color": n.borderColor,
                    "data-mce-cell-padding": n.cellpadding,
                    "data-mce-border": n.border
                })) : ma.extend(o, {
                    border: n.border,
                    cellpadding: n.cellpadding,
                    cellspacing: n.cellspacing
                }),
                oa(e) && t.children)
                    for (var u = 0; u < t.children.length; u++)
                        Na(r, t.children[u], {
                            "border-width": Uu.addSizeSuffix(n.border),
                            "border-color": n.borderColor,
                            padding: Uu.addSizeSuffix(n.cellpadding)
                        });
                n.style ? ma.extend(i, r.parseStyle(n.style)) : i = ma.extend({}, r.parseStyle(r.getAttrib(t, "style")), i),
                o.style = r.serializeStyle(i),
                r.setAttribs(t, o)
            }(e, t, o),
            (r = i.select("caption", t)[0]) && !o.caption && i.remove(r),
            !r && o.caption && ((r = i.create("caption")).innerHTML = Sa.ie ? "\xa0" : '<br data-mce-bogus="1"/>',
            t.insertBefore(r, t.firstChild)),
            ga.unApplyAlign(e, t),
            o.align && ga.applyAlign(e, t, o.align),
            e.focus(),
            e.addVisual()
        })
    }
      , Oa = function(t, e) {
        var n, r, o, i, u, a, c, l, s, f, d = t.dom, m = {};
        !0 === e ? (n = d.getParent(t.selection.getStart(), "table")) && (c = n,
        l = (a = t).dom,
        s = {
            width: l.getStyle(c, "width") || l.getAttrib(c, "width"),
            height: l.getStyle(c, "height") || l.getAttrib(c, "height"),
            cellspacing: l.getStyle(c, "border-spacing") || l.getAttrib(c, "cellspacing"),
            cellpadding: l.getAttrib(c, "data-mce-cell-padding") || l.getAttrib(c, "cellpadding") || ga.getTDTHOverallStyle(a.dom, c, "padding"),
            border: l.getAttrib(c, "data-mce-border") || l.getAttrib(c, "border") || ga.getTDTHOverallStyle(a.dom, c, "border"),
            borderColor: l.getAttrib(c, "data-mce-border-color"),
            caption: !!l.select("caption", c)[0],
            "class": l.getAttrib(c, "class")
        },
        ma.each("left center right".split(" "), function(e) {
            a.formatter.matchNode(c, "align" + e) && (s.align = e)
        }),
        ra(a) && ma.extend(s, ha.extractAdvancedStyles(l, c)),
        m = s) : (r = {
            label: "Cols",
            name: "cols"
        },
        o = {
            label: "Rows",
            name: "rows"
        }),
        0 < aa(t).length && (m["class"] && (m["class"] = m["class"].replace(/\s*mce\-item\-table\s*/g, "")),
        i = {
            name: "class",
            type: "listbox",
            label: "Class",
            values: ha.buildListItems(aa(t), function(e) {
                e.value && (e.textStyle = function() {
                    return t.formatter.getCssText({
                        block: "table",
                        classes: [e.value]
                    })
                }
                )
            })
        }),
        u = {
            type: "form",
            layout: "flex",
            direction: "column",
            labelGapCalc: "children",
            padding: 0,
            items: [{
                type: "form",
                labelGapCalc: !1,
                padding: 0,
                layout: "grid",
                columns: 2,
                defaults: {
                    type: "textbox",
                    maxWidth: 50
                },
                items: (f = t,
                f.getParam("table_appearance_options", !0, "boolean") ? [r, o, {
                    label: "Width",
                    name: "width",
                    onchange: y.curry(ha.updateStyleField, t)
                }, {
                    label: "Height",
                    name: "height",
                    onchange: y.curry(ha.updateStyleField, t)
                }, {
                    label: "Cell spacing",
                    name: "cellspacing"
                }, {
                    label: "Cell padding",
                    name: "cellpadding"
                }, {
                    label: "Border",
                    name: "border"
                }, {
                    label: "Caption",
                    name: "caption",
                    type: "checkbox"
                }] : [r, o, {
                    label: "Width",
                    name: "width",
                    onchange: y.curry(ha.updateStyleField, t)
                }, {
                    label: "Height",
                    name: "height",
                    onchange: y.curry(ha.updateStyleField, t)
                }])
            }, {
                label: "Alignment",
                name: "align",
                type: "listbox",
                text: "None",
                values: [{
                    text: "None",
                    value: ""
                }, {
                    text: "Left",
                    value: "left"
                }, {
                    text: "Center",
                    value: "center"
                }, {
                    text: "Right",
                    value: "right"
                }]
            }, i]
        },
        ra(t) ? t.windowManager.open({
            title: "Table properties",
            data: m,
            bodyType: "tabpanel",
            body: [{
                title: "General",
                type: "form",
                items: u
            }, ha.createStyleForm(t)],
            onsubmit: y.curry(Ea, t, n)
        }) : t.windowManager.open({
            title: "Table properties",
            data: m,
            body: u,
            onsubmit: y.curry(Ea, t, n)
        })
    }
      , Ba = ma.each
      , Pa = {
        registerCommands: function(a, t, c, l, n) {
            var r = Uu.getIsRoot(a)
              , s = function() {
                return X.fromDom(a.dom.getParent(a.selection.getStart(), "th,td"))
            }
              , f = function(e) {
                return jt.table(e, r)
            }
              , o = function(n) {
                var r = s();
                f(r).each(function(t) {
                    var e = xr.forMenu(l, t, r);
                    n(t, e).each(function(e) {
                        a.selection.setRng(e),
                        a.focus(),
                        c.clear(t)
                    })
                })
            }
              , i = function(e) {
                var o = s();
                return f(o).bind(function(e) {
                    var t = X.fromDom(a.getDoc())
                      , n = xr.forMenu(l, e, o)
                      , r = Dn(y.noop, t, x.none());
                    return da(e, n, r)
                })
            }
              , u = function(u) {
                n.get().each(function(e) {
                    var o = A.map(e, function(e) {
                        return dn(e)
                    })
                      , i = s();
                    f(i).bind(function(t) {
                        var e = X.fromDom(a.getDoc())
                          , n = An(e)
                          , r = xr.pasteRows(l, t, i, o, n);
                        u(t, r).each(function(e) {
                            a.selection.setRng(e),
                            a.focus(),
                            c.clear(t)
                        })
                    })
                })
            };
            Ba({
                mceTableSplitCells: function() {
                    o(t.unmergeCells)
                },
                mceTableMergeCells: function() {
                    o(t.mergeCells)
                },
                mceTableInsertRowBefore: function() {
                    o(t.insertRowsBefore)
                },
                mceTableInsertRowAfter: function() {
                    o(t.insertRowsAfter)
                },
                mceTableInsertColBefore: function() {
                    o(t.insertColumnsBefore)
                },
                mceTableInsertColAfter: function() {
                    o(t.insertColumnsAfter)
                },
                mceTableDeleteCol: function() {
                    o(t.deleteColumn)
                },
                mceTableDeleteRow: function() {
                    o(t.deleteRow)
                },
                mceTableCutRow: function(e) {
                    n.set(i()),
                    o(t.deleteRow)
                },
                mceTableCopyRow: function(e) {
                    n.set(i())
                },
                mceTablePasteRowBefore: function(e) {
                    u(t.pasteRowsBefore)
                },
                mceTablePasteRowAfter: function(e) {
                    u(t.pasteRowsAfter)
                },
                mceTableDelete: function() {
                    var e = X.fromDom(a.dom.getParent(a.selection.getStart(), "th,td"));
                    jt.table(e, r).filter(y.not(r)).each(function(e) {
                        var t = X.fromText("");
                        tn.after(e, t),
                        on.remove(e);
                        var n = a.dom.createRng();
                        n.setStart(t.dom(), 0),
                        n.setEnd(t.dom(), 0),
                        a.selection.setRng(n)
                    })
                }
            }, function(e, t) {
                a.addCommand(t, e)
            }),
            Ba({
                mceInsertTable: y.curry(Oa, a),
                mceTableProps: y.curry(Oa, a, !0),
                mceTableRowProps: y.curry(xa, a),
                mceTableCellProps: y.curry(ba, a)
            }, function(n, e) {
                a.addCommand(e, function(e, t) {
                    n(t)
                })
            })
        }
    }
      , Ia = function(e) {
        var t = x.from(e.dom().documentElement).map(X.fromDom).getOr(e);
        return {
            parent: y.constant(t),
            view: y.constant(e),
            origin: y.constant(Gr(0, 0))
        }
    }
      , Wa = function(e, t) {
        return {
            parent: y.constant(t),
            view: y.constant(e),
            origin: y.constant(Gr(0, 0))
        }
    };
    function Ma(e) {
        var n = q.immutable.apply(null, e)
          , r = [];
        return {
            bind: function(e) {
                if (e === undefined)
                    throw "Event bind error: undefined handler";
                r.push(e)
            },
            unbind: function(t) {
                r = A.filter(r, function(e) {
                    return e !== t
                })
            },
            trigger: function() {
                var t = n.apply(null, arguments);
                A.each(r, function(e) {
                    e(t)
                })
            }
        }
    }
    var La = {
        create: function(e) {
            return {
                registry: P.map(e, function(e) {
                    return {
                        bind: e.bind,
                        unbind: e.unbind
                    }
                }),
                trigger: P.map(e, function(e) {
                    return e.trigger
                })
            }
        }
    }
      , qa = {
        mode: po.exactly(["compare", "extract", "mutate", "sink"]),
        sink: po.exactly(["element", "start", "stop", "destroy"]),
        api: po.exactly(["forceDrop", "drop", "move", "delayDrop"])
    }
      , Fa = {
        resolve: ni("ephox-dragster").resolve
    }
      , ja = function(m, g) {
        return function(e) {
            if (m(e)) {
                var t, n, r, o, i, u, a, c = X.fromDom(e.target), l = function() {
                    e.stopPropagation()
                }, s = function() {
                    e.preventDefault()
                }, f = y.compose(s, l), d = (t = c,
                n = e.clientX,
                r = e.clientY,
                o = l,
                i = s,
                u = f,
                a = e,
                {
                    target: y.constant(t),
                    x: y.constant(n),
                    y: y.constant(r),
                    stop: o,
                    prevent: i,
                    kill: u,
                    raw: y.constant(a)
                });
                g(d)
            }
        }
    }
      , za = function(e, t, n, r, o) {
        var i = ja(n, r);
        return e.dom().addEventListener(t, i, o),
        {
            unbind: y.curry(_a, e, t, i, o)
        }
    }
      , _a = function(e, t, n, r) {
        e.dom().removeEventListener(t, n, r)
    }
      , Ha = function(e, t, n, r) {
        return za(e, t, n, r, !1)
    }
      , Va = function(e, t, n, r) {
        return za(e, t, n, r, !0)
    }
      , Ua = y.constant(!0)
      , Ga = {
        bind: function(e, t, n) {
            return Ha(e, t, Ua, n)
        },
        capture: function(e, t, n) {
            return Va(e, t, Ua, n)
        }
    }
      , Xa = qa.mode({
        compare: function(e, t) {
            return Gr(t.left() - e.left(), t.top() - e.top())
        },
        extract: function(e) {
            return x.some(Gr(e.x(), e.y()))
        },
        sink: function(e, t) {
            var n, r, o, i = (n = t,
            r = Wo.merge({
                layerClass: Fa.resolve("blocker")
            }, n),
            o = X.fromTag("div"),
            ht.set(o, "role", "presentation"),
            Qt.setAll(o, {
                position: "fixed",
                left: "0px",
                top: "0px",
                width: "100%",
                height: "100%"
            }),
            vi.add(o, Fa.resolve("blocker")),
            vi.add(o, r.layerClass),
            {
                element: function() {
                    return o
                },
                destroy: function() {
                    on.remove(o)
                }
            }), u = Ga.bind(i.element(), "mousedown", e.forceDrop), a = Ga.bind(i.element(), "mouseup", e.drop), c = Ga.bind(i.element(), "mousemove", e.move), l = Ga.bind(i.element(), "mouseout", e.delayDrop);
            return qa.sink({
                element: i.element,
                start: function(e) {
                    tn.append(e, i.element())
                },
                stop: function() {
                    on.remove(i.element())
                },
                destroy: function() {
                    i.destroy(),
                    a.unbind(),
                    c.unbind(),
                    l.unbind(),
                    u.unbind()
                }
            })
        },
        mutate: function(e, t) {
            e.mutate(t.left(), t.top())
        }
    });
    function Ya() {
        var i = x.none()
          , u = La.create({
            move: Ma(["info"])
        });
        return {
            onEvent: function(e, o) {
                o.extract(e).each(function(e) {
                    var t, n, r;
                    (t = o,
                    n = e,
                    r = i.map(function(e) {
                        return t.compare(e, n)
                    }),
                    i = x.some(n),
                    r).each(function(e) {
                        u.trigger.move(e)
                    })
                })
            },
            reset: function() {
                i = x.none()
            },
            events: u.registry
        }
    }
    function Ka() {
        var e = {
            onEvent: function(e, t) {},
            reset: y.noop
        }
          , t = Ya()
          , n = e;
        return {
            on: function() {
                n.reset(),
                n = t
            },
            off: function() {
                n.reset(),
                n = e
            },
            isOn: function() {
                return n === t
            },
            onEvent: function(e, t) {
                n.onEvent(e, t)
            },
            events: t.events
        }
    }
    var $a = function(t, n) {
        var r = null;
        return {
            cancel: function() {
                null !== r && (clearTimeout(r),
                r = null)
            },
            throttle: function() {
                var e = arguments;
                null !== r && clearTimeout(r),
                r = setTimeout(function() {
                    t.apply(null, e),
                    e = r = null
                }, n)
            }
        }
    }
      , Ja = function(t, n, e) {
        var r = !1
          , o = La.create({
            start: Ma([]),
            stop: Ma([])
        })
          , i = Ka()
          , u = function() {
            l.stop(),
            i.isOn() && (i.off(),
            o.trigger.stop())
        }
          , a = $a(u, 200);
        i.events.move.bind(function(e) {
            n.mutate(t, e.info())
        });
        var c = function(t) {
            return function() {
                var e = Array.prototype.slice.call(arguments, 0);
                if (r)
                    return t.apply(null, e)
            }
        }
          , l = n.sink(qa.api({
            forceDrop: u,
            drop: c(u),
            move: c(function(e, t) {
                a.cancel(),
                i.onEvent(e, n)
            }),
            delayDrop: c(a.throttle)
        }), e);
        return {
            element: l.element,
            go: function(e) {
                l.start(e),
                i.on(),
                o.trigger.start()
            },
            on: function() {
                r = !0
            },
            off: function() {
                r = !1
            },
            destroy: function() {
                l.destroy()
            },
            events: o.registry
        }
    }
      , Qa = {
        transform: function(e, t) {
            var n = t !== undefined ? t : {}
              , r = n.mode !== undefined ? n.mode : Xa;
            return Ja(e, r, t)
        }
    };
    function Za() {
        var n, r = La.create({
            drag: Ma(["xDelta", "yDelta", "target"])
        }), o = x.none(), e = {
            mutate: function(e, t) {
                n.trigger.drag(e, t)
            },
            events: (n = La.create({
                drag: Ma(["xDelta", "yDelta"])
            })).registry
        };
        return e.events.drag.bind(function(t) {
            o.each(function(e) {
                r.trigger.drag(t.xDelta(), t.yDelta(), e)
            })
        }),
        {
            assign: function(e) {
                o = x.some(e)
            },
            get: function() {
                return o
            },
            mutate: e.mutate,
            events: r.registry
        }
    }
    var ec = {
        any: function(e) {
            return It.first(e).isSome()
        },
        ancestor: function(e, t, n) {
            return It.ancestor(e, t, n).isSome()
        },
        sibling: function(e, t) {
            return It.sibling(e, t).isSome()
        },
        child: function(e, t) {
            return It.child(e, t).isSome()
        },
        descendant: function(e, t) {
            return It.descendant(e, t).isSome()
        },
        closest: function(e, t, n) {
            return It.closest(e, t, n).isSome()
        }
    }
      , tc = ri.resolve("resizer-bar-dragging");
    function nc(e, n) {
        var r = uo.height
          , t = function(o, t, i) {
            var n = Za()
              , r = Qa.transform(n, {})
              , u = x.none()
              , e = function(e, t) {
                return x.from(ht.get(e, t))
            };
            n.events.drag.bind(function(n) {
                e(n.target(), "data-row").each(function(e) {
                    var t = hu.getInt(n.target(), "top");
                    Qt.set(n.target(), "top", t + n.yDelta() + "px")
                }),
                e(n.target(), "data-column").each(function(e) {
                    var t = hu.getInt(n.target(), "left");
                    Qt.set(n.target(), "left", t + n.xDelta() + "px")
                })
            });
            var a = function(e, t) {
                return hu.getInt(e, t) - parseInt(ht.get(e, "data-initial-" + t), 10)
            };
            r.events.stop.bind(function() {
                n.get().each(function(r) {
                    u.each(function(n) {
                        e(r, "data-row").each(function(e) {
                            var t = a(r, "top");
                            ht.remove(r, "data-initial-top"),
                            d.trigger.adjustHeight(n, t, parseInt(e, 10))
                        }),
                        e(r, "data-column").each(function(e) {
                            var t = a(r, "left");
                            ht.remove(r, "data-initial-left"),
                            d.trigger.adjustWidth(n, t, parseInt(e, 10))
                        }),
                        Ti.refresh(o, n, i, t)
                    })
                })
            });
            var c = function(e, t) {
                d.trigger.startAdjust(),
                n.assign(e),
                ht.set(e, "data-initial-" + t, parseInt(Qt.get(e, t), 10)),
                vi.add(e, tc),
                Qt.set(e, "opacity", "0.2"),
                r.go(o.parent())
            }
              , l = Ga.bind(o.parent(), "mousedown", function(e) {
                Ti.isRowBar(e.target()) && c(e.target(), "top"),
                Ti.isColBar(e.target()) && c(e.target(), "left")
            })
              , s = function(e) {
                return Ye.eq(e, o.view())
            }
              , f = Ga.bind(o.view(), "mouseover", function(e) {
                "table" === ft.name(e.target()) || ec.closest(e.target(), "table", s) ? (u = "table" === ft.name(e.target()) ? x.some(e.target()) : It.ancestor(e.target(), "table", s)).each(function(e) {
                    Ti.refresh(o, e, i, t)
                }) : wt.inBody(e.target()) && Ti.destroy(o)
            })
              , d = La.create({
                adjustHeight: Ma(["table", "delta", "row"]),
                adjustWidth: Ma(["table", "delta", "column"]),
                startAdjust: Ma([])
            });
            return {
                destroy: function() {
                    l.unbind(),
                    f.unbind(),
                    r.destroy(),
                    Ti.destroy(o)
                },
                refresh: function(e) {
                    Ti.refresh(o, e, i, t)
                },
                on: r.on,
                off: r.off,
                hideBars: y.curry(Ti.hide, o),
                showBars: y.curry(Ti.show, o),
                events: d.registry
            }
        }(e, n, r)
          , o = La.create({
            beforeResize: Ma(["table"]),
            afterResize: Ma(["table"]),
            startDrag: Ma([])
        });
        return t.events.adjustHeight.bind(function(e) {
            o.trigger.beforeResize(e.table());
            var t = r.delta(e.delta(), e.table());
            Pu.adjustHeight(e.table(), t, e.row(), r),
            o.trigger.afterResize(e.table())
        }),
        t.events.startAdjust.bind(function(e) {
            o.trigger.startDrag()
        }),
        t.events.adjustWidth.bind(function(e) {
            o.trigger.beforeResize(e.table());
            var t = n.delta(e.delta(), e.table());
            Pu.adjustWidth(e.table(), t, e.column(), n),
            o.trigger.afterResize(e.table())
        }),
        {
            on: t.on,
            off: t.off,
            hideBars: t.hideBars,
            showBars: t.showBars,
            destroy: t.destroy,
            events: o.registry
        }
    }
    var rc = function(e, t) {
        return e.inline ? Wa(Uu.getBody(e), (n = X.fromTag("div"),
        Qt.setAll(n, {
            position: "static",
            height: "0",
            width: "0",
            padding: "0",
            margin: "0",
            border: "0"
        }),
        tn.append(wt.body(), n),
        n)) : Ia(X.fromDom(e.getDoc()));
        var n
    }
      , oc = function(e, t) {
        e.inline && on.remove(t.parent())
    }
      , ic = function(u) {
        var a, c, o = x.none(), i = x.none(), l = x.none(), s = /(\d+(\.\d+)?)%/, f = function(e) {
            return "TABLE" === e.nodeName
        };
        return u.on("init", function() {
            var e, t = co($u.directionAt), n = rc(u);
            if (l = x.some(n),
            ("table" === (e = u.getParam("object_resizing", !0)) || e) && u.getParam("table_resize_bars", !0, "boolean")) {
                var r = nc(n, t);
                r.on(),
                r.events.startDrag.bind(function(e) {
                    o = x.some(u.selection.getRng())
                }),
                r.events.afterResize.bind(function(e) {
                    var t = e.table()
                      , n = St.descendants(t, "td[data-mce-style],th[data-mce-style]");
                    A.each(n, function(e) {
                        ht.remove(e, "data-mce-style")
                    }),
                    o.each(function(e) {
                        u.selection.setRng(e),
                        u.focus()
                    }),
                    u.undoManager.add()
                }),
                i = x.some(r)
            }
        }),
        u.on("ObjectResizeStart", function(e) {
            var t, n = e.target;
            f(n) && (a = e.width,
            t = n,
            c = u.dom.getStyle(t, "width") || u.dom.getAttrib(t, "width"))
        }),
        u.on("ObjectResized", function(e) {
            var t = e.target;
            if (f(t)) {
                var n = t;
                if (s.test(c)) {
                    var r = parseFloat(s.exec(c)[1])
                      , o = e.width * r / a;
                    u.dom.setStyle(n, "width", o + "%")
                } else {
                    var i = [];
                    ma.each(n.rows, function(e) {
                        ma.each(e.cells, function(e) {
                            var t = u.dom.getStyle(e, "width", !0);
                            i.push({
                                cell: e,
                                width: t
                            })
                        })
                    }),
                    ma.each(i, function(e) {
                        u.dom.setStyle(e.cell, "width", e.width),
                        u.dom.setAttrib(e.cell, "width", null)
                    })
                }
            }
        }),
        {
            lazyResize: function() {
                return i
            },
            lazyWire: function() {
                return l.getOr(Ia(X.fromDom(u.getBody())))
            },
            destroy: function() {
                i.each(function(e) {
                    e.destroy()
                }),
                l.each(function(e) {
                    oc(u, e)
                })
            }
        }
    }
      , uc = function(e) {
        return {
            fold: e
        }
    }
      , ac = function(o) {
        return uc(function(e, t, n, r) {
            return e(o)
        })
    }
      , cc = function(o) {
        return uc(function(e, t, n, r) {
            return t(o)
        })
    }
      , lc = function(o, i) {
        return uc(function(e, t, n, r) {
            return n(o, i)
        })
    }
      , sc = function(o) {
        return uc(function(e, t, n, r) {
            return r(o)
        })
    }
      , fc = function(n, e) {
        return jt.table(n, e).bind(function(e) {
            var t = jt.cells(e);
            return A.findIndex(t, function(e) {
                return Ye.eq(n, e)
            }).map(function(e) {
                return {
                    index: y.constant(e),
                    all: y.constant(t)
                }
            })
        })
    }
      , dc = function(t, e) {
        return fc(t, e).fold(function() {
            return ac(t)
        }, function(e) {
            return e.index() + 1 < e.all().length ? lc(t, e.all()[e.index() + 1]) : sc(t)
        })
    }
      , mc = function(t, e) {
        return fc(t, e).fold(function() {
            return ac()
        }, function(e) {
            return 0 <= e.index() - 1 ? lc(t, e.all()[e.index() - 1]) : cc(t)
        })
    }
      , gc = dr([{
        before: ["element"]
    }, {
        on: ["element", "offset"]
    }, {
        after: ["element"]
    }])
      , pc = {
        before: gc.before,
        on: gc.on,
        after: gc.after,
        cata: function(e, t, n, r) {
            return e.fold(t, n, r)
        },
        getStart: function(e) {
            return e.fold(y.identity, y.identity, y.identity)
        }
    }
      , hc = dr([{
        domRange: ["rng"]
    }, {
        relative: ["startSitu", "finishSitu"]
    }, {
        exact: ["start", "soffset", "finish", "foffset"]
    }])
      , vc = q.immutable("start", "soffset", "finish", "foffset")
      , bc = {
        domRange: hc.domRange,
        relative: hc.relative,
        exact: hc.exact,
        exactFromRange: function(e) {
            return hc.exact(e.start(), e.soffset(), e.finish(), e.foffset())
        },
        range: vc,
        getWin: function(e) {
            var t = e.match({
                domRange: function(e) {
                    return X.fromDom(e.startContainer)
                },
                relative: function(e, t) {
                    return pc.getStart(e)
                },
                exact: function(e, t, n, r) {
                    return e
                }
            });
            return nt.defaultView(t)
        }
    }
      , wc = function(e, t, n, r) {
        var o = nt.owner(e).dom().createRange();
        return o.setStart(e.dom(), t),
        o.setEnd(n.dom(), r),
        o
    }
      , yc = function(e, t, n, r) {
        var o = wc(e, t, n, r)
          , i = Ye.eq(e, n) && t === r;
        return o.collapsed && !i
    }
      , xc = function(e, t) {
        var n = (t || document).createDocumentFragment();
        return A.each(e, function(e) {
            n.appendChild(e.dom())
        }),
        X.fromDom(n)
    }
      , Sc = function(e, t) {
        e.selectNodeContents(t.dom())
    }
      , Cc = function(e) {
        e.deleteContents()
    }
      , Rc = function(e) {
        return {
            left: y.constant(e.left),
            top: y.constant(e.top),
            right: y.constant(e.right),
            bottom: y.constant(e.bottom),
            width: y.constant(e.width),
            height: y.constant(e.height)
        }
    }
      , Tc = {
        create: function(e) {
            return e.document.createRange()
        },
        replaceWith: function(e, t) {
            Cc(e),
            e.insertNode(t.dom())
        },
        selectNodeContents: function(e, t) {
            var n = e.document.createRange();
            return Sc(n, t),
            n
        },
        selectNodeContentsUsing: Sc,
        relativeToNative: function(e, t, n) {
            var r, o, i = e.document.createRange();
            return r = i,
            t.fold(function(e) {
                r.setStartBefore(e.dom())
            }, function(e, t) {
                r.setStart(e.dom(), t)
            }, function(e) {
                r.setStartAfter(e.dom())
            }),
            o = i,
            n.fold(function(e) {
                o.setEndBefore(e.dom())
            }, function(e, t) {
                o.setEnd(e.dom(), t)
            }, function(e) {
                o.setEndAfter(e.dom())
            }),
            i
        },
        exactToNative: function(e, t, n, r, o) {
            var i = e.document.createRange();
            return i.setStart(t.dom(), n),
            i.setEnd(r.dom(), o),
            i
        },
        deleteContents: Cc,
        cloneFragment: function(e) {
            var t = e.cloneContents();
            return X.fromDom(t)
        },
        getFirstRect: function(e) {
            var t = e.getClientRects()
              , n = 0 < t.length ? t[0] : e.getBoundingClientRect();
            return 0 < n.width || 0 < n.height ? x.some(n).map(Rc) : x.none()
        },
        getBounds: function(e) {
            var t = e.getBoundingClientRect();
            return 0 < t.width || 0 < t.height ? x.some(t).map(Rc) : x.none()
        },
        isWithin: function(e, t) {
            return t.compareBoundaryPoints(e.END_TO_START, e) < 1 && -1 < t.compareBoundaryPoints(e.START_TO_END, e)
        },
        toString: function(e) {
            return e.toString()
        }
    }
      , Dc = dr([{
        ltr: ["start", "soffset", "finish", "foffset"]
    }, {
        rtl: ["start", "soffset", "finish", "foffset"]
    }])
      , Ac = function(e, t, n) {
        return t(X.fromDom(n.startContainer), n.startOffset, X.fromDom(n.endContainer), n.endOffset)
    }
      , kc = function(e, t) {
        var o, n, r, i = (o = e,
        t.match({
            domRange: function(e) {
                return {
                    ltr: y.constant(e),
                    rtl: x.none
                }
            },
            relative: function(e, t) {
                return {
                    ltr: se(function() {
                        return Tc.relativeToNative(o, e, t)
                    }),
                    rtl: se(function() {
                        return x.some(Tc.relativeToNative(o, t, e))
                    })
                }
            },
            exact: function(e, t, n, r) {
                return {
                    ltr: se(function() {
                        return Tc.exactToNative(o, e, t, n, r)
                    }),
                    rtl: se(function() {
                        return x.some(Tc.exactToNative(o, n, r, e, t))
                    })
                }
            }
        }));
        return (r = (n = i).ltr()).collapsed ? n.rtl().filter(function(e) {
            return !1 === e.collapsed
        }).map(function(e) {
            return Dc.rtl(X.fromDom(e.endContainer), e.endOffset, X.fromDom(e.startContainer), e.startOffset)
        }).getOrThunk(function() {
            return Ac(0, Dc.ltr, r)
        }) : Ac(0, Dc.ltr, r)
    }
      , Nc = {
        ltr: Dc.ltr,
        rtl: Dc.rtl,
        diagnose: kc,
        asLtrRange: function(i, e) {
            return kc(i, e).match({
                ltr: function(e, t, n, r) {
                    var o = i.document.createRange();
                    return o.setStart(e.dom(), t),
                    o.setEnd(n.dom(), r),
                    o
                },
                rtl: function(e, t, n, r) {
                    var o = i.document.createRange();
                    return o.setStart(n.dom(), r),
                    o.setEnd(e.dom(), t),
                    o
                }
            })
        }
    }
      , Ec = function(e, t, n) {
        return t >= e.left && t <= e.right && n >= e.top && n <= e.bottom
    }
      , Oc = function(e, t, n, r, o) {
        if (0 === o)
            return 0;
        if (t === r)
            return o - 1;
        for (var i = r, u = 1; u < o; u++) {
            var a = e(u)
              , c = Math.abs(t - a.left);
            if (n > a.bottom)
                ;
            else {
                if (n < a.top || i < c)
                    return u - 1;
                i = c
            }
        }
        return 0
    }
      , Bc = {
        locate: function(l, s, f, d) {
            var e = l.dom().createRange();
            e.selectNode(s.dom());
            var t = e.getClientRects();
            return Lo(t, function(e) {
                return Ec(e, f, d) ? x.some(e) : x.none()
            }).map(function(e) {
                return n = l,
                r = s,
                t = f,
                o = d,
                i = e,
                u = function(e) {
                    var t = n.dom().createRange();
                    return t.setStart(r.dom(), e),
                    t.collapse(!0),
                    t
                }
                ,
                a = pn.get(r).length,
                c = Oc(function(e) {
                    return u(e).getBoundingClientRect()
                }, t, o, i.right, a),
                u(c);
                var n, r, t, o, i, u, a, c
            })
        }
    }
      , Pc = function(t, e, n, r) {
        var o = t.dom().createRange()
          , i = nt.children(e);
        return Lo(i, function(e) {
            return o.selectNode(e.dom()),
            Ec(o.getBoundingClientRect(), n, r) ? Ic(t, e, n, r) : x.none()
        })
    }
      , Ic = function(e, t, n, r) {
        return (ft.isText(t) ? Bc.locate : Pc)(e, t, n, r)
    }
      , Wc = function(e, t, n, r) {
        var o = e.dom().createRange();
        o.selectNode(t.dom());
        var i = o.getBoundingClientRect()
          , u = Math.max(i.left, Math.min(i.right, n))
          , a = Math.max(i.top, Math.min(i.bottom, r));
        return Ic(e, t, u, a)
    }
      , Mc = function(e, t) {
        return t - e.left < e.right - t
    }
      , Lc = function(e, t, n) {
        var r = e.dom().createRange();
        return r.selectNode(t.dom()),
        r.collapse(n),
        r
    }
      , qc = function(t, e, n) {
        var r = t.dom().createRange();
        r.selectNode(e.dom());
        var o = r.getBoundingClientRect()
          , i = Mc(o, n);
        return (!0 === i ? xn.first : xn.last)(e).map(function(e) {
            return Lc(t, e, i)
        })
    }
      , Fc = function(e, t, n) {
        var r = t.dom().getBoundingClientRect()
          , o = Mc(r, n);
        return x.some(Lc(e, t, o))
    }
      , jc = function(e, t, n) {
        return (0 === nt.children(t).length ? Fc : qc)(e, t, n)
    }
      , zc = document.caretPositionFromPoint ? function(n, e, t) {
        return x.from(n.dom().caretPositionFromPoint(e, t)).bind(function(e) {
            if (null === e.offsetNode)
                return x.none();
            var t = n.dom().createRange();
            return t.setStart(e.offsetNode, e.offset),
            t.collapse(),
            x.some(t)
        })
    }
    : document.caretRangeFromPoint ? function(e, t, n) {
        return x.from(e.dom().caretRangeFromPoint(t, n))
    }
    : function(n, r, o) {
        return X.fromPoint(n, r, o).bind(function(e) {
            var t = function() {
                return jc(n, e, r)
            };
            return 0 === nt.children(e).length ? t() : function(e, t, n, r) {
                var o = e.dom().createRange();
                o.selectNode(t.dom());
                var i = o.getBoundingClientRect()
                  , u = Math.max(i.left, Math.min(i.right, n))
                  , a = Math.max(i.top, Math.min(i.bottom, r));
                return Wc(e, t, u, a)
            }(n, e, r, o).orThunk(t)
        })
    }
      , _c = function(e, t, n) {
        var r = X.fromDom(e.document);
        return zc(r, t, n).map(function(e) {
            return bc.range(X.fromDom(e.startContainer), e.startOffset, X.fromDom(e.endContainer), e.endOffset)
        })
    }
      , Hc = function(e, t, n) {
        var r, o, i, u, a, c, l = Nc.asLtrRange(e, t), s = X.fromDom(l.commonAncestorContainer);
        return ft.isElement(s) ? (r = e,
        o = s,
        i = l,
        u = n,
        a = Tc.create(r),
        c = (te.is(o, u) ? [o] : []).concat(St.descendants(o, u)),
        A.filter(c, function(e) {
            return Tc.selectNodeContentsUsing(a, e),
            Tc.isWithin(i, a)
        })) : []
    }
      , Vc = function(e, t) {
        var n = ft.name(e);
        return "input" === n ? pc.after(e) : A.contains(["br", "img"], n) ? 0 === t ? pc.before(e) : pc.after(e) : pc.on(e, t)
    }
      , Uc = function(e, t) {
        var n = e.fold(pc.before, Vc, pc.after)
          , r = t.fold(pc.before, Vc, pc.after);
        return bc.relative(n, r)
    }
      , Gc = function(e, t, n, r) {
        var o = Vc(e, t)
          , i = Vc(n, r);
        return bc.relative(o, i)
    }
      , Xc = function(e) {
        return e.match({
            domRange: function(e) {
                var t = X.fromDom(e.startContainer)
                  , n = X.fromDom(e.endContainer);
                return Gc(t, e.startOffset, n, e.endOffset)
            },
            relative: Uc,
            exact: Gc
        })
    }
      , Yc = Uc
      , Kc = Gc
      , $c = function(e, t) {
        x.from(e.getSelection()).each(function(e) {
            e.removeAllRanges(),
            e.addRange(t)
        })
    }
      , Jc = function(e, t, n, r, o) {
        var i = Tc.exactToNative(e, t, n, r, o);
        $c(e, i)
    }
      , Qc = function(i, e) {
        return Nc.diagnose(i, e).match({
            ltr: function(e, t, n, r) {
                Jc(i, e, t, n, r)
            },
            rtl: function(e, t, n, r) {
                var o = i.getSelection();
                o.setBaseAndExtent ? o.setBaseAndExtent(e.dom(), t, n.dom(), r) : o.extend ? (o.collapse(e.dom(), t),
                o.extend(n.dom(), r)) : Jc(i, n, r, e, t)
            }
        })
    }
      , Zc = function(e) {
        var t = X.fromDom(e.anchorNode)
          , n = X.fromDom(e.focusNode);
        return yc(t, e.anchorOffset, n, e.focusOffset) ? x.some(bc.range(X.fromDom(e.anchorNode), e.anchorOffset, X.fromDom(e.focusNode), e.focusOffset)) : function(e) {
            if (0 < e.rangeCount) {
                var t = e.getRangeAt(0)
                  , n = e.getRangeAt(e.rangeCount - 1);
                return x.some(bc.range(X.fromDom(t.startContainer), t.startOffset, X.fromDom(n.endContainer), n.endOffset))
            }
            return x.none()
        }(e)
    }
      , el = function(e) {
        var t = e.getSelection();
        return 0 < t.rangeCount ? Zc(t) : x.none()
    }
      , tl = {
        setExact: function(e, t, n, r, o) {
            var i = Kc(t, n, r, o);
            Qc(e, i)
        },
        getExact: el,
        get: function(e) {
            return el(e).map(function(e) {
                return bc.exact(e.start(), e.soffset(), e.finish(), e.foffset())
            })
        },
        setRelative: function(e, t, n) {
            var r = Yc(t, n);
            Qc(e, r)
        },
        toNative: function(e) {
            var o = bc.getWin(e).dom()
              , t = function(e, t, n, r) {
                return Tc.exactToNative(o, e, t, n, r)
            }
              , n = Xc(e);
            return Nc.diagnose(o, n).match({
                ltr: t,
                rtl: t
            })
        },
        setToElement: function(e, t) {
            var n = Tc.selectNodeContents(e, t);
            $c(e, n)
        },
        clear: function(e) {
            e.getSelection().removeAllRanges()
        },
        clone: function(e, t) {
            var n = Nc.asLtrRange(e, t);
            return Tc.cloneFragment(n)
        },
        replace: function(e, t, n) {
            var r = Nc.asLtrRange(e, t)
              , o = xc(n, e.document);
            Tc.replaceWith(r, o)
        },
        deleteAt: function(e, t) {
            var n = Nc.asLtrRange(e, t);
            Tc.deleteContents(n)
        },
        forElement: function(e, t) {
            var n = Tc.selectNodeContents(e, t);
            return bc.range(X.fromDom(n.startContainer), n.startOffset, X.fromDom(n.endContainer), n.endOffset)
        },
        getFirstRect: function(e, t) {
            var n = Nc.asLtrRange(e, t);
            return Tc.getFirstRect(n)
        },
        getBounds: function(e, t) {
            var n = Nc.asLtrRange(e, t);
            return Tc.getBounds(n)
        },
        getAtPoint: function(e, t, n) {
            return _c(e, t, n)
        },
        findWithin: function(e, t, n) {
            return Hc(e, t, n)
        },
        getAsString: function(e, t) {
            var n = Nc.asLtrRange(e, t);
            return Tc.toString(n)
        },
        isCollapsed: function(e, t, n, r) {
            return Ye.eq(e, n) && t === r
        }
    }
      , nl = tinymce.util.Tools.resolve("tinymce.util.VK")
      , rl = function(e, t, n, r) {
        return ul(e, t, dc(n), r)
    }
      , ol = function(e, t, n, r) {
        return ul(e, t, mc(n), r)
    }
      , il = function(e, t) {
        var n = bc.exact(t, 0, t, 0);
        return tl.toNative(n)
    }
      , ul = function(i, e, t, u, n) {
        return t.fold(x.none, x.none, function(e, t) {
            return xn.first(t).map(function(e) {
                return il(0, e)
            })
        }, function(o) {
            return jt.table(o, e).bind(function(e) {
                var t, n, r = xr.noMenu(o);
                return i.undoManager.transact(function() {
                    u.insertRowsAfter(e, r)
                }),
                t = e,
                n = St.descendants(t, "tr"),
                A.last(n).bind(function(e) {
                    return It.descendant(e, "td,th").map(function(e) {
                        return il(0, e)
                    })
                })
            })
        })
    }
      , al = ["table", "li", "dl"]
      , cl = {
        handle: function(t, n, r, o) {
            if (t.keyCode === nl.TAB) {
                var i = Uu.getBody(n)
                  , u = function(e) {
                    var t = ft.name(e);
                    return Ye.eq(e, i) || A.contains(al, t)
                }
                  , e = n.selection.getRng();
                if (e.collapsed) {
                    var a = X.fromDom(e.startContainer);
                    jt.cell(a, u).each(function(e) {
                        t.preventDefault(),
                        (t.shiftKey ? ol : rl)(n, u, e, r, o).each(function(e) {
                            n.selection.setRng(e)
                        })
                    })
                }
            }
        }
    }
      , ll = {
        response: q.immutable("selection", "kill")
    }
      , sl = function(t) {
        return function(e) {
            return e === t
        }
    }
      , fl = sl(38)
      , dl = sl(40)
      , ml = {
        ltr: {
            isBackward: sl(37),
            isForward: sl(39)
        },
        rtl: {
            isBackward: sl(39),
            isForward: sl(37)
        },
        isUp: fl,
        isDown: dl,
        isNavigation: function(e) {
            return 37 <= e && e <= 40
        }
    }
      , gl = {
        convertToRange: function(e, t) {
            var n = Nc.asLtrRange(e, t);
            return {
                start: y.constant(X.fromDom(n.startContainer)),
                soffset: y.constant(n.startOffset),
                finish: y.constant(X.fromDom(n.endContainer)),
                foffset: y.constant(n.endOffset)
            }
        },
        makeSitus: function(e, t, n, r) {
            return {
                start: y.constant(pc.on(e, t)),
                finish: y.constant(pc.on(n, r))
            }
        }
    }
      , pl = Ue.detect().browser.isSafari()
      , hl = function(e) {
        var t = e !== undefined ? e.dom() : document
          , n = t.body.scrollLeft || t.documentElement.scrollLeft
          , r = t.body.scrollTop || t.documentElement.scrollTop;
        return Gr(n, r)
    }
      , vl = function(e, t, n) {
        (n !== undefined ? n.dom() : document).defaultView.scrollTo(e, t)
    }
      , bl = function(e, t) {
        pl && W.isFunction(e.dom().scrollIntoViewIfNeeded) ? e.dom().scrollIntoViewIfNeeded(!1) : e.dom().scrollIntoView(t)
    }
      , wl = {
        get: hl,
        to: vl,
        by: function(e, t, n) {
            (n !== undefined ? n.dom() : document).defaultView.scrollBy(e, t)
        },
        preserve: function(e, t) {
            var n = hl(e);
            t();
            var r = hl(e);
            n.top() === r.top() && n.left() === r.left() || vl(n.left(), n.top(), e)
        },
        capture: function(t) {
            var e = x.none()
              , n = function() {
                e = x.some(hl(t))
            };
            return n(),
            {
                save: n,
                restore: function() {
                    e.each(function(e) {
                        vl(e.left(), e.top(), t)
                    })
                }
            }
        },
        intoView: bl,
        intoViewIfNeeded: function(e, t) {
            var n = t.dom().getBoundingClientRect()
              , r = e.dom().getBoundingClientRect();
            r.top < n.top ? bl(e, !0) : r.bottom > n.bottom && bl(e, !1)
        },
        setToElement: function(e, t) {
            var n = Kr(t)
              , r = X.fromDom(e.document);
            vl(n.left(), n.top(), r)
        },
        scrollBarWidth: function() {
            var e = X.fromHtml('<div style="width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;"></div>');
            tn.after(wt.body(), e);
            var t = e.dom().offsetWidth - e.dom().clientWidth;
            return on.remove(e),
            t
        }
    };
    function yl(i) {
        return {
            elementFromPoint: function(e, t) {
                return x.from(i.document.elementFromPoint(e, t)).map(X.fromDom)
            },
            getRect: function(e) {
                return e.dom().getBoundingClientRect()
            },
            getRangedRect: function(e, t, n, r) {
                var o = bc.exact(e, t, n, r);
                return tl.getFirstRect(i, o).map(function(e) {
                    return P.map(e, y.apply)
                })
            },
            getSelection: function() {
                return tl.get(i).map(function(e) {
                    return gl.convertToRange(i, e)
                })
            },
            fromSitus: function(e) {
                var t = bc.relative(e.start(), e.finish());
                return gl.convertToRange(i, t)
            },
            situsFromPoint: function(e, t) {
                return tl.getAtPoint(i, e, t).map(function(e) {
                    return {
                        start: y.constant(pc.on(e.start(), e.soffset())),
                        finish: y.constant(pc.on(e.finish(), e.foffset()))
                    }
                })
            },
            clearSelection: function() {
                tl.clear(i)
            },
            setSelection: function(e) {
                tl.setExact(i, e.start(), e.soffset(), e.finish(), e.foffset())
            },
            setRelativeSelection: function(e, t) {
                tl.setRelative(i, e, t)
            },
            selectContents: function(e) {
                tl.setToElement(i, e)
            },
            getInnerHeight: function() {
                return i.innerHeight
            },
            getScrollY: function() {
                return wl.get(X.fromDom(i.document)).top()
            },
            scrollBy: function(e, t) {
                wl.by(e, t, X.fromDom(i.document))
            }
        }
    }
    var xl = function(n, e, r, t, o) {
        return Ye.eq(r, t) ? x.none() : ir.identify(r, t, e).bind(function(e) {
            var t = e.boxes().getOr([]);
            return 0 < t.length ? (o(n, t, e.start(), e.finish()),
            x.some(ll.response(x.some(gl.makeSitus(r, 0, r, bn(r))), !0))) : x.none()
        })
    }
      , Sl = {
        sync: function(n, r, e, t, o, i, u) {
            return Ye.eq(e, o) && t === i ? x.none() : It.closest(e, "td,th", r).bind(function(t) {
                return It.closest(o, "td,th", r).bind(function(e) {
                    return xl(n, r, t, e, u)
                })
            })
        },
        detect: xl,
        update: function(e, t, n, r, o) {
            return ir.shiftSelection(r, e, t, o.firstSelectedSelector(), o.lastSelectedSelector()).map(function(e) {
                return o.clear(n),
                o.selectRange(n, e.boxes(), e.start(), e.finish()),
                e.boxes()
            })
        }
    }
      , Cl = q.immutableBag(["left", "top", "right", "bottom"], [])
      , Rl = {
        nu: Cl,
        moveUp: function(e, t) {
            return Cl({
                left: e.left(),
                top: e.top() - t,
                right: e.right(),
                bottom: e.bottom() - t
            })
        },
        moveDown: function(e, t) {
            return Cl({
                left: e.left(),
                top: e.top() + t,
                right: e.right(),
                bottom: e.bottom() + t
            })
        },
        moveBottomTo: function(e, t) {
            var n = e.bottom() - e.top();
            return Cl({
                left: e.left(),
                top: t - n,
                right: e.right(),
                bottom: t
            })
        },
        moveTopTo: function(e, t) {
            var n = e.bottom() - e.top();
            return Cl({
                left: e.left(),
                top: t,
                right: e.right(),
                bottom: t + n
            })
        },
        getTop: function(e) {
            return e.top()
        },
        getBottom: function(e) {
            return e.bottom()
        },
        translate: function(e, t, n) {
            return Cl({
                left: e.left() + t,
                top: e.top() + n,
                right: e.right() + t,
                bottom: e.bottom() + n
            })
        },
        toString: function(e) {
            return "(" + e.left() + ", " + e.top() + ") -> (" + e.right() + ", " + e.bottom() + ")"
        }
    }
      , Tl = function(e) {
        return Rl.nu({
            left: e.left,
            top: e.top,
            right: e.right,
            bottom: e.bottom
        })
    }
      , Dl = function(e, t) {
        return x.some(e.getRect(t))
    }
      , Al = function(e, t, n) {
        return ft.isElement(t) ? Dl(e, t).map(Tl) : ft.isText(t) ? (r = e,
        o = t,
        i = n,
        0 <= i && i < bn(o) ? r.getRangedRect(o, i, o, i + 1) : 0 < i ? r.getRangedRect(o, i - 1, o, i) : x.none()).map(Tl) : x.none();
        var r, o, i
    }
      , kl = function(e, t) {
        return ft.isElement(t) ? Dl(e, t).map(Tl) : ft.isText(t) ? e.getRangedRect(t, 0, t, bn(t)).map(Tl) : x.none()
    }
      , Nl = q.immutable("item", "mode")
      , El = function(e, t, n, r) {
        var o = r !== undefined ? r : Ol;
        return e.property().parent(t).map(function(e) {
            return Nl(e, o)
        })
    }
      , Ol = function(e, t, n, r) {
        var o = r !== undefined ? r : Bl;
        return n.sibling(e, t).map(function(e) {
            return Nl(e, o)
        })
    }
      , Bl = function(e, t, n, r) {
        var o = r !== undefined ? r : Bl
          , i = e.property().children(t);
        return n.first(i).map(function(e) {
            return Nl(e, o)
        })
    }
      , Pl = [{
        current: El,
        next: Ol,
        fallback: x.none()
    }, {
        current: Ol,
        next: Bl,
        fallback: x.some(El)
    }, {
        current: Bl,
        next: Bl,
        fallback: x.some(Ol)
    }]
      , Il = function(t, n, r, o, e) {
        return e = e !== undefined ? e : Pl,
        A.find(e, function(e) {
            return e.current === r
        }).bind(function(e) {
            return e.current(t, n, o, e.next).orThunk(function() {
                return e.fallback.bind(function(e) {
                    return Il(t, n, e, o)
                })
            })
        })
    }
      , Wl = {
        backtrack: El,
        sidestep: Ol,
        advance: Bl,
        go: Il
    }
      , Ml = {
        left: function() {
            return {
                sibling: function(e, t) {
                    return e.query().prevSibling(t)
                },
                first: function(e) {
                    return 0 < e.length ? x.some(e[e.length - 1]) : x.none()
                }
            }
        },
        right: function() {
            return {
                sibling: function(e, t) {
                    return e.query().nextSibling(t)
                },
                first: function(e) {
                    return 0 < e.length ? x.some(e[0]) : x.none()
                }
            }
        }
    }
      , Ll = function(t, e, n, r, o, i) {
        return Wl.go(t, e, r, o).bind(function(e) {
            return i(e.item()) ? x.none() : n(e.item()) ? x.some(e.item()) : Ll(t, e.item(), n, e.mode(), o, i)
        })
    }
      , ql = function(e, t, n, r) {
        return Ll(e, t, n, Wl.sidestep, Ml.left(), r)
    }
      , Fl = function(e, t, n, r) {
        return Ll(e, t, n, Wl.sidestep, Ml.right(), r)
    }
      , jl = function(e, t) {
        return 0 === e.property().children(t).length
    }
      , zl = function(e, t, n, r) {
        return ql(e, t, n, r)
    }
      , _l = function(e, t, n, r) {
        return Fl(e, t, n, r)
    }
      , Hl = {
        before: function(e, t, n) {
            return zl(e, t, y.curry(jl, e), n)
        },
        after: function(e, t, n) {
            return _l(e, t, y.curry(jl, e), n)
        },
        seekLeft: zl,
        seekRight: _l,
        walkers: function() {
            return {
                left: Ml.left,
                right: Ml.right
            }
        },
        walk: function(e, t, n, r, o) {
            return Wl.go(e, t, n, r, o)
        },
        backtrack: Wl.backtrack,
        sidestep: Wl.sidestep,
        advance: Wl.advance
    }
      , Vl = En()
      , Ul = {
        gather: function(e, t, n) {
            return Hl.gather(Vl, e, t, n)
        },
        before: function(e, t) {
            return Hl.before(Vl, e, t)
        },
        after: function(e, t) {
            return Hl.after(Vl, e, t)
        },
        seekLeft: function(e, t, n) {
            return Hl.seekLeft(Vl, e, t, n)
        },
        seekRight: function(e, t, n) {
            return Hl.seekRight(Vl, e, t, n)
        },
        walkers: function() {
            return Hl.walkers()
        },
        walk: function(e, t, n, r) {
            return Hl.walk(Vl, e, t, n, r)
        }
    }
      , Gl = dr([{
        none: []
    }, {
        retry: ["caret"]
    }])
      , Xl = function(t, e, r) {
        return Bt.closest(e, ko).fold(y.constant(!1), function(e) {
            return kl(t, e).exists(function(e) {
                return n = e,
                (t = r).left() < n.left() || Math.abs(n.right() - t.left()) < 1 || t.left() > n.right();
                var t, n
            })
        })
    }
      , Yl = {
        point: Rl.getTop,
        adjuster: function(e, t, n, r, o) {
            var i = Rl.moveUp(o, 5);
            return Math.abs(n.top() - r.top()) < 1 ? Gl.retry(i) : n.bottom() < o.top() ? Gl.retry(i) : n.bottom() === o.top() ? Gl.retry(Rl.moveUp(o, 1)) : Xl(e, t, o) ? Gl.retry(Rl.translate(i, 5, 0)) : Gl.none()
        },
        move: Rl.moveUp,
        gather: Ul.before
    }
      , Kl = {
        point: Rl.getBottom,
        adjuster: function(e, t, n, r, o) {
            var i = Rl.moveDown(o, 5);
            return Math.abs(n.bottom() - r.bottom()) < 1 ? Gl.retry(i) : n.top() > o.bottom() ? Gl.retry(i) : n.top() === o.bottom() ? Gl.retry(Rl.moveDown(o, 1)) : Xl(e, t, o) ? Gl.retry(Rl.translate(i, 5, 0)) : Gl.none()
        },
        move: Rl.moveDown,
        gather: Ul.after
    }
      , $l = function(n, r, o, i, u) {
        return 0 === u ? x.some(i) : (c = n,
        l = i.left(),
        s = r.point(i),
        c.elementFromPoint(l, s).filter(function(e) {
            return "table" === ft.name(e)
        }).isSome() ? (t = i,
        a = u - 1,
        $l(n, e = r, o, e.move(t, 5), a)) : n.situsFromPoint(i.left(), r.point(i)).bind(function(e) {
            return e.start().fold(x.none, function(t, e) {
                return kl(n, t, e).bind(function(e) {
                    return r.adjuster(n, t, e, o, i).fold(x.none, function(e) {
                        return $l(n, r, o, e, u - 1)
                    })
                }).orThunk(function() {
                    return x.some(i)
                })
            }, x.none)
        }));
        var e, t, a, c, l, s
    }
      , Jl = function(t, n, e) {
        var r, o, i, u = t.move(e, 5), a = $l(n, t, e, u, 100).getOr(u);
        return (r = t,
        o = a,
        i = n,
        r.point(o) > i.getInnerHeight() ? x.some(r.point(o) - i.getInnerHeight()) : r.point(o) < 0 ? x.some(-r.point(o)) : x.none()).fold(function() {
            return n.situsFromPoint(a.left(), t.point(a))
        }, function(e) {
            return n.scrollBy(0, e),
            n.situsFromPoint(a.left(), t.point(a) - e)
        })
    }
      , Ql = {
        tryUp: y.curry(Jl, Yl),
        tryDown: y.curry(Jl, Kl),
        ieTryUp: function(e, t) {
            return e.situsFromPoint(t.left(), t.top() - 5)
        },
        ieTryDown: function(e, t) {
            return e.situsFromPoint(t.left(), t.bottom() + 5)
        },
        getJumpSize: y.constant(5)
    }
      , Zl = dr([{
        none: ["message"]
    }, {
        success: []
    }, {
        failedUp: ["cell"]
    }, {
        failedDown: ["cell"]
    }])
      , es = function(e) {
        return It.closest(e, "tr")
    }
      , ts = {
        verify: function(a, e, t, n, r, c, o) {
            return It.closest(n, "td,th", o).bind(function(u) {
                return It.closest(e, "td,th", o).map(function(i) {
                    return Ye.eq(u, i) ? Ye.eq(n, u) && bn(u) === r ? c(i) : Zl.none("in same cell") : jn(es, [u, i]).fold(function() {
                        return t = i,
                        n = u,
                        r = (e = a).getRect(t),
                        (o = e.getRect(n)).right > r.left && o.left < r.right ? Zl.success() : c(i);
                        var e, t, n, r, o
                    }, function(e) {
                        return c(i)
                    })
                })
            }).getOr(Zl.none("default"))
        },
        cata: function(e, t, n, r, o) {
            return e.fold(t, n, r, o)
        },
        adt: Zl
    }
      , ns = {
        point: q.immutable("element", "offset"),
        delta: q.immutable("element", "deltaOffset"),
        range: q.immutable("element", "start", "finish"),
        points: q.immutable("begin", "end"),
        text: q.immutable("element", "text")
    }
      , rs = (q.immutable("ancestor", "descendants", "element", "index"),
    q.immutable("parent", "children", "element", "index"))
      , os = function(e, t) {
        return A.findIndex(e, y.curry(Ye.eq, t))
    }
      , is = function(r) {
        return nt.parent(r).bind(function(t) {
            var n = nt.children(t);
            return os(n, r).map(function(e) {
                return rs(t, n, r, e)
            })
        })
    }
      , us = function(e) {
        return "br" === ft.name(e)
    }
      , as = function(e, t, n) {
        return t(e, n).bind(function(e) {
            return ft.isText(e) && 0 === pn.get(e).trim().length ? as(e, t, n) : x.some(e)
        })
    }
      , cs = function(t, e, n, r) {
        return (o = e,
        i = n,
        nt.child(o, i).filter(us).orThunk(function() {
            return nt.child(o, i - 1).filter(us)
        })).bind(function(e) {
            return r.traverse(e).fold(function() {
                return as(e, r.gather, t).map(r.relative)
            }, function(e) {
                return is(e).map(function(e) {
                    return pc.on(e.parent(), e.index())
                })
            })
        });
        var o, i
    }
      , ls = function(e, t, n, r) {
        var o, i, u;
        return (us(t) ? (o = e,
        i = t,
        (u = r).traverse(i).orThunk(function() {
            return as(i, u.gather, o)
        }).map(u.relative)) : cs(e, t, n, r)).map(function(e) {
            return {
                start: y.constant(e),
                finish: y.constant(e)
            }
        })
    }
      , ss = function(e) {
        return ts.cata(e, function(e) {
            return x.none()
        }, function() {
            return x.none()
        }, function(e) {
            return x.some(ns.point(e, 0))
        }, function(e) {
            return x.some(ns.point(e, bn(e)))
        })
    }
      , fs = Ue.detect()
      , ds = function(r, o, i, u, a, c) {
        return 0 === c ? x.none() : ps(r, o, i, u, a).bind(function(e) {
            var t = r.fromSitus(e)
              , n = ts.verify(r, i, u, t.finish(), t.foffset(), a.failure, o);
            return ts.cata(n, function() {
                return x.none()
            }, function() {
                return x.some(e)
            }, function(e) {
                return Ye.eq(i, e) && 0 === u ? ms(r, i, u, Rl.moveUp, a) : ds(r, o, e, 0, a, c - 1)
            }, function(e) {
                return Ye.eq(i, e) && u === bn(e) ? ms(r, i, u, Rl.moveDown, a) : ds(r, o, e, bn(e), a, c - 1)
            })
        })
    }
      , ms = function(t, e, n, r, o) {
        return Al(t, e, n).bind(function(e) {
            return gs(t, o, r(e, Ql.getJumpSize()))
        })
    }
      , gs = function(e, t, n) {
        return fs.browser.isChrome() || fs.browser.isSafari() || fs.browser.isFirefox() || fs.browser.isEdge() ? t.otherRetry(e, n) : fs.browser.isIE() ? t.ieRetry(e, n) : x.none()
    }
      , ps = function(t, e, n, r, o) {
        return Al(t, n, r).bind(function(e) {
            return gs(t, o, e)
        })
    }
      , hs = function(t, n, r) {
        return (o = t,
        i = n,
        u = r,
        o.getSelection().bind(function(r) {
            return ls(i, r.finish(), r.foffset(), u).fold(function() {
                return x.some(ns.point(r.finish(), r.foffset()))
            }, function(e) {
                var t = o.fromSitus(e)
                  , n = ts.verify(o, r.finish(), r.foffset(), t.finish(), t.foffset(), u.failure, i);
                return ss(n)
            })
        })).bind(function(e) {
            return ds(t, n, e.element(), e.offset(), r, 20).map(t.fromSitus)
        });
        var o, i, u
    }
      , vs = function(e, t, n) {
        return Bt.ancestor(e, t, n).isSome()
    }
      , bs = Ue.detect()
      , ws = function(r, o, i, e, u) {
        return It.closest(e, "td,th", o).bind(function(n) {
            return It.closest(n, "table", o).bind(function(e) {
                return t = e,
                vs(u, function(e) {
                    return nt.parent(e).exists(function(e) {
                        return Ye.eq(e, t)
                    })
                }) ? hs(r, o, i).bind(function(t) {
                    return It.closest(t.finish(), "td,th", o).map(function(e) {
                        return {
                            start: y.constant(n),
                            finish: y.constant(e),
                            range: y.constant(t)
                        }
                    })
                }) : x.none();
                var t
            })
        })
    }
      , ys = function(e, t, n, r, o, i) {
        return bs.browser.isIE() ? x.none() : i(r, t).orThunk(function() {
            return ws(e, t, n, r, o).map(function(e) {
                var t = e.range();
                return ll.response(x.some(gl.makeSitus(t.start(), t.soffset(), t.finish(), t.foffset())), !0)
            })
        })
    }
      , xs = function(e, t, n, r, o, i, u) {
        return ws(e, n, r, o, i).bind(function(e) {
            return Sl.detect(t, n, e.start(), e.finish(), u)
        })
    }
      , Ss = function(e, r) {
        return It.closest(e, "tr", r).bind(function(n) {
            return It.closest(n, "table", r).bind(function(e) {
                var t = St.descendants(e, "tr");
                return Ye.eq(n, t[0]) ? Ul.seekLeft(e, function(e) {
                    return xn.last(e).isSome()
                }, r).map(function(e) {
                    var t = bn(e);
                    return ll.response(x.some(gl.makeSitus(e, t, e, t)), !0)
                }) : x.none()
            })
        })
    }
      , Cs = function(e, r) {
        return It.closest(e, "tr", r).bind(function(n) {
            return It.closest(n, "table", r).bind(function(e) {
                var t = St.descendants(e, "tr");
                return Ye.eq(n, t[t.length - 1]) ? Ul.seekRight(e, function(e) {
                    return xn.first(e).isSome()
                }, r).map(function(e) {
                    return ll.response(x.some(gl.makeSitus(e, 0, e, 0)), !0)
                }) : x.none()
            })
        })
    }
      , Rs = function(e, t) {
        return It.closest(e, "td,th", t)
    }
      , Ts = {
        down: {
            traverse: nt.nextSibling,
            gather: Ul.after,
            relative: pc.before,
            otherRetry: Ql.tryDown,
            ieRetry: Ql.ieTryDown,
            failure: ts.adt.failedDown
        },
        up: {
            traverse: nt.prevSibling,
            gather: Ul.before,
            relative: pc.before,
            otherRetry: Ql.tryUp,
            ieRetry: Ql.ieTryUp,
            failure: ts.adt.failedUp
        }
    }
      , Ds = q.immutable("rows", "cols")
      , As = {
        mouse: function(e, t, n, r) {
            var o, i, u, a, c, l, s = yl(e), f = (o = s,
            i = t,
            u = n,
            a = r,
            c = x.none(),
            l = function() {
                c = x.none()
            }
            ,
            {
                mousedown: function(e) {
                    a.clear(i),
                    c = Rs(e.target(), u)
                },
                mouseover: function(e) {
                    c.each(function(r) {
                        a.clear(i),
                        Rs(e.target(), u).each(function(n) {
                            ir.identify(r, n, u).each(function(e) {
                                var t = e.boxes().getOr([]);
                                (1 < t.length || 1 === t.length && !Ye.eq(r, n)) && (a.selectRange(i, t, e.start(), e.finish()),
                                o.selectContents(n))
                            })
                        })
                    })
                },
                mouseup: function() {
                    c.each(l)
                }
            });
            return {
                mousedown: f.mousedown,
                mouseover: f.mouseover,
                mouseup: f.mouseup
            }
        },
        keyboard: function(e, c, l, s) {
            var f = yl(e)
              , d = function() {
                return s.clear(c),
                x.none()
            };
            return {
                keydown: function(e, t, n, r, o, i) {
                    var u = e.raw().which
                      , a = !0 === e.raw().shiftKey;
                    return ir.retrieve(c, s.selectedSelector()).fold(function() {
                        return ml.isDown(u) && a ? y.curry(xs, f, c, l, Ts.down, r, t, s.selectRange) : ml.isUp(u) && a ? y.curry(xs, f, c, l, Ts.up, r, t, s.selectRange) : ml.isDown(u) ? y.curry(ys, f, l, Ts.down, r, t, Cs) : ml.isUp(u) ? y.curry(ys, f, l, Ts.up, r, t, Ss) : x.none
                    }, function(t) {
                        var e = function(e) {
                            return function() {
                                return Lo(e, function(e) {
                                    return Sl.update(e.rows(), e.cols(), c, t, s)
                                }).fold(function() {
                                    return ir.getEdges(c, s.firstSelectedSelector(), s.lastSelectedSelector()).map(function(e) {
                                        var t = ml.isDown(u) || i.isForward(u) ? pc.after : pc.before;
                                        return f.setRelativeSelection(pc.on(e.first(), 0), t(e.table())),
                                        s.clear(c),
                                        ll.response(x.none(), !0)
                                    })
                                }, function(e) {
                                    return x.some(ll.response(x.none(), !0))
                                })
                            }
                        };
                        return ml.isDown(u) && a ? e([Ds(1, 0)]) : ml.isUp(u) && a ? e([Ds(-1, 0)]) : i.isBackward(u) && a ? e([Ds(0, -1), Ds(-1, 0)]) : i.isForward(u) && a ? e([Ds(0, 1), Ds(1, 0)]) : ml.isNavigation(u) && !1 === a ? d : x.none
                    })()
                },
                keyup: function(t, n, r, o, i) {
                    return ir.retrieve(c, s.selectedSelector()).fold(function() {
                        var e = t.raw().which;
                        return 0 == (!0 === t.raw().shiftKey) ? x.none() : ml.isNavigation(e) ? Sl.sync(c, l, n, r, o, i, s.selectRange) : x.none()
                    }, x.none)
                }
            }
        }
    }
      , ks = function(t, e) {
        A.each(e, function(e) {
            vi.remove(t, e)
        })
    }
      , Ns = function(t) {
        return function(e) {
            vi.add(e, t)
        }
    }
      , Es = function(t) {
        return function(e) {
            ks(e, t)
        }
    }
      , Os = {
        byClass: function(o) {
            var i = Ns(o.selected())
              , n = Es([o.selected(), o.lastSelected(), o.firstSelected()])
              , u = function(e) {
                var t = St.descendants(e, o.selectedSelector());
                A.each(t, n)
            };
            return {
                clear: u,
                selectRange: function(e, t, n, r) {
                    u(e),
                    A.each(t, i),
                    vi.add(n, o.firstSelected()),
                    vi.add(r, o.lastSelected())
                },
                selectedSelector: o.selectedSelector,
                firstSelectedSelector: o.firstSelectedSelector,
                lastSelectedSelector: o.lastSelectedSelector
            }
        },
        byAttr: function(o) {
            var n = function(e) {
                ht.remove(e, o.selected()),
                ht.remove(e, o.firstSelected()),
                ht.remove(e, o.lastSelected())
            }
              , i = function(e) {
                ht.set(e, o.selected(), "1")
            }
              , u = function(e) {
                var t = St.descendants(e, o.selectedSelector());
                A.each(t, n)
            };
            return {
                clear: u,
                selectRange: function(e, t, n, r) {
                    u(e),
                    A.each(t, i),
                    ht.set(n, o.firstSelected(), "1"),
                    ht.set(r, o.lastSelected(), "1")
                },
                selectedSelector: o.selectedSelector,
                firstSelectedSelector: o.firstSelectedSelector,
                lastSelectedSelector: o.lastSelectedSelector
            }
        }
    };
    function Bs(p, h) {
        var v = q.immutableBag(["mousedown", "mouseover", "mouseup", "keyup", "keydown"], [])
          , b = x.none()
          , w = Os.byAttr(fr);
        return p.on("init", function(e) {
            var r = p.getWin()
              , i = Uu.getBody(p)
              , t = Uu.getIsRoot(p)
              , n = As.mouse(r, i, t, w)
              , a = As.keyboard(r, i, t, w)
              , c = function(e, t) {
                !0 === e.raw().shiftKey && (t.kill() && e.kill(),
                t.selection().each(function(e) {
                    var t = bc.relative(e.start(), e.finish())
                      , n = Nc.asLtrRange(r, t);
                    p.selection.setRng(n)
                }))
            }
              , o = function(e) {
                var t = s(e);
                if (t.raw().shiftKey && ml.isNavigation(t.raw().which)) {
                    var n = p.selection.getRng()
                      , r = X.fromDom(n.startContainer)
                      , o = X.fromDom(n.endContainer);
                    a.keyup(t, r, n.startOffset, o, n.endOffset).each(function(e) {
                        c(t, e)
                    })
                }
            }
              , u = function(e) {
                var t = s(e);
                h().each(function(e) {
                    e.hideBars()
                });
                var n = p.selection.getRng()
                  , r = X.fromDom(p.selection.getStart())
                  , o = X.fromDom(n.startContainer)
                  , i = X.fromDom(n.endContainer)
                  , u = $u.directionAt(r).isRtl() ? ml.rtl : ml.ltr;
                a.keydown(t, o, n.startOffset, i, n.endOffset, u).each(function(e) {
                    c(t, e)
                }),
                h().each(function(e) {
                    e.showBars()
                })
            }
              , l = function(e) {
                return e.hasOwnProperty("x") && e.hasOwnProperty("y")
            }
              , s = function(e) {
                var t = X.fromDom(e.target)
                  , n = function() {
                    e.stopPropagation()
                }
                  , r = function() {
                    e.preventDefault()
                }
                  , o = y.compose(r, n);
                return {
                    target: y.constant(t),
                    x: y.constant(l(e) ? e.x : null),
                    y: y.constant(l(e) ? e.y : null),
                    stop: n,
                    prevent: r,
                    kill: o,
                    raw: y.constant(e)
                }
            }
              , f = function(e) {
                return 0 === e.button
            }
              , d = function(e) {
                f(e) && n.mousedown(s(e))
            }
              , m = function(e) {
                var t;
                ((t = e).buttons === undefined || 0 != (1 & t.buttons)) && n.mouseover(s(e))
            }
              , g = function(e) {
                f(e) && n.mouseup(s(e))
            };
            p.on("mousedown", d),
            p.on("mouseover", m),
            p.on("mouseup", g),
            p.on("keyup", o),
            p.on("keydown", u),
            p.on("nodechange", function() {
                var e = p.selection
                  , t = X.fromDom(e.getStart())
                  , n = X.fromDom(e.getEnd())
                  , r = jt.table(t)
                  , o = jt.table(n);
                r.bind(function(t) {
                    return o.bind(function(e) {
                        return Ye.eq(t, e) ? x.some(!0) : x.none()
                    })
                }).fold(function() {
                    w.clear(i)
                }, y.noop)
            }),
            b = x.some(v({
                mousedown: d,
                mouseover: m,
                mouseup: g,
                keyup: o,
                keydown: u
            }))
        }),
        {
            clear: w.clear,
            destroy: function() {
                b.each(function(e) {})
            }
        }
    }
    var Ps = function(t) {
        return {
            get: function() {
                var e = Uu.getBody(t);
                return ur(e, fr.selectedSelector()).fold(function() {
                    return t.selection.getStart() === undefined ? gr.none() : gr.single(t.selection)
                }, function(e) {
                    return gr.multiple(e)
                })
            }
        }
    }
      , Is = ma.each
      , Ws = {
        addButtons: function(t) {
            var n = [];
            function e(e) {
                return function() {
                    t.execCommand(e)
                }
            }
            Is("inserttable tableprops deletetable | cell row column".split(" "), function(e) {
                "|" === e ? n.push({
                    text: "-"
                }) : n.push(t.menuItems[e])
            }),
            t.addButton("table", {
                type: "menubutton",
                title: "Table",
                menu: n
            }),
            t.addButton("tableprops", {
                title: "Table properties",
                onclick: y.curry(Oa, t, !0),
                icon: "table"
            }),
            t.addButton("tabledelete", {
                title: "Delete table",
                onclick: e("mceTableDelete")
            }),
            t.addButton("tablecellprops", {
                title: "Cell properties",
                onclick: e("mceTableCellProps")
            }),
            t.addButton("tablemergecells", {
                title: "Merge cells",
                onclick: e("mceTableMergeCells")
            }),
            t.addButton("tablesplitcells", {
                title: "Split cell",
                onclick: e("mceTableSplitCells")
            }),
            t.addButton("tableinsertrowbefore", {
                title: "Insert row before",
                onclick: e("mceTableInsertRowBefore")
            }),
            t.addButton("tableinsertrowafter", {
                title: "Insert row after",
                onclick: e("mceTableInsertRowAfter")
            }),
            t.addButton("tabledeleterow", {
                title: "Delete row",
                onclick: e("mceTableDeleteRow")
            }),
            t.addButton("tablerowprops", {
                title: "Row properties",
                onclick: e("mceTableRowProps")
            }),
            t.addButton("tablecutrow", {
                title: "Cut row",
                onclick: e("mceTableCutRow")
            }),
            t.addButton("tablecopyrow", {
                title: "Copy row",
                onclick: e("mceTableCopyRow")
            }),
            t.addButton("tablepasterowbefore", {
                title: "Paste row before",
                onclick: e("mceTablePasteRowBefore")
            }),
            t.addButton("tablepasterowafter", {
                title: "Paste row after",
                onclick: e("mceTablePasteRowAfter")
            }),
            t.addButton("tableinsertcolbefore", {
                title: "Insert column before",
                onclick: e("mceTableInsertColBefore")
            }),
            t.addButton("tableinsertcolafter", {
                title: "Insert column after",
                onclick: e("mceTableInsertColAfter")
            }),
            t.addButton("tabledeletecol", {
                title: "Delete column",
                onclick: e("mceTableDeleteCol")
            })
        },
        addToolbars: function(t) {
            var e, n = "" === (e = t.getParam("table_toolbar", Ju)) || !1 === e ? [] : W.isString(e) ? e.split(/[ ,]/) : W.isArray(e) ? e : [];
            0 < n.length && t.addContextToolbar(function(e) {
                return t.dom.is(e, "table") && t.getBody().contains(e)
            }, n.join(" "))
        }
    }
      , Ms = {
        addMenuItems: function(o, n) {
            var r = x.none()
              , i = []
              , u = []
              , a = []
              , c = []
              , l = function(e) {
                e.disabled(!0)
            }
              , s = function(e) {
                e.disabled(!1)
            }
              , e = function() {
                var t = this;
                i.push(t),
                r.fold(function() {
                    l(t)
                }, function(e) {
                    s(t)
                })
            }
              , t = function() {
                var t = this;
                u.push(t),
                r.fold(function() {
                    l(t)
                }, function(e) {
                    s(t)
                })
            };
            o.on("init", function() {
                o.on("nodechange", function(e) {
                    var t = x.from(o.dom.getParent(o.selection.getStart(), "th,td"));
                    (r = t.bind(function(e) {
                        var t = X.fromDom(e);
                        return jt.table(t).map(function(e) {
                            return xr.forMenu(n, e, t)
                        })
                    })).fold(function() {
                        A.each(i, l),
                        A.each(u, l),
                        A.each(a, l),
                        A.each(c, l)
                    }, function(t) {
                        A.each(i, s),
                        A.each(u, s),
                        A.each(a, function(e) {
                            e.disabled(t.mergable().isNone())
                        }),
                        A.each(c, function(e) {
                            e.disabled(t.unmergable().isNone())
                        })
                    })
                })
            });
            var f = function(e, t, n, r) {
                var o, i, u, a, c, l = r.getEl().getElementsByTagName("table")[0], s = r.isRtl() || "tl-tr" === r.parent().rel;
                for (l.nextSibling.innerHTML = t + 1 + " x " + (n + 1),
                s && (t = 9 - t),
                i = 0; i < 10; i++)
                    for (o = 0; o < 10; o++)
                        a = l.rows[i].childNodes[o].firstChild,
                        c = (s ? t <= o : o <= t) && i <= n,
                        e.dom.toggleClass(a, "mce-active", c),
                        c && (u = a);
                return u.parentNode
            }
              , d = !1 === o.getParam("table_grid", !0, "boolean") ? {
                text: "Table",
                icon: "table",
                context: "table",
                onclick: y.curry(Oa, o)
            } : {
                text: "Table",
                icon: "table",
                context: "table",
                ariaHideMenu: !0,
                onclick: function(e) {
                    e.aria && (this.parent().hideAll(),
                    e.stopImmediatePropagation(),
                    Oa(o))
                },
                onshow: function() {
                    f(o, 0, 0, this.menu.items()[0])
                },
                onhide: function() {
                    var e = this.menu.items()[0].getEl().getElementsByTagName("a");
                    o.dom.removeClass(e, "mce-active"),
                    o.dom.addClass(e[0], "mce-active")
                },
                menu: [{
                    type: "container",
                    html: function() {
                        var e = "";
                        e = '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';
                        for (var t = 0; t < 10; t++) {
                            e += "<tr>";
                            for (var n = 0; n < 10; n++)
                                e += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (10 * t + n) + '" href="#" data-mce-x="' + n + '" data-mce-y="' + t + '"></a></td>';
                            e += "</tr>"
                        }
                        return e += "</table>",
                        e += '<div class="mce-text-center" role="presentation">1 x 1</div>'
                    }(),
                    onPostRender: function() {
                        this.lastX = this.lastY = 0
                    },
                    onmousemove: function(e) {
                        var t, n, r = e.target;
                        "A" === r.tagName.toUpperCase() && (t = parseInt(r.getAttribute("data-mce-x"), 10),
                        n = parseInt(r.getAttribute("data-mce-y"), 10),
                        (this.isRtl() || "tl-tr" === this.parent().rel) && (t = 9 - t),
                        t === this.lastX && n === this.lastY || (f(o, t, n, e.control),
                        this.lastX = t,
                        this.lastY = n))
                    },
                    onclick: function(e) {
                        var t = this;
                        "A" === e.target.tagName.toUpperCase() && (e.preventDefault(),
                        e.stopPropagation(),
                        t.parent().cancel(),
                        o.undoManager.transact(function() {
                            ka(o, t.lastX + 1, t.lastY + 1)
                        }),
                        o.addVisual())
                    }
                }]
            };
            function m(e) {
                return function() {
                    o.execCommand(e)
                }
            }
            var g = {
                text: "Table properties",
                context: "table",
                onPostRender: e,
                onclick: y.curry(Oa, o, !0)
            }
              , p = {
                text: "Delete table",
                context: "table",
                onPostRender: e,
                cmd: "mceTableDelete"
            }
              , h = {
                text: "Row",
                context: "table",
                menu: [{
                    text: "Insert row before",
                    onclick: m("mceTableInsertRowBefore"),
                    onPostRender: t
                }, {
                    text: "Insert row after",
                    onclick: m("mceTableInsertRowAfter"),
                    onPostRender: t
                }, {
                    text: "Delete row",
                    onclick: m("mceTableDeleteRow"),
                    onPostRender: t
                }, {
                    text: "Row properties",
                    onclick: m("mceTableRowProps"),
                    onPostRender: t
                }, {
                    text: "-"
                }, {
                    text: "Cut row",
                    onclick: m("mceTableCutRow"),
                    onPostRender: t
                }, {
                    text: "Copy row",
                    onclick: m("mceTableCopyRow"),
                    onPostRender: t
                }, {
                    text: "Paste row before",
                    onclick: m("mceTablePasteRowBefore"),
                    onPostRender: t
                }, {
                    text: "Paste row after",
                    onclick: m("mceTablePasteRowAfter"),
                    onPostRender: t
                }]
            }
              , v = {
                text: "Column",
                context: "table",
                menu: [{
                    text: "Insert column before",
                    onclick: m("mceTableInsertColBefore"),
                    onPostRender: t
                }, {
                    text: "Insert column after",
                    onclick: m("mceTableInsertColAfter"),
                    onPostRender: t
                }, {
                    text: "Delete column",
                    onclick: m("mceTableDeleteCol"),
                    onPostRender: t
                }]
            }
              , b = {
                separator: "before",
                text: "Cell",
                context: "table",
                menu: [{
                    text: "Cell properties",
                    onclick: m("mceTableCellProps"),
                    onPostRender: t
                }, {
                    text: "Merge cells",
                    onclick: m("mceTableMergeCells"),
                    onPostRender: function() {
                        var t = this;
                        a.push(t),
                        r.fold(function() {
                            l(t)
                        }, function(e) {
                            t.disabled(e.mergable().isNone())
                        })
                    }
                }, {
                    text: "Split cell",
                    onclick: m("mceTableSplitCells"),
                    onPostRender: function() {
                        var t = this;
                        c.push(t),
                        r.fold(function() {
                            l(t)
                        }, function(e) {
                            t.disabled(e.unmergable().isNone())
                        })
                    }
                }]
            };
            o.addMenuItem("inserttable", d),
            o.addMenuItem("tableprops", g),
            o.addMenuItem("deletetable", p),
            o.addMenuItem("row", h),
            o.addMenuItem("column", v),
            o.addMenuItem("cell", b)
        }
    }
      , Ls = function(n, o) {
        return {
            insertTable: function(e, t) {
                return ka(n, e, t)
            },
            setClipboardRows: function(e) {
                return t = e,
                n = o,
                r = A.map(t, X.fromDom),
                void n.set(x.from(r));
                var t, n, r
            },
            getClipboardRows: function() {
                return o.get().fold(function() {}, function(e) {
                    return A.map(e, function(e) {
                        return e.dom()
                    })
                })
            }
        }
    };
    u.add("table", function(t) {
        var n = ic(t)
          , e = Bs(t, n.lazyResize)
          , r = fa(t, n.lazyWire)
          , o = Ps(t)
          , i = so(x.none());
        return Pa.registerCommands(t, r, e, o, i),
        Sr.registerEvents(t, o, r, e),
        Ms.addMenuItems(t, o),
        Ws.addButtons(t),
        Ws.addToolbars(t),
        t.on("PreInit", function() {
            t.serializer.addTempAttr(fr.firstSelected()),
            t.serializer.addTempAttr(fr.lastSelected())
        }),
        ea(t) && t.on("keydown", function(e) {
            cl.handle(e, t, r, n.lazyWire)
        }),
        t.on("remove", function() {
            n.destroy(),
            e.destroy()
        }),
        Ls(t, i)
    })
}();
