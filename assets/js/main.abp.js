(self.webpackChunkshared_layout_view =
  self.webpackChunkshared_layout_view || []).push([
  [179],
  {
    88286: (tr, Pi, Ot) => {
      "use strict";
      function H(e) {
        return "function" == typeof e;
      }
      function _t(e) {
        const t = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const Ht = _t(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function wt(e, n) {
        if (e) {
          const t = e.indexOf(n);
          0 <= t && e.splice(t, 1);
        }
      }
      class Me {
        constructor(n) {
          (this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const s of t) s.remove(this);
              else t.remove(this);
            const { initialTeardown: r } = this;
            if (H(r))
              try {
                r();
              } catch (s) {
                n = s instanceof Ht ? s.errors : [s];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const s of o)
                try {
                  lp(s);
                } catch (i) {
                  (n = n ?? []),
                    i instanceof Ht ? (n = [...n, ...i.errors]) : n.push(i);
                }
            }
            if (n) throw new Ht(n);
          }
        }
        add(n) {
          var t;
          if (n && n !== this)
            if (this.closed) lp(n);
            else {
              if (n instanceof Me) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              (this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                n
              );
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this;
          return t === n || (Array.isArray(t) && t.includes(n));
        }
        _addParent(n) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
        }
        _removeParent(n) {
          const { _parentage: t } = this;
          t === n ? (this._parentage = null) : Array.isArray(t) && wt(t, n);
        }
        remove(n) {
          const { _finalizers: t } = this;
          t && wt(t, n), n instanceof Me && n._removeParent(this);
        }
      }
      Me.EMPTY = (() => {
        const e = new Me();
        return (e.closed = !0), e;
      })();
      const Wo = Me.EMPTY;
      function cp(e) {
        return (
          e instanceof Me ||
          (e && "closed" in e && H(e.remove) && H(e.add) && H(e.unsubscribe))
        );
      }
      function lp(e) {
        H(e) ? e() : e.unsubscribe();
      }
      const nr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Fi = {
          setTimeout(e, n, ...t) {
            const { delegate: r } = Fi;
            return r?.setTimeout
              ? r.setTimeout(e, n, ...t)
              : setTimeout(e, n, ...t);
          },
          clearTimeout(e) {
            const { delegate: n } = Fi;
            return (n?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function up(e) {
        Fi.setTimeout(() => {
          const { onUnhandledError: n } = nr;
          if (!n) throw e;
          n(e);
        });
      }
      function fl() {}
      const U0 = hl("C", void 0, void 0);
      function hl(e, n, t) {
        return { kind: e, value: n, error: t };
      }
      let rr = null;
      function ki(e) {
        if (nr.useDeprecatedSynchronousErrorHandling) {
          const n = !rr;
          if ((n && (rr = { errorThrown: !1, error: null }), e(), n)) {
            const { errorThrown: t, error: r } = rr;
            if (((rr = null), t)) throw r;
          }
        } else e();
      }
      class pl extends Me {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? ((this.destination = n), cp(n) && n.add(this))
              : (this.destination = K0);
        }
        static create(n, t, r) {
          return new Zo(n, t, r);
        }
        next(n) {
          this.isStopped
            ? gl(
                (function z0(e) {
                  return hl("N", e, void 0);
                })(n),
                this
              )
            : this._next(n);
        }
        error(n) {
          this.isStopped
            ? gl(
                (function H0(e) {
                  return hl("E", void 0, e);
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped
            ? gl(U0, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const q0 = Function.prototype.bind;
      function ml(e, n) {
        return q0.call(e, n);
      }
      class W0 {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(n);
            } catch (r) {
              ji(r);
            }
        }
        error(n) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(n);
            } catch (r) {
              ji(r);
            }
          else ji(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (t) {
              ji(t);
            }
        }
      }
      class Zo extends pl {
        constructor(n, t, r) {
          let o;
          if ((super(), H(n) || !n))
            o = {
              next: n ?? void 0,
              error: t ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let s;
            this && nr.useDeprecatedNextContext
              ? ((s = Object.create(n)),
                (s.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: n.next && ml(n.next, s),
                  error: n.error && ml(n.error, s),
                  complete: n.complete && ml(n.complete, s),
                }))
              : (o = n);
          }
          this.destination = new W0(o);
        }
      }
      function ji(e) {
        nr.useDeprecatedSynchronousErrorHandling
          ? (function G0(e) {
              nr.useDeprecatedSynchronousErrorHandling &&
                rr &&
                ((rr.errorThrown = !0), (rr.error = e));
            })(e)
          : up(e);
      }
      function gl(e, n) {
        const { onStoppedNotification: t } = nr;
        t && Fi.setTimeout(() => t(e, n));
      }
      const K0 = {
          closed: !0,
          next: fl,
          error: function Z0(e) {
            throw e;
          },
          complete: fl,
        },
        vl =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function xn(e) {
        return e;
      }
      function dp(e) {
        return 0 === e.length
          ? xn
          : 1 === e.length
          ? e[0]
          : function (t) {
              return e.reduce((r, o) => o(r), t);
            };
      }
      let le = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const r = new e();
            return (r.source = this), (r.operator = t), r;
          }
          subscribe(t, r, o) {
            const s = (function J0(e) {
              return (
                (e && e instanceof pl) ||
                ((function Q0(e) {
                  return e && H(e.next) && H(e.error) && H(e.complete);
                })(e) &&
                  cp(e))
              );
            })(t)
              ? t
              : new Zo(t, r, o);
            return (
              ki(() => {
                const { operator: i, source: a } = this;
                s.add(
                  i
                    ? i.call(s, a)
                    : a
                    ? this._subscribe(s)
                    : this._trySubscribe(s)
                );
              }),
              s
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (r) {
              t.error(r);
            }
          }
          forEach(t, r) {
            return new (r = fp(r))((o, s) => {
              const i = new Zo({
                next: (a) => {
                  try {
                    t(a);
                  } catch (c) {
                    s(c), i.unsubscribe();
                  }
                },
                error: s,
                complete: o,
              });
              this.subscribe(i);
            });
          }
          _subscribe(t) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(t);
          }
          [vl]() {
            return this;
          }
          pipe(...t) {
            return dp(t)(this);
          }
          toPromise(t) {
            return new (t = fp(t))((r, o) => {
              let s;
              this.subscribe(
                (i) => (s = i),
                (i) => o(i),
                () => r(s)
              );
            });
          }
        }
        return (e.create = (n) => new e(n)), e;
      })();
      function fp(e) {
        var n;
        return null !== (n = e ?? nr.Promise) && void 0 !== n ? n : Promise;
      }
      const X0 = _t(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Ge = (() => {
        class e extends le {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const r = new hp(this, this);
            return (r.operator = t), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new X0();
          }
          next(t) {
            ki(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(t);
              }
            });
          }
          error(t) {
            ki(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(t);
              }
            });
          }
          complete() {
            ki(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: r, isStopped: o, observers: s } = this;
            return r || o
              ? Wo
              : ((this.currentObservers = null),
                s.push(t),
                new Me(() => {
                  (this.currentObservers = null), wt(s, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: r, thrownError: o, isStopped: s } = this;
            r ? t.error(o) : s && t.complete();
          }
          asObservable() {
            const t = new le();
            return (t.source = this), t;
          }
        }
        return (e.create = (n, t) => new hp(n, t)), e;
      })();
      class hp extends Ge {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t);
        }
        next(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === r ||
            r.call(t, n);
        }
        error(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === r ||
            r.call(t, n);
        }
        complete() {
          var n, t;
          null ===
            (t =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.complete) ||
            void 0 === t ||
            t.call(n);
        }
        _subscribe(n) {
          var t, r;
          return null !==
            (r =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(n)) && void 0 !== r
            ? r
            : Wo;
        }
      }
      function pp(e) {
        return H(e?.lift);
      }
      function _e(e) {
        return (n) => {
          if (pp(n))
            return n.lift(function (t) {
              try {
                return e(t, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function ve(e, n, t, r, o) {
        return new eS(e, n, t, r, o);
      }
      class eS extends pl {
        constructor(n, t, r, o, s, i) {
          super(n),
            (this.onFinalize = s),
            (this.shouldUnsubscribe = i),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (c) {
                    n.error(c);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (c) {
                    n.error(c);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    n.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t &&
                (null === (n = this.onFinalize) ||
                  void 0 === n ||
                  n.call(this));
          }
        }
      }
      function A(e, n) {
        return _e((t, r) => {
          let o = 0;
          t.subscribe(
            ve(r, (s) => {
              r.next(e.call(n, s, o++));
            })
          );
        });
      }
      function Pn(e) {
        return this instanceof Pn ? ((this.v = e), this) : new Pn(e);
      }
      function yp(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = (function _l(e) {
              var n = "function" == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                r = 0;
              if (t) return t.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                n
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function r(s) {
          t[s] =
            e[s] &&
            function (i) {
              return new Promise(function (a, c) {
                !(function o(s, i, a, c) {
                  Promise.resolve(c).then(function (l) {
                    s({ value: l, done: a });
                  }, i);
                })(a, c, (i = e[s](i)).done, i.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Dp = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Cp(e) {
        return H(e?.then);
      }
      function _p(e) {
        return H(e[vl]);
      }
      function wp(e) {
        return Symbol.asyncIterator && H(e?.[Symbol.asyncIterator]);
      }
      function bp(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Ep = (function wS() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Sp(e) {
        return H(e?.[Ep]);
      }
      function Ip(e) {
        return (function vp(e, n, t) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = t.apply(e, n || []),
            s = [];
          return (
            (o = {}),
            i("next"),
            i("throw"),
            i("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function i(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, m) {
                  s.push([f, h, p, m]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function c(f) {
                f.value instanceof Pn
                  ? Promise.resolve(f.value.v).then(l, u)
                  : d(s[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(s[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function u(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), s.shift(), s.length && a(s[0][0], s[0][1]);
          }
        })(this, arguments, function* () {
          const t = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Pn(t.read());
              if (o) return yield Pn(void 0);
              yield yield Pn(r);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function Mp(e) {
        return H(e?.getReader);
      }
      function bt(e) {
        if (e instanceof le) return e;
        if (null != e) {
          if (_p(e))
            return (function bS(e) {
              return new le((n) => {
                const t = e[vl]();
                if (H(t.subscribe)) return t.subscribe(n);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Dp(e))
            return (function ES(e) {
              return new le((n) => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                n.complete();
              });
            })(e);
          if (Cp(e))
            return (function SS(e) {
              return new le((n) => {
                e.then(
                  (t) => {
                    n.closed || (n.next(t), n.complete());
                  },
                  (t) => n.error(t)
                ).then(null, up);
              });
            })(e);
          if (wp(e)) return Ap(e);
          if (Sp(e))
            return (function IS(e) {
              return new le((n) => {
                for (const t of e) if ((n.next(t), n.closed)) return;
                n.complete();
              });
            })(e);
          if (Mp(e))
            return (function MS(e) {
              return Ap(Ip(e));
            })(e);
        }
        throw bp(e);
      }
      function Ap(e) {
        return new le((n) => {
          (function AS(e, n) {
            var t, r, o, s;
            return (function mp(e, n, t, r) {
              return new (t || (t = Promise))(function (s, i) {
                function a(u) {
                  try {
                    l(r.next(u));
                  } catch (d) {
                    i(d);
                  }
                }
                function c(u) {
                  try {
                    l(r.throw(u));
                  } catch (d) {
                    i(d);
                  }
                }
                function l(u) {
                  u.done
                    ? s(u.value)
                    : (function o(s) {
                        return s instanceof t
                          ? s
                          : new t(function (i) {
                              i(s);
                            });
                      })(u.value).then(a, c);
                }
                l((r = r.apply(e, n || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = yp(e); !(r = yield t.next()).done; )
                  if ((n.next(r.value), n.closed)) return;
              } catch (i) {
                o = { error: i };
              } finally {
                try {
                  r && !r.done && (s = t.return) && (yield s.call(t));
                } finally {
                  if (o) throw o.error;
                }
              }
              n.complete();
            });
          })(e, n).catch((t) => n.error(t));
        });
      }
      function hn(e, n, t, r = 0, o = !1) {
        const s = n.schedule(function () {
          t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(s), !o)) return s;
      }
      function Ne(e, n, t = 1 / 0) {
        return H(n)
          ? Ne((r, o) => A((s, i) => n(r, s, o, i))(bt(e(r, o))), t)
          : ("number" == typeof n && (t = n),
            _e((r, o) =>
              (function TS(e, n, t, r, o, s, i, a) {
                const c = [];
                let l = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !c.length && !l && n.complete();
                  },
                  h = (m) => (l < r ? p(m) : c.push(m)),
                  p = (m) => {
                    s && n.next(m), l++;
                    let v = !1;
                    bt(t(m, u++)).subscribe(
                      ve(
                        n,
                        (_) => {
                          o?.(_), s ? h(_) : n.next(_);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; c.length && l < r; ) {
                                const _ = c.shift();
                                i ? hn(n, i, () => p(_)) : p(_);
                              }
                              f();
                            } catch (_) {
                              n.error(_);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    ve(n, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, t)
            ));
      }
      function Nr(e = 1 / 0) {
        return Ne(xn, e);
      }
      const zt = new le((e) => e.complete());
      function wl(e) {
        return e[e.length - 1];
      }
      function Tp(e) {
        return H(wl(e)) ? e.pop() : void 0;
      }
      function Ko(e) {
        return (function NS(e) {
          return e && H(e.schedule);
        })(wl(e))
          ? e.pop()
          : void 0;
      }
      function Rp(e, n = 0) {
        return _e((t, r) => {
          t.subscribe(
            ve(
              r,
              (o) => hn(r, e, () => r.next(o), n),
              () => hn(r, e, () => r.complete(), n),
              (o) => hn(r, e, () => r.error(o), n)
            )
          );
        });
      }
      function Np(e, n = 0) {
        return _e((t, r) => {
          r.add(e.schedule(() => t.subscribe(r), n));
        });
      }
      function Op(e, n) {
        if (!e) throw new Error("Iterable cannot be null");
        return new le((t) => {
          hn(t, n, () => {
            const r = e[Symbol.asyncIterator]();
            hn(
              t,
              n,
              () => {
                r.next().then((o) => {
                  o.done ? t.complete() : t.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ye(e, n) {
        return n
          ? (function LS(e, n) {
              if (null != e) {
                if (_p(e))
                  return (function xS(e, n) {
                    return bt(e).pipe(Np(n), Rp(n));
                  })(e, n);
                if (Dp(e))
                  return (function FS(e, n) {
                    return new le((t) => {
                      let r = 0;
                      return n.schedule(function () {
                        r === e.length
                          ? t.complete()
                          : (t.next(e[r++]), t.closed || this.schedule());
                      });
                    });
                  })(e, n);
                if (Cp(e))
                  return (function PS(e, n) {
                    return bt(e).pipe(Np(n), Rp(n));
                  })(e, n);
                if (wp(e)) return Op(e, n);
                if (Sp(e))
                  return (function kS(e, n) {
                    return new le((t) => {
                      let r;
                      return (
                        hn(t, n, () => {
                          (r = e[Ep]()),
                            hn(
                              t,
                              n,
                              () => {
                                let o, s;
                                try {
                                  ({ value: o, done: s } = r.next());
                                } catch (i) {
                                  return void t.error(i);
                                }
                                s ? t.complete() : t.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => H(r?.return) && r.return()
                      );
                    });
                  })(e, n);
                if (Mp(e))
                  return (function jS(e, n) {
                    return Op(Ip(e), n);
                  })(e, n);
              }
              throw bp(e);
            })(e, n)
          : bt(e);
      }
      class De extends Ge {
        constructor(n) {
          super(), (this._value = n);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(n) {
          const t = super._subscribe(n);
          return !t.closed && n.next(this._value), t;
        }
        getValue() {
          const { hasError: n, thrownError: t, _value: r } = this;
          if (n) throw t;
          return this._throwIfClosed(), r;
        }
        next(n) {
          super.next((this._value = n));
        }
      }
      function R(...e) {
        return ye(e, Ko(e));
      }
      function xp(e = {}) {
        const {
          connector: n = () => new Ge(),
          resetOnError: t = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (s) => {
          let i,
            a,
            c,
            l = 0,
            u = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (i = c = void 0), (u = d = !1);
            },
            p = () => {
              const m = i;
              h(), m?.unsubscribe();
            };
          return _e((m, v) => {
            l++, !d && !u && f();
            const _ = (c = c ?? n());
            v.add(() => {
              l--, 0 === l && !d && !u && (a = bl(p, o));
            }),
              _.subscribe(v),
              !i &&
                l > 0 &&
                ((i = new Zo({
                  next: (g) => _.next(g),
                  error: (g) => {
                    (d = !0), f(), (a = bl(h, t, g)), _.error(g);
                  },
                  complete: () => {
                    (u = !0), f(), (a = bl(h, r)), _.complete();
                  },
                })),
                bt(m).subscribe(i));
          })(s);
        };
      }
      function bl(e, n, ...t) {
        if (!0 === n) return void e();
        if (!1 === n) return;
        const r = new Zo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return n(...t).subscribe(r);
      }
      function Ae(e, n) {
        return _e((t, r) => {
          let o = null,
            s = 0,
            i = !1;
          const a = () => i && !o && r.complete();
          t.subscribe(
            ve(
              r,
              (c) => {
                o?.unsubscribe();
                let l = 0;
                const u = s++;
                bt(e(c, u)).subscribe(
                  (o = ve(
                    r,
                    (d) => r.next(n ? n(c, d, u, l++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (i = !0), a();
              }
            )
          );
        });
      }
      function Pp(e, n = xn) {
        return (
          (e = e ?? BS),
          _e((t, r) => {
            let o,
              s = !0;
            t.subscribe(
              ve(r, (i) => {
                const a = n(i);
                (s || !e(o, a)) && ((s = !1), (o = a), r.next(i));
              })
            );
          })
        );
      }
      function BS(e, n) {
        return e === n;
      }
      function Y(e) {
        for (let n in e) if (e[n] === Y) return n;
        throw Error("Could not find renamed property on target object.");
      }
      function Li(e, n) {
        for (const t in n)
          n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t]);
      }
      function we(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(we).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const n = e.toString();
        if (null == n) return "" + n;
        const t = n.indexOf("\n");
        return -1 === t ? n : n.substring(0, t);
      }
      function El(e, n) {
        return null == e || "" === e
          ? null === n
            ? ""
            : n
          : null == n || "" === n
          ? e
          : e + " " + n;
      }
      const $S = Y({ __forward_ref__: Y });
      function ee(e) {
        return (
          (e.__forward_ref__ = ee),
          (e.toString = function () {
            return we(this());
          }),
          e
        );
      }
      function x(e) {
        return Sl(e) ? e() : e;
      }
      function Sl(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty($S) &&
          e.__forward_ref__ === ee
        );
      }
      function Il(e) {
        return e && !!e.ɵproviders;
      }
      class D extends Error {
        constructor(n, t) {
          super(
            (function Vi(e, n) {
              return `NG0${Math.abs(e)}${n ? ": " + n : ""}`;
            })(n, t)
          ),
            (this.code = n);
        }
      }
      function F(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ml(e, n) {
        throw new D(-201, !1);
      }
      function Et(e, n) {
        null == e &&
          (function N(e, n, t, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${t} ${r} ${n} <=Actual]`)
            );
          })(n, e, null, "!=");
      }
      function E(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Oe(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Bi(e) {
        return kp(e, Ui) || kp(e, jp);
      }
      function kp(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null;
      }
      function $i(e) {
        return e && (e.hasOwnProperty(Al) || e.hasOwnProperty(KS))
          ? e[Al]
          : null;
      }
      const Ui = Y({ ɵprov: Y }),
        Al = Y({ ɵinj: Y }),
        jp = Y({ ngInjectableDef: Y }),
        KS = Y({ ngInjectorDef: Y });
      var $ = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })($ || {});
      let Tl;
      function rt(e) {
        const n = Tl;
        return (Tl = e), n;
      }
      function Vp(e, n, t) {
        const r = Bi(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & $.Optional
          ? null
          : void 0 !== n
          ? n
          : void Ml(we(e));
      }
      const te = globalThis;
      class w {
        constructor(n, t) {
          (this._desc = n),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = E({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Yo = {},
        Pl = "__NG_DI_FLAG__",
        Hi = "ngTempTokenPath",
        JS = /\n/gm,
        $p = "__source";
      let Or;
      function Fn(e) {
        const n = Or;
        return (Or = e), n;
      }
      function tI(e, n = $.Default) {
        if (void 0 === Or) throw new D(-203, !1);
        return null === Or
          ? Vp(e, void 0, n)
          : Or.get(e, n & $.Optional ? null : void 0, n);
      }
      function b(e, n = $.Default) {
        return (
          (function Lp() {
            return Tl;
          })() || tI
        )(x(e), n);
      }
      function I(e, n = $.Default) {
        return b(e, zi(n));
      }
      function zi(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Fl(e) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
          const r = x(e[t]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new D(900, !1);
            let o,
              s = $.Default;
            for (let i = 0; i < r.length; i++) {
              const a = r[i],
                c = nI(a);
              "number" == typeof c
                ? -1 === c
                  ? (o = a.token)
                  : (s |= c)
                : (o = a);
            }
            n.push(b(o, s));
          } else n.push(b(r));
        }
        return n;
      }
      function Qo(e, n) {
        return (e[Pl] = n), (e.prototype[Pl] = n), e;
      }
      function nI(e) {
        return e[Pl];
      }
      function pn(e) {
        return { toString: e }.toString();
      }
      var Gi = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(Gi || {}),
        xt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(xt || {});
      const Gt = {},
        q = [],
        qi = Y({ ɵcmp: Y }),
        kl = Y({ ɵdir: Y }),
        jl = Y({ ɵpipe: Y }),
        Hp = Y({ ɵmod: Y }),
        mn = Y({ ɵfac: Y }),
        Jo = Y({ __NG_ELEMENT_ID__: Y }),
        zp = Y({ __NG_ENV_ID__: Y });
      function Gp(e, n, t) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(n, t);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const s = n.length;
            if (o + s === r || e.charCodeAt(o + s) <= 32) return o;
          }
          t = o + 1;
        }
      }
      function Ll(e, n, t) {
        let r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const s = t[r++],
              i = t[r++],
              a = t[r++];
            e.setAttribute(n, i, a, s);
          } else {
            const s = o,
              i = t[++r];
            Wp(s) ? e.setProperty(n, s, i) : e.setAttribute(n, s, i), r++;
          }
        }
        return r;
      }
      function qp(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Wp(e) {
        return 64 === e.charCodeAt(0);
      }
      function Xo(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice();
          else {
            let t = -1;
            for (let r = 0; r < n.length; r++) {
              const o = n[r];
              "number" == typeof o
                ? (t = o)
                : 0 === t ||
                  Zp(e, t, o, null, -1 === t || 2 === t ? n[++r] : null);
            }
          }
        return e;
      }
      function Zp(e, n, t, r, o) {
        let s = 0,
          i = e.length;
        if (-1 === n) i = -1;
        else
          for (; s < e.length; ) {
            const a = e[s++];
            if ("number" == typeof a) {
              if (a === n) {
                i = -1;
                break;
              }
              if (a > n) {
                i = s - 1;
                break;
              }
            }
          }
        for (; s < e.length; ) {
          const a = e[s];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === r) return void (null !== o && (e[s + 1] = o));
            if (r === e[s + 1]) return void (e[s + 2] = o);
          }
          s++, null !== r && s++, null !== o && s++;
        }
        -1 !== i && (e.splice(i, 0, n), (s = i + 1)),
          e.splice(s++, 0, t),
          null !== r && e.splice(s++, 0, r),
          null !== o && e.splice(s++, 0, o);
      }
      const Kp = "ng-template";
      function sI(e, n, t) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let s = e[r++];
          if ("string" == typeof s && o) {
            const i = e[r++];
            if (t && "class" === s && -1 !== Gp(i.toLowerCase(), n, 0))
              return !0;
          } else {
            if (1 === s) {
              for (; r < e.length && "string" == typeof (s = e[r++]); )
                if (s.toLowerCase() === n) return !0;
              return !1;
            }
            "number" == typeof s && (o = !1);
          }
        }
        return !1;
      }
      function Yp(e) {
        return 4 === e.type && e.value !== Kp;
      }
      function iI(e, n, t) {
        return n === (4 !== e.type || t ? e.value : Kp);
      }
      function aI(e, n, t) {
        let r = 4;
        const o = e.attrs || [],
          s = (function uI(e) {
            for (let n = 0; n < e.length; n++) if (qp(e[n])) return n;
            return e.length;
          })(o);
        let i = !1;
        for (let a = 0; a < n.length; a++) {
          const c = n[a];
          if ("number" != typeof c) {
            if (!i)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== c && !iI(e, c, t)) || ("" === c && 1 === n.length))
                ) {
                  if (Pt(r)) return !1;
                  i = !0;
                }
              } else {
                const l = 8 & r ? c : n[++a];
                if (8 & r && null !== e.attrs) {
                  if (!sI(e.attrs, l, t)) {
                    if (Pt(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const d = cI(8 & r ? "class" : c, o, Yp(e), t);
                if (-1 === d) {
                  if (Pt(r)) return !1;
                  i = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > s ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Gp(h, l, 0)) || (2 & r && l !== f)) {
                    if (Pt(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !Pt(r) && !Pt(c)) return !1;
            if (i && Pt(c)) continue;
            (i = !1), (r = c | (1 & r));
          }
        }
        return Pt(r) || i;
      }
      function Pt(e) {
        return 0 == (1 & e);
      }
      function cI(e, n, t, r) {
        if (null === n) return -1;
        let o = 0;
        if (r || !t) {
          let s = !1;
          for (; o < n.length; ) {
            const i = n[o];
            if (i === e) return o;
            if (3 === i || 6 === i) s = !0;
            else {
              if (1 === i || 2 === i) {
                let a = n[++o];
                for (; "string" == typeof a; ) a = n[++o];
                continue;
              }
              if (4 === i) break;
              if (0 === i) {
                o += 4;
                continue;
              }
            }
            o += s ? 1 : 2;
          }
          return -1;
        }
        return (function dI(e, n) {
          let t = e.indexOf(4);
          if (t > -1)
            for (t++; t < e.length; ) {
              const r = e[t];
              if ("number" == typeof r) return -1;
              if (r === n) return t;
              t++;
            }
          return -1;
        })(n, e);
      }
      function Qp(e, n, t = !1) {
        for (let r = 0; r < n.length; r++) if (aI(e, n[r], t)) return !0;
        return !1;
      }
      function Jp(e, n) {
        return e ? ":not(" + n.trim() + ")" : n;
      }
      function hI(e) {
        let n = e[0],
          t = 1,
          r = 2,
          o = "",
          s = !1;
        for (; t < e.length; ) {
          let i = e[t];
          if ("string" == typeof i)
            if (2 & r) {
              const a = e[++t];
              o += "[" + i + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + i) : 4 & r && (o += " " + i);
          else
            "" !== o && !Pt(i) && ((n += Jp(s, o)), (o = "")),
              (r = i),
              (s = s || !Pt(r));
          t++;
        }
        return "" !== o && (n += Jp(s, o)), n;
      }
      function Wi(e) {
        return pn(() => {
          const n = em(e),
            t = {
              ...n,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Gi.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (n.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || xt.Emulated,
              styles: e.styles || q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          tm(t);
          const r = e.dependencies;
          return (
            (t.directiveDefs = Zi(r, !1)),
            (t.pipeDefs = Zi(r, !0)),
            (t.id = (function _I(e) {
              let n = 0;
              const t = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of t) n = (Math.imul(31, n) + o.charCodeAt(0)) << 0;
              return (n += 2147483648), "c" + n;
            })(t)),
            t
          );
        });
      }
      function vI(e) {
        return z(e) || xe(e);
      }
      function yI(e) {
        return null !== e;
      }
      function Le(e) {
        return pn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || q,
          declarations: e.declarations || q,
          imports: e.imports || q,
          exports: e.exports || q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Xp(e, n) {
        if (null == e) return Gt;
        const t = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              s = o;
            Array.isArray(o) && ((s = o[1]), (o = o[0])),
              (t[o] = r),
              n && (n[o] = s);
          }
        return t;
      }
      function P(e) {
        return pn(() => {
          const n = em(e);
          return tm(n), n;
        });
      }
      function qe(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function z(e) {
        return e[qi] || null;
      }
      function xe(e) {
        return e[kl] || null;
      }
      function We(e) {
        return e[jl] || null;
      }
      function pt(e, n) {
        const t = e[Hp] || null;
        if (!t && !0 === n)
          throw new Error(`Type ${we(e)} does not have '\u0275mod' property.`);
        return t;
      }
      function em(e) {
        const n = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: n,
          inputTransforms: null,
          inputConfig: e.inputs || Gt,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Xp(e.inputs, n),
          outputs: Xp(e.outputs),
        };
      }
      function tm(e) {
        e.features?.forEach((n) => n(e));
      }
      function Zi(e, n) {
        if (!e) return null;
        const t = n ? We : vI;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => t(r)).filter(yI);
      }
      const ue = 0,
        S = 1,
        L = 2,
        ie = 3,
        Ft = 4,
        es = 5,
        Ve = 6,
        Pr = 7,
        he = 8,
        kn = 9,
        Fr = 10,
        k = 11,
        ts = 12,
        nm = 13,
        kr = 14,
        pe = 15,
        ns = 16,
        jr = 17,
        qt = 18,
        rs = 19,
        rm = 20,
        jn = 21,
        gn = 22,
        os = 23,
        ss = 24,
        U = 25,
        Vl = 1,
        om = 2,
        Wt = 7,
        Lr = 9,
        Pe = 11;
      function ot(e) {
        return Array.isArray(e) && "object" == typeof e[Vl];
      }
      function Ze(e) {
        return Array.isArray(e) && !0 === e[Vl];
      }
      function Bl(e) {
        return 0 != (4 & e.flags);
      }
      function sr(e) {
        return e.componentOffset > -1;
      }
      function Yi(e) {
        return 1 == (1 & e.flags);
      }
      function kt(e) {
        return !!e.template;
      }
      function $l(e) {
        return 0 != (512 & e[L]);
      }
      function ir(e, n) {
        return e.hasOwnProperty(mn) ? e[mn] : null;
      }
      let Fe = null,
        Qi = !1;
      function St(e) {
        const n = Fe;
        return (Fe = e), n;
      }
      const am = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function lm(e) {
        if (!as(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !fm(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function dm(e) {
        (e.dirty = !0),
          (function um(e) {
            if (void 0 === e.liveConsumerNode) return;
            const n = Qi;
            Qi = !0;
            try {
              for (const t of e.liveConsumerNode) t.dirty || dm(t);
            } finally {
              Qi = n;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function Hl(e) {
        return e && (e.nextProducerIndex = 0), St(e);
      }
      function zl(e, n) {
        if (
          (St(n),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (as(e))
            for (let t = e.nextProducerIndex; t < e.producerNode.length; t++)
              Ji(e.producerNode[t], e.producerIndexOfThis[t]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function fm(e) {
        Vr(e);
        for (let n = 0; n < e.producerNode.length; n++) {
          const t = e.producerNode[n],
            r = e.producerLastReadVersion[n];
          if (r !== t.version || (lm(t), r !== t.version)) return !0;
        }
        return !1;
      }
      function hm(e) {
        if ((Vr(e), as(e)))
          for (let n = 0; n < e.producerNode.length; n++)
            Ji(e.producerNode[n], e.producerIndexOfThis[n]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function Ji(e, n) {
        if (
          ((function mm(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          Vr(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            Ji(e.producerNode[r], e.producerIndexOfThis[r]);
        const t = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[n] = e.liveConsumerNode[t]),
          (e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          n < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[n],
            o = e.liveConsumerNode[n];
          Vr(o), (o.producerIndexOfThis[r] = n);
        }
      }
      function as(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function Vr(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let gm = null;
      const Cm = () => {},
        PI = (() => ({
          ...am,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: Cm,
        }))();
      class FI {
        constructor(n, t, r) {
          (this.previousValue = n),
            (this.currentValue = t),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function It() {
        return _m;
      }
      function _m(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = jI), kI;
      }
      function kI() {
        const e = bm(this),
          n = e?.current;
        if (n) {
          const t = e.previous;
          if (t === Gt) e.previous = n;
          else for (let r in n) t[r] = n[r];
          (e.current = null), this.ngOnChanges(n);
        }
      }
      function jI(e, n, t, r) {
        const o = this.declaredInputs[t],
          s =
            bm(e) ||
            (function LI(e, n) {
              return (e[wm] = n);
            })(e, { previous: Gt, current: null }),
          i = s.current || (s.current = {}),
          a = s.previous,
          c = a[o];
        (i[o] = new FI(c && c.currentValue, n, a === Gt)), (e[r] = n);
      }
      It.ngInherit = !0;
      const wm = "__ngSimpleChanges__";
      function bm(e) {
        return e[wm] || null;
      }
      const Zt = function (e, n, t) {};
      function ne(e) {
        for (; Array.isArray(e); ) e = e[ue];
        return e;
      }
      function Xi(e, n) {
        return ne(n[e]);
      }
      function st(e, n) {
        return ne(n[e.index]);
      }
      function Im(e, n) {
        return e.data[n];
      }
      function mt(e, n) {
        const t = n[e];
        return ot(t) ? t : t[ue];
      }
      function Vn(e, n) {
        return null == n ? null : e[n];
      }
      function Mm(e) {
        e[jr] = 0;
      }
      function zI(e) {
        1024 & e[L] || ((e[L] |= 1024), Tm(e, 1));
      }
      function Am(e) {
        1024 & e[L] && ((e[L] &= -1025), Tm(e, -1));
      }
      function Tm(e, n) {
        let t = e[ie];
        if (null === t) return;
        t[es] += n;
        let r = t;
        for (
          t = t[ie];
          null !== t && ((1 === n && 1 === r[es]) || (-1 === n && 0 === r[es]));

        )
          (t[es] += n), (r = t), (t = t[ie]);
      }
      const O = {
        lFrame: Bm(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Om() {
        return O.bindingsEnabled;
      }
      function y() {
        return O.lFrame.lView;
      }
      function G() {
        return O.lFrame.tView;
      }
      function ea(e) {
        return (O.lFrame.contextLView = e), e[he];
      }
      function ta(e) {
        return (O.lFrame.contextLView = null), e;
      }
      function ke() {
        let e = xm();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function xm() {
        return O.lFrame.currentTNode;
      }
      function Kt(e, n) {
        const t = O.lFrame;
        (t.currentTNode = e), (t.isParent = n);
      }
      function Kl() {
        return O.lFrame.isParent;
      }
      function Yl() {
        O.lFrame.isParent = !1;
      }
      function Ur() {
        return O.lFrame.bindingIndex++;
      }
      function yn(e) {
        const n = O.lFrame,
          t = n.bindingIndex;
        return (n.bindingIndex = n.bindingIndex + e), t;
      }
      function nM(e, n) {
        const t = O.lFrame;
        (t.bindingIndex = t.bindingRootIndex = e), Ql(n);
      }
      function Ql(e) {
        O.lFrame.currentDirectiveIndex = e;
      }
      function Xl(e) {
        O.lFrame.currentQueryIndex = e;
      }
      function oM(e) {
        const n = e[S];
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[Ve] : null;
      }
      function Lm(e, n, t) {
        if (t & $.SkipSelf) {
          let o = n,
            s = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              t & $.Host ||
              ((o = oM(s)), null === o || ((s = s[kr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (n = o), (e = s);
        }
        const r = (O.lFrame = Vm());
        return (r.currentTNode = n), (r.lView = e), !0;
      }
      function eu(e) {
        const n = Vm(),
          t = e[S];
        (O.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1);
      }
      function Vm() {
        const e = O.lFrame,
          n = null === e ? null : e.child;
        return null === n ? Bm(e) : n;
      }
      function Bm(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = n), n;
      }
      function $m() {
        const e = O.lFrame;
        return (
          (O.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Um = $m;
      function tu() {
        const e = $m();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ye() {
        return O.lFrame.selectedIndex;
      }
      function ar(e) {
        O.lFrame.selectedIndex = e;
      }
      let zm = !0;
      function na() {
        return zm;
      }
      function Bn(e) {
        zm = e;
      }
      function ra(e, n) {
        for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
          const s = e.data[t].type.prototype,
            {
              ngAfterContentInit: i,
              ngAfterContentChecked: a,
              ngAfterViewInit: c,
              ngAfterViewChecked: l,
              ngOnDestroy: u,
            } = s;
          i && (e.contentHooks ??= []).push(-t, i),
            a &&
              ((e.contentHooks ??= []).push(t, a),
              (e.contentCheckHooks ??= []).push(t, a)),
            c && (e.viewHooks ??= []).push(-t, c),
            l &&
              ((e.viewHooks ??= []).push(t, l),
              (e.viewCheckHooks ??= []).push(t, l)),
            null != u && (e.destroyHooks ??= []).push(t, u);
        }
      }
      function oa(e, n, t) {
        Gm(e, n, 3, t);
      }
      function sa(e, n, t, r) {
        (3 & e[L]) === t && Gm(e, n, t, r);
      }
      function nu(e, n) {
        let t = e[L];
        (3 & t) === n && ((t &= 8191), (t += 1), (e[L] = t));
      }
      function Gm(e, n, t, r) {
        const s = r ?? -1,
          i = n.length - 1;
        let a = 0;
        for (let c = void 0 !== r ? 65535 & e[jr] : 0; c < i; c++)
          if ("number" == typeof n[c + 1]) {
            if (((a = n[c]), null != r && a >= r)) break;
          } else
            n[c] < 0 && (e[jr] += 65536),
              (a < s || -1 == s) &&
                (fM(e, t, n, c), (e[jr] = (4294901760 & e[jr]) + c + 2)),
              c++;
      }
      function qm(e, n) {
        Zt(4, e, n);
        const t = St(null);
        try {
          n.call(e);
        } finally {
          St(t), Zt(5, e, n);
        }
      }
      function fM(e, n, t, r) {
        const o = t[r] < 0,
          s = t[r + 1],
          a = e[o ? -t[r] : t[r]];
        o
          ? e[L] >> 13 < e[jr] >> 16 &&
            (3 & e[L]) === n &&
            ((e[L] += 8192), qm(a, s))
          : qm(a, s);
      }
      const Hr = -1;
      class ls {
        constructor(n, t, r) {
          (this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r);
        }
      }
      function ou(e) {
        return e !== Hr;
      }
      function us(e) {
        return 32767 & e;
      }
      function ds(e, n) {
        let t = (function gM(e) {
            return e >> 16;
          })(e),
          r = n;
        for (; t > 0; ) (r = r[kr]), t--;
        return r;
      }
      let su = !0;
      function ia(e) {
        const n = su;
        return (su = e), n;
      }
      const Wm = 255,
        Zm = 5;
      let vM = 0;
      const Yt = {};
      function aa(e, n) {
        const t = Km(e, n);
        if (-1 !== t) return t;
        const r = n[S];
        r.firstCreatePass &&
          ((e.injectorIndex = n.length),
          iu(r.data, e),
          iu(n, null),
          iu(r.blueprint, null));
        const o = ca(e, n),
          s = e.injectorIndex;
        if (ou(o)) {
          const i = us(o),
            a = ds(o, n),
            c = a[S].data;
          for (let l = 0; l < 8; l++) n[s + l] = a[i + l] | c[i + l];
        }
        return (n[s + 8] = o), s;
      }
      function iu(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
      }
      function Km(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function ca(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let t = 0,
          r = null,
          o = n;
        for (; null !== o; ) {
          if (((r = ng(o)), null === r)) return Hr;
          if ((t++, (o = o[kr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16);
        }
        return Hr;
      }
      function au(e, n, t) {
        !(function yM(e, n, t) {
          let r;
          "string" == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(Jo) && (r = t[Jo]),
            null == r && (r = t[Jo] = vM++);
          const o = r & Wm;
          n.data[e + (o >> Zm)] |= 1 << o;
        })(e, n, t);
      }
      function Ym(e, n, t) {
        if (t & $.Optional || void 0 !== e) return e;
        Ml();
      }
      function Qm(e, n, t, r) {
        if (
          (t & $.Optional && void 0 === r && (r = null),
          !(t & ($.Self | $.Host)))
        ) {
          const o = e[kn],
            s = rt(void 0);
          try {
            return o ? o.get(n, r, t & $.Optional) : Vp(n, r, t & $.Optional);
          } finally {
            rt(s);
          }
        }
        return Ym(r, 0, t);
      }
      function Jm(e, n, t, r = $.Default, o) {
        if (null !== e) {
          if (2048 & n[L] && !(r & $.Self)) {
            const i = (function EM(e, n, t, r, o) {
              let s = e,
                i = n;
              for (
                ;
                null !== s && null !== i && 2048 & i[L] && !(512 & i[L]);

              ) {
                const a = Xm(s, i, t, r | $.Self, Yt);
                if (a !== Yt) return a;
                let c = s.parent;
                if (!c) {
                  const l = i[rm];
                  if (l) {
                    const u = l.get(t, Yt, r);
                    if (u !== Yt) return u;
                  }
                  (c = ng(i)), (i = i[kr]);
                }
                s = c;
              }
              return o;
            })(e, n, t, r, Yt);
            if (i !== Yt) return i;
          }
          const s = Xm(e, n, t, r, Yt);
          if (s !== Yt) return s;
        }
        return Qm(n, t, r, o);
      }
      function Xm(e, n, t, r, o) {
        const s = (function _M(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const n = e.hasOwnProperty(Jo) ? e[Jo] : void 0;
          return "number" == typeof n ? (n >= 0 ? n & Wm : bM) : n;
        })(t);
        if ("function" == typeof s) {
          if (!Lm(n, e, r)) return r & $.Host ? Ym(o, 0, r) : Qm(n, t, r, o);
          try {
            let i;
            if (((i = s(r)), null != i || r & $.Optional)) return i;
            Ml();
          } finally {
            Um();
          }
        } else if ("number" == typeof s) {
          let i = null,
            a = Km(e, n),
            c = Hr,
            l = r & $.Host ? n[pe][Ve] : null;
          for (
            (-1 === a || r & $.SkipSelf) &&
            ((c = -1 === a ? ca(e, n) : n[a + 8]),
            c !== Hr && tg(r, !1)
              ? ((i = n[S]), (a = us(c)), (n = ds(c, n)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = n[S];
            if (eg(s, a, u.data)) {
              const d = CM(a, n, t, i, r, l);
              if (d !== Yt) return d;
            }
            (c = n[a + 8]),
              c !== Hr && tg(r, n[S].data[a + 8] === l) && eg(s, a, n)
                ? ((i = u), (a = us(c)), (n = ds(c, n)))
                : (a = -1);
          }
        }
        return o;
      }
      function CM(e, n, t, r, o, s) {
        const i = n[S],
          a = i.data[e + 8],
          u = (function la(e, n, t, r, o) {
            const s = e.providerIndexes,
              i = n.data,
              a = 1048575 & s,
              c = e.directiveStart,
              u = s >> 20,
              f = o ? a + u : e.directiveEnd;
            for (let h = r ? a : a + u; h < f; h++) {
              const p = i[h];
              if ((h < c && t === p) || (h >= c && p.type === t)) return h;
            }
            if (o) {
              const h = i[c];
              if (h && kt(h) && h.type === t) return c;
            }
            return null;
          })(
            a,
            i,
            t,
            null == r ? sr(a) && su : r != i && 0 != (3 & a.type),
            o & $.Host && s === a
          );
        return null !== u ? cr(n, i, u, a) : Yt;
      }
      function cr(e, n, t, r) {
        let o = e[t];
        const s = n.data;
        if (
          (function hM(e) {
            return e instanceof ls;
          })(o)
        ) {
          const i = o;
          i.resolving &&
            (function US(e, n) {
              const t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
              throw new D(
                -200,
                `Circular dependency in DI detected for ${e}${t}`
              );
            })(
              (function K(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : F(e);
              })(s[t])
            );
          const a = ia(i.canSeeViewProviders);
          i.resolving = !0;
          const l = i.injectImpl ? rt(i.injectImpl) : null;
          Lm(e, r, $.Default);
          try {
            (o = e[t] = i.factory(void 0, s, e, r)),
              n.firstCreatePass &&
                t >= r.directiveStart &&
                (function dM(e, n, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: s,
                  } = n.type.prototype;
                  if (r) {
                    const i = _m(n);
                    (t.preOrderHooks ??= []).push(e, i),
                      (t.preOrderCheckHooks ??= []).push(e, i);
                  }
                  o && (t.preOrderHooks ??= []).push(0 - e, o),
                    s &&
                      ((t.preOrderHooks ??= []).push(e, s),
                      (t.preOrderCheckHooks ??= []).push(e, s));
                })(t, s[t], n);
          } finally {
            null !== l && rt(l), ia(a), (i.resolving = !1), Um();
          }
        }
        return o;
      }
      function eg(e, n, t) {
        return !!(t[n + (e >> Zm)] & (1 << e));
      }
      function tg(e, n) {
        return !(e & $.Self || (e & $.Host && n));
      }
      class Qe {
        constructor(n, t) {
          (this._tNode = n), (this._lView = t);
        }
        get(n, t, r) {
          return Jm(this._tNode, this._lView, n, zi(r), t);
        }
      }
      function bM() {
        return new Qe(ke(), y());
      }
      function be(e) {
        return pn(() => {
          const n = e.prototype.constructor,
            t = n[mn] || cu(n),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const s = o[mn] || cu(o);
            if (s && s !== t) return s;
            o = Object.getPrototypeOf(o);
          }
          return (s) => new s();
        });
      }
      function cu(e) {
        return Sl(e)
          ? () => {
              const n = cu(x(e));
              return n && n();
            }
          : ir(e);
      }
      function ng(e) {
        const n = e[S],
          t = n.type;
        return 2 === t ? n.declTNode : 1 === t ? e[Ve] : null;
      }
      const Gr = "__parameters__";
      function Wr(e, n, t) {
        return pn(() => {
          const r = (function lu(e) {
            return function (...t) {
              if (e) {
                const r = e(...t);
                for (const o in r) this[o] = r[o];
              }
            };
          })(n);
          function o(...s) {
            if (this instanceof o) return r.apply(this, s), this;
            const i = new o(...s);
            return (a.annotation = i), a;
            function a(c, l, u) {
              const d = c.hasOwnProperty(Gr)
                ? c[Gr]
                : Object.defineProperty(c, Gr, { value: [] })[Gr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(i), c;
            }
          }
          return (
            t && (o.prototype = Object.create(t.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function Kr(e, n) {
        e.forEach((t) => (Array.isArray(t) ? Kr(t, n) : n(t)));
      }
      function og(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t);
      }
      function da(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
      }
      function gt(e, n, t) {
        let r = Yr(e, n);
        return (
          r >= 0
            ? (e[1 | r] = t)
            : ((r = ~r),
              (function NM(e, n, t, r) {
                let o = e.length;
                if (o == n) e.push(t, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = t);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > n; )
                    (e[o] = e[o - 2]), o--;
                  (e[n] = t), (e[n + 1] = r);
                }
              })(e, r, n, t)),
          r
        );
      }
      function uu(e, n) {
        const t = Yr(e, n);
        if (t >= 0) return e[1 | t];
      }
      function Yr(e, n) {
        return (function sg(e, n, t) {
          let r = 0,
            o = e.length >> t;
          for (; o !== r; ) {
            const s = r + ((o - r) >> 1),
              i = e[s << t];
            if (n === i) return s << t;
            i > n ? (o = s) : (r = s + 1);
          }
          return ~(o << t);
        })(e, n, 1);
      }
      const ha = Qo(Wr("Optional"), 8),
        pa = Qo(Wr("SkipSelf"), 4);
      function Da(e) {
        return 128 == (128 & e.flags);
      }
      var $n = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })($n || {});
      const JM = /^>|^->|<!--|-->|--!>|<!-$/g,
        XM = /(<|>)/g,
        eA = "\u200b$1\u200b";
      const mu = new Map();
      let tA = 0;
      const vu = "__ngContext__";
      function Be(e, n) {
        ot(n)
          ? ((e[vu] = n[rs]),
            (function rA(e) {
              mu.set(e[rs], e);
            })(n))
          : (e[vu] = n);
      }
      let yu;
      function Du(e, n) {
        return yu(e, n);
      }
      function vs(e) {
        const n = e[ie];
        return Ze(n) ? n[ie] : n;
      }
      function Sg(e) {
        return Mg(e[ts]);
      }
      function Ig(e) {
        return Mg(e[Ft]);
      }
      function Mg(e) {
        for (; null !== e && !Ze(e); ) e = e[Ft];
        return e;
      }
      function Xr(e, n, t, r, o) {
        if (null != r) {
          let s,
            i = !1;
          Ze(r) ? (s = r) : ot(r) && ((i = !0), (r = r[ue]));
          const a = ne(r);
          0 === e && null !== t
            ? null == o
              ? Ng(n, t, a)
              : lr(n, t, a, o || null, !0)
            : 1 === e && null !== t
            ? lr(n, t, a, o || null, !0)
            : 2 === e
            ? (function Ia(e, n, t) {
                const r = Ea(e, n);
                r &&
                  (function wA(e, n, t, r) {
                    e.removeChild(n, t, r);
                  })(e, r, n, t);
              })(n, a, i)
            : 3 === e && n.destroyNode(a),
            null != s &&
              (function SA(e, n, t, r, o) {
                const s = t[Wt];
                s !== ne(t) && Xr(n, e, r, s, o);
                for (let a = Pe; a < t.length; a++) {
                  const c = t[a];
                  Ds(c[S], c, e, n, r, s);
                }
              })(n, e, s, t, o);
        }
      }
      function Cu(e, n) {
        return e.createComment(
          (function vg(e) {
            return e.replace(JM, (n) => n.replace(XM, eA));
          })(n)
        );
      }
      function wa(e, n, t) {
        return e.createElement(n, t);
      }
      function Tg(e, n) {
        const t = e[Lr],
          r = t.indexOf(n);
        Am(n), t.splice(r, 1);
      }
      function ba(e, n) {
        if (e.length <= Pe) return;
        const t = Pe + n,
          r = e[t];
        if (r) {
          const o = r[ns];
          null !== o && o !== e && Tg(o, r), n > 0 && (e[t - 1][Ft] = r[Ft]);
          const s = da(e, Pe + n);
          !(function pA(e, n) {
            Ds(e, n, n[k], 2, null, null), (n[ue] = null), (n[Ve] = null);
          })(r[S], r);
          const i = s[qt];
          null !== i && i.detachView(s[S]),
            (r[ie] = null),
            (r[Ft] = null),
            (r[L] &= -129);
        }
        return r;
      }
      function _u(e, n) {
        if (!(256 & n[L])) {
          const t = n[k];
          n[os] && hm(n[os]),
            n[ss] && hm(n[ss]),
            t.destroyNode && Ds(e, n, t, 3, null, null),
            (function vA(e) {
              let n = e[ts];
              if (!n) return wu(e[S], e);
              for (; n; ) {
                let t = null;
                if (ot(n)) t = n[ts];
                else {
                  const r = n[Pe];
                  r && (t = r);
                }
                if (!t) {
                  for (; n && !n[Ft] && n !== e; )
                    ot(n) && wu(n[S], n), (n = n[ie]);
                  null === n && (n = e), ot(n) && wu(n[S], n), (t = n && n[Ft]);
                }
                n = t;
              }
            })(n);
        }
      }
      function wu(e, n) {
        if (!(256 & n[L])) {
          (n[L] &= -129),
            (n[L] |= 256),
            (function _A(e, n) {
              let t;
              if (null != e && null != (t = e.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const o = n[t[r]];
                  if (!(o instanceof ls)) {
                    const s = t[r + 1];
                    if (Array.isArray(s))
                      for (let i = 0; i < s.length; i += 2) {
                        const a = o[s[i]],
                          c = s[i + 1];
                        Zt(4, a, c);
                        try {
                          c.call(a);
                        } finally {
                          Zt(5, a, c);
                        }
                      }
                    else {
                      Zt(4, o, s);
                      try {
                        s.call(o);
                      } finally {
                        Zt(5, o, s);
                      }
                    }
                  }
                }
            })(e, n),
            (function CA(e, n) {
              const t = e.cleanup,
                r = n[Pr];
              if (null !== t)
                for (let s = 0; s < t.length - 1; s += 2)
                  if ("string" == typeof t[s]) {
                    const i = t[s + 3];
                    i >= 0 ? r[i]() : r[-i].unsubscribe(), (s += 2);
                  } else t[s].call(r[t[s + 1]]);
              null !== r && (n[Pr] = null);
              const o = n[jn];
              if (null !== o) {
                n[jn] = null;
                for (let s = 0; s < o.length; s++) (0, o[s])();
              }
            })(e, n),
            1 === n[S].type && n[k].destroy();
          const t = n[ns];
          if (null !== t && Ze(n[ie])) {
            t !== n[ie] && Tg(t, n);
            const r = n[qt];
            null !== r && r.detachView(e);
          }
          !(function oA(e) {
            mu.delete(e[rs]);
          })(n);
        }
      }
      function bu(e, n, t) {
        return (function Rg(e, n, t) {
          let r = n;
          for (; null !== r && 40 & r.type; ) r = (n = r).parent;
          if (null === r) return t[ue];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: s } = e.data[r.directiveStart + o];
              if (s === xt.None || s === xt.Emulated) return null;
            }
            return st(r, t);
          }
        })(e, n.parent, t);
      }
      function lr(e, n, t, r, o) {
        e.insertBefore(n, t, r, o);
      }
      function Ng(e, n, t) {
        e.appendChild(n, t);
      }
      function Og(e, n, t, r, o) {
        null !== r ? lr(e, n, t, r, o) : Ng(e, n, t);
      }
      function Ea(e, n) {
        return e.parentNode(n);
      }
      let Eu,
        Au,
        Fg = function Pg(e, n, t) {
          return 40 & e.type ? st(e, t) : null;
        };
      function Sa(e, n, t, r) {
        const o = bu(e, r, n),
          s = n[k],
          a = (function xg(e, n, t) {
            return Fg(e, n, t);
          })(r.parent || n[Ve], r, n);
        if (null != o)
          if (Array.isArray(t))
            for (let c = 0; c < t.length; c++) Og(s, o, t[c], a, !1);
          else Og(s, o, t, a, !1);
        void 0 !== Eu && Eu(s, r, n, t, o);
      }
      function ys(e, n) {
        if (null !== n) {
          const t = n.type;
          if (3 & t) return st(n, e);
          if (4 & t) return Su(-1, e[n.index]);
          if (8 & t) {
            const r = n.child;
            if (null !== r) return ys(e, r);
            {
              const o = e[n.index];
              return Ze(o) ? Su(-1, o) : ne(o);
            }
          }
          if (32 & t) return Du(n, e)() || ne(e[n.index]);
          {
            const r = jg(e, n);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : ys(vs(e[pe]), r)
              : ys(e, n.next);
          }
        }
        return null;
      }
      function jg(e, n) {
        return null !== n ? e[pe][Ve].projection[n.projection] : null;
      }
      function Su(e, n) {
        const t = Pe + e + 1;
        if (t < n.length) {
          const r = n[t],
            o = r[S].firstChild;
          if (null !== o) return ys(r, o);
        }
        return n[Wt];
      }
      function Iu(e, n, t, r, o, s, i) {
        for (; null != t; ) {
          const a = r[t.index],
            c = t.type;
          if (
            (i && 0 === n && (a && Be(ne(a), r), (t.flags |= 2)),
            32 != (32 & t.flags))
          )
            if (8 & c) Iu(e, n, t.child, r, o, s, !1), Xr(n, e, o, a, s);
            else if (32 & c) {
              const l = Du(t, r);
              let u;
              for (; (u = l()); ) Xr(n, e, o, u, s);
              Xr(n, e, o, a, s);
            } else 16 & c ? Vg(e, n, r, t, o, s) : Xr(n, e, o, a, s);
          t = i ? t.projectionNext : t.next;
        }
      }
      function Ds(e, n, t, r, o, s) {
        Iu(t, r, e.firstChild, n, o, s, !1);
      }
      function Vg(e, n, t, r, o, s) {
        const i = t[pe],
          c = i[Ve].projection[r.projection];
        if (Array.isArray(c))
          for (let l = 0; l < c.length; l++) Xr(n, e, o, c[l], s);
        else {
          let l = c;
          const u = i[ie];
          Da(r) && (l.flags |= 128), Iu(e, n, l, u, o, s, !0);
        }
      }
      function Bg(e, n, t) {
        "" === t
          ? e.removeAttribute(n, "class")
          : e.setAttribute(n, "class", t);
      }
      function $g(e, n, t) {
        const { mergedAttrs: r, classes: o, styles: s } = t;
        null !== r && Ll(e, n, r),
          null !== o && Bg(e, n, o),
          null !== s &&
            (function MA(e, n, t) {
              e.setAttribute(n, "style", t);
            })(e, n, s);
      }
      class Gg {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function Un(e) {
        return e instanceof Gg ? e.changingThisBreaksApplicationSecurity : e;
      }
      const bs = new w("ENVIRONMENT_INITIALIZER"),
        tv = new w("INJECTOR", -1),
        nv = new w("INJECTOR_DEF_TYPES");
      class Pu {
        get(n, t = Yo) {
          if (t === Yo) {
            const r = new Error(`NullInjectorError: No provider for ${we(n)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return t;
        }
      }
      function eT(...e) {
        return { ɵproviders: rv(0, e), ɵfromNgModule: !0 };
      }
      function rv(e, ...n) {
        const t = [],
          r = new Set();
        let o;
        const s = (i) => {
          t.push(i);
        };
        return (
          Kr(n, (i) => {
            const a = i;
            Ra(a, s, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && ov(o, s),
          t
        );
      }
      function ov(e, n) {
        for (let t = 0; t < e.length; t++) {
          const { ngModule: r, providers: o } = e[t];
          ku(o, (s) => {
            n(s, r);
          });
        }
      }
      function Ra(e, n, t, r) {
        if (!(e = x(e))) return !1;
        let o = null,
          s = $i(e);
        const i = !s && z(e);
        if (s || i) {
          if (i && !i.standalone) return !1;
          o = e;
        } else {
          const c = e.ngModule;
          if (((s = $i(c)), !s)) return !1;
          o = c;
        }
        const a = r.has(o);
        if (i) {
          if (a) return !1;
          if ((r.add(o), i.dependencies)) {
            const c =
              "function" == typeof i.dependencies
                ? i.dependencies()
                : i.dependencies;
            for (const l of c) Ra(l, n, t, r);
          }
        } else {
          if (!s) return !1;
          {
            if (null != s.imports && !a) {
              let l;
              r.add(o);
              try {
                Kr(s.imports, (u) => {
                  Ra(u, n, t, r) && ((l ||= []), l.push(u));
                });
              } finally {
              }
              void 0 !== l && ov(l, n);
            }
            if (!a) {
              const l = ir(o) || (() => new o());
              n({ provide: o, useFactory: l, deps: q }, o),
                n({ provide: nv, useValue: o, multi: !0 }, o),
                n({ provide: bs, useValue: () => b(o), multi: !0 }, o);
            }
            const c = s.providers;
            if (null != c && !a) {
              const l = e;
              ku(c, (u) => {
                n(u, l);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function ku(e, n) {
        for (let t of e)
          Il(t) && (t = t.ɵproviders), Array.isArray(t) ? ku(t, n) : n(t);
      }
      const tT = Y({ provide: String, useValue: Y });
      function ju(e) {
        return null !== e && "object" == typeof e && tT in e;
      }
      function ur(e) {
        return "function" == typeof e;
      }
      const Lu = new w("Set Injector scope."),
        Na = {},
        rT = {};
      let Vu;
      function Oa() {
        return void 0 === Vu && (Vu = new Pu()), Vu;
      }
      class at {}
      class ro extends at {
        get destroyed() {
          return this._destroyed;
        }
        constructor(n, t, r, o) {
          super(),
            (this.parent = t),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            $u(n, (i) => this.processProvider(i)),
            this.records.set(tv, oo(void 0, this)),
            o.has("environment") && this.records.set(at, oo(void 0, this));
          const s = this.records.get(Lu);
          null != s && "string" == typeof s.value && this.scopes.add(s.value),
            (this.injectorDefTypes = new Set(this.get(nv.multi, q, $.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            const n = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const t of n) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(n) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(n),
            () => this.removeOnDestroy(n)
          );
        }
        runInContext(n) {
          this.assertNotDestroyed();
          const t = Fn(this),
            r = rt(void 0);
          try {
            return n();
          } finally {
            Fn(t), rt(r);
          }
        }
        get(n, t = Yo, r = $.Default) {
          if ((this.assertNotDestroyed(), n.hasOwnProperty(zp)))
            return n[zp](this);
          r = zi(r);
          const s = Fn(this),
            i = rt(void 0);
          try {
            if (!(r & $.SkipSelf)) {
              let c = this.records.get(n);
              if (void 0 === c) {
                const l =
                  (function cT(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof w)
                    );
                  })(n) && Bi(n);
                (c = l && this.injectableDefInScope(l) ? oo(Bu(n), Na) : null),
                  this.records.set(n, c);
              }
              if (null != c) return this.hydrate(n, c);
            }
            return (r & $.Self ? Oa() : this.parent).get(
              n,
              (t = r & $.Optional && t === Yo ? null : t)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Hi] = a[Hi] || []).unshift(we(n)), s)) throw a;
              return (function rI(e, n, t, r) {
                const o = e[Hi];
                throw (
                  (n[$p] && o.unshift(n[$p]),
                  (e.message = (function oI(e, n, t, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = we(n);
                    if (Array.isArray(n)) o = n.map(we).join(" -> ");
                    else if ("object" == typeof n) {
                      let s = [];
                      for (let i in n)
                        if (n.hasOwnProperty(i)) {
                          let a = n[i];
                          s.push(
                            i +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : we(a))
                          );
                        }
                      o = `{${s.join(", ")}}`;
                    }
                    return `${t}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      JS,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, t, r)),
                  (e.ngTokenPath = o),
                  (e[Hi] = null),
                  e)
                );
              })(a, n, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            rt(i), Fn(s);
          }
        }
        resolveInjectorInitializers() {
          const n = Fn(this),
            t = rt(void 0);
          try {
            const o = this.get(bs.multi, q, $.Self);
            for (const s of o) s();
          } finally {
            Fn(n), rt(t);
          }
        }
        toString() {
          const n = [],
            t = this.records;
          for (const r of t.keys()) n.push(we(r));
          return `R3Injector[${n.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new D(205, !1);
        }
        processProvider(n) {
          let t = ur((n = x(n))) ? n : x(n && n.provide);
          const r = (function sT(e) {
            return ju(e) ? oo(void 0, e.useValue) : oo(av(e), Na);
          })(n);
          if (ur(n) || !0 !== n.multi) this.records.get(t);
          else {
            let o = this.records.get(t);
            o ||
              ((o = oo(void 0, Na, !0)),
              (o.factory = () => Fl(o.multi)),
              this.records.set(t, o)),
              (t = n),
              o.multi.push(n);
          }
          this.records.set(t, r);
        }
        hydrate(n, t) {
          return (
            t.value === Na && ((t.value = rT), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function aT(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1;
          const t = x(n.providedIn);
          return "string" == typeof t
            ? "any" === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
        removeOnDestroy(n) {
          const t = this._onDestroyHooks.indexOf(n);
          -1 !== t && this._onDestroyHooks.splice(t, 1);
        }
      }
      function Bu(e) {
        const n = Bi(e),
          t = null !== n ? n.factory : ir(e);
        if (null !== t) return t;
        if (e instanceof w) throw new D(204, !1);
        if (e instanceof Function)
          return (function oT(e) {
            const n = e.length;
            if (n > 0)
              throw (
                ((function ps(e, n) {
                  const t = [];
                  for (let r = 0; r < e; r++) t.push(n);
                  return t;
                })(n, "?"),
                new D(204, !1))
              );
            const t = (function ZS(e) {
              return (e && (e[Ui] || e[jp])) || null;
            })(e);
            return null !== t ? () => t.factory(e) : () => new e();
          })(e);
        throw new D(204, !1);
      }
      function av(e, n, t) {
        let r;
        if (ur(e)) {
          const o = x(e);
          return ir(o) || Bu(o);
        }
        if (ju(e)) r = () => x(e.useValue);
        else if (
          (function iv(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Fl(e.deps || []));
        else if (
          (function sv(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => b(x(e.useExisting));
        else {
          const o = x(e && (e.useClass || e.provide));
          if (
            !(function iT(e) {
              return !!e.deps;
            })(e)
          )
            return ir(o) || Bu(o);
          r = () => new o(...Fl(e.deps));
        }
        return r;
      }
      function oo(e, n, t = !1) {
        return { factory: e, value: n, multi: t ? [] : void 0 };
      }
      function $u(e, n) {
        for (const t of e)
          Array.isArray(t) ? $u(t, n) : t && Il(t) ? $u(t.ɵproviders, n) : n(t);
      }
      const xa = new w("AppId", { providedIn: "root", factory: () => lT }),
        lT = "ng",
        cv = new w("Platform Initializer"),
        dr = new w("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        lv = new w("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function to() {
              if (void 0 !== Au) return Au;
              if (typeof document < "u") return document;
              throw new D(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let uv = (e, n, t) => null;
      function Ku(e, n, t = !1) {
        return uv(e, n, t);
      }
      class DT {}
      class hv {}
      class _T {
        resolveComponentFactory(n) {
          throw (function CT(e) {
            const n = Error(`No component factory found for ${we(e)}.`);
            return (n.ngComponent = e), n;
          })(n);
        }
      }
      let ao = (() => {
        class e {
          static #e = (this.NULL = new _T());
        }
        return e;
      })();
      function wT() {
        return co(ke(), y());
      }
      function co(e, n) {
        return new vt(st(e, n));
      }
      let vt = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t;
          }
          static #e = (this.__NG_ELEMENT_ID__ = wT);
        }
        return e;
      })();
      class mv {}
      let Cn = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function ET() {
                const e = y(),
                  t = mt(ke().index, e);
                return (ot(t) ? t : e)[k];
              })());
          }
          return e;
        })(),
        ST = (() => {
          class e {
            static #e = (this.ɵprov = E({
              token: e,
              providedIn: "root",
              factory: () => null,
            }));
          }
          return e;
        })();
      class Is {
        constructor(n) {
          (this.full = n),
            (this.major = n.split(".")[0]),
            (this.minor = n.split(".")[1]),
            (this.patch = n.split(".").slice(2).join("."));
        }
      }
      const IT = new Is("16.2.12"),
        Ju = {};
      function Dv(e, n = null, t = null, r) {
        const o = Cv(e, n, t, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Cv(e, n = null, t = null, r, o = new Set()) {
        const s = [t || q, eT(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : we(e))),
          new ro(s, n || Oa(), r || null, o)
        );
      }
      let Te = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = Yo);
          static #t = (this.NULL = new Pu());
          static create(t, r) {
            if (Array.isArray(t)) return Dv({ name: "" }, r, t, "");
            {
              const o = t.name ?? "";
              return Dv({ name: o }, t.parent, t.providers, o);
            }
          }
          static #n = (this.ɵprov = E({
            token: e,
            providedIn: "any",
            factory: () => b(tv),
          }));
          static #r = (this.__NG_ELEMENT_ID__ = -1);
        }
        return e;
      })();
      function ed(e) {
        return e.ngOriginalError;
      }
      class _n {
        constructor() {
          this._console = console;
        }
        handleError(n) {
          const t = this._findOriginalError(n);
          this._console.error("ERROR", n),
            t && this._console.error("ORIGINAL ERROR", t);
        }
        _findOriginalError(n) {
          let t = n && ed(n);
          for (; t && ed(t); ) t = ed(t);
          return t || null;
        }
      }
      function nd(e) {
        return (n) => {
          setTimeout(e, void 0, n);
        };
      }
      const de = class xT extends Ge {
        constructor(n = !1) {
          super(), (this.__isAsync = n);
        }
        emit(n) {
          super.next(n);
        }
        subscribe(n, t, r) {
          let o = n,
            s = t || (() => null),
            i = r;
          if (n && "object" == typeof n) {
            const c = n;
            (o = c.next?.bind(c)),
              (s = c.error?.bind(c)),
              (i = c.complete?.bind(c));
          }
          this.__isAsync && ((s = nd(s)), o && (o = nd(o)), i && (i = nd(i)));
          const a = super.subscribe({ next: o, error: s, complete: i });
          return n instanceof Me && n.add(a), a;
        }
      };
      function wv(...e) {}
      class re {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new de(!1)),
            (this.onMicrotaskEmpty = new de(!1)),
            (this.onStable = new de(!1)),
            (this.onError = new de(!1)),
            typeof Zone > "u")
          )
            throw new D(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && t),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function PT() {
              const e = "function" == typeof te.requestAnimationFrame;
              let n = te[e ? "requestAnimationFrame" : "setTimeout"],
                t = te[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && n && t) {
                const r = n[Zone.__symbol__("OriginalDelegate")];
                r && (n = r);
                const o = t[Zone.__symbol__("OriginalDelegate")];
                o && (t = o);
              }
              return {
                nativeRequestAnimationFrame: n,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function jT(e) {
              const n = () => {
                !(function kT(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(te, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                od(e),
                                (e.isCheckStableRunning = !0),
                                rd(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    od(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, o, s, i, a) => {
                  if (
                    (function VT(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return t.invokeTask(o, s, i, a);
                  try {
                    return bv(e), t.invokeTask(o, s, i, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      Ev(e);
                  }
                },
                onInvoke: (t, r, o, s, i, a, c) => {
                  try {
                    return bv(e), t.invoke(o, s, i, a, c);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), Ev(e);
                  }
                },
                onHasTask: (t, r, o, s) => {
                  t.hasTask(o, s),
                    r === o &&
                      ("microTask" == s.change
                        ? ((e._hasPendingMicrotasks = s.microTask),
                          od(e),
                          rd(e))
                        : "macroTask" == s.change &&
                          (e.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (t, r, o, s) => (
                  t.handleError(o, s),
                  e.runOutsideAngular(() => e.onError.emit(s)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!re.isInAngularZone()) throw new D(909, !1);
        }
        static assertNotInAngularZone() {
          if (re.isInAngularZone()) throw new D(909, !1);
        }
        run(n, t, r) {
          return this._inner.run(n, t, r);
        }
        runTask(n, t, r, o) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + o, n, FT, wv, wv);
          try {
            return s.runTask(i, t, r);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(n, t, r) {
          return this._inner.runGuarded(n, t, r);
        }
        runOutsideAngular(n) {
          return this._outer.run(n);
        }
      }
      const FT = {};
      function rd(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function od(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function bv(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Ev(e) {
        e._nesting--, rd(e);
      }
      class LT {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new de()),
            (this.onMicrotaskEmpty = new de()),
            (this.onStable = new de()),
            (this.onError = new de());
        }
        run(n, t, r) {
          return n.apply(t, r);
        }
        runGuarded(n, t, r) {
          return n.apply(t, r);
        }
        runOutsideAngular(n) {
          return n();
        }
        runTask(n, t, r, o) {
          return n.apply(t, r);
        }
      }
      const Sv = new w("", { providedIn: "root", factory: Iv });
      function Iv() {
        const e = I(re);
        let n = !0;
        return (function VS(...e) {
          const n = Ko(e),
            t = (function OS(e, n) {
              return "number" == typeof wl(e) ? e.pop() : n;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? bt(r[0]) : Nr(t)(ye(r, n))) : zt;
        })(
          new le((o) => {
            (n =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(n), o.complete();
              });
          }),
          new le((o) => {
            let s;
            e.runOutsideAngular(() => {
              s = e.onStable.subscribe(() => {
                re.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !n &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((n = !0), o.next(!0));
                  });
              });
            });
            const i = e.onUnstable.subscribe(() => {
              re.assertInAngularZone(),
                n &&
                  ((n = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              s.unsubscribe(), i.unsubscribe();
            };
          }).pipe(xp())
        );
      }
      function wn(e) {
        return e instanceof Function ? e() : e;
      }
      let sd = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static #e = (this.ɵprov = E({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function Ms(e) {
        for (; e; ) {
          e[L] |= 64;
          const n = vs(e);
          if ($l(e) && !n) return e;
          e = n;
        }
        return null;
      }
      const Nv = new w("", { providedIn: "root", factory: () => !1 });
      let Ba = null;
      function Fv(e, n) {
        return e[n] ?? Lv();
      }
      function kv(e, n) {
        const t = Lv();
        t.producerNode?.length && ((e[n] = Ba), (t.lView = e), (Ba = jv()));
      }
      const KT = {
        ...am,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          Ms(e.lView);
        },
        lView: null,
      };
      function jv() {
        return Object.create(KT);
      }
      function Lv() {
        return (Ba ??= jv()), Ba;
      }
      const j = {};
      function Se(e) {
        Vv(G(), y(), Ye() + e, !1);
      }
      function Vv(e, n, t, r) {
        if (!r)
          if (3 == (3 & n[L])) {
            const s = e.preOrderCheckHooks;
            null !== s && oa(n, s, t);
          } else {
            const s = e.preOrderHooks;
            null !== s && sa(n, s, 0, t);
          }
        ar(t);
      }
      function C(e, n = $.Default) {
        const t = y();
        return null === t ? b(e, n) : Jm(ke(), t, x(e), n);
      }
      function $a(e, n, t, r, o, s, i, a, c, l, u) {
        const d = n.blueprint.slice();
        return (
          (d[ue] = o),
          (d[L] = 140 | r),
          (null !== l || (e && 2048 & e[L])) && (d[L] |= 2048),
          Mm(d),
          (d[ie] = d[kr] = e),
          (d[he] = t),
          (d[Fr] = i || (e && e[Fr])),
          (d[k] = a || (e && e[k])),
          (d[kn] = c || (e && e[kn]) || null),
          (d[Ve] = s),
          (d[rs] = (function nA() {
            return tA++;
          })()),
          (d[gn] = u),
          (d[rm] = l),
          (d[pe] = 2 == n.type ? e[pe] : d),
          d
        );
      }
      function fo(e, n, t, r, o) {
        let s = e.data[n];
        if (null === s)
          (s = (function id(e, n, t, r, o) {
            const s = xm(),
              i = Kl(),
              c = (e.data[n] = (function r1(e, n, t, r, o, s) {
                let i = n ? n.injectorIndex : -1,
                  a = 0;
                return (
                  (function $r() {
                    return null !== O.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: t,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: i,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: s,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: n,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, i ? s : s && s.parent, t, n, r, o));
            return (
              null === e.firstChild && (e.firstChild = c),
              null !== s &&
                (i
                  ? null == s.child && null !== c.parent && (s.child = c)
                  : null === s.next && ((s.next = c), (c.prev = s))),
              c
            );
          })(e, n, t, r, o)),
            (function tM() {
              return O.lFrame.inI18n;
            })() && (s.flags |= 32);
        else if (64 & s.type) {
          (s.type = t), (s.value = r), (s.attrs = o);
          const i = (function cs() {
            const e = O.lFrame,
              n = e.currentTNode;
            return e.isParent ? n : n.parent;
          })();
          s.injectorIndex = null === i ? -1 : i.injectorIndex;
        }
        return Kt(s, !0), s;
      }
      function As(e, n, t, r) {
        if (0 === t) return -1;
        const o = n.length;
        for (let s = 0; s < t; s++)
          n.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function $v(e, n, t, r, o) {
        const s = Fv(n, os),
          i = Ye(),
          a = 2 & r;
        try {
          ar(-1), a && n.length > U && Vv(e, n, U, !1), Zt(a ? 2 : 0, o);
          const l = a ? s : null,
            u = Hl(l);
          try {
            null !== l && (l.dirty = !1), t(r, o);
          } finally {
            zl(l, u);
          }
        } finally {
          a && null === n[os] && kv(n, os), ar(i), Zt(a ? 3 : 1, o);
        }
      }
      function ad(e, n, t) {
        if (Bl(n)) {
          const r = St(null);
          try {
            const s = n.directiveEnd;
            for (let i = n.directiveStart; i < s; i++) {
              const a = e.data[i];
              a.contentQueries && a.contentQueries(1, t[i], i);
            }
          } finally {
            St(r);
          }
        }
      }
      function cd(e, n, t) {
        Om() &&
          ((function u1(e, n, t, r) {
            const o = t.directiveStart,
              s = t.directiveEnd;
            sr(t) &&
              (function v1(e, n, t) {
                const r = st(n, e),
                  o = Uv(t);
                let i = 16;
                t.signals ? (i = 4096) : t.onPush && (i = 64);
                const a = Ua(
                  e,
                  $a(
                    e,
                    o,
                    null,
                    i,
                    r,
                    n,
                    null,
                    e[Fr].rendererFactory.createRenderer(r, t),
                    null,
                    null,
                    null
                  )
                );
                e[n.index] = a;
              })(n, t, e.data[o + t.componentOffset]),
              e.firstCreatePass || aa(t, n),
              Be(r, n);
            const i = t.initialInputs;
            for (let a = o; a < s; a++) {
              const c = e.data[a],
                l = cr(n, e, a, t);
              Be(l, n),
                null !== i && y1(0, a - o, l, c, 0, i),
                kt(c) && (mt(t.index, n)[he] = cr(n, e, a, t));
            }
          })(e, n, t, st(t, n)),
          64 == (64 & t.flags) && Wv(e, n, t));
      }
      function ld(e, n, t = st) {
        const r = n.localNames;
        if (null !== r) {
          let o = n.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const i = r[s + 1],
              a = -1 === i ? t(n, e) : e[i];
            e[o++] = a;
          }
        }
      }
      function Uv(e) {
        const n = e.tView;
        return null === n || n.incompleteFirstPass
          ? (e.tView = ud(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : n;
      }
      function ud(e, n, t, r, o, s, i, a, c, l, u) {
        const d = U + r,
          f = d + o,
          h = (function QT(e, n) {
            const t = [];
            for (let r = 0; r < n; r++) t.push(r < e ? null : j);
            return t;
          })(d, f),
          p = "function" == typeof l ? l() : l;
        return (h[S] = {
          type: e,
          blueprint: h,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof i ? i() : i,
          firstChild: null,
          schemas: c,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: u,
        });
      }
      let Hv = (e) => null;
      function zv(e, n, t, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            t = null === t ? {} : t;
            const s = e[o];
            null === r
              ? Gv(t, n, o, s)
              : r.hasOwnProperty(o) && Gv(t, n, r[o], s);
          }
        return t;
      }
      function Gv(e, n, t, r) {
        e.hasOwnProperty(t) ? e[t].push(n, r) : (e[t] = [n, r]);
      }
      function dd(e, n, t, r) {
        if (Om()) {
          const o = null === r ? null : { "": -1 },
            s = (function f1(e, n) {
              const t = e.directiveRegistry;
              let r = null,
                o = null;
              if (t)
                for (let s = 0; s < t.length; s++) {
                  const i = t[s];
                  if (Qp(n, i.selectors, !1))
                    if ((r || (r = []), kt(i)))
                      if (null !== i.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          i.findHostDirectiveDefs(i, a, o),
                          r.unshift(...a, i),
                          fd(e, n, a.length);
                      } else r.unshift(i), fd(e, n, 0);
                    else
                      (o = o || new Map()),
                        i.findHostDirectiveDefs?.(i, r, o),
                        r.push(i);
                }
              return null === r ? null : [r, o];
            })(e, t);
          let i, a;
          null === s ? (i = a = null) : ([i, a] = s),
            null !== i && qv(e, n, t, i, o, a),
            o &&
              (function h1(e, n, t) {
                if (n) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < n.length; o += 2) {
                    const s = t[n[o + 1]];
                    if (null == s) throw new D(-301, !1);
                    r.push(n[o], s);
                  }
                }
              })(t, r, o);
        }
        t.mergedAttrs = Xo(t.mergedAttrs, t.attrs);
      }
      function qv(e, n, t, r, o, s) {
        for (let l = 0; l < r.length; l++) au(aa(t, n), e, r[l].type);
        !(function m1(e, n, t) {
          (e.flags |= 1),
            (e.directiveStart = n),
            (e.directiveEnd = n + t),
            (e.providerIndexes = n);
        })(t, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const u = r[l];
          u.providersResolver && u.providersResolver(u);
        }
        let i = !1,
          a = !1,
          c = As(e, n, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const u = r[l];
          (t.mergedAttrs = Xo(t.mergedAttrs, u.hostAttrs)),
            g1(e, t, n, c, u),
            p1(c, u, o),
            null !== u.contentQueries && (t.flags |= 4),
            (null !== u.hostBindings ||
              null !== u.hostAttrs ||
              0 !== u.hostVars) &&
              (t.flags |= 64);
          const d = u.type.prototype;
          !i &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(t.index), (i = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(t.index), (a = !0)),
            c++;
        }
        !(function o1(e, n, t) {
          const o = n.directiveEnd,
            s = e.data,
            i = n.attrs,
            a = [];
          let c = null,
            l = null;
          for (let u = n.directiveStart; u < o; u++) {
            const d = s[u],
              f = t ? t.get(d) : null,
              p = f ? f.outputs : null;
            (c = zv(d.inputs, u, c, f ? f.inputs : null)),
              (l = zv(d.outputs, u, l, p));
            const m = null === c || null === i || Yp(n) ? null : D1(c, u, i);
            a.push(m);
          }
          null !== c &&
            (c.hasOwnProperty("class") && (n.flags |= 8),
            c.hasOwnProperty("style") && (n.flags |= 16)),
            (n.initialInputs = a),
            (n.inputs = c),
            (n.outputs = l);
        })(e, t, s);
      }
      function Wv(e, n, t) {
        const r = t.directiveStart,
          o = t.directiveEnd,
          s = t.index,
          i = (function rM() {
            return O.lFrame.currentDirectiveIndex;
          })();
        try {
          ar(s);
          for (let a = r; a < o; a++) {
            const c = e.data[a],
              l = n[a];
            Ql(a),
              (null !== c.hostBindings ||
                0 !== c.hostVars ||
                null !== c.hostAttrs) &&
                d1(c, l);
          }
        } finally {
          ar(-1), Ql(i);
        }
      }
      function d1(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n);
      }
      function fd(e, n, t) {
        (n.componentOffset = t), (e.components ??= []).push(n.index);
      }
      function p1(e, n, t) {
        if (t) {
          if (n.exportAs)
            for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
          kt(n) && (t[""] = e);
        }
      }
      function g1(e, n, t, r, o) {
        e.data[r] = o;
        const s = o.factory || (o.factory = ir(o.type)),
          i = new ls(s, kt(o), C);
        (e.blueprint[r] = i),
          (t[r] = i),
          (function c1(e, n, t, r, o) {
            const s = o.hostBindings;
            if (s) {
              let i = e.hostBindingOpCodes;
              null === i && (i = e.hostBindingOpCodes = []);
              const a = ~n.index;
              (function l1(e) {
                let n = e.length;
                for (; n > 0; ) {
                  const t = e[--n];
                  if ("number" == typeof t && t < 0) return t;
                }
                return 0;
              })(i) != a && i.push(a),
                i.push(t, r, s);
            }
          })(e, n, r, As(e, t, o.hostVars, j), o);
      }
      function y1(e, n, t, r, o, s) {
        const i = s[n];
        if (null !== i)
          for (let a = 0; a < i.length; ) Zv(r, t, i[a++], i[a++], i[a++]);
      }
      function Zv(e, n, t, r, o) {
        const s = St(null);
        try {
          const i = e.inputTransforms;
          null !== i && i.hasOwnProperty(r) && (o = i[r].call(n, o)),
            null !== e.setInput ? e.setInput(n, o, t, r) : (n[r] = o);
        } finally {
          St(s);
        }
      }
      function D1(e, n, t) {
        let r = null,
          o = 0;
        for (; o < t.length; ) {
          const s = t[o];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              if (e.hasOwnProperty(s)) {
                null === r && (r = []);
                const i = e[s];
                for (let a = 0; a < i.length; a += 2)
                  if (i[a] === n) {
                    r.push(s, i[a + 1], t[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function Kv(e, n, t, r) {
        return [e, !0, !1, n, null, 0, r, t, null, null, null];
      }
      function Yv(e, n) {
        const t = e.contentQueries;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const s = t[r + 1];
            if (-1 !== s) {
              const i = e.data[s];
              Xl(t[r]), i.contentQueries(2, n[s], s);
            }
          }
      }
      function Ua(e, n) {
        return e[ts] ? (e[nm][Ft] = n) : (e[ts] = n), (e[nm] = n), n;
      }
      function pd(e, n, t) {
        Xl(0);
        const r = St(null);
        try {
          n(e, t);
        } finally {
          St(r);
        }
      }
      function ey(e, n) {
        const t = e[kn],
          r = t ? t.get(_n, null) : null;
        r && r.handleError(n);
      }
      function md(e, n, t, r, o) {
        for (let s = 0; s < t.length; ) {
          const i = t[s++],
            a = t[s++];
          Zv(e.data[i], n[i], r, a, o);
        }
      }
      function C1(e, n) {
        const t = mt(n, e),
          r = t[S];
        !(function _1(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++)
            n.push(e.blueprint[t]);
        })(r, t);
        const o = t[ue];
        null !== o && null === t[gn] && (t[gn] = Ku(o, t[kn])), gd(r, t, t[he]);
      }
      function gd(e, n, t) {
        eu(n);
        try {
          const r = e.viewQuery;
          null !== r && pd(1, r, t);
          const o = e.template;
          null !== o && $v(e, n, o, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Yv(e, n),
            e.staticViewQueries && pd(2, e.viewQuery, t);
          const s = e.components;
          null !== s &&
            (function w1(e, n) {
              for (let t = 0; t < n.length; t++) C1(e, n[t]);
            })(n, s);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (n[L] &= -5), tu();
        }
      }
      let ty = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(t, r, o) {
            const s = typeof Zone > "u" ? null : Zone.current,
              i = (function xI(e, n, t) {
                const r = Object.create(PI);
                t && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = n);
                const o = (i) => {
                  r.cleanupFn = i;
                };
                return (
                  (r.ref = {
                    notify: () => dm(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !fm(r))) return;
                      r.hasRun = !0;
                      const i = Hl(r);
                      try {
                        r.cleanupFn(), (r.cleanupFn = Cm), r.fn(o);
                      } finally {
                        zl(r, i);
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                );
              })(
                t,
                (l) => {
                  this.all.has(l) && this.queue.set(l, s);
                },
                o
              );
            let a;
            this.all.add(i), i.notify();
            const c = () => {
              i.cleanup(), a?.(), this.all.delete(i), this.queue.delete(i);
            };
            return (a = r?.onDestroy(c)), { destroy: c };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [t, r] of this.queue)
                this.queue.delete(t), r ? r.run(() => t.run()) : t.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static #e = (this.ɵprov = E({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function Ha(e, n, t) {
        let r = t ? e.styles : null,
          o = t ? e.classes : null,
          s = 0;
        if (null !== n)
          for (let i = 0; i < n.length; i++) {
            const a = n[i];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (o = El(o, a))
              : 2 == s && (r = El(r, a + ": " + n[++i] + ";"));
          }
        t ? (e.styles = r) : (e.stylesWithoutHost = r),
          t ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Ts(e, n, t, r, o = !1) {
        for (; null !== t; ) {
          const s = n[t.index];
          null !== s && r.push(ne(s)), Ze(s) && ny(s, r);
          const i = t.type;
          if (8 & i) Ts(e, n, t.child, r);
          else if (32 & i) {
            const a = Du(t, n);
            let c;
            for (; (c = a()); ) r.push(c);
          } else if (16 & i) {
            const a = jg(n, t);
            if (Array.isArray(a)) r.push(...a);
            else {
              const c = vs(n[pe]);
              Ts(c[S], c, a, r, !0);
            }
          }
          t = o ? t.projectionNext : t.next;
        }
        return r;
      }
      function ny(e, n) {
        for (let t = Pe; t < e.length; t++) {
          const r = e[t],
            o = r[S].firstChild;
          null !== o && Ts(r[S], r, o, n);
        }
        e[Wt] !== e[ue] && n.push(e[Wt]);
      }
      function za(e, n, t, r = !0) {
        const o = n[Fr],
          s = o.rendererFactory,
          i = o.afterRenderEventManager;
        s.begin?.(), i?.begin();
        try {
          ry(e, n, e.template, t);
        } catch (c) {
          throw (r && ey(n, c), c);
        } finally {
          s.end?.(), o.effectManager?.flush(), i?.end();
        }
      }
      function ry(e, n, t, r) {
        const o = n[L];
        if (256 != (256 & o)) {
          n[Fr].effectManager?.flush(), eu(n);
          try {
            Mm(n),
              (function Fm(e) {
                return (O.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== t && $v(e, n, t, 2, r);
            const i = 3 == (3 & o);
            if (i) {
              const l = e.preOrderCheckHooks;
              null !== l && oa(n, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && sa(n, l, 0, null), nu(n, 0);
            }
            if (
              ((function S1(e) {
                for (let n = Sg(e); null !== n; n = Ig(n)) {
                  if (!n[om]) continue;
                  const t = n[Lr];
                  for (let r = 0; r < t.length; r++) {
                    zI(t[r]);
                  }
                }
              })(n),
              oy(n, 2),
              null !== e.contentQueries && Yv(e, n),
              i)
            ) {
              const l = e.contentCheckHooks;
              null !== l && oa(n, l);
            } else {
              const l = e.contentHooks;
              null !== l && sa(n, l, 1), nu(n, 1);
            }
            !(function YT(e, n) {
              const t = e.hostBindingOpCodes;
              if (null === t) return;
              const r = Fv(n, ss);
              try {
                for (let o = 0; o < t.length; o++) {
                  const s = t[o];
                  if (s < 0) ar(~s);
                  else {
                    const i = s,
                      a = t[++o],
                      c = t[++o];
                    nM(a, i), (r.dirty = !1);
                    const l = Hl(r);
                    try {
                      c(2, n[i]);
                    } finally {
                      zl(r, l);
                    }
                  }
                }
              } finally {
                null === n[ss] && kv(n, ss), ar(-1);
              }
            })(e, n);
            const a = e.components;
            null !== a && iy(n, a, 0);
            const c = e.viewQuery;
            if ((null !== c && pd(2, c, r), i)) {
              const l = e.viewCheckHooks;
              null !== l && oa(n, l);
            } else {
              const l = e.viewHooks;
              null !== l && sa(n, l, 2), nu(n, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (n[L] &= -73),
              Am(n);
          } finally {
            tu();
          }
        }
      }
      function oy(e, n) {
        for (let t = Sg(e); null !== t; t = Ig(t))
          for (let r = Pe; r < t.length; r++) sy(t[r], n);
      }
      function I1(e, n, t) {
        sy(mt(n, e), t);
      }
      function sy(e, n) {
        if (
          !(function UI(e) {
            return 128 == (128 & e[L]);
          })(e)
        )
          return;
        const t = e[S],
          r = e[L];
        if ((80 & r && 0 === n) || 1024 & r || 2 === n)
          ry(t, e, t.template, e[he]);
        else if (e[es] > 0) {
          oy(e, 1);
          const o = t.components;
          null !== o && iy(e, o, 1);
        }
      }
      function iy(e, n, t) {
        for (let r = 0; r < n.length; r++) I1(e, n[r], t);
      }
      class Rs {
        get rootNodes() {
          const n = this._lView,
            t = n[S];
          return Ts(t, n, t.firstChild, []);
        }
        constructor(n, t) {
          (this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[he];
        }
        set context(n) {
          this._lView[he] = n;
        }
        get destroyed() {
          return 256 == (256 & this._lView[L]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const n = this._lView[ie];
            if (Ze(n)) {
              const t = n[8],
                r = t ? t.indexOf(this) : -1;
              r > -1 && (ba(n, r), da(t, r));
            }
            this._attachedToViewContainer = !1;
          }
          _u(this._lView[S], this._lView);
        }
        onDestroy(n) {
          !(function Rm(e, n) {
            if (256 == (256 & e[L])) throw new D(911, !1);
            null === e[jn] && (e[jn] = []), e[jn].push(n);
          })(this._lView, n);
        }
        markForCheck() {
          Ms(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[L] &= -129;
        }
        reattach() {
          this._lView[L] |= 128;
        }
        detectChanges() {
          za(this._lView[S], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new D(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function gA(e, n) {
              Ds(e, n, n[k], 2, null, null);
            })(this._lView[S], this._lView);
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new D(902, !1);
          this._appRef = n;
        }
      }
      class M1 extends Rs {
        constructor(n) {
          super(n), (this._view = n);
        }
        detectChanges() {
          const n = this._view;
          za(n[S], n, n[he], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class ay extends ao {
        constructor(n) {
          super(), (this.ngModule = n);
        }
        resolveComponentFactory(n) {
          const t = z(n);
          return new Ns(t, this.ngModule);
        }
      }
      function cy(e) {
        const n = [];
        for (let t in e)
          e.hasOwnProperty(t) && n.push({ propName: e[t], templateName: t });
        return n;
      }
      class T1 {
        constructor(n, t) {
          (this.injector = n), (this.parentInjector = t);
        }
        get(n, t, r) {
          r = zi(r);
          const o = this.injector.get(n, Ju, r);
          return o !== Ju || t === Ju ? o : this.parentInjector.get(n, t, r);
        }
      }
      class Ns extends hv {
        get inputs() {
          const n = this.componentDef,
            t = n.inputTransforms,
            r = cy(n.inputs);
          if (null !== t)
            for (const o of r)
              t.hasOwnProperty(o.propName) && (o.transform = t[o.propName]);
          return r;
        }
        get outputs() {
          return cy(this.componentDef.outputs);
        }
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function pI(e) {
              return e.map(hI).join(",");
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors
              ? n.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        create(n, t, r, o) {
          let s = (o = o || this.ngModule) instanceof at ? o : o?.injector;
          s &&
            null !== this.componentDef.getStandaloneInjector &&
            (s = this.componentDef.getStandaloneInjector(s) || s);
          const i = s ? new T1(n, s) : n,
            a = i.get(mv, null);
          if (null === a) throw new D(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: i.get(ST, null),
              effectManager: i.get(ty, null),
              afterRenderEventManager: i.get(sd, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = r
              ? (function JT(e, n, t, r) {
                  const s = r.get(Nv, !1) || t === xt.ShadowDom,
                    i = e.selectRootElement(n, s);
                  return (
                    (function XT(e) {
                      Hv(e);
                    })(i),
                    i
                  );
                })(f, r, this.componentDef.encapsulation, i)
              : wa(
                  f,
                  h,
                  (function A1(e) {
                    const n = e.toLowerCase();
                    return "svg" === n ? "svg" : "math" === n ? "math" : null;
                  })(h)
                ),
            _ = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let g = null;
          null !== p && (g = Ku(p, i, !0));
          const M = ud(0, null, null, 1, 0, null, null, null, null, null, null),
            T = $a(null, M, null, _, null, null, d, f, i, null, g);
          let B, Re;
          eu(T);
          try {
            const fn = this.componentDef;
            let Rr,
              ap = null;
            fn.findHostDirectiveDefs
              ? ((Rr = []),
                (ap = new Map()),
                fn.findHostDirectiveDefs(fn, Rr, ap),
                Rr.push(fn))
              : (Rr = [fn]);
            const Y9 = (function N1(e, n) {
                const t = e[S],
                  r = U;
                return (e[r] = n), fo(t, r, 2, "#host", null);
              })(T, p),
              Q9 = (function O1(e, n, t, r, o, s, i) {
                const a = o[S];
                !(function x1(e, n, t, r) {
                  for (const o of e)
                    n.mergedAttrs = Xo(n.mergedAttrs, o.hostAttrs);
                  null !== n.mergedAttrs &&
                    (Ha(n, n.mergedAttrs, !0), null !== t && $g(r, t, n));
                })(r, e, n, i);
                let c = null;
                null !== n && (c = Ku(n, o[kn]));
                const l = s.rendererFactory.createRenderer(n, t);
                let u = 16;
                t.signals ? (u = 4096) : t.onPush && (u = 64);
                const d = $a(
                  o,
                  Uv(t),
                  null,
                  u,
                  o[e.index],
                  e,
                  s,
                  l,
                  null,
                  null,
                  c
                );
                return (
                  a.firstCreatePass && fd(a, e, r.length - 1),
                  Ua(o, d),
                  (o[e.index] = d)
                );
              })(Y9, p, fn, Rr, T, d, f);
            (Re = Im(M, U)),
              p &&
                (function F1(e, n, t, r) {
                  if (r) Ll(e, t, ["ng-version", IT.full]);
                  else {
                    const { attrs: o, classes: s } = (function mI(e) {
                      const n = [],
                        t = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let s = e[r];
                        if ("string" == typeof s)
                          2 === o
                            ? "" !== s && n.push(s, e[++r])
                            : 8 === o && t.push(s);
                        else {
                          if (!Pt(o)) break;
                          o = s;
                        }
                        r++;
                      }
                      return { attrs: n, classes: t };
                    })(n.selectors[0]);
                    o && Ll(e, t, o),
                      s && s.length > 0 && Bg(e, t, s.join(" "));
                  }
                })(f, fn, p, r),
              void 0 !== t &&
                (function k1(e, n, t) {
                  const r = (e.projection = []);
                  for (let o = 0; o < n.length; o++) {
                    const s = t[o];
                    r.push(null != s ? Array.from(s) : null);
                  }
                })(Re, this.ngContentSelectors, t),
              (B = (function P1(e, n, t, r, o, s) {
                const i = ke(),
                  a = o[S],
                  c = st(i, o);
                qv(a, o, i, t, null, r);
                for (let u = 0; u < t.length; u++)
                  Be(cr(o, a, i.directiveStart + u, i), o);
                Wv(a, o, i), c && Be(c, o);
                const l = cr(o, a, i.directiveStart + i.componentOffset, i);
                if (((e[he] = o[he] = l), null !== s))
                  for (const u of s) u(l, n);
                return ad(a, i, e), l;
              })(Q9, fn, Rr, ap, T, [j1])),
              gd(M, T, null);
          } finally {
            tu();
          }
          return new R1(this.componentType, B, co(Re, T), T, Re);
        }
      }
      class R1 extends DT {
        constructor(n, t, r, o, s) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = s),
            (this.previousInputValues = null),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new M1(o)),
            (this.componentType = n);
        }
        setInput(n, t) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[n])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(n) &&
                Object.is(this.previousInputValues.get(n), t))
            )
              return;
            const s = this._rootLView;
            md(s[S], s, o, n, t),
              this.previousInputValues.set(n, t),
              Ms(mt(this._tNode.index, s));
          }
        }
        get injector() {
          return new Qe(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(n) {
          this.hostView.onDestroy(n);
        }
      }
      function j1() {
        const e = ke();
        ra(y()[S], e);
      }
      function Q(e) {
        let n = (function ly(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          t = !0;
        const r = [e];
        for (; n; ) {
          let o;
          if (kt(e)) o = n.ɵcmp || n.ɵdir;
          else {
            if (n.ɵcmp) throw new D(903, !1);
            o = n.ɵdir;
          }
          if (o) {
            if (t) {
              r.push(o);
              const i = e;
              (i.inputs = Ga(e.inputs)),
                (i.inputTransforms = Ga(e.inputTransforms)),
                (i.declaredInputs = Ga(e.declaredInputs)),
                (i.outputs = Ga(e.outputs));
              const a = o.hostBindings;
              a && $1(e, a);
              const c = o.viewQuery,
                l = o.contentQueries;
              if (
                (c && V1(e, c),
                l && B1(e, l),
                Li(e.inputs, o.inputs),
                Li(e.declaredInputs, o.declaredInputs),
                Li(e.outputs, o.outputs),
                null !== o.inputTransforms &&
                  (null === i.inputTransforms && (i.inputTransforms = {}),
                  Li(i.inputTransforms, o.inputTransforms)),
                kt(o) && o.data.animation)
              ) {
                const u = e.data;
                u.animation = (u.animation || []).concat(o.data.animation);
              }
            }
            const s = o.features;
            if (s)
              for (let i = 0; i < s.length; i++) {
                const a = s[i];
                a && a.ngInherit && a(e), a === Q && (t = !1);
              }
          }
          n = Object.getPrototypeOf(n);
        }
        !(function L1(e) {
          let n = 0,
            t = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = n += o.hostVars),
              (o.hostAttrs = Xo(o.hostAttrs, (t = Xo(t, o.hostAttrs))));
          }
        })(r);
      }
      function Ga(e) {
        return e === Gt ? {} : e === q ? [] : e;
      }
      function V1(e, n) {
        const t = e.viewQuery;
        e.viewQuery = t
          ? (r, o) => {
              n(r, o), t(r, o);
            }
          : n;
      }
      function B1(e, n) {
        const t = e.contentQueries;
        e.contentQueries = t
          ? (r, o, s) => {
              n(r, o, s), t(r, o, s);
            }
          : n;
      }
      function $1(e, n) {
        const t = e.hostBindings;
        e.hostBindings = t
          ? (r, o) => {
              n(r, o), t(r, o);
            }
          : n;
      }
      function qa(e) {
        return (
          !!vd(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function vd(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function $e(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0);
      }
      function po(e, n, t, r) {
        return $e(e, Ur(), t) ? n + F(t) + r : j;
      }
      function hr(e, n, t, r, o, s, i, a) {
        const c = y(),
          l = G(),
          u = e + U,
          d = l.firstCreatePass
            ? (function fR(e, n, t, r, o, s, i, a, c) {
                const l = n.consts,
                  u = fo(n, e, 4, i || null, Vn(l, a));
                dd(n, t, u, Vn(l, c)), ra(n, u);
                const d = (u.tView = ud(
                  2,
                  u,
                  r,
                  o,
                  s,
                  n.directiveRegistry,
                  n.pipeRegistry,
                  null,
                  n.schemas,
                  l,
                  null
                ));
                return (
                  null !== n.queries &&
                    (n.queries.template(n, u),
                    (d.queries = n.queries.embeddedTView(u))),
                  u
                );
              })(u, l, c, n, t, r, o, s, i)
            : l.data[u];
        Kt(d, !1);
        const f = Iy(l, c, d, e);
        na() && Sa(l, c, f, d),
          Be(f, c),
          Ua(c, (c[u] = Kv(f, c, f, d))),
          Yi(d) && cd(l, c, d),
          null != i && ld(c, d, a);
      }
      let Iy = function My(e, n, t, r) {
        return Bn(!0), n[k].createComment("");
      };
      function Dt(e, n, t) {
        const r = y();
        return (
          $e(r, Ur(), n) &&
            (function yt(e, n, t, r, o, s, i, a) {
              const c = st(n, t);
              let u,
                l = n.inputs;
              !a && null != l && (u = l[r])
                ? (md(e, t, u, r, o),
                  sr(n) &&
                    (function i1(e, n) {
                      const t = mt(n, e);
                      16 & t[L] || (t[L] |= 64);
                    })(t, n.index))
                : 3 & n.type &&
                  ((r = (function s1(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != i ? i(o, n.value || "", r) : o),
                  s.setProperty(c, r, o));
            })(
              G(),
              (function ce() {
                const e = O.lFrame;
                return Im(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              n,
              r[k],
              t,
              !1
            ),
          Dt
        );
      }
      function bd(e, n, t, r, o) {
        const i = o ? "class" : "style";
        md(e, t, n.inputs[i], i, r);
      }
      function ct(e, n, t, r) {
        const o = y(),
          s = G(),
          i = U + e,
          a = o[k],
          c = s.firstCreatePass
            ? (function vR(e, n, t, r, o, s) {
                const i = n.consts,
                  c = fo(n, e, 2, r, Vn(i, o));
                return (
                  dd(n, t, c, Vn(i, s)),
                  null !== c.attrs && Ha(c, c.attrs, !1),
                  null !== c.mergedAttrs && Ha(c, c.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, c),
                  c
                );
              })(i, s, o, n, t, r)
            : s.data[i],
          l = Ay(s, o, c, a, n, e);
        o[i] = l;
        const u = Yi(c);
        return (
          Kt(c, !0),
          $g(a, l, c),
          32 != (32 & c.flags) && na() && Sa(s, o, l, c),
          0 ===
            (function qI() {
              return O.lFrame.elementDepthCount;
            })() && Be(l, o),
          (function WI() {
            O.lFrame.elementDepthCount++;
          })(),
          u && (cd(s, o, c), ad(s, c, o)),
          null !== r && ld(o, c),
          ct
        );
      }
      function Ue() {
        let e = ke();
        Kl() ? Yl() : ((e = e.parent), Kt(e, !1));
        const n = e;
        (function KI(e) {
          return O.skipHydrationRootTNode === e;
        })(n) &&
          (function XI() {
            O.skipHydrationRootTNode = null;
          })(),
          (function ZI() {
            O.lFrame.elementDepthCount--;
          })();
        const t = G();
        return (
          t.firstCreatePass && (ra(t, e), Bl(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function pM(e) {
              return 0 != (8 & e.flags);
            })(n) &&
            bd(t, n, y(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function mM(e) {
              return 0 != (16 & e.flags);
            })(n) &&
            bd(t, n, y(), n.stylesWithoutHost, !1),
          Ue
        );
      }
      function En(e, n, t, r) {
        return ct(e, n, t, r), Ue(), En;
      }
      let Ay = (e, n, t, r, o, s) => (
        Bn(!0),
        wa(
          r,
          o,
          (function Hm() {
            return O.lFrame.currentNamespace;
          })()
        )
      );
      function ks(e, n, t) {
        const r = y(),
          o = G(),
          s = e + U,
          i = o.firstCreatePass
            ? (function CR(e, n, t, r, o) {
                const s = n.consts,
                  i = Vn(s, r),
                  a = fo(n, e, 8, "ng-container", i);
                return (
                  null !== i && Ha(a, i, !0),
                  dd(n, t, a, Vn(s, o)),
                  null !== n.queries && n.queries.elementStart(n, a),
                  a
                );
              })(s, o, r, n, t)
            : o.data[s];
        Kt(i, !0);
        const a = Ry(o, r, i, e);
        return (
          (r[s] = a),
          na() && Sa(o, r, a, i),
          Be(a, r),
          Yi(i) && (cd(o, r, i), ad(o, i, r)),
          null != t && ld(r, i),
          ks
        );
      }
      function js() {
        let e = ke();
        const n = G();
        return (
          Kl() ? Yl() : ((e = e.parent), Kt(e, !1)),
          n.firstCreatePass && (ra(n, e), Bl(e) && n.queries.elementEnd(e)),
          js
        );
      }
      let Ry = (e, n, t, r) => (Bn(!0), Cu(n[k], ""));
      function Qa() {
        return y();
      }
      function Ls(e) {
        return !!e && "function" == typeof e.then;
      }
      function Ny(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function je(e, n, t, r) {
        const o = y(),
          s = G(),
          i = ke();
        return (
          (function xy(e, n, t, r, o, s, i) {
            const a = Yi(r),
              l =
                e.firstCreatePass &&
                (function Jv(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              u = n[he],
              d = (function Qv(e) {
                return e[Pr] || (e[Pr] = []);
              })(n);
            let f = !0;
            if (3 & r.type || i) {
              const m = st(r, n),
                v = i ? i(m) : m,
                _ = d.length,
                g = i ? (T) => i(ne(T[r.index])) : r.index;
              let M = null;
              if (
                (!i &&
                  a &&
                  (M = (function bR(e, n, t, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let s = 0; s < o.length - 1; s += 2) {
                        const i = o[s];
                        if (i === t && o[s + 1] === r) {
                          const a = n[Pr],
                            c = o[s + 2];
                          return a.length > c ? a[c] : null;
                        }
                        "string" == typeof i && (s += 2);
                      }
                    return null;
                  })(e, n, o, r.index)),
                null !== M)
              )
                ((M.__ngLastListenerFn__ || M).__ngNextListenerFn__ = s),
                  (M.__ngLastListenerFn__ = s),
                  (f = !1);
              else {
                s = Fy(r, n, u, s, !1);
                const T = t.listen(v, o, s);
                d.push(s, T), l && l.push(o, g, _, _ + 1);
              }
            } else s = Fy(r, n, u, s, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const m = p.length;
              if (m)
                for (let v = 0; v < m; v += 2) {
                  const B = n[p[v]][p[v + 1]].subscribe(s),
                    Re = d.length;
                  d.push(s, B), l && l.push(o, r.index, Re, -(Re + 1));
                }
            }
          })(s, o, o[k], i, e, n, r),
          je
        );
      }
      function Py(e, n, t, r) {
        try {
          return Zt(6, n, t), !1 !== t(r);
        } catch (o) {
          return ey(e, o), !1;
        } finally {
          Zt(7, n, t);
        }
      }
      function Fy(e, n, t, r, o) {
        return function s(i) {
          if (i === Function) return r;
          Ms(e.componentOffset > -1 ? mt(e.index, n) : n);
          let c = Py(n, t, r, i),
            l = s.__ngNextListenerFn__;
          for (; l; ) (c = Py(n, t, l, i) && c), (l = l.__ngNextListenerFn__);
          return o && !1 === c && i.preventDefault(), c;
        };
      }
      function Sn(e = 1) {
        return (function sM(e) {
          return (O.lFrame.contextLView = (function iM(e, n) {
            for (; e > 0; ) (n = n[kr]), e--;
            return n;
          })(e, O.lFrame.contextLView))[he];
        })(e);
      }
      function Ja(e, n) {
        return (e << 17) | (n << 2);
      }
      function Hn(e) {
        return (e >> 17) & 32767;
      }
      function Sd(e) {
        return 2 | e;
      }
      function pr(e) {
        return (131068 & e) >> 2;
      }
      function Id(e, n) {
        return (-131069 & e) | (n << 2);
      }
      function Md(e) {
        return 1 | e;
      }
      function Gy(e, n, t, r, o) {
        const s = e[t + 1],
          i = null === n;
        let a = r ? Hn(s) : pr(s),
          c = !1;
        for (; 0 !== a && (!1 === c || i); ) {
          const u = e[a + 1];
          OR(e[a], n) && ((c = !0), (e[a + 1] = r ? Md(u) : Sd(u))),
            (a = r ? Hn(u) : pr(u));
        }
        c && (e[t + 1] = r ? Sd(s) : Md(s));
      }
      function OR(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || "string" != typeof n) && Yr(e, n) >= 0)
        );
      }
      const Ie = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function qy(e) {
        return e.substring(Ie.key, Ie.keyEnd);
      }
      function Wy(e, n) {
        const t = Ie.textEnd;
        return t === n
          ? -1
          : ((n = Ie.keyEnd =
              (function kR(e, n, t) {
                for (; n < t && e.charCodeAt(n) > 32; ) n++;
                return n;
              })(e, (Ie.key = n), t)),
            wo(e, n, t));
      }
      function wo(e, n, t) {
        for (; n < t && e.charCodeAt(n) <= 32; ) n++;
        return n;
      }
      function Tt(e, n) {
        return (
          (function jt(e, n, t, r) {
            const o = y(),
              s = G(),
              i = yn(2);
            s.firstUpdatePass && eD(s, e, i, r),
              n !== j &&
                $e(o, i, n) &&
                nD(
                  s,
                  s.data[Ye()],
                  o,
                  o[k],
                  e,
                  (o[i + 1] = (function ZR(e, n) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof n
                          ? (e += n)
                          : "object" == typeof e && (e = we(Un(e)))),
                      e
                    );
                  })(n, t)),
                  r,
                  i
                );
          })(e, n, null, !0),
          Tt
        );
      }
      function tn(e, n) {
        for (
          let t = (function PR(e) {
            return (
              (function Ky(e) {
                (Ie.key = 0),
                  (Ie.keyEnd = 0),
                  (Ie.value = 0),
                  (Ie.valueEnd = 0),
                  (Ie.textEnd = e.length);
              })(e),
              Wy(e, wo(e, 0, Ie.textEnd))
            );
          })(n);
          t >= 0;
          t = Wy(n, t)
        )
          gt(e, qy(n), !0);
      }
      function Xy(e, n) {
        return n >= e.expandoStartIndex;
      }
      function eD(e, n, t, r) {
        const o = e.data;
        if (null === o[t + 1]) {
          const s = o[Ye()],
            i = Xy(e, t);
          oD(s, r) && null === n && !i && (n = !1),
            (n = (function $R(e, n, t, r) {
              const o = (function Jl(e) {
                const n = O.lFrame.currentDirectiveIndex;
                return -1 === n ? null : e[n];
              })(e);
              let s = r ? n.residualClasses : n.residualStyles;
              if (null === o)
                0 === (r ? n.classBindings : n.styleBindings) &&
                  ((t = Vs((t = Ad(null, e, n, t, r)), n.attrs, r)),
                  (s = null));
              else {
                const i = n.directiveStylingLast;
                if (-1 === i || e[i] !== o)
                  if (((t = Ad(o, e, n, t, r)), null === s)) {
                    let c = (function UR(e, n, t) {
                      const r = t ? n.classBindings : n.styleBindings;
                      if (0 !== pr(r)) return e[Hn(r)];
                    })(e, n, r);
                    void 0 !== c &&
                      Array.isArray(c) &&
                      ((c = Ad(null, e, n, c[1], r)),
                      (c = Vs(c, n.attrs, r)),
                      (function HR(e, n, t, r) {
                        e[Hn(t ? n.classBindings : n.styleBindings)] = r;
                      })(e, n, r, c));
                  } else
                    s = (function zR(e, n, t) {
                      let r;
                      const o = n.directiveEnd;
                      for (let s = 1 + n.directiveStylingLast; s < o; s++)
                        r = Vs(r, e[s].hostAttrs, t);
                      return Vs(r, n.attrs, t);
                    })(e, n, r);
              }
              return (
                void 0 !== s &&
                  (r ? (n.residualClasses = s) : (n.residualStyles = s)),
                t
              );
            })(o, s, n, r)),
            (function RR(e, n, t, r, o, s) {
              let i = s ? n.classBindings : n.styleBindings,
                a = Hn(i),
                c = pr(i);
              e[r] = t;
              let u,
                l = !1;
              if (
                (Array.isArray(t)
                  ? ((u = t[1]), (null === u || Yr(t, u) > 0) && (l = !0))
                  : (u = t),
                o)
              )
                if (0 !== c) {
                  const f = Hn(e[a + 1]);
                  (e[r + 1] = Ja(f, a)),
                    0 !== f && (e[f + 1] = Id(e[f + 1], r)),
                    (e[a + 1] = (function AR(e, n) {
                      return (131071 & e) | (n << 17);
                    })(e[a + 1], r));
                } else
                  (e[r + 1] = Ja(a, 0)),
                    0 !== a && (e[a + 1] = Id(e[a + 1], r)),
                    (a = r);
              else
                (e[r + 1] = Ja(c, 0)),
                  0 === a ? (a = r) : (e[c + 1] = Id(e[c + 1], r)),
                  (c = r);
              l && (e[r + 1] = Sd(e[r + 1])),
                Gy(e, u, r, !0),
                Gy(e, u, r, !1),
                (function NR(e, n, t, r, o) {
                  const s = o ? e.residualClasses : e.residualStyles;
                  null != s &&
                    "string" == typeof n &&
                    Yr(s, n) >= 0 &&
                    (t[r + 1] = Md(t[r + 1]));
                })(n, u, e, r, s),
                (i = Ja(a, c)),
                s ? (n.classBindings = i) : (n.styleBindings = i);
            })(o, s, n, t, i, r);
        }
      }
      function Ad(e, n, t, r, o) {
        let s = null;
        const i = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < i && ((s = n[a]), (r = Vs(r, s.hostAttrs, o)), s !== e);

        )
          a++;
        return null !== e && (t.directiveStylingLast = a), r;
      }
      function Vs(e, n, t) {
        const r = t ? 1 : 2;
        let o = -1;
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const i = n[s];
            "number" == typeof i
              ? (o = i)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                gt(e, i, !!t || n[++s]));
          }
        return void 0 === e ? null : e;
      }
      function nD(e, n, t, r, o, s, i, a) {
        if (!(3 & n.type)) return;
        const c = e.data,
          l = c[a + 1],
          u = (function TR(e) {
            return 1 == (1 & e);
          })(l)
            ? rD(c, n, t, o, pr(l), i)
            : void 0;
        Xa(u) ||
          (Xa(s) ||
            ((function MR(e) {
              return 2 == (2 & e);
            })(l) &&
              (s = rD(c, null, t, o, a, i))),
          (function IA(e, n, t, r, o) {
            if (n) o ? e.addClass(t, r) : e.removeClass(t, r);
            else {
              let s = -1 === r.indexOf("-") ? void 0 : $n.DashCase;
              null == o
                ? e.removeStyle(t, r, s)
                : ("string" == typeof o &&
                    o.endsWith("!important") &&
                    ((o = o.slice(0, -10)), (s |= $n.Important)),
                  e.setStyle(t, r, o, s));
            }
          })(r, i, Xi(Ye(), t), o, s));
      }
      function rD(e, n, t, r, o, s) {
        const i = null === n;
        let a;
        for (; o > 0; ) {
          const c = e[o],
            l = Array.isArray(c),
            u = l ? c[1] : c,
            d = null === u;
          let f = t[o + 1];
          f === j && (f = d ? q : void 0);
          let h = d ? uu(f, r) : u === r ? f : void 0;
          if ((l && !Xa(h) && (h = uu(c, r)), Xa(h) && ((a = h), i))) return a;
          const p = e[o + 1];
          o = i ? Hn(p) : pr(p);
        }
        if (null !== n) {
          let c = s ? n.residualClasses : n.residualStyles;
          null != c && (a = uu(c, r));
        }
        return a;
      }
      function Xa(e) {
        return void 0 !== e;
      }
      function oD(e, n) {
        return 0 != (e.flags & (n ? 8 : 16));
      }
      function bo(e, n = "") {
        const t = y(),
          r = G(),
          o = e + U,
          s = r.firstCreatePass ? fo(r, o, 1, n, null) : r.data[o],
          i = sD(r, t, s, n, e);
        (t[o] = i), na() && Sa(r, t, i, s), Kt(s, !1);
      }
      let sD = (e, n, t, r, o) => (
        Bn(!0),
        (function _a(e, n) {
          return e.createText(n);
        })(n[k], r)
      );
      function Td(e) {
        return mr("", e, ""), Td;
      }
      function mr(e, n, t) {
        const r = y(),
          o = po(r, e, n, t);
        return (
          o !== j &&
            (function bn(e, n, t) {
              const r = Xi(n, e);
              !(function Ag(e, n, t) {
                e.setValue(n, t);
              })(e[k], r, t);
            })(r, Ye(), o),
          mr
        );
      }
      function pD(e, n, t) {
        !(function Lt(e, n, t, r) {
          const o = G(),
            s = yn(2);
          o.firstUpdatePass && eD(o, null, s, r);
          const i = y();
          if (t !== j && $e(i, s, t)) {
            const a = o.data[Ye()];
            if (oD(a, r) && !Xy(o, s)) {
              let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== c && (t = El(c, t || "")), bd(o, a, i, t, r);
            } else
              !(function WR(e, n, t, r, o, s, i, a) {
                o === j && (o = q);
                let c = 0,
                  l = 0,
                  u = 0 < o.length ? o[0] : null,
                  d = 0 < s.length ? s[0] : null;
                for (; null !== u || null !== d; ) {
                  const f = c < o.length ? o[c + 1] : void 0,
                    h = l < s.length ? s[l + 1] : void 0;
                  let m,
                    p = null;
                  u === d
                    ? ((c += 2), (l += 2), f !== h && ((p = d), (m = h)))
                    : null === d || (null !== u && u < d)
                    ? ((c += 2), (p = u))
                    : ((l += 2), (p = d), (m = h)),
                    null !== p && nD(e, n, t, r, p, m, i, a),
                    (u = c < o.length ? o[c] : null),
                    (d = l < s.length ? s[l] : null);
                }
              })(
                o,
                a,
                i,
                i[k],
                i[s + 1],
                (i[s + 1] = (function GR(e, n, t) {
                  if (null == t || "" === t) return q;
                  const r = [],
                    o = Un(t);
                  if (Array.isArray(o))
                    for (let s = 0; s < o.length; s++) e(r, o[s], !0);
                  else if ("object" == typeof o)
                    for (const s in o) o.hasOwnProperty(s) && e(r, s, o[s]);
                  else "string" == typeof o && n(r, o);
                  return r;
                })(e, n, t)),
                r,
                s
              );
          }
        })(gt, tn, po(y(), e, n, t), !0);
      }
      let Eo = {};
      var oe = (function (e) {
        return (
          (e[(e.LocaleId = 0)] = "LocaleId"),
          (e[(e.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (e[(e.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (e[(e.DaysFormat = 3)] = "DaysFormat"),
          (e[(e.DaysStandalone = 4)] = "DaysStandalone"),
          (e[(e.MonthsFormat = 5)] = "MonthsFormat"),
          (e[(e.MonthsStandalone = 6)] = "MonthsStandalone"),
          (e[(e.Eras = 7)] = "Eras"),
          (e[(e.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (e[(e.WeekendRange = 9)] = "WeekendRange"),
          (e[(e.DateFormat = 10)] = "DateFormat"),
          (e[(e.TimeFormat = 11)] = "TimeFormat"),
          (e[(e.DateTimeFormat = 12)] = "DateTimeFormat"),
          (e[(e.NumberSymbols = 13)] = "NumberSymbols"),
          (e[(e.NumberFormats = 14)] = "NumberFormats"),
          (e[(e.CurrencyCode = 15)] = "CurrencyCode"),
          (e[(e.CurrencySymbol = 16)] = "CurrencySymbol"),
          (e[(e.CurrencyName = 17)] = "CurrencyName"),
          (e[(e.Currencies = 18)] = "Currencies"),
          (e[(e.Directionality = 19)] = "Directionality"),
          (e[(e.PluralCase = 20)] = "PluralCase"),
          (e[(e.ExtraData = 21)] = "ExtraData"),
          e
        );
      })(oe || {});
      const So = "en-US";
      let AD = So;
      function Od(e, n, t, r, o) {
        if (((e = x(e)), Array.isArray(e)))
          for (let s = 0; s < e.length; s++) Od(e[s], n, t, r, o);
        else {
          const s = G(),
            i = y(),
            a = ke();
          let c = ur(e) ? e : x(e.provide);
          const l = av(e),
            u = 1048575 & a.providerIndexes,
            d = a.directiveStart,
            f = a.providerIndexes >> 20;
          if (ur(e) || !e.multi) {
            const h = new ls(l, o, C),
              p = Pd(c, n, o ? u : u + f, d);
            -1 === p
              ? (au(aa(a, i), s, c),
                xd(s, e, n.length),
                n.push(c),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                t.push(h),
                i.push(h))
              : ((t[p] = h), (i[p] = h));
          } else {
            const h = Pd(c, n, u + f, d),
              p = Pd(c, n, u, u + f),
              v = p >= 0 && t[p];
            if ((o && !v) || (!o && !(h >= 0 && t[h]))) {
              au(aa(a, i), s, c);
              const _ = (function mO(e, n, t, r, o) {
                const s = new ls(e, t, C);
                return (
                  (s.multi = []),
                  (s.index = n),
                  (s.componentProviders = 0),
                  XD(s, o, r && !t),
                  s
                );
              })(o ? pO : hO, t.length, o, r, l);
              !o && v && (t[p].providerFactory = _),
                xd(s, e, n.length, 0),
                n.push(c),
                a.directiveStart++,
                a.directiveEnd++,
                o && (a.providerIndexes += 1048576),
                t.push(_),
                i.push(_);
            } else xd(s, e, h > -1 ? h : p, XD(t[o ? p : h], l, !o && r));
            !o && r && v && t[p].componentProviders++;
          }
        }
      }
      function xd(e, n, t, r) {
        const o = ur(n),
          s = (function nT(e) {
            return !!e.useClass;
          })(n);
        if (o || s) {
          const c = (s ? x(n.useClass) : n).prototype.ngOnDestroy;
          if (c) {
            const l = e.destroyHooks || (e.destroyHooks = []);
            if (!o && n.multi) {
              const u = l.indexOf(t);
              -1 === u ? l.push(t, [r, c]) : l[u + 1].push(r, c);
            } else l.push(t, c);
          }
        }
      }
      function XD(e, n, t) {
        return t && e.componentProviders++, e.multi.push(n) - 1;
      }
      function Pd(e, n, t, r) {
        for (let o = t; o < r; o++) if (n[o] === e) return o;
        return -1;
      }
      function hO(e, n, t, r) {
        return Fd(this.multi, []);
      }
      function pO(e, n, t, r) {
        const o = this.multi;
        let s;
        if (this.providerFactory) {
          const i = this.providerFactory.componentProviders,
            a = cr(t, t[S], this.providerFactory.index, r);
          (s = a.slice(0, i)), Fd(o, s);
          for (let c = i; c < a.length; c++) s.push(a[c]);
        } else (s = []), Fd(o, s);
        return s;
      }
      function Fd(e, n) {
        for (let t = 0; t < e.length; t++) n.push((0, e[t])());
        return n;
      }
      function ae(e, n = []) {
        return (t) => {
          t.providersResolver = (r, o) =>
            (function fO(e, n, t) {
              const r = G();
              if (r.firstCreatePass) {
                const o = kt(e);
                Od(t, r.data, r.blueprint, o, !0),
                  Od(n, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, n);
        };
      }
      class vr {}
      class eC {}
      class kd extends vr {
        constructor(n, t, r) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ay(this));
          const o = pt(n);
          (this._bootstrapComponents = wn(o.bootstrap)),
            (this._r3Injector = Cv(
              n,
              t,
              [
                { provide: vr, useValue: this },
                { provide: ao, useValue: this.componentFactoryResolver },
                ...r,
              ],
              we(n),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const n = this._r3Injector;
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(n) {
          this.destroyCbs.push(n);
        }
      }
      class jd extends eC {
        constructor(n) {
          super(), (this.moduleType = n);
        }
        create(n) {
          return new kd(this.moduleType, n, []);
        }
      }
      class tC extends vr {
        constructor(n) {
          super(),
            (this.componentFactoryResolver = new ay(this)),
            (this.instance = null);
          const t = new ro(
            [
              ...n.providers,
              { provide: vr, useValue: this },
              { provide: ao, useValue: this.componentFactoryResolver },
            ],
            n.parent || Oa(),
            n.debugName,
            new Set(["environment"])
          );
          (this.injector = t),
            n.runEnvironmentInitializers && t.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(n) {
          this.injector.onDestroy(n);
        }
      }
      function Ld(e, n, t = null) {
        return new tC({
          providers: e,
          parent: n,
          debugName: t,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let yO = (() => {
        class e {
          constructor(t) {
            (this._injector = t), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null;
            if (!this.cachedInjectors.has(t)) {
              const r = rv(0, t.type),
                o =
                  r.length > 0
                    ? Ld([r], this._injector, `Standalone[${t.type.name}]`)
                    : null;
              this.cachedInjectors.set(t, o);
            }
            return this.cachedInjectors.get(t);
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values())
                null !== t && t.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static #e = (this.ɵprov = E({
            token: e,
            providedIn: "environment",
            factory: () => new e(b(at)),
          }));
        }
        return e;
      })();
      function nC(e) {
        e.getStandaloneInjector = (n) =>
          n.get(yO).getOrCreateStandaloneInjector(e);
      }
      function lC(e, n, t, r, o, s) {
        const i = n + t;
        return $e(e, i, o)
          ? (function Jt(e, n, t) {
              return (e[n] = t);
            })(e, i + 1, s ? r.call(s, o) : r(o))
          : (function Gs(e, n) {
              const t = e[n];
              return t === j ? void 0 : t;
            })(e, i + 1);
      }
      function yr(e, n) {
        const t = G();
        let r;
        const o = e + U;
        t.firstCreatePass
          ? ((r = (function jO(e, n) {
              if (n)
                for (let t = n.length - 1; t >= 0; t--) {
                  const r = n[t];
                  if (e === r.name) return r;
                }
            })(n, t.pipeRegistry)),
            (t.data[o] = r),
            r.onDestroy && (t.destroyHooks ??= []).push(o, r.onDestroy))
          : (r = t.data[o]);
        const s = r.factory || (r.factory = ir(r.type)),
          a = rt(C);
        try {
          const c = ia(!1),
            l = s();
          return (
            ia(c),
            (function mR(e, n, t, r) {
              t >= e.data.length &&
                ((e.data[t] = null), (e.blueprint[t] = null)),
                (n[t] = r);
            })(t, y(), o, l),
            l
          );
        } finally {
          rt(a);
        }
      }
      function Dr(e, n, t) {
        const r = e + U,
          o = y(),
          s = (function Br(e, n) {
            return e[n];
          })(o, r);
        return (function qs(e, n) {
          return e[S].data[n].pure;
        })(o, r)
          ? lC(
              o,
              (function Ke() {
                const e = O.lFrame;
                let n = e.bindingRootIndex;
                return (
                  -1 === n &&
                    (n = e.bindingRootIndex = e.tView.bindingStartIndex),
                  n
                );
              })(),
              n,
              s.transform,
              t,
              s
            )
          : s.transform(t);
      }
      function zO(e, n, t, r = !0) {
        const o = n[S];
        if (
          ((function yA(e, n, t, r) {
            const o = Pe + r,
              s = t.length;
            r > 0 && (t[o - 1][Ft] = n),
              r < s - Pe
                ? ((n[Ft] = t[o]), og(t, Pe + r, n))
                : (t.push(n), (n[Ft] = null)),
              (n[ie] = t);
            const i = n[ns];
            null !== i &&
              t !== i &&
              (function DA(e, n) {
                const t = e[Lr];
                n[pe] !== n[ie][ie][pe] && (e[om] = !0),
                  null === t ? (e[Lr] = [n]) : t.push(n);
              })(i, n);
            const a = n[qt];
            null !== a && a.insertView(e), (n[L] |= 128);
          })(o, n, e, t),
          r)
        ) {
          const s = Su(t, e),
            i = n[k],
            a = Ea(i, e[Wt]);
          null !== a &&
            (function mA(e, n, t, r, o, s) {
              (r[ue] = o), (r[Ve] = n), Ds(e, r, t, 1, o, s);
            })(o, e[Ve], i, n, a, s);
        }
      }
      Symbol;
      let In = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = WO);
        }
        return e;
      })();
      const GO = In,
        qO = class extends GO {
          constructor(n, t, r) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(n, t) {
            return this.createEmbeddedViewImpl(n, t);
          }
          createEmbeddedViewImpl(n, t, r) {
            const o = (function HO(e, n, t, r) {
              const o = n.tView,
                a = $a(
                  e,
                  o,
                  t,
                  4096 & e[L] ? 4096 : 16,
                  null,
                  n,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                );
              a[ns] = e[n.index];
              const l = e[qt];
              return (
                null !== l && (a[qt] = l.createEmbeddedView(o)), gd(o, a, t), a
              );
            })(this._declarationLView, this._declarationTContainer, n, {
              injector: t,
              hydrationInfo: r,
            });
            return new Rs(o);
          }
        };
      function WO() {
        return (function oc(e, n) {
          return 4 & e.type ? new qO(n, e, co(e, n)) : null;
        })(ke(), y());
      }
      let Vt = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = XO);
        }
        return e;
      })();
      function XO() {
        return (function CC(e, n) {
          let t;
          const r = n[e.index];
          return (
            Ze(r)
              ? (t = r)
              : ((t = Kv(r, n, null, e)), (n[e.index] = t), Ua(n, t)),
            _C(t, n, e, r),
            new yC(t, e, n)
          );
        })(ke(), y());
      }
      const ex = Vt,
        yC = class extends ex {
          constructor(n, t, r) {
            super(),
              (this._lContainer = n),
              (this._hostTNode = t),
              (this._hostLView = r);
          }
          get element() {
            return co(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Qe(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const n = ca(this._hostTNode, this._hostLView);
            if (ou(n)) {
              const t = ds(n, this._hostLView),
                r = us(n);
              return new Qe(t[S].data[r + 8], t);
            }
            return new Qe(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(n) {
            const t = DC(this._lContainer);
            return (null !== t && t[n]) || null;
          }
          get length() {
            return this._lContainer.length - Pe;
          }
          createEmbeddedView(n, t, r) {
            let o, s;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (s = r.injector));
            const a = n.createEmbeddedViewImpl(t || {}, s, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(n, t, r, o, s) {
            const i =
              n &&
              !(function hs(e) {
                return "function" == typeof e;
              })(n);
            let a;
            if (i) a = t;
            else {
              const m = t || {};
              (a = m.index),
                (r = m.injector),
                (o = m.projectableNodes),
                (s = m.environmentInjector || m.ngModuleRef);
            }
            const c = i ? n : new Ns(z(n)),
              l = r || this.parentInjector;
            if (!s && null == c.ngModule) {
              const v = (i ? l : this.parentInjector).get(at, null);
              v && (s = v);
            }
            z(c.componentType ?? {});
            const h = c.create(l, o, null, s);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(n, t) {
            return this.insertImpl(n, t, !1);
          }
          insertImpl(n, t, r) {
            const o = n._lView;
            if (
              (function HI(e) {
                return Ze(e[ie]);
              })(o)
            ) {
              const c = this.indexOf(n);
              if (-1 !== c) this.detach(c);
              else {
                const l = o[ie],
                  u = new yC(l, l[Ve], l[ie]);
                u.detach(u.indexOf(n));
              }
            }
            const i = this._adjustIndex(t),
              a = this._lContainer;
            return (
              zO(a, o, i, !r), n.attachToViewContainerRef(), og($d(a), i, n), n
            );
          }
          move(n, t) {
            return this.insert(n, t);
          }
          indexOf(n) {
            const t = DC(this._lContainer);
            return null !== t ? t.indexOf(n) : -1;
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              r = ba(this._lContainer, t);
            r && (da($d(this._lContainer), t), _u(r[S], r));
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              r = ba(this._lContainer, t);
            return r && null != da($d(this._lContainer), t) ? new Rs(r) : null;
          }
          _adjustIndex(n, t = 0) {
            return n ?? this.length + t;
          }
        };
      function DC(e) {
        return e[8];
      }
      function $d(e) {
        return e[8] || (e[8] = []);
      }
      let _C = function wC(e, n, t, r) {
        if (e[Wt]) return;
        let o;
        (o =
          8 & t.type
            ? ne(r)
            : (function tx(e, n) {
                const t = e[k],
                  r = t.createComment(""),
                  o = st(n, e);
                return (
                  lr(
                    t,
                    Ea(t, o),
                    r,
                    (function bA(e, n) {
                      return e.nextSibling(n);
                    })(t, o),
                    !1
                  ),
                  r
                );
              })(n, t)),
          (e[Wt] = o);
      };
      const nn = new w("Application Initializer");
      let Jd = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((t, r) => {
                  (this.resolve = t), (this.reject = r);
                })),
                (this.appInits = I(nn, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const t = [];
              for (const o of this.appInits) {
                const s = o();
                if (Ls(s)) t.push(s);
                else if (Ny(s)) {
                  const i = new Promise((a, c) => {
                    s.subscribe({ complete: a, error: c });
                  });
                  t.push(i);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(t)
                .then(() => {
                  r();
                })
                .catch((o) => {
                  this.reject(o);
                }),
                0 === t.length && r(),
                (this.initialized = !0);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        WC = (() => {
          class e {
            log(t) {
              console.log(t);
            }
            warn(t) {
              console.warn(t);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })();
      const rn = new w("LocaleId", {
        providedIn: "root",
        factory: () =>
          I(rn, $.Optional | $.SkipSelf) ||
          (function Ox() {
            return (typeof $localize < "u" && $localize.locale) || So;
          })(),
      });
      let ac = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new De(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const t = this.taskId++;
            return this.pendingTasks.add(t), t;
          }
          remove(t) {
            this.pendingTasks.delete(t),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class Fx {
        constructor(n, t) {
          (this.ngModuleFactory = n), (this.componentFactories = t);
        }
      }
      let ZC = (() => {
        class e {
          compileModuleSync(t) {
            return new jd(t);
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t));
          }
          compileModuleAndAllComponentsSync(t) {
            const r = this.compileModuleSync(t),
              s = wn(pt(t).declarations).reduce((i, a) => {
                const c = z(a);
                return c && i.push(new Ns(c)), i;
              }, []);
            return new Fx(r, s);
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const JC = new w(""),
        lc = new w("");
      let rf,
        tf = (() => {
          class e {
            constructor(t, r, o) {
              (this._ngZone = t),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                rf ||
                  ((function rP(e) {
                    rf = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      re.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, r, o) {
              let s = -1;
              r &&
                r > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (i) => i.timeoutId !== s
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: o });
            }
            whenStable(t, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, r, o) {
              return [];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(re), b(nf), b(lc));
            });
            static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        nf = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, r) {
              this._applications.set(t, r);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, r = !0) {
              return rf?.findTestabilityInTree(this, t, r) ?? null;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })(),
        zn = null;
      const XC = new w("AllowMultipleToken"),
        sf = new w("PlatformDestroyListeners"),
        af = new w("appBootstrapListener");
      class t_ {
        constructor(n, t) {
          (this.name = n), (this.token = t);
        }
      }
      function r_(e, n, t = []) {
        const r = `Platform: ${n}`,
          o = new w(r);
        return (s = []) => {
          let i = cf();
          if (!i || i.injector.get(XC, !1)) {
            const a = [...t, ...s, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function iP(e) {
                  if (zn && !zn.get(XC, !1)) throw new D(400, !1);
                  (function e_() {
                    !(function AI(e) {
                      gm = e;
                    })(() => {
                      throw new D(600, !1);
                    });
                  })(),
                    (zn = e);
                  const n = e.get(s_);
                  (function n_(e) {
                    e.get(cv, null)?.forEach((t) => t());
                  })(e);
                })(
                  (function o_(e = [], n) {
                    return Te.create({
                      name: n,
                      providers: [
                        { provide: Lu, useValue: "platform" },
                        { provide: sf, useValue: new Set([() => (zn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function cP(e) {
            const n = cf();
            if (!n) throw new D(401, !1);
            return n;
          })();
        };
      }
      function cf() {
        return zn?.get(s_) ?? null;
      }
      let s_ = (() => {
        class e {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, r) {
            const o = (function lP(e = "zone.js", n) {
              return "noop" === e ? new LT() : "zone.js" === e ? new re(n) : e;
            })(
              r?.ngZone,
              (function i_(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return o.run(() => {
              const s = (function vO(e, n, t) {
                  return new kd(e, n, t);
                })(
                  t.moduleType,
                  this.injector,
                  (function d_(e) {
                    return [
                      { provide: re, useFactory: e },
                      {
                        provide: bs,
                        multi: !0,
                        useFactory: () => {
                          const n = I(dP, { optional: !0 });
                          return () => n.initialize();
                        },
                      },
                      { provide: u_, useFactory: uP },
                      { provide: Sv, useFactory: Iv },
                    ];
                  })(() => o)
                ),
                i = s.injector.get(_n, null);
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (c) => {
                      i.handleError(c);
                    },
                  });
                  s.onDestroy(() => {
                    uc(this._modules, s), a.unsubscribe();
                  });
                }),
                (function a_(e, n, t) {
                  try {
                    const r = t();
                    return Ls(r)
                      ? r.catch((o) => {
                          throw (
                            (n.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (n.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(i, o, () => {
                  const a = s.injector.get(Jd);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function TD(e) {
                          Et(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (AD = e.toLowerCase().replace(/_/g, "-"));
                        })(s.injector.get(rn, So) || So),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, r = []) {
            const o = c_({}, r);
            return (function oP(e, n, t) {
              const r = new jd(t);
              return Promise.resolve(r);
            })(0, 0, t).then((s) => this.bootstrapModuleFactory(s, o));
          }
          _moduleDoBootstrap(t) {
            const r = t.injector.get(Cr);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!t.instance.ngDoBootstrap) throw new D(-403, !1);
              t.instance.ngDoBootstrap(r);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new D(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const t = this._injector.get(sf, null);
            t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(Te));
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function c_(e, n) {
        return Array.isArray(n) ? n.reduce(c_, e) : { ...e, ...n };
      }
      let Cr = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = I(u_)),
              (this.zoneIsStable = I(Sv)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = I(ac).hasPendingTasks.pipe(
                Ae((t) => (t ? R(!1) : this.zoneIsStable)),
                Pp(),
                xp()
              )),
              (this._injector = I(at));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(t, r) {
            const o = t instanceof hv;
            if (!this._injector.get(Jd).done)
              throw (
                (!o &&
                  (function xr(e) {
                    const n = z(e) || xe(e) || We(e);
                    return null !== n && n.standalone;
                  })(t),
                new D(405, !1))
              );
            let i;
            (i = o ? t : this._injector.get(ao).resolveComponentFactory(t)),
              this.componentTypes.push(i.componentType);
            const a = (function sP(e) {
                return e.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(vr),
              l = i.create(Te.NULL, [], r || i.selector, a),
              u = l.location.nativeElement,
              d = l.injector.get(JC, null);
            return (
              d?.registerApplication(u),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  uc(this.components, l),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new D(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this.internalErrorHandler(t);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const r = t;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(t) {
            const r = t;
            uc(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t);
            const r = this._injector.get(af, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => uc(this._destroyListeners, t)
            );
          }
          destroy() {
            if (this._destroyed) throw new D(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function uc(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      const u_ = new w("", {
        providedIn: "root",
        factory: () => I(_n).handleError.bind(void 0),
      });
      function uP() {
        const e = I(re),
          n = I(_n);
        return (t) => e.runOutsideAngular(() => n.handleError(t));
      }
      let dP = (() => {
        class e {
          constructor() {
            (this.zone = I(re)), (this.applicationRef = I(Cr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      let dc = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = hP);
        }
        return e;
      })();
      function hP(e) {
        return (function pP(e, n, t) {
          if (sr(e) && !t) {
            const r = mt(e.index, n);
            return new Rs(r, r);
          }
          return 47 & e.type ? new Rs(n[pe], n) : null;
        })(ke(), y(), 16 == (16 & e));
      }
      class g_ {
        constructor() {}
        supports(n) {
          return qa(n);
        }
        create(n) {
          return new CP(n);
        }
      }
      const DP = (e, n) => n;
      class CP {
        constructor(n) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || DP);
        }
        forEachItem(n) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) n(t);
        }
        forEachOperation(n) {
          let t = this._itHead,
            r = this._removalsHead,
            o = 0,
            s = null;
          for (; t || r; ) {
            const i = !r || (t && t.currentIndex < y_(r, o, s)) ? t : r,
              a = y_(i, o, s),
              c = i.currentIndex;
            if (i === r) o--, (r = r._nextRemoved);
            else if (((t = t._next), null == i.previousIndex)) o++;
            else {
              s || (s = []);
              const l = a - o,
                u = c - o;
              if (l != u) {
                for (let f = 0; f < l; f++) {
                  const h = f < s.length ? s[f] : (s[f] = 0),
                    p = h + f;
                  u <= p && p < l && (s[f] = h + 1);
                }
                s[i.previousIndex] = u - l;
              }
            }
            a !== c && n(i, a, c);
          }
        }
        forEachPreviousItem(n) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t);
        }
        forEachAddedItem(n) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t);
        }
        forEachMovedItem(n) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t);
        }
        forEachRemovedItem(n) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t);
        }
        forEachIdentityChange(n) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            n(t);
        }
        diff(n) {
          if ((null == n && (n = []), !qa(n))) throw new D(900, !1);
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let o,
            s,
            i,
            t = this._itHead,
            r = !1;
          if (Array.isArray(n)) {
            this.length = n.length;
            for (let a = 0; a < this.length; a++)
              (s = n[a]),
                (i = this._trackByFn(a, s)),
                null !== t && Object.is(t.trackById, i)
                  ? (r && (t = this._verifyReinsertion(t, s, i, a)),
                    Object.is(t.item, s) || this._addIdentityChange(t, s))
                  : ((t = this._mismatch(t, s, i, a)), (r = !0)),
                (t = t._next);
          } else
            (o = 0),
              (function Z1(e, n) {
                if (Array.isArray(e))
                  for (let t = 0; t < e.length; t++) n(e[t]);
                else {
                  const t = e[Symbol.iterator]();
                  let r;
                  for (; !(r = t.next()).done; ) n(r.value);
                }
              })(n, (a) => {
                (i = this._trackByFn(o, a)),
                  null !== t && Object.is(t.trackById, i)
                    ? (r && (t = this._verifyReinsertion(t, a, i, o)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, i, o)), (r = !0)),
                  (t = t._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(t), (this.collection = n), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (
              n = this._previousItHead = this._itHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next;
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(n, t, r, o) {
          let s;
          return (
            null === n ? (s = this._itTail) : ((s = n._prev), this._remove(n)),
            null !==
            (n =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, s, o))
              : null !==
                (n =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._moveAfter(n, s, o))
              : (n = this._addAfter(new _P(t, r), s, o)),
            n
          );
        }
        _verifyReinsertion(n, t, r, o) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== s
              ? (n = this._reinsertAfter(s, n._prev, o))
              : n.currentIndex != o &&
                ((n.currentIndex = o), this._addToMoves(n, o)),
            n
          );
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next;
            this._addToRemovals(this._unlink(n)), (n = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(n, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
          const o = n._prevRemoved,
            s = n._nextRemoved;
          return (
            null === o ? (this._removalsHead = s) : (o._nextRemoved = s),
            null === s ? (this._removalsTail = o) : (s._prevRemoved = o),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _moveAfter(n, t, r) {
          return (
            this._unlink(n),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _addAfter(n, t, r) {
          return (
            this._insertAfter(n, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          );
        }
        _insertAfter(n, t, r) {
          const o = null === t ? this._itHead : t._next;
          return (
            (n._next = o),
            (n._prev = t),
            null === o ? (this._itTail = n) : (o._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new v_()),
            this._linkedRecords.put(n),
            (n.currentIndex = r),
            n
          );
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n));
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n);
          const t = n._prev,
            r = n._next;
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            n
          );
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          );
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new v_()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n),
                (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          );
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          );
        }
      }
      class _P {
        constructor(n, t) {
          (this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class wP {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n),
              (n._nextDup = null),
              (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n));
        }
        get(n, t) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, n)
            )
              return r;
          return null;
        }
        remove(n) {
          const t = n._prevDup,
            r = n._nextDup;
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          );
        }
      }
      class v_ {
        constructor() {
          this.map = new Map();
        }
        put(n) {
          const t = n.trackById;
          let r = this.map.get(t);
          r || ((r = new wP()), this.map.set(t, r)), r.add(n);
        }
        get(n, t) {
          const o = this.map.get(n);
          return o ? o.get(n, t) : null;
        }
        remove(n) {
          const t = n.trackById;
          return this.map.get(t).remove(n) && this.map.delete(t), n;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function y_(e, n, t) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return t && r < t.length && (o = t[r]), r + n + o;
      }
      class D_ {
        constructor() {}
        supports(n) {
          return n instanceof Map || vd(n);
        }
        create() {
          return new bP();
        }
      }
      class bP {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(n) {
          let t;
          for (t = this._mapHead; null !== t; t = t._next) n(t);
        }
        forEachPreviousItem(n) {
          let t;
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) n(t);
        }
        forEachChangedItem(n) {
          let t;
          for (t = this._changesHead; null !== t; t = t._nextChanged) n(t);
        }
        forEachAddedItem(n) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t);
        }
        forEachRemovedItem(n) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t);
        }
        diff(n) {
          if (n) {
            if (!(n instanceof Map || vd(n))) throw new D(900, !1);
          } else n = new Map();
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let t = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(n, (r, o) => {
              if (t && t.key === o)
                this._maybeAddToChanges(t, r),
                  (this._appendAfter = t),
                  (t = t._next);
              else {
                const s = this._getOrCreateRecordForKey(o, r);
                t = this._insertBeforeOrAppend(t, s);
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t);
            for (let r = t; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(n, t) {
          if (n) {
            const r = n._prev;
            return (
              (t._next = n),
              (t._prev = r),
              (n._prev = t),
              r && (r._next = t),
              n === this._mapHead && (this._mapHead = t),
              (this._appendAfter = n),
              n
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          );
        }
        _getOrCreateRecordForKey(n, t) {
          if (this._records.has(n)) {
            const o = this._records.get(n);
            this._maybeAddToChanges(o, t);
            const s = o._prev,
              i = o._next;
            return (
              s && (s._next = i),
              i && (i._prev = s),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new EP(n);
          return (
            this._records.set(n, r),
            (r.currentValue = t),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (
              this._previousMapHead = this._mapHead, n = this._previousMapHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next;
            for (n = this._changesHead; null !== n; n = n._nextChanged)
              n.previousValue = n.currentValue;
            for (n = this._additionsHead; null != n; n = n._nextAdded)
              n.previousValue = n.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(n, t) {
          Object.is(t, n.currentValue) ||
            ((n.previousValue = n.currentValue),
            (n.currentValue = t),
            this._addToChanges(n));
        }
        _addToAdditions(n) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = n)
            : ((this._additionsTail._nextAdded = n), (this._additionsTail = n));
        }
        _addToChanges(n) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = n)
            : ((this._changesTail._nextChanged = n), (this._changesTail = n));
        }
        _forEach(n, t) {
          n instanceof Map
            ? n.forEach(t)
            : Object.keys(n).forEach((r) => t(n[r], r));
        }
      }
      class EP {
        constructor(n) {
          (this.key = n),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function C_() {
        return new pc([new g_()]);
      }
      let pc = (() => {
        class e {
          static #e = (this.ɵprov = E({
            token: e,
            providedIn: "root",
            factory: C_,
          }));
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (null != r) {
              const o = r.factories.slice();
              t = t.concat(o);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (r) => e.create(t, r || C_()),
              deps: [[e, new pa(), new ha()]],
            };
          }
          find(t) {
            const r = this.factories.find((o) => o.supports(t));
            if (null != r) return r;
            throw new D(901, !1);
          }
        }
        return e;
      })();
      function __() {
        return new Ks([new D_()]);
      }
      let Ks = (() => {
        class e {
          static #e = (this.ɵprov = E({
            token: e,
            providedIn: "root",
            factory: __,
          }));
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (r) {
              const o = r.factories.slice();
              t = t.concat(o);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (r) => e.create(t, r || __()),
              deps: [[e, new pa(), new ha()]],
            };
          }
          find(t) {
            const r = this.factories.find((o) => o.supports(t));
            if (r) return r;
            throw new D(901, !1);
          }
        }
        return e;
      })();
      const MP = r_(null, "core", []);
      let AP = (() => {
        class e {
          constructor(t) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(Cr));
          });
          static #t = (this.ɵmod = Le({ type: e }));
          static #n = (this.ɵinj = Oe({}));
        }
        return e;
      })();
      let pf = null;
      function Gn() {
        return pf;
      }
      class UP {}
      const dt = new w("DocumentToken");
      let mf = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: function () {
              return I(zP);
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      const HP = new w("Location Initialized");
      let zP = (() => {
        class e extends mf {
          constructor() {
            super(),
              (this._doc = I(dt)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Gn().getBaseHref(this._doc);
          }
          onPopState(t) {
            const r = Gn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", t, !1),
              () => r.removeEventListener("popstate", t)
            );
          }
          onHashChange(t) {
            const r = Gn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", t, !1),
              () => r.removeEventListener("hashchange", t)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(t) {
            this._location.pathname = t;
          }
          pushState(t, r, o) {
            this._history.pushState(t, r, o);
          }
          replaceState(t, r, o) {
            this._history.replaceState(t, r, o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function gf(e, n) {
        if (0 == e.length) return n;
        if (0 == n.length) return e;
        let t = 0;
        return (
          e.endsWith("/") && t++,
          n.startsWith("/") && t++,
          2 == t ? e + n.substring(1) : 1 == t ? e + n : e + "/" + n
        );
      }
      function R_(e) {
        const n = e.match(/#|\?|$/),
          t = (n && n.index) || e.length;
        return e.slice(0, t - ("/" === e[t - 1] ? 1 : 0)) + e.slice(t);
      }
      function Mn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let wr = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: function () {
              return I(O_);
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      const N_ = new w("appBaseHref");
      let O_ = (() => {
          class e extends wr {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  I(dt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return gf(this._baseHref, t);
            }
            path(t = !1) {
              const r =
                  this._platformLocation.pathname +
                  Mn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && t ? `${r}${o}` : r;
            }
            pushState(t, r, o, s) {
              const i = this.prepareExternalUrl(o + Mn(s));
              this._platformLocation.pushState(t, r, i);
            }
            replaceState(t, r, o, s) {
              const i = this.prepareExternalUrl(o + Mn(s));
              this._platformLocation.replaceState(t, r, i);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(mf), b(N_, 8));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        GP = (() => {
          class e extends wr {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(t) {
              const r = gf(this._baseHref, t);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(t, r, o, s) {
              let i = this.prepareExternalUrl(o + Mn(s));
              0 == i.length && (i = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, i);
            }
            replaceState(t, r, o, s) {
              let i = this.prepareExternalUrl(o + Mn(s));
              0 == i.length && (i = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, i);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(mf), b(N_, 8));
            });
            static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        vf = (() => {
          class e {
            constructor(t) {
              (this._subject = new de()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = t);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function ZP(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, t] = e.split(/\/\/[^\/]+/);
                  return t;
                }
                return e;
              })(R_(x_(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(t = !1) {
              return this.normalize(this._locationStrategy.path(t));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(t, r = "") {
              return this.path() == this.normalize(t + Mn(r));
            }
            normalize(t) {
              return e.stripTrailingSlash(
                (function WP(e, n) {
                  if (!e || !n.startsWith(e)) return n;
                  const t = n.substring(e.length);
                  return "" === t || ["/", ";", "?", "#"].includes(t[0])
                    ? t
                    : n;
                })(this._basePath, x_(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._locationStrategy.prepareExternalUrl(t)
              );
            }
            go(t, r = "", o = null) {
              this._locationStrategy.pushState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Mn(r)),
                  o
                );
            }
            replaceState(t, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Mn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(t = 0) {
              this._locationStrategy.historyGo?.(t);
            }
            onUrlChange(t) {
              return (
                this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(t);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(t = "", r) {
              this._urlChangeListeners.forEach((o) => o(t, r));
            }
            subscribe(t, r, o) {
              return this._subject.subscribe({
                next: t,
                error: r,
                complete: o,
              });
            }
            static #e = (this.normalizeQueryParams = Mn);
            static #t = (this.joinWithSlash = gf);
            static #n = (this.stripTrailingSlash = R_);
            static #r = (this.ɵfac = function (r) {
              return new (r || e)(b(wr));
            });
            static #o = (this.ɵprov = E({
              token: e,
              factory: function () {
                return (function qP() {
                  return new vf(b(wr));
                })();
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      function x_(e) {
        return e.replace(/\/index.html$/, "");
      }
      function U_(e, n, t) {
        return (function gN(e, n, t) {
          "string" != typeof n && ((t = n), (n = e[oe.LocaleId])),
            (n = n.toLowerCase().replace(/_/g, "-")),
            (Eo[n] = e),
            t && (Eo[n][oe.ExtraData] = t);
        })(e, n, t);
      }
      function H_(e, n) {
        n = encodeURIComponent(n);
        for (const t of e.split(";")) {
          const r = t.indexOf("="),
            [o, s] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
          if (o.trim() === n) return decodeURIComponent(s);
        }
        return null;
      }
      const Mf = /\s+/,
        z_ = [];
      let G_ = (() => {
        class e {
          constructor(t, r, o, s) {
            (this._iterableDiffers = t),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = s),
              (this.initialClasses = z_),
              (this.stateMap = new Map());
          }
          set klass(t) {
            this.initialClasses = null != t ? t.trim().split(Mf) : z_;
          }
          set ngClass(t) {
            this.rawClass = "string" == typeof t ? t.trim().split(Mf) : t;
          }
          ngDoCheck() {
            for (const r of this.initialClasses) this._updateState(r, !0);
            const t = this.rawClass;
            if (Array.isArray(t) || t instanceof Set)
              for (const r of t) this._updateState(r, !0);
            else if (null != t)
              for (const r of Object.keys(t)) this._updateState(r, !!t[r]);
            this._applyStateDiff();
          }
          _updateState(t, r) {
            const o = this.stateMap.get(t);
            void 0 !== o
              ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
                (o.touched = !0))
              : this.stateMap.set(t, { enabled: r, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const t of this.stateMap) {
              const r = t[0],
                o = t[1];
              o.changed
                ? (this._toggleClass(r, o.enabled), (o.changed = !1))
                : o.touched ||
                  (o.enabled && this._toggleClass(r, !1),
                  this.stateMap.delete(r)),
                (o.touched = !1);
            }
          }
          _toggleClass(t, r) {
            (t = t.trim()).length > 0 &&
              t.split(Mf).forEach((o) => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(pc), C(Ks), C(vt), C(Cn));
          });
          static #t = (this.ɵdir = P({
            type: e,
            selectors: [["", "ngClass", ""]],
            inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
            standalone: !0,
          }));
        }
        return e;
      })();
      class x2 {
        constructor(n, t, r, o) {
          (this.$implicit = n),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let W_ = (() => {
        class e {
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(t, r, o) {
            (this._viewContainer = t),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const r = this._viewContainer;
            t.forEachOperation((o, s, i) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new x2(o.item, this._ngForOf, -1, -1),
                  null === i ? void 0 : i
                );
              else if (null == i) r.remove(null === s ? void 0 : s);
              else if (null !== s) {
                const a = r.get(s);
                r.move(a, i), Z_(a, o);
              }
            });
            for (let o = 0, s = r.length; o < s; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = s), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((o) => {
              Z_(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Vt), C(In), C(pc));
          });
          static #t = (this.ɵdir = P({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      function Z_(e, n) {
        e.context.$implicit = n.item;
      }
      let K_ = (() => {
        class e {
          constructor(t, r) {
            (this._viewContainer = t),
              (this._context = new P2()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            Y_("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            Y_("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Vt), C(In));
          });
          static #t = (this.ɵdir = P({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      class P2 {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Y_(e, n) {
        if (n && !n.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${we(n)}'.`
          );
      }
      let Of = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = Le({ type: e }));
          static #n = (this.ɵinj = Oe({}));
        }
        return e;
      })();
      function ew(e) {
        return "server" === e;
      }
      let cF = (() => {
        class e {
          static #e = (this.ɵprov = E({
            token: e,
            providedIn: "root",
            factory: () => new lF(b(dt), window),
          }));
        }
        return e;
      })();
      class lF {
        constructor(n, t) {
          (this.document = n), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(n) {
          this.offset = Array.isArray(n) ? () => n : n;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(n) {
          this.supportsScrolling() && this.window.scrollTo(n[0], n[1]);
        }
        scrollToAnchor(n) {
          if (!this.supportsScrolling()) return;
          const t = (function uF(e, n) {
            const t = e.getElementById(n) || e.getElementsByName(n)[0];
            if (t) return t;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const s = o.shadowRoot;
                if (s) {
                  const i =
                    s.getElementById(n) || s.querySelector(`[name="${n}"]`);
                  if (i) return i;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, n);
          t && (this.scrollToElement(t), t.focus());
        }
        setHistoryScrollRestoration(n) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = n);
        }
        scrollToElement(n) {
          const t = n.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            o = t.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(r - s[0], o - s[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class tw {}
      class xF extends UP {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Ff extends xF {
        static makeCurrent() {
          !(function $P(e) {
            pf || (pf = e);
          })(new Ff());
        }
        onAndCancel(n, t, r) {
          return (
            n.addEventListener(t, r),
            () => {
              n.removeEventListener(t, r);
            }
          );
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t);
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n);
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, t) {
          return "window" === t
            ? window
            : "document" === t
            ? n
            : "body" === t
            ? n.body
            : null;
        }
        getBaseHref(n) {
          const t = (function PF() {
            return (
              (Xs = Xs || document.querySelector("base")),
              Xs ? Xs.getAttribute("href") : null
            );
          })();
          return null == t
            ? null
            : (function FF(e) {
                (Ac = Ac || document.createElement("a")),
                  Ac.setAttribute("href", e);
                const n = Ac.pathname;
                return "/" === n.charAt(0) ? n : `/${n}`;
              })(t);
        }
        resetBaseElement() {
          Xs = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(n) {
          return H_(document.cookie, n);
        }
      }
      let Ac,
        Xs = null,
        jF = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
          }
          return e;
        })();
      const kf = new w("EventManagerPlugins");
      let iw = (() => {
        class e {
          constructor(t, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, r, o) {
            return this._findPluginFor(r).addEventListener(t, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            let r = this._eventNameToPlugin.get(t);
            if (r) return r;
            if (((r = this._plugins.find((s) => s.supports(t))), !r))
              throw new D(5101, !1);
            return this._eventNameToPlugin.set(t, r), r;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(kf), b(re));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class aw {
        constructor(n) {
          this._doc = n;
        }
      }
      const jf = "ng-app-id";
      let cw = (() => {
        class e {
          constructor(t, r, o, s = {}) {
            (this.doc = t),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = s),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = ew(s)),
              this.resetHostNodes();
          }
          addStyles(t) {
            for (const r of t)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(t) {
            for (const r of t)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const t = this.styleNodesInDOM;
            t && (t.forEach((r) => r.remove()), t.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(t) {
            this.hostNodes.add(t);
            for (const r of this.getAllStyles()) this.addStyleToHost(t, r);
          }
          removeHost(t) {
            this.hostNodes.delete(t);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(t) {
            for (const r of this.hostNodes) this.addStyleToHost(r, t);
          }
          onStyleRemoved(t) {
            const r = this.styleRef;
            r.get(t)?.elements?.forEach((o) => o.remove()), r.delete(t);
          }
          collectServerRenderedStyles() {
            const t = this.doc.head?.querySelectorAll(
              `style[${jf}="${this.appId}"]`
            );
            if (t?.length) {
              const r = new Map();
              return (
                t.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(t, r) {
            const o = this.styleRef;
            if (o.has(t)) {
              const s = o.get(t);
              return (s.usage += r), s.usage;
            }
            return o.set(t, { usage: r, elements: [] }), r;
          }
          getStyleElement(t, r) {
            const o = this.styleNodesInDOM,
              s = o?.get(r);
            if (s?.parentNode === t)
              return o.delete(r), s.removeAttribute(jf), s;
            {
              const i = this.doc.createElement("style");
              return (
                this.nonce && i.setAttribute("nonce", this.nonce),
                (i.textContent = r),
                this.platformIsServer && i.setAttribute(jf, this.appId),
                i
              );
            }
          }
          addStyleToHost(t, r) {
            const o = this.getStyleElement(t, r);
            t.appendChild(o);
            const s = this.styleRef,
              i = s.get(r)?.elements;
            i ? i.push(o) : s.set(r, { elements: [o], usage: 1 });
          }
          resetHostNodes() {
            const t = this.hostNodes;
            t.clear(), t.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(dt), b(xa), b(lv, 8), b(dr));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Lf = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Vf = /%COMP%/g,
        $F = new w("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function uw(e, n) {
        return n.map((t) => t.replace(Vf, e));
      }
      let dw = (() => {
        class e {
          constructor(t, r, o, s, i, a, c, l = null) {
            (this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = s),
              (this.doc = i),
              (this.platformId = a),
              (this.ngZone = c),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = ew(a)),
              (this.defaultRenderer = new Bf(t, i, c, this.platformIsServer));
          }
          createRenderer(t, r) {
            if (!t || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === xt.ShadowDom &&
              (r = { ...r, encapsulation: xt.Emulated });
            const o = this.getOrCreateRenderer(t, r);
            return (
              o instanceof hw
                ? o.applyToHost(t)
                : o instanceof $f && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(t, r) {
            const o = this.rendererByCompId;
            let s = o.get(r.id);
            if (!s) {
              const i = this.doc,
                a = this.ngZone,
                c = this.eventManager,
                l = this.sharedStylesHost,
                u = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case xt.Emulated:
                  s = new hw(c, l, r, this.appId, u, i, a, d);
                  break;
                case xt.ShadowDom:
                  return new GF(c, l, t, r, i, a, this.nonce, d);
                default:
                  s = new $f(c, l, r, u, i, a, d);
              }
              o.set(r.id, s);
            }
            return s;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              b(iw),
              b(cw),
              b(xa),
              b($F),
              b(dt),
              b(dr),
              b(re),
              b(lv)
            );
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Bf {
        constructor(n, t, r, o) {
          (this.eventManager = n),
            (this.doc = t),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(n, t) {
          return t
            ? this.doc.createElementNS(Lf[t] || t, n)
            : this.doc.createElement(n);
        }
        createComment(n) {
          return this.doc.createComment(n);
        }
        createText(n) {
          return this.doc.createTextNode(n);
        }
        appendChild(n, t) {
          (fw(n) ? n.content : n).appendChild(t);
        }
        insertBefore(n, t, r) {
          n && (fw(n) ? n.content : n).insertBefore(t, r);
        }
        removeChild(n, t) {
          n && n.removeChild(t);
        }
        selectRootElement(n, t) {
          let r = "string" == typeof n ? this.doc.querySelector(n) : n;
          if (!r) throw new D(-5104, !1);
          return t || (r.textContent = ""), r;
        }
        parentNode(n) {
          return n.parentNode;
        }
        nextSibling(n) {
          return n.nextSibling;
        }
        setAttribute(n, t, r, o) {
          if (o) {
            t = o + ":" + t;
            const s = Lf[o];
            s ? n.setAttributeNS(s, t, r) : n.setAttribute(t, r);
          } else n.setAttribute(t, r);
        }
        removeAttribute(n, t, r) {
          if (r) {
            const o = Lf[r];
            o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`);
          } else n.removeAttribute(t);
        }
        addClass(n, t) {
          n.classList.add(t);
        }
        removeClass(n, t) {
          n.classList.remove(t);
        }
        setStyle(n, t, r, o) {
          o & ($n.DashCase | $n.Important)
            ? n.style.setProperty(t, r, o & $n.Important ? "important" : "")
            : (n.style[t] = r);
        }
        removeStyle(n, t, r) {
          r & $n.DashCase ? n.style.removeProperty(t) : (n.style[t] = "");
        }
        setProperty(n, t, r) {
          n[t] = r;
        }
        setValue(n, t) {
          n.nodeValue = t;
        }
        listen(n, t, r) {
          if (
            "string" == typeof n &&
            !(n = Gn().getGlobalEventTarget(this.doc, n))
          )
            throw new Error(`Unsupported event target ${n} for event ${t}`);
          return this.eventManager.addEventListener(
            n,
            t,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(n) {
          return (t) => {
            if ("__ngUnwrap__" === t) return n;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => n(t))
                : n(t)) && t.preventDefault();
          };
        }
      }
      function fw(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class GF extends Bf {
        constructor(n, t, r, o, s, i, a, c) {
          super(n, s, i, c),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const l = uw(o.id, o.styles);
          for (const u of l) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = u),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n;
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t);
        }
        insertBefore(n, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, r);
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t);
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(n))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class $f extends Bf {
        constructor(n, t, r, o, s, i, a, c) {
          super(n, s, i, a),
            (this.sharedStylesHost = t),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = c ? uw(c, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class hw extends $f {
        constructor(n, t, r, o, s, i, a, c) {
          const l = o + "-" + r.id;
          super(n, t, r, s, i, a, c, l),
            (this.contentAttr = (function UF(e) {
              return "_ngcontent-%COMP%".replace(Vf, e);
            })(l)),
            (this.hostAttr = (function HF(e) {
              return "_nghost-%COMP%".replace(Vf, e);
            })(l));
        }
        applyToHost(n) {
          this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
        }
        createElement(n, t) {
          const r = super.createElement(n, t);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let qF = (() => {
        class e extends aw {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, r, o) {
            return (
              t.addEventListener(r, o, !1),
              () => this.removeEventListener(t, r, o)
            );
          }
          removeEventListener(t, r, o) {
            return t.removeEventListener(r, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(dt));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const pw = ["alt", "control", "meta", "shift"],
        WF = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        ZF = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let KF = (() => {
        class e extends aw {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, r, o) {
            const s = e.parseEventName(r),
              i = e.eventCallback(s.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Gn().onAndCancel(t, s.domEventName, i));
          }
          static parseEventName(t) {
            const r = t.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const s = e._normalizeKey(r.pop());
            let i = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (i = "code.")),
              pw.forEach((l) => {
                const u = r.indexOf(l);
                u > -1 && (r.splice(u, 1), (i += l + "."));
              }),
              (i += s),
              0 != r.length || 0 === s.length)
            )
              return null;
            const c = {};
            return (c.domEventName = o), (c.fullKey = i), c;
          }
          static matchEventFullKeyCode(t, r) {
            let o = WF[t.key] || t.key,
              s = "";
            return (
              r.indexOf("code.") > -1 && ((o = t.code), (s = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                pw.forEach((i) => {
                  i !== o && (0, ZF[i])(t) && (s += i + ".");
                }),
                (s += o),
                s === r)
            );
          }
          static eventCallback(t, r, o) {
            return (s) => {
              e.matchEventFullKeyCode(s, t) && o.runGuarded(() => r(s));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(dt));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const XF = r_(MP, "browser", [
          { provide: dr, useValue: "browser" },
          {
            provide: cv,
            useValue: function YF() {
              Ff.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: dt,
            useFactory: function JF() {
              return (
                (function NA(e) {
                  Au = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        ek = new w(""),
        vw = [
          {
            provide: lc,
            useClass: class kF {
              addToWindow(n) {
                (te.getAngularTestability = (r, o = !0) => {
                  const s = n.findTestabilityInTree(r, o);
                  if (null == s) throw new D(5103, !1);
                  return s;
                }),
                  (te.getAllAngularTestabilities = () =>
                    n.getAllTestabilities()),
                  (te.getAllAngularRootElements = () => n.getAllRootElements()),
                  te.frameworkStabilizers || (te.frameworkStabilizers = []),
                  te.frameworkStabilizers.push((r) => {
                    const o = te.getAllAngularTestabilities();
                    let s = o.length,
                      i = !1;
                    const a = function (c) {
                      (i = i || c), s--, 0 == s && r(i);
                    };
                    o.forEach((c) => {
                      c.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(n, t, r) {
                return null == t
                  ? null
                  : n.getTestability(t) ??
                      (r
                        ? Gn().isShadowRoot(t)
                          ? this.findTestabilityInTree(n, t.host, !0)
                          : this.findTestabilityInTree(n, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: JC, useClass: tf, deps: [re, nf, lc] },
          { provide: tf, useClass: tf, deps: [re, nf, lc] },
        ],
        yw = [
          { provide: Lu, useValue: "root" },
          {
            provide: _n,
            useFactory: function QF() {
              return new _n();
            },
            deps: [],
          },
          { provide: kf, useClass: qF, multi: !0, deps: [dt, re, dr] },
          { provide: kf, useClass: KF, multi: !0, deps: [dt] },
          dw,
          cw,
          iw,
          { provide: mv, useExisting: dw },
          { provide: tw, useClass: jF, deps: [] },
          [],
        ];
      let tk = (() => {
          class e {
            constructor(t) {}
            static withServerTransition(t) {
              return {
                ngModule: e,
                providers: [{ provide: xa, useValue: t.appId }],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(ek, 12));
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({
              providers: [...yw, ...vw],
              imports: [Of, AP],
            }));
          }
          return e;
        })(),
        Dw = (() => {
          class e {
            constructor(t) {
              this._doc = t;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(t) {
              this._doc.title = t || "";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(dt));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: function (r) {
                let o = null;
                return (
                  (o = r
                    ? new r()
                    : (function rk() {
                        return new Dw(b(dt));
                      })()),
                  o
                );
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      function Hf(...e) {
        return (function ck() {
          return Nr(1);
        })()(ye(e, Ko(e)));
      }
      function bw(...e) {
        const n = Ko(e);
        return _e((t, r) => {
          (n ? Hf(e, t, n) : Hf(e, t)).subscribe(r);
        });
      }
      function Ew(e, n, t, r, o, s, i) {
        try {
          var a = e[s](i),
            c = a.value;
        } catch (l) {
          return void t(l);
        }
        a.done ? n(c) : Promise.resolve(c).then(r, o);
      }
      function zf(e) {
        return function () {
          var n = this,
            t = arguments;
          return new Promise(function (r, o) {
            var s = e.apply(n, t);
            function i(c) {
              Ew(s, r, o, i, a, "next", c);
            }
            function a(c) {
              Ew(s, r, o, i, a, "throw", c);
            }
            i(void 0);
          });
        };
      }
      function Wn(e, n) {
        const t = H(e) ? e : () => e,
          r = (o) => o.error(t());
        return new le(n ? (o) => n.schedule(r, 0, o) : r);
      }
      typeof window < "u" && window;
      const { isArray: lk } = Array,
        { getPrototypeOf: uk, prototype: dk, keys: fk } = Object;
      function Sw(e) {
        if (1 === e.length) {
          const n = e[0];
          if (lk(n)) return { args: n, keys: null };
          if (
            (function hk(e) {
              return e && "object" == typeof e && uk(e) === dk;
            })(n)
          ) {
            const t = fk(n);
            return { args: t.map((r) => n[r]), keys: t };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: pk } = Array;
      function Iw(e) {
        return A((n) =>
          (function mk(e, n) {
            return pk(n) ? e(...n) : e(n);
          })(e, n)
        );
      }
      function Mw(e, n) {
        return e.reduce((t, r, o) => ((t[r] = n[o]), t), {});
      }
      function ei(...e) {
        const n = Ko(e),
          t = Tp(e),
          { args: r, keys: o } = Sw(e);
        if (0 === r.length) return ye([], n);
        const s = new le(
          (function gk(e, n, t = xn) {
            return (r) => {
              Aw(
                n,
                () => {
                  const { length: o } = e,
                    s = new Array(o);
                  let i = o,
                    a = o;
                  for (let c = 0; c < o; c++)
                    Aw(
                      n,
                      () => {
                        const l = ye(e[c], n);
                        let u = !1;
                        l.subscribe(
                          ve(
                            r,
                            (d) => {
                              (s[c] = d),
                                u || ((u = !0), a--),
                                a || r.next(t(s.slice()));
                            },
                            () => {
                              --i || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, n, o ? (i) => Mw(o, i) : xn)
        );
        return t ? s.pipe(Iw(t)) : s;
      }
      function Aw(e, n, t) {
        e ? hn(t, e, n) : n();
      }
      const ti = _t(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Tw(e) {
        return new le((n) => {
          bt(e()).subscribe(n);
        });
      }
      function Gf() {
        return _e((e, n) => {
          let t = null;
          e._refCount++;
          const r = ve(n, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (t = null);
            const o = e._connection,
              s = t;
            (t = null),
              o && (!s || o === s) && o.unsubscribe(),
              n.unsubscribe();
          });
          e.subscribe(r), r.closed || (t = e.connect());
        });
      }
      class Rw extends le {
        constructor(n, t) {
          super(),
            (this.source = n),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            pp(n) && (this.lift = n.lift);
        }
        _subscribe(n) {
          return this.getSubject().subscribe(n);
        }
        getSubject() {
          const n = this._subject;
          return (
            (!n || n.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: n } = this;
          (this._subject = this._connection = null), n?.unsubscribe();
        }
        connect() {
          let n = this._connection;
          if (!n) {
            n = this._connection = new Me();
            const t = this.getSubject();
            n.add(
              this.source.subscribe(
                ve(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete();
                  },
                  (r) => {
                    this._teardown(), t.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              n.closed && ((this._connection = null), (n = Me.EMPTY));
          }
          return n;
        }
        refCount() {
          return Gf()(this);
        }
      }
      function Zn(e) {
        return e <= 0
          ? () => zt
          : _e((n, t) => {
              let r = 0;
              n.subscribe(
                ve(t, (o) => {
                  ++r <= e && (t.next(o), e <= r && t.complete());
                })
              );
            });
      }
      function He(e, n) {
        return _e((t, r) => {
          let o = 0;
          t.subscribe(ve(r, (s) => e.call(n, s, o++) && r.next(s)));
        });
      }
      function Tc(e) {
        return _e((n, t) => {
          let r = !1;
          n.subscribe(
            ve(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => {
                r || t.next(e), t.complete();
              }
            )
          );
        });
      }
      function Nw(e = Dk) {
        return _e((n, t) => {
          let r = !1;
          n.subscribe(
            ve(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => (r ? t.complete() : t.error(e()))
            )
          );
        });
      }
      function Dk() {
        return new ti();
      }
      function br(e, n) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? He((o, s) => e(o, s, r)) : xn,
            Zn(1),
            t ? Tc(n) : Nw(() => new ti())
          );
      }
      function Ro(e, n) {
        return H(n) ? Ne(e, n, 1) : Ne(e, 1);
      }
      function ge(e, n, t) {
        const r = H(e) || n || t ? { next: e, error: n, complete: t } : e;
        return r
          ? _e((o, s) => {
              var i;
              null === (i = r.subscribe) || void 0 === i || i.call(r);
              let a = !0;
              o.subscribe(
                ve(
                  s,
                  (c) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, c),
                      s.next(c);
                  },
                  () => {
                    var c;
                    (a = !1),
                      null === (c = r.complete) || void 0 === c || c.call(r),
                      s.complete();
                  },
                  (c) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, c),
                      s.error(c);
                  },
                  () => {
                    var c, l;
                    a &&
                      (null === (c = r.unsubscribe) ||
                        void 0 === c ||
                        c.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : xn;
      }
      function on(e) {
        return _e((n, t) => {
          let s,
            r = null,
            o = !1;
          (r = n.subscribe(
            ve(t, void 0, void 0, (i) => {
              (s = bt(e(i, on(e)(n)))),
                r ? (r.unsubscribe(), (r = null), s.subscribe(t)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), s.subscribe(t));
        });
      }
      function qf(e) {
        return e <= 0
          ? () => zt
          : _e((n, t) => {
              let r = [];
              n.subscribe(
                ve(
                  t,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) t.next(o);
                    t.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function ni(e) {
        return _e((n, t) => {
          try {
            n.subscribe(t);
          } finally {
            t.add(e);
          }
        });
      }
      const V = "primary",
        ri = Symbol("RouteTitle");
      class Sk {
        constructor(n) {
          this.params = n || {};
        }
        has(n) {
          return Object.prototype.hasOwnProperty.call(this.params, n);
        }
        get(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function No(e) {
        return new Sk(e);
      }
      function Ik(e, n, t) {
        const r = t.path.split("/");
        if (
          r.length > e.length ||
          ("full" === t.pathMatch && (n.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let s = 0; s < r.length; s++) {
          const i = r[s],
            a = e[s];
          if (i.startsWith(":")) o[i.substring(1)] = a;
          else if (i !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function sn(e, n) {
        const t = e ? Object.keys(e) : void 0,
          r = n ? Object.keys(n) : void 0;
        if (!t || !r || t.length != r.length) return !1;
        let o;
        for (let s = 0; s < t.length; s++)
          if (((o = t[s]), !Ow(e[o], n[o]))) return !1;
        return !0;
      }
      function Ow(e, n) {
        if (Array.isArray(e) && Array.isArray(n)) {
          if (e.length !== n.length) return !1;
          const t = [...e].sort(),
            r = [...n].sort();
          return t.every((o, s) => r[s] === o);
        }
        return e === n;
      }
      function xw(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Kn(e) {
        return (function yk(e) {
          return !!e && (e instanceof le || (H(e.lift) && H(e.subscribe)));
        })(e)
          ? e
          : Ls(e)
          ? ye(Promise.resolve(e))
          : R(e);
      }
      const Ak = {
          exact: function kw(e, n, t) {
            if (
              !Er(e.segments, n.segments) ||
              !Rc(e.segments, n.segments, t) ||
              e.numberOfChildren !== n.numberOfChildren
            )
              return !1;
            for (const r in n.children)
              if (!e.children[r] || !kw(e.children[r], n.children[r], t))
                return !1;
            return !0;
          },
          subset: jw,
        },
        Pw = {
          exact: function Tk(e, n) {
            return sn(e, n);
          },
          subset: function Rk(e, n) {
            return (
              Object.keys(n).length <= Object.keys(e).length &&
              Object.keys(n).every((t) => Ow(e[t], n[t]))
            );
          },
          ignored: () => !0,
        };
      function Fw(e, n, t) {
        return (
          Ak[t.paths](e.root, n.root, t.matrixParams) &&
          Pw[t.queryParams](e.queryParams, n.queryParams) &&
          !("exact" === t.fragment && e.fragment !== n.fragment)
        );
      }
      function jw(e, n, t) {
        return Lw(e, n, n.segments, t);
      }
      function Lw(e, n, t, r) {
        if (e.segments.length > t.length) {
          const o = e.segments.slice(0, t.length);
          return !(!Er(o, t) || n.hasChildren() || !Rc(o, t, r));
        }
        if (e.segments.length === t.length) {
          if (!Er(e.segments, t) || !Rc(e.segments, t, r)) return !1;
          for (const o in n.children)
            if (!e.children[o] || !jw(e.children[o], n.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = t.slice(0, e.segments.length),
            s = t.slice(e.segments.length);
          return (
            !!(Er(e.segments, o) && Rc(e.segments, o, r) && e.children[V]) &&
            Lw(e.children[V], n, s, r)
          );
        }
      }
      function Rc(e, n, t) {
        return n.every((r, o) => Pw[t](e[o].parameters, r.parameters));
      }
      class Oo {
        constructor(n = new J([], {}), t = {}, r = null) {
          (this.root = n), (this.queryParams = t), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = No(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return xk.serialize(this);
        }
      }
      class J {
        constructor(n, t) {
          (this.segments = n),
            (this.children = t),
            (this.parent = null),
            Object.values(t).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Nc(this);
        }
      }
      class oi {
        constructor(n, t) {
          (this.path = n), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = No(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return $w(this);
        }
      }
      function Er(e, n) {
        return e.length === n.length && e.every((t, r) => t.path === n[r].path);
      }
      let si = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: function () {
              return new Wf();
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      class Wf {
        parse(n) {
          const t = new zk(n);
          return new Oo(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(n) {
          const t = `/${ii(n.root, !0)}`,
            r = (function kk(e) {
              const n = Object.keys(e)
                .map((t) => {
                  const r = e[t];
                  return Array.isArray(r)
                    ? r.map((o) => `${Oc(t)}=${Oc(o)}`).join("&")
                    : `${Oc(t)}=${Oc(r)}`;
                })
                .filter((t) => !!t);
              return n.length ? `?${n.join("&")}` : "";
            })(n.queryParams);
          return `${t}${r}${
            "string" == typeof n.fragment
              ? `#${(function Pk(e) {
                  return encodeURI(e);
                })(n.fragment)}`
              : ""
          }`;
        }
      }
      const xk = new Wf();
      function Nc(e) {
        return e.segments.map((n) => $w(n)).join("/");
      }
      function ii(e, n) {
        if (!e.hasChildren()) return Nc(e);
        if (n) {
          const t = e.children[V] ? ii(e.children[V], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([o, s]) => {
              o !== V && r.push(`${o}:${ii(s, !1)}`);
            }),
            r.length > 0 ? `${t}(${r.join("//")})` : t
          );
        }
        {
          const t = (function Ok(e, n) {
            let t = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === V && (t = t.concat(n(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== V && (t = t.concat(n(o, r)));
              }),
              t
            );
          })(e, (r, o) =>
            o === V ? [ii(e.children[V], !1)] : [`${o}:${ii(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[V]
            ? `${Nc(e)}/${t[0]}`
            : `${Nc(e)}/(${t.join("//")})`;
        }
      }
      function Vw(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Oc(e) {
        return Vw(e).replace(/%3B/gi, ";");
      }
      function Zf(e) {
        return Vw(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function xc(e) {
        return decodeURIComponent(e);
      }
      function Bw(e) {
        return xc(e.replace(/\+/g, "%20"));
      }
      function $w(e) {
        return `${Zf(e.path)}${(function Fk(e) {
          return Object.keys(e)
            .map((n) => `;${Zf(n)}=${Zf(e[n])}`)
            .join("");
        })(e.parameters)}`;
      }
      const jk = /^[^\/()?;#]+/;
      function Kf(e) {
        const n = e.match(jk);
        return n ? n[0] : "";
      }
      const Lk = /^[^\/()?;=#]+/,
        Bk = /^[^=?&#]+/,
        Uk = /^[^&#]+/;
      class zk {
        constructor(n) {
          (this.url = n), (this.remaining = n);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new J([], {})
              : new J([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const n = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(n);
            } while (this.consumeOptional("&"));
          return n;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const n = [];
          for (
            this.peekStartsWith("(") || n.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), n.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (n.length > 0 || Object.keys(t).length > 0) && (r[V] = new J(n, t)),
            r
          );
        }
        parseSegment() {
          const n = Kf(this.remaining);
          if ("" === n && this.peekStartsWith(";")) throw new D(4009, !1);
          return this.capture(n), new oi(xc(n), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const n = {};
          for (; this.consumeOptional(";"); ) this.parseParam(n);
          return n;
        }
        parseParam(n) {
          const t = (function Vk(e) {
            const n = e.match(Lk);
            return n ? n[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Kf(this.remaining);
            o && ((r = o), this.capture(r));
          }
          n[xc(t)] = xc(r);
        }
        parseQueryParam(n) {
          const t = (function $k(e) {
            const n = e.match(Bk);
            return n ? n[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = (function Hk(e) {
              const n = e.match(Uk);
              return n ? n[0] : "";
            })(this.remaining);
            i && ((r = i), this.capture(r));
          }
          const o = Bw(t),
            s = Bw(r);
          if (n.hasOwnProperty(o)) {
            let i = n[o];
            Array.isArray(i) || ((i = [i]), (n[o] = i)), i.push(s);
          } else n[o] = s;
        }
        parseParens(n) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Kf(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new D(4010, !1);
            let s;
            r.indexOf(":") > -1
              ? ((s = r.slice(0, r.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : n && (s = V);
            const i = this.parseChildren();
            (t[s] = 1 === Object.keys(i).length ? i[V] : new J([], i)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(n) {
          return this.remaining.startsWith(n);
        }
        consumeOptional(n) {
          return (
            !!this.peekStartsWith(n) &&
            ((this.remaining = this.remaining.substring(n.length)), !0)
          );
        }
        capture(n) {
          if (!this.consumeOptional(n)) throw new D(4011, !1);
        }
      }
      function Uw(e) {
        return e.segments.length > 0 ? new J([], { [V]: e }) : e;
      }
      function Hw(e) {
        const n = {};
        for (const r of Object.keys(e.children)) {
          const s = Hw(e.children[r]);
          if (r === V && 0 === s.segments.length && s.hasChildren())
            for (const [i, a] of Object.entries(s.children)) n[i] = a;
          else (s.segments.length > 0 || s.hasChildren()) && (n[r] = s);
        }
        return (function Gk(e) {
          if (1 === e.numberOfChildren && e.children[V]) {
            const n = e.children[V];
            return new J(e.segments.concat(n.segments), n.children);
          }
          return e;
        })(new J(e.segments, n));
      }
      function Sr(e) {
        return e instanceof Oo;
      }
      function zw(e) {
        let n;
        const o = Uw(
          (function t(s) {
            const i = {};
            for (const c of s.children) {
              const l = t(c);
              i[c.outlet] = l;
            }
            const a = new J(s.url, i);
            return s === e && (n = a), a;
          })(e.root)
        );
        return n ?? o;
      }
      function Gw(e, n, t, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === n.length) return Yf(o, o, o, t, r);
        const s = (function Wk(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new Ww(!0, 0, e);
          let n = 0,
            t = !1;
          const r = e.reduce((o, s, i) => {
            if ("object" == typeof s && null != s) {
              if (s.outlets) {
                const a = {};
                return (
                  Object.entries(s.outlets).forEach(([c, l]) => {
                    a[c] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (s.segmentPath) return [...o, s.segmentPath];
            }
            return "string" != typeof s
              ? [...o, s]
              : 0 === i
              ? (s.split("/").forEach((a, c) => {
                  (0 == c && "." === a) ||
                    (0 == c && "" === a
                      ? (t = !0)
                      : ".." === a
                      ? n++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, s];
          }, []);
          return new Ww(t, n, r);
        })(n);
        if (s.toRoot()) return Yf(o, o, new J([], {}), t, r);
        const i = (function Zk(e, n, t) {
            if (e.isAbsolute) return new Fc(n, !0, 0);
            if (!t) return new Fc(n, !1, NaN);
            if (null === t.parent) return new Fc(t, !0, 0);
            const r = Pc(e.commands[0]) ? 0 : 1;
            return (function Kk(e, n, t) {
              let r = e,
                o = n,
                s = t;
              for (; s > o; ) {
                if (((s -= o), (r = r.parent), !r)) throw new D(4005, !1);
                o = r.segments.length;
              }
              return new Fc(r, !1, o - s);
            })(t, t.segments.length - 1 + r, e.numberOfDoubleDots);
          })(s, o, e),
          a = i.processChildren
            ? ci(i.segmentGroup, i.index, s.commands)
            : Zw(i.segmentGroup, i.index, s.commands);
        return Yf(o, i.segmentGroup, a, t, r);
      }
      function Pc(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function ai(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Yf(e, n, t, r, o) {
        let i,
          s = {};
        r &&
          Object.entries(r).forEach(([c, l]) => {
            s[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
          }),
          (i = e === n ? t : qw(e, n, t));
        const a = Uw(Hw(i));
        return new Oo(a, s, o);
      }
      function qw(e, n, t) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, s]) => {
            r[o] = s === n ? t : qw(s, n, t);
          }),
          new J(e.segments, r)
        );
      }
      class Ww {
        constructor(n, t, r) {
          if (
            ((this.isAbsolute = n),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            n && r.length > 0 && Pc(r[0]))
          )
            throw new D(4003, !1);
          const o = r.find(ai);
          if (o && o !== xw(r)) throw new D(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Fc {
        constructor(n, t, r) {
          (this.segmentGroup = n), (this.processChildren = t), (this.index = r);
        }
      }
      function Zw(e, n, t) {
        if (
          (e || (e = new J([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return ci(e, n, t);
        const r = (function Qk(e, n, t) {
            let r = 0,
              o = n;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= t.length) return s;
              const i = e.segments[o],
                a = t[r];
              if (ai(a)) break;
              const c = `${a}`,
                l = r < t.length - 1 ? t[r + 1] : null;
              if (o > 0 && void 0 === c) break;
              if (c && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Yw(c, l, i)) return s;
                r += 2;
              } else {
                if (!Yw(c, {}, i)) return s;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, n, t),
          o = t.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const s = new J(e.segments.slice(0, r.pathIndex), {});
          return (
            (s.children[V] = new J(e.segments.slice(r.pathIndex), e.children)),
            ci(s, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new J(e.segments, {})
          : r.match && !e.hasChildren()
          ? Qf(e, n, t)
          : r.match
          ? ci(e, 0, o)
          : Qf(e, n, t);
      }
      function ci(e, n, t) {
        if (0 === t.length) return new J(e.segments, {});
        {
          const r = (function Yk(e) {
              return ai(e[0]) ? e[0].outlets : { [V]: e };
            })(t),
            o = {};
          if (
            Object.keys(r).some((s) => s !== V) &&
            e.children[V] &&
            1 === e.numberOfChildren &&
            0 === e.children[V].segments.length
          ) {
            const s = ci(e.children[V], n, t);
            return new J(e.segments, s.children);
          }
          return (
            Object.entries(r).forEach(([s, i]) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Zw(e.children[s], n, i));
            }),
            Object.entries(e.children).forEach(([s, i]) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new J(e.segments, o)
          );
        }
      }
      function Qf(e, n, t) {
        const r = e.segments.slice(0, n);
        let o = 0;
        for (; o < t.length; ) {
          const s = t[o];
          if (ai(s)) {
            const c = Jk(s.outlets);
            return new J(r, c);
          }
          if (0 === o && Pc(t[0])) {
            r.push(new oi(e.segments[n].path, Kw(t[0]))), o++;
            continue;
          }
          const i = ai(s) ? s.outlets[V] : `${s}`,
            a = o < t.length - 1 ? t[o + 1] : null;
          i && a && Pc(a)
            ? (r.push(new oi(i, Kw(a))), (o += 2))
            : (r.push(new oi(i, {})), o++);
        }
        return new J(r, {});
      }
      function Jk(e) {
        const n = {};
        return (
          Object.entries(e).forEach(([t, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (n[t] = Qf(new J([], {}), 0, r));
          }),
          n
        );
      }
      function Kw(e) {
        const n = {};
        return Object.entries(e).forEach(([t, r]) => (n[t] = `${r}`)), n;
      }
      function Yw(e, n, t) {
        return e == t.path && sn(n, t.parameters);
      }
      const li = "imperative";
      class an {
        constructor(n, t) {
          (this.id = n), (this.url = t);
        }
      }
      class ui extends an {
        constructor(n, t, r = "imperative", o = null) {
          super(n, t),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Rn extends an {
        constructor(n, t, r) {
          super(n, t), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class xo extends an {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Po extends an {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class di extends an {
        constructor(n, t, r, o) {
          super(n, t), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Qw extends an {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Xk extends an {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class ej extends an {
        constructor(n, t, r, o, s) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = s),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class tj extends an {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class nj extends an {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class rj {
        constructor(n) {
          (this.route = n), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class oj {
        constructor(n) {
          (this.route = n), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class sj {
        constructor(n) {
          (this.snapshot = n), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ij {
        constructor(n) {
          (this.snapshot = n), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class aj {
        constructor(n) {
          (this.snapshot = n), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class cj {
        constructor(n) {
          (this.snapshot = n), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Jw {
        constructor(n, t, r) {
          (this.routerEvent = n),
            (this.position = t),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class Jf {}
      class Xf {
        constructor(n) {
          this.url = n;
        }
      }
      class lj {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new fi()),
            (this.attachRef = null);
        }
      }
      let fi = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(t, r) {
            const o = this.getOrCreateContext(t);
            (o.outlet = r), this.contexts.set(t, o);
          }
          onChildOutletDestroyed(t) {
            const r = this.getContext(t);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const t = this.contexts;
            return (this.contexts = new Map()), t;
          }
          onOutletReAttached(t) {
            this.contexts = t;
          }
          getOrCreateContext(t) {
            let r = this.getContext(t);
            return r || ((r = new lj()), this.contexts.set(t, r)), r;
          }
          getContext(t) {
            return this.contexts.get(t) || null;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class Xw {
        constructor(n) {
          this._root = n;
        }
        get root() {
          return this._root.value;
        }
        parent(n) {
          const t = this.pathFromRoot(n);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(n) {
          const t = eh(n, this._root);
          return t ? t.children.map((r) => r.value) : [];
        }
        firstChild(n) {
          const t = eh(n, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(n) {
          const t = th(n, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== n);
        }
        pathFromRoot(n) {
          return th(n, this._root).map((t) => t.value);
        }
      }
      function eh(e, n) {
        if (e === n.value) return n;
        for (const t of n.children) {
          const r = eh(e, t);
          if (r) return r;
        }
        return null;
      }
      function th(e, n) {
        if (e === n.value) return [n];
        for (const t of n.children) {
          const r = th(e, t);
          if (r.length) return r.unshift(n), r;
        }
        return [];
      }
      class Nn {
        constructor(n, t) {
          (this.value = n), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Fo(e) {
        const n = {};
        return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n;
      }
      class eb extends Xw {
        constructor(n, t) {
          super(n), (this.snapshot = t), nh(this, n);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function tb(e, n) {
        const t = (function uj(e, n) {
            const i = new kc([], {}, {}, "", {}, V, n, null, {});
            return new rb("", new Nn(i, []));
          })(0, n),
          r = new De([new oi("", {})]),
          o = new De({}),
          s = new De({}),
          i = new De({}),
          a = new De(""),
          c = new ko(r, o, i, a, s, V, n, t.root);
        return (c.snapshot = t.root), new eb(new Nn(c, []), t);
      }
      class ko {
        constructor(n, t, r, o, s, i, a, c) {
          (this.urlSubject = n),
            (this.paramsSubject = t),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = s),
            (this.outlet = i),
            (this.component = a),
            (this._futureSnapshot = c),
            (this.title = this.dataSubject?.pipe(A((l) => l[ri])) ?? R(void 0)),
            (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = s);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(A((n) => No(n)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(A((n) => No(n)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function nb(e, n = "emptyOnly") {
        const t = e.pathFromRoot;
        let r = 0;
        if ("always" !== n)
          for (r = t.length - 1; r >= 1; ) {
            const o = t[r],
              s = t[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (s.component) break;
              r--;
            }
          }
        return (function dj(e) {
          return e.reduce(
            (n, t) => ({
              params: { ...n.params, ...t.params },
              data: { ...n.data, ...t.data },
              resolve: {
                ...t.data,
                ...n.resolve,
                ...t.routeConfig?.data,
                ...t._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(t.slice(r));
      }
      class kc {
        get title() {
          return this.data?.[ri];
        }
        constructor(n, t, r, o, s, i, a, c, l) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = s),
            (this.outlet = i),
            (this.component = a),
            (this.routeConfig = c),
            (this._resolve = l);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = No(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = No(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class rb extends Xw {
        constructor(n, t) {
          super(t), (this.url = n), nh(this, t);
        }
        toString() {
          return ob(this._root);
        }
      }
      function nh(e, n) {
        (n.value._routerState = e), n.children.forEach((t) => nh(e, t));
      }
      function ob(e) {
        const n =
          e.children.length > 0 ? ` { ${e.children.map(ob).join(", ")} } ` : "";
        return `${e.value}${n}`;
      }
      function rh(e) {
        if (e.snapshot) {
          const n = e.snapshot,
            t = e._futureSnapshot;
          (e.snapshot = t),
            sn(n.queryParams, t.queryParams) ||
              e.queryParamsSubject.next(t.queryParams),
            n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment),
            sn(n.params, t.params) || e.paramsSubject.next(t.params),
            (function Mk(e, n) {
              if (e.length !== n.length) return !1;
              for (let t = 0; t < e.length; ++t) if (!sn(e[t], n[t])) return !1;
              return !0;
            })(n.url, t.url) || e.urlSubject.next(t.url),
            sn(n.data, t.data) || e.dataSubject.next(t.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function oh(e, n) {
        const t =
          sn(e.params, n.params) &&
          (function Nk(e, n) {
            return (
              Er(e, n) && e.every((t, r) => sn(t.parameters, n[r].parameters))
            );
          })(e.url, n.url);
        return (
          t &&
          !(!e.parent != !n.parent) &&
          (!e.parent || oh(e.parent, n.parent))
        );
      }
      let sb = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = V),
              (this.activateEvents = new de()),
              (this.deactivateEvents = new de()),
              (this.attachEvents = new de()),
              (this.detachEvents = new de()),
              (this.parentContexts = I(fi)),
              (this.location = I(Vt)),
              (this.changeDetector = I(dc)),
              (this.environmentInjector = I(at)),
              (this.inputBinder = I(jc, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(t) {
            if (t.name) {
              const { firstChange: r, previousValue: o } = t.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(t) {
            return this.parentContexts.getContext(t)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const t = this.parentContexts.getContext(this.name);
            t?.route &&
              (t.attachRef
                ? this.attach(t.attachRef, t.route)
                : this.activateWith(t.route, t.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new D(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new D(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new D(4012, !1);
            this.location.detach();
            const t = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            );
          }
          attach(t, r) {
            (this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(t.instance);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, r) {
            if (this.isActivated) throw new D(4013, !1);
            this._activatedRoute = t;
            const o = this.location,
              i = t.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              c = new fj(t, a, o.injector);
            (this.activated = o.createComponent(i, {
              index: o.length,
              injector: c,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵdir = P({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [It],
          }));
        }
        return e;
      })();
      class fj {
        constructor(n, t, r) {
          (this.route = n), (this.childContexts = t), (this.parent = r);
        }
        get(n, t) {
          return n === ko
            ? this.route
            : n === fi
            ? this.childContexts
            : this.parent.get(n, t);
        }
      }
      const jc = new w("");
      let ib = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(t) {
            this.unsubscribeFromRouteData(t), this.subscribeToRouteData(t);
          }
          unsubscribeFromRouteData(t) {
            this.outletDataSubscriptions.get(t)?.unsubscribe(),
              this.outletDataSubscriptions.delete(t);
          }
          subscribeToRouteData(t) {
            const { activatedRoute: r } = t,
              o = ei([r.queryParams, r.params, r.data])
                .pipe(
                  Ae(
                    ([s, i, a], c) => (
                      (a = { ...s, ...i, ...a }),
                      0 === c ? R(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((s) => {
                  if (
                    !t.isActivated ||
                    !t.activatedComponentRef ||
                    t.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(t);
                  const i = (function BP(e) {
                    const n = z(e);
                    if (!n) return null;
                    const t = new Ns(n);
                    return {
                      get selector() {
                        return t.selector;
                      },
                      get type() {
                        return t.componentType;
                      },
                      get inputs() {
                        return t.inputs;
                      },
                      get outputs() {
                        return t.outputs;
                      },
                      get ngContentSelectors() {
                        return t.ngContentSelectors;
                      },
                      get isStandalone() {
                        return n.standalone;
                      },
                      get isSignal() {
                        return n.signals;
                      },
                    };
                  })(r.component);
                  if (i)
                    for (const { templateName: a } of i.inputs)
                      t.activatedComponentRef.setInput(a, s[a]);
                  else this.unsubscribeFromRouteData(t);
                });
            this.outletDataSubscriptions.set(t, o);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function hi(e, n, t) {
        if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
          const r = t.value;
          r._futureSnapshot = n.value;
          const o = (function pj(e, n, t) {
            return n.children.map((r) => {
              for (const o of t.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return hi(e, r, o);
              return hi(e, r);
            });
          })(e, n, t);
          return new Nn(r, o);
        }
        {
          if (e.shouldAttach(n.value)) {
            const s = e.retrieve(n.value);
            if (null !== s) {
              const i = s.route;
              return (
                (i.value._futureSnapshot = n.value),
                (i.children = n.children.map((a) => hi(e, a))),
                i
              );
            }
          }
          const r = (function mj(e) {
              return new ko(
                new De(e.url),
                new De(e.params),
                new De(e.queryParams),
                new De(e.fragment),
                new De(e.data),
                e.outlet,
                e.component,
                e
              );
            })(n.value),
            o = n.children.map((s) => hi(e, s));
          return new Nn(r, o);
        }
      }
      const sh = "ngNavigationCancelingError";
      function ab(e, n) {
        const { redirectTo: t, navigationBehaviorOptions: r } = Sr(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
          o = cb(!1, 0, n);
        return (o.url = t), (o.navigationBehaviorOptions = r), o;
      }
      function cb(e, n, t) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[sh] = !0), (r.cancellationCode = n), t && (r.url = t), r;
      }
      function lb(e) {
        return e && e[sh];
      }
      let ub = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = Wi({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [nC],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && En(0, "router-outlet");
            },
            dependencies: [sb],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function ih(e) {
        const n = e.children && e.children.map(ih),
          t = n ? { ...e, children: n } : { ...e };
        return (
          !t.component &&
            !t.loadComponent &&
            (n || t.loadChildren) &&
            t.outlet &&
            t.outlet !== V &&
            (t.component = ub),
          t
        );
      }
      function Ut(e) {
        return e.outlet || V;
      }
      function pi(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let n = e.parent; n; n = n.parent) {
          const t = n.routeConfig;
          if (t?._loadedInjector) return t._loadedInjector;
          if (t?._injector) return t._injector;
        }
        return null;
      }
      class bj {
        constructor(n, t, r, o, s) {
          (this.routeReuseStrategy = n),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = s);
        }
        activate(n) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, r, n),
            rh(this.futureState.root),
            this.activateChildRoutes(t, r, n);
        }
        deactivateChildRoutes(n, t, r) {
          const o = Fo(t);
          n.children.forEach((s) => {
            const i = s.value.outlet;
            this.deactivateRoutes(s, o[i], r), delete o[i];
          }),
            Object.values(o).forEach((s) => {
              this.deactivateRouteAndItsChildren(s, r);
            });
        }
        deactivateRoutes(n, t, r) {
          const o = n.value,
            s = t ? t.value : null;
          if (o === s)
            if (o.component) {
              const i = r.getContext(o.outlet);
              i && this.deactivateChildRoutes(n, t, i.children);
            } else this.deactivateChildRoutes(n, t, r);
          else s && this.deactivateRouteAndItsChildren(t, r);
        }
        deactivateRouteAndItsChildren(n, t) {
          n.value.component &&
          this.routeReuseStrategy.shouldDetach(n.value.snapshot)
            ? this.detachAndStoreRouteSubtree(n, t)
            : this.deactivateRouteAndOutlet(n, t);
        }
        detachAndStoreRouteSubtree(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            s = Fo(n);
          for (const i of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[i], o);
          if (r && r.outlet) {
            const i = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(n.value.snapshot, {
              componentRef: i,
              route: n,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            s = Fo(n);
          for (const i of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[i], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(n, t, r) {
          const o = Fo(t);
          n.children.forEach((s) => {
            this.activateRoutes(s, o[s.value.outlet], r),
              this.forwardEvent(new cj(s.value.snapshot));
          }),
            n.children.length && this.forwardEvent(new ij(n.value.snapshot));
        }
        activateRoutes(n, t, r) {
          const o = n.value,
            s = t ? t.value : null;
          if ((rh(o), o === s))
            if (o.component) {
              const i = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(n, t, i.children);
            } else this.activateChildRoutes(n, t, r);
          else if (o.component) {
            const i = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                i.children.onOutletReAttached(a.contexts),
                (i.attachRef = a.componentRef),
                (i.route = a.route.value),
                i.outlet && i.outlet.attach(a.componentRef, a.route.value),
                rh(a.route.value),
                this.activateChildRoutes(n, null, i.children);
            } else {
              const a = pi(o.snapshot);
              (i.attachRef = null),
                (i.route = o),
                (i.injector = a),
                i.outlet && i.outlet.activateWith(o, i.injector),
                this.activateChildRoutes(n, null, i.children);
            }
          } else this.activateChildRoutes(n, null, r);
        }
      }
      class db {
        constructor(n) {
          (this.path = n), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Lc {
        constructor(n, t) {
          (this.component = n), (this.route = t);
        }
      }
      function Ej(e, n, t) {
        const r = e._root;
        return mi(r, n ? n._root : null, t, [r.value]);
      }
      function jo(e, n) {
        const t = Symbol(),
          r = n.get(e, t);
        return r === t
          ? "function" != typeof e ||
            (function WS(e) {
              return null !== Bi(e);
            })(e)
            ? n.get(e)
            : e
          : r;
      }
      function mi(
        e,
        n,
        t,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = Fo(n);
        return (
          e.children.forEach((i) => {
            (function Ij(
              e,
              n,
              t,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = e.value,
                i = n ? n.value : null,
                a = t ? t.getContext(e.value.outlet) : null;
              if (i && s.routeConfig === i.routeConfig) {
                const c = (function Mj(e, n, t) {
                  if ("function" == typeof t) return t(e, n);
                  switch (t) {
                    case "pathParamsChange":
                      return !Er(e.url, n.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Er(e.url, n.url) || !sn(e.queryParams, n.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !oh(e, n) || !sn(e.queryParams, n.queryParams);
                    default:
                      return !oh(e, n);
                  }
                })(i, s, s.routeConfig.runGuardsAndResolvers);
                c
                  ? o.canActivateChecks.push(new db(r))
                  : ((s.data = i.data), (s._resolvedData = i._resolvedData)),
                  mi(e, n, s.component ? (a ? a.children : null) : t, r, o),
                  c &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Lc(a.outlet.component, i));
              } else
                i && gi(n, a, o),
                  o.canActivateChecks.push(new db(r)),
                  mi(e, null, s.component ? (a ? a.children : null) : t, r, o);
            })(i, s[i.value.outlet], t, r.concat([i.value]), o),
              delete s[i.value.outlet];
          }),
          Object.entries(s).forEach(([i, a]) => gi(a, t.getContext(i), o)),
          o
        );
      }
      function gi(e, n, t) {
        const r = Fo(e),
          o = e.value;
        Object.entries(r).forEach(([s, i]) => {
          gi(i, o.component ? (n ? n.children.getContext(s) : null) : n, t);
        }),
          t.canDeactivateChecks.push(
            new Lc(
              o.component && n && n.outlet && n.outlet.isActivated
                ? n.outlet.component
                : null,
              o
            )
          );
      }
      function vi(e) {
        return "function" == typeof e;
      }
      function fb(e) {
        return e instanceof ti || "EmptyError" === e?.name;
      }
      const Vc = Symbol("INITIAL_VALUE");
      function Lo() {
        return Ae((e) =>
          ei(e.map((n) => n.pipe(Zn(1), bw(Vc)))).pipe(
            A((n) => {
              for (const t of n)
                if (!0 !== t) {
                  if (t === Vc) return Vc;
                  if (!1 === t || t instanceof Oo) return t;
                }
              return !0;
            }),
            He((n) => n !== Vc),
            Zn(1)
          )
        );
      }
      function hb(e) {
        return (function Y0(...e) {
          return dp(e);
        })(
          ge((n) => {
            if (Sr(n)) throw ab(0, n);
          }),
          A((n) => !0 === n)
        );
      }
      class Bc {
        constructor(n) {
          this.segmentGroup = n || null;
        }
      }
      class pb {
        constructor(n) {
          this.urlTree = n;
        }
      }
      function Vo(e) {
        return Wn(new Bc(e));
      }
      function mb(e) {
        return Wn(new pb(e));
      }
      class Wj {
        constructor(n, t) {
          (this.urlSerializer = n), (this.urlTree = t);
        }
        noMatchError(n) {
          return new D(4002, !1);
        }
        lineralizeSegments(n, t) {
          let r = [],
            o = t.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return R(r);
            if (o.numberOfChildren > 1 || !o.children[V])
              return Wn(new D(4e3, !1));
            o = o.children[V];
          }
        }
        applyRedirectCommands(n, t, r) {
          return this.applyRedirectCreateUrlTree(
            t,
            this.urlSerializer.parse(t),
            n,
            r
          );
        }
        applyRedirectCreateUrlTree(n, t, r, o) {
          const s = this.createSegmentGroup(n, t.root, r, o);
          return new Oo(
            s,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(n, t) {
          const r = {};
          return (
            Object.entries(n).forEach(([o, s]) => {
              if ("string" == typeof s && s.startsWith(":")) {
                const a = s.substring(1);
                r[o] = t[a];
              } else r[o] = s;
            }),
            r
          );
        }
        createSegmentGroup(n, t, r, o) {
          const s = this.createSegments(n, t.segments, r, o);
          let i = {};
          return (
            Object.entries(t.children).forEach(([a, c]) => {
              i[a] = this.createSegmentGroup(n, c, r, o);
            }),
            new J(s, i)
          );
        }
        createSegments(n, t, r, o) {
          return t.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(n, s, o)
              : this.findOrReturn(s, r)
          );
        }
        findPosParam(n, t, r) {
          const o = r[t.path.substring(1)];
          if (!o) throw new D(4001, !1);
          return o;
        }
        findOrReturn(n, t) {
          let r = 0;
          for (const o of t) {
            if (o.path === n.path) return t.splice(r), o;
            r++;
          }
          return n;
        }
      }
      const ah = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Zj(e, n, t, r, o) {
        const s = ch(e, n, t);
        return s.matched
          ? ((r = (function vj(e, n) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Ld(e.providers, n, `Route: ${e.path}`)),
                e._injector ?? n
              );
            })(n, r)),
            (function zj(e, n, t, r) {
              const o = n.canMatch;
              return o && 0 !== o.length
                ? R(
                    o.map((i) => {
                      const a = jo(i, e);
                      return Kn(
                        (function xj(e) {
                          return e && vi(e.canMatch);
                        })(a)
                          ? a.canMatch(n, t)
                          : e.runInContext(() => a(n, t))
                      );
                    })
                  ).pipe(Lo(), hb())
                : R(!0);
            })(r, n, t).pipe(A((i) => (!0 === i ? s : { ...ah }))))
          : R(s);
      }
      function ch(e, n, t) {
        if ("" === n.path)
          return "full" === n.pathMatch && (e.hasChildren() || t.length > 0)
            ? { ...ah }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: t,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (n.matcher || Ik)(t, e, n);
        if (!o) return { ...ah };
        const s = {};
        Object.entries(o.posParams ?? {}).forEach(([a, c]) => {
          s[a] = c.path;
        });
        const i =
          o.consumed.length > 0
            ? { ...s, ...o.consumed[o.consumed.length - 1].parameters }
            : s;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: t.slice(o.consumed.length),
          parameters: i,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function gb(e, n, t, r) {
        return t.length > 0 &&
          (function Qj(e, n, t) {
            return t.some((r) => $c(e, n, r) && Ut(r) !== V);
          })(e, t, r)
          ? {
              segmentGroup: new J(n, Yj(r, new J(t, e.children))),
              slicedSegments: [],
            }
          : 0 === t.length &&
            (function Jj(e, n, t) {
              return t.some((r) => $c(e, n, r));
            })(e, t, r)
          ? {
              segmentGroup: new J(e.segments, Kj(e, 0, t, r, e.children)),
              slicedSegments: t,
            }
          : { segmentGroup: new J(e.segments, e.children), slicedSegments: t };
      }
      function Kj(e, n, t, r, o) {
        const s = {};
        for (const i of r)
          if ($c(e, t, i) && !o[Ut(i)]) {
            const a = new J([], {});
            s[Ut(i)] = a;
          }
        return { ...o, ...s };
      }
      function Yj(e, n) {
        const t = {};
        t[V] = n;
        for (const r of e)
          if ("" === r.path && Ut(r) !== V) {
            const o = new J([], {});
            t[Ut(r)] = o;
          }
        return t;
      }
      function $c(e, n, t) {
        return (
          (!(e.hasChildren() || n.length > 0) || "full" !== t.pathMatch) &&
          "" === t.path
        );
      }
      class nL {
        constructor(n, t, r, o, s, i, a) {
          (this.injector = n),
            (this.configLoader = t),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = s),
            (this.paramsInheritanceStrategy = i),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new Wj(this.urlSerializer, this.urlTree));
        }
        noMatchError(n) {
          return new D(4002, !1);
        }
        recognize() {
          const n = gb(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n,
            V
          ).pipe(
            on((t) => {
              if (t instanceof pb)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = t.urlTree),
                  this.match(t.urlTree)
                );
              throw t instanceof Bc ? this.noMatchError(t) : t;
            }),
            A((t) => {
              const r = new kc(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  V,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new Nn(r, t),
                s = new rb("", o),
                i = (function qk(e, n, t = null, r = null) {
                  return Gw(zw(e), n, t, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (i.queryParams = this.urlTree.queryParams),
                (s.url = this.urlSerializer.serialize(i)),
                this.inheritParamsAndData(s._root),
                { state: s, tree: i }
              );
            })
          );
        }
        match(n) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n.root,
            V
          ).pipe(
            on((r) => {
              throw r instanceof Bc ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(n) {
          const t = n.value,
            r = nb(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            n.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(n, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(n, t, r)
            : this.processSegment(n, t, r, r.segments, o, !0);
        }
        processChildren(n, t, r) {
          const o = [];
          for (const s of Object.keys(r.children))
            "primary" === s ? o.unshift(s) : o.push(s);
          return ye(o).pipe(
            Ro((s) => {
              const i = r.children[s],
                a = (function _j(e, n) {
                  const t = e.filter((r) => Ut(r) === n);
                  return t.push(...e.filter((r) => Ut(r) !== n)), t;
                })(t, s);
              return this.processSegmentGroup(n, a, i, s);
            }),
            (function _k(e, n) {
              return _e(
                (function Ck(e, n, t, r, o) {
                  return (s, i) => {
                    let a = t,
                      c = n,
                      l = 0;
                    s.subscribe(
                      ve(
                        i,
                        (u) => {
                          const d = l++;
                          (c = a ? e(c, u, d) : ((a = !0), u)), r && i.next(c);
                        },
                        o &&
                          (() => {
                            a && i.next(c), i.complete();
                          })
                      )
                    );
                  };
                })(e, n, arguments.length >= 2, !0)
              );
            })((s, i) => (s.push(...i), s)),
            Tc(null),
            (function wk(e, n) {
              const t = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? He((o, s) => e(o, s, r)) : xn,
                  qf(1),
                  t ? Tc(n) : Nw(() => new ti())
                );
            })(),
            Ne((s) => {
              if (null === s) return Vo(r);
              const i = vb(s);
              return (
                (function rL(e) {
                  e.sort((n, t) =>
                    n.value.outlet === V
                      ? -1
                      : t.value.outlet === V
                      ? 1
                      : n.value.outlet.localeCompare(t.value.outlet)
                  );
                })(i),
                R(i)
              );
            })
          );
        }
        processSegment(n, t, r, o, s, i) {
          return ye(t).pipe(
            Ro((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? n,
                t,
                a,
                r,
                o,
                s,
                i
              ).pipe(
                on((c) => {
                  if (c instanceof Bc) return R(null);
                  throw c;
                })
              )
            ),
            br((a) => !!a),
            on((a) => {
              if (fb(a))
                return (function eL(e, n, t) {
                  return 0 === n.length && !e.children[t];
                })(r, o, s)
                  ? R([])
                  : Vo(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(n, t, r, o, s, i, a) {
          return (function Xj(e, n, t, r) {
            return (
              !!(Ut(e) === r || (r !== V && $c(n, t, e))) &&
              ("**" === e.path || ch(n, e, t).matched)
            );
          })(r, o, s, i)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(n, o, r, s, i, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(n, o, t, r, s, i)
              : Vo(o)
            : Vo(o);
        }
        expandSegmentAgainstRouteUsingRedirect(n, t, r, o, s, i) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, o, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                n,
                t,
                r,
                o,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, r, o) {
          const s = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? mb(s)
            : this.applyRedirects.lineralizeSegments(r, s).pipe(
                Ne((i) => {
                  const a = new J(i, {});
                  return this.processSegment(n, t, a, i, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, s, i) {
          const {
            matched: a,
            consumedSegments: c,
            remainingSegments: l,
            positionalParamSegments: u,
          } = ch(t, o, s);
          if (!a) return Vo(t);
          const d = this.applyRedirects.applyRedirectCommands(
            c,
            o.redirectTo,
            u
          );
          return o.redirectTo.startsWith("/")
            ? mb(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  Ne((f) => this.processSegment(n, r, t, f.concat(l), i, !1))
                );
        }
        matchSegmentAgainstRoute(n, t, r, o, s, i) {
          let a;
          if ("**" === r.path) {
            const c = o.length > 0 ? xw(o).parameters : {};
            (a = R({
              snapshot: new kc(
                o,
                c,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                yb(r),
                Ut(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                Db(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (t.children = {});
          } else
            a = Zj(t, r, o, n).pipe(
              A(
                ({
                  matched: c,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: d,
                }) =>
                  c
                    ? {
                        snapshot: new kc(
                          l,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          yb(r),
                          Ut(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          Db(r)
                        ),
                        consumedSegments: l,
                        remainingSegments: u,
                      }
                    : null
              )
            );
          return a.pipe(
            Ae((c) =>
              null === c
                ? Vo(t)
                : this.getChildConfig((n = r._injector ?? n), r, o).pipe(
                    Ae(({ routes: l }) => {
                      const u = r._loadedInjector ?? n,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = c,
                        { segmentGroup: p, slicedSegments: m } = gb(t, f, h, l);
                      if (0 === m.length && p.hasChildren())
                        return this.processChildren(u, l, p).pipe(
                          A((_) => (null === _ ? null : [new Nn(d, _)]))
                        );
                      if (0 === l.length && 0 === m.length)
                        return R([new Nn(d, [])]);
                      const v = Ut(r) === s;
                      return this.processSegment(
                        u,
                        l,
                        p,
                        m,
                        v ? V : s,
                        !0
                      ).pipe(A((_) => [new Nn(d, _)]));
                    })
                  )
            )
          );
        }
        getChildConfig(n, t, r) {
          return t.children
            ? R({ routes: t.children, injector: n })
            : t.loadChildren
            ? void 0 !== t._loadedRoutes
              ? R({ routes: t._loadedRoutes, injector: t._loadedInjector })
              : (function Hj(e, n, t, r) {
                  const o = n.canLoad;
                  return void 0 === o || 0 === o.length
                    ? R(!0)
                    : R(
                        o.map((i) => {
                          const a = jo(i, e);
                          return Kn(
                            (function Tj(e) {
                              return e && vi(e.canLoad);
                            })(a)
                              ? a.canLoad(n, t)
                              : e.runInContext(() => a(n, t))
                          );
                        })
                      ).pipe(Lo(), hb());
                })(n, t, r).pipe(
                  Ne((o) =>
                    o
                      ? this.configLoader.loadChildren(n, t).pipe(
                          ge((s) => {
                            (t._loadedRoutes = s.routes),
                              (t._loadedInjector = s.injector);
                          })
                        )
                      : (function qj(e) {
                          return Wn(cb(!1, 3));
                        })()
                  )
                )
            : R({ routes: [], injector: n });
        }
      }
      function oL(e) {
        const n = e.value.routeConfig;
        return n && "" === n.path;
      }
      function vb(e) {
        const n = [],
          t = new Set();
        for (const r of e) {
          if (!oL(r)) {
            n.push(r);
            continue;
          }
          const o = n.find((s) => r.value.routeConfig === s.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), t.add(o)) : n.push(r);
        }
        for (const r of t) {
          const o = vb(r.children);
          n.push(new Nn(r.value, o));
        }
        return n.filter((r) => !t.has(r));
      }
      function yb(e) {
        return e.data || {};
      }
      function Db(e) {
        return e.resolve || {};
      }
      function Cb(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function lh(e) {
        return Ae((n) => {
          const t = e(n);
          return t ? ye(t).pipe(A(() => n)) : R(n);
        });
      }
      const Bo = new w("ROUTES");
      let uh = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = I(ZC));
          }
          loadComponent(t) {
            if (this.componentLoaders.get(t))
              return this.componentLoaders.get(t);
            if (t._loadedComponent) return R(t._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(t);
            const r = Kn(t.loadComponent()).pipe(
                A(_b),
                ge((s) => {
                  this.onLoadEndListener && this.onLoadEndListener(t),
                    (t._loadedComponent = s);
                }),
                ni(() => {
                  this.componentLoaders.delete(t);
                })
              ),
              o = new Rw(r, () => new Ge()).pipe(Gf());
            return this.componentLoaders.set(t, o), o;
          }
          loadChildren(t, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return R({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const s = (function dL(e, n, t, r) {
                return Kn(e.loadChildren()).pipe(
                  A(_b),
                  Ne((o) =>
                    o instanceof eC || Array.isArray(o)
                      ? R(o)
                      : ye(n.compileModuleAsync(o))
                  ),
                  A((o) => {
                    r && r(e);
                    let s,
                      i,
                      a = !1;
                    return (
                      Array.isArray(o)
                        ? ((i = o), !0)
                        : ((s = o.create(t).injector),
                          (i = s
                            .get(Bo, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: i.map(ih), injector: s }
                    );
                  })
                );
              })(r, this.compiler, t, this.onLoadEndListener).pipe(
                ni(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              i = new Rw(s, () => new Ge()).pipe(Gf());
            return this.childrenLoaders.set(r, i), i;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function _b(e) {
        return (function fL(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Uc = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Ge()),
              (this.transitionAbortSubject = new Ge()),
              (this.configLoader = I(uh)),
              (this.environmentInjector = I(at)),
              (this.urlSerializer = I(si)),
              (this.rootContexts = I(fi)),
              (this.inputBindingEnabled = null !== I(jc, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => R(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new oj(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new rj(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(t) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...t, id: r });
          }
          setupNavigations(t, r, o) {
            return (
              (this.transitions = new De({
                id: 0,
                currentUrlTree: r,
                currentRawUrl: r,
                currentBrowserUrl: r,
                extractedUrl: t.urlHandlingStrategy.extract(r),
                urlAfterRedirects: t.urlHandlingStrategy.extract(r),
                rawUrl: r,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: li,
                restoredState: null,
                currentSnapshot: o.snapshot,
                targetSnapshot: null,
                currentRouterState: o,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                He((s) => 0 !== s.id),
                A((s) => ({
                  ...s,
                  extractedUrl: t.urlHandlingStrategy.extract(s.rawUrl),
                })),
                Ae((s) => {
                  this.currentTransition = s;
                  let i = !1,
                    a = !1;
                  return R(s).pipe(
                    ge((c) => {
                      this.currentNavigation = {
                        id: c.id,
                        initialUrl: c.rawUrl,
                        extractedUrl: c.extractedUrl,
                        trigger: c.source,
                        extras: c.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Ae((c) => {
                      const l = c.currentBrowserUrl.toString(),
                        u =
                          !t.navigated ||
                          c.extractedUrl.toString() !== l ||
                          l !== c.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (c.extras.onSameUrlNavigation ??
                            t.onSameUrlNavigation)
                      ) {
                        const f = "";
                        return (
                          this.events.next(
                            new Po(
                              c.id,
                              this.urlSerializer.serialize(c.rawUrl),
                              f,
                              0
                            )
                          ),
                          c.resolve(null),
                          zt
                        );
                      }
                      if (t.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                        return R(c).pipe(
                          Ae((f) => {
                            const h = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new ui(
                                  f.id,
                                  this.urlSerializer.serialize(f.extractedUrl),
                                  f.source,
                                  f.restoredState
                                )
                              ),
                              h !== this.transitions?.getValue()
                                ? zt
                                : Promise.resolve(f)
                            );
                          }),
                          (function sL(e, n, t, r, o, s) {
                            return Ne((i) =>
                              (function tL(e, n, t, r, o, s, i = "emptyOnly") {
                                return new nL(e, n, t, r, o, i, s).recognize();
                              })(e, n, t, r, i.extractedUrl, o, s).pipe(
                                A(({ state: a, tree: c }) => ({
                                  ...i,
                                  targetSnapshot: a,
                                  urlAfterRedirects: c,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            t.config,
                            this.urlSerializer,
                            t.paramsInheritanceStrategy
                          ),
                          ge((f) => {
                            (s.targetSnapshot = f.targetSnapshot),
                              (s.urlAfterRedirects = f.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: f.urlAfterRedirects,
                              });
                            const h = new Qw(
                              f.id,
                              this.urlSerializer.serialize(f.extractedUrl),
                              this.urlSerializer.serialize(f.urlAfterRedirects),
                              f.targetSnapshot
                            );
                            this.events.next(h);
                          })
                        );
                      if (
                        u &&
                        t.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                      ) {
                        const {
                            id: f,
                            extractedUrl: h,
                            source: p,
                            restoredState: m,
                            extras: v,
                          } = c,
                          _ = new ui(f, this.urlSerializer.serialize(h), p, m);
                        this.events.next(_);
                        const g = tb(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = s =
                            {
                              ...c,
                              targetSnapshot: g,
                              urlAfterRedirects: h,
                              extras: {
                                ...v,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          R(s)
                        );
                      }
                      {
                        const f = "";
                        return (
                          this.events.next(
                            new Po(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              f,
                              1
                            )
                          ),
                          c.resolve(null),
                          zt
                        );
                      }
                    }),
                    ge((c) => {
                      const l = new Xk(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot
                      );
                      this.events.next(l);
                    }),
                    A(
                      (c) => (
                        (this.currentTransition = s =
                          {
                            ...c,
                            guards: Ej(
                              c.targetSnapshot,
                              c.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        s
                      )
                    ),
                    (function Fj(e, n) {
                      return Ne((t) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: s,
                            canDeactivateChecks: i,
                          },
                        } = t;
                        return 0 === i.length && 0 === s.length
                          ? R({ ...t, guardsResult: !0 })
                          : (function kj(e, n, t, r) {
                              return ye(e).pipe(
                                Ne((o) =>
                                  (function Uj(e, n, t, r, o) {
                                    const s =
                                      n && n.routeConfig
                                        ? n.routeConfig.canDeactivate
                                        : null;
                                    return s && 0 !== s.length
                                      ? R(
                                          s.map((a) => {
                                            const c = pi(n) ?? o,
                                              l = jo(a, c);
                                            return Kn(
                                              (function Oj(e) {
                                                return e && vi(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, n, t, r)
                                                : c.runInContext(() =>
                                                    l(e, n, t, r)
                                                  )
                                            ).pipe(br());
                                          })
                                        ).pipe(Lo())
                                      : R(!0);
                                  })(o.component, o.route, t, n, r)
                                ),
                                br((o) => !0 !== o, !0)
                              );
                            })(i, r, o, e).pipe(
                              Ne((a) =>
                                a &&
                                (function Aj(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function jj(e, n, t, r) {
                                      return ye(n).pipe(
                                        Ro((o) =>
                                          Hf(
                                            (function Vj(e, n) {
                                              return (
                                                null !== e && n && n(new sj(e)),
                                                R(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function Lj(e, n) {
                                              return (
                                                null !== e && n && n(new aj(e)),
                                                R(!0)
                                              );
                                            })(o.route, r),
                                            (function $j(e, n, t) {
                                              const r = n[n.length - 1],
                                                s = n
                                                  .slice(0, n.length - 1)
                                                  .reverse()
                                                  .map((i) =>
                                                    (function Sj(e) {
                                                      const n = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return n && 0 !== n.length
                                                        ? { node: e, guards: n }
                                                        : null;
                                                    })(i)
                                                  )
                                                  .filter((i) => null !== i)
                                                  .map((i) =>
                                                    Tw(() =>
                                                      R(
                                                        i.guards.map((c) => {
                                                          const l =
                                                              pi(i.node) ?? t,
                                                            u = jo(c, l);
                                                          return Kn(
                                                            (function Nj(e) {
                                                              return (
                                                                e &&
                                                                vi(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(u)
                                                              ? u.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => u(r, e)
                                                                )
                                                          ).pipe(br());
                                                        })
                                                      ).pipe(Lo())
                                                    )
                                                  );
                                              return R(s).pipe(Lo());
                                            })(e, o.path, t),
                                            (function Bj(e, n, t) {
                                              const r = n.routeConfig
                                                ? n.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return R(!0);
                                              const o = r.map((s) =>
                                                Tw(() => {
                                                  const i = pi(n) ?? t,
                                                    a = jo(s, i);
                                                  return Kn(
                                                    (function Rj(e) {
                                                      return (
                                                        e && vi(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(n, e)
                                                      : i.runInContext(() =>
                                                          a(n, e)
                                                        )
                                                  ).pipe(br());
                                                })
                                              );
                                              return R(o).pipe(Lo());
                                            })(e, o.route, t)
                                          )
                                        ),
                                        br((o) => !0 !== o, !0)
                                      );
                                    })(r, s, e, n)
                                  : R(a)
                              ),
                              A((a) => ({ ...t, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (c) => this.events.next(c)),
                    ge((c) => {
                      if (
                        ((s.guardsResult = c.guardsResult), Sr(c.guardsResult))
                      )
                        throw ab(0, c.guardsResult);
                      const l = new ej(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot,
                        !!c.guardsResult
                      );
                      this.events.next(l);
                    }),
                    He(
                      (c) =>
                        !!c.guardsResult ||
                        (this.cancelNavigationTransition(c, "", 3), !1)
                    ),
                    lh((c) => {
                      if (c.guards.canActivateChecks.length)
                        return R(c).pipe(
                          ge((l) => {
                            const u = new tj(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Ae((l) => {
                            let u = !1;
                            return R(l).pipe(
                              (function iL(e, n) {
                                return Ne((t) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = t;
                                  if (!o.length) return R(t);
                                  let s = 0;
                                  return ye(o).pipe(
                                    Ro((i) =>
                                      (function aL(e, n, t, r) {
                                        const o = e.routeConfig,
                                          s = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !Cb(o) &&
                                            (s[ri] = o.title),
                                          (function cL(e, n, t, r) {
                                            const o = (function lL(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return R({});
                                            const s = {};
                                            return ye(o).pipe(
                                              Ne((i) =>
                                                (function uL(e, n, t, r) {
                                                  const o = pi(n) ?? r,
                                                    s = jo(e, o);
                                                  return Kn(
                                                    s.resolve
                                                      ? s.resolve(n, t)
                                                      : o.runInContext(() =>
                                                          s(n, t)
                                                        )
                                                  );
                                                })(e[i], n, t, r).pipe(
                                                  br(),
                                                  ge((a) => {
                                                    s[i] = a;
                                                  })
                                                )
                                              ),
                                              qf(1),
                                              (function bk(e) {
                                                return A(() => e);
                                              })(s),
                                              on((i) => (fb(i) ? zt : Wn(i)))
                                            );
                                          })(s, e, n, r).pipe(
                                            A(
                                              (i) => (
                                                (e._resolvedData = i),
                                                (e.data = nb(e, t).resolve),
                                                o &&
                                                  Cb(o) &&
                                                  (e.data[ri] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(i.route, r, e, n)
                                    ),
                                    ge(() => s++),
                                    qf(1),
                                    Ne((i) => (s === o.length ? R(t) : zt))
                                  );
                                });
                              })(
                                t.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              ge({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    this.cancelNavigationTransition(l, "", 2);
                                },
                              })
                            );
                          }),
                          ge((l) => {
                            const u = new nj(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    lh((c) => {
                      const l = (u) => {
                        const d = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          d.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              ge((f) => {
                                u.component = f;
                              }),
                              A(() => {})
                            )
                          );
                        for (const f of u.children) d.push(...l(f));
                        return d;
                      };
                      return ei(l(c.targetSnapshot.root)).pipe(Tc(), Zn(1));
                    }),
                    lh(() => this.afterPreactivation()),
                    A((c) => {
                      const l = (function hj(e, n, t) {
                        const r = hi(e, n._root, t ? t._root : void 0);
                        return new eb(r, n);
                      })(
                        t.routeReuseStrategy,
                        c.targetSnapshot,
                        c.currentRouterState
                      );
                      return (
                        (this.currentTransition = s =
                          { ...c, targetRouterState: l }),
                        s
                      );
                    }),
                    ge(() => {
                      this.events.next(new Jf());
                    }),
                    ((e, n, t, r) =>
                      A(
                        (o) => (
                          new bj(
                            n,
                            o.targetRouterState,
                            o.currentRouterState,
                            t,
                            r
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      t.routeReuseStrategy,
                      (c) => this.events.next(c),
                      this.inputBindingEnabled
                    ),
                    Zn(1),
                    ge({
                      next: (c) => {
                        (i = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new Rn(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects)
                            )
                          ),
                          t.titleStrategy?.updateTitle(
                            c.targetRouterState.snapshot
                          ),
                          c.resolve(!0);
                      },
                      complete: () => {
                        i = !0;
                      },
                    }),
                    (function Ek(e) {
                      return _e((n, t) => {
                        bt(e).subscribe(ve(t, () => t.complete(), fl)),
                          !t.closed && n.subscribe(t);
                      });
                    })(
                      this.transitionAbortSubject.pipe(
                        ge((c) => {
                          throw c;
                        })
                      )
                    ),
                    ni(() => {
                      i || a || this.cancelNavigationTransition(s, "", 1),
                        this.currentNavigation?.id === s.id &&
                          (this.currentNavigation = null);
                    }),
                    on((c) => {
                      if (((a = !0), lb(c)))
                        this.events.next(
                          new xo(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            c.message,
                            c.cancellationCode
                          )
                        ),
                          (function gj(e) {
                            return lb(e) && Sr(e.url);
                          })(c)
                            ? this.events.next(new Xf(c.url))
                            : s.resolve(!1);
                      else {
                        this.events.next(
                          new di(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            c,
                            s.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          s.resolve(t.errorHandler(c));
                        } catch (l) {
                          s.reject(l);
                        }
                      }
                      return zt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(t, r, o) {
            const s = new xo(
              t.id,
              this.urlSerializer.serialize(t.extractedUrl),
              r,
              o
            );
            this.events.next(s), t.resolve(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function wb(e) {
        return e !== li;
      }
      let bb = (() => {
          class e {
            buildTitle(t) {
              let r,
                o = t.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((s) => s.outlet === V));
              return r;
            }
            getResolvedTitleForRoute(t) {
              return t.data[ri];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: function () {
                return I(hL);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        hL = (() => {
          class e extends bb {
            constructor(t) {
              super(), (this.title = t);
            }
            updateTitle(t) {
              const r = this.buildTitle(t);
              void 0 !== r && this.title.setTitle(r);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Dw));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        pL = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: function () {
                return I(gL);
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      class mL {
        shouldDetach(n) {
          return !1;
        }
        store(n, t) {}
        shouldAttach(n) {
          return !1;
        }
        retrieve(n) {
          return null;
        }
        shouldReuseRoute(n, t) {
          return n.routeConfig === t.routeConfig;
        }
      }
      let gL = (() => {
        class e extends mL {
          static #e = (this.ɵfac = (function () {
            let t;
            return function (o) {
              return (t || (t = be(e)))(o || e);
            };
          })());
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const Hc = new w("", { providedIn: "root", factory: () => ({}) });
      let vL = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: function () {
                return I(yL);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        yL = (() => {
          class e {
            shouldProcessUrl(t) {
              return !0;
            }
            extract(t) {
              return t;
            }
            merge(t, r) {
              return t;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      var yi = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(yi || {});
      function Eb(e, n) {
        e.events
          .pipe(
            He(
              (t) =>
                t instanceof Rn ||
                t instanceof xo ||
                t instanceof di ||
                t instanceof Po
            ),
            A((t) =>
              t instanceof Rn || t instanceof Po
                ? yi.COMPLETE
                : t instanceof xo && (0 === t.code || 1 === t.code)
                ? yi.REDIRECTING
                : yi.FAILED
            ),
            He((t) => t !== yi.REDIRECTING),
            Zn(1)
          )
          .subscribe(() => {
            n();
          });
      }
      function DL(e) {
        throw e;
      }
      function CL(e, n, t) {
        return n.parse("/");
      }
      const _L = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        wL = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let tt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return "computed" !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = I(WC)),
              (this.isNgZoneEnabled = !1),
              (this._events = new Ge()),
              (this.options = I(Hc, { optional: !0 }) || {}),
              (this.pendingTasks = I(ac)),
              (this.errorHandler = this.options.errorHandler || DL),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || CL),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = I(vL)),
              (this.routeReuseStrategy = I(pL)),
              (this.titleStrategy = I(bb)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = I(Bo, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = I(Uc)),
              (this.urlSerializer = I(si)),
              (this.location = I(vf)),
              (this.componentInputBindingEnabled = !!I(jc, { optional: !0 })),
              (this.eventsSubscription = new Me()),
              (this.isNgZoneEnabled =
                I(re) instanceof re && re.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Oo()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = tb(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (t) => {
                    (this.lastSuccessfulId = t.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  (t) => {
                    this.console.warn(`Unhandled Navigation Error: ${t}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const t = this.navigationTransitions.events.subscribe((r) => {
              try {
                const { currentTransition: o } = this.navigationTransitions;
                if (null === o) return void (Sb(r) && this._events.next(r));
                if (r instanceof ui)
                  wb(o.source) && (this.browserUrlTree = o.extractedUrl);
                else if (r instanceof Po) this.rawUrlTree = o.rawUrl;
                else if (r instanceof Qw) {
                  if ("eager" === this.urlUpdateStrategy) {
                    if (!o.extras.skipLocationChange) {
                      const s = this.urlHandlingStrategy.merge(
                        o.urlAfterRedirects,
                        o.rawUrl
                      );
                      this.setBrowserUrl(s, o);
                    }
                    this.browserUrlTree = o.urlAfterRedirects;
                  }
                } else if (r instanceof Jf)
                  (this.currentUrlTree = o.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      o.urlAfterRedirects,
                      o.rawUrl
                    )),
                    (this.routerState = o.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (o.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, o),
                      (this.browserUrlTree = o.urlAfterRedirects));
                else if (r instanceof xo)
                  0 !== r.code && 1 !== r.code && (this.navigated = !0),
                    (3 === r.code || 2 === r.code) && this.restoreHistory(o);
                else if (r instanceof Xf) {
                  const s = this.urlHandlingStrategy.merge(
                      r.url,
                      o.currentRawUrl
                    ),
                    i = {
                      skipLocationChange: o.extras.skipLocationChange,
                      replaceUrl:
                        "eager" === this.urlUpdateStrategy || wb(o.source),
                    };
                  this.scheduleNavigation(s, li, null, i, {
                    resolve: o.resolve,
                    reject: o.reject,
                    promise: o.promise,
                  });
                }
                r instanceof di && this.restoreHistory(o, !0),
                  r instanceof Rn && (this.navigated = !0),
                  Sb(r) && this._events.next(r);
              } catch (o) {
                this.navigationTransitions.transitionAbortSubject.next(o);
              }
            });
            this.eventsSubscription.add(t);
          }
          resetRootComponentType(t) {
            (this.routerState.root.component = t),
              (this.navigationTransitions.rootComponentType = t);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const t = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), li, t);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((t) => {
                const r = "popstate" === t.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(t.url, r, t.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(t, r, o) {
            const s = { replaceUrl: !0 },
              i = o?.navigationId ? o : null;
            if (o) {
              const c = { ...o };
              delete c.navigationId,
                delete c.ɵrouterPageId,
                0 !== Object.keys(c).length && (s.state = c);
            }
            const a = this.parseUrl(t);
            this.scheduleNavigation(a, r, i, s);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(t) {
            (this.config = t.map(ih)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(t, r = {}) {
            const {
                relativeTo: o,
                queryParams: s,
                fragment: i,
                queryParamsHandling: a,
                preserveFragment: c,
              } = r,
              l = c ? this.currentUrlTree.fragment : i;
            let d,
              u = null;
            switch (a) {
              case "merge":
                u = { ...this.currentUrlTree.queryParams, ...s };
                break;
              case "preserve":
                u = this.currentUrlTree.queryParams;
                break;
              default:
                u = s || null;
            }
            null !== u && (u = this.removeEmptyProps(u));
            try {
              d = zw(o ? o.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof t[0] || !t[0].startsWith("/")) && (t = []),
                (d = this.currentUrlTree.root);
            }
            return Gw(d, t, u, l ?? null);
          }
          navigateByUrl(t, r = { skipLocationChange: !1 }) {
            const o = Sr(t) ? t : this.parseUrl(t),
              s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(s, li, null, r);
          }
          navigate(t, r = { skipLocationChange: !1 }) {
            return (
              (function bL(e) {
                for (let n = 0; n < e.length; n++)
                  if (null == e[n]) throw new D(4008, !1);
              })(t),
              this.navigateByUrl(this.createUrlTree(t, r), r)
            );
          }
          serializeUrl(t) {
            return this.urlSerializer.serialize(t);
          }
          parseUrl(t) {
            let r;
            try {
              r = this.urlSerializer.parse(t);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, t);
            }
            return r;
          }
          isActive(t, r) {
            let o;
            if (((o = !0 === r ? { ..._L } : !1 === r ? { ...wL } : r), Sr(t)))
              return Fw(this.currentUrlTree, t, o);
            const s = this.parseUrl(t);
            return Fw(this.currentUrlTree, s, o);
          }
          removeEmptyProps(t) {
            return Object.keys(t).reduce((r, o) => {
              const s = t[o];
              return null != s && (r[o] = s), r;
            }, {});
          }
          scheduleNavigation(t, r, o, s, i) {
            if (this.disposed) return Promise.resolve(!1);
            let a, c, l;
            i
              ? ((a = i.resolve), (c = i.reject), (l = i.promise))
              : (l = new Promise((d, f) => {
                  (a = d), (c = f);
                }));
            const u = this.pendingTasks.add();
            return (
              Eb(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(u));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: t,
                extras: s,
                resolve: a,
                reject: c,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(t, r) {
            const o = this.urlSerializer.serialize(t);
            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
              const i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(o, "", i);
            } else {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId + 1),
              };
              this.location.go(o, "", s);
            }
          }
          restoreHistory(t, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - this.browserPageId;
              0 !== s
                ? this.location.historyGo(s)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === s &&
                  (this.resetState(t),
                  (this.browserUrlTree = t.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
          }
          resetState(t) {
            (this.routerState = t.currentRouterState),
              (this.currentUrlTree = t.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                t.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(t, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: t, ɵrouterPageId: r }
              : { navigationId: t };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Sb(e) {
        return !(e instanceof Jf || e instanceof Xf);
      }
      class Ib {}
      let IL = (() => {
        class e {
          constructor(t, r, o, s, i) {
            (this.router = t),
              (this.injector = o),
              (this.preloadingStrategy = s),
              (this.loader = i);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                He((t) => t instanceof Rn),
                Ro(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(t, r) {
            const o = [];
            for (const s of r) {
              s.providers &&
                !s._injector &&
                (s._injector = Ld(s.providers, t, `Route: ${s.path}`));
              const i = s._injector ?? t,
                a = s._loadedInjector ?? i;
              ((s.loadChildren && !s._loadedRoutes && void 0 === s.canLoad) ||
                (s.loadComponent && !s._loadedComponent)) &&
                o.push(this.preloadConfig(i, s)),
                (s.children || s._loadedRoutes) &&
                  o.push(this.processRoutes(a, s.children ?? s._loadedRoutes));
            }
            return ye(o).pipe(Nr());
          }
          preloadConfig(t, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(t, r)
                  : R(null);
              const s = o.pipe(
                Ne((i) =>
                  null === i
                    ? R(void 0)
                    : ((r._loadedRoutes = i.routes),
                      (r._loadedInjector = i.injector),
                      this.processRoutes(i.injector ?? t, i.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? ye([s, this.loader.loadComponent(r)]).pipe(Nr())
                : s;
            });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(tt), b(ZC), b(at), b(Ib), b(uh));
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const fh = new w("");
      let Mb = (() => {
        class e {
          constructor(t, r, o, s, i = {}) {
            (this.urlSerializer = t),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = s),
              (this.options = i),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (i.scrollPositionRestoration =
                i.scrollPositionRestoration || "disabled"),
              (i.anchorScrolling = i.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof ui
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = t.navigationTrigger),
                  (this.restoredId = t.restoredState
                    ? t.restoredState.navigationId
                    : 0))
                : t instanceof Rn
                ? ((this.lastId = t.id),
                  this.scheduleScrollEvent(
                    t,
                    this.urlSerializer.parse(t.urlAfterRedirects).fragment
                  ))
                : t instanceof Po &&
                  0 === t.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    t,
                    this.urlSerializer.parse(t.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof Jw &&
                (t.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(t.position)
                  : t.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(t.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(t, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Jw(
                      t,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            !(function Bv() {
              throw new Error("invalid");
            })();
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function On(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      function Tb() {
        const e = I(Te);
        return (n) => {
          const t = e.get(Cr);
          if (n !== t.components[0]) return;
          const r = e.get(tt),
            o = e.get(Rb);
          1 === e.get(hh) && r.initialNavigation(),
            e.get(Nb, null, $.Optional)?.setUpPreloading(),
            e.get(fh, null, $.Optional)?.init(),
            r.resetRootComponentType(t.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const Rb = new w("", { factory: () => new Ge() }),
        hh = new w("", { providedIn: "root", factory: () => 1 }),
        Nb = new w("");
      function RL(e) {
        return On(0, [
          { provide: Nb, useExisting: IL },
          { provide: Ib, useExisting: e },
        ]);
      }
      const Ob = new w("ROUTER_FORROOT_GUARD"),
        OL = [
          vf,
          { provide: si, useClass: Wf },
          tt,
          fi,
          {
            provide: ko,
            useFactory: function Ab(e) {
              return e.routerState.root;
            },
            deps: [tt],
          },
          uh,
          [],
        ];
      function xL() {
        return new t_("Router", tt);
      }
      let xb = (() => {
        class e {
          constructor(t) {}
          static forRoot(t, r) {
            return {
              ngModule: e,
              providers: [
                OL,
                [],
                { provide: Bo, multi: !0, useValue: t },
                {
                  provide: Ob,
                  useFactory: jL,
                  deps: [[tt, new ha(), new pa()]],
                },
                { provide: Hc, useValue: r || {} },
                r?.useHash
                  ? { provide: wr, useClass: GP }
                  : { provide: wr, useClass: O_ },
                {
                  provide: fh,
                  useFactory: () => {
                    const e = I(cF),
                      n = I(re),
                      t = I(Hc),
                      r = I(Uc),
                      o = I(si);
                    return (
                      t.scrollOffset && e.setOffset(t.scrollOffset),
                      new Mb(o, r, e, n, t)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? RL(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: t_, multi: !0, useFactory: xL },
                r?.initialNavigation ? LL(r) : [],
                r?.bindToComponentInputs
                  ? On(8, [ib, { provide: jc, useExisting: ib }]).ɵproviders
                  : [],
                [
                  { provide: Pb, useFactory: Tb },
                  { provide: af, multi: !0, useExisting: Pb },
                ],
              ],
            };
          }
          static forChild(t) {
            return {
              ngModule: e,
              providers: [{ provide: Bo, multi: !0, useValue: t }],
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(Ob, 8));
          });
          static #t = (this.ɵmod = Le({ type: e }));
          static #n = (this.ɵinj = Oe({}));
        }
        return e;
      })();
      function jL(e) {
        return "guarded";
      }
      function LL(e) {
        return [
          "disabled" === e.initialNavigation
            ? On(3, [
                {
                  provide: nn,
                  multi: !0,
                  useFactory: () => {
                    const n = I(tt);
                    return () => {
                      n.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: hh, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? On(2, [
                { provide: hh, useValue: 0 },
                {
                  provide: nn,
                  multi: !0,
                  deps: [Te],
                  useFactory: (n) => {
                    const t = n.get(HP, Promise.resolve());
                    return () =>
                      t.then(
                        () =>
                          new Promise((r) => {
                            const o = n.get(tt),
                              s = n.get(Rb);
                            Eb(o, () => {
                              r(!0);
                            }),
                              (n.get(Uc).afterPreactivation = () => (
                                r(!0), s.closed ? R(void 0) : s
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const Pb = new w("");
      class zc {}
      class Gc {}
      class cn {
        constructor(n) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            n
              ? "string" == typeof n
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      n.split("\n").forEach((t) => {
                        const r = t.indexOf(":");
                        if (r > 0) {
                          const o = t.slice(0, r),
                            s = o.toLowerCase(),
                            i = t.slice(r + 1).trim();
                          this.maybeSetNormalizedName(o, s),
                            this.headers.has(s)
                              ? this.headers.get(s).push(i)
                              : this.headers.set(s, [i]);
                        }
                      });
                  })
                : typeof Headers < "u" && n instanceof Headers
                ? ((this.headers = new Map()),
                  n.forEach((t, r) => {
                    this.setHeaderEntries(r, t);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(n).forEach(([t, r]) => {
                        this.setHeaderEntries(t, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(n) {
          return this.init(), this.headers.has(n.toLowerCase());
        }
        get(n) {
          this.init();
          const t = this.headers.get(n.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(n) {
          return this.init(), this.headers.get(n.toLowerCase()) || null;
        }
        append(n, t) {
          return this.clone({ name: n, value: t, op: "a" });
        }
        set(n, t) {
          return this.clone({ name: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ name: n, value: t, op: "d" });
        }
        maybeSetNormalizedName(n, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, n);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof cn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((n) => this.applyUpdate(n)),
              (this.lazyUpdate = null)));
        }
        copyFrom(n) {
          n.init(),
            Array.from(n.headers.keys()).forEach((t) => {
              this.headers.set(t, n.headers.get(t)),
                this.normalizedNames.set(t, n.normalizedNames.get(t));
            });
        }
        clone(n) {
          const t = new cn();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof cn
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
            t
          );
        }
        applyUpdate(n) {
          const t = n.name.toLowerCase();
          switch (n.op) {
            case "a":
            case "s":
              let r = n.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(n.name, t);
              const o = ("a" === n.op ? this.headers.get(t) : void 0) || [];
              o.push(...r), this.headers.set(t, o);
              break;
            case "d":
              const s = n.value;
              if (s) {
                let i = this.headers.get(t);
                if (!i) return;
                (i = i.filter((a) => -1 === s.indexOf(a))),
                  0 === i.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, i);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        setHeaderEntries(n, t) {
          const r = (Array.isArray(t) ? t : [t]).map((s) => s.toString()),
            o = n.toLowerCase();
          this.headers.set(o, r), this.maybeSetNormalizedName(n, o);
        }
        forEach(n) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              n(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class BL {
        encodeKey(n) {
          return Fb(n);
        }
        encodeValue(n) {
          return Fb(n);
        }
        decodeKey(n) {
          return decodeURIComponent(n);
        }
        decodeValue(n) {
          return decodeURIComponent(n);
        }
      }
      const UL = /%(\d[a-f0-9])/gi,
        HL = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Fb(e) {
        return encodeURIComponent(e).replace(UL, (n, t) => HL[t] ?? n);
      }
      function qc(e) {
        return `${e}`;
      }
      class ln {
        constructor(n = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = n.encoder || new BL()),
            n.fromString)
          ) {
            if (n.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function $L(e, n) {
              const t = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const s = o.indexOf("="),
                        [i, a] =
                          -1 == s
                            ? [n.decodeKey(o), ""]
                            : [
                                n.decodeKey(o.slice(0, s)),
                                n.decodeValue(o.slice(s + 1)),
                              ],
                        c = t.get(i) || [];
                      c.push(a), t.set(i, c);
                    }),
                t
              );
            })(n.fromString, this.encoder);
          } else
            n.fromObject
              ? ((this.map = new Map()),
                Object.keys(n.fromObject).forEach((t) => {
                  const r = n.fromObject[t],
                    o = Array.isArray(r) ? r.map(qc) : [qc(r)];
                  this.map.set(t, o);
                }))
              : (this.map = null);
        }
        has(n) {
          return this.init(), this.map.has(n);
        }
        get(n) {
          this.init();
          const t = this.map.get(n);
          return t ? t[0] : null;
        }
        getAll(n) {
          return this.init(), this.map.get(n) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(n, t) {
          return this.clone({ param: n, value: t, op: "a" });
        }
        appendAll(n) {
          const t = [];
          return (
            Object.keys(n).forEach((r) => {
              const o = n[r];
              Array.isArray(o)
                ? o.forEach((s) => {
                    t.push({ param: r, value: s, op: "a" });
                  })
                : t.push({ param: r, value: o, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(n, t) {
          return this.clone({ param: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ param: n, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((n) => {
                const t = this.encoder.encodeKey(n);
                return this.map
                  .get(n)
                  .map((r) => t + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((n) => "" !== n)
              .join("&")
          );
        }
        clone(n) {
          const t = new ln({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(n)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
              this.updates.forEach((n) => {
                switch (n.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === n.op ? this.map.get(n.param) : void 0) || [];
                    t.push(qc(n.value)), this.map.set(n.param, t);
                    break;
                  case "d":
                    if (void 0 === n.value) {
                      this.map.delete(n.param);
                      break;
                    }
                    {
                      let r = this.map.get(n.param) || [];
                      const o = r.indexOf(qc(n.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(n.param, r)
                          : this.map.delete(n.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class kb {
        constructor() {
          this.map = new Map();
        }
        set(n, t) {
          return this.map.set(n, t), this;
        }
        get(n) {
          return (
            this.map.has(n) || this.map.set(n, n.defaultValue()),
            this.map.get(n)
          );
        }
        delete(n) {
          return this.map.delete(n), this;
        }
        has(n) {
          return this.map.has(n);
        }
        keys() {
          return this.map.keys();
        }
      }
      function jb(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function Lb(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function Vb(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Di {
        constructor(n, t, r, o) {
          let s;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = n.toUpperCase()),
            (function GL(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (s = o))
              : (s = r),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new cn()),
            this.context || (this.context = new kb()),
            this.params)
          ) {
            const i = this.params.toString();
            if (0 === i.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + i;
            }
          } else (this.params = new ln()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : jb(this.body) ||
              Lb(this.body) ||
              Vb(this.body) ||
              (function qL(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof ln
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Vb(this.body)
            ? null
            : Lb(this.body)
            ? this.body.type || null
            : jb(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof ln
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(n = {}) {
          const t = n.method || this.method,
            r = n.url || this.url,
            o = n.responseType || this.responseType,
            s = void 0 !== n.body ? n.body : this.body,
            i =
              void 0 !== n.withCredentials
                ? n.withCredentials
                : this.withCredentials,
            a =
              void 0 !== n.reportProgress
                ? n.reportProgress
                : this.reportProgress;
          let c = n.headers || this.headers,
            l = n.params || this.params;
          const u = n.context ?? this.context;
          return (
            void 0 !== n.setHeaders &&
              (c = Object.keys(n.setHeaders).reduce(
                (d, f) => d.set(f, n.setHeaders[f]),
                c
              )),
            n.setParams &&
              (l = Object.keys(n.setParams).reduce(
                (d, f) => d.set(f, n.setParams[f]),
                l
              )),
            new Di(t, r, s, {
              params: l,
              headers: c,
              context: u,
              reportProgress: a,
              responseType: o,
              withCredentials: i,
            })
          );
        }
      }
      var $o = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })($o || {});
      class ph {
        constructor(n, t = 200, r = "OK") {
          (this.headers = n.headers || new cn()),
            (this.status = void 0 !== n.status ? n.status : t),
            (this.statusText = n.statusText || r),
            (this.url = n.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class mh extends ph {
        constructor(n = {}) {
          super(n), (this.type = $o.ResponseHeader);
        }
        clone(n = {}) {
          return new mh({
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class Uo extends ph {
        constructor(n = {}) {
          super(n),
            (this.type = $o.Response),
            (this.body = void 0 !== n.body ? n.body : null);
        }
        clone(n = {}) {
          return new Uo({
            body: void 0 !== n.body ? n.body : this.body,
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class Bb extends ph {
        constructor(n) {
          super(n, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${n.url || "(unknown url)"}`
                : `Http failure response for ${n.url || "(unknown url)"}: ${
                    n.status
                  } ${n.statusText}`),
            (this.error = n.error || null);
        }
      }
      function gh(e, n) {
        return {
          body: n,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let Wc = (() => {
        class e {
          constructor(t) {
            this.handler = t;
          }
          request(t, r, o = {}) {
            let s;
            if (t instanceof Di) s = t;
            else {
              let c, l;
              (c = o.headers instanceof cn ? o.headers : new cn(o.headers)),
                o.params &&
                  (l =
                    o.params instanceof ln
                      ? o.params
                      : new ln({ fromObject: o.params })),
                (s = new Di(t, r, void 0 !== o.body ? o.body : null, {
                  headers: c,
                  context: o.context,
                  params: l,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const i = R(s).pipe(Ro((c) => this.handler.handle(c)));
            if (t instanceof Di || "events" === o.observe) return i;
            const a = i.pipe(He((c) => c instanceof Uo));
            switch (o.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      A((c) => {
                        if (null !== c.body && !(c.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return c.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      A((c) => {
                        if (null !== c.body && !(c.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return c.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      A((c) => {
                        if (null !== c.body && "string" != typeof c.body)
                          throw new Error("Response is not a string.");
                        return c.body;
                      })
                    );
                  default:
                    return a.pipe(A((c) => c.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(t, r = {}) {
            return this.request("DELETE", t, r);
          }
          get(t, r = {}) {
            return this.request("GET", t, r);
          }
          head(t, r = {}) {
            return this.request("HEAD", t, r);
          }
          jsonp(t, r) {
            return this.request("JSONP", t, {
              params: new ln().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, r = {}) {
            return this.request("OPTIONS", t, r);
          }
          patch(t, r, o = {}) {
            return this.request("PATCH", t, gh(o, r));
          }
          post(t, r, o = {}) {
            return this.request("POST", t, gh(o, r));
          }
          put(t, r, o = {}) {
            return this.request("PUT", t, gh(o, r));
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(zc));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function Hb(e, n) {
        return n(e);
      }
      function ZL(e, n) {
        return (t, r) => n.intercept(t, { handle: (o) => e(o, r) });
      }
      const zb = new w(""),
        Ci = new w(""),
        Gb = new w("");
      function YL() {
        let e = null;
        return (n, t) => {
          null === e &&
            (e = (I(zb, { optional: !0 }) ?? []).reduceRight(ZL, Hb));
          const r = I(ac),
            o = r.add();
          return e(n, t).pipe(ni(() => r.remove(o)));
        };
      }
      let qb = (() => {
        class e extends zc {
          constructor(t, r) {
            super(),
              (this.backend = t),
              (this.injector = r),
              (this.chain = null),
              (this.pendingTasks = I(ac));
          }
          handle(t) {
            if (null === this.chain) {
              const o = Array.from(
                new Set([
                  ...this.injector.get(Ci),
                  ...this.injector.get(Gb, []),
                ])
              );
              this.chain = o.reduceRight(
                (s, i) =>
                  (function KL(e, n, t) {
                    return (r, o) => t.runInContext(() => n(r, (s) => e(s, o)));
                  })(s, i, this.injector),
                Hb
              );
            }
            const r = this.pendingTasks.add();
            return this.chain(t, (o) => this.backend.handle(o)).pipe(
              ni(() => this.pendingTasks.remove(r))
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(Gc), b(at));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const e3 = /^\)\]\}',?\n/;
      let Zb = (() => {
        class e {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ("JSONP" === t.method) throw new D(-2800, !1);
            const r = this.xhrFactory;
            return (r.ɵloadImpl ? ye(r.ɵloadImpl()) : R(null)).pipe(
              Ae(
                () =>
                  new le((s) => {
                    const i = r.build();
                    if (
                      (i.open(t.method, t.urlWithParams),
                      t.withCredentials && (i.withCredentials = !0),
                      t.headers.forEach((m, v) =>
                        i.setRequestHeader(m, v.join(","))
                      ),
                      t.headers.has("Accept") ||
                        i.setRequestHeader(
                          "Accept",
                          "application/json, text/plain, */*"
                        ),
                      !t.headers.has("Content-Type"))
                    ) {
                      const m = t.detectContentTypeHeader();
                      null !== m && i.setRequestHeader("Content-Type", m);
                    }
                    if (t.responseType) {
                      const m = t.responseType.toLowerCase();
                      i.responseType = "json" !== m ? m : "text";
                    }
                    const a = t.serializeBody();
                    let c = null;
                    const l = () => {
                        if (null !== c) return c;
                        const m = i.statusText || "OK",
                          v = new cn(i.getAllResponseHeaders()),
                          _ =
                            (function t3(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(i) || t.url;
                        return (
                          (c = new mh({
                            headers: v,
                            status: i.status,
                            statusText: m,
                            url: _,
                          })),
                          c
                        );
                      },
                      u = () => {
                        let {
                            headers: m,
                            status: v,
                            statusText: _,
                            url: g,
                          } = l(),
                          M = null;
                        204 !== v &&
                          (M =
                            typeof i.response > "u"
                              ? i.responseText
                              : i.response),
                          0 === v && (v = M ? 200 : 0);
                        let T = v >= 200 && v < 300;
                        if ("json" === t.responseType && "string" == typeof M) {
                          const B = M;
                          M = M.replace(e3, "");
                          try {
                            M = "" !== M ? JSON.parse(M) : null;
                          } catch (Re) {
                            (M = B),
                              T && ((T = !1), (M = { error: Re, text: M }));
                          }
                        }
                        T
                          ? (s.next(
                              new Uo({
                                body: M,
                                headers: m,
                                status: v,
                                statusText: _,
                                url: g || void 0,
                              })
                            ),
                            s.complete())
                          : s.error(
                              new Bb({
                                error: M,
                                headers: m,
                                status: v,
                                statusText: _,
                                url: g || void 0,
                              })
                            );
                      },
                      d = (m) => {
                        const { url: v } = l(),
                          _ = new Bb({
                            error: m,
                            status: i.status || 0,
                            statusText: i.statusText || "Unknown Error",
                            url: v || void 0,
                          });
                        s.error(_);
                      };
                    let f = !1;
                    const h = (m) => {
                        f || (s.next(l()), (f = !0));
                        let v = { type: $o.DownloadProgress, loaded: m.loaded };
                        m.lengthComputable && (v.total = m.total),
                          "text" === t.responseType &&
                            i.responseText &&
                            (v.partialText = i.responseText),
                          s.next(v);
                      },
                      p = (m) => {
                        let v = { type: $o.UploadProgress, loaded: m.loaded };
                        m.lengthComputable && (v.total = m.total), s.next(v);
                      };
                    return (
                      i.addEventListener("load", u),
                      i.addEventListener("error", d),
                      i.addEventListener("timeout", d),
                      i.addEventListener("abort", d),
                      t.reportProgress &&
                        (i.addEventListener("progress", h),
                        null !== a &&
                          i.upload &&
                          i.upload.addEventListener("progress", p)),
                      i.send(a),
                      s.next({ type: $o.Sent }),
                      () => {
                        i.removeEventListener("error", d),
                          i.removeEventListener("abort", d),
                          i.removeEventListener("load", u),
                          i.removeEventListener("timeout", d),
                          t.reportProgress &&
                            (i.removeEventListener("progress", h),
                            null !== a &&
                              i.upload &&
                              i.upload.removeEventListener("progress", p)),
                          i.readyState !== i.DONE && i.abort();
                      }
                    );
                  })
              )
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(tw));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Zc = new w("XSRF_ENABLED"),
        Kb = "XSRF-TOKEN",
        Yb = new w("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => Kb,
        }),
        Qb = "X-XSRF-TOKEN",
        Jb = new w("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => Qb,
        });
      class vh {}
      let Xb = (() => {
        class e {
          constructor(t, r, o) {
            (this.doc = t),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const t = this.doc.cookie || "";
            return (
              t !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = H_(t, this.cookieName)),
                (this.lastCookieString = t)),
              this.lastToken
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(dt), b(dr), b(Yb));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function eE(e, n) {
        const t = e.url.toLowerCase();
        if (
          !I(Zc) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          t.startsWith("http://") ||
          t.startsWith("https://")
        )
          return n(e);
        const r = I(vh).getToken(),
          o = I(Jb);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          n(e)
        );
      }
      let tE = (() => {
        class e {
          constructor(t) {
            this.injector = t;
          }
          intercept(t, r) {
            return this.injector.runInContext(() => eE(t, (o) => r.handle(o)));
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(at));
          });
          static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      var Yn = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = "Interceptors"),
          (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
          (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
          (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
          (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
          (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
          (e[(e.Fetch = 6)] = "Fetch"),
          e
        );
      })(Yn || {});
      function Ir(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      function n3(...e) {
        const n = [
          Wc,
          Zb,
          qb,
          { provide: zc, useExisting: qb },
          { provide: Gc, useExisting: Zb },
          { provide: Ci, useValue: eE, multi: !0 },
          { provide: Zc, useValue: !0 },
          { provide: vh, useClass: Xb },
        ];
        for (const t of e) n.push(...t.ɵproviders);
        return (function Fu(e) {
          return { ɵproviders: e };
        })(n);
      }
      const nE = new w("LEGACY_INTERCEPTOR_FN");
      function r3() {
        return Ir(Yn.LegacyInterceptors, [
          { provide: nE, useFactory: YL },
          { provide: Ci, useExisting: nE, multi: !0 },
        ]);
      }
      function rE({ cookieName: e, headerName: n }) {
        const t = [];
        return (
          void 0 !== e && t.push({ provide: Yb, useValue: e }),
          void 0 !== n && t.push({ provide: Jb, useValue: n }),
          Ir(Yn.CustomXsrfConfiguration, t)
        );
      }
      let s3 = (() => {
          class e {
            static disable() {
              return {
                ngModule: e,
                providers: [
                  Ir(Yn.NoXsrfProtection, [{ provide: Zc, useValue: !1 }])
                    .ɵproviders,
                ],
              };
            }
            static withOptions(t = {}) {
              return { ngModule: e, providers: rE(t).ɵproviders };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({
              providers: [
                tE,
                { provide: zb, useExisting: tE, multi: !0 },
                { provide: vh, useClass: Xb },
                rE({ cookieName: Kb, headerName: Qb }).ɵproviders,
                { provide: Zc, useValue: !0 },
              ],
            }));
          }
          return e;
        })(),
        oE = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({ providers: [n3(r3())] }));
          }
          return e;
        })();
      var sE = yh;
      function yh(e, n) {
        return (
          e === n ||
          (e != e && n != n) ||
          (!(
            typeof e != typeof n ||
            {}.toString.call(e) != {}.toString.call(n) ||
            e !== Object(e) ||
            !e
          ) &&
            (Array.isArray(e)
              ? iE(e, n)
              : "[object Set]" == {}.toString.call(e)
              ? iE(Array.from(e), Array.from(n))
              : "[object Object]" == {}.toString.call(e)
              ? (function f3(e, n) {
                  var t = Object.keys(e),
                    r = t.length;
                  if (r != Object.keys(n).length) return !1;
                  for (var o = 0; o < r; o++) {
                    var s = t[o];
                    if (!n.hasOwnProperty(s) || !yh(e[s], n[s])) return !1;
                  }
                  return !0;
                })(e, n)
              : (function d3(e, n) {
                  return e.toString() === n.toString();
                })(e, n)))
        );
      }
      function iE(e, n) {
        var t = e.length;
        if (t != n.length) return !1;
        for (var r = 0; r < t; r++) if (!yh(e[r], n[r])) return !1;
        return !0;
      }
      let aE = (() => {
          class e {
            constructor(t, r) {
              (this._renderer = t),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(t, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, r);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            setDisabledState(t) {
              this.setProperty("disabled", t);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(Cn), C(vt));
            });
            static #t = (this.ɵdir = P({ type: e }));
          }
          return e;
        })(),
        Mr = (() => {
          class e extends aE {
            static #e = (this.ɵfac = (function () {
              let t;
              return function (o) {
                return (t || (t = be(e)))(o || e);
              };
            })());
            static #t = (this.ɵdir = P({ type: e, features: [Q] }));
          }
          return e;
        })();
      const un = new w("NgValueAccessor"),
        m3 = { provide: un, useExisting: ee(() => Yc), multi: !0 },
        v3 = new w("CompositionEventMode");
      let Yc = (() => {
        class e extends aE {
          constructor(t, r, o) {
            super(t, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function g3() {
                  const e = Gn() ? Gn().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(t) {
            this.setProperty("value", t ?? "");
          }
          _handleInput(t) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(t) {
            (this._composing = !1), this._compositionMode && this.onChange(t);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Cn), C(vt), C(v3, 8));
          });
          static #t = (this.ɵdir = P({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (r, o) {
              1 & r &&
                je("input", function (i) {
                  return o._handleInput(i.target.value);
                })("blur", function () {
                  return o.onTouched();
                })("compositionstart", function () {
                  return o._compositionStart();
                })("compositionend", function (i) {
                  return o._compositionEnd(i.target.value);
                });
            },
            features: [ae([m3]), Q],
          }));
        }
        return e;
      })();
      const ze = new w("NgValidators"),
        Jn = new w("NgAsyncValidators");
      function yE(e) {
        return null != e;
      }
      function DE(e) {
        return Ls(e) ? ye(e) : e;
      }
      function CE(e) {
        let n = {};
        return (
          e.forEach((t) => {
            n = null != t ? { ...n, ...t } : n;
          }),
          0 === Object.keys(n).length ? null : n
        );
      }
      function _E(e, n) {
        return n.map((t) => t(e));
      }
      function wE(e) {
        return e.map((n) =>
          (function C3(e) {
            return !e.validate;
          })(n)
            ? n
            : (t) => n.validate(t)
        );
      }
      function Dh(e) {
        return null != e
          ? (function bE(e) {
              if (!e) return null;
              const n = e.filter(yE);
              return 0 == n.length
                ? null
                : function (t) {
                    return CE(_E(t, n));
                  };
            })(wE(e))
          : null;
      }
      function Ch(e) {
        return null != e
          ? (function EE(e) {
              if (!e) return null;
              const n = e.filter(yE);
              return 0 == n.length
                ? null
                : function (t) {
                    return (function h3(...e) {
                      const n = Tp(e),
                        { args: t, keys: r } = Sw(e),
                        o = new le((s) => {
                          const { length: i } = t;
                          if (!i) return void s.complete();
                          const a = new Array(i);
                          let c = i,
                            l = i;
                          for (let u = 0; u < i; u++) {
                            let d = !1;
                            bt(t[u]).subscribe(
                              ve(
                                s,
                                (f) => {
                                  d || ((d = !0), l--), (a[u] = f);
                                },
                                () => c--,
                                void 0,
                                () => {
                                  (!c || !d) &&
                                    (l || s.next(r ? Mw(r, a) : a),
                                    s.complete());
                                }
                              )
                            );
                          }
                        });
                      return n ? o.pipe(Iw(n)) : o;
                    })(_E(t, n).map(DE)).pipe(A(CE));
                  };
            })(wE(e))
          : null;
      }
      function SE(e, n) {
        return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n];
      }
      function _h(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Jc(e, n) {
        return Array.isArray(e) ? e.includes(n) : e === n;
      }
      function AE(e, n) {
        const t = _h(n);
        return (
          _h(e).forEach((o) => {
            Jc(t, o) || t.push(o);
          }),
          t
        );
      }
      function TE(e, n) {
        return _h(n).filter((t) => !Jc(e, t));
      }
      class RE {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(n) {
          (this._rawValidators = n || []),
            (this._composedValidatorFn = Dh(this._rawValidators));
        }
        _setAsyncValidators(n) {
          (this._rawAsyncValidators = n || []),
            (this._composedAsyncValidatorFn = Ch(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(n) {
          this._onDestroyCallbacks.push(n);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((n) => n()),
            (this._onDestroyCallbacks = []);
        }
        reset(n = void 0) {
          this.control && this.control.reset(n);
        }
        hasError(n, t) {
          return !!this.control && this.control.hasError(n, t);
        }
        getError(n, t) {
          return this.control ? this.control.getError(n, t) : null;
        }
      }
      class nt extends RE {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class Xn extends RE {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class NE {
        constructor(n) {
          this._cd = n;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let OE = (() => {
        class e extends NE {
          constructor(t) {
            super(t);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Xn, 2));
          });
          static #t = (this.ɵdir = P({
            type: e,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (r, o) {
              2 & r &&
                Tt("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
                  "ng-pristine",
                  o.isPristine
                )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
                  "ng-invalid",
                  o.isInvalid
                )("ng-pending", o.isPending);
            },
            features: [Q],
          }));
        }
        return e;
      })();
      const _i = "VALID",
        el = "INVALID",
        Ho = "PENDING",
        wi = "DISABLED";
      function tl(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class kE {
        constructor(n, t) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(n),
            this._assignAsyncValidators(t);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(n) {
          this._rawValidators = this._composedValidatorFn = n;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(n) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = n;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === _i;
        }
        get invalid() {
          return this.status === el;
        }
        get pending() {
          return this.status == Ho;
        }
        get disabled() {
          return this.status === wi;
        }
        get enabled() {
          return this.status !== wi;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(n) {
          this._assignValidators(n);
        }
        setAsyncValidators(n) {
          this._assignAsyncValidators(n);
        }
        addValidators(n) {
          this.setValidators(AE(n, this._rawValidators));
        }
        addAsyncValidators(n) {
          this.setAsyncValidators(AE(n, this._rawAsyncValidators));
        }
        removeValidators(n) {
          this.setValidators(TE(n, this._rawValidators));
        }
        removeAsyncValidators(n) {
          this.setAsyncValidators(TE(n, this._rawAsyncValidators));
        }
        hasValidator(n) {
          return Jc(this._rawValidators, n);
        }
        hasAsyncValidator(n) {
          return Jc(this._rawAsyncValidators, n);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(n = {}) {
          (this.touched = !0),
            this._parent && !n.onlySelf && this._parent.markAsTouched(n);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((n) => n.markAllAsTouched());
        }
        markAsUntouched(n = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !n.onlySelf && this._parent._updateTouched(n);
        }
        markAsDirty(n = {}) {
          (this.pristine = !1),
            this._parent && !n.onlySelf && this._parent.markAsDirty(n);
        }
        markAsPristine(n = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !n.onlySelf && this._parent._updatePristine(n);
        }
        markAsPending(n = {}) {
          (this.status = Ho),
            !1 !== n.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !n.onlySelf && this._parent.markAsPending(n);
        }
        disable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf);
          (this.status = wi),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...n, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf);
          (this.status = _i),
            this._forEachChild((r) => {
              r.enable({ ...n, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            }),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(n) {
          this._parent &&
            !n.onlySelf &&
            (this._parent.updateValueAndValidity(n),
            n.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(n) {
          this._parent = n;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(n = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === _i || this.status === Ho) &&
                this._runAsyncValidator(n.emitEvent)),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !n.onlySelf &&
              this._parent.updateValueAndValidity(n);
        }
        _updateTreeValidity(n = { emitEvent: !0 }) {
          this._forEachChild((t) => t._updateTreeValidity(n)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? wi : _i;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(n) {
          if (this.asyncValidator) {
            (this.status = Ho), (this._hasOwnPendingAsyncValidator = !0);
            const t = DE(this.asyncValidator(this));
            this._asyncValidationSubscription = t.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: n });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(n, t = {}) {
          (this.errors = n), this._updateControlsErrors(!1 !== t.emitEvent);
        }
        get(n) {
          let t = n;
          return null == t ||
            (Array.isArray(t) || (t = t.split(".")), 0 === t.length)
            ? null
            : t.reduce((r, o) => r && r._find(o), this);
        }
        getError(n, t) {
          const r = t ? this.get(t) : this;
          return r && r.errors ? r.errors[n] : null;
        }
        hasError(n, t) {
          return !!this.getError(n, t);
        }
        get root() {
          let n = this;
          for (; n._parent; ) n = n._parent;
          return n;
        }
        _updateControlsErrors(n) {
          (this.status = this._calculateStatus()),
            n && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(n);
        }
        _initObservables() {
          (this.valueChanges = new de()), (this.statusChanges = new de());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? wi
            : this.errors
            ? el
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Ho)
            ? Ho
            : this._anyControlsHaveStatus(el)
            ? el
            : _i;
        }
        _anyControlsHaveStatus(n) {
          return this._anyControls((t) => t.status === n);
        }
        _anyControlsDirty() {
          return this._anyControls((n) => n.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((n) => n.touched);
        }
        _updatePristine(n = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !n.onlySelf && this._parent._updatePristine(n);
        }
        _updateTouched(n = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !n.onlySelf && this._parent._updateTouched(n);
        }
        _registerOnCollectionChange(n) {
          this._onCollectionChange = n;
        }
        _setUpdateStrategy(n) {
          tl(n) && null != n.updateOn && (this._updateOn = n.updateOn);
        }
        _parentMarkedDirty(n) {
          return (
            !n &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(n) {
          return null;
        }
        _assignValidators(n) {
          (this._rawValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedValidatorFn = (function S3(e) {
              return Array.isArray(e) ? Dh(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(n) {
          (this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedAsyncValidatorFn = (function I3(e) {
              return Array.isArray(e) ? Ch(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      const Ar = new w("CallSetDisabledState", {
          providedIn: "root",
          factory: () => bi,
        }),
        bi = "always";
      function Ei(e, n, t = bi) {
        (function Mh(e, n) {
          const t = (function IE(e) {
            return e._rawValidators;
          })(e);
          null !== n.validator
            ? e.setValidators(SE(t, n.validator))
            : "function" == typeof t && e.setValidators([t]);
          const r = (function ME(e) {
            return e._rawAsyncValidators;
          })(e);
          null !== n.asyncValidator
            ? e.setAsyncValidators(SE(r, n.asyncValidator))
            : "function" == typeof r && e.setAsyncValidators([r]);
          const o = () => e.updateValueAndValidity();
          ol(n._rawValidators, o), ol(n._rawAsyncValidators, o);
        })(e, n),
          n.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === t) &&
            n.valueAccessor.setDisabledState?.(e.disabled),
          (function T3(e, n) {
            n.valueAccessor.registerOnChange((t) => {
              (e._pendingValue = t),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && jE(e, n);
            });
          })(e, n),
          (function N3(e, n) {
            const t = (r, o) => {
              n.valueAccessor.writeValue(r), o && n.viewToModelUpdate(r);
            };
            e.registerOnChange(t),
              n._registerOnDestroy(() => {
                e._unregisterOnChange(t);
              });
          })(e, n),
          (function R3(e, n) {
            n.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && jE(e, n),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, n),
          (function A3(e, n) {
            if (n.valueAccessor.setDisabledState) {
              const t = (r) => {
                n.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(t),
                n._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(t);
                });
            }
          })(e, n);
      }
      function ol(e, n) {
        e.forEach((t) => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(n);
        });
      }
      function jE(e, n) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          n.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      function BE(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      function $E(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const UE = class extends kE {
          constructor(n = null, t, r) {
            super(
              (function Eh(e) {
                return (tl(e) ? e.validators : e) || null;
              })(t),
              (function Sh(e, n) {
                return (tl(n) ? n.asyncValidators : e) || null;
              })(r, t)
            ),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(n),
              this._setUpdateStrategy(t),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              tl(t) &&
                (t.nonNullable || t.initialValueIsDefault) &&
                (this.defaultValue = $E(n) ? n.value : n);
          }
          setValue(n, t = {}) {
            (this.value = this._pendingValue = n),
              this._onChange.length &&
                !1 !== t.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== t.emitViewToModelChange)
                ),
              this.updateValueAndValidity(t);
          }
          patchValue(n, t = {}) {
            this.setValue(n, t);
          }
          reset(n = this.defaultValue, t = {}) {
            this._applyFormState(n),
              this.markAsPristine(t),
              this.markAsUntouched(t),
              this.setValue(this.value, t),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(n) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(n) {
            this._onChange.push(n);
          }
          _unregisterOnChange(n) {
            BE(this._onChange, n);
          }
          registerOnDisabledChange(n) {
            this._onDisabledChange.push(n);
          }
          _unregisterOnDisabledChange(n) {
            BE(this._onDisabledChange, n);
          }
          _forEachChild(n) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(n) {
            $E(n)
              ? ((this.value = this._pendingValue = n.value),
                n.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = n);
          }
        },
        V3 = { provide: Xn, useExisting: ee(() => Oh) },
        GE = (() => Promise.resolve())();
      let Oh = (() => {
          class e extends Xn {
            constructor(t, r, o, s, i, a) {
              super(),
                (this._changeDetectorRef = i),
                (this.callSetDisabledState = a),
                (this.control = new UE()),
                (this._registered = !1),
                (this.name = ""),
                (this.update = new de()),
                (this._parent = t),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function Rh(e, n) {
                  if (!n) return null;
                  let t, r, o;
                  return (
                    Array.isArray(n),
                    n.forEach((s) => {
                      s.constructor === Yc
                        ? (t = s)
                        : (function P3(e) {
                            return Object.getPrototypeOf(e.constructor) === Mr;
                          })(s)
                        ? (r = s)
                        : (o = s);
                    }),
                    o || r || t || null
                  );
                })(0, s));
            }
            ngOnChanges(t) {
              if ((this._checkForErrors(), !this._registered || "name" in t)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = t.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in t && this._updateDisabled(t),
                (function Th(e, n) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const t = e.model;
                  return !!t.isFirstChange() || !Object.is(n, t.currentValue);
                })(t, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              Ei(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(t) {
              GE.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(t) {
              const r = t.isDisabled.currentValue,
                o =
                  0 !== r &&
                  (function Ao(e) {
                    return "boolean" == typeof e
                      ? e
                      : null != e && "false" !== e;
                  })(r);
              GE.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(t) {
              return this._parent
                ? (function nl(e, n) {
                    return [...n.path, e];
                  })(t, this._parent)
                : [t];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(
                C(nt, 9),
                C(ze, 10),
                C(Jn, 10),
                C(un, 10),
                C(dc, 8),
                C(Ar, 8)
              );
            });
            static #t = (this.ɵdir = P({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ae([V3]), Q, It],
            }));
          }
          return e;
        })(),
        WE = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({}));
          }
          return e;
        })();
      const xh = new w("NgModelWithFormControlWarning");
      let d0 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({ imports: [WE] }));
          }
          return e;
        })(),
        f0 = (() => {
          class e {
            static withConfig(t) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ar, useValue: t.callSetDisabledState ?? bi },
                ],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({ imports: [d0] }));
          }
          return e;
        })(),
        h0 = (() => {
          class e {
            static withConfig(t) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: xh,
                    useValue: t.warnOnNgModelWithFormControl ?? "always",
                  },
                  { provide: Ar, useValue: t.callSetDisabledState ?? bi },
                ],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({ imports: [d0] }));
          }
          return e;
        })();
      var d8 = function Ii(e) {
        let n = e;
        var t = {}.toString.call(e).slice(8, -1);
        if ("Set" == t) return new Set([...e].map((o) => Ii(o)));
        if ("Map" == t) return new Map([...e].map((o) => [Ii(o[0]), Ii(o[1])]));
        if ("Date" == t) return new Date(e.getTime());
        if ("RegExp" == t)
          return RegExp(
            e.source,
            (function f8(e) {
              if ("string" == typeof e.source.flags) return e.source.flags;
              var n = [];
              return (
                e.global && n.push("g"),
                e.ignoreCase && n.push("i"),
                e.multiline && n.push("m"),
                e.sticky && n.push("y"),
                e.unicode && n.push("u"),
                n.join("")
              );
            })(e)
          );
        if ("Array" == t || "Object" == t)
          for (var r in ((n = Array.isArray(e) ? [] : {}), e)) n[r] = Ii(e[r]);
        return n;
      };
      let h8 = (() => {
        class e {
          warningMessage() {
            console.error(
              "You should add @abp/ng-oauth packages or create your own auth packages."
            );
          }
          init() {
            return this.warningMessage(), Promise.resolve(void 0);
          }
          login(t) {
            return this.warningMessage(), R(void 0);
          }
          logout(t) {
            return this.warningMessage(), R(void 0);
          }
          navigateToLogin(t) {}
          get isInternalAuth() {
            throw new Error("not implemented");
          }
          get isAuthenticated() {
            return this.warningMessage(), !1;
          }
          loginUsingGrant(t, r, o) {
            return (
              console.log({ grantType: t, parameters: r, headers: o }),
              Promise.reject(new Error("not implemented"))
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const p0 = new w("LOCALIZATIONS");
      function m0(e) {
        e && Bh.next([...Bh.value, ...e]);
      }
      const Bh = new De([]),
        Mi = new w("CORE_OPTIONS");
      function p8({ ...e }) {
        return { ...e };
      }
      function $h(e) {
        return (n, t, r) => {
          if ("_" === n) return t;
          const o = e?.values?.[n];
          return (o && o[t]) || r;
        };
      }
      function g0(e) {
        const n = (function v0(e) {
          const n = $h(e);
          return (t, r) => {
            const o = (t = t
                .concat(e.defaultResourceName || "")
                .filter(Boolean)).length,
              s = r.length;
            for (let i = 0; i < o; i++) {
              const a = t[i];
              for (let c = 0; c < s; c++) {
                const l = r[c],
                  u = n(a, l, null);
                if (u) return { resourceName: a, key: l, localized: u };
              }
            }
            return { resourceName: void 0, key: void 0, localized: void 0 };
          };
        })(e);
        return (t, r, o) => {
          const { localized: s } = n(t, r);
          return s || o;
        };
      }
      const v8 = new (class zL {
        constructor(n) {
          this.defaultValue = n;
        }
      })(() => !1);
      let y8 = (() => {
        class e extends Wc {
          request(t, r, o = {}) {
            return "string" == typeof t
              ? (this.#e(o), super.request(t, r || "", o))
              : (this.#e(t), super.request(t));
          }
          #e(t) {
            (t.context ??= new kb()), t.context.set(v8, !0);
          }
          static #t = (this.ɵfac = (function () {
            let t;
            return function (o) {
              return (t || (t = be(e)))(o || e);
            };
          })());
          static #n = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function il() {
        return function () {};
      }
      function Ai(e) {
        return null == e;
      }
      function y0(e) {
        return !Ai(e);
      }
      function Hh(e) {
        return e instanceof Object;
      }
      function al(e) {
        return Array.isArray(e);
      }
      function zh(e) {
        return e instanceof Node;
      }
      function D0(e) {
        return (
          (function C8(e) {
            return Hh(e) && !al(e);
          })(e) && !zh(e)
        );
      }
      function C0(e, n) {
        return D0(e) && D0(n) ? _0(e, n) : Ai(e) && Ai(n) ? {} : y0(n) ? n : e;
      }
      function _0(e, n) {
        if (
          Ai(e) ||
          Ai(n) ||
          al(e) ||
          al(n) ||
          !Hh(e) ||
          !Hh(n) ||
          zh(e) ||
          zh(n)
        )
          return y0(n) ? n : e;
        const r = Object.keys(e),
          o = Object.keys(n);
        return [...new Set(r.concat(o))].reduce(
          (i, a) => ((i[a] = _0(e[a], n[a])), i),
          {}
        );
      }
      class Gh {
        get state() {
          return this.state$.value;
        }
        constructor(n) {
          (this.initialState = n),
            (this.state$ = new De(this.initialState)),
            (this.update$ = new Ge()),
            (this.sliceState = (t, r = sE) => this.state$.pipe(A(t), Pp(r))),
            (this.sliceUpdate = (t, r = (o) => void 0 !== o) =>
              this.update$.pipe(A(t), He(r)));
        }
        patch(n) {
          let t = n;
          "object" == typeof n &&
            !Array.isArray(n) &&
            (t = { ...this.state, ...n }),
            this.state$.next(t),
            this.update$.next(t);
        }
        deepPatch(n) {
          this.state$.next(C0(this.state, n)), this.update$.next(n);
        }
        set(n) {
          this.state$.next(n), this.update$.next(n);
        }
        reset() {
          this.set(this.initialState);
        }
      }
      const w0 = (e) => (n) => ((e && n[e]) || n.default).url || n.default.url,
        b0 = (e) => e && (e.endsWith("/") ? e : e + "/");
      let Ri = (() => {
          class e {
            constructor() {
              this.store = new Gh({});
            }
            get createOnUpdateStream() {
              return this.store.sliceUpdate;
            }
            getEnvironment$() {
              return this.store.sliceState((t) => t);
            }
            getEnvironment() {
              return this.store.state;
            }
            getApiUrl(t) {
              return w0(t)(this.store.state?.apis);
            }
            getApiUrl$(t) {
              return this.store.sliceState((r) => r.apis).pipe(A(w0(t)));
            }
            setState(t) {
              this.store.set(t);
            }
            getIssuer() {
              const t = this.store.state?.oAuthConfig?.issuer;
              return b0(t);
            }
            getIssuer$() {
              return this.store
                .sliceState((t) => t?.oAuthConfig?.issuer)
                .pipe(A(b0));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        E0 = (() => {
          class e {
            constructor() {
              (this._reporter$ = new Ge()),
                (this._errors$ = new De([])),
                (this.reportError = (t) => {
                  this._reporter$.next(t),
                    this._errors$.next([...this.errors, t]);
                });
            }
            get reporter$() {
              return this._reporter$.asObservable();
            }
            get errors$() {
              return this._errors$.asObservable();
            }
            get errors() {
              return this._errors$.value;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        cl = (() => {
          class e {
            constructor(t, r, o, s, i) {
              (this.options = t),
                (this.http = r),
                (this.externalHttp = o),
                (this.environment = s),
                (this.httpErrorReporter = i);
            }
            getApiFromStore(t) {
              return this.environment.getApiUrl(t);
            }
            handleError(t) {
              return this.httpErrorReporter.reportError(t), Wn(t);
            }
            request(t, r, o) {
              (r = r || {}), (o = o || this.getApiFromStore(r.apiName));
              const { method: s, params: i, ...a } = t,
                { observe: c = "body", skipHandleError: l } = r,
                u = this.removeDuplicateSlashes(o + t.url);
              return this.getHttpClient(r.skipAddingHeader)
                .request(s, u, {
                  observe: c,
                  ...(i && { params: this.getParams(i, r.httpParamEncoder) }),
                  ...a,
                })
                .pipe(on((f) => (l ? Wn(f) : this.handleError(f))));
            }
            getHttpClient(t) {
              return t ? this.externalHttp : this.http;
            }
            getParams(t, r) {
              const o = Object.entries(t).reduce(
                (s, [i, a]) => (
                  (function D8(e) {
                    return void 0 === e || "" === e;
                  })(a) ||
                    (null === a && !this.options.sendNullsAsQueryParam) ||
                    (s[i] = a),
                  s
                ),
                {}
              );
              return new ln(
                r ? { encoder: r, fromObject: o } : { fromObject: o }
              );
            }
            removeDuplicateSlashes(t) {
              return t.replace(/([^:]\/)\/+/g, "$1");
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Mi), b(Wc), b(y8), b(Ri), b(E0));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        _8 = (() => {
          class e {
            constructor(t) {
              (this.restService = t),
                (this.apiName = "abp"),
                (this.get = (r) =>
                  this.restService.request(
                    {
                      method: "GET",
                      url: "/api/abp/application-configuration",
                      params: {
                        includeLocalizationResources:
                          r.includeLocalizationResources,
                      },
                    },
                    { apiName: this.apiName }
                  ));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(cl));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        w8 = (() => {
          class e {
            constructor(t) {
              (this.restService = t),
                (this.apiName = "abp"),
                (this.get = (r) =>
                  this.restService.request(
                    {
                      method: "GET",
                      url: "/api/abp/application-localization",
                      params: {
                        cultureName: r.cultureName,
                        onlyDynamics: r.onlyDynamics,
                      },
                    },
                    { apiName: this.apiName }
                  ));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(cl));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      const S0 = new w("INCUDE_LOCALIZATION_RESOURCES_TOKEN");
      let zo = (() => {
        class e {
          setState(t) {
            this.store.set(t);
          }
          get createOnUpdateStream() {
            return this.store.sliceUpdate;
          }
          constructor(t, r, o) {
            (this.abpConfigService = t),
              (this.abpApplicationLocalizationService = r),
              (this.includeLocalizationResources = o),
              (this.updateSubject = new Ge()),
              (this.store = new Gh({})),
              this.initUpdateStream();
          }
          initUpdateStream() {
            this.updateSubject
              .pipe(
                Ae(() =>
                  this.abpConfigService.get({
                    includeLocalizationResources:
                      !!this.includeLocalizationResources,
                  })
                )
              )
              .pipe(Ae((t) => this.getLocalizationAndCombineWithAppState(t)))
              .subscribe((t) => this.store.set(t));
          }
          getLocalizationAndCombineWithAppState(t) {
            if (!t.localization.currentCulture.cultureName)
              throw new Error("culture name should defined");
            return this.getlocalizationResource(
              t.localization.currentCulture.cultureName
            ).pipe(
              A((r) => ({ ...t, localization: { ...t.localization, ...r } }))
            );
          }
          getlocalizationResource(t) {
            return this.abpApplicationLocalizationService.get({
              cultureName: t,
              onlyDynamics: !1,
            });
          }
          refreshAppState() {
            return (
              this.updateSubject.next(),
              this.createOnUpdateStream((t) => t).pipe(Zn(1))
            );
          }
          refreshLocalization(t) {
            return this.includeLocalizationResources
              ? this.refreshAppState().pipe(A(() => null))
              : this.getlocalizationResource(t)
                  .pipe(
                    ge((r) =>
                      this.store.patch({
                        localization: {
                          ...this.store.state.localization,
                          ...r,
                        },
                      })
                    )
                  )
                  .pipe(A(() => null));
          }
          getOne$(t) {
            return this.store.sliceState((r) => r[t]);
          }
          getOne(t) {
            return this.store.state[t];
          }
          getAll$() {
            return this.store.sliceState((t) => t);
          }
          getAll() {
            return this.store.state;
          }
          getDeep$(t) {
            return (
              (t = I0(t)),
              this.store
                .sliceState((r) => r)
                .pipe(
                  A((r) =>
                    t.reduce((o, s) => {
                      if (o) return o[s];
                    }, r)
                  )
                )
            );
          }
          getDeep(t) {
            return (t = I0(t)).reduce((r, o) => {
              if (r) return r[o];
            }, this.store.state);
          }
          getFeature(t) {
            return this.store.state.features?.values?.[t];
          }
          getFeature$(t) {
            return this.store.sliceState((r) => r.features?.values?.[t]);
          }
          getFeatures(t) {
            const { features: r } = this.store.state;
            if (r) return t.reduce((o, s) => ({ ...o, [s]: r.values[s] }), {});
          }
          getFeatures$(t) {
            return this.store.sliceState(({ features: r }) => {
              if (r?.values)
                return t.reduce((o, s) => ({ ...o, [s]: r.values[s] }), {});
            });
          }
          getSetting(t) {
            return this.store.state.setting?.values?.[t];
          }
          getSetting$(t) {
            return this.store.sliceState((r) => r.setting?.values?.[t]);
          }
          getSettings(t) {
            const r = this.store.state.setting?.values || {};
            return t
              ? Object.keys(r)
                  .filter((s) => s.indexOf(t) > -1)
                  .reduce((s, i) => ((s[i] = r[i]), s), {})
              : r;
          }
          getSettings$(t) {
            return this.store
              .sliceState((r) => r.setting?.values)
              .pipe(
                A((r = {}) =>
                  t
                    ? Object.keys(r)
                        .filter((s) => s.indexOf(t) > -1)
                        .reduce((s, i) => ((s[i] = r[i]), s), {})
                    : r
                )
              );
          }
          getGlobalFeatures() {
            return this.store.state.globalFeatures;
          }
          getGlobalFeatures$() {
            return this.store.sliceState((t) => t.globalFeatures);
          }
          isGlobalFeatureEnabled(t, r) {
            return (r.enabledFeatures || []).some((s) => t === s);
          }
          getGlobalFeatureIsEnabled(t) {
            return this.isGlobalFeatureEnabled(
              t,
              this.store.state.globalFeatures
            );
          }
          getGlobalFeatureIsEnabled$(t) {
            return this.store.sliceState((r) =>
              this.isGlobalFeatureEnabled(t, r.globalFeatures)
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(_8), b(w8), b(S0, 8));
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function I0(e) {
        if (("string" == typeof e && (e = e.split(".")), !Array.isArray(e)))
          throw new Error(
            "The argument must be a dot string or an string array."
          );
        return e;
      }
      let b8 = (() => {
          class e {
            constructor() {}
            get length() {
              return localStorage.length;
            }
            clear() {
              localStorage.clear();
            }
            getItem(t) {
              return localStorage.getItem(t);
            }
            key(t) {
              return localStorage.key(t);
            }
            removeItem(t) {
              localStorage.removeItem(t);
            }
            setItem(t, r) {
              localStorage.setItem(t, r);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        Ni = (() => {
          class e {
            constructor(t, r) {
              (this.configState = t),
                (this.localStorageService = r),
                (this.store = new Gh({})),
                (this.updateLocalStorage = () => {
                  this.localStorageService.setItem(
                    "abpSession",
                    JSON.stringify(this.store.state)
                  );
                }),
                this.init(),
                this.setInitialLanguage();
            }
            init() {
              const t = this.localStorageService.getItem("abpSession");
              t && this.store.set(JSON.parse(t)),
                this.store
                  .sliceUpdate((r) => r)
                  .subscribe(this.updateLocalStorage);
            }
            setInitialLanguage() {
              const t = this.getLanguage();
              this.configState
                .getDeep$("localization.currentCulture.cultureName")
                .pipe(
                  He((r) => !!r),
                  Zn(1)
                )
                .subscribe((r) => {
                  r.includes(";") && (r = r.split(";")[0]),
                    t !== r && this.setLanguage(r);
                });
            }
            onLanguageChange$() {
              return this.store.sliceUpdate((t) => t.language);
            }
            onTenantChange$() {
              return this.store.sliceUpdate((t) => t.tenant);
            }
            getLanguage() {
              return this.store.state.language;
            }
            getLanguage$() {
              return this.store.sliceState((t) => t.language);
            }
            getTenant() {
              return this.store.state.tenant;
            }
            getTenant$() {
              return this.store.sliceState((t) => t.tenant);
            }
            setTenant(t) {
              sE(t, this.store.state.tenant) ||
                this.store.set({ ...this.store.state, tenant: t });
            }
            setLanguage(t) {
              t !== this.store.state.language &&
                (this.store.patch({ language: t }),
                document.documentElement.setAttribute("lang", t));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(zo), b(b8));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        Go = (() => {
          class e {
            get currentLang() {
              return this.latestLang || this.sessionState.getLanguage();
            }
            get currentLang$() {
              return this.sessionState.getLanguage$();
            }
            get languageChange$() {
              return this._languageChange$.asObservable();
            }
            constructor(t, r, o, s) {
              if (
                ((this.sessionState = t),
                (this.injector = r),
                (this.configState = s),
                (this.latestLang = this.sessionState.getLanguage()),
                (this._languageChange$ = new Ge()),
                (this.uiLocalizations$ = new De(new Map())),
                (this.localizations$ = new De(new Map())),
                o)
              )
                throw new Error(
                  "LocalizationService should have only one instance."
                );
              this.listenToSetLanguage(), this.initLocalizationValues();
            }
            initLocalizationValues() {
              Bh.subscribe((i) => this.addLocalization(i));
              const t = this.configState.getDeep$("localization.values"),
                r = this.configState.getDeep$("localization.resources"),
                s = ei([
                  this.sessionState.getLanguage$(),
                  this.uiLocalizations$,
                ]).pipe(A(([i, a]) => a.get(i)));
              ei([t, r, s])
                .pipe(
                  A(([i, a, c]) => {
                    if (!a) return;
                    const l = (function S8(e, n) {
                      const t = (function E8(e) {
                        return Object.keys(e)
                          .map((t) => [t, M0(t, e)])
                          .reduce((t, [r, o]) => ({ ...t, [r]: o }), {});
                      })(n);
                      return Object.entries(t).reduce(
                        (r, [o, s]) => ({ ...r, [o]: s.texts }),
                        e
                      );
                    })(i || {}, a);
                    return (
                      l &&
                        (c || (c = new Map()),
                        Object.entries(l).forEach((u) => {
                          const d = u[0],
                            f = u[1];
                          let h = c?.get(d) || {};
                          (h = { ...h, ...f }), c?.set(d, h);
                        })),
                      c
                    );
                  }),
                  He(Boolean)
                )
                .subscribe((i) => this.localizations$.next(i));
            }
            addLocalization(t) {
              if (!t) return;
              const r = this.uiLocalizations$.value;
              t.forEach((o) => {
                const s = r.get(o.culture) || new Map();
                o.resources.forEach((i) => {
                  let a = s.get(i.resourceName) || {};
                  (a = { ...a, ...i.texts }), s.set(i.resourceName, a);
                }),
                  r.set(o.culture, s);
              }),
                this.uiLocalizations$.next(r);
            }
            listenToSetLanguage() {
              this.sessionState
                .onLanguageChange$()
                .pipe(
                  He(
                    (t) =>
                      this.configState.getDeep(
                        "localization.currentCulture.cultureName"
                      ) !== t
                  ),
                  Ae((t) =>
                    this.configState.refreshAppState().pipe(A(() => t))
                  ),
                  He(Boolean),
                  Ae((t) => ye(this.registerLocale(t).then(() => t)))
                )
                .subscribe((t) => this._languageChange$.next(t));
            }
            registerLocale(t) {
              const { registerLocaleFn: r } = this.injector.get(Mi);
              return r(t).then((o) => {
                o?.default && U_(o.default), (this.latestLang = t);
              });
            }
            get(t, ...r) {
              return this.configState
                .getAll$()
                .pipe(A((o) => this.getLocalization(o, t, ...r)));
            }
            getResource(t) {
              return this.localizations$.value.get(t);
            }
            getResource$(t) {
              return this.localizations$.pipe(A((r) => r.get(t)));
            }
            instant(t, ...r) {
              return this.getLocalization(this.configState.getAll(), t, ...r);
            }
            localize(t, r, o) {
              return this.configState.getOne$("localization").pipe(
                A($h),
                A((s) => s(t, r, o))
              );
            }
            localizeSync(t, r, o) {
              return $h(this.configState.getOne("localization"))(t, r, o);
            }
            localizeWithFallback(t, r, o) {
              return this.configState.getOne$("localization").pipe(
                A(g0),
                A((s) => s(t, r, o))
              );
            }
            localizeWithFallbackSync(t, r, o) {
              return g0(this.configState.getOne("localization"))(t, r, o);
            }
            getLocalization(t, r, ...o) {
              r || (r = "");
              let s = "";
              "string" != typeof r && ((s = r.defaultValue), (r = r.key));
              const i = r.split("::");
              if (i.length < 2) return s || r;
              if (!t.localization) return s || i[1];
              const c = i[0] || t.localization.defaultResourceName,
                l = i[1];
              if ("_" === c) return s || l;
              if (!c) return s || l;
              const u = this.localizations$.value.get(c);
              if (!u) return s || l;
              let d = u[l];
              return typeof d > "u"
                ? s || l
                : ((o = o.filter((f) => null != f)),
                  d &&
                    (d = (function g8(e, n) {
                      return e
                        .replace(
                          /(['"]?\{\s*(\d+)\s*\}['"]?)/g,
                          (t, r, o) => n[o] ?? r
                        )
                        .replace(/\s+/g, " ");
                    })(d, o)),
                  "string" != typeof d && (d = ""),
                  d || s || r);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Ni), b(Te), b(e, 12), b(zo));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      function M0(e, n) {
        const t = n[e];
        return 0 === t.baseResources.length
          ? t
          : t.baseResources.reduce(
              (r, o) => ({ ...r, texts: { ...M0(o, n).texts, ...t.texts } }),
              t
            );
      }
      const A0 = { Cancel: xo, End: Rn, Error: di, Start: ui };
      let M8 = (() => {
        class e {
          constructor(t) {
            this.router = t;
          }
          getEvents(...t) {
            return this.router.events.pipe(
              He((o) => t.some((s) => o instanceof s))
            );
          }
          getNavigationEvents(...t) {
            return this.router.events.pipe(
              He((o) => t.some((s) => o instanceof A0[s]))
            );
          }
          getAllEvents() {
            return this.router.events;
          }
          getAllNavigationEvents() {
            const t = Object.keys(A0);
            return this.getNavigationEvents(...t);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(tt));
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const A8 = new w("APP_INIT_ERROR_HANDLERS"),
        T8 = new w("COOKIE_LANGUAGE_KEY", {
          factory: () => ".AspNetCore.Culture",
        }),
        R8 =
          (new w("LIST_QUERY_DEBOUNCE_TIME"),
          new w("LOADER_DELAY"),
          new w("NAVIGATE_TO_MANAGE_PROFILE"),
          new w("QUEUE_MANAGER")),
        T0 = new w("TENANT_KEY"),
        N8 =
          (new w("PIPE_TO_LOGIN_FN_KEY"),
          new w("SET_TOKEN_RESPONSE_TO_STORAGE_FN_KEY"),
          new w("CHECK_AUTHENTICATION_STATE_FN_KEY")),
        R0 = new w("OTHERS_GROUP");
      class qh {
        constructor(n) {
          (this.children = []), (this.isLeaf = !0), Object.assign(this, n);
        }
        static create(n) {
          return new qh(n);
        }
      }
      let k8 = (() => {
        class e {
          constructor(t) {
            this.configState = t;
          }
          getGrantedPolicy$(t) {
            return this.getStream().pipe(A((r) => this.isPolicyGranted(t, r)));
          }
          getGrantedPolicy(t) {
            const r = this.getSnapshot();
            return this.isPolicyGranted(t, r);
          }
          filterItemsByPolicy(t) {
            const r = this.getSnapshot();
            return t.filter(
              (o) =>
                !o.requiredPolicy || this.isPolicyGranted(o.requiredPolicy, r)
            );
          }
          filterItemsByPolicy$(t) {
            return this.getStream().pipe(
              A((r) =>
                t.filter(
                  (o) =>
                    !o.requiredPolicy ||
                    this.isPolicyGranted(o.requiredPolicy, r)
                )
              )
            );
          }
          isPolicyGranted(t, r) {
            if (!t) return !0;
            if (/\|\|/g.test(t)) {
              const i = t.split("||").filter(Boolean);
              return (
                !(i.length < 2) && i.some((a) => this.getPolicy(a.trim(), r))
              );
            }
            if (/&&/g.test(t)) {
              const i = t.split("&&").filter(Boolean);
              return (
                !(i.length < 2) && i.every((a) => this.getPolicy(a.trim(), r))
              );
            }
            return this.getPolicy(t, r);
          }
          getStream() {
            return this.configState.getAll$().pipe(A(this.mapToPolicies));
          }
          getSnapshot() {
            return this.mapToPolicies(this.configState.getAll());
          }
          mapToPolicies(t) {
            return t?.auth?.grantedPolicies || {};
          }
          getPolicy(t, r) {
            return r[t] || !1;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(zo));
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class j8 {
        constructor() {
          (this._flat$ = new De([])),
            (this._tree$ = new De([])),
            (this._visible$ = new De([]));
        }
        get flat() {
          return this._flat$.value;
        }
        get flat$() {
          return this._flat$.asObservable();
        }
        get tree() {
          return this._tree$.value;
        }
        get tree$() {
          return this._tree$.asObservable();
        }
        get visible() {
          return this._visible$.value;
        }
        get visible$() {
          return this._visible$.asObservable();
        }
        createTree(n) {
          return (function x8(e, n, t, r) {
            const o = (function P8(e, n, t) {
                const r = new Map();
                return e.forEach((o) => r.set(n(o), t(o))), r;
              })(e, n, r),
              s = [];
            return (
              e.forEach((i) => {
                const a = n(i),
                  c = t(i),
                  l = o.get(a);
                if (l)
                  if (c) {
                    const u = o.get(c);
                    if (!u) return;
                    u.children.push(l), (u.isLeaf = !1), (l.parent = u);
                  } else s.push(l);
              }),
              s
            );
          })(
            n,
            (t) => t[this.id],
            (t) => t[this.parentId],
            (t) => qh.create(t)
          );
        }
        createGroupedTree(n) {
          const t = (function F8(e, n) {
            if (!al(e) || !e.some((r) => !!r.group)) return;
            const t = new Map();
            for (const r of e) {
              const o = r?.group || n;
              if ("string" != typeof o) throw new Error(`Invalid group: ${o}`);
              const s = t.get(o) || [];
              s.push(r), t.set(o, s);
            }
            return t;
          })(n, this.othersGroup);
          if (t) return Array.from(t, ([r, o]) => ({ group: r, items: o }));
        }
        filterWith(n) {
          return this._flat$.value.filter((t) => !n.has(t[this.id]));
        }
        findItemsToRemove(n) {
          return this._flat$.value.reduce((t, r) => {
            if (!t.has(r[this.parentId])) return t;
            const s = this.findItemsToRemove(new Set([r[this.id]]));
            return new Set([...t, ...s]);
          }, n);
        }
        publish(n, t) {
          return (
            this._flat$.next(n),
            this._tree$.next(this.createTree(n)),
            this._visible$.next(this.createTree(t)),
            n
          );
        }
        add(n) {
          const t = new Map();
          n.forEach((s) => t.set(s[this.id], s));
          const r = this.filterWith(t);
          t.forEach(
            (function O8(e) {
              return (n) => (e.push(n), e);
            })(r)
          ),
            r.sort(this.sort);
          const o = r.filter((s) => !this.hide(s));
          return this.publish(r, o);
        }
        find(n, t = this.tree) {
          return t.reduce(
            (r, o) => r || (n(o) ? o : this.find(n, o.children)),
            null
          );
        }
        patch(n, t) {
          const r = this._flat$.value,
            o = r.findIndex((i) => i[this.id] === n);
          if (o < 0) return !1;
          (r[o] = { ...r[o], ...t }), r.sort(this.sort);
          const s = r.filter((i) => !this.hide(i));
          return this.publish(r, s);
        }
        refresh() {
          return this.add([]);
        }
        remove(n) {
          const t = new Set();
          n.forEach((i) => t.add(i));
          const r = this.findItemsToRemove(t),
            o = this.filterWith(r),
            s = o.filter((i) => !this.hide(i));
          return this.publish(o, s);
        }
        search(n, t = this.tree) {
          const r = Object.keys(n);
          return t.reduce(
            (o, s) =>
              o ||
              (r.every((i) => s[i] === n[i]) ? s : this.search(n, s.children)),
            null
          );
        }
      }
      let L8 = (() => {
          class e extends j8 {
            constructor(t) {
              super(),
                (this.injector = t),
                (this.id = "name"),
                (this.parentId = "parentName"),
                (this.hide = (o) => o.invisible || !this.isGranted(o)),
                (this.sort = (o, s) =>
                  Number.isInteger(o.order)
                    ? Number.isInteger(s.order)
                      ? o.order - s.order
                      : -1
                    : 1);
              const r = this.injector.get(zo);
              (this.subscription = r
                .createOnUpdateStream((o) => o)
                .subscribe(() => this.refresh())),
                (this.permissionService = t.get(k8)),
                (this.othersGroup = t.get(R0));
            }
            isGranted({ requiredPolicy: t }) {
              return this.permissionService.getGrantedPolicy(t);
            }
            hasChildren(t) {
              return !!this.find((o) => o[this.id] === t)?.children?.length;
            }
            hasInvisibleChild(t) {
              return (
                this.find((o) => o[this.id] === t)?.children?.some(
                  (o) => o.invisible
                ) || !1
              );
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(Te));
            });
            static #t = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        ll = (() => {
          class e extends L8 {
            hasPathOrChild(t) {
              return !!t.path || this.hasChildren(t.name);
            }
            get groupedVisible() {
              return this.createGroupedTree(
                this.visible.filter((t) => this.hasPathOrChild(t))
              );
            }
            get groupedVisible$() {
              return this.visible$.pipe(
                A((t) => t.filter((r) => this.hasPathOrChild(r))),
                A((t) => this.createGroupedTree(t))
              );
            }
            static #e = (this.ɵfac = (function () {
              let t;
              return function (o) {
                return (t || (t = be(e)))(o || e);
              };
            })());
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      const Wh = {
        aa: "en",
        "aa-DJ": "en",
        "aa-ER": "en",
        "aa-ET": "en",
        "af-ZA": "af",
        "agq-CM": "agq",
        "ak-GH": "ak",
        "am-ET": "am",
        "ar-001": "ar",
        arn: "en",
        "arn-CL": "en",
        "as-IN": "as",
        "asa-TZ": "asa",
        "ast-ES": "ast",
        "az-Cyrl-AZ": "az-Cyrl",
        "az-Latn-AZ": "az-Latn",
        ba: "ru",
        "ba-RU": "ru",
        "bas-CM": "bas",
        "be-BY": "be",
        "bem-ZM": "bem",
        "bez-TZ": "bez",
        "bg-BG": "bg",
        bin: "en",
        "bin-NG": "en",
        "bm-Latn": "bm",
        "bm-Latn-ML": "bm",
        "bn-BD": "bn",
        "bo-CN": "bo",
        "br-FR": "br",
        "brx-IN": "brx",
        "bs-Cyrl-BA": "bs-Cyrl",
        "bs-Latn-BA": "bs-Latn",
        byn: "en",
        "byn-ER": "en",
        "ca-ES": "ca",
        "ca-ES-valencia": "ca-ES-VALENCIA",
        "ce-RU": "ce",
        "cgg-UG": "cgg",
        "chr-Cher": "chr",
        "chr-Cher-US": "chr",
        co: "en",
        "co-FR": "fr",
        "cs-CZ": "cs",
        "cu-RU": "cu",
        "cy-GB": "cy",
        "da-DK": "da",
        "dav-KE": "dav",
        "de-DE": "de",
        "dje-NE": "dje",
        "dsb-DE": "dsb",
        "dua-CM": "dua",
        dv: "en",
        "dv-MV": "en",
        "dyo-SN": "dyo",
        "dz-BT": "dz",
        "ebu-KE": "ebu",
        "ee-GH": "ee",
        "el-GR": "el",
        "en-029": "en",
        "en-ID": "en",
        "en-US": "en",
        "eo-001": "en",
        "es-ES": "es",
        "et-EE": "et",
        "eu-ES": "eu",
        "ewo-CM": "ewo",
        "fa-IR": "fa",
        "ff-Latn-SN": "ff-Latn",
        "ff-NG": "ff",
        "fi-FI": "fi",
        "fil-PH": "fil",
        "fo-FO": "fo",
        "fr-029": "fr",
        "fr-FR": "fr",
        "fur-IT": "fur",
        "fy-NL": "fy",
        "ga-IE": "ga",
        "gd-GB": "gd",
        "gl-ES": "gl",
        gn: "en",
        "gn-PY": "en",
        "gsw-CH": "gsw",
        "gu-IN": "gu",
        "guz-KE": "guz",
        "gv-IM": "gv",
        "ha-Latn": "ha",
        "ha-Latn-GH": "ha-GH",
        "ha-Latn-NE": "ha-NE",
        "ha-Latn-NG": "ha",
        "haw-US": "haw",
        "he-IL": "he",
        "hi-IN": "hi",
        "hr-HR": "hr",
        "hsb-DE": "hsb",
        "hu-HU": "hu",
        "hy-AM": "hy",
        "ia-001": "ia",
        "ia-FR": "ia",
        ibb: "en",
        "ibb-NG": "en",
        "id-ID": "id",
        "ig-NG": "ig",
        "ii-CN": "ii",
        "is-IS": "is",
        "it-IT": "it",
        iu: "en",
        "iu-Cans": "en",
        "iu-Cans-CA": "en",
        "iu-Latn": "en",
        "iu-Latn-CA": "en",
        "ja-JP": "ja",
        "jgo-CM": "jgo",
        "jmc-TZ": "jmc",
        "jv-Java": "jv",
        "jv-Java-ID": "jv",
        "jv-Latn": "jv",
        "jv-Latn-ID": "jv",
        "ka-GE": "ka",
        "kab-DZ": "kab",
        "kam-KE": "kam",
        "kde-TZ": "kde",
        "kea-CV": "kea",
        "khq-ML": "khq",
        "ki-KE": "ki",
        "kk-KZ": "kk",
        "kkj-CM": "kkj",
        "kl-GL": "kl",
        "kln-KE": "kln",
        "km-KH": "km",
        "kn-IN": "kn",
        "ko-KR": "ko",
        "kok-IN": "kok",
        kr: "en",
        "kr-NG": "en",
        "ks-Arab": "ks",
        "ks-Arab-IN": "ks",
        "ks-Deva": "ks",
        "ks-Deva-IN": "ks",
        "ksb-TZ": "ksb",
        "ksf-CM": "ksf",
        "ksh-DE": "ksh",
        "ku-Arab": "ku",
        "ku-Arab-IQ": "ku",
        "ku-Arab-IR": "ku",
        "kw-GB": "kw",
        "ky-KG": "ky",
        la: "en",
        "la-001": "en",
        "lag-TZ": "lag",
        "lb-LU": "lb",
        "lg-UG": "lg",
        "lkt-US": "lkt",
        "ln-CD": "ln",
        "lo-LA": "lo",
        "lrc-IR": "lrc",
        "lt-LT": "lt",
        "lu-CD": "lu",
        "luo-KE": "luo",
        "luy-KE": "luy",
        "lv-LV": "lv",
        "mas-KE": "mas",
        "mer-KE": "mer",
        "mfe-MU": "mfe",
        "mg-MG": "mg",
        "mgh-MZ": "mgh",
        "mgo-CM": "mgo",
        "mi-NZ": "mi",
        "mk-MK": "mk",
        "ml-IN": "ml",
        "mn-Cyrl": "mn",
        "mn-MN": "mn",
        "mn-Mong": "mn",
        "mn-Mong-CN": "mn",
        "mn-Mong-MN": "mn",
        mni: "en",
        "mni-IN": "en",
        moh: "en",
        "moh-CA": "en",
        "mr-IN": "mr",
        "ms-MY": "ms",
        "mt-MT": "mt",
        "mua-CM": "mua",
        "my-MM": "my",
        "mzn-IR": "mzn",
        "naq-NA": "naq",
        "nb-NO": "nb",
        "nd-ZW": "nd",
        "ne-NP": "ne",
        "nl-NL": "nl",
        "nmg-CM": "ngm",
        "nn-NO": "nn",
        "nnh-CM": "nnh",
        no: "en",
        nqo: "en",
        "nqo-GN": "en",
        nr: "en",
        "nr-ZA": "en",
        nso: "en",
        "nso-ZA": "en",
        "nus-SS": "nus",
        "nyn-UG": "nyn",
        oc: "en",
        "oc-FR": "fr",
        "om-ET": "om",
        "or-IN": "or",
        "os-GE": "os",
        "pa-Arab-PK": "pa-Arab",
        "pa-IN": "pa",
        pap: "en",
        "pap-029": "en",
        "pl-PL": "pl",
        "prg-001": "prg",
        prs: "en",
        "prs-AF": "en",
        "ps-AF": "ps",
        "pt-BR": "pt",
        quc: "en",
        "quc-Latn": "en",
        "quc-Latn-GT": "en",
        quz: "en",
        "quz-BO": "en",
        "quz-EC": "en",
        "quz-PE": "en",
        "rm-CH": "rm",
        "rn-BI": "rn",
        "ro-RO": "ro",
        "rof-TZ": "rof",
        "ru-RU": "ru",
        "rw-RW": "rw",
        "rwk-TZ": "rwk",
        sa: "en",
        "sa-IN": "en",
        "sah-RU": "sah",
        "saq-KE": "saq",
        "sbp-TZ": "en",
        "sd-Arab": "sd",
        "sd-Arab-PK": "sd",
        "sd-Deva": "sd",
        "sd-Deva-IN": "sd",
        "se-NO": "se",
        "seh-MZ": "seh",
        "ses-ML": "ses",
        "sg-CF": "sg",
        "shi-Latn-MA": "shi-Latn",
        "shi-Tfng-MA": "shi-Tfng",
        "si-LK": "si",
        "sk-SK": "sk",
        "sl-SI": "sl",
        sma: "en",
        "sma-NO": "en",
        "sma-SE": "en",
        smj: "en",
        "smj-NO": "en",
        "smj-SE": "en",
        "smn-FI": "en",
        sms: "en",
        "sms-FI": "en",
        "sn-Latn": "sn",
        "sn-Latn-ZW": "sn",
        "so-SO": "so",
        "sq-AL": "so",
        "sr-Cyrl-RS": "sr-Cryl",
        "sr-Latn-RS": "sr-Latn",
        ss: "en",
        "ss-SZ": "en",
        "ss-ZA": "en",
        ssy: "en",
        "ssy-ER": "en",
        st: "en",
        "st-LS": "en",
        "st-ZA": "en",
        "sv-SE": "sv",
        "sw-TZ": "sw",
        syr: "en",
        "syr-SY": "en",
        "ta-IN": "ta",
        "te-IN": "te",
        "teo-UG": "teo",
        "tg-Cyrl": "tg",
        "tg-Cyrl-TJ": "tg",
        "th-TH": "th",
        "ti-ET": "ti",
        tig: "en",
        "tig-ER": "en",
        "tk-TM": "tk",
        tn: "en",
        "tn-BW": "en",
        "tn-ZA": "en",
        "to-TO": "to",
        "tr-TR": "tr",
        ts: "en",
        "ts-ZA": "en",
        "tt-RU": "tt",
        "twq-NE": "twq",
        "tzm-Arab": "tzm",
        "tzm-Arab-MA": "tzm",
        "tzm-Latn": "tzm",
        "tzm-Latn-DZ": "tzm",
        "tzm-Latn-MA": "tzm",
        "tzm-Tfng": "tzm",
        "tzm-Tfng-MA": "tzm",
        "ug-CN": "ug",
        "uk-UA": "uk",
        "ur-PK": "ur",
        "uz-Arab-AF": "uz-Arab",
        "uz-Cyrl-UZ": "uz-Cyrl",
        "uz-Latn-UZ": "uz-Latn",
        "vai-Latn-LR": "vai-Latn",
        "vai-Vaii-LR": "vai-Vaii",
        ve: "en",
        "ve-ZA": "en",
        "vi-VN": "vi",
        "vo-001": "vo",
        "vun-TZ": "vun",
        "wae-CH": "wae",
        wal: "en",
        "wal-ET": "en",
        "wo-SN": "wo",
        "xh-ZA": "xh",
        "xog-UG": "xog",
        "yav-CM": "yav",
        "yi-001": "yi",
        "yo-NG": "yo",
        "zgh-Tfng": "zgh",
        "zgh-Tfng-MA": "zgh",
        "zh-CN": "zh",
        "zh-HK": "zh",
        "zh-MO": "zh",
        "zh-SG": "zh",
        "zh-TW": "zh",
        "zu-ZA": "zu",
      };
      let B8 = (() => {
        class e {
          constructor(t, r) {
            (this.routes = t), (this.router = r), this.addRoutes();
          }
          addRoutes() {
            this.router?.config?.forEach(({ path: t = "", data: r }) => {
              const o = r?.routes;
              if (o)
                if (Array.isArray(o)) this.routes.add(o);
                else {
                  const s = N0([{ path: t, ...o }], { path: "" });
                  this.routes.add(s);
                }
            });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(b(ll), b(tt, 8));
          });
          static #t = (this.ɵprov = E({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function N0(e, n) {
        return e
          ? e.reduce((t, r) => {
              const { children: o, ...s } = {
                ...r,
                parentName: n.name,
                path: (n.path + "/" + r.path).replace(/\/\//g, "/"),
              };
              return t.push(s, ...N0(o, s)), t;
            }, [])
          : [];
      }
      let Zh = (() => {
          class e {
            constructor(t) {
              this.localization = t;
            }
            transform(t = "", ...r) {
              const o =
                r.reduce(
                  (s, i) =>
                    s
                      ? i
                        ? Array.isArray(i)
                          ? [...s, ...i]
                          : [...s, i]
                        : s
                      : i,
                  []
                ) || [];
              return this.localization.instant(t, ...o);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(Go, 16));
            });
            static #t = (this.ɵpipe = qe({
              name: "abpLocalization",
              type: e,
              pure: !0,
            }));
            static #n = (this.ɵprov = E({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        Oi = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({}));
          }
          return e;
        })();
      new w("INJECTOR_PIPE_DATA_TOKEN");
      const U8 = {
          provide: nn,
          useFactory: function $8(e) {
            return () => {
              const n = e.get(Ni),
                t = e.get(dt),
                r = e.get(T8);
              n.getLanguage$().subscribe((o) => {
                const s = encodeURIComponent(`c=${o}|uic=${o}`);
                t.cookie = `${r}=${s}`;
              });
            };
          },
          deps: [Te],
          multi: !0,
        },
        z8 = {
          provide: rn,
          useClass: class H8 extends String {
            constructor(n) {
              super(), (this.localizationService = n);
            }
            toString() {
              const { currentLang: n } = this.localizationService;
              return (function Ti(e, n) {
                return Object.prototype.hasOwnProperty.call(e, n);
              })(Wh, n)
                ? Wh[n]
                : n;
            }
            valueOf() {
              return this.toString();
            }
          },
          deps: [Go],
        };
      Date.prototype.toLocalISOString = function () {
        const e = this.getTimezoneOffset();
        return new Date(this.getTime() - 6e4 * e).toISOString();
      };
      let W8 = (() => {
          class e {
            constructor(t) {
              (this.restService = t),
                (this.apiName = "abp"),
                (this.findTenantById = (r) =>
                  this.restService.request(
                    {
                      method: "GET",
                      url: `/api/abp/multi-tenancy/tenants/by-id/${r}`,
                    },
                    { apiName: this.apiName }
                  )),
                (this.findTenantByName = (r) =>
                  this.restService.request(
                    {
                      method: "GET",
                      url: `/api/abp/multi-tenancy/tenants/by-name/${r}`,
                    },
                    { apiName: this.apiName }
                  ));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(cl));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        Z8 = (() => {
          class e {
            constructor(t, r, o, s, i) {
              (this.restService = t),
                (this.sessionState = r),
                (this.tenantService = o),
                (this.configStateService = s),
                (this.tenantKey = i),
                (this.domainTenant = null),
                (this.isTenantBoxVisible = !0),
                (this.apiName = "abp"),
                (this.setTenantToState = (a) => (
                  this.sessionState.setTenant({
                    id: a.tenantId,
                    name: a.name,
                    isAvailable: !0,
                  }),
                  this.configStateService.refreshAppState().pipe(A((c) => a))
                ));
            }
            setTenantByName(t) {
              return this.tenantService
                .findTenantByName(t)
                .pipe(Ae(this.setTenantToState));
            }
            setTenantById(t) {
              return this.tenantService
                .findTenantById(t)
                .pipe(Ae(this.setTenantToState));
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(b(cl), b(Ni), b(W8), b(zo), b(T0));
            });
            static #t = (this.ɵprov = E({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      const Kh = "{0}";
      function Yh() {
        return (Yh = zf(function* (e) {
          const n = e.get(Ri),
            t = e.get(Z8),
            o = (function K8(e) {
              "/" !== e.charAt(e.length - 1) && (e += "/");
              const n = (function m8(e) {
                  return (n) => {
                    const t = [],
                      r = e
                        .replace(/\./g, "\\.")
                        .replace(
                          /\{\s?([0-9a-zA-Z]+)\s?\}/g,
                          (s, i) => (t.push(i), "(.+)")
                        );
                    return (n.match(r) || []).slice(1).reduce((s, i, a) => {
                      const c = t[a];
                      return (s[c] = [...(s[c] || []), i].filter(Boolean)), s;
                    }, {});
                  };
                })(e),
                t = Kh.replace(/[}{]/g, "");
              return n(window.location.href)[t]?.[0];
            })(n.getEnvironment()?.application?.baseUrl || "");
          if (o)
            return (
              O0(e, o),
              t
                .setTenantByName(o)
                .pipe(
                  ge((c) => {
                    (t.isTenantBoxVisible = !1),
                      ((c) => {
                        t.domainTenant = {
                          id: c.tenantId,
                          name: c.name,
                          isAvailable: !0,
                        };
                      })(c);
                  })
                )
                .toPromise()
            );
          {
            O0(e, "", Kh + ".");
            const c = (function Y8(e) {
              return new URLSearchParams(window.location.search).get(e);
            })(t.tenantKey);
            if (c) return t.setTenantById(c).toPromise();
          }
          return Promise.resolve();
        })).apply(this, arguments);
      }
      function O0(e, n, t = Kh) {
        const r = e.get(Ri),
          o = d8(r.getEnvironment());
        return (
          o.application.baseUrl &&
            (o.application.baseUrl = o.application.baseUrl.replace(t, n)),
          o.oAuthConfig?.redirectUri &&
            (o.oAuthConfig.redirectUri = o.oAuthConfig.redirectUri.replace(
              t,
              n
            )),
          o.oAuthConfig || (o.oAuthConfig = {}),
          (o.oAuthConfig.issuer = (o.oAuthConfig.issuer || "").replace(t, n)),
          Object.keys(o.apis).forEach((s) => {
            Object.keys(o.apis[s]).forEach((i) => {
              o.apis[s][i] = (o.apis[s][i] || "").replace(t, n);
            });
          }),
          r.setState(o)
        );
      }
      function J8(e) {
        return (function () {
          var t = zf(function* () {
            const r = e.get(Ri),
              o = e.get(zo),
              s = e.get(Mi);
            r.setState(s.environment),
              yield (function G8(e, n) {
                const t = e.get(Ri),
                  { remoteEnv: r } = n,
                  { headers: o = {}, method: s = "GET", url: i } = r || {};
                if (!i) return Promise.resolve();
                const a = e.get(Wc),
                  c = e.get(E0);
                return a
                  .request(s, i, { headers: o })
                  .pipe(
                    on((l) => (c.reportError(l), R(null))),
                    ge((l) =>
                      t.setState(
                        (function q8(e, n, t) {
                          switch (t.mergeStrategy) {
                            case "deepmerge":
                              return C0(e, n);
                            case "overwrite":
                            case null:
                            case void 0:
                              return n;
                            default:
                              return t.mergeStrategy(e, n);
                          }
                        })(n, l || {}, r)
                      )
                    )
                  )
                  .toPromise();
              })(e, s.environment),
              yield (function Q8(e) {
                return Yh.apply(this, arguments);
              })(e);
            const i = e.get(h8, void 0, { optional: !0 }),
              a = e.get(N8, il, { optional: !0 });
            if ((i && (yield i.init()), s.skipGetAppConfiguration)) return;
            const c = o.refreshAppState().pipe(
              ge(() => a(e)),
              ge(() => {
                const l = o.getOne("currentTenant");
                e.get(Ni).setTenant(l);
              }),
              on((l) => {
                const u = e.get(A8, null);
                return u && u.length && u.forEach((d) => d(l)), Wn(l);
              })
            );
            yield (function vk(e, n) {
              const t = "object" == typeof n;
              return new Promise((r, o) => {
                let i,
                  s = !1;
                e.subscribe({
                  next: (a) => {
                    (i = a), (s = !0);
                  },
                  error: o,
                  complete: () => {
                    s ? r(i) : t ? r(n.defaultValue) : o(new ti());
                  },
                });
              });
            })(c);
          });
          return function () {
            return t.apply(this, arguments);
          };
        })();
      }
      function X8(e) {
        return () => {
          const t = e.get(Ni),
            { registerLocaleFn: r } = e.get(Mi),
            o = t.getLanguage() || "en";
          return new Promise((s, i) => {
            r(o).then((a) => (a?.default && U_(a.default), s("resolved")), i);
          });
        };
      }
      class s9 {
        constructor() {
          (this.queue = []),
            (this.isRunning = !1),
            (this.stack = 0),
            (this.interval = 0),
            (this.stackSize = 100);
        }
        init(n, t) {
          (this.interval = n), (this.stackSize = t);
        }
        add(n) {
          this.queue.push(n), this.run();
        }
        run() {
          if (this.isRunning) return;
          this.stack++, (this.isRunning = !0);
          const n = this.queue.shift();
          n
            ? (n(),
              this.stack > this.stackSize
                ? setTimeout(() => {
                    (this.isRunning = !1), this.run(), (this.stack = 0);
                  }, this.interval)
                : ((this.isRunning = !1), this.run()))
            : (this.isRunning = !1);
        }
      }
      const i9 = { provide: S0, useValue: !1 };
      let ul = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({
              providers: [Zh],
              imports: [Of, oE, f0, h0, xb, Oi, Of, oE, f0, h0, xb, Oi],
            }));
          }
          return e;
        })(),
        x0 = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({
              imports: [
                ul,
                Oi,
                s3.withOptions({
                  cookieName: "XSRF-TOKEN",
                  headerName: "RequestVerificationToken",
                }),
                ul,
                Oi,
              ],
            }));
          }
          return e;
        })(),
        a9 = (() => {
          class e {
            static forRoot(t = {}) {
              return {
                ngModule: x0,
                providers: [
                  z8,
                  U8,
                  { provide: "CORE_OPTIONS", useValue: t },
                  { provide: Mi, useFactory: p8, deps: ["CORE_OPTIONS"] },
                  { provide: nn, multi: !0, deps: [Te], useFactory: J8 },
                  { provide: nn, multi: !0, deps: [Te], useFactory: X8 },
                  { provide: nn, multi: !0, deps: [Go], useFactory: il },
                  { provide: nn, multi: !0, deps: [B8], useFactory: il },
                  { provide: T0, useValue: t.tenantKey || "__tenant" },
                  {
                    provide: p0,
                    multi: !0,
                    useValue: m0(t.localizations),
                    deps: [Go],
                  },
                  { provide: R8, useClass: s9 },
                  {
                    provide: R0,
                    useValue: t.othersGroup || "AbpUi::OthersGroup",
                  },
                  i9,
                ],
              };
            }
            static forChild(t = {}) {
              return {
                ngModule: x0,
                providers: [
                  {
                    provide: p0,
                    multi: !0,
                    useValue: m0(t.localizations),
                    deps: [Go],
                  },
                ],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = Le({ type: e }));
            static #n = (this.ɵinj = Oe({ imports: [ul, ul] }));
          }
          return e;
        })();
      function F9(e, n) {
        if (1 & e) {
          const t = Qa();
          ct(0, "li", 15),
            je("click", function () {
              const s = ea(t).$implicit,
                i = Sn(2);
              return ta(
                0 !== s.children.length
                  ? i.openInnerMenu(s)
                  : i.changeRouterLink(s.path)
              );
            }),
            En(1, "i"),
            ct(2, "div", 16)(3, "span"),
            bo(4),
            yr(5, "abpLocalization"),
            Ue(),
            En(6, "i", 17),
            Ue()();
        }
        if (2 & e) {
          const t = n.$implicit,
            r = Sn(2);
          Tt("leaf-item", 0 === t.children.length)(
            "menu-item-behind-inner-menu",
            r.isInnerMenuOpen
          )("active-parent", r.parentMenuTitle === t.name)(
            "menu-item-active",
            t.name ===
              (null == r.activeMenuItem ? null : r.activeMenuItem.name) ||
              t.name ===
                (null == r.activeMenuItem || null == r.activeMenuItem.parent
                  ? null
                  : r.activeMenuItem.parent.name) ||
              t.name ===
                (null == r.activeMenuItem ||
                null == r.activeMenuItem.parent ||
                null == r.activeMenuItem.parent.parent
                  ? null
                  : r.activeMenuItem.parent.parent.name)
          ),
            Dt("id", t.name),
            Se(1),
            pD("", t.iconClass, " menu-item-icon"),
            Se(3),
            mr(" ", Dr(5, 14, t.name), " "),
            Se(2),
            Dt(
              "ngClass",
              0 === t.children.length
                ? "icon-arrow-narrow-left"
                : "icon-chevron-left"
            );
        }
      }
      function k9(e, n) {
        1 & e && En(0, "i", 21);
      }
      function j9(e, n) {
        if (1 & e) {
          const t = Qa();
          ct(0, "li", 23),
            je("click", function () {
              const s = ea(t).$implicit;
              return ta(Sn(4).changeRouterLink(s.path));
            }),
            ct(1, "div", 16)(2, "span", 24),
            bo(3),
            yr(4, "abpLocalization"),
            Ue(),
            En(5, "i", 21),
            Ue()();
        }
        if (2 & e) {
          const t = n.$implicit,
            r = n.last,
            o = Sn(4);
          Tt(
            "menu-item-active",
            t.name === (null == o.activeMenuItem ? null : o.activeMenuItem.name)
          )("last-child-menu-item", r),
            Dt("id", t.name),
            Se(3),
            mr(" ", Dr(4, 6, t.name), "");
        }
      }
      function L9(e, n) {
        if ((1 & e && (ks(0), hr(1, j9, 6, 8, "li", 22), js()), 2 & e)) {
          const t = Sn().$implicit;
          Se(1), Dt("ngForOf", t.children);
        }
      }
      function V9(e, n) {
        if (1 & e) {
          const t = Qa();
          ks(0),
            ct(1, "li", 18),
            je("click", function () {
              const s = ea(t).$implicit,
                i = Sn(2);
              return ta(0 === s.children.length && i.changeRouterLink(s.path));
            }),
            ct(2, "div")(3, "span"),
            bo(4),
            yr(5, "abpLocalization"),
            Ue(),
            hr(6, k9, 1, 0, "i", 19),
            Ue()(),
            hr(7, L9, 2, 1, "ng-container", 20),
            js();
        }
        if (2 & e) {
          const t = n.$implicit,
            r = Sn(2);
          Se(1),
            Tt(
              "menu-item-active",
              t.name ===
                (null == r.activeMenuItem ? null : r.activeMenuItem.name)
            ),
            Dt(
              "ngClass",
              0 === t.children.length
                ? "menu-item leaf-item"
                : "menu-item-parent"
            )("id", t.name),
            Se(1),
            Tt("menu-item-name", 0 === t.children.length),
            Se(2),
            mr(" ", Dr(5, 9, t.name), " "),
            Se(2),
            Dt("ngIf", 0 === t.children.length),
            Se(1),
            Dt("ngIf", 0 !== t.children.length);
        }
      }
      function B9(e, n) {
        if (
          (1 & e &&
            (ct(0, "div", 10)(1, "div", 11)(2, "ng-scrollbar")(3, "ul"),
            hr(4, F9, 7, 16, "li", 12),
            Ue()()(),
            ct(5, "div", 13)(6, "ng-scrollbar")(7, "ul"),
            hr(8, V9, 8, 11, "ng-container", 14),
            Ue()()()()),
          2 & e)
        ) {
          const t = Sn();
          Se(1),
            Tt("parent-menu-behind-inner-menu", t.isInnerMenuOpen),
            Se(3),
            Dt("ngForOf", t.mainMenu),
            Se(1),
            Tt("inner-sidebar-visible", t.isInnerMenuOpen),
            Se(3),
            Dt("ngForOf", t.innerMenu);
        }
      }
      let $9 = (() => {
          class e {
            constructor(t, r, o, s) {
              (this.routesService = t),
                (this.router = r),
                (this.routerEvents = o),
                (this.localizationService = s),
                (this.isInnerMenuOpen = !1),
                (this.isMainMenuOpen = !0),
                (this.mainMenu = []),
                (this.innerMenu = []);
            }
            ngOnInit() {
              (this.mainMenu = this.routesService.visible),
                this.routerEvents
                  .getNavigationEvents("End")
                  .pipe(bw(this.router))
                  .subscribe((t) => {
                    this.activeMenuItem = this.routesService.search({
                      path: t.url.split("?")[0],
                    });
                  });
            }
            searchByText() {
              this.closeInnerMenu();
              const t = this.filterValue?.trim();
              this.mainMenu = t
                ? this.searchTree(
                    this.copyTreeNode(this.routesService.visible),
                    t
                  )
                : this.routesService.visible;
            }
            copyTreeNode(t) {
              const r = [];
              return (
                t.forEach((o) => r.push({ ...o })),
                r.forEach((o) => {
                  o.children = this.copyTreeNode(o.children);
                }),
                r
              );
            }
            searchTree(t, r) {
              return t.filter((o) =>
                0 === o.children.length
                  ? this.localizationService
                      .instant(o.name)
                      .toLowerCase()
                      .includes(r.toLowerCase())
                  : ((o.children = this.searchTree(o.children, r)),
                    o.children.length > 0)
              );
            }
            changeRouterLink(t) {
              this.router.navigateByUrl(t),
                this.closeSidebar(),
                this.closeInnerMenu();
            }
            openInnerMenu(t) {
              (this.isInnerMenuOpen = 0 !== t.children.length),
                (this.innerMenu = t.children),
                (this.parentMenuTitle = t.name);
            }
            closeInnerMenu() {
              (this.isInnerMenuOpen = !1), (this.parentMenuTitle = null);
            }
            openSidebar() {
              this.isMainMenuOpen = !0;
            }
            closeSidebar() {
              this.closeInnerMenu(), (this.isMainMenuOpen = !1);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(ll), C(tt), C(M8), C(Go));
            });
            static #t = (this.ɵcmp = Wi({
              type: e,
              selectors: [["app-sidebar"]],
              decls: 13,
              vars: 12,
              consts: [
                [1, "sidebar"],
                [1, "sidebar-header"],
                [1, "search-area"],
                [
                  "id",
                  "sidebar-search-input",
                  "type",
                  "search",
                  1,
                  "search",
                  3,
                  "ngModel",
                  "placeholder",
                  "ngModelChange",
                  "ngModelChangeDebounced",
                ],
                [1, "icon-search"],
                [1, "header-text"],
                [1, "back-icon-container"],
                [1, "icon-arrow-circle-right", "flip-icon", 3, "click"],
                [1, "page-title"],
                ["class", "parent-menu-container", 4, "ngIf"],
                [1, "parent-menu-container"],
                [1, "parent-menu"],
                [
                  "class",
                  "menu-item",
                  3,
                  "leaf-item",
                  "menu-item-behind-inner-menu",
                  "id",
                  "active-parent",
                  "menu-item-active",
                  "click",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [1, "inner-sidebar"],
                [4, "ngFor", "ngForOf"],
                [1, "menu-item", 3, "id", "click"],
                [1, "menu-item-name"],
                [1, "flip-icon", 3, "ngClass"],
                [3, "ngClass", "id", "click"],
                ["class", "icon-arrow-narrow-left flip-icon", 4, "ngIf"],
                [4, "ngIf"],
                [1, "icon-arrow-narrow-left", "flip-icon"],
                [
                  "class",
                  "menu-item leaf-item",
                  3,
                  "menu-item-active",
                  "last-child-menu-item",
                  "id",
                  "click",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [1, "menu-item", "leaf-item", 3, "id", "click"],
                [1, "menu-item-child-name"],
              ],
              template: function (r, o) {
                if (
                  (1 & r &&
                    (ct(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "input", 3),
                    je("ngModelChange", function (i) {
                      return (o.filterValue = i);
                    })("ngModelChangeDebounced", function () {
                      return o.searchByText();
                    }),
                    yr(4, "abpLocalization"),
                    Ue(),
                    En(5, "i", 4),
                    Ue(),
                    ct(6, "div", 5)(7, "div", 6)(8, "i", 7),
                    je("click", function () {
                      return o.closeInnerMenu();
                    }),
                    Ue()(),
                    ct(9, "span", 8),
                    bo(10),
                    yr(11, "abpLocalization"),
                    Ue()()(),
                    hr(12, B9, 9, 6, "div", 9),
                    Ue()),
                  2 & r)
                ) {
                  let s;
                  Tt("sidebar-visible", o.isMainMenuOpen),
                    Se(3),
                    Dt("ngModel", o.filterValue)(
                      "placeholder",
                      Dr(4, 8, "::SearchWord")
                    ),
                    Se(5),
                    Tt("icon-visible", o.isInnerMenuOpen),
                    Se(2),
                    Td(
                      Dr(
                        11,
                        10,
                        null !== (s = o.parentMenuTitle) && void 0 !== s
                          ? s
                          : "::MainMenu"
                      )
                    ),
                    Se(2),
                    Dt("ngIf", o.isMainMenuOpen);
                }
              },
              dependencies: [G_, W_, K_, Yc, OE, Oh, Zh],
              styles: [
                '[class^=icon-][_ngcontent-%COMP%]:before, [class*=" icon-"][_ngcontent-%COMP%]:before{font-size:20px}.menu-item[_ngcontent-%COMP%]:hover{background-color:#fff}.sidebar[_ngcontent-%COMP%]   .menu-item-active[_ngcontent-%COMP%]{background:linear-gradient(270deg,#7F92FF -23.16%,#5E1AD5 106.52%)}.active-parent[_ngcontent-%COMP%], .active-parent[_ngcontent-%COMP%]:hover{background-color:#7f92ff;opacity:1!important}.active-parent[_ngcontent-%COMP%]   .menu-item-icon[_ngcontent-%COMP%], .active-parent[_ngcontent-%COMP%]   .menu-item-name[_ngcontent-%COMP%], .active-parent[_ngcontent-%COMP%]:hover   .menu-item-icon[_ngcontent-%COMP%], .active-parent[_ngcontent-%COMP%]:hover   .menu-item-name[_ngcontent-%COMP%]{color:#fff}',
              ],
            }));
          }
          return e;
        })(),
        U9 = (() => {
          class e {
            constructor() {
              (this.title = "shared-layout-view"),
                console.log("Init appppppppppppppppppp");
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = Wi({
              type: e,
              selectors: [["cst-workspace-root"]],
              decls: 3,
              vars: 3,
              template: function (r, o) {
                1 & r &&
                  (bo(0), yr(1, "abpLocalization"), En(2, "app-sidebar")),
                  2 & r && mr("", Dr(1, 1, "CMSService::AboutCST:About"), "\n");
              },
              dependencies: [$9, Zh],
            }));
          }
          return e;
        })();
      const H9 = {
        production: !1,
        remoteEnv: {
          url: "/assets/appSettings.json",
          mergeStrategy: "deepmerge",
          method: "GET",
          headers: {},
        },
        apis: {
          default: {
            url: "https://cstgateway.starwayseg.com",
            rootNamespace: "CTS.Portal",
          },
        },
      };
      let op = {};
      const sp = {};
      function $0(e) {
        return ip.apply(this, arguments);
      }
      function ip() {
        return (ip = zf(function* ({ locale: e, resolve: n }) {
          sp[e] ? n({ default: sp[op[e] || e] }) : n();
        })).apply(this, arguments);
      }
      function z9({
        cultureNameLocaleFileMap: e = {},
        errorHandlerFn: n = $0,
      } = {}) {
        return (t) => {
          const r = `/locales/${(e = { ...Wh, ...e })[t] || t}`;
          return new Promise((o, s) =>
            Ot(32193)(`./common${r}`)
              .then((i) => {
                let a = i;
                for (; a.default; ) a = a.default;
                o({ default: a });
              })
              .catch((i) => {
                n({ resolve: o, reject: s, error: i, locale: t });
              })
          );
        };
      }
      const G9 = [
          {
            provide: nn,
            useFactory: function q9(e) {
              return () => {
                e.add([
                  {
                    path: "/",
                    name: "::Menu:Home",
                    iconClass: "icon-home",
                    order: 1,
                    layout: "application",
                  },
                ]);
              };
            },
            deps: [ll],
            multi: !0,
          },
        ],
        W9 = [
          {
            provide: nn,
            useFactory: function Z9(e) {
              return () => {
                e.add([
                  {
                    path: "/",
                    name: "CMSService::Menu:AboutCST",
                    iconClass: "icon-office-building",
                    order: 2,
                    layout: "application",
                  },
                  {
                    path: "/cms/aboutCST/about",
                    name: "CMSService::Menu:CSTAbout",
                    parentName: "CMSService::Menu:AboutCST",
                    layout: "application",
                  },
                  {
                    path: "/cms/aboutCST/background",
                    name: "CMSService::Menu:CSTHistory",
                    parentName: "CMSService::Menu:AboutCST",
                    layout: "application",
                  },
                  {
                    path: "/cms/aboutCST/structure",
                    name: "CMSService::Menu:CSTStructure",
                    parentName: "CMSService::Menu:AboutCST",
                    layout: "application",
                  },
                  {
                    path: "/cms/aboutCST/sectors",
                    name: "CMSService::Menu:CSTSectors",
                    parentName: "CMSService::Menu:AboutCST",
                    layout: "application",
                  },
                ]);
              };
            },
            deps: [ll],
            multi: !0,
          },
        ];
      let K9 = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = Le({ type: e, bootstrap: [U9] }));
          static #n = (this.ɵinj = Oe({
            providers: [G9, W9],
            imports: [
              tk,
              Oi,
              a9.forRoot({ environment: H9, registerLocaleFn: z9() }),
            ],
          }));
        }
        return e;
      })();
      XF()
        .bootstrapModule(K9)
        .catch((e) => console.error(e));
    },
    60143: (tr, Pi, Ot) => {
      var H = {
        "./common/locales/ar": 41036,
        "./common/locales/ar.mjs": 41036,
        "./common/locales/cs": 21139,
        "./common/locales/cs.mjs": 21139,
        "./common/locales/de": 33247,
        "./common/locales/de.mjs": 33247,
        "./common/locales/en": 55384,
        "./common/locales/en-GB": 87437,
        "./common/locales/en-GB.mjs": 87437,
        "./common/locales/en.mjs": 55384,
        "./common/locales/es": 46828,
        "./common/locales/es.mjs": 46828,
        "./common/locales/fi": 75478,
        "./common/locales/fi.mjs": 75478,
        "./common/locales/fr": 11227,
        "./common/locales/fr.mjs": 11227,
        "./common/locales/hi": 96875,
        "./common/locales/hi.mjs": 96875,
        "./common/locales/hu": 30894,
        "./common/locales/hu.mjs": 30894,
        "./common/locales/is": 953,
        "./common/locales/is.mjs": 953,
        "./common/locales/it": 91974,
        "./common/locales/it.mjs": 91974,
        "./common/locales/pt": 23670,
        "./common/locales/pt.mjs": 23670,
        "./common/locales/ro": 83270,
        "./common/locales/ro.mjs": 83270,
        "./common/locales/ru": 78512,
        "./common/locales/ru.mjs": 78512,
        "./common/locales/sk": 27776,
        "./common/locales/sk.mjs": 27776,
        "./common/locales/sl": 66580,
        "./common/locales/sl.mjs": 66580,
        "./common/locales/tr": 32231,
        "./common/locales/tr.mjs": 32231,
        "./common/locales/zh-Hans": 71552,
        "./common/locales/zh-Hans.mjs": 71552,
        "./common/locales/zh-Hant": 74039,
        "./common/locales/zh-Hant.mjs": 74039,
      };
      function _t(wt) {
        return Ht(wt).then(Ot);
      }
      function Ht(wt) {
        return Ot.e(8592).then(() => {
          if (!Ot.o(H, wt)) {
            var Me = new Error("Cannot find module '" + wt + "'");
            throw ((Me.code = "MODULE_NOT_FOUND"), Me);
          }
          return H[wt];
        });
      }
      (_t.keys = () => Object.keys(H)),
        (_t.resolve = Ht),
        (_t.id = 60143),
        (tr.exports = _t);
    },
    32193: (tr, Pi, Ot) => {
      var H = {
        "./common/locales/af": [12669, 7155],
        "./common/locales/af-NA": [36154, 9069],
        "./common/locales/af-NA.mjs": [36154, 9069],
        "./common/locales/af.mjs": [12669, 7155],
        "./common/locales/agq": [64279, 691],
        "./common/locales/agq.mjs": [64279, 691],
        "./common/locales/ak": [53893, 5532],
        "./common/locales/ak.mjs": [53893, 5532],
        "./common/locales/am": [90925, 3260],
        "./common/locales/am.mjs": [90925, 3260],
        "./common/locales/ar": [41036, 8592],
        "./common/locales/ar-AE": [56579, 4708],
        "./common/locales/ar-AE.mjs": [56579, 4708],
        "./common/locales/ar-BH": [78408, 3198],
        "./common/locales/ar-BH.mjs": [78408, 3198],
        "./common/locales/ar-DJ": [80496, 4508],
        "./common/locales/ar-DJ.mjs": [80496, 4508],
        "./common/locales/ar-DZ": [56753, 7168],
        "./common/locales/ar-DZ.mjs": [56753, 7168],
        "./common/locales/ar-EG": [83536, 6274],
        "./common/locales/ar-EG.mjs": [83536, 6274],
        "./common/locales/ar-ER": [58537, 830],
        "./common/locales/ar-ER.mjs": [58537, 830],
        "./common/locales/ar-IL": [44633, 1458],
        "./common/locales/ar-IL.mjs": [44633, 1458],
        "./common/locales/ar-IQ": [60972, 5737],
        "./common/locales/ar-IQ.mjs": [60972, 5737],
        "./common/locales/ar-JO": [42947, 4562],
        "./common/locales/ar-JO.mjs": [42947, 4562],
        "./common/locales/ar-KM": [65374, 7861],
        "./common/locales/ar-KM.mjs": [65374, 7861],
        "./common/locales/ar-KW": [62104, 445],
        "./common/locales/ar-KW.mjs": [62104, 445],
        "./common/locales/ar-LB": [40339, 4574],
        "./common/locales/ar-LB.mjs": [40339, 4574],
        "./common/locales/ar-LY": [38810, 4585],
        "./common/locales/ar-LY.mjs": [38810, 4585],
        "./common/locales/ar-MA": [9679, 4616],
        "./common/locales/ar-MA.mjs": [9679, 4616],
        "./common/locales/ar-MR": [65662, 9503],
        "./common/locales/ar-MR.mjs": [65662, 9503],
        "./common/locales/ar-OM": [43101, 2936],
        "./common/locales/ar-OM.mjs": [43101, 2936],
        "./common/locales/ar-PS": [9126, 6493],
        "./common/locales/ar-PS.mjs": [9126, 6493],
        "./common/locales/ar-QA": [7596, 4753],
        "./common/locales/ar-QA.mjs": [7596, 4753],
        "./common/locales/ar-SA": [7072, 5634],
        "./common/locales/ar-SA.mjs": [7072, 5634],
        "./common/locales/ar-SD": [95266, 8012],
        "./common/locales/ar-SD.mjs": [95266, 8012],
        "./common/locales/ar-SO": [59442, 1977],
        "./common/locales/ar-SO.mjs": [59442, 1977],
        "./common/locales/ar-SS": [62665, 3920],
        "./common/locales/ar-SS.mjs": [62665, 3920],
        "./common/locales/ar-SY": [51338, 2616],
        "./common/locales/ar-SY.mjs": [51338, 2616],
        "./common/locales/ar-TD": [50817, 7488],
        "./common/locales/ar-TD.mjs": [50817, 7488],
        "./common/locales/ar-TN": [77611, 1414],
        "./common/locales/ar-TN.mjs": [77611, 1414],
        "./common/locales/ar-YE": [29666, 2170],
        "./common/locales/ar-YE.mjs": [29666, 2170],
        "./common/locales/ar.mjs": [41036, 8592],
        "./common/locales/as": [87945, 5138],
        "./common/locales/as.mjs": [87945, 5138],
        "./common/locales/asa": [66999, 2970],
        "./common/locales/asa.mjs": [66999, 2970],
        "./common/locales/ast": [99772, 5239],
        "./common/locales/ast.mjs": [99772, 5239],
        "./common/locales/az": [27438, 6999],
        "./common/locales/az-Cyrl": [46844, 3376],
        "./common/locales/az-Cyrl.mjs": [46844, 3376],
        "./common/locales/az-Latn": [12831, 9074],
        "./common/locales/az-Latn.mjs": [12831, 9074],
        "./common/locales/az.mjs": [27438, 6999],
        "./common/locales/bas": [29094, 5089],
        "./common/locales/bas.mjs": [29094, 5089],
        "./common/locales/be": [49852, 6201],
        "./common/locales/be.mjs": [49852, 6201],
        "./common/locales/bem": [25112, 9095],
        "./common/locales/bem.mjs": [25112, 9095],
        "./common/locales/bez": [45761, 8490],
        "./common/locales/bez.mjs": [45761, 8490],
        "./common/locales/bg": [99038, 1387],
        "./common/locales/bg.mjs": [99038, 1387],
        "./common/locales/bm": [56211, 1492],
        "./common/locales/bm.mjs": [56211, 1492],
        "./common/locales/bn": [37951, 5514],
        "./common/locales/bn-IN": [59470, 2289],
        "./common/locales/bn-IN.mjs": [59470, 2289],
        "./common/locales/bn.mjs": [37951, 5514],
        "./common/locales/bo": [69833, 3371],
        "./common/locales/bo-IN": [83981, 2858],
        "./common/locales/bo-IN.mjs": [83981, 2858],
        "./common/locales/bo.mjs": [69833, 3371],
        "./common/locales/br": [43109, 6137],
        "./common/locales/br.mjs": [43109, 6137],
        "./common/locales/brx": [3785, 1441],
        "./common/locales/brx.mjs": [3785, 1441],
        "./common/locales/bs": [2143, 854],
        "./common/locales/bs-Cyrl": [48295, 946],
        "./common/locales/bs-Cyrl.mjs": [48295, 946],
        "./common/locales/bs-Latn": [27926, 9117],
        "./common/locales/bs-Latn.mjs": [27926, 9117],
        "./common/locales/bs.mjs": [2143, 854],
        "./common/locales/ca": [85784, 796],
        "./common/locales/ca-AD": [2349, 6459],
        "./common/locales/ca-AD.mjs": [2349, 6459],
        "./common/locales/ca-ES-valencia": [62322, 2161],
        "./common/locales/ca-ES-valencia.mjs": [62322, 2161],
        "./common/locales/ca-FR": [27854, 8023],
        "./common/locales/ca-FR.mjs": [27854, 8023],
        "./common/locales/ca-IT": [58605, 1473],
        "./common/locales/ca-IT.mjs": [58605, 1473],
        "./common/locales/ca.mjs": [85784, 796],
        "./common/locales/ce": [63749, 9537],
        "./common/locales/ce.mjs": [63749, 9537],
        "./common/locales/cgg": [50034, 2040],
        "./common/locales/cgg.mjs": [50034, 2040],
        "./common/locales/chr": [59311, 8335],
        "./common/locales/chr.mjs": [59311, 8335],
        "./common/locales/cs": [21139, 8592],
        "./common/locales/cs.mjs": [21139, 8592],
        "./common/locales/cy": [73674, 5398],
        "./common/locales/cy.mjs": [73674, 5398],
        "./common/locales/da": [78382, 234],
        "./common/locales/da-GL": [47590, 7064],
        "./common/locales/da-GL.mjs": [47590, 7064],
        "./common/locales/da.mjs": [78382, 234],
        "./common/locales/dav": [76863, 245],
        "./common/locales/dav.mjs": [76863, 245],
        "./common/locales/de": [33247, 8592],
        "./common/locales/de-AT": [96810, 485],
        "./common/locales/de-AT.mjs": [96810, 485],
        "./common/locales/de-BE": [71874, 7378],
        "./common/locales/de-BE.mjs": [71874, 7378],
        "./common/locales/de-CH": [56894, 6539],
        "./common/locales/de-CH.mjs": [56894, 6539],
        "./common/locales/de-LI": [83183, 3820],
        "./common/locales/de-LI.mjs": [83183, 3820],
        "./common/locales/de-LU": [21563, 3159],
        "./common/locales/de-LU.mjs": [21563, 3159],
        "./common/locales/de.mjs": [33247, 8592],
        "./common/locales/dje": [9945, 1427],
        "./common/locales/dje.mjs": [9945, 1427],
        "./common/locales/dsb": [3065, 9048],
        "./common/locales/dsb.mjs": [3065, 9048],
        "./common/locales/dua": [4817, 2404],
        "./common/locales/dua.mjs": [4817, 2404],
        "./common/locales/dyo": [79191, 993],
        "./common/locales/dyo.mjs": [79191, 993],
        "./common/locales/dz": [65033, 4984],
        "./common/locales/dz.mjs": [65033, 4984],
        "./common/locales/ebu": [1664, 6045],
        "./common/locales/ebu.mjs": [1664, 6045],
        "./common/locales/ee": [79657, 466],
        "./common/locales/ee-TG": [36246, 605],
        "./common/locales/ee-TG.mjs": [36246, 605],
        "./common/locales/ee.mjs": [79657, 466],
        "./common/locales/el": [59833, 1558],
        "./common/locales/el-CY": [24330, 3038],
        "./common/locales/el-CY.mjs": [24330, 3038],
        "./common/locales/el.mjs": [59833, 1558],
        "./common/locales/en": [55384, 8592],
        "./common/locales/en-001": [90006, 9690],
        "./common/locales/en-001.mjs": [90006, 9690],
        "./common/locales/en-150": [5752, 912],
        "./common/locales/en-150.mjs": [5752, 912],
        "./common/locales/en-AG": [77304, 9274],
        "./common/locales/en-AG.mjs": [77304, 9274],
        "./common/locales/en-AI": [33391, 6277],
        "./common/locales/en-AI.mjs": [33391, 6277],
        "./common/locales/en-AS": [62748, 8877],
        "./common/locales/en-AS.mjs": [62748, 8877],
        "./common/locales/en-AT": [10281, 5566],
        "./common/locales/en-AT.mjs": [10281, 5566],
        "./common/locales/en-AU": [4300, 5855],
        "./common/locales/en-AU.mjs": [4300, 5855],
        "./common/locales/en-BB": [68369, 1577],
        "./common/locales/en-BB.mjs": [68369, 1577],
        "./common/locales/en-BE": [57625, 7822],
        "./common/locales/en-BE.mjs": [57625, 7822],
        "./common/locales/en-BI": [39849, 729],
        "./common/locales/en-BI.mjs": [39849, 729],
        "./common/locales/en-BM": [58951, 3607],
        "./common/locales/en-BM.mjs": [58951, 3607],
        "./common/locales/en-BS": [61936, 3092],
        "./common/locales/en-BS.mjs": [61936, 3092],
        "./common/locales/en-BW": [23271, 9707],
        "./common/locales/en-BW.mjs": [23271, 9707],
        "./common/locales/en-BZ": [19747, 2529],
        "./common/locales/en-BZ.mjs": [19747, 2529],
        "./common/locales/en-CA": [4370, 1874],
        "./common/locales/en-CA.mjs": [4370, 1874],
        "./common/locales/en-CC": [28777, 5166],
        "./common/locales/en-CC.mjs": [28777, 5166],
        "./common/locales/en-CH": [26433, 3537],
        "./common/locales/en-CH.mjs": [26433, 3537],
        "./common/locales/en-CK": [1651, 2576],
        "./common/locales/en-CK.mjs": [1651, 2576],
        "./common/locales/en-CM": [39170, 4931],
        "./common/locales/en-CM.mjs": [39170, 4931],
        "./common/locales/en-CX": [83321, 7141],
        "./common/locales/en-CX.mjs": [83321, 7141],
        "./common/locales/en-CY": [36639, 3932],
        "./common/locales/en-CY.mjs": [36639, 3932],
        "./common/locales/en-DE": [62103, 6621],
        "./common/locales/en-DE.mjs": [62103, 6621],
        "./common/locales/en-DK": [95150, 5082],
        "./common/locales/en-DK.mjs": [95150, 5082],
        "./common/locales/en-DM": [78346, 5],
        "./common/locales/en-DM.mjs": [78346, 5],
        "./common/locales/en-ER": [69093, 5342],
        "./common/locales/en-ER.mjs": [69093, 5342],
        "./common/locales/en-FI": [80571, 2761],
        "./common/locales/en-FI.mjs": [80571, 2761],
        "./common/locales/en-FJ": [32718, 4240],
        "./common/locales/en-FJ.mjs": [32718, 4240],
        "./common/locales/en-FK": [18262, 3609],
        "./common/locales/en-FK.mjs": [18262, 3609],
        "./common/locales/en-FM": [31657, 1129],
        "./common/locales/en-FM.mjs": [31657, 1129],
        "./common/locales/en-GB": [87437, 8592],
        "./common/locales/en-GB.mjs": [87437, 8592],
        "./common/locales/en-GD": [18117, 2782],
        "./common/locales/en-GD.mjs": [18117, 2782],
        "./common/locales/en-GG": [73774, 8878],
        "./common/locales/en-GG.mjs": [73774, 8878],
        "./common/locales/en-GH": [63311, 2212],
        "./common/locales/en-GH.mjs": [63311, 2212],
        "./common/locales/en-GI": [21377, 6768],
        "./common/locales/en-GI.mjs": [21377, 6768],
        "./common/locales/en-GM": [57942, 4065],
        "./common/locales/en-GM.mjs": [57942, 4065],
        "./common/locales/en-GU": [20504, 5008],
        "./common/locales/en-GU.mjs": [20504, 5008],
        "./common/locales/en-GY": [10896, 7333],
        "./common/locales/en-GY.mjs": [10896, 7333],
        "./common/locales/en-HK": [77606, 8594],
        "./common/locales/en-HK.mjs": [77606, 8594],
        "./common/locales/en-IE": [10293, 9971],
        "./common/locales/en-IE.mjs": [10293, 9971],
        "./common/locales/en-IL": [72032, 4875],
        "./common/locales/en-IL.mjs": [72032, 4875],
        "./common/locales/en-IM": [97226, 2253],
        "./common/locales/en-IM.mjs": [97226, 2253],
        "./common/locales/en-IN": [55500, 7531],
        "./common/locales/en-IN.mjs": [55500, 7531],
        "./common/locales/en-IO": [51747, 6389],
        "./common/locales/en-IO.mjs": [51747, 6389],
        "./common/locales/en-JE": [80329, 2823],
        "./common/locales/en-JE.mjs": [80329, 2823],
        "./common/locales/en-JM": [50391, 8607],
        "./common/locales/en-JM.mjs": [50391, 8607],
        "./common/locales/en-KE": [67975, 6314],
        "./common/locales/en-KE.mjs": [67975, 6314],
        "./common/locales/en-KI": [52341, 5276],
        "./common/locales/en-KI.mjs": [52341, 5276],
        "./common/locales/en-KN": [21024, 7185],
        "./common/locales/en-KN.mjs": [21024, 7185],
        "./common/locales/en-KY": [56190, 6089],
        "./common/locales/en-KY.mjs": [56190, 6089],
        "./common/locales/en-LC": [45345, 3941],
        "./common/locales/en-LC.mjs": [45345, 3941],
        "./common/locales/en-LR": [30848, 3800],
        "./common/locales/en-LR.mjs": [30848, 3800],
        "./common/locales/en-LS": [13158, 3219],
        "./common/locales/en-LS.mjs": [13158, 3219],
        "./common/locales/en-MG": [48529, 9389],
        "./common/locales/en-MG.mjs": [48529, 9389],
        "./common/locales/en-MH": [53850, 8586],
        "./common/locales/en-MH.mjs": [53850, 8586],
        "./common/locales/en-MO": [46807, 8751],
        "./common/locales/en-MO.mjs": [46807, 8751],
        "./common/locales/en-MP": [84313, 5072],
        "./common/locales/en-MP.mjs": [84313, 5072],
        "./common/locales/en-MS": [40459, 3390],
        "./common/locales/en-MS.mjs": [40459, 3390],
        "./common/locales/en-MT": [38397, 5929],
        "./common/locales/en-MT.mjs": [38397, 5929],
        "./common/locales/en-MU": [85738, 6969],
        "./common/locales/en-MU.mjs": [85738, 6969],
        "./common/locales/en-MW": [10690, 6874],
        "./common/locales/en-MW.mjs": [10690, 6874],
        "./common/locales/en-MY": [92378, 1076],
        "./common/locales/en-MY.mjs": [92378, 1076],
        "./common/locales/en-NA": [10380, 2409],
        "./common/locales/en-NA.mjs": [10380, 2409],
        "./common/locales/en-NF": [13360, 6807],
        "./common/locales/en-NF.mjs": [13360, 6807],
        "./common/locales/en-NG": [49568, 658],
        "./common/locales/en-NG.mjs": [49568, 658],
        "./common/locales/en-NL": [73163, 2729],
        "./common/locales/en-NL.mjs": [73163, 2729],
        "./common/locales/en-NR": [22130, 710],
        "./common/locales/en-NR.mjs": [22130, 710],
        "./common/locales/en-NU": [49717, 5054],
        "./common/locales/en-NU.mjs": [49717, 5054],
        "./common/locales/en-NZ": [90716, 4944],
        "./common/locales/en-NZ.mjs": [90716, 4944],
        "./common/locales/en-PG": [24585, 6864],
        "./common/locales/en-PG.mjs": [24585, 6864],
        "./common/locales/en-PH": [33626, 1e3],
        "./common/locales/en-PH.mjs": [33626, 1e3],
        "./common/locales/en-PK": [64186, 3341],
        "./common/locales/en-PK.mjs": [64186, 3341],
        "./common/locales/en-PN": [99070, 7078],
        "./common/locales/en-PN.mjs": [99070, 7078],
        "./common/locales/en-PR": [48801, 9729],
        "./common/locales/en-PR.mjs": [48801, 9729],
        "./common/locales/en-PW": [60446, 4453],
        "./common/locales/en-PW.mjs": [60446, 4453],
        "./common/locales/en-RW": [86256, 1351],
        "./common/locales/en-RW.mjs": [86256, 1351],
        "./common/locales/en-SB": [26204, 8833],
        "./common/locales/en-SB.mjs": [26204, 8833],
        "./common/locales/en-SC": [25503, 5955],
        "./common/locales/en-SC.mjs": [25503, 5955],
        "./common/locales/en-SD": [12153, 4276],
        "./common/locales/en-SD.mjs": [12153, 4276],
        "./common/locales/en-SE": [14860, 2629],
        "./common/locales/en-SE.mjs": [14860, 2629],
        "./common/locales/en-SG": [917, 4533],
        "./common/locales/en-SG.mjs": [917, 4533],
        "./common/locales/en-SH": [88660, 6178],
        "./common/locales/en-SH.mjs": [88660, 6178],
        "./common/locales/en-SI": [67655, 1142],
        "./common/locales/en-SI.mjs": [67655, 1142],
        "./common/locales/en-SL": [42314, 3663],
        "./common/locales/en-SL.mjs": [42314, 3663],
        "./common/locales/en-SS": [67170, 7836],
        "./common/locales/en-SS.mjs": [67170, 7836],
        "./common/locales/en-SX": [52245, 3191],
        "./common/locales/en-SX.mjs": [52245, 3191],
        "./common/locales/en-SZ": [22305, 5828],
        "./common/locales/en-SZ.mjs": [22305, 5828],
        "./common/locales/en-TC": [77116, 7444],
        "./common/locales/en-TC.mjs": [77116, 7444],
        "./common/locales/en-TK": [12589, 1848],
        "./common/locales/en-TK.mjs": [12589, 1848],
        "./common/locales/en-TO": [76587, 612],
        "./common/locales/en-TO.mjs": [76587, 612],
        "./common/locales/en-TT": [16098, 9361],
        "./common/locales/en-TT.mjs": [16098, 9361],
        "./common/locales/en-TV": [45386, 2978],
        "./common/locales/en-TV.mjs": [45386, 2978],
        "./common/locales/en-TZ": [26763, 4191],
        "./common/locales/en-TZ.mjs": [26763, 4191],
        "./common/locales/en-UG": [92879, 5421],
        "./common/locales/en-UG.mjs": [92879, 5421],
        "./common/locales/en-UM": [81532, 6687],
        "./common/locales/en-UM.mjs": [81532, 6687],
        "./common/locales/en-VC": [46661, 755],
        "./common/locales/en-VC.mjs": [46661, 755],
        "./common/locales/en-VG": [5452, 5524],
        "./common/locales/en-VG.mjs": [5452, 5524],
        "./common/locales/en-VI": [3459, 1246],
        "./common/locales/en-VI.mjs": [3459, 1246],
        "./common/locales/en-VU": [46908, 1174],
        "./common/locales/en-VU.mjs": [46908, 1174],
        "./common/locales/en-WS": [27179, 2984],
        "./common/locales/en-WS.mjs": [27179, 2984],
        "./common/locales/en-ZA": [82968, 1758],
        "./common/locales/en-ZA.mjs": [82968, 1758],
        "./common/locales/en-ZM": [99619, 8728],
        "./common/locales/en-ZM.mjs": [99619, 8728],
        "./common/locales/en-ZW": [87914, 2675],
        "./common/locales/en-ZW.mjs": [87914, 2675],
        "./common/locales/en.mjs": [55384, 8592],
        "./common/locales/eo": [79213, 5935],
        "./common/locales/eo.mjs": [79213, 5935],
        "./common/locales/es": [46828, 8592],
        "./common/locales/es-419": [97474, 4810],
        "./common/locales/es-419.mjs": [97474, 4810],
        "./common/locales/es-AR": [57414, 3826],
        "./common/locales/es-AR.mjs": [57414, 3826],
        "./common/locales/es-BO": [56982, 8385],
        "./common/locales/es-BO.mjs": [56982, 8385],
        "./common/locales/es-CL": [81890, 2756],
        "./common/locales/es-CL.mjs": [81890, 2756],
        "./common/locales/es-CO": [70389, 6721],
        "./common/locales/es-CO.mjs": [70389, 6721],
        "./common/locales/es-CR": [311, 1688],
        "./common/locales/es-CR.mjs": [311, 1688],
        "./common/locales/es-CU": [32350, 1614],
        "./common/locales/es-CU.mjs": [32350, 1614],
        "./common/locales/es-DO": [43578, 5467],
        "./common/locales/es-DO.mjs": [43578, 5467],
        "./common/locales/es-EC": [37585, 2185],
        "./common/locales/es-EC.mjs": [37585, 2185],
        "./common/locales/es-GQ": [9922, 8550],
        "./common/locales/es-GQ.mjs": [9922, 8550],
        "./common/locales/es-GT": [11162, 5479],
        "./common/locales/es-GT.mjs": [11162, 5479],
        "./common/locales/es-HN": [85922, 477],
        "./common/locales/es-HN.mjs": [85922, 477],
        "./common/locales/es-MX": [12381, 9237],
        "./common/locales/es-MX.mjs": [12381, 9237],
        "./common/locales/es-NI": [31998, 5425],
        "./common/locales/es-NI.mjs": [31998, 5425],
        "./common/locales/es-PA": [2014, 3051],
        "./common/locales/es-PA.mjs": [2014, 3051],
        "./common/locales/es-PE": [36378, 4271],
        "./common/locales/es-PE.mjs": [36378, 4271],
        "./common/locales/es-PH": [36915, 591],
        "./common/locales/es-PH.mjs": [36915, 591],
        "./common/locales/es-PR": [19895, 4885],
        "./common/locales/es-PR.mjs": [19895, 4885],
        "./common/locales/es-PY": [32584, 107],
        "./common/locales/es-PY.mjs": [32584, 107],
        "./common/locales/es-SV": [97796, 4692],
        "./common/locales/es-SV.mjs": [97796, 4692],
        "./common/locales/es-US": [97169, 9939],
        "./common/locales/es-US.mjs": [97169, 9939],
        "./common/locales/es-UY": [9846, 5594],
        "./common/locales/es-UY.mjs": [9846, 5594],
        "./common/locales/es-VE": [13277, 4899],
        "./common/locales/es-VE.mjs": [13277, 4899],
        "./common/locales/es.mjs": [46828, 8592],
        "./common/locales/et": [72759, 8070],
        "./common/locales/et.mjs": [72759, 8070],
        "./common/locales/eu": [40506, 5842],
        "./common/locales/eu.mjs": [40506, 5842],
        "./common/locales/ewo": [32397, 3956],
        "./common/locales/ewo.mjs": [32397, 3956],
        "./common/locales/fa": [86191, 568],
        "./common/locales/fa.mjs": [86191, 568],
        "./common/locales/ff": [94358, 5702],
        "./common/locales/ff-CM": [24621, 6234],
        "./common/locales/ff-CM.mjs": [24621, 6234],
        "./common/locales/ff-GN": [82279, 4841],
        "./common/locales/ff-GN.mjs": [82279, 4841],
        "./common/locales/ff-Latn": [95032, 9663],
        "./common/locales/ff-Latn.mjs": [95032, 9663],
        "./common/locales/ff-MR": [38277, 5783],
        "./common/locales/ff-MR.mjs": [38277, 5783],
        "./common/locales/ff.mjs": [94358, 5702],
        "./common/locales/fi": [75478, 8592],
        "./common/locales/fi.mjs": [75478, 8592],
        "./common/locales/fil": [62882, 6917],
        "./common/locales/fil.mjs": [62882, 6917],
        "./common/locales/fo": [12909, 4898],
        "./common/locales/fo-DK": [12892, 55],
        "./common/locales/fo-DK.mjs": [12892, 55],
        "./common/locales/fo.mjs": [12909, 4898],
        "./common/locales/fr": [11227, 8592],
        "./common/locales/fr-BE": [24603, 3671],
        "./common/locales/fr-BE.mjs": [24603, 3671],
        "./common/locales/fr-BF": [33427, 3059],
        "./common/locales/fr-BF.mjs": [33427, 3059],
        "./common/locales/fr-BI": [66670, 5090],
        "./common/locales/fr-BI.mjs": [66670, 5090],
        "./common/locales/fr-BJ": [92396, 3068],
        "./common/locales/fr-BJ.mjs": [92396, 3068],
        "./common/locales/fr-BL": [65701, 1472],
        "./common/locales/fr-BL.mjs": [65701, 1472],
        "./common/locales/fr-CA": [56123, 1656],
        "./common/locales/fr-CA.mjs": [56123, 1656],
        "./common/locales/fr-CD": [6802, 4687],
        "./common/locales/fr-CD.mjs": [6802, 4687],
        "./common/locales/fr-CF": [76364, 6146],
        "./common/locales/fr-CF.mjs": [76364, 6146],
        "./common/locales/fr-CG": [50311, 671],
        "./common/locales/fr-CG.mjs": [50311, 671],
        "./common/locales/fr-CH": [98421, 5848],
        "./common/locales/fr-CH.mjs": [98421, 5848],
        "./common/locales/fr-CI": [3486, 5642],
        "./common/locales/fr-CI.mjs": [3486, 5642],
        "./common/locales/fr-CM": [88350, 1133],
        "./common/locales/fr-CM.mjs": [88350, 1133],
        "./common/locales/fr-DJ": [53e3, 410],
        "./common/locales/fr-DJ.mjs": [53e3, 410],
        "./common/locales/fr-DZ": [50259, 6930],
        "./common/locales/fr-DZ.mjs": [50259, 6930],
        "./common/locales/fr-GA": [99284, 8799],
        "./common/locales/fr-GA.mjs": [99284, 8799],
        "./common/locales/fr-GF": [98111, 5322],
        "./common/locales/fr-GF.mjs": [98111, 5322],
        "./common/locales/fr-GN": [21203, 6486],
        "./common/locales/fr-GN.mjs": [21203, 6486],
        "./common/locales/fr-GP": [65097, 5211],
        "./common/locales/fr-GP.mjs": [65097, 5211],
        "./common/locales/fr-GQ": [12125, 4965],
        "./common/locales/fr-GQ.mjs": [12125, 4965],
        "./common/locales/fr-HT": [5131, 1391],
        "./common/locales/fr-HT.mjs": [5131, 1391],
        "./common/locales/fr-KM": [3891, 4676],
        "./common/locales/fr-KM.mjs": [3891, 4676],
        "./common/locales/fr-LU": [89427, 1664],
        "./common/locales/fr-LU.mjs": [89427, 1664],
        "./common/locales/fr-MA": [57695, 1922],
        "./common/locales/fr-MA.mjs": [57695, 1922],
        "./common/locales/fr-MC": [38906, 4159],
        "./common/locales/fr-MC.mjs": [38906, 4159],
        "./common/locales/fr-MF": [88387, 4039],
        "./common/locales/fr-MF.mjs": [88387, 4039],
        "./common/locales/fr-MG": [60539, 3688],
        "./common/locales/fr-MG.mjs": [60539, 3688],
        "./common/locales/fr-ML": [40390, 646],
        "./common/locales/fr-ML.mjs": [40390, 646],
        "./common/locales/fr-MQ": [18313, 8630],
        "./common/locales/fr-MQ.mjs": [18313, 8630],
        "./common/locales/fr-MR": [69377, 7097],
        "./common/locales/fr-MR.mjs": [69377, 7097],
        "./common/locales/fr-MU": [32639, 7377],
        "./common/locales/fr-MU.mjs": [32639, 7377],
        "./common/locales/fr-NC": [74967, 3154],
        "./common/locales/fr-NC.mjs": [74967, 3154],
        "./common/locales/fr-NE": [74897, 1677],
        "./common/locales/fr-NE.mjs": [74897, 1677],
        "./common/locales/fr-PF": [64622, 8391],
        "./common/locales/fr-PF.mjs": [64622, 8391],
        "./common/locales/fr-PM": [79304, 809],
        "./common/locales/fr-PM.mjs": [79304, 809],
        "./common/locales/fr-RE": [29979, 3781],
        "./common/locales/fr-RE.mjs": [29979, 3781],
        "./common/locales/fr-RW": [42398, 5965],
        "./common/locales/fr-RW.mjs": [42398, 5965],
        "./common/locales/fr-SC": [24202, 8989],
        "./common/locales/fr-SC.mjs": [24202, 8989],
        "./common/locales/fr-SN": [33418, 1620],
        "./common/locales/fr-SN.mjs": [33418, 1620],
        "./common/locales/fr-SY": [86904, 3846],
        "./common/locales/fr-SY.mjs": [86904, 3846],
        "./common/locales/fr-TD": [9129, 8613],
        "./common/locales/fr-TD.mjs": [9129, 8613],
        "./common/locales/fr-TG": [34100, 6327],
        "./common/locales/fr-TG.mjs": [34100, 6327],
        "./common/locales/fr-TN": [8628, 4083],
        "./common/locales/fr-TN.mjs": [8628, 4083],
        "./common/locales/fr-VU": [2469, 2008],
        "./common/locales/fr-VU.mjs": [2469, 2008],
        "./common/locales/fr-WF": [77651, 5455],
        "./common/locales/fr-WF.mjs": [77651, 5455],
        "./common/locales/fr-YT": [2918, 3870],
        "./common/locales/fr-YT.mjs": [2918, 3870],
        "./common/locales/fr.mjs": [11227, 8592],
        "./common/locales/fur": [79960, 5263],
        "./common/locales/fur.mjs": [79960, 5263],
        "./common/locales/fy": [29563, 4903],
        "./common/locales/fy.mjs": [29563, 4903],
        "./common/locales/ga": [67751, 9445],
        "./common/locales/ga.mjs": [67751, 9445],
        "./common/locales/gd": [94407, 5738],
        "./common/locales/gd.mjs": [94407, 5738],
        "./common/locales/gl": [99157, 9411],
        "./common/locales/gl.mjs": [99157, 9411],
        "./common/locales/gsw": [98781, 5328],
        "./common/locales/gsw-FR": [41040, 1418],
        "./common/locales/gsw-FR.mjs": [41040, 1418],
        "./common/locales/gsw-LI": [18513, 641],
        "./common/locales/gsw-LI.mjs": [18513, 641],
        "./common/locales/gsw.mjs": [98781, 5328],
        "./common/locales/gu": [19630, 4206],
        "./common/locales/gu.mjs": [19630, 4206],
        "./common/locales/guz": [58326, 2496],
        "./common/locales/guz.mjs": [58326, 2496],
        "./common/locales/gv": [82162, 3276],
        "./common/locales/gv.mjs": [82162, 3276],
        "./common/locales/ha": [35132, 9858],
        "./common/locales/ha.mjs": [35132, 9858],
        "./common/locales/haw": [15580, 716],
        "./common/locales/haw.mjs": [15580, 716],
        "./common/locales/he": [78287, 4362],
        "./common/locales/he.mjs": [78287, 4362],
        "./common/locales/hi": [96875, 8592],
        "./common/locales/hi.mjs": [96875, 8592],
        "./common/locales/hr": [17698, 6147],
        "./common/locales/hr-BA": [72135, 4803],
        "./common/locales/hr-BA.mjs": [72135, 4803],
        "./common/locales/hr.mjs": [17698, 6147],
        "./common/locales/hsb": [26078, 7273],
        "./common/locales/hsb.mjs": [26078, 7273],
        "./common/locales/hu": [30894, 8592],
        "./common/locales/hu.mjs": [30894, 8592],
        "./common/locales/hy": [92064, 4970],
        "./common/locales/hy.mjs": [92064, 4970],
        "./common/locales/ia": [13892, 4416],
        "./common/locales/ia.mjs": [13892, 4416],
        "./common/locales/id": [73919, 6737],
        "./common/locales/id.mjs": [73919, 6737],
        "./common/locales/ig": [73103, 273],
        "./common/locales/ig.mjs": [73103, 273],
        "./common/locales/ii": [53820, 1071],
        "./common/locales/ii.mjs": [53820, 1071],
        "./common/locales/is": [953, 8592],
        "./common/locales/is.mjs": [953, 8592],
        "./common/locales/it": [91974, 8592],
        "./common/locales/it-CH": [12689, 1283],
        "./common/locales/it-CH.mjs": [12689, 1283],
        "./common/locales/it-SM": [77307, 6356],
        "./common/locales/it-SM.mjs": [77307, 6356],
        "./common/locales/it.mjs": [91974, 8592],
        "./common/locales/ja": [6411, 7406],
        "./common/locales/ja.mjs": [6411, 7406],
        "./common/locales/jgo": [1945, 6082],
        "./common/locales/jgo.mjs": [1945, 6082],
        "./common/locales/jmc": [6574, 2709],
        "./common/locales/jmc.mjs": [6574, 2709],
        "./common/locales/jv": [99160, 6602],
        "./common/locales/jv.mjs": [99160, 6602],
        "./common/locales/ka": [39838, 6167],
        "./common/locales/ka.mjs": [39838, 6167],
        "./common/locales/kab": [16895, 8715],
        "./common/locales/kab.mjs": [16895, 8715],
        "./common/locales/kam": [21409, 1702],
        "./common/locales/kam.mjs": [21409, 1702],
        "./common/locales/kde": [43050, 4962],
        "./common/locales/kde.mjs": [43050, 4962],
        "./common/locales/kea": [97857, 9007],
        "./common/locales/kea.mjs": [97857, 9007],
        "./common/locales/khq": [27241, 5246],
        "./common/locales/khq.mjs": [27241, 5246],
        "./common/locales/ki": [66916, 3427],
        "./common/locales/ki.mjs": [66916, 3427],
        "./common/locales/kk": [94413, 5555],
        "./common/locales/kk.mjs": [94413, 5555],
        "./common/locales/kkj": [55630, 8200],
        "./common/locales/kkj.mjs": [55630, 8200],
        "./common/locales/kl": [11091, 4654],
        "./common/locales/kl.mjs": [11091, 4654],
        "./common/locales/kln": [39941, 817],
        "./common/locales/kln.mjs": [39941, 817],
        "./common/locales/km": [56621, 2026],
        "./common/locales/km.mjs": [56621, 2026],
        "./common/locales/kn": [2961, 7763],
        "./common/locales/kn.mjs": [2961, 7763],
        "./common/locales/ko": [66803, 6813],
        "./common/locales/ko-KP": [65455, 2860],
        "./common/locales/ko-KP.mjs": [65455, 2860],
        "./common/locales/ko.mjs": [66803, 6813],
        "./common/locales/kok": [3723, 3522],
        "./common/locales/kok.mjs": [3723, 3522],
        "./common/locales/ks": [60844, 6589],
        "./common/locales/ks-Arab": [98575, 9830],
        "./common/locales/ks-Arab.mjs": [98575, 9830],
        "./common/locales/ks-Deva": [69768, 6948],
        "./common/locales/ks-Deva.mjs": [69768, 6948],
        "./common/locales/ks.mjs": [60844, 6589],
        "./common/locales/ksb": [41089, 8297],
        "./common/locales/ksb.mjs": [41089, 8297],
        "./common/locales/ksf": [82239, 5411],
        "./common/locales/ksf.mjs": [82239, 5411],
        "./common/locales/ksh": [42566, 225],
        "./common/locales/ksh.mjs": [42566, 225],
        "./common/locales/ku": [86661, 2032],
        "./common/locales/ku.mjs": [86661, 2032],
        "./common/locales/kw": [15126, 5920],
        "./common/locales/kw.mjs": [15126, 5920],
        "./common/locales/ky": [65799, 75],
        "./common/locales/ky.mjs": [65799, 75],
        "./common/locales/lag": [83053, 5825],
        "./common/locales/lag.mjs": [83053, 5825],
        "./common/locales/lb": [36597, 1765],
        "./common/locales/lb.mjs": [36597, 1765],
        "./common/locales/lg": [65753, 7797],
        "./common/locales/lg.mjs": [65753, 7797],
        "./common/locales/lkt": [5940, 6164],
        "./common/locales/lkt.mjs": [5940, 6164],
        "./common/locales/ln": [29819, 9015],
        "./common/locales/ln-AO": [89262, 1915],
        "./common/locales/ln-AO.mjs": [89262, 1915],
        "./common/locales/ln-CF": [43243, 1695],
        "./common/locales/ln-CF.mjs": [43243, 1695],
        "./common/locales/ln-CG": [53176, 666],
        "./common/locales/ln-CG.mjs": [53176, 666],
        "./common/locales/ln.mjs": [29819, 9015],
        "./common/locales/lo": [47772, 5817],
        "./common/locales/lo.mjs": [47772, 5817],
        "./common/locales/lrc": [95934, 4546],
        "./common/locales/lrc-IQ": [23616, 1069],
        "./common/locales/lrc-IQ.mjs": [23616, 1069],
        "./common/locales/lrc.mjs": [95934, 4546],
        "./common/locales/lt": [52699, 6013],
        "./common/locales/lt.mjs": [52699, 6013],
        "./common/locales/lu": [41984, 918],
        "./common/locales/lu.mjs": [41984, 918],
        "./common/locales/luo": [16826, 3305],
        "./common/locales/luo.mjs": [16826, 3305],
        "./common/locales/luy": [74286, 9214],
        "./common/locales/luy.mjs": [74286, 9214],
        "./common/locales/lv": [92961, 3105],
        "./common/locales/lv.mjs": [92961, 3105],
        "./common/locales/mas": [12914, 3356],
        "./common/locales/mas-TZ": [25461, 2066],
        "./common/locales/mas-TZ.mjs": [25461, 2066],
        "./common/locales/mas.mjs": [12914, 3356],
        "./common/locales/mer": [27606, 7324],
        "./common/locales/mer.mjs": [27606, 7324],
        "./common/locales/mfe": [53243, 9958],
        "./common/locales/mfe.mjs": [53243, 9958],
        "./common/locales/mg": [2020, 5713],
        "./common/locales/mg.mjs": [2020, 5713],
        "./common/locales/mgh": [1646, 9080],
        "./common/locales/mgh.mjs": [1646, 9080],
        "./common/locales/mgo": [80130, 6670],
        "./common/locales/mgo.mjs": [80130, 6670],
        "./common/locales/mi": [99424, 1857],
        "./common/locales/mi.mjs": [99424, 1857],
        "./common/locales/mk": [47025, 4693],
        "./common/locales/mk.mjs": [47025, 4693],
        "./common/locales/ml": [73756, 60],
        "./common/locales/ml.mjs": [73756, 60],
        "./common/locales/mn": [73325, 192],
        "./common/locales/mn.mjs": [73325, 192],
        "./common/locales/mni": [46599, 1317],
        "./common/locales/mni.mjs": [46599, 1317],
        "./common/locales/mr": [49115, 786],
        "./common/locales/mr.mjs": [49115, 786],
        "./common/locales/ms": [65621, 5651],
        "./common/locales/ms-BN": [10612, 3746],
        "./common/locales/ms-BN.mjs": [10612, 3746],
        "./common/locales/ms-SG": [83485, 2497],
        "./common/locales/ms-SG.mjs": [83485, 2497],
        "./common/locales/ms.mjs": [65621, 5651],
        "./common/locales/mt": [79570, 709],
        "./common/locales/mt.mjs": [79570, 709],
        "./common/locales/mua": [47995, 5719],
        "./common/locales/mua.mjs": [47995, 5719],
        "./common/locales/my": [94848, 5159],
        "./common/locales/my.mjs": [94848, 5159],
        "./common/locales/mzn": [69037, 6730],
        "./common/locales/mzn.mjs": [69037, 6730],
        "./common/locales/naq": [68055, 1228],
        "./common/locales/naq.mjs": [68055, 1228],
        "./common/locales/nb": [31194, 2188],
        "./common/locales/nb-SJ": [16920, 74],
        "./common/locales/nb-SJ.mjs": [16920, 74],
        "./common/locales/nb.mjs": [31194, 2188],
        "./common/locales/nd": [94065, 1912],
        "./common/locales/nd.mjs": [94065, 1912],
        "./common/locales/ne": [918, 5230],
        "./common/locales/ne-IN": [8908, 8018],
        "./common/locales/ne-IN.mjs": [8908, 8018],
        "./common/locales/ne.mjs": [918, 5230],
        "./common/locales/nl": [83622, 5871],
        "./common/locales/nl-AW": [2855, 4746],
        "./common/locales/nl-AW.mjs": [2855, 4746],
        "./common/locales/nl-BE": [13646, 3713],
        "./common/locales/nl-BE.mjs": [13646, 3713],
        "./common/locales/nl-BQ": [52901, 3896],
        "./common/locales/nl-BQ.mjs": [52901, 3896],
        "./common/locales/nl-CW": [99770, 9975],
        "./common/locales/nl-CW.mjs": [99770, 9975],
        "./common/locales/nl-SR": [86263, 5180],
        "./common/locales/nl-SR.mjs": [86263, 5180],
        "./common/locales/nl-SX": [59679, 4197],
        "./common/locales/nl-SX.mjs": [59679, 4197],
        "./common/locales/nl.mjs": [83622, 5871],
        "./common/locales/nmg": [72875, 6987],
        "./common/locales/nmg.mjs": [72875, 6987],
        "./common/locales/nn": [27110, 9079],
        "./common/locales/nn.mjs": [27110, 9079],
        "./common/locales/nnh": [67754, 9102],
        "./common/locales/nnh.mjs": [67754, 9102],
        "./common/locales/no": [24696, 5675],
        "./common/locales/no.mjs": [24696, 5675],
        "./common/locales/nus": [11448, 6571],
        "./common/locales/nus.mjs": [11448, 6571],
        "./common/locales/nyn": [34933, 4082],
        "./common/locales/nyn.mjs": [34933, 4082],
        "./common/locales/om": [58893, 279],
        "./common/locales/om-KE": [60801, 1802],
        "./common/locales/om-KE.mjs": [60801, 1802],
        "./common/locales/om.mjs": [58893, 279],
        "./common/locales/or": [1752, 6394],
        "./common/locales/or.mjs": [1752, 6394],
        "./common/locales/os": [386, 9367],
        "./common/locales/os-RU": [12989, 9697],
        "./common/locales/os-RU.mjs": [12989, 9697],
        "./common/locales/os.mjs": [386, 9367],
        "./common/locales/pa": [97677, 4739],
        "./common/locales/pa-Arab": [67274, 213],
        "./common/locales/pa-Arab.mjs": [67274, 213],
        "./common/locales/pa.mjs": [97677, 4739],
        "./common/locales/pl": [35850, 9160],
        "./common/locales/pl.mjs": [35850, 9160],
        "./common/locales/ps": [37769, 9709],
        "./common/locales/ps.mjs": [37769, 9709],
        "./common/locales/pt": [23670, 8592],
        "./common/locales/pt-AO": [10427, 2794],
        "./common/locales/pt-AO.mjs": [10427, 2794],
        "./common/locales/pt-CV": [33420, 9560],
        "./common/locales/pt-CV.mjs": [33420, 9560],
        "./common/locales/pt-GW": [36983, 5859],
        "./common/locales/pt-GW.mjs": [36983, 5859],
        "./common/locales/pt-MO": [84838, 9251],
        "./common/locales/pt-MO.mjs": [84838, 9251],
        "./common/locales/pt-MZ": [81289, 2921],
        "./common/locales/pt-MZ.mjs": [81289, 2921],
        "./common/locales/pt-PT": [12719, 489],
        "./common/locales/pt-PT.mjs": [12719, 489],
        "./common/locales/pt-ST": [99311, 377],
        "./common/locales/pt-ST.mjs": [99311, 377],
        "./common/locales/pt-TL": [72715, 9324],
        "./common/locales/pt-TL.mjs": [72715, 9324],
        "./common/locales/pt.mjs": [23670, 8592],
        "./common/locales/rm": [88046, 6694],
        "./common/locales/rm.mjs": [88046, 6694],
        "./common/locales/rn": [14134, 8674],
        "./common/locales/rn.mjs": [14134, 8674],
        "./common/locales/ro": [83270, 8592],
        "./common/locales/ro-MD": [60233, 4749],
        "./common/locales/ro-MD.mjs": [60233, 4749],
        "./common/locales/ro.mjs": [83270, 8592],
        "./common/locales/rof": [3732, 5669],
        "./common/locales/rof.mjs": [3732, 5669],
        "./common/locales/ru": [78512, 8592],
        "./common/locales/ru-BY": [36778, 2494],
        "./common/locales/ru-BY.mjs": [36778, 2494],
        "./common/locales/ru-KG": [52838, 6891],
        "./common/locales/ru-KG.mjs": [52838, 6891],
        "./common/locales/ru-KZ": [85229, 9415],
        "./common/locales/ru-KZ.mjs": [85229, 9415],
        "./common/locales/ru-MD": [75919, 7812],
        "./common/locales/ru-MD.mjs": [75919, 7812],
        "./common/locales/ru-UA": [57621, 4288],
        "./common/locales/ru-UA.mjs": [57621, 4288],
        "./common/locales/ru.mjs": [78512, 8592],
        "./common/locales/rw": [20423, 2499],
        "./common/locales/rw.mjs": [20423, 2499],
        "./common/locales/rwk": [28577, 1225],
        "./common/locales/rwk.mjs": [28577, 1225],
        "./common/locales/sa": [56956, 3563],
        "./common/locales/sa.mjs": [56956, 3563],
        "./common/locales/sah": [73994, 3611],
        "./common/locales/sah.mjs": [73994, 3611],
        "./common/locales/saq": [34027, 3290],
        "./common/locales/saq.mjs": [34027, 3290],
        "./common/locales/sbp": [81107, 3150],
        "./common/locales/sbp.mjs": [81107, 3150],
        "./common/locales/sd": [47386, 106],
        "./common/locales/sd-Arab": [14577, 6976],
        "./common/locales/sd-Arab.mjs": [14577, 6976],
        "./common/locales/sd-Deva": [80594, 7053],
        "./common/locales/sd-Deva.mjs": [80594, 7053],
        "./common/locales/sd.mjs": [47386, 106],
        "./common/locales/se": [25716, 8497],
        "./common/locales/se-FI": [94733, 9921],
        "./common/locales/se-FI.mjs": [94733, 9921],
        "./common/locales/se-SE": [13392, 5183],
        "./common/locales/se-SE.mjs": [13392, 5183],
        "./common/locales/se.mjs": [25716, 8497],
        "./common/locales/seh": [98509, 562],
        "./common/locales/seh.mjs": [98509, 562],
        "./common/locales/ses": [98158, 4864],
        "./common/locales/ses.mjs": [98158, 4864],
        "./common/locales/sg": [16496, 3817],
        "./common/locales/sg.mjs": [16496, 3817],
        "./common/locales/shi": [81731, 8698],
        "./common/locales/shi-Latn": [3870, 7411],
        "./common/locales/shi-Latn.mjs": [3870, 7411],
        "./common/locales/shi-Tfng": [62360, 9747],
        "./common/locales/shi-Tfng.mjs": [62360, 9747],
        "./common/locales/shi.mjs": [81731, 8698],
        "./common/locales/si": [6330, 5767],
        "./common/locales/si.mjs": [6330, 5767],
        "./common/locales/sk": [27776, 8592],
        "./common/locales/sk.mjs": [27776, 8592],
        "./common/locales/sl": [66580, 8592],
        "./common/locales/sl.mjs": [66580, 8592],
        "./common/locales/smn": [11855, 9959],
        "./common/locales/smn.mjs": [11855, 9959],
        "./common/locales/sn": [40354, 7922],
        "./common/locales/sn.mjs": [40354, 7922],
        "./common/locales/so": [87508, 1843],
        "./common/locales/so-DJ": [94953, 7175],
        "./common/locales/so-DJ.mjs": [94953, 7175],
        "./common/locales/so-ET": [86526, 5349],
        "./common/locales/so-ET.mjs": [86526, 5349],
        "./common/locales/so-KE": [43119, 2373],
        "./common/locales/so-KE.mjs": [43119, 2373],
        "./common/locales/so.mjs": [87508, 1843],
        "./common/locales/sq": [43811, 959],
        "./common/locales/sq-MK": [47969, 602],
        "./common/locales/sq-MK.mjs": [47969, 602],
        "./common/locales/sq-XK": [58498, 389],
        "./common/locales/sq-XK.mjs": [58498, 389],
        "./common/locales/sq.mjs": [43811, 959],
        "./common/locales/sr": [36936, 5374],
        "./common/locales/sr-Cyrl": [97809, 8841],
        "./common/locales/sr-Cyrl-BA": [48935, 275],
        "./common/locales/sr-Cyrl-BA.mjs": [48935, 275],
        "./common/locales/sr-Cyrl-ME": [73833, 3790],
        "./common/locales/sr-Cyrl-ME.mjs": [73833, 3790],
        "./common/locales/sr-Cyrl-XK": [68974, 8472],
        "./common/locales/sr-Cyrl-XK.mjs": [68974, 8472],
        "./common/locales/sr-Cyrl.mjs": [97809, 8841],
        "./common/locales/sr-Latn": [65019, 868],
        "./common/locales/sr-Latn-BA": [51483, 9935],
        "./common/locales/sr-Latn-BA.mjs": [51483, 9935],
        "./common/locales/sr-Latn-ME": [10249, 312],
        "./common/locales/sr-Latn-ME.mjs": [10249, 312],
        "./common/locales/sr-Latn-XK": [35976, 5068],
        "./common/locales/sr-Latn-XK.mjs": [35976, 5068],
        "./common/locales/sr-Latn.mjs": [65019, 868],
        "./common/locales/sr.mjs": [36936, 5374],
        "./common/locales/sv": [39851, 7706],
        "./common/locales/sv-AX": [49436, 768],
        "./common/locales/sv-AX.mjs": [49436, 768],
        "./common/locales/sv-FI": [8082, 5818],
        "./common/locales/sv-FI.mjs": [8082, 5818],
        "./common/locales/sv.mjs": [39851, 7706],
        "./common/locales/sw": [56506, 405],
        "./common/locales/sw-CD": [85664, 2443],
        "./common/locales/sw-CD.mjs": [85664, 2443],
        "./common/locales/sw-KE": [17866, 7450],
        "./common/locales/sw-KE.mjs": [17866, 7450],
        "./common/locales/sw-UG": [466, 2752],
        "./common/locales/sw-UG.mjs": [466, 2752],
        "./common/locales/sw.mjs": [56506, 405],
        "./common/locales/ta": [65323, 2252],
        "./common/locales/ta-LK": [42502, 1438],
        "./common/locales/ta-LK.mjs": [42502, 1438],
        "./common/locales/ta-MY": [77969, 7612],
        "./common/locales/ta-MY.mjs": [77969, 7612],
        "./common/locales/ta-SG": [88279, 4237],
        "./common/locales/ta-SG.mjs": [88279, 4237],
        "./common/locales/ta.mjs": [65323, 2252],
        "./common/locales/te": [86612, 4332],
        "./common/locales/te.mjs": [86612, 4332],
        "./common/locales/teo": [78529, 7617],
        "./common/locales/teo-KE": [89999, 2223],
        "./common/locales/teo-KE.mjs": [89999, 2223],
        "./common/locales/teo.mjs": [78529, 7617],
        "./common/locales/tg": [62306, 6005],
        "./common/locales/tg.mjs": [62306, 6005],
        "./common/locales/th": [41898, 4991],
        "./common/locales/th.mjs": [41898, 4991],
        "./common/locales/ti": [71694, 6256],
        "./common/locales/ti-ER": [54356, 5653],
        "./common/locales/ti-ER.mjs": [54356, 5653],
        "./common/locales/ti.mjs": [71694, 6256],
        "./common/locales/tk": [76712, 4572],
        "./common/locales/tk.mjs": [76712, 4572],
        "./common/locales/to": [4323, 6183],
        "./common/locales/to.mjs": [4323, 6183],
        "./common/locales/tr": [32231, 8592],
        "./common/locales/tr-CY": [71555, 3466],
        "./common/locales/tr-CY.mjs": [71555, 3466],
        "./common/locales/tr.mjs": [32231, 8592],
        "./common/locales/tt": [93942, 644],
        "./common/locales/tt.mjs": [93942, 644],
        "./common/locales/twq": [99315, 5304],
        "./common/locales/twq.mjs": [99315, 5304],
        "./common/locales/tzm": [19650, 3141],
        "./common/locales/tzm.mjs": [19650, 3141],
        "./common/locales/ug": [80360, 900],
        "./common/locales/ug.mjs": [80360, 900],
        "./common/locales/uk": [34476, 4820],
        "./common/locales/uk.mjs": [34476, 4820],
        "./common/locales/ur": [45091, 8309],
        "./common/locales/ur-IN": [56980, 7472],
        "./common/locales/ur-IN.mjs": [56980, 7472],
        "./common/locales/ur.mjs": [45091, 8309],
        "./common/locales/uz": [59096, 4840],
        "./common/locales/uz-Arab": [74019, 5834],
        "./common/locales/uz-Arab.mjs": [74019, 5834],
        "./common/locales/uz-Cyrl": [46678, 5972],
        "./common/locales/uz-Cyrl.mjs": [46678, 5972],
        "./common/locales/uz-Latn": [80993, 9654],
        "./common/locales/uz-Latn.mjs": [80993, 9654],
        "./common/locales/uz.mjs": [59096, 4840],
        "./common/locales/vai": [81101, 9025],
        "./common/locales/vai-Latn": [74159, 7729],
        "./common/locales/vai-Latn.mjs": [74159, 7729],
        "./common/locales/vai-Vaii": [2456, 5909],
        "./common/locales/vai-Vaii.mjs": [2456, 5909],
        "./common/locales/vai.mjs": [81101, 9025],
        "./common/locales/vi": [79747, 1092],
        "./common/locales/vi.mjs": [79747, 1092],
        "./common/locales/vun": [29662, 8317],
        "./common/locales/vun.mjs": [29662, 8317],
        "./common/locales/wae": [11592, 7062],
        "./common/locales/wae.mjs": [11592, 7062],
        "./common/locales/wo": [88269, 3389],
        "./common/locales/wo.mjs": [88269, 3389],
        "./common/locales/xh": [61229, 6016],
        "./common/locales/xh.mjs": [61229, 6016],
        "./common/locales/xog": [75680, 431],
        "./common/locales/xog.mjs": [75680, 431],
        "./common/locales/yav": [49349, 2169],
        "./common/locales/yav.mjs": [49349, 2169],
        "./common/locales/yi": [98776, 8896],
        "./common/locales/yi.mjs": [98776, 8896],
        "./common/locales/yo": [9700, 5055],
        "./common/locales/yo-BJ": [29351, 6441],
        "./common/locales/yo-BJ.mjs": [29351, 6441],
        "./common/locales/yo.mjs": [9700, 5055],
        "./common/locales/zgh": [84705, 5609],
        "./common/locales/zgh.mjs": [84705, 5609],
        "./common/locales/zh": [42507, 9153],
        "./common/locales/zh-Hans": [71552, 8592],
        "./common/locales/zh-Hans-HK": [73405, 4871],
        "./common/locales/zh-Hans-HK.mjs": [73405, 4871],
        "./common/locales/zh-Hans-MO": [15091, 901],
        "./common/locales/zh-Hans-MO.mjs": [15091, 901],
        "./common/locales/zh-Hans.mjs": [71552, 8592],
        "./common/locales/zh-Hant": [74039, 8592],
        "./common/locales/zh-Hant.mjs": [74039, 8592],
        "./common/locales/zh.mjs": [42507, 9153],
        "./common/locales/zu": [9196, 4143],
        "./common/locales/zu.mjs": [9196, 4143],
      };
      function _t(Ht) {
        if (!Ot.o(H, Ht))
          return Promise.resolve().then(() => {
            var Wo = new Error("Cannot find module '" + Ht + "'");
            throw ((Wo.code = "MODULE_NOT_FOUND"), Wo);
          });
        var wt = H[Ht],
          Me = wt[0];
        return Ot.e(wt[1]).then(() => Ot(Me));
      }
      (_t.keys = () => Object.keys(H)), (_t.id = 32193), (tr.exports = _t);
    },
  },
  (tr) => {
    tr((tr.s = 88286));
  },
]);
