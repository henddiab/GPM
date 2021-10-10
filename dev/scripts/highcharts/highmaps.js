/*
 Highcharts JS v7.1.0 (2019-04-01)

 (c) 2011-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(O, K) { "object" === typeof module && module.exports ? (K["default"] = K, module.exports = O.document ? K(O) : K) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function() { return K(O) }) : (O.Highcharts && O.Highcharts.error(16, !0), O.Highcharts = K(O)) })("undefined" !== typeof window ? window : this, function(O) {
    function K(a, D, F, E) { a.hasOwnProperty(D) || (a[D] = E.apply(null, F)) }
    var I = {};
    K(I, "parts/Globals.js", [], function() {
        var a = "undefined" === typeof O ? "undefined" !== typeof window ? window : {} : O,
            D = a.document,
            F = a.navigator && a.navigator.userAgent || "",
            E = D && D.createElementNS && !!D.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            h = /(edge|msie|trident)/i.test(F) && !a.opera,
            d = -1 !== F.indexOf("Firefox"),
            u = -1 !== F.indexOf("Chrome"),
            v = d && 4 > parseInt(F.split("Firefox/")[1], 10);
        return {
            product: "Highcharts",
            version: "7.1.0",
            deg2rad: 2 * Math.PI / 360,
            doc: D,
            hasBidiBug: v,
            hasTouch: D && void 0 !== D.documentElement.ontouchstart,
            isMS: h,
            isWebKit: -1 !== F.indexOf("AppleWebKit"),
            isFirefox: d,
            isChrome: u,
            isSafari: !u && -1 !== F.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: E,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: [],
            dateFormats: {}
        }
    });
    K(I, "parts/Utilities.js", [I["parts/Globals.js"]], function(a) {
        a.timers = [];
        var D = a.charts,
            F = a.doc,
            E = a.win;
        a.error = function(h, d, u) {
            var v = a.isNumber(h) ? "Highcharts error #" + h + ": www.highcharts.com/errors/" + h : h,
                r = function() {
                    if (d) throw Error(v);
                    E.console &&
                        console.log(v)
                };
            u ? a.fireEvent(u, "displayError", { code: h, message: v }, r) : r()
        };
        a.Fx = function(a, d, u) {
            this.options = d;
            this.elem = a;
            this.prop = u
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    d = this.paths[1],
                    u = [],
                    v = this.now,
                    r = a.length,
                    w;
                if (1 === v) u = this.toD;
                else if (r === d.length && 1 > v)
                    for (; r--;) w = parseFloat(a[r]), u[r] = isNaN(w) ? d[r] : v * parseFloat(d[r] - w) + w;
                else u = d;
                this.elem.attr("d", u, null, !0)
            },
            update: function() {
                var a = this.elem,
                    d = this.prop,
                    u = this.now,
                    v = this.options.step;
                if (this[d + "Setter"]) this[d + "Setter"]();
                else a.attr ? a.element && a.attr(d, u, null, !0) : a.style[d] = u + this.unit;
                v && v.call(a, u, this)
            },
            run: function(h, d, u) {
                var v = this,
                    r = v.options,
                    w = function(a) { return w.stopped ? !1 : v.step(a) },
                    p = E.requestAnimationFrame || function(a) { setTimeout(a, 13) },
                    k = function() {
                        for (var l = 0; l < a.timers.length; l++) a.timers[l]() || a.timers.splice(l--, 1);
                        a.timers.length && p(k)
                    };
                h !== d || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = h, this.end = d, this.unit = u, this.now = this.start, this.pos = 0, w.elem = this.elem, w.prop =
                    this.prop, w() && 1 === a.timers.push(w) && p(k)) : (delete r.curAnim[this.prop], r.complete && 0 === Object.keys(r.curAnim).length && r.complete.call(this.elem))
            },
            step: function(h) {
                var d = +new Date,
                    u, v = this.options,
                    r = this.elem,
                    w = v.complete,
                    p = v.duration,
                    k = v.curAnim;
                r.attr && !r.element ? h = !1 : h || d >= p + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), u = k[this.prop] = !0, a.objectEach(k, function(a) {!0 !== a && (u = !1) }), u && w && w.call(r), h = !1) : (this.pos = v.easing((d - this.startTime) / p), this.now = this.start + (this.end - this.start) *
                    this.pos, this.update(), h = !0);
                return h
            },
            initPath: function(h, d, u) {
                function v(a) { var c, f; for (b = a.length; b--;) c = "M" === a[b] || "L" === a[b], f = /[a-zA-Z]/.test(a[b + 3]), c && f && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2]) }

                function r(a, f) {
                    for (; a.length < c;) {
                        a[0] = f[c - a.length];
                        var e = a.slice(0, g);
                        [].splice.apply(a, [0, 0].concat(e));
                        n && (e = a.slice(a.length - g), [].splice.apply(a, [a.length, 0].concat(e)), b--)
                    }
                    a[0] = "M"
                }

                function w(a, b) {
                    for (var q = (c - a.length) / g; 0 < q && q--;) f = a.slice().splice(a.length / t - g, g * t), f[0] = b[c - g - q * g], e &&
                        (f[g - 6] = f[g - 2], f[g - 5] = f[g - 1]), [].splice.apply(a, [a.length / t, 0].concat(f)), n && q--
                }
                d = d || "";
                var p, k = h.startX,
                    l = h.endX,
                    e = -1 < d.indexOf("C"),
                    g = e ? 7 : 3,
                    c, f, b;
                d = d.split(" ");
                u = u.slice();
                var n = h.isArea,
                    t = n ? 2 : 1,
                    x;
                e && (v(d), v(u));
                if (k && l) {
                    for (b = 0; b < k.length; b++)
                        if (k[b] === l[0]) { p = b; break } else if (k[0] === l[l.length - k.length + b]) {
                        p = b;
                        x = !0;
                        break
                    }
                    void 0 === p && (d = [])
                }
                d.length && a.isNumber(p) && (c = u.length + p * t * g, x ? (r(d, u), w(u, d)) : (r(u, d), w(d, u)));
                return [d, u]
            },
            fillSetter: function() { a.Fx.prototype.strokeSetter.apply(this, arguments) },
            strokeSetter: function() { this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0) }
        };
        a.merge = function() {
            var h, d = arguments,
                u, v = {},
                r = function(h, p) {
                    "object" !== typeof h && (h = {});
                    a.objectEach(p, function(k, l) {!a.isObject(k, !0) || a.isClass(k) || a.isDOMElement(k) ? h[l] = p[l] : h[l] = r(h[l] || {}, k) });
                    return h
                };
            !0 === d[0] && (v = d[1], d = Array.prototype.slice.call(d, 2));
            u = d.length;
            for (h = 0; h < u; h++) v = r(v, d[h]);
            return v
        };
        a.pInt = function(a, d) { return parseInt(a, d || 10) };
        a.isString = function(a) {
            return "string" ===
                typeof a
        };
        a.isArray = function(a) { a = Object.prototype.toString.call(a); return "[object Array]" === a || "[object Array Iterator]" === a };
        a.isObject = function(h, d) { return !!h && "object" === typeof h && (!d || !a.isArray(h)) };
        a.isDOMElement = function(h) { return a.isObject(h) && "number" === typeof h.nodeType };
        a.isClass = function(h) { var d = h && h.constructor; return !(!a.isObject(h, !0) || a.isDOMElement(h) || !d || !d.name || "Object" === d.name) };
        a.isNumber = function(a) { return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a };
        a.erase =
            function(a, d) {
                for (var h = a.length; h--;)
                    if (a[h] === d) { a.splice(h, 1); break }
            };
        a.defined = function(a) { return void 0 !== a && null !== a };
        a.attr = function(h, d, u) {
            var v;
            a.isString(d) ? a.defined(u) ? h.setAttribute(d, u) : h && h.getAttribute && ((v = h.getAttribute(d)) || "class" !== d || (v = h.getAttribute(d + "Name"))) : a.defined(d) && a.isObject(d) && a.objectEach(d, function(a, d) { h.setAttribute(d, a) });
            return v
        };
        a.splat = function(h) { return a.isArray(h) ? h : [h] };
        a.syncTimeout = function(a, d, u) {
            if (d) return setTimeout(a, d, u);
            a.call(0, u)
        };
        a.clearTimeout =
            function(h) { a.defined(h) && clearTimeout(h) };
        a.extend = function(a, d) {
            var h;
            a || (a = {});
            for (h in d) a[h] = d[h];
            return a
        };
        a.pick = function() {
            var a = arguments,
                d, u, v = a.length;
            for (d = 0; d < v; d++)
                if (u = a[d], void 0 !== u && null !== u) return u
        };
        a.css = function(h, d) {
            a.isMS && !a.svg && d && void 0 !== d.opacity && (d.filter = "alpha(opacity\x3d" + 100 * d.opacity + ")");
            a.extend(h.style, d)
        };
        a.createElement = function(h, d, u, v, r) {
            h = F.createElement(h);
            var w = a.css;
            d && a.extend(h, d);
            r && w(h, { padding: 0, border: "none", margin: 0 });
            u && w(h, u);
            v && v.appendChild(h);
            return h
        };
        a.extendClass = function(h, d) {
            var u = function() {};
            u.prototype = new h;
            a.extend(u.prototype, d);
            return u
        };
        a.pad = function(a, d, u) { return Array((d || 2) + 1 - String(a).replace("-", "").length).join(u || 0) + a };
        a.relativeLength = function(a, d, u) { return /%$/.test(a) ? d * parseFloat(a) / 100 + (u || 0) : parseFloat(a) };
        a.wrap = function(a, d, u) {
            var h = a[d];
            a[d] = function() {
                var a = Array.prototype.slice.call(arguments),
                    d = arguments,
                    p = this;
                p.proceed = function() { h.apply(p, arguments.length ? arguments : d) };
                a.unshift(h);
                a = u.apply(this, a);
                p.proceed = null;
                return a
            }
        };
        a.datePropsToTimestamps = function(h) { a.objectEach(h, function(d, u) { a.isObject(d) && "function" === typeof d.getTime ? h[u] = d.getTime() : (a.isObject(d) || a.isArray(d)) && a.datePropsToTimestamps(d) }) };
        a.formatSingle = function(h, d, u) {
            var v = /\.([0-9])/,
                r = a.defaultOptions.lang;
            /f$/.test(h) ? (u = (u = h.match(v)) ? u[1] : -1, null !== d && (d = a.numberFormat(d, u, r.decimalPoint, -1 < h.indexOf(",") ? r.thousandsSep : ""))) : d = (u || a.time).dateFormat(h, d);
            return d
        };
        a.format = function(h, d, u) {
            for (var v = "{", r = !1, w, p, k,
                    l, e = [], g; h;) {
                v = h.indexOf(v);
                if (-1 === v) break;
                w = h.slice(0, v);
                if (r) {
                    w = w.split(":");
                    p = w.shift().split(".");
                    l = p.length;
                    g = d;
                    for (k = 0; k < l; k++) g && (g = g[p[k]]);
                    w.length && (g = a.formatSingle(w.join(":"), g, u));
                    e.push(g)
                } else e.push(w);
                h = h.slice(v + 1);
                v = (r = !r) ? "}" : "{"
            }
            e.push(h);
            return e.join("")
        };
        a.getMagnitude = function(a) { return Math.pow(10, Math.floor(Math.log(a) / Math.LN10)) };
        a.normalizeTickInterval = function(h, d, u, v, r) {
            var w, p = h;
            u = a.pick(u, 1);
            w = h / u;
            d || (d = r ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === v && (1 ===
                u ? d = d.filter(function(a) { return 0 === a % 1 }) : .1 >= u && (d = [1 / u])));
            for (v = 0; v < d.length && !(p = d[v], r && p * u >= h || !r && w <= (d[v] + (d[v + 1] || d[v])) / 2); v++);
            return p = a.correctFloat(p * u, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, d) {
            var h = a.length,
                v, r;
            for (r = 0; r < h; r++) a[r].safeI = r;
            a.sort(function(a, p) { v = d(a, p); return 0 === v ? a.safeI - p.safeI : v });
            for (r = 0; r < h; r++) delete a[r].safeI
        };
        a.arrayMin = function(a) { for (var d = a.length, h = a[0]; d--;) a[d] < h && (h = a[d]); return h };
        a.arrayMax = function(a) {
            for (var d = a.length,
                    h = a[0]; d--;) a[d] > h && (h = a[d]);
            return h
        };
        a.destroyObjectProperties = function(h, d) {
            a.objectEach(h, function(a, v) {
                a && a !== d && a.destroy && a.destroy();
                delete h[v]
            })
        };
        a.discardElement = function(h) {
            var d = a.garbageBin;
            d || (d = a.createElement("div"));
            h && d.appendChild(h);
            d.innerHTML = ""
        };
        a.correctFloat = function(a, d) { return parseFloat(a.toPrecision(d || 14)) };
        a.setAnimation = function(h, d) { d.renderer.globalAnimation = a.pick(h, d.options.chart.animation, !0) };
        a.animObject = function(h) {
            return a.isObject(h) ? a.merge(h) : {
                duration: h ?
                    500 : 0
            }
        };
        a.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 };
        a.numberFormat = function(h, d, u, v) {
            h = +h || 0;
            d = +d;
            var r = a.defaultOptions.lang,
                w = (h.toString().split(".")[1] || "").split("e")[0].length,
                p, k, l = h.toString().split("e"); - 1 === d ? d = Math.min(w, 20) : a.isNumber(d) ? d && l[1] && 0 > l[1] && (p = d + +l[1], 0 <= p ? (l[0] = (+l[0]).toExponential(p).split("e")[0], d = p) : (l[0] = l[0].split(".")[0] || 0, h = 20 > d ? (l[0] * Math.pow(10, l[1])).toFixed(d) : 0, l[1] = 0)) : d = 2;
            k = (Math.abs(l[1] ?
                l[0] : h) + Math.pow(10, -Math.max(d, w) - 1)).toFixed(d);
            w = String(a.pInt(k));
            p = 3 < w.length ? w.length % 3 : 0;
            u = a.pick(u, r.decimalPoint);
            v = a.pick(v, r.thousandsSep);
            h = (0 > h ? "-" : "") + (p ? w.substr(0, p) + v : "");
            h += w.substr(p).replace(/(\d{3})(?=\d)/g, "$1" + v);
            d && (h += u + k.slice(-d));
            l[1] && 0 !== +h && (h += "e" + l[1]);
            return h
        };
        Math.easeInOutSine = function(a) { return -.5 * (Math.cos(Math.PI * a) - 1) };
        a.getStyle = function(h, d, u) {
            if ("width" === d) return Math.max(0, Math.min(h.offsetWidth, h.scrollWidth, h.getBoundingClientRect && "none" === a.getStyle(h,
                "transform", !1) ? Math.floor(h.getBoundingClientRect().width) : Infinity) - a.getStyle(h, "padding-left") - a.getStyle(h, "padding-right"));
            if ("height" === d) return Math.max(0, Math.min(h.offsetHeight, h.scrollHeight) - a.getStyle(h, "padding-top") - a.getStyle(h, "padding-bottom"));
            E.getComputedStyle || a.error(27, !0);
            if (h = E.getComputedStyle(h, void 0)) h = h.getPropertyValue(d), a.pick(u, "opacity" !== d) && (h = a.pInt(h));
            return h
        };
        a.inArray = function(a, d, u) { return d.indexOf(a, u) };
        a.find = Array.prototype.find ? function(a, d) { return a.find(d) } :
            function(a, d) {
                var h, v = a.length;
                for (h = 0; h < v; h++)
                    if (d(a[h], h)) return a[h]
            };
        a.keys = Object.keys;
        a.offset = function(a) {
            var d = F.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : { top: 0, left: 0 };
            return { top: a.top + (E.pageYOffset || d.scrollTop) - (d.clientTop || 0), left: a.left + (E.pageXOffset || d.scrollLeft) - (d.clientLeft || 0) }
        };
        a.stop = function(h, d) { for (var u = a.timers.length; u--;) a.timers[u].elem !== h || d && d !== a.timers[u].prop || (a.timers[u].stopped = !0) };
        a.objectEach = function(a, d, u) {
            for (var h in a) a.hasOwnProperty(h) &&
                d.call(u || a[h], a[h], h, a)
        };
        a.objectEach({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function(h, d) { a[d] = function(a) { return Array.prototype[h].apply(a, [].slice.call(arguments, 1)) } });
        a.addEvent = function(h, d, u, v) {
            var r, w = h.addEventListener || a.addEventListenerPolyfill;
            r = "function" === typeof h && h.prototype ? h.prototype.protoEvents = h.prototype.protoEvents || {} : h.hcEvents = h.hcEvents || {};
            a.Point && h instanceof a.Point && h.series && h.series.chart && (h.series.chart.runTrackerClick = !0);
            w && w.call(h,
                d, u, !1);
            r[d] || (r[d] = []);
            r[d].push(u);
            v && a.isNumber(v.order) && (u.order = v.order, r[d].sort(function(a, k) { return a.order - k.order }));
            return function() { a.removeEvent(h, d, u) }
        };
        a.removeEvent = function(h, d, u) {
            function v(k, l) {
                var e = h.removeEventListener || a.removeEventListenerPolyfill;
                e && e.call(h, k, l, !1)
            }

            function r(k) {
                var l, e;
                h.nodeName && (d ? (l = {}, l[d] = !0) : l = k, a.objectEach(l, function(a, c) {
                    if (k[c])
                        for (e = k[c].length; e--;) v(c, k[c][e])
                }))
            }
            var w, p;
            ["protoEvents", "hcEvents"].forEach(function(a) {
                var k = h[a];
                k && (d ? (w =
                    k[d] || [], u ? (p = w.indexOf(u), -1 < p && (w.splice(p, 1), k[d] = w), v(d, u)) : (r(k), k[d] = [])) : (r(k), h[a] = {}))
            })
        };
        a.fireEvent = function(h, d, u, v) {
            var r, w, p, k, l;
            u = u || {};
            F.createEvent && (h.dispatchEvent || h.fireEvent) ? (r = F.createEvent("Events"), r.initEvent(d, !0, !0), a.extend(r, u), h.dispatchEvent ? h.dispatchEvent(r) : h.fireEvent(d, r)) : ["protoEvents", "hcEvents"].forEach(function(e) {
                if (h[e])
                    for (w = h[e][d] || [], p = w.length, u.target || a.extend(u, { preventDefault: function() { u.defaultPrevented = !0 }, target: h, type: d }), k = 0; k < p; k++)(l = w[k]) &&
                        !1 === l.call(h, u) && u.preventDefault()
            });
            v && !u.defaultPrevented && v.call(h, u)
        };
        a.animate = function(h, d, u) {
            var v, r = "",
                w, p, k;
            a.isObject(u) || (k = arguments, u = { duration: k[2], easing: k[3], complete: k[4] });
            a.isNumber(u.duration) || (u.duration = 400);
            u.easing = "function" === typeof u.easing ? u.easing : Math[u.easing] || Math.easeInOutSine;
            u.curAnim = a.merge(d);
            a.objectEach(d, function(k, e) {
                a.stop(h, e);
                p = new a.Fx(h, u, e);
                w = null;
                "d" === e ? (p.paths = p.initPath(h, h.d, d.d), p.toD = d.d, v = 0, w = 1) : h.attr ? v = h.attr(e) : (v = parseFloat(a.getStyle(h,
                    e)) || 0, "opacity" !== e && (r = "px"));
                w || (w = k);
                w && w.match && w.match("px") && (w = w.replace(/px/g, ""));
                p.run(v, w, r)
            })
        };
        a.seriesType = function(h, d, u, v, r) {
            var w = a.getOptions(),
                p = a.seriesTypes;
            w.plotOptions[h] = a.merge(w.plotOptions[d], u);
            p[h] = a.extendClass(p[d] || function() {}, v);
            p[h].prototype.type = h;
            r && (p[h].prototype.pointClass = a.extendClass(a.Point, r));
            return p[h]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                d = 0;
            return function() { return "highcharts-" + a + "-" + d++ }
        }();
        a.isFunction = function(a) {
            return "function" ===
                typeof a
        };
        E.jQuery && (E.jQuery.fn.highcharts = function() { var h = [].slice.call(arguments); if (this[0]) return h[0] ? (new(a[a.isString(h[0]) ? h.shift() : "Chart"])(this[0], h[0], h[1]), this) : D[a.attr(this[0], "data-highcharts-chart")] })
    });
    K(I, "parts/Color.js", [I["parts/Globals.js"]], function(a) {
        var D = a.isNumber,
            F = a.merge,
            E = a.pInt;
        a.Color = function(h) {
            if (!(this instanceof a.Color)) return new a.Color(h);
            this.init(h)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) { return [E(a[1]), E(a[2]), E(a[3]), parseFloat(a[4], 10)] }
            }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function(a) { return [E(a[1]), E(a[2]), E(a[3]), 1] } }],
            names: { white: "var(--blackColor)", black: "#000000" },
            init: function(h) {
                var d, u, v, r;
                if ((this.input = h = this.names[h && h.toLowerCase ? h.toLowerCase() : ""] || h) && h.stops) this.stops = h.stops.map(function(d) { return new a.Color(d[1]) });
                else if (h && h.charAt && "#" === h.charAt() && (d = h.length, h = parseInt(h.substr(1), 16), 7 === d ? u = [(h & 16711680) >>
                        16, (h & 65280) >> 8, h & 255, 1
                    ] : 4 === d && (u = [(h & 3840) >> 4 | (h & 3840) >> 8, (h & 240) >> 4 | h & 240, (h & 15) << 4 | h & 15, 1])), !u)
                    for (v = this.parsers.length; v-- && !u;) r = this.parsers[v], (d = r.regex.exec(h)) && (u = r.parse(d));
                this.rgba = u || []
            },
            get: function(a) {
                var d = this.input,
                    h = this.rgba,
                    v;
                this.stops ? (v = F(d), v.stops = [].concat(v.stops), this.stops.forEach(function(d, w) { v.stops[w] = [v.stops[w][0], d.get(a)] })) : v = h && D(h[0]) ? "rgb" === a || !a && 1 === h[3] ? "rgb(" + h[0] + "," + h[1] + "," + h[2] + ")" : "a" === a ? h[3] : "rgba(" + h.join(",") + ")" : d;
                return v
            },
            brighten: function(a) {
                var d,
                    h = this.rgba;
                if (this.stops) this.stops.forEach(function(d) { d.brighten(a) });
                else if (D(a) && 0 !== a)
                    for (d = 0; 3 > d; d++) h[d] += E(255 * a), 0 > h[d] && (h[d] = 0), 255 < h[d] && (h[d] = 255);
                return this
            },
            setOpacity: function(a) { this.rgba[3] = a; return this },
            tweenTo: function(a, d) {
                var h = this.rgba,
                    v = a.rgba;
                v.length && h && h.length ? (a = 1 !== v[3] || 1 !== h[3], d = (a ? "rgba(" : "rgb(") + Math.round(v[0] + (h[0] - v[0]) * (1 - d)) + "," + Math.round(v[1] + (h[1] - v[1]) * (1 - d)) + "," + Math.round(v[2] + (h[2] - v[2]) * (1 - d)) + (a ? "," + (v[3] + (h[3] - v[3]) * (1 - d)) : "") + ")") : d = a.input ||
                    "none";
                return d
            }
        };
        a.color = function(h) { return new a.Color(h) }
    });
    K(I, "parts/Time.js", [I["parts/Globals.js"]], function(a) {
        var D = a.defined,
            F = a.extend,
            E = a.merge,
            h = a.pick,
            d = a.timeUnits,
            u = a.win;
        a.Time = function(a) { this.update(a, !1) };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(a) {
                var d = h(a && a.useUTC, !0),
                    w = this;
                this.options = a = E(!0, this.options || {}, a);
                this.Date = a.Date || u.Date || Date;
                this.timezoneOffset = (this.useUTC = d) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(d && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function(a, k) {
                    var p = k.getTime(),
                        e = p - w.getTimezoneOffset(k);
                    k.setTime(e);
                    a = k["getUTC" + a]();
                    k.setTime(p);
                    return a
                }, this.set = function(a, k, l) {
                    var e;
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === k.getTimezoneOffset() % 60) k["set" + a](l);
                    else e = w.getTimezoneOffset(k), e = k.getTime() - e, k.setTime(e), k["setUTC" + a](l), a = w.getTimezoneOffset(k), e = k.getTime() + a, k.setTime(e)
                }) : d ? (this.get = function(a, k) { return k["getUTC" + a]() }, this.set =
                    function(a, k, l) { return k["setUTC" + a](l) }) : (this.get = function(a, k) { return k["get" + a]() }, this.set = function(a, k, l) { return k["set" + a](l) })
            },
            makeTime: function(d, r, w, p, k, l) {
                var e, g, c;
                this.useUTC ? (e = this.Date.UTC.apply(0, arguments), g = this.getTimezoneOffset(e), e += g, c = this.getTimezoneOffset(e), g !== c ? e += c - g : g - 36E5 !== this.getTimezoneOffset(e - 36E5) || a.isSafari || (e -= 36E5)) : e = (new this.Date(d, r, h(w, 1), h(p, 0), h(k, 0), h(l, 0))).getTime();
                return e
            },
            timezoneOffsetFunction: function() {
                var d = this,
                    h = this.options,
                    w = u.moment;
                if (!this.useUTC) return function(a) { return 6E4 * (new Date(a)).getTimezoneOffset() };
                if (h.timezone) {
                    if (w) return function(a) { return 6E4 * -w.tz(a, h.timezone).utcOffset() };
                    a.error(25)
                }
                return this.useUTC && h.getTimezoneOffset ? function(a) { return 6E4 * h.getTimezoneOffset(a) } : function() { return 6E4 * (d.timezoneOffset || 0) }
            },
            dateFormat: function(d, h, w) {
                if (!a.defined(h) || isNaN(h)) return a.defaultOptions.lang.invalidDate || "";
                d = a.pick(d, "%Y-%m-%d %H:%M:%S");
                var p = this,
                    k = new this.Date(h),
                    l = this.get("Hours", k),
                    e = this.get("Day",
                        k),
                    g = this.get("Date", k),
                    c = this.get("Month", k),
                    f = this.get("FullYear", k),
                    b = a.defaultOptions.lang,
                    n = b.weekdays,
                    t = b.shortWeekdays,
                    x = a.pad,
                    k = a.extend({ a: t ? t[e] : n[e].substr(0, 3), A: n[e], d: x(g), e: x(g, 2, " "), w: e, b: b.shortMonths[c], B: b.months[c], m: x(c + 1), o: c + 1, y: f.toString().substr(2, 2), Y: f, H: x(l), k: l, I: x(l % 12 || 12), l: l % 12 || 12, M: x(p.get("Minutes", k)), p: 12 > l ? "AM" : "PM", P: 12 > l ? "am" : "pm", S: x(k.getSeconds()), L: x(Math.floor(h % 1E3), 3) }, a.dateFormats);
                a.objectEach(k, function(a, b) {
                    for (; - 1 !== d.indexOf("%" + b);) d = d.replace("%" +
                        b, "function" === typeof a ? a.call(p, h) : a)
                });
                return w ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
            },
            resolveDTLFormat: function(d) { return a.isObject(d, !0) ? d : (d = a.splat(d), { main: d[0], from: d[1], to: d[2] }) },
            getTimeTicks: function(a, r, w, p) {
                var k = this,
                    l = [],
                    e, g = {},
                    c;
                e = new k.Date(r);
                var f = a.unitRange,
                    b = a.count || 1,
                    n;
                p = h(p, 1);
                if (D(r)) {
                    k.set("Milliseconds", e, f >= d.second ? 0 : b * Math.floor(k.get("Milliseconds", e) / b));
                    f >= d.second && k.set("Seconds", e, f >= d.minute ? 0 : b * Math.floor(k.get("Seconds", e) / b));
                    f >= d.minute && k.set("Minutes",
                        e, f >= d.hour ? 0 : b * Math.floor(k.get("Minutes", e) / b));
                    f >= d.hour && k.set("Hours", e, f >= d.day ? 0 : b * Math.floor(k.get("Hours", e) / b));
                    f >= d.day && k.set("Date", e, f >= d.month ? 1 : Math.max(1, b * Math.floor(k.get("Date", e) / b)));
                    f >= d.month && (k.set("Month", e, f >= d.year ? 0 : b * Math.floor(k.get("Month", e) / b)), c = k.get("FullYear", e));
                    f >= d.year && k.set("FullYear", e, c - c % b);
                    f === d.week && (c = k.get("Day", e), k.set("Date", e, k.get("Date", e) - c + p + (c < p ? -7 : 0)));
                    c = k.get("FullYear", e);
                    p = k.get("Month", e);
                    var t = k.get("Date", e),
                        x = k.get("Hours", e);
                    r =
                        e.getTime();
                    k.variableTimezone && (n = w - r > 4 * d.month || k.getTimezoneOffset(r) !== k.getTimezoneOffset(w));
                    r = e.getTime();
                    for (e = 1; r < w;) l.push(r), r = f === d.year ? k.makeTime(c + e * b, 0) : f === d.month ? k.makeTime(c, p + e * b) : !n || f !== d.day && f !== d.week ? n && f === d.hour && 1 < b ? k.makeTime(c, p, t, x + e * b) : r + f * b : k.makeTime(c, p, t + e * b * (f === d.day ? 1 : 7)), e++;
                    l.push(r);
                    f <= d.hour && 1E4 > l.length && l.forEach(function(a) { 0 === a % 18E5 && "000000000" === k.dateFormat("%H%M%S%L", a) && (g[a] = "day") })
                }
                l.info = F(a, { higherRanks: g, totalRange: f * b });
                return l
            }
        }
    });
    K(I,
        "parts/Options.js", [I["parts/Globals.js"]],
        function(a) {
            var D = a.color,
                F = a.merge;
            a.defaultOptions = {
                colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " "
                },
                global: {},
                time: a.Time.prototype.defaultOptions,
                chart: { styledMode: !1, borderRadius: 0, colorCount: 10, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "var(--blackColor)", plotBorderColor: "#cccccc" },
                title: {
                    text: "Chart title",
                    align: "center",
                    margin: 15,
                    widthAdjust: -44
                },
                subtitle: { text: "", align: "center", widthAdjust: -44 },
                plotOptions: {},
                labels: { style: { position: "absolute", color: "var(--blackColor)" } },
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    layout: "horizontal",
                    labelFormatter: function() { return this.name },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: { activeColor: "#003399", inactiveColor: "#cccccc" },
                    itemStyle: { color: "var(--blackColor)", cursor: "pointer", fontSize: "12px", fontWeight: "500", textOverflow: "ellipsis" },
                    itemHoverStyle: { color: "#000000" },
                    itemHiddenStyle: { color: "#cccccc" },
                    shadow: !1,
                    itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: { style: { fontWeight: "500" } }
                },
                loading: { labelStyle: { fontWeight: "500", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "var(--blackColor)", opacity: .5, textAlign: "center" } },
                tooltip: {
                    enabled: !0,
                    animation: a.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    footerFormat: "",
                    padding: 8,
                    snap: a.isTouchDevice ? 25 : 10,
                    headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                    pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                    backgroundColor: D("#f7f7f7").setOpacity(.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    style: {
                        color: "var(--blackColor)",
                        cursor: "default",
                        fontSize: "12px",
                        pointerEvents: "none",
                        whiteSpace: "nowrap"
                    }
                },
                credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" }
            };
            a.setOptions = function(E) {
                a.defaultOptions = F(!0, a.defaultOptions, E);
                a.time.update(F(a.defaultOptions.global, a.defaultOptions.time), !1);
                return a.defaultOptions
            };
            a.getOptions = function() { return a.defaultOptions };
            a.defaultPlotOptions = a.defaultOptions.plotOptions;
            a.time = new a.Time(F(a.defaultOptions.global,
                a.defaultOptions.time));
            a.dateFormat = function(E, h, d) { return a.time.dateFormat(E, h, d) }
        });
    K(I, "parts/SvgRenderer.js", [I["parts/Globals.js"]], function(a) {
        var D, F, E = a.addEvent,
            h = a.animate,
            d = a.attr,
            u = a.charts,
            v = a.color,
            r = a.css,
            w = a.createElement,
            p = a.defined,
            k = a.deg2rad,
            l = a.destroyObjectProperties,
            e = a.doc,
            g = a.extend,
            c = a.erase,
            f = a.hasTouch,
            b = a.isArray,
            n = a.isFirefox,
            t = a.isMS,
            x = a.isObject,
            B = a.isString,
            G = a.isWebKit,
            q = a.merge,
            A = a.noop,
            z = a.objectEach,
            J = a.pick,
            H = a.pInt,
            m = a.removeEvent,
            C = a.splat,
            M = a.stop,
            U = a.svg,
            L = a.SVG_NS,
            Q = a.symbolSizes,
            R = a.win;
        D = a.SVGElement = function() { return this };
        g(D.prototype, {
            opacity: 1,
            SVG_NS: L,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function(y, b) {
                this.element = "span" === b ? w(b) : e.createElementNS(this.SVG_NS, b);
                this.renderer = y;
                a.fireEvent(this, "afterInit")
            },
            animate: function(y, b, m) {
                var c = a.animObject(J(b, this.renderer.globalAnimation, !0));
                J(e.hidden, e.msHidden, e.webkitHidden, !1) && (c.duration = 0);
                0 !== c.duration ? (m && (c.complete = m), h(this, y, c)) : (this.attr(y, null, m), a.objectEach(y, function(a, y) { c.step && c.step.call(this, a, { prop: y, pos: 1 }) }, this));
                return this
            },
            complexColor: function(y, m, c) {
                var f = this.renderer,
                    g, e, C, n, t, A, L, k, d, P, l, x = [],
                    H;
                a.fireEvent(this.renderer, "complexColor", { args: arguments }, function() {
                    y.radialGradient ? e = "radialGradient" : y.linearGradient && (e = "linearGradient");
                    e && (C = y[e], t = f.gradients, L = y.stops, P = c.radialReference, b(C) && (y[e] = C = {
                        x1: C[0],
                        y1: C[1],
                        x2: C[2],
                        y2: C[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === e && P && !p(C.gradientUnits) && (n = C, C = q(C, f.getRadialAttr(P, n), { gradientUnits: "userSpaceOnUse" })), z(C, function(a, y) { "id" !== y && x.push(y, a) }), z(L, function(a) { x.push(a) }), x = x.join(","), t[x] ? l = t[x].attr("id") : (C.id = l = a.uniqueKey(), t[x] = A = f.createElement(e).attr(C).add(f.defs), A.radAttr = n, A.stops = [], L.forEach(function(y) {
                        0 === y[1].indexOf("rgba") ? (g = a.color(y[1]), k = g.get("rgb"), d = g.get("a")) : (k = y[1], d = 1);
                        y = f.createElement("stop").attr({
                            offset: y[0],
                            "stop-color": k,
                            "stop-opacity": d
                        }).add(A);
                        A.stops.push(y)
                    })), H = "url(" + f.url + "#" + l + ")", c.setAttribute(m, H), c.gradient = x, y.toString = function() { return H })
                })
            },
            applyTextOutline: function(y) {
                var b = this.element,
                    m, c, f; - 1 !== y.indexOf("contrast") && (y = y.replace(/contrast/g, this.renderer.getContrast(b.style.fill)));
                y = y.split(" ");
                m = y[y.length - 1];
                (c = y[0]) && "none" !== c && a.svg && (this.fakeTS = !0, y = [].slice.call(b.getElementsByTagName("tspan")), this.ySetter = this.xSetter, c = c.replace(/(^[\d\.]+)(.*?)$/g, function(a, y, b) { return 2 * y + b }),
                    this.removeTextOutline(y), f = b.firstChild, y.forEach(function(a, y) {
                        0 === y && (a.setAttribute("x", b.getAttribute("x")), y = b.getAttribute("y"), a.setAttribute("y", y || 0), null === y && b.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        d(a, { "class": "highcharts-text-outline", fill: m, stroke: m, "stroke-width": c, "stroke-linejoin": "round" });
                        b.insertBefore(a, f)
                    }))
            },
            removeTextOutline: function(a) { for (var y = a.length, b; y--;) b = a[y], "highcharts-text-outline" === b.getAttribute("class") && c(a, this.element.removeChild(b)) },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function(y, b, m, c) {
                var f, e = this.element,
                    g, C = this,
                    q, n, t = this.symbolCustomAttribs;
                "string" === typeof y && void 0 !== b && (f = y, y = {}, y[f] = b);
                "string" === typeof y ? C = (this[y + "Getter"] || this._defaultGetter).call(this, y, e) : (z(y, function(b, m) {
                    q = !1;
                    c || M(this, m);
                    this.symbolName && -1 !== a.inArray(m, t) && (g || (this.symbolAttr(y), g = !0), q = !0);
                    !this.rotation || "x" !== m && "y" !== m || (this.doTransform = !0);
                    q || (n = this[m + "Setter"] || this._defaultSetter, n.call(this, b, m, e), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(m) &&
                        this.updateShadows(m, b, n))
                }, this), this.afterSetters());
                m && m.call(this);
                return C
            },
            afterSetters: function() { this.doTransform && (this.updateTransform(), this.doTransform = !1) },
            updateShadows: function(a, b, m) { for (var y = this.shadows, c = y.length; c--;) m.call(y[c], "height" === a ? Math.max(b - (y[c].cutHeight || 0), 0) : "d" === a ? this.d : b, a, y[c]) },
            addClass: function(a, b) {
                var y = this.attr("class") || "";
                b || (a = (a || "").split(/ /g).reduce(function(a, b) {-1 === y.indexOf(b) && a.push(b); return a }, y ? [y] : []).join(" "));
                a !== y && this.attr("class",
                    a);
                return this
            },
            hasClass: function(a) { return -1 !== (this.attr("class") || "").split(" ").indexOf(a) },
            removeClass: function(a) { return this.attr("class", (this.attr("class") || "").replace(a, "")) },
            symbolAttr: function(a) {
                var y = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(b) { y[b] = J(a[b], y[b]) });
                y.attr({ d: y.renderer.symbols[y.symbolName](y.x, y.y, y.width, y.height, y) })
            },
            clip: function(a) { return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none") },
            crisp: function(a, b) {
                var y;
                b = b || a.strokeWidth || 0;
                y = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + y;
                a.y = Math.floor(a.y || this.y || 0) + y;
                a.width = Math.floor((a.width || this.width || 0) - 2 * y);
                a.height = Math.floor((a.height || this.height || 0) - 2 * y);
                p(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function(a) {
                var b = this.styles,
                    y = {},
                    m = this.element,
                    c, f = "",
                    e, C = !b,
                    q = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && z(a, function(a, m) { a !== b[m] && (y[m] = a, C = !0) });
                C && (b && (a = g(b, y)), a && (null === a.width ||
                    "auto" === a.width ? delete this.textWidth : "text" === m.nodeName.toLowerCase() && a.width && (c = this.textWidth = H(a.width))), this.styles = a, c && !U && this.renderer.forExport && delete a.width, m.namespaceURI === this.SVG_NS ? (e = function(a, b) { return "-" + b.toLowerCase() }, z(a, function(a, b) {-1 === q.indexOf(b) && (f += b.replace(/([A-Z])/g, e) + ":" + a + ";") }), f && d(m, "style", f)) : r(m, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function(a) {
                return R.getComputedStyle(this.element ||
                    this, "").getPropertyValue(a)
            },
            strokeWidth: function() {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width"),
                    b;
                a.indexOf("px") === a.length - 2 ? a = H(a) : (b = e.createElementNS(L, "rect"), d(b, { width: a, "stroke-width": 0 }), this.element.parentNode.appendChild(b), a = b.getBBox().width, b.parentNode.removeChild(b));
                return a
            },
            on: function(a, b) {
                var y = this,
                    m = y.element;
                f && "click" === a ? (m.ontouchstart = function(a) {
                        y.touchEventFired = Date.now();
                        a.preventDefault();
                        b.call(m, a)
                    }, m.onclick =
                    function(a) {
                        (-1 === R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (y.touchEventFired || 0)) && b.call(m, a)
                    }) : m["on" + a] = b;
                return this
            },
            setRadialReference: function(a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr));
                return this
            },
            translate: function(a, b) { return this.attr({ translateX: a, translateY: b }) },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a =
                    this.translateX || 0,
                    b = this.translateY || 0,
                    m = this.scaleX,
                    c = this.scaleY,
                    f = this.inverted,
                    e = this.rotation,
                    g = this.matrix,
                    C = this.element;
                f && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                p(g) && a.push("matrix(" + g.join(",") + ")");
                f ? a.push("rotate(90) scale(-1,1)") : e && a.push("rotate(" + e + " " + J(this.rotationOriginX, C.getAttribute("x"), 0) + " " + J(this.rotationOriginY, C.getAttribute("y") || 0) + ")");
                (p(m) || p(c)) && a.push("scale(" + J(m, 1) + " " + J(c, 1) + ")");
                a.length && C.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a =
                    this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, b, m) {
                var y, f, e, g, C = {};
                f = this.renderer;
                e = f.alignedObjects;
                var q, n;
                if (a) { if (this.alignOptions = a, this.alignByTranslate = b, !m || B(m)) this.alignTo = y = m || "renderer", c(e, this), e.push(this), m = null } else a = this.alignOptions, b = this.alignByTranslate, y = this.alignTo;
                m = J(m, f[y], f);
                y = a.align;
                f = a.verticalAlign;
                e = (m.x || 0) + (a.x || 0);
                g = (m.y || 0) + (a.y || 0);
                "right" === y ? q = 1 : "center" === y && (q = 2);
                q && (e += (m.width - (a.width || 0)) / q);
                C[b ? "translateX" : "x"] = Math.round(e);
                "bottom" === f ? n = 1 : "middle" === f && (n = 2);
                n && (g += (m.height - (a.height || 0)) / n);
                C[b ? "translateY" : "y"] = Math.round(g);
                this[this.placed ? "animate" : "attr"](C);
                this.placed = !0;
                this.alignAttr = C;
                return this
            },
            getBBox: function(a, b) {
                var m, y = this.renderer,
                    c, f = this.element,
                    e = this.styles,
                    C, q = this.textStr,
                    n, t = y.cache,
                    A = y.cacheKeys,
                    L = f.namespaceURI === this.SVG_NS,
                    d;
                b = J(b, this.rotation);
                c = b * k;
                C = y.styledMode ? f && D.prototype.getStyle.call(f, "font-size") : e && e.fontSize;
                p(q) && (d = q.toString(), -1 === d.indexOf("\x3c") && (d = d.replace(/[0-9]/g,
                    "0")), d += ["", b || 0, C, this.textWidth, e && e.textOverflow].join());
                d && !a && (m = t[d]);
                if (!m) {
                    if (L || y.forExport) {
                        try {
                            (n = this.fakeTS && function(a) {
                                [].forEach.call(f.querySelectorAll(".highcharts-text-outline"), function(b) { b.style.display = a })
                            }) && n("none"), m = f.getBBox ? g({}, f.getBBox()) : { width: f.offsetWidth, height: f.offsetHeight }, n && n("")
                        } catch (ba) {}
                        if (!m || 0 > m.width) m = { width: 0, height: 0 }
                    } else m = this.htmlGetBBox();
                    y.isSVG && (a = m.width, y = m.height, L && (m.height = y = { "11px,17": 14, "13px,20": 16 }[e && e.fontSize + "," + Math.round(y)] ||
                        y), b && (m.width = Math.abs(y * Math.sin(c)) + Math.abs(a * Math.cos(c)), m.height = Math.abs(y * Math.cos(c)) + Math.abs(a * Math.sin(c))));
                    if (d && 0 < m.height) {
                        for (; 250 < A.length;) delete t[A.shift()];
                        t[d] || A.push(d);
                        t[d] = m
                    }
                }
                return m
            },
            show: function(a) { return this.attr({ visibility: a ? "inherit" : "visible" }) },
            hide: function() { return this.attr({ visibility: "hidden" }) },
            fadeOut: function(a) {
                var b = this;
                b.animate({ opacity: 0 }, { duration: a || 150, complete: function() { b.attr({ y: -9999 }) } })
            },
            add: function(a) {
                var b = this.renderer,
                    m = this.element,
                    y;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) y = this.zIndexSetter();
                y || (a ? a.element : b.box).appendChild(m);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    b = a.element || {},
                    m = a.renderer,
                    f = m.isSVG && "SPAN" === b.nodeName && a.parentGroup,
                    e = b.ownerSVGElement,
                    g = a.clipPath;
                b.onclick = b.onmouseout = b.onmouseover = b.onmousemove =
                    b.point = null;
                M(a);
                g && e && ([].forEach.call(e.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {-1 < a.getAttribute("clip-path").indexOf(g.element.id) && a.removeAttribute("clip-path") }), a.clipPath = g.destroy());
                if (a.stops) {
                    for (e = 0; e < a.stops.length; e++) a.stops[e] = a.stops[e].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(b);
                for (m.styledMode || a.destroyShadows(); f && f.div && 0 === f.div.childNodes.length;) b = f.parentGroup, a.safeRemoveChild(f.div), delete f.div, f = b;
                a.alignTo && c(m.alignedObjects, a);
                z(a, function(b, m) { delete a[m] });
                return null
            },
            shadow: function(a, b, m) {
                var c = [],
                    y, f, e = this.element,
                    g, C, q, n;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    C = J(a.width, 3);
                    q = (a.opacity || .15) / C;
                    n = this.parentInverted ? "(-1,-1)" : "(" + J(a.offsetX, 1) + ", " + J(a.offsetY, 1) + ")";
                    for (y = 1; y <= C; y++) f = e.cloneNode(0), g = 2 * C + 1 - 2 * y, d(f, { stroke: a.color || "#000000", "stroke-opacity": q * y, "stroke-width": g, transform: "translate" + n, fill: "none" }), f.setAttribute("class", (f.getAttribute("class") || "") + " highcharts-shadow"), m && (d(f, "height", Math.max(d(f, "height") -
                        g, 0)), f.cutHeight = g), b ? b.element.appendChild(f) : e.parentNode && e.parentNode.insertBefore(f, e), c.push(f);
                    this.shadows = c
                }
                return this
            },
            destroyShadows: function() {
                (this.shadows || []).forEach(function(a) { this.safeRemoveChild(a) }, this);
                this.shadows = void 0
            },
            xGetter: function(a) { "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy")); return this._defaultGetter(a) },
            _defaultGetter: function(a) {
                a = J(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, b, m) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (m.setAttribute(b, a), this[b] = a)
            },
            dashstyleSetter: function(a) {
                var b, m = this["stroke-width"];
                "inherit" === m && (m = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] =
                        H(a[b]) * m;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                var b = { left: "start", center: "middle", right: "end" };
                b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", b[a]))
            },
            opacitySetter: function(a, b, m) {
                this[b] = a;
                m.setAttribute(b, a)
            },
            titleSetter: function(a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = e.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(e.createTextNode(String(J(a),
                    "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) { a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this)) },
            setTextPath: function(b, m) {
                var c = this.element,
                    f = { textAnchor: "text-anchor" },
                    y, e = !1,
                    g, C = this.textPathWrapper,
                    n = !C;
                m = q(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, m);
                y = m.attributes;
                if (b && m && m.enabled) {
                    this.options && this.options.padding && (y.dx = -this.options.padding);
                    C || (this.textPathWrapper =
                        C = this.renderer.createElement("textPath"), e = !0);
                    g = C.element;
                    (m = b.element.getAttribute("id")) || b.element.setAttribute("id", m = a.uniqueKey());
                    if (n)
                        for (b = c.getElementsByTagName("tspan"); b.length;) b[0].setAttribute("y", 0), g.appendChild(b[0]);
                    e && C.add({ element: this.text ? this.text.element : c });
                    g.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + m);
                    p(y.dy) && (g.parentNode.setAttribute("dy", y.dy), delete y.dy);
                    p(y.dx) && (g.parentNode.setAttribute("dx", y.dx), delete y.dx);
                    a.objectEach(y,
                        function(a, b) { g.setAttribute(f[b] || b, a) });
                    c.removeAttribute("transform");
                    this.removeTextOutline.call(C, [].slice.call(c.getElementsByTagName("tspan")));
                    this.applyTextOutline = this.updateTransform = A
                } else C && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(c, b));
                return this
            },
            destroyTextPath: function(a, b) {
                var m;
                b.element.setAttribute("id", "");
                for (m = this.textPathWrapper.element.childNodes; m.length;) a.firstChild.appendChild(m[0]);
                a.firstChild.removeChild(this.textPathWrapper.element);
                delete b.textPathWrapper
            },
            fillSetter: function(a, b, m) { "string" === typeof a ? m.setAttribute(b, a) : a && this.complexColor(a, b, m) },
            visibilitySetter: function(a, b, m) {
                "inherit" === a ? m.removeAttribute(b) : this[b] !== a && m.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function(a, b) {
                var m = this.renderer,
                    c = this.parentGroup,
                    f = (c || m).element || m.box,
                    e, g = this.element,
                    y, C, m = f === m.box;
                e = this.added;
                var q;
                p(a) ? (g.setAttribute("data-z-index", a), a = +a, this[b] === a && (e = !1)) : p(this[b]) && g.removeAttribute("data-z-index");
                this[b] = a;
                if (e) {
                    (a =
                        this.zIndex) && c && (c.handleZ = !0);
                    b = f.childNodes;
                    for (q = b.length - 1; 0 <= q && !y; q--)
                        if (c = b[q], e = c.getAttribute("data-z-index"), C = !p(e), c !== g)
                            if (0 > a && C && !m && !q) f.insertBefore(g, b[q]), y = !0;
                            else if (H(e) <= a || C && (!p(a) || 0 <= a)) f.insertBefore(g, b[q + 1] || null), y = !0;
                    y || (f.insertBefore(g, b[m ? 3 : 0] || null), y = !0)
                }
                return y
            },
            _defaultSetter: function(a, b, m) { m.setAttribute(b, a) }
        });
        D.prototype.yGetter = D.prototype.xGetter;
        D.prototype.translateXSetter = D.prototype.translateYSetter = D.prototype.rotationSetter = D.prototype.verticalAlignSetter =
            D.prototype.rotationOriginXSetter = D.prototype.rotationOriginYSetter = D.prototype.scaleXSetter = D.prototype.scaleYSetter = D.prototype.matrixSetter = function(a, b) {
                this[b] = a;
                this.doTransform = !0
            };
        D.prototype["stroke-widthSetter"] = D.prototype.strokeSetter = function(a, b, m) {
            this[b] = a;
            this.stroke && this["stroke-width"] ? (D.prototype.fillSetter.call(this, this.stroke, "stroke", m), m.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (m.removeAttribute("stroke"),
                this.hasStroke = !1)
        };
        F = a.SVGRenderer = function() { this.init.apply(this, arguments) };
        g(F.prototype, {
            Element: D,
            SVG_NS: L,
            init: function(a, b, m, c, f, g, C) {
                var y;
                y = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" });
                C || y.css(this.getStyle(c));
                c = y.element;
                a.appendChild(c);
                d(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && d(c, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = c;
                this.boxWrapper = y;
                this.alignedObjects = [];
                this.url = (n || G) && e.getElementsByTagName("base").length ? R.location.href.split("#")[0].replace(/<[^>]*>/g,
                    "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(e.createTextNode("Created with Highcharts 7.1.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = g;
                this.forExport = f;
                this.styledMode = C;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, m, !1);
                var q;
                n && a.getBoundingClientRect && (b = function() {
                    r(a, { left: 0, top: 0 });
                    q = a.getBoundingClientRect();
                    r(a, {
                        left: Math.ceil(q.left) - q.left + "px",
                        top: Math.ceil(q.top) - q.top +
                            "px"
                    })
                }, b(), this.unSubPixelFix = E(R, "resize", b))
            },
            definition: function(a) {
                function b(a, c) {
                    var f;
                    C(a).forEach(function(a) {
                        var g = m.createElement(a.tagName),
                            C = {};
                        z(a, function(a, b) { "tagName" !== b && "children" !== b && "textContent" !== b && (C[b] = a) });
                        g.attr(C);
                        g.add(c || m.defs);
                        a.textContent && g.element.appendChild(e.createTextNode(a.textContent));
                        b(a.children || [], g);
                        f = g
                    });
                    return f
                }
                var m = this;
                return b(a)
            },
            getStyle: function(a) {
                return this.style = g({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) { this.boxWrapper.css(this.getStyle(a)) },
            isHidden: function() { return !this.boxWrapper.getBBox().width },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                l(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: A,
            getRadialAttr: function(a, b) {
                return {
                    cx: a[0] - a[2] /
                        2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            truncate: function(a, b, m, c, f, g, C) {
                var q = this,
                    y = a.rotation,
                    n, t = c ? 1 : 0,
                    A = (m || c).length,
                    L = A,
                    k = [],
                    d = function(a) {
                        b.firstChild && b.removeChild(b.firstChild);
                        a && b.appendChild(e.createTextNode(a))
                    },
                    l = function(e, g) {
                        g = g || e;
                        if (void 0 === k[g])
                            if (b.getSubStringLength) try { k[g] = f + b.getSubStringLength(0, c ? g + 1 : g) } catch (ca) {} else q.getSpanWidth && (d(C(m || c, e)), k[g] = f + q.getSpanWidth(a, b));
                        return k[g]
                    },
                    z, p;
                a.rotation = 0;
                z = l(b.textContent.length);
                if (p = f + z > g) {
                    for (; t <= A;) L = Math.ceil((t +
                        A) / 2), c && (n = C(c, L)), z = l(L, n && n.length - 1), t === A ? t = A + 1 : z > g ? A = L - 1 : t = L;
                    0 === A ? d("") : m && A === m.length - 1 || d(n || C(m || c, L))
                }
                c && c.splice(0, L);
                a.actualWidth = z;
                a.rotation = y;
                return p
            },
            escapes: { "\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;" },
            buildText: function(a) {
                var b = a.element,
                    m = this,
                    c = m.forExport,
                    f = J(a.textStr, "").toString(),
                    g = -1 !== f.indexOf("\x3c"),
                    C = b.childNodes,
                    q, n = d(b, "x"),
                    y = a.styles,
                    t = a.textWidth,
                    A = y && y.lineHeight,
                    k = y && y.textOutline,
                    l = y && "ellipsis" === y.textOverflow,
                    p =
                    y && "nowrap" === y.whiteSpace,
                    x = y && y.fontSize,
                    B, w, G = C.length,
                    y = t && !a.added && this.box,
                    h = function(a) {
                        var c;
                        m.styledMode || (c = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : x || m.style.fontSize || 12);
                        return A ? H(A) : m.fontMetrics(c, a.getAttribute("style") ? a : b).h
                    },
                    M = function(a, b) { z(m.escapes, function(m, c) { b && -1 !== b.indexOf(m) || (a = a.toString().replace(new RegExp(m, "g"), c)) }); return a },
                    Q = function(a, b) {
                        var m;
                        m = a.indexOf("\x3c");
                        a = a.substring(m, a.indexOf("\x3e") - m);
                        m = a.indexOf(b + "\x3d");
                        if (-1 !== m && (m = m + b.length +
                                1, b = a.charAt(m), '"' === b || "'" === b)) return a = a.substring(m + 1), a.substring(0, a.indexOf(b))
                    };
                B = [f, l, p, A, k, x, t].join();
                if (B !== a.textCache) {
                    for (a.textCache = B; G--;) b.removeChild(C[G]);
                    g || k || l || t || -1 !== f.indexOf(" ") ? (y && y.appendChild(b), g ? (f = m.styledMode ? f.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e') : f.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:500"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e'),
                            f = f.replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g)) : f = [f], f = f.filter(function(a) { return "" !== a }), f.forEach(function(f, g) {
                            var C, y = 0,
                                A = 0;
                            f = f.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                            C = f.split("|||");
                            C.forEach(function(f) {
                                if ("" !== f || 1 === C.length) {
                                    var k = {},
                                        z = e.createElementNS(m.SVG_NS, "tspan"),
                                        H, B;
                                    (H = Q(f, "class")) && d(z, "class", H);
                                    if (H = Q(f, "style")) H = H.replace(/(;| |^)color([ :])/, "$1fill$2"), d(z, "style",
                                        H);
                                    (B = Q(f, "href")) && !c && (d(z, "onclick", 'location.href\x3d"' + B + '"'), d(z, "class", "highcharts-anchor"), m.styledMode || r(z, { cursor: "pointer" }));
                                    f = M(f.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                    if (" " !== f) {
                                        z.appendChild(e.createTextNode(f));
                                        y ? k.dx = 0 : g && null !== n && (k.x = n);
                                        d(z, k);
                                        b.appendChild(z);
                                        !y && w && (!U && c && r(z, { display: "block" }), d(z, "dy", h(z)));
                                        if (t) {
                                            var G = f.replace(/([^\^])-/g, "$1- ").split(" "),
                                                k = !p && (1 < C.length || g || 1 < G.length);
                                            B = 0;
                                            var J = h(z);
                                            if (l) q = m.truncate(a, z, f, void 0, 0, Math.max(0, t - parseInt(x ||
                                                12, 10)), function(a, b) { return a.substring(0, b) + "\u2026" });
                                            else if (k)
                                                for (; G.length;) G.length && !p && 0 < B && (z = e.createElementNS(L, "tspan"), d(z, { dy: J, x: n }), H && d(z, "style", H), z.appendChild(e.createTextNode(G.join(" ").replace(/- /g, "-"))), b.appendChild(z)), m.truncate(a, z, null, G, 0 === B ? A : 0, t, function(a, b) { return G.slice(0, b).join(" ").replace(/- /g, "-") }), A = a.actualWidth, B++
                                        }
                                        y++
                                    }
                                }
                            });
                            w = w || b.childNodes.length
                        }), l && q && a.attr("title", M(a.textStr, ["\x26lt;", "\x26gt;"])), y && y.removeChild(b), k && a.applyTextOutline &&
                        a.applyTextOutline(k)) : b.appendChild(e.createTextNode(M(f)))
                }
            },
            getContrast: function(a) {
                a = v(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "var(--blackColor)"
            },
            button: function(a, b, m, c, f, e, C, n, A, L) {
                var y = this.label(a, b, m, A, null, null, L, null, "button"),
                    k = 0,
                    d = this.styledMode;
                y.attr(q({ padding: 8, r: 2 }, f));
                if (!d) {
                    var z, l, p, x;
                    f = q({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "var(--blackColor)", cursor: "pointer", fontWeight: "normal" } }, f);
                    z = f.style;
                    delete f.style;
                    e = q(f, { fill: "#e6e6e6" }, e);
                    l = e.style;
                    delete e.style;
                    C = q(f, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "500" } }, C);
                    p = C.style;
                    delete C.style;
                    n = q(f, { style: { color: "#cccccc" } }, n);
                    x = n.style;
                    delete n.style
                }
                E(y.element, t ? "mouseover" : "mouseenter", function() { 3 !== k && y.setState(1) });
                E(y.element, t ? "mouseout" : "mouseleave", function() { 3 !== k && y.setState(k) });
                y.setState = function(a) {
                    1 !== a && (y.state = k = a);
                    y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a ||
                        0
                    ]);
                    d || y.attr([f, e, C, n][a || 0]).css([z, l, p, x][a || 0])
                };
                d || y.attr(f).css(g({ cursor: "default" }, z));
                return y.on("click", function(a) { 3 !== k && c.call(y, a) })
            },
            crispLine: function(a, b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function(a) {
                var m = this.styledMode ? {} : { fill: "none" };
                b(a) ? m.d = a : x(a) && g(m, a);
                return this.createElement("path").attr(m)
            },
            circle: function(a, b, m) {
                a = x(a) ? a : void 0 === a ? {} : { x: a, y: b, r: m };
                b = this.createElement("circle");
                b.xSetter =
                    b.ySetter = function(a, b, m) { m.setAttribute("c" + b, a) };
                return b.attr(a)
            },
            arc: function(a, b, m, c, f, g) {
                x(a) ? (c = a, b = c.y, m = c.r, a = c.x) : c = { innerR: c, start: f, end: g };
                a = this.symbol("arc", a, b, m, m, c);
                a.r = m;
                return a
            },
            rect: function(a, b, m, c, f, g) {
                f = x(a) ? a.r : f;
                var e = this.createElement("rect");
                a = x(a) ? a : void 0 === a ? {} : { x: a, y: b, width: Math.max(m, 0), height: Math.max(c, 0) };
                this.styledMode || (void 0 !== g && (a.strokeWidth = g, a = e.crisp(a)), a.fill = "none");
                f && (a.r = f);
                e.rSetter = function(a, b, m) {
                    e.r = a;
                    d(m, { rx: a, ry: a })
                };
                e.rGetter = function() { return e.r };
                return e.attr(a)
            },
            setSize: function(a, b, m) {
                var c = this.alignedObjects,
                    f = c.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({ width: a, height: b }, { step: function() { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) }, duration: J(m, !0) ? void 0 : 0 }); f--;) c[f].align()
            },
            g: function(a) { var b = this.createElement("g"); return a ? b.attr({ "class": "highcharts-" + a }) : b },
            image: function(a, b, m, c, f, e) {
                var C = { preserveAspectRatio: "none" },
                    q, n = function(a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink",
                            "href", b) : a.setAttribute("hc-svg-href", b)
                    },
                    t = function(b) {
                        n(q.element, a);
                        e.call(q, b)
                    };
                1 < arguments.length && g(C, { x: b, y: m, width: c, height: f });
                q = this.createElement("image").attr(C);
                e ? (n(q.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), C = new R.Image, E(C, "load", t), C.src = a, C.complete && t({})) : n(q.element, a);
                return q
            },
            symbol: function(a, b, m, c, f, C) {
                var q = this,
                    n, t = /^url\((.*?)\)$/,
                    y = t.test(a),
                    A = !y && (this.symbols[a] ? a : "circle"),
                    L = A && this.symbols[A],
                    k = p(b) && L && L.call(this.symbols,
                        Math.round(b), Math.round(m), c, f, C),
                    d, z;
                L ? (n = this.path(k), q.styledMode || n.attr("fill", "none"), g(n, { symbolName: A, x: b, y: m, width: c, height: f }), C && g(n, C)) : y && (d = a.match(t)[1], n = this.image(d), n.imgwidth = J(Q[d] && Q[d].width, C && C.width), n.imgheight = J(Q[d] && Q[d].height, C && C.height), z = function() { n.attr({ width: n.width, height: n.height }) }, ["width", "height"].forEach(function(a) {
                    n[a + "Setter"] = function(a, b) {
                        var m = {},
                            c = this["img" + b],
                            f = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        p(c) && (C && "within" === C.backgroundSize &&
                            this.width && this.height && (c = Math.round(c * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(b, c), this.alignByTranslate || (m[f] = ((this[b] || 0) - c) / 2, this.attr(m)))
                    }
                }), p(b) && n.attr({ x: b, y: m }), n.isImg = !0, p(n.imgwidth) && p(n.imgheight) ? z() : (n.attr({ width: 0, height: 0 }), w("img", {
                    onload: function() {
                        var a = u[q.chartIndex];
                        0 === this.width && (r(this, { position: "absolute", top: "-999em" }), e.body.appendChild(this));
                        Q[d] = { width: this.width, height: this.height };
                        n.imgwidth =
                            this.width;
                        n.imgheight = this.height;
                        n.element && z();
                        this.parentNode && this.parentNode.removeChild(this);
                        q.imgCount--;
                        if (!q.imgCount && a && a.onload) a.onload()
                    },
                    src: d
                }), this.imgCount++));
                return n
            },
            symbols: {
                circle: function(a, b, m, c) { return this.arc(a + m / 2, b + c / 2, m / 2, c / 2, { start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1 }) },
                square: function(a, b, m, c) { return ["M", a, b, "L", a + m, b, a + m, b + c, a, b + c, "Z"] },
                triangle: function(a, b, m, c) { return ["M", a + m / 2, b, "L", a + m, b + c, a, b + c, "Z"] },
                "triangle-down": function(a, b, m, c) {
                    return ["M", a, b, "L", a + m,
                        b, a + m / 2, b + c, "Z"
                    ]
                },
                diamond: function(a, b, m, c) { return ["M", a + m / 2, b, "L", a + m, b + c / 2, a + m / 2, b + c, a, b + c / 2, "Z"] },
                arc: function(a, b, m, c, f) {
                    var e = f.start,
                        g = f.r || m,
                        C = f.r || c || m,
                        q = f.end - .001;
                    m = f.innerR;
                    c = J(f.open, .001 > Math.abs(f.end - f.start - 2 * Math.PI));
                    var n = Math.cos(e),
                        t = Math.sin(e),
                        A = Math.cos(q),
                        q = Math.sin(q),
                        e = .001 > f.end - e - Math.PI ? 0 : 1;
                    f = ["M", a + g * n, b + C * t, "A", g, C, 0, e, J(f.clockwise, 1), a + g * A, b + C * q];
                    p(m) && f.push(c ? "M" : "L", a + m * A, b + m * q, "A", m, m, 0, e, 0, a + m * n, b + m * t);
                    f.push(c ? "" : "Z");
                    return f
                },
                callout: function(a, b, m, c, f) {
                    var e =
                        Math.min(f && f.r || 0, m, c),
                        g = e + 6,
                        C = f && f.anchorX;
                    f = f && f.anchorY;
                    var q;
                    q = ["M", a + e, b, "L", a + m - e, b, "C", a + m, b, a + m, b, a + m, b + e, "L", a + m, b + c - e, "C", a + m, b + c, a + m, b + c, a + m - e, b + c, "L", a + e, b + c, "C", a, b + c, a, b + c, a, b + c - e, "L", a, b + e, "C", a, b, a, b, a + e, b];
                    C && C > m ? f > b + g && f < b + c - g ? q.splice(13, 3, "L", a + m, f - 6, a + m + 6, f, a + m, f + 6, a + m, b + c - e) : q.splice(13, 3, "L", a + m, c / 2, C, f, a + m, c / 2, a + m, b + c - e) : C && 0 > C ? f > b + g && f < b + c - g ? q.splice(33, 3, "L", a, f + 6, a - 6, f, a, f - 6, a, b + e) : q.splice(33, 3, "L", a, c / 2, C, f, a, c / 2, a, b + e) : f && f > c && C > a + g && C < a + m - g ? q.splice(23, 3, "L", C + 6, b +
                        c, C, b + c + 6, C - 6, b + c, a + e, b + c) : f && 0 > f && C > a + g && C < a + m - g && q.splice(3, 3, "L", C - 6, b, C, b - 6, C + 6, b, m - e, b);
                    return q
                }
            },
            clipRect: function(b, m, c, f) {
                var e = a.uniqueKey() + "-",
                    C = this.createElement("clipPath").attr({ id: e }).add(this.defs);
                b = this.rect(b, m, c, f, 0).add(C);
                b.id = e;
                b.clipPath = C;
                b.count = 0;
                return b
            },
            text: function(a, b, m, c) {
                var f = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, b, m);
                f.x = Math.round(b || 0);
                m && (f.y = Math.round(m));
                p(a) && (f.text = a);
                a = this.createElement("text").attr(f);
                c || (a.xSetter = function(a,
                    b, m) {
                    var c = m.getElementsByTagName("tspan"),
                        f, e = m.getAttribute(b),
                        C;
                    for (C = 0; C < c.length; C++) f = c[C], f.getAttribute(b) === e && f.setAttribute(b, a);
                    m.setAttribute(b, a)
                });
                return a
            },
            fontMetrics: function(a, b) {
                a = !this.styledMode && /px/.test(a) || !R.getComputedStyle ? a || b && b.style && b.style.fontSize || this.style && this.style.fontSize : b && D.prototype.getStyle.call(b, "font-size");
                a = /px/.test(a) ? H(a) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return { h: b, b: Math.round(.8 * b), f: a }
            },
            rotCorr: function(a, b, m) {
                var c = a;
                b && m && (c = Math.max(c *
                    Math.cos(b * k), 4));
                return { x: -a / 3 * Math.sin(b * k), y: c }
            },
            label: function(b, c, f, e, C, n, t, A, L) {
                var k = this,
                    d = k.styledMode,
                    z = k.g("button" !== L && "label"),
                    l = z.text = k.text("", 0, 0, t).attr({ zIndex: 1 }),
                    y, x, H = 0,
                    B = 3,
                    G = 0,
                    w, U, h, M, J, Q = {},
                    r, R, u = /^url\((.*?)\)$/.test(e),
                    v = d || u,
                    P = function() { return d ? y.strokeWidth() % 2 / 2 : (r ? parseInt(r, 10) : 0) % 2 / 2 },
                    V, T, E;
                L && z.addClass("highcharts-" + L);
                V = function() {
                    var a = l.element.style,
                        b = {};
                    x = (void 0 === w || void 0 === U || J) && p(l.textStr) && l.getBBox();
                    z.width = (w || x.width || 0) + 2 * B + G;
                    z.height = (U || x.height ||
                        0) + 2 * B;
                    R = B + Math.min(k.fontMetrics(a && a.fontSize, l).b, x ? x.height : Infinity);
                    v && (y || (z.box = y = k.symbols[e] || u ? k.symbol(e) : k.rect(), y.addClass(("button" === L ? "" : "highcharts-label-box") + (L ? " highcharts-" + L + "-box" : "")), y.add(z), a = P(), b.x = a, b.y = (A ? -R : 0) + a), b.width = Math.round(z.width), b.height = Math.round(z.height), y.attr(g(b, Q)), Q = {})
                };
                T = function() {
                    var a = G + B,
                        b;
                    b = A ? 0 : R;
                    p(w) && x && ("center" === J || "right" === J) && (a += { center: .5, right: 1 }[J] * (w - x.width));
                    if (a !== l.x || b !== l.y) l.attr("x", a), l.hasBoxWidthChanged && (x = l.getBBox(!0),
                        V()), void 0 !== b && l.attr("y", b);
                    l.x = a;
                    l.y = b
                };
                E = function(a, b) { y ? y.attr(a, b) : Q[a] = b };
                z.onAdd = function() {
                    l.add(z);
                    z.attr({ text: b || 0 === b ? b : "", x: c, y: f });
                    y && p(C) && z.attr({ anchorX: C, anchorY: n })
                };
                z.widthSetter = function(b) { w = a.isNumber(b) ? b : null };
                z.heightSetter = function(a) { U = a };
                z["text-alignSetter"] = function(a) { J = a };
                z.paddingSetter = function(a) { p(a) && a !== B && (B = z.padding = a, T()) };
                z.paddingLeftSetter = function(a) { p(a) && a !== G && (G = a, T()) };
                z.alignSetter = function(a) {
                    a = { left: 0, center: .5, right: 1 }[a];
                    a !== H && (H = a, x && z.attr({ x: h }))
                };
                z.textSetter = function(a) {
                    void 0 !== a && l.attr({ text: a });
                    V();
                    T()
                };
                z["stroke-widthSetter"] = function(a, b) {
                    a && (v = !0);
                    r = this["stroke-width"] = a;
                    E(b, a)
                };
                d ? z.rSetter = function(a, b) { E(b, a) } : z.strokeSetter = z.fillSetter = z.rSetter = function(a, b) {
                    "r" !== b && ("fill" === b && a && (v = !0), z[b] = a);
                    E(b, a)
                };
                z.anchorXSetter = function(a, b) {
                    C = z.anchorX = a;
                    E(b, Math.round(a) - P() - h)
                };
                z.anchorYSetter = function(a, b) {
                    n = z.anchorY = a;
                    E(b, a - M)
                };
                z.xSetter = function(a) {
                    z.x = a;
                    H && (a -= H * ((w || x.width) + 2 * B), z["forceAnimate:x"] = !0);
                    h = Math.round(a);
                    z.attr("translateX",
                        h)
                };
                z.ySetter = function(a) {
                    M = z.y = Math.round(a);
                    z.attr("translateY", M)
                };
                var S = z.css;
                t = {
                    css: function(a) {
                        if (a) {
                            var b = {};
                            a = q(a);
                            z.textProps.forEach(function(m) { void 0 !== a[m] && (b[m] = a[m], delete a[m]) });
                            l.css(b);
                            "width" in b && V();
                            "fontSize" in b && (V(), T())
                        }
                        return S.call(z, a)
                    },
                    getBBox: function() { return { width: x.width + 2 * B, height: x.height + 2 * B, x: x.x - B, y: x.y - B } },
                    destroy: function() {
                        m(z.element, "mouseenter");
                        m(z.element, "mouseleave");
                        l && (l = l.destroy());
                        y && (y = y.destroy());
                        D.prototype.destroy.call(z);
                        z = k = V = T = E = null
                    }
                };
                d || (t.shadow = function(a) { a && (V(), y && y.shadow(a)); return z });
                return g(z, t)
            }
        });
        a.Renderer = F
    });
    K(I, "parts/Html.js", [I["parts/Globals.js"]], function(a) {
        var D = a.attr,
            F = a.createElement,
            E = a.css,
            h = a.defined,
            d = a.extend,
            u = a.isFirefox,
            v = a.isMS,
            r = a.isWebKit,
            w = a.pick,
            p = a.pInt,
            k = a.SVGElement,
            l = a.SVGRenderer,
            e = a.win;
        d(k.prototype, {
            htmlCss: function(a) {
                var c = "SPAN" === this.element.tagName && a && "width" in a,
                    f = w(c && a.width, void 0),
                    b;
                c && (delete a.width, this.textWidth = f, b = !0);
                a && "ellipsis" === a.textOverflow && (a.whiteSpace =
                    "nowrap", a.overflow = "hidden");
                this.styles = d(this.styles, a);
                E(this.element, a);
                b && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function() { var a = this.element; return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight } },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        c = this.element,
                        f = this.translateX || 0,
                        b = this.translateY || 0,
                        e = this.x || 0,
                        t = this.y || 0,
                        k = this.textAlign || "left",
                        d = { left: 0, center: .5, right: 1 }[k],
                        l = this.styles,
                        q = l && l.whiteSpace;
                    E(c, { marginLeft: f, marginTop: b });
                    !a.styledMode && this.shadows && this.shadows.forEach(function(a) { E(a, { marginLeft: f + 1, marginTop: b + 1 }) });
                    this.inverted && [].forEach.call(c.childNodes, function(b) { a.invertChild(b, c) });
                    if ("SPAN" === c.tagName) {
                        var l = this.rotation,
                            A = this.textWidth && p(this.textWidth),
                            z = [l, k, c.innerHTML, this.textWidth, this.textAlign].join(),
                            w;
                        (w = A !== this.oldTextWidth) && !(w = A > this.oldTextWidth) && ((w = this.textPxLength) || (E(c, { width: "", whiteSpace: q || "nowrap" }), w = c.offsetWidth), w = w > A);
                        w && (/[ \-]/.test(c.textContent || c.innerText) ||
                            "ellipsis" === c.style.textOverflow) ? (E(c, { width: A + "px", display: "block", whiteSpace: q || "normal" }), this.oldTextWidth = A, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        z !== this.cTT && (q = a.fontMetrics(c.style.fontSize, c).b, !h(l) || l === (this.oldRotation || 0) && k === this.oldAlign || this.setSpanRotation(l, d, q), this.getSpanCorrection(!h(l) && this.textPxLength || c.offsetWidth, q, d, l, k));
                        E(c, { left: e + (this.xCorr || 0) + "px", top: t + (this.yCorr || 0) + "px" });
                        this.cTT = z;
                        this.oldRotation = l;
                        this.oldAlign = k
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, c, f) {
                var b = {},
                    e = this.renderer.getTransformKey();
                b[e] = b.transform = "rotate(" + a + "deg)";
                b[e + (u ? "Origin" : "-origin")] = b.transformOrigin = 100 * c + "% " + f + "px";
                E(this.element, b)
            },
            getSpanCorrection: function(a, c, f) {
                this.xCorr = -a * f;
                this.yCorr = -c
            }
        });
        d(l.prototype, {
            getTransformKey: function() { return v && !/Edge/.test(e.navigator.userAgent) ? "-ms-transform" : r ? "-webkit-transform" : u ? "MozTransform" : e.opera ? "-o-transform" : "" },
            html: function(e, c, f) {
                var b = this.createElement("span"),
                    g = b.element,
                    t = b.renderer,
                    l = t.isSVG,
                    p = function(a, b) {
                        ["opacity", "visibility"].forEach(function(c) {
                            a[c + "Setter"] = function(f, e, m) {
                                var C = a.div ? a.div.style : b;
                                k.prototype[c + "Setter"].call(this, f, e, m);
                                C && (C[e] = f)
                            }
                        });
                        a.addedSetters = !0
                    },
                    G = a.charts[t.chartIndex],
                    G = G && G.styledMode;
                b.textSetter = function(a) {
                    a !== g.innerHTML && (delete this.bBox, delete this.oldTextWidth);
                    this.textStr = a;
                    g.innerHTML = w(a, "");
                    b.doTransform = !0
                };
                l && p(b, b.element.style);
                b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function(a, c) {
                    "align" === c && (c =
                        "textAlign");
                    b[c] = a;
                    b.doTransform = !0
                };
                b.afterSetters = function() { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) };
                b.attr({ text: e, x: Math.round(c), y: Math.round(f) }).css({ position: "absolute" });
                G || b.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
                g.style.whiteSpace = "nowrap";
                b.css = b.htmlCss;
                l && (b.add = function(a) {
                    var c, f = t.box.parentNode,
                        e = [];
                    if (this.parentGroup = a) {
                        if (c = a.div, !c) {
                            for (; a;) e.push(a), a = a.parentGroup;
                            e.reverse().forEach(function(a) {
                                function m(b, m) {
                                    a[m] =
                                        b;
                                    "translateX" === m ? C.left = b + "px" : C.top = b + "px";
                                    a.doTransform = !0
                                }
                                var C, g = D(a.element, "class");
                                g && (g = { className: g });
                                c = a.div = a.div || F("div", g, { position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY || 0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents }, c || f);
                                C = c.style;
                                d(a, {
                                    classSetter: function(a) {
                                        return function(b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(c),
                                    on: function() { e[0].div && b.on.apply({ element: e[0].div }, arguments); return a },
                                    translateXSetter: m,
                                    translateYSetter: m
                                });
                                a.addedSetters || p(a)
                            })
                        }
                    } else c = f;
                    c.appendChild(g);
                    b.added = !0;
                    b.alignOnAdd && b.htmlUpdateTransform();
                    return b
                });
                return b
            }
        })
    });
    K(I, "parts/Tick.js", [I["parts/Globals.js"]], function(a) {
        var D = a.correctFloat,
            F = a.defined,
            E = a.destroyObjectProperties,
            h = a.fireEvent,
            d = a.isNumber,
            u = a.merge,
            v = a.pick,
            r = a.deg2rad;
        a.Tick = function(a, d, k, l, e) {
            this.axis = a;
            this.pos = d;
            this.type = k || "";
            this.isNewLabel = this.isNew = !0;
            this.parameters = e || {};
            this.tickmarkOffset = this.parameters.tickmarkOffset;
            this.options =
                this.parameters.options;
            k || l || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var d = this,
                    p = d.axis,
                    k = p.options,
                    l = p.chart,
                    e = p.categories,
                    g = p.names,
                    c = d.pos,
                    f = v(d.options && d.options.labels, k.labels),
                    b = p.tickPositions,
                    n = c === b[0],
                    t = c === b[b.length - 1],
                    e = this.parameters.category || (e ? v(e[c], g[c], c) : c),
                    x = d.label,
                    b = b.info,
                    B, G, q, A;
                p.isDatetimeAxis && b && (G = l.time.resolveDTLFormat(k.dateTimeLabelFormats[!k.grid && b.higherRanks[c] || b.unitName]), B = G.main);
                d.isFirst = n;
                d.isLast = t;
                d.formatCtx = {
                    axis: p,
                    chart: l,
                    isFirst: n,
                    isLast: t,
                    dateTimeLabelFormat: B,
                    tickPositionInfo: b,
                    value: p.isLog ? D(p.lin2log(e)) : e,
                    pos: c
                };
                k = p.labelFormatter.call(d.formatCtx, this.formatCtx);
                if (A = G && G.list) d.shortenLabel = function() {
                    for (q = 0; q < A.length; q++)
                        if (x.attr({ text: p.labelFormatter.call(a.extend(d.formatCtx, { dateTimeLabelFormat: A[q] })) }), x.getBBox().width < p.getSlotWidth(d) - 2 * v(f.padding, 5)) return;
                    x.attr({ text: "" })
                };
                if (F(x)) x && x.textStr !== k && (!x.textWidth || f.style && f.style.width || x.styles.width || x.css({ width: null }), x.attr({ text: k }));
                else {
                    if (d.label =
                        x = F(k) && f.enabled ? l.renderer.text(k, 0, 0, f.useHTML).add(p.labelGroup) : null) l.styledMode || x.css(u(f.style)), x.textPxLength = x.getBBox().width;
                    d.rotation = 0
                }
            },
            getLabelSize: function() { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 },
            handleOverflow: function(a) {
                var d = this.axis,
                    k = d.options.labels,
                    l = a.x,
                    e = d.chart.chartWidth,
                    g = d.chart.spacing,
                    c = v(d.labelLeft, Math.min(d.pos, g[3])),
                    g = v(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, e - g[1])),
                    f = this.label,
                    b = this.rotation,
                    n = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[d.labelAlign || f.attr("align")],
                    t = f.getBBox().width,
                    x = d.getSlotWidth(this),
                    B = x,
                    G = 1,
                    q, A = {};
                if (b || "justify" !== v(k.overflow, "justify")) 0 > b && l - n * t < c ? q = Math.round(l / Math.cos(b * r) - c) : 0 < b && l + n * t > g && (q = Math.round((e - l) / Math.cos(b * r)));
                else if (e = l + (1 - n) * t, l - n * t < c ? B = a.x + B * (1 - n) - c : e > g && (B = g - a.x + B * n, G = -1), B = Math.min(x, B), B < x && "center" === d.labelAlign && (a.x += G * (x - B - n * (x - Math.min(t, B)))), t > B || d.autoRotation && (f.styles || {}).width) q = B;
                q && (this.shortenLabel ? this.shortenLabel() : (A.width = Math.floor(q), (k.style || {}).textOverflow || (A.textOverflow = "ellipsis"), f.css(A)))
            },
            getPosition: function(d, p, k, l) {
                var e = this.axis,
                    g = e.chart,
                    c = l && g.oldChartHeight || g.chartHeight;
                d = { x: d ? a.correctFloat(e.translate(p + k, null, null, l) + e.transB) : e.left + e.offset + (e.opposite ? (l && g.oldChartWidth || g.chartWidth) - e.right - e.left : 0), y: d ? c - e.bottom + e.offset - (e.opposite ? e.height : 0) : a.correctFloat(c - e.translate(p + k, null, null, l) - e.transB) };
                h(this, "afterGetPosition", { pos: d });
                return d
            },
            getLabelPosition: function(a, d, k, l, e, g, c, f) {
                var b = this.axis,
                    n = b.transA,
                    t = b.reversed,
                    x = b.staggerLines,
                    B = b.tickRotCorr || { x: 0, y: 0 },
                    p = e.y,
                    q = l || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1),
                    A = {};
                F(p) || (p = 0 === b.side ? k.rotation ? -8 : -k.getBBox().height : 2 === b.side ? B.y + 8 : Math.cos(k.rotation * r) * (B.y - k.getBBox(!1, 0).height / 2));
                a = a + e.x + q + B.x - (g && l ? g * n * (t ? -1 : 1) : 0);
                d = d + p - (g && !l ? g * n * (t ? 1 : -1) : 0);
                x && (k = c / (f || 1) % x, b.opposite && (k = x - k - 1), d += b.labelOffset / x * k);
                A.x = a;
                A.y = Math.round(d);
                h(this, "afterGetLabelPosition", { pos: A, tickmarkOffset: g, index: c });
                return A
            },
            getMarkPath: function(a, d, k, l, e, g) { return g.crispLine(["M", a, d, "L", a + (e ? 0 : -k), d + (e ? k : 0)], l) },
            renderGridLine: function(a, d, k) {
                var l = this.axis,
                    e = l.options,
                    g = this.gridLine,
                    c = {},
                    f = this.pos,
                    b = this.type,
                    n = v(this.tickmarkOffset, l.tickmarkOffset),
                    t = l.chart.renderer,
                    x = b ? b + "Grid" : "grid",
                    B = e[x + "LineWidth"],
                    p = e[x + "LineColor"],
                    e = e[x + "LineDashStyle"];
                g || (l.chart.styledMode || (c.stroke = p, c["stroke-width"] = B, e && (c.dashstyle = e)), b || (c.zIndex = 1), a && (d = 0), this.gridLine = g = t.path().attr(c).addClass("highcharts-" + (b ? b + "-" :
                    "") + "grid-line").add(l.gridGroup));
                if (g && (k = l.getPlotLinePath(f + n, g.strokeWidth() * k, a, "pass"))) g[a || this.isNew ? "attr" : "animate"]({ d: k, opacity: d })
            },
            renderMark: function(a, d, k) {
                var l = this.axis,
                    e = l.options,
                    g = l.chart.renderer,
                    c = this.type,
                    f = c ? c + "Tick" : "tick",
                    b = l.tickSize(f),
                    n = this.mark,
                    t = !n,
                    x = a.x;
                a = a.y;
                var B = v(e[f + "Width"], !c && l.isXAxis ? 1 : 0),
                    e = e[f + "Color"];
                b && (l.opposite && (b[0] = -b[0]), t && (this.mark = n = g.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(l.axisGroup), l.chart.styledMode || n.attr({
                    stroke: e,
                    "stroke-width": B
                })), n[t ? "attr" : "animate"]({ d: this.getMarkPath(x, a, b[0], n.strokeWidth() * k, l.horiz, g), opacity: d }))
            },
            renderLabel: function(a, p, k, l) {
                var e = this.axis,
                    g = e.horiz,
                    c = e.options,
                    f = this.label,
                    b = c.labels,
                    n = b.step,
                    e = v(this.tickmarkOffset, e.tickmarkOffset),
                    t = !0,
                    x = a.x;
                a = a.y;
                f && d(x) && (f.xy = a = this.getLabelPosition(x, a, f, g, b, e, l, n), this.isFirst && !this.isLast && !v(c.showFirstLabel, 1) || this.isLast && !this.isFirst && !v(c.showLastLabel, 1) ? t = !1 : !g || b.step || b.rotation || p || 0 === k || this.handleOverflow(a), n && l % n &&
                    (t = !1), t && d(a.y) ? (a.opacity = k, f[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (f.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(d, p, k) {
                var l = this.axis,
                    e = l.horiz,
                    g = this.pos,
                    c = v(this.tickmarkOffset, l.tickmarkOffset),
                    g = this.getPosition(e, g, c, p),
                    c = g.x,
                    f = g.y,
                    l = e && c === l.pos + l.len || !e && f === l.pos ? -1 : 1;
                k = v(k, 1);
                this.isActive = !0;
                this.renderGridLine(p, k, l);
                this.renderMark(g, k, l);
                this.renderLabel(g, p, k, d);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function() { E(this, this.axis) }
        }
    });
    K(I, "parts/Axis.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.animObject,
            E = a.arrayMax,
            h = a.arrayMin,
            d = a.color,
            u = a.correctFloat,
            v = a.defaultOptions,
            r = a.defined,
            w = a.deg2rad,
            p = a.destroyObjectProperties,
            k = a.extend,
            l = a.fireEvent,
            e = a.format,
            g = a.getMagnitude,
            c = a.isArray,
            f = a.isNumber,
            b = a.isString,
            n = a.merge,
            t = a.normalizeTickInterval,
            x = a.objectEach,
            B = a.pick,
            G = a.removeEvent,
            q = a.seriesTypes,
            A = a.splat,
            z = a.syncTimeout,
            J = a.Tick,
            H = function() { this.init.apply(this, arguments) };
        a.extend(H.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: { main: "%H:%M:%S", range: !1 },
                    minute: { main: "%H:%M", range: !1 },
                    hour: { main: "%H:%M", range: !1 },
                    day: { main: "%e. %b" },
                    week: { main: "%e. %b" },
                    month: { main: "%b '%y" },
                    year: { main: "%Y" }
                },
                endOnTick: !1,
                labels: { enabled: !0, indentation: 10, x: 0, style: { color: "#666666", cursor: "default", fontSize: "11px" } },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: { color: "#666666" }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: { x: -8 },
                startOnTick: !0,
                title: { rotation: 270, text: "Values" },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() { return a.numberFormat(this.total, -1) },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "500",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: { labels: { x: -15 }, title: { rotation: 270 } },
            defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } },
            defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } },
            defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } },
            init: function(a, b) {
                var m = b.isX,
                    c = this;
                c.chart = a;
                c.horiz = a.inverted && !c.isZAxis ? !m : m;
                c.isXAxis = m;
                c.coll = c.coll || (m ? "xAxis" : "yAxis");
                l(this, "init", { userOptions: b });
                c.opposite = b.opposite;
                c.side = b.side || (c.horiz ? c.opposite ? 0 : 2 : c.opposite ? 1 : 3);
                c.setOptions(b);
                var f = this.options,
                    e = f.type;
                c.labelFormatter = f.labels.formatter || c.defaultLabelFormatter;
                c.userOptions = b;
                c.minPixelPadding = 0;
                c.reversed = f.reversed;
                c.visible = !1 !== f.visible;
                c.zoomEnabled = !1 !== f.zoomEnabled;
                c.hasNames = "category" === e || !0 === f.categories;
                c.categories = f.categories || c.hasNames;
                c.names || (c.names = [], c.names.keys = {});
                c.plotLinesAndBandsGroups = {};
                c.isLog = "logarithmic" === e;
                c.isDatetimeAxis = "datetime" ===
                    e;
                c.positiveValuesOnly = c.isLog && !c.allowNegativeLog;
                c.isLinked = r(f.linkedTo);
                c.ticks = {};
                c.labelEdge = [];
                c.minorTicks = {};
                c.plotLinesAndBands = [];
                c.alternateBands = {};
                c.len = 0;
                c.minRange = c.userMinRange = f.minRange || f.maxZoom;
                c.range = f.range;
                c.offset = f.offset || 0;
                c.stacks = {};
                c.oldStacks = {};
                c.stacksTouched = 0;
                c.max = null;
                c.min = null;
                c.crosshair = B(f.crosshair, A(a.options.tooltip.crosshairs)[m ? 0 : 1], !1);
                b = c.options.events; - 1 === a.axes.indexOf(c) && (m ? a.axes.splice(a.xAxis.length, 0, c) : a.axes.push(c), a[c.coll].push(c));
                c.series = c.series || [];
                a.inverted && !c.isZAxis && m && void 0 === c.reversed && (c.reversed = !0);
                x(b, function(a, b) { D(c, b, a) });
                c.lin2log = f.linearToLogConverter || c.lin2log;
                c.isLog && (c.val2lin = c.log2lin, c.lin2val = c.lin2log);
                l(this, "afterInit")
            },
            setOptions: function(a) {
                this.options = n(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], n(v[this.coll], a));
                l(this, "afterSetOptions", { userOptions: a })
            },
            defaultLabelFormatter: function() {
                var b = this.axis,
                    c = this.value,
                    f = b.chart.time,
                    g = b.categories,
                    q = this.dateTimeLabelFormat,
                    n = v.lang,
                    t = n.numericSymbols,
                    n = n.numericSymbolMagnitude || 1E3,
                    d = t && t.length,
                    A, z = b.options.labels.format,
                    b = b.isLog ? Math.abs(c) : b.tickInterval;
                if (z) A = e(z, this, f);
                else if (g) A = c;
                else if (q) A = f.dateFormat(q, c);
                else if (d && 1E3 <= b)
                    for (; d-- && void 0 === A;) f = Math.pow(n, d + 1), b >= f && 0 === 10 * c % f && null !== t[d] && 0 !== c && (A = a.numberFormat(c / f, -1) + t[d]);
                void 0 === A && (A = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return A
            },
            getSeriesExtremes: function() {
                var a = this,
                    b = a.chart,
                    c;
                l(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    a.series.forEach(function(m) {
                        if (m.visible || !b.options.chart.ignoreHiddenSeries) {
                            var e = m.options,
                                C = e.threshold,
                                g, q;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= C && (C = null);
                            if (a.isXAxis) e = m.xData, e.length && (c = m.getXExtremes(e), g = c.min, q = c.max,
                                f(g) || g instanceof Date || (e = e.filter(f), c = m.getXExtremes(e), g = c.min, q = c.max), e.length && (a.dataMin = Math.min(B(a.dataMin, g), g), a.dataMax = Math.max(B(a.dataMax, q), q)));
                            else if (m.getExtremes(), q = m.dataMax, g = m.dataMin, r(g) && r(q) && (a.dataMin = Math.min(B(a.dataMin, g), g), a.dataMax = Math.max(B(a.dataMax, q), q)), r(C) && (a.threshold = C), !e.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                l(this, "afterGetSeriesExtremes")
            },
            translate: function(a, b, c, e, g, q) {
                var m = this.linkedParent || this,
                    C = 1,
                    n = 0,
                    t = e ? m.oldTransA :
                    m.transA;
                e = e ? m.oldMin : m.min;
                var d = m.minPixelPadding;
                g = (m.isOrdinal || m.isBroken || m.isLog && g) && m.lin2val;
                t || (t = m.transA);
                c && (C *= -1, n = m.len);
                m.reversed && (C *= -1, n -= C * (m.sector || m.len));
                b ? (a = (a * C + n - d) / t + e, g && (a = m.lin2val(a))) : (g && (a = m.val2lin(a)), a = f(e) ? C * (a - e) * t + n + C * d + (f(q) ? t * q : 0) : void 0);
                return a
            },
            toPixels: function(a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) },
            toValue: function(a, b) { return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0) },
            getPlotLinePath: function(a, b, c, e,
                g) {
                var m = this,
                    C = m.chart,
                    q = m.left,
                    n = m.top,
                    t, d, A, z, k = c && C.oldChartHeight || C.chartHeight,
                    L = c && C.oldChartWidth || C.chartWidth,
                    x, p = m.transB,
                    H, h = function(a, b, c) { if ("pass" !== e && a < b || a > c) e ? a = Math.min(Math.max(b, a), c) : x = !0; return a };
                H = { value: a, lineWidth: b, old: c, force: e, translatedValue: g };
                l(this, "getPlotLinePath", H, function(l) {
                    g = B(g, m.translate(a, null, null, c));
                    g = Math.min(Math.max(-1E5, g), 1E5);
                    t = A = Math.round(g + p);
                    d = z = Math.round(k - g - p);
                    f(g) ? m.horiz ? (d = n, z = k - m.bottom, t = A = h(t, q, q + m.width)) : (t = q, A = L - m.right, d = z =
                        h(d, n, n + m.height)) : (x = !0, e = !1);
                    l.path = x && !e ? null : C.renderer.crispLine(["M", t, d, "L", A, z], b || 1)
                });
                return H.path
            },
            getLinearTickPositions: function(a, b, c) {
                var m, f = u(Math.floor(b / a) * a);
                c = u(Math.ceil(c / a) * a);
                var e = [],
                    g;
                u(f + a) === f && (g = 20);
                if (this.single) return [b];
                for (b = f; b <= c;) {
                    e.push(b);
                    b = u(b + a, g);
                    if (b === m) break;
                    m = b
                }
                return e
            },
            getMinorTickInterval: function() { var a = this.options; return !0 === a.minorTicks ? B(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval },
            getMinorTickPositions: function() {
                var a =
                    this,
                    b = a.options,
                    c = a.tickPositions,
                    f = a.minorTickInterval,
                    e = [],
                    g = a.pointRangePadding || 0,
                    q = a.min - g,
                    g = a.max + g,
                    n = g - q;
                if (n && n / f < a.len / 3)
                    if (a.isLog) this.paddedTicks.forEach(function(b, c, m) { c && e.push.apply(e, a.getLogTickPositions(f, m[c - 1], m[c], !0)) });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) e = e.concat(a.getTimeTicks(a.normalizeTimeTickInterval(f), q, g, b.startOfWeek));
                else
                    for (b = q + (c[0] - q) % f; b <= g && b !== e[0]; b += f) e.push(b);
                0 !== e.length && a.trimTicks(e);
                return e
            },
            adjustForMinRange: function() {
                var a =
                    this.options,
                    b = this.min,
                    c = this.max,
                    f, e, g, q, n, t, d, A;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null : (this.series.forEach(function(a) {
                    t = a.xData;
                    for (q = d = a.xIncrement ? 1 : t.length - 1; 0 < q; q--)
                        if (n = t[q] - t[q - 1], void 0 === g || n < g) g = n
                }), this.minRange = Math.min(5 * g, this.dataMax - this.dataMin)));
                c - b < this.minRange && (e = this.dataMax - this.dataMin >= this.minRange, A = this.minRange, f = (A - c + b) / 2, f = [b - f, B(a.min, b - f)], e && (f[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = E(f),
                    c = [b + A, B(a.max, b + A)], e && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = h(c), c - b < A && (f[0] = c - A, f[1] = B(a.min, c - A), b = E(f)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : this.series.forEach(function(b) {
                    var c = b.closestPointRange,
                        m = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && r(c) && m && (a = r(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function(a) {
                var b = c(this.categories),
                    m = b ? this.categories : this.names,
                    f = a.options.x,
                    e;
                a.series.requireSorting = !1;
                r(f) || (f = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? m.indexOf(a.name) : B(m.keys[a.name], -1)); - 1 === f ? b || (e = m.length) : e = f;
                void 0 !== e && (this.names[e] = a.name, this.names.keys[a.name] = e);
                return e
            },
            updateNames: function() {
                var a = this,
                    b = this.names;
                0 < b.length && (Object.keys(b.keys).forEach(function(a) { delete b.keys[a] }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(b) {
                    b.xIncrement = null;
                    if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length - 1), b.processData(),
                        b.generatePoints();
                    b.data.forEach(function(c, m) {
                        var f;
                        c && c.options && void 0 !== c.name && (f = a.nameToX(c), void 0 !== f && f !== c.x && (c.x = f, b.xData[m] = f))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var c = this,
                    m = c.max - c.min,
                    f = c.axisPointRange || 0,
                    e, g = 0,
                    n = 0,
                    t = c.linkedParent,
                    d = !!c.categories,
                    A = c.transA,
                    z = c.isXAxis;
                if (z || d || f) e = c.getClosest(), t ? (g = t.minPointOffset, n = t.pointRangePadding) : c.series.forEach(function(a) {
                    var m = d ? 1 : z ? B(a.options.pointRange, e, 0) : c.axisPointRange || 0,
                        C = a.options.pointPlacement;
                    f = Math.max(f, m);
                    if (!c.single ||
                        d) a = q.xrange && a instanceof q.xrange ? !z : z, g = Math.max(g, a && b(C) ? 0 : m / 2), n = Math.max(n, a && "on" === C ? 0 : m)
                }), t = c.ordinalSlope && e ? c.ordinalSlope / e : 1, c.minPointOffset = g *= t, c.pointRangePadding = n *= t, c.pointRange = Math.min(f, m), z && (c.closestPointRange = e);
                a && (c.oldTransA = A);
                c.translationSlope = c.transA = A = c.staticScale || c.len / (m + n || 1);
                c.transB = c.horiz ? c.left : c.bottom;
                c.minPixelPadding = A * g;
                l(this, "afterSetAxisTranslation")
            },
            minFromRange: function() { return this.max - this.range },
            setTickInterval: function(b) {
                var c = this,
                    m = c.chart,
                    e = c.options,
                    q = c.isLog,
                    n = c.isDatetimeAxis,
                    d = c.isXAxis,
                    A = c.isLinked,
                    z = e.maxPadding,
                    k = e.minPadding,
                    x, p = e.tickInterval,
                    H = e.tickPixelInterval,
                    h = c.categories,
                    G = f(c.threshold) ? c.threshold : null,
                    w = c.softThreshold,
                    J, v, E;
                n || h || A || this.getTickAmount();
                v = B(c.userMin, e.min);
                E = B(c.userMax, e.max);
                A ? (c.linkedParent = m[c.coll][e.linkedTo], x = c.linkedParent.getExtremes(), c.min = B(x.min, x.dataMin), c.max = B(x.max, x.dataMax), e.type !== c.linkedParent.options.type && a.error(11, 1, m)) : (!w && r(G) && (c.dataMin >= G ? (x = G, k = 0) :
                    c.dataMax <= G && (J = G, z = 0)), c.min = B(v, x, c.dataMin), c.max = B(E, J, c.dataMax));
                q && (c.positiveValuesOnly && !b && 0 >= Math.min(c.min, B(c.dataMin, c.min)) && a.error(10, 1, m), c.min = u(c.log2lin(c.min), 15), c.max = u(c.log2lin(c.max), 15));
                c.range && r(c.max) && (c.userMin = c.min = v = Math.max(c.dataMin, c.minFromRange()), c.userMax = E = c.max, c.range = null);
                l(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(h || c.axisPointRange || c.usePercentage || A) && r(c.min) && r(c.max) && (m = c.max - c.min) && (!r(v) && k && (c.min -=
                    m * k), !r(E) && z && (c.max += m * z));
                f(e.softMin) && !f(c.userMin) && e.softMin < c.min && (c.min = v = e.softMin);
                f(e.softMax) && !f(c.userMax) && e.softMax > c.max && (c.max = E = e.softMax);
                f(e.floor) && (c.min = Math.min(Math.max(c.min, e.floor), Number.MAX_VALUE));
                f(e.ceiling) && (c.max = Math.max(Math.min(c.max, e.ceiling), B(c.userMax, -Number.MAX_VALUE)));
                w && r(c.dataMin) && (G = G || 0, !r(v) && c.min < G && c.dataMin >= G ? c.min = c.options.minRange ? Math.min(G, c.max - c.minRange) : G : !r(E) && c.max > G && c.dataMax <= G && (c.max = c.options.minRange ? Math.max(G, c.min +
                    c.minRange) : G));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : A && !p && H === c.linkedParent.options.tickPixelInterval ? p = c.linkedParent.tickInterval : B(p, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, h ? 1 : (c.max - c.min) * H / Math.max(c.len, H));
                d && !b && c.series.forEach(function(a) { a.processData(c.min !== c.oldMin || c.max !== c.oldMax) });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !p && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                b = B(e.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !p && c.tickInterval < b && (c.tickInterval = b);
                n || q || p || (c.tickInterval = t(c.tickInterval, null, g(c.tickInterval), B(e.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var b = this.options,
                    c, f = b.tickPositions;
                c = this.getMinorTickInterval();
                var e = b.tickPositioner,
                    g = b.startOnTick,
                    q = b.endOnTick;
                this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === c && this.tickInterval ? this.tickInterval / 5 : c;
                this.single = this.min === this.max && r(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
                this.tickPositions = c = f && f.slice();
                !c && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (c = [this.min, this.max], a.error(19, !1, this.chart)) : c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()], c[0] === c[1] && (c.length = 1)), this.tickPositions = c, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = c = e);
                this.paddedTicks =
                    c.slice(0);
                this.trimTicks(c, g, q);
                this.isLinked || (this.single && 2 > c.length && !this.categories && (this.min -= .5, this.max += .5), f || e || this.adjustTickAmount());
                l(this, "afterSetTickPositions")
            },
            trimTicks: function(a, b, c) {
                var f = a[0],
                    m = a[a.length - 1],
                    e = this.minPointOffset || 0;
                l(this, "trimTicks");
                if (!this.isLinked) {
                    if (b && -Infinity !== f) this.min = f;
                    else
                        for (; this.min - e > a[0];) a.shift();
                    if (c) this.max = m;
                    else
                        for (; this.max + e < a[a.length - 1];) a.pop();
                    0 === a.length && r(f) && !this.options.tickPositions && a.push((m + f) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    b, c = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === c.alignTicks || !1 === c.startOnTick || !1 === c.endOnTick || this.isLog || this.chart[this.coll].forEach(function(c) {
                    var f = c.options,
                        f = [c.horiz ? f.left : f.top, f.width, f.height, f.pane].join();
                    c.series.length && (a[f] ? b = !0 : a[f] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    c = a.tickPixelInterval;
                !r(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len /
                    c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.options,
                    b = this.tickInterval,
                    c = this.tickPositions,
                    f = this.tickAmount,
                    e = this.finalTickAmt,
                    g = c && c.length,
                    q = B(this.threshold, this.softThreshold ? 0 : null),
                    n;
                if (this.hasData()) {
                    if (g < f) {
                        for (n = this.min; c.length < f;) c.length % 2 || n === q ? c.push(u(c[c.length - 1] + b)) : c.unshift(u(c[0] - b));
                        this.transA *= (g - 1) / (f - 1);
                        this.min = a.startOnTick ? c[0] : Math.min(this.min, c[0]);
                        this.max = a.endOnTick ? c[c.length - 1] : Math.max(this.max, c[c.length -
                            1])
                    } else g > f && (this.tickInterval *= 2, this.setTickPositions());
                    if (r(e)) {
                        for (b = a = c.length; b--;)(3 === e && 1 === b % 2 || 2 >= e && 0 < b && b < a - 1) && c.splice(b, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a = this.series.some(function(a) { return a.isDirtyData || a.isDirty || a.xAxis.isDirty }),
                    b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax ||
                    this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                l(this, "afterSetScale")
            },
            setExtremes: function(a, b, c, f, e) {
                var m = this,
                    g = m.chart;
                c = B(c, !0);
                m.series.forEach(function(a) { delete a.kdTree });
                e = k(e, { min: a, max: b });
                l(m, "setExtremes", e, function() {
                    m.userMin = a;
                    m.userMax = b;
                    m.eventArgs = e;
                    c && g.redraw(f)
                })
            },
            zoom: function(a, b) {
                var c = this.dataMin,
                    f = this.dataMax,
                    m = this.options,
                    e = Math.min(c, B(m.min, c)),
                    g = Math.max(f, B(m.max, f));
                a = { newMin: a, newMax: b };
                l(this, "zoom", a, function(a) {
                    var b = a.newMin,
                        m = a.newMax;
                    if (b !== this.min || m !== this.max) this.allowZoomOutside || (r(c) && (b < e && (b = e), b > g && (b = g)), r(f) && (m < e && (m = e), m > g && (m = g))), this.displayBtn = void 0 !== b || void 0 !== m, this.setExtremes(b, m, !1, void 0, { trigger: "zoom" });
                    a.zoomed = !0
                });
                return a.zoomed
            },
            setAxisSize: function() {
                var b =
                    this.chart,
                    c = this.options,
                    f = c.offsets || [0, 0, 0, 0],
                    e = this.horiz,
                    g = this.width = Math.round(a.relativeLength(B(c.width, b.plotWidth - f[3] + f[1]), b.plotWidth)),
                    q = this.height = Math.round(a.relativeLength(B(c.height, b.plotHeight - f[0] + f[2]), b.plotHeight)),
                    n = this.top = Math.round(a.relativeLength(B(c.top, b.plotTop + f[0]), b.plotHeight, b.plotTop)),
                    c = this.left = Math.round(a.relativeLength(B(c.left, b.plotLeft + f[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - q - n;
                this.right = b.chartWidth - g - c;
                this.len = Math.max(e ? g :
                    q, 0);
                this.pos = e ? c : n
            },
            getExtremes: function() { var a = this.isLog; return { min: a ? u(this.lin2log(this.min)) : this.min, max: a ? u(this.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } },
            getThreshold: function(a) {
                var b = this.isLog,
                    c = b ? this.lin2log(this.min) : this.min,
                    b = b ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = c : Infinity === a ? a = b : c > a ? a = c : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                var b = (B(a, 0) - 90 * this.side +
                    720) % 360;
                a = { align: "center" };
                l(this, "autoLabelAlign", a, function(a) { 15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left") });
                return a.align
            },
            tickSize: function(a) {
                var b = this.options,
                    c = b[a + "Length"],
                    f = B(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0),
                    e;
                f && c && ("inside" === b[a + "Position"] && (c = -c), e = [c, f]);
                a = { tickSize: e };
                l(this, "afterTickSize", a);
                return a.tickSize
            },
            labelMetrics: function() {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    c = this.tickInterval,
                    f = c,
                    e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c),
                    g, q = a.rotation,
                    n = this.labelMetrics(),
                    t, d = Number.MAX_VALUE,
                    A, z = this.max - this.min,
                    k = function(a) {
                        var b = a / (e || 1),
                            b = 1 < b ? Math.ceil(b) : 1;
                        b * c > z && Infinity !== a && Infinity !== e && (b = Math.ceil(z / c));
                        return u(b * c)
                    };
                b ? (A = !a.staggerLines && !a.step && (r(q) ? [q] : e < B(a.autoRotationLimit, 80) && a.autoRotation)) && A.forEach(function(a) {
                    var b;
                    if (a === q || a && -90 <= a && 90 >= a) t = k(Math.abs(n.h / Math.sin(w * a))), b = t + Math.abs(a / 360), b < d && (d = b, g = a, f = t)
                }) : a.step || (f = k(n.h));
                this.autoRotation = A;
                this.labelRotation = B(g, q);
                return f
            },
            getSlotWidth: function(a) {
                var b = this.chart,
                    c = this.horiz,
                    f = this.options.labels,
                    e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    m = b.margin[3];
                return a && a.slotWidth || c && 2 > (f.step || 0) && !f.rotation && (this.staggerLines || 1) * this.len / e || !c && (f.style && parseInt(f.style.width, 10) || m && m - b.spacing[3] || .33 * b.chartWidth)
            },
            renderUnsquish: function() {
                var a =
                    this.chart,
                    c = a.renderer,
                    f = this.tickPositions,
                    e = this.ticks,
                    g = this.options.labels,
                    q = g && g.style || {},
                    n = this.horiz,
                    t = this.getSlotWidth(),
                    d = Math.max(1, Math.round(t - 2 * (g.padding || 5))),
                    A = {},
                    z = this.labelMetrics(),
                    k = g.style && g.style.textOverflow,
                    l, x, p = 0,
                    B;
                b(g.rotation) || (A.rotation = g.rotation || 0);
                f.forEach(function(a) {
                    (a = e[a]) && a.label && a.label.textPxLength > p && (p = a.label.textPxLength)
                });
                this.maxLabelLength = p;
                if (this.autoRotation) p > d && p > z.h ? A.rotation = this.labelRotation : this.labelRotation = 0;
                else if (t && (l = d, !k))
                    for (x = "clip", d = f.length; !n && d--;)
                        if (B = f[d], B = e[B].label) B.styles && "ellipsis" === B.styles.textOverflow ? B.css({ textOverflow: "clip" }) : B.textPxLength > t && B.css({ width: t + "px" }), B.getBBox().height > this.len / f.length - (z.h - z.f) && (B.specificTextOverflow = "ellipsis");
                A.rotation && (l = p > .5 * a.chartHeight ? .33 * a.chartHeight : p, k || (x = "ellipsis"));
                if (this.labelAlign = g.align || this.autoLabelAlign(this.labelRotation)) A.align = this.labelAlign;
                f.forEach(function(a) {
                    var b = (a = e[a]) && a.label,
                        c = q.width,
                        f = {};
                    b && (b.attr(A), a.shortenLabel ?
                        a.shortenLabel() : l && !c && "nowrap" !== q.whiteSpace && (l < b.textPxLength || "SPAN" === b.element.tagName) ? (f.width = l, k || (f.textOverflow = b.specificTextOverflow || x), b.css(f)) : b.styles && b.styles.width && !f.width && !c && b.css({ width: null }), delete b.specificTextOverflow, a.rotation = A.rotation)
                }, this);
                this.tickRotCorr = c.rotCorr(z.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() { return this.series.some(function(a) { return a.hasData() }) || this.options.showEmpty && r(this.min) && r(this.max) },
            addTitle: function(a) {
                var b =
                    this.chart.renderer,
                    c = this.horiz,
                    f = this.opposite,
                    e = this.options.title,
                    m, g = this.chart.styledMode;
                this.axisTitle || ((m = e.textAlign) || (m = (c ? { low: "left", middle: "center", high: "right" } : { low: f ? "right" : "left", middle: "center", high: f ? "left" : "right" })[e.align]), this.axisTitle = b.text(e.text, 0, 0, e.useHTML).attr({ zIndex: 7, rotation: e.rotation || 0, align: m }).addClass("highcharts-axis-title"), g || this.axisTitle.css(n(e.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                g || e.style.width || this.isRadial ||
                    this.axisTitle.css({ width: this.len });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new J(this, a)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    c = b.renderer,
                    f = a.options,
                    e = a.tickPositions,
                    g = a.ticks,
                    q = a.horiz,
                    n = a.side,
                    t = b.inverted && !a.isZAxis ? [1, 0, 3, 2][n] : n,
                    d, A, z = 0,
                    k, p = 0,
                    H = f.title,
                    G = f.labels,
                    h = 0,
                    w = b.axisOffset,
                    b = b.clipOffset,
                    J = [-1, 1, 1, -1][n],
                    u = f.className,
                    v = a.axisParent;
                d = a.hasData();
                a.showAxis = A = d || B(f.showEmpty, !0);
                a.staggerLines = a.horiz && G.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({ zIndex: f.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (u || "")).add(v), a.axisGroup = c.g("axis").attr({ zIndex: f.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (u || "")).add(v), a.labelGroup = c.g("axis-labels").attr({ zIndex: G.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (u || "")).add(v));
                d || a.isLinked ? (e.forEach(function(b, c) { a.generateTick(b, c) }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === n || 2 ===
                    n || { 1: "left", 3: "right" }[n] === a.labelAlign, B(G.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && e.forEach(function(a) { h = Math.max(g[a].getLabelSize(), h) }), a.staggerLines && (h *= a.staggerLines), a.labelOffset = h * (a.opposite ? -1 : 1)) : x(g, function(a, b) {
                    a.destroy();
                    delete g[b]
                });
                H && H.text && !1 !== H.enabled && (a.addTitle(A), A && !1 !== H.reserveSpace && (a.titleOffset = z = a.axisTitle.getBBox()[q ? "height" : "width"], k = H.offset, p = r(k) ? 0 : B(H.margin, q ? 5 : 10)));
                a.renderLine();
                a.offset = J * B(f.offset, w[n] ? w[n] +
                    (f.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
                c = 0 === n ? -a.labelMetrics().h : 2 === n ? a.tickRotCorr.y : 0;
                p = Math.abs(h) + p;
                h && (p = p - c + J * (q ? B(G.y, a.tickRotCorr.y + 8 * J) : G.x));
                a.axisTitleMargin = B(k, p);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(g, e));
                q = this.tickSize("tick");
                w[n] = Math.max(w[n], a.axisTitleMargin + z + J * a.offset, p, e && e.length && q ? q[0] + J * a.offset : 0);
                f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[t] = Math.max(b[t], f);
                l(this, "afterGetOffset")
            },
            getLinePath: function(a) {
                var b =
                    this.chart,
                    c = this.opposite,
                    f = this.offset,
                    e = this.horiz,
                    m = this.left + (c ? this.width : 0) + f,
                    f = b.chartHeight - this.bottom - (c ? this.height : 0) + f;
                c && (a *= -1);
                return b.renderer.crispLine(["M", e ? this.left : m, e ? f : this.top, "L", e ? b.chartWidth - this.right : m, e ? f : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    c = this.top,
                    f = this.len,
                    e = this.options.title,
                    g = a ? b : c,
                    q = this.opposite,
                    n = this.offset,
                    t = e.x || 0,
                    d = e.y || 0,
                    A = this.axisTitle,
                    z = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, A),
                    A = Math.max(A.getBBox(null, 0).height - z.h - 1, 0),
                    f = { low: g + (a ? 0 : f), middle: g + f / 2, high: g + (a ? f : 0) }[e.align],
                    b = (a ? c + this.height : b) + (a ? 1 : -1) * (q ? -1 : 1) * this.axisTitleMargin + [-A, A, z.f, -A][this.side],
                    a = { x: a ? f + t : b + (q ? this.width : 0) + n + t, y: a ? b + d - (q ? this.height : 0) + n : f + d };
                l(this, "afterGetTitlePosition", { titlePosition: a });
                return a
            },
            renderMinorTick: function(a) {
                var b = this.chart.hasRendered && f(this.oldMin),
                    c = this.minorTicks;
                c[a] || (c[a] = new J(this, a, "minor"));
                b && c[a].isNew && c[a].render(null, !0);
                c[a].render(null, !1, 1)
            },
            renderTick: function(a, b) {
                var c = this.isLinked,
                    e = this.ticks,
                    g = this.chart.hasRendered && f(this.oldMin);
                if (!c || a >= this.min && a <= this.max) e[a] || (e[a] = new J(this, a)), g && e[a].isNew && e[a].render(b, !0, -1), e[a].render(b)
            },
            render: function() {
                var b = this,
                    c = b.chart,
                    e = b.options,
                    g = b.isLog,
                    q = b.isLinked,
                    n = b.tickPositions,
                    t = b.axisTitle,
                    d = b.ticks,
                    A = b.minorTicks,
                    k = b.alternateBands,
                    p = e.stackLabels,
                    B = e.alternateGridColor,
                    H = b.tickmarkOffset,
                    G = b.axisLine,
                    h = b.showAxis,
                    w = F(c.renderer.globalAnimation),
                    r, u;
                b.labelEdge.length = 0;
                b.overlap = !1;
                [d, A, k].forEach(function(a) { x(a, function(a) { a.isActive = !1 }) });
                if (b.hasData() || q) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function(a) { b.renderMinorTick(a) }), n.length && (n.forEach(function(a, c) { b.renderTick(a, c) }), H && (0 ===
                    b.min || b.single) && (d[-1] || (d[-1] = new J(b, -1, null, !0)), d[-1].render(-1))), B && n.forEach(function(f, e) {
                    u = void 0 !== n[e + 1] ? n[e + 1] + H : b.max - H;
                    0 === e % 2 && f < b.max && u <= b.max + (c.polar ? -H : H) && (k[f] || (k[f] = new a.PlotLineOrBand(b)), r = f + H, k[f].options = { from: g ? b.lin2log(r) : r, to: g ? b.lin2log(u) : u, color: B }, k[f].render(), k[f].isActive = !0)
                }), b._addedPlotLB || ((e.plotLines || []).concat(e.plotBands || []).forEach(function(a) { b.addPlotBandOrLine(a) }), b._addedPlotLB = !0);
                [d, A, k].forEach(function(a) {
                    var b, f = [],
                        e = w.duration;
                    x(a, function(a,
                        b) { a.isActive || (a.render(b, !1, 0), a.isActive = !1, f.push(b)) });
                    z(function() { for (b = f.length; b--;) a[f[b]] && !a[f[b]].isActive && (a[f[b]].destroy(), delete a[f[b]]) }, a !== k && c.hasRendered && e ? e : 0)
                });
                G && (G[G.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(G.strokeWidth()) }), G.isPlaced = !0, G[h ? "show" : "hide"](!0));
                t && h && (e = b.getTitlePosition(), f(e.y) ? (t[t.isNew ? "attr" : "animate"](e), t.isNew = !1) : (t.attr("y", -9999), t.isNew = !0));
                p && p.enabled && b.renderStackTotals();
                b.isDirty = !1;
                l(this, "afterRender")
            },
            redraw: function() {
                this.visible &&
                    (this.render(), this.plotLinesAndBands.forEach(function(a) { a.render() }));
                this.series.forEach(function(a) { a.isDirty = !0 })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var b = this,
                    c = b.stacks,
                    f = b.plotLinesAndBands,
                    e;
                l(this, "destroy", { keepEvents: a });
                a || G(b);
                x(c, function(a, b) {
                    p(a);
                    c[b] = null
                });
                [b.ticks, b.minorTicks, b.alternateBands].forEach(function(a) { p(a) });
                if (f)
                    for (a = f.length; a--;) f[a].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a) {
                    b[a] &&
                        (b[a] = b[a].destroy())
                });
                for (e in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[e] = b.plotLinesAndBandsGroups[e].destroy();
                x(b, function(a, c) {-1 === b.keepProps.indexOf(c) && delete b[c] })
            },
            drawCrosshair: function(a, b) {
                var c, f = this.crosshair,
                    e = B(f.snap, !0),
                    g, q = this.cross;
                l(this, "drawCrosshair", { e: a, point: b });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (r(b) || !e)) {
                    e ? r(b) && (g = B(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : g = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    r(g) && (c = this.getPlotLinePath(b && (this.isXAxis ? b.x : B(b.stackY, b.y)), null, null, null, g) || null);
                    if (!r(c)) { this.hideCrosshair(); return }
                    e = this.categories && !this.isRadial;
                    q || (this.cross = q = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (e ? "category " : "thin ") + f.className).attr({ zIndex: B(f.zIndex, 2) }).add(), this.chart.styledMode || (q.attr({ stroke: f.color || (e ? d("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": B(f.width, 1) }).css({ "pointer-events": "none" }), f.dashStyle &&
                        q.attr({ dashstyle: f.dashStyle })));
                    q.show().attr({ d: c });
                    e && !f.width && q.attr({ "stroke-width": this.transA });
                    this.cross.e = a
                } else this.hideCrosshair();
                l(this, "afterDrawCrosshair", { e: a, point: b })
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide();
                l(this, "afterHideCrosshair")
            }
        });
        return a.Axis = H
    });
    K(I, "parts/LogarithmicAxis.js", [I["parts/Globals.js"]], function(a) {
        var D = a.Axis,
            F = a.getMagnitude,
            E = a.normalizeTickInterval,
            h = a.pick;
        D.prototype.getLogTickPositions = function(a, u, v, r) {
            var d = this.options,
                p = this.len,
                k = [];
            r || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), k = this.getLinearTickPositions(a, u, v);
            else if (.08 <= a)
                for (var p = Math.floor(u), l, e, g, c, f, d = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; p < v + 1 && !f; p++)
                    for (e = d.length, l = 0; l < e && !f; l++) g = this.log2lin(this.lin2log(p) * d[l]), g > u && (!r || c <= v) && void 0 !== c && k.push(c), c > v && (f = !0), c = g;
            else u = this.lin2log(u), v = this.lin2log(v), a = r ? this.getMinorTickInterval() : d.tickInterval, a = h("auto" === a ? null : a, this._minorAutoInterval, d.tickPixelInterval / (r ? 5 : 1) *
                (v - u) / ((r ? p / this.tickPositions.length : p) || 1)), a = E(a, null, F(a)), k = this.getLinearTickPositions(a, u, v).map(this.log2lin), r || (this._minorAutoInterval = a / 5);
            r || (this.tickInterval = a);
            return k
        };
        D.prototype.log2lin = function(a) { return Math.log(a) / Math.LN10 };
        D.prototype.lin2log = function(a) { return Math.pow(10, a) }
    });
    K(I, "parts/PlotLineOrBand.js", [I["parts/Globals.js"], I["parts/Axis.js"]], function(a, D) {
        var F = a.arrayMax,
            E = a.arrayMin,
            h = a.defined,
            d = a.destroyObjectProperties,
            u = a.erase,
            v = a.merge,
            r = a.pick;
        a.PlotLineOrBand =
            function(a, d) {
                this.axis = a;
                d && (this.options = d, this.id = d.id)
            };
        a.PlotLineOrBand.prototype = {
            render: function() {
                a.fireEvent(this, "render");
                var d = this,
                    p = d.axis,
                    k = p.horiz,
                    l = d.options,
                    e = l.label,
                    g = d.label,
                    c = l.to,
                    f = l.from,
                    b = l.value,
                    n = h(f) && h(c),
                    t = h(b),
                    x = d.svgElem,
                    B = !x,
                    G = [],
                    q = l.color,
                    A = r(l.zIndex, 0),
                    z = l.events,
                    G = { "class": "highcharts-plot-" + (n ? "band " : "line ") + (l.className || "") },
                    J = {},
                    H = p.chart.renderer,
                    m = n ? "bands" : "lines";
                p.isLog && (f = p.log2lin(f), c = p.log2lin(c), b = p.log2lin(b));
                p.chart.styledMode || (t ? (G.stroke =
                    q, G["stroke-width"] = l.width, l.dashStyle && (G.dashstyle = l.dashStyle)) : n && (q && (G.fill = q), l.borderWidth && (G.stroke = l.borderColor, G["stroke-width"] = l.borderWidth)));
                J.zIndex = A;
                m += "-" + A;
                (q = p.plotLinesAndBandsGroups[m]) || (p.plotLinesAndBandsGroups[m] = q = H.g("plot-" + m).attr(J).add());
                B && (d.svgElem = x = H.path().attr(G).add(q));
                if (t) G = p.getPlotLinePath(b, x.strokeWidth());
                else if (n) G = p.getPlotBandPath(f, c, l);
                else return;
                (B || !x.d) && G && G.length ? (x.attr({ d: G }), z && a.objectEach(z, function(a, b) {
                    x.on(b, function(a) {
                        z[b].apply(d, [a])
                    })
                })) : x && (G ? (x.show(!0), x.animate({ d: G })) : x.d && (x.hide(), g && (d.label = g = g.destroy())));
                e && h(e.text) && G && G.length && 0 < p.width && 0 < p.height && !G.isFlat ? (e = v({ align: k && n && "center", x: k ? !n && 4 : 10, verticalAlign: !k && n && "middle", y: k ? n ? 16 : 10 : n ? 6 : -4, rotation: k && !n && 90 }, e), this.renderLabel(e, G, n, A)) : g && g.hide();
                return d
            },
            renderLabel: function(a, d, k, l) {
                var e = this.label,
                    g = this.axis.chart.renderer;
                e || (e = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (k ? "band" : "line") + "-label " + (a.className ||
                        "")
                }, e.zIndex = l, this.label = e = g.text(a.text, 0, 0, a.useHTML).attr(e).add(), this.axis.chart.styledMode || e.css(a.style));
                l = d.xBounds || [d[1], d[4], k ? d[6] : d[1]];
                d = d.yBounds || [d[2], d[5], k ? d[7] : d[2]];
                k = E(l);
                g = E(d);
                e.align(a, !1, { x: k, y: g, width: F(l) - k, height: F(d) - g });
                e.show(!0)
            },
            destroy: function() {
                u(this.axis.plotLinesAndBands, this);
                delete this.axis;
                d(this)
            }
        };
        a.extend(D.prototype, {
            getPlotBandPath: function(a, d) {
                var k = this.getPlotLinePath(d, null, null, !0),
                    l = this.getPlotLinePath(a, null, null, !0),
                    e = [],
                    g = this.horiz,
                    c = 1,
                    f;
                a = a < this.min && d < this.min || a > this.max && d > this.max;
                if (l && k)
                    for (a && (f = l.toString() === k.toString(), c = 0), a = 0; a < l.length; a += 6) g && k[a + 1] === l[a + 1] ? (k[a + 1] += c, k[a + 4] += c) : g || k[a + 2] !== l[a + 2] || (k[a + 2] += c, k[a + 5] += c), e.push("M", l[a + 1], l[a + 2], "L", l[a + 4], l[a + 5], k[a + 4], k[a + 5], k[a + 1], k[a + 2], "z"), e.isFlat = f;
                return e
            },
            addPlotBand: function(a) { return this.addPlotBandOrLine(a, "plotBands") },
            addPlotLine: function(a) { return this.addPlotBandOrLine(a, "plotLines") },
            addPlotBandOrLine: function(d, p) {
                var k = (new a.PlotLineOrBand(this,
                        d)).render(),
                    l = this.userOptions;
                k && (p && (l[p] = l[p] || [], l[p].push(d)), this.plotLinesAndBands.push(k));
                return k
            },
            removePlotBandOrLine: function(a) {
                for (var d = this.plotLinesAndBands, k = this.options, l = this.userOptions, e = d.length; e--;) d[e].id === a && d[e].destroy();
                [k.plotLines || [], l.plotLines || [], k.plotBands || [], l.plotBands || []].forEach(function(g) { for (e = g.length; e--;) g[e].id === a && u(g, g[e]) })
            },
            removePlotBand: function(a) { this.removePlotBandOrLine(a) },
            removePlotLine: function(a) { this.removePlotBandOrLine(a) }
        })
    });
    K(I, "parts/Tooltip.js", [I["parts/Globals.js"]], function(a) {
        var D = a.doc,
            F = a.extend,
            E = a.format,
            h = a.isNumber,
            d = a.merge,
            u = a.pick,
            v = a.splat,
            r = a.syncTimeout,
            w = a.timeUnits;
        a.Tooltip = function() { this.init.apply(this, arguments) };
        a.Tooltip.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = { x: 0, y: 0 };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split;
                this.outside = d.outside && !this.split
            },
            cleanSplit: function(a) {
                this.chart.series.forEach(function(d) {
                    var k =
                        d && d.tt;
                    k && (!k.isActive || a ? d.tt = k.destroy() : k.isActive = !1)
                })
            },
            applyFilter: function() {
                var a = this.chart;
                a.renderer.definition({ tagName: "filter", id: "drop-shadow-" + a.index, opacity: .5, children: [{ tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1 }, { tagName: "feOffset", dx: 1, dy: 1 }, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", type: "linear", slope: .3 }] }, { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", "in": "SourceGraphic" }] }] });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            },
            getLabel: function() {
                var d = this,
                    k = this.chart.renderer,
                    l = this.chart.styledMode,
                    e = this.options,
                    g, c;
                this.label || (this.outside && (this.container = g = a.doc.createElement("div"), g.className = "highcharts-tooltip-container", a.css(g, { position: "absolute", top: "1px", pointerEvents: e.style && e.style.pointerEvents }), a.doc.body.appendChild(g), this.renderer = k = new a.Renderer(g, 0, 0)), this.split ? this.label = k.g("tooltip") : (this.label = k.label("",
                    0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({ padding: e.padding, r: e.borderRadius }), l || this.label.attr({ fill: e.backgroundColor, "stroke-width": e.borderWidth }).css(e.style).shadow(e.shadow)), l && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), this.outside && (c = { x: this.label.xSetter, y: this.label.ySetter }, this.label.xSetter = function(a, b) {
                    c[b].call(this.label, d.distance);
                    g.style.left = a + "px"
                }, this.label.ySetter = function(a, b) {
                    c[b].call(this.label, d.distance);
                    g.style.top = a + "px"
                }), this.label.attr({ zIndex: 8 }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                d(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, d(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function(d, k, l, e) {
                var g = this,
                    c = g.now,
                    f = !1 !== g.options.animation && !g.isHidden && (1 < Math.abs(d - c.x) || 1 < Math.abs(k - c.y)),
                    b = g.followPointer || 1 < g.len;
                F(c, { x: f ? (2 * c.x + d) / 3 : d, y: f ? (c.y + k) / 2 : k, anchorX: b ? void 0 : f ? (2 * c.anchorX + l) / 3 : l, anchorY: b ? void 0 : f ? (c.anchorY + e) / 2 : e });
                g.getLabel().attr(c);
                f && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() { g && g.move(d, k, l, e) }, 32))
            },
            hide: function(d) {
                var k = this;
                a.clearTimeout(this.hideTimer);
                d = u(d, this.options.hideDelay, 500);
                this.isHidden ||
                    (this.hideTimer = r(function() {
                        k.getLabel()[d ? "fadeOut" : "hide"]();
                        k.isHidden = !0
                    }, d))
            },
            getAnchor: function(a, d) {
                var k = this.chart,
                    e = k.pointer,
                    g = k.inverted,
                    c = k.plotTop,
                    f = k.plotLeft,
                    b = 0,
                    n = 0,
                    t, x;
                a = v(a);
                this.followPointer && d ? (void 0 === d.chartX && (d = e.normalize(d)), a = [d.chartX - k.plotLeft, d.chartY - c]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function(a) {
                        t = a.series.yAxis;
                        x = a.series.xAxis;
                        b += a.plotX + (!g && x ? x.left - f : 0);
                        n += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!g && t ? t.top - c : 0)
                    }), b /= a.length, n /= a.length,
                    a = [g ? k.plotWidth - n : b, this.shared && !g && 1 < a.length && d ? d.chartY - c : g ? k.plotHeight - b : n]);
                return a.map(Math.round)
            },
            getPosition: function(a, d, l) {
                var e = this.chart,
                    g = this.distance,
                    c = {},
                    f = e.inverted && l.h || 0,
                    b, n = this.outside,
                    t = n ? D.documentElement.clientWidth - 2 * g : e.chartWidth,
                    k = n ? Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.documentElement.clientHeight) : e.chartHeight,
                    B = e.pointer.chartPosition,
                    G = ["y", k, d, (n ? B.top - g : 0) + l.plotY + e.plotTop, n ? 0 : e.plotTop,
                        n ? k : e.plotTop + e.plotHeight
                    ],
                    q = ["x", t, a, (n ? B.left - g : 0) + l.plotX + e.plotLeft, n ? 0 : e.plotLeft, n ? t : e.plotLeft + e.plotWidth],
                    A = !this.followPointer && u(l.ttBelow, !e.inverted === !!l.negative),
                    z = function(a, b, e, q, n, m) {
                        var d = e < q - g,
                            t = q + g + e < b,
                            z = q - g - e;
                        q += g;
                        if (A && t) c[a] = q;
                        else if (!A && d) c[a] = z;
                        else if (d) c[a] = Math.min(m - e, 0 > z - f ? z : z - f);
                        else if (t) c[a] = Math.max(n, q + f + e > b ? q : q + f);
                        else return !1
                    },
                    h = function(a, b, f, e) {
                        var q;
                        e < g || e > b - g ? q = !1 : c[a] = e < f / 2 ? 1 : e > b - f / 2 ? b - f - 2 : e - f / 2;
                        return q
                    },
                    H = function(a) {
                        var c = G;
                        G = q;
                        q = c;
                        b = a
                    },
                    m = function() {
                        !1 !==
                            z.apply(0, G) ? !1 !== h.apply(0, q) || b || (H(!0), m()) : b ? c.x = c.y = 0 : (H(!0), m())
                    };
                (e.inverted || 1 < this.len) && H();
                m();
                return c
            },
            defaultFormatter: function(a) {
                var d = this.points || v(this),
                    l;
                l = [a.tooltipFooterHeaderFormatter(d[0])];
                l = l.concat(a.bodyFormatter(d));
                l.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return l
            },
            refresh: function(d, k) {
                var l = this.chart,
                    e = this.options,
                    g, c = d,
                    f, b = {},
                    n, t = [];
                n = e.formatter || this.defaultFormatter;
                var b = this.shared,
                    x = l.styledMode,
                    B = [];
                e.enabled && (a.clearTimeout(this.hideTimer), this.followPointer =
                    v(c)[0].series.tooltipOptions.followPointer, f = this.getAnchor(c, k), k = f[0], g = f[1], !b || c.series && c.series.noSharedTooltip ? b = c.getLabelConfig() : (B = l.pointer.getActiveSeries(c), l.series.forEach(function(a) {
                        (a.options.inactiveOtherPoints || -1 === B.indexOf(a)) && a.setState("inactive", !0)
                    }), c.forEach(function(a) {
                        a.setState("hover");
                        t.push(a.getLabelConfig())
                    }), b = { x: c[0].category, y: c[0].y }, b.points = t, c = c[0]), this.len = t.length, n = n.call(b, this), b = c.series, this.distance = u(b.tooltipOptions.distance, 16), !1 === n ? this.hide() :
                    (l = this.getLabel(), this.isHidden && l.attr({ opacity: 1 }).show(), this.split ? this.renderSplit(n, v(d)) : (e.style.width && !x || l.css({ width: this.chart.spacingBox.width }), l.attr({ text: n && n.join ? n.join("") : n }), l.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + u(c.colorIndex, b.colorIndex)), x || l.attr({ stroke: e.borderColor || c.color || b.color || "#666666" }), this.updatePosition({ plotX: k, plotY: g, negative: c.negative, ttBelow: c.ttBelow, h: f[2] || 0 })), this.isHidden = !1), a.fireEvent(this, "refresh"))
            },
            renderSplit: function(d,
                k) {
                var l = this,
                    e = [],
                    g = this.chart,
                    c = g.renderer,
                    f = !0,
                    b = this.options,
                    n = 0,
                    t, x = this.getLabel(),
                    B = g.plotTop;
                a.isString(d) && (d = [!1, d]);
                d.slice(0, k.length + 1).forEach(function(a, q) {
                    if (!1 !== a && "" !== a) {
                        q = k[q - 1] || { isHeader: !0, plotX: k[0].plotX, plotY: g.plotHeight };
                        var d = q.series || l,
                            z = d.tt,
                            h = q.series || {},
                            H = "highcharts-color-" + u(q.colorIndex, h.colorIndex, "none");
                        z || (z = { padding: b.padding, r: b.borderRadius }, g.styledMode || (z.fill = b.backgroundColor, z.stroke = b.borderColor || q.color || h.color || "var(--blackColor)", z["stroke-width"] =
                            b.borderWidth), d.tt = z = c.label(null, null, null, (q.isHeader ? b.headerShape : b.shape) || "callout", null, null, b.useHTML).addClass("highcharts-tooltip-box " + H).attr(z).add(x));
                        z.isActive = !0;
                        z.attr({ text: a });
                        g.styledMode || z.css(b.style).shadow(b.shadow);
                        a = z.getBBox();
                        h = a.width + z.strokeWidth();
                        q.isHeader ? (n = a.height, g.xAxis[0].opposite && (t = !0, B -= n), h = Math.max(0, Math.min(q.plotX + g.plotLeft - h / 2, g.chartWidth + (g.scrollablePixels ? g.scrollablePixels - g.marginRight : 0) - h))) : h = q.plotX + g.plotLeft - u(b.distance, 16) - h;
                        0 > h &&
                            (f = !1);
                        a = (q.series && q.series.yAxis && q.series.yAxis.pos) + (q.plotY || 0);
                        a -= B;
                        q.isHeader && (a = t ? -n : g.plotHeight + n);
                        e.push({ target: a, rank: q.isHeader ? 1 : 0, size: d.tt.getBBox().height + 1, point: q, x: h, tt: z })
                    }
                });
                this.cleanSplit();
                b.positioner && e.forEach(function(a) {
                    var c = b.positioner.call(l, a.tt.getBBox().width, a.size, a.point);
                    a.x = c.x;
                    a.align = 0;
                    a.target = c.y;
                    a.rank = u(c.rank, a.rank)
                });
                a.distribute(e, g.plotHeight + n);
                e.forEach(function(a) {
                    var c = a.point,
                        e = c.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: f || c.isHeader || b.positioner ? a.x : c.plotX + g.plotLeft + l.distance,
                        y: a.pos + B,
                        anchorX: c.isHeader ? c.plotX + g.plotLeft : c.plotX + e.xAxis.pos,
                        anchorY: c.isHeader ? g.plotTop + g.plotHeight / 2 : c.plotY + e.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var d = this.chart,
                    l = this.getLabel(),
                    e = (this.options.positioner || this.getPosition).call(this, l.width, l.height, a),
                    g = a.plotX + d.plotLeft;
                a = a.plotY + d.plotTop;
                var c;
                this.outside && (c = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(l.width + c, l.height + c, !1), g += d.pointer.chartPosition.left -
                    e.x, a += d.pointer.chartPosition.top - e.y);
                this.move(Math.round(e.x), Math.round(e.y || 0), g, a)
            },
            getDateFormat: function(a, d, l, e) {
                var g = this.chart.time,
                    c = g.dateFormat("%m-%d %H:%M:%S.%L", d),
                    f, b, n = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
                    t = "millisecond";
                for (b in w) { if (a === w.week && +g.dateFormat("%w", d) === l && "00:00:00.000" === c.substr(6)) { b = "week"; break } if (w[b] > a) { b = t; break } if (n[b] && c.substr(n[b]) !== "01-01 00:00:00.000".substr(n[b])) break; "week" !== b && (t = b) }
                b && (f = g.resolveDTLFormat(e[b]).main);
                return f
            },
            getXDateFormat: function(a, d, l) { d = d.dateTimeLabelFormats; var e = l && l.closestPointRange; return (e ? this.getDateFormat(e, a.x, l.options.startOfWeek, d) : d.day) || d.year },
            tooltipFooterHeaderFormatter: function(d, k) {
                var l = k ? "footer" : "header",
                    e = d.series,
                    g = e.tooltipOptions,
                    c = g.xDateFormat,
                    f = e.xAxis,
                    b = f && "datetime" === f.options.type && h(d.key),
                    n = g[l + "Format"];
                k = { isFooter: k, labelConfig: d };
                a.fireEvent(this, "headerFormatter", k, function(a) {
                    b && !c && (c = this.getXDateFormat(d, g, f));
                    b && c && (d.point && d.point.tooltipDateKeys || ["key"]).forEach(function(a) { n = n.replace("{point." + a + "}", "{point." + a + ":" + c + "}") });
                    e.chart.styledMode && (n = this.styledModeFormat(n));
                    a.text = E(n, { point: d, series: e }, this.chart.time)
                });
                return k.text
            },
            bodyFormatter: function(a) { return a.map(function(a) { var d = a.series.tooltipOptions; return (d[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, d[(a.point.formatPrefix || "point") + "Format"] || "") }) },
            styledModeFormat: function(a) {
                return a.replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,
                    'class\x3d"highcharts-color-{$1.colorIndex}"')
            }
        }
    });
    K(I, "parts/Pointer.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.attr,
            E = a.charts,
            h = a.color,
            d = a.css,
            u = a.defined,
            v = a.extend,
            r = a.find,
            w = a.fireEvent,
            p = a.isNumber,
            k = a.isObject,
            l = a.offset,
            e = a.pick,
            g = a.splat,
            c = a.Tooltip;
        a.Pointer = function(a, b) { this.init(a, b) };
        a.Pointer.prototype = {
            init: function(a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                c && (a.tooltip = new c(a,
                    b.tooltip), this.followTouchMove = e(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    f = c.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (f = e(c.pinchType, f));
                this.zoomX = a = /x/.test(f);
                this.zoomY = f = /y/.test(f);
                this.zoomHor = a && !b || f && b;
                this.zoomVert = f && !b || a && b;
                this.hasZoom = a || f
            },
            normalize: function(a, b) {
                var c;
                c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = l(this.chart.container));
                return v(a, {
                    chartX: Math.round(c.pageX -
                        b.left),
                    chartY: Math.round(c.pageY - b.top)
                })
            },
            getCoordinates: function(a) {
                var b = { xAxis: [], yAxis: [] };
                this.chart.axes.forEach(function(c) { b[c.isXAxis ? "xAxis" : "yAxis"].push({ axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"]) }) });
                return b
            },
            findNearestKDPoint: function(a, b, c) {
                var f;
                a.forEach(function(a) {
                    var e = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(c, e);
                    if ((e = k(a, !0)) && !(e = !k(f, !0))) var e = f.distX - a.distX,
                        g = f.dist - a.dist,
                        q = (a.series.group && a.series.group.zIndex) -
                        (f.series.group && f.series.group.zIndex),
                        e = 0 < (0 !== e && b ? e : 0 !== g ? g : 0 !== q ? q : f.series.index > a.series.index ? -1 : 1);
                    e && (f = a)
                });
                return f
            },
            getPointFromEvent: function(a) { a = a.target; for (var b; a && !b;) b = a.point, a = a.parentNode; return b },
            getChartCoordinatesFromPoint: function(a, b) {
                var c = a.series,
                    f = c.xAxis,
                    c = c.yAxis,
                    g = e(a.clientX, a.plotX),
                    d = a.shapeArgs;
                if (f && c) return b ? { chartX: f.len + f.pos - g, chartY: c.len + c.pos - a.plotY } : { chartX: g + f.pos, chartY: a.plotY + c.pos };
                if (d && d.x && d.y) return { chartX: d.x, chartY: d.y }
            },
            getHoverData: function(a,
                b, c, g, d, l) {
                var f, q = [];
                g = !(!g || !a);
                var n = b && !b.stickyTracking ? [b] : c.filter(function(a) { return a.visible && !(!d && a.directTouch) && e(a.options.enableMouseTracking, !0) && a.stickyTracking });
                b = (f = g ? a : this.findNearestKDPoint(n, d, l)) && f.series;
                f && (d && !b.noSharedTooltip ? (n = c.filter(function(a) { return a.visible && !(!d && a.directTouch) && e(a.options.enableMouseTracking, !0) && !a.noSharedTooltip }), n.forEach(function(a) {
                    var b = r(a.points, function(a) { return a.x === f.x && !a.isNull });
                    k(b) && (a.chart.isBoosting && (b = a.getPoint(b)),
                        q.push(b))
                })) : q.push(f));
                return { hoverPoint: f, hoverSeries: b, hoverPoints: q }
            },
            runPointActions: function(c, b) {
                var f = this.chart,
                    g = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0,
                    d = g ? g.shared : !1,
                    k = b || f.hoverPoint,
                    l = k && k.series || f.hoverSeries,
                    l = this.getHoverData(k, l, f.series, "touchmove" !== c.type && (!!b || l && l.directTouch && this.isDirectTouch), d, c),
                    q = [],
                    A, k = l.hoverPoint;
                A = l.hoverPoints;
                b = (l = l.hoverSeries) && l.tooltipOptions.followPointer;
                d = d && l && !l.noSharedTooltip;
                if (k && (k !== f.hoverPoint || g && g.isHidden)) {
                    (f.hoverPoints || []).forEach(function(a) {-1 === A.indexOf(a) && a.setState() });
                    if (f.hoverSeries !== l) l.onMouseOver();
                    q = this.getActiveSeries(A);
                    f.series.forEach(function(a) {
                        (a.options.inactiveOtherPoints || -1 === q.indexOf(a)) && a.setState("inactive", !0)
                    });
                    (A || []).forEach(function(a) { a.setState("hover") });
                    f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
                    if (!k.series) return;
                    k.firePointEvent("mouseOver");
                    f.hoverPoints = A;
                    f.hoverPoint = k;
                    g && g.refresh(d ? A : k, c)
                } else b && g && !g.isHidden && (k = g.getAnchor([{}], c), g.updatePosition({
                    plotX: k[0],
                    plotY: k[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = D(f.container.ownerDocument, "mousemove", function(b) { var c = E[a.hoverChartIndex]; if (c) c.pointer.onDocumentMouseMove(b) }));
                f.axes.forEach(function(b) {
                    var f = e(b.crosshair.snap, !0),
                        g = f ? a.find(A, function(a) { return a.series[b.coll] === b }) : void 0;
                    g || !f ? b.drawCrosshair(c, g) : b.hideCrosshair()
                })
            },
            getActiveSeries: function(a) {
                var b = [],
                    c;
                (a || []).forEach(function(a) {
                    c = a.series;
                    b.push(c);
                    c.linkedParent && b.push(c.linkedParent);
                    c.linkedSeries && (b = b.concat(c.linkedSeries));
                    c.navigatorSeries && b.push(c.navigatorSeries)
                });
                return b
            },
            reset: function(a, b) {
                var c = this.chart,
                    f = c.hoverSeries,
                    e = c.hoverPoint,
                    d = c.hoverPoints,
                    k = c.tooltip,
                    q = k && k.shared ? d : e;
                a && q && g(q).forEach(function(b) { b.series.isCartesian && void 0 === b.plotX && (a = !1) });
                if (a) k && q && g(q).length && (k.refresh(q), k.shared && d ? d.forEach(function(a) {
                        a.setState(a.state, !0);
                        a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                    }) : e &&
                    (e.setState(e.state, !0), c.axes.forEach(function(a) { a.crosshair && a.drawCrosshair(null, e) })));
                else {
                    if (e) e.onMouseOut();
                    d && d.forEach(function(a) { a.setState() });
                    if (f) f.onMouseOut();
                    k && k.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    c.axes.forEach(function(a) { a.hideCrosshair() });
                    this.hoverX = c.hoverPoints = c.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var c = this.chart,
                    f;
                c.series.forEach(function(e) {
                    f = a || e.getPlotBox();
                    e.xAxis && e.xAxis.zoomEnabled && e.group && (e.group.attr(f), e.markerGroup &&
                        (e.markerGroup.attr(f), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(f))
                });
                c.clipRect.attr(b || c.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    c = b.options.chart,
                    f = a.chartX,
                    e = a.chartY,
                    g = this.zoomHor,
                    d = this.zoomVert,
                    q = b.plotLeft,
                    A = b.plotTop,
                    k = b.plotWidth,
                    l = b.plotHeight,
                    H, m = this.selectionMarker,
                    p = this.mouseDownX,
                    r = this.mouseDownY,
                    w = c.panKey && a[c.panKey + "Key"];
                m && m.touch || (f < q ? f = q : f > q + k && (f = q + k), e < A ? e = A : e > A + l && (e = A + l), this.hasDragged = Math.sqrt(Math.pow(p - f, 2) + Math.pow(r - e, 2)), 10 < this.hasDragged && (H = b.isInsidePlot(p - q, r - A), b.hasCartesianSeries && (this.zoomX || this.zoomY) && H && !w && !m && (this.selectionMarker = m = b.renderer.rect(q, A, g ? 1 : k, d ? 1 : l, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), b.styledMode || m.attr({ fill: c.selectionMarkerFill || h("#335cad").setOpacity(.25).get() })), m && g && (f -= p, m.attr({
                    width: Math.abs(f),
                    x: (0 <
                        f ? 0 : f) + p
                })), m && d && (f = e - r, m.attr({ height: Math.abs(f), y: (0 < f ? 0 : f) + r })), H && !m && c.panning && b.pan(a, c.panning)))
            },
            drop: function(a) {
                var b = this,
                    c = this.chart,
                    f = this.hasPinched;
                if (this.selectionMarker) {
                    var e = { originalEvent: a, xAxis: [], yAxis: [] },
                        g = this.selectionMarker,
                        k = g.attr ? g.attr("x") : g.x,
                        q = g.attr ? g.attr("y") : g.y,
                        A = g.attr ? g.attr("width") : g.width,
                        z = g.attr ? g.attr("height") : g.height,
                        l;
                    if (this.hasDragged || f) c.axes.forEach(function(c) {
                        if (c.zoomEnabled && u(c.min) && (f || b[{ xAxis: "zoomX", yAxis: "zoomY" }[c.coll]])) {
                            var g =
                                c.horiz,
                                d = "touchend" === a.type ? c.minPixelPadding : 0,
                                n = c.toValue((g ? k : q) + d),
                                g = c.toValue((g ? k + A : q + z) - d);
                            e[c.coll].push({ axis: c, min: Math.min(n, g), max: Math.max(n, g) });
                            l = !0
                        }
                    }), l && w(c, "selection", e, function(a) { c.zoom(v(a, f ? { animation: !1 } : null)) });
                    p(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    f && this.scaleGroups()
                }
                c && p(c.index) && (d(c.container, { cursor: c._cursor }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a =
                    this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(c) { E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(c) },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(c) {
                var b = E[a.hoverChartIndex];
                b && (c.relatedTarget || c.toElement) &&
                    (b.pointer.reset(), b.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(c) {
                var b = this.chart;
                u(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                c = this.normalize(c);
                c.preventDefault || (c.returnValue = !1);
                "mousedown" === b.mouseIsDown && this.drag(c);
                !this.inClass(c.target, "highcharts-tracker") && !b.isInsidePlot(c.chartX - b.plotLeft, c.chartY - b.plotTop) || b.openMenu || this.runPointActions(c)
            },
            inClass: function(a, b) {
                for (var c; a;) {
                    if (c = F(a, "class")) {
                        if (-1 !==
                            c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    e = b.plotLeft,
                    f = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target,
                    "highcharts-tracker") ? (w(c.series, "click", v(a, { point: c })), b.hoverPoint && c.firePointEvent("click", a)) : (v(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - f) && w(b, "click", a)))
            },
            setDOMEvents: function() {
                var c = this,
                    b = c.chart.container,
                    e = b.ownerDocument;
                b.onmousedown = function(a) { c.onContainerMouseDown(a) };
                b.onmousemove = function(a) { c.onContainerMouseMove(a) };
                b.onclick = function(a) { c.onContainerClick(a) };
                this.unbindContainerMouseLeave = D(b, "mouseleave", c.onContainerMouseLeave);
                a.unbindDocumentMouseUp ||
                    (a.unbindDocumentMouseUp = D(e, "mouseup", c.onDocumentMouseUp));
                a.hasTouch && (b.ontouchstart = function(a) { c.onContainerTouchStart(a) }, b.ontouchmove = function(a) { c.onContainerTouchMove(a) }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = D(e, "touchend", c.onDocumentTouchEnd)))
            },
            destroy: function() {
                var c = this;
                c.unDocMouseMove && c.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd =
                    a.unbindDocumentTouchEnd()));
                clearInterval(c.tooltipTimeout);
                a.objectEach(c, function(a, e) { c[e] = null })
            }
        }
    });
    K(I, "parts/TouchPointer.js", [I["parts/Globals.js"]], function(a) {
        var D = a.charts,
            F = a.extend,
            E = a.noop,
            h = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function(a, h, v, r, w, p) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, h, v, r, w, p);
                this.zoomVert && this.pinchTranslateDirection(!1, a, h, v, r, w, p)
            },
            pinchTranslateDirection: function(a, h, v, r, w, p, k, l) {
                var e = this.chart,
                    g = a ? "x" : "y",
                    c = a ? "X" : "Y",
                    f = "chart" + c,
                    b = a ?
                    "width" : "height",
                    d = e["plot" + (a ? "Left" : "Top")],
                    t, x, B = l || 1,
                    G = e.inverted,
                    q = e.bounds[a ? "h" : "v"],
                    A = 1 === h.length,
                    z = h[0][f],
                    J = v[0][f],
                    H = !A && h[1][f],
                    m = !A && v[1][f],
                    C;
                v = function() {
                    !A && 20 < Math.abs(z - H) && (B = l || Math.abs(J - m) / Math.abs(z - H));
                    x = (d - J) / B + z;
                    t = e["plot" + (a ? "Width" : "Height")] / B
                };
                v();
                h = x;
                h < q.min ? (h = q.min, C = !0) : h + t > q.max && (h = q.max - t, C = !0);
                C ? (J -= .8 * (J - k[g][0]), A || (m -= .8 * (m - k[g][1])), v()) : k[g] = [J, m];
                G || (p[g] = x - d, p[b] = t);
                p = G ? 1 / B : B;
                w[b] = t;
                w[g] = h;
                r[G ? a ? "scaleY" : "scaleX" : "scale" + c] = B;
                r["translate" + c] = p * d + (J - p *
                    z)
            },
            pinch: function(a) {
                var d = this,
                    v = d.chart,
                    r = d.pinchDown,
                    w = a.touches,
                    p = w.length,
                    k = d.lastValidTouch,
                    l = d.hasZoom,
                    e = d.selectionMarker,
                    g = {},
                    c = 1 === p && (d.inClass(a.target, "highcharts-tracker") && v.runTrackerClick || d.runChartClick),
                    f = {};
                1 < p && (d.initiated = !0);
                l && d.initiated && !c && a.preventDefault();
                [].map.call(w, function(a) { return d.normalize(a) });
                "touchstart" === a.type ? ([].forEach.call(w, function(a, c) { r[c] = { chartX: a.chartX, chartY: a.chartY } }), k.x = [r[0].chartX, r[1] && r[1].chartX], k.y = [r[0].chartY, r[1] && r[1].chartY],
                    v.axes.forEach(function(a) {
                        if (a.zoomEnabled) {
                            var b = v.bounds[a.horiz ? "h" : "v"],
                                c = a.minPixelPadding,
                                e = a.toPixels(h(a.options.min, a.dataMin)),
                                f = a.toPixels(h(a.options.max, a.dataMax)),
                                g = Math.max(e, f);
                            b.min = Math.min(a.pos, Math.min(e, f) - c);
                            b.max = Math.max(a.pos + a.len, g + c)
                        }
                    }), d.res = !0) : d.followTouchMove && 1 === p ? this.runPointActions(d.normalize(a)) : r.length && (e || (d.selectionMarker = e = F({ destroy: E, touch: !0 }, v.plotBox)), d.pinchTranslate(r, w, g, e, f, k), d.hasPinched = l, d.scaleGroups(g, f), d.res && (d.res = !1, this.reset(!1,
                    0)))
            },
            touch: function(d, u) {
                var v = this.chart,
                    r, w;
                if (v.index !== a.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 });
                a.hoverChartIndex = v.index;
                1 === d.touches.length ? (d = this.normalize(d), (w = v.isInsidePlot(d.chartX - v.plotLeft, d.chartY - v.plotTop)) && !v.openMenu ? (u && this.runPointActions(d), "touchmove" === d.type && (u = this.pinchDown, r = u[0] ? 4 <= Math.sqrt(Math.pow(u[0].chartX - d.chartX, 2) + Math.pow(u[0].chartY - d.chartY, 2)) : !1), h(r, !0) && this.pinch(d)) : u && this.reset()) : 2 === d.touches.length && this.pinch(d)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) { this.touch(a) },
            onDocumentTouchEnd: function(d) { D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(d) }
        })
    });
    K(I, "parts/MSPointer.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.charts,
            E = a.css,
            h = a.doc,
            d = a.extend,
            u = a.noop,
            v = a.Pointer,
            r = a.removeEvent,
            w = a.win,
            p = a.wrap;
        if (!a.hasTouch && (w.PointerEvent || w.MSPointerEvent)) {
            var k = {},
                l = !!w.PointerEvent,
                e = function() {
                    var c = [];
                    c.item = function(a) { return this[a] };
                    a.objectEach(k, function(a) { c.push({ pageX: a.pageX, pageY: a.pageY, target: a.target }) });
                    return c
                },
                g = function(c, f, b, g) { "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (g(c), g = F[a.hoverChartIndex].pointer, g[f]({ type: b, target: c.currentTarget, preventDefault: u, touches: e() })) };
            d(v.prototype, {
                onContainerPointerDown: function(a) { g(a, "onContainerTouchStart", "touchstart", function(a) { k[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget } }) },
                onContainerPointerMove: function(a) {
                    g(a,
                        "onContainerTouchMove", "touchmove",
                        function(a) {
                            k[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
                            k[a.pointerId].target || (k[a.pointerId].target = a.currentTarget)
                        })
                },
                onDocumentPointerUp: function(a) { g(a, "onDocumentTouchEnd", "touchend", function(a) { delete k[a.pointerId] }) },
                batchMSEvents: function(a) {
                    a(this.chart.container, l ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, l ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(h, l ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            p(v.prototype, "init", function(a, e, b) {
                a.call(this, e, b);
                this.hasZoom && E(e.container, { "-ms-touch-action": "none", "touch-action": "none" })
            });
            p(v.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(D)
            });
            p(v.prototype, "destroy", function(a) {
                this.batchMSEvents(r);
                a.call(this)
            })
        }
    });
    K(I, "parts/Legend.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.css,
            E = a.discardElement,
            h = a.defined,
            d = a.fireEvent,
            u = a.isFirefox,
            v = a.marginNames,
            r = a.merge,
            w = a.pick,
            p = a.setAnimation,
            k = a.stableSort,
            l = a.win,
            e = a.wrap;
        a.Legend = function(a, c) { this.init(a, c) };
        a.Legend.prototype = {
            init: function(a, c) {
                this.chart = a;
                this.setOptions(c);
                c.enabled && (this.render(), D(this.chart, "endResize", function() { this.legend.positionCheckboxes() }), this.proximate ? this.unchartrender = D(this.chart, "render", function() {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            },
            setOptions: function(a) {
                var c = w(a.padding, 8);
                this.options = a;
                this.chart.styledMode ||
                    (this.itemStyle = a.itemStyle, this.itemHiddenStyle = r(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.symbolWidth = w(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function(a, c) {
                var e = this.chart;
                this.setOptions(r(!0, this.options, a));
                this.destroy();
                e.isDirtyLegend = e.isDirtyBox = !0;
                w(c, !0) && e.redraw();
                d(this, "afterUpdate")
            },
            colorizeItem: function(a, c) {
                a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var e = this.options,
                        b = a.legendItem,
                        g = a.legendLine,
                        t = a.legendSymbol,
                        k = this.itemHiddenStyle.color,
                        e = c ? e.itemStyle.color : k,
                        l = c ? a.color || k : k,
                        h = a.options && a.options.marker,
                        q = { fill: l };
                    b && b.css({ fill: e, color: e });
                    g && g.attr({ stroke: l });
                    t && (h && t.isMarker && (q = a.pointAttribs(), c || (q.stroke = q.fill = k)), t.attr(q))
                }
                d(this, "afterColorizeItem", { item: a, visible: c })
            },
            positionItems: function() {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function(a) {
                var c =
                    this.options,
                    e = c.symbolPadding,
                    c = !c.rtl,
                    b = a._legendItemPos,
                    g = b[0],
                    b = b[1],
                    d = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[h(a.translateY) ? "animate" : "attr"]({ translateX: c ? g : this.legendWidth - g - 2 * e - 4, translateY: b });
                d && (d.x = g, d.y = b)
            },
            destroyItem: function(a) {
                var c = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(c) { a[c] && (a[c] = a[c].destroy()) });
                c && E(a.checkbox)
            },
            destroy: function() {
                function a(a) { this[a] && (this[a] = this[a].destroy()) }
                this.getAllItems().forEach(function(c) {
                    ["legendItem",
                        "legendGroup"
                    ].forEach(a, c)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    c, e = this.clipHeight || this.legendHeight,
                    b = this.titleHeight;
                a && (c = a.translateY, this.allItems.forEach(function(f) {
                    var g = f.checkbox,
                        d;
                    g && (d = c + b + g.y + (this.scrollOffset || 0) + 3, F(g, { left: a.translateX + f.checkboxOffset + g.x - 20 + "px", top: d + "px", display: this.proximate || d > c - 6 && d < c + e - 6 ? "" : "none" }))
                }, this))
            },
            renderTitle: function() {
                var a =
                    this.options,
                    c = this.padding,
                    e = a.title,
                    b = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(e.style), this.title.add(this.group)), e.width || this.title.css({ width: this.maxLegendWidth + "px" }), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: b }));
                this.titleHeight = b
            },
            setText: function(e) {
                var c = this.options;
                e.legendItem.attr({
                    text: c.labelFormat ?
                        a.format(c.labelFormat, e, this.chart.time) : c.labelFormatter.call(e)
                })
            },
            renderItem: function(a) {
                var c = this.chart,
                    e = c.renderer,
                    b = this.options,
                    g = this.symbolWidth,
                    d = b.symbolPadding,
                    k = this.itemStyle,
                    l = this.itemHiddenStyle,
                    h = "horizontal" === b.layout ? w(b.itemDistance, 20) : 0,
                    q = !b.rtl,
                    A = a.legendItem,
                    z = !a.series,
                    p = !z && a.series.drawLegendSymbol ? a.series : a,
                    H = p.options,
                    H = this.createCheckboxForItem && H && H.showCheckbox,
                    h = g + d + h + (H ? 20 : 0),
                    m = b.useHTML,
                    C = a.options.className;
                A || (a.legendGroup = e.g("legend-item").addClass("highcharts-" +
                        p.type + "-series highcharts-color-" + a.colorIndex + (C ? " " + C : "") + (z ? " highcharts-series-" + a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = A = e.text("", q ? g + d : -d, this.baseline || 0, m), c.styledMode || A.css(r(a.visible ? k : l)), A.attr({ align: q ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(c.styledMode ? 12 : k.fontSize, A), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, A.attr("y", this.baseline)), this.symbolHeight = b.symbolHeight || this.fontMetrics.f,
                    p.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, A, m));
                H && !a.checkbox && this.createCheckboxForItem(a);
                this.colorizeItem(a, a.visible);
                !c.styledMode && k.width || A.css({ width: (b.itemWidth || this.widthOption || c.spacingBox.width) - h });
                this.setText(a);
                c = A.getBBox();
                a.itemWidth = a.checkboxOffset = b.itemWidth || a.legendItemWidth || c.width + h;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || c.height ||
                    this.symbolHeight)
            },
            layoutItem: function(a) {
                var c = this.options,
                    e = this.padding,
                    b = "horizontal" === c.layout,
                    g = a.itemHeight,
                    d = c.itemMarginBottom || 0,
                    k = this.itemMarginTop,
                    l = b ? w(c.itemDistance, 20) : 0,
                    h = this.maxLegendWidth,
                    c = c.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : a.itemWidth;
                b && this.itemX - e + c > h && (this.itemX = e, this.lastLineHeight && (this.itemY += k + this.lastLineHeight + d), this.lastLineHeight = 0);
                this.lastItemY = k + this.itemY + d;
                this.lastLineHeight = Math.max(g, this.lastLineHeight);
                a._legendItemPos = [this.itemX,
                    this.itemY
                ];
                b ? this.itemX += c : (this.itemY += k + g + d, this.lastLineHeight = g);
                this.offsetWidth = this.widthOption || Math.max((b ? this.itemX - e - (a.checkbox ? 0 : l) : c) + e, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                this.chart.series.forEach(function(c) {
                    var e = c && c.options;
                    c && w(e.showInLegend, h(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === e.legendType ? c.data : c)))
                });
                d(this, "afterGetAllItems", { allItems: a });
                return a
            },
            getAlignment: function() {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) +
                    "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, c) {
                var e = this.chart,
                    b = this.options,
                    d = this.getAlignment(),
                    g = void 0 !== e.options.title.margin ? e.titleOffset + e.options.title.margin : 0;
                d && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(f, n) { f.test(d) && !h(a[n]) && (e[v[n]] = Math.max(e[v[n]], e.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * b[n % 2 ? "x" : "y"] + w(b.margin, 12) + c[n] + (0 === n && (0 === e.titleOffset ? 0 : g)))) })
            },
            proximatePositions: function() {
                var e = this.chart,
                    c = [],
                    f = "left" === this.options.align;
                this.allItems.forEach(function(b) {
                    var d, g;
                    g = f;
                    var k;
                    b.yAxis && b.points && (b.xAxis.options.reversed && (g = !g), d = a.find(g ? b.points : b.points.slice(0).reverse(), function(b) { return a.isNumber(b.plotY) }), g = b.legendGroup.getBBox().height, k = b.yAxis.top - e.plotTop, b.visible ? (d = d ? d.plotY : b.yAxis.height, d += k - .3 * g) : d = k + b.yAxis.height, c.push({ target: d, size: g, item: b }))
                }, this);
                a.distribute(c, e.plotHeight);
                c.forEach(function(a) {
                    a.item._legendItemPos[1] =
                        e.plotTop - e.spacing[0] + a.pos
                })
            },
            render: function() {
                var e = this.chart,
                    c = e.renderer,
                    f = this.group,
                    b, n, t, l = this.box,
                    h = this.options,
                    p = this.padding;
                this.itemX = p;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = a.relativeLength(h.width, e.spacingBox.width - p);
                b = e.spacingBox.width - 2 * p - h.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (b /= 2);
                this.maxLegendWidth = this.widthOption || b;
                f || (this.group = f = c.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = c.g().attr({ zIndex: 1 }).add(f),
                    this.scrollGroup = c.g().add(this.contentGroup));
                this.renderTitle();
                b = this.getAllItems();
                k(b, function(a, b) { return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0) });
                h.reversed && b.reverse();
                this.allItems = b;
                this.display = n = !!b.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                b.forEach(this.renderItem, this);
                b.forEach(this.layoutItem, this);
                b = (this.widthOption || this.offsetWidth) + p;
                t = this.lastItemY + this.lastLineHeight + this.titleHeight;
                t = this.handleOverflow(t);
                t += p;
                l || (this.box = l = c.rect().addClass("highcharts-legend-box").attr({ r: h.borderRadius }).add(f), l.isNew = !0);
                e.styledMode || l.attr({ stroke: h.borderColor, "stroke-width": h.borderWidth || 0, fill: h.backgroundColor || "none" }).shadow(h.shadow);
                0 < b && 0 < t && (l[l.isNew ? "attr" : "animate"](l.crisp.call({}, { x: 0, y: 0, width: b, height: t }, l.strokeWidth())), l.isNew = !1);
                l[n ? "show" : "hide"]();
                e.styledMode && "none" === f.getStyle("display") && (b = t = 0);
                this.legendWidth = b;
                this.legendHeight = t;
                n && (c = e.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) &&
                    (l = c.y + e.titleOffset, c = r(c, { y: 0 < e.titleOffset ? l += e.options.title.margin : l })), f.align(r(h, { width: b, height: t, verticalAlign: this.proximate ? "top" : h.verticalAlign }), !0, c));
                this.proximate || this.positionItems();
                d(this, "afterRender")
            },
            handleOverflow: function(a) {
                var c = this,
                    e = this.chart,
                    b = e.renderer,
                    d = this.options,
                    g = d.y,
                    k = this.padding,
                    g = e.spacingBox.height + ("top" === d.verticalAlign ? -g : g) - k,
                    l = d.maxHeight,
                    h, q = this.clipRect,
                    A = d.navigation,
                    z = w(A.animation, !0),
                    p = A.arrowSize || 12,
                    H = this.nav,
                    m = this.pages,
                    C, r = this.allItems,
                    u = function(a) {
                        "number" === typeof a ? q.attr({ height: a }) : q && (c.clipRect = q.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + k + "px,9999px," + (k + a) + "px,0)" : "auto")
                    },
                    L = function(a) {
                        c[a] = b.circle(0, 0, 1.3 * p).translate(p / 2, p / 2).add(H);
                        e.styledMode || c[a].attr("fill", "rgba(0,0,0,0.0001)");
                        return c[a]
                    };
                "horizontal" !== d.layout || "middle" === d.verticalAlign || d.floating || (g /= 2);
                l && (g = Math.min(g, l));
                m.length = 0;
                a > g && !1 !== A.enabled ? (this.clipHeight = h = Math.max(g - 20 - this.titleHeight -
                    k, 0), this.currentPage = w(this.currentPage, 1), this.fullHeight = a, r.forEach(function(a, b) {
                    var c = a._legendItemPos[1],
                        e = Math.round(a.legendItem.getBBox().height),
                        f = m.length;
                    if (!f || c - m[f - 1] > h && (C || c) !== m[f - 1]) m.push(C || c), f++;
                    a.pageIx = f - 1;
                    C && (r[b - 1].pageIx = f - 1);
                    b === r.length - 1 && c + e - m[f - 1] > h && c !== C && (m.push(c), a.pageIx = f);
                    c !== C && (C = c)
                }), q || (q = c.clipRect = b.clipRect(0, k, 9999, 0), c.contentGroup.clip(q)), u(h), H || (this.nav = H = b.g().attr({ zIndex: 1 }).add(this.group), this.up = b.symbol("triangle", 0, 0, p, p).add(H), L("upTracker").on("click",
                    function() { c.scroll(-1, z) }), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation"), e.styledMode || this.pager.css(A.style), this.pager.add(H), this.down = b.symbol("triangle-down", 0, 0, p, p).add(H), L("downTracker").on("click", function() { c.scroll(1, z) })), c.scroll(0), a = g) : H && (u(), this.nav = H.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, c) {
                var e = this.pages,
                    b = e.length,
                    d = this.currentPage + a;
                a = this.clipHeight;
                var g = this.options.navigation,
                    k = this.pager,
                    l = this.padding;
                d > b && (d = b);
                0 < d && (void 0 !== c && p(c, this.chart), this.nav.attr({ translateX: l, translateY: a + this.padding + 7 + this.titleHeight, visibility: "visible" }), [this.up, this.upTracker].forEach(function(a) { a.attr({ "class": 1 === d ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }), k.attr({ text: d + "/" + b }), [this.down, this.downTracker].forEach(function(a) { a.attr({ x: 18 + this.pager.getBBox().width, "class": d === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }, this), this.chart.styledMode ||
                    (this.up.attr({ fill: 1 === d ? g.inactiveColor : g.activeColor }), this.upTracker.css({ cursor: 1 === d ? "default" : "pointer" }), this.down.attr({ fill: d === b ? g.inactiveColor : g.activeColor }), this.downTracker.css({ cursor: d === b ? "default" : "pointer" })), this.scrollOffset = -e[d - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = d, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, c) {
                var e = a.symbolHeight,
                    b = a.options.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(b ?
                    (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, b ? e : a.symbolWidth, e, w(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(c.legendGroup)
            },
            drawLineMarker: function(a) {
                var c = this.options,
                    e = c.marker,
                    b = a.symbolWidth,
                    d = a.symbolHeight,
                    g = d / 2,
                    k = this.chart.renderer,
                    l = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var h = {};
                this.chart.styledMode || (h = { "stroke-width": c.lineWidth || 0 }, c.dashStyle && (h.dashstyle = c.dashStyle));
                this.legendLine = k.path(["M", 0, a, "L", b, a]).addClass("highcharts-graph").attr(h).add(l);
                e && !1 !== e.enabled && b && (c = Math.min(w(e.radius, g), g), 0 === this.symbol.indexOf("url") && (e = r(e, { width: d, height: d }), c = 0), this.legendSymbol = e = k.symbol(this.symbol, b / 2 - c, a - c, 2 * c, 2 * c, e).addClass("highcharts-point").add(l), e.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(l.navigator && l.navigator.userAgent) || u) && e(a.Legend.prototype, "positionItem", function(a, c) {
            var e = this,
                b = function() { c._legendItemPos && a.call(e, c) };
            b();
            e.bubbleLegend || setTimeout(b)
        })
    });
    K(I, "parts/Chart.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.animate,
            E = a.animObject,
            h = a.attr,
            d = a.doc,
            u = a.Axis,
            v = a.createElement,
            r = a.defaultOptions,
            w = a.discardElement,
            p = a.charts,
            k = a.css,
            l = a.defined,
            e = a.extend,
            g = a.find,
            c = a.fireEvent,
            f = a.isNumber,
            b = a.isObject,
            n = a.isString,
            t = a.Legend,
            x = a.marginNames,
            B = a.merge,
            G = a.objectEach,
            q = a.Pointer,
            A = a.pick,
            z = a.pInt,
            J = a.removeEvent,
            H = a.seriesTypes,
            m = a.splat,
            C = a.syncTimeout,
            M = a.win,
            U = a.Chart = function() { this.getArgs.apply(this, arguments) };
        a.chart = function(a, b, c) { return new U(a, b, c) };
        e(U.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (n(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(e, f) {
                var d, g = e.series,
                    q = e.plotOptions || {};
                c(this, "init", { args: arguments }, function() {
                    e.series = null;
                    d = B(r, e);
                    G(d.plotOptions, function(a, c) { b(a) && (a.tooltip = q[c] && B(q[c].tooltip) || void 0) });
                    d.tooltip.userOptions = e.chart && e.chart.forExport && e.tooltip.userOptions || e.tooltip;
                    d.series = e.series = g;
                    this.userOptions = e;
                    var m = d.chart,
                        k = m.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = { h: {}, v: {} };
                    this.labelCollectors = [];
                    this.callback = f;
                    this.isResizing = 0;
                    this.options = d;
                    this.axes = [];
                    this.series = [];
                    this.time = e.time && Object.keys(e.time).length ? new a.Time(e.time) : a.time;
                    this.styledMode = m.styledMode;
                    this.hasCartesianSeries = m.showAxes;
                    var n = this;
                    n.index = p.length;
                    p.push(n);
                    a.chartCount++;
                    k && G(k, function(a, b) { D(n, b, a) });
                    n.xAxis = [];
                    n.yAxis = [];
                    n.pointCount = n.colorCounter = n.symbolCounter = 0;
                    c(n, "afterInit");
                    n.firstRender()
                })
            },
            initSeries: function(b) {
                var c = this.options.chart;
                (c = H[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0, this);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function(a) { var b = this.series; for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName()) },
            isInsidePlot: function(a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                c(this, "beforeRedraw");
                var f = this.axes,
                    d = this.series,
                    g = this.pointer,
                    q = this.legend,
                    m = this.userOptions.legend,
                    k = this.isDirtyLegend,
                    n, A, l = this.hasCartesianSeries,
                    z = this.isDirtyBox,
                    t, h = this.renderer,
                    H = h.isHidden(),
                    p = [];
                this.setResponsive &&
                    this.setResponsive(!1);
                a.setAnimation(b, this);
                H && this.temporaryDisplay();
                this.layOutTitles();
                for (b = d.length; b--;)
                    if (t = d[b], t.options.stacking && (n = !0, t.isDirty)) { A = !0; break }
                if (A)
                    for (b = d.length; b--;) t = d[b], t.options.stacking && (t.isDirty = !0);
                d.forEach(function(a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), k = !0) : m && (m.labelFormatter || m.labelFormat) && (k = !0));
                    a.isDirtyData && c(a, "updatedData")
                });
                k && q && q.options.enabled && (q.render(), this.isDirtyLegend = !1);
                n && this.getStacks();
                l && f.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                l && (f.forEach(function(a) { a.isDirty && (z = !0) }), f.forEach(function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, p.push(function() {
                        c(a, "afterSetExtremes", e(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (z || n) && a.redraw()
                }));
                z && this.drawChartBox();
                c(this, "predraw");
                d.forEach(function(a) {
                    (z || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                g && g.reset(!0);
                h.draw();
                c(this, "redraw");
                c(this, "render");
                H && this.temporaryDisplay(!0);
                p.forEach(function(a) { a.call() })
            },
            get: function(a) {
                function b(b) { return b.id === a || b.options && b.options.id === a }
                var c, e = this.series,
                    f;
                c = g(this.axes, b) || g(this.series, b);
                for (f = 0; !c && f < e.length; f++) c = g(e[f].points || [], b);
                return c
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    e = b.xAxis = m(b.xAxis || {}),
                    b = b.yAxis = m(b.yAxis || {});
                c(this, "getAxes");
                e.forEach(function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                b.forEach(function(a, b) { a.index = b });
                e.concat(b).forEach(function(b) { new u(a, b) });
                c(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                this.series.forEach(function(b) { a = a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function(a) { return a.selected })) });
                return a
            },
            getSelectedSeries: function() { return this.series.filter(function(a) { return a.selected }) },
            setTitle: function(a, b, c) {
                var e = this,
                    f = e.options,
                    d = e.styledMode,
                    g;
                g = f.title = B(!d && { style: { color: "var(--blackColor)", fontSize: f.isStock ? "16px" : "18px" } }, f.title, a);
                f = f.subtitle = B(!d && { style: { color: "#666666" } }, f.subtitle, b);
                [
                    ["title", a, g],
                    ["subtitle", b, f]
                ].forEach(function(a, b) {
                    var c = a[0],
                        f = e[c],
                        g = a[1];
                    a = a[2];
                    f && g && (e[c] = f = f.destroy());
                    a && !f && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + c, zIndex: a.zIndex || 4 }).add(), e[c].update = function(a) { e.setTitle(!b && a, b && a) }, d || e[c].css(a.style))
                });
                e.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, f = this.renderer,
                    d = this.spacingBox;
                ["title", "subtitle"].forEach(function(a) {
                    var c = this[a],
                        g = this.options[a];
                    a = "title" === a ? -3 : g.verticalAlign ? 0 : b + 2;
                    var q;
                    c && (this.styledMode || (q = g.style.fontSize), q = f.fontMetrics(q,
                        c).b, c.css({ width: (g.width || d.width + g.widthAdjust) + "px" }).align(e({ y: a + q }, g), !1, "spacingBox"), g.floating || g.verticalAlign || (b = Math.ceil(b + c.getBBox(g.useHTML).height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && A(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    e = this.renderTo;
                l(c) || (this.containerWidth = a.getStyle(e, "width"));
                l(b) || (this.containerHeight =
                    a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (d.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        d.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, d.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = { display: c.style.display, height: c.style.height, overflow: c.style.overflow }, b = { display: "block", overflow: "hidden" }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === d.body) break
                    }
            },
            setClassName: function(a) { this.container.className = "highcharts-container " + (a || "") },
            getContainer: function() {
                var b, g = this.options,
                    q = g.chart,
                    m, A;
                b = this.renderTo;
                var l = a.uniqueKey(),
                    t, H;
                b || (this.renderTo = b = q.renderTo);
                n(b) && (this.renderTo = b = d.getElementById(b));
                b || a.error(13, !0, this);
                m = z(h(b, "data-highcharts-chart"));
                f(m) && p[m] && p[m].hasRendered && p[m].destroy();
                h(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                q.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                m = this.chartWidth;
                A = this.chartHeight;
                k(b, { overflow: "hidden" });
                this.styledMode || (t = e({
                    position: "relative",
                    overflow: "hidden",
                    width: m + "px",
                    height: A + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, q.style));
                this.container = b = v("div", { id: l }, t, b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[q.renderer] || a.Renderer)(b, m, A, null, q.forExport, g.exporting && g.exporting.allowHTML, this.styledMode);
                this.setClassName(q.className);
                if (this.styledMode)
                    for (H in g.defs) this.renderer.definition(g.defs[H]);
                else this.renderer.setStyle(q.style);
                this.renderer.chartIndex = this.index;
                c(this, "afterGetContainer")
            },
            getMargins: function(a) {
                var b = this.spacing,
                    e = this.margin,
                    f = this.titleOffset;
                this.resetMargins();
                f && !l(e[0]) && (this.plotTop = Math.max(this.plotTop, f + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(e, b);
                c(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && a.axes.forEach(function(a) { a.visible && a.getOffset() });
                x.forEach(function(e, f) { l(c[f]) || (a[e] += b[f]) });
                a.setChartSize()
            },
            reflow: function(b) {
                var c = this,
                    e = c.options.chart,
                    f = c.renderTo,
                    g = l(e.width) && l(e.height),
                    q = e.width || a.getStyle(f, "width"),
                    e = e.height || a.getStyle(f, "height"),
                    f = b ? b.target : M;
                if (!g && !c.isPrinting && q && e && (f === M || f === d)) {
                    if (q !== c.containerWidth || e !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = C(function() { c.container && c.setSize(void 0, void 0, !1) }, b ? 100 : 0);
                    c.containerWidth = q;
                    c.containerHeight = e
                }
            },
            setReflow: function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = D(M,
                    "resize",
                    function(a) { b.reflow(a) }), D(this, "destroy", this.unbindReflow))
            },
            setSize: function(b, e, f) {
                var d = this,
                    g = d.renderer,
                    q;
                d.isResizing += 1;
                a.setAnimation(f, d);
                d.oldChartHeight = d.chartHeight;
                d.oldChartWidth = d.chartWidth;
                void 0 !== b && (d.options.chart.width = b);
                void 0 !== e && (d.options.chart.height = e);
                d.getChartSize();
                d.styledMode || (q = g.globalAnimation, (q ? F : k)(d.container, { width: d.chartWidth + "px", height: d.chartHeight + "px" }, q));
                d.setChartSize(!0);
                g.setSize(d.chartWidth, d.chartHeight, f);
                d.axes.forEach(function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                d.isDirtyLegend = !0;
                d.isDirtyBox = !0;
                d.layOutTitles();
                d.getMargins();
                d.redraw(f);
                d.oldChartHeight = null;
                c(d, "resize");
                C(function() { d && c(d, "endResize", null, function() {--d.isResizing }) }, E(q).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    e = this.renderer,
                    f = this.chartWidth,
                    d = this.chartHeight,
                    g = this.options.chart,
                    q = this.spacing,
                    m = this.clipOffset,
                    k, n, A, l;
                this.plotLeft = k = Math.round(this.plotLeft);
                this.plotTop = n = Math.round(this.plotTop);
                this.plotWidth = A = Math.max(0, Math.round(f - k - this.marginRight));
                this.plotHeight = l = Math.max(0, Math.round(d - n - this.marginBottom));
                this.plotSizeX = b ? l : A;
                this.plotSizeY = b ? A : l;
                this.plotBorderWidth = g.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = { x: q[3], y: q[0], width: f - q[3] - q[1], height: d - q[0] - q[2] };
                this.plotBox = e.plotBox = { x: k, y: n, width: A, height: l };
                f = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(f, m[3]) / 2);
                e = Math.ceil(Math.max(f, m[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: e,
                    width: Math.floor(this.plotSizeX - Math.max(f, m[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY -
                        Math.max(f, m[2]) / 2 - e))
                };
                a || this.axes.forEach(function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                c(this, "afterSetChartSize", { skipAxes: a })
            },
            resetMargins: function() {
                c(this, "resetMargins");
                var a = this,
                    e = a.options.chart;
                ["margin", "spacing"].forEach(function(c) {
                    var f = e[c],
                        d = b(f) ? f : [f, f, f, f];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(b, f) { a[c][f] = A(e[c + b], d[f]) })
                });
                x.forEach(function(b, c) { a[b] = A(a.margin[c], a.spacing[c]) });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a =
                    this.options.chart,
                    b = this.renderer,
                    e = this.chartWidth,
                    f = this.chartHeight,
                    d = this.chartBackground,
                    g = this.plotBackground,
                    q = this.plotBorder,
                    m, k = this.styledMode,
                    n = this.plotBGImage,
                    A = a.backgroundColor,
                    l = a.plotBackgroundColor,
                    z = a.plotBackgroundImage,
                    t, h = this.plotLeft,
                    H = this.plotTop,
                    p = this.plotWidth,
                    x = this.plotHeight,
                    B = this.plotBox,
                    C = this.clipRect,
                    r = this.clipBox,
                    G = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), G = "attr");
                if (k) m = t = d.strokeWidth();
                else {
                    m = a.borderWidth ||
                        0;
                    t = m + (a.shadow ? 8 : 0);
                    A = { fill: A || "none" };
                    if (m || d["stroke-width"]) A.stroke = a.borderColor, A["stroke-width"] = m;
                    d.attr(A).shadow(a.shadow)
                }
                d[G]({ x: t / 2, y: t / 2, width: e - t - m % 2, height: f - t - m % 2, r: a.borderRadius });
                G = "animate";
                g || (G = "attr", this.plotBackground = g = b.rect().addClass("highcharts-plot-background").add());
                g[G](B);
                k || (g.attr({ fill: l || "none" }).shadow(a.plotShadow), z && (n ? n.animate(B) : this.plotBGImage = b.image(z, h, H, p, x).add()));
                C ? C.animate({ width: r.width, height: r.height }) : this.clipRect = b.clipRect(r);
                G = "animate";
                q || (G = "attr", this.plotBorder = q = b.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
                k || q.attr({ stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none" });
                q[G](q.crisp({ x: h, y: H, width: p, height: x }, -q.strokeWidth()));
                this.isDirtyBox = !1;
                c(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, e = a.options.series,
                    f, d;
                ["inverted", "angular", "polar"].forEach(function(g) {
                    c = H[b.type || b.defaultSeriesType];
                    d = b[g] || c && c.prototype[g];
                    for (f = e && e.length; !d &&
                        f--;)(c = H[e[f].type]) && c.prototype[g] && (d = !0);
                    a[g] = d
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                b.forEach(function(a) { a.linkedSeries.length = 0 });
                b.forEach(function(b) {
                    var c = b.options.linkedTo;
                    n(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = A(b.options.visible, c.options.visible, b.visible))
                });
                c(this, "afterLinkSeries")
            },
            renderSeries: function() {
                this.series.forEach(function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a =
                    this,
                    b = a.options.labels;
                b.items && b.items.forEach(function(c) {
                    var f = e(b.style, c.style),
                        d = z(f.left) + a.plotLeft,
                        g = z(f.top) + a.plotTop + 12;
                    delete f.left;
                    delete f.top;
                    a.renderer.text(c.html, d, g).attr({ zIndex: 2 }).css(f).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    e = 0,
                    f, d, g;
                this.setTitle();
                this.legend = new t(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                a.some(function(a) {
                    if (a.horiz && a.visible && a.options.labels.enabled &&
                        a.series.length) return e = 21, !0
                });
                f = this.plotHeight = Math.max(this.plotHeight - e, 0);
                a.forEach(function(a) { a.setScale() });
                this.getAxisMargins();
                d = 1.1 < c / this.plotWidth;
                g = 1.05 < f / this.plotHeight;
                if (d || g) a.forEach(function(a) {
                    (a.horiz && d || !a.horiz && g) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && a.forEach(function(a) { a.visible && a.render() });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({ zIndex: 3 }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = B(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() { a.href && (M.location.href = a.href) }).attr({ align: a.position.align, zIndex: 8 }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    e = b.axes,
                    f = b.series,
                    d = b.container,
                    g, q = d && d.parentNode;
                c(b, "destroy");
                b.renderer.forExport ? a.erase(p, b) : p[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                J(b);
                for (g = e.length; g--;) e[g] = e[g].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (g = f.length; g--;) f[g] = f[g].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a) {
                    var c =
                        b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                d && (d.innerHTML = "", J(d), q && w(d));
                G(b, function(a, c) { delete b[c] })
            },
            firstRender: function() {
                var b = this,
                    e = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (a.isArray(e.series) ? e.series : []).forEach(function(a) { b.initSeries(a) });
                    b.linkSeries();
                    c(b, "beforeRender");
                    q && (b.pointer = new q(b, e));
                    b.render();
                    if (!b.renderer.imgCount && b.onload) b.onload();
                    b.temporaryDisplay(!0)
                }
            },
            onload: function() {
                [this.callback].concat(this.callbacks).forEach(function(a) {
                    a &&
                        void 0 !== this.index && a.apply(this, [this])
                }, this);
                c(this, "load");
                c(this, "render");
                l(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    });
    K(I, "parts/Point.js", [I["parts/Globals.js"]], function(a) {
        var D, F = a.extend,
            E = a.erase,
            h = a.fireEvent,
            d = a.format,
            u = a.isArray,
            v = a.isNumber,
            r = a.pick,
            w = a.uniqueKey,
            p = a.defined,
            k = a.removeEvent;
        a.Point = D = function() {};
        a.Point.prototype = {
            init: function(a, e, d) {
                this.series = a;
                this.applyOptions(e, d);
                this.id = p(this.id) ? this.id : w();
                this.resolveColor();
                a.chart.pointCount++;
                h(this, "afterInit");
                return this
            },
            resolveColor: function() {
                var a = this.series,
                    e;
                e = a.chart.options.chart.colorCount;
                var d = a.chart.styledMode;
                d || this.options.color || (this.color = a.color);
                a.options.colorByPoint ? (d || (e = a.options.colors || a.chart.options.colors, this.color = this.color || e[a.colorCounter], e = e.length), d = a.colorCounter, a.colorCounter++, a.colorCounter === e && (a.colorCounter = 0)) : d = a.colorIndex;
                this.colorIndex = r(this.colorIndex, d)
            },
            applyOptions: function(a, e) {
                var d = this.series,
                    c = d.options.pointValKey ||
                    d.pointValKey;
                a = D.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                a.dataLabels && delete this.dataLabels;
                c && (this.y = this[c]);
                if (this.isNull = r(this.isValid && !this.isValid(), null === this.x || !v(this.y, !0))) this.formatPrefix = "null";
                this.selected && (this.state = "select");
                "name" in this && void 0 === e && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d && (this.x = void 0 === e ? d.autoIncrement(this) : e);
                return this
            },
            setNestedProperty: function(d,
                e, g) { g.split(".").reduce(function(c, f, b, d) { c[f] = d.length - 1 === b ? e : a.isObject(c[f], !0) ? c[f] : {}; return c[f] }, d); return d },
            optionsToObject: function(d) {
                var e = {},
                    g = this.series,
                    c = g.options.keys,
                    f = c || g.pointArrayMap || ["y"],
                    b = f.length,
                    k = 0,
                    t = 0;
                if (v(d) || null === d) e[f[0]] = d;
                else if (u(d))
                    for (!c && d.length > b && (g = typeof d[0], "string" === g ? e.name = d[0] : "number" === g && (e.x = d[0]), k++); t < b;) c && void 0 === d[k] || (0 < f[t].indexOf(".") ? a.Point.prototype.setNestedProperty(e, d[k], f[t]) : e[f[t]] = d[k]), k++, t++;
                else "object" === typeof d &&
                    (e = d, d.dataLabels && (g._hasPointLabels = !0), d.marker && (g._hasPointMarkers = !0));
                return e
            },
            getClassName: function() { return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "") },
            getZone: function() {
                var a =
                    this.series,
                    e = a.zones,
                    a = a.zoneAxis || "y",
                    d = 0,
                    c;
                for (c = e[d]; this[a] >= c.value;) c = e[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = c && c.color && !this.options.color ? c.color : this.nonZonedColor;
                return c
            },
            destroy: function() {
                var a = this.series.chart,
                    e = a.hoverPoints,
                    d;
                a.pointCount--;
                e && (this.setState(), E(e, this), e.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel || this.dataLabels) k(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (d in this) this[d] = null
            },
            destroyElements: function(a) {
                var e = this,
                    d = [],
                    c, f;
                a = a || { graphic: 1, dataLabel: 1 };
                a.graphic && d.push("graphic", "shadowGroup");
                a.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector");
                for (f = d.length; f--;) c = d[f], e[c] && (e[c] = e[c].destroy());
                ["dataLabel", "connector"].forEach(function(b) {
                    var c = b + "s";
                    a[b] && e[c] && (e[c].forEach(function(a) { a.element && a.destroy() }), delete e[c])
                })
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var e = this.series,
                    g = e.tooltipOptions,
                    c = r(g.valueDecimals, ""),
                    f = g.valuePrefix || "",
                    b = g.valueSuffix || "";
                e.chart.styledMode && (a = e.chart.tooltip.styledModeFormat(a));
                (e.pointArrayMap || ["y"]).forEach(function(e) {
                    e = "{point." + e;
                    if (f || b) a = a.replace(RegExp(e + "}", "g"), f + e + "}" + b);
                    a = a.replace(RegExp(e + "}", "g"), e + ":,." + c + "f}")
                });
                return d(a, { point: this, series: this.series },
                    e.chart.time)
            },
            firePointEvent: function(a, e, d) {
                var c = this,
                    f = this.series.options;
                (f.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && f.allowPointSelect && (d = function(a) { c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey) });
                h(this, a, e, d)
            },
            visible: !0
        }
    });
    K(I, "parts/Series.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.animObject,
            E = a.arrayMax,
            h = a.arrayMin,
            d = a.correctFloat,
            u = a.defaultOptions,
            v = a.defaultPlotOptions,
            r = a.defined,
            w = a.erase,
            p = a.extend,
            k = a.fireEvent,
            l = a.isArray,
            e = a.isNumber,
            g = a.isString,
            c = a.merge,
            f = a.objectEach,
            b = a.pick,
            n = a.removeEvent,
            t = a.splat,
            x = a.SVGElement,
            B = a.syncTimeout,
            G = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: { duration: 1E3 },
            events: {},
            marker: { lineWidth: 0, lineColor: "var(--blackColor)", enabledThreshold: 2, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } },
            point: { events: {} },
            dataLabels: { align: "center", formatter: function() { return null === this.y ? "" : a.numberFormat(this.y, -1) }, padding: 5, style: { fontSize: "11px", fontWeight: "500", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 50 }, opacity: .2 } },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            cropShoulder: 1,
            init: function(a, c) {
                k(this, "init", { options: c });
                var e = this,
                    d, g = a.series,
                    q;
                e.chart = a;
                e.options = c = e.setOptions(c);
                e.linkedSeries = [];
                e.bindAxes();
                p(e, { name: c.name, state: "", visible: !1 !== c.visible, selected: !0 === c.selected });
                d = c.events;
                f(d, function(a, b) {
                    e.hcEvents && e.hcEvents[b] && -1 !== e.hcEvents[b].indexOf(a) ||
                        D(e, b, a)
                });
                if (d && d.click || c.point && c.point.events && c.point.events.click || c.allowPointSelect) a.runTrackerClick = !0;
                e.getColor();
                e.getSymbol();
                e.parallelArrays.forEach(function(a) { e[a + "Data"] || (e[a + "Data"] = []) });
                e.points || e.setData(c.data, !1);
                e.isCartesian && (a.hasCartesianSeries = !0);
                g.length && (q = g[g.length - 1]);
                e._i = b(q && q._i, -1) + 1;
                a.orderSeries(this.insert(g));
                k(this, "afterInit")
            },
            insert: function(a) {
                var c = this.options.index,
                    f;
                if (e(c)) {
                    for (f = a.length; f--;)
                        if (c >= b(a[f].options.index, a[f]._i)) {
                            a.splice(f +
                                1, 0, this);
                            break
                        } - 1 === f && a.unshift(this);
                    f += 1
                } else a.push(this);
                return b(f, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    e = b.chart,
                    f;
                k(this, "bindAxes", null, function() {
                    (b.axisTypes || []).forEach(function(d) {
                        e[d].forEach(function(a) { f = a.options; if (c[d] === f.index || void 0 !== c[d] && c[d] === f.id || void 0 === c[d] && 0 === f.index) b.insert(a.series), b[d] = a, a.isDirty = !0 });
                        b[d] || b.optionalAxis === d || a.error(18, !0, e)
                    })
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    f = arguments,
                    d = e(b) ? function(e) {
                        var f =
                            "y" === e && c.toYData ? c.toYData(a) : a[e];
                        c[e + "Data"][b] = f
                    } : function(a) { Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(f, 2)) };
                c.parallelArrays.forEach(d)
            },
            hasData: function() { return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && 0 < this.yData.length },
            autoIncrement: function() {
                var a = this.options,
                    c = this.xIncrement,
                    e, f = a.pointIntervalUnit,
                    d = this.chart.time,
                    c = b(c, a.pointStart, 0);
                this.pointInterval = e = b(this.pointInterval, a.pointInterval, 1);
                f && (a = new d.Date(c),
                    "day" === f ? d.set("Date", a, d.get("Date", a) + e) : "month" === f ? d.set("Month", a, d.get("Month", a) + e) : "year" === f && d.set("FullYear", a, d.get("FullYear", a) + e), e = a.getTime() - c);
                this.xIncrement = c + e;
                return c
            },
            setOptions: function(a) {
                var e = this.chart,
                    f = e.options,
                    d = f.plotOptions,
                    g = (e.userOptions || {}).plotOptions || {},
                    q = d[this.type],
                    n = c(a);
                a = e.styledMode;
                k(this, "setOptions", { userOptions: n });
                this.userOptions = n;
                e = c(q, d.series, n);
                this.tooltipOptions = c(u.tooltip, u.plotOptions.series && u.plotOptions.series.tooltip, u.plotOptions[this.type].tooltip,
                    f.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, n.tooltip);
                this.stickyTracking = b(n.stickyTracking, g[this.type] && g[this.type].stickyTracking, g.series && g.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : e.stickyTracking);
                null === q.marker && delete e.marker;
                this.zoneAxis = e.zoneAxis;
                f = this.zones = (e.zones || []).slice();
                !e.negativeColor && !e.negativeFillColor || e.zones || (d = { value: e[this.zoneAxis + "Threshold"] || e.threshold || 0, className: "highcharts-negative" }, a || (d.color =
                    e.negativeColor, d.fillColor = e.negativeFillColor), f.push(d));
                f.length && r(f[f.length - 1].value) && f.push(a ? {} : { color: this.color, fillColor: this.fillColor });
                k(this, "afterSetOptions", { options: e });
                return e
            },
            getName: function() { return b(this.options.name, "Series " + (this.index + 1)) },
            getCyclic: function(a, c, e) {
                var f, d = this.chart,
                    g = this.userOptions,
                    q = a + "Index",
                    k = a + "Counter",
                    n = e ? e.length : b(d.options.chart[a + "Count"], d[a + "Count"]);
                c || (f = b(g[q], g["_" + q]), r(f) || (d.series.length || (d[k] = 0), g["_" + q] = f = d[k] % n, d[k] += 1),
                    e && (c = e[f]));
                void 0 !== f && (this[q] = f);
                this[a] = c
            },
            getColor: function() { this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || v[this.type].color, this.chart.options.colors) },
            getSymbol: function() { this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols) },
            findPointIndex: function(a, b) {
                var c = a.id;
                a = a.x;
                var f = this.points,
                    d, g;
                c && (g = (c = this.chart.get(c)) && c.index, void 0 !== g && (d = !0));
                void 0 === g && e(a) && (g =
                    this.xData.indexOf(a, b)); - 1 !== g && void 0 !== g && this.cropped && (g = g >= this.cropStart ? g - this.cropStart : g);
                !d && f[g] && f[g].touched && (g = void 0);
                return g
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function(b) {
                var c = this.options,
                    f = this.points,
                    d = [],
                    g, q, k, n = this.requireSorting,
                    t = b.length === f.length,
                    h = !0;
                this.xIncrement = null;
                b.forEach(function(b, q) {
                    var m, A = a.defined(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b) || {};
                    m = A.x;
                    if (A.id || e(m))
                        if (m = this.findPointIndex(A, k), -1 ===
                            m || void 0 === m ? d.push(b) : f[m] && b !== c.data[m] ? (f[m].update(b, !1, null, !1), f[m].touched = !0, n && (k = m + 1)) : f[m] && (f[m].touched = !0), !t || q !== m || this.hasDerivedData) g = !0
                }, this);
                if (g)
                    for (b = f.length; b--;)(q = f[b]) && !q.touched && q.remove(!1);
                else t ? b.forEach(function(a, b) { f[b].update && a !== f[b].y && f[b].update(a, !1, null, !1) }) : h = !1;
                f.forEach(function(a) { a && (a.touched = !1) });
                if (!h) return !1;
                d.forEach(function(a) { this.addPoint(a, !1, null, null, !1) }, this);
                return !0
            },
            setData: function(c, f, d, k) {
                var q = this,
                    m = q.points,
                    n = m && m.length ||
                    0,
                    t, A = q.options,
                    h = q.chart,
                    z = null,
                    p = q.xAxis,
                    x = A.turboThreshold,
                    B = this.xData,
                    G = this.yData,
                    r = (t = q.pointArrayMap) && t.length,
                    w = A.keys,
                    J = 0,
                    u = 1,
                    v;
                c = c || [];
                t = c.length;
                f = b(f, !0);
                !1 !== k && t && n && !q.cropped && !q.hasGroupedData && q.visible && !q.isSeriesBoosting && (v = this.updateData(c));
                if (!v) {
                    q.xIncrement = null;
                    q.colorCounter = 0;
                    this.parallelArrays.forEach(function(a) { q[a + "Data"].length = 0 });
                    if (x && t > x) {
                        for (d = 0; null === z && d < t;) z = c[d], d++;
                        if (e(z))
                            for (d = 0; d < t; d++) B[d] = this.autoIncrement(), G[d] = c[d];
                        else if (l(z))
                            if (r)
                                for (d =
                                    0; d < t; d++) z = c[d], B[d] = z[0], G[d] = z.slice(1, r + 1);
                            else
                                for (w && (J = w.indexOf("x"), u = w.indexOf("y"), J = 0 <= J ? J : 0, u = 0 <= u ? u : 1), d = 0; d < t; d++) z = c[d], B[d] = z[J], G[d] = z[u];
                        else a.error(12, !1, h)
                    } else
                        for (d = 0; d < t; d++) void 0 !== c[d] && (z = { series: q }, q.pointClass.prototype.applyOptions.apply(z, [c[d]]), q.updateParallelArrays(z, d));
                    G && g(G[0]) && a.error(14, !0, h);
                    q.data = [];
                    q.options.data = q.userOptions.data = c;
                    for (d = n; d--;) m[d] && m[d].destroy && m[d].destroy();
                    p && (p.minRange = p.userMinRange);
                    q.isDirty = h.isDirtyBox = !0;
                    q.isDirtyData = !!m;
                    d = !1
                }
                "point" === A.legendType && (this.processData(), this.generatePoints());
                f && h.redraw(d)
            },
            processData: function(b) {
                var c = this.xData,
                    e = this.yData,
                    f = c.length,
                    d;
                d = 0;
                var g, q, k = this.xAxis,
                    n, t = this.options;
                n = t.cropThreshold;
                var h = this.getExtremesFromAll || t.getExtremesFromAll,
                    l = this.isCartesian,
                    t = k && k.val2lin,
                    p = k && k.isLog,
                    x = this.requireSorting,
                    B, G;
                if (l && !this.isDirty && !k.isDirty && !this.yAxis.isDirty && !b) return !1;
                k && (b = k.getExtremes(), B = b.min, G = b.max);
                l && this.sorted && !h && (!n || f > n || this.forceCrop) && (c[f -
                    1] < B || c[0] > G ? (c = [], e = []) : this.yData && (c[0] < B || c[f - 1] > G) && (d = this.cropData(this.xData, this.yData, B, G), c = d.xData, e = d.yData, d = d.start, g = !0));
                for (n = c.length || 1; --n;) f = p ? t(c[n]) - t(c[n - 1]) : c[n] - c[n - 1], 0 < f && (void 0 === q || f < q) ? q = f : 0 > f && x && (a.error(15, !1, this.chart), x = !1);
                this.cropped = g;
                this.cropStart = d;
                this.processedXData = c;
                this.processedYData = e;
                this.closestPointRange = q
            },
            cropData: function(a, c, e, f, d) {
                var g = a.length,
                    q = 0,
                    k = g,
                    n;
                d = b(d, this.cropShoulder);
                for (n = 0; n < g; n++)
                    if (a[n] >= e) { q = Math.max(0, n - d); break }
                for (e =
                    n; e < g; e++)
                    if (a[e] > f) { k = e + d; break }
                return { xData: a.slice(q, k), yData: c.slice(q, k), start: q, end: k }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    e, f = this.processedXData,
                    d = this.processedYData,
                    g = this.pointClass,
                    n = f.length,
                    h = this.cropStart || 0,
                    l, x = this.hasGroupedData,
                    a = a.keys,
                    B, G = [],
                    r;
                c || x || (c = [], c.length = b.length, c = this.data = c);
                a && x && (this.options.keys = !1);
                for (r = 0; r < n; r++) l = h + r, x ? (B = (new g).init(this, [f[r]].concat(t(d[r]))), B.dataGroup = this.groupMap[r], B.dataGroup.options && (B.options =
                    B.dataGroup.options, p(B, B.dataGroup.options), delete B.dataLabels)) : (B = c[l]) || void 0 === b[l] || (c[l] = B = (new g).init(this, b[l], f[r])), B && (B.index = l, G[r] = B);
                this.options.keys = a;
                if (c && (n !== (e = c.length) || x))
                    for (r = 0; r < e; r++) r !== h || x || (r += n), c[r] && (c[r].destroyElements(), c[r].plotX = void 0);
                this.data = c;
                this.points = G;
                k(this, "afterGeneratePoints")
            },
            getXExtremes: function(a) { return { min: h(a), max: E(a) } },
            getExtremes: function(a) {
                var b = this.yAxis,
                    c = this.processedXData,
                    f, d = [],
                    g = 0;
                f = this.xAxis.getExtremes();
                var q = f.min,
                    n = f.max,
                    t, p, B = this.requireSorting ? this.cropShoulder : 0,
                    x, r;
                a = a || this.stackedYData || this.processedYData || [];
                f = a.length;
                for (r = 0; r < f; r++)
                    if (p = c[r], x = a[r], t = (e(x, !0) || l(x)) && (!b.positiveValuesOnly || x.length || 0 < x), p = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[r + B] || p) >= q && (c[r - B] || p) <= n, t && p)
                        if (t = x.length)
                            for (; t--;) "number" === typeof x[t] && (d[g++] = x[t]);
                        else d[g++] = x;
                this.dataMin = h(d);
                this.dataMax = E(d);
                k(this, "afterGetExtremes")
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    c = a.stacking,
                    f = this.xAxis,
                    g = f.categories,
                    n = this.yAxis,
                    m = this.points,
                    t = m.length,
                    h = !!this.modifyValue,
                    p, x = this.pointPlacementToXValue(),
                    B = e(x),
                    G = a.threshold,
                    w = a.startFromThreshold ? G : 0,
                    u, v, E, D, F = this.zoneAxis || "y",
                    I = Number.MAX_VALUE;
                for (p = 0; p < t; p++) {
                    var N = m[p],
                        K = N.x;
                    v = N.y;
                    var W = N.low,
                        O = c && n.stacks[(this.negStacks && v < (w ? 0 : G) ? "-" : "") + this.stackKey],
                        X, Z;
                    n.positiveValuesOnly && null !== v && 0 >= v && (N.isNull = !0);
                    N.plotX = u = d(Math.min(Math.max(-1E5, f.translate(K, 0, 0, 0, 1, x,
                        "flags" === this.type)), 1E5));
                    c && this.visible && !N.isNull && O && O[K] && (D = this.getStackIndicator(D, K, this.index), X = O[K], Z = X.points[D.key]);
                    l(Z) && (W = Z[0], v = Z[1], W === w && D.key === O[K].base && (W = b(e(G) && G, n.min)), n.positiveValuesOnly && 0 >= W && (W = null), N.total = N.stackTotal = X.total, N.percentage = X.total && N.y / X.total * 100, N.stackY = v, X.setOffset(this.pointXOffset || 0, this.barW || 0));
                    N.yBottom = r(W) ? Math.min(Math.max(-1E5, n.translate(W, 0, 1, 0, 1)), 1E5) : null;
                    h && (v = this.modifyValue(v, N));
                    N.plotY = v = "number" === typeof v && Infinity !==
                        v ? Math.min(Math.max(-1E5, n.translate(v, 0, 1, 0, 1)), 1E5) : void 0;
                    N.isInside = void 0 !== v && 0 <= v && v <= n.len && 0 <= u && u <= f.len;
                    N.clientX = B ? d(f.translate(K, 0, 0, 0, 1, x)) : u;
                    N.negative = N[F] < (a[F + "Threshold"] || G || 0);
                    N.category = g && void 0 !== g[N.x] ? g[N.x] : N.x;
                    N.isNull || (void 0 !== E && (I = Math.min(I, Math.abs(u - E))), E = u);
                    N.zone = this.zones.length && N.getZone()
                }
                this.closestPointRangePx = I;
                k(this, "afterTranslate")
            },
            getValidPoints: function(a, b, c) {
                var e = this.chart;
                return (a || this.points || []).filter(function(a) {
                    return b && !e.isInsidePlot(a.plotX,
                        a.plotY, e.inverted) ? !1 : c || !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    e = b.renderer,
                    f = b.inverted,
                    d = this.clipBox,
                    g = d || b.clipBox,
                    q = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
                    k = b[q],
                    n = b[q + "m"];
                k || (a && (g.width = 0, f && (g.x = b.plotSizeX), b[q + "m"] = n = e.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[q] = k = e.clipRect(g), k.count = { length: 0 });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length +=
                    1);
                !1 !== c.clip && (this.group.clip(a || d ? k : b.clipRect), this.markerGroup.clip(n), this.sharedClipKey = q);
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && q && b[q] && (d || (b[q] = b[q].destroy()), b[q + "m"] && (b[q + "m"] = b[q + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = F(this.options.animation),
                    e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({ width: b.plotSizeX, x: 0 }, c), b[e + "m"] && b[e + "m"].animate({ width: b.plotSizeX + 99, x: b.inverted ? 0 : -99 }, c), this.animate =
                    null)
            },
            afterAnimate: function() {
                this.setClip();
                k(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    c = this.chart,
                    e, f, d, g, k, n = this.options.marker,
                    t, h, l, p = this[this.specialGroup] || this.markerGroup;
                e = this.xAxis;
                var x, B = b(n.enabled, !e || e.isRadial ? !0 : null, this.closestPointRangePx >= n.enabledThreshold * n.radius);
                if (!1 !== n.enabled || this._hasPointMarkers)
                    for (e = 0; e < a.length; e++)
                        if (f = a[e], k = (g = f.graphic) ? "animate" : "attr", t = f.marker || {}, h = !!f.marker, d = B && void 0 === t.enabled ||
                            t.enabled, l = !1 !== f.isInside, d && !f.isNull) {
                            d = b(t.symbol, this.symbol);
                            x = this.markerAttribs(f, f.selected && "select");
                            g ? g[l ? "show" : "hide"](!0).animate(x) : l && (0 < x.width || f.hasImage) && (f.graphic = g = c.renderer.symbol(d, x.x, x.y, x.width, x.height, h ? t : n).add(p));
                            if (g && !c.styledMode) g[k](this.pointAttribs(f, f.selected && "select"));
                            g && g.addClass(f.getClassName(), !0)
                        } else g && (f.graphic = g.destroy())
            },
            markerAttribs: function(a, c) {
                var e = this.options.marker,
                    f = a.marker || {},
                    d = f.symbol || e.symbol,
                    g = b(f.radius, e.radius);
                c &&
                    (e = e.states[c], c = f.states && f.states[c], g = b(c && c.radius, e && e.radius, g + (e && e.radiusPlus || 0)));
                a.hasImage = d && 0 === d.indexOf("url");
                a.hasImage && (g = 0);
                a = { x: Math.floor(a.plotX) - g, y: a.plotY - g };
                g && (a.width = a.height = 2 * g);
                return a
            },
            pointAttribs: function(a, c) {
                var e = this.options.marker,
                    f = a && a.options,
                    d = f && f.marker || {},
                    g = this.color,
                    q = f && f.color,
                    k = a && a.color,
                    f = b(d.lineWidth, e.lineWidth),
                    n = a && a.zone && a.zone.color;
                a = 1;
                g = q || n || k || g;
                q = d.fillColor || e.fillColor || g;
                g = d.lineColor || e.lineColor || g;
                c && (e = e.states[c], c = d.states &&
                    d.states[c] || {}, f = b(c.lineWidth, e.lineWidth, f + b(c.lineWidthPlus, e.lineWidthPlus, 0)), q = c.fillColor || e.fillColor || q, g = c.lineColor || e.lineColor || g, a = b(c.opacity, e.opacity, a));
                return { stroke: g, "stroke-width": f, fill: q, opacity: a }
            },
            destroy: function(b) {
                var c = this,
                    e = c.chart,
                    d = /AppleWebKit\/533/.test(G.navigator.userAgent),
                    g, q, t = c.data || [],
                    h, l;
                k(c, "destroy");
                b || n(c);
                (c.axisTypes || []).forEach(function(a) {
                    (l = c[a]) && l.series && (w(l.series, c), l.isDirty = l.forceRedraw = !0)
                });
                c.legendItem && c.chart.legend.destroyItem(c);
                for (q = t.length; q--;)(h = t[q]) && h.destroy && h.destroy();
                c.points = null;
                a.clearTimeout(c.animationTimeout);
                f(c, function(a, b) { a instanceof x && !a.survive && (g = d && "group" === b ? "hide" : "destroy", a[g]()) });
                e.hoverSeries === c && (e.hoverSeries = null);
                w(e.series, c);
                e.orderSeries();
                f(c, function(a, e) { b && "hcEvents" === e || delete c[e] })
            },
            getGraphPath: function(a, b, c) {
                var e = this,
                    f = e.options,
                    d = f.step,
                    g, q = [],
                    k = [],
                    n;
                a = a || e.points;
                (g = a.reversed) && a.reverse();
                (d = { right: 1, center: 2 }[d] || d && 3) && g && (d = 4 - d);
                !f.connectNulls || b || c || (a =
                    this.getValidPoints(a));
                a.forEach(function(g, m) {
                    var t = g.plotX,
                        h = g.plotY,
                        l = a[m - 1];
                    (g.leftCliff || l && l.rightCliff) && !c && (n = !0);
                    g.isNull && !r(b) && 0 < m ? n = !f.connectNulls : g.isNull && !b ? n = !0 : (0 === m || n ? m = ["M", g.plotX, g.plotY] : e.getPointSpline ? m = e.getPointSpline(a, g, m) : d ? (m = 1 === d ? ["L", l.plotX, h] : 2 === d ? ["L", (l.plotX + t) / 2, l.plotY, "L", (l.plotX + t) / 2, h] : ["L", t, l.plotY], m.push("L", t, h)) : m = ["L", t, h], k.push(g.x), d && (k.push(g.x), 2 === d && k.push(g.x)), q.push.apply(q, m), n = !1)
                });
                q.xMap = k;
                return e.graphPath = q
            },
            drawGraph: function() {
                var a =
                    this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = this.chart.styledMode,
                    f = [
                        ["graph", "highcharts-graph"]
                    ];
                e || f[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle);
                f = a.getZonesGraphs(f);
                f.forEach(function(f, d) {
                    var g = f[0],
                        q = a[g],
                        k = q ? "animate" : "attr";
                    q ? (q.endX = a.preventGraphAnimation ? null : c.xMap, q.animate({ d: c })) : c.length && (a[g] = q = a.chart.renderer.path(c).addClass(f[1]).attr({ zIndex: 1 }).add(a.group));
                    q && !e && (g = {
                        stroke: f[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color ||
                            "none"
                    }, f[3] ? g.dashstyle = f[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), q[k](g).shadow(2 > d && b.shadow));
                    q && (q.startX = c.xMap, q.isArea = c.isArea)
                })
            },
            getZonesGraphs: function(a) {
                this.zones.forEach(function(b, c) {
                    c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || "")];
                    this.chart.styledMode || c.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                    a.push(c)
                }, this);
                return a
            },
            applyZones: function() {
                var a = this,
                    c = this.chart,
                    e = c.renderer,
                    f = this.zones,
                    d, g, k = this.clips || [],
                    n, t = this.graph,
                    l = this.area,
                    h = Math.max(c.chartWidth, c.chartHeight),
                    p = this[(this.zoneAxis || "y") + "Axis"],
                    x, B, r = c.inverted,
                    G, w, u, v, E = !1;
                f.length && (t || l) && p && void 0 !== p.min && (B = p.reversed, G = p.horiz, t && !this.showLine && t.hide(), l && l.hide(), x = p.getExtremes(), f.forEach(function(f, q) {
                    d = B ? G ? c.plotWidth : 0 : G ? 0 : p.toPixels(x.min) || 0;
                    d = Math.min(Math.max(b(g, d), 0), h);
                    g = Math.min(Math.max(Math.round(p.toPixels(b(f.value, x.max), !0) || 0), 0), h);
                    E && (d = g = p.toPixels(x.max));
                    w = Math.abs(d - g);
                    u = Math.min(d,
                        g);
                    v = Math.max(d, g);
                    p.isXAxis ? (n = { x: r ? v : u, y: 0, width: w, height: h }, G || (n.x = c.plotHeight - n.x)) : (n = { x: 0, y: r ? v : u, width: h, height: w }, G && (n.y = c.plotWidth - n.y));
                    r && e.isVML && (n = p.isXAxis ? { x: 0, y: B ? u : v, height: n.width, width: c.chartWidth } : { x: n.y - c.plotLeft - c.spacingBox.x, y: 0, width: n.height, height: c.chartHeight });
                    k[q] ? k[q].animate(n) : (k[q] = e.clipRect(n), t && a["zone-graph-" + q].clip(k[q]), l && a["zone-area-" + q].clip(k[q]));
                    E = f.value > x.max;
                    a.resetZones && 0 === g && (g = void 0)
                }), this.clips = k)
            },
            invertGroups: function(a) {
                function b() {
                    ["group",
                        "markerGroup"
                    ].forEach(function(b) { c[b] && (e.renderer.isVML && c[b].attr({ width: c.yAxis.len, height: c.xAxis.len }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a)) })
                }
                var c = this,
                    e = c.chart,
                    f;
                c.xAxis && (f = D(e, "resize", b), D(c, "destroy", f), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, e, f) {
                var d = this[a],
                    g = !d;
                g && (this[a] = d = this.chart.renderer.g().attr({ zIndex: e || .1 }).add(f));
                d.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (r(this.colorIndex) ? "highcharts-color-" +
                    this.colorIndex + " " : "") + (this.options.className || "") + (d.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                d.attr({ visibility: c })[g ? "attr" : "animate"](this.getPlotBox());
                return d
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return { translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1 }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, e = a.options,
                    f = !!a.animate && b.renderer.isSVG && F(e.animation).duration,
                    d = a.visible ? "inherit" :
                    "hidden",
                    g = e.zIndex,
                    n = a.hasRendered,
                    t = b.seriesGroup,
                    l = b.inverted;
                k(this, "render");
                c = a.plotGroup("group", "series", d, g, t);
                a.markerGroup = a.plotGroup("markerGroup", "markers", d, g, t);
                f && a.animate(!0);
                c.inverted = a.isCartesian || a.invertable ? l : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(l);
                !1 === e.clip || a.sharedClipKey || n || c.clip(b.clipRect);
                f && a.animate();
                n || (a.animationTimeout = B(function() { a.afterAnimate() }, f));
                a.isDirty = !1;
                a.hasRendered = !0;
                k(a, "afterRender")
            },
            redraw: function() {
                var a = this.chart,
                    c = this.isDirty || this.isDirtyData,
                    e = this.group,
                    f = this.xAxis,
                    d = this.yAxis;
                e && (a.inverted && e.attr({ width: a.plotWidth, height: a.plotHeight }), e.animate({ translateX: b(f && f.left, a.plotLeft), translateY: b(d && d.top, a.plotTop) }));
                this.translate();
                this.render();
                c && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    e = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({ clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos, plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos }, b, a)
            },
            buildKDTree: function(a) {
                function b(a, e, f) { var d, g; if (g = a && a.length) return d = c.kdAxisArray[e % f], a.sort(function(a, b) { return a[d] - b[d] }), g = Math.floor(g / 2), { point: a[g], left: b(a.slice(0, g), e + 1, f), right: b(a.slice(g + 1), e + 1, f) } }
                this.buildingKdTree = !0;
                var c = this,
                    e = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete c.kdTree;
                B(function() {
                    c.kdTree =
                        b(c.getValidPoints(null, !c.directTouch), e, e);
                    c.buildingKdTree = !1
                }, c.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
            },
            searchKDTree: function(a, b, c) {
                function e(a, b, c, n) {
                    var q = b.point,
                        m = f.kdAxisArray[c % n],
                        t, l, h = q;
                    l = r(a[d]) && r(q[d]) ? Math.pow(a[d] - q[d], 2) : null;
                    t = r(a[g]) && r(q[g]) ? Math.pow(a[g] - q[g], 2) : null;
                    t = (l || 0) + (t || 0);
                    q.dist = r(t) ? Math.sqrt(t) : Number.MAX_VALUE;
                    q.distX = r(l) ? Math.sqrt(l) : Number.MAX_VALUE;
                    m = a[m] - q[m];
                    t = 0 > m ? "left" : "right";
                    l = 0 > m ? "right" : "left";
                    b[t] && (t = e(a, b[t], c + 1, n), h = t[k] < h[k] ? t : q);
                    b[l] &&
                        Math.sqrt(m * m) < h[k] && (a = e(a, b[l], c + 1, n), h = a[k] < h[k] ? a : h);
                    return h
                }
                var f = this,
                    d = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    k = b ? "distX" : "dist";
                b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(c);
                if (this.kdTree) return e(a, this.kdTree, b, b)
            },
            pointPlacementToXValue: function() {
                var a = this.options.pointPlacement;
                "between" === a && (a = .5);
                e(a) && (a *= b(this.options.pointRange || this.xAxis.pointRange));
                return a
            }
        })
    });
    K(I, "parts/Dynamics.js", [I["parts/Globals.js"]],
        function(a) {
            var D = a.addEvent,
                F = a.animate,
                E = a.Axis,
                h = a.Chart,
                d = a.createElement,
                u = a.css,
                v = a.defined,
                r = a.erase,
                w = a.extend,
                p = a.fireEvent,
                k = a.isNumber,
                l = a.isObject,
                e = a.isArray,
                g = a.merge,
                c = a.objectEach,
                f = a.pick,
                b = a.Point,
                n = a.Series,
                t = a.seriesTypes,
                x = a.setAnimation,
                B = a.splat;
            a.cleanRecursively = function(b, e) {
                var f = {};
                c(b, function(c, d) {
                    if (l(b[d], !0) && e[d]) c = a.cleanRecursively(b[d], e[d]), Object.keys(c).length && (f[d] = c);
                    else if (l(b[d]) || b[d] !== e[d]) f[d] = b[d]
                });
                return f
            };
            w(h.prototype, {
                addSeries: function(a, b,
                    c) {
                    var e, d = this;
                    a && (b = f(b, !0), p(d, "addSeries", { options: a }, function() {
                        e = d.initSeries(a);
                        d.isDirtyLegend = !0;
                        d.linkSeries();
                        p(d, "afterAddSeries", { series: e });
                        b && d.redraw(c)
                    }));
                    return e
                },
                addAxis: function(a, b, c, e) {
                    var d = b ? "xAxis" : "yAxis",
                        k = this.options;
                    a = g(a, { index: this[d].length, isX: b });
                    b = new E(this, a);
                    k[d] = B(k[d] || {});
                    k[d].push(a);
                    f(c, !0) && this.redraw(e);
                    return b
                },
                showLoading: function(a) {
                    var b = this,
                        c = b.options,
                        e = b.loadingDiv,
                        f = c.loading,
                        g = function() {
                            e && u(e, {
                                left: b.plotLeft + "px",
                                top: b.plotTop + "px",
                                width: b.plotWidth +
                                    "px",
                                height: b.plotHeight + "px"
                            })
                        };
                    e || (b.loadingDiv = e = d("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = d("span", { className: "highcharts-loading-inner" }, null, e), D(b, "redraw", g));
                    e.className = "highcharts-loading";
                    b.loadingSpan.innerHTML = a || c.lang.loading;
                    b.styledMode || (u(e, w(f.style, { zIndex: 10 })), u(b.loadingSpan, f.labelStyle), b.loadingShown || (u(e, { opacity: 0, display: "" }), F(e, { opacity: f.style.opacity || .5 }, { duration: f.showDuration || 0 })));
                    b.loadingShown = !0;
                    g()
                },
                hideLoading: function() {
                    var a = this.options,
                        b = this.loadingDiv;
                    b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || F(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function() { u(b, { display: "none" }) } }));
                    this.loadingShown = !1
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
                collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "),
                update: function(b, e, d, n) {
                    var t = this,
                        q = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle" },
                        m, l, h, x = [];
                    p(t, "update", { options: b });
                    b.isResponsiveOptions || t.setResponsive(!1, !0);
                    b = a.cleanRecursively(b, t.options);
                    if (m = b.chart) {
                        g(!0, t.options.chart, m);
                        "className" in m && t.setClassName(m.className);
                        "reflow" in m && t.setReflow(m.reflow);
                        if ("inverted" in m || "polar" in m || "type" in m) t.propFromSeries(), l = !0;
                        "alignTicks" in m && (l = !0);
                        c(m, function(a, b) {-1 !== t.propsRequireUpdateSeries.indexOf("chart." + b) && (h = !0); - 1 !== t.propsRequireDirtyBox.indexOf(b) && (t.isDirtyBox = !0) });
                        !t.styledMode && "style" in m && t.renderer.setStyle(m.style)
                    }!t.styledMode && b.colors && (this.options.colors = b.colors);
                    b.plotOptions && g(!0, this.options.plotOptions, b.plotOptions);
                    c(b, function(a, b) {
                        if (t[b] && "function" === typeof t[b].update) t[b].update(a, !1);
                        else if ("function" === typeof t[q[b]]) t[q[b]](a);
                        "chart" !== b && -1 !== t.propsRequireUpdateSeries.indexOf(b) && (h = !0)
                    });
                    this.collectionsWithUpdate.forEach(function(a) {
                        var c;
                        b[a] && ("series" === a && (c = [], t[a].forEach(function(a, b) { a.options.isInternal || c.push(f(a.options.index, b)) })), B(b[a]).forEach(function(b, e) {
                            (e = v(b.id) && t.get(b.id) || t[a][c ? c[e] : e]) && e.coll === a && (e.update(b, !1), d && (e.touched = !0));
                            if (!e && d)
                                if ("series" === a) t.addSeries(b, !1).touched = !0;
                                else if ("xAxis" === a || "yAxis" === a) t.addAxis(b, "xAxis" ===
                                a, !1).touched = !0
                        }), d && t[a].forEach(function(a) { a.touched || a.options.isInternal ? delete a.touched : x.push(a) }))
                    });
                    x.forEach(function(a) { a.remove && a.remove(!1) });
                    l && t.axes.forEach(function(a) { a.update({}, !1) });
                    h && t.series.forEach(function(a) { a.update({}, !1) });
                    b.loading && g(!0, t.options.loading, b.loading);
                    l = m && m.width;
                    m = m && m.height;
                    a.isString(m) && (m = a.relativeLength(m, l || t.chartWidth));
                    k(l) && l !== t.chartWidth || k(m) && m !== t.chartHeight ? t.setSize(l, m, n) : f(e, !0) && t.redraw(n);
                    p(t, "afterUpdate", {
                        options: b,
                        redraw: e,
                        animation: n
                    })
                },
                setSubtitle: function(a) { this.setTitle(void 0, a) }
            });
            w(b.prototype, {
                update: function(a, b, c, e) {
                    function d() {
                        g.applyOptions(a);
                        null === g.y && n && (g.graphic = n.destroy());
                        l(a, !0) && (n && n.element && a && a.marker && void 0 !== a.marker.symbol && (g.graphic = n.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()), g.connector && (g.connector = g.connector.destroy()));
                        t = g.index;
                        k.updateParallelArrays(g, t);
                        h.data[t] = l(h.data[t], !0) || l(a, !0) ? g.options : f(a, h.data[t]);
                        k.isDirty = k.isDirtyData = !0;
                        !k.fixedBox && k.hasCartesianSeries && (q.isDirtyBox = !0);
                        "point" === h.legendType && (q.isDirtyLegend = !0);
                        b && q.redraw(c)
                    }
                    var g = this,
                        k = g.series,
                        n = g.graphic,
                        t, q = k.chart,
                        h = k.options;
                    b = f(b, !0);
                    !1 === e ? d() : g.firePointEvent("update", { options: a }, d)
                },
                remove: function(a, b) { this.series.removePoint(this.series.data.indexOf(this), a, b) }
            });
            w(n.prototype, {
                addPoint: function(a, b, c, e, d) {
                    var g = this.options,
                        k = this.data,
                        n = this.chart,
                        t = this.xAxis,
                        t = t && t.hasNames && t.names,
                        q = g.data,
                        l, h, x = this.xData,
                        B, r;
                    b = f(b, !0);
                    l = { series: this };
                    this.pointClass.prototype.applyOptions.apply(l, [a]);
                    r = l.x;
                    B = x.length;
                    if (this.requireSorting && r < x[B - 1])
                        for (h = !0; B && x[B - 1] > r;) B--;
                    this.updateParallelArrays(l, "splice", B, 0, 0);
                    this.updateParallelArrays(l, B);
                    t && l.name && (t[r] = l.name);
                    q.splice(B, 0, a);
                    h && (this.data.splice(B, 0, null), this.processData());
                    "point" === g.legendType && this.generatePoints();
                    c && (k[0] && k[0].remove ? k[0].remove(!1) : (k.shift(), this.updateParallelArrays(l, "shift"), q.shift()));
                    !1 !== d && p(this, "addPoint", { point: l });
                    this.isDirtyData = this.isDirty = !0;
                    b && n.redraw(e)
                },
                removePoint: function(a, b, c) {
                    var e = this,
                        d = e.data,
                        g = d[a],
                        k = e.points,
                        n = e.chart,
                        t = function() {
                            k && k.length === d.length && k.splice(a, 1);
                            d.splice(a, 1);
                            e.options.data.splice(a, 1);
                            e.updateParallelArrays(g || { series: e }, "splice", a, 1);
                            g && g.destroy();
                            e.isDirty = !0;
                            e.isDirtyData = !0;
                            b && n.redraw()
                        };
                    x(c, n);
                    b = f(b, !0);
                    g ? g.firePointEvent("remove", null, t) : t()
                },
                remove: function(a, b, c, e) {
                    function d() {
                        g.destroy(e);
                        g.remove = null;
                        k.isDirtyLegend = k.isDirtyBox = !0;
                        k.linkSeries();
                        f(a, !0) && k.redraw(b)
                    }
                    var g = this,
                        k =
                        g.chart;
                    !1 !== c ? p(g, "remove", null, d) : d()
                },
                update: function(b, c) {
                    b = a.cleanRecursively(b, this.userOptions);
                    p(this, "update", { options: b });
                    var e = this,
                        d = e.chart,
                        k = e.userOptions,
                        n, m = e.initialType || e.type,
                        q = b.type || k.type || d.options.chart.type,
                        l = !(this.hasDerivedData || b.dataGrouping || q && q !== this.type || void 0 !== b.pointStart || b.pointInterval || b.pointIntervalUnit || b.keys),
                        h = t[m].prototype,
                        x, B = ["group", "markerGroup", "dataLabelsGroup"],
                        r = ["navigatorSeries", "baseSeries"],
                        G = e.finishedAnimating && { animation: !1 },
                        u = {};
                    l && (r.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement"), !1 !== b.visible && r.push("area", "graph"), e.parallelArrays.forEach(function(a) { r.push(a + "Data") }), b.data && this.setData(b.data, !1));
                    b = g(k, G, { index: void 0 === k.index ? e.index : k.index, pointStart: f(k.pointStart, e.xData[0]) }, !l && { data: e.options.data }, b);
                    r = B.concat(r);
                    r.forEach(function(a) {
                        r[a] = e[a];
                        delete e[a]
                    });
                    e.remove(!1, null, !1, !0);
                    for (x in h) e[x] = void 0;
                    t[q || m] ? w(e, t[q || m].prototype) : a.error(17, !0, d);
                    r.forEach(function(a) {
                        e[a] =
                            r[a]
                    });
                    e.init(d, b);
                    l && this.points && (n = e.options, !1 === n.visible ? (u.graphic = 1, u.dataLabel = 1) : (n.marker && !1 === n.marker.enabled && (u.graphic = 1), n.dataLabels && !1 === n.dataLabels.enabled && (u.dataLabel = 1)), this.points.forEach(function(a) { a && a.series && (a.resolveColor(), Object.keys(u).length && a.destroyElements(u), !1 === n.showInLegend && a.legendItem && d.legend.destroyItem(a)) }, this));
                    b.zIndex !== k.zIndex && B.forEach(function(a) { e[a] && e[a].attr({ zIndex: b.zIndex }) });
                    e.initialType = m;
                    d.linkSeries();
                    p(this, "afterUpdate");
                    f(c, !0) && d.redraw(l ? void 0 : !1)
                },
                setName: function(a) {
                    this.name = this.options.name = this.userOptions.name = a;
                    this.chart.isDirtyLegend = !0
                }
            });
            w(E.prototype, {
                update: function(a, b) {
                    var e = this.chart,
                        d = a && a.events || {};
                    a = g(this.userOptions, a);
                    e.options[this.coll].indexOf && (e.options[this.coll][e.options[this.coll].indexOf(this.userOptions)] = a);
                    c(e.options[this.coll].events, function(a, b) { "undefined" === typeof d[b] && (d[b] = void 0) });
                    this.destroy(!0);
                    this.init(e, w(a, { events: d }));
                    e.isDirtyBox = !0;
                    f(b, !0) && e.redraw()
                },
                remove: function(a) {
                    for (var b = this.chart, c = this.coll, d = this.series, g = d.length; g--;) d[g] && d[g].remove(!1);
                    r(b.axes, this);
                    r(b[c], this);
                    e(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                    b[c].forEach(function(a, b) { a.options.index = a.userOptions.index = b });
                    this.destroy();
                    b.isDirtyBox = !0;
                    f(a, !0) && b.redraw()
                },
                setTitle: function(a, b) { this.update({ title: a }, b) },
                setCategories: function(a, b) { this.update({ categories: a }, b) }
            })
        });
    K(I, "parts/ColumnSeries.js", [I["parts/Globals.js"]], function(a) {
        var D =
            a.animObject,
            F = a.color,
            E = a.extend,
            h = a.defined,
            d = a.isNumber,
            u = a.merge,
            v = a.pick,
            r = a.Series,
            w = a.seriesType,
            p = a.svg;
        w("column", "line", { borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "var(--blackColor)" }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                r.prototype.init.apply(this, arguments);
                var a = this,
                    d = a.chart;
                d.hasRendered && d.series.forEach(function(e) { e.type === a.type && (e.isDirty = !0) })
            },
            getColumnMetrics: function() {
                var a = this,
                    d = a.options,
                    e = a.xAxis,
                    g = a.yAxis,
                    c = e.options.reversedStacks,
                    c = e.reversed && !c || !e.reversed && c,
                    f, b = {},
                    n = 0;
                !1 === d.grouping ? n = 1 : a.chart.series.forEach(function(c) {
                    var e = c.options,
                        d = c.yAxis,
                        k;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries ||
                        g.len !== d.len || g.pos !== d.pos || (e.stacking ? (f = c.stackKey, void 0 === b[f] && (b[f] = n++), k = b[f]) : !1 !== e.grouping && (k = n++), c.columnIndex = k)
                });
                var t = Math.min(Math.abs(e.transA) * (e.ordinalSlope || d.pointRange || e.closestPointRange || e.tickInterval || 1), e.len),
                    h = t * d.groupPadding,
                    p = (t - 2 * h) / (n || 1),
                    d = Math.min(d.maxPointWidth || e.len, v(d.pointWidth, p * (1 - 2 * d.pointPadding)));
                a.columnMetrics = { width: d, offset: (p - d) / 2 + (h + ((a.columnIndex || 0) + (c ? 1 : 0)) * p - t / 2) * (c ? -1 : 1) };
                return a.columnMetrics
            },
            crispCol: function(a, d, e, g) {
                var c =
                    this.chart,
                    f = this.borderWidth,
                    b = -(f % 2 ? .5 : 0),
                    f = f % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (f += 1);
                this.options.crisp && (e = Math.round(a + e) + b, a = Math.round(a) + b, e -= a);
                g = Math.round(d + g) + f;
                b = .5 >= Math.abs(d) && .5 < g;
                d = Math.round(d) + f;
                g -= d;
                b && g && (--d, g += 1);
                return { x: a, y: d, width: e, height: g }
            },
            translate: function() {
                var a = this,
                    d = a.chart,
                    e = a.options,
                    g = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    g = a.borderWidth = v(e.borderWidth, g ? 0 : 1),
                    c = a.yAxis,
                    f = e.threshold,
                    b = a.translatedThreshold = c.getThreshold(f),
                    n = v(e.minPointLength,
                        5),
                    t = a.getColumnMetrics(),
                    p = t.width,
                    B = a.barW = Math.max(p, 1 + 2 * g),
                    w = a.pointXOffset = t.offset;
                d.inverted && (b -= .5);
                e.pointPadding && (B = Math.ceil(B));
                r.prototype.translate.apply(a);
                a.points.forEach(function(e) {
                    var g = v(e.yBottom, b),
                        k = 999 + Math.abs(g),
                        t = p,
                        k = Math.min(Math.max(-k, e.plotY), c.len + k),
                        q = e.plotX + w,
                        m = B,
                        l = Math.min(k, g),
                        x, r = Math.max(k, g) - l;
                    n && Math.abs(r) < n && (r = n, x = !c.reversed && !e.negative || c.reversed && e.negative, e.y === f && a.dataMax <= f && c.min < f && (x = !x), l = Math.abs(l - b) > n ? g - n : b - (x ? n : 0));
                    h(e.options.pointWidth) &&
                        (t = m = Math.ceil(e.options.pointWidth), q -= Math.round((t - p) / 2));
                    e.barX = q;
                    e.pointWidth = t;
                    e.tooltipPos = d.inverted ? [c.len + c.pos - d.plotLeft - k, a.xAxis.len - q - m / 2, r] : [q + m / 2, k + c.pos - d.plotTop, r];
                    e.shapeType = a.pointClass.prototype.shapeType || "rect";
                    e.shapeArgs = a.crispCol.apply(a, e.isNull ? [q, b, m, 0] : [q, l, m, r])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") },
            pointAttribs: function(a, d) {
                var e = this.options,
                    g, c = this.pointAttrToOptions || {};
                g = c.stroke || "borderColor";
                var f = c["stroke-width"] || "borderWidth",
                    b = a && a.color || this.color,
                    n = a && a[g] || e[g] || this.color || b,
                    t = a && a[f] || e[f] || this[f] || 0,
                    c = a && a.dashStyle || e.dashStyle,
                    k = v(e.opacity, 1),
                    h;
                a && this.zones.length && (h = a.getZone(), b = a.options.color || h && h.color || this.color, h && (n = h.borderColor || n, c = h.dashStyle || c, t = h.borderWidth || t));
                d && (a = u(e.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, b = a.color || void 0 !== d && F(b).brighten(a.brightness).get() ||
                    b, n = a[g] || n, t = a[f] || t, c = a.dashStyle || c, k = v(a.opacity, k));
                g = { fill: b, stroke: n, "stroke-width": t, opacity: k };
                c && (g.dashstyle = c);
                return g
            },
            drawPoints: function() {
                var a = this,
                    h = this.chart,
                    e = a.options,
                    g = h.renderer,
                    c = e.animationLimit || 250,
                    f;
                a.points.forEach(function(b) {
                    var n = b.graphic,
                        t = n && h.pointCount < c ? "animate" : "attr";
                    if (d(b.plotY) && null !== b.y) {
                        f = b.shapeArgs;
                        n && n.element.nodeName !== b.shapeType && (n = n.destroy());
                        if (n) n[t](u(f));
                        else b.graphic = n = g[b.shapeType](f).add(b.group || a.group);
                        if (e.borderRadius) n[t]({ r: e.borderRadius });
                        h.styledMode || n[t](a.pointAttribs(b, b.selected && "select")).shadow(!1 !== b.allowShadow && e.shadow, null, e.stacking && !e.borderRadius);
                        n.addClass(b.getClassName(), !0)
                    } else n && (b.graphic = n.destroy())
                })
            },
            animate: function(a) {
                var d = this,
                    e = this.yAxis,
                    g = d.options,
                    c = this.chart.inverted,
                    f = {},
                    b = c ? "translateX" : "translateY",
                    n;
                p && (a ? (f.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(g.threshold))), c ? f.translateX = a - e.len : f.translateY = a, d.clipBox && d.setClip(), d.group.attr(f)) : (n = d.group.attr(b), d.group.animate({ scaleY: 1 },
                    E(D(d.options.animation), {
                        step: function(a, c) {
                            f[b] = n + c.pos * (e.pos - n);
                            d.group.attr(f)
                        }
                    })), d.animate = null))
            },
            remove: function() {
                var a = this,
                    d = a.chart;
                d.hasRendered && d.series.forEach(function(e) { e.type === a.type && (e.isDirty = !0) });
                r.prototype.remove.apply(a, arguments)
            }
        })
    });
    K(I, "parts/ScatterSeries.js", [I["parts/Globals.js"]], function(a) {
        var D = a.Series,
            F = a.seriesType;
        F("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: { x: 0, y: 0 },
            marker: { enabled: !0 },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() { this.options.lineWidth && D.prototype.drawGraph.call(this) },
            applyJitter: function() {
                var a = this,
                    h = this.options.jitter,
                    d = this.points.length;
                h && this.points.forEach(function(u, v) {
                    ["x", "y"].forEach(function(r, w) {
                        var p, k = "plot" + r.toUpperCase(),
                            l, e;
                        h[r] && !u.isNull &&
                            (p = a[r + "Axis"], e = h[r] * p.transA, p && !p.isLog && (l = Math.max(0, u[k] - e), p = Math.min(p.len, u[k] + e), w = 1E4 * Math.sin(v + w * d), u[k] = l + (p - l) * (w - Math.floor(w)), "x" === r && (u.clientX = u.plotX)))
                    })
                })
            }
        });
        a.addEvent(D, "afterTranslate", function() { this.applyJitter && this.applyJitter() })
    });
    K(I, "parts/DataLabels.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.arrayMax,
            E = a.defined,
            h = a.extend,
            d = a.format,
            u = a.merge,
            v = a.noop,
            r = a.pick,
            w = a.relativeLength,
            p = a.Series,
            k = a.seriesTypes,
            l = a.stableSort,
            e = a.isArray,
            g = a.splat;
        a.distribute = function(c, e, b) {
            function d(a, b) { return a.target - b.target }
            var f, g = !0,
                k = c,
                h = [],
                q;
            q = 0;
            var p = k.reducedLen || e;
            for (f = c.length; f--;) q += c[f].size;
            if (q > p) {
                l(c, function(a, b) { return (b.rank || 0) - (a.rank || 0) });
                for (q = f = 0; q <= p;) q += c[f].size, f++;
                h = c.splice(f - 1, c.length)
            }
            l(c, d);
            for (c = c.map(function(a) { return { size: a.size, targets: [a.target], align: r(a.align, .5) } }); g;) {
                for (f = c.length; f--;) g = c[f], q = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, q - g.size * g.align), e - g.size);
                f = c.length;
                for (g = !1; f--;) 0 < f && c[f - 1].pos + c[f - 1].size > c[f].pos && (c[f - 1].size += c[f].size, c[f - 1].targets = c[f - 1].targets.concat(c[f].targets), c[f - 1].align = .5, c[f - 1].pos + c[f - 1].size > e && (c[f - 1].pos = e - c[f - 1].size), c.splice(f, 1), g = !0)
            }
            k.push.apply(k, h);
            f = 0;
            c.some(function(c) {
                var d = 0;
                if (c.targets.some(function() {
                        k[f].pos = c.pos + d;
                        if (Math.abs(k[f].pos - k[f].target) > b) return k.slice(0, f + 1).forEach(function(a) { delete a.pos }), k.reducedLen = (k.reducedLen || e) - .1 * e, k.reducedLen > .1 * e && a.distribute(k, e, b), !0;
                        d += k[f].size;
                        f++
                    })) return !0
            });
            l(k, d)
        };
        p.prototype.drawDataLabels = function() {
            function c(a, b) { var c = b.filter; return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0 }

            function f(a, b) {
                var c = [],
                    d;
                if (e(a) && !e(b)) c = a.map(function(a) { return u(a, b) });
                else if (e(b) && !e(a)) c = b.map(function(b) { return u(a, b) });
                else if (e(a) || e(b))
                    for (d = Math.max(a.length, b.length); d--;) c[d] = u(a[d], b[d]);
                else c = u(a, b);
                return c
            }
            var b = this,
                n = b.chart,
                k = b.options,
                h = k.dataLabels,
                l = b.points,
                p, q = b.hasRendered || 0,
                w, v = r(h.defer, !!k.animation),
                J = n.renderer,
                h = f(f(n.options.plotOptions && n.options.plotOptions.series && n.options.plotOptions.series.dataLabels, n.options.plotOptions && n.options.plotOptions[b.type] && n.options.plotOptions[b.type].dataLabels), h);
            a.fireEvent(this, "drawDataLabels");
            if (e(h) || h.enabled || b._hasPointLabels) w = b.plotGroup("dataLabelsGroup", "data-labels", v && !q ? "hidden" : "inherit", h.zIndex || 6), v && (w.attr({ opacity: +q }),
                q || D(b, "afterAnimate", function() {
                    b.visible && w.show(!0);
                    w[k.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: 200 })
                })), l.forEach(function(e) {
                p = g(f(h, e.dlOptions || e.options && e.options.dataLabels));
                p.forEach(function(f, g) {
                    var t = f.enabled && (!e.isNull || e.dataLabelOnNull) && c(e, f),
                        h, q, m, l, p = e.dataLabels ? e.dataLabels[g] : e.dataLabel,
                        x = e.connectors ? e.connectors[g] : e.connector,
                        B = !p;
                    t && (h = e.getLabelConfig(), q = r(f[e.formatPrefix + "Format"], f.format), h = E(q) ? d(q, h, n.time) : (f[e.formatPrefix + "Formatter"] || f.formatter).call(h,
                        f), q = f.style, m = f.rotation, n.styledMode || (q.color = r(f.color, q.color, b.color, "#000000"), "contrast" === q.color && (e.contrastColor = J.getContrast(e.color || b.color), q.color = f.inside || 0 > r(f.distance, e.labelDistance) || k.stacking ? e.contrastColor : "#000000"), k.cursor && (q.cursor = k.cursor)), l = { r: f.borderRadius || 0, rotation: m, padding: f.padding, zIndex: 1 }, n.styledMode || (l.fill = f.backgroundColor, l.stroke = f.borderColor, l["stroke-width"] = f.borderWidth), a.objectEach(l, function(a, b) { void 0 === a && delete l[b] }));
                    !p || t && E(h) ?
                        t && E(h) && (p ? l.text = h : (e.dataLabels = e.dataLabels || [], p = e.dataLabels[g] = m ? J.text(h, 0, -9999).addClass("highcharts-data-label") : J.label(h, 0, -9999, f.shape, null, null, f.useHTML, null, "data-label"), g || (e.dataLabel = p), p.addClass(" highcharts-data-label-color-" + e.colorIndex + " " + (f.className || "") + (f.useHTML ? " highcharts-tracker" : ""))), p.options = f, p.attr(l), n.styledMode || p.css(q).shadow(f.shadow), p.added || p.add(w), f.textPath && p.setTextPath(e.getDataLabelPath && e.getDataLabelPath(p) || e.graphic, f.textPath), b.alignDataLabel(e,
                            p, f, null, B)) : (e.dataLabel = e.dataLabel && e.dataLabel.destroy(), e.dataLabels && (1 === e.dataLabels.length ? delete e.dataLabels : delete e.dataLabels[g]), g || delete e.dataLabel, x && (e.connector = e.connector.destroy(), e.connectors && (1 === e.connectors.length ? delete e.connectors : delete e.connectors[g])))
                })
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        p.prototype.alignDataLabel = function(a, e, b, d, g) {
            var c = this.chart,
                f = this.isCartesian && c.inverted,
                k = r(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                n = r(a.plotY, -9999),
                t = e.getBBox(),
                l, p = b.rotation,
                w = b.align,
                m = this.visible && (a.series.forceDL || c.isInsidePlot(k, Math.round(n), f) || d && c.isInsidePlot(k, f ? d.x + 1 : d.y + d.height - 1, f)),
                u = "justify" === r(b.overflow, "justify");
            if (m && (l = c.renderer.fontMetrics(c.styledMode ? void 0 : b.style.fontSize, e).b, d = h({ x: f ? this.yAxis.len - n : k, y: Math.round(f ? this.xAxis.len - k : n), width: 0, height: 0 }, d), h(b, { width: t.width, height: t.height }), p ? (u = !1, k = c.renderer.rotCorr(l, p), k = { x: d.x + b.x + d.width / 2 + k.x, y: d.y + b.y + { top: 0, middle: .5, bottom: 1 }[b.verticalAlign] * d.height }, e[g ?
                    "attr" : "animate"](k).attr({ align: w }), n = (p + 720) % 360, n = 180 < n && 360 > n, "left" === w ? k.y -= n ? t.height : 0 : "center" === w ? (k.x -= t.width / 2, k.y -= t.height / 2) : "right" === w && (k.x -= t.width, k.y -= n ? 0 : t.height), e.placed = !0, e.alignAttr = k) : (e.align(b, null, d), k = e.alignAttr), u && 0 <= d.height ? a.isLabelJustified = this.justifyDataLabel(e, b, k, t, d, g) : r(b.crop, !0) && (m = c.isInsidePlot(k.x, k.y) && c.isInsidePlot(k.x + t.width, k.y + t.height)), b.shape && !p)) e[g ? "attr" : "animate"]({
                anchorX: f ? c.plotWidth - a.plotY : a.plotX,
                anchorY: f ? c.plotHeight - a.plotX : a.plotY
            });
            m || (e.attr({ y: -9999 }), e.placed = !1)
        };
        p.prototype.justifyDataLabel = function(a, e, b, d, g, k) {
            var c = this.chart,
                f = e.align,
                n = e.verticalAlign,
                t, h, l = a.box ? 0 : a.padding || 0;
            t = b.x + l;
            0 > t && ("right" === f ? e.align = "left" : e.x = -t, h = !0);
            t = b.x + d.width - l;
            t > c.plotWidth && ("left" === f ? e.align = "right" : e.x = c.plotWidth - t, h = !0);
            t = b.y + l;
            0 > t && ("bottom" === n ? e.verticalAlign = "top" : e.y = -t, h = !0);
            t = b.y + d.height - l;
            t > c.plotHeight && ("top" === n ? e.verticalAlign = "bottom" : e.y = c.plotHeight - t, h = !0);
            h && (a.placed = !k, a.align(e, null, g));
            return h
        };
        k.pie && (k.pie.prototype.dataLabelPositioners = {
                radialDistributionY: function(a) { return a.top + a.distributeBox.pos },
                radialDistributionX: function(a, e, b, d) { return a.getX(b < e.top + 2 || b > e.bottom - 2 ? d : b, e.half, e) },
                justify: function(a, e, b) { return b[0] + (a.half ? -1 : 1) * (e + a.labelDistance) },
                alignToPlotEdges: function(a, e, b, d) { a = a.getBBox().width; return e ? a + d : b - a - d },
                alignToConnectors: function(a, e, b, d) {
                    var c = 0,
                        f;
                    a.forEach(function(a) {
                        f = a.dataLabel.getBBox().width;
                        f > c && (c = f)
                    });
                    return e ? c + d : b - c - d
                }
            }, k.pie.prototype.drawDataLabels =
            function() {
                var c = this,
                    e = c.data,
                    b, d = c.chart,
                    g = c.options.dataLabels,
                    k = g.connectorPadding,
                    h, l = d.plotWidth,
                    q = d.plotHeight,
                    w = d.plotLeft,
                    v = Math.round(d.chartWidth / 3),
                    D, H = c.center,
                    m = H[2] / 2,
                    C = H[1],
                    M, I, L, K, R = [
                        [],
                        []
                    ],
                    y, P, O, T, S = [0, 0, 0, 0],
                    Y = c.dataLabelPositioners,
                    aa;
                c.visible && (g.enabled || c._hasPointLabels) && (e.forEach(function(a) { a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a.dataLabel.shortened = !1) }), p.prototype.drawDataLabels.apply(c),
                    e.forEach(function(a) { a.dataLabel && (a.visible ? (R[a.half].push(a), a.dataLabel._pos = null, !E(g.style.width) && !E(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > v && (a.dataLabel.css({ width: .7 * v }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels)) }), R.forEach(function(e, f) {
                        var n, t, h = e.length,
                            p = [],
                            x;
                        if (h)
                            for (c.sortByAngle(e, f - .5), 0 < c.maxLabelDistance && (n = Math.max(0, C - m -
                                    c.maxLabelDistance), t = Math.min(C + m + c.maxLabelDistance, d.plotHeight), e.forEach(function(a) { 0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, C - m - a.labelDistance), a.bottom = Math.min(C + m + a.labelDistance, d.plotHeight), x = a.dataLabel.getBBox().height || 21, a.distributeBox = { target: a.labelPosition.natural.y - a.top + x / 2, size: x, rank: a.y }, p.push(a.distributeBox)) }), n = t + x - n, a.distribute(p, n, n / 5)), T = 0; T < h; T++) {
                                b = e[T];
                                L = b.labelPosition;
                                M = b.dataLabel;
                                O = !1 === b.visible ? "hidden" : "inherit";
                                P = n = L.natural.y;
                                p && E(b.distributeBox) &&
                                    (void 0 === b.distributeBox.pos ? O = "hidden" : (K = b.distributeBox.size, P = Y.radialDistributionY(b)));
                                delete b.positionIndex;
                                if (g.justify) y = Y.justify(b, m, H);
                                else switch (g.alignTo) {
                                    case "connectors":
                                        y = Y.alignToConnectors(e, f, l, w);
                                        break;
                                    case "plotEdges":
                                        y = Y.alignToPlotEdges(M, f, l, w);
                                        break;
                                    default:
                                        y = Y.radialDistributionX(c, b, P, n)
                                }
                                M._attr = { visibility: O, align: L.alignment };
                                M._pos = { x: y + g.x + ({ left: k, right: -k }[L.alignment] || 0), y: P + g.y - 10 };
                                L.final.x = y;
                                L.final.y = P;
                                r(g.crop, !0) && (I = M.getBBox().width, n = null, y - I < k && 1 ===
                                    f ? (n = Math.round(I - y + k), S[3] = Math.max(n, S[3])) : y + I > l - k && 0 === f && (n = Math.round(y + I - l + k), S[1] = Math.max(n, S[1])), 0 > P - K / 2 ? S[0] = Math.max(Math.round(-P + K / 2), S[0]) : P + K / 2 > q && (S[2] = Math.max(Math.round(P + K / 2 - q), S[2])), M.sideOverflow = n)
                            }
                    }), 0 === F(S) || this.verifyDataLabelOverflow(S)) && (this.placeDataLabels(), this.points.forEach(function(a) {
                    aa = u(g, a.options.dataLabels);
                    if (h = r(aa.connectorWidth, 1)) {
                        var b;
                        D = a.connector;
                        if ((M = a.dataLabel) && M._pos && a.visible && 0 < a.labelDistance) {
                            O = M._attr.visibility;
                            if (b = !D) a.connector =
                                D = d.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(c.dataLabelsGroup), d.styledMode || D.attr({ "stroke-width": h, stroke: aa.connectorColor || a.color || "#666666" });
                            D[b ? "attr" : "animate"]({ d: a.getConnectorPath() });
                            D.attr("visibility", O)
                        } else D && (a.connector = D.destroy())
                    }
                }))
            }, k.pie.prototype.placeDataLabels = function() {
                this.points.forEach(function(a) {
                    var c = a.dataLabel,
                        b;
                    c && a.visible && ((b = c._pos) ? (c.sideOverflow && (c._attr.width =
                        Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({ width: c._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](b), c.moved = !0) : c && c.attr({ y: -9999 }));
                    delete a.distributeBox
                }, this)
            }, k.pie.prototype.alignDataLabel = v, k.pie.prototype.verifyDataLabelOverflow = function(a) {
                var c = this.center,
                    b = this.options,
                    e = b.center,
                    d = b.minSize || 80,
                    g, k = null !== b.size;
                k || (null !== e[0] ? g = Math.max(c[2] - Math.max(a[1], a[3]), d) : (g =
                    Math.max(c[2] - a[1] - a[3], d), c[0] += (a[3] - a[1]) / 2), null !== e[1] ? g = Math.max(Math.min(g, c[2] - Math.max(a[0], a[2])), d) : (g = Math.max(Math.min(g, c[2] - a[0] - a[2]), d), c[1] += (a[0] - a[2]) / 2), g < c[2] ? (c[2] = g, c[3] = Math.min(w(b.innerSize || 0, g), g), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : k = !0);
                return k
            });
        k.column && (k.column.prototype.alignDataLabel = function(a, e, b, d, g) {
            var c = this.chart.inverted,
                f = a.series,
                k = a.dlBox || a.shapeArgs,
                n = r(a.below, a.plotY > r(this.translatedThreshold, f.yAxis.len)),
                t = r(b.inside, !!this.options.stacking);
            k && (d = u(k), 0 > d.y && (d.height += d.y, d.y = 0), k = d.y + d.height - f.yAxis.len, 0 < k && (d.height -= k), c && (d = { x: f.yAxis.len - d.y - d.height, y: f.xAxis.len - d.x - d.width, width: d.height, height: d.width }), t || (c ? (d.x += n ? 0 : d.width, d.width = 0) : (d.y += n ? d.height : 0, d.height = 0)));
            b.align = r(b.align, !c || t ? "center" : n ? "right" : "left");
            b.verticalAlign = r(b.verticalAlign, c || t ? "middle" : n ? "top" : "bottom");
            p.prototype.alignDataLabel.call(this, a, e, b, d, g);
            a.isLabelJustified && a.contrastColor && e.css({ color: a.contrastColor })
        })
    });
    K(I, "modules/overlapping-datalabels.src.js", [I["parts/Globals.js"]], function(a) {
        var D = a.Chart,
            F = a.isArray,
            E = a.objectEach,
            h = a.pick,
            d = a.addEvent,
            u = a.fireEvent;
        d(D, "render", function() {
            var a = [];
            (this.labelCollectors || []).forEach(function(d) { a = a.concat(d()) });
            (this.yAxis || []).forEach(function(d) { d.options.stackLabels && !d.options.stackLabels.allowOverlap && E(d.stacks, function(d) { E(d, function(d) { a.push(d.label) }) }) });
            (this.series || []).forEach(function(d) {
                var r = d.options.dataLabels;
                d.visible && (!1 !== r.enabled ||
                    d._hasPointLabels) && d.points.forEach(function(d) {
                    d.visible && (F(d.dataLabels) ? d.dataLabels : d.dataLabel ? [d.dataLabel] : []).forEach(function(k) {
                        var l = k.options;
                        k.labelrank = h(l.labelrank, d.labelrank, d.shapeArgs && d.shapeArgs.height);
                        l.allowOverlap || a.push(k)
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        D.prototype.hideOverlappingLabels = function(a) {
            var d = this,
                h = a.length,
                p = d.renderer,
                k, l, e, g, c, f, b = function(a, b, c, e, d, f, g, k) { return !(d > a + c || d + g < a || f > b + e || f + k < b) };
            e = function(a) {
                var b, c, e, d = a.box ? 0 : a.padding || 0;
                e = 0;
                if (a &&
                    (!a.alignAttr || a.placed)) return b = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }, c = a.parentGroup, a.width || (e = a.getBBox(), a.width = e.width, a.height = e.height, e = p.fontMetrics(null, a.element).h), { x: b.x + (c.translateX || 0) + d, y: b.y + (c.translateY || 0) + d - e, width: a.width - 2 * d, height: a.height - 2 * d }
            };
            for (l = 0; l < h; l++)
                if (k = a[l]) k.oldOpacity = k.opacity, k.newOpacity = 1, k.absoluteBox = e(k);
            a.sort(function(a, b) { return (b.labelrank || 0) - (a.labelrank || 0) });
            for (l = 0; l < h; l++)
                for (f = (e = a[l]) && e.absoluteBox, k = l + 1; k < h; ++k)
                    if (c = (g = a[k]) &&
                        g.absoluteBox, f && c && e !== g && 0 !== e.newOpacity && 0 !== g.newOpacity && (c = b(f.x, f.y, f.width, f.height, c.x, c.y, c.width, c.height)))(e.labelrank < g.labelrank ? e : g).newOpacity = 0;
            a.forEach(function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function() { a.hide() }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b), u(d, "afterHideOverlappingLabels")) : a.attr({ opacity: c })), a.isOld = !0)
            })
        }
    });
    K(I, "parts/Interaction.js", [I["parts/Globals.js"]], function(a) {
        var D =
            a.addEvent,
            F = a.Chart,
            E = a.createElement,
            h = a.css,
            d = a.defaultOptions,
            u = a.defaultPlotOptions,
            v = a.extend,
            r = a.fireEvent,
            w = a.hasTouch,
            p = a.isObject,
            k = a.Legend,
            l = a.merge,
            e = a.pick,
            g = a.Point,
            c = a.Series,
            f = a.seriesTypes,
            b = a.svg,
            n;
        n = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    e = function(a) {
                        var b = c.getPointFromEvent(a);
                        void 0 !== b && (c.isDirectTouch = !0, b.onMouseOver(a))
                    };
                a.points.forEach(function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point =
                        a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (a.trackerGroups.forEach(function(d) { if (a[d]) { a[d].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function(a) { c.onTrackerMouseOut(a) }); if (w) a[d].on("touchstart", e);!b.styledMode && a.options.cursor && a[d].css(h).css({ cursor: a.options.cursor }) } }), a._hasTracking = !0);
                r(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var a = this,
                    c = a.options,
                    e = c.trackByArea,
                    d = [].concat(e ? a.areaPath : a.graphPath),
                    f = d.length,
                    g = a.chart,
                    k = g.pointer,
                    h = g.renderer,
                    n = g.options.tooltip.snap,
                    m = a.tracker,
                    l, p = function() { if (g.hoverSeries !== a) a.onMouseOver() },
                    u = "rgba(192,192,192," + (b ? .0001 : .002) + ")";
                if (f && !e)
                    for (l = f + 1; l--;) "M" === d[l] && d.splice(l + 1, 0, d[l + 1] - n, d[l + 2], "L"), (l && "M" === d[l] || l === f) && d.splice(l, 0, "L", d[l - 2] + n, d[l - 1]);
                m ? m.attr({ d: d }) : a.graph && (a.tracker = h.path(d).attr({ visibility: a.visible ? "visible" : "hidden", zIndex: 2 }).addClass(e ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), g.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: u,
                    fill: e ? u : "none",
                    "stroke-width": a.graph.strokeWidth() + (e ? 0 : 2 * n)
                }), [a.tracker, a.markerGroup].forEach(function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function(a) { k.onTrackerMouseOut(a) });
                    c.cursor && !g.styledMode && a.css({ cursor: c.cursor });
                    if (w) a.on("touchstart", p)
                }));
                r(this, "afterDrawTracker")
            }
        };
        f.column && (f.column.prototype.drawTracker = n.drawTrackerPoint);
        f.pie && (f.pie.prototype.drawTracker = n.drawTrackerPoint);
        f.scatter && (f.scatter.prototype.drawTracker = n.drawTrackerPoint);
        v(k.prototype, {
            setItemEvents: function(a, b, c) {
                var e = this,
                    d = e.chart.renderer.boxWrapper,
                    f = a instanceof g,
                    k = "highcharts-legend-" + (f ? "point" : "series") + "-active",
                    h = e.chart.styledMode;
                (c ? b : a.legendGroup).on("mouseover", function() {
                    e.allItems.forEach(function(b) { a !== b && b.setState("inactive", !f) });
                    a.setState("hover");
                    a.visible && d.addClass(k);
                    h || b.css(e.options.itemHoverStyle)
                }).on("mouseout", function() {
                    e.styledMode || b.css(l(a.visible ? e.itemStyle : e.itemHiddenStyle));
                    e.allItems.forEach(function(b) {
                        a !== b && b.setState("", !f)
                    });
                    d.removeClass(k);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() { a.setVisible && a.setVisible() };
                    d.removeClass(k);
                    b = { browserEvent: b };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : r(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = E("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container);
                D(a.checkbox, "click", function(b) {
                    r(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function() { a.select() })
                })
            }
        });
        v(F.prototype, {
            showResetZoom: function() {
                function a() { b.zoomOut() }
                var b = this,
                    c = d.lang,
                    e = b.options.chart.resetZoomButton,
                    f = e.theme,
                    g = f.states,
                    k = "chart" === e.relativeTo || "spaceBox" === e.relativeTo ? null : "plotBox";
                r(this, "beforeShowResetZoom", null, function() {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, f, g && g.hover).attr({ align: e.position.align, title: c.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(e.position, !1,
                        k)
                });
                r(this, "afterShowResetZoom")
            },
            zoomOut: function() { r(this, "selection", { resetSelection: !0 }, this.zoom) },
            zoom: function(b) {
                var c = this,
                    d, f = c.pointer,
                    g = !1,
                    k = c.inverted ? f.mouseDownX : f.mouseDownY,
                    h;
                !b || b.resetSelection ? (c.axes.forEach(function(a) { d = a.zoom() }), f.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function(b) {
                    var e = b.axis,
                        h = c.inverted ? e.left : e.top,
                        n = c.inverted ? h + e.width : h + e.height,
                        l = e.isXAxis,
                        t = !1;
                    if (!l && k >= h && k <= n || l || !a.defined(k)) t = !0;
                    f[l ? "zoomX" : "zoomY"] && t && (d = e.zoom(b.min, b.max), e.displayBtn &&
                        (g = !0))
                });
                h = c.resetZoomButton;
                g && !h ? c.showResetZoom() : !g && p(h) && (c.resetZoomButton = h.destroy());
                d && c.redraw(e(c.options.chart.animation, b && b.animation, 100 > c.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    e = c.hoverPoints,
                    d;
                r(this, "pan", { originalEvent: a }, function() {
                    e && e.forEach(function(a) { a.setState() });
                    ("xy" === b ? [1, 0] : [1]).forEach(function(b) {
                        b = c[b ? "xAxis" : "yAxis"][0];
                        var e = b.horiz,
                            f = a[e ? "chartX" : "chartY"],
                            e = e ? "mouseDownX" : "mouseDownY",
                            g = c[e],
                            k = (b.pointRange || 0) / 2,
                            h = b.reversed && !c.inverted || !b.reversed &&
                            c.inverted ? -1 : 1,
                            n = b.getExtremes(),
                            l = b.toValue(g - f, !0) + k * h,
                            h = b.toValue(g + b.len - f, !0) - k * h,
                            t = h < l,
                            g = t ? h : l,
                            l = t ? l : h,
                            h = Math.min(n.dataMin, k ? n.min : b.toValue(b.toPixels(n.min) - b.minPixelPadding)),
                            k = Math.max(n.dataMax, k ? n.max : b.toValue(b.toPixels(n.max) + b.minPixelPadding)),
                            t = h - g;
                        0 < t && (l += t, g = h);
                        t = l - k;
                        0 < t && (l = k, g -= t);
                        b.series.length && g !== n.min && l !== n.max && (b.setExtremes(g, l, !1, !1, { trigger: "pan" }), d = !0);
                        c[e] = f
                    });
                    d && c.redraw(!1);
                    h(c.container, { cursor: "move" })
                })
            }
        });
        v(g.prototype, {
            select: function(a, b) {
                var c = this,
                    d = c.series,
                    f = d.chart;
                a = e(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", { accumulate: b }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[d.data.indexOf(c)] = c.options;
                    c.setState(a && "select");
                    b || f.getSelectedPoints().forEach(function(a) { a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[d.data.indexOf(a)] = a.options, a.setState(f.hoverPoints ? "inactive" : ""), a.firePointEvent("unselect")) })
                })
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) :
                    c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function(a) { a.setState() });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = l(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function(a, c) { D(b, c, a) });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    f = this.series,
                    g = this.state,
                    k = f.options.states[a || "normal"] || {},
                    h = u[f.type].marker && f.options.marker,
                    n = h && !1 === h.enabled,
                    l = h && h.states && h.states[a || "normal"] || {},
                    t = !1 === l.enabled,
                    p = f.stateMarkerGraphic,
                    w = this.marker || {},
                    x = f.chart,
                    E = f.halo,
                    D, y, F, I = h && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === k.enabled || a && (t || n && !1 === l.enabled) || a && w.states && w.states[a] && !1 === w.states[a].enabled)) {
                    this.state = a;
                    I && (D = f.markerAttribs(this, a));
                    if (this.graphic) g && this.graphic.removeClass("highcharts-point-" +
                        g), a && this.graphic.addClass("highcharts-point-" + a), x.styledMode || (y = f.pointAttribs(this, a), F = e(x.options.chart.animation, k.animation), f.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function(a) { a && a.animate({ opacity: y.opacity }, F) }), this.connector && this.connector.animate({ opacity: y.opacity }, F)), this.graphic.animate(y, F)), D && this.graphic.animate(D, e(x.options.chart.animation, l.animation, h.animation)), p && p.hide();
                    else {
                        if (a && l) {
                            g = w.symbol || f.symbol;
                            p && p.currentSymbol !== g && (p = p.destroy());
                            if (p) p[b ? "animate" : "attr"]({ x: D.x, y: D.y });
                            else g && (f.stateMarkerGraphic = p = x.renderer.symbol(g, D.x, D.y, D.width, D.height).add(f.markerGroup), p.currentSymbol = g);
                            !x.styledMode && p && p.attr(f.pointAttribs(this, a))
                        }
                        p && (p[a && x.isInsidePlot(c, d, x.inverted) ? "show" : "hide"](), p.element.point = this)
                    }(a = k.halo) && a.size ? (E || (f.halo = E = x.renderer.path().add((this.graphic || p).parentGroup)), E.show()[b ? "animate" : "attr"]({ d: this.haloPath(a.size) }), E.attr({
                        "class": "highcharts-halo highcharts-color-" + e(this.colorIndex, f.colorIndex) +
                            (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), E.point = this, x.styledMode || E.attr(v({ fill: this.color || f.color, "fill-opacity": a.opacity }, a.attributes))) : E && E.point && E.point.haloPath && E.animate({ d: E.point.haloPath(0) }, null, E.hide);
                    r(this, "afterSetState")
                }
            },
            haloPath: function(a) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a) }
        });
        v(c.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver &&
                    r(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    e = b.hoverPoint;
                b.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && r(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                b.series.forEach(function(a) { a.setState("", !0) })
            },
            setState: function(a, b) {
                var c = this,
                    d = c.options,
                    f = c.graph,
                    g = d.inactiveOtherPoints,
                    k = d.states,
                    h = d.lineWidth,
                    n = d.opacity,
                    l = e(k[a || "normal"] && k[a || "normal"].animation,
                        c.chart.options.chart.animation),
                    d = 0;
                a = a || "";
                if (c.state !== a && ([c.group, c.markerGroup, c.dataLabelsGroup].forEach(function(b) { b && (c.state && b.removeClass("highcharts-series-" + c.state), a && b.addClass("highcharts-series-" + a)) }), c.state = a, !c.chart.styledMode)) {
                    if (k[a] && !1 === k[a].enabled) return;
                    a && (h = k[a].lineWidth || h + (k[a].lineWidthPlus || 0), n = e(k[a].opacity, n));
                    if (f && !f.dashstyle)
                        for (k = { "stroke-width": h }, f.animate(k, l); c["zone-graph-" + d];) c["zone-graph-" + d].attr(k), d += 1;
                    g || [c.group, c.markerGroup, c.dataLabelsGroup,
                        c.labelBySeries
                    ].forEach(function(a) { a && a.animate({ opacity: n }, l) })
                }
                b && g && c.points && c.points.forEach(function(b) { b.setState && b.setState(a) })
            },
            setVisible: function(a, b) {
                var c = this,
                    e = c.chart,
                    d = c.legendItem,
                    f, g = e.options.chart.ignoreHiddenSeries,
                    k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a) { if (c[a]) c[a][f]() });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
                d && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && e.series.forEach(function(a) { a.options.stacking && a.visible && (a.isDirty = !0) });
                c.linkedSeries.forEach(function(b) { b.setVisible(a, !1) });
                g && (e.isDirtyBox = !0);
                r(c, f);
                !1 !== b && e.redraw()
            },
            show: function() { this.setVisible(!0) },
            hide: function() { this.setVisible(!1) },
            select: function(a) {
                this.selected = a = this.options.selected = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                r(this, a ? "select" : "unselect")
            },
            drawTracker: n.drawTrackerGraph
        })
    });
    K(I, "parts/Responsive.js", [I["parts/Globals.js"]], function(a) {
        var D = a.Chart,
            F = a.isArray,
            E = a.isObject,
            h = a.pick,
            d = a.splat;
        D.prototype.setResponsive = function(d, h) {
            var r = this.options.responsive,
                w = [],
                p = this.currentResponsive;
            !h && r && r.rules && r.rules.forEach(function(k) {
                void 0 === k._id && (k._id = a.uniqueKey());
                this.matchResponsiveRule(k, w, d)
            }, this);
            h = a.merge.apply(0, w.map(function(d) { return a.find(r.rules, function(a) { return a._id === d }).chartOptions }));
            h.isResponsiveOptions = !0;
            w = w.toString() || void 0;
            w !== (p &&
                p.ruleIds) && (p && this.update(p.undoOptions, d), w ? (p = this.currentOptions(h), p.isResponsiveOptions = !0, this.currentResponsive = { ruleIds: w, mergedOptions: h, undoOptions: p }, this.update(h, d)) : this.currentResponsive = void 0)
        };
        D.prototype.matchResponsiveRule = function(a, d) {
            var r = a.condition;
            (r.callback || function() { return this.chartWidth <= h(r.maxWidth, Number.MAX_VALUE) && this.chartHeight <= h(r.maxHeight, Number.MAX_VALUE) && this.chartWidth >= h(r.minWidth, 0) && this.chartHeight >= h(r.minHeight, 0) }).call(this) && d.push(a._id)
        };
        D.prototype.currentOptions = function(u) {
            function v(r, p, k, l) {
                var e;
                a.objectEach(r, function(a, c) {
                    if (!l && -1 < ["series", "xAxis", "yAxis"].indexOf(c))
                        for (a = d(a), k[c] = [], e = 0; e < a.length; e++) p[c][e] && (k[c][e] = {}, v(a[e], p[c][e], k[c][e], l + 1));
                    else E(a) ? (k[c] = F(a) ? [] : {}, v(a, p[c] || {}, k[c], l + 1)) : k[c] = h(p[c], null)
                })
            }
            var r = {};
            v(u, this.options, r, 0);
            return r
        }
    });
    K(I, "parts-map/MapAxis.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.Axis,
            E = a.pick;
        D(F, "getSeriesExtremes", function() {
            var a = [];
            this.isXAxis && (this.series.forEach(function(d,
                h) { d.useMapGeometry && (a[h] = d.xData, d.xData = []) }), this.seriesXData = a)
        });
        D(F, "afterGetSeriesExtremes", function() {
            var a = this.seriesXData,
                d, u, v;
            this.isXAxis && (d = E(this.dataMin, Number.MAX_VALUE), u = E(this.dataMax, -Number.MAX_VALUE), this.series.forEach(function(h, w) { h.useMapGeometry && (d = Math.min(d, E(h.minX, d)), u = Math.max(u, E(h.maxX, u)), h.xData = a[w], v = !0) }), v && (this.dataMin = d, this.dataMax = u), delete this.seriesXData)
        });
        D(F, "afterSetAxisTranslation", function() {
            var a = this.chart,
                d;
            d = a.plotWidth / a.plotHeight;
            var a = a.xAxis[0],
                u;
            "yAxis" === this.coll && void 0 !== a.transA && this.series.forEach(function(a) { a.preserveAspectRatio && (u = !0) });
            if (u && (this.transA = a.transA = Math.min(this.transA, a.transA), d /= (a.max - a.min) / (this.max - this.min), d = 1 > d ? this : a, a = (d.max - d.min) * d.transA, d.pixelPadding = d.len - a, d.minPixelPadding = d.pixelPadding / 2, a = d.fixTo)) {
                a = a[1] - d.toValue(a[0], !0);
                a *= d.transA;
                if (Math.abs(a) > d.minPixelPadding || d.min === d.dataMin && d.max === d.dataMax) a = 0;
                d.minPixelPadding -= a
            }
        });
        D(F, "render", function() { this.fixTo = null })
    });
    K(I, "parts-map/ColorAxis.js", [I["parts/Globals.js"]], function(a) {
        var D = a.addEvent,
            F = a.Axis,
            E = a.Chart,
            h = a.color,
            d, u = a.extend,
            v = a.isNumber,
            r = a.Legend,
            w = a.LegendSymbolMixin,
            p = a.noop,
            k = a.merge,
            l = a.pick;
        d = a.ColorAxis = function() { this.init.apply(this, arguments) };
        u(d.prototype, F.prototype);
        u(d.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: { animation: { duration: 50 }, width: .01, color: "#999999" },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(F.prototype.keepProps),
            init: function(a, d) {
                var c = "vertical" !== a.options.legend.layout,
                    e;
                this.coll = "colorAxis";
                e = k(this.defaultColorAxisOptions, { side: c ? 2 : 1, reversed: !c }, d, { opposite: !c, showEmpty: !1, title: null, visible: a.options.legend.enabled });
                F.prototype.init.call(this, a, e);
                d.dataClasses && this.initDataClasses(d);
                this.initStops();
                this.horiz = c;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            initDataClasses: function(a) {
                var e = this.chart,
                    c, d = 0,
                    b = e.options.chart.colorCount,
                    n = this.options,
                    l = a.dataClasses.length;
                this.dataClasses = c = [];
                this.legendItems = [];
                a.dataClasses.forEach(function(a, f) {
                    a = k(a);
                    c.push(a);
                    if (e.styledMode || !a.color) "category" === n.dataClassColor ? (e.styledMode || (f = e.options.colors, b = f.length, a.color = f[d]), a.colorIndex = d, d++, d === b && (d = 0)) : a.color = h(n.minColor).tweenTo(h(n.maxColor), 2 > l ? .5 : f / (l - 1))
                })
            },
            hasData: function() {
                return !(!this.tickPositions ||
                    !this.tickPositions.length)
            },
            setTickPositions: function() { if (!this.dataClasses) return F.prototype.setTickPositions.call(this) },
            initStops: function() {
                this.stops = this.options.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                this.stops.forEach(function(a) { a.color = h(a[1]) })
            },
            setOptions: function(a) {
                F.prototype.setOptions.call(this, a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function() {
                var a = this.legendSymbol,
                    d = this.chart,
                    c = d.options.legend || {},
                    f, b;
                a ? (this.left = c = a.attr("x"), this.top =
                    f = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - c - b, this.bottom = d.chartHeight - f - a, this.len = this.horiz ? b : a, this.pos = this.horiz ? c : f) : this.len = (this.horiz ? c.symbolWidth : c.symbolHeight) || this.defaultLegendLength
            },
            normalizedValue: function(a) { this.isLog && (a = this.val2lin(a)); return 1 - (this.max - a) / (this.max - this.min || 1) },
            toColor: function(a, d) {
                var c = this.stops,
                    e, b, g = this.dataClasses,
                    k, h;
                if (g)
                    for (h = g.length; h--;) {
                        if (k = g[h], e = k.from, c = k.to, (void 0 === e || a >= e) &&
                            (void 0 === c || a <= c)) {
                            b = k.color;
                            d && (d.dataClass = h, d.colorIndex = k.colorIndex);
                            break
                        }
                    } else {
                        a = this.normalizedValue(a);
                        for (h = c.length; h-- && !(a > c[h][0]););
                        e = c[h] || c[h + 1];
                        c = c[h + 1] || e;
                        a = 1 - (c[0] - a) / (c[0] - e[0] || 1);
                        b = e.color.tweenTo(c.color, a)
                    }
                return b
            },
            getOffset: function() {
                var a = this.legendGroup,
                    d = this.chart.axisOffset[this.side];
                a && (this.axisParent = a, F.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = d)
            },
            setLegendColor: function() {
                var a,
                    d = this.reversed;
                a = d ? 1 : 0;
                d = d ? 0 : 1;
                a = this.horiz ? [a, 0, d, 0] : [0, d, 0, a];
                this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: this.stops }
            },
            drawLegendSymbol: function(a, d) {
                var c = a.padding,
                    e = a.options,
                    b = this.horiz,
                    g = l(e.symbolWidth, b ? this.defaultLegendLength : 12),
                    k = l(e.symbolHeight, b ? 12 : this.defaultLegendLength),
                    h = l(e.labelPadding, b ? 16 : 30),
                    e = l(e.itemDistance, 10);
                this.setLegendColor();
                d.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, g, k).attr({ zIndex: 1 }).add(d.legendGroup);
                this.legendItemWidth =
                    g + c + (b ? e : h);
                this.legendItemHeight = k + c + (b ? h : 0)
            },
            setState: function(a) { this.series.forEach(function(e) { e.setState(a) }) },
            visible: !0,
            setVisible: p,
            getSeriesExtremes: function() {
                var a = this.series,
                    d = a.length;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; d--;) a[d].getExtremes(), void 0 !== a[d].valueMin && (this.dataMin = Math.min(this.dataMin, a[d].valueMin), this.dataMax = Math.max(this.dataMax, a[d].valueMax))
            },
            drawCrosshair: function(a, d) {
                var c = d && d.plotX,
                    e = d && d.plotY,
                    b, g = this.pos,
                    k = this.len;
                d && (b = this.toPixels(d[d.series.colorKey]),
                    b < g ? b = g - 2 : b > g + k && (b = g + k + 2), d.plotX = b, d.plotY = this.len - b, F.prototype.drawCrosshair.call(this, a, d), d.plotX = c, d.plotY = e, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || this.cross.attr({ fill: this.crosshair.color })))
            },
            getPlotLinePath: function(a, d, c, f, b) {
                return v(b) ? this.horiz ? ["M", b - 4, this.top - 6, "L", b + 4, this.top - 6, b, this.top, "Z"] : ["M", this.left, b, "L", this.left - 6, b +
                    6, this.left - 6, b - 6, "Z"
                ] : F.prototype.getPlotLinePath.call(this, a, d, c, f)
            },
            update: function(a, d) {
                var c = this.chart,
                    e = c.legend;
                this.series.forEach(function(a) { a.isDirtyData = !0 });
                a.dataClasses && e.allItems && (e.allItems.forEach(function(a) { a.isDataClass && a.legendGroup && a.legendGroup.destroy() }), c.isDirtyLegend = !0);
                c.options[this.coll] = k(this.userOptions, a);
                F.prototype.update.call(this, a, d);
                this.legendItem && (this.setLegendColor(), e.colorizeItem(this, !0))
            },
            remove: function() {
                this.legendItem && this.chart.legend.destroyItem(this);
                F.prototype.remove.call(this)
            },
            getDataClassLegendSymbols: function() {
                var e = this,
                    d = this.chart,
                    c = this.legendItems,
                    f = d.options.legend,
                    b = f.valueDecimals,
                    k = f.valueSuffix || "",
                    h;
                c.length || this.dataClasses.forEach(function(f, g) {
                    var n = !0,
                        l = f.from,
                        t = f.to;
                    h = "";
                    void 0 === l ? h = "\x3c " : void 0 === t && (h = "\x3e ");
                    void 0 !== l && (h += a.numberFormat(l, b) + k);
                    void 0 !== l && void 0 !== t && (h += " - ");
                    void 0 !== t && (h += a.numberFormat(t, b) + k);
                    c.push(u({
                        chart: d,
                        name: h,
                        options: {},
                        drawLegendSymbol: w.drawRectangle,
                        visible: !0,
                        setState: p,
                        isDataClass: !0,
                        setVisible: function() {
                            n = this.visible = !n;
                            e.series.forEach(function(a) { a.points.forEach(function(a) { a.dataClass === g && a.setVisible(n) }) });
                            d.legend.colorizeItem(this, n)
                        }
                    }, f))
                });
                return c
            },
            name: ""
        });
        ["fill", "stroke"].forEach(function(e) { a.Fx.prototype[e + "Setter"] = function() { this.elem.attr(e, h(this.start).tweenTo(h(this.end), this.pos), null, !0) } });
        D(E, "afterGetAxes", function() {
            var a = this.options.colorAxis;
            this.colorAxis = [];
            a && new d(this, a)
        });
        D(r, "afterGetAllItems", function(e) {
            var d = [],
                c = this.chart.colorAxis[0];
            c && c.options && c.options.showInLegend && (c.options.dataClasses ? d = c.getDataClassLegendSymbols() : d.push(c), c.series.forEach(function(c) { a.erase(e.allItems, c) }));
            for (c = d.length; c--;) e.allItems.unshift(d[c])
        });
        D(r, "afterColorizeItem", function(a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) });
        D(r, "afterUpdate", function(a, d, c) { this.chart.colorAxis[0] && this.chart.colorAxis[0].update({}, c) })
    });
    K(I, "parts-map/ColorSeriesMixin.js", [I["parts/Globals.js"]], function(a) {
        var D =
            a.defined,
            F = a.noop,
            E = a.seriesTypes;
        a.colorPointMixin = {
            dataLabelOnNull: !0,
            isValid: function() { return null !== this.value && Infinity !== this.value && -Infinity !== this.value },
            setVisible: function(a) {
                var d = this,
                    h = a ? "show" : "hide";
                d.visible = !!a;
                ["graphic", "dataLabel"].forEach(function(a) { if (d[a]) d[a][h]() })
            },
            setState: function(h) {
                a.Point.prototype.setState.call(this, h);
                this.graphic && this.graphic.attr({ zIndex: "hover" === h ? 1 : 0 })
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: F,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: E.column.prototype.pointAttribs,
            translateColors: function() {
                var a = this,
                    d = this.options.nullColor,
                    u = this.colorAxis,
                    v = this.colorKey;
                this.data.forEach(function(h) { var r = h[v]; if (r = h.options.color || (h.isNull ? d : u && void 0 !== r ? u.toColor(r, h) : h.color || a.color)) h.color = r })
            },
            colorAttribs: function(a) {
                var d = {};
                D(a.color) && (d[this.colorProp || "fill"] = a.color);
                return d
            }
        }
    });
    K(I, "parts-map/MapNavigation.js", [I["parts/Globals.js"]], function(a) {
        function D(a) { a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) }

        function F(a) { this.init(a) }
        var E = a.addEvent,
            h = a.Chart,
            d = a.doc,
            u = a.extend,
            v = a.merge,
            r = a.pick;
        F.prototype.init = function(a) {
            this.chart = a;
            a.mapNavButtons = []
        };
        F.prototype.update = function(d) {
            var h = this.chart,
                k = h.options.mapNavigation,
                l, e, g, c, f, b = function(a) {
                    this.handler.call(h, a);
                    D(a)
                },
                n = h.mapNavButtons;
            d && (k = h.options.mapNavigation =
                v(h.options.mapNavigation, d));
            for (; n.length;) n.pop().destroy();
            r(k.enableButtons, k.enabled) && !h.renderer.forExport && a.objectEach(k.buttons, function(a, d) {
                l = v(k.buttonOptions, a);
                h.styledMode || (e = l.theme, e.style = v(l.theme.style, l.style), c = (g = e.states) && g.hover, f = g && g.select);
                a = h.renderer.button(l.text, 0, 0, b, e, c, f, 0, "zoomIn" === d ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + { zoomIn: "zoom-in", zoomOut: "zoom-out" }[d]).attr({
                    width: l.width,
                    height: l.height,
                    title: h.options.lang[d],
                    padding: l.padding,
                    zIndex: 5
                }).add();
                a.handler = l.onclick;
                a.align(u(l, { width: a.width, height: 2 * a.height }), null, l.alignTo);
                E(a.element, "dblclick", D);
                n.push(a)
            });
            this.updateEvents(k)
        };
        F.prototype.updateEvents = function(a) {
            var h = this.chart;
            r(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || E(h.container, "dblclick", function(a) { h.pointer.onContainerDblClick(a) }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            r(a.enableMouseWheelZoom, a.enabled) ?
                this.unbindMouseWheel = this.unbindMouseWheel || E(h.container, void 0 === d.onmousewheel ? "DOMMouseScroll" : "mousewheel", function(a) {
                    h.pointer.onContainerMouseWheel(a);
                    D(a);
                    return !1
                }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        u(h.prototype, {
            fitToBox: function(a, d) {
                [
                    ["x", "width"],
                    ["y", "height"]
                ].forEach(function(k) {
                    var h = k[0];
                    k = k[1];
                    a[h] + a[k] > d[h] + d[k] && (a[k] > d[k] ? (a[k] = d[k], a[h] = d[h]) : a[h] = d[h] + d[k] - a[k]);
                    a[k] > d[k] && (a[k] = d[k]);
                    a[h] < d[h] && (a[h] = d[h])
                });
                return a
            },
            mapZoom: function(a,
                d, k, h, e) {
                var g = this.xAxis[0],
                    c = g.max - g.min,
                    f = r(d, g.min + c / 2),
                    b = c * a,
                    c = this.yAxis[0],
                    n = c.max - c.min,
                    l = r(k, c.min + n / 2),
                    n = n * a,
                    f = this.fitToBox({ x: f - b * (h ? (h - g.pos) / g.len : .5), y: l - n * (e ? (e - c.pos) / c.len : .5), width: b, height: n }, { x: g.dataMin, y: c.dataMin, width: g.dataMax - g.dataMin, height: c.dataMax - c.dataMin }),
                    b = f.x <= g.dataMin && f.width >= g.dataMax - g.dataMin && f.y <= c.dataMin && f.height >= c.dataMax - c.dataMin;
                h && (g.fixTo = [h - g.pos, d]);
                e && (c.fixTo = [e - c.pos, k]);
                void 0 === a || b ? (g.setExtremes(void 0, void 0, !1), c.setExtremes(void 0,
                    void 0, !1)) : (g.setExtremes(f.x, f.x + f.width, !1), c.setExtremes(f.y, f.y + f.height, !1));
                this.redraw()
            }
        });
        E(h, "beforeRender", function() {
            this.mapNavigation = new F(this);
            this.mapNavigation.update()
        });
        a.MapNavigation = F
    });
    K(I, "parts-map/MapPointer.js", [I["parts/Globals.js"]], function(a) {
        var D = a.extend,
            F = a.pick,
            E = a.Pointer;
        a = a.wrap;
        D(E.prototype, {
            onContainerDblClick: function(a) {
                var d = this.chart;
                a = this.normalize(a);
                d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") &&
                    d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            },
            onContainerMouseWheel: function(a) {
                var d = this.chart,
                    h;
                a = this.normalize(a);
                h = a.detail || -(a.wheelDelta / 120);
                d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, h), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        });
        a(E.prototype,
            "zoomOption",
            function(a) {
                var d = this.chart.options.mapNavigation;
                F(d.enableTouchZoom, d.enabled) && (this.chart.options.chart.pinchType = "xy");
                a.apply(this, [].slice.call(arguments, 1))
            });
        a(E.prototype, "pinchTranslate", function(a, d, u, v, r, w, p) { a.call(this, d, u, v, r, w, p); "map" === this.chart.options.chart.type && this.hasZoom && (a = v.scaleX > v.scaleY, this.pinchTranslateDirection(!a, d, u, v, r, w, p, a ? v.scaleX : v.scaleY)) })
    });
    K(I, "parts-map/MapSeries.js", [I["parts/Globals.js"]], function(a) {
        var D = a.colorPointMixin,
            F = a.extend,
            E = a.isNumber,
            h = a.merge,
            d = a.noop,
            u = a.pick,
            v = a.isArray,
            r = a.Point,
            w = a.Series,
            p = a.seriesType,
            k = a.seriesTypes,
            l = a.splat;
        p("map", "scatter", {
            animation: !1,
            dataLabels: { crop: !1, formatter: function() { return this.point.value }, inside: !0, overflow: !1, padding: 0, verticalAlign: "middle" },
            marker: null,
            nullColor: "#f7f7f7",
            stickyTracking: !1,
            tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e" },
            turboThreshold: 0,
            allAreas: !0,
            borderColor: "#cccccc",
            borderWidth: 1,
            joinBy: "hc-key",
            states: {
                hover: {
                    halo: null,
                    brightness: .2
                },
                normal: { animation: !0 },
                select: { color: "#cccccc" }
            }
        }, h(a.colorSeriesMixin, {
            type: "map",
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: d,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function(e) {
                var d = Number.MAX_VALUE,
                    c = -d,
                    f = d,
                    b = -d,
                    k = d,
                    h = d,
                    l = this.xAxis,
                    p = this.yAxis,
                    r;
                (e || []).forEach(function(e) {
                    if (e.path) {
                        "string" === typeof e.path && (e.path = a.splitPath(e.path));
                        var g = e.path || [],
                            n = g.length,
                            l = !1,
                            q = -d,
                            m = d,
                            p = -d,
                            t = d,
                            w = e.properties;
                        if (!e._foundBox) {
                            for (; n--;) E(g[n]) &&
                                (l ? (q = Math.max(q, g[n]), m = Math.min(m, g[n])) : (p = Math.max(p, g[n]), t = Math.min(t, g[n])), l = !l);
                            e._midX = m + (q - m) * u(e.middleX, w && w["hc-middle-x"], .5);
                            e._midY = t + (p - t) * u(e.middleY, w && w["hc-middle-y"], .5);
                            e._maxX = q;
                            e._minX = m;
                            e._maxY = p;
                            e._minY = t;
                            e.labelrank = u(e.labelrank, (q - m) * (p - t));
                            e._foundBox = !0
                        }
                        c = Math.max(c, e._maxX);
                        f = Math.min(f, e._minX);
                        b = Math.max(b, e._maxY);
                        k = Math.min(k, e._minY);
                        h = Math.min(e._maxX - e._minX, e._maxY - e._minY, h);
                        r = !0
                    }
                });
                r && (this.minY = Math.min(k, u(this.minY, d)), this.maxY = Math.max(b, u(this.maxY, -d)), this.minX = Math.min(f, u(this.minX, d)), this.maxX = Math.max(c, u(this.maxX, -d)), l && void 0 === l.options.minRange && (l.minRange = Math.min(5 * h, (this.maxX - this.minX) / 5, l.minRange || d)), p && void 0 === p.options.minRange && (p.minRange = Math.min(5 * h, (this.maxY - this.minY) / 5, p.minRange || d)))
            },
            hasData: function() { return !!this.processedXData.length },
            getExtremes: function() {
                w.prototype.getExtremes.call(this, this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function(a) {
                var e = !1,
                    c = this.xAxis,
                    d = this.yAxis,
                    b = c.min,
                    k = c.transA,
                    c = c.minPixelPadding,
                    h = d.min,
                    l = d.transA,
                    d = d.minPixelPadding,
                    p, r = [];
                if (a)
                    for (p = a.length; p--;) E(a[p]) ? (r[p] = e ? (a[p] - b) * k + c : (a[p] - h) * l + d, e = !e) : r[p] = a[p];
                return r
            },
            setData: function(e, d, c, f) {
                var b = this.options,
                    g = this.chart.options.chart,
                    k = g && g.map,
                    p = b.mapData,
                    r = b.joinBy,
                    u = null === r,
                    q = b.keys || this.pointArrayMap,
                    A = [],
                    z = {},
                    D = this.chart.mapTransforms;
                !p && k &&
                    (p = "string" === typeof k ? a.maps[k] : k);
                u && (r = "_i");
                r = this.joinBy = l(r);
                r[1] || (r[1] = r[0]);
                e && e.forEach(function(c, d) {
                    var f = 0;
                    if (E(c)) e[d] = { value: c };
                    else if (v(c)) { e[d] = {};!b.keys && c.length > q.length && "string" === typeof c[0] && (e[d]["hc-key"] = c[0], ++f); for (var g = 0; g < q.length; ++g, ++f) q[g] && void 0 !== c[f] && (0 < q[g].indexOf(".") ? a.Point.prototype.setNestedProperty(e[d], c[f], q[g]) : e[d][q[g]] = c[f]) }
                    u && (e[d]._i = d)
                });
                this.getBox(e);
                (this.chart.mapTransforms = D = g && g.mapTransforms || p && p["hc-transform"] || D) && a.objectEach(D,
                    function(a) { a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation)) });
                if (p) {
                    "FeatureCollection" === p.type && (this.mapTitle = p.title, p = a.geojson(p, this.type, this));
                    this.mapData = p;
                    this.mapMap = {};
                    for (D = 0; D < p.length; D++) g = p[D], k = g.properties, g._i = D, r[0] && k && k[r[0]] && (g[r[0]] = k[r[0]]), z[g[r[0]]] = g;
                    this.mapMap = z;
                    e && r[1] && e.forEach(function(a) { z[a[r[1]]] && A.push(z[a[r[1]]]) });
                    b.allAreas ? (this.getBox(p), e = e || [], r[1] && e.forEach(function(a) { A.push(a[r[1]]) }), A = "|" + A.map(function(a) {
                        return a &&
                            a[r[0]]
                    }).join("|") + "|", p.forEach(function(a) { r[0] && -1 !== A.indexOf("|" + a[r[0]] + "|") || (e.push(h(a, { value: null })), f = !1) })) : this.getBox(A)
                }
                w.prototype.setData.call(this, e, d, c, f)
            },
            drawGraph: d,
            drawDataLabels: d,
            doFullTranslate: function() { return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans },
            translate: function() {
                var a = this,
                    d = a.xAxis,
                    c = a.yAxis,
                    f = a.doFullTranslate();
                a.generatePoints();
                a.data.forEach(function(b) {
                    b.plotX = d.toPixels(b._midX, !0);
                    b.plotY = c.toPixels(b._midY, !0);
                    f && (b.shapeType = "path", b.shapeArgs = { d: a.translatePath(b.path) })
                });
                a.translateColors()
            },
            pointAttribs: function(a, d) {
                d = a.series.chart.styledMode ? this.colorAttribs(a) : k.column.prototype.pointAttribs.call(this, a, d);
                d["stroke-width"] = u(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
                return d
            },
            drawPoints: function() {
                var a = this,
                    d = a.xAxis,
                    c = a.yAxis,
                    f = a.group,
                    b = a.chart,
                    h = b.renderer,
                    l, p, r, w, q = this.baseTrans,
                    v, z, E, D, m;
                a.transformGroup || (a.transformGroup =
                    h.g().attr({ scaleX: 1, scaleY: 1 }).add(f), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (b.hasRendered && !b.styledMode && a.points.forEach(function(b) { b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill) }), a.group = a.transformGroup, k.column.prototype.drawPoints.apply(a), a.group = f, a.points.forEach(function(c) {
                    c.graphic && (c.name && c.graphic.addClass("highcharts-name-" + c.name.replace(/ /g, "-").toLowerCase()), c.properties && c.properties["hc-key"] && c.graphic.addClass("highcharts-key-" + c.properties["hc-key"].toLowerCase()),
                        b.styledMode && c.graphic.css(a.pointAttribs(c, c.selected && "select")))
                }), this.baseTrans = { originX: d.min - d.minPixelPadding / d.transA, originY: c.min - c.minPixelPadding / c.transA + (c.reversed ? 0 : c.len / c.transA), transAX: d.transA, transAY: c.transA }, this.transformGroup.animate({ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 })) : (l = d.transA / q.transAX, p = c.transA / q.transAY, r = d.toPixels(q.originX, !0), w = c.toPixels(q.originY, !0), .99 < l && 1.01 > l && .99 < p && 1.01 > p && (p = l = 1, r = Math.round(r), w = Math.round(w)), v = this.transformGroup, b.renderer.globalAnimation ?
                    (z = v.attr("translateX"), E = v.attr("translateY"), D = v.attr("scaleX"), m = v.attr("scaleY"), v.attr({ animator: 0 }).animate({ animator: 1 }, { step: function(a, b) { v.attr({ translateX: z + (r - z) * b.pos, translateY: E + (w - E) * b.pos, scaleX: D + (l - D) * b.pos, scaleY: m + (p - m) * b.pos }) } })) : v.attr({ translateX: r, translateY: w, scaleX: l, scaleY: p }));
                b.styledMode || f.element.setAttribute("stroke-width", u(a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (l || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function() {
                w.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function() {
                var a = this,
                    d = w.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function() { d.call(a) }) : d.call(a)
            },
            animate: function(a) {
                var e = this.options.animation,
                    c = this.group,
                    d = this.xAxis,
                    b = this.yAxis,
                    k = d.pos,
                    h = b.pos;
                this.chart.renderer.isSVG && (!0 === e && (e = { duration: 1E3 }), a ? c.attr({ translateX: k + d.len / 2, translateY: h + b.len / 2, scaleX: .001, scaleY: .001 }) : (c.animate({ translateX: k, translateY: h, scaleX: 1, scaleY: 1 },
                    e), this.animate = null))
            },
            animateDrilldown: function(a) {
                var e = this.chart.plotBox,
                    c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = c.bBox,
                    b = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / e.width, d.height / e.height), c.shapeArgs = { scaleX: a, scaleY: a, translateX: d.x, translateY: d.y }, this.points.forEach(function(a) { a.graphic && a.graphic.attr(c.shapeArgs).animate({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, b) }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function(a) { k.column.prototype.animateDrillupFrom.call(this, a) },
            animateDrillupTo: function(a) { k.column.prototype.animateDrillupTo.call(this, a) }
        }), F({
            applyOptions: function(a, d) {
                a = r.prototype.applyOptions.call(this, a, d);
                d = this.series;
                var c = d.joinBy;
                d.mapData && ((c = void 0 !== a[c[1]] && d.mapMap[a[c[1]]]) ? (d.xyFromShape && (a.x = c._midX, a.y = c._midY), F(a, c)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function(d) {
                a.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) r.prototype.onMouseOver.call(this,
                    d);
                else this.series.onMouseOut(d)
            },
            zoomTo: function() {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, D))
    });
    K(I, "parts-map/MapLineSeries.js", [I["parts/Globals.js"]], function(a) {
        var D = a.seriesType,
            F = a.seriesTypes;
        D("mapline", "map", { lineWidth: 1, fillColor: "none" }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" },
            pointAttribs: function(a, h) {
                a = F.map.prototype.pointAttribs.call(this,
                    a, h);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: F.line.prototype.drawLegendSymbol
        })
    });
    K(I, "parts-map/MapPointSeries.js", [I["parts/Globals.js"]], function(a) {
        var D = a.merge,
            F = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", { dataLabels: { crop: !1, defer: !1, enabled: !0, formatter: function() { return this.point.name }, overflow: !1, style: { color: "#000000" } } }, { type: "mappoint", forceDL: !0 }, {
            applyOptions: function(a, h) {
                a = void 0 !== a.lat && void 0 !== a.lon ? D(a, this.series.chart.fromLatLonToPoint(a)) : a;
                return F.prototype.applyOptions.call(this,
                    a, h)
            }
        })
    });
    K(I, "parts-more/BubbleLegend.js", [I["parts/Globals.js"]], function(a) {
        var D = a.Series,
            F = a.Legend,
            E = a.Chart,
            h = a.addEvent,
            d = a.wrap,
            u = a.color,
            v = a.isNumber,
            r = a.numberFormat,
            w = a.objectEach,
            p = a.merge,
            k = a.noop,
            l = a.pick,
            e = a.stableSort,
            g = a.setOptions,
            c = a.arrayMin,
            f = a.arrayMax;
        g({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: {
                        className: void 0,
                        allowOverlap: !1,
                        format: "",
                        formatter: void 0,
                        align: "right",
                        style: { fontSize: 10, color: void 0 },
                        x: 0,
                        y: 0
                    },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0
                }
            }
        });
        a.BubbleLegend = function(a, c) { this.init(a, c) };
        a.BubbleLegend.prototype = {
            init: function(a, c) {
                this.options = a;
                this.visible = !0;
                this.chart = c.chart;
                this.legend = c
            },
            setState: k,
            addToLegend: function(a) { a.splice(this.options.legendIndex, 0, this) },
            drawLegendSymbol: function(a) {
                var b =
                    this.chart,
                    c = this.options,
                    d = l(a.options.itemDistance, 20),
                    f, g = c.ranges;
                f = c.connectorDistance;
                this.fontMetrics = b.renderer.fontMetrics(c.labels.style.fontSize.toString() + "px");
                g && g.length && v(g[0].value) ? (e(g, function(a, b) { return b.value - a.value }), this.ranges = g, this.setOptions(), this.render(), b = this.getMaxLabelSize(), g = this.ranges[0].radius, a = 2 * g, f = f - g + b.width, f = 0 < f ? f : 0, this.maxLabel = b, this.movementX = "left" === c.labels.align ? f : 0, this.legendItemWidth = a + f + d, this.legendItemHeight = a + this.fontMetrics.h / 2) :
                    a.options.bubbleLegend.autoRanges = !0
            },
            setOptions: function() {
                var a = this.ranges,
                    c = this.options,
                    d = this.chart.series[c.seriesIndex],
                    e = this.legend.baseline,
                    f = { "z-index": c.zIndex, "stroke-width": c.borderWidth },
                    g = { "z-index": c.zIndex, "stroke-width": c.connectorWidth },
                    k = this.getLabelStyles(),
                    h = d.options.marker.fillOpacity,
                    r = this.chart.styledMode;
                a.forEach(function(b, n) {
                    r || (f.stroke = l(b.borderColor, c.borderColor, d.color), f.fill = l(b.color, c.color, 1 !== h ? u(d.color).setOpacity(h).get("rgba") : d.color), g.stroke = l(b.connectorColor,
                        c.connectorColor, d.color));
                    a[n].radius = this.getRangeRadius(b.value);
                    a[n] = p(a[n], { center: a[0].radius - a[n].radius + e });
                    r || p(!0, a[n], { bubbleStyle: p(!1, f), connectorStyle: p(!1, g), labelStyle: k })
                }, this)
            },
            getLabelStyles: function() {
                var a = this.options,
                    c = {},
                    d = "left" === a.labels.align,
                    e = this.legend.options.rtl;
                w(a.labels.style, function(a, b) { "color" !== b && "fontSize" !== b && "z-index" !== b && (c[b] = a) });
                return p(!1, c, {
                    "font-size": a.labels.style.fontSize,
                    fill: l(a.labels.style.color, "#000000"),
                    "z-index": a.zIndex,
                    align: e ||
                        d ? "right" : "left"
                })
            },
            getRangeRadius: function(a) { var b = this.options; return this.chart.series[this.options.seriesIndex].getRadius.call(this, b.ranges[b.ranges.length - 1].value, b.ranges[0].value, b.minSize, b.maxSize, a) },
            render: function() {
                var a = this.chart.renderer,
                    c = this.options.zThreshold;
                this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] });
                this.legendSymbol = a.g("bubble-legend");
                this.legendItem = a.g("bubble-legend-item");
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function(a) {
                    a.value >=
                        c && this.renderRange(a)
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            },
            renderRange: function(a) {
                var b = this.options,
                    c = b.labels,
                    d = this.chart.renderer,
                    e = this.symbols,
                    f = e.labels,
                    g = a.center,
                    k = Math.abs(a.radius),
                    h = b.connectorDistance,
                    l = c.align,
                    p = c.style.fontSize,
                    h = this.legend.options.rtl || "left" === l ? -h : h,
                    c = b.connectorWidth,
                    m = this.ranges[0].radius,
                    r = g - k - b.borderWidth / 2 + c / 2,
                    w, p = p / 2 - (this.fontMetrics.h - p) / 2,
                    u = d.styledMode;
                "center" === l && (h = 0,
                    b.connectorDistance = 0, a.labelStyle.align = "center");
                l = r + b.labels.y;
                w = m + h + b.labels.x;
                e.bubbleItems.push(d.circle(m, g + ((r % 1 ? 1 : .5) - (c % 2 ? 0 : .5)), k).attr(u ? {} : a.bubbleStyle).addClass((u ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (b.className || "")).add(this.legendSymbol));
                e.connectors.push(d.path(d.crispLine(["M", m, r, "L", m + h, r], b.connectorWidth)).attr(u ? {} : a.connectorStyle).addClass((u ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " +
                    (b.connectorClassName || "")).add(this.legendSymbol));
                a = d.text(this.formatLabel(a), w, l + p).attr(u ? {} : a.labelStyle).addClass("highcharts-bubble-legend-labels " + (b.labels.className || "")).add(this.legendSymbol);
                f.push(a);
                a.placed = !0;
                a.alignAttr = { x: w, y: l + p }
            },
            getMaxLabelSize: function() {
                var a, c;
                this.symbols.labels.forEach(function(b) {
                    c = b.getBBox(!0);
                    a = a ? c.width > a.width ? c : a : c
                });
                return a || {}
            },
            formatLabel: function(b) {
                var c = this.options,
                    d = c.labels.formatter;
                return (c = c.labels.format) ? a.format(c, b) : d ? d.call(b) :
                    r(b.value, 1)
            },
            hideOverlappingLabels: function() {
                var a = this.chart,
                    c = this.symbols;
                !this.options.labels.allowOverlap && c && (a.hideOverlappingLabels(c.labels), c.labels.forEach(function(a, b) { a.newOpacity ? a.newOpacity !== a.oldOpacity && c.connectors[b].show() : c.connectors[b].hide() }))
            },
            getRanges: function() {
                var a = this.legend.bubbleLegend,
                    d, e = a.options.ranges,
                    g, k = Number.MAX_VALUE,
                    h = -Number.MAX_VALUE;
                a.chart.series.forEach(function(a) {
                    a.isBubble && !a.ignoreSeries && (g = a.zData.filter(v), g.length && (k = l(a.options.zMin,
                        Math.min(k, Math.max(c(g), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), h = l(a.options.zMax, Math.max(h, f(g)))))
                });
                d = k === h ? [{ value: h }] : [{ value: k }, { value: (k + h) / 2 }, { value: h, autoRanges: !0 }];
                e.length && e[0].radius && d.reverse();
                d.forEach(function(a, b) { e && e[b] && (d[b] = p(!1, e[b], a)) });
                return d
            },
            predictBubbleSizes: function() {
                var a = this.chart,
                    c = this.fontMetrics,
                    d = a.legend.options,
                    e = "horizontal" === d.layout,
                    f = e ? a.legend.lastLineHeight : 0,
                    g = a.plotSizeX,
                    k = a.plotSizeY,
                    h = a.series[this.options.seriesIndex],
                    a = Math.ceil(h.minPxSize),
                    l = Math.ceil(h.maxPxSize),
                    h = h.options.maxSize,
                    p = Math.min(k, g);
                if (d.floating || !/%$/.test(h)) c = l;
                else if (h = parseFloat(h), c = (p + f - c.h / 2) * h / 100 / (h / 100 + 1), e && k - c >= g || !e && g - c >= k) c = l;
                return [a, Math.ceil(c)]
            },
            updateRanges: function(a, c) {
                var b = this.legend.options.bubbleLegend;
                b.minSize = a;
                b.maxSize = c;
                b.ranges = this.getRanges()
            },
            correctSizes: function() {
                var a = this.legend,
                    c = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(c.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize,
                    c.maxPxSize), a.render())
            }
        };
        h(a.Legend, "afterGetAllItems", function(b) {
            var c = this.bubbleLegend,
                d = this.options,
                e = d.bubbleLegend,
                f = this.chart.getVisibleBubbleSeriesIndex();
            c && c.ranges && c.ranges.length && (e.ranges.length && (e.autoRanges = !!e.ranges[0].autoRanges), this.destroyItem(c));
            0 <= f && d.enabled && e.enabled && (e.seriesIndex = f, this.bubbleLegend = new a.BubbleLegend(e, this), this.bubbleLegend.addToLegend(b.allItems))
        });
        E.prototype.getVisibleBubbleSeriesIndex = function() {
            for (var a = this.series, c = 0; c < a.length;) {
                if (a[c] &&
                    a[c].isBubble && a[c].visible && a[c].zData.length) return c;
                c++
            }
            return -1
        };
        F.prototype.getLinesHeights = function() {
            var a = this.allItems,
                c = [],
                d, e = a.length,
                f, g = 0;
            for (f = 0; f < e; f++)
                if (a[f].legendItemHeight && (a[f].itemHeight = a[f].legendItemHeight), a[f] === a[e - 1] || a[f + 1] && a[f]._legendItemPos[1] !== a[f + 1]._legendItemPos[1]) {
                    c.push({ height: 0 });
                    d = c[c.length - 1];
                    for (g; g <= f; g++) a[g].itemHeight > d.height && (d.height = a[g].itemHeight);
                    d.step = f
                }
            return c
        };
        F.prototype.retranslateItems = function(a) {
            var c, b, d, e = this.options.rtl,
                f = 0;
            this.allItems.forEach(function(g, k) {
                c = g.legendGroup.translateX;
                b = g._legendItemPos[1];
                if ((d = g.movementX) || e && g.ranges) d = e ? c - g.options.maxSize / 2 : c + d, g.legendGroup.attr({ translateX: d });
                k > a[f].step && f++;
                g.legendGroup.attr({ translateY: Math.round(b + a[f].height / 2) });
                g._legendItemPos[1] = b + a[f].height / 2
            })
        };
        h(D, "legendItemClick", function() {
            var a = this.chart,
                c = this.visible,
                d = this.chart.legend;
            d && d.bubbleLegend && (this.visible = !c, this.ignoreSeries = c, a = 0 <= a.getVisibleBubbleSeriesIndex(), d.bubbleLegend.visible !==
                a && (d.update({ bubbleLegend: { enabled: a } }), d.bubbleLegend.visible = a), this.visible = c)
        });
        d(E.prototype, "drawChartBox", function(a, c, d) {
            var b = this.legend,
                e = 0 <= this.getVisibleBubbleSeriesIndex(),
                f;
            b && b.options.enabled && b.bubbleLegend && b.options.bubbleLegend.autoRanges && e ? (f = b.bubbleLegend.options, e = b.bubbleLegend.predictBubbleSizes(), b.bubbleLegend.updateRanges(e[0], e[1]), f.placed || (b.group.placed = !1, b.allItems.forEach(function(a) { a.legendGroup.translateY = null })), b.render(), this.getMargins(), this.axes.forEach(function(a) {
                a.render();
                f.placed || (a.setScale(), a.updateNames(), w(a.ticks, function(a) {
                    a.isNew = !0;
                    a.isNewLabel = !0
                }))
            }), f.placed = !0, this.getMargins(), a.call(this, c, d), b.bubbleLegend.correctSizes(), b.retranslateItems(b.getLinesHeights())) : (a.call(this, c, d), b && b.options.enabled && b.bubbleLegend && (b.render(), b.retranslateItems(b.getLinesHeights())))
        })
    });
    K(I, "parts-more/BubbleSeries.js", [I["parts/Globals.js"]], function(a) {
        var D = a.arrayMax,
            F = a.arrayMin,
            E = a.Axis,
            h = a.color,
            d = a.isNumber,
            u = a.noop,
            v = a.pick,
            r = a.pInt,
            w = a.Point,
            p = a.Series,
            k = a.seriesType,
            l = a.seriesTypes;
        k("bubble", "scatter", { dataLabels: { formatter: function() { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z" }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            isBubble: !0,
            pointAttribs: function(a, d) {
                var c = this.options.marker.fillOpacity;
                a = p.prototype.pointAttribs.call(this, a, d);
                1 !== c && (a.fill = h(a.fill).setOpacity(c).get("rgba"));
                return a
            },
            getRadii: function(a, d, c) {
                var e, b = this.zData,
                    g = c.minPxSize,
                    k = c.maxPxSize,
                    h = [],
                    l;
                e = 0;
                for (c = b.length; e < c; e++) l = b[e], h.push(this.getRadius(a, d, g, k, l));
                this.radii = h
            },
            getRadius: function(a, g, c, f, b) {
                var e = this.options,
                    k =
                    "width" !== e.sizeBy,
                    h = e.zThreshold,
                    l = g - a;
                e.sizeByAbsoluteValue && null !== b && (b = Math.abs(b - h), l = Math.max(g - h, Math.abs(a - h)), a = 0);
                d(b) ? b < a ? c = c / 2 - 1 : (a = 0 < l ? (b - a) / l : .5, k && 0 <= a && (a = Math.sqrt(a)), c = Math.ceil(c + a * (f - c)) / 2) : c = null;
                return c
            },
            animate: function(a) {
                !a && this.points.length < this.options.animationLimit && (this.points.forEach(function(a) {
                        var c = a.graphic,
                            d;
                        c && c.width && (d = { x: c.x, y: c.y, width: c.width, height: c.height }, c.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), c.animate(d, this.options.animation))
                    }, this),
                    this.animate = null)
            },
            hasData: function() { return !!this.processedXData.length },
            translate: function() {
                var e, g = this.data,
                    c, f, b = this.radii;
                l.scatter.prototype.translate.call(this);
                for (e = g.length; e--;) c = g[e], f = b ? b[e] : 0, d(f) && f >= this.minPxSize / 2 ? (c.marker = a.extend(c.marker, { radius: f, width: 2 * f, height: 2 * f }), c.dlBox = { x: c.plotX - f, y: c.plotY - f, width: 2 * f, height: 2 * f }) : c.shapeArgs = c.plotY = c.dlBox = void 0
            },
            alignDataLabel: l.column.prototype.alignDataLabel,
            buildKDTree: u,
            applyZones: u
        }, {
            haloPath: function(a) {
                return w.prototype.haloPath.call(this,
                    0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
            },
            ttBelow: !1
        });
        E.prototype.beforePadding = function() {
            var e = this,
                g = this.len,
                c = this.chart,
                f = 0,
                b = g,
                k = this.isXAxis,
                h = k ? "xData" : "yData",
                l = this.min,
                p = {},
                w = Math.min(c.plotWidth, c.plotHeight),
                q = Number.MAX_VALUE,
                u = -Number.MAX_VALUE,
                z = this.max - l,
                E = g / z,
                H = [];
            this.series.forEach(function(b) {
                var d = b.options;
                !b.bubblePadding || !b.visible && c.options.chart.ignoreHiddenSeries || (e.allowZoomOutside = !0, H.push(b), k && (["minSize", "maxSize"].forEach(function(a) {
                    var b = d[a],
                        c = /%$/.test(b),
                        b = r(b);
                    p[a] = c ? w * b / 100 : b
                }), b.minPxSize = p.minSize, b.maxPxSize = Math.max(p.maxSize, p.minSize), b = b.zData.filter(a.isNumber), b.length && (q = v(d.zMin, Math.min(q, Math.max(F(b), !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE))), u = v(d.zMax, Math.max(u, D(b))))))
            });
            H.forEach(function(a) {
                var c = a[h],
                    g = c.length,
                    m;
                k && a.getRadii(q, u, a);
                if (0 < z)
                    for (; g--;) d(c[g]) && e.dataMin <= c[g] && c[g] <= e.dataMax && (m = a.radii[g], f = Math.min((c[g] - l) * E - m, f), b = Math.max((c[g] - l) * E + m, b))
            });
            H.length && 0 < z && !this.isLog && (b -= g, E *= (g + Math.max(0,
                f) - Math.min(b, g)) / g, [
                ["min", "userMin", f],
                ["max", "userMax", b]
            ].forEach(function(a) { void 0 === v(e.options[a[0]], e[a[1]]) && (e[a[0]] += a[2] / E) }))
        }
    });
    K(I, "parts-map/MapBubbleSeries.js", [I["parts/Globals.js"]], function(a) {
        var D = a.merge,
            F = a.Point,
            E = a.seriesType,
            h = a.seriesTypes;
        h.bubble && E("mapbubble", "bubble", { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } }, { xyFromShape: !0, type: "mapbubble", pointArrayMap: ["z"], getMapData: h.map.prototype.getMapData, getBox: h.map.prototype.getBox, setData: h.map.prototype.setData }, { applyOptions: function(a, u) { return a && void 0 !== a.lat && void 0 !== a.lon ? F.prototype.applyOptions.call(this, D(a, this.series.chart.fromLatLonToPoint(a)), u) : h.map.prototype.pointClass.prototype.applyOptions.call(this, a, u) }, isValid: function() { return "number" === typeof this.z }, ttBelow: !1 })
    });
    K(I, "parts-map/HeatmapSeries.js", [I["parts/Globals.js"]], function(a) {
        var D = a.colorPointMixin,
            F = a.merge,
            E = a.noop,
            h = a.pick,
            d = a.Series,
            u = a.seriesType,
            v = a.seriesTypes;
        u("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: { formatter: function() { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 },
            marker: null,
            pointRange: null,
            tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e" },
            states: { hover: { halo: !1, brightness: .2 } }
        }, F(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                var a;
                v.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = h(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function() {
                var a = this.options,
                    d = this.xAxis,
                    p = this.yAxis,
                    k = a.pointPadding || 0,
                    l = function(a, c, d) { return Math.min(Math.max(c, a), d) },
                    e = this.pointPlacementToXValue();
                this.generatePoints();
                this.points.forEach(function(g) {
                    var c = (a.colsize || 1) / 2,
                        f = (a.rowsize || 1) / 2,
                        b = l(Math.round(d.len - d.translate(g.x - c, 0, 1, 0, 1, -e)), -d.len, 2 * d.len),
                        c = l(Math.round(d.len - d.translate(g.x + c, 0, 1, 0, 1, -e)), -d.len, 2 * d.len),
                        n = l(Math.round(p.translate(g.y - f, 0, 1, 0, 1)), -p.len, 2 * p.len),
                        f = l(Math.round(p.translate(g.y + f, 0, 1, 0, 1)), -p.len, 2 * p.len),
                        r = h(g.pointPadding, k);
                    g.plotX = g.clientX = (b + c) / 2;
                    g.plotY = (n + f) / 2;
                    g.shapeType = "rect";
                    g.shapeArgs = { x: Math.min(b, c) + r, y: Math.min(n, f) + r, width: Math.abs(c - b) - 2 * r, height: Math.abs(f - n) - 2 * r }
                });
                this.translateColors()
            },
            drawPoints: function() {
                var a = this.chart.styledMode ? "css" : "attr";
                v.column.prototype.drawPoints.call(this);
                this.points.forEach(function(d) { d.graphic[a](this.colorAttribs(d)) }, this)
            },
            hasData: function() { return !!this.processedXData.length },
            getValidPoints: function(a, h) { return d.prototype.getValidPoints.call(this, a, h, !0) },
            animate: E,
            getBox: E,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: v.column.prototype.alignDataLabel,
            getExtremes: function() {
                d.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                d.prototype.getExtremes.call(this)
            }
        }), a.extend({
            haloPath: function(a) {
                if (!a) return [];
                var d = this.shapeArgs;
                return ["M", d.x - a, d.y - a, "L", d.x - a, d.y + d.height + a, d.x + d.width + a, d.y + d.height +
                    a, d.x + d.width + a, d.y - a, "Z"
                ]
            }
        }, D))
    });
    K(I, "parts-map/GeoJSON.js", [I["parts/Globals.js"]], function(a) {
        function D(a, d) {
            var h, k, l, e = !1,
                g = a.x,
                c = a.y;
            a = 0;
            for (h = d.length - 1; a < d.length; h = a++) k = d[a][1] > c, l = d[h][1] > c, k !== l && g < (d[h][0] - d[a][0]) * (c - d[a][1]) / (d[h][1] - d[a][1]) + d[a][0] && (e = !e);
            return e
        }
        var F = a.Chart,
            E = a.extend,
            h = a.format,
            d = a.merge,
            u = a.win,
            v = a.wrap;
        F.prototype.transformFromLatLon = function(d, h) {
            if (void 0 === u.proj4) return a.error(21, !1, this), { x: 0, y: null };
            d = u.proj4(h.crs, [d.lon, d.lat]);
            var p = h.cosAngle ||
                h.rotation && Math.cos(h.rotation),
                k = h.sinAngle || h.rotation && Math.sin(h.rotation);
            d = h.rotation ? [d[0] * p + d[1] * k, -d[0] * k + d[1] * p] : d;
            return { x: ((d[0] - (h.xoffset || 0)) * (h.scale || 1) + (h.xpan || 0)) * (h.jsonres || 1) + (h.jsonmarginX || 0), y: (((h.yoffset || 0) - d[1]) * (h.scale || 1) + (h.ypan || 0)) * (h.jsonres || 1) - (h.jsonmarginY || 0) }
        };
        F.prototype.transformToLatLon = function(d, h) {
            if (void 0 === u.proj4) a.error(21, !1, this);
            else {
                d = {
                    x: ((d.x - (h.jsonmarginX || 0)) / (h.jsonres || 1) - (h.xpan || 0)) / (h.scale || 1) + (h.xoffset || 0),
                    y: ((-d.y - (h.jsonmarginY ||
                        0)) / (h.jsonres || 1) + (h.ypan || 0)) / (h.scale || 1) + (h.yoffset || 0)
                };
                var p = h.cosAngle || h.rotation && Math.cos(h.rotation),
                    k = h.sinAngle || h.rotation && Math.sin(h.rotation);
                h = u.proj4(h.crs, "WGS84", h.rotation ? { x: d.x * p + d.y * -k, y: d.x * k + d.y * p } : d);
                return { lat: h.y, lon: h.x }
            }
        };
        F.prototype.fromPointToLatLon = function(d) {
            var h = this.mapTransforms,
                p;
            if (h) {
                for (p in h)
                    if (h.hasOwnProperty(p) && h[p].hitZone && D({ x: d.x, y: -d.y }, h[p].hitZone.coordinates[0])) return this.transformToLatLon(d, h[p]);
                return this.transformToLatLon(d, h["default"])
            }
            a.error(22, !1, this)
        };
        F.prototype.fromLatLonToPoint = function(d) {
            var h = this.mapTransforms,
                p, k;
            if (!h) return a.error(22, !1, this), { x: 0, y: null };
            for (p in h)
                if (h.hasOwnProperty(p) && h[p].hitZone && (k = this.transformFromLatLon(d, h[p]), D({ x: k.x, y: -k.y }, h[p].hitZone.coordinates[0]))) return k;
            return this.transformFromLatLon(d, h["default"])
        };
        a.geojson = function(a, d, p) {
            var k = [],
                l = [],
                e = function(a) {
                    var c, d = a.length;
                    l.push("M");
                    for (c = 0; c < d; c++) 1 === c && l.push("L"), l.push(a[c][0], -a[c][1])
                };
            d = d || "map";
            a.features.forEach(function(a) {
                var c =
                    a.geometry,
                    f = c.type,
                    c = c.coordinates;
                a = a.properties;
                var b;
                l = [];
                "map" === d || "mapbubble" === d ? ("Polygon" === f ? (c.forEach(e), l.push("Z")) : "MultiPolygon" === f && (c.forEach(function(a) { a.forEach(e) }), l.push("Z")), l.length && (b = { path: l })) : "mapline" === d ? ("LineString" === f ? e(c) : "MultiLineString" === f && c.forEach(e), l.length && (b = { path: l })) : "mappoint" === d && "Point" === f && (b = { x: c[0], y: -c[1] });
                b && k.push(E(b, { name: a.name || a.NAME, properties: a }))
            });
            p && a.copyrightShort && (p.chart.mapCredits = h(p.chart.options.credits.mapText, { geojson: a }), p.chart.mapCreditsFull = h(p.chart.options.credits.mapTextFull, { geojson: a }));
            return k
        };
        v(F.prototype, "addCredits", function(a, h) {
            h = d(!0, this.options.credits, h);
            this.mapCredits && (h.href = null);
            a.call(this, h);
            this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull })
        })
    });
    K(I, "parts-map/Map.js", [I["parts/Globals.js"]], function(a) {
        function D(a, d, h, e, g, c, f, b) {
            return ["M", a + g, d, "L", a + h - c, d, "C", a + h - c / 2, d, a + h, d + c / 2, a + h, d + c, "L", a + h, d + e - f, "C", a + h, d + e - f / 2, a + h - f / 2, d + e, a + h - f, d + e,
                "L", a + b, d + e, "C", a + b / 2, d + e, a, d + e - b / 2, a, d + e - b, "L", a, d + g, "C", a, d + g / 2, a + g / 2, d, a + g, d, "Z"
            ]
        }
        var F = a.Chart,
            E = a.defaultOptions,
            h = a.extend,
            d = a.merge,
            u = a.pick,
            v = a.Renderer,
            r = a.SVGRenderer,
            w = a.VMLRenderer;
        h(E.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" });
        E.mapNavigation = {
            buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { fontSize: "15px", fontWeight: "500" }, theme: { "stroke-width": 1, "text-align": "center" } },
            buttons: {
                zoomIn: {
                    onclick: function() { this.mapZoom(.5) },
                    text: "+",
                    y: 0
                },
                zoomOut: { onclick: function() { this.mapZoom(2) }, text: "-", y: 28 }
            },
            mouseWheelSensitivity: 1.1
        };
        a.splitPath = function(a) {
            var d;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        r.prototype.symbols.topbutton = function(a, d, h, e, g) { return D(a - 1, d - 1, h, e, g.r, g.r, 0, 0) };
        r.prototype.symbols.bottombutton = function(a, d, h, e, g) { return D(a - 1, d - 1, h, e, 0, 0, g.r, g.r) };
        v === w && ["topbutton",
            "bottombutton"
        ].forEach(function(a) { w.prototype.symbols[a] = r.prototype.symbols[a] });
        a.Map = a.mapChart = function(h, k, l) {
            var e = "string" === typeof h || h.nodeName,
                g = arguments[e ? 1 : 0],
                c = g,
                f = { endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1 },
                b, n = a.getOptions().credits;
            b = g.series;
            g.series = null;
            g = d({
                chart: { panning: "xy", type: "map" },
                credits: { mapText: u(n.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'), mapTextFull: u(n.mapTextFull, "{geojson.copyright}") },
                tooltip: { followTouchMove: !1 },
                xAxis: f,
                yAxis: d(f, { reversed: !0 })
            }, g, { chart: { inverted: !1, alignTicks: !1 } });
            g.series = c.series = b;
            return e ? new F(h, g, l) : new F(g, k)
        }
    });
    K(I, "masters/modules/map.src.js", [], function() {});
    K(I, "masters/highmaps.src.js", [I["parts/Globals.js"]], function(a) { return a });
    I["masters/highmaps.src.js"]._modules = I;
    return I["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map