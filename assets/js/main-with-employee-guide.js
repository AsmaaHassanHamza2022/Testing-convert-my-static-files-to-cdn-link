var Cw = Object.defineProperty,
  ww = Object.defineProperties;
var Dw = Object.getOwnPropertyDescriptors;
var Km = Object.getOwnPropertySymbols;
var Ew = Object.prototype.hasOwnProperty,
  Mw = Object.prototype.propertyIsEnumerable;
var Jm = (e, n, t) =>
    n in e
      ? Cw(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (e[n] = t),
  j = (e, n) => {
    for (var t in (n ||= {})) Ew.call(n, t) && Jm(e, t, n[t]);
    if (Km) for (var t of Km(n)) Mw.call(n, t) && Jm(e, t, n[t]);
    return e;
  },
  Pe = (e, n) => ww(e, Dw(n));
var Qs = (e, n, t) =>
  new Promise((i, r) => {
    var o = (l) => {
        try {
          a(t.next(l));
        } catch (c) {
          r(c);
        }
      },
      s = (l) => {
        try {
          a(t.throw(l));
        } catch (c) {
          r(c);
        }
      },
      a = (l) => (l.done ? i(l.value) : Promise.resolve(l.value).then(o, s));
    a((t = t.apply(e, n)).next());
  });
function Xm(e, n) {
  return Object.is(e, n);
}
var Nt = null,
  Rl = !1,
  kl = 1,
  Pi = Symbol("SIGNAL");
function Ge(e) {
  let n = Nt;
  return (Nt = e), n;
}
function e_() {
  return Nt;
}
var Js = {
  version: 0,
  lastCleanEpoch: 0,
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
  consumerOnSignalRead: () => {},
};
function af(e) {
  if (Rl) throw new Error("");
  if (Nt === null) return;
  Nt.consumerOnSignalRead(e);
  let n = Nt.nextProducerIndex++;
  if (
    (jl(Nt), n < Nt.producerNode.length && Nt.producerNode[n] !== e && Ks(Nt))
  ) {
    let t = Nt.producerNode[n];
    Vl(t, Nt.producerIndexOfThis[n]);
  }
  Nt.producerNode[n] !== e &&
    ((Nt.producerNode[n] = e),
    (Nt.producerIndexOfThis[n] = Ks(Nt) ? r_(e, Nt, n) : 0)),
    (Nt.producerLastReadVersion[n] = e.version);
}
function Iw() {
  kl++;
}
function t_(e) {
  if (!(Ks(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === kl)) {
    if (!e.producerMustRecompute(e) && !cf(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = kl);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = kl);
  }
}
function n_(e) {
  if (e.liveConsumerNode === void 0) return;
  let n = Rl;
  Rl = !0;
  try {
    for (let t of e.liveConsumerNode) t.dirty || Tw(t);
  } finally {
    Rl = n;
  }
}
function i_() {
  return Nt?.consumerAllowSignalWrites !== !1;
}
function Tw(e) {
  (e.dirty = !0), n_(e), e.consumerMarkedDirty?.(e);
}
function Ll(e) {
  return e && (e.nextProducerIndex = 0), Ge(e);
}
function lf(e, n) {
  if (
    (Ge(n),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (Ks(e))
      for (let t = e.nextProducerIndex; t < e.producerNode.length; t++)
        Vl(e.producerNode[t], e.producerIndexOfThis[t]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function cf(e) {
  jl(e);
  for (let n = 0; n < e.producerNode.length; n++) {
    let t = e.producerNode[n],
      i = e.producerLastReadVersion[n];
    if (i !== t.version || (t_(t), i !== t.version)) return !0;
  }
  return !1;
}
function uf(e) {
  if ((jl(e), Ks(e)))
    for (let n = 0; n < e.producerNode.length; n++)
      Vl(e.producerNode[n], e.producerIndexOfThis[n]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function r_(e, n, t) {
  if ((o_(e), e.liveConsumerNode.length === 0 && s_(e)))
    for (let i = 0; i < e.producerNode.length; i++)
      e.producerIndexOfThis[i] = r_(e.producerNode[i], e, i);
  return e.liveConsumerIndexOfThis.push(t), e.liveConsumerNode.push(n) - 1;
}
function Vl(e, n) {
  if ((o_(e), e.liveConsumerNode.length === 1 && s_(e)))
    for (let i = 0; i < e.producerNode.length; i++)
      Vl(e.producerNode[i], e.producerIndexOfThis[i]);
  let t = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[n] = e.liveConsumerNode[t]),
    (e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    n < e.liveConsumerNode.length)
  ) {
    let i = e.liveConsumerIndexOfThis[n],
      r = e.liveConsumerNode[n];
    jl(r), (r.producerIndexOfThis[i] = n);
  }
}
function Ks(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function jl(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function o_(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function s_(e) {
  return e.producerNode !== void 0;
}
function a_(e) {
  let n = Object.create(Sw);
  n.computation = e;
  let t = () => {
    if ((t_(n), af(n), n.value === Fl)) throw n.error;
    return n.value;
  };
  return (t[Pi] = n), t;
}
var of = Symbol("UNSET"),
  sf = Symbol("COMPUTING"),
  Fl = Symbol("ERRORED"),
  Sw = Pe(j({}, Js), {
    value: of,
    dirty: !0,
    error: null,
    equal: Xm,
    producerMustRecompute(e) {
      return e.value === of || e.value === sf;
    },
    producerRecomputeValue(e) {
      if (e.value === sf) throw new Error("Detected cycle in computations.");
      let n = e.value;
      e.value = sf;
      let t = Ll(e),
        i;
      try {
        i = e.computation();
      } catch (r) {
        (i = Fl), (e.error = r);
      } finally {
        lf(e, t);
      }
      if (n !== of && n !== Fl && i !== Fl && e.equal(n, i)) {
        e.value = n;
        return;
      }
      (e.value = i), e.version++;
    },
  });
function xw() {
  throw new Error();
}
var l_ = xw;
function c_() {
  l_();
}
function u_(e) {
  l_ = e;
}
var Ow = null;
function d_(e) {
  let n = Object.create(h_);
  n.value = e;
  let t = () => (af(n), n.value);
  return (t[Pi] = n), t;
}
function df(e, n) {
  i_() || c_(), e.equal(e.value, n) || ((e.value = n), Nw(e));
}
function f_(e, n) {
  i_() || c_(), df(e, n(e.value));
}
var h_ = Pe(j({}, Js), { equal: Xm, value: void 0 });
function Nw(e) {
  e.version++, Iw(), n_(e), Ow?.();
}
function be(e) {
  return typeof e == "function";
}
function Fo(e) {
  let t = e((i) => {
    Error.call(i), (i.stack = new Error().stack);
  });
  return (
    (t.prototype = Object.create(Error.prototype)),
    (t.prototype.constructor = t),
    t
  );
}
var Bl = Fo(
  (e) =>
    function (t) {
      e(this),
        (this.message = t
          ? `${t.length} errors occurred during unsubscription:
${t.map((i, r) => `${r + 1}) ${i.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = t);
    }
);
function Wr(e, n) {
  if (e) {
    let t = e.indexOf(n);
    0 <= t && e.splice(t, 1);
  }
}
var nt = class e {
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
      let { _parentage: t } = this;
      if (t)
        if (((this._parentage = null), Array.isArray(t)))
          for (let o of t) o.remove(this);
        else t.remove(this);
      let { initialTeardown: i } = this;
      if (be(i))
        try {
          i();
        } catch (o) {
          n = o instanceof Bl ? o.errors : [o];
        }
      let { _finalizers: r } = this;
      if (r) {
        this._finalizers = null;
        for (let o of r)
          try {
            p_(o);
          } catch (s) {
            (n = n ?? []),
              s instanceof Bl ? (n = [...n, ...s.errors]) : n.push(s);
          }
      }
      if (n) throw new Bl(n);
    }
  }
  add(n) {
    var t;
    if (n && n !== this)
      if (this.closed) p_(n);
      else {
        if (n instanceof e) {
          if (n.closed || n._hasParent(this)) return;
          n._addParent(this);
        }
        (this._finalizers =
          (t = this._finalizers) !== null && t !== void 0 ? t : []).push(n);
      }
  }
  _hasParent(n) {
    let { _parentage: t } = this;
    return t === n || (Array.isArray(t) && t.includes(n));
  }
  _addParent(n) {
    let { _parentage: t } = this;
    this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
  }
  _removeParent(n) {
    let { _parentage: t } = this;
    t === n ? (this._parentage = null) : Array.isArray(t) && Wr(t, n);
  }
  remove(n) {
    let { _finalizers: t } = this;
    t && Wr(t, n), n instanceof e && n._removeParent(this);
  }
};
nt.EMPTY = (() => {
  let e = new nt();
  return (e.closed = !0), e;
})();
var ff = nt.EMPTY;
function Hl(e) {
  return (
    e instanceof nt ||
    (e && "closed" in e && be(e.remove) && be(e.add) && be(e.unsubscribe))
  );
}
function p_(e) {
  be(e) ? e() : e.unsubscribe();
}
var zn = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Lo = {
  setTimeout(e, n, ...t) {
    let { delegate: i } = Lo;
    return i?.setTimeout ? i.setTimeout(e, n, ...t) : setTimeout(e, n, ...t);
  },
  clearTimeout(e) {
    let { delegate: n } = Lo;
    return (n?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function Ul(e) {
  Lo.setTimeout(() => {
    let { onUnhandledError: n } = zn;
    if (n) n(e);
    else throw e;
  });
}
function Ai() {}
var g_ = hf("C", void 0, void 0);
function m_(e) {
  return hf("E", void 0, e);
}
function __(e) {
  return hf("N", e, void 0);
}
function hf(e, n, t) {
  return { kind: e, value: n, error: t };
}
var qr = null;
function Vo(e) {
  if (zn.useDeprecatedSynchronousErrorHandling) {
    let n = !qr;
    if ((n && (qr = { errorThrown: !1, error: null }), e(), n)) {
      let { errorThrown: t, error: i } = qr;
      if (((qr = null), t)) throw i;
    }
  } else e();
}
function v_(e) {
  zn.useDeprecatedSynchronousErrorHandling &&
    qr &&
    ((qr.errorThrown = !0), (qr.error = e));
}
var Zr = class extends nt {
    constructor(n) {
      super(),
        (this.isStopped = !1),
        n
          ? ((this.destination = n), Hl(n) && n.add(this))
          : (this.destination = Rw);
    }
    static create(n, t, i) {
      return new Ri(n, t, i);
    }
    next(n) {
      this.isStopped ? gf(__(n), this) : this._next(n);
    }
    error(n) {
      this.isStopped
        ? gf(m_(n), this)
        : ((this.isStopped = !0), this._error(n));
    }
    complete() {
      this.isStopped ? gf(g_, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
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
  },
  Pw = Function.prototype.bind;
function pf(e, n) {
  return Pw.call(e, n);
}
var mf = class {
    constructor(n) {
      this.partialObserver = n;
    }
    next(n) {
      let { partialObserver: t } = this;
      if (t.next)
        try {
          t.next(n);
        } catch (i) {
          $l(i);
        }
    }
    error(n) {
      let { partialObserver: t } = this;
      if (t.error)
        try {
          t.error(n);
        } catch (i) {
          $l(i);
        }
      else $l(n);
    }
    complete() {
      let { partialObserver: n } = this;
      if (n.complete)
        try {
          n.complete();
        } catch (t) {
          $l(t);
        }
    }
  },
  Ri = class extends Zr {
    constructor(n, t, i) {
      super();
      let r;
      if (be(n) || !n)
        r = { next: n ?? void 0, error: t ?? void 0, complete: i ?? void 0 };
      else {
        let o;
        this && zn.useDeprecatedNextContext
          ? ((o = Object.create(n)),
            (o.unsubscribe = () => this.unsubscribe()),
            (r = {
              next: n.next && pf(n.next, o),
              error: n.error && pf(n.error, o),
              complete: n.complete && pf(n.complete, o),
            }))
          : (r = n);
      }
      this.destination = new mf(r);
    }
  };
function $l(e) {
  zn.useDeprecatedSynchronousErrorHandling ? v_(e) : Ul(e);
}
function Aw(e) {
  throw e;
}
function gf(e, n) {
  let { onStoppedNotification: t } = zn;
  t && Lo.setTimeout(() => t(e, n));
}
var Rw = { closed: !0, next: Ai, error: Aw, complete: Ai };
var jo = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function Gt(e) {
  return e;
}
function _f(...e) {
  return vf(e);
}
function vf(e) {
  return e.length === 0
    ? Gt
    : e.length === 1
    ? e[0]
    : function (t) {
        return e.reduce((i, r) => r(i), t);
      };
}
var Me = (() => {
  class e {
    constructor(t) {
      t && (this._subscribe = t);
    }
    lift(t) {
      let i = new e();
      return (i.source = this), (i.operator = t), i;
    }
    subscribe(t, i, r) {
      let o = Fw(t) ? t : new Ri(t, i, r);
      return (
        Vo(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(t) {
      try {
        return this._subscribe(t);
      } catch (i) {
        t.error(i);
      }
    }
    forEach(t, i) {
      return (
        (i = y_(i)),
        new i((r, o) => {
          let s = new Ri({
            next: (a) => {
              try {
                t(a);
              } catch (l) {
                o(l), s.unsubscribe();
              }
            },
            error: o,
            complete: r,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(t) {
      var i;
      return (i = this.source) === null || i === void 0
        ? void 0
        : i.subscribe(t);
    }
    [jo]() {
      return this;
    }
    pipe(...t) {
      return vf(t)(this);
    }
    toPromise(t) {
      return (
        (t = y_(t)),
        new t((i, r) => {
          let o;
          this.subscribe(
            (s) => (o = s),
            (s) => r(s),
            () => i(o)
          );
        })
      );
    }
  }
  return (e.create = (n) => new e(n)), e;
})();
function y_(e) {
  var n;
  return (n = e ?? zn.Promise) !== null && n !== void 0 ? n : Promise;
}
function kw(e) {
  return e && be(e.next) && be(e.error) && be(e.complete);
}
function Fw(e) {
  return (e && e instanceof Zr) || (kw(e) && Hl(e));
}
function yf(e) {
  return be(e?.lift);
}
function Ie(e) {
  return (n) => {
    if (yf(n))
      return n.lift(function (t) {
        try {
          return e(t, this);
        } catch (i) {
          this.error(i);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function we(e, n, t, i, r) {
  return new bf(e, n, t, i, r);
}
var bf = class extends Zr {
  constructor(n, t, i, r, o, s) {
    super(n),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = t
        ? function (a) {
            try {
              t(a);
            } catch (l) {
              n.error(l);
            }
          }
        : super._next),
      (this._error = r
        ? function (a) {
            try {
              r(a);
            } catch (l) {
              n.error(l);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = i
        ? function () {
            try {
              i();
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
      let { closed: t } = this;
      super.unsubscribe(),
        !t && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }
};
function Bo() {
  return Ie((e, n) => {
    let t = null;
    e._refCount++;
    let i = we(n, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        t = null;
        return;
      }
      let r = e._connection,
        o = t;
      (t = null), r && (!o || r === o) && r.unsubscribe(), n.unsubscribe();
    });
    e.subscribe(i), i.closed || (t = e.connect());
  });
}
var gr = class extends Me {
  constructor(n, t) {
    super(),
      (this.source = n),
      (this.subjectFactory = t),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      yf(n) && (this.lift = n.lift);
  }
  _subscribe(n) {
    return this.getSubject().subscribe(n);
  }
  getSubject() {
    let n = this._subject;
    return (
      (!n || n.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: n } = this;
    (this._subject = this._connection = null), n?.unsubscribe();
  }
  connect() {
    let n = this._connection;
    if (!n) {
      n = this._connection = new nt();
      let t = this.getSubject();
      n.add(
        this.source.subscribe(
          we(
            t,
            void 0,
            () => {
              this._teardown(), t.complete();
            },
            (i) => {
              this._teardown(), t.error(i);
            },
            () => this._teardown()
          )
        )
      ),
        n.closed && ((this._connection = null), (n = nt.EMPTY));
    }
    return n;
  }
  refCount() {
    return Bo()(this);
  }
};
var Ho = {
  schedule(e) {
    let n = requestAnimationFrame,
      t = cancelAnimationFrame,
      { delegate: i } = Ho;
    i && ((n = i.requestAnimationFrame), (t = i.cancelAnimationFrame));
    let r = n((o) => {
      (t = void 0), e(o);
    });
    return new nt(() => t?.(r));
  },
  requestAnimationFrame(...e) {
    let { delegate: n } = Ho;
    return (n?.requestAnimationFrame || requestAnimationFrame)(...e);
  },
  cancelAnimationFrame(...e) {
    let { delegate: n } = Ho;
    return (n?.cancelAnimationFrame || cancelAnimationFrame)(...e);
  },
  delegate: void 0,
};
var b_ = Fo(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var He = (() => {
    class e extends Me {
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
        let i = new zl(this, this);
        return (i.operator = t), i;
      }
      _throwIfClosed() {
        if (this.closed) throw new b_();
      }
      next(t) {
        Vo(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let i of this.currentObservers) i.next(t);
          }
        });
      }
      error(t) {
        Vo(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = t);
            let { observers: i } = this;
            for (; i.length; ) i.shift().error(t);
          }
        });
      }
      complete() {
        Vo(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: t } = this;
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
          ((t = this.observers) === null || t === void 0 ? void 0 : t.length) >
          0
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
        let { hasError: i, isStopped: r, observers: o } = this;
        return i || r
          ? ff
          : ((this.currentObservers = null),
            o.push(t),
            new nt(() => {
              (this.currentObservers = null), Wr(o, t);
            }));
      }
      _checkFinalizedStatuses(t) {
        let { hasError: i, thrownError: r, isStopped: o } = this;
        i ? t.error(r) : o && t.complete();
      }
      asObservable() {
        let t = new Me();
        return (t.source = this), t;
      }
    }
    return (e.create = (n, t) => new zl(n, t)), e;
  })(),
  zl = class extends He {
    constructor(n, t) {
      super(), (this.destination = n), (this.source = t);
    }
    next(n) {
      var t, i;
      (i =
        (t = this.destination) === null || t === void 0 ? void 0 : t.next) ===
        null ||
        i === void 0 ||
        i.call(t, n);
    }
    error(n) {
      var t, i;
      (i =
        (t = this.destination) === null || t === void 0 ? void 0 : t.error) ===
        null ||
        i === void 0 ||
        i.call(t, n);
    }
    complete() {
      var n, t;
      (t =
        (n = this.destination) === null || n === void 0
          ? void 0
          : n.complete) === null ||
        t === void 0 ||
        t.call(n);
    }
    _subscribe(n) {
      var t, i;
      return (i =
        (t = this.source) === null || t === void 0
          ? void 0
          : t.subscribe(n)) !== null && i !== void 0
        ? i
        : ff;
    }
  };
var Mt = class extends He {
  constructor(n) {
    super(), (this._value = n);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(n) {
    let t = super._subscribe(n);
    return !t.closed && n.next(this._value), t;
  }
  getValue() {
    let { hasError: n, thrownError: t, _value: i } = this;
    if (n) throw t;
    return this._throwIfClosed(), i;
  }
  next(n) {
    super.next((this._value = n));
  }
};
var Xs = {
  now() {
    return (Xs.delegate || Date).now();
  },
  delegate: void 0,
};
var Yr = class extends He {
  constructor(n = 1 / 0, t = 1 / 0, i = Xs) {
    super(),
      (this._bufferSize = n),
      (this._windowTime = t),
      (this._timestampProvider = i),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = t === 1 / 0),
      (this._bufferSize = Math.max(1, n)),
      (this._windowTime = Math.max(1, t));
  }
  next(n) {
    let {
      isStopped: t,
      _buffer: i,
      _infiniteTimeWindow: r,
      _timestampProvider: o,
      _windowTime: s,
    } = this;
    t || (i.push(n), !r && i.push(o.now() + s)),
      this._trimBuffer(),
      super.next(n);
  }
  _subscribe(n) {
    this._throwIfClosed(), this._trimBuffer();
    let t = this._innerSubscribe(n),
      { _infiniteTimeWindow: i, _buffer: r } = this,
      o = r.slice();
    for (let s = 0; s < o.length && !n.closed; s += i ? 1 : 2) n.next(o[s]);
    return this._checkFinalizedStatuses(n), t;
  }
  _trimBuffer() {
    let {
        _bufferSize: n,
        _timestampProvider: t,
        _buffer: i,
        _infiniteTimeWindow: r,
      } = this,
      o = (r ? 1 : 2) * n;
    if ((n < 1 / 0 && o < i.length && i.splice(0, i.length - o), !r)) {
      let s = t.now(),
        a = 0;
      for (let l = 1; l < i.length && i[l] <= s; l += 2) a = l;
      a && i.splice(0, a + 1);
    }
  }
};
var Gl = class extends nt {
  constructor(n, t) {
    super();
  }
  schedule(n, t = 0) {
    return this;
  }
};
var ea = {
  setInterval(e, n, ...t) {
    let { delegate: i } = ea;
    return i?.setInterval ? i.setInterval(e, n, ...t) : setInterval(e, n, ...t);
  },
  clearInterval(e) {
    let { delegate: n } = ea;
    return (n?.clearInterval || clearInterval)(e);
  },
  delegate: void 0,
};
var mr = class extends Gl {
  constructor(n, t) {
    super(n, t), (this.scheduler = n), (this.work = t), (this.pending = !1);
  }
  schedule(n, t = 0) {
    var i;
    if (this.closed) return this;
    this.state = n;
    let r = this.id,
      o = this.scheduler;
    return (
      r != null && (this.id = this.recycleAsyncId(o, r, t)),
      (this.pending = !0),
      (this.delay = t),
      (this.id =
        (i = this.id) !== null && i !== void 0
          ? i
          : this.requestAsyncId(o, this.id, t)),
      this
    );
  }
  requestAsyncId(n, t, i = 0) {
    return ea.setInterval(n.flush.bind(n, this), i);
  }
  recycleAsyncId(n, t, i = 0) {
    if (i != null && this.delay === i && this.pending === !1) return t;
    t != null && ea.clearInterval(t);
  }
  execute(n, t) {
    if (this.closed) return new Error("executing a cancelled action");
    this.pending = !1;
    let i = this._execute(n, t);
    if (i) return i;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(n, t) {
    let i = !1,
      r;
    try {
      this.work(n);
    } catch (o) {
      (i = !0), (r = o || new Error("Scheduled action threw falsy error"));
    }
    if (i) return this.unsubscribe(), r;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: n, scheduler: t } = this,
        { actions: i } = t;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        Wr(i, this),
        n != null && (this.id = this.recycleAsyncId(t, n, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var Lw = 1,
  Cf,
  wf = {};
function C_(e) {
  return e in wf ? (delete wf[e], !0) : !1;
}
var w_ = {
  setImmediate(e) {
    let n = Lw++;
    return (
      (wf[n] = !0),
      Cf || (Cf = Promise.resolve()),
      Cf.then(() => C_(n) && e()),
      n
    );
  },
  clearImmediate(e) {
    C_(e);
  },
};
var { setImmediate: Vw, clearImmediate: jw } = w_,
  ta = {
    setImmediate(...e) {
      let { delegate: n } = ta;
      return (n?.setImmediate || Vw)(...e);
    },
    clearImmediate(e) {
      let { delegate: n } = ta;
      return (n?.clearImmediate || jw)(e);
    },
    delegate: void 0,
  };
var Wl = class extends mr {
  constructor(n, t) {
    super(n, t), (this.scheduler = n), (this.work = t);
  }
  requestAsyncId(n, t, i = 0) {
    return i !== null && i > 0
      ? super.requestAsyncId(n, t, i)
      : (n.actions.push(this),
        n._scheduled ||
          (n._scheduled = ta.setImmediate(n.flush.bind(n, void 0))));
  }
  recycleAsyncId(n, t, i = 0) {
    var r;
    if (i != null ? i > 0 : this.delay > 0)
      return super.recycleAsyncId(n, t, i);
    let { actions: o } = n;
    t != null &&
      ((r = o[o.length - 1]) === null || r === void 0 ? void 0 : r.id) !== t &&
      (ta.clearImmediate(t), n._scheduled === t && (n._scheduled = void 0));
  }
};
var Uo = class e {
  constructor(n, t = e.now) {
    (this.schedulerActionCtor = n), (this.now = t);
  }
  schedule(n, t = 0, i) {
    return new this.schedulerActionCtor(this, n).schedule(i, t);
  }
};
Uo.now = Xs.now;
var _r = class extends Uo {
  constructor(n, t = Uo.now) {
    super(n, t), (this.actions = []), (this._active = !1);
  }
  flush(n) {
    let { actions: t } = this;
    if (this._active) {
      t.push(n);
      return;
    }
    let i;
    this._active = !0;
    do if ((i = n.execute(n.state, n.delay))) break;
    while ((n = t.shift()));
    if (((this._active = !1), i)) {
      for (; (n = t.shift()); ) n.unsubscribe();
      throw i;
    }
  }
};
var ql = class extends _r {
  flush(n) {
    this._active = !0;
    let t = this._scheduled;
    this._scheduled = void 0;
    let { actions: i } = this,
      r;
    n = n || i.shift();
    do if ((r = n.execute(n.state, n.delay))) break;
    while ((n = i[0]) && n.id === t && i.shift());
    if (((this._active = !1), r)) {
      for (; (n = i[0]) && n.id === t && i.shift(); ) n.unsubscribe();
      throw r;
    }
  }
};
var Df = new ql(Wl);
var na = new _r(mr),
  D_ = na;
var Zl = class extends mr {
  constructor(n, t) {
    super(n, t), (this.scheduler = n), (this.work = t);
  }
  requestAsyncId(n, t, i = 0) {
    return i !== null && i > 0
      ? super.requestAsyncId(n, t, i)
      : (n.actions.push(this),
        n._scheduled ||
          (n._scheduled = Ho.requestAnimationFrame(() => n.flush(void 0))));
  }
  recycleAsyncId(n, t, i = 0) {
    var r;
    if (i != null ? i > 0 : this.delay > 0)
      return super.recycleAsyncId(n, t, i);
    let { actions: o } = n;
    t != null &&
      ((r = o[o.length - 1]) === null || r === void 0 ? void 0 : r.id) !== t &&
      (Ho.cancelAnimationFrame(t), (n._scheduled = void 0));
  }
};
var Yl = class extends _r {
  flush(n) {
    this._active = !0;
    let t = this._scheduled;
    this._scheduled = void 0;
    let { actions: i } = this,
      r;
    n = n || i.shift();
    do if ((r = n.execute(n.state, n.delay))) break;
    while ((n = i[0]) && n.id === t && i.shift());
    if (((this._active = !1), r)) {
      for (; (n = i[0]) && n.id === t && i.shift(); ) n.unsubscribe();
      throw r;
    }
  }
};
var Ef = new Yl(Zl);
var Wt = new Me((e) => e.complete());
function Ql(e) {
  return e && be(e.schedule);
}
function Mf(e) {
  return e[e.length - 1];
}
function $o(e) {
  return be(Mf(e)) ? e.pop() : void 0;
}
function di(e) {
  return Ql(Mf(e)) ? e.pop() : void 0;
}
function E_(e, n) {
  return typeof Mf(e) == "number" ? e.pop() : n;
}
function I_(e, n, t, i) {
  function r(o) {
    return o instanceof t
      ? o
      : new t(function (s) {
          s(o);
        });
  }
  return new (t || (t = Promise))(function (o, s) {
    function a(u) {
      try {
        c(i.next(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      try {
        c(i.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      u.done ? o(u.value) : r(u.value).then(a, l);
    }
    c((i = i.apply(e, n || [])).next());
  });
}
function M_(e) {
  var n = typeof Symbol == "function" && Symbol.iterator,
    t = n && e[n],
    i = 0;
  if (t) return t.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && i >= e.length && (e = void 0), { value: e && e[i++], done: !e }
        );
      },
    };
  throw new TypeError(
    n ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function Qr(e) {
  return this instanceof Qr ? ((this.v = e), this) : new Qr(e);
}
function T_(e, n, t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = t.apply(e, n || []),
    r,
    o = [];
  return (
    (r = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (r[Symbol.asyncIterator] = function () {
      return this;
    }),
    r
  );
  function s(h) {
    return function (D) {
      return Promise.resolve(D).then(h, d);
    };
  }
  function a(h, D) {
    i[h] &&
      ((r[h] = function (I) {
        return new Promise(function (P, F) {
          o.push([h, I, P, F]) > 1 || l(h, I);
        });
      }),
      D && (r[h] = D(r[h])));
  }
  function l(h, D) {
    try {
      c(i[h](D));
    } catch (I) {
      _(o[0][3], I);
    }
  }
  function c(h) {
    h.value instanceof Qr
      ? Promise.resolve(h.value.v).then(u, d)
      : _(o[0][2], h);
  }
  function u(h) {
    l("next", h);
  }
  function d(h) {
    l("throw", h);
  }
  function _(h, D) {
    h(D), o.shift(), o.length && l(o[0][0], o[0][1]);
  }
}
function S_(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator],
    t;
  return n
    ? n.call(e)
    : ((e = typeof M_ == "function" ? M_(e) : e[Symbol.iterator]()),
      (t = {}),
      i("next"),
      i("throw"),
      i("return"),
      (t[Symbol.asyncIterator] = function () {
        return this;
      }),
      t);
  function i(o) {
    t[o] =
      e[o] &&
      function (s) {
        return new Promise(function (a, l) {
          (s = e[o](s)), r(a, l, s.done, s.value);
        });
      };
  }
  function r(o, s, a, l) {
    Promise.resolve(l).then(function (c) {
      o({ value: c, done: a });
    }, s);
  }
}
var zo = (e) => e && typeof e.length == "number" && typeof e != "function";
function Kl(e) {
  return be(e?.then);
}
function Jl(e) {
  return be(e[jo]);
}
function Xl(e) {
  return Symbol.asyncIterator && be(e?.[Symbol.asyncIterator]);
}
function ec(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Bw() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var tc = Bw();
function nc(e) {
  return be(e?.[tc]);
}
function ic(e) {
  return T_(this, arguments, function* () {
    let t = e.getReader();
    try {
      for (;;) {
        let { value: i, done: r } = yield Qr(t.read());
        if (r) return yield Qr(void 0);
        yield yield Qr(i);
      }
    } finally {
      t.releaseLock();
    }
  });
}
function rc(e) {
  return be(e?.getReader);
}
function Ue(e) {
  if (e instanceof Me) return e;
  if (e != null) {
    if (Jl(e)) return Hw(e);
    if (zo(e)) return Uw(e);
    if (Kl(e)) return $w(e);
    if (Xl(e)) return x_(e);
    if (nc(e)) return zw(e);
    if (rc(e)) return Gw(e);
  }
  throw ec(e);
}
function Hw(e) {
  return new Me((n) => {
    let t = e[jo]();
    if (be(t.subscribe)) return t.subscribe(n);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function Uw(e) {
  return new Me((n) => {
    for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
    n.complete();
  });
}
function $w(e) {
  return new Me((n) => {
    e.then(
      (t) => {
        n.closed || (n.next(t), n.complete());
      },
      (t) => n.error(t)
    ).then(null, Ul);
  });
}
function zw(e) {
  return new Me((n) => {
    for (let t of e) if ((n.next(t), n.closed)) return;
    n.complete();
  });
}
function x_(e) {
  return new Me((n) => {
    Ww(e, n).catch((t) => n.error(t));
  });
}
function Gw(e) {
  return x_(ic(e));
}
function Ww(e, n) {
  var t, i, r, o;
  return I_(this, void 0, void 0, function* () {
    try {
      for (t = S_(e); (i = yield t.next()), !i.done; ) {
        let s = i.value;
        if ((n.next(s), n.closed)) return;
      }
    } catch (s) {
      r = { error: s };
    } finally {
      try {
        i && !i.done && (o = t.return) && (yield o.call(t));
      } finally {
        if (r) throw r.error;
      }
    }
    n.complete();
  });
}
function an(e, n, t, i = 0, r = !1) {
  let o = n.schedule(function () {
    t(), r ? e.add(this.schedule(null, i)) : this.unsubscribe();
  }, i);
  if ((e.add(o), !r)) return o;
}
function oc(e, n = 0) {
  return Ie((t, i) => {
    t.subscribe(
      we(
        i,
        (r) => an(i, e, () => i.next(r), n),
        () => an(i, e, () => i.complete(), n),
        (r) => an(i, e, () => i.error(r), n)
      )
    );
  });
}
function sc(e, n = 0) {
  return Ie((t, i) => {
    i.add(e.schedule(() => t.subscribe(i), n));
  });
}
function O_(e, n) {
  return Ue(e).pipe(sc(n), oc(n));
}
function N_(e, n) {
  return Ue(e).pipe(sc(n), oc(n));
}
function P_(e, n) {
  return new Me((t) => {
    let i = 0;
    return n.schedule(function () {
      i === e.length
        ? t.complete()
        : (t.next(e[i++]), t.closed || this.schedule());
    });
  });
}
function A_(e, n) {
  return new Me((t) => {
    let i;
    return (
      an(t, n, () => {
        (i = e[tc]()),
          an(
            t,
            n,
            () => {
              let r, o;
              try {
                ({ value: r, done: o } = i.next());
              } catch (s) {
                t.error(s);
                return;
              }
              o ? t.complete() : t.next(r);
            },
            0,
            !0
          );
      }),
      () => be(i?.return) && i.return()
    );
  });
}
function ac(e, n) {
  if (!e) throw new Error("Iterable cannot be null");
  return new Me((t) => {
    an(t, n, () => {
      let i = e[Symbol.asyncIterator]();
      an(
        t,
        n,
        () => {
          i.next().then((r) => {
            r.done ? t.complete() : t.next(r.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function R_(e, n) {
  return ac(ic(e), n);
}
function k_(e, n) {
  if (e != null) {
    if (Jl(e)) return O_(e, n);
    if (zo(e)) return P_(e, n);
    if (Kl(e)) return N_(e, n);
    if (Xl(e)) return ac(e, n);
    if (nc(e)) return A_(e, n);
    if (rc(e)) return R_(e, n);
  }
  throw ec(e);
}
function it(e, n) {
  return n ? k_(e, n) : Ue(e);
}
function J(...e) {
  let n = di(e);
  return it(e, n);
}
function Go(e, n) {
  let t = be(e) ? e : () => e,
    i = (r) => r.error(t());
  return new Me(n ? (r) => n.schedule(i, 0, r) : i);
}
function mn(e) {
  return !!e && (e instanceof Me || (be(e.lift) && be(e.subscribe)));
}
var ki = Fo(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function F_(e) {
  return e instanceof Date && !isNaN(e);
}
function Ce(e, n) {
  return Ie((t, i) => {
    let r = 0;
    t.subscribe(
      we(i, (o) => {
        i.next(e.call(n, o, r++));
      })
    );
  });
}
var { isArray: qw } = Array;
function Zw(e, n) {
  return qw(n) ? e(...n) : e(n);
}
function Wo(e) {
  return Ce((n) => Zw(e, n));
}
var { isArray: Yw } = Array,
  { getPrototypeOf: Qw, prototype: Kw, keys: Jw } = Object;
function lc(e) {
  if (e.length === 1) {
    let n = e[0];
    if (Yw(n)) return { args: n, keys: null };
    if (Xw(n)) {
      let t = Jw(n);
      return { args: t.map((i) => n[i]), keys: t };
    }
  }
  return { args: e, keys: null };
}
function Xw(e) {
  return e && typeof e == "object" && Qw(e) === Kw;
}
function cc(e, n) {
  return e.reduce((t, i, r) => ((t[i] = n[r]), t), {});
}
function qo(...e) {
  let n = di(e),
    t = $o(e),
    { args: i, keys: r } = lc(e);
  if (i.length === 0) return it([], n);
  let o = new Me(eD(i, n, r ? (s) => cc(r, s) : Gt));
  return t ? o.pipe(Wo(t)) : o;
}
function eD(e, n, t = Gt) {
  return (i) => {
    L_(
      n,
      () => {
        let { length: r } = e,
          o = new Array(r),
          s = r,
          a = r;
        for (let l = 0; l < r; l++)
          L_(
            n,
            () => {
              let c = it(e[l], n),
                u = !1;
              c.subscribe(
                we(
                  i,
                  (d) => {
                    (o[l] = d), u || ((u = !0), a--), a || i.next(t(o.slice()));
                  },
                  () => {
                    --s || i.complete();
                  }
                )
              );
            },
            i
          );
      },
      i
    );
  };
}
function L_(e, n, t) {
  e ? an(t, e, n) : n();
}
function V_(e, n, t, i, r, o, s, a) {
  let l = [],
    c = 0,
    u = 0,
    d = !1,
    _ = () => {
      d && !l.length && !c && n.complete();
    },
    h = (I) => (c < i ? D(I) : l.push(I)),
    D = (I) => {
      o && n.next(I), c++;
      let P = !1;
      Ue(t(I, u++)).subscribe(
        we(
          n,
          (F) => {
            r?.(F), o ? h(F) : n.next(F);
          },
          () => {
            P = !0;
          },
          void 0,
          () => {
            if (P)
              try {
                for (c--; l.length && c < i; ) {
                  let F = l.shift();
                  s ? an(n, s, () => D(F)) : D(F);
                }
                _();
              } catch (F) {
                n.error(F);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      we(n, h, () => {
        (d = !0), _();
      })
    ),
    () => {
      a?.();
    }
  );
}
function at(e, n, t = 1 / 0) {
  return be(n)
    ? at((i, r) => Ce((o, s) => n(i, o, r, s))(Ue(e(i, r))), t)
    : (typeof n == "number" && (t = n), Ie((i, r) => V_(i, r, e, t)));
}
function vr(e = 1 / 0) {
  return at(Gt, e);
}
function j_() {
  return vr(1);
}
function _n(...e) {
  return j_()(it(e, di(e)));
}
function Kr(e) {
  return new Me((n) => {
    Ue(e()).subscribe(n);
  });
}
function ia(...e) {
  let n = $o(e),
    { args: t, keys: i } = lc(e),
    r = new Me((o) => {
      let { length: s } = t;
      if (!s) {
        o.complete();
        return;
      }
      let a = new Array(s),
        l = s,
        c = s;
      for (let u = 0; u < s; u++) {
        let d = !1;
        Ue(t[u]).subscribe(
          we(
            o,
            (_) => {
              d || ((d = !0), c--), (a[u] = _);
            },
            () => l--,
            void 0,
            () => {
              (!l || !d) && (c || o.next(i ? cc(i, a) : a), o.complete());
            }
          )
        );
      }
    });
  return n ? r.pipe(Wo(n)) : r;
}
var tD = ["addListener", "removeListener"],
  nD = ["addEventListener", "removeEventListener"],
  iD = ["on", "off"];
function Gn(e, n, t, i) {
  if ((be(t) && ((i = t), (t = void 0)), i)) return Gn(e, n, t).pipe(Wo(i));
  let [r, o] = sD(e)
    ? nD.map((s) => (a) => e[s](n, a, t))
    : rD(e)
    ? tD.map(B_(e, n))
    : oD(e)
    ? iD.map(B_(e, n))
    : [];
  if (!r && zo(e)) return at((s) => Gn(s, n, t))(Ue(e));
  if (!r) throw new TypeError("Invalid event target");
  return new Me((s) => {
    let a = (...l) => s.next(1 < l.length ? l : l[0]);
    return r(a), () => o(a);
  });
}
function B_(e, n) {
  return (t) => (i) => e[t](n, i);
}
function rD(e) {
  return be(e.addListener) && be(e.removeListener);
}
function oD(e) {
  return be(e.on) && be(e.off);
}
function sD(e) {
  return be(e.addEventListener) && be(e.removeEventListener);
}
function Fi(e = 0, n, t = D_) {
  let i = -1;
  return (
    n != null && (Ql(n) ? (t = n) : (i = n)),
    new Me((r) => {
      let o = F_(e) ? +e - t.now() : e;
      o < 0 && (o = 0);
      let s = 0;
      return t.schedule(function () {
        r.closed ||
          (r.next(s++), 0 <= i ? this.schedule(void 0, i) : r.complete());
      }, o);
    })
  );
}
function uc(...e) {
  let n = di(e),
    t = E_(e, 1 / 0),
    i = e;
  return i.length ? (i.length === 1 ? Ue(i[0]) : vr(t)(it(i, n))) : Wt;
}
var { isArray: aD } = Array;
function H_(e) {
  return e.length === 1 && aD(e[0]) ? e[0] : e;
}
function It(e, n) {
  return Ie((t, i) => {
    let r = 0;
    t.subscribe(we(i, (o) => e.call(n, o, r++) && i.next(o)));
  });
}
function dc(...e) {
  return (e = H_(e)), e.length === 1 ? Ue(e[0]) : new Me(lD(e));
}
function lD(e) {
  return (n) => {
    let t = [];
    for (let i = 0; t && !n.closed && i < e.length; i++)
      t.push(
        Ue(e[i]).subscribe(
          we(n, (r) => {
            if (t) {
              for (let o = 0; o < t.length; o++) o !== i && t[o].unsubscribe();
              t = null;
            }
            n.next(r);
          })
        )
      );
  };
}
function U_(e) {
  return Ie((n, t) => {
    let i = !1,
      r = null,
      o = null,
      s = !1,
      a = () => {
        if ((o?.unsubscribe(), (o = null), i)) {
          i = !1;
          let c = r;
          (r = null), t.next(c);
        }
        s && t.complete();
      },
      l = () => {
        (o = null), s && t.complete();
      };
    n.subscribe(
      we(
        t,
        (c) => {
          (i = !0), (r = c), o || Ue(e(c)).subscribe((o = we(t, a, l)));
        },
        () => {
          (s = !0), (!i || !o || o.closed) && t.complete();
        }
      )
    );
  });
}
function ra(e, n = na) {
  return U_(() => Fi(e, n));
}
function yr(e) {
  return Ie((n, t) => {
    let i = null,
      r = !1,
      o;
    (i = n.subscribe(
      we(t, void 0, void 0, (s) => {
        (o = Ue(e(s, yr(e)(n)))),
          i ? (i.unsubscribe(), (i = null), o.subscribe(t)) : (r = !0);
      })
    )),
      r && (i.unsubscribe(), (i = null), o.subscribe(t));
  });
}
function $_(e, n, t, i, r) {
  return (o, s) => {
    let a = t,
      l = n,
      c = 0;
    o.subscribe(
      we(
        s,
        (u) => {
          let d = c++;
          (l = a ? e(l, u, d) : ((a = !0), u)), i && s.next(l);
        },
        r &&
          (() => {
            a && s.next(l), s.complete();
          })
      )
    );
  };
}
function Wn(e, n) {
  return be(n) ? at(e, n, 1) : at(e, 1);
}
function br(e) {
  return Ie((n, t) => {
    let i = !1;
    n.subscribe(
      we(
        t,
        (r) => {
          (i = !0), t.next(r);
        },
        () => {
          i || t.next(e), t.complete();
        }
      )
    );
  });
}
function Lt(e) {
  return e <= 0
    ? () => Wt
    : Ie((n, t) => {
        let i = 0;
        n.subscribe(
          we(t, (r) => {
            ++i <= e && (t.next(r), e <= i && t.complete());
          })
        );
      });
}
function z_() {
  return Ie((e, n) => {
    e.subscribe(we(n, Ai));
  });
}
function oa(e) {
  return Ce(() => e);
}
function If(e, n) {
  return n
    ? (t) => _n(n.pipe(Lt(1), z_()), t.pipe(If(e)))
    : at((t, i) => Ue(e(t, i)).pipe(Lt(1), oa(t)));
}
function Tf(e, n = na) {
  let t = Fi(e, n);
  return If(() => t);
}
function fc(e, n = Gt) {
  return (
    (e = e ?? cD),
    Ie((t, i) => {
      let r,
        o = !0;
      t.subscribe(
        we(i, (s) => {
          let a = n(s);
          (o || !e(r, a)) && ((o = !1), (r = a), i.next(s));
        })
      );
    })
  );
}
function cD(e, n) {
  return e === n;
}
function hc(e = uD) {
  return Ie((n, t) => {
    let i = !1;
    n.subscribe(
      we(
        t,
        (r) => {
          (i = !0), t.next(r);
        },
        () => (i ? t.complete() : t.error(e()))
      )
    );
  });
}
function uD() {
  return new ki();
}
function Sf(...e) {
  return (n) => _n(n, J(...e));
}
function ln(e) {
  return Ie((n, t) => {
    try {
      n.subscribe(t);
    } finally {
      t.add(e);
    }
  });
}
function fi(e, n) {
  let t = arguments.length >= 2;
  return (i) =>
    i.pipe(
      e ? It((r, o) => e(r, o, i)) : Gt,
      Lt(1),
      t ? br(n) : hc(() => new ki())
    );
}
function Zo(e) {
  return e <= 0
    ? () => Wt
    : Ie((n, t) => {
        let i = [];
        n.subscribe(
          we(
            t,
            (r) => {
              i.push(r), e < i.length && i.shift();
            },
            () => {
              for (let r of i) t.next(r);
              t.complete();
            },
            void 0,
            () => {
              i = null;
            }
          )
        );
      });
}
function xf(e, n) {
  let t = arguments.length >= 2;
  return (i) =>
    i.pipe(
      e ? It((r, o) => e(r, o, i)) : Gt,
      Zo(1),
      t ? br(n) : hc(() => new ki())
    );
}
function Of() {
  return Ie((e, n) => {
    let t,
      i = !1;
    e.subscribe(
      we(n, (r) => {
        let o = t;
        (t = r), i && n.next([o, r]), (i = !0);
      })
    );
  });
}
function Nf(e, n) {
  return Ie($_(e, n, arguments.length >= 2, !0));
}
function G_(e = {}) {
  let {
    connector: n = () => new He(),
    resetOnError: t = !0,
    resetOnComplete: i = !0,
    resetOnRefCountZero: r = !0,
  } = e;
  return (o) => {
    let s,
      a,
      l,
      c = 0,
      u = !1,
      d = !1,
      _ = () => {
        a?.unsubscribe(), (a = void 0);
      },
      h = () => {
        _(), (s = l = void 0), (u = d = !1);
      },
      D = () => {
        let I = s;
        h(), I?.unsubscribe();
      };
    return Ie((I, P) => {
      c++, !d && !u && _();
      let F = (l = l ?? n());
      P.add(() => {
        c--, c === 0 && !d && !u && (a = Pf(D, r));
      }),
        F.subscribe(P),
        !s &&
          c > 0 &&
          ((s = new Ri({
            next: (R) => F.next(R),
            error: (R) => {
              (d = !0), _(), (a = Pf(h, t, R)), F.error(R);
            },
            complete: () => {
              (u = !0), _(), (a = Pf(h, i)), F.complete();
            },
          })),
          Ue(I).subscribe(s));
    })(o);
  };
}
function Pf(e, n, ...t) {
  if (n === !0) {
    e();
    return;
  }
  if (n === !1) return;
  let i = new Ri({
    next: () => {
      i.unsubscribe(), e();
    },
  });
  return Ue(n(...t)).subscribe(i);
}
function Yo(e, n, t) {
  let i,
    r = !1;
  return (
    e && typeof e == "object"
      ? ({
          bufferSize: i = 1 / 0,
          windowTime: n = 1 / 0,
          refCount: r = !1,
          scheduler: t,
        } = e)
      : (i = e ?? 1 / 0),
    G_({
      connector: () => new Yr(i, n, t),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: r,
    })
  );
}
function Jr(...e) {
  let n = di(e);
  return Ie((t, i) => {
    (n ? _n(e, t, n) : _n(e, t)).subscribe(i);
  });
}
function ut(e, n) {
  return Ie((t, i) => {
    let r = null,
      o = 0,
      s = !1,
      a = () => s && !r && i.complete();
    t.subscribe(
      we(
        i,
        (l) => {
          r?.unsubscribe();
          let c = 0,
            u = o++;
          Ue(e(l, u)).subscribe(
            (r = we(
              i,
              (d) => i.next(n ? n(l, d, u, c++) : d),
              () => {
                (r = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function Xt(e) {
  return Ie((n, t) => {
    Ue(e).subscribe(we(t, () => t.complete(), Ai)), !t.closed && n.subscribe(t);
  });
}
function Dt(e, n, t) {
  let i = be(e) || n || t ? { next: e, error: n, complete: t } : e;
  return i
    ? Ie((r, o) => {
        var s;
        (s = i.subscribe) === null || s === void 0 || s.call(i);
        let a = !0;
        r.subscribe(
          we(
            o,
            (l) => {
              var c;
              (c = i.next) === null || c === void 0 || c.call(i, l), o.next(l);
            },
            () => {
              var l;
              (a = !1),
                (l = i.complete) === null || l === void 0 || l.call(i),
                o.complete();
            },
            (l) => {
              var c;
              (a = !1),
                (c = i.error) === null || c === void 0 || c.call(i, l),
                o.error(l);
            },
            () => {
              var l, c;
              a && ((l = i.unsubscribe) === null || l === void 0 || l.call(i)),
                (c = i.finalize) === null || c === void 0 || c.call(i);
            }
          )
        );
      })
    : Gt;
}
function Af(...e) {
  let n = $o(e);
  return Ie((t, i) => {
    let r = e.length,
      o = new Array(r),
      s = e.map(() => !1),
      a = !1;
    for (let l = 0; l < r; l++)
      Ue(e[l]).subscribe(
        we(
          i,
          (c) => {
            (o[l] = c),
              !a && !s[l] && ((s[l] = !0), (a = s.every(Gt)) && (s = null));
          },
          Ai
        )
      );
    t.subscribe(
      we(i, (l) => {
        if (a) {
          let c = [l, ...o];
          i.next(n ? n(...c) : c);
        }
      })
    );
  });
}
var S0 = "https://g.co/ng/security#xss",
  pe = class extends Error {
    constructor(n, t) {
      super(Xc(n, t)), (this.code = n);
    }
  };
function Xc(e, n) {
  return `${`NG0${Math.abs(e)}`}${n ? ": " + n : ""}`;
}
function _a(e) {
  return { toString: e }.toString();
}
var pc = "__parameters__";
function dD(e) {
  return function (...t) {
    if (e) {
      let i = e(...t);
      for (let r in i) this[r] = i[r];
    }
  };
}
function $h(e, n, t) {
  return _a(() => {
    let i = dD(n);
    function r(...o) {
      if (this instanceof r) return i.apply(this, o), this;
      let s = new r(...o);
      return (a.annotation = s), a;
      function a(l, c, u) {
        let d = l.hasOwnProperty(pc)
          ? l[pc]
          : Object.defineProperty(l, pc, { value: [] })[pc];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(s), l;
      }
    }
    return (
      t && (r.prototype = Object.create(t.prototype)),
      (r.prototype.ngMetadataName = e),
      (r.annotationCls = r),
      r
    );
  });
}
var en = globalThis;
function rt(e) {
  for (let n in e) if (e[n] === rt) return n;
  throw Error("Could not find renamed property on target object.");
}
function fD(e, n) {
  for (let t in n) n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t]);
}
function nn(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(nn).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let n = e.toString();
  if (n == null) return "" + n;
  let t = n.indexOf(`
`);
  return t === -1 ? n : n.substring(0, t);
}
function Zf(e, n) {
  return e == null || e === ""
    ? n === null
      ? ""
      : n
    : n == null || n === ""
    ? e
    : e + " " + n;
}
var hD = rt({ __forward_ref__: rt });
function Ui(e) {
  return (
    (e.__forward_ref__ = Ui),
    (e.toString = function () {
      return nn(this());
    }),
    e
  );
}
function tn(e) {
  return x0(e) ? e() : e;
}
function x0(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(hD) && e.__forward_ref__ === Ui
  );
}
function G(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function Xe(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function eu(e) {
  return W_(e, N0) || W_(e, P0);
}
function O0(e) {
  return eu(e) !== null;
}
function W_(e, n) {
  return e.hasOwnProperty(n) ? e[n] : null;
}
function pD(e) {
  let n = e && (e[N0] || e[P0]);
  return n || null;
}
function q_(e) {
  return e && (e.hasOwnProperty(Z_) || e.hasOwnProperty(gD)) ? e[Z_] : null;
}
var N0 = rt({ ɵprov: rt }),
  Z_ = rt({ ɵinj: rt }),
  P0 = rt({ ngInjectableDef: rt }),
  gD = rt({ ngInjectorDef: rt }),
  z = class {
    constructor(n, t) {
      (this._desc = n),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof t == "number"
          ? (this.__NG_ELEMENT_ID__ = t)
          : t !== void 0 &&
            (this.ɵprov = G({
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
  };
function A0(e) {
  return e && !!e.ɵproviders;
}
var mD = rt({ ɵcmp: rt }),
  _D = rt({ ɵdir: rt }),
  vD = rt({ ɵpipe: rt }),
  yD = rt({ ɵmod: rt }),
  Mc = rt({ ɵfac: rt }),
  aa = rt({ __NG_ELEMENT_ID__: rt }),
  Y_ = rt({ __NG_ENV_ID__: rt });
function ts(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function bD(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
    ? e.type.name || e.type.toString()
    : ts(e);
}
function CD(e, n) {
  let t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
  throw new pe(-200, e);
}
function zh(e, n) {
  throw new pe(-201, !1);
}
var je = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })(je || {}),
  Yf;
function R0() {
  return Yf;
}
function cn(e) {
  let n = Yf;
  return (Yf = e), n;
}
function k0(e, n, t) {
  let i = eu(e);
  if (i && i.providedIn == "root")
    return i.value === void 0 ? (i.value = i.factory()) : i.value;
  if (t & je.Optional) return null;
  if (n !== void 0) return n;
  zh(e, "Injector");
}
var wD = {},
  ca = wD,
  Qf = "__NG_DI_FLAG__",
  Ic = "ngTempTokenPath",
  DD = "ngTokenPath",
  ED = /\n/gm,
  MD = "\u0275",
  Q_ = "__source",
  Xo;
function ID() {
  return Xo;
}
function Cr(e) {
  let n = Xo;
  return (Xo = e), n;
}
function TD(e, n = je.Default) {
  if (Xo === void 0) throw new pe(-203, !1);
  return Xo === null
    ? k0(e, void 0, n)
    : Xo.get(e, n & je.Optional ? null : void 0, n);
}
function q(e, n = je.Default) {
  return (R0() || TD)(tn(e), n);
}
function O(e, n = je.Default) {
  return q(e, tu(n));
}
function tu(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function Kf(e) {
  let n = [];
  for (let t = 0; t < e.length; t++) {
    let i = tn(e[t]);
    if (Array.isArray(i)) {
      if (i.length === 0) throw new pe(900, !1);
      let r,
        o = je.Default;
      for (let s = 0; s < i.length; s++) {
        let a = i[s],
          l = SD(a);
        typeof l == "number" ? (l === -1 ? (r = a.token) : (o |= l)) : (r = a);
      }
      n.push(q(r, o));
    } else n.push(q(i));
  }
  return n;
}
function Gh(e, n) {
  return (e[Qf] = n), (e.prototype[Qf] = n), e;
}
function SD(e) {
  return e[Qf];
}
function xD(e, n, t, i) {
  let r = e[Ic];
  throw (
    (n[Q_] && r.unshift(n[Q_]),
    (e.message = OD(
      `
` + e.message,
      r,
      t,
      i
    )),
    (e[DD] = r),
    (e[Ic] = null),
    e)
  );
}
function OD(e, n, t, i = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == MD
      ? e.slice(2)
      : e;
  let r = nn(n);
  if (Array.isArray(n)) r = n.map(nn).join(" -> ");
  else if (typeof n == "object") {
    let o = [];
    for (let s in n)
      if (n.hasOwnProperty(s)) {
        let a = n[s];
        o.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : nn(a)));
      }
    r = `{${o.join(", ")}}`;
  }
  return `${t}${i ? "(" + i + ")" : ""}[${r}]: ${e.replace(
    ED,
    `
  `
  )}`;
}
var F0 = Gh(
    $h("Inject", (e) => ({ token: e })),
    -1
  ),
  fs = Gh($h("Optional"), 8);
var Wh = Gh($h("SkipSelf"), 4);
function to(e, n) {
  let t = e.hasOwnProperty(Mc);
  return t ? e[Mc] : null;
}
function ND(e, n, t) {
  if (e.length !== n.length) return !1;
  for (let i = 0; i < e.length; i++) {
    let r = e[i],
      o = n[i];
    if ((t && ((r = t(r)), (o = t(o))), o !== r)) return !1;
  }
  return !0;
}
function PD(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function qh(e, n) {
  e.forEach((t) => (Array.isArray(t) ? qh(t, n) : n(t)));
}
function L0(e, n, t) {
  n >= e.length ? e.push(t) : e.splice(n, 0, t);
}
function Tc(e, n) {
  return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
}
function AD(e, n) {
  let t = [];
  for (let i = 0; i < e; i++) t.push(n);
  return t;
}
function RD(e, n, t, i) {
  let r = e.length;
  if (r == n) e.push(t, i);
  else if (r === 1) e.push(i, e[0]), (e[0] = t);
  else {
    for (r--, e.push(e[r - 1], e[r]); r > n; ) {
      let o = r - 2;
      (e[r] = e[o]), r--;
    }
    (e[n] = t), (e[n + 1] = i);
  }
}
function Zh(e, n, t) {
  let i = va(e, n);
  return i >= 0 ? (e[i | 1] = t) : ((i = ~i), RD(e, i, n, t)), i;
}
function Rf(e, n) {
  let t = va(e, n);
  if (t >= 0) return e[t | 1];
}
function va(e, n) {
  return kD(e, n, 1);
}
function kD(e, n, t) {
  let i = 0,
    r = e.length >> t;
  for (; r !== i; ) {
    let o = i + ((r - i) >> 1),
      s = e[o << t];
    if (n === s) return o << t;
    s > n ? (r = o) : (i = o + 1);
  }
  return ~(r << t);
}
var ns = {},
  un = [],
  is = new z(""),
  V0 = new z("", -1),
  j0 = new z(""),
  Sc = class {
    get(n, t = ca) {
      if (t === ca) {
        let i = new Error(`NullInjectorError: No provider for ${nn(n)}!`);
        throw ((i.name = "NullInjectorError"), i);
      }
      return t;
    }
  },
  B0 = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(B0 || {}),
  gi = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(gi || {}),
  Er = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(Er || {});
function FD(e, n, t) {
  let i = e.length;
  for (;;) {
    let r = e.indexOf(n, t);
    if (r === -1) return r;
    if (r === 0 || e.charCodeAt(r - 1) <= 32) {
      let o = n.length;
      if (r + o === i || e.charCodeAt(r + o) <= 32) return r;
    }
    t = r + 1;
  }
}
function Jf(e, n, t) {
  let i = 0;
  for (; i < t.length; ) {
    let r = t[i];
    if (typeof r == "number") {
      if (r !== 0) break;
      i++;
      let o = t[i++],
        s = t[i++],
        a = t[i++];
      e.setAttribute(n, s, a, o);
    } else {
      let o = r,
        s = t[++i];
      LD(o) ? e.setProperty(n, o, s) : e.setAttribute(n, o, s), i++;
    }
  }
  return i;
}
function H0(e) {
  return e === 3 || e === 4 || e === 6;
}
function LD(e) {
  return e.charCodeAt(0) === 64;
}
function ua(e, n) {
  if (!(n === null || n.length === 0))
    if (e === null || e.length === 0) e = n.slice();
    else {
      let t = -1;
      for (let i = 0; i < n.length; i++) {
        let r = n[i];
        typeof r == "number"
          ? (t = r)
          : t === 0 ||
            (t === -1 || t === 2
              ? K_(e, t, r, null, n[++i])
              : K_(e, t, r, null, null));
      }
    }
  return e;
}
function K_(e, n, t, i, r) {
  let o = 0,
    s = e.length;
  if (n === -1) s = -1;
  else
    for (; o < e.length; ) {
      let a = e[o++];
      if (typeof a == "number") {
        if (a === n) {
          s = -1;
          break;
        } else if (a > n) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < e.length; ) {
    let a = e[o];
    if (typeof a == "number") break;
    if (a === t) {
      if (i === null) {
        r !== null && (e[o + 1] = r);
        return;
      } else if (i === e[o + 1]) {
        e[o + 2] = r;
        return;
      }
    }
    o++, i !== null && o++, r !== null && o++;
  }
  s !== -1 && (e.splice(s, 0, n), (o = s + 1)),
    e.splice(o++, 0, t),
    i !== null && e.splice(o++, 0, i),
    r !== null && e.splice(o++, 0, r);
}
var U0 = "ng-template";
function VD(e, n, t, i) {
  let r = 0;
  if (i) {
    for (; r < n.length && typeof n[r] == "string"; r += 2)
      if (n[r] === "class" && FD(n[r + 1].toLowerCase(), t, 0) !== -1)
        return !0;
  } else if (Yh(e)) return !1;
  if (((r = n.indexOf(1, r)), r > -1)) {
    let o;
    for (; ++r < n.length && typeof (o = n[r]) == "string"; )
      if (o.toLowerCase() === t) return !0;
  }
  return !1;
}
function Yh(e) {
  return e.type === 4 && e.value !== U0;
}
function jD(e, n, t) {
  let i = e.type === 4 && !t ? U0 : e.value;
  return n === i;
}
function BD(e, n, t) {
  let i = 4,
    r = e.attrs,
    o = r !== null ? $D(r) : 0,
    s = !1;
  for (let a = 0; a < n.length; a++) {
    let l = n[a];
    if (typeof l == "number") {
      if (!s && !qn(i) && !qn(l)) return !1;
      if (s && qn(l)) continue;
      (s = !1), (i = l | (i & 1));
      continue;
    }
    if (!s)
      if (i & 4) {
        if (
          ((i = 2 | (i & 1)),
          (l !== "" && !jD(e, l, t)) || (l === "" && n.length === 1))
        ) {
          if (qn(i)) return !1;
          s = !0;
        }
      } else if (i & 8) {
        if (r === null || !VD(e, r, l, t)) {
          if (qn(i)) return !1;
          s = !0;
        }
      } else {
        let c = n[++a],
          u = HD(l, r, Yh(e), t);
        if (u === -1) {
          if (qn(i)) return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let d;
          if (
            (u > o ? (d = "") : (d = r[u + 1].toLowerCase()), i & 2 && c !== d)
          ) {
            if (qn(i)) return !1;
            s = !0;
          }
        }
      }
  }
  return qn(i) || s;
}
function qn(e) {
  return (e & 1) === 0;
}
function HD(e, n, t, i) {
  if (n === null) return -1;
  let r = 0;
  if (i || !t) {
    let o = !1;
    for (; r < n.length; ) {
      let s = n[r];
      if (s === e) return r;
      if (s === 3 || s === 6) o = !0;
      else if (s === 1 || s === 2) {
        let a = n[++r];
        for (; typeof a == "string"; ) a = n[++r];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          r += 4;
          continue;
        }
      }
      r += o ? 1 : 2;
    }
    return -1;
  } else return zD(n, e);
}
function $0(e, n, t = !1) {
  for (let i = 0; i < n.length; i++) if (BD(e, n[i], t)) return !0;
  return !1;
}
function UD(e) {
  let n = e.attrs;
  if (n != null) {
    let t = n.indexOf(5);
    if (!(t & 1)) return n[t + 1];
  }
  return null;
}
function $D(e) {
  for (let n = 0; n < e.length; n++) {
    let t = e[n];
    if (H0(t)) return n;
  }
  return e.length;
}
function zD(e, n) {
  let t = e.indexOf(4);
  if (t > -1)
    for (t++; t < e.length; ) {
      let i = e[t];
      if (typeof i == "number") return -1;
      if (i === n) return t;
      t++;
    }
  return -1;
}
function GD(e, n) {
  e: for (let t = 0; t < n.length; t++) {
    let i = n[t];
    if (e.length === i.length) {
      for (let r = 0; r < e.length; r++) if (e[r] !== i[r]) continue e;
      return !0;
    }
  }
  return !1;
}
function J_(e, n) {
  return e ? ":not(" + n.trim() + ")" : n;
}
function WD(e) {
  let n = e[0],
    t = 1,
    i = 2,
    r = "",
    o = !1;
  for (; t < e.length; ) {
    let s = e[t];
    if (typeof s == "string")
      if (i & 2) {
        let a = e[++t];
        r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else i & 8 ? (r += "." + s) : i & 4 && (r += " " + s);
    else
      r !== "" && !qn(s) && ((n += J_(o, r)), (r = "")),
        (i = s),
        (o = o || !qn(i));
    t++;
  }
  return r !== "" && (n += J_(o, r)), n;
}
function qD(e) {
  return e.map(WD).join(",");
}
function ZD(e) {
  let n = [],
    t = [],
    i = 1,
    r = 2;
  for (; i < e.length; ) {
    let o = e[i];
    if (typeof o == "string")
      r === 2 ? o !== "" && n.push(o, e[++i]) : r === 8 && t.push(o);
    else {
      if (!qn(r)) break;
      r = o;
    }
    i++;
  }
  return { attrs: n, classes: t };
}
function ot(e) {
  return _a(() => {
    let n = Z0(e),
      t = Pe(j({}, n), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === B0.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (n.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || gi.Emulated,
        styles: e.styles || un,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    Y0(t);
    let i = e.dependencies;
    return (
      (t.directiveDefs = e0(i, !1)), (t.pipeDefs = e0(i, !0)), (t.id = KD(t)), t
    );
  });
}
function YD(e) {
  return Mr(e) || z0(e);
}
function QD(e) {
  return e !== null;
}
function et(e) {
  return _a(() => ({
    type: e.type,
    bootstrap: e.bootstrap || un,
    declarations: e.declarations || un,
    imports: e.imports || un,
    exports: e.exports || un,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function X_(e, n) {
  if (e == null) return ns;
  let t = {};
  for (let i in e)
    if (e.hasOwnProperty(i)) {
      let r = e[i],
        o,
        s,
        a = Er.None;
      Array.isArray(r)
        ? ((a = r[0]), (o = r[1]), (s = r[2] ?? o))
        : ((o = r), (s = r)),
        n ? ((t[o] = a !== Er.None ? [i, a] : i), (n[o] = s)) : (t[o] = i);
    }
  return t;
}
function dt(e) {
  return _a(() => {
    let n = Z0(e);
    return Y0(n), n;
  });
}
function yi(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone === !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function Mr(e) {
  return e[mD] || null;
}
function z0(e) {
  return e[_D] || null;
}
function G0(e) {
  return e[vD] || null;
}
function W0(e) {
  let n = Mr(e) || z0(e) || G0(e);
  return n !== null ? n.standalone : !1;
}
function q0(e, n) {
  let t = e[yD] || null;
  if (!t && n === !0)
    throw new Error(`Type ${nn(e)} does not have '\u0275mod' property.`);
  return t;
}
function Z0(e) {
  let n = {};
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
    inputConfig: e.inputs || ns,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || un,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: X_(e.inputs, n),
    outputs: X_(e.outputs),
    debugInfo: null,
  };
}
function Y0(e) {
  e.features?.forEach((n) => n(e));
}
function e0(e, n) {
  if (!e) return null;
  let t = n ? G0 : YD;
  return () => (typeof e == "function" ? e() : e).map((i) => t(i)).filter(QD);
}
function KD(e) {
  let n = 0,
    t = [
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
  for (let r of t) n = (Math.imul(31, n) + r.charCodeAt(0)) << 0;
  return (n += 2147483648), "c" + n;
}
function ya(e) {
  return { ɵproviders: e };
}
function JD(...e) {
  return { ɵproviders: Q0(!0, e), ɵfromNgModule: !0 };
}
function Q0(e, ...n) {
  let t = [],
    i = new Set(),
    r,
    o = (s) => {
      t.push(s);
    };
  return (
    qh(n, (s) => {
      let a = s;
      Xf(a, o, [], i) && ((r ||= []), r.push(a));
    }),
    r !== void 0 && K0(r, o),
    t
  );
}
function K0(e, n) {
  for (let t = 0; t < e.length; t++) {
    let { ngModule: i, providers: r } = e[t];
    Qh(r, (o) => {
      n(o, i);
    });
  }
}
function Xf(e, n, t, i) {
  if (((e = tn(e)), !e)) return !1;
  let r = null,
    o = q_(e),
    s = !o && Mr(e);
  if (!o && !s) {
    let l = e.ngModule;
    if (((o = q_(l)), o)) r = l;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    r = e;
  }
  let a = i.has(r);
  if (s) {
    if (a) return !1;
    if ((i.add(r), s.dependencies)) {
      let l =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let c of l) Xf(c, n, t, i);
    }
  } else if (o) {
    if (o.imports != null && !a) {
      i.add(r);
      let c;
      try {
        qh(o.imports, (u) => {
          Xf(u, n, t, i) && ((c ||= []), c.push(u));
        });
      } finally {
      }
      c !== void 0 && K0(c, n);
    }
    if (!a) {
      let c = to(r) || (() => new r());
      n({ provide: r, useFactory: c, deps: un }, r),
        n({ provide: j0, useValue: r, multi: !0 }, r),
        n({ provide: is, useValue: () => q(r), multi: !0 }, r);
    }
    let l = o.providers;
    if (l != null && !a) {
      let c = e;
      Qh(l, (u) => {
        n(u, c);
      });
    }
  } else return !1;
  return r !== e && e.providers !== void 0;
}
function Qh(e, n) {
  for (let t of e)
    A0(t) && (t = t.ɵproviders), Array.isArray(t) ? Qh(t, n) : n(t);
}
var XD = rt({ provide: String, useValue: rt });
function J0(e) {
  return e !== null && typeof e == "object" && XD in e;
}
function eE(e) {
  return !!(e && e.useExisting);
}
function tE(e) {
  return !!(e && e.useFactory);
}
function rs(e) {
  return typeof e == "function";
}
function nE(e) {
  return !!e.useClass;
}
var nu = new z(""),
  bc = {},
  iE = {},
  kf;
function Kh() {
  return kf === void 0 && (kf = new Sc()), kf;
}
var Qt = class {},
  da = class extends Qt {
    get destroyed() {
      return this._destroyed;
    }
    constructor(n, t, i, r) {
      super(),
        (this.parent = t),
        (this.source = i),
        (this.scopes = r),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        th(n, (s) => this.processProvider(s)),
        this.records.set(V0, Qo(void 0, this)),
        r.has("environment") && this.records.set(Qt, Qo(void 0, this));
      let o = this.records.get(nu);
      o != null && typeof o.value == "string" && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(j0, un, je.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let n = Ge(null);
      try {
        for (let i of this._ngOnDestroyHooks) i.ngOnDestroy();
        let t = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let i of t) i();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          Ge(n);
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
      let t = Cr(this),
        i = cn(void 0),
        r;
      try {
        return n();
      } finally {
        Cr(t), cn(i);
      }
    }
    get(n, t = ca, i = je.Default) {
      if ((this.assertNotDestroyed(), n.hasOwnProperty(Y_))) return n[Y_](this);
      i = tu(i);
      let r,
        o = Cr(this),
        s = cn(void 0);
      try {
        if (!(i & je.SkipSelf)) {
          let l = this.records.get(n);
          if (l === void 0) {
            let c = lE(n) && eu(n);
            c && this.injectableDefInScope(c)
              ? (l = Qo(eh(n), bc))
              : (l = null),
              this.records.set(n, l);
          }
          if (l != null) return this.hydrate(n, l);
        }
        let a = i & je.Self ? Kh() : this.parent;
        return (t = i & je.Optional && t === ca ? null : t), a.get(n, t);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Ic] = a[Ic] || []).unshift(nn(n)), o)) throw a;
          return xD(a, n, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        cn(s), Cr(o);
      }
    }
    resolveInjectorInitializers() {
      let n = Ge(null),
        t = Cr(this),
        i = cn(void 0),
        r;
      try {
        let o = this.get(is, un, je.Self);
        for (let s of o) s();
      } finally {
        Cr(t), cn(i), Ge(n);
      }
    }
    toString() {
      let n = [],
        t = this.records;
      for (let i of t.keys()) n.push(nn(i));
      return `R3Injector[${n.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new pe(205, !1);
    }
    processProvider(n) {
      n = tn(n);
      let t = rs(n) ? n : tn(n && n.provide),
        i = oE(n);
      if (!rs(n) && n.multi === !0) {
        let r = this.records.get(t);
        r ||
          ((r = Qo(void 0, bc, !0)),
          (r.factory = () => Kf(r.multi)),
          this.records.set(t, r)),
          (t = n),
          r.multi.push(n);
      }
      this.records.set(t, i);
    }
    hydrate(n, t) {
      let i = Ge(null);
      try {
        return (
          t.value === bc && ((t.value = iE), (t.value = t.factory())),
          typeof t.value == "object" &&
            t.value &&
            aE(t.value) &&
            this._ngOnDestroyHooks.add(t.value),
          t.value
        );
      } finally {
        Ge(i);
      }
    }
    injectableDefInScope(n) {
      if (!n.providedIn) return !1;
      let t = tn(n.providedIn);
      return typeof t == "string"
        ? t === "any" || this.scopes.has(t)
        : this.injectorDefTypes.has(t);
    }
    removeOnDestroy(n) {
      let t = this._onDestroyHooks.indexOf(n);
      t !== -1 && this._onDestroyHooks.splice(t, 1);
    }
  };
function eh(e) {
  let n = eu(e),
    t = n !== null ? n.factory : to(e);
  if (t !== null) return t;
  if (e instanceof z) throw new pe(204, !1);
  if (e instanceof Function) return rE(e);
  throw new pe(204, !1);
}
function rE(e) {
  if (e.length > 0) throw new pe(204, !1);
  let t = pD(e);
  return t !== null ? () => t.factory(e) : () => new e();
}
function oE(e) {
  if (J0(e)) return Qo(void 0, e.useValue);
  {
    let n = X0(e);
    return Qo(n, bc);
  }
}
function X0(e, n, t) {
  let i;
  if (rs(e)) {
    let r = tn(e);
    return to(r) || eh(r);
  } else if (J0(e)) i = () => tn(e.useValue);
  else if (tE(e)) i = () => e.useFactory(...Kf(e.deps || []));
  else if (eE(e)) i = () => q(tn(e.useExisting));
  else {
    let r = tn(e && (e.useClass || e.provide));
    if (sE(e)) i = () => new r(...Kf(e.deps));
    else return to(r) || eh(r);
  }
  return i;
}
function Qo(e, n, t = !1) {
  return { factory: e, value: n, multi: t ? [] : void 0 };
}
function sE(e) {
  return !!e.deps;
}
function aE(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function lE(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof z);
}
function th(e, n) {
  for (let t of e)
    Array.isArray(t) ? th(t, n) : t && A0(t) ? th(t.ɵproviders, n) : n(t);
}
function xn(e, n) {
  e instanceof da && e.assertNotDestroyed();
  let t,
    i = Cr(e),
    r = cn(void 0);
  try {
    return n();
  } finally {
    Cr(i), cn(r);
  }
}
function ev() {
  return R0() !== void 0 || ID() != null;
}
function tv(e) {
  if (!ev()) throw new pe(-203, !1);
}
function cE(e) {
  let n = en.ng;
  if (n && n.ɵcompilerFacade) return n.ɵcompilerFacade;
  throw new Error("JIT compiler unavailable");
}
function uE(e) {
  return typeof e == "function";
}
var $i = 0,
  Ae = 1,
  Te = 2,
  Kt = 3,
  Yn = 4,
  dn = 5,
  fa = 6,
  xc = 7,
  Qn = 8,
  os = 9,
  mi = 10,
  gt = 11,
  ha = 12,
  t0 = 13,
  hs = 14,
  Sn = 15,
  no = 16,
  Ko = 17,
  Vi = 18,
  iu = 19,
  nv = 20,
  wr = 21,
  Ff = 22,
  Tn = 23,
  rn = 25,
  iv = 1;
var io = 7,
  Oc = 8,
  ss = 9,
  vn = 10,
  Nc = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      e
    );
  })(Nc || {});
function Dr(e) {
  return Array.isArray(e) && typeof e[iv] == "object";
}
function zi(e) {
  return Array.isArray(e) && e[iv] === !0;
}
function Jh(e) {
  return (e.flags & 4) !== 0;
}
function ru(e) {
  return e.componentOffset > -1;
}
function ou(e) {
  return (e.flags & 1) === 1;
}
function Ir(e) {
  return !!e.template;
}
function nh(e) {
  return (e[Te] & 512) !== 0;
}
var pa = class {
  constructor(n, t, i) {
    (this.previousValue = n), (this.currentValue = t), (this.firstChange = i);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function rv(e, n, t, i) {
  n !== null ? n.applyValueToInputSignal(n, i) : (e[t] = i);
}
function Vt() {
  return ov;
}
function ov(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = fE), dE;
}
Vt.ngInherit = !0;
function dE() {
  let e = av(this),
    n = e?.current;
  if (n) {
    let t = e.previous;
    if (t === ns) e.previous = n;
    else for (let i in n) t[i] = n[i];
    (e.current = null), this.ngOnChanges(n);
  }
}
function fE(e, n, t, i, r) {
  let o = this.declaredInputs[i],
    s = av(e) || hE(e, { previous: ns, current: null }),
    a = s.current || (s.current = {}),
    l = s.previous,
    c = l[o];
  (a[o] = new pa(c && c.currentValue, t, l === ns)), rv(e, n, r, t);
}
var sv = "__ngSimpleChanges__";
function av(e) {
  return e[sv] || null;
}
function hE(e, n) {
  return (e[sv] = n);
}
var n0 = null;
var hi = function (e, n, t) {
    n0?.(e, n, t);
  },
  pE = "svg",
  gE = "math";
function _i(e) {
  for (; Array.isArray(e); ) e = e[$i];
  return e;
}
function lv(e, n) {
  return _i(n[e]);
}
function On(e, n) {
  return _i(n[e.index]);
}
function cv(e, n) {
  return e.data[n];
}
function Xh(e, n) {
  return e[n];
}
function xr(e, n) {
  let t = n[e];
  return Dr(t) ? t : t[$i];
}
function mE(e) {
  return (e[Te] & 4) === 4;
}
function ep(e) {
  return (e[Te] & 128) === 128;
}
function _E(e) {
  return zi(e[Kt]);
}
function as(e, n) {
  return n == null ? null : e[n];
}
function uv(e) {
  e[Ko] = 0;
}
function dv(e) {
  e[Te] & 1024 || ((e[Te] |= 1024), ep(e) && au(e));
}
function vE(e, n) {
  for (; e > 0; ) (n = n[hs]), e--;
  return n;
}
function su(e) {
  return !!(e[Te] & 9216 || e[Tn]?.dirty);
}
function ih(e) {
  e[mi].changeDetectionScheduler?.notify(8),
    e[Te] & 64 && (e[Te] |= 1024),
    su(e) && au(e);
}
function au(e) {
  e[mi].changeDetectionScheduler?.notify(0);
  let n = ro(e);
  for (; n !== null && !(n[Te] & 8192 || ((n[Te] |= 8192), !ep(n))); )
    n = ro(n);
}
function fv(e, n) {
  if ((e[Te] & 256) === 256) throw new pe(911, !1);
  e[wr] === null && (e[wr] = []), e[wr].push(n);
}
function yE(e, n) {
  if (e[wr] === null) return;
  let t = e[wr].indexOf(n);
  t !== -1 && e[wr].splice(t, 1);
}
function ro(e) {
  let n = e[Kt];
  return zi(n) ? n[Kt] : n;
}
var Le = {
  lFrame: Cv(null),
  bindingsEnabled: !0,
  skipHydrationRootTNode: null,
};
var hv = !1;
function bE() {
  return Le.lFrame.elementDepthCount;
}
function CE() {
  Le.lFrame.elementDepthCount++;
}
function wE() {
  Le.lFrame.elementDepthCount--;
}
function pv() {
  return Le.bindingsEnabled;
}
function gv() {
  return Le.skipHydrationRootTNode !== null;
}
function DE(e) {
  return Le.skipHydrationRootTNode === e;
}
function EE() {
  Le.skipHydrationRootTNode = null;
}
function Ve() {
  return Le.lFrame.lView;
}
function bt() {
  return Le.lFrame.tView;
}
function ve(e) {
  return (Le.lFrame.contextLView = e), e[Qn];
}
function ye(e) {
  return (Le.lFrame.contextLView = null), e;
}
function qt() {
  let e = mv();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function mv() {
  return Le.lFrame.currentTNode;
}
function ME() {
  let e = Le.lFrame,
    n = e.currentTNode;
  return e.isParent ? n : n.parent;
}
function uo(e, n) {
  let t = Le.lFrame;
  (t.currentTNode = e), (t.isParent = n);
}
function tp() {
  return Le.lFrame.isParent;
}
function np() {
  Le.lFrame.isParent = !1;
}
function IE() {
  return Le.lFrame.contextLView;
}
function _v() {
  return hv;
}
function i0(e) {
  hv = e;
}
function ip() {
  let e = Le.lFrame,
    n = e.bindingRootIndex;
  return n === -1 && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n;
}
function TE() {
  return Le.lFrame.bindingIndex;
}
function SE(e) {
  return (Le.lFrame.bindingIndex = e);
}
function ba() {
  return Le.lFrame.bindingIndex++;
}
function rp(e) {
  let n = Le.lFrame,
    t = n.bindingIndex;
  return (n.bindingIndex = n.bindingIndex + e), t;
}
function xE() {
  return Le.lFrame.inI18n;
}
function OE(e, n) {
  let t = Le.lFrame;
  (t.bindingIndex = t.bindingRootIndex = e), rh(n);
}
function NE() {
  return Le.lFrame.currentDirectiveIndex;
}
function rh(e) {
  Le.lFrame.currentDirectiveIndex = e;
}
function PE(e) {
  let n = Le.lFrame.currentDirectiveIndex;
  return n === -1 ? null : e[n];
}
function vv() {
  return Le.lFrame.currentQueryIndex;
}
function op(e) {
  Le.lFrame.currentQueryIndex = e;
}
function AE(e) {
  let n = e[Ae];
  return n.type === 2 ? n.declTNode : n.type === 1 ? e[dn] : null;
}
function yv(e, n, t) {
  if (t & je.SkipSelf) {
    let r = n,
      o = e;
    for (; (r = r.parent), r === null && !(t & je.Host); )
      if (((r = AE(o)), r === null || ((o = o[hs]), r.type & 10))) break;
    if (r === null) return !1;
    (n = r), (e = o);
  }
  let i = (Le.lFrame = bv());
  return (i.currentTNode = n), (i.lView = e), !0;
}
function sp(e) {
  let n = bv(),
    t = e[Ae];
  (Le.lFrame = n),
    (n.currentTNode = t.firstChild),
    (n.lView = e),
    (n.tView = t),
    (n.contextLView = e),
    (n.bindingIndex = t.bindingStartIndex),
    (n.inI18n = !1);
}
function bv() {
  let e = Le.lFrame,
    n = e === null ? null : e.child;
  return n === null ? Cv(e) : n;
}
function Cv(e) {
  let n = {
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
  return e !== null && (e.child = n), n;
}
function wv() {
  let e = Le.lFrame;
  return (Le.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Dv = wv;
function ap() {
  let e = wv();
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
function RE(e) {
  return (Le.lFrame.contextLView = vE(e, Le.lFrame.contextLView))[Qn];
}
function Or() {
  return Le.lFrame.selectedIndex;
}
function oo(e) {
  Le.lFrame.selectedIndex = e;
}
function Ca() {
  let e = Le.lFrame;
  return cv(e.tView, e.selectedIndex);
}
function kE() {
  return Le.lFrame.currentNamespace;
}
var Ev = !0;
function lu() {
  return Ev;
}
function cu(e) {
  Ev = e;
}
function FE(e, n, t) {
  let { ngOnChanges: i, ngOnInit: r, ngDoCheck: o } = n.type.prototype;
  if (i) {
    let s = ov(n);
    (t.preOrderHooks ??= []).push(e, s),
      (t.preOrderCheckHooks ??= []).push(e, s);
  }
  r && (t.preOrderHooks ??= []).push(0 - e, r),
    o &&
      ((t.preOrderHooks ??= []).push(e, o),
      (t.preOrderCheckHooks ??= []).push(e, o));
}
function uu(e, n) {
  for (let t = n.directiveStart, i = n.directiveEnd; t < i; t++) {
    let o = e.data[t].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: l,
        ngAfterViewChecked: c,
        ngOnDestroy: u,
      } = o;
    s && (e.contentHooks ??= []).push(-t, s),
      a &&
        ((e.contentHooks ??= []).push(t, a),
        (e.contentCheckHooks ??= []).push(t, a)),
      l && (e.viewHooks ??= []).push(-t, l),
      c &&
        ((e.viewHooks ??= []).push(t, c), (e.viewCheckHooks ??= []).push(t, c)),
      u != null && (e.destroyHooks ??= []).push(t, u);
  }
}
function Cc(e, n, t) {
  Mv(e, n, 3, t);
}
function wc(e, n, t, i) {
  (e[Te] & 3) === t && Mv(e, n, t, i);
}
function Lf(e, n) {
  let t = e[Te];
  (t & 3) === n && ((t &= 16383), (t += 1), (e[Te] = t));
}
function Mv(e, n, t, i) {
  let r = i !== void 0 ? e[Ko] & 65535 : 0,
    o = i ?? -1,
    s = n.length - 1,
    a = 0;
  for (let l = r; l < s; l++)
    if (typeof n[l + 1] == "number") {
      if (((a = n[l]), i != null && a >= i)) break;
    } else
      n[l] < 0 && (e[Ko] += 65536),
        (a < o || o == -1) &&
          (LE(e, t, n, l), (e[Ko] = (e[Ko] & 4294901760) + l + 2)),
        l++;
}
function r0(e, n) {
  hi(4, e, n);
  let t = Ge(null);
  try {
    n.call(e);
  } finally {
    Ge(t), hi(5, e, n);
  }
}
function LE(e, n, t, i) {
  let r = t[i] < 0,
    o = t[i + 1],
    s = r ? -t[i] : t[i],
    a = e[s];
  r
    ? e[Te] >> 14 < e[Ko] >> 16 &&
      (e[Te] & 3) === n &&
      ((e[Te] += 16384), r0(a, o))
    : r0(a, o);
}
var es = -1,
  so = class {
    constructor(n, t, i) {
      (this.factory = n),
        (this.resolving = !1),
        (this.canSeeViewProviders = t),
        (this.injectImpl = i);
    }
  };
function VE(e) {
  return e instanceof so;
}
function jE(e) {
  return (e.flags & 8) !== 0;
}
function BE(e) {
  return (e.flags & 16) !== 0;
}
var Vf = {},
  oh = class {
    constructor(n, t) {
      (this.injector = n), (this.parentInjector = t);
    }
    get(n, t, i) {
      i = tu(i);
      let r = this.injector.get(n, Vf, i);
      return r !== Vf || t === Vf ? r : this.parentInjector.get(n, t, i);
    }
  };
function Iv(e) {
  return e !== es;
}
function Pc(e) {
  return e & 32767;
}
function HE(e) {
  return e >> 16;
}
function Ac(e, n) {
  let t = HE(e),
    i = n;
  for (; t > 0; ) (i = i[hs]), t--;
  return i;
}
var sh = !0;
function Rc(e) {
  let n = sh;
  return (sh = e), n;
}
var UE = 256,
  Tv = UE - 1,
  Sv = 5,
  $E = 0,
  pi = {};
function zE(e, n, t) {
  let i;
  typeof t == "string"
    ? (i = t.charCodeAt(0) || 0)
    : t.hasOwnProperty(aa) && (i = t[aa]),
    i == null && (i = t[aa] = $E++);
  let r = i & Tv,
    o = 1 << r;
  n.data[e + (r >> Sv)] |= o;
}
function kc(e, n) {
  let t = xv(e, n);
  if (t !== -1) return t;
  let i = n[Ae];
  i.firstCreatePass &&
    ((e.injectorIndex = n.length),
    jf(i.data, e),
    jf(n, null),
    jf(i.blueprint, null));
  let r = lp(e, n),
    o = e.injectorIndex;
  if (Iv(r)) {
    let s = Pc(r),
      a = Ac(r, n),
      l = a[Ae].data;
    for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c];
  }
  return (n[o + 8] = r), o;
}
function jf(e, n) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
}
function xv(e, n) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    n[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function lp(e, n) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let t = 0,
    i = null,
    r = n;
  for (; r !== null; ) {
    if (((i = Rv(r)), i === null)) return es;
    if ((t++, (r = r[hs]), i.injectorIndex !== -1))
      return i.injectorIndex | (t << 16);
  }
  return es;
}
function ah(e, n, t) {
  zE(e, n, t);
}
function GE(e, n) {
  if (n === "class") return e.classes;
  if (n === "style") return e.styles;
  let t = e.attrs;
  if (t) {
    let i = t.length,
      r = 0;
    for (; r < i; ) {
      let o = t[r];
      if (H0(o)) break;
      if (o === 0) r = r + 2;
      else if (typeof o == "number")
        for (r++; r < i && typeof t[r] == "string"; ) r++;
      else {
        if (o === n) return t[r + 1];
        r = r + 2;
      }
    }
  }
  return null;
}
function Ov(e, n, t) {
  if (t & je.Optional || e !== void 0) return e;
  zh(n, "NodeInjector");
}
function Nv(e, n, t, i) {
  if (
    (t & je.Optional && i === void 0 && (i = null), !(t & (je.Self | je.Host)))
  ) {
    let r = e[os],
      o = cn(void 0);
    try {
      return r ? r.get(n, i, t & je.Optional) : k0(n, i, t & je.Optional);
    } finally {
      cn(o);
    }
  }
  return Ov(i, n, t);
}
function Pv(e, n, t, i = je.Default, r) {
  if (e !== null) {
    if (n[Te] & 2048 && !(i & je.Self)) {
      let s = YE(e, n, t, i, pi);
      if (s !== pi) return s;
    }
    let o = Av(e, n, t, i, pi);
    if (o !== pi) return o;
  }
  return Nv(n, t, i, r);
}
function Av(e, n, t, i, r) {
  let o = qE(t);
  if (typeof o == "function") {
    if (!yv(n, e, i)) return i & je.Host ? Ov(r, t, i) : Nv(n, t, i, r);
    try {
      let s;
      if (((s = o(i)), s == null && !(i & je.Optional))) zh(t);
      else return s;
    } finally {
      Dv();
    }
  } else if (typeof o == "number") {
    let s = null,
      a = xv(e, n),
      l = es,
      c = i & je.Host ? n[Sn][dn] : null;
    for (
      (a === -1 || i & je.SkipSelf) &&
      ((l = a === -1 ? lp(e, n) : n[a + 8]),
      l === es || !s0(i, !1)
        ? (a = -1)
        : ((s = n[Ae]), (a = Pc(l)), (n = Ac(l, n))));
      a !== -1;

    ) {
      let u = n[Ae];
      if (o0(o, a, u.data)) {
        let d = WE(a, n, t, s, i, c);
        if (d !== pi) return d;
      }
      (l = n[a + 8]),
        l !== es && s0(i, n[Ae].data[a + 8] === c) && o0(o, a, n)
          ? ((s = u), (a = Pc(l)), (n = Ac(l, n)))
          : (a = -1);
    }
  }
  return r;
}
function WE(e, n, t, i, r, o) {
  let s = n[Ae],
    a = s.data[e + 8],
    l = i == null ? ru(a) && sh : i != s && (a.type & 3) !== 0,
    c = r & je.Host && o === a,
    u = Dc(a, s, t, l, c);
  return u !== null ? ao(n, s, u, a) : pi;
}
function Dc(e, n, t, i, r) {
  let o = e.providerIndexes,
    s = n.data,
    a = o & 1048575,
    l = e.directiveStart,
    c = e.directiveEnd,
    u = o >> 20,
    d = i ? a : a + u,
    _ = r ? a + u : c;
  for (let h = d; h < _; h++) {
    let D = s[h];
    if ((h < l && t === D) || (h >= l && D.type === t)) return h;
  }
  if (r) {
    let h = s[l];
    if (h && Ir(h) && h.type === t) return l;
  }
  return null;
}
function ao(e, n, t, i) {
  let r = e[t],
    o = n.data;
  if (VE(r)) {
    let s = r;
    s.resolving && CD(bD(o[t]));
    let a = Rc(s.canSeeViewProviders);
    s.resolving = !0;
    let l,
      c = s.injectImpl ? cn(s.injectImpl) : null,
      u = yv(e, i, je.Default);
    try {
      (r = e[t] = s.factory(void 0, o, e, i)),
        n.firstCreatePass && t >= i.directiveStart && FE(t, o[t], n);
    } finally {
      c !== null && cn(c), Rc(a), (s.resolving = !1), Dv();
    }
  }
  return r;
}
function qE(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let n = e.hasOwnProperty(aa) ? e[aa] : void 0;
  return typeof n == "number" ? (n >= 0 ? n & Tv : ZE) : n;
}
function o0(e, n, t) {
  let i = 1 << e;
  return !!(t[n + (e >> Sv)] & i);
}
function s0(e, n) {
  return !(e & je.Self) && !(e & je.Host && n);
}
var eo = class {
  constructor(n, t) {
    (this._tNode = n), (this._lView = t);
  }
  get(n, t, i) {
    return Pv(this._tNode, this._lView, n, tu(i), t);
  }
};
function ZE() {
  return new eo(qt(), Ve());
}
function Nn(e) {
  return _a(() => {
    let n = e.prototype.constructor,
      t = n[Mc] || lh(n),
      i = Object.prototype,
      r = Object.getPrototypeOf(e.prototype).constructor;
    for (; r && r !== i; ) {
      let o = r[Mc] || lh(r);
      if (o && o !== t) return o;
      r = Object.getPrototypeOf(r);
    }
    return (o) => new o();
  });
}
function lh(e) {
  return x0(e)
    ? () => {
        let n = lh(tn(e));
        return n && n();
      }
    : to(e);
}
function YE(e, n, t, i, r) {
  let o = e,
    s = n;
  for (; o !== null && s !== null && s[Te] & 2048 && !(s[Te] & 512); ) {
    let a = Av(o, s, t, i | je.Self, pi);
    if (a !== pi) return a;
    let l = o.parent;
    if (!l) {
      let c = s[nv];
      if (c) {
        let u = c.get(t, pi, i);
        if (u !== pi) return u;
      }
      (l = Rv(s)), (s = s[hs]);
    }
    o = l;
  }
  return r;
}
function Rv(e) {
  let n = e[Ae],
    t = n.type;
  return t === 2 ? n.declTNode : t === 1 ? e[dn] : null;
}
function du(e) {
  return GE(qt(), e);
}
function a0(e, n = null, t = null, i) {
  let r = kv(e, n, t, i);
  return r.resolveInjectorInitializers(), r;
}
function kv(e, n = null, t = null, i, r = new Set()) {
  let o = [t || un, JD(e)];
  return (
    (i = i || (typeof e == "object" ? void 0 : nn(e))),
    new da(o, n || Kh(), i || null, r)
  );
}
var mt = class e {
  static {
    this.THROW_IF_NOT_FOUND = ca;
  }
  static {
    this.NULL = new Sc();
  }
  static create(n, t) {
    if (Array.isArray(n)) return a0({ name: "" }, t, n, "");
    {
      let i = n.name ?? "";
      return a0({ name: i }, n.parent, n.providers, i);
    }
  }
  static {
    this.ɵprov = G({ token: e, providedIn: "any", factory: () => q(V0) });
  }
  static {
    this.__NG_ELEMENT_ID__ = -1;
  }
};
var QE = new z("");
QE.__NG_ELEMENT_ID__ = (e) => {
  let n = qt();
  if (n === null) throw new pe(204, !1);
  if (n.type & 2) return n.value;
  if (e & je.Optional) return null;
  throw new pe(204, !1);
};
var KE = "ngOriginalError";
function Bf(e) {
  return e[KE];
}
var Fv = !0,
  fu = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = JE;
      }
      static {
        this.__NG_ENV_ID__ = (t) => t;
      }
    }
    return e;
  })(),
  ch = class extends fu {
    constructor(n) {
      super(), (this._lView = n);
    }
    onDestroy(n) {
      return fv(this._lView, n), () => yE(this._lView, n);
    }
  };
function JE() {
  return new ch(Ve());
}
var Gi = (() => {
  class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Mt(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let t = this.taskId++;
      return this.pendingTasks.add(t), t;
    }
    remove(t) {
      this.pendingTasks.delete(t),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
    static {
      this.ɵprov = G({ token: e, providedIn: "root", factory: () => new e() });
    }
  }
  return e;
})();
var uh = class extends He {
    constructor(n = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = n),
        ev() &&
          ((this.destroyRef = O(fu, { optional: !0 }) ?? void 0),
          (this.pendingTasks = O(Gi, { optional: !0 }) ?? void 0));
    }
    emit(n) {
      let t = Ge(null);
      try {
        super.next(n);
      } finally {
        Ge(t);
      }
    }
    subscribe(n, t, i) {
      let r = n,
        o = t || (() => null),
        s = i;
      if (n && typeof n == "object") {
        let l = n;
        (r = l.next?.bind(l)),
          (o = l.error?.bind(l)),
          (s = l.complete?.bind(l));
      }
      this.__isAsync &&
        ((o = this.wrapInTimeout(o)),
        r && (r = this.wrapInTimeout(r)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: r, error: o, complete: s });
      return n instanceof nt && n.add(a), a;
    }
    wrapInTimeout(n) {
      return (t) => {
        let i = this.pendingTasks?.add();
        setTimeout(() => {
          n(t), i !== void 0 && this.pendingTasks?.remove(i);
        });
      };
    }
  },
  Ne = uh;
function Fc(...e) {}
function Lv(e) {
  let n, t;
  function i() {
    e = Fc;
    try {
      t !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(t),
        n !== void 0 && clearTimeout(n);
    } catch {}
  }
  return (
    (n = setTimeout(() => {
      e(), i();
    })),
    typeof requestAnimationFrame == "function" &&
      (t = requestAnimationFrame(() => {
        e(), i();
      })),
    () => i()
  );
}
function l0(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Fc;
    }
  );
}
var cp = "isAngularZone",
  Lc = cp + "_ID",
  XE = 0,
  Re = class e {
    constructor(n) {
      (this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new Ne(!1)),
        (this.onMicrotaskEmpty = new Ne(!1)),
        (this.onStable = new Ne(!1)),
        (this.onError = new Ne(!1));
      let {
        enableLongStackTrace: t = !1,
        shouldCoalesceEventChangeDetection: i = !1,
        shouldCoalesceRunChangeDetection: r = !1,
        scheduleInRootZone: o = Fv,
      } = n;
      if (typeof Zone > "u") throw new pe(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        t &&
          Zone.longStackTraceZoneSpec &&
          (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !r && i),
        (s.shouldCoalesceRunChangeDetection = r),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = o),
        nM(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(cp) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new pe(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new pe(909, !1);
    }
    run(n, t, i) {
      return this._inner.run(n, t, i);
    }
    runTask(n, t, i, r) {
      let o = this._inner,
        s = o.scheduleEventTask("NgZoneEvent: " + r, n, eM, Fc, Fc);
      try {
        return o.runTask(s, t, i);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(n, t, i) {
      return this._inner.runGuarded(n, t, i);
    }
    runOutsideAngular(n) {
      return this._outer.run(n);
    }
  },
  eM = {};
function up(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
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
function tM(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function n() {
    Lv(() => {
      (e.callbackScheduled = !1),
        dh(e),
        (e.isCheckStableRunning = !0),
        up(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        n();
      })
    : e._outer.run(() => {
        n();
      }),
    dh(e);
}
function nM(e) {
  let n = () => {
      tM(e);
    },
    t = XE++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [cp]: !0, [Lc]: t, [Lc + t]: !0 },
    onInvokeTask: (i, r, o, s, a, l) => {
      if (iM(l)) return i.invokeTask(o, s, a, l);
      try {
        return c0(e), i.invokeTask(o, s, a, l);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          n(),
          u0(e);
      }
    },
    onInvoke: (i, r, o, s, a, l, c) => {
      try {
        return c0(e), i.invoke(o, s, a, l, c);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !rM(l) &&
          n(),
          u0(e);
      }
    },
    onHasTask: (i, r, o, s) => {
      i.hasTask(o, s),
        r === o &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), dh(e), up(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (i, r, o, s) => (
      i.handleError(o, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function dh(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function c0(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function u0(e) {
  e._nesting--, up(e);
}
var Vc = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new Ne()),
      (this.onMicrotaskEmpty = new Ne()),
      (this.onStable = new Ne()),
      (this.onError = new Ne());
  }
  run(n, t, i) {
    return n.apply(t, i);
  }
  runGuarded(n, t, i) {
    return n.apply(t, i);
  }
  runOutsideAngular(n) {
    return n();
  }
  runTask(n, t, i, r) {
    return n.apply(t, i);
  }
};
function iM(e) {
  return Vv(e, "__ignore_ng_zone__");
}
function rM(e) {
  return Vv(e, "__scheduler_tick__");
}
function Vv(e, n) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[n] === !0;
}
function oM(e = "zone.js", n) {
  return e === "noop" ? new Vc() : e === "zone.js" ? new Re(n) : e;
}
var ji = class {
    constructor() {
      this._console = console;
    }
    handleError(n) {
      let t = this._findOriginalError(n);
      this._console.error("ERROR", n),
        t && this._console.error("ORIGINAL ERROR", t);
    }
    _findOriginalError(n) {
      let t = n && Bf(n);
      for (; t && Bf(t); ) t = Bf(t);
      return t || null;
    }
  },
  sM = new z("", {
    providedIn: "root",
    factory: () => {
      let e = O(Re),
        n = O(ji);
      return (t) => e.runOutsideAngular(() => n.handleError(t));
    },
  });
function aM() {
  return ps(qt(), Ve());
}
function ps(e, n) {
  return new Ct(On(e, n));
}
var Ct = (() => {
  class e {
    constructor(t) {
      this.nativeElement = t;
    }
    static {
      this.__NG_ELEMENT_ID__ = aM;
    }
  }
  return e;
})();
function lM(e) {
  return e instanceof Ct ? e.nativeElement : e;
}
function cM() {
  return this._results[Symbol.iterator]();
}
var fh = class e {
  get changes() {
    return (this._changes ??= new Ne());
  }
  constructor(n = !1) {
    (this._emitDistinctChangesOnly = n),
      (this.dirty = !0),
      (this._onDirty = void 0),
      (this._results = []),
      (this._changesDetected = !1),
      (this._changes = void 0),
      (this.length = 0),
      (this.first = void 0),
      (this.last = void 0);
    let t = e.prototype;
    t[Symbol.iterator] || (t[Symbol.iterator] = cM);
  }
  get(n) {
    return this._results[n];
  }
  map(n) {
    return this._results.map(n);
  }
  filter(n) {
    return this._results.filter(n);
  }
  find(n) {
    return this._results.find(n);
  }
  reduce(n, t) {
    return this._results.reduce(n, t);
  }
  forEach(n) {
    this._results.forEach(n);
  }
  some(n) {
    return this._results.some(n);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(n, t) {
    this.dirty = !1;
    let i = PD(n);
    (this._changesDetected = !ND(this._results, i, t)) &&
      ((this._results = i),
      (this.length = i.length),
      (this.last = i[this.length - 1]),
      (this.first = i[0]));
  }
  notifyOnChanges() {
    this._changes !== void 0 &&
      (this._changesDetected || !this._emitDistinctChangesOnly) &&
      this._changes.emit(this);
  }
  onDirty(n) {
    this._onDirty = n;
  }
  setDirty() {
    (this.dirty = !0), this._onDirty?.();
  }
  destroy() {
    this._changes !== void 0 &&
      (this._changes.complete(), this._changes.unsubscribe());
  }
};
function jv(e) {
  return (e.flags & 128) === 128;
}
var Bv = new Map(),
  uM = 0;
function dM() {
  return uM++;
}
function fM(e) {
  Bv.set(e[iu], e);
}
function hh(e) {
  Bv.delete(e[iu]);
}
var d0 = "__ngContext__";
function Tr(e, n) {
  Dr(n) ? ((e[d0] = n[iu]), fM(n)) : (e[d0] = n);
}
function Hv(e) {
  return $v(e[ha]);
}
function Uv(e) {
  return $v(e[Yn]);
}
function $v(e) {
  for (; e !== null && !zi(e); ) e = e[Yn];
  return e;
}
var ph;
function zv(e) {
  ph = e;
}
function hM() {
  if (ph !== void 0) return ph;
  if (typeof document < "u") return document;
  throw new pe(210, !1);
}
var hu = new z("", { providedIn: "root", factory: () => pM }),
  pM = "ng",
  dp = new z(""),
  fn = new z("", { providedIn: "platform", factory: () => "unknown" });
var fp = new z("", {
  providedIn: "root",
  factory: () =>
    hM().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
var gM = "h",
  mM = "b";
var _M = () => null;
function hp(e, n, t = !1) {
  return _M(e, n, t);
}
var Gv = !1,
  vM = new z("", { providedIn: "root", factory: () => Gv });
var gc;
function yM() {
  if (gc === void 0 && ((gc = null), en.trustedTypes))
    try {
      gc = en.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return gc;
}
function f0(e) {
  return yM()?.createScriptURL(e) || e;
}
var jc = class {
  constructor(n) {
    this.changingThisBreaksApplicationSecurity = n;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${S0})`;
  }
};
function gs(e) {
  return e instanceof jc ? e.changingThisBreaksApplicationSecurity : e;
}
function pp(e, n) {
  let t = bM(e);
  if (t != null && t !== n) {
    if (t === "ResourceURL" && n === "URL") return !0;
    throw new Error(`Required a safe ${n}, got a ${t} (see ${S0})`);
  }
  return t === n;
}
function bM(e) {
  return (e instanceof jc && e.getTypeName()) || null;
}
var CM = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Wv(e) {
  return (e = String(e)), e.match(CM) ? e : "unsafe:" + e;
}
var pu = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(pu || {});
function yn(e) {
  let n = Zv();
  return n ? n.sanitize(pu.URL, e) || "" : pp(e, "URL") ? gs(e) : Wv(ts(e));
}
function wM(e) {
  let n = Zv();
  if (n) return f0(n.sanitize(pu.RESOURCE_URL, e) || "");
  if (pp(e, "ResourceURL")) return f0(gs(e));
  throw new pe(904, !1);
}
function DM(e, n) {
  return (n === "src" &&
    (e === "embed" ||
      e === "frame" ||
      e === "iframe" ||
      e === "media" ||
      e === "script")) ||
    (n === "href" && (e === "base" || e === "link"))
    ? wM
    : yn;
}
function qv(e, n, t) {
  return DM(n, t)(e);
}
function Zv() {
  let e = Ve();
  return e && e[mi].sanitizer;
}
var EM = /^>|^->|<!--|-->|--!>|<!-$/g,
  MM = /(<|>)/g,
  IM = "\u200B$1\u200B";
function TM(e) {
  return e.replace(EM, (n) => n.replace(MM, IM));
}
function Yv(e) {
  return e instanceof Function ? e() : e;
}
function Qv(e) {
  return (e ?? O(mt)).get(fn) === "browser";
}
var Bi = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(Bi || {}),
  SM;
function gp(e, n) {
  return SM(e, n);
}
function Jo(e, n, t, i, r) {
  if (i != null) {
    let o,
      s = !1;
    zi(i) ? (o = i) : Dr(i) && ((s = !0), (i = i[$i]));
    let a = _i(i);
    e === 0 && t !== null
      ? r == null
        ? ny(n, t, a)
        : Bc(n, t, a, r || null, !0)
      : e === 1 && t !== null
      ? Bc(n, t, a, r || null, !0)
      : e === 2
      ? UM(n, a, s)
      : e === 3 && n.destroyNode(a),
      o != null && zM(n, e, o, t, r);
  }
}
function xM(e, n) {
  return e.createText(n);
}
function OM(e, n, t) {
  e.setValue(n, t);
}
function NM(e, n) {
  return e.createComment(TM(n));
}
function Kv(e, n, t) {
  return e.createElement(n, t);
}
function PM(e, n) {
  Jv(e, n), (n[$i] = null), (n[dn] = null);
}
function AM(e, n, t, i, r, o) {
  (i[$i] = r), (i[dn] = n), mu(e, i, t, 1, r, o);
}
function Jv(e, n) {
  n[mi].changeDetectionScheduler?.notify(9), mu(e, n, n[gt], 2, null, null);
}
function RM(e) {
  let n = e[ha];
  if (!n) return Hf(e[Ae], e);
  for (; n; ) {
    let t = null;
    if (Dr(n)) t = n[ha];
    else {
      let i = n[vn];
      i && (t = i);
    }
    if (!t) {
      for (; n && !n[Yn] && n !== e; ) Dr(n) && Hf(n[Ae], n), (n = n[Kt]);
      n === null && (n = e), Dr(n) && Hf(n[Ae], n), (t = n && n[Yn]);
    }
    n = t;
  }
}
function kM(e, n, t, i) {
  let r = vn + i,
    o = t.length;
  i > 0 && (t[r - 1][Yn] = n),
    i < o - vn
      ? ((n[Yn] = t[r]), L0(t, vn + i, n))
      : (t.push(n), (n[Yn] = null)),
    (n[Kt] = t);
  let s = n[no];
  s !== null && t !== s && Xv(s, n);
  let a = n[Vi];
  a !== null && a.insertView(e), ih(n), (n[Te] |= 128);
}
function Xv(e, n) {
  let t = e[ss],
    i = n[Kt];
  if (Dr(i)) e[Te] |= Nc.HasTransplantedViews;
  else {
    let r = i[Kt][Sn];
    n[Sn] !== r && (e[Te] |= Nc.HasTransplantedViews);
  }
  t === null ? (e[ss] = [n]) : t.push(n);
}
function mp(e, n) {
  let t = e[ss],
    i = t.indexOf(n);
  t.splice(i, 1);
}
function gh(e, n) {
  if (e.length <= vn) return;
  let t = vn + n,
    i = e[t];
  if (i) {
    let r = i[no];
    r !== null && r !== e && mp(r, i), n > 0 && (e[t - 1][Yn] = i[Yn]);
    let o = Tc(e, vn + n);
    PM(i[Ae], i);
    let s = o[Vi];
    s !== null && s.detachView(o[Ae]),
      (i[Kt] = null),
      (i[Yn] = null),
      (i[Te] &= -129);
  }
  return i;
}
function ey(e, n) {
  if (!(n[Te] & 256)) {
    let t = n[gt];
    t.destroyNode && mu(e, n, t, 3, null, null), RM(n);
  }
}
function Hf(e, n) {
  if (n[Te] & 256) return;
  let t = Ge(null);
  try {
    (n[Te] &= -129),
      (n[Te] |= 256),
      n[Tn] && uf(n[Tn]),
      LM(e, n),
      FM(e, n),
      n[Ae].type === 1 && n[gt].destroy();
    let i = n[no];
    if (i !== null && zi(n[Kt])) {
      i !== n[Kt] && mp(i, n);
      let r = n[Vi];
      r !== null && r.detachView(e);
    }
    hh(n);
  } finally {
    Ge(t);
  }
}
function FM(e, n) {
  let t = e.cleanup,
    i = n[xc];
  if (t !== null)
    for (let o = 0; o < t.length - 1; o += 2)
      if (typeof t[o] == "string") {
        let s = t[o + 3];
        s >= 0 ? i[s]() : i[-s].unsubscribe(), (o += 2);
      } else {
        let s = i[t[o + 1]];
        t[o].call(s);
      }
  i !== null && (n[xc] = null);
  let r = n[wr];
  if (r !== null) {
    n[wr] = null;
    for (let o = 0; o < r.length; o++) {
      let s = r[o];
      s();
    }
  }
}
function LM(e, n) {
  let t;
  if (e != null && (t = e.destroyHooks) != null)
    for (let i = 0; i < t.length; i += 2) {
      let r = n[t[i]];
      if (!(r instanceof so)) {
        let o = t[i + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = r[o[s]],
              l = o[s + 1];
            hi(4, a, l);
            try {
              l.call(a);
            } finally {
              hi(5, a, l);
            }
          }
        else {
          hi(4, r, o);
          try {
            o.call(r);
          } finally {
            hi(5, r, o);
          }
        }
      }
    }
}
function ty(e, n, t) {
  return VM(e, n.parent, t);
}
function VM(e, n, t) {
  let i = n;
  for (; i !== null && i.type & 168; ) (n = i), (i = n.parent);
  if (i === null) return t[$i];
  {
    let { componentOffset: r } = i;
    if (r > -1) {
      let { encapsulation: o } = e.data[i.directiveStart + r];
      if (o === gi.None || o === gi.Emulated) return null;
    }
    return On(i, t);
  }
}
function Bc(e, n, t, i, r) {
  e.insertBefore(n, t, i, r);
}
function ny(e, n, t) {
  e.appendChild(n, t);
}
function h0(e, n, t, i, r) {
  i !== null ? Bc(e, n, t, i, r) : ny(e, n, t);
}
function iy(e, n) {
  return e.parentNode(n);
}
function jM(e, n) {
  return e.nextSibling(n);
}
function ry(e, n, t) {
  return HM(e, n, t);
}
function BM(e, n, t) {
  return e.type & 40 ? On(e, t) : null;
}
var HM = BM,
  p0;
function gu(e, n, t, i) {
  let r = ty(e, i, n),
    o = n[gt],
    s = i.parent || n[dn],
    a = ry(s, i, n);
  if (r != null)
    if (Array.isArray(t))
      for (let l = 0; l < t.length; l++) h0(o, r, t[l], a, !1);
    else h0(o, r, t, a, !1);
  p0 !== void 0 && p0(o, i, n, t, r);
}
function sa(e, n) {
  if (n !== null) {
    let t = n.type;
    if (t & 3) return On(n, e);
    if (t & 4) return mh(-1, e[n.index]);
    if (t & 8) {
      let i = n.child;
      if (i !== null) return sa(e, i);
      {
        let r = e[n.index];
        return zi(r) ? mh(-1, r) : _i(r);
      }
    } else {
      if (t & 128) return sa(e, n.next);
      if (t & 32) return gp(n, e)() || _i(e[n.index]);
      {
        let i = oy(e, n);
        if (i !== null) {
          if (Array.isArray(i)) return i[0];
          let r = ro(e[Sn]);
          return sa(r, i);
        } else return sa(e, n.next);
      }
    }
  }
  return null;
}
function oy(e, n) {
  if (n !== null) {
    let i = e[Sn][dn],
      r = n.projection;
    return i.projection[r];
  }
  return null;
}
function mh(e, n) {
  let t = vn + e + 1;
  if (t < n.length) {
    let i = n[t],
      r = i[Ae].firstChild;
    if (r !== null) return sa(i, r);
  }
  return n[io];
}
function UM(e, n, t) {
  e.removeChild(null, n, t);
}
function _p(e, n, t, i, r, o, s) {
  for (; t != null; ) {
    if (t.type === 128) {
      t = t.next;
      continue;
    }
    let a = i[t.index],
      l = t.type;
    if (
      (s && n === 0 && (a && Tr(_i(a), i), (t.flags |= 2)),
      (t.flags & 32) !== 32)
    )
      if (l & 8) _p(e, n, t.child, i, r, o, !1), Jo(n, e, r, a, o);
      else if (l & 32) {
        let c = gp(t, i),
          u;
        for (; (u = c()); ) Jo(n, e, r, u, o);
        Jo(n, e, r, a, o);
      } else l & 16 ? sy(e, n, i, t, r, o) : Jo(n, e, r, a, o);
    t = s ? t.projectionNext : t.next;
  }
}
function mu(e, n, t, i, r, o) {
  _p(t, i, e.firstChild, n, r, o, !1);
}
function $M(e, n, t) {
  let i = n[gt],
    r = ty(e, t, n),
    o = t.parent || n[dn],
    s = ry(o, t, n);
  sy(i, 0, n, t, r, s);
}
function sy(e, n, t, i, r, o) {
  let s = t[Sn],
    l = s[dn].projection[i.projection];
  if (Array.isArray(l))
    for (let c = 0; c < l.length; c++) {
      let u = l[c];
      Jo(n, e, r, u, o);
    }
  else {
    let c = l,
      u = s[Kt];
    jv(i) && (c.flags |= 128), _p(e, n, c, u, r, o, !0);
  }
}
function zM(e, n, t, i, r) {
  let o = t[io],
    s = _i(t);
  o !== s && Jo(n, e, i, o, r);
  for (let a = vn; a < t.length; a++) {
    let l = t[a];
    mu(l[Ae], l, e, n, i, o);
  }
}
function GM(e, n, t, i, r) {
  if (n) r ? e.addClass(t, i) : e.removeClass(t, i);
  else {
    let o = i.indexOf("-") === -1 ? void 0 : Bi.DashCase;
    r == null
      ? e.removeStyle(t, i, o)
      : (typeof r == "string" &&
          r.endsWith("!important") &&
          ((r = r.slice(0, -10)), (o |= Bi.Important)),
        e.setStyle(t, i, r, o));
  }
}
function WM(e, n, t) {
  e.setAttribute(n, "style", t);
}
function ay(e, n, t) {
  t === "" ? e.removeAttribute(n, "class") : e.setAttribute(n, "class", t);
}
function ly(e, n, t) {
  let { mergedAttrs: i, classes: r, styles: o } = t;
  i !== null && Jf(e, n, i),
    r !== null && ay(e, n, r),
    o !== null && WM(e, n, o);
}
var Pn = {};
function f(e = 1) {
  cy(bt(), Ve(), Or() + e, !1);
}
function cy(e, n, t, i) {
  if (!i)
    if ((n[Te] & 3) === 3) {
      let o = e.preOrderCheckHooks;
      o !== null && Cc(n, o, t);
    } else {
      let o = e.preOrderHooks;
      o !== null && wc(n, o, 0, t);
    }
  oo(t);
}
function X(e, n = je.Default) {
  let t = Ve();
  if (t === null) return q(e, n);
  let i = qt();
  return Pv(i, t, tn(e), n);
}
function uy() {
  let e = "invalid";
  throw new Error(e);
}
function dy(e, n, t, i, r, o) {
  let s = Ge(null);
  try {
    let a = null;
    r & Er.SignalBased && (a = n[i][Pi]),
      a !== null && a.transformFn !== void 0 && (o = a.transformFn(o)),
      r & Er.HasDecoratorInputTransform &&
        (o = e.inputTransforms[i].call(n, o)),
      e.setInput !== null ? e.setInput(n, a, o, t, i) : rv(n, a, i, o);
  } finally {
    Ge(s);
  }
}
function qM(e, n) {
  let t = e.hostBindingOpCodes;
  if (t !== null)
    try {
      for (let i = 0; i < t.length; i++) {
        let r = t[i];
        if (r < 0) oo(~r);
        else {
          let o = r,
            s = t[++i],
            a = t[++i];
          OE(s, o);
          let l = n[o];
          a(2, l);
        }
      }
    } finally {
      oo(-1);
    }
}
function _u(e, n, t, i, r, o, s, a, l, c, u) {
  let d = n.blueprint.slice();
  return (
    (d[$i] = r),
    (d[Te] = i | 4 | 128 | 8 | 64),
    (c !== null || (e && e[Te] & 2048)) && (d[Te] |= 2048),
    uv(d),
    (d[Kt] = d[hs] = e),
    (d[Qn] = t),
    (d[mi] = s || (e && e[mi])),
    (d[gt] = a || (e && e[gt])),
    (d[os] = l || (e && e[os]) || null),
    (d[dn] = o),
    (d[iu] = dM()),
    (d[fa] = u),
    (d[nv] = c),
    (d[Sn] = n.type == 2 ? e[Sn] : d),
    d
  );
}
function ms(e, n, t, i, r) {
  let o = e.data[n];
  if (o === null) (o = ZM(e, n, t, i, r)), xE() && (o.flags |= 32);
  else if (o.type & 64) {
    (o.type = t), (o.value = i), (o.attrs = r);
    let s = ME();
    o.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return uo(o, !0), o;
}
function ZM(e, n, t, i, r) {
  let o = mv(),
    s = tp(),
    a = s ? o : o && o.parent,
    l = (e.data[n] = eI(e, a, t, n, i, r));
  return (
    e.firstChild === null && (e.firstChild = l),
    o !== null &&
      (s
        ? o.child == null && l.parent !== null && (o.child = l)
        : o.next === null && ((o.next = l), (l.prev = o))),
    l
  );
}
function fy(e, n, t, i) {
  if (t === 0) return -1;
  let r = n.length;
  for (let o = 0; o < t; o++) n.push(i), e.blueprint.push(i), e.data.push(null);
  return r;
}
function hy(e, n, t, i, r) {
  let o = Or(),
    s = i & 2;
  try {
    oo(-1), s && n.length > rn && cy(e, n, rn, !1), hi(s ? 2 : 0, r), t(i, r);
  } finally {
    oo(o), hi(s ? 3 : 1, r);
  }
}
function vp(e, n, t) {
  if (Jh(n)) {
    let i = Ge(null);
    try {
      let r = n.directiveStart,
        o = n.directiveEnd;
      for (let s = r; s < o; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let l = t[s];
          a.contentQueries(1, l, s);
        }
      }
    } finally {
      Ge(i);
    }
  }
}
function yp(e, n, t) {
  pv() && (sI(e, n, t, On(t, n)), (t.flags & 64) === 64 && my(e, n, t));
}
function bp(e, n, t = On) {
  let i = n.localNames;
  if (i !== null) {
    let r = n.index + 1;
    for (let o = 0; o < i.length; o += 2) {
      let s = i[o + 1],
        a = s === -1 ? t(n, e) : e[s];
      e[r++] = a;
    }
  }
}
function py(e) {
  let n = e.tView;
  return n === null || n.incompleteFirstPass
    ? (e.tView = Cp(
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
function Cp(e, n, t, i, r, o, s, a, l, c, u) {
  let d = rn + i,
    _ = d + r,
    h = YM(d, _),
    D = typeof c == "function" ? c() : c;
  return (h[Ae] = {
    type: e,
    blueprint: h,
    template: t,
    queries: null,
    viewQuery: a,
    declTNode: n,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: _,
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
    directiveRegistry: typeof o == "function" ? o() : o,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: l,
    consts: D,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function YM(e, n) {
  let t = [];
  for (let i = 0; i < n; i++) t.push(i < e ? null : Pn);
  return t;
}
function QM(e, n, t, i) {
  let o = i.get(vM, Gv) || t === gi.ShadowDom,
    s = e.selectRootElement(n, o);
  return KM(s), s;
}
function KM(e) {
  JM(e);
}
var JM = () => null;
function XM(e, n, t, i) {
  let r = yy(n);
  r.push(t), e.firstCreatePass && by(e).push(i, r.length - 1);
}
function eI(e, n, t, i, r, o) {
  let s = n ? n.injectorIndex : -1,
    a = 0;
  return (
    gv() && (a |= 128),
    {
      type: t,
      index: i,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: r,
      attrs: o,
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
}
function g0(e, n, t, i, r) {
  for (let o in n) {
    if (!n.hasOwnProperty(o)) continue;
    let s = n[o];
    if (s === void 0) continue;
    i ??= {};
    let a,
      l = Er.None;
    Array.isArray(s) ? ((a = s[0]), (l = s[1])) : (a = s);
    let c = o;
    if (r !== null) {
      if (!r.hasOwnProperty(o)) continue;
      c = r[o];
    }
    e === 0 ? m0(i, t, c, a, l) : m0(i, t, c, a);
  }
  return i;
}
function m0(e, n, t, i, r) {
  let o;
  e.hasOwnProperty(t) ? (o = e[t]).push(n, i) : (o = e[t] = [n, i]),
    r !== void 0 && o.push(r);
}
function tI(e, n, t) {
  let i = n.directiveStart,
    r = n.directiveEnd,
    o = e.data,
    s = n.attrs,
    a = [],
    l = null,
    c = null;
  for (let u = i; u < r; u++) {
    let d = o[u],
      _ = t ? t.get(d) : null,
      h = _ ? _.inputs : null,
      D = _ ? _.outputs : null;
    (l = g0(0, d.inputs, u, l, h)), (c = g0(1, d.outputs, u, c, D));
    let I = l !== null && s !== null && !Yh(n) ? _I(l, u, s) : null;
    a.push(I);
  }
  l !== null &&
    (l.hasOwnProperty("class") && (n.flags |= 8),
    l.hasOwnProperty("style") && (n.flags |= 16)),
    (n.initialInputs = a),
    (n.inputs = l),
    (n.outputs = c);
}
function nI(e) {
  return e === "class"
    ? "className"
    : e === "for"
    ? "htmlFor"
    : e === "formaction"
    ? "formAction"
    : e === "innerHtml"
    ? "innerHTML"
    : e === "readonly"
    ? "readOnly"
    : e === "tabindex"
    ? "tabIndex"
    : e;
}
function vu(e, n, t, i, r, o, s, a) {
  let l = On(n, t),
    c = n.inputs,
    u;
  !a && c != null && (u = c[i])
    ? (Dp(e, t, u, i, r), ru(n) && iI(t, n.index))
    : n.type & 3
    ? ((i = nI(i)),
      (r = s != null ? s(r, n.value || "", i) : r),
      o.setProperty(l, i, r))
    : n.type & 12;
}
function iI(e, n) {
  let t = xr(n, e);
  t[Te] & 16 || (t[Te] |= 64);
}
function wp(e, n, t, i) {
  if (pv()) {
    let r = i === null ? null : { "": -1 },
      o = lI(e, t),
      s,
      a;
    o === null ? (s = a = null) : ([s, a] = o),
      s !== null && gy(e, n, t, s, r, a),
      r && cI(t, i, r);
  }
  t.mergedAttrs = ua(t.mergedAttrs, t.attrs);
}
function gy(e, n, t, i, r, o) {
  for (let c = 0; c < i.length; c++) ah(kc(t, n), e, i[c].type);
  dI(t, e.data.length, i.length);
  for (let c = 0; c < i.length; c++) {
    let u = i[c];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    l = fy(e, n, i.length, null);
  for (let c = 0; c < i.length; c++) {
    let u = i[c];
    (t.mergedAttrs = ua(t.mergedAttrs, u.hostAttrs)),
      fI(e, t, n, l, u),
      uI(l, u, r),
      u.contentQueries !== null && (t.flags |= 4),
      (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) &&
        (t.flags |= 64);
    let d = u.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(t.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(t.index), (a = !0)),
      l++;
  }
  tI(e, t, o);
}
function rI(e, n, t, i, r) {
  let o = r.hostBindings;
  if (o) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~n.index;
    oI(s) != a && s.push(a), s.push(t, i, o);
  }
}
function oI(e) {
  let n = e.length;
  for (; n > 0; ) {
    let t = e[--n];
    if (typeof t == "number" && t < 0) return t;
  }
  return 0;
}
function sI(e, n, t, i) {
  let r = t.directiveStart,
    o = t.directiveEnd;
  ru(t) && hI(n, t, e.data[r + t.componentOffset]),
    e.firstCreatePass || kc(t, n),
    Tr(i, n);
  let s = t.initialInputs;
  for (let a = r; a < o; a++) {
    let l = e.data[a],
      c = ao(n, e, a, t);
    if ((Tr(c, n), s !== null && mI(n, a - r, c, l, t, s), Ir(l))) {
      let u = xr(t.index, n);
      u[Qn] = ao(n, e, a, t);
    }
  }
}
function my(e, n, t) {
  let i = t.directiveStart,
    r = t.directiveEnd,
    o = t.index,
    s = NE();
  try {
    oo(o);
    for (let a = i; a < r; a++) {
      let l = e.data[a],
        c = n[a];
      rh(a),
        (l.hostBindings !== null || l.hostVars !== 0 || l.hostAttrs !== null) &&
          aI(l, c);
    }
  } finally {
    oo(-1), rh(s);
  }
}
function aI(e, n) {
  e.hostBindings !== null && e.hostBindings(1, n);
}
function lI(e, n) {
  let t = e.directiveRegistry,
    i = null,
    r = null;
  if (t)
    for (let o = 0; o < t.length; o++) {
      let s = t[o];
      if ($0(n, s.selectors, !1))
        if ((i || (i = []), Ir(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (r = r || new Map()),
              s.findHostDirectiveDefs(s, a, r),
              i.unshift(...a, s);
            let l = a.length;
            _h(e, n, l);
          } else i.unshift(s), _h(e, n, 0);
        else
          (r = r || new Map()), s.findHostDirectiveDefs?.(s, i, r), i.push(s);
    }
  return i === null ? null : [i, r];
}
function _h(e, n, t) {
  (n.componentOffset = t), (e.components ??= []).push(n.index);
}
function cI(e, n, t) {
  if (n) {
    let i = (e.localNames = []);
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r + 1]];
      if (o == null) throw new pe(-301, !1);
      i.push(n[r], o);
    }
  }
}
function uI(e, n, t) {
  if (t) {
    if (n.exportAs)
      for (let i = 0; i < n.exportAs.length; i++) t[n.exportAs[i]] = e;
    Ir(n) && (t[""] = e);
  }
}
function dI(e, n, t) {
  (e.flags |= 1),
    (e.directiveStart = n),
    (e.directiveEnd = n + t),
    (e.providerIndexes = n);
}
function fI(e, n, t, i, r) {
  e.data[i] = r;
  let o = r.factory || (r.factory = to(r.type, !0)),
    s = new so(o, Ir(r), X);
  (e.blueprint[i] = s), (t[i] = s), rI(e, n, i, fy(e, t, r.hostVars, Pn), r);
}
function hI(e, n, t) {
  let i = On(n, e),
    r = py(t),
    o = e[mi].rendererFactory,
    s = 16;
  t.signals ? (s = 4096) : t.onPush && (s = 64);
  let a = yu(
    e,
    _u(e, r, null, s, i, n, null, o.createRenderer(i, t), null, null, null)
  );
  e[n.index] = a;
}
function pI(e, n, t, i, r, o) {
  let s = On(e, n);
  gI(n[gt], s, o, e.value, t, i, r);
}
function gI(e, n, t, i, r, o, s) {
  if (o == null) e.removeAttribute(n, r, t);
  else {
    let a = s == null ? ts(o) : s(o, i || "", r);
    e.setAttribute(n, r, a, t);
  }
}
function mI(e, n, t, i, r, o) {
  let s = o[n];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let l = s[a++],
        c = s[a++],
        u = s[a++],
        d = s[a++];
      dy(i, t, l, c, u, d);
    }
}
function _I(e, n, t) {
  let i = null,
    r = 0;
  for (; r < t.length; ) {
    let o = t[r];
    if (o === 0) {
      r += 4;
      continue;
    } else if (o === 5) {
      r += 2;
      continue;
    }
    if (typeof o == "number") break;
    if (e.hasOwnProperty(o)) {
      i === null && (i = []);
      let s = e[o];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === n) {
          i.push(o, s[a + 1], s[a + 2], t[r + 1]);
          break;
        }
    }
    r += 2;
  }
  return i;
}
function _y(e, n, t, i) {
  return [e, !0, 0, n, null, i, null, t, null, null];
}
function vy(e, n) {
  let t = e.contentQueries;
  if (t !== null) {
    let i = Ge(null);
    try {
      for (let r = 0; r < t.length; r += 2) {
        let o = t[r],
          s = t[r + 1];
        if (s !== -1) {
          let a = e.data[s];
          op(o), a.contentQueries(2, n[s], s);
        }
      }
    } finally {
      Ge(i);
    }
  }
}
function yu(e, n) {
  return e[ha] ? (e[t0][Yn] = n) : (e[ha] = n), (e[t0] = n), n;
}
function vh(e, n, t) {
  op(0);
  let i = Ge(null);
  try {
    n(e, t);
  } finally {
    Ge(i);
  }
}
function yy(e) {
  return (e[xc] ??= []);
}
function by(e) {
  return (e.cleanup ??= []);
}
function Cy(e, n) {
  let t = e[os],
    i = t ? t.get(ji, null) : null;
  i && i.handleError(n);
}
function Dp(e, n, t, i, r) {
  for (let o = 0; o < t.length; ) {
    let s = t[o++],
      a = t[o++],
      l = t[o++],
      c = n[s],
      u = e.data[s];
    dy(u, c, i, a, l, r);
  }
}
function wy(e, n, t) {
  let i = lv(n, e);
  OM(e[gt], i, t);
}
function vI(e, n) {
  let t = xr(n, e),
    i = t[Ae];
  yI(i, t);
  let r = t[$i];
  r !== null && t[fa] === null && (t[fa] = hp(r, t[os])), Ep(i, t, t[Qn]);
}
function yI(e, n) {
  for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t]);
}
function Ep(e, n, t) {
  sp(n);
  try {
    let i = e.viewQuery;
    i !== null && vh(1, i, t);
    let r = e.template;
    r !== null && hy(e, n, r, 1, t),
      e.firstCreatePass && (e.firstCreatePass = !1),
      n[Vi]?.finishViewCreation(e),
      e.staticContentQueries && vy(e, n),
      e.staticViewQueries && vh(2, e.viewQuery, t);
    let o = e.components;
    o !== null && bI(n, o);
  } catch (i) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      i)
    );
  } finally {
    (n[Te] &= -5), ap();
  }
}
function bI(e, n) {
  for (let t = 0; t < n.length; t++) vI(e, n[t]);
}
function Dy(e, n, t, i) {
  let r = Ge(null);
  try {
    let o = n.tView,
      a = e[Te] & 4096 ? 4096 : 16,
      l = _u(
        e,
        o,
        t,
        a,
        null,
        n,
        null,
        null,
        i?.injector ?? null,
        i?.embeddedViewInjector ?? null,
        i?.dehydratedView ?? null
      ),
      c = e[n.index];
    l[no] = c;
    let u = e[Vi];
    return u !== null && (l[Vi] = u.createEmbeddedView(o)), Ep(o, l, t), l;
  } finally {
    Ge(r);
  }
}
function yh(e, n) {
  return !n || n.firstChild === null || jv(e);
}
function Ey(e, n, t, i = !0) {
  let r = n[Ae];
  if ((kM(r, n, e, t), i)) {
    let s = mh(t, e),
      a = n[gt],
      l = iy(a, e[io]);
    l !== null && AM(r, e[dn], a, n, l, s);
  }
  let o = n[fa];
  o !== null && o.firstChild !== null && (o.firstChild = null);
}
function Hc(e, n, t, i, r = !1) {
  for (; t !== null; ) {
    if (t.type === 128) {
      t = r ? t.projectionNext : t.next;
      continue;
    }
    let o = n[t.index];
    o !== null && i.push(_i(o)), zi(o) && CI(o, i);
    let s = t.type;
    if (s & 8) Hc(e, n, t.child, i);
    else if (s & 32) {
      let a = gp(t, n),
        l;
      for (; (l = a()); ) i.push(l);
    } else if (s & 16) {
      let a = oy(n, t);
      if (Array.isArray(a)) i.push(...a);
      else {
        let l = ro(n[Sn]);
        Hc(l[Ae], l, a, i, !0);
      }
    }
    t = r ? t.projectionNext : t.next;
  }
  return i;
}
function CI(e, n) {
  for (let t = vn; t < e.length; t++) {
    let i = e[t],
      r = i[Ae].firstChild;
    r !== null && Hc(i[Ae], i, r, n);
  }
  e[io] !== e[$i] && n.push(e[io]);
}
var My = [];
function wI(e) {
  return e[Tn] ?? DI(e);
}
function DI(e) {
  let n = My.pop() ?? Object.create(MI);
  return (n.lView = e), n;
}
function EI(e) {
  e.lView[Tn] !== e && ((e.lView = null), My.push(e));
}
var MI = Pe(j({}, Js), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    au(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[Tn] = this;
  },
});
function II(e) {
  let n = e[Tn] ?? Object.create(TI);
  return (n.lView = e), n;
}
var TI = Pe(j({}, Js), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let n = ro(e.lView);
    for (; n && !Iy(n[Ae]); ) n = ro(n);
    n && dv(n);
  },
  consumerOnSignalRead() {
    this.lView[Tn] = this;
  },
});
function Iy(e) {
  return e.type !== 2;
}
var SI = 100;
function Ty(e, n = !0, t = 0) {
  let i = e[mi],
    r = i.rendererFactory,
    o = !1;
  o || r.begin?.();
  try {
    xI(e, t);
  } catch (s) {
    throw (n && Cy(e, s), s);
  } finally {
    o || (r.end?.(), i.inlineEffectRunner?.flush());
  }
}
function xI(e, n) {
  let t = _v();
  try {
    i0(!0), bh(e, n);
    let i = 0;
    for (; su(e); ) {
      if (i === SI) throw new pe(103, !1);
      i++, bh(e, 1);
    }
  } finally {
    i0(t);
  }
}
function OI(e, n, t, i) {
  let r = n[Te];
  if ((r & 256) === 256) return;
  let o = !1,
    s = !1;
  !o && n[mi].inlineEffectRunner?.flush(), sp(n);
  let a = !0,
    l = null,
    c = null;
  o ||
    (Iy(e)
      ? ((c = wI(n)), (l = Ll(c)))
      : e_() === null
      ? ((a = !1), (c = II(n)), (l = Ll(c)))
      : n[Tn] && (uf(n[Tn]), (n[Tn] = null)));
  try {
    uv(n), SE(e.bindingStartIndex), t !== null && hy(e, n, t, 2, i);
    let u = (r & 3) === 3;
    if (!o)
      if (u) {
        let h = e.preOrderCheckHooks;
        h !== null && Cc(n, h, null);
      } else {
        let h = e.preOrderHooks;
        h !== null && wc(n, h, 0, null), Lf(n, 0);
      }
    if ((s || NI(n), Sy(n, 0), e.contentQueries !== null && vy(e, n), !o))
      if (u) {
        let h = e.contentCheckHooks;
        h !== null && Cc(n, h);
      } else {
        let h = e.contentHooks;
        h !== null && wc(n, h, 1), Lf(n, 1);
      }
    qM(e, n);
    let d = e.components;
    d !== null && Oy(n, d, 0);
    let _ = e.viewQuery;
    if ((_ !== null && vh(2, _, i), !o))
      if (u) {
        let h = e.viewCheckHooks;
        h !== null && Cc(n, h);
      } else {
        let h = e.viewHooks;
        h !== null && wc(n, h, 2), Lf(n, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), n[Ff])) {
      for (let h of n[Ff]) h();
      n[Ff] = null;
    }
    o || (n[Te] &= -73);
  } catch (u) {
    throw (o || au(n), u);
  } finally {
    c !== null && (lf(c, l), a && EI(c)), ap();
  }
}
function Sy(e, n) {
  for (let t = Hv(e); t !== null; t = Uv(t))
    for (let i = vn; i < t.length; i++) {
      let r = t[i];
      xy(r, n);
    }
}
function NI(e) {
  for (let n = Hv(e); n !== null; n = Uv(n)) {
    if (!(n[Te] & Nc.HasTransplantedViews)) continue;
    let t = n[ss];
    for (let i = 0; i < t.length; i++) {
      let r = t[i];
      dv(r);
    }
  }
}
function PI(e, n, t) {
  let i = xr(n, e);
  xy(i, t);
}
function xy(e, n) {
  ep(e) && bh(e, n);
}
function bh(e, n) {
  let i = e[Ae],
    r = e[Te],
    o = e[Tn],
    s = !!(n === 0 && r & 16);
  if (
    ((s ||= !!(r & 64 && n === 0)),
    (s ||= !!(r & 1024)),
    (s ||= !!(o?.dirty && cf(o))),
    (s ||= !1),
    o && (o.dirty = !1),
    (e[Te] &= -9217),
    s)
  )
    OI(i, e, i.template, e[Qn]);
  else if (r & 8192) {
    Sy(e, 1);
    let a = i.components;
    a !== null && Oy(e, a, 1);
  }
}
function Oy(e, n, t) {
  for (let i = 0; i < n.length; i++) PI(e, n[i], t);
}
function Mp(e, n) {
  let t = _v() ? 64 : 1088;
  for (e[mi].changeDetectionScheduler?.notify(n); e; ) {
    e[Te] |= t;
    let i = ro(e);
    if (nh(e) && !i) return e;
    e = i;
  }
  return null;
}
var lo = class {
    get rootNodes() {
      let n = this._lView,
        t = n[Ae];
      return Hc(t, n, t.firstChild, []);
    }
    constructor(n, t, i = !0) {
      (this._lView = n),
        (this._cdRefInjectingView = t),
        (this.notifyErrorHandler = i),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[Qn];
    }
    set context(n) {
      this._lView[Qn] = n;
    }
    get destroyed() {
      return (this._lView[Te] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let n = this._lView[Kt];
        if (zi(n)) {
          let t = n[Oc],
            i = t ? t.indexOf(this) : -1;
          i > -1 && (gh(n, i), Tc(t, i));
        }
        this._attachedToViewContainer = !1;
      }
      ey(this._lView[Ae], this._lView);
    }
    onDestroy(n) {
      fv(this._lView, n);
    }
    markForCheck() {
      Mp(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[Te] &= -129;
    }
    reattach() {
      ih(this._lView), (this._lView[Te] |= 128);
    }
    detectChanges() {
      (this._lView[Te] |= 1024), Ty(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new pe(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let n = nh(this._lView),
        t = this._lView[no];
      t !== null && !n && mp(t, this._lView), Jv(this._lView[Ae], this._lView);
    }
    attachToAppRef(n) {
      if (this._attachedToViewContainer) throw new pe(902, !1);
      this._appRef = n;
      let t = nh(this._lView),
        i = this._lView[no];
      i !== null && !t && Xv(i, this._lView), ih(this._lView);
    }
  },
  Kn = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = kI;
      }
    }
    return e;
  })(),
  AI = Kn,
  RI = class extends AI {
    constructor(n, t, i) {
      super(),
        (this._declarationLView = n),
        (this._declarationTContainer = t),
        (this.elementRef = i);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(n, t) {
      return this.createEmbeddedViewImpl(n, t);
    }
    createEmbeddedViewImpl(n, t, i) {
      let r = Dy(this._declarationLView, this._declarationTContainer, n, {
        embeddedViewInjector: t,
        dehydratedView: i,
      });
      return new lo(r);
    }
  };
function kI() {
  return bu(qt(), Ve());
}
function bu(e, n) {
  return e.type & 4 ? new RI(n, e, ps(e, n)) : null;
}
var b$ = new RegExp(`^(\\d+)*(${mM}|${gM})*(.*)`);
var FI = () => null;
function Ch(e, n) {
  return FI(e, n);
}
var ls = class {},
  Ip = new z("", { providedIn: "root", factory: () => !1 });
var Ny = new z(""),
  Py = new z(""),
  wh = class {},
  Uc = class {};
function LI(e) {
  let n = Error(`No component factory found for ${nn(e)}.`);
  return (n[VI] = e), n;
}
var VI = "ngComponent";
var Dh = class {
    resolveComponentFactory(n) {
      throw LI(n);
    }
  },
  Hi = class {
    static {
      this.NULL = new Dh();
    }
  },
  cs = class {},
  Wi = (() => {
    class e {
      constructor() {
        this.destroyNode = null;
      }
      static {
        this.__NG_ELEMENT_ID__ = () => jI();
      }
    }
    return e;
  })();
function jI() {
  let e = Ve(),
    n = qt(),
    t = xr(n.index, e);
  return (Dr(t) ? t : e)[gt];
}
var BI = (() => {
  class e {
    static {
      this.ɵprov = G({ token: e, providedIn: "root", factory: () => null });
    }
  }
  return e;
})();
function $c(e, n, t) {
  let i = t ? e.styles : null,
    r = t ? e.classes : null,
    o = 0;
  if (n !== null)
    for (let s = 0; s < n.length; s++) {
      let a = n[s];
      if (typeof a == "number") o = a;
      else if (o == 1) r = Zf(r, a);
      else if (o == 2) {
        let l = a,
          c = n[++s];
        i = Zf(i, l + ": " + c + ";");
      }
    }
  t ? (e.styles = i) : (e.stylesWithoutHost = i),
    t ? (e.classes = r) : (e.classesWithoutHost = r);
}
var zc = class extends Hi {
  constructor(n) {
    super(), (this.ngModule = n);
  }
  resolveComponentFactory(n) {
    let t = Mr(n);
    return new us(t, this.ngModule);
  }
};
function _0(e, n) {
  let t = [];
  for (let i in e) {
    if (!e.hasOwnProperty(i)) continue;
    let r = e[i];
    if (r === void 0) continue;
    let o = Array.isArray(r),
      s = o ? r[0] : r,
      a = o ? r[1] : Er.None;
    n
      ? t.push({
          propName: s,
          templateName: i,
          isSignal: (a & Er.SignalBased) !== 0,
        })
      : t.push({ propName: s, templateName: i });
  }
  return t;
}
function HI(e) {
  let n = e.toLowerCase();
  return n === "svg" ? pE : n === "math" ? gE : null;
}
var us = class extends Uc {
    get inputs() {
      let n = this.componentDef,
        t = n.inputTransforms,
        i = _0(n.inputs, !0);
      if (t !== null)
        for (let r of i)
          t.hasOwnProperty(r.propName) && (r.transform = t[r.propName]);
      return i;
    }
    get outputs() {
      return _0(this.componentDef.outputs, !1);
    }
    constructor(n, t) {
      super(),
        (this.componentDef = n),
        (this.ngModule = t),
        (this.componentType = n.type),
        (this.selector = qD(n.selectors)),
        (this.ngContentSelectors = n.ngContentSelectors
          ? n.ngContentSelectors
          : []),
        (this.isBoundToModule = !!t);
    }
    create(n, t, i, r) {
      let o = Ge(null);
      try {
        r = r || this.ngModule;
        let s = r instanceof Qt ? r : r?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new oh(n, s) : n,
          l = a.get(cs, null);
        if (l === null) throw new pe(407, !1);
        let c = a.get(BI, null),
          u = a.get(ls, null),
          d = {
            rendererFactory: l,
            sanitizer: c,
            inlineEffectRunner: null,
            changeDetectionScheduler: u,
          },
          _ = l.createRenderer(null, this.componentDef),
          h = this.componentDef.selectors[0][0] || "div",
          D = i
            ? QM(_, i, this.componentDef.encapsulation, a)
            : Kv(_, h, HI(h)),
          I = 512;
        this.componentDef.signals
          ? (I |= 4096)
          : this.componentDef.onPush || (I |= 16);
        let P = null;
        D !== null && (P = hp(D, a, !0));
        let F = Cp(0, null, null, 1, 0, null, null, null, null, null, null),
          R = _u(null, F, null, I, null, null, d, _, a, null, P);
        sp(R);
        let T,
          U,
          K = null;
        try {
          let ee = this.componentDef,
            ce,
            Z = null;
          ee.findHostDirectiveDefs
            ? ((ce = []),
              (Z = new Map()),
              ee.findHostDirectiveDefs(ee, ce, Z),
              ce.push(ee))
            : (ce = [ee]);
          let Ee = UI(R, D);
          (K = $I(Ee, D, ee, ce, R, d, _)),
            (U = cv(F, rn)),
            D && WI(_, ee, D, i),
            t !== void 0 && qI(U, this.ngContentSelectors, t),
            (T = GI(K, ee, ce, Z, R, [ZI])),
            Ep(F, R, null);
        } catch (ee) {
          throw (K !== null && hh(K), hh(R), ee);
        } finally {
          ap();
        }
        return new Eh(this.componentType, T, ps(U, R), R, U);
      } finally {
        Ge(o);
      }
    }
  },
  Eh = class extends wh {
    constructor(n, t, i, r, o) {
      super(),
        (this.location = i),
        (this._rootLView = r),
        (this._tNode = o),
        (this.previousInputValues = null),
        (this.instance = t),
        (this.hostView = this.changeDetectorRef = new lo(r, void 0, !1)),
        (this.componentType = n);
    }
    setInput(n, t) {
      let i = this._tNode.inputs,
        r;
      if (i !== null && (r = i[n])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(n) &&
            Object.is(this.previousInputValues.get(n), t))
        )
          return;
        let o = this._rootLView;
        Dp(o[Ae], o, r, n, t), this.previousInputValues.set(n, t);
        let s = xr(this._tNode.index, o);
        Mp(s, 1);
      }
    }
    get injector() {
      return new eo(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(n) {
      this.hostView.onDestroy(n);
    }
  };
function UI(e, n) {
  let t = e[Ae],
    i = rn;
  return (e[i] = n), ms(t, i, 2, "#host", null);
}
function $I(e, n, t, i, r, o, s) {
  let a = r[Ae];
  zI(i, e, n, s);
  let l = null;
  n !== null && (l = hp(n, r[os]));
  let c = o.rendererFactory.createRenderer(n, t),
    u = 16;
  t.signals ? (u = 4096) : t.onPush && (u = 64);
  let d = _u(r, py(t), null, u, r[e.index], e, o, c, null, null, l);
  return (
    a.firstCreatePass && _h(a, e, i.length - 1), yu(r, d), (r[e.index] = d)
  );
}
function zI(e, n, t, i) {
  for (let r of e) n.mergedAttrs = ua(n.mergedAttrs, r.hostAttrs);
  n.mergedAttrs !== null &&
    ($c(n, n.mergedAttrs, !0), t !== null && ly(i, t, n));
}
function GI(e, n, t, i, r, o) {
  let s = qt(),
    a = r[Ae],
    l = On(s, r);
  gy(a, r, s, t, null, i);
  for (let u = 0; u < t.length; u++) {
    let d = s.directiveStart + u,
      _ = ao(r, a, d, s);
    Tr(_, r);
  }
  my(a, r, s), l && Tr(l, r);
  let c = ao(r, a, s.directiveStart + s.componentOffset, s);
  if (((e[Qn] = r[Qn] = c), o !== null)) for (let u of o) u(c, n);
  return vp(a, s, r), c;
}
function WI(e, n, t, i) {
  if (i) Jf(e, t, ["ng-version", "18.2.11"]);
  else {
    let { attrs: r, classes: o } = ZD(n.selectors[0]);
    r && Jf(e, t, r), o && o.length > 0 && ay(e, t, o.join(" "));
  }
}
function qI(e, n, t) {
  let i = (e.projection = []);
  for (let r = 0; r < n.length; r++) {
    let o = t[r];
    i.push(o != null ? Array.from(o) : null);
  }
}
function ZI() {
  let e = qt();
  uu(Ve()[Ae], e);
}
var bn = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = YI;
    }
  }
  return e;
})();
function YI() {
  let e = qt();
  return Ry(e, Ve());
}
var QI = bn,
  Ay = class extends QI {
    constructor(n, t, i) {
      super(),
        (this._lContainer = n),
        (this._hostTNode = t),
        (this._hostLView = i);
    }
    get element() {
      return ps(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new eo(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let n = lp(this._hostTNode, this._hostLView);
      if (Iv(n)) {
        let t = Ac(n, this._hostLView),
          i = Pc(n),
          r = t[Ae].data[i + 8];
        return new eo(r, t);
      } else return new eo(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(n) {
      let t = v0(this._lContainer);
      return (t !== null && t[n]) || null;
    }
    get length() {
      return this._lContainer.length - vn;
    }
    createEmbeddedView(n, t, i) {
      let r, o;
      typeof i == "number"
        ? (r = i)
        : i != null && ((r = i.index), (o = i.injector));
      let s = Ch(this._lContainer, n.ssrId),
        a = n.createEmbeddedViewImpl(t || {}, o, s);
      return this.insertImpl(a, r, yh(this._hostTNode, s)), a;
    }
    createComponent(n, t, i, r, o) {
      let s = n && !uE(n),
        a;
      if (s) a = t;
      else {
        let D = t || {};
        (a = D.index),
          (i = D.injector),
          (r = D.projectableNodes),
          (o = D.environmentInjector || D.ngModuleRef);
      }
      let l = s ? n : new us(Mr(n)),
        c = i || this.parentInjector;
      if (!o && l.ngModule == null) {
        let I = (s ? c : this.parentInjector).get(Qt, null);
        I && (o = I);
      }
      let u = Mr(l.componentType ?? {}),
        d = Ch(this._lContainer, u?.id ?? null),
        _ = d?.firstChild ?? null,
        h = l.create(c, r, _, o);
      return this.insertImpl(h.hostView, a, yh(this._hostTNode, d)), h;
    }
    insert(n, t) {
      return this.insertImpl(n, t, !0);
    }
    insertImpl(n, t, i) {
      let r = n._lView;
      if (_E(r)) {
        let a = this.indexOf(n);
        if (a !== -1) this.detach(a);
        else {
          let l = r[Kt],
            c = new Ay(l, l[dn], l[Kt]);
          c.detach(c.indexOf(n));
        }
      }
      let o = this._adjustIndex(t),
        s = this._lContainer;
      return Ey(s, r, o, i), n.attachToViewContainerRef(), L0(Uf(s), o, n), n;
    }
    move(n, t) {
      return this.insert(n, t);
    }
    indexOf(n) {
      let t = v0(this._lContainer);
      return t !== null ? t.indexOf(n) : -1;
    }
    remove(n) {
      let t = this._adjustIndex(n, -1),
        i = gh(this._lContainer, t);
      i && (Tc(Uf(this._lContainer), t), ey(i[Ae], i));
    }
    detach(n) {
      let t = this._adjustIndex(n, -1),
        i = gh(this._lContainer, t);
      return i && Tc(Uf(this._lContainer), t) != null ? new lo(i) : null;
    }
    _adjustIndex(n, t = 0) {
      return n ?? this.length + t;
    }
  };
function v0(e) {
  return e[Oc];
}
function Uf(e) {
  return e[Oc] || (e[Oc] = []);
}
function Ry(e, n) {
  let t,
    i = n[e.index];
  return (
    zi(i) ? (t = i) : ((t = _y(i, n, null, e)), (n[e.index] = t), yu(n, t)),
    JI(t, n, e, i),
    new Ay(t, e, n)
  );
}
function KI(e, n) {
  let t = e[gt],
    i = t.createComment(""),
    r = On(n, e),
    o = iy(t, r);
  return Bc(t, o, i, jM(t, r), !1), i;
}
var JI = tT,
  XI = () => !1;
function eT(e, n, t) {
  return XI(e, n, t);
}
function tT(e, n, t, i) {
  if (e[io]) return;
  let r;
  t.type & 8 ? (r = _i(i)) : (r = KI(n, t)), (e[io] = r);
}
var Mh = class e {
    constructor(n) {
      (this.queryList = n), (this.matches = null);
    }
    clone() {
      return new e(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  Ih = class e {
    constructor(n = []) {
      this.queries = n;
    }
    createEmbeddedView(n) {
      let t = n.queries;
      if (t !== null) {
        let i = n.contentQueries !== null ? n.contentQueries[0] : t.length,
          r = [];
        for (let o = 0; o < i; o++) {
          let s = t.getByIndex(o),
            a = this.queries[s.indexInDeclarationView];
          r.push(a.clone());
        }
        return new e(r);
      }
      return null;
    }
    insertView(n) {
      this.dirtyQueriesWithMatches(n);
    }
    detachView(n) {
      this.dirtyQueriesWithMatches(n);
    }
    finishViewCreation(n) {
      this.dirtyQueriesWithMatches(n);
    }
    dirtyQueriesWithMatches(n) {
      for (let t = 0; t < this.queries.length; t++)
        Tp(n, t).matches !== null && this.queries[t].setDirty();
    }
  },
  Gc = class {
    constructor(n, t, i = null) {
      (this.flags = t),
        (this.read = i),
        typeof n == "string" ? (this.predicate = cT(n)) : (this.predicate = n);
    }
  },
  Th = class e {
    constructor(n = []) {
      this.queries = n;
    }
    elementStart(n, t) {
      for (let i = 0; i < this.queries.length; i++)
        this.queries[i].elementStart(n, t);
    }
    elementEnd(n) {
      for (let t = 0; t < this.queries.length; t++)
        this.queries[t].elementEnd(n);
    }
    embeddedTView(n) {
      let t = null;
      for (let i = 0; i < this.length; i++) {
        let r = t !== null ? t.length : 0,
          o = this.getByIndex(i).embeddedTView(n, r);
        o &&
          ((o.indexInDeclarationView = i), t !== null ? t.push(o) : (t = [o]));
      }
      return t !== null ? new e(t) : null;
    }
    template(n, t) {
      for (let i = 0; i < this.queries.length; i++)
        this.queries[i].template(n, t);
    }
    getByIndex(n) {
      return this.queries[n];
    }
    get length() {
      return this.queries.length;
    }
    track(n) {
      this.queries.push(n);
    }
  },
  Sh = class e {
    constructor(n, t = -1) {
      (this.metadata = n),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = t);
    }
    elementStart(n, t) {
      this.isApplyingToNode(t) && this.matchTNode(n, t);
    }
    elementEnd(n) {
      this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1);
    }
    template(n, t) {
      this.elementStart(n, t);
    }
    embeddedTView(n, t) {
      return this.isApplyingToNode(n)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-n.index, t),
          new e(this.metadata))
        : null;
    }
    isApplyingToNode(n) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let t = this._declarationNodeIndex,
          i = n.parent;
        for (; i !== null && i.type & 8 && i.index !== t; ) i = i.parent;
        return t === (i !== null ? i.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(n, t) {
      let i = this.metadata.predicate;
      if (Array.isArray(i))
        for (let r = 0; r < i.length; r++) {
          let o = i[r];
          this.matchTNodeWithReadOption(n, t, nT(t, o)),
            this.matchTNodeWithReadOption(n, t, Dc(t, n, o, !1, !1));
        }
      else
        i === Kn
          ? t.type & 4 && this.matchTNodeWithReadOption(n, t, -1)
          : this.matchTNodeWithReadOption(n, t, Dc(t, n, i, !1, !1));
    }
    matchTNodeWithReadOption(n, t, i) {
      if (i !== null) {
        let r = this.metadata.read;
        if (r !== null)
          if (r === Ct || r === bn || (r === Kn && t.type & 4))
            this.addMatch(t.index, -2);
          else {
            let o = Dc(t, n, r, !1, !1);
            o !== null && this.addMatch(t.index, o);
          }
        else this.addMatch(t.index, i);
      }
    }
    addMatch(n, t) {
      this.matches === null ? (this.matches = [n, t]) : this.matches.push(n, t);
    }
  };
function nT(e, n) {
  let t = e.localNames;
  if (t !== null) {
    for (let i = 0; i < t.length; i += 2) if (t[i] === n) return t[i + 1];
  }
  return null;
}
function iT(e, n) {
  return e.type & 11 ? ps(e, n) : e.type & 4 ? bu(e, n) : null;
}
function rT(e, n, t, i) {
  return t === -1 ? iT(n, e) : t === -2 ? oT(e, n, i) : ao(e, e[Ae], t, n);
}
function oT(e, n, t) {
  if (t === Ct) return ps(n, e);
  if (t === Kn) return bu(n, e);
  if (t === bn) return Ry(n, e);
}
function ky(e, n, t, i) {
  let r = n[Vi].queries[i];
  if (r.matches === null) {
    let o = e.data,
      s = t.matches,
      a = [];
    for (let l = 0; s !== null && l < s.length; l += 2) {
      let c = s[l];
      if (c < 0) a.push(null);
      else {
        let u = o[c];
        a.push(rT(n, u, s[l + 1], t.metadata.read));
      }
    }
    r.matches = a;
  }
  return r.matches;
}
function xh(e, n, t, i) {
  let r = e.queries.getByIndex(t),
    o = r.matches;
  if (o !== null) {
    let s = ky(e, n, r, t);
    for (let a = 0; a < o.length; a += 2) {
      let l = o[a];
      if (l > 0) i.push(s[a / 2]);
      else {
        let c = o[a + 1],
          u = n[-l];
        for (let d = vn; d < u.length; d++) {
          let _ = u[d];
          _[no] === _[Kt] && xh(_[Ae], _, c, i);
        }
        if (u[ss] !== null) {
          let d = u[ss];
          for (let _ = 0; _ < d.length; _++) {
            let h = d[_];
            xh(h[Ae], h, c, i);
          }
        }
      }
    }
  }
  return i;
}
function sT(e, n) {
  return e[Vi].queries[n].queryList;
}
function Fy(e, n, t) {
  let i = new fh((t & 4) === 4);
  return (
    XM(e, n, i, i.destroy), (n[Vi] ??= new Ih()).queries.push(new Mh(i)) - 1
  );
}
function aT(e, n, t) {
  let i = bt();
  return (
    i.firstCreatePass &&
      (Ly(i, new Gc(e, n, t), -1), (n & 2) === 2 && (i.staticViewQueries = !0)),
    Fy(i, Ve(), n)
  );
}
function lT(e, n, t, i) {
  let r = bt();
  if (r.firstCreatePass) {
    let o = qt();
    Ly(r, new Gc(n, t, i), o.index),
      uT(r, e),
      (t & 2) === 2 && (r.staticContentQueries = !0);
  }
  return Fy(r, Ve(), t);
}
function cT(e) {
  return e.split(",").map((n) => n.trim());
}
function Ly(e, n, t) {
  e.queries === null && (e.queries = new Th()), e.queries.track(new Sh(n, t));
}
function uT(e, n) {
  let t = e.contentQueries || (e.contentQueries = []),
    i = t.length ? t[t.length - 1] : -1;
  n !== i && t.push(e.queries.length - 1, n);
}
function Tp(e, n) {
  return e.queries.getByIndex(n);
}
function dT(e, n) {
  let t = e[Ae],
    i = Tp(t, n);
  return i.crossesNgTemplate ? xh(t, e, n, []) : ky(t, e, i, n);
}
var y0 = new Set();
function fo(e) {
  y0.has(e) ||
    (y0.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
function fT(e) {
  return typeof e == "function" && e[Pi] !== void 0;
}
function wa(e, n) {
  fo("NgSignals");
  let t = d_(e),
    i = t[Pi];
  return (
    n?.equal && (i.equal = n.equal),
    (t.set = (r) => df(i, r)),
    (t.update = (r) => f_(i, r)),
    (t.asReadonly = hT.bind(t)),
    t
  );
}
function hT() {
  let e = this[Pi];
  if (e.readonlyFn === void 0) {
    let n = () => this();
    (n[Pi] = e), (e.readonlyFn = n);
  }
  return e.readonlyFn;
}
function Vy(e) {
  return fT(e) && typeof e.set == "function";
}
function pT(e) {
  let n = [],
    t = new Map();
  function i(r) {
    let o = t.get(r);
    if (!o) {
      let s = e(r);
      t.set(r, (o = s.then(vT)));
    }
    return o;
  }
  return (
    Wc.forEach((r, o) => {
      let s = [];
      r.templateUrl &&
        s.push(
          i(r.templateUrl).then((c) => {
            r.template = c;
          })
        );
      let a = typeof r.styles == "string" ? [r.styles] : r.styles || [];
      if (((r.styles = a), r.styleUrl && r.styleUrls?.length))
        throw new Error(
          "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"
        );
      if (r.styleUrls?.length) {
        let c = r.styles.length,
          u = r.styleUrls;
        r.styleUrls.forEach((d, _) => {
          a.push(""),
            s.push(
              i(d).then((h) => {
                (a[c + _] = h),
                  u.splice(u.indexOf(d), 1),
                  u.length == 0 && (r.styleUrls = void 0);
              })
            );
        });
      } else
        r.styleUrl &&
          s.push(
            i(r.styleUrl).then((c) => {
              a.push(c), (r.styleUrl = void 0);
            })
          );
      let l = Promise.all(s).then(() => yT(o));
      n.push(l);
    }),
    mT(),
    Promise.all(n).then(() => {})
  );
}
var Wc = new Map(),
  gT = new Set();
function mT() {
  let e = Wc;
  return (Wc = new Map()), e;
}
function _T() {
  return Wc.size === 0;
}
function vT(e) {
  return typeof e == "string" ? e : e.text();
}
function yT(e) {
  gT.delete(e);
}
function bT(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function An(e) {
  let n = bT(e.type),
    t = !0,
    i = [e];
  for (; n; ) {
    let r;
    if (Ir(e)) r = n.ɵcmp || n.ɵdir;
    else {
      if (n.ɵcmp) throw new pe(903, !1);
      r = n.ɵdir;
    }
    if (r) {
      if (t) {
        i.push(r);
        let s = e;
        (s.inputs = mc(e.inputs)),
          (s.inputTransforms = mc(e.inputTransforms)),
          (s.declaredInputs = mc(e.declaredInputs)),
          (s.outputs = mc(e.outputs));
        let a = r.hostBindings;
        a && MT(e, a);
        let l = r.viewQuery,
          c = r.contentQueries;
        if (
          (l && DT(e, l),
          c && ET(e, c),
          CT(e, r),
          fD(e.outputs, r.outputs),
          Ir(r) && r.data.animation)
        ) {
          let u = e.data;
          u.animation = (u.animation || []).concat(r.data.animation);
        }
      }
      let o = r.features;
      if (o)
        for (let s = 0; s < o.length; s++) {
          let a = o[s];
          a && a.ngInherit && a(e), a === An && (t = !1);
        }
    }
    n = Object.getPrototypeOf(n);
  }
  wT(i);
}
function CT(e, n) {
  for (let t in n.inputs) {
    if (!n.inputs.hasOwnProperty(t) || e.inputs.hasOwnProperty(t)) continue;
    let i = n.inputs[t];
    if (
      i !== void 0 &&
      ((e.inputs[t] = i),
      (e.declaredInputs[t] = n.declaredInputs[t]),
      n.inputTransforms !== null)
    ) {
      let r = Array.isArray(i) ? i[0] : i;
      if (!n.inputTransforms.hasOwnProperty(r)) continue;
      (e.inputTransforms ??= {}), (e.inputTransforms[r] = n.inputTransforms[r]);
    }
  }
}
function wT(e) {
  let n = 0,
    t = null;
  for (let i = e.length - 1; i >= 0; i--) {
    let r = e[i];
    (r.hostVars = n += r.hostVars),
      (r.hostAttrs = ua(r.hostAttrs, (t = ua(t, r.hostAttrs))));
  }
}
function mc(e) {
  return e === ns ? {} : e === un ? [] : e;
}
function DT(e, n) {
  let t = e.viewQuery;
  t
    ? (e.viewQuery = (i, r) => {
        n(i, r), t(i, r);
      })
    : (e.viewQuery = n);
}
function ET(e, n) {
  let t = e.contentQueries;
  t
    ? (e.contentQueries = (i, r, o) => {
        n(i, r, o), t(i, r, o);
      })
    : (e.contentQueries = n);
}
function MT(e, n) {
  let t = e.hostBindings;
  t
    ? (e.hostBindings = (i, r) => {
        n(i, r), t(i, r);
      })
    : (e.hostBindings = n);
}
function _s(e) {
  let n = e.inputConfig,
    t = {};
  for (let i in n)
    if (n.hasOwnProperty(i)) {
      let r = n[i];
      Array.isArray(r) && r[3] && (t[i] = r[3]);
    }
  e.inputTransforms = t;
}
var Sr = class {},
  ga = class {};
var qc = class extends Sr {
    constructor(n, t, i, r = !0) {
      super(),
        (this.ngModuleType = n),
        (this._parent = t),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new zc(this));
      let o = q0(n);
      (this._bootstrapComponents = Yv(o.bootstrap)),
        (this._r3Injector = kv(
          n,
          t,
          [
            { provide: Sr, useValue: this },
            { provide: Hi, useValue: this.componentFactoryResolver },
            ...i,
          ],
          nn(n),
          new Set(["environment"])
        )),
        r && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let n = this._r3Injector;
      !n.destroyed && n.destroy(),
        this.destroyCbs.forEach((t) => t()),
        (this.destroyCbs = null);
    }
    onDestroy(n) {
      this.destroyCbs.push(n);
    }
  },
  Zc = class extends ga {
    constructor(n) {
      super(), (this.moduleType = n);
    }
    create(n) {
      return new qc(this.moduleType, n, []);
    }
  };
function IT(e, n, t) {
  return new qc(e, n, t, !1);
}
var Oh = class extends Sr {
  constructor(n) {
    super(),
      (this.componentFactoryResolver = new zc(this)),
      (this.instance = null);
    let t = new da(
      [
        ...n.providers,
        { provide: Sr, useValue: this },
        { provide: Hi, useValue: this.componentFactoryResolver },
      ],
      n.parent || Kh(),
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
};
function Cu(e, n, t = null) {
  return new Oh({
    providers: e,
    parent: n,
    debugName: t,
    runEnvironmentInitializers: !0,
  }).injector;
}
function jy(e) {
  return ST(e)
    ? Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e)
    : !1;
}
function TT(e, n) {
  if (Array.isArray(e)) for (let t = 0; t < e.length; t++) n(e[t]);
  else {
    let t = e[Symbol.iterator](),
      i;
    for (; !(i = t.next()).done; ) n(i.value);
  }
}
function ST(e) {
  return e !== null && (typeof e == "function" || typeof e == "object");
}
function By(e, n, t) {
  return (e[n] = t);
}
function vi(e, n, t) {
  let i = e[n];
  return Object.is(i, t) ? !1 : ((e[n] = t), !0);
}
function Hy(e, n, t, i) {
  let r = vi(e, n, t);
  return vi(e, n + 1, i) || r;
}
function xT(e) {
  return (e.flags & 32) === 32;
}
function OT(e, n, t, i, r, o, s, a, l) {
  let c = n.consts,
    u = ms(n, e, 4, s || null, a || null);
  wp(n, t, u, as(c, l)), uu(n, u);
  let d = (u.tView = Cp(
    2,
    u,
    i,
    r,
    o,
    n.directiveRegistry,
    n.pipeRegistry,
    null,
    n.schemas,
    c,
    null
  ));
  return (
    n.queries !== null &&
      (n.queries.template(n, u), (d.queries = n.queries.embeddedTView(u))),
    u
  );
}
function Uy(e, n, t, i, r, o, s, a, l, c) {
  let u = t + rn,
    d = n.firstCreatePass ? OT(u, n, e, i, r, o, s, a, l) : n.data[u];
  uo(d, !1);
  let _ = NT(n, e, d, t);
  lu() && gu(n, e, _, d), Tr(_, e);
  let h = _y(_, e, _, d);
  return (
    (e[u] = h),
    yu(e, h),
    eT(h, d, e),
    ou(d) && yp(n, e, d),
    l != null && bp(e, d, c),
    d
  );
}
function ie(e, n, t, i, r, o, s, a) {
  let l = Ve(),
    c = bt(),
    u = as(c.consts, o);
  return Uy(l, c, e, n, t, i, r, u, s, a), ie;
}
var NT = PT;
function PT(e, n, t, i) {
  return cu(!0), n[gt].createComment("");
}
var Li = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(Li || {}),
  $y = (() => {
    class e {
      constructor() {
        this.impl = null;
      }
      execute() {
        this.impl?.execute();
      }
      static {
        this.ɵprov = G({
          token: e,
          providedIn: "root",
          factory: () => new e(),
        });
      }
    }
    return e;
  })(),
  Nh = class e {
    constructor() {
      (this.ngZone = O(Re)),
        (this.scheduler = O(ls)),
        (this.errorHandler = O(ji, { optional: !0 })),
        (this.sequences = new Set()),
        (this.deferredRegistrations = new Set()),
        (this.executing = !1);
    }
    static {
      this.PHASES = [Li.EarlyRead, Li.Write, Li.MixedReadWrite, Li.Read];
    }
    execute() {
      this.executing = !0;
      for (let n of e.PHASES)
        for (let t of this.sequences)
          if (!(t.erroredOrDestroyed || !t.hooks[n]))
            try {
              t.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                t.hooks[n](t.pipelinedValue)
              );
            } catch (i) {
              (t.erroredOrDestroyed = !0), this.errorHandler?.handleError(i);
            }
      this.executing = !1;
      for (let n of this.sequences)
        n.afterRun(), n.once && (this.sequences.delete(n), n.destroy());
      for (let n of this.deferredRegistrations) this.sequences.add(n);
      this.deferredRegistrations.size > 0 && this.scheduler.notify(7),
        this.deferredRegistrations.clear();
    }
    register(n) {
      this.executing
        ? this.deferredRegistrations.add(n)
        : (this.sequences.add(n), this.scheduler.notify(6));
    }
    unregister(n) {
      this.executing && this.sequences.has(n)
        ? ((n.erroredOrDestroyed = !0),
          (n.pipelinedValue = void 0),
          (n.once = !0))
        : (this.sequences.delete(n), this.deferredRegistrations.delete(n));
    }
    static {
      this.ɵprov = G({ token: e, providedIn: "root", factory: () => new e() });
    }
  },
  Ph = class {
    constructor(n, t, i, r) {
      (this.impl = n),
        (this.hooks = t),
        (this.once = i),
        (this.erroredOrDestroyed = !1),
        (this.pipelinedValue = void 0),
        (this.unregisterOnDestroy = r?.onDestroy(() => this.destroy()));
    }
    afterRun() {
      (this.erroredOrDestroyed = !1), (this.pipelinedValue = void 0);
    }
    destroy() {
      this.impl.unregister(this), this.unregisterOnDestroy?.();
    }
  };
function Sp(e, n) {
  !n?.injector && tv(Sp);
  let t = n?.injector ?? O(mt);
  return Qv(t) ? (fo("NgAfterRender"), zy(e, t, n, !1)) : Gy;
}
function ho(e, n) {
  !n?.injector && tv(ho);
  let t = n?.injector ?? O(mt);
  return Qv(t) ? (fo("NgAfterNextRender"), zy(e, t, n, !0)) : Gy;
}
function AT(e, n) {
  if (e instanceof Function) {
    let t = [void 0, void 0, void 0, void 0];
    return (t[n] = e), t;
  } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read];
}
function zy(e, n, t, i) {
  let r = n.get($y);
  r.impl ??= n.get(Nh);
  let o = t?.phase ?? Li.MixedReadWrite,
    s = t?.manualCleanup !== !0 ? n.get(fu) : null,
    a = new Ph(r.impl, AT(e, o), i, s);
  return r.impl.register(a), a;
}
var Gy = { destroy() {} };
function po(e, n, t, i) {
  let r = Ve(),
    o = ba();
  if (vi(r, o, n)) {
    let s = bt(),
      a = Ca();
    pI(a, r, e, n, t, i);
  }
  return po;
}
function Wy(e, n, t, i) {
  return vi(e, ba(), t) ? n + ts(t) + i : Pn;
}
function RT(e, n, t, i, r, o) {
  let s = TE(),
    a = Hy(e, s, t, r);
  return rp(2), a ? n + ts(t) + i + ts(r) + o : Pn;
}
function _c(e, n) {
  return (e << 17) | (n << 2);
}
function co(e) {
  return (e >> 17) & 32767;
}
function kT(e) {
  return (e & 2) == 2;
}
function FT(e, n) {
  return (e & 131071) | (n << 17);
}
function Ah(e) {
  return e | 2;
}
function ds(e) {
  return (e & 131068) >> 2;
}
function $f(e, n) {
  return (e & -131069) | (n << 2);
}
function LT(e) {
  return (e & 1) === 1;
}
function Rh(e) {
  return e | 1;
}
function VT(e, n, t, i, r, o) {
  let s = o ? n.classBindings : n.styleBindings,
    a = co(s),
    l = ds(s);
  e[i] = t;
  let c = !1,
    u;
  if (Array.isArray(t)) {
    let d = t;
    (u = d[1]), (u === null || va(d, u) > 0) && (c = !0);
  } else u = t;
  if (r)
    if (l !== 0) {
      let _ = co(e[a + 1]);
      (e[i + 1] = _c(_, a)),
        _ !== 0 && (e[_ + 1] = $f(e[_ + 1], i)),
        (e[a + 1] = FT(e[a + 1], i));
    } else
      (e[i + 1] = _c(a, 0)), a !== 0 && (e[a + 1] = $f(e[a + 1], i)), (a = i);
  else
    (e[i + 1] = _c(l, 0)),
      a === 0 ? (a = i) : (e[l + 1] = $f(e[l + 1], i)),
      (l = i);
  c && (e[i + 1] = Ah(e[i + 1])),
    b0(e, u, i, !0),
    b0(e, u, i, !1),
    jT(n, u, e, i, o),
    (s = _c(a, l)),
    o ? (n.classBindings = s) : (n.styleBindings = s);
}
function jT(e, n, t, i, r) {
  let o = r ? e.residualClasses : e.residualStyles;
  o != null &&
    typeof n == "string" &&
    va(o, n) >= 0 &&
    (t[i + 1] = Rh(t[i + 1]));
}
function b0(e, n, t, i) {
  let r = e[t + 1],
    o = n === null,
    s = i ? co(r) : ds(r),
    a = !1;
  for (; s !== 0 && (a === !1 || o); ) {
    let l = e[s],
      c = e[s + 1];
    BT(l, n) && ((a = !0), (e[s + 1] = i ? Rh(c) : Ah(c))),
      (s = i ? co(c) : ds(c));
  }
  a && (e[t + 1] = i ? Ah(r) : Rh(r));
}
function BT(e, n) {
  return e === null || n == null || (Array.isArray(e) ? e[1] : e) === n
    ? !0
    : Array.isArray(e) && typeof n == "string"
    ? va(e, n) >= 0
    : !1;
}
var Zn = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function HT(e) {
  return e.substring(Zn.key, Zn.keyEnd);
}
function UT(e) {
  return $T(e), qy(e, Zy(e, 0, Zn.textEnd));
}
function qy(e, n) {
  let t = Zn.textEnd;
  return t === n ? -1 : ((n = Zn.keyEnd = zT(e, (Zn.key = n), t)), Zy(e, n, t));
}
function $T(e) {
  (Zn.key = 0),
    (Zn.keyEnd = 0),
    (Zn.value = 0),
    (Zn.valueEnd = 0),
    (Zn.textEnd = e.length);
}
function Zy(e, n, t) {
  for (; n < t && e.charCodeAt(n) <= 32; ) n++;
  return n;
}
function zT(e, n, t) {
  for (; n < t && e.charCodeAt(n) > 32; ) n++;
  return n;
}
function x(e, n, t) {
  let i = Ve(),
    r = ba();
  if (vi(i, r, n)) {
    let o = bt(),
      s = Ca();
    vu(o, s, i, e, n, i[gt], t, !1);
  }
  return x;
}
function kh(e, n, t, i, r) {
  let o = n.inputs,
    s = r ? "class" : "style";
  Dp(e, t, o[s], s, i);
}
function Cn(e, n, t) {
  return Yy(e, n, t, !1), Cn;
}
function _t(e, n) {
  return Yy(e, n, null, !0), _t;
}
function wu(e) {
  WT(JT, GT, e, !0);
}
function GT(e, n) {
  for (let t = UT(n); t >= 0; t = qy(n, t)) Zh(e, HT(n), !0);
}
function Yy(e, n, t, i) {
  let r = Ve(),
    o = bt(),
    s = rp(2);
  if ((o.firstUpdatePass && Ky(o, e, s, i), n !== Pn && vi(r, s, n))) {
    let a = o.data[Or()];
    Jy(o, a, r, r[gt], e, (r[s + 1] = eS(n, t)), i, s);
  }
}
function WT(e, n, t, i) {
  let r = bt(),
    o = rp(2);
  r.firstUpdatePass && Ky(r, null, o, i);
  let s = Ve();
  if (t !== Pn && vi(s, o, t)) {
    let a = r.data[Or()];
    if (Xy(a, i) && !Qy(r, o)) {
      let l = i ? a.classesWithoutHost : a.stylesWithoutHost;
      l !== null && (t = Zf(l, t || "")), kh(r, a, s, t, i);
    } else XT(r, a, s, s[gt], s[o + 1], (s[o + 1] = KT(e, n, t)), i, o);
  }
}
function Qy(e, n) {
  return n >= e.expandoStartIndex;
}
function Ky(e, n, t, i) {
  let r = e.data;
  if (r[t + 1] === null) {
    let o = r[Or()],
      s = Qy(e, t);
    Xy(o, i) && n === null && !s && (n = !1),
      (n = qT(r, o, n, i)),
      VT(r, o, n, t, s, i);
  }
}
function qT(e, n, t, i) {
  let r = PE(e),
    o = i ? n.residualClasses : n.residualStyles;
  if (r === null)
    (i ? n.classBindings : n.styleBindings) === 0 &&
      ((t = zf(null, e, n, t, i)), (t = ma(t, n.attrs, i)), (o = null));
  else {
    let s = n.directiveStylingLast;
    if (s === -1 || e[s] !== r)
      if (((t = zf(r, e, n, t, i)), o === null)) {
        let l = ZT(e, n, i);
        l !== void 0 &&
          Array.isArray(l) &&
          ((l = zf(null, e, n, l[1], i)),
          (l = ma(l, n.attrs, i)),
          YT(e, n, i, l));
      } else o = QT(e, n, i);
  }
  return (
    o !== void 0 && (i ? (n.residualClasses = o) : (n.residualStyles = o)), t
  );
}
function ZT(e, n, t) {
  let i = t ? n.classBindings : n.styleBindings;
  if (ds(i) !== 0) return e[co(i)];
}
function YT(e, n, t, i) {
  let r = t ? n.classBindings : n.styleBindings;
  e[co(r)] = i;
}
function QT(e, n, t) {
  let i,
    r = n.directiveEnd;
  for (let o = 1 + n.directiveStylingLast; o < r; o++) {
    let s = e[o].hostAttrs;
    i = ma(i, s, t);
  }
  return ma(i, n.attrs, t);
}
function zf(e, n, t, i, r) {
  let o = null,
    s = t.directiveEnd,
    a = t.directiveStylingLast;
  for (
    a === -1 ? (a = t.directiveStart) : a++;
    a < s && ((o = n[a]), (i = ma(i, o.hostAttrs, r)), o !== e);

  )
    a++;
  return e !== null && (t.directiveStylingLast = a), i;
}
function ma(e, n, t) {
  let i = t ? 1 : 2,
    r = -1;
  if (n !== null)
    for (let o = 0; o < n.length; o++) {
      let s = n[o];
      typeof s == "number"
        ? (r = s)
        : r === i &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          Zh(e, s, t ? !0 : n[++o]));
    }
  return e === void 0 ? null : e;
}
function KT(e, n, t) {
  if (t == null || t === "") return un;
  let i = [],
    r = gs(t);
  if (Array.isArray(r)) for (let o = 0; o < r.length; o++) e(i, r[o], !0);
  else if (typeof r == "object")
    for (let o in r) r.hasOwnProperty(o) && e(i, o, r[o]);
  else typeof r == "string" && n(i, r);
  return i;
}
function JT(e, n, t) {
  let i = String(n);
  i !== "" && !i.includes(" ") && Zh(e, i, t);
}
function XT(e, n, t, i, r, o, s, a) {
  r === Pn && (r = un);
  let l = 0,
    c = 0,
    u = 0 < r.length ? r[0] : null,
    d = 0 < o.length ? o[0] : null;
  for (; u !== null || d !== null; ) {
    let _ = l < r.length ? r[l + 1] : void 0,
      h = c < o.length ? o[c + 1] : void 0,
      D = null,
      I;
    u === d
      ? ((l += 2), (c += 2), _ !== h && ((D = d), (I = h)))
      : d === null || (u !== null && u < d)
      ? ((l += 2), (D = u))
      : ((c += 2), (D = d), (I = h)),
      D !== null && Jy(e, n, t, i, D, I, s, a),
      (u = l < r.length ? r[l] : null),
      (d = c < o.length ? o[c] : null);
  }
}
function Jy(e, n, t, i, r, o, s, a) {
  if (!(n.type & 3)) return;
  let l = e.data,
    c = l[a + 1],
    u = LT(c) ? C0(l, n, t, r, ds(c), s) : void 0;
  if (!Yc(u)) {
    Yc(o) || (kT(c) && (o = C0(l, null, t, r, a, s)));
    let d = lv(Or(), t);
    GM(i, s, d, r, o);
  }
}
function C0(e, n, t, i, r, o) {
  let s = n === null,
    a;
  for (; r > 0; ) {
    let l = e[r],
      c = Array.isArray(l),
      u = c ? l[1] : l,
      d = u === null,
      _ = t[r + 1];
    _ === Pn && (_ = d ? un : void 0);
    let h = d ? Rf(_, i) : u === i ? _ : void 0;
    if ((c && !Yc(h) && (h = Rf(l, i)), Yc(h) && ((a = h), s))) return a;
    let D = e[r + 1];
    r = s ? co(D) : ds(D);
  }
  if (n !== null) {
    let l = o ? n.residualClasses : n.residualStyles;
    l != null && (a = Rf(l, i));
  }
  return a;
}
function Yc(e) {
  return e !== void 0;
}
function eS(e, n) {
  return (
    e == null ||
      e === "" ||
      (typeof n == "string"
        ? (e = e + n)
        : typeof e == "object" && (e = nn(gs(e)))),
    e
  );
}
function Xy(e, n) {
  return (e.flags & (n ? 8 : 16)) !== 0;
}
function tS(e, n, t, i, r, o) {
  let s = n.consts,
    a = as(s, r),
    l = ms(n, e, 2, i, a);
  return (
    wp(n, t, l, as(s, o)),
    l.attrs !== null && $c(l, l.attrs, !1),
    l.mergedAttrs !== null && $c(l, l.mergedAttrs, !0),
    n.queries !== null && n.queries.elementStart(n, l),
    l
  );
}
function g(e, n, t, i) {
  let r = Ve(),
    o = bt(),
    s = rn + e,
    a = r[gt],
    l = o.firstCreatePass ? tS(s, o, r, n, t, i) : o.data[s],
    c = nS(o, r, l, a, n, e);
  r[s] = c;
  let u = ou(l);
  return (
    uo(l, !0),
    ly(a, c, l),
    !xT(l) && lu() && gu(o, r, c, l),
    bE() === 0 && Tr(c, r),
    CE(),
    u && (yp(o, r, l), vp(o, l, r)),
    i !== null && bp(r, l),
    g
  );
}
function m() {
  let e = qt();
  tp() ? np() : ((e = e.parent), uo(e, !1));
  let n = e;
  DE(n) && EE(), wE();
  let t = bt();
  return (
    t.firstCreatePass && (uu(t, e), Jh(e) && t.queries.elementEnd(e)),
    n.classesWithoutHost != null &&
      jE(n) &&
      kh(t, n, Ve(), n.classesWithoutHost, !0),
    n.stylesWithoutHost != null &&
      BE(n) &&
      kh(t, n, Ve(), n.stylesWithoutHost, !1),
    m
  );
}
function Y(e, n, t, i) {
  return g(e, n, t, i), m(), Y;
}
var nS = (e, n, t, i, r, o) => (cu(!0), Kv(i, r, kE()));
function iS(e, n, t, i, r) {
  let o = n.consts,
    s = as(o, i),
    a = ms(n, e, 8, "ng-container", s);
  s !== null && $c(a, s, !0);
  let l = as(o, r);
  return wp(n, t, a, l), n.queries !== null && n.queries.elementStart(n, a), a;
}
function bi(e, n, t) {
  let i = Ve(),
    r = bt(),
    o = e + rn,
    s = r.firstCreatePass ? iS(o, r, i, n, t) : r.data[o];
  uo(s, !0);
  let a = rS(r, i, s, e);
  return (
    (i[o] = a),
    lu() && gu(r, i, a, s),
    Tr(a, i),
    ou(s) && (yp(r, i, s), vp(r, s, i)),
    t != null && bp(i, s),
    bi
  );
}
function Ci() {
  let e = qt(),
    n = bt();
  return (
    tp() ? np() : ((e = e.parent), uo(e, !1)),
    n.firstCreatePass && (uu(n, e), Jh(e) && n.queries.elementEnd(e)),
    Ci
  );
}
function Du(e, n, t) {
  return bi(e, n, t), Ci(), Du;
}
var rS = (e, n, t, i) => (cu(!0), NM(n[gt], ""));
function $e() {
  return Ve();
}
function xp(e, n, t) {
  let i = Ve(),
    r = ba();
  if (vi(i, r, n)) {
    let o = bt(),
      s = Ca();
    vu(o, s, i, e, n, i[gt], t, !0);
  }
  return xp;
}
var Xr = void 0;
function oS(e) {
  let n = e,
    t = Math.floor(Math.abs(e)),
    i = e.toString().replace(/^[^.]*\.?/, "").length;
  return t === 1 && i === 0 ? 1 : 5;
}
var sS = [
    "en",
    [["a", "p"], ["AM", "PM"], Xr],
    [["AM", "PM"], Xr, Xr],
    [
      ["S", "M", "T", "W", "T", "F", "S"],
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    ],
    Xr,
    [
      ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    ],
    Xr,
    [
      ["B", "A"],
      ["BC", "AD"],
      ["Before Christ", "Anno Domini"],
    ],
    0,
    [6, 0],
    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
    ["{1}, {0}", Xr, "{1} 'at' {0}", Xr],
    [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
    ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
    "USD",
    "$",
    "US Dollar",
    {},
    "ltr",
    oS,
  ],
  Gf = {};
function Rn(e) {
  let n = aS(e),
    t = w0(n);
  if (t) return t;
  let i = n.split("-")[0];
  if (((t = w0(i)), t)) return t;
  if (i === "en") return sS;
  throw new pe(701, !1);
}
function w0(e) {
  return (
    e in Gf ||
      (Gf[e] =
        en.ng &&
        en.ng.common &&
        en.ng.common.locales &&
        en.ng.common.locales[e]),
    Gf[e]
  );
}
var Et = (function (e) {
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
})(Et || {});
function aS(e) {
  return e.toLowerCase().replace(/_/g, "-");
}
var Qc = "en-US";
var lS = Qc;
function cS(e) {
  typeof e == "string" && (lS = e.toLowerCase().replace(/_/g, "-"));
}
var uS = (e, n, t) => {};
function me(e, n, t, i) {
  let r = Ve(),
    o = bt(),
    s = qt();
  return eb(o, r, r[gt], s, e, n, i), me;
}
function dS(e, n, t, i) {
  let r = e.cleanup;
  if (r != null)
    for (let o = 0; o < r.length - 1; o += 2) {
      let s = r[o];
      if (s === t && r[o + 1] === i) {
        let a = n[xc],
          l = r[o + 2];
        return a.length > l ? a[l] : null;
      }
      typeof s == "string" && (o += 2);
    }
  return null;
}
function eb(e, n, t, i, r, o, s) {
  let a = ou(i),
    c = e.firstCreatePass && by(e),
    u = n[Qn],
    d = yy(n),
    _ = !0;
  if (i.type & 3 || s) {
    let I = On(i, n),
      P = s ? s(I) : I,
      F = d.length,
      R = s ? (U) => s(_i(U[i.index])) : i.index,
      T = null;
    if ((!s && a && (T = dS(e, n, r, i.index)), T !== null)) {
      let U = T.__ngLastListenerFn__ || T;
      (U.__ngNextListenerFn__ = o), (T.__ngLastListenerFn__ = o), (_ = !1);
    } else {
      (o = E0(i, n, u, o)), uS(I, r, o);
      let U = t.listen(P, r, o);
      d.push(o, U), c && c.push(r, R, F, F + 1);
    }
  } else o = E0(i, n, u, o);
  let h = i.outputs,
    D;
  if (_ && h !== null && (D = h[r])) {
    let I = D.length;
    if (I)
      for (let P = 0; P < I; P += 2) {
        let F = D[P],
          R = D[P + 1],
          K = n[F][R].subscribe(o),
          ee = d.length;
        d.push(o, K), c && c.push(r, i.index, ee, -(ee + 1));
      }
  }
}
function D0(e, n, t, i) {
  let r = Ge(null);
  try {
    return hi(6, n, t), t(i) !== !1;
  } catch (o) {
    return Cy(e, o), !1;
  } finally {
    hi(7, n, t), Ge(r);
  }
}
function E0(e, n, t, i) {
  return function r(o) {
    if (o === Function) return i;
    let s = e.componentOffset > -1 ? xr(e.index, n) : n;
    Mp(s, 5);
    let a = D0(n, t, i, o),
      l = r.__ngNextListenerFn__;
    for (; l; ) (a = D0(n, t, l, o) && a), (l = l.__ngNextListenerFn__);
    return a;
  };
}
function W(e = 1) {
  return RE(e);
}
function fS(e, n) {
  let t = null,
    i = UD(e);
  for (let r = 0; r < n.length; r++) {
    let o = n[r];
    if (o === "*") {
      t = r;
      continue;
    }
    if (i === null ? $0(e, o, !0) : GD(i, o)) return r;
  }
  return t;
}
function Jn(e) {
  let n = Ve()[Sn][dn];
  if (!n.projection) {
    let t = e ? e.length : 1,
      i = (n.projection = AD(t, null)),
      r = i.slice(),
      o = n.child;
    for (; o !== null; ) {
      if (o.type !== 128) {
        let s = e ? fS(o, e) : 0;
        s !== null &&
          (r[s] ? (r[s].projectionNext = o) : (i[s] = o), (r[s] = o));
      }
      o = o.next;
    }
  }
}
function Xn(e, n = 0, t, i, r, o) {
  let s = Ve(),
    a = bt(),
    l = i ? e + 1 : null;
  l !== null && Uy(s, a, l, i, r, o, null, t);
  let c = ms(a, rn + e, 16, null, t || null);
  c.projection === null && (c.projection = n), np();
  let d = !s[fa] || gv();
  s[Sn][dn].projection[c.projection] === null && l !== null
    ? hS(s, a, l)
    : d && (c.flags & 32) !== 32 && $M(a, s, c);
}
function hS(e, n, t) {
  let i = rn + t,
    r = n.data[i],
    o = e[i],
    s = Ch(o, r.tView.ssrId),
    a = Dy(e, r, void 0, { dehydratedView: s });
  Ey(o, a, 0, yh(r, s));
}
function Tt(e, n, t) {
  return tb(e, "", n, "", t), Tt;
}
function tb(e, n, t, i, r) {
  let o = Ve(),
    s = Wy(o, n, t, i);
  if (s !== Pn) {
    let a = bt(),
      l = Ca();
    vu(a, l, o, e, s, o[gt], r, !1);
  }
  return tb;
}
function Da(e, n, t, i) {
  lT(e, n, t, i);
}
function go(e, n, t) {
  aT(e, n, t);
}
function ei(e) {
  let n = Ve(),
    t = bt(),
    i = vv();
  op(i + 1);
  let r = Tp(t, i);
  if (e.dirty && mE(n) === ((r.metadata.flags & 2) === 2)) {
    if (r.matches === null) e.reset([]);
    else {
      let o = dT(n, i);
      e.reset(o, lM), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function ti() {
  return sT(Ve(), vv());
}
function pS(e, n, t, i) {
  t >= e.data.length && ((e.data[t] = null), (e.blueprint[t] = null)),
    (n[t] = i);
}
function ni(e) {
  let n = IE();
  return Xh(n, rn + e);
}
function E(e, n = "") {
  let t = Ve(),
    i = bt(),
    r = e + rn,
    o = i.firstCreatePass ? ms(i, r, 1, n, null) : i.data[r],
    s = gS(i, t, o, n, e);
  (t[r] = s), lu() && gu(i, t, s, o), uo(o, !1);
}
var gS = (e, n, t, i, r) => (cu(!0), xM(n[gt], i));
function de(e) {
  return B("", e, ""), de;
}
function B(e, n, t) {
  let i = Ve(),
    r = Wy(i, e, n, t);
  return r !== Pn && wy(i, Or(), r), B;
}
function Eu(e, n, t, i, r) {
  let o = Ve(),
    s = RT(o, e, n, t, i, r);
  return s !== Pn && wy(o, Or(), s), Eu;
}
function Mu(e, n, t) {
  Vy(n) && (n = n());
  let i = Ve(),
    r = ba();
  if (vi(i, r, n)) {
    let o = bt(),
      s = Ca();
    vu(o, s, i, e, n, i[gt], t, !1);
  }
  return Mu;
}
function Op(e, n) {
  let t = Vy(e);
  return t && e.set(n), t;
}
function Iu(e, n) {
  let t = Ve(),
    i = bt(),
    r = qt();
  return eb(i, t, t[gt], r, e, n), Iu;
}
function mS(e, n, t) {
  let i = bt();
  if (i.firstCreatePass) {
    let r = Ir(e);
    Fh(t, i.data, i.blueprint, r, !0), Fh(n, i.data, i.blueprint, r, !1);
  }
}
function Fh(e, n, t, i, r) {
  if (((e = tn(e)), Array.isArray(e)))
    for (let o = 0; o < e.length; o++) Fh(e[o], n, t, i, r);
  else {
    let o = bt(),
      s = Ve(),
      a = qt(),
      l = rs(e) ? e : tn(e.provide),
      c = X0(e),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      _ = a.providerIndexes >> 20;
    if (rs(e) || !e.multi) {
      let h = new so(c, r, X),
        D = qf(l, n, r ? u : u + _, d);
      D === -1
        ? (ah(kc(a, s), o, l),
          Wf(o, e, n.length),
          n.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          r && (a.providerIndexes += 1048576),
          t.push(h),
          s.push(h))
        : ((t[D] = h), (s[D] = h));
    } else {
      let h = qf(l, n, u + _, d),
        D = qf(l, n, u, u + _),
        I = h >= 0 && t[h],
        P = D >= 0 && t[D];
      if ((r && !P) || (!r && !I)) {
        ah(kc(a, s), o, l);
        let F = yS(r ? vS : _S, t.length, r, i, c);
        !r && P && (t[D].providerFactory = F),
          Wf(o, e, n.length, 0),
          n.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          r && (a.providerIndexes += 1048576),
          t.push(F),
          s.push(F);
      } else {
        let F = nb(t[r ? D : h], c, !r && i);
        Wf(o, e, h > -1 ? h : D, F);
      }
      !r && i && P && t[D].componentProviders++;
    }
  }
}
function Wf(e, n, t, i) {
  let r = rs(n),
    o = nE(n);
  if (r || o) {
    let l = (o ? tn(n.useClass) : n).prototype.ngOnDestroy;
    if (l) {
      let c = e.destroyHooks || (e.destroyHooks = []);
      if (!r && n.multi) {
        let u = c.indexOf(t);
        u === -1 ? c.push(t, [i, l]) : c[u + 1].push(i, l);
      } else c.push(t, l);
    }
  }
}
function nb(e, n, t) {
  return t && e.componentProviders++, e.multi.push(n) - 1;
}
function qf(e, n, t, i) {
  for (let r = t; r < i; r++) if (n[r] === e) return r;
  return -1;
}
function _S(e, n, t, i) {
  return Lh(this.multi, []);
}
function vS(e, n, t, i) {
  let r = this.multi,
    o;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = ao(t, t[Ae], this.providerFactory.index, i);
    (o = a.slice(0, s)), Lh(r, o);
    for (let l = s; l < a.length; l++) o.push(a[l]);
  } else (o = []), Lh(r, o);
  return o;
}
function Lh(e, n) {
  for (let t = 0; t < e.length; t++) {
    let i = e[t];
    n.push(i());
  }
  return n;
}
function yS(e, n, t, i, r) {
  let o = new so(e, t, X);
  return (
    (o.multi = []),
    (o.index = n),
    (o.componentProviders = 0),
    nb(o, r, i && !t),
    o
  );
}
function ii(e, n = []) {
  return (t) => {
    t.providersResolver = (i, r) => mS(i, r ? r(e) : e, n);
  };
}
var bS = (() => {
  class e {
    constructor(t) {
      (this._injector = t), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(t) {
      if (!t.standalone) return null;
      if (!this.cachedInjectors.has(t)) {
        let i = Q0(!1, t.type),
          r =
            i.length > 0
              ? Cu([i], this._injector, `Standalone[${t.type.name}]`)
              : null;
        this.cachedInjectors.set(t, r);
      }
      return this.cachedInjectors.get(t);
    }
    ngOnDestroy() {
      try {
        for (let t of this.cachedInjectors.values()) t !== null && t.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static {
      this.ɵprov = G({
        token: e,
        providedIn: "environment",
        factory: () => new e(q(Qt)),
      });
    }
  }
  return e;
})();
function mo(e) {
  fo("NgStandalone"),
    (e.getStandaloneInjector = (n) =>
      n.get(bS).getOrCreateStandaloneInjector(e));
}
function Np(e, n, t, i) {
  return rb(Ve(), ip(), e, n, t, i);
}
function ib(e, n) {
  let t = e[n];
  return t === Pn ? void 0 : t;
}
function rb(e, n, t, i, r, o) {
  let s = n + t;
  return vi(e, s, r) ? By(e, s + 1, o ? i.call(o, r) : i(r)) : ib(e, s + 1);
}
function CS(e, n, t, i, r, o, s) {
  let a = n + t;
  return Hy(e, a, r, o)
    ? By(e, a + 2, s ? i.call(s, r, o) : i(r, o))
    : ib(e, a + 2);
}
function A(e, n) {
  let t = bt(),
    i,
    r = e + rn;
  t.firstCreatePass
    ? ((i = wS(n, t.pipeRegistry)),
      (t.data[r] = i),
      i.onDestroy && (t.destroyHooks ??= []).push(r, i.onDestroy))
    : (i = t.data[r]);
  let o = i.factory || (i.factory = to(i.type, !0)),
    s,
    a = cn(X);
  try {
    let l = Rc(!1),
      c = o();
    return Rc(l), pS(t, Ve(), r, c), c;
  } finally {
    cn(a);
  }
}
function wS(e, n) {
  if (n)
    for (let t = n.length - 1; t >= 0; t--) {
      let i = n[t];
      if (e === i.name) return i;
    }
}
function $(e, n, t) {
  let i = e + rn,
    r = Ve(),
    o = Xh(r, i);
  return ob(r, i) ? rb(r, ip(), n, o.transform, t, o) : o.transform(t);
}
function ft(e, n, t, i) {
  let r = e + rn,
    o = Ve(),
    s = Xh(o, r);
  return ob(o, r) ? CS(o, ip(), n, s.transform, t, i, s) : s.transform(t, i);
}
function ob(e, n) {
  return e[Ae].data[n].pure;
}
function wn(e, n) {
  return bu(e, n);
}
var vc = null;
function DS(e) {
  (vc !== null &&
    (e.defaultEncapsulation !== vc.defaultEncapsulation ||
      e.preserveWhitespaces !== vc.preserveWhitespaces)) ||
    (vc = e);
}
var Tu = (() => {
  class e {
    log(t) {
      console.log(t);
    }
    warn(t) {
      console.warn(t);
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "platform" });
    }
  }
  return e;
})();
var Pp = new z(""),
  Ea = new z(""),
  Su = (() => {
    class e {
      constructor(t, i, r) {
        (this._ngZone = t),
          (this.registry = i),
          (this._isZoneStable = !0),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          Ap || (ES(r), r.addToWindow(i)),
          this._watchAngularEvents(),
          t.run(() => {
            this.taskTrackingZone =
              typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            this._isZoneStable = !1;
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                Re.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      isStable() {
        return this._isZoneStable && !this._ngZone.hasPendingMacrotasks;
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          queueMicrotask(() => {
            for (; this._callbacks.length !== 0; ) {
              let t = this._callbacks.pop();
              clearTimeout(t.timeoutId), t.doneCb();
            }
          });
        else {
          let t = this.getPendingTasks();
          this._callbacks = this._callbacks.filter((i) =>
            i.updateCb && i.updateCb(t) ? (clearTimeout(i.timeoutId), !1) : !0
          );
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
      addCallback(t, i, r) {
        let o = -1;
        i &&
          i > 0 &&
          (o = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (s) => s.timeoutId !== o
            )),
              t();
          }, i)),
          this._callbacks.push({ doneCb: t, timeoutId: o, updateCb: r });
      }
      whenStable(t, i, r) {
        if (r && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(t, i, r), this._runCallbacksIfReady();
      }
      registerApplication(t) {
        this.registry.registerApplication(t, this);
      }
      unregisterApplication(t) {
        this.registry.unregisterApplication(t);
      }
      findProviders(t, i, r) {
        return [];
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(Re), q(xu), q(Ea));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  xu = (() => {
    class e {
      constructor() {
        this._applications = new Map();
      }
      registerApplication(t, i) {
        this._applications.set(t, i);
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
      findTestabilityInTree(t, i = !0) {
        return Ap?.findTestabilityInTree(this, t, i) ?? null;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })();
function ES(e) {
  Ap = e;
}
var Ap;
function _o(e) {
  return !!e && typeof e.then == "function";
}
function sb(e) {
  return !!e && typeof e.subscribe == "function";
}
var Ou = new z(""),
  ab = (() => {
    class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((t, i) => {
            (this.resolve = t), (this.reject = i);
          })),
          (this.appInits = O(Ou, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let t = [];
        for (let r of this.appInits) {
          let o = r();
          if (_o(o)) t.push(o);
          else if (sb(o)) {
            let s = new Promise((a, l) => {
              o.subscribe({ complete: a, error: l });
            });
            t.push(s);
          }
        }
        let i = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(t)
          .then(() => {
            i();
          })
          .catch((r) => {
            this.reject(r);
          }),
          t.length === 0 && i(),
          (this.initialized = !0);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Nu = new z("");
function MS() {
  u_(() => {
    throw new pe(600, !1);
  });
}
function IS(e) {
  return e.isBoundToModule;
}
var TS = 10;
function SS(e, n, t) {
  try {
    let i = t();
    return _o(i)
      ? i.catch((r) => {
          throw (n.runOutsideAngular(() => e.handleError(r)), r);
        })
      : i;
  } catch (i) {
    throw (n.runOutsideAngular(() => e.handleError(i)), i);
  }
}
function lb(e, n) {
  return Array.isArray(n) ? n.reduce(lb, e) : j(j({}, e), n);
}
var hn = (() => {
  class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = O(sM)),
        (this.afterRenderManager = O($y)),
        (this.zonelessEnabled = O(Ip)),
        (this.dirtyFlags = 0),
        (this.deferredDirtyFlags = 0),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new He()),
        (this.afterTick = new He()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = O(Gi).hasPendingTasks.pipe(Ce((t) => !t))),
        (this._injector = O(Qt));
    }
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    whenStable() {
      let t;
      return new Promise((i) => {
        t = this.isStable.subscribe({
          next: (r) => {
            r && i();
          },
        });
      }).finally(() => {
        t.unsubscribe();
      });
    }
    get injector() {
      return this._injector;
    }
    bootstrap(t, i) {
      let r = t instanceof Uc;
      if (!this._injector.get(ab).done) {
        let _ = !r && W0(t),
          h = !1;
        throw new pe(405, h);
      }
      let s;
      r ? (s = t) : (s = this._injector.get(Hi).resolveComponentFactory(t)),
        this.componentTypes.push(s.componentType);
      let a = IS(s) ? void 0 : this._injector.get(Sr),
        l = i || s.selector,
        c = s.create(mt.NULL, [], l, a),
        u = c.location.nativeElement,
        d = c.injector.get(Pp, null);
      return (
        d?.registerApplication(u),
        c.onDestroy(() => {
          this.detachView(c.hostView),
            Ec(this.components, c),
            d?.unregisterApplication(u);
        }),
        this._loadComponent(c),
        c
      );
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      if (this._runningTick) throw new pe(101, !1);
      let t = Ge(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (i) {
        this.internalErrorHandler(i);
      } finally {
        (this._runningTick = !1), Ge(t), this.afterTick.next();
      }
    }
    synchronize() {
      let t = null;
      this._injector.destroyed ||
        (t = this._injector.get(cs, null, { optional: !0 })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let i = 0;
      for (; this.dirtyFlags !== 0 && i++ < TS; ) this.synchronizeOnce(t);
    }
    synchronizeOnce(t) {
      if (
        ((this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0),
        this.dirtyFlags & 7)
      ) {
        let i = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8),
          (this.dirtyFlags |= 8),
          this.beforeRender.next(i);
        for (let { _lView: r, notifyErrorHandler: o } of this._views)
          xS(r, o, i, this.zonelessEnabled);
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 7)
        )
          return;
      } else t?.begin?.(), t?.end?.();
      this.dirtyFlags & 8 &&
        ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: t }) => su(t))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(t) {
      let i = t;
      this._views.push(i), i.attachToAppRef(this);
    }
    detachView(t) {
      let i = t;
      Ec(this._views, i), i.detachFromAppRef();
    }
    _loadComponent(t) {
      this.attachView(t.hostView), this.tick(), this.components.push(t);
      let i = this._injector.get(Nu, []);
      [...this._bootstrapListeners, ...i].forEach((r) => r(t));
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
        this._destroyListeners.push(t), () => Ec(this._destroyListeners, t)
      );
    }
    destroy() {
      if (this._destroyed) throw new pe(406, !1);
      let t = this._injector;
      t.destroy && !t.destroyed && t.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function Ec(e, n) {
  let t = e.indexOf(n);
  t > -1 && e.splice(t, 1);
}
function xS(e, n, t, i) {
  if (!t && !su(e)) return;
  Ty(e, n, t && !i ? 0 : 1);
}
var Vh = class {
    constructor(n, t) {
      (this.ngModuleFactory = n), (this.componentFactories = t);
    }
  },
  Pu = (() => {
    class e {
      compileModuleSync(t) {
        return new Zc(t);
      }
      compileModuleAsync(t) {
        return Promise.resolve(this.compileModuleSync(t));
      }
      compileModuleAndAllComponentsSync(t) {
        let i = this.compileModuleSync(t),
          r = q0(t),
          o = Yv(r.declarations).reduce((s, a) => {
            let l = Mr(a);
            return l && s.push(new us(l)), s;
          }, []);
        return new Vh(i, o);
      }
      compileModuleAndAllComponentsAsync(t) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
      }
      clearCache() {}
      clearCacheFor(t) {}
      getModuleId(t) {}
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  OS = new z("");
function NS(e, n, t) {
  let i = new Zc(t);
  return Promise.resolve(i);
}
function M0(e) {
  for (let n = e.length - 1; n >= 0; n--) if (e[n] !== void 0) return e[n];
}
var PS = (() => {
  class e {
    constructor() {
      (this.zone = O(Re)),
        (this.changeDetectionScheduler = O(ls)),
        (this.applicationRef = O(hn));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.changeDetectionScheduler.runningTick ||
                this.zone.run(() => {
                  this.applicationRef.tick();
                });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function AS({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: n,
  scheduleInRootZone: t,
}) {
  return (
    (e ??= () => new Re(Pe(j({}, cb()), { scheduleInRootZone: t }))),
    [
      { provide: Re, useFactory: e },
      {
        provide: is,
        multi: !0,
        useFactory: () => {
          let i = O(PS, { optional: !0 });
          return () => i.initialize();
        },
      },
      {
        provide: is,
        multi: !0,
        useFactory: () => {
          let i = O(RS);
          return () => {
            i.initialize();
          };
        },
      },
      n === !0 ? { provide: Ny, useValue: !0 } : [],
      { provide: Py, useValue: t ?? Fv },
    ]
  );
}
function cb(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var RS = (() => {
  class e {
    constructor() {
      (this.subscription = new nt()),
        (this.initialized = !1),
        (this.zone = O(Re)),
        (this.pendingTasks = O(Gi));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let t = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (t = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              Re.assertNotInAngularZone(),
                queueMicrotask(() => {
                  t !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(t), (t = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            Re.assertInAngularZone(), (t ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var kS = (() => {
  class e {
    constructor() {
      (this.appRef = O(hn)),
        (this.taskService = O(Gi)),
        (this.ngZone = O(Re)),
        (this.zonelessEnabled = O(Ip)),
        (this.disableScheduling = O(Ny, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new nt()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(Lc)
          : null),
        (this.scheduleInRootZone =
          !this.zonelessEnabled &&
          this.zoneIsDefined &&
          (O(Py, { optional: !0 }) ?? !1)),
        (this.cancelScheduledCallback = null),
        (this.useMicrotaskScheduler = !1),
        (this.runningTick = !1),
        (this.pendingRenderTaskId = null),
        this.subscriptions.add(
          this.appRef.afterTick.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof Vc || !this.zoneIsDefined));
    }
    notify(t) {
      if (!this.zonelessEnabled && t === 5) return;
      switch (t) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 7: {
          this.appRef.deferredDirtyFlags |= 8;
          break;
        }
        case 9:
        case 8:
        case 6:
        case 10:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (!this.shouldScheduleTick()) return;
      let i = this.useMicrotaskScheduler ? l0 : Lv;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() =>
              i(() => this.tick())
            ))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              i(() => this.tick())
            ));
    }
    shouldScheduleTick() {
      return !(
        this.disableScheduling ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(Lc + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let t = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (i) {
        throw (this.taskService.remove(t), i);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        l0(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(t);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let t = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(t);
      }
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function FS() {
  return (typeof $localize < "u" && $localize.locale) || Qc;
}
var Ma = new z("", {
  providedIn: "root",
  factory: () => O(Ma, je.Optional | je.SkipSelf) || FS(),
});
var Kc = new z("");
function yc(e) {
  return !e.moduleRef;
}
function LS(e) {
  let n = yc(e) ? e.r3Injector : e.moduleRef.injector,
    t = n.get(Re);
  return t.run(() => {
    yc(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let i = n.get(ji, null),
      r;
    if (
      (t.runOutsideAngular(() => {
        r = t.onError.subscribe({
          next: (o) => {
            i.handleError(o);
          },
        });
      }),
      yc(e))
    ) {
      let o = () => n.destroy(),
        s = e.platformInjector.get(Kc);
      s.add(o),
        n.onDestroy(() => {
          r.unsubscribe(), s.delete(o);
        });
    } else {
      let o = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Kc);
      s.add(o),
        e.moduleRef.onDestroy(() => {
          Ec(e.allPlatformModules, e.moduleRef), r.unsubscribe(), s.delete(o);
        });
    }
    return SS(i, t, () => {
      let o = n.get(ab);
      return (
        o.runInitializers(),
        o.donePromise.then(() => {
          let s = n.get(Ma, Qc);
          if ((cS(s || Qc), yc(e))) {
            let a = n.get(hn);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return VS(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function VS(e, n) {
  let t = e.injector.get(hn);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((i) => t.bootstrap(i));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(t);
  else throw new pe(-403, !1);
  n.push(e);
}
var ub = (() => {
    class e {
      constructor(t) {
        (this._injector = t),
          (this._modules = []),
          (this._destroyListeners = []),
          (this._destroyed = !1);
      }
      bootstrapModuleFactory(t, i) {
        let r = i?.scheduleInRootZone,
          o = () =>
            oM(
              i?.ngZone,
              Pe(
                j(
                  {},
                  cb({
                    eventCoalescing: i?.ngZoneEventCoalescing,
                    runCoalescing: i?.ngZoneRunCoalescing,
                  })
                ),
                { scheduleInRootZone: r }
              )
            ),
          s = i?.ignoreChangesOutsideZone,
          a = [
            AS({ ngZoneFactory: o, ignoreChangesOutsideZone: s }),
            { provide: ls, useExisting: kS },
          ],
          l = IT(t.moduleType, this.injector, a);
        return LS({
          moduleRef: l,
          allPlatformModules: this._modules,
          platformInjector: this.injector,
        });
      }
      bootstrapModule(t, i = []) {
        let r = lb({}, i);
        return NS(this.injector, r, t).then((o) =>
          this.bootstrapModuleFactory(o, r)
        );
      }
      onDestroy(t) {
        this._destroyListeners.push(t);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new pe(404, !1);
        this._modules.slice().forEach((i) => i.destroy()),
          this._destroyListeners.forEach((i) => i());
        let t = this._injector.get(Kc, null);
        t && (t.forEach((i) => i()), t.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(mt));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })(),
  la = null,
  db = new z("");
function jS(e) {
  if (la && !la.get(db, !1)) throw new pe(400, !1);
  MS(), (la = e);
  let n = e.get(ub);
  return US(e), n;
}
function Rp(e, n, t = []) {
  let i = `Platform: ${n}`,
    r = new z(i);
  return (o = []) => {
    let s = fb();
    if (!s || s.injector.get(db, !1)) {
      let a = [...t, ...o, { provide: r, useValue: !0 }];
      e ? e(a) : jS(BS(a, i));
    }
    return HS(r);
  };
}
function BS(e = [], n) {
  return mt.create({
    name: n,
    providers: [
      { provide: nu, useValue: "platform" },
      { provide: Kc, useValue: new Set([() => (la = null)]) },
      ...e,
    ],
  });
}
function HS(e) {
  let n = fb();
  if (!n) throw new pe(401, !1);
  return n;
}
function fb() {
  return la?.get(ub) ?? null;
}
function US(e) {
  e.get(dp, null)?.forEach((t) => t());
}
var jt = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = $S;
    }
  }
  return e;
})();
function $S(e) {
  return zS(qt(), Ve(), (e & 16) === 16);
}
function zS(e, n, t) {
  if (ru(e) && !t) {
    let i = xr(e.index, n);
    return new lo(i, i);
  } else if (e.type & 175) {
    let i = n[Sn];
    return new lo(i, n);
  }
  return null;
}
var jh = class {
    constructor() {}
    supports(n) {
      return jy(n);
    }
    create(n) {
      return new Bh(n);
    }
  },
  GS = (e, n) => n,
  Bh = class {
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
        (this._trackByFn = n || GS);
    }
    forEachItem(n) {
      let t;
      for (t = this._itHead; t !== null; t = t._next) n(t);
    }
    forEachOperation(n) {
      let t = this._itHead,
        i = this._removalsHead,
        r = 0,
        o = null;
      for (; t || i; ) {
        let s = !i || (t && t.currentIndex < I0(i, r, o)) ? t : i,
          a = I0(s, r, o),
          l = s.currentIndex;
        if (s === i) r--, (i = i._nextRemoved);
        else if (((t = t._next), s.previousIndex == null)) r++;
        else {
          o || (o = []);
          let c = a - r,
            u = l - r;
          if (c != u) {
            for (let _ = 0; _ < c; _++) {
              let h = _ < o.length ? o[_] : (o[_] = 0),
                D = h + _;
              u <= D && D < c && (o[_] = h + 1);
            }
            let d = s.previousIndex;
            o[d] = u - c;
          }
        }
        a !== l && n(s, a, l);
      }
    }
    forEachPreviousItem(n) {
      let t;
      for (t = this._previousItHead; t !== null; t = t._nextPrevious) n(t);
    }
    forEachAddedItem(n) {
      let t;
      for (t = this._additionsHead; t !== null; t = t._nextAdded) n(t);
    }
    forEachMovedItem(n) {
      let t;
      for (t = this._movesHead; t !== null; t = t._nextMoved) n(t);
    }
    forEachRemovedItem(n) {
      let t;
      for (t = this._removalsHead; t !== null; t = t._nextRemoved) n(t);
    }
    forEachIdentityChange(n) {
      let t;
      for (t = this._identityChangesHead; t !== null; t = t._nextIdentityChange)
        n(t);
    }
    diff(n) {
      if ((n == null && (n = []), !jy(n))) throw new pe(900, !1);
      return this.check(n) ? this : null;
    }
    onDestroy() {}
    check(n) {
      this._reset();
      let t = this._itHead,
        i = !1,
        r,
        o,
        s;
      if (Array.isArray(n)) {
        this.length = n.length;
        for (let a = 0; a < this.length; a++)
          (o = n[a]),
            (s = this._trackByFn(a, o)),
            t === null || !Object.is(t.trackById, s)
              ? ((t = this._mismatch(t, o, s, a)), (i = !0))
              : (i && (t = this._verifyReinsertion(t, o, s, a)),
                Object.is(t.item, o) || this._addIdentityChange(t, o)),
            (t = t._next);
      } else
        (r = 0),
          TT(n, (a) => {
            (s = this._trackByFn(r, a)),
              t === null || !Object.is(t.trackById, s)
                ? ((t = this._mismatch(t, a, s, r)), (i = !0))
                : (i && (t = this._verifyReinsertion(t, a, s, r)),
                  Object.is(t.item, a) || this._addIdentityChange(t, a)),
              (t = t._next),
              r++;
          }),
          (this.length = r);
      return this._truncate(t), (this.collection = n), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let n;
        for (n = this._previousItHead = this._itHead; n !== null; n = n._next)
          n._nextPrevious = n._next;
        for (n = this._additionsHead; n !== null; n = n._nextAdded)
          n.previousIndex = n.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, n = this._movesHead;
          n !== null;
          n = n._nextMoved
        )
          n.previousIndex = n.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(n, t, i, r) {
      let o;
      return (
        n === null ? (o = this._itTail) : ((o = n._prev), this._remove(n)),
        (n =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(i, null)),
        n !== null
          ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
            this._reinsertAfter(n, o, r))
          : ((n =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(i, r)),
            n !== null
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._moveAfter(n, o, r))
              : (n = this._addAfter(new Hh(t, i), o, r))),
        n
      );
    }
    _verifyReinsertion(n, t, i, r) {
      let o =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(i, null);
      return (
        o !== null
          ? (n = this._reinsertAfter(o, n._prev, r))
          : n.currentIndex != r &&
            ((n.currentIndex = r), this._addToMoves(n, r)),
        n
      );
    }
    _truncate(n) {
      for (; n !== null; ) {
        let t = n._next;
        this._addToRemovals(this._unlink(n)), (n = t);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(n, t, i) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(n);
      let r = n._prevRemoved,
        o = n._nextRemoved;
      return (
        r === null ? (this._removalsHead = o) : (r._nextRemoved = o),
        o === null ? (this._removalsTail = r) : (o._prevRemoved = r),
        this._insertAfter(n, t, i),
        this._addToMoves(n, i),
        n
      );
    }
    _moveAfter(n, t, i) {
      return (
        this._unlink(n), this._insertAfter(n, t, i), this._addToMoves(n, i), n
      );
    }
    _addAfter(n, t, i) {
      return (
        this._insertAfter(n, t, i),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = n)
          : (this._additionsTail = this._additionsTail._nextAdded = n),
        n
      );
    }
    _insertAfter(n, t, i) {
      let r = t === null ? this._itHead : t._next;
      return (
        (n._next = r),
        (n._prev = t),
        r === null ? (this._itTail = n) : (r._prev = n),
        t === null ? (this._itHead = n) : (t._next = n),
        this._linkedRecords === null && (this._linkedRecords = new Jc()),
        this._linkedRecords.put(n),
        (n.currentIndex = i),
        n
      );
    }
    _remove(n) {
      return this._addToRemovals(this._unlink(n));
    }
    _unlink(n) {
      this._linkedRecords !== null && this._linkedRecords.remove(n);
      let t = n._prev,
        i = n._next;
      return (
        t === null ? (this._itHead = i) : (t._next = i),
        i === null ? (this._itTail = t) : (i._prev = t),
        n
      );
    }
    _addToMoves(n, t) {
      return (
        n.previousIndex === t ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = n)
            : (this._movesTail = this._movesTail._nextMoved = n)),
        n
      );
    }
    _addToRemovals(n) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new Jc()),
        this._unlinkedRecords.put(n),
        (n.currentIndex = null),
        (n._nextRemoved = null),
        this._removalsTail === null
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
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = n)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                n),
        n
      );
    }
  },
  Hh = class {
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
  },
  Uh = class {
    constructor() {
      (this._head = null), (this._tail = null);
    }
    add(n) {
      this._head === null
        ? ((this._head = this._tail = n),
          (n._nextDup = null),
          (n._prevDup = null))
        : ((this._tail._nextDup = n),
          (n._prevDup = this._tail),
          (n._nextDup = null),
          (this._tail = n));
    }
    get(n, t) {
      let i;
      for (i = this._head; i !== null; i = i._nextDup)
        if ((t === null || t <= i.currentIndex) && Object.is(i.trackById, n))
          return i;
      return null;
    }
    remove(n) {
      let t = n._prevDup,
        i = n._nextDup;
      return (
        t === null ? (this._head = i) : (t._nextDup = i),
        i === null ? (this._tail = t) : (i._prevDup = t),
        this._head === null
      );
    }
  },
  Jc = class {
    constructor() {
      this.map = new Map();
    }
    put(n) {
      let t = n.trackById,
        i = this.map.get(t);
      i || ((i = new Uh()), this.map.set(t, i)), i.add(n);
    }
    get(n, t) {
      let i = n,
        r = this.map.get(i);
      return r ? r.get(n, t) : null;
    }
    remove(n) {
      let t = n.trackById;
      return this.map.get(t).remove(n) && this.map.delete(t), n;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function I0(e, n, t) {
  let i = e.previousIndex;
  if (i === null) return i;
  let r = 0;
  return t && i < t.length && (r = t[i]), i + n + r;
}
function T0() {
  return new Ia([new jh()]);
}
var Ia = (() => {
  class e {
    static {
      this.ɵprov = G({ token: e, providedIn: "root", factory: T0 });
    }
    constructor(t) {
      this.factories = t;
    }
    static create(t, i) {
      if (i != null) {
        let r = i.factories.slice();
        t = t.concat(r);
      }
      return new e(t);
    }
    static extend(t) {
      return {
        provide: e,
        useFactory: (i) => e.create(t, i || T0()),
        deps: [[e, new Wh(), new fs()]],
      };
    }
    find(t) {
      let i = this.factories.find((r) => r.supports(t));
      if (i != null) return i;
      throw new pe(901, !1);
    }
  }
  return e;
})();
var hb = Rp(null, "core", []),
  pb = (() => {
    class e {
      constructor(t) {}
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(hn));
        };
      }
      static {
        this.ɵmod = et({ type: e });
      }
      static {
        this.ɵinj = Xe({});
      }
    }
    return e;
  })();
function wi(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function Ta(e, n) {
  fo("NgSignals");
  let t = a_(e);
  return n?.equal && (t[Pi].equal = n.equal), t;
}
function qi(e) {
  let n = Ge(null);
  try {
    return e();
  } finally {
    Ge(n);
  }
}
function gb(e) {
  let n = Mr(e);
  if (!n) return null;
  let t = new us(n);
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
}
var wb = null;
function Di() {
  return wb;
}
function Db(e) {
  wb ??= e;
}
var Hu = class {};
var ht = new z(""),
  $p = (() => {
    class e {
      historyGo(t) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({
          token: e,
          factory: () => O(ZS),
          providedIn: "platform",
        });
      }
    }
    return e;
  })(),
  Eb = new z(""),
  ZS = (() => {
    class e extends $p {
      constructor() {
        super(),
          (this._doc = O(ht)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return Di().getBaseHref(this._doc);
      }
      onPopState(t) {
        let i = Di().getGlobalEventTarget(this._doc, "window");
        return (
          i.addEventListener("popstate", t, !1),
          () => i.removeEventListener("popstate", t)
        );
      }
      onHashChange(t) {
        let i = Di().getGlobalEventTarget(this._doc, "window");
        return (
          i.addEventListener("hashchange", t, !1),
          () => i.removeEventListener("hashchange", t)
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
      pushState(t, i, r) {
        this._history.pushState(t, i, r);
      }
      replaceState(t, i, r) {
        this._history.replaceState(t, i, r);
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
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({
          token: e,
          factory: () => new e(),
          providedIn: "platform",
        });
      }
    }
    return e;
  })();
function zp(e, n) {
  if (e.length == 0) return n;
  if (n.length == 0) return e;
  let t = 0;
  return (
    e.endsWith("/") && t++,
    n.startsWith("/") && t++,
    t == 2 ? e + n.substring(1) : t == 1 ? e + n : e + "/" + n
  );
}
function mb(e) {
  let n = e.match(/#|\?|$/),
    t = (n && n.index) || e.length,
    i = t - (e[t - 1] === "/" ? 1 : 0);
  return e.slice(0, i) + e.slice(t);
}
function Yi(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
var Ki = (() => {
    class e {
      historyGo(t) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: () => O(Gp), providedIn: "root" });
      }
    }
    return e;
  })(),
  Mb = new z(""),
  Gp = (() => {
    class e extends Ki {
      constructor(t, i) {
        super(),
          (this._platformLocation = t),
          (this._removeListenerFns = []),
          (this._baseHref =
            i ??
            this._platformLocation.getBaseHrefFromDOM() ??
            O(ht).location?.origin ??
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
        return zp(this._baseHref, t);
      }
      path(t = !1) {
        let i =
            this._platformLocation.pathname + Yi(this._platformLocation.search),
          r = this._platformLocation.hash;
        return r && t ? `${i}${r}` : i;
      }
      pushState(t, i, r, o) {
        let s = this.prepareExternalUrl(r + Yi(o));
        this._platformLocation.pushState(t, i, s);
      }
      replaceState(t, i, r, o) {
        let s = this.prepareExternalUrl(r + Yi(o));
        this._platformLocation.replaceState(t, i, s);
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
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q($p), q(Mb, 8));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Ib = (() => {
    class e extends Ki {
      constructor(t, i) {
        super(),
          (this._platformLocation = t),
          (this._baseHref = ""),
          (this._removeListenerFns = []),
          i != null && (this._baseHref = i);
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
        let i = this._platformLocation.hash ?? "#";
        return i.length > 0 ? i.substring(1) : i;
      }
      prepareExternalUrl(t) {
        let i = zp(this._baseHref, t);
        return i.length > 0 ? "#" + i : i;
      }
      pushState(t, i, r, o) {
        let s = this.prepareExternalUrl(r + Yi(o));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.pushState(t, i, s);
      }
      replaceState(t, i, r, o) {
        let s = this.prepareExternalUrl(r + Yi(o));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.replaceState(t, i, s);
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
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q($p), q(Mb, 8));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  ys = (() => {
    class e {
      constructor(t) {
        (this._subject = new Ne()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = t);
        let i = this._locationStrategy.getBaseHref();
        (this._basePath = KS(mb(_b(i)))),
          this._locationStrategy.onPopState((r) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: r.state,
              type: r.type,
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
      isCurrentPathEqualTo(t, i = "") {
        return this.path() == this.normalize(t + Yi(i));
      }
      normalize(t) {
        return e.stripTrailingSlash(QS(this._basePath, _b(t)));
      }
      prepareExternalUrl(t) {
        return (
          t && t[0] !== "/" && (t = "/" + t),
          this._locationStrategy.prepareExternalUrl(t)
        );
      }
      go(t, i = "", r = null) {
        this._locationStrategy.pushState(r, "", t, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Yi(i)), r);
      }
      replaceState(t, i = "", r = null) {
        this._locationStrategy.replaceState(r, "", t, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Yi(i)), r);
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
          (this._urlChangeSubscription ??= this.subscribe((i) => {
            this._notifyUrlChangeListeners(i.url, i.state);
          })),
          () => {
            let i = this._urlChangeListeners.indexOf(t);
            this._urlChangeListeners.splice(i, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(t = "", i) {
        this._urlChangeListeners.forEach((r) => r(t, i));
      }
      subscribe(t, i, r) {
        return this._subject.subscribe({ next: t, error: i, complete: r });
      }
      static {
        this.normalizeQueryParams = Yi;
      }
      static {
        this.joinWithSlash = zp;
      }
      static {
        this.stripTrailingSlash = mb;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(Ki));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: () => YS(), providedIn: "root" });
      }
    }
    return e;
  })();
function YS() {
  return new ys(q(Ki));
}
function QS(e, n) {
  if (!e || !n.startsWith(e)) return n;
  let t = n.substring(e.length);
  return t === "" || ["/", ";", "?", "#"].includes(t[0]) ? t : n;
}
function _b(e) {
  return e.replace(/\/index.html$/, "");
}
function KS(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    let [, t] = e.split(/\/\/[^\/]+/);
    return t;
  }
  return e;
}
var on = (function (e) {
    return (
      (e[(e.Format = 0)] = "Format"), (e[(e.Standalone = 1)] = "Standalone"), e
    );
  })(on || {}),
  st = (function (e) {
    return (
      (e[(e.Narrow = 0)] = "Narrow"),
      (e[(e.Abbreviated = 1)] = "Abbreviated"),
      (e[(e.Wide = 2)] = "Wide"),
      (e[(e.Short = 3)] = "Short"),
      e
    );
  })(st || {}),
  Dn = (function (e) {
    return (
      (e[(e.Short = 0)] = "Short"),
      (e[(e.Medium = 1)] = "Medium"),
      (e[(e.Long = 2)] = "Long"),
      (e[(e.Full = 3)] = "Full"),
      e
    );
  })(Dn || {}),
  Nr = {
    Decimal: 0,
    Group: 1,
    List: 2,
    PercentSign: 3,
    PlusSign: 4,
    MinusSign: 5,
    Exponential: 6,
    SuperscriptingExponent: 7,
    PerMille: 8,
    Infinity: 9,
    NaN: 10,
    TimeSeparator: 11,
    CurrencyDecimal: 12,
    CurrencyGroup: 13,
  };
function JS(e) {
  return Rn(e)[Et.LocaleId];
}
function XS(e, n, t) {
  let i = Rn(e),
    r = [i[Et.DayPeriodsFormat], i[Et.DayPeriodsStandalone]],
    o = kn(r, n);
  return kn(o, t);
}
function ex(e, n, t) {
  let i = Rn(e),
    r = [i[Et.DaysFormat], i[Et.DaysStandalone]],
    o = kn(r, n);
  return kn(o, t);
}
function tx(e, n, t) {
  let i = Rn(e),
    r = [i[Et.MonthsFormat], i[Et.MonthsStandalone]],
    o = kn(r, n);
  return kn(o, t);
}
function nx(e, n) {
  let i = Rn(e)[Et.Eras];
  return kn(i, n);
}
function Au(e, n) {
  let t = Rn(e);
  return kn(t[Et.DateFormat], n);
}
function Ru(e, n) {
  let t = Rn(e);
  return kn(t[Et.TimeFormat], n);
}
function ku(e, n) {
  let i = Rn(e)[Et.DateTimeFormat];
  return kn(i, n);
}
function zu(e, n) {
  let t = Rn(e),
    i = t[Et.NumberSymbols][n];
  if (typeof i > "u") {
    if (n === Nr.CurrencyDecimal) return t[Et.NumberSymbols][Nr.Decimal];
    if (n === Nr.CurrencyGroup) return t[Et.NumberSymbols][Nr.Group];
  }
  return i;
}
function Tb(e) {
  if (!e[Et.ExtraData])
    throw new Error(
      `Missing extra locale data for the locale "${
        e[Et.LocaleId]
      }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
    );
}
function ix(e) {
  let n = Rn(e);
  return (
    Tb(n),
    (n[Et.ExtraData][2] || []).map((i) =>
      typeof i == "string" ? kp(i) : [kp(i[0]), kp(i[1])]
    )
  );
}
function rx(e, n, t) {
  let i = Rn(e);
  Tb(i);
  let r = [i[Et.ExtraData][0], i[Et.ExtraData][1]],
    o = kn(r, n) || [];
  return kn(o, t) || [];
}
function kn(e, n) {
  for (let t = n; t > -1; t--) if (typeof e[t] < "u") return e[t];
  throw new Error("Locale data API: locale data undefined");
}
function kp(e) {
  let [n, t] = e.split(":");
  return { hours: +n, minutes: +t };
}
var ox =
    /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
  Fu = {},
  sx =
    /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
  Qi = (function (e) {
    return (
      (e[(e.Short = 0)] = "Short"),
      (e[(e.ShortGMT = 1)] = "ShortGMT"),
      (e[(e.Long = 2)] = "Long"),
      (e[(e.Extended = 3)] = "Extended"),
      e
    );
  })(Qi || {}),
  Qe = (function (e) {
    return (
      (e[(e.FullYear = 0)] = "FullYear"),
      (e[(e.Month = 1)] = "Month"),
      (e[(e.Date = 2)] = "Date"),
      (e[(e.Hours = 3)] = "Hours"),
      (e[(e.Minutes = 4)] = "Minutes"),
      (e[(e.Seconds = 5)] = "Seconds"),
      (e[(e.FractionalSeconds = 6)] = "FractionalSeconds"),
      (e[(e.Day = 7)] = "Day"),
      e
    );
  })(Qe || {}),
  Ye = (function (e) {
    return (
      (e[(e.DayPeriods = 0)] = "DayPeriods"),
      (e[(e.Days = 1)] = "Days"),
      (e[(e.Months = 2)] = "Months"),
      (e[(e.Eras = 3)] = "Eras"),
      e
    );
  })(Ye || {});
function Sb(e, n, t, i) {
  let r = gx(e);
  n = Zi(t, n) || n;
  let s = [],
    a;
  for (; n; )
    if (((a = sx.exec(n)), a)) {
      s = s.concat(a.slice(1));
      let u = s.pop();
      if (!u) break;
      n = u;
    } else {
      s.push(n);
      break;
    }
  let l = r.getTimezoneOffset();
  i && ((l = Ob(i, l)), (r = px(r, i, !0)));
  let c = "";
  return (
    s.forEach((u) => {
      let d = fx(u);
      c += d
        ? d(r, t, l)
        : u === "''"
        ? "'"
        : u.replace(/(^'|'$)/g, "").replace(/''/g, "'");
    }),
    c
  );
}
function Uu(e, n, t) {
  let i = new Date(0);
  return i.setFullYear(e, n, t), i.setHours(0, 0, 0), i;
}
function Zi(e, n) {
  let t = JS(e);
  if (((Fu[t] ??= {}), Fu[t][n])) return Fu[t][n];
  let i = "";
  switch (n) {
    case "shortDate":
      i = Au(e, Dn.Short);
      break;
    case "mediumDate":
      i = Au(e, Dn.Medium);
      break;
    case "longDate":
      i = Au(e, Dn.Long);
      break;
    case "fullDate":
      i = Au(e, Dn.Full);
      break;
    case "shortTime":
      i = Ru(e, Dn.Short);
      break;
    case "mediumTime":
      i = Ru(e, Dn.Medium);
      break;
    case "longTime":
      i = Ru(e, Dn.Long);
      break;
    case "fullTime":
      i = Ru(e, Dn.Full);
      break;
    case "short":
      let r = Zi(e, "shortTime"),
        o = Zi(e, "shortDate");
      i = Lu(ku(e, Dn.Short), [r, o]);
      break;
    case "medium":
      let s = Zi(e, "mediumTime"),
        a = Zi(e, "mediumDate");
      i = Lu(ku(e, Dn.Medium), [s, a]);
      break;
    case "long":
      let l = Zi(e, "longTime"),
        c = Zi(e, "longDate");
      i = Lu(ku(e, Dn.Long), [l, c]);
      break;
    case "full":
      let u = Zi(e, "fullTime"),
        d = Zi(e, "fullDate");
      i = Lu(ku(e, Dn.Full), [u, d]);
      break;
  }
  return i && (Fu[t][n] = i), i;
}
function Lu(e, n) {
  return (
    n &&
      (e = e.replace(/\{([^}]+)}/g, function (t, i) {
        return n != null && i in n ? n[i] : t;
      })),
    e
  );
}
function ri(e, n, t = "-", i, r) {
  let o = "";
  (e < 0 || (r && e <= 0)) && (r ? (e = -e + 1) : ((e = -e), (o = t)));
  let s = String(e);
  for (; s.length < n; ) s = "0" + s;
  return i && (s = s.slice(s.length - n)), o + s;
}
function ax(e, n) {
  return ri(e, 3).substring(0, n);
}
function St(e, n, t = 0, i = !1, r = !1) {
  return function (o, s) {
    let a = lx(e, o);
    if (((t > 0 || a > -t) && (a += t), e === Qe.Hours))
      a === 0 && t === -12 && (a = 12);
    else if (e === Qe.FractionalSeconds) return ax(a, n);
    let l = zu(s, Nr.MinusSign);
    return ri(a, n, l, i, r);
  };
}
function lx(e, n) {
  switch (e) {
    case Qe.FullYear:
      return n.getFullYear();
    case Qe.Month:
      return n.getMonth();
    case Qe.Date:
      return n.getDate();
    case Qe.Hours:
      return n.getHours();
    case Qe.Minutes:
      return n.getMinutes();
    case Qe.Seconds:
      return n.getSeconds();
    case Qe.FractionalSeconds:
      return n.getMilliseconds();
    case Qe.Day:
      return n.getDay();
    default:
      throw new Error(`Unknown DateType value "${e}".`);
  }
}
function lt(e, n, t = on.Format, i = !1) {
  return function (r, o) {
    return cx(r, o, e, n, t, i);
  };
}
function cx(e, n, t, i, r, o) {
  switch (t) {
    case Ye.Months:
      return tx(n, r, i)[e.getMonth()];
    case Ye.Days:
      return ex(n, r, i)[e.getDay()];
    case Ye.DayPeriods:
      let s = e.getHours(),
        a = e.getMinutes();
      if (o) {
        let c = ix(n),
          u = rx(n, r, i),
          d = c.findIndex((_) => {
            if (Array.isArray(_)) {
              let [h, D] = _,
                I = s >= h.hours && a >= h.minutes,
                P = s < D.hours || (s === D.hours && a < D.minutes);
              if (h.hours < D.hours) {
                if (I && P) return !0;
              } else if (I || P) return !0;
            } else if (_.hours === s && _.minutes === a) return !0;
            return !1;
          });
        if (d !== -1) return u[d];
      }
      return XS(n, r, i)[s < 12 ? 0 : 1];
    case Ye.Eras:
      return nx(n, i)[e.getFullYear() <= 0 ? 0 : 1];
    default:
      let l = t;
      throw new Error(`unexpected translation type ${l}`);
  }
}
function Vu(e) {
  return function (n, t, i) {
    let r = -1 * i,
      o = zu(t, Nr.MinusSign),
      s = r > 0 ? Math.floor(r / 60) : Math.ceil(r / 60);
    switch (e) {
      case Qi.Short:
        return (r >= 0 ? "+" : "") + ri(s, 2, o) + ri(Math.abs(r % 60), 2, o);
      case Qi.ShortGMT:
        return "GMT" + (r >= 0 ? "+" : "") + ri(s, 1, o);
      case Qi.Long:
        return (
          "GMT" +
          (r >= 0 ? "+" : "") +
          ri(s, 2, o) +
          ":" +
          ri(Math.abs(r % 60), 2, o)
        );
      case Qi.Extended:
        return i === 0
          ? "Z"
          : (r >= 0 ? "+" : "") +
              ri(s, 2, o) +
              ":" +
              ri(Math.abs(r % 60), 2, o);
      default:
        throw new Error(`Unknown zone width "${e}"`);
    }
  };
}
var ux = 0,
  Bu = 4;
function dx(e) {
  let n = Uu(e, ux, 1).getDay();
  return Uu(e, 0, 1 + (n <= Bu ? Bu : Bu + 7) - n);
}
function xb(e) {
  let n = e.getDay(),
    t = n === 0 ? -3 : Bu - n;
  return Uu(e.getFullYear(), e.getMonth(), e.getDate() + t);
}
function Fp(e, n = !1) {
  return function (t, i) {
    let r;
    if (n) {
      let o = new Date(t.getFullYear(), t.getMonth(), 1).getDay() - 1,
        s = t.getDate();
      r = 1 + Math.floor((s + o) / 7);
    } else {
      let o = xb(t),
        s = dx(o.getFullYear()),
        a = o.getTime() - s.getTime();
      r = 1 + Math.round(a / 6048e5);
    }
    return ri(r, e, zu(i, Nr.MinusSign));
  };
}
function ju(e, n = !1) {
  return function (t, i) {
    let o = xb(t).getFullYear();
    return ri(o, e, zu(i, Nr.MinusSign), n);
  };
}
var Lp = {};
function fx(e) {
  if (Lp[e]) return Lp[e];
  let n;
  switch (e) {
    case "G":
    case "GG":
    case "GGG":
      n = lt(Ye.Eras, st.Abbreviated);
      break;
    case "GGGG":
      n = lt(Ye.Eras, st.Wide);
      break;
    case "GGGGG":
      n = lt(Ye.Eras, st.Narrow);
      break;
    case "y":
      n = St(Qe.FullYear, 1, 0, !1, !0);
      break;
    case "yy":
      n = St(Qe.FullYear, 2, 0, !0, !0);
      break;
    case "yyy":
      n = St(Qe.FullYear, 3, 0, !1, !0);
      break;
    case "yyyy":
      n = St(Qe.FullYear, 4, 0, !1, !0);
      break;
    case "Y":
      n = ju(1);
      break;
    case "YY":
      n = ju(2, !0);
      break;
    case "YYY":
      n = ju(3);
      break;
    case "YYYY":
      n = ju(4);
      break;
    case "M":
    case "L":
      n = St(Qe.Month, 1, 1);
      break;
    case "MM":
    case "LL":
      n = St(Qe.Month, 2, 1);
      break;
    case "MMM":
      n = lt(Ye.Months, st.Abbreviated);
      break;
    case "MMMM":
      n = lt(Ye.Months, st.Wide);
      break;
    case "MMMMM":
      n = lt(Ye.Months, st.Narrow);
      break;
    case "LLL":
      n = lt(Ye.Months, st.Abbreviated, on.Standalone);
      break;
    case "LLLL":
      n = lt(Ye.Months, st.Wide, on.Standalone);
      break;
    case "LLLLL":
      n = lt(Ye.Months, st.Narrow, on.Standalone);
      break;
    case "w":
      n = Fp(1);
      break;
    case "ww":
      n = Fp(2);
      break;
    case "W":
      n = Fp(1, !0);
      break;
    case "d":
      n = St(Qe.Date, 1);
      break;
    case "dd":
      n = St(Qe.Date, 2);
      break;
    case "c":
    case "cc":
      n = St(Qe.Day, 1);
      break;
    case "ccc":
      n = lt(Ye.Days, st.Abbreviated, on.Standalone);
      break;
    case "cccc":
      n = lt(Ye.Days, st.Wide, on.Standalone);
      break;
    case "ccccc":
      n = lt(Ye.Days, st.Narrow, on.Standalone);
      break;
    case "cccccc":
      n = lt(Ye.Days, st.Short, on.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      n = lt(Ye.Days, st.Abbreviated);
      break;
    case "EEEE":
      n = lt(Ye.Days, st.Wide);
      break;
    case "EEEEE":
      n = lt(Ye.Days, st.Narrow);
      break;
    case "EEEEEE":
      n = lt(Ye.Days, st.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      n = lt(Ye.DayPeriods, st.Abbreviated);
      break;
    case "aaaa":
      n = lt(Ye.DayPeriods, st.Wide);
      break;
    case "aaaaa":
      n = lt(Ye.DayPeriods, st.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      n = lt(Ye.DayPeriods, st.Abbreviated, on.Standalone, !0);
      break;
    case "bbbb":
      n = lt(Ye.DayPeriods, st.Wide, on.Standalone, !0);
      break;
    case "bbbbb":
      n = lt(Ye.DayPeriods, st.Narrow, on.Standalone, !0);
      break;
    case "B":
    case "BB":
    case "BBB":
      n = lt(Ye.DayPeriods, st.Abbreviated, on.Format, !0);
      break;
    case "BBBB":
      n = lt(Ye.DayPeriods, st.Wide, on.Format, !0);
      break;
    case "BBBBB":
      n = lt(Ye.DayPeriods, st.Narrow, on.Format, !0);
      break;
    case "h":
      n = St(Qe.Hours, 1, -12);
      break;
    case "hh":
      n = St(Qe.Hours, 2, -12);
      break;
    case "H":
      n = St(Qe.Hours, 1);
      break;
    case "HH":
      n = St(Qe.Hours, 2);
      break;
    case "m":
      n = St(Qe.Minutes, 1);
      break;
    case "mm":
      n = St(Qe.Minutes, 2);
      break;
    case "s":
      n = St(Qe.Seconds, 1);
      break;
    case "ss":
      n = St(Qe.Seconds, 2);
      break;
    case "S":
      n = St(Qe.FractionalSeconds, 1);
      break;
    case "SS":
      n = St(Qe.FractionalSeconds, 2);
      break;
    case "SSS":
      n = St(Qe.FractionalSeconds, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      n = Vu(Qi.Short);
      break;
    case "ZZZZZ":
      n = Vu(Qi.Extended);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      n = Vu(Qi.ShortGMT);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      n = Vu(Qi.Long);
      break;
    default:
      return null;
  }
  return (Lp[e] = n), n;
}
function Ob(e, n) {
  e = e.replace(/:/g, "");
  let t = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
  return isNaN(t) ? n : t;
}
function hx(e, n) {
  return (e = new Date(e.getTime())), e.setMinutes(e.getMinutes() + n), e;
}
function px(e, n, t) {
  let i = t ? -1 : 1,
    r = e.getTimezoneOffset(),
    o = Ob(n, r);
  return hx(e, i * (o - r));
}
function gx(e) {
  if (vb(e)) return e;
  if (typeof e == "number" && !isNaN(e)) return new Date(e);
  if (typeof e == "string") {
    if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
      let [r, o = 1, s = 1] = e.split("-").map((a) => +a);
      return Uu(r, o - 1, s);
    }
    let t = parseFloat(e);
    if (!isNaN(e - t)) return new Date(t);
    let i;
    if ((i = e.match(ox))) return mx(i);
  }
  let n = new Date(e);
  if (!vb(n)) throw new Error(`Unable to convert "${e}" into a date`);
  return n;
}
function mx(e) {
  let n = new Date(0),
    t = 0,
    i = 0,
    r = e[8] ? n.setUTCFullYear : n.setFullYear,
    o = e[8] ? n.setUTCHours : n.setHours;
  e[9] && ((t = Number(e[9] + e[10])), (i = Number(e[9] + e[11]))),
    r.call(n, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
  let s = Number(e[4] || 0) - t,
    a = Number(e[5] || 0) - i,
    l = Number(e[6] || 0),
    c = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
  return o.call(n, s, a, l, c), n;
}
function vb(e) {
  return e instanceof Date && !isNaN(e.valueOf());
}
function Gu(e, n) {
  n = encodeURIComponent(n);
  for (let t of e.split(";")) {
    let i = t.indexOf("="),
      [r, o] = i == -1 ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
    if (r.trim() === n) return decodeURIComponent(o);
  }
  return null;
}
var Vp = /\s+/,
  yb = [],
  bs = (() => {
    class e {
      constructor(t, i) {
        (this._ngEl = t),
          (this._renderer = i),
          (this.initialClasses = yb),
          (this.stateMap = new Map());
      }
      set klass(t) {
        this.initialClasses = t != null ? t.trim().split(Vp) : yb;
      }
      set ngClass(t) {
        this.rawClass = typeof t == "string" ? t.trim().split(Vp) : t;
      }
      ngDoCheck() {
        for (let i of this.initialClasses) this._updateState(i, !0);
        let t = this.rawClass;
        if (Array.isArray(t) || t instanceof Set)
          for (let i of t) this._updateState(i, !0);
        else if (t != null)
          for (let i of Object.keys(t)) this._updateState(i, !!t[i]);
        this._applyStateDiff();
      }
      _updateState(t, i) {
        let r = this.stateMap.get(t);
        r !== void 0
          ? (r.enabled !== i && ((r.changed = !0), (r.enabled = i)),
            (r.touched = !0))
          : this.stateMap.set(t, { enabled: i, changed: !0, touched: !0 });
      }
      _applyStateDiff() {
        for (let t of this.stateMap) {
          let i = t[0],
            r = t[1];
          r.changed
            ? (this._toggleClass(i, r.enabled), (r.changed = !1))
            : r.touched ||
              (r.enabled && this._toggleClass(i, !1), this.stateMap.delete(i)),
            (r.touched = !1);
        }
      }
      _toggleClass(t, i) {
        (t = t.trim()),
          t.length > 0 &&
            t.split(Vp).forEach((r) => {
              i
                ? this._renderer.addClass(this._ngEl.nativeElement, r)
                : this._renderer.removeClass(this._ngEl.nativeElement, r);
            });
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(Ct), X(Wi));
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [["", "ngClass", ""]],
          inputs: { klass: [0, "class", "klass"], ngClass: "ngClass" },
          standalone: !0,
        });
      }
    }
    return e;
  })();
var jp = class {
    constructor(n, t, i, r) {
      (this.$implicit = n),
        (this.ngForOf = t),
        (this.index = i),
        (this.count = r);
    }
    get first() {
      return this.index === 0;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 === 0;
    }
    get odd() {
      return !this.even;
    }
  },
  Nb = (() => {
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
      constructor(t, i, r) {
        (this._viewContainer = t),
          (this._template = i),
          (this._differs = r),
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
          let t = this._ngForOf;
          if (!this._differ && t)
            if (0)
              try {
              } catch {}
            else this._differ = this._differs.find(t).create(this.ngForTrackBy);
        }
        if (this._differ) {
          let t = this._differ.diff(this._ngForOf);
          t && this._applyChanges(t);
        }
      }
      _applyChanges(t) {
        let i = this._viewContainer;
        t.forEachOperation((r, o, s) => {
          if (r.previousIndex == null)
            i.createEmbeddedView(
              this._template,
              new jp(r.item, this._ngForOf, -1, -1),
              s === null ? void 0 : s
            );
          else if (s == null) i.remove(o === null ? void 0 : o);
          else if (o !== null) {
            let a = i.get(o);
            i.move(a, s), bb(a, r);
          }
        });
        for (let r = 0, o = i.length; r < o; r++) {
          let a = i.get(r).context;
          (a.index = r), (a.count = o), (a.ngForOf = this._ngForOf);
        }
        t.forEachIdentityChange((r) => {
          let o = i.get(r.currentIndex);
          bb(o, r);
        });
      }
      static ngTemplateContextGuard(t, i) {
        return !0;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(bn), X(Kn), X(Ia));
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [["", "ngFor", "", "ngForOf", ""]],
          inputs: {
            ngForOf: "ngForOf",
            ngForTrackBy: "ngForTrackBy",
            ngForTemplate: "ngForTemplate",
          },
          standalone: !0,
        });
      }
    }
    return e;
  })();
function bb(e, n) {
  e.context.$implicit = n.item;
}
var Bt = (() => {
    class e {
      constructor(t, i) {
        (this._viewContainer = t),
          (this._context = new Bp()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = i);
      }
      set ngIf(t) {
        (this._context.$implicit = this._context.ngIf = t), this._updateView();
      }
      set ngIfThen(t) {
        Cb("ngIfThen", t),
          (this._thenTemplateRef = t),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(t) {
        Cb("ngIfElse", t),
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
      static ngTemplateContextGuard(t, i) {
        return !0;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(bn), X(Kn));
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [["", "ngIf", ""]],
          inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
          standalone: !0,
        });
      }
    }
    return e;
  })(),
  Bp = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function Cb(e, n) {
  if (!!!(!n || n.createEmbeddedView))
    throw new Error(`${e} must be a TemplateRef, but received '${nn(n)}'.`);
}
var Wp = (() => {
  class e {
    constructor(t) {
      (this._viewContainerRef = t),
        (this._viewRef = null),
        (this.ngTemplateOutletContext = null),
        (this.ngTemplateOutlet = null),
        (this.ngTemplateOutletInjector = null);
    }
    ngOnChanges(t) {
      if (this._shouldRecreateView(t)) {
        let i = this._viewContainerRef;
        if (
          (this._viewRef && i.remove(i.indexOf(this._viewRef)),
          !this.ngTemplateOutlet)
        ) {
          this._viewRef = null;
          return;
        }
        let r = this._createContextForwardProxy();
        this._viewRef = i.createEmbeddedView(this.ngTemplateOutlet, r, {
          injector: this.ngTemplateOutletInjector ?? void 0,
        });
      }
    }
    _shouldRecreateView(t) {
      return !!t.ngTemplateOutlet || !!t.ngTemplateOutletInjector;
    }
    _createContextForwardProxy() {
      return new Proxy(
        {},
        {
          set: (t, i, r) =>
            this.ngTemplateOutletContext
              ? Reflect.set(this.ngTemplateOutletContext, i, r)
              : !1,
          get: (t, i, r) => {
            if (this.ngTemplateOutletContext)
              return Reflect.get(this.ngTemplateOutletContext, i, r);
          },
        }
      );
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(X(bn));
      };
    }
    static {
      this.ɵdir = dt({
        type: e,
        selectors: [["", "ngTemplateOutlet", ""]],
        inputs: {
          ngTemplateOutletContext: "ngTemplateOutletContext",
          ngTemplateOutlet: "ngTemplateOutlet",
          ngTemplateOutletInjector: "ngTemplateOutletInjector",
        },
        standalone: !0,
        features: [Vt],
      });
    }
  }
  return e;
})();
function _x(e, n) {
  return new pe(2100, !1);
}
var vx = "mediumDate",
  yx = new z(""),
  bx = new z(""),
  Pr = (() => {
    class e {
      constructor(t, i, r) {
        (this.locale = t),
          (this.defaultTimezone = i),
          (this.defaultOptions = r);
      }
      transform(t, i, r, o) {
        if (t == null || t === "" || t !== t) return null;
        try {
          let s = i ?? this.defaultOptions?.dateFormat ?? vx,
            a =
              r ??
              this.defaultOptions?.timezone ??
              this.defaultTimezone ??
              void 0;
          return Sb(t, s, o || this.locale, a);
        } catch (s) {
          throw _x(e, s.message);
        }
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(Ma, 16), X(yx, 24), X(bx, 24));
        };
      }
      static {
        this.ɵpipe = yi({ name: "date", type: e, pure: !0, standalone: !0 });
      }
    }
    return e;
  })();
var Wu = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵmod = et({ type: e });
      }
      static {
        this.ɵinj = Xe({});
      }
    }
    return e;
  })(),
  qp = "browser",
  Cx = "server";
function qu(e) {
  return e === qp;
}
function Zu(e) {
  return e === Cx;
}
var Pb = (() => {
    class e {
      static {
        this.ɵprov = G({
          token: e,
          providedIn: "root",
          factory: () => (qu(O(fn)) ? new Hp(O(ht), window) : new Up()),
        });
      }
    }
    return e;
  })(),
  Hp = class {
    constructor(n, t) {
      (this.document = n), (this.window = t), (this.offset = () => [0, 0]);
    }
    setOffset(n) {
      Array.isArray(n) ? (this.offset = () => n) : (this.offset = n);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(n) {
      this.window.scrollTo(n[0], n[1]);
    }
    scrollToAnchor(n) {
      let t = wx(this.document, n);
      t && (this.scrollToElement(t), t.focus());
    }
    setHistoryScrollRestoration(n) {
      this.window.history.scrollRestoration = n;
    }
    scrollToElement(n) {
      let t = n.getBoundingClientRect(),
        i = t.left + this.window.pageXOffset,
        r = t.top + this.window.pageYOffset,
        o = this.offset();
      this.window.scrollTo(i - o[0], r - o[1]);
    }
  };
function wx(e, n) {
  let t = e.getElementById(n) || e.getElementsByName(n)[0];
  if (t) return t;
  if (
    typeof e.createTreeWalker == "function" &&
    e.body &&
    typeof e.body.attachShadow == "function"
  ) {
    let i = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT),
      r = i.currentNode;
    for (; r; ) {
      let o = r.shadowRoot;
      if (o) {
        let s = o.getElementById(n) || o.querySelector(`[name="${n}"]`);
        if (s) return s;
      }
      r = i.nextNode();
    }
  }
  return null;
}
var Up = class {
    setOffset(n) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(n) {}
    scrollToAnchor(n) {}
    setHistoryScrollRestoration(n) {}
  },
  vs = class {};
var xa = class {},
  Qu = class {},
  Ji = class e {
    constructor(n) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        n
          ? typeof n == "string"
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  n
                    .split(
                      `
`
                    )
                    .forEach((t) => {
                      let i = t.indexOf(":");
                      if (i > 0) {
                        let r = t.slice(0, i),
                          o = r.toLowerCase(),
                          s = t.slice(i + 1).trim();
                        this.maybeSetNormalizedName(r, o),
                          this.headers.has(o)
                            ? this.headers.get(o).push(s)
                            : this.headers.set(o, [s]);
                      }
                    });
              })
            : typeof Headers < "u" && n instanceof Headers
            ? ((this.headers = new Map()),
              n.forEach((t, i) => {
                this.setHeaderEntries(i, t);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(n).forEach(([t, i]) => {
                    this.setHeaderEntries(t, i);
                  });
              })
          : (this.headers = new Map());
    }
    has(n) {
      return this.init(), this.headers.has(n.toLowerCase());
    }
    get(n) {
      this.init();
      let t = this.headers.get(n.toLowerCase());
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
        (this.lazyInit instanceof e
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
      let t = new e();
      return (
        (t.lazyInit =
          this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
        t
      );
    }
    applyUpdate(n) {
      let t = n.name.toLowerCase();
      switch (n.op) {
        case "a":
        case "s":
          let i = n.value;
          if ((typeof i == "string" && (i = [i]), i.length === 0)) return;
          this.maybeSetNormalizedName(n.name, t);
          let r = (n.op === "a" ? this.headers.get(t) : void 0) || [];
          r.push(...i), this.headers.set(t, r);
          break;
        case "d":
          let o = n.value;
          if (!o) this.headers.delete(t), this.normalizedNames.delete(t);
          else {
            let s = this.headers.get(t);
            if (!s) return;
            (s = s.filter((a) => o.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(t), this.normalizedNames.delete(t))
                : this.headers.set(t, s);
          }
          break;
      }
    }
    setHeaderEntries(n, t) {
      let i = (Array.isArray(t) ? t : [t]).map((o) => o.toString()),
        r = n.toLowerCase();
      this.headers.set(r, i), this.maybeSetNormalizedName(n, r);
    }
    forEach(n) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((t) =>
          n(this.normalizedNames.get(t), this.headers.get(t))
        );
    }
  };
var Yp = class {
  encodeKey(n) {
    return Ab(n);
  }
  encodeValue(n) {
    return Ab(n);
  }
  decodeKey(n) {
    return decodeURIComponent(n);
  }
  decodeValue(n) {
    return decodeURIComponent(n);
  }
};
function Dx(e, n) {
  let t = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((r) => {
          let o = r.indexOf("="),
            [s, a] =
              o == -1
                ? [n.decodeKey(r), ""]
                : [n.decodeKey(r.slice(0, o)), n.decodeValue(r.slice(o + 1))],
            l = t.get(s) || [];
          l.push(a), t.set(s, l);
        }),
    t
  );
}
var Ex = /%(\d[a-f0-9])/gi,
  Mx = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function Ab(e) {
  return encodeURIComponent(e).replace(Ex, (n, t) => Mx[t] ?? n);
}
function Yu(e) {
  return `${e}`;
}
var Rr = class e {
  constructor(n = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = n.encoder || new Yp()),
      n.fromString)
    ) {
      if (n.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = Dx(n.fromString, this.encoder);
    } else
      n.fromObject
        ? ((this.map = new Map()),
          Object.keys(n.fromObject).forEach((t) => {
            let i = n.fromObject[t],
              r = Array.isArray(i) ? i.map(Yu) : [Yu(i)];
            this.map.set(t, r);
          }))
        : (this.map = null);
  }
  has(n) {
    return this.init(), this.map.has(n);
  }
  get(n) {
    this.init();
    let t = this.map.get(n);
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
    let t = [];
    return (
      Object.keys(n).forEach((i) => {
        let r = n[i];
        Array.isArray(r)
          ? r.forEach((o) => {
              t.push({ param: i, value: o, op: "a" });
            })
          : t.push({ param: i, value: r, op: "a" });
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
          let t = this.encoder.encodeKey(n);
          return this.map
            .get(n)
            .map((i) => t + "=" + this.encoder.encodeValue(i))
            .join("&");
        })
        .filter((n) => n !== "")
        .join("&")
    );
  }
  clone(n) {
    let t = new e({ encoder: this.encoder });
    return (
      (t.cloneFrom = this.cloneFrom || this),
      (t.updates = (this.updates || []).concat(n)),
      t
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
        this.updates.forEach((n) => {
          switch (n.op) {
            case "a":
            case "s":
              let t = (n.op === "a" ? this.map.get(n.param) : void 0) || [];
              t.push(Yu(n.value)), this.map.set(n.param, t);
              break;
            case "d":
              if (n.value !== void 0) {
                let i = this.map.get(n.param) || [],
                  r = i.indexOf(Yu(n.value));
                r !== -1 && i.splice(r, 1),
                  i.length > 0
                    ? this.map.set(n.param, i)
                    : this.map.delete(n.param);
              } else {
                this.map.delete(n.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Qp = class {
  constructor() {
    this.map = new Map();
  }
  set(n, t) {
    return this.map.set(n, t), this;
  }
  get(n) {
    return (
      this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n)
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
};
function Ix(e) {
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
}
function Rb(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
}
function kb(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function Fb(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function Tx(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
var Sa = class e {
    constructor(n, t, i, r) {
      (this.url = t),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = "json"),
        (this.method = n.toUpperCase());
      let o;
      if (
        (Ix(this.method) || r
          ? ((this.body = i !== void 0 ? i : null), (o = r))
          : (o = i),
        o &&
          ((this.reportProgress = !!o.reportProgress),
          (this.withCredentials = !!o.withCredentials),
          o.responseType && (this.responseType = o.responseType),
          o.headers && (this.headers = o.headers),
          o.context && (this.context = o.context),
          o.params && (this.params = o.params),
          (this.transferCache = o.transferCache)),
        (this.headers ??= new Ji()),
        (this.context ??= new Qp()),
        !this.params)
      )
        (this.params = new Rr()), (this.urlWithParams = t);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = t;
        else {
          let a = t.indexOf("?"),
            l = a === -1 ? "?" : a < t.length - 1 ? "&" : "";
          this.urlWithParams = t + l + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          Rb(this.body) ||
          kb(this.body) ||
          Fb(this.body) ||
          Tx(this.body)
        ? this.body
        : this.body instanceof Rr
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || Fb(this.body)
        ? null
        : kb(this.body)
        ? this.body.type || null
        : Rb(this.body)
        ? null
        : typeof this.body == "string"
        ? "text/plain"
        : this.body instanceof Rr
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? "application/json"
        : null;
    }
    clone(n = {}) {
      let t = n.method || this.method,
        i = n.url || this.url,
        r = n.responseType || this.responseType,
        o = n.transferCache ?? this.transferCache,
        s = n.body !== void 0 ? n.body : this.body,
        a = n.withCredentials ?? this.withCredentials,
        l = n.reportProgress ?? this.reportProgress,
        c = n.headers || this.headers,
        u = n.params || this.params,
        d = n.context ?? this.context;
      return (
        n.setHeaders !== void 0 &&
          (c = Object.keys(n.setHeaders).reduce(
            (_, h) => _.set(h, n.setHeaders[h]),
            c
          )),
        n.setParams &&
          (u = Object.keys(n.setParams).reduce(
            (_, h) => _.set(h, n.setParams[h]),
            u
          )),
        new e(t, i, s, {
          params: u,
          headers: c,
          context: d,
          reportProgress: l,
          responseType: r,
          withCredentials: a,
          transferCache: o,
        })
      );
    }
  },
  kr = (function (e) {
    return (
      (e[(e.Sent = 0)] = "Sent"),
      (e[(e.UploadProgress = 1)] = "UploadProgress"),
      (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
      (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
      (e[(e.Response = 4)] = "Response"),
      (e[(e.User = 5)] = "User"),
      e
    );
  })(kr || {}),
  Oa = class {
    constructor(n, t = 200, i = "OK") {
      (this.headers = n.headers || new Ji()),
        (this.status = n.status !== void 0 ? n.status : t),
        (this.statusText = n.statusText || i),
        (this.url = n.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  Ku = class e extends Oa {
    constructor(n = {}) {
      super(n), (this.type = kr.ResponseHeader);
    }
    clone(n = {}) {
      return new e({
        headers: n.headers || this.headers,
        status: n.status !== void 0 ? n.status : this.status,
        statusText: n.statusText || this.statusText,
        url: n.url || this.url || void 0,
      });
    }
  },
  Na = class e extends Oa {
    constructor(n = {}) {
      super(n),
        (this.type = kr.Response),
        (this.body = n.body !== void 0 ? n.body : null);
    }
    clone(n = {}) {
      return new e({
        body: n.body !== void 0 ? n.body : this.body,
        headers: n.headers || this.headers,
        status: n.status !== void 0 ? n.status : this.status,
        statusText: n.statusText || this.statusText,
        url: n.url || this.url || void 0,
      });
    }
  },
  Ar = class extends Oa {
    constructor(n) {
      super(n, 0, "Unknown Error"),
        (this.name = "HttpErrorResponse"),
        (this.ok = !1),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              n.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              n.url || "(unknown url)"
            }: ${n.status} ${n.statusText}`),
        (this.error = n.error || null);
    }
  },
  Hb = 200,
  Sx = 204;
function Zp(e, n) {
  return {
    body: n,
    headers: e.headers,
    context: e.context,
    observe: e.observe,
    params: e.params,
    reportProgress: e.reportProgress,
    responseType: e.responseType,
    withCredentials: e.withCredentials,
    transferCache: e.transferCache,
  };
}
var Xp = (() => {
    class e {
      constructor(t) {
        this.handler = t;
      }
      request(t, i, r = {}) {
        let o;
        if (t instanceof Sa) o = t;
        else {
          let l;
          r.headers instanceof Ji ? (l = r.headers) : (l = new Ji(r.headers));
          let c;
          r.params &&
            (r.params instanceof Rr
              ? (c = r.params)
              : (c = new Rr({ fromObject: r.params }))),
            (o = new Sa(t, i, r.body !== void 0 ? r.body : null, {
              headers: l,
              context: r.context,
              params: c,
              reportProgress: r.reportProgress,
              responseType: r.responseType || "json",
              withCredentials: r.withCredentials,
              transferCache: r.transferCache,
            }));
        }
        let s = J(o).pipe(Wn((l) => this.handler.handle(l)));
        if (t instanceof Sa || r.observe === "events") return s;
        let a = s.pipe(It((l) => l instanceof Na));
        switch (r.observe || "body") {
          case "body":
            switch (o.responseType) {
              case "arraybuffer":
                return a.pipe(
                  Ce((l) => {
                    if (l.body !== null && !(l.body instanceof ArrayBuffer))
                      throw new Error("Response is not an ArrayBuffer.");
                    return l.body;
                  })
                );
              case "blob":
                return a.pipe(
                  Ce((l) => {
                    if (l.body !== null && !(l.body instanceof Blob))
                      throw new Error("Response is not a Blob.");
                    return l.body;
                  })
                );
              case "text":
                return a.pipe(
                  Ce((l) => {
                    if (l.body !== null && typeof l.body != "string")
                      throw new Error("Response is not a string.");
                    return l.body;
                  })
                );
              case "json":
              default:
                return a.pipe(Ce((l) => l.body));
            }
          case "response":
            return a;
          default:
            throw new Error(
              `Unreachable: unhandled observe type ${r.observe}}`
            );
        }
      }
      delete(t, i = {}) {
        return this.request("DELETE", t, i);
      }
      get(t, i = {}) {
        return this.request("GET", t, i);
      }
      head(t, i = {}) {
        return this.request("HEAD", t, i);
      }
      jsonp(t, i) {
        return this.request("JSONP", t, {
          params: new Rr().append(i, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(t, i = {}) {
        return this.request("OPTIONS", t, i);
      }
      patch(t, i, r = {}) {
        return this.request("PATCH", t, Zp(r, i));
      }
      post(t, i, r = {}) {
        return this.request("POST", t, Zp(r, i));
      }
      put(t, i, r = {}) {
        return this.request("PUT", t, Zp(r, i));
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(xa));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  xx = /^\)\]\}',?\n/,
  Ox = "X-Request-URL";
function Lb(e) {
  if (e.url) return e.url;
  let n = Ox.toLocaleLowerCase();
  return e.headers.get(n);
}
var Nx = (() => {
    class e {
      constructor() {
        (this.fetchImpl =
          O(Kp, { optional: !0 })?.fetch ?? ((...t) => globalThis.fetch(...t))),
          (this.ngZone = O(Re));
      }
      handle(t) {
        return new Me((i) => {
          let r = new AbortController();
          return (
            this.doRequest(t, r.signal, i).then(Jp, (o) =>
              i.error(new Ar({ error: o }))
            ),
            () => r.abort()
          );
        });
      }
      doRequest(t, i, r) {
        return Qs(this, null, function* () {
          let o = this.createRequestInit(t),
            s;
          try {
            let h = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(t.urlWithParams, j({ signal: i }, o))
            );
            Px(h), r.next({ type: kr.Sent }), (s = yield h);
          } catch (h) {
            r.error(
              new Ar({
                error: h,
                status: h.status ?? 0,
                statusText: h.statusText,
                url: t.urlWithParams,
                headers: h.headers,
              })
            );
            return;
          }
          let a = new Ji(s.headers),
            l = s.statusText,
            c = Lb(s) ?? t.urlWithParams,
            u = s.status,
            d = null;
          if (
            (t.reportProgress &&
              r.next(new Ku({ headers: a, status: u, statusText: l, url: c })),
            s.body)
          ) {
            let h = s.headers.get("content-length"),
              D = [],
              I = s.body.getReader(),
              P = 0,
              F,
              R,
              T = typeof Zone < "u" && Zone.current;
            yield this.ngZone.runOutsideAngular(() =>
              Qs(this, null, function* () {
                for (;;) {
                  let { done: K, value: ee } = yield I.read();
                  if (K) break;
                  if ((D.push(ee), (P += ee.length), t.reportProgress)) {
                    R =
                      t.responseType === "text"
                        ? (R ?? "") +
                          (F ??= new TextDecoder()).decode(ee, { stream: !0 })
                        : void 0;
                    let ce = () =>
                      r.next({
                        type: kr.DownloadProgress,
                        total: h ? +h : void 0,
                        loaded: P,
                        partialText: R,
                      });
                    T ? T.run(ce) : ce();
                  }
                }
              })
            );
            let U = this.concatChunks(D, P);
            try {
              let K = s.headers.get("Content-Type") ?? "";
              d = this.parseBody(t, U, K);
            } catch (K) {
              r.error(
                new Ar({
                  error: K,
                  headers: new Ji(s.headers),
                  status: s.status,
                  statusText: s.statusText,
                  url: Lb(s) ?? t.urlWithParams,
                })
              );
              return;
            }
          }
          u === 0 && (u = d ? Hb : 0),
            u >= 200 && u < 300
              ? (r.next(
                  new Na({
                    body: d,
                    headers: a,
                    status: u,
                    statusText: l,
                    url: c,
                  })
                ),
                r.complete())
              : r.error(
                  new Ar({
                    error: d,
                    headers: a,
                    status: u,
                    statusText: l,
                    url: c,
                  })
                );
        });
      }
      parseBody(t, i, r) {
        switch (t.responseType) {
          case "json":
            let o = new TextDecoder().decode(i).replace(xx, "");
            return o === "" ? null : JSON.parse(o);
          case "text":
            return new TextDecoder().decode(i);
          case "blob":
            return new Blob([i], { type: r });
          case "arraybuffer":
            return i.buffer;
        }
      }
      createRequestInit(t) {
        let i = {},
          r = t.withCredentials ? "include" : void 0;
        if (
          (t.headers.forEach((o, s) => (i[o] = s.join(","))),
          t.headers.has("Accept") ||
            (i.Accept = "application/json, text/plain, */*"),
          !t.headers.has("Content-Type"))
        ) {
          let o = t.detectContentTypeHeader();
          o !== null && (i["Content-Type"] = o);
        }
        return {
          body: t.serializeBody(),
          method: t.method,
          headers: i,
          credentials: r,
        };
      }
      concatChunks(t, i) {
        let r = new Uint8Array(i),
          o = 0;
        for (let s of t) r.set(s, o), (o += s.length);
        return r;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Kp = class {};
function Jp() {}
function Px(e) {
  e.then(Jp, Jp);
}
function Ub(e, n) {
  return n(e);
}
function Ax(e, n) {
  return (t, i) => n.intercept(t, { handle: (r) => e(r, i) });
}
function Rx(e, n, t) {
  return (i, r) => xn(t, () => n(i, (o) => e(o, r)));
}
var kx = new z(""),
  eg = new z(""),
  Fx = new z(""),
  $b = new z("", { providedIn: "root", factory: () => !0 });
function Lx() {
  let e = null;
  return (n, t) => {
    e === null && (e = (O(kx, { optional: !0 }) ?? []).reduceRight(Ax, Ub));
    let i = O(Gi);
    if (O($b)) {
      let o = i.add();
      return e(n, t).pipe(ln(() => i.remove(o)));
    } else return e(n, t);
  };
}
var Vb = (() => {
  class e extends xa {
    constructor(t, i) {
      super(),
        (this.backend = t),
        (this.injector = i),
        (this.chain = null),
        (this.pendingTasks = O(Gi)),
        (this.contributeToStability = O($b));
    }
    handle(t) {
      if (this.chain === null) {
        let i = Array.from(
          new Set([...this.injector.get(eg), ...this.injector.get(Fx, [])])
        );
        this.chain = i.reduceRight((r, o) => Rx(r, o, this.injector), Ub);
      }
      if (this.contributeToStability) {
        let i = this.pendingTasks.add();
        return this.chain(t, (r) => this.backend.handle(r)).pipe(
          ln(() => this.pendingTasks.remove(i))
        );
      } else return this.chain(t, (i) => this.backend.handle(i));
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(q(Qu), q(Qt));
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac });
    }
  }
  return e;
})();
var Vx = /^\)\]\}',?\n/;
function jx(e) {
  return "responseURL" in e && e.responseURL
    ? e.responseURL
    : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
    ? e.getResponseHeader("X-Request-URL")
    : null;
}
var jb = (() => {
    class e {
      constructor(t) {
        this.xhrFactory = t;
      }
      handle(t) {
        if (t.method === "JSONP") throw new pe(-2800, !1);
        let i = this.xhrFactory;
        return (i.ɵloadImpl ? it(i.ɵloadImpl()) : J(null)).pipe(
          ut(
            () =>
              new Me((o) => {
                let s = i.build();
                if (
                  (s.open(t.method, t.urlWithParams),
                  t.withCredentials && (s.withCredentials = !0),
                  t.headers.forEach((I, P) =>
                    s.setRequestHeader(I, P.join(","))
                  ),
                  t.headers.has("Accept") ||
                    s.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  let I = t.detectContentTypeHeader();
                  I !== null && s.setRequestHeader("Content-Type", I);
                }
                if (t.responseType) {
                  let I = t.responseType.toLowerCase();
                  s.responseType = I !== "json" ? I : "text";
                }
                let a = t.serializeBody(),
                  l = null,
                  c = () => {
                    if (l !== null) return l;
                    let I = s.statusText || "OK",
                      P = new Ji(s.getAllResponseHeaders()),
                      F = jx(s) || t.url;
                    return (
                      (l = new Ku({
                        headers: P,
                        status: s.status,
                        statusText: I,
                        url: F,
                      })),
                      l
                    );
                  },
                  u = () => {
                    let { headers: I, status: P, statusText: F, url: R } = c(),
                      T = null;
                    P !== Sx &&
                      (T =
                        typeof s.response > "u" ? s.responseText : s.response),
                      P === 0 && (P = T ? Hb : 0);
                    let U = P >= 200 && P < 300;
                    if (t.responseType === "json" && typeof T == "string") {
                      let K = T;
                      T = T.replace(Vx, "");
                      try {
                        T = T !== "" ? JSON.parse(T) : null;
                      } catch (ee) {
                        (T = K), U && ((U = !1), (T = { error: ee, text: T }));
                      }
                    }
                    U
                      ? (o.next(
                          new Na({
                            body: T,
                            headers: I,
                            status: P,
                            statusText: F,
                            url: R || void 0,
                          })
                        ),
                        o.complete())
                      : o.error(
                          new Ar({
                            error: T,
                            headers: I,
                            status: P,
                            statusText: F,
                            url: R || void 0,
                          })
                        );
                  },
                  d = (I) => {
                    let { url: P } = c(),
                      F = new Ar({
                        error: I,
                        status: s.status || 0,
                        statusText: s.statusText || "Unknown Error",
                        url: P || void 0,
                      });
                    o.error(F);
                  },
                  _ = !1,
                  h = (I) => {
                    _ || (o.next(c()), (_ = !0));
                    let P = { type: kr.DownloadProgress, loaded: I.loaded };
                    I.lengthComputable && (P.total = I.total),
                      t.responseType === "text" &&
                        s.responseText &&
                        (P.partialText = s.responseText),
                      o.next(P);
                  },
                  D = (I) => {
                    let P = { type: kr.UploadProgress, loaded: I.loaded };
                    I.lengthComputable && (P.total = I.total), o.next(P);
                  };
                return (
                  s.addEventListener("load", u),
                  s.addEventListener("error", d),
                  s.addEventListener("timeout", d),
                  s.addEventListener("abort", d),
                  t.reportProgress &&
                    (s.addEventListener("progress", h),
                    a !== null &&
                      s.upload &&
                      s.upload.addEventListener("progress", D)),
                  s.send(a),
                  o.next({ type: kr.Sent }),
                  () => {
                    s.removeEventListener("error", d),
                      s.removeEventListener("abort", d),
                      s.removeEventListener("load", u),
                      s.removeEventListener("timeout", d),
                      t.reportProgress &&
                        (s.removeEventListener("progress", h),
                        a !== null &&
                          s.upload &&
                          s.upload.removeEventListener("progress", D)),
                      s.readyState !== s.DONE && s.abort();
                  }
                );
              })
          )
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(vs));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  zb = new z(""),
  Bx = "XSRF-TOKEN",
  Hx = new z("", { providedIn: "root", factory: () => Bx }),
  Ux = "X-XSRF-TOKEN",
  $x = new z("", { providedIn: "root", factory: () => Ux }),
  Ju = class {},
  zx = (() => {
    class e {
      constructor(t, i, r) {
        (this.doc = t),
          (this.platform = i),
          (this.cookieName = r),
          (this.lastCookieString = ""),
          (this.lastToken = null),
          (this.parseCount = 0);
      }
      getToken() {
        if (this.platform === "server") return null;
        let t = this.doc.cookie || "";
        return (
          t !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = Gu(t, this.cookieName)),
            (this.lastCookieString = t)),
          this.lastToken
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(ht), q(fn), q(Hx));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function Gx(e, n) {
  let t = e.url.toLowerCase();
  if (
    !O(zb) ||
    e.method === "GET" ||
    e.method === "HEAD" ||
    t.startsWith("http://") ||
    t.startsWith("https://")
  )
    return n(e);
  let i = O(Ju).getToken(),
    r = O($x);
  return (
    i != null &&
      !e.headers.has(r) &&
      (e = e.clone({ headers: e.headers.set(r, i) })),
    n(e)
  );
}
var Gb = (function (e) {
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
})(Gb || {});
function Wx(e, n) {
  return { ɵkind: e, ɵproviders: n };
}
function Wb(...e) {
  let n = [
    Xp,
    jb,
    Vb,
    { provide: xa, useExisting: Vb },
    { provide: Qu, useFactory: () => O(Nx, { optional: !0 }) ?? O(jb) },
    { provide: eg, useValue: Gx, multi: !0 },
    { provide: zb, useValue: !0 },
    { provide: Ju, useClass: zx },
  ];
  for (let t of e) n.push(...t.ɵproviders);
  return ya(n);
}
var Bb = new z("");
function qb() {
  return Wx(Gb.LegacyInterceptors, [
    { provide: Bb, useFactory: Lx },
    { provide: eg, useExisting: Bb, multi: !0 },
  ]);
}
var ig = class extends Hu {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  rg = class e extends ig {
    static makeCurrent() {
      Db(new e());
    }
    onAndCancel(n, t, i) {
      return (
        n.addEventListener(t, i),
        () => {
          n.removeEventListener(t, i);
        }
      );
    }
    dispatchEvent(n, t) {
      n.dispatchEvent(t);
    }
    remove(n) {
      n.remove();
    }
    createElement(n, t) {
      return (t = t || this.getDefaultDocument()), t.createElement(n);
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
      return t === "window"
        ? window
        : t === "document"
        ? n
        : t === "body"
        ? n.body
        : null;
    }
    getBaseHref(n) {
      let t = qx();
      return t == null ? null : Zx(t);
    }
    resetBaseElement() {
      Pa = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(n) {
      return Gu(document.cookie, n);
    }
  },
  Pa = null;
function qx() {
  return (
    (Pa = Pa || document.querySelector("base")),
    Pa ? Pa.getAttribute("href") : null
  );
}
function Zx(e) {
  return new URL(e, document.baseURI).pathname;
}
var og = class {
    addToWindow(n) {
      (en.getAngularTestability = (i, r = !0) => {
        let o = n.findTestabilityInTree(i, r);
        if (o == null) throw new pe(5103, !1);
        return o;
      }),
        (en.getAllAngularTestabilities = () => n.getAllTestabilities()),
        (en.getAllAngularRootElements = () => n.getAllRootElements());
      let t = (i) => {
        let r = en.getAllAngularTestabilities(),
          o = r.length,
          s = function () {
            o--, o == 0 && i();
          };
        r.forEach((a) => {
          a.whenStable(s);
        });
      };
      en.frameworkStabilizers || (en.frameworkStabilizers = []),
        en.frameworkStabilizers.push(t);
    }
    findTestabilityInTree(n, t, i) {
      if (t == null) return null;
      let r = n.getTestability(t);
      return (
        r ??
        (i
          ? Di().isShadowRoot(t)
            ? this.findTestabilityInTree(n, t.host, !0)
            : this.findTestabilityInTree(n, t.parentElement, !0)
          : null)
      );
    }
  },
  Yx = (() => {
    class e {
      build() {
        return new XMLHttpRequest();
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  sg = new z(""),
  Kb = (() => {
    class e {
      constructor(t, i) {
        (this._zone = i),
          (this._eventNameToPlugin = new Map()),
          t.forEach((r) => {
            r.manager = this;
          }),
          (this._plugins = t.slice().reverse());
      }
      addEventListener(t, i, r) {
        return this._findPluginFor(i).addEventListener(t, i, r);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(t) {
        let i = this._eventNameToPlugin.get(t);
        if (i) return i;
        if (((i = this._plugins.find((o) => o.supports(t))), !i))
          throw new pe(5101, !1);
        return this._eventNameToPlugin.set(t, i), i;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(sg), q(Re));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Xu = class {
    constructor(n) {
      this._doc = n;
    }
  },
  tg = "ng-app-id",
  Jb = (() => {
    class e {
      constructor(t, i, r, o = {}) {
        (this.doc = t),
          (this.appId = i),
          (this.nonce = r),
          (this.platformId = o),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = Zu(o)),
          this.resetHostNodes();
      }
      addStyles(t) {
        for (let i of t)
          this.changeUsageCount(i, 1) === 1 && this.onStyleAdded(i);
      }
      removeStyles(t) {
        for (let i of t)
          this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
      }
      ngOnDestroy() {
        let t = this.styleNodesInDOM;
        t && (t.forEach((i) => i.remove()), t.clear());
        for (let i of this.getAllStyles()) this.onStyleRemoved(i);
        this.resetHostNodes();
      }
      addHost(t) {
        this.hostNodes.add(t);
        for (let i of this.getAllStyles()) this.addStyleToHost(t, i);
      }
      removeHost(t) {
        this.hostNodes.delete(t);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(t) {
        for (let i of this.hostNodes) this.addStyleToHost(i, t);
      }
      onStyleRemoved(t) {
        let i = this.styleRef;
        i.get(t)?.elements?.forEach((r) => r.remove()), i.delete(t);
      }
      collectServerRenderedStyles() {
        let t = this.doc.head?.querySelectorAll(`style[${tg}="${this.appId}"]`);
        if (t?.length) {
          let i = new Map();
          return (
            t.forEach((r) => {
              r.textContent != null && i.set(r.textContent, r);
            }),
            i
          );
        }
        return null;
      }
      changeUsageCount(t, i) {
        let r = this.styleRef;
        if (r.has(t)) {
          let o = r.get(t);
          return (o.usage += i), o.usage;
        }
        return r.set(t, { usage: i, elements: [] }), i;
      }
      getStyleElement(t, i) {
        let r = this.styleNodesInDOM,
          o = r?.get(i);
        if (o?.parentNode === t) return r.delete(i), o.removeAttribute(tg), o;
        {
          let s = this.doc.createElement("style");
          return (
            this.nonce && s.setAttribute("nonce", this.nonce),
            (s.textContent = i),
            this.platformIsServer && s.setAttribute(tg, this.appId),
            t.appendChild(s),
            s
          );
        }
      }
      addStyleToHost(t, i) {
        let r = this.getStyleElement(t, i),
          o = this.styleRef,
          s = o.get(i)?.elements;
        s ? s.push(r) : o.set(i, { elements: [r], usage: 1 });
      }
      resetHostNodes() {
        let t = this.hostNodes;
        t.clear(), t.add(this.doc.head);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(ht), q(hu), q(fp, 8), q(fn));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  ng = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  lg = /%COMP%/g,
  Xb = "%COMP%",
  Qx = `_nghost-${Xb}`,
  Kx = `_ngcontent-${Xb}`,
  Jx = !0,
  Xx = new z("", { providedIn: "root", factory: () => Jx });
function eO(e) {
  return Kx.replace(lg, e);
}
function tO(e) {
  return Qx.replace(lg, e);
}
function eC(e, n) {
  return n.map((t) => t.replace(lg, e));
}
var Zb = (() => {
    class e {
      constructor(t, i, r, o, s, a, l, c = null) {
        (this.eventManager = t),
          (this.sharedStylesHost = i),
          (this.appId = r),
          (this.removeStylesOnCompDestroy = o),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = l),
          (this.nonce = c),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = Zu(a)),
          (this.defaultRenderer = new Aa(t, s, l, this.platformIsServer));
      }
      createRenderer(t, i) {
        if (!t || !i) return this.defaultRenderer;
        this.platformIsServer &&
          i.encapsulation === gi.ShadowDom &&
          (i = Pe(j({}, i), { encapsulation: gi.Emulated }));
        let r = this.getOrCreateRenderer(t, i);
        return (
          r instanceof ed
            ? r.applyToHost(t)
            : r instanceof Ra && r.applyStyles(),
          r
        );
      }
      getOrCreateRenderer(t, i) {
        let r = this.rendererByCompId,
          o = r.get(i.id);
        if (!o) {
          let s = this.doc,
            a = this.ngZone,
            l = this.eventManager,
            c = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.platformIsServer;
          switch (i.encapsulation) {
            case gi.Emulated:
              o = new ed(l, c, i, this.appId, u, s, a, d);
              break;
            case gi.ShadowDom:
              return new ag(l, c, t, i, s, a, this.nonce, d);
            default:
              o = new Ra(l, c, i, u, s, a, d);
              break;
          }
          r.set(i.id, o);
        }
        return o;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(
            q(Kb),
            q(Jb),
            q(hu),
            q(Xx),
            q(ht),
            q(fn),
            q(Re),
            q(fp)
          );
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Aa = class {
    constructor(n, t, i, r) {
      (this.eventManager = n),
        (this.doc = t),
        (this.ngZone = i),
        (this.platformIsServer = r),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(n, t) {
      return t
        ? this.doc.createElementNS(ng[t] || t, n)
        : this.doc.createElement(n);
    }
    createComment(n) {
      return this.doc.createComment(n);
    }
    createText(n) {
      return this.doc.createTextNode(n);
    }
    appendChild(n, t) {
      (Yb(n) ? n.content : n).appendChild(t);
    }
    insertBefore(n, t, i) {
      n && (Yb(n) ? n.content : n).insertBefore(t, i);
    }
    removeChild(n, t) {
      t.remove();
    }
    selectRootElement(n, t) {
      let i = typeof n == "string" ? this.doc.querySelector(n) : n;
      if (!i) throw new pe(-5104, !1);
      return t || (i.textContent = ""), i;
    }
    parentNode(n) {
      return n.parentNode;
    }
    nextSibling(n) {
      return n.nextSibling;
    }
    setAttribute(n, t, i, r) {
      if (r) {
        t = r + ":" + t;
        let o = ng[r];
        o ? n.setAttributeNS(o, t, i) : n.setAttribute(t, i);
      } else n.setAttribute(t, i);
    }
    removeAttribute(n, t, i) {
      if (i) {
        let r = ng[i];
        r ? n.removeAttributeNS(r, t) : n.removeAttribute(`${i}:${t}`);
      } else n.removeAttribute(t);
    }
    addClass(n, t) {
      n.classList.add(t);
    }
    removeClass(n, t) {
      n.classList.remove(t);
    }
    setStyle(n, t, i, r) {
      r & (Bi.DashCase | Bi.Important)
        ? n.style.setProperty(t, i, r & Bi.Important ? "important" : "")
        : (n.style[t] = i);
    }
    removeStyle(n, t, i) {
      i & Bi.DashCase ? n.style.removeProperty(t) : (n.style[t] = "");
    }
    setProperty(n, t, i) {
      n != null && (n[t] = i);
    }
    setValue(n, t) {
      n.nodeValue = t;
    }
    listen(n, t, i) {
      if (
        typeof n == "string" &&
        ((n = Di().getGlobalEventTarget(this.doc, n)), !n)
      )
        throw new Error(`Unsupported event target ${n} for event ${t}`);
      return this.eventManager.addEventListener(
        n,
        t,
        this.decoratePreventDefault(i)
      );
    }
    decoratePreventDefault(n) {
      return (t) => {
        if (t === "__ngUnwrap__") return n;
        (this.platformIsServer ? this.ngZone.runGuarded(() => n(t)) : n(t)) ===
          !1 && t.preventDefault();
      };
    }
  };
function Yb(e) {
  return e.tagName === "TEMPLATE" && e.content !== void 0;
}
var ag = class extends Aa {
    constructor(n, t, i, r, o, s, a, l) {
      super(n, o, s, l),
        (this.sharedStylesHost = t),
        (this.hostEl = i),
        (this.shadowRoot = i.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = eC(r.id, r.styles);
      for (let u of c) {
        let d = document.createElement("style");
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
    insertBefore(n, t, i) {
      return super.insertBefore(this.nodeOrShadowRoot(n), t, i);
    }
    removeChild(n, t) {
      return super.removeChild(null, t);
    }
    parentNode(n) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Ra = class extends Aa {
    constructor(n, t, i, r, o, s, a, l) {
      super(n, o, s, a),
        (this.sharedStylesHost = t),
        (this.removeStylesOnCompDestroy = r),
        (this.styles = l ? eC(l, i.styles) : i.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  ed = class extends Ra {
    constructor(n, t, i, r, o, s, a, l) {
      let c = r + "-" + i.id;
      super(n, t, i, o, s, a, l, c),
        (this.contentAttr = eO(c)),
        (this.hostAttr = tO(c));
    }
    applyToHost(n) {
      this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
    }
    createElement(n, t) {
      let i = super.createElement(n, t);
      return super.setAttribute(i, this.contentAttr, ""), i;
    }
  },
  nO = (() => {
    class e extends Xu {
      constructor(t) {
        super(t);
      }
      supports(t) {
        return !0;
      }
      addEventListener(t, i, r) {
        return (
          t.addEventListener(i, r, !1), () => this.removeEventListener(t, i, r)
        );
      }
      removeEventListener(t, i, r) {
        return t.removeEventListener(i, r);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(ht));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Qb = ["alt", "control", "meta", "shift"],
  iO = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
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
  rO = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  oO = (() => {
    class e extends Xu {
      constructor(t) {
        super(t);
      }
      supports(t) {
        return e.parseEventName(t) != null;
      }
      addEventListener(t, i, r) {
        let o = e.parseEventName(i),
          s = e.eventCallback(o.fullKey, r, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => Di().onAndCancel(t, o.domEventName, s));
      }
      static parseEventName(t) {
        let i = t.toLowerCase().split("."),
          r = i.shift();
        if (i.length === 0 || !(r === "keydown" || r === "keyup")) return null;
        let o = e._normalizeKey(i.pop()),
          s = "",
          a = i.indexOf("code");
        if (
          (a > -1 && (i.splice(a, 1), (s = "code.")),
          Qb.forEach((c) => {
            let u = i.indexOf(c);
            u > -1 && (i.splice(u, 1), (s += c + "."));
          }),
          (s += o),
          i.length != 0 || o.length === 0)
        )
          return null;
        let l = {};
        return (l.domEventName = r), (l.fullKey = s), l;
      }
      static matchEventFullKeyCode(t, i) {
        let r = iO[t.key] || t.key,
          o = "";
        return (
          i.indexOf("code.") > -1 && ((r = t.code), (o = "code.")),
          r == null || !r
            ? !1
            : ((r = r.toLowerCase()),
              r === " " ? (r = "space") : r === "." && (r = "dot"),
              Qb.forEach((s) => {
                if (s !== r) {
                  let a = rO[s];
                  a(t) && (o += s + ".");
                }
              }),
              (o += r),
              o === i)
        );
      }
      static eventCallback(t, i, r) {
        return (o) => {
          e.matchEventFullKeyCode(o, t) && r.runGuarded(() => i(o));
        };
      }
      static _normalizeKey(t) {
        return t === "esc" ? "escape" : t;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(ht));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function sO() {
  rg.makeCurrent();
}
function aO() {
  return new ji();
}
function lO() {
  return zv(document), document;
}
var cO = [
    { provide: fn, useValue: qp },
    { provide: dp, useValue: sO, multi: !0 },
    { provide: ht, useFactory: lO, deps: [] },
  ],
  tC = Rp(hb, "browser", cO),
  uO = new z(""),
  dO = [
    { provide: Ea, useClass: og, deps: [] },
    { provide: Pp, useClass: Su, deps: [Re, xu, Ea] },
    { provide: Su, useClass: Su, deps: [Re, xu, Ea] },
  ],
  fO = [
    { provide: nu, useValue: "root" },
    { provide: ji, useFactory: aO, deps: [] },
    { provide: sg, useClass: nO, multi: !0, deps: [ht, Re, fn] },
    { provide: sg, useClass: oO, multi: !0, deps: [ht] },
    Zb,
    Jb,
    Kb,
    { provide: cs, useExisting: Zb },
    { provide: vs, useClass: Yx, deps: [] },
    [],
  ],
  nC = (() => {
    class e {
      constructor(t) {}
      static withServerTransition(t) {
        return { ngModule: e, providers: [{ provide: hu, useValue: t.appId }] };
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(uO, 12));
        };
      }
      static {
        this.ɵmod = et({ type: e });
      }
      static {
        this.ɵinj = Xe({ providers: [...fO, ...dO], imports: [Wu, pb] });
      }
    }
    return e;
  })();
var iC = (() => {
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
    static {
      this.ɵfac = function (i) {
        return new (i || e)(q(ht));
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var ke = "primary",
  Za = Symbol("RouteTitle"),
  hg = class {
    constructor(n) {
      this.params = n || {};
    }
    has(n) {
      return Object.prototype.hasOwnProperty.call(this.params, n);
    }
    get(n) {
      if (this.has(n)) {
        let t = this.params[n];
        return Array.isArray(t) ? t[0] : t;
      }
      return null;
    }
    getAll(n) {
      if (this.has(n)) {
        let t = this.params[n];
        return Array.isArray(t) ? t : [t];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Is(e) {
  return new hg(e);
}
function hO(e, n, t) {
  let i = t.path.split("/");
  if (
    i.length > e.length ||
    (t.pathMatch === "full" && (n.hasChildren() || i.length < e.length))
  )
    return null;
  let r = {};
  for (let o = 0; o < i.length; o++) {
    let s = i[o],
      a = e[o];
    if (s[0] === ":") r[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: e.slice(0, i.length), posParams: r };
}
function pO(e, n) {
  if (e.length !== n.length) return !1;
  for (let t = 0; t < e.length; ++t) if (!Ei(e[t], n[t])) return !1;
  return !0;
}
function Ei(e, n) {
  let t = e ? pg(e) : void 0,
    i = n ? pg(n) : void 0;
  if (!t || !i || t.length != i.length) return !1;
  let r;
  for (let o = 0; o < t.length; o++)
    if (((r = t[o]), !gC(e[r], n[r]))) return !1;
  return !0;
}
function pg(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function gC(e, n) {
  if (Array.isArray(e) && Array.isArray(n)) {
    if (e.length !== n.length) return !1;
    let t = [...e].sort(),
      i = [...n].sort();
    return t.every((r, o) => i[o] === r);
  } else return e === n;
}
function mC(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function Lr(e) {
  return mn(e) ? e : _o(e) ? it(Promise.resolve(e)) : J(e);
}
var gO = { exact: vC, subset: yC },
  _C = { exact: mO, subset: _O, ignored: () => !0 };
function oC(e, n, t) {
  return (
    gO[t.paths](e.root, n.root, t.matrixParams) &&
    _C[t.queryParams](e.queryParams, n.queryParams) &&
    !(t.fragment === "exact" && e.fragment !== n.fragment)
  );
}
function mO(e, n) {
  return Ei(e, n);
}
function vC(e, n, t) {
  if (
    !yo(e.segments, n.segments) ||
    !id(e.segments, n.segments, t) ||
    e.numberOfChildren !== n.numberOfChildren
  )
    return !1;
  for (let i in n.children)
    if (!e.children[i] || !vC(e.children[i], n.children[i], t)) return !1;
  return !0;
}
function _O(e, n) {
  return (
    Object.keys(n).length <= Object.keys(e).length &&
    Object.keys(n).every((t) => gC(e[t], n[t]))
  );
}
function yC(e, n, t) {
  return bC(e, n, n.segments, t);
}
function bC(e, n, t, i) {
  if (e.segments.length > t.length) {
    let r = e.segments.slice(0, t.length);
    return !(!yo(r, t) || n.hasChildren() || !id(r, t, i));
  } else if (e.segments.length === t.length) {
    if (!yo(e.segments, t) || !id(e.segments, t, i)) return !1;
    for (let r in n.children)
      if (!e.children[r] || !yC(e.children[r], n.children[r], i)) return !1;
    return !0;
  } else {
    let r = t.slice(0, e.segments.length),
      o = t.slice(e.segments.length);
    return !yo(e.segments, r) || !id(e.segments, r, i) || !e.children[ke]
      ? !1
      : bC(e.children[ke], n, o, i);
  }
}
function id(e, n, t) {
  return n.every((i, r) => _C[t](e[r].parameters, i.parameters));
}
var er = class {
    constructor(n = new Ke([], {}), t = {}, i = null) {
      (this.root = n), (this.queryParams = t), (this.fragment = i);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Is(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return bO.serialize(this);
    }
  },
  Ke = class {
    constructor(n, t) {
      (this.segments = n),
        (this.children = t),
        (this.parent = null),
        Object.values(t).forEach((i) => (i.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return rd(this);
    }
  },
  vo = class {
    constructor(n, t) {
      (this.path = n), (this.parameters = t);
    }
    get parameterMap() {
      return (this._parameterMap ??= Is(this.parameters)), this._parameterMap;
    }
    toString() {
      return wC(this);
    }
  };
function vO(e, n) {
  return yo(e, n) && e.every((t, i) => Ei(t.parameters, n[i].parameters));
}
function yo(e, n) {
  return e.length !== n.length ? !1 : e.every((t, i) => t.path === n[i].path);
}
function yO(e, n) {
  let t = [];
  return (
    Object.entries(e.children).forEach(([i, r]) => {
      i === ke && (t = t.concat(n(r, i)));
    }),
    Object.entries(e.children).forEach(([i, r]) => {
      i !== ke && (t = t.concat(n(r, i)));
    }),
    t
  );
}
var Ya = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({
          token: e,
          factory: () => new Ts(),
          providedIn: "root",
        });
      }
    }
    return e;
  })(),
  Ts = class {
    parse(n) {
      let t = new mg(n);
      return new er(
        t.parseRootSegment(),
        t.parseQueryParams(),
        t.parseFragment()
      );
    }
    serialize(n) {
      let t = `/${ka(n.root, !0)}`,
        i = DO(n.queryParams),
        r = typeof n.fragment == "string" ? `#${CO(n.fragment)}` : "";
      return `${t}${i}${r}`;
    }
  },
  bO = new Ts();
function rd(e) {
  return e.segments.map((n) => wC(n)).join("/");
}
function ka(e, n) {
  if (!e.hasChildren()) return rd(e);
  if (n) {
    let t = e.children[ke] ? ka(e.children[ke], !1) : "",
      i = [];
    return (
      Object.entries(e.children).forEach(([r, o]) => {
        r !== ke && i.push(`${r}:${ka(o, !1)}`);
      }),
      i.length > 0 ? `${t}(${i.join("//")})` : t
    );
  } else {
    let t = yO(e, (i, r) =>
      r === ke ? [ka(e.children[ke], !1)] : [`${r}:${ka(i, !1)}`]
    );
    return Object.keys(e.children).length === 1 && e.children[ke] != null
      ? `${rd(e)}/${t[0]}`
      : `${rd(e)}/(${t.join("//")})`;
  }
}
function CC(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function td(e) {
  return CC(e).replace(/%3B/gi, ";");
}
function CO(e) {
  return encodeURI(e);
}
function gg(e) {
  return CC(e)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function od(e) {
  return decodeURIComponent(e);
}
function sC(e) {
  return od(e.replace(/\+/g, "%20"));
}
function wC(e) {
  return `${gg(e.path)}${wO(e.parameters)}`;
}
function wO(e) {
  return Object.entries(e)
    .map(([n, t]) => `;${gg(n)}=${gg(t)}`)
    .join("");
}
function DO(e) {
  let n = Object.entries(e)
    .map(([t, i]) =>
      Array.isArray(i)
        ? i.map((r) => `${td(t)}=${td(r)}`).join("&")
        : `${td(t)}=${td(i)}`
    )
    .filter((t) => t);
  return n.length ? `?${n.join("&")}` : "";
}
var EO = /^[^\/()?;#]+/;
function cg(e) {
  let n = e.match(EO);
  return n ? n[0] : "";
}
var MO = /^[^\/()?;=#]+/;
function IO(e) {
  let n = e.match(MO);
  return n ? n[0] : "";
}
var TO = /^[^=?&#]+/;
function SO(e) {
  let n = e.match(TO);
  return n ? n[0] : "";
}
var xO = /^[^&#]+/;
function OO(e) {
  let n = e.match(xO);
  return n ? n[0] : "";
}
var mg = class {
  constructor(n) {
    (this.url = n), (this.remaining = n);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new Ke([], {})
        : new Ke([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let n = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(n);
      while (this.consumeOptional("&"));
    return n;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let n = [];
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
    let i = {};
    return (
      this.peekStartsWith("(") && (i = this.parseParens(!1)),
      (n.length > 0 || Object.keys(t).length > 0) && (i[ke] = new Ke(n, t)),
      i
    );
  }
  parseSegment() {
    let n = cg(this.remaining);
    if (n === "" && this.peekStartsWith(";")) throw new pe(4009, !1);
    return this.capture(n), new vo(od(n), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let n = {};
    for (; this.consumeOptional(";"); ) this.parseParam(n);
    return n;
  }
  parseParam(n) {
    let t = IO(this.remaining);
    if (!t) return;
    this.capture(t);
    let i = "";
    if (this.consumeOptional("=")) {
      let r = cg(this.remaining);
      r && ((i = r), this.capture(i));
    }
    n[od(t)] = od(i);
  }
  parseQueryParam(n) {
    let t = SO(this.remaining);
    if (!t) return;
    this.capture(t);
    let i = "";
    if (this.consumeOptional("=")) {
      let s = OO(this.remaining);
      s && ((i = s), this.capture(i));
    }
    let r = sC(t),
      o = sC(i);
    if (n.hasOwnProperty(r)) {
      let s = n[r];
      Array.isArray(s) || ((s = [s]), (n[r] = s)), s.push(o);
    } else n[r] = o;
  }
  parseParens(n) {
    let t = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let i = cg(this.remaining),
        r = this.remaining[i.length];
      if (r !== "/" && r !== ")" && r !== ";") throw new pe(4010, !1);
      let o;
      i.indexOf(":") > -1
        ? ((o = i.slice(0, i.indexOf(":"))), this.capture(o), this.capture(":"))
        : n && (o = ke);
      let s = this.parseChildren();
      (t[o] = Object.keys(s).length === 1 ? s[ke] : new Ke([], s)),
        this.consumeOptional("//");
    }
    return t;
  }
  peekStartsWith(n) {
    return this.remaining.startsWith(n);
  }
  consumeOptional(n) {
    return this.peekStartsWith(n)
      ? ((this.remaining = this.remaining.substring(n.length)), !0)
      : !1;
  }
  capture(n) {
    if (!this.consumeOptional(n)) throw new pe(4011, !1);
  }
};
function DC(e) {
  return e.segments.length > 0 ? new Ke([], { [ke]: e }) : e;
}
function EC(e) {
  let n = {};
  for (let [i, r] of Object.entries(e.children)) {
    let o = EC(r);
    if (i === ke && o.segments.length === 0 && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) n[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (n[i] = o);
  }
  let t = new Ke(e.segments, n);
  return NO(t);
}
function NO(e) {
  if (e.numberOfChildren === 1 && e.children[ke]) {
    let n = e.children[ke];
    return new Ke(e.segments.concat(n.segments), n.children);
  }
  return e;
}
function bo(e) {
  return e instanceof er;
}
function PO(e, n, t = null, i = null) {
  let r = MC(e);
  return IC(r, n, t, i);
}
function MC(e) {
  let n;
  function t(o) {
    let s = {};
    for (let l of o.children) {
      let c = t(l);
      s[l.outlet] = c;
    }
    let a = new Ke(o.url, s);
    return o === e && (n = a), a;
  }
  let i = t(e.root),
    r = DC(i);
  return n ?? r;
}
function IC(e, n, t, i) {
  let r = e;
  for (; r.parent; ) r = r.parent;
  if (n.length === 0) return ug(r, r, r, t, i);
  let o = AO(n);
  if (o.toRoot()) return ug(r, r, new Ke([], {}), t, i);
  let s = RO(o, r, e),
    a = s.processChildren
      ? Va(s.segmentGroup, s.index, o.commands)
      : SC(s.segmentGroup, s.index, o.commands);
  return ug(r, s.segmentGroup, a, t, i);
}
function sd(e) {
  return typeof e == "object" && e != null && !e.outlets && !e.segmentPath;
}
function Ha(e) {
  return typeof e == "object" && e != null && e.outlets;
}
function ug(e, n, t, i, r) {
  let o = {};
  i &&
    Object.entries(i).forEach(([l, c]) => {
      o[l] = Array.isArray(c) ? c.map((u) => `${u}`) : `${c}`;
    });
  let s;
  e === n ? (s = t) : (s = TC(e, n, t));
  let a = DC(EC(s));
  return new er(a, o, r);
}
function TC(e, n, t) {
  let i = {};
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      o === n ? (i[r] = t) : (i[r] = TC(o, n, t));
    }),
    new Ke(e.segments, i)
  );
}
var ad = class {
  constructor(n, t, i) {
    if (
      ((this.isAbsolute = n),
      (this.numberOfDoubleDots = t),
      (this.commands = i),
      n && i.length > 0 && sd(i[0]))
    )
      throw new pe(4003, !1);
    let r = i.find(Ha);
    if (r && r !== mC(i)) throw new pe(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function AO(e) {
  if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new ad(!0, 0, e);
  let n = 0,
    t = !1,
    i = e.reduce((r, o, s) => {
      if (typeof o == "object" && o != null) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([l, c]) => {
              a[l] = typeof c == "string" ? c.split("/") : c;
            }),
            [...r, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...r, o.segmentPath];
      }
      return typeof o != "string"
        ? [...r, o]
        : s === 0
        ? (o.split("/").forEach((a, l) => {
            (l == 0 && a === ".") ||
              (l == 0 && a === ""
                ? (t = !0)
                : a === ".."
                ? n++
                : a != "" && r.push(a));
          }),
          r)
        : [...r, o];
    }, []);
  return new ad(t, n, i);
}
var Ds = class {
  constructor(n, t, i) {
    (this.segmentGroup = n), (this.processChildren = t), (this.index = i);
  }
};
function RO(e, n, t) {
  if (e.isAbsolute) return new Ds(n, !0, 0);
  if (!t) return new Ds(n, !1, NaN);
  if (t.parent === null) return new Ds(t, !0, 0);
  let i = sd(e.commands[0]) ? 0 : 1,
    r = t.segments.length - 1 + i;
  return kO(t, r, e.numberOfDoubleDots);
}
function kO(e, n, t) {
  let i = e,
    r = n,
    o = t;
  for (; o > r; ) {
    if (((o -= r), (i = i.parent), !i)) throw new pe(4005, !1);
    r = i.segments.length;
  }
  return new Ds(i, !1, r - o);
}
function FO(e) {
  return Ha(e[0]) ? e[0].outlets : { [ke]: e };
}
function SC(e, n, t) {
  if (((e ??= new Ke([], {})), e.segments.length === 0 && e.hasChildren()))
    return Va(e, n, t);
  let i = LO(e, n, t),
    r = t.slice(i.commandIndex);
  if (i.match && i.pathIndex < e.segments.length) {
    let o = new Ke(e.segments.slice(0, i.pathIndex), {});
    return (
      (o.children[ke] = new Ke(e.segments.slice(i.pathIndex), e.children)),
      Va(o, 0, r)
    );
  } else
    return i.match && r.length === 0
      ? new Ke(e.segments, {})
      : i.match && !e.hasChildren()
      ? _g(e, n, t)
      : i.match
      ? Va(e, 0, r)
      : _g(e, n, t);
}
function Va(e, n, t) {
  if (t.length === 0) return new Ke(e.segments, {});
  {
    let i = FO(t),
      r = {};
    if (
      Object.keys(i).some((o) => o !== ke) &&
      e.children[ke] &&
      e.numberOfChildren === 1 &&
      e.children[ke].segments.length === 0
    ) {
      let o = Va(e.children[ke], n, t);
      return new Ke(e.segments, o.children);
    }
    return (
      Object.entries(i).forEach(([o, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (r[o] = SC(e.children[o], n, s));
      }),
      Object.entries(e.children).forEach(([o, s]) => {
        i[o] === void 0 && (r[o] = s);
      }),
      new Ke(e.segments, r)
    );
  }
}
function LO(e, n, t) {
  let i = 0,
    r = n,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; r < e.segments.length; ) {
    if (i >= t.length) return o;
    let s = e.segments[r],
      a = t[i];
    if (Ha(a)) break;
    let l = `${a}`,
      c = i < t.length - 1 ? t[i + 1] : null;
    if (r > 0 && l === void 0) break;
    if (l && c && typeof c == "object" && c.outlets === void 0) {
      if (!lC(l, c, s)) return o;
      i += 2;
    } else {
      if (!lC(l, {}, s)) return o;
      i++;
    }
    r++;
  }
  return { match: !0, pathIndex: r, commandIndex: i };
}
function _g(e, n, t) {
  let i = e.segments.slice(0, n),
    r = 0;
  for (; r < t.length; ) {
    let o = t[r];
    if (Ha(o)) {
      let l = VO(o.outlets);
      return new Ke(i, l);
    }
    if (r === 0 && sd(t[0])) {
      let l = e.segments[n];
      i.push(new vo(l.path, aC(t[0]))), r++;
      continue;
    }
    let s = Ha(o) ? o.outlets[ke] : `${o}`,
      a = r < t.length - 1 ? t[r + 1] : null;
    s && a && sd(a)
      ? (i.push(new vo(s, aC(a))), (r += 2))
      : (i.push(new vo(s, {})), r++);
  }
  return new Ke(i, {});
}
function VO(e) {
  let n = {};
  return (
    Object.entries(e).forEach(([t, i]) => {
      typeof i == "string" && (i = [i]),
        i !== null && (n[t] = _g(new Ke([], {}), 0, i));
    }),
    n
  );
}
function aC(e) {
  let n = {};
  return Object.entries(e).forEach(([t, i]) => (n[t] = `${i}`)), n;
}
function lC(e, n, t) {
  return e == t.path && Ei(n, t.parameters);
}
var ja = "imperative",
  Ht = (function (e) {
    return (
      (e[(e.NavigationStart = 0)] = "NavigationStart"),
      (e[(e.NavigationEnd = 1)] = "NavigationEnd"),
      (e[(e.NavigationCancel = 2)] = "NavigationCancel"),
      (e[(e.NavigationError = 3)] = "NavigationError"),
      (e[(e.RoutesRecognized = 4)] = "RoutesRecognized"),
      (e[(e.ResolveStart = 5)] = "ResolveStart"),
      (e[(e.ResolveEnd = 6)] = "ResolveEnd"),
      (e[(e.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (e[(e.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (e[(e.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (e[(e.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (e[(e.ChildActivationStart = 11)] = "ChildActivationStart"),
      (e[(e.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (e[(e.ActivationStart = 13)] = "ActivationStart"),
      (e[(e.ActivationEnd = 14)] = "ActivationEnd"),
      (e[(e.Scroll = 15)] = "Scroll"),
      (e[(e.NavigationSkipped = 16)] = "NavigationSkipped"),
      e
    );
  })(Ht || {}),
  Fn = class {
    constructor(n, t) {
      (this.id = n), (this.url = t);
    }
  },
  Ss = class extends Fn {
    constructor(n, t, i = "imperative", r = null) {
      super(n, t),
        (this.type = Ht.NavigationStart),
        (this.navigationTrigger = i),
        (this.restoredState = r);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Mi = class extends Fn {
    constructor(n, t, i) {
      super(n, t), (this.urlAfterRedirects = i), (this.type = Ht.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Mn = (function (e) {
    return (
      (e[(e.Redirect = 0)] = "Redirect"),
      (e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (e[(e.GuardRejected = 3)] = "GuardRejected"),
      e
    );
  })(Mn || {}),
  ld = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      e
    );
  })(ld || {}),
  Xi = class extends Fn {
    constructor(n, t, i, r) {
      super(n, t),
        (this.reason = i),
        (this.code = r),
        (this.type = Ht.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Fr = class extends Fn {
    constructor(n, t, i, r) {
      super(n, t),
        (this.reason = i),
        (this.code = r),
        (this.type = Ht.NavigationSkipped);
    }
  },
  Ua = class extends Fn {
    constructor(n, t, i, r) {
      super(n, t),
        (this.error = i),
        (this.target = r),
        (this.type = Ht.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  cd = class extends Fn {
    constructor(n, t, i, r) {
      super(n, t),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = Ht.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  vg = class extends Fn {
    constructor(n, t, i, r) {
      super(n, t),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = Ht.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  yg = class extends Fn {
    constructor(n, t, i, r, o) {
      super(n, t),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.shouldActivate = o),
        (this.type = Ht.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  bg = class extends Fn {
    constructor(n, t, i, r) {
      super(n, t),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = Ht.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Cg = class extends Fn {
    constructor(n, t, i, r) {
      super(n, t),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = Ht.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  wg = class {
    constructor(n) {
      (this.route = n), (this.type = Ht.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Dg = class {
    constructor(n) {
      (this.route = n), (this.type = Ht.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Eg = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ht.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Mg = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ht.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Ig = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ht.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Tg = class {
    constructor(n) {
      (this.snapshot = n), (this.type = Ht.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  ud = class {
    constructor(n, t, i) {
      (this.routerEvent = n),
        (this.position = t),
        (this.anchor = i),
        (this.type = Ht.Scroll);
    }
    toString() {
      let n = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${n}')`;
    }
  },
  $a = class {},
  xs = class {
    constructor(n, t) {
      (this.url = n), (this.navigationBehaviorOptions = t);
    }
  };
function jO(e, n) {
  return (
    e.providers &&
      !e._injector &&
      (e._injector = Cu(e.providers, n, `Route: ${e.path}`)),
    e._injector ?? n
  );
}
function si(e) {
  return e.outlet || ke;
}
function BO(e, n) {
  let t = e.filter((i) => si(i) === n);
  return t.push(...e.filter((i) => si(i) !== n)), t;
}
function Qa(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let n = e.parent; n; n = n.parent) {
    let t = n.routeConfig;
    if (t?._loadedInjector) return t._loadedInjector;
    if (t?._injector) return t._injector;
  }
  return null;
}
var Sg = class {
    get injector() {
      return Qa(this.route?.snapshot) ?? this.rootInjector;
    }
    set injector(n) {}
    constructor(n) {
      (this.rootInjector = n),
        (this.outlet = null),
        (this.route = null),
        (this.children = new Ka(this.rootInjector)),
        (this.attachRef = null);
    }
  },
  Ka = (() => {
    class e {
      constructor(t) {
        (this.rootInjector = t), (this.contexts = new Map());
      }
      onChildOutletCreated(t, i) {
        let r = this.getOrCreateContext(t);
        (r.outlet = i), this.contexts.set(t, r);
      }
      onChildOutletDestroyed(t) {
        let i = this.getContext(t);
        i && ((i.outlet = null), (i.attachRef = null));
      }
      onOutletDeactivated() {
        let t = this.contexts;
        return (this.contexts = new Map()), t;
      }
      onOutletReAttached(t) {
        this.contexts = t;
      }
      getOrCreateContext(t) {
        let i = this.getContext(t);
        return (
          i || ((i = new Sg(this.rootInjector)), this.contexts.set(t, i)), i
        );
      }
      getContext(t) {
        return this.contexts.get(t) || null;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(Qt));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  dd = class {
    constructor(n) {
      this._root = n;
    }
    get root() {
      return this._root.value;
    }
    parent(n) {
      let t = this.pathFromRoot(n);
      return t.length > 1 ? t[t.length - 2] : null;
    }
    children(n) {
      let t = xg(n, this._root);
      return t ? t.children.map((i) => i.value) : [];
    }
    firstChild(n) {
      let t = xg(n, this._root);
      return t && t.children.length > 0 ? t.children[0].value : null;
    }
    siblings(n) {
      let t = Og(n, this._root);
      return t.length < 2
        ? []
        : t[t.length - 2].children.map((r) => r.value).filter((r) => r !== n);
    }
    pathFromRoot(n) {
      return Og(n, this._root).map((t) => t.value);
    }
  };
function xg(e, n) {
  if (e === n.value) return n;
  for (let t of n.children) {
    let i = xg(e, t);
    if (i) return i;
  }
  return null;
}
function Og(e, n) {
  if (e === n.value) return [n];
  for (let t of n.children) {
    let i = Og(e, t);
    if (i.length) return i.unshift(n), i;
  }
  return [];
}
var En = class {
  constructor(n, t) {
    (this.value = n), (this.children = t);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function ws(e) {
  let n = {};
  return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n;
}
var fd = class extends dd {
  constructor(n, t) {
    super(n), (this.snapshot = t), jg(this, n);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function xC(e) {
  let n = HO(e),
    t = new Mt([new vo("", {})]),
    i = new Mt({}),
    r = new Mt({}),
    o = new Mt({}),
    s = new Mt(""),
    a = new Co(t, i, o, s, r, ke, e, n.root);
  return (a.snapshot = n.root), new fd(new En(a, []), n);
}
function HO(e) {
  let n = {},
    t = {},
    i = {},
    r = "",
    o = new Es([], n, i, r, t, ke, e, null, {});
  return new pd("", new En(o, []));
}
var Co = class {
  constructor(n, t, i, r, o, s, a, l) {
    (this.urlSubject = n),
      (this.paramsSubject = t),
      (this.queryParamsSubject = i),
      (this.fragmentSubject = r),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = l),
      (this.title = this.dataSubject?.pipe(Ce((c) => c[Za])) ?? J(void 0)),
      (this.url = n),
      (this.params = t),
      (this.queryParams = i),
      (this.fragment = r),
      (this.data = o);
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
      (this._paramMap ??= this.params.pipe(Ce((n) => Is(n)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(Ce((n) => Is(n)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function hd(e, n, t = "emptyOnly") {
  let i,
    { routeConfig: r } = e;
  return (
    n !== null &&
    (t === "always" ||
      r?.path === "" ||
      (!n.component && !n.routeConfig?.loadComponent))
      ? (i = {
          params: j(j({}, n.params), e.params),
          data: j(j({}, n.data), e.data),
          resolve: j(j(j(j({}, e.data), n.data), r?.data), e._resolvedData),
        })
      : (i = {
          params: j({}, e.params),
          data: j({}, e.data),
          resolve: j(j({}, e.data), e._resolvedData ?? {}),
        }),
    r && NC(r) && (i.resolve[Za] = r.title),
    i
  );
}
var Es = class {
    get title() {
      return this.data?.[Za];
    }
    constructor(n, t, i, r, o, s, a, l, c) {
      (this.url = n),
        (this.params = t),
        (this.queryParams = i),
        (this.fragment = r),
        (this.data = o),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = l),
        (this._resolve = c);
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
      return (this._paramMap ??= Is(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Is(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let n = this.url.map((i) => i.toString()).join("/"),
        t = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${n}', path:'${t}')`;
    }
  },
  pd = class extends dd {
    constructor(n, t) {
      super(t), (this.url = n), jg(this, t);
    }
    toString() {
      return OC(this._root);
    }
  };
function jg(e, n) {
  (n.value._routerState = e), n.children.forEach((t) => jg(e, t));
}
function OC(e) {
  let n = e.children.length > 0 ? ` { ${e.children.map(OC).join(", ")} } ` : "";
  return `${e.value}${n}`;
}
function dg(e) {
  if (e.snapshot) {
    let n = e.snapshot,
      t = e._futureSnapshot;
    (e.snapshot = t),
      Ei(n.queryParams, t.queryParams) ||
        e.queryParamsSubject.next(t.queryParams),
      n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment),
      Ei(n.params, t.params) || e.paramsSubject.next(t.params),
      pO(n.url, t.url) || e.urlSubject.next(t.url),
      Ei(n.data, t.data) || e.dataSubject.next(t.data);
  } else
    (e.snapshot = e._futureSnapshot),
      e.dataSubject.next(e._futureSnapshot.data);
}
function Ng(e, n) {
  let t = Ei(e.params, n.params) && vO(e.url, n.url),
    i = !e.parent != !n.parent;
  return t && !i && (!e.parent || Ng(e.parent, n.parent));
}
function NC(e) {
  return typeof e.title == "string" || e.title === null;
}
var UO = (() => {
    class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = ke),
          (this.activateEvents = new Ne()),
          (this.deactivateEvents = new Ne()),
          (this.attachEvents = new Ne()),
          (this.detachEvents = new Ne()),
          (this.parentContexts = O(Ka)),
          (this.location = O(bn)),
          (this.changeDetector = O(jt)),
          (this.inputBinder = O(yd, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(t) {
        if (t.name) {
          let { firstChange: i, previousValue: r } = t.name;
          if (i) return;
          this.isTrackedInParentContexts(r) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(r)),
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
        let t = this.parentContexts.getContext(this.name);
        t?.route &&
          (t.attachRef
            ? this.attach(t.attachRef, t.route)
            : this.activateWith(t.route, t.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new pe(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new pe(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new pe(4012, !1);
        this.location.detach();
        let t = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(t.instance),
          t
        );
      }
      attach(t, i) {
        (this.activated = t),
          (this._activatedRoute = i),
          this.location.insert(t.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(t.instance);
      }
      deactivate() {
        if (this.activated) {
          let t = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(t);
        }
      }
      activateWith(t, i) {
        if (this.isActivated) throw new pe(4013, !1);
        this._activatedRoute = t;
        let r = this.location,
          s = t.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          l = new Pg(t, a, r.injector);
        (this.activated = r.createComponent(s, {
          index: r.length,
          injector: l,
          environmentInjector: i,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵdir = dt({
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
          features: [Vt],
        });
      }
    }
    return e;
  })(),
  Pg = class e {
    __ngOutletInjector(n) {
      return new e(this.route, this.childContexts, n);
    }
    constructor(n, t, i) {
      (this.route = n), (this.childContexts = t), (this.parent = i);
    }
    get(n, t) {
      return n === Co
        ? this.route
        : n === Ka
        ? this.childContexts
        : this.parent.get(n, t);
    }
  },
  yd = new z(""),
  cC = (() => {
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
        let { activatedRoute: i } = t,
          r = qo([i.queryParams, i.params, i.data])
            .pipe(
              ut(
                ([o, s, a], l) => (
                  (a = j(j(j({}, o), s), a)),
                  l === 0 ? J(a) : Promise.resolve(a)
                )
              )
            )
            .subscribe((o) => {
              if (
                !t.isActivated ||
                !t.activatedComponentRef ||
                t.activatedRoute !== i ||
                i.component === null
              ) {
                this.unsubscribeFromRouteData(t);
                return;
              }
              let s = gb(i.component);
              if (!s) {
                this.unsubscribeFromRouteData(t);
                return;
              }
              for (let { templateName: a } of s.inputs)
                t.activatedComponentRef.setInput(a, o[a]);
            });
        this.outletDataSubscriptions.set(t, r);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function $O(e, n, t) {
  let i = za(e, n._root, t ? t._root : void 0);
  return new fd(i, n);
}
function za(e, n, t) {
  if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
    let i = t.value;
    i._futureSnapshot = n.value;
    let r = zO(e, n, t);
    return new En(i, r);
  } else {
    if (e.shouldAttach(n.value)) {
      let o = e.retrieve(n.value);
      if (o !== null) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = n.value),
          (s.children = n.children.map((a) => za(e, a))),
          s
        );
      }
    }
    let i = GO(n.value),
      r = n.children.map((o) => za(e, o));
    return new En(i, r);
  }
}
function zO(e, n, t) {
  return n.children.map((i) => {
    for (let r of t.children)
      if (e.shouldReuseRoute(i.value, r.value.snapshot)) return za(e, i, r);
    return za(e, i);
  });
}
function GO(e) {
  return new Co(
    new Mt(e.url),
    new Mt(e.params),
    new Mt(e.queryParams),
    new Mt(e.fragment),
    new Mt(e.data),
    e.outlet,
    e.component,
    e
  );
}
var Ga = class {
    constructor(n, t) {
      (this.redirectTo = n), (this.navigationBehaviorOptions = t);
    }
  },
  PC = "ngNavigationCancelingError";
function gd(e, n) {
  let { redirectTo: t, navigationBehaviorOptions: i } = bo(n)
      ? { redirectTo: n, navigationBehaviorOptions: void 0 }
      : n,
    r = AC(!1, Mn.Redirect);
  return (r.url = t), (r.navigationBehaviorOptions = i), r;
}
function AC(e, n) {
  let t = new Error(`NavigationCancelingError: ${e || ""}`);
  return (t[PC] = !0), (t.cancellationCode = n), t;
}
function WO(e) {
  return RC(e) && bo(e.url);
}
function RC(e) {
  return !!e && e[PC];
}
var qO = (e, n, t, i) =>
    Ce(
      (r) => (
        new Ag(n, r.targetRouterState, r.currentRouterState, t, i).activate(e),
        r
      )
    ),
  Ag = class {
    constructor(n, t, i, r, o) {
      (this.routeReuseStrategy = n),
        (this.futureState = t),
        (this.currState = i),
        (this.forwardEvent = r),
        (this.inputBindingEnabled = o);
    }
    activate(n) {
      let t = this.futureState._root,
        i = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(t, i, n),
        dg(this.futureState.root),
        this.activateChildRoutes(t, i, n);
    }
    deactivateChildRoutes(n, t, i) {
      let r = ws(t);
      n.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, r[s], i), delete r[s];
      }),
        Object.values(r).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, i);
        });
    }
    deactivateRoutes(n, t, i) {
      let r = n.value,
        o = t ? t.value : null;
      if (r === o)
        if (r.component) {
          let s = i.getContext(r.outlet);
          s && this.deactivateChildRoutes(n, t, s.children);
        } else this.deactivateChildRoutes(n, t, i);
      else o && this.deactivateRouteAndItsChildren(t, i);
    }
    deactivateRouteAndItsChildren(n, t) {
      n.value.component &&
      this.routeReuseStrategy.shouldDetach(n.value.snapshot)
        ? this.detachAndStoreRouteSubtree(n, t)
        : this.deactivateRouteAndOutlet(n, t);
    }
    detachAndStoreRouteSubtree(n, t) {
      let i = t.getContext(n.value.outlet),
        r = i && n.value.component ? i.children : t,
        o = ws(n);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, r);
      if (i && i.outlet) {
        let s = i.outlet.detach(),
          a = i.children.onOutletDeactivated();
        this.routeReuseStrategy.store(n.value.snapshot, {
          componentRef: s,
          route: n,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(n, t) {
      let i = t.getContext(n.value.outlet),
        r = i && n.value.component ? i.children : t,
        o = ws(n);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, r);
      i &&
        (i.outlet && (i.outlet.deactivate(), i.children.onOutletDeactivated()),
        (i.attachRef = null),
        (i.route = null));
    }
    activateChildRoutes(n, t, i) {
      let r = ws(t);
      n.children.forEach((o) => {
        this.activateRoutes(o, r[o.value.outlet], i),
          this.forwardEvent(new Tg(o.value.snapshot));
      }),
        n.children.length && this.forwardEvent(new Mg(n.value.snapshot));
    }
    activateRoutes(n, t, i) {
      let r = n.value,
        o = t ? t.value : null;
      if ((dg(r), r === o))
        if (r.component) {
          let s = i.getOrCreateContext(r.outlet);
          this.activateChildRoutes(n, t, s.children);
        } else this.activateChildRoutes(n, t, i);
      else if (r.component) {
        let s = i.getOrCreateContext(r.outlet);
        if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(r.snapshot);
          this.routeReuseStrategy.store(r.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            dg(a.route.value),
            this.activateChildRoutes(n, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = r),
            s.outlet && s.outlet.activateWith(r, s.injector),
            this.activateChildRoutes(n, null, s.children);
      } else this.activateChildRoutes(n, null, i);
    }
  },
  md = class {
    constructor(n) {
      (this.path = n), (this.route = this.path[this.path.length - 1]);
    }
  },
  Ms = class {
    constructor(n, t) {
      (this.component = n), (this.route = t);
    }
  };
function ZO(e, n, t) {
  let i = e._root,
    r = n ? n._root : null;
  return Fa(i, r, t, [i.value]);
}
function YO(e) {
  let n = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !n || n.length === 0 ? null : { node: e, guards: n };
}
function Ns(e, n) {
  let t = Symbol(),
    i = n.get(e, t);
  return i === t ? (typeof e == "function" && !O0(e) ? e : n.get(e)) : i;
}
function Fa(
  e,
  n,
  t,
  i,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = ws(n);
  return (
    e.children.forEach((s) => {
      QO(s, o[s.value.outlet], t, i.concat([s.value]), r),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => Ba(a, t.getContext(s), r)),
    r
  );
}
function QO(
  e,
  n,
  t,
  i,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = e.value,
    s = n ? n.value : null,
    a = t ? t.getContext(e.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let l = KO(s, o, o.routeConfig.runGuardsAndResolvers);
    l
      ? r.canActivateChecks.push(new md(i))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? Fa(e, n, a ? a.children : null, i, r) : Fa(e, n, t, i, r),
      l &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        r.canDeactivateChecks.push(new Ms(a.outlet.component, s));
  } else
    s && Ba(n, a, r),
      r.canActivateChecks.push(new md(i)),
      o.component
        ? Fa(e, null, a ? a.children : null, i, r)
        : Fa(e, null, t, i, r);
  return r;
}
function KO(e, n, t) {
  if (typeof t == "function") return t(e, n);
  switch (t) {
    case "pathParamsChange":
      return !yo(e.url, n.url);
    case "pathParamsOrQueryParamsChange":
      return !yo(e.url, n.url) || !Ei(e.queryParams, n.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !Ng(e, n) || !Ei(e.queryParams, n.queryParams);
    case "paramsChange":
    default:
      return !Ng(e, n);
  }
}
function Ba(e, n, t) {
  let i = ws(e),
    r = e.value;
  Object.entries(i).forEach(([o, s]) => {
    r.component
      ? n
        ? Ba(s, n.children.getContext(o), t)
        : Ba(s, null, t)
      : Ba(s, n, t);
  }),
    r.component
      ? n && n.outlet && n.outlet.isActivated
        ? t.canDeactivateChecks.push(new Ms(n.outlet.component, r))
        : t.canDeactivateChecks.push(new Ms(null, r))
      : t.canDeactivateChecks.push(new Ms(null, r));
}
function Ja(e) {
  return typeof e == "function";
}
function JO(e) {
  return typeof e == "boolean";
}
function XO(e) {
  return e && Ja(e.canLoad);
}
function eN(e) {
  return e && Ja(e.canActivate);
}
function tN(e) {
  return e && Ja(e.canActivateChild);
}
function nN(e) {
  return e && Ja(e.canDeactivate);
}
function iN(e) {
  return e && Ja(e.canMatch);
}
function kC(e) {
  return e instanceof ki || e?.name === "EmptyError";
}
var nd = Symbol("INITIAL_VALUE");
function Os() {
  return ut((e) =>
    qo(e.map((n) => n.pipe(Lt(1), Jr(nd)))).pipe(
      Ce((n) => {
        for (let t of n)
          if (t !== !0) {
            if (t === nd) return nd;
            if (t === !1 || rN(t)) return t;
          }
        return !0;
      }),
      It((n) => n !== nd),
      Lt(1)
    )
  );
}
function rN(e) {
  return bo(e) || e instanceof Ga;
}
function oN(e, n) {
  return at((t) => {
    let {
      targetSnapshot: i,
      currentSnapshot: r,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = t;
    return s.length === 0 && o.length === 0
      ? J(Pe(j({}, t), { guardsResult: !0 }))
      : sN(s, i, r, e).pipe(
          at((a) => (a && JO(a) ? aN(i, o, e, n) : J(a))),
          Ce((a) => Pe(j({}, t), { guardsResult: a }))
        );
  });
}
function sN(e, n, t, i) {
  return it(e).pipe(
    at((r) => fN(r.component, r.route, t, n, i)),
    fi((r) => r !== !0, !0)
  );
}
function aN(e, n, t, i) {
  return it(n).pipe(
    Wn((r) =>
      _n(
        cN(r.route.parent, i),
        lN(r.route, i),
        dN(e, r.path, t),
        uN(e, r.route, t)
      )
    ),
    fi((r) => r !== !0, !0)
  );
}
function lN(e, n) {
  return e !== null && n && n(new Ig(e)), J(!0);
}
function cN(e, n) {
  return e !== null && n && n(new Eg(e)), J(!0);
}
function uN(e, n, t) {
  let i = n.routeConfig ? n.routeConfig.canActivate : null;
  if (!i || i.length === 0) return J(!0);
  let r = i.map((o) =>
    Kr(() => {
      let s = Qa(n) ?? t,
        a = Ns(o, s),
        l = eN(a) ? a.canActivate(n, e) : xn(s, () => a(n, e));
      return Lr(l).pipe(fi());
    })
  );
  return J(r).pipe(Os());
}
function dN(e, n, t) {
  let i = n[n.length - 1],
    o = n
      .slice(0, n.length - 1)
      .reverse()
      .map((s) => YO(s))
      .filter((s) => s !== null)
      .map((s) =>
        Kr(() => {
          let a = s.guards.map((l) => {
            let c = Qa(s.node) ?? t,
              u = Ns(l, c),
              d = tN(u) ? u.canActivateChild(i, e) : xn(c, () => u(i, e));
            return Lr(d).pipe(fi());
          });
          return J(a).pipe(Os());
        })
      );
  return J(o).pipe(Os());
}
function fN(e, n, t, i, r) {
  let o = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
  if (!o || o.length === 0) return J(!0);
  let s = o.map((a) => {
    let l = Qa(n) ?? r,
      c = Ns(a, l),
      u = nN(c) ? c.canDeactivate(e, n, t, i) : xn(l, () => c(e, n, t, i));
    return Lr(u).pipe(fi());
  });
  return J(s).pipe(Os());
}
function hN(e, n, t, i) {
  let r = n.canLoad;
  if (r === void 0 || r.length === 0) return J(!0);
  let o = r.map((s) => {
    let a = Ns(s, e),
      l = XO(a) ? a.canLoad(n, t) : xn(e, () => a(n, t));
    return Lr(l);
  });
  return J(o).pipe(Os(), FC(i));
}
function FC(e) {
  return _f(
    Dt((n) => {
      if (typeof n != "boolean") throw gd(e, n);
    }),
    Ce((n) => n === !0)
  );
}
function pN(e, n, t, i) {
  let r = n.canMatch;
  if (!r || r.length === 0) return J(!0);
  let o = r.map((s) => {
    let a = Ns(s, e),
      l = iN(a) ? a.canMatch(n, t) : xn(e, () => a(n, t));
    return Lr(l);
  });
  return J(o).pipe(Os(), FC(i));
}
var Wa = class {
    constructor(n) {
      this.segmentGroup = n || null;
    }
  },
  qa = class extends Error {
    constructor(n) {
      super(), (this.urlTree = n);
    }
  };
function Cs(e) {
  return Go(new Wa(e));
}
function gN(e) {
  return Go(new pe(4e3, !1));
}
function mN(e) {
  return Go(AC(!1, Mn.GuardRejected));
}
var Rg = class {
    constructor(n, t) {
      (this.urlSerializer = n), (this.urlTree = t);
    }
    lineralizeSegments(n, t) {
      let i = [],
        r = t.root;
      for (;;) {
        if (((i = i.concat(r.segments)), r.numberOfChildren === 0)) return J(i);
        if (r.numberOfChildren > 1 || !r.children[ke])
          return gN(`${n.redirectTo}`);
        r = r.children[ke];
      }
    }
    applyRedirectCommands(n, t, i, r, o) {
      if (typeof t != "string") {
        let a = t,
          {
            queryParams: l,
            fragment: c,
            routeConfig: u,
            url: d,
            outlet: _,
            params: h,
            data: D,
            title: I,
          } = r,
          P = xn(o, () =>
            a({
              params: h,
              data: D,
              queryParams: l,
              fragment: c,
              routeConfig: u,
              url: d,
              outlet: _,
              title: I,
            })
          );
        if (P instanceof er) throw new qa(P);
        t = P;
      }
      let s = this.applyRedirectCreateUrlTree(
        t,
        this.urlSerializer.parse(t),
        n,
        i
      );
      if (t[0] === "/") throw new qa(s);
      return s;
    }
    applyRedirectCreateUrlTree(n, t, i, r) {
      let o = this.createSegmentGroup(n, t.root, i, r);
      return new er(
        o,
        this.createQueryParams(t.queryParams, this.urlTree.queryParams),
        t.fragment
      );
    }
    createQueryParams(n, t) {
      let i = {};
      return (
        Object.entries(n).forEach(([r, o]) => {
          if (typeof o == "string" && o[0] === ":") {
            let a = o.substring(1);
            i[r] = t[a];
          } else i[r] = o;
        }),
        i
      );
    }
    createSegmentGroup(n, t, i, r) {
      let o = this.createSegments(n, t.segments, i, r),
        s = {};
      return (
        Object.entries(t.children).forEach(([a, l]) => {
          s[a] = this.createSegmentGroup(n, l, i, r);
        }),
        new Ke(o, s)
      );
    }
    createSegments(n, t, i, r) {
      return t.map((o) =>
        o.path[0] === ":" ? this.findPosParam(n, o, r) : this.findOrReturn(o, i)
      );
    }
    findPosParam(n, t, i) {
      let r = i[t.path.substring(1)];
      if (!r) throw new pe(4001, !1);
      return r;
    }
    findOrReturn(n, t) {
      let i = 0;
      for (let r of t) {
        if (r.path === n.path) return t.splice(i), r;
        i++;
      }
      return n;
    }
  },
  kg = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function _N(e, n, t, i, r) {
  let o = LC(e, n, t);
  return o.matched
    ? ((i = jO(n, i)),
      pN(i, n, t, r).pipe(Ce((s) => (s === !0 ? o : j({}, kg)))))
    : J(o);
}
function LC(e, n, t) {
  if (n.path === "**") return vN(t);
  if (n.path === "")
    return n.pathMatch === "full" && (e.hasChildren() || t.length > 0)
      ? j({}, kg)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: t,
          parameters: {},
          positionalParamSegments: {},
        };
  let r = (n.matcher || hO)(t, e, n);
  if (!r) return j({}, kg);
  let o = {};
  Object.entries(r.posParams ?? {}).forEach(([a, l]) => {
    o[a] = l.path;
  });
  let s =
    r.consumed.length > 0
      ? j(j({}, o), r.consumed[r.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: r.consumed,
    remainingSegments: t.slice(r.consumed.length),
    parameters: s,
    positionalParamSegments: r.posParams ?? {},
  };
}
function vN(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? mC(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function uC(e, n, t, i) {
  return t.length > 0 && CN(e, t, i)
    ? {
        segmentGroup: new Ke(n, bN(i, new Ke(t, e.children))),
        slicedSegments: [],
      }
    : t.length === 0 && wN(e, t, i)
    ? {
        segmentGroup: new Ke(e.segments, yN(e, t, i, e.children)),
        slicedSegments: t,
      }
    : { segmentGroup: new Ke(e.segments, e.children), slicedSegments: t };
}
function yN(e, n, t, i) {
  let r = {};
  for (let o of t)
    if (bd(e, n, o) && !i[si(o)]) {
      let s = new Ke([], {});
      r[si(o)] = s;
    }
  return j(j({}, i), r);
}
function bN(e, n) {
  let t = {};
  t[ke] = n;
  for (let i of e)
    if (i.path === "" && si(i) !== ke) {
      let r = new Ke([], {});
      t[si(i)] = r;
    }
  return t;
}
function CN(e, n, t) {
  return t.some((i) => bd(e, n, i) && si(i) !== ke);
}
function wN(e, n, t) {
  return t.some((i) => bd(e, n, i));
}
function bd(e, n, t) {
  return (e.hasChildren() || n.length > 0) && t.pathMatch === "full"
    ? !1
    : t.path === "";
}
function DN(e, n, t) {
  return n.length === 0 && !e.children[t];
}
var Fg = class {};
function EN(e, n, t, i, r, o, s = "emptyOnly") {
  return new Lg(e, n, t, i, r, s, o).recognize();
}
var MN = 31,
  Lg = class {
    constructor(n, t, i, r, o, s, a) {
      (this.injector = n),
        (this.configLoader = t),
        (this.rootComponentType = i),
        (this.config = r),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new Rg(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(n) {
      return new pe(4002, `'${n.segmentGroup}'`);
    }
    recognize() {
      let n = uC(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(n).pipe(
        Ce(({ children: t, rootSnapshot: i }) => {
          let r = new En(i, t),
            o = new pd("", r),
            s = PO(i, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            { state: o, tree: s }
          );
        })
      );
    }
    match(n) {
      let t = new Es(
        [],
        Object.freeze({}),
        Object.freeze(j({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        ke,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(
        this.injector,
        this.config,
        n,
        ke,
        t
      ).pipe(
        Ce((i) => ({ children: i, rootSnapshot: t })),
        yr((i) => {
          if (i instanceof qa)
            return (this.urlTree = i.urlTree), this.match(i.urlTree.root);
          throw i instanceof Wa ? this.noMatchError(i) : i;
        })
      );
    }
    processSegmentGroup(n, t, i, r, o) {
      return i.segments.length === 0 && i.hasChildren()
        ? this.processChildren(n, t, i, o)
        : this.processSegment(n, t, i, i.segments, r, !0, o).pipe(
            Ce((s) => (s instanceof En ? [s] : []))
          );
    }
    processChildren(n, t, i, r) {
      let o = [];
      for (let s of Object.keys(i.children))
        s === "primary" ? o.unshift(s) : o.push(s);
      return it(o).pipe(
        Wn((s) => {
          let a = i.children[s],
            l = BO(t, s);
          return this.processSegmentGroup(n, l, a, s, r);
        }),
        Nf((s, a) => (s.push(...a), s)),
        br(null),
        xf(),
        at((s) => {
          if (s === null) return Cs(i);
          let a = VC(s);
          return IN(a), J(a);
        })
      );
    }
    processSegment(n, t, i, r, o, s, a) {
      return it(t).pipe(
        Wn((l) =>
          this.processSegmentAgainstRoute(
            l._injector ?? n,
            t,
            l,
            i,
            r,
            o,
            s,
            a
          ).pipe(
            yr((c) => {
              if (c instanceof Wa) return J(null);
              throw c;
            })
          )
        ),
        fi((l) => !!l),
        yr((l) => {
          if (kC(l)) return DN(i, r, o) ? J(new Fg()) : Cs(i);
          throw l;
        })
      );
    }
    processSegmentAgainstRoute(n, t, i, r, o, s, a, l) {
      return si(i) !== s && (s === ke || !bd(r, o, i))
        ? Cs(r)
        : i.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(n, r, i, o, s, l)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(n, r, t, i, o, s, l)
        : Cs(r);
    }
    expandSegmentAgainstRouteUsingRedirect(n, t, i, r, o, s, a) {
      let {
        matched: l,
        parameters: c,
        consumedSegments: u,
        positionalParamSegments: d,
        remainingSegments: _,
      } = LC(t, r, o);
      if (!l) return Cs(t);
      typeof r.redirectTo == "string" &&
        r.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > MN && (this.allowRedirects = !1));
      let h = new Es(
          o,
          c,
          Object.freeze(j({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          dC(r),
          si(r),
          r.component ?? r._loadedComponent ?? null,
          r,
          fC(r)
        ),
        D = hd(h, a, this.paramsInheritanceStrategy);
      (h.params = Object.freeze(D.params)), (h.data = Object.freeze(D.data));
      let I = this.applyRedirects.applyRedirectCommands(
        u,
        r.redirectTo,
        d,
        h,
        n
      );
      return this.applyRedirects
        .lineralizeSegments(r, I)
        .pipe(at((P) => this.processSegment(n, i, t, P.concat(_), s, !1, a)));
    }
    matchSegmentAgainstRoute(n, t, i, r, o, s) {
      let a = _N(t, i, r, n, this.urlSerializer);
      return (
        i.path === "**" && (t.children = {}),
        a.pipe(
          ut((l) =>
            l.matched
              ? ((n = i._injector ?? n),
                this.getChildConfig(n, i, r).pipe(
                  ut(({ routes: c }) => {
                    let u = i._loadedInjector ?? n,
                      {
                        parameters: d,
                        consumedSegments: _,
                        remainingSegments: h,
                      } = l,
                      D = new Es(
                        _,
                        d,
                        Object.freeze(j({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        dC(i),
                        si(i),
                        i.component ?? i._loadedComponent ?? null,
                        i,
                        fC(i)
                      ),
                      I = hd(D, s, this.paramsInheritanceStrategy);
                    (D.params = Object.freeze(I.params)),
                      (D.data = Object.freeze(I.data));
                    let { segmentGroup: P, slicedSegments: F } = uC(t, _, h, c);
                    if (F.length === 0 && P.hasChildren())
                      return this.processChildren(u, c, P, D).pipe(
                        Ce((T) => new En(D, T))
                      );
                    if (c.length === 0 && F.length === 0)
                      return J(new En(D, []));
                    let R = si(i) === o;
                    return this.processSegment(
                      u,
                      c,
                      P,
                      F,
                      R ? ke : o,
                      !0,
                      D
                    ).pipe(Ce((T) => new En(D, T instanceof En ? [T] : [])));
                  })
                ))
              : Cs(t)
          )
        )
      );
    }
    getChildConfig(n, t, i) {
      return t.children
        ? J({ routes: t.children, injector: n })
        : t.loadChildren
        ? t._loadedRoutes !== void 0
          ? J({ routes: t._loadedRoutes, injector: t._loadedInjector })
          : hN(n, t, i, this.urlSerializer).pipe(
              at((r) =>
                r
                  ? this.configLoader.loadChildren(n, t).pipe(
                      Dt((o) => {
                        (t._loadedRoutes = o.routes),
                          (t._loadedInjector = o.injector);
                      })
                    )
                  : mN(t)
              )
            )
        : J({ routes: [], injector: n });
    }
  };
function IN(e) {
  e.sort((n, t) =>
    n.value.outlet === ke
      ? -1
      : t.value.outlet === ke
      ? 1
      : n.value.outlet.localeCompare(t.value.outlet)
  );
}
function TN(e) {
  let n = e.value.routeConfig;
  return n && n.path === "";
}
function VC(e) {
  let n = [],
    t = new Set();
  for (let i of e) {
    if (!TN(i)) {
      n.push(i);
      continue;
    }
    let r = n.find((o) => i.value.routeConfig === o.value.routeConfig);
    r !== void 0 ? (r.children.push(...i.children), t.add(r)) : n.push(i);
  }
  for (let i of t) {
    let r = VC(i.children);
    n.push(new En(i.value, r));
  }
  return n.filter((i) => !t.has(i));
}
function dC(e) {
  return e.data || {};
}
function fC(e) {
  return e.resolve || {};
}
function SN(e, n, t, i, r, o) {
  return at((s) =>
    EN(e, n, t, i, s.extractedUrl, r, o).pipe(
      Ce(({ state: a, tree: l }) =>
        Pe(j({}, s), { targetSnapshot: a, urlAfterRedirects: l })
      )
    )
  );
}
function xN(e, n) {
  return at((t) => {
    let {
      targetSnapshot: i,
      guards: { canActivateChecks: r },
    } = t;
    if (!r.length) return J(t);
    let o = new Set(r.map((l) => l.route)),
      s = new Set();
    for (let l of o) if (!s.has(l)) for (let c of jC(l)) s.add(c);
    let a = 0;
    return it(s).pipe(
      Wn((l) =>
        o.has(l)
          ? ON(l, i, e, n)
          : ((l.data = hd(l, l.parent, e).resolve), J(void 0))
      ),
      Dt(() => a++),
      Zo(1),
      at((l) => (a === s.size ? J(t) : Wt))
    );
  });
}
function jC(e) {
  let n = e.children.map((t) => jC(t)).flat();
  return [e, ...n];
}
function ON(e, n, t, i) {
  let r = e.routeConfig,
    o = e._resolve;
  return (
    r?.title !== void 0 && !NC(r) && (o[Za] = r.title),
    NN(o, e, n, i).pipe(
      Ce(
        (s) => (
          (e._resolvedData = s), (e.data = hd(e, e.parent, t).resolve), null
        )
      )
    )
  );
}
function NN(e, n, t, i) {
  let r = pg(e);
  if (r.length === 0) return J({});
  let o = {};
  return it(r).pipe(
    at((s) =>
      PN(e[s], n, t, i).pipe(
        fi(),
        Dt((a) => {
          if (a instanceof Ga) throw gd(new Ts(), a);
          o[s] = a;
        })
      )
    ),
    Zo(1),
    oa(o),
    yr((s) => (kC(s) ? Wt : Go(s)))
  );
}
function PN(e, n, t, i) {
  let r = Qa(n) ?? i,
    o = Ns(e, r),
    s = o.resolve ? o.resolve(n, t) : xn(r, () => o(n, t));
  return Lr(s);
}
function fg(e) {
  return ut((n) => {
    let t = e(n);
    return t ? it(t).pipe(Ce(() => n)) : J(n);
  });
}
var BC = (() => {
    class e {
      buildTitle(t) {
        let i,
          r = t.root;
        for (; r !== void 0; )
          (i = this.getResolvedTitleForRoute(r) ?? i),
            (r = r.children.find((o) => o.outlet === ke));
        return i;
      }
      getResolvedTitleForRoute(t) {
        return t.data[Za];
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: () => O(AN), providedIn: "root" });
      }
    }
    return e;
  })(),
  AN = (() => {
    class e extends BC {
      constructor(t) {
        super(), (this.title = t);
      }
      updateTitle(t) {
        let i = this.buildTitle(t);
        i !== void 0 && this.title.setTitle(i);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(iC));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Xa = new z("", { providedIn: "root", factory: () => ({}) }),
  RN = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵcmp = ot({
          type: e,
          selectors: [["ng-component"]],
          standalone: !0,
          features: [mo],
          decls: 1,
          vars: 0,
          template: function (i, r) {
            i & 1 && Y(0, "router-outlet");
          },
          dependencies: [UO],
          encapsulation: 2,
        });
      }
    }
    return e;
  })();
function Bg(e) {
  let n = e.children && e.children.map(Bg),
    t = n ? Pe(j({}, e), { children: n }) : j({}, e);
  return (
    !t.component &&
      !t.loadComponent &&
      (n || t.loadChildren) &&
      t.outlet &&
      t.outlet !== ke &&
      (t.component = RN),
    t
  );
}
var _d = new z(""),
  Hg = (() => {
    class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = O(Pu));
      }
      loadComponent(t) {
        if (this.componentLoaders.get(t)) return this.componentLoaders.get(t);
        if (t._loadedComponent) return J(t._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(t);
        let i = Lr(t.loadComponent()).pipe(
            Ce(HC),
            Dt((o) => {
              this.onLoadEndListener && this.onLoadEndListener(t),
                (t._loadedComponent = o);
            }),
            ln(() => {
              this.componentLoaders.delete(t);
            })
          ),
          r = new gr(i, () => new He()).pipe(Bo());
        return this.componentLoaders.set(t, r), r;
      }
      loadChildren(t, i) {
        if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
        if (i._loadedRoutes)
          return J({ routes: i._loadedRoutes, injector: i._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(i);
        let o = kN(i, this.compiler, t, this.onLoadEndListener).pipe(
            ln(() => {
              this.childrenLoaders.delete(i);
            })
          ),
          s = new gr(o, () => new He()).pipe(Bo());
        return this.childrenLoaders.set(i, s), s;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function kN(e, n, t, i) {
  return Lr(e.loadChildren()).pipe(
    Ce(HC),
    at((r) =>
      r instanceof ga || Array.isArray(r) ? J(r) : it(n.compileModuleAsync(r))
    ),
    Ce((r) => {
      i && i(e);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(r)
          ? ((s = r), (a = !0))
          : ((o = r.create(t).injector),
            (s = o.get(_d, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(Bg), injector: o }
      );
    })
  );
}
function FN(e) {
  return e && typeof e == "object" && "default" in e;
}
function HC(e) {
  return FN(e) ? e.default : e;
}
var Ug = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: () => O(LN), providedIn: "root" });
      }
    }
    return e;
  })(),
  LN = (() => {
    class e {
      shouldProcessUrl(t) {
        return !0;
      }
      extract(t) {
        return t;
      }
      merge(t, i) {
        return t;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  UC = new z(""),
  $C = new z("");
function VN(e, n, t) {
  let i = e.get($C),
    r = e.get(ht);
  return e.get(Re).runOutsideAngular(() => {
    if (!r.startViewTransition || i.skipNextTransition)
      return (i.skipNextTransition = !1), new Promise((c) => setTimeout(c));
    let o,
      s = new Promise((c) => {
        o = c;
      }),
      a = r.startViewTransition(() => (o(), jN(e))),
      { onViewTransitionCreated: l } = i;
    return l && xn(e, () => l({ transition: a, from: n, to: t })), s;
  });
}
function jN(e) {
  return new Promise((n) => {
    ho({ read: () => setTimeout(n) }, { injector: e });
  });
}
var BN = new z(""),
  $g = (() => {
    class e {
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      constructor() {
        (this.currentNavigation = null),
          (this.currentTransition = null),
          (this.lastSuccessfulNavigation = null),
          (this.events = new He()),
          (this.transitionAbortSubject = new He()),
          (this.configLoader = O(Hg)),
          (this.environmentInjector = O(Qt)),
          (this.urlSerializer = O(Ya)),
          (this.rootContexts = O(Ka)),
          (this.location = O(ys)),
          (this.inputBindingEnabled = O(yd, { optional: !0 }) !== null),
          (this.titleStrategy = O(BC)),
          (this.options = O(Xa, { optional: !0 }) || {}),
          (this.paramsInheritanceStrategy =
            this.options.paramsInheritanceStrategy || "emptyOnly"),
          (this.urlHandlingStrategy = O(Ug)),
          (this.createViewTransition = O(UC, { optional: !0 })),
          (this.navigationErrorHandler = O(BN, { optional: !0 })),
          (this.navigationId = 0),
          (this.afterPreactivation = () => J(void 0)),
          (this.rootComponentType = null);
        let t = (r) => this.events.next(new wg(r)),
          i = (r) => this.events.next(new Dg(r));
        (this.configLoader.onLoadEndListener = i),
          (this.configLoader.onLoadStartListener = t);
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(t) {
        let i = ++this.navigationId;
        this.transitions?.next(
          Pe(j(j({}, this.transitions.value), t), { id: i })
        );
      }
      setupNavigations(t, i, r) {
        return (
          (this.transitions = new Mt({
            id: 0,
            currentUrlTree: i,
            currentRawUrl: i,
            extractedUrl: this.urlHandlingStrategy.extract(i),
            urlAfterRedirects: this.urlHandlingStrategy.extract(i),
            rawUrl: i,
            extras: {},
            resolve: () => {},
            reject: () => {},
            promise: Promise.resolve(!0),
            source: ja,
            restoredState: null,
            currentSnapshot: r.snapshot,
            targetSnapshot: null,
            currentRouterState: r,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
          })),
          this.transitions.pipe(
            It((o) => o.id !== 0),
            Ce((o) =>
              Pe(j({}, o), {
                extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
              })
            ),
            ut((o) => {
              let s = !1,
                a = !1;
              return J(o).pipe(
                ut((l) => {
                  if (this.navigationId > o.id)
                    return (
                      this.cancelNavigationTransition(
                        o,
                        "",
                        Mn.SupersededByNewNavigation
                      ),
                      Wt
                    );
                  (this.currentTransition = o),
                    (this.currentNavigation = {
                      id: l.id,
                      initialUrl: l.rawUrl,
                      extractedUrl: l.extractedUrl,
                      targetBrowserUrl:
                        typeof l.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(l.extras.browserUrl)
                          : l.extras.browserUrl,
                      trigger: l.source,
                      extras: l.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Pe(j({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                    });
                  let c =
                      !t.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    u = l.extras.onSameUrlNavigation ?? t.onSameUrlNavigation;
                  if (!c && u !== "reload") {
                    let d = "";
                    return (
                      this.events.next(
                        new Fr(
                          l.id,
                          this.urlSerializer.serialize(l.rawUrl),
                          d,
                          ld.IgnoredSameUrlNavigation
                        )
                      ),
                      l.resolve(!1),
                      Wt
                    );
                  }
                  if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                    return J(l).pipe(
                      ut((d) => {
                        let _ = this.transitions?.getValue();
                        return (
                          this.events.next(
                            new Ss(
                              d.id,
                              this.urlSerializer.serialize(d.extractedUrl),
                              d.source,
                              d.restoredState
                            )
                          ),
                          _ !== this.transitions?.getValue()
                            ? Wt
                            : Promise.resolve(d)
                        );
                      }),
                      SN(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        t.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      Dt((d) => {
                        (o.targetSnapshot = d.targetSnapshot),
                          (o.urlAfterRedirects = d.urlAfterRedirects),
                          (this.currentNavigation = Pe(
                            j({}, this.currentNavigation),
                            { finalUrl: d.urlAfterRedirects }
                          ));
                        let _ = new cd(
                          d.id,
                          this.urlSerializer.serialize(d.extractedUrl),
                          this.urlSerializer.serialize(d.urlAfterRedirects),
                          d.targetSnapshot
                        );
                        this.events.next(_);
                      })
                    );
                  if (
                    c &&
                    this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                  ) {
                    let {
                        id: d,
                        extractedUrl: _,
                        source: h,
                        restoredState: D,
                        extras: I,
                      } = l,
                      P = new Ss(d, this.urlSerializer.serialize(_), h, D);
                    this.events.next(P);
                    let F = xC(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = o =
                        Pe(j({}, l), {
                          targetSnapshot: F,
                          urlAfterRedirects: _,
                          extras: Pe(j({}, I), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      (this.currentNavigation.finalUrl = _),
                      J(o)
                    );
                  } else {
                    let d = "";
                    return (
                      this.events.next(
                        new Fr(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          d,
                          ld.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      l.resolve(!1),
                      Wt
                    );
                  }
                }),
                Dt((l) => {
                  let c = new vg(
                    l.id,
                    this.urlSerializer.serialize(l.extractedUrl),
                    this.urlSerializer.serialize(l.urlAfterRedirects),
                    l.targetSnapshot
                  );
                  this.events.next(c);
                }),
                Ce(
                  (l) => (
                    (this.currentTransition = o =
                      Pe(j({}, l), {
                        guards: ZO(
                          l.targetSnapshot,
                          l.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    o
                  )
                ),
                oN(this.environmentInjector, (l) => this.events.next(l)),
                Dt((l) => {
                  if (
                    ((o.guardsResult = l.guardsResult),
                    l.guardsResult && typeof l.guardsResult != "boolean")
                  )
                    throw gd(this.urlSerializer, l.guardsResult);
                  let c = new yg(
                    l.id,
                    this.urlSerializer.serialize(l.extractedUrl),
                    this.urlSerializer.serialize(l.urlAfterRedirects),
                    l.targetSnapshot,
                    !!l.guardsResult
                  );
                  this.events.next(c);
                }),
                It((l) =>
                  l.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(l, "", Mn.GuardRejected),
                      !1)
                ),
                fg((l) => {
                  if (l.guards.canActivateChecks.length)
                    return J(l).pipe(
                      Dt((c) => {
                        let u = new bg(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(u);
                      }),
                      ut((c) => {
                        let u = !1;
                        return J(c).pipe(
                          xN(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          Dt({
                            next: () => (u = !0),
                            complete: () => {
                              u ||
                                this.cancelNavigationTransition(
                                  c,
                                  "",
                                  Mn.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      Dt((c) => {
                        let u = new Cg(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(u);
                      })
                    );
                }),
                fg((l) => {
                  let c = (u) => {
                    let d = [];
                    u.routeConfig?.loadComponent &&
                      !u.routeConfig._loadedComponent &&
                      d.push(
                        this.configLoader.loadComponent(u.routeConfig).pipe(
                          Dt((_) => {
                            u.component = _;
                          }),
                          Ce(() => {})
                        )
                      );
                    for (let _ of u.children) d.push(...c(_));
                    return d;
                  };
                  return qo(c(l.targetSnapshot.root)).pipe(br(null), Lt(1));
                }),
                fg(() => this.afterPreactivation()),
                ut(() => {
                  let { currentSnapshot: l, targetSnapshot: c } = o,
                    u = this.createViewTransition?.(
                      this.environmentInjector,
                      l.root,
                      c.root
                    );
                  return u ? it(u).pipe(Ce(() => o)) : J(o);
                }),
                Ce((l) => {
                  let c = $O(
                    t.routeReuseStrategy,
                    l.targetSnapshot,
                    l.currentRouterState
                  );
                  return (
                    (this.currentTransition = o =
                      Pe(j({}, l), { targetRouterState: c })),
                    (this.currentNavigation.targetRouterState = c),
                    o
                  );
                }),
                Dt(() => {
                  this.events.next(new $a());
                }),
                qO(
                  this.rootContexts,
                  t.routeReuseStrategy,
                  (l) => this.events.next(l),
                  this.inputBindingEnabled
                ),
                Lt(1),
                Dt({
                  next: (l) => {
                    (s = !0),
                      (this.lastSuccessfulNavigation = this.currentNavigation),
                      this.events.next(
                        new Mi(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          this.urlSerializer.serialize(l.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        l.targetRouterState.snapshot
                      ),
                      l.resolve(!0);
                  },
                  complete: () => {
                    s = !0;
                  },
                }),
                Xt(
                  this.transitionAbortSubject.pipe(
                    Dt((l) => {
                      throw l;
                    })
                  )
                ),
                ln(() => {
                  !s &&
                    !a &&
                    this.cancelNavigationTransition(
                      o,
                      "",
                      Mn.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === o.id &&
                      ((this.currentNavigation = null),
                      (this.currentTransition = null));
                }),
                yr((l) => {
                  if (((a = !0), RC(l)))
                    this.events.next(
                      new Xi(
                        o.id,
                        this.urlSerializer.serialize(o.extractedUrl),
                        l.message,
                        l.cancellationCode
                      )
                    ),
                      WO(l)
                        ? this.events.next(
                            new xs(l.url, l.navigationBehaviorOptions)
                          )
                        : o.resolve(!1);
                  else {
                    let c = new Ua(
                      o.id,
                      this.urlSerializer.serialize(o.extractedUrl),
                      l,
                      o.targetSnapshot ?? void 0
                    );
                    try {
                      let u = xn(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(c)
                      );
                      if (u instanceof Ga) {
                        let { message: d, cancellationCode: _ } = gd(
                          this.urlSerializer,
                          u
                        );
                        this.events.next(
                          new Xi(
                            o.id,
                            this.urlSerializer.serialize(o.extractedUrl),
                            d,
                            _
                          )
                        ),
                          this.events.next(
                            new xs(u.redirectTo, u.navigationBehaviorOptions)
                          );
                      } else {
                        this.events.next(c);
                        let d = t.errorHandler(l);
                        o.resolve(!!d);
                      }
                    } catch (u) {
                      this.options.resolveNavigationPromiseOnError
                        ? o.resolve(!1)
                        : o.reject(u);
                    }
                  }
                  return Wt;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(t, i, r) {
        let o = new Xi(
          t.id,
          this.urlSerializer.serialize(t.extractedUrl),
          i,
          r
        );
        this.events.next(o), t.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let t = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          i =
            this.currentNavigation?.targetBrowserUrl ??
            this.currentNavigation?.extractedUrl;
        return (
          t.toString() !== i?.toString() &&
          !this.currentNavigation?.extras.skipLocationChange
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function HN(e) {
  return e !== ja;
}
var UN = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: () => O($N), providedIn: "root" });
      }
    }
    return e;
  })(),
  Vg = class {
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
  },
  $N = (() => {
    class e extends Vg {
      static {
        this.ɵfac = (() => {
          let t;
          return function (r) {
            return (t || (t = Nn(e)))(r || e);
          };
        })();
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  zC = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: () => O(zN), providedIn: "root" });
      }
    }
    return e;
  })(),
  zN = (() => {
    class e extends zC {
      constructor() {
        super(...arguments),
          (this.location = O(ys)),
          (this.urlSerializer = O(Ya)),
          (this.options = O(Xa, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = O(Ug)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new er()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = xC(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(t) {
        return this.location.subscribe((i) => {
          i.type === "popstate" && t(i.url, i.state);
        });
      }
      handleRouterEvent(t, i) {
        if (t instanceof Ss) this.stateMemento = this.createStateMemento();
        else if (t instanceof Fr) this.rawUrlTree = i.initialUrl;
        else if (t instanceof cd) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !i.extras.skipLocationChange
          ) {
            let r = this.urlHandlingStrategy.merge(i.finalUrl, i.initialUrl);
            this.setBrowserUrl(i.targetBrowserUrl ?? r, i);
          }
        } else
          t instanceof $a
            ? ((this.currentUrlTree = i.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                i.finalUrl,
                i.initialUrl
              )),
              (this.routerState = i.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                !i.extras.skipLocationChange &&
                this.setBrowserUrl(i.targetBrowserUrl ?? this.rawUrlTree, i))
            : t instanceof Xi &&
              (t.code === Mn.GuardRejected || t.code === Mn.NoDataFromResolver)
            ? this.restoreHistory(i)
            : t instanceof Ua
            ? this.restoreHistory(i, !0)
            : t instanceof Mi &&
              ((this.lastSuccessfulId = t.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(t, i) {
        let r = t instanceof er ? this.urlSerializer.serialize(t) : t;
        if (this.location.isCurrentPathEqualTo(r) || i.extras.replaceUrl) {
          let o = this.browserPageId,
            s = j(j({}, i.extras.state), this.generateNgRouterState(i.id, o));
          this.location.replaceState(r, "", s);
        } else {
          let o = j(
            j({}, i.extras.state),
            this.generateNgRouterState(i.id, this.browserPageId + 1)
          );
          this.location.go(r, "", o);
        }
      }
      restoreHistory(t, i = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let r = this.browserPageId,
            o = this.currentPageId - r;
          o !== 0
            ? this.location.historyGo(o)
            : this.currentUrlTree === t.finalUrl &&
              o === 0 &&
              (this.resetState(t), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (i && this.resetState(t), this.resetUrlToCurrentUrlTree());
      }
      resetState(t) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            t.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(t, i) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: t, ɵrouterPageId: i }
          : { navigationId: t };
      }
      static {
        this.ɵfac = (() => {
          let t;
          return function (r) {
            return (t || (t = Nn(e)))(r || e);
          };
        })();
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  La = (function (e) {
    return (
      (e[(e.COMPLETE = 0)] = "COMPLETE"),
      (e[(e.FAILED = 1)] = "FAILED"),
      (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
      e
    );
  })(La || {});
function GC(e, n) {
  e.events
    .pipe(
      It(
        (t) =>
          t instanceof Mi ||
          t instanceof Xi ||
          t instanceof Ua ||
          t instanceof Fr
      ),
      Ce((t) =>
        t instanceof Mi || t instanceof Fr
          ? La.COMPLETE
          : (
              t instanceof Xi
                ? t.code === Mn.Redirect ||
                  t.code === Mn.SupersededByNewNavigation
                : !1
            )
          ? La.REDIRECTING
          : La.FAILED
      ),
      It((t) => t !== La.REDIRECTING),
      Lt(1)
    )
    .subscribe(() => {
      n();
    });
}
function GN(e) {
  throw e;
}
var WN = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  qN = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  Ii = (() => {
    class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.console = O(Tu)),
          (this.stateManager = O(zC)),
          (this.options = O(Xa, { optional: !0 }) || {}),
          (this.pendingTasks = O(Gi)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = O($g)),
          (this.urlSerializer = O(Ya)),
          (this.location = O(ys)),
          (this.urlHandlingStrategy = O(Ug)),
          (this._events = new He()),
          (this.errorHandler = this.options.errorHandler || GN),
          (this.navigated = !1),
          (this.routeReuseStrategy = O(UN)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = O(_d, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!O(yd, { optional: !0 })),
          (this.eventsSubscription = new nt()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (t) => {
                this.console.warn(t);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let t = this.navigationTransitions.events.subscribe((i) => {
          try {
            let r = this.navigationTransitions.currentTransition,
              o = this.navigationTransitions.currentNavigation;
            if (r !== null && o !== null) {
              if (
                (this.stateManager.handleRouterEvent(i, o),
                i instanceof Xi &&
                  i.code !== Mn.Redirect &&
                  i.code !== Mn.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (i instanceof Mi) this.navigated = !0;
              else if (i instanceof xs) {
                let s = i.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(i.url, r.currentRawUrl),
                  l = j(
                    {
                      browserUrl: r.extras.browserUrl,
                      info: r.extras.info,
                      skipLocationChange: r.extras.skipLocationChange,
                      replaceUrl:
                        r.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        HN(r.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, ja, null, l, {
                  resolve: r.resolve,
                  reject: r.reject,
                  promise: r.promise,
                });
              }
            }
            YN(i) && this._events.next(i);
          } catch (r) {
            this.navigationTransitions.transitionAbortSubject.next(r);
          }
        });
        this.eventsSubscription.add(t);
      }
      resetRootComponentType(t) {
        (this.routerState.root.component = t),
          (this.navigationTransitions.rootComponentType = t);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              ja,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (t, i) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(t, "popstate", i);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(t, i, r) {
        let o = { replaceUrl: !0 },
          s = r?.navigationId ? r : null;
        if (r) {
          let l = j({}, r);
          delete l.navigationId,
            delete l.ɵrouterPageId,
            Object.keys(l).length !== 0 && (o.state = l);
        }
        let a = this.parseUrl(t);
        this.scheduleNavigation(a, i, s, o);
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
        (this.config = t.map(Bg)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(t, i = {}) {
        let {
            relativeTo: r,
            queryParams: o,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: l,
          } = i,
          c = l ? this.currentUrlTree.fragment : s,
          u = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            u = j(j({}, this.currentUrlTree.queryParams), o);
            break;
          case "preserve":
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = o || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let d;
        try {
          let _ = r ? r.snapshot : this.routerState.snapshot.root;
          d = MC(_);
        } catch {
          (typeof t[0] != "string" || t[0][0] !== "/") && (t = []),
            (d = this.currentUrlTree.root);
        }
        return IC(d, t, u, c ?? null);
      }
      navigateByUrl(t, i = { skipLocationChange: !1 }) {
        let r = bo(t) ? t : this.parseUrl(t),
          o = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
        return this.scheduleNavigation(o, ja, null, i);
      }
      navigate(t, i = { skipLocationChange: !1 }) {
        return ZN(t), this.navigateByUrl(this.createUrlTree(t, i), i);
      }
      serializeUrl(t) {
        return this.urlSerializer.serialize(t);
      }
      parseUrl(t) {
        try {
          return this.urlSerializer.parse(t);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(t, i) {
        let r;
        if (
          (i === !0 ? (r = j({}, WN)) : i === !1 ? (r = j({}, qN)) : (r = i),
          bo(t))
        )
          return oC(this.currentUrlTree, t, r);
        let o = this.parseUrl(t);
        return oC(this.currentUrlTree, o, r);
      }
      removeEmptyProps(t) {
        return Object.entries(t).reduce(
          (i, [r, o]) => (o != null && (i[r] = o), i),
          {}
        );
      }
      scheduleNavigation(t, i, r, o, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, l, c;
        s
          ? ((a = s.resolve), (l = s.reject), (c = s.promise))
          : (c = new Promise((d, _) => {
              (a = d), (l = _);
            }));
        let u = this.pendingTasks.add();
        return (
          GC(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: i,
            restoredState: r,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: t,
            extras: o,
            resolve: a,
            reject: l,
            promise: c,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          c.catch((d) => Promise.reject(d))
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function ZN(e) {
  for (let n = 0; n < e.length; n++) if (e[n] == null) throw new pe(4008, !1);
}
function YN(e) {
  return !(e instanceof $a) && !(e instanceof xs);
}
var WC = (() => {
  class e {
    constructor(t, i, r, o, s, a) {
      (this.router = t),
        (this.route = i),
        (this.tabIndexAttribute = r),
        (this.renderer = o),
        (this.el = s),
        (this.locationStrategy = a),
        (this.href = null),
        (this.onChanges = new He()),
        (this.preserveFragment = !1),
        (this.skipLocationChange = !1),
        (this.replaceUrl = !1),
        (this.routerLinkInput = null);
      let l = s.nativeElement.tagName?.toLowerCase();
      (this.isAnchorElement = l === "a" || l === "area"),
        this.isAnchorElement
          ? (this.subscription = t.events.subscribe((c) => {
              c instanceof Mi && this.updateHref();
            }))
          : this.setTabIndexIfNotOnNativeEl("0");
    }
    setTabIndexIfNotOnNativeEl(t) {
      this.tabIndexAttribute != null ||
        this.isAnchorElement ||
        this.applyAttributeValue("tabindex", t);
    }
    ngOnChanges(t) {
      this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
    }
    set routerLink(t) {
      t == null
        ? ((this.routerLinkInput = null), this.setTabIndexIfNotOnNativeEl(null))
        : (bo(t)
            ? (this.routerLinkInput = t)
            : (this.routerLinkInput = Array.isArray(t) ? t : [t]),
          this.setTabIndexIfNotOnNativeEl("0"));
    }
    onClick(t, i, r, o, s) {
      let a = this.urlTree;
      if (
        a === null ||
        (this.isAnchorElement &&
          (t !== 0 ||
            i ||
            r ||
            o ||
            s ||
            (typeof this.target == "string" && this.target != "_self")))
      )
        return !0;
      let l = {
        skipLocationChange: this.skipLocationChange,
        replaceUrl: this.replaceUrl,
        state: this.state,
        info: this.info,
      };
      return this.router.navigateByUrl(a, l), !this.isAnchorElement;
    }
    ngOnDestroy() {
      this.subscription?.unsubscribe();
    }
    updateHref() {
      let t = this.urlTree;
      this.href =
        t !== null && this.locationStrategy
          ? this.locationStrategy?.prepareExternalUrl(
              this.router.serializeUrl(t)
            )
          : null;
      let i =
        this.href === null
          ? null
          : qv(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
      this.applyAttributeValue("href", i);
    }
    applyAttributeValue(t, i) {
      let r = this.renderer,
        o = this.el.nativeElement;
      i !== null ? r.setAttribute(o, t, i) : r.removeAttribute(o, t);
    }
    get urlTree() {
      return this.routerLinkInput === null
        ? null
        : bo(this.routerLinkInput)
        ? this.routerLinkInput
        : this.router.createUrlTree(this.routerLinkInput, {
            relativeTo:
              this.relativeTo !== void 0 ? this.relativeTo : this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: this.preserveFragment,
          });
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(X(Ii), X(Co), du("tabindex"), X(Wi), X(Ct), X(Ki));
      };
    }
    static {
      this.ɵdir = dt({
        type: e,
        selectors: [["", "routerLink", ""]],
        hostVars: 1,
        hostBindings: function (i, r) {
          i & 1 &&
            me("click", function (s) {
              return r.onClick(
                s.button,
                s.ctrlKey,
                s.shiftKey,
                s.altKey,
                s.metaKey
              );
            }),
            i & 2 && po("target", r.target);
        },
        inputs: {
          target: "target",
          queryParams: "queryParams",
          fragment: "fragment",
          queryParamsHandling: "queryParamsHandling",
          state: "state",
          info: "info",
          relativeTo: "relativeTo",
          preserveFragment: [2, "preserveFragment", "preserveFragment", wi],
          skipLocationChange: [
            2,
            "skipLocationChange",
            "skipLocationChange",
            wi,
          ],
          replaceUrl: [2, "replaceUrl", "replaceUrl", wi],
          routerLink: "routerLink",
        },
        standalone: !0,
        features: [_s, Vt],
      });
    }
  }
  return e;
})();
var vd = class {};
var QN = (() => {
    class e {
      constructor(t, i, r, o, s) {
        (this.router = t),
          (this.injector = r),
          (this.preloadingStrategy = o),
          (this.loader = s);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            It((t) => t instanceof Mi),
            Wn(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(t, i) {
        let r = [];
        for (let o of i) {
          o.providers &&
            !o._injector &&
            (o._injector = Cu(o.providers, t, `Route: ${o.path}`));
          let s = o._injector ?? t,
            a = o._loadedInjector ?? s;
          ((o.loadChildren && !o._loadedRoutes && o.canLoad === void 0) ||
            (o.loadComponent && !o._loadedComponent)) &&
            r.push(this.preloadConfig(s, o)),
            (o.children || o._loadedRoutes) &&
              r.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
        }
        return it(r).pipe(vr());
      }
      preloadConfig(t, i) {
        return this.preloadingStrategy.preload(i, () => {
          let r;
          i.loadChildren && i.canLoad === void 0
            ? (r = this.loader.loadChildren(t, i))
            : (r = J(null));
          let o = r.pipe(
            at((s) =>
              s === null
                ? J(void 0)
                : ((i._loadedRoutes = s.routes),
                  (i._loadedInjector = s.injector),
                  this.processRoutes(s.injector ?? t, s.routes))
            )
          );
          if (i.loadComponent && !i._loadedComponent) {
            let s = this.loader.loadComponent(i);
            return it([o, s]).pipe(vr());
          } else return o;
        });
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(Ii), q(Pu), q(Qt), q(vd), q(Hg));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  qC = new z(""),
  KN = (() => {
    class e {
      constructor(t, i, r, o, s = {}) {
        (this.urlSerializer = t),
          (this.transitions = i),
          (this.viewportScroller = r),
          (this.zone = o),
          (this.options = s),
          (this.lastId = 0),
          (this.lastSource = "imperative"),
          (this.restoredId = 0),
          (this.store = {}),
          (s.scrollPositionRestoration ||= "disabled"),
          (s.anchorScrolling ||= "disabled");
      }
      init() {
        this.options.scrollPositionRestoration !== "disabled" &&
          this.viewportScroller.setHistoryScrollRestoration("manual"),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((t) => {
          t instanceof Ss
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = t.navigationTrigger),
              (this.restoredId = t.restoredState
                ? t.restoredState.navigationId
                : 0))
            : t instanceof Mi
            ? ((this.lastId = t.id),
              this.scheduleScrollEvent(
                t,
                this.urlSerializer.parse(t.urlAfterRedirects).fragment
              ))
            : t instanceof Fr &&
              t.code === ld.IgnoredSameUrlNavigation &&
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
          t instanceof ud &&
            (t.position
              ? this.options.scrollPositionRestoration === "top"
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === "enabled" &&
                  this.viewportScroller.scrollToPosition(t.position)
              : t.anchor && this.options.anchorScrolling === "enabled"
              ? this.viewportScroller.scrollToAnchor(t.anchor)
              : this.options.scrollPositionRestoration !== "disabled" &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(t, i) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new ud(
                  t,
                  this.lastSource === "popstate"
                    ? this.store[this.restoredId]
                    : null,
                  i
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
      static {
        this.ɵfac = function (i) {
          uy();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function JN(e) {
  return e.routerState.root;
}
function el(e, n) {
  return { ɵkind: e, ɵproviders: n };
}
function XN() {
  let e = O(mt);
  return (n) => {
    let t = e.get(hn);
    if (n !== t.components[0]) return;
    let i = e.get(Ii),
      r = e.get(ZC);
    e.get(zg) === 1 && i.initialNavigation(),
      e.get(YC, null, je.Optional)?.setUpPreloading(),
      e.get(qC, null, je.Optional)?.init(),
      i.resetRootComponentType(t.componentTypes[0]),
      r.closed || (r.next(), r.complete(), r.unsubscribe());
  };
}
var ZC = new z("", { factory: () => new He() }),
  zg = new z("", { providedIn: "root", factory: () => 1 });
function eP() {
  return el(2, [
    { provide: zg, useValue: 0 },
    {
      provide: Ou,
      multi: !0,
      deps: [mt],
      useFactory: (n) => {
        let t = n.get(Eb, Promise.resolve());
        return () =>
          t.then(
            () =>
              new Promise((i) => {
                let r = n.get(Ii),
                  o = n.get(ZC);
                GC(r, () => {
                  i(!0);
                }),
                  (n.get($g).afterPreactivation = () => (
                    i(!0), o.closed ? J(void 0) : o
                  )),
                  r.initialNavigation();
              })
          );
      },
    },
  ]);
}
function tP() {
  return el(3, [
    {
      provide: Ou,
      multi: !0,
      useFactory: () => {
        let n = O(Ii);
        return () => {
          n.setUpLocationChangeListener();
        };
      },
    },
    { provide: zg, useValue: 2 },
  ]);
}
var YC = new z("");
function nP(e) {
  return el(0, [
    { provide: YC, useExisting: QN },
    { provide: vd, useExisting: e },
  ]);
}
function iP() {
  return el(8, [cC, { provide: yd, useExisting: cC }]);
}
function rP(e) {
  let n = [
    { provide: UC, useValue: VN },
    {
      provide: $C,
      useValue: j({ skipNextTransition: !!e?.skipInitialTransition }, e),
    },
  ];
  return el(9, n);
}
var hC = new z("ROUTER_FORROOT_GUARD"),
  oP = [
    ys,
    { provide: Ya, useClass: Ts },
    Ii,
    Ka,
    { provide: Co, useFactory: JN, deps: [Ii] },
    Hg,
    [],
  ],
  tl = (() => {
    class e {
      constructor(t) {}
      static forRoot(t, i) {
        return {
          ngModule: e,
          providers: [
            oP,
            [],
            { provide: _d, multi: !0, useValue: t },
            { provide: hC, useFactory: cP, deps: [[Ii, new fs(), new Wh()]] },
            { provide: Xa, useValue: i || {} },
            i?.useHash ? aP() : lP(),
            sP(),
            i?.preloadingStrategy ? nP(i.preloadingStrategy).ɵproviders : [],
            i?.initialNavigation ? uP(i) : [],
            i?.bindToComponentInputs ? iP().ɵproviders : [],
            i?.enableViewTransitions ? rP().ɵproviders : [],
            dP(),
          ],
        };
      }
      static forChild(t) {
        return {
          ngModule: e,
          providers: [{ provide: _d, multi: !0, useValue: t }],
        };
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(hC, 8));
        };
      }
      static {
        this.ɵmod = et({ type: e });
      }
      static {
        this.ɵinj = Xe({});
      }
    }
    return e;
  })();
function sP() {
  return {
    provide: qC,
    useFactory: () => {
      let e = O(Pb),
        n = O(Re),
        t = O(Xa),
        i = O($g),
        r = O(Ya);
      return (
        t.scrollOffset && e.setOffset(t.scrollOffset), new KN(r, i, e, n, t)
      );
    },
  };
}
function aP() {
  return { provide: Ki, useClass: Ib };
}
function lP() {
  return { provide: Ki, useClass: Gp };
}
function cP(e) {
  return "guarded";
}
function uP(e) {
  return [
    e.initialNavigation === "disabled" ? tP().ɵproviders : [],
    e.initialNavigation === "enabledBlocking" ? eP().ɵproviders : [],
  ];
}
var pC = new z("");
function dP() {
  return [
    { provide: pC, useFactory: XN },
    { provide: Nu, multi: !0, useExisting: pC },
  ];
}
var fP = [],
  Cd = class e {
    static ɵfac = function (t) {
      return new (t || e)();
    };
    static ɵmod = et({ type: e });
    static ɵinj = Xe({ imports: [tl.forRoot(fP), tl] });
  };
var jr = class {},
  KC = (() => {
    class e extends jr {
      getTranslation(t) {
        return J({});
      }
      static ɵfac = (() => {
        let t;
        return function (r) {
          return (t || (t = Nn(e)))(r || e);
        };
      })();
      static ɵprov = G({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  il = class {},
  JC = (() => {
    class e {
      handle(t) {
        return t.key;
      }
      static ɵfac = function (i) {
        return new (i || e)();
      };
      static ɵprov = G({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function Dd(e, n) {
  if (e === n) return !0;
  if (e === null || n === null) return !1;
  if (e !== e && n !== n) return !0;
  let t = typeof e,
    i = typeof n,
    r,
    o,
    s;
  if (t == i && t == "object")
    if (Array.isArray(e)) {
      if (!Array.isArray(n)) return !1;
      if ((r = e.length) == n.length) {
        for (o = 0; o < r; o++) if (!Dd(e[o], n[o])) return !1;
        return !0;
      }
    } else {
      if (Array.isArray(n)) return !1;
      s = Object.create(null);
      for (o in e) {
        if (!Dd(e[o], n[o])) return !1;
        s[o] = !0;
      }
      for (o in n) if (!(o in s) && typeof n[o] < "u") return !1;
      return !0;
    }
  return !1;
}
function Vr(e) {
  return typeof e < "u" && e !== null;
}
function rl(e) {
  return wd(e) && !Kg(e);
}
function wd(e) {
  return typeof e == "object";
}
function Kg(e) {
  return Array.isArray(e);
}
function Jg(e) {
  return typeof e == "string";
}
function hP(e) {
  return typeof e == "function";
}
function Gg(e, n) {
  let t = Object.assign({}, e);
  return wd(e)
    ? (wd(e) &&
        wd(n) &&
        Object.keys(n).forEach((i) => {
          rl(n[i])
            ? i in e
              ? (t[i] = Gg(e[i], n[i]))
              : Object.assign(t, { [i]: n[i] })
            : Object.assign(t, { [i]: n[i] });
        }),
      t)
    : Gg({}, n);
}
function Wg(e, n) {
  let t = n.split(".");
  n = "";
  do
    (n += t.shift()),
      Vr(e) && Vr(e[n]) && (rl(e[n]) || Kg(e[n]) || !t.length)
        ? ((e = e[n]), (n = ""))
        : t.length
        ? (n += ".")
        : (e = void 0);
  while (t.length);
  return e;
}
function pP(e, n, t) {
  let i = n.split("."),
    r = e;
  for (let o = 0; o < i.length; o++) {
    let s = i[o];
    o === i.length - 1
      ? (r[s] = t)
      : ((!r[s] || !rl(r[s])) && (r[s] = {}), (r = r[s]));
  }
}
var Ps = class {},
  XC = (() => {
    class e extends Ps {
      templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
      interpolate(t, i) {
        if (Jg(t)) return this.interpolateString(t, i);
        if (hP(t)) return this.interpolateFunction(t, i);
      }
      interpolateFunction(t, i) {
        return t(i);
      }
      interpolateString(t, i) {
        return i
          ? t.replace(this.templateMatcher, (r, o) => {
              let s = Wg(i, o);
              return Vr(s) ? s : r;
            })
          : t;
      }
      static ɵfac = (() => {
        let t;
        return function (r) {
          return (t || (t = Nn(e)))(r || e);
        };
      })();
      static ɵprov = G({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  As = class {},
  e1 = (() => {
    class e extends As {
      compile(t, i) {
        return t;
      }
      compileTranslations(t, i) {
        return t;
      }
      static ɵfac = (() => {
        let t;
        return function (r) {
          return (t || (t = Nn(e)))(r || e);
        };
      })();
      static ɵprov = G({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ed = class {
    defaultLang;
    currentLang = this.defaultLang;
    translations = {};
    langs = [];
    onTranslationChange = new Ne();
    onLangChange = new Ne();
    onDefaultLangChange = new Ne();
  },
  qg = new z("ISOALTE_TRANSLATE_SERVICE"),
  Zg = new z("USE_DEFAULT_LANG"),
  Yg = new z("DEFAULT_LANGUAGE"),
  Qg = new z("USE_EXTEND"),
  nl = (e) => (mn(e) ? e : J(e)),
  tr = (() => {
    class e {
      store;
      currentLoader;
      compiler;
      parser;
      missingTranslationHandler;
      useDefaultLang;
      isolate;
      extend;
      loadingTranslations;
      pending = !1;
      _onTranslationChange = new Ne();
      _onLangChange = new Ne();
      _onDefaultLangChange = new Ne();
      _defaultLang;
      _currentLang;
      _langs = [];
      _translations = {};
      _translationRequests = {};
      lastUseLanguage = null;
      get onTranslationChange() {
        return this.isolate
          ? this._onTranslationChange
          : this.store.onTranslationChange;
      }
      get onLangChange() {
        return this.isolate ? this._onLangChange : this.store.onLangChange;
      }
      get onDefaultLangChange() {
        return this.isolate
          ? this._onDefaultLangChange
          : this.store.onDefaultLangChange;
      }
      get defaultLang() {
        return this.isolate ? this._defaultLang : this.store.defaultLang;
      }
      set defaultLang(t) {
        this.isolate ? (this._defaultLang = t) : (this.store.defaultLang = t);
      }
      get currentLang() {
        return this.isolate ? this._currentLang : this.store.currentLang;
      }
      set currentLang(t) {
        this.isolate ? (this._currentLang = t) : (this.store.currentLang = t);
      }
      get langs() {
        return this.isolate ? this._langs : this.store.langs;
      }
      set langs(t) {
        this.isolate ? (this._langs = t) : (this.store.langs = t);
      }
      get translations() {
        return this.isolate ? this._translations : this.store.translations;
      }
      set translations(t) {
        this.isolate ? (this._translations = t) : (this.store.translations = t);
      }
      constructor(t, i, r, o, s, a = !0, l = !1, c = !1, u) {
        (this.store = t),
          (this.currentLoader = i),
          (this.compiler = r),
          (this.parser = o),
          (this.missingTranslationHandler = s),
          (this.useDefaultLang = a),
          (this.isolate = l),
          (this.extend = c),
          u && this.setDefaultLang(u);
      }
      setDefaultLang(t) {
        if (t === this.defaultLang) return;
        let i = this.retrieveTranslations(t);
        typeof i < "u"
          ? (this.defaultLang == null && (this.defaultLang = t),
            i.pipe(Lt(1)).subscribe(() => {
              this.changeDefaultLang(t);
            }))
          : this.changeDefaultLang(t);
      }
      getDefaultLang() {
        return this.defaultLang;
      }
      use(t) {
        if (((this.lastUseLanguage = t), t === this.currentLang))
          return J(this.translations[t]);
        this.currentLang || (this.currentLang = t);
        let i = this.retrieveTranslations(t);
        return mn(i)
          ? (i.pipe(Lt(1)).subscribe(() => {
              this.changeLang(t);
            }),
            i)
          : (this.changeLang(t), J(this.translations[t]));
      }
      changeLang(t) {
        t === this.lastUseLanguage &&
          ((this.currentLang = t),
          this.onLangChange.emit({
            lang: t,
            translations: this.translations[t],
          }),
          this.defaultLang == null && this.changeDefaultLang(t));
      }
      retrieveTranslations(t) {
        if (typeof this.translations[t] > "u" || this.extend)
          return (
            (this._translationRequests[t] =
              this._translationRequests[t] ||
              this.loadAndCompileTranslations(t)),
            this._translationRequests[t]
          );
      }
      getTranslation(t) {
        return this.loadAndCompileTranslations(t);
      }
      loadAndCompileTranslations(t) {
        this.pending = !0;
        let i = this.currentLoader.getTranslation(t).pipe(Yo(1), Lt(1));
        return (
          (this.loadingTranslations = i.pipe(
            Ce((r) => this.compiler.compileTranslations(r, t)),
            Yo(1),
            Lt(1)
          )),
          this.loadingTranslations.subscribe({
            next: (r) => {
              (this.translations[t] =
                this.extend && this.translations[t]
                  ? j(j({}, r), this.translations[t])
                  : r),
                this.updateLangs(),
                (this.pending = !1);
            },
            error: (r) => {
              this.pending = !1;
            },
          }),
          i
        );
      }
      setTranslation(t, i, r = !1) {
        let o = this.compiler.compileTranslations(i, t);
        (r || this.extend) && this.translations[t]
          ? (this.translations[t] = Gg(this.translations[t], o))
          : (this.translations[t] = o),
          this.updateLangs(),
          this.onTranslationChange.emit({
            lang: t,
            translations: this.translations[t],
          });
      }
      getLangs() {
        return this.langs;
      }
      addLangs(t) {
        t.forEach((i) => {
          this.langs.indexOf(i) === -1 && this.langs.push(i);
        });
      }
      updateLangs() {
        this.addLangs(Object.keys(this.translations));
      }
      getParsedResultForKey(t, i, r) {
        let o;
        if (
          (t && (o = this.runInterpolation(Wg(t, i), r)),
          o === void 0 &&
            this.defaultLang != null &&
            this.defaultLang !== this.currentLang &&
            this.useDefaultLang &&
            (o = this.runInterpolation(
              Wg(this.translations[this.defaultLang], i),
              r
            )),
          o === void 0)
        ) {
          let s = { key: i, translateService: this };
          typeof r < "u" && (s.interpolateParams = r),
            (o = this.missingTranslationHandler.handle(s));
        }
        return o !== void 0 ? o : i;
      }
      runInterpolation(t, i) {
        if (Kg(t)) return t.map((r) => this.runInterpolation(r, i));
        if (rl(t)) {
          let r = {};
          for (let o in t) r[o] = this.runInterpolation(t[o], i);
          return r;
        } else return this.parser.interpolate(t, i);
      }
      getParsedResult(t, i, r) {
        if (i instanceof Array) {
          let o = {},
            s = !1;
          for (let l of i)
            (o[l] = this.getParsedResultForKey(t, l, r)), (s = s || mn(o[l]));
          if (!s) return o;
          let a = i.map((l) => nl(o[l]));
          return ia(a).pipe(
            Ce((l) => {
              let c = {};
              return (
                l.forEach((u, d) => {
                  c[i[d]] = u;
                }),
                c
              );
            })
          );
        }
        return this.getParsedResultForKey(t, i, r);
      }
      get(t, i) {
        if (!Vr(t) || !t.length)
          throw new Error('Parameter "key" is required and cannot be empty');
        return this.pending
          ? this.loadingTranslations.pipe(
              Wn((r) => nl(this.getParsedResult(r, t, i)))
            )
          : nl(this.getParsedResult(this.translations[this.currentLang], t, i));
      }
      getStreamOnTranslationChange(t, i) {
        if (!Vr(t) || !t.length)
          throw new Error('Parameter "key" is required and cannot be empty');
        return _n(
          Kr(() => this.get(t, i)),
          this.onTranslationChange.pipe(
            ut((r) => {
              let o = this.getParsedResult(r.translations, t, i);
              return nl(o);
            })
          )
        );
      }
      stream(t, i) {
        if (!Vr(t) || !t.length) throw new Error('Parameter "key" required');
        return _n(
          Kr(() => this.get(t, i)),
          this.onLangChange.pipe(
            ut((r) => {
              let o = this.getParsedResult(r.translations, t, i);
              return nl(o);
            })
          )
        );
      }
      instant(t, i) {
        if (!Vr(t) || t.length === 0)
          throw new Error('Parameter "key" is required and cannot be empty');
        let r = this.getParsedResult(this.translations[this.currentLang], t, i);
        return mn(r)
          ? Array.isArray(t)
            ? t.reduce((o, s) => ((o[s] = s), o), {})
            : t
          : r;
      }
      set(t, i, r = this.currentLang) {
        pP(
          this.translations[r],
          t,
          Jg(i)
            ? this.compiler.compile(i, r)
            : this.compiler.compileTranslations(i, r)
        ),
          this.updateLangs(),
          this.onTranslationChange.emit({
            lang: r,
            translations: this.translations[r],
          });
      }
      changeDefaultLang(t) {
        (this.defaultLang = t),
          this.onDefaultLangChange.emit({
            lang: t,
            translations: this.translations[t],
          });
      }
      reloadLang(t) {
        return this.resetLang(t), this.loadAndCompileTranslations(t);
      }
      resetLang(t) {
        delete this._translationRequests[t], delete this.translations[t];
      }
      getBrowserLang() {
        if (typeof window > "u" || !window.navigator) return;
        let t = this.getBrowserCultureLang();
        return t ? t.split(/[-_]/)[0] : void 0;
      }
      getBrowserCultureLang() {
        if (!(typeof window > "u" || typeof window.navigator > "u"))
          return window.navigator.languages
            ? window.navigator.languages[0]
            : window.navigator.language ||
                window.navigator.browserLanguage ||
                window.navigator.userLanguage;
      }
      static ɵfac = function (i) {
        return new (i || e)(
          q(Ed),
          q(jr),
          q(As),
          q(Ps),
          q(il),
          q(Zg),
          q(qg),
          q(Qg),
          q(Yg)
        );
      };
      static ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
var Jt = (() => {
  class e {
    translate;
    _ref;
    value = "";
    lastKey = null;
    lastParams = [];
    onTranslationChange;
    onLangChange;
    onDefaultLangChange;
    constructor(t, i) {
      (this.translate = t), (this._ref = i);
    }
    updateValue(t, i, r) {
      let o = (s) => {
        (this.value = s !== void 0 ? s : t),
          (this.lastKey = t),
          this._ref.markForCheck();
      };
      if (r) {
        let s = this.translate.getParsedResult(r, t, i);
        mn(s) ? s.subscribe(o) : o(s);
      }
      this.translate.get(t, i).subscribe(o);
    }
    transform(t, ...i) {
      if (!t || !t.length) return t;
      if (Dd(t, this.lastKey) && Dd(i, this.lastParams)) return this.value;
      let r;
      if (Vr(i[0]) && i.length)
        if (Jg(i[0]) && i[0].length) {
          let o = i[0]
            .replace(/(')?([a-zA-Z0-9_]+)(')?(\s)?:/g, '"$2":')
            .replace(/:(\s)?(')(.*?)(')/g, ':"$3"');
          try {
            r = JSON.parse(o);
          } catch (s) {
            throw new SyntaxError(
              `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${i[0]}`
            );
          }
        } else rl(i[0]) && (r = i[0]);
      return (
        (this.lastKey = t),
        (this.lastParams = i),
        this.updateValue(t, r),
        this._dispose(),
        this.onTranslationChange ||
          (this.onTranslationChange =
            this.translate.onTranslationChange.subscribe((o) => {
              this.lastKey &&
                o.lang === this.translate.currentLang &&
                ((this.lastKey = null), this.updateValue(t, r, o.translations));
            })),
        this.onLangChange ||
          (this.onLangChange = this.translate.onLangChange.subscribe((o) => {
            this.lastKey &&
              ((this.lastKey = null), this.updateValue(t, r, o.translations));
          })),
        this.onDefaultLangChange ||
          (this.onDefaultLangChange =
            this.translate.onDefaultLangChange.subscribe(() => {
              this.lastKey && ((this.lastKey = null), this.updateValue(t, r));
            })),
        this.value
      );
    }
    _dispose() {
      typeof this.onTranslationChange < "u" &&
        (this.onTranslationChange.unsubscribe(),
        (this.onTranslationChange = void 0)),
        typeof this.onLangChange < "u" &&
          (this.onLangChange.unsubscribe(), (this.onLangChange = void 0)),
        typeof this.onDefaultLangChange < "u" &&
          (this.onDefaultLangChange.unsubscribe(),
          (this.onDefaultLangChange = void 0));
    }
    ngOnDestroy() {
      this._dispose();
    }
    static ɵfac = function (i) {
      return new (i || e)(X(tr, 16), X(jt, 16));
    };
    static ɵpipe = yi({ name: "translate", type: e, pure: !1, standalone: !0 });
    static ɵprov = G({ token: e, factory: e.ɵfac });
  }
  return e;
})();
var Md = (() => {
  class e {
    static forRoot(t = {}) {
      return {
        ngModule: e,
        providers: [
          t.loader || { provide: jr, useClass: KC },
          t.compiler || { provide: As, useClass: e1 },
          t.parser || { provide: Ps, useClass: XC },
          t.missingTranslationHandler || { provide: il, useClass: JC },
          Ed,
          { provide: qg, useValue: t.isolate },
          { provide: Zg, useValue: t.useDefaultLang },
          { provide: Qg, useValue: t.extend },
          { provide: Yg, useValue: t.defaultLanguage },
          tr,
        ],
      };
    }
    static forChild(t = {}) {
      return {
        ngModule: e,
        providers: [
          t.loader || { provide: jr, useClass: KC },
          t.compiler || { provide: As, useClass: e1 },
          t.parser || { provide: Ps, useClass: XC },
          t.missingTranslationHandler || { provide: il, useClass: JC },
          { provide: qg, useValue: t.isolate },
          { provide: Zg, useValue: t.useDefaultLang },
          { provide: Qg, useValue: t.extend },
          { provide: Yg, useValue: t.defaultLanguage },
          tr,
        ],
      };
    }
    static ɵfac = function (i) {
      return new (i || e)();
    };
    static ɵmod = et({ type: e });
    static ɵinj = Xe({});
  }
  return e;
})();
var Ti = class {
  static _dateWithHourFormat = "yyyy/MM/dd hh:mm a";
  static get DateWithHourFormat() {
    return this._dateWithHourFormat;
  }
  static _dateOnlyWithDayNameFormat = "EEEE yyyy/MM/dd";
  static get DateOnlyWithDayNameFormat() {
    return this._dateOnlyWithDayNameFormat;
  }
  static _dateOnlyFormat = "yyyy/MM/dd";
  static get DateOnlyFormat() {
    return this._dateOnlyFormat;
  }
  static _calenderDateOnlyFormat = "yyyy/MM/dd GGGGG";
  static get CalenderDateOnlyFormat() {
    return this._calenderDateOnlyFormat;
  }
  static _timeOnlyFormat = "hh:mm a";
  static get TimeOnlyFormat() {
    return this._timeOnlyFormat;
  }
  static RatingServiceAfterSumbittion = "ServiceRateAfter";
  static RatingServiceForRequest = "ServiceRequestRate";
  static FaviconUrl = "https://www.google.com/s2/favicons?sz=64&domain_url=";
  static backgroundImagesCount = 5;
  static swapImagesIndex = -1;
  static swapImagesInterval = 1e3 * 60;
  static fontFamily = "LoewNextArabic, tahoma";
  static setEnglishDateConsts() {
    (this._dateOnlyFormat = "dd/MM/yyyy"),
      (this._calenderDateOnlyFormat = "dd/MM/yyyy GGGGG"),
      (this._dateWithHourFormat = "dd/MM/yyyy hh:mm a"),
      (this._dateOnlyWithDayNameFormat = "EEEE dd/MM/yyyy"),
      (this._timeOnlyFormat = "hh:mm a");
  }
};
var Br = class {
  static ServiceImage = {
    module: "cms-service/services",
    entity: "ServiceImageAttachment",
  };
  static ServiceUserManual = {
    module: "cms-service/services",
    entity: "ServiceUserManualAttachment",
  };
  static DocumentsArAttachmentEntities = {
    module: "cms-service/documents",
    entity: "ArDocumentAttachment",
  };
  static DocumentsEnAttachmentEntities = {
    module: "cms-service/documents",
    entity: "EnDocumentAttachment",
  };
  static OffersImage = { module: "cms-service/offers", entity: "MainImage" };
  static OffersArAttachment = {
    module: "cms-service/offers",
    entity: "ArAttachmentOffer",
  };
  static OffersEnAttachment = {
    module: "cms-service/offers",
    entity: "EnAttachmentOffer",
  };
  static NewsImage = {
    module: "cms-service/news-items",
    entity: "NewsItemsImageAttachment",
  };
  static NewsArAttachment = {
    module: "cms-service/news-items",
    entity: "NewsItemsArAttachment",
  };
  static NewsEnAttachment = {
    module: "cms-service/news-items",
    entity: "NewsItemsEnAttachment",
  };
  static AdvertismentsImage = {
    module: "cms-service/advertisments",
    entity: "AdvertismentsImageAttachment",
  };
  static AdvertismentsArAttachment = {
    module: "cms-service/advertisments",
    entity: "AdvertismentsArAttachment",
  };
  static AdvertismentsEnAttachment = {
    module: "cms-service/advertisments",
    entity: "AdvertismentsEnAttachment",
  };
  static EventsImage = {
    module: "cms-service/CSTEvent",
    entity: "CSTEventsImageAttachment",
  };
  static EventsArAttachment = {
    module: "cms-service/CSTEvent",
    entity: "CSTEventsArAttachment",
  };
  static EventsEnAttachment = {
    module: "cms-service/CSTEvent",
    entity: "CSTEventsEnAttachment",
  };
  static MediaImageAttachment = {
    module: "cms-service/medias",
    entity: "MediaImageAttachment",
  };
  static MediaAttachment = {
    module: "cms-service/medias",
    entity: "MediaImageAttachment",
  };
  static AboutCSTBackgroundImage = {
    module: "cms-service/about-commission",
    entity: "AboutCSTImage",
  };
  static AboutCSTValueImage = {
    module: "cms-service/about-commission",
    entity: "AboutCSTValueImage",
  };
  static AboutCSTStrategyArImage = {
    module: "cms-service/about-commission",
    entity: "AboutCSTStrategyAr",
  };
  static AboutCSTStrategyEnImage = {
    module: "cms-service/about-commission",
    entity: "AboutCSTStrategyEn",
  };
  static AboutCSTSectorArImage = {
    module: "cms-service/about-commission",
    entity: "AboutCSTArAttachment",
  };
  static AboutCSTSectorEnImage = {
    module: "cms-service/about-commission",
    entity: "AboutCSTEnAttachment",
  };
  static UserProfileImage = {
    module: "cms-service/user-profile-images",
    entity: "ProfileImageAttachment",
  };
};
var Xg = ((t) => ((t[(t.Image = 0)] = "Image"), (t[(t.Link = 1)] = "Link"), t))(
  Xg || {}
);
var Id = class e {
  BASE_URL = "https://dev-cstgateway.starwayseg.com/api/";
  getContactUsFooter() {
    return J([
      {
        contactUsEnum: 1006,
        emails: "help@cstc.gov.sa,support@cstc.gov.sa",
        phoneNumber: null,
        url: null,
      },
      { contactUsEnum: 1005, emails: null, phoneNumber: "654356", url: null },
      { contactUsEnum: 1007, emails: null, phoneNumber: "87432,66", url: null },
      {
        contactUsEnum: 1008,
        emails: null,
        phoneNumber: null,
        url: "https://www.google.com",
      },
    ]);
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
};
var l1 = (() => {
    class e {
      constructor(t, i) {
        (this._renderer = t),
          (this._elementRef = i),
          (this.onChange = (r) => {}),
          (this.onTouched = () => {});
      }
      setProperty(t, i) {
        this._renderer.setProperty(this._elementRef.nativeElement, t, i);
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
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(Wi), X(Ct));
        };
      }
      static {
        this.ɵdir = dt({ type: e });
      }
    }
    return e;
  })(),
  c1 = (() => {
    class e extends l1 {
      static {
        this.ɵfac = (() => {
          let t;
          return function (r) {
            return (t || (t = Nn(e)))(r || e);
          };
        })();
      }
      static {
        this.ɵdir = dt({ type: e, features: [An] });
      }
    }
    return e;
  })(),
  rm = new z(""),
  mP = { provide: rm, useExisting: Ui(() => om), multi: !0 },
  om = (() => {
    class e extends c1 {
      writeValue(t) {
        this.setProperty("checked", t);
      }
      static {
        this.ɵfac = (() => {
          let t;
          return function (r) {
            return (t || (t = Nn(e)))(r || e);
          };
        })();
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [
            ["input", "type", "checkbox", "formControlName", ""],
            ["input", "type", "checkbox", "formControl", ""],
            ["input", "type", "checkbox", "ngModel", ""],
          ],
          hostBindings: function (i, r) {
            i & 1 &&
              me("change", function (s) {
                return r.onChange(s.target.checked);
              })("blur", function () {
                return r.onTouched();
              });
          },
          features: [ii([mP]), An],
        });
      }
    }
    return e;
  })(),
  _P = { provide: rm, useExisting: Ui(() => Nd), multi: !0 };
function vP() {
  let e = Di() ? Di().getUserAgent() : "";
  return /android (\d+)/.test(e.toLowerCase());
}
var yP = new z(""),
  Nd = (() => {
    class e extends l1 {
      constructor(t, i, r) {
        super(t, i),
          (this._compositionMode = r),
          (this._composing = !1),
          this._compositionMode == null && (this._compositionMode = !vP());
      }
      writeValue(t) {
        let i = t ?? "";
        this.setProperty("value", i);
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
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(Wi), X(Ct), X(yP, 8));
        };
      }
      static {
        this.ɵdir = dt({
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
          hostBindings: function (i, r) {
            i & 1 &&
              me("input", function (s) {
                return r._handleInput(s.target.value);
              })("blur", function () {
                return r.onTouched();
              })("compositionstart", function () {
                return r._compositionStart();
              })("compositionend", function (s) {
                return r._compositionEnd(s.target.value);
              });
          },
          features: [ii([_P]), An],
        });
      }
    }
    return e;
  })();
var bP = new z(""),
  CP = new z("");
function u1(e) {
  return e != null;
}
function d1(e) {
  return _o(e) ? it(e) : e;
}
function f1(e) {
  let n = {};
  return (
    e.forEach((t) => {
      n = t != null ? j(j({}, n), t) : n;
    }),
    Object.keys(n).length === 0 ? null : n
  );
}
function h1(e, n) {
  return n.map((t) => t(e));
}
function wP(e) {
  return !e.validate;
}
function p1(e) {
  return e.map((n) => (wP(n) ? n : (t) => n.validate(t)));
}
function DP(e) {
  if (!e) return null;
  let n = e.filter(u1);
  return n.length == 0
    ? null
    : function (t) {
        return f1(h1(t, n));
      };
}
function g1(e) {
  return e != null ? DP(p1(e)) : null;
}
function EP(e) {
  if (!e) return null;
  let n = e.filter(u1);
  return n.length == 0
    ? null
    : function (t) {
        let i = h1(t, n).map(d1);
        return ia(i).pipe(Ce(f1));
      };
}
function m1(e) {
  return e != null ? EP(p1(e)) : null;
}
function t1(e, n) {
  return e === null ? [n] : Array.isArray(e) ? [...e, n] : [e, n];
}
function MP(e) {
  return e._rawValidators;
}
function IP(e) {
  return e._rawAsyncValidators;
}
function em(e) {
  return e ? (Array.isArray(e) ? e : [e]) : [];
}
function Sd(e, n) {
  return Array.isArray(e) ? e.includes(n) : e === n;
}
function n1(e, n) {
  let t = em(n);
  return (
    em(e).forEach((r) => {
      Sd(t, r) || t.push(r);
    }),
    t
  );
}
function i1(e, n) {
  return em(n).filter((t) => !Sd(e, t));
}
var xd = class {
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
        (this._composedValidatorFn = g1(this._rawValidators));
    }
    _setAsyncValidators(n) {
      (this._rawAsyncValidators = n || []),
        (this._composedAsyncValidatorFn = m1(this._rawAsyncValidators));
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
      return this.control ? this.control.hasError(n, t) : !1;
    }
    getError(n, t) {
      return this.control ? this.control.getError(n, t) : null;
    }
  },
  tm = class extends xd {
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  cl = class extends xd {
    constructor() {
      super(...arguments),
        (this._parent = null),
        (this.name = null),
        (this.valueAccessor = null);
    }
  },
  nm = class {
    constructor(n) {
      this._cd = n;
    }
    get isTouched() {
      return this._cd?.control?._touched?.(), !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return this._cd?.control?._pristine?.(), !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return this._cd?.control?._status?.(), !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return this._cd?._submitted?.(), !!this._cd?.submitted;
    }
  },
  TP = {
    "[class.ng-untouched]": "isUntouched",
    "[class.ng-touched]": "isTouched",
    "[class.ng-pristine]": "isPristine",
    "[class.ng-dirty]": "isDirty",
    "[class.ng-valid]": "isValid",
    "[class.ng-invalid]": "isInvalid",
    "[class.ng-pending]": "isPending",
  },
  vz = Pe(j({}, TP), { "[class.ng-submitted]": "isSubmitted" }),
  _1 = (() => {
    class e extends nm {
      constructor(t) {
        super(t);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(cl, 2));
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [
            ["", "formControlName", ""],
            ["", "ngModel", ""],
            ["", "formControl", ""],
          ],
          hostVars: 14,
          hostBindings: function (i, r) {
            i & 2 &&
              _t("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                "ng-pristine",
                r.isPristine
              )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                "ng-invalid",
                r.isInvalid
              )("ng-pending", r.isPending);
          },
          features: [An],
        });
      }
    }
    return e;
  })();
var ol = "VALID",
  Td = "INVALID",
  Rs = "PENDING",
  sl = "DISABLED",
  Fs = class {},
  Od = class extends Fs {
    constructor(n, t) {
      super(), (this.value = n), (this.source = t);
    }
  },
  al = class extends Fs {
    constructor(n, t) {
      super(), (this.pristine = n), (this.source = t);
    }
  },
  ll = class extends Fs {
    constructor(n, t) {
      super(), (this.touched = n), (this.source = t);
    }
  },
  ks = class extends Fs {
    constructor(n, t) {
      super(), (this.status = n), (this.source = t);
    }
  };
function SP(e) {
  return (Pd(e) ? e.validators : e) || null;
}
function xP(e) {
  return Array.isArray(e) ? g1(e) : e || null;
}
function OP(e, n) {
  return (Pd(n) ? n.asyncValidators : e) || null;
}
function NP(e) {
  return Array.isArray(e) ? m1(e) : e || null;
}
function Pd(e) {
  return e != null && !Array.isArray(e) && typeof e == "object";
}
var im = class {
  constructor(n, t) {
    (this._pendingDirty = !1),
      (this._hasOwnPendingAsyncValidator = null),
      (this._pendingTouched = !1),
      (this._onCollectionChange = () => {}),
      (this._parent = null),
      (this._status = Ta(() => this.statusReactive())),
      (this.statusReactive = wa(void 0)),
      (this._pristine = Ta(() => this.pristineReactive())),
      (this.pristineReactive = wa(!0)),
      (this._touched = Ta(() => this.touchedReactive())),
      (this.touchedReactive = wa(!1)),
      (this._events = new He()),
      (this.events = this._events.asObservable()),
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
  get status() {
    return qi(this.statusReactive);
  }
  set status(n) {
    qi(() => this.statusReactive.set(n));
  }
  get valid() {
    return this.status === ol;
  }
  get invalid() {
    return this.status === Td;
  }
  get pending() {
    return this.status == Rs;
  }
  get disabled() {
    return this.status === sl;
  }
  get enabled() {
    return this.status !== sl;
  }
  get pristine() {
    return qi(this.pristineReactive);
  }
  set pristine(n) {
    qi(() => this.pristineReactive.set(n));
  }
  get dirty() {
    return !this.pristine;
  }
  get touched() {
    return qi(this.touchedReactive);
  }
  set touched(n) {
    qi(() => this.touchedReactive.set(n));
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
    this.setValidators(n1(n, this._rawValidators));
  }
  addAsyncValidators(n) {
    this.setAsyncValidators(n1(n, this._rawAsyncValidators));
  }
  removeValidators(n) {
    this.setValidators(i1(n, this._rawValidators));
  }
  removeAsyncValidators(n) {
    this.setAsyncValidators(i1(n, this._rawAsyncValidators));
  }
  hasValidator(n) {
    return Sd(this._rawValidators, n);
  }
  hasAsyncValidator(n) {
    return Sd(this._rawAsyncValidators, n);
  }
  clearValidators() {
    this.validator = null;
  }
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  markAsTouched(n = {}) {
    let t = this.touched === !1;
    this.touched = !0;
    let i = n.sourceControl ?? this;
    this._parent &&
      !n.onlySelf &&
      this._parent.markAsTouched(Pe(j({}, n), { sourceControl: i })),
      t && n.emitEvent !== !1 && this._events.next(new ll(!0, i));
  }
  markAllAsTouched(n = {}) {
    this.markAsTouched({
      onlySelf: !0,
      emitEvent: n.emitEvent,
      sourceControl: this,
    }),
      this._forEachChild((t) => t.markAllAsTouched(n));
  }
  markAsUntouched(n = {}) {
    let t = this.touched === !0;
    (this.touched = !1), (this._pendingTouched = !1);
    let i = n.sourceControl ?? this;
    this._forEachChild((r) => {
      r.markAsUntouched({
        onlySelf: !0,
        emitEvent: n.emitEvent,
        sourceControl: i,
      });
    }),
      this._parent && !n.onlySelf && this._parent._updateTouched(n, i),
      t && n.emitEvent !== !1 && this._events.next(new ll(!1, i));
  }
  markAsDirty(n = {}) {
    let t = this.pristine === !0;
    this.pristine = !1;
    let i = n.sourceControl ?? this;
    this._parent &&
      !n.onlySelf &&
      this._parent.markAsDirty(Pe(j({}, n), { sourceControl: i })),
      t && n.emitEvent !== !1 && this._events.next(new al(!1, i));
  }
  markAsPristine(n = {}) {
    let t = this.pristine === !1;
    (this.pristine = !0), (this._pendingDirty = !1);
    let i = n.sourceControl ?? this;
    this._forEachChild((r) => {
      r.markAsPristine({ onlySelf: !0, emitEvent: n.emitEvent });
    }),
      this._parent && !n.onlySelf && this._parent._updatePristine(n, i),
      t && n.emitEvent !== !1 && this._events.next(new al(!0, i));
  }
  markAsPending(n = {}) {
    this.status = Rs;
    let t = n.sourceControl ?? this;
    n.emitEvent !== !1 &&
      (this._events.next(new ks(this.status, t)),
      this.statusChanges.emit(this.status)),
      this._parent &&
        !n.onlySelf &&
        this._parent.markAsPending(Pe(j({}, n), { sourceControl: t }));
  }
  disable(n = {}) {
    let t = this._parentMarkedDirty(n.onlySelf);
    (this.status = sl),
      (this.errors = null),
      this._forEachChild((r) => {
        r.disable(Pe(j({}, n), { onlySelf: !0 }));
      }),
      this._updateValue();
    let i = n.sourceControl ?? this;
    n.emitEvent !== !1 &&
      (this._events.next(new Od(this.value, i)),
      this._events.next(new ks(this.status, i)),
      this.valueChanges.emit(this.value),
      this.statusChanges.emit(this.status)),
      this._updateAncestors(Pe(j({}, n), { skipPristineCheck: t }), this),
      this._onDisabledChange.forEach((r) => r(!0));
  }
  enable(n = {}) {
    let t = this._parentMarkedDirty(n.onlySelf);
    (this.status = ol),
      this._forEachChild((i) => {
        i.enable(Pe(j({}, n), { onlySelf: !0 }));
      }),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: n.emitEvent }),
      this._updateAncestors(Pe(j({}, n), { skipPristineCheck: t }), this),
      this._onDisabledChange.forEach((i) => i(!1));
  }
  _updateAncestors(n, t) {
    this._parent &&
      !n.onlySelf &&
      (this._parent.updateValueAndValidity(n),
      n.skipPristineCheck || this._parent._updatePristine({}, t),
      this._parent._updateTouched({}, t));
  }
  setParent(n) {
    this._parent = n;
  }
  getRawValue() {
    return this.value;
  }
  updateValueAndValidity(n = {}) {
    if ((this._setInitialStatus(), this._updateValue(), this.enabled)) {
      let i = this._cancelExistingSubscription();
      (this.errors = this._runValidator()),
        (this.status = this._calculateStatus()),
        (this.status === ol || this.status === Rs) &&
          this._runAsyncValidator(i, n.emitEvent);
    }
    let t = n.sourceControl ?? this;
    n.emitEvent !== !1 &&
      (this._events.next(new Od(this.value, t)),
      this._events.next(new ks(this.status, t)),
      this.valueChanges.emit(this.value),
      this.statusChanges.emit(this.status)),
      this._parent &&
        !n.onlySelf &&
        this._parent.updateValueAndValidity(Pe(j({}, n), { sourceControl: t }));
  }
  _updateTreeValidity(n = { emitEvent: !0 }) {
    this._forEachChild((t) => t._updateTreeValidity(n)),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: n.emitEvent });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? sl : ol;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(n, t) {
    if (this.asyncValidator) {
      (this.status = Rs),
        (this._hasOwnPendingAsyncValidator = { emitEvent: t !== !1 });
      let i = d1(this.asyncValidator(this));
      this._asyncValidationSubscription = i.subscribe((r) => {
        (this._hasOwnPendingAsyncValidator = null),
          this.setErrors(r, { emitEvent: t, shouldHaveEmitted: n });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      let n = this._hasOwnPendingAsyncValidator?.emitEvent ?? !1;
      return (this._hasOwnPendingAsyncValidator = null), n;
    }
    return !1;
  }
  setErrors(n, t = {}) {
    (this.errors = n),
      this._updateControlsErrors(t.emitEvent !== !1, this, t.shouldHaveEmitted);
  }
  get(n) {
    let t = n;
    return t == null || (Array.isArray(t) || (t = t.split(".")), t.length === 0)
      ? null
      : t.reduce((i, r) => i && i._find(r), this);
  }
  getError(n, t) {
    let i = t ? this.get(t) : this;
    return i && i.errors ? i.errors[n] : null;
  }
  hasError(n, t) {
    return !!this.getError(n, t);
  }
  get root() {
    let n = this;
    for (; n._parent; ) n = n._parent;
    return n;
  }
  _updateControlsErrors(n, t, i) {
    (this.status = this._calculateStatus()),
      n && this.statusChanges.emit(this.status),
      (n || i) && this._events.next(new ks(this.status, t)),
      this._parent && this._parent._updateControlsErrors(n, t, i);
  }
  _initObservables() {
    (this.valueChanges = new Ne()), (this.statusChanges = new Ne());
  }
  _calculateStatus() {
    return this._allControlsDisabled()
      ? sl
      : this.errors
      ? Td
      : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Rs)
      ? Rs
      : this._anyControlsHaveStatus(Td)
      ? Td
      : ol;
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
  _updatePristine(n, t) {
    let i = !this._anyControlsDirty(),
      r = this.pristine !== i;
    (this.pristine = i),
      this._parent && !n.onlySelf && this._parent._updatePristine(n, t),
      r && this._events.next(new al(this.pristine, t));
  }
  _updateTouched(n = {}, t) {
    (this.touched = this._anyControlsTouched()),
      this._events.next(new ll(this.touched, t)),
      this._parent && !n.onlySelf && this._parent._updateTouched(n, t);
  }
  _registerOnCollectionChange(n) {
    this._onCollectionChange = n;
  }
  _setUpdateStrategy(n) {
    Pd(n) && n.updateOn != null && (this._updateOn = n.updateOn);
  }
  _parentMarkedDirty(n) {
    let t = this._parent && this._parent.dirty;
    return !n && !!t && !this._parent._anyControlsDirty();
  }
  _find(n) {
    return null;
  }
  _assignValidators(n) {
    (this._rawValidators = Array.isArray(n) ? n.slice() : n),
      (this._composedValidatorFn = xP(this._rawValidators));
  }
  _assignAsyncValidators(n) {
    (this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
      (this._composedAsyncValidatorFn = NP(this._rawAsyncValidators));
  }
};
var v1 = new z("CallSetDisabledState", {
    providedIn: "root",
    factory: () => sm,
  }),
  sm = "always";
function PP(e, n) {
  return [...n.path, e];
}
function AP(e, n, t = sm) {
  kP(e, n),
    n.valueAccessor.writeValue(e.value),
    (e.disabled || t === "always") &&
      n.valueAccessor.setDisabledState?.(e.disabled),
    FP(e, n),
    VP(e, n),
    LP(e, n),
    RP(e, n);
}
function r1(e, n) {
  e.forEach((t) => {
    t.registerOnValidatorChange && t.registerOnValidatorChange(n);
  });
}
function RP(e, n) {
  if (n.valueAccessor.setDisabledState) {
    let t = (i) => {
      n.valueAccessor.setDisabledState(i);
    };
    e.registerOnDisabledChange(t),
      n._registerOnDestroy(() => {
        e._unregisterOnDisabledChange(t);
      });
  }
}
function kP(e, n) {
  let t = MP(e);
  n.validator !== null
    ? e.setValidators(t1(t, n.validator))
    : typeof t == "function" && e.setValidators([t]);
  let i = IP(e);
  n.asyncValidator !== null
    ? e.setAsyncValidators(t1(i, n.asyncValidator))
    : typeof i == "function" && e.setAsyncValidators([i]);
  let r = () => e.updateValueAndValidity();
  r1(n._rawValidators, r), r1(n._rawAsyncValidators, r);
}
function FP(e, n) {
  n.valueAccessor.registerOnChange((t) => {
    (e._pendingValue = t),
      (e._pendingChange = !0),
      (e._pendingDirty = !0),
      e.updateOn === "change" && y1(e, n);
  });
}
function LP(e, n) {
  n.valueAccessor.registerOnTouched(() => {
    (e._pendingTouched = !0),
      e.updateOn === "blur" && e._pendingChange && y1(e, n),
      e.updateOn !== "submit" && e.markAsTouched();
  });
}
function y1(e, n) {
  e._pendingDirty && e.markAsDirty(),
    e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
    n.viewToModelUpdate(e._pendingValue),
    (e._pendingChange = !1);
}
function VP(e, n) {
  let t = (i, r) => {
    n.valueAccessor.writeValue(i), r && n.viewToModelUpdate(i);
  };
  e.registerOnChange(t),
    n._registerOnDestroy(() => {
      e._unregisterOnChange(t);
    });
}
function jP(e, n) {
  if (!e.hasOwnProperty("model")) return !1;
  let t = e.model;
  return t.isFirstChange() ? !0 : !Object.is(n, t.currentValue);
}
function BP(e) {
  return Object.getPrototypeOf(e.constructor) === c1;
}
function HP(e, n) {
  if (!n) return null;
  Array.isArray(n);
  let t, i, r;
  return (
    n.forEach((o) => {
      o.constructor === Nd ? (t = o) : BP(o) ? (i = o) : (r = o);
    }),
    r || i || t || null
  );
}
function o1(e, n) {
  let t = e.indexOf(n);
  t > -1 && e.splice(t, 1);
}
function s1(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    Object.keys(e).length === 2 &&
    "value" in e &&
    "disabled" in e
  );
}
var UP = class extends im {
  constructor(n = null, t, i) {
    super(SP(t), OP(i, t)),
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
      Pd(t) &&
        (t.nonNullable || t.initialValueIsDefault) &&
        (s1(n) ? (this.defaultValue = n.value) : (this.defaultValue = n));
  }
  setValue(n, t = {}) {
    (this.value = this._pendingValue = n),
      this._onChange.length &&
        t.emitModelToViewChange !== !1 &&
        this._onChange.forEach((i) =>
          i(this.value, t.emitViewToModelChange !== !1)
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
    o1(this._onChange, n);
  }
  registerOnDisabledChange(n) {
    this._onDisabledChange.push(n);
  }
  _unregisterOnDisabledChange(n) {
    o1(this._onDisabledChange, n);
  }
  _forEachChild(n) {}
  _syncPendingControls() {
    return this.updateOn === "submit" &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(n) {
    s1(n)
      ? ((this.value = this._pendingValue = n.value),
        n.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = n);
  }
};
var $P = { provide: cl, useExisting: Ui(() => am) },
  a1 = Promise.resolve(),
  am = (() => {
    class e extends cl {
      constructor(t, i, r, o, s, a) {
        super(),
          (this._changeDetectorRef = s),
          (this.callSetDisabledState = a),
          (this.control = new UP()),
          (this._registered = !1),
          (this.name = ""),
          (this.update = new Ne()),
          (this._parent = t),
          this._setValidators(i),
          this._setAsyncValidators(r),
          (this.valueAccessor = HP(this, o));
      }
      ngOnChanges(t) {
        if ((this._checkForErrors(), !this._registered || "name" in t)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let i = t.name.previousValue;
            this.formDirective.removeControl({
              name: i,
              path: this._getPath(i),
            });
          }
          this._setUpControl();
        }
        "isDisabled" in t && this._updateDisabled(t),
          jP(t, this.viewModel) &&
            (this._updateValue(this.model), (this.viewModel = this.model));
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
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        AP(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._isStandalone() || this._checkParentType(), this._checkName();
      }
      _checkParentType() {}
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(t) {
        a1.then(() => {
          this.control.setValue(t, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(t) {
        let i = t.isDisabled.currentValue,
          r = i !== 0 && wi(i);
        a1.then(() => {
          r && !this.control.disabled
            ? this.control.disable()
            : !r && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(t) {
        return this._parent ? PP(t, this._parent) : [t];
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(
            X(tm, 9),
            X(bP, 10),
            X(CP, 10),
            X(rm, 10),
            X(jt, 8),
            X(v1, 8)
          );
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [
            ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""],
          ],
          inputs: {
            name: "name",
            isDisabled: [0, "disabled", "isDisabled"],
            model: [0, "ngModel", "model"],
            options: [0, "ngModelOptions", "options"],
          },
          outputs: { update: "ngModelChange" },
          exportAs: ["ngModel"],
          features: [ii([$P]), An, Vt],
        });
      }
    }
    return e;
  })();
var zP = (() => {
  class e {
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵmod = et({ type: e });
    }
    static {
      this.ɵinj = Xe({});
    }
  }
  return e;
})();
var b1 = (() => {
  class e {
    static withConfig(t) {
      return {
        ngModule: e,
        providers: [{ provide: v1, useValue: t.callSetDisabledState ?? sm }],
      };
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵmod = et({ type: e });
    }
    static {
      this.ɵinj = Xe({ imports: [zP] });
    }
  }
  return e;
})();
var xt = "top",
  Zt = "bottom",
  Ut = "right",
  Pt = "left",
  Ad = "auto",
  Hr = [xt, Zt, Ut, Pt],
  ir = "start",
  wo = "end",
  C1 = "clippingParents",
  Rd = "viewport",
  Ls = "popper",
  w1 = "reference",
  lm = Hr.reduce(function (e, n) {
    return e.concat([n + "-" + ir, n + "-" + wo]);
  }, []),
  kd = [].concat(Hr, [Ad]).reduce(function (e, n) {
    return e.concat([n, n + "-" + ir, n + "-" + wo]);
  }, []),
  WP = "beforeRead",
  qP = "read",
  ZP = "afterRead",
  YP = "beforeMain",
  QP = "main",
  KP = "afterMain",
  JP = "beforeWrite",
  XP = "write",
  eA = "afterWrite",
  D1 = [WP, qP, ZP, YP, QP, KP, JP, XP, eA];
function $t(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function vt(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var n = e.ownerDocument;
    return (n && n.defaultView) || window;
  }
  return e;
}
function Ln(e) {
  var n = vt(e).Element;
  return e instanceof n || e instanceof Element;
}
function At(e) {
  var n = vt(e).HTMLElement;
  return e instanceof n || e instanceof HTMLElement;
}
function Vs(e) {
  if (typeof ShadowRoot > "u") return !1;
  var n = vt(e).ShadowRoot;
  return e instanceof n || e instanceof ShadowRoot;
}
function tA(e) {
  var n = e.state;
  Object.keys(n.elements).forEach(function (t) {
    var i = n.styles[t] || {},
      r = n.attributes[t] || {},
      o = n.elements[t];
    !At(o) ||
      !$t(o) ||
      (Object.assign(o.style, i),
      Object.keys(r).forEach(function (s) {
        var a = r[s];
        a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a);
      }));
  });
}
function nA(e) {
  var n = e.state,
    t = {
      popper: {
        position: n.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(n.elements.popper.style, t.popper),
    (n.styles = t),
    n.elements.arrow && Object.assign(n.elements.arrow.style, t.arrow),
    function () {
      Object.keys(n.elements).forEach(function (i) {
        var r = n.elements[i],
          o = n.attributes[i] || {},
          s = Object.keys(n.styles.hasOwnProperty(i) ? n.styles[i] : t[i]),
          a = s.reduce(function (l, c) {
            return (l[c] = ""), l;
          }, {});
        !At(r) ||
          !$t(r) ||
          (Object.assign(r.style, a),
          Object.keys(o).forEach(function (l) {
            r.removeAttribute(l);
          }));
      });
    }
  );
}
var E1 = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: tA,
  effect: nA,
  requires: ["computeStyles"],
};
function zt(e) {
  return e.split("-")[0];
}
var ai = Math.max,
  Do = Math.min,
  rr = Math.round;
function js() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (n) {
          return n.brand + "/" + n.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function ul() {
  return !/^((?!chrome|android).)*safari/i.test(js());
}
function Vn(e, n, t) {
  n === void 0 && (n = !1), t === void 0 && (t = !1);
  var i = e.getBoundingClientRect(),
    r = 1,
    o = 1;
  n &&
    At(e) &&
    ((r = (e.offsetWidth > 0 && rr(i.width) / e.offsetWidth) || 1),
    (o = (e.offsetHeight > 0 && rr(i.height) / e.offsetHeight) || 1));
  var s = Ln(e) ? vt(e) : window,
    a = s.visualViewport,
    l = !ul() && t,
    c = (i.left + (l && a ? a.offsetLeft : 0)) / r,
    u = (i.top + (l && a ? a.offsetTop : 0)) / o,
    d = i.width / r,
    _ = i.height / o;
  return {
    width: d,
    height: _,
    top: u,
    right: c + d,
    bottom: u + _,
    left: c,
    x: c,
    y: u,
  };
}
function Eo(e) {
  var n = Vn(e),
    t = e.offsetWidth,
    i = e.offsetHeight;
  return (
    Math.abs(n.width - t) <= 1 && (t = n.width),
    Math.abs(n.height - i) <= 1 && (i = n.height),
    { x: e.offsetLeft, y: e.offsetTop, width: t, height: i }
  );
}
function dl(e, n) {
  var t = n.getRootNode && n.getRootNode();
  if (e.contains(n)) return !0;
  if (t && Vs(t)) {
    var i = n;
    do {
      if (i && e.isSameNode(i)) return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function sn(e) {
  return vt(e).getComputedStyle(e);
}
function cm(e) {
  return ["table", "td", "th"].indexOf($t(e)) >= 0;
}
function Yt(e) {
  return ((Ln(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function or(e) {
  return $t(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (Vs(e) ? e.host : null) || Yt(e);
}
function M1(e) {
  return !At(e) || sn(e).position === "fixed" ? null : e.offsetParent;
}
function iA(e) {
  var n = /firefox/i.test(js()),
    t = /Trident/i.test(js());
  if (t && At(e)) {
    var i = sn(e);
    if (i.position === "fixed") return null;
  }
  var r = or(e);
  for (Vs(r) && (r = r.host); At(r) && ["html", "body"].indexOf($t(r)) < 0; ) {
    var o = sn(r);
    if (
      o.transform !== "none" ||
      o.perspective !== "none" ||
      o.contain === "paint" ||
      ["transform", "perspective"].indexOf(o.willChange) !== -1 ||
      (n && o.willChange === "filter") ||
      (n && o.filter && o.filter !== "none")
    )
      return r;
    r = r.parentNode;
  }
  return null;
}
function li(e) {
  for (var n = vt(e), t = M1(e); t && cm(t) && sn(t).position === "static"; )
    t = M1(t);
  return t &&
    ($t(t) === "html" || ($t(t) === "body" && sn(t).position === "static"))
    ? n
    : t || iA(e) || n;
}
function Mo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Io(e, n, t) {
  return ai(e, Do(n, t));
}
function I1(e, n, t) {
  var i = Io(e, n, t);
  return i > t ? t : i;
}
function fl() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function hl(e) {
  return Object.assign({}, fl(), e);
}
function pl(e, n) {
  return n.reduce(function (t, i) {
    return (t[i] = e), t;
  }, {});
}
var rA = function (n, t) {
  return (
    (n =
      typeof n == "function"
        ? n(Object.assign({}, t.rects, { placement: t.placement }))
        : n),
    hl(typeof n != "number" ? n : pl(n, Hr))
  );
};
function oA(e) {
  var n,
    t = e.state,
    i = e.name,
    r = e.options,
    o = t.elements.arrow,
    s = t.modifiersData.popperOffsets,
    a = zt(t.placement),
    l = Mo(a),
    c = [Pt, Ut].indexOf(a) >= 0,
    u = c ? "height" : "width";
  if (!(!o || !s)) {
    var d = rA(r.padding, t),
      _ = Eo(o),
      h = l === "y" ? xt : Pt,
      D = l === "y" ? Zt : Ut,
      I =
        t.rects.reference[u] + t.rects.reference[l] - s[l] - t.rects.popper[u],
      P = s[l] - t.rects.reference[l],
      F = li(o),
      R = F ? (l === "y" ? F.clientHeight || 0 : F.clientWidth || 0) : 0,
      T = I / 2 - P / 2,
      U = d[h],
      K = R - _[u] - d[D],
      ee = R / 2 - _[u] / 2 + T,
      ce = Io(U, ee, K),
      Z = l;
    t.modifiersData[i] = ((n = {}), (n[Z] = ce), (n.centerOffset = ce - ee), n);
  }
}
function sA(e) {
  var n = e.state,
    t = e.options,
    i = t.element,
    r = i === void 0 ? "[data-popper-arrow]" : i;
  r != null &&
    ((typeof r == "string" && ((r = n.elements.popper.querySelector(r)), !r)) ||
      (dl(n.elements.popper, r) && (n.elements.arrow = r)));
}
var um = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: oA,
  effect: sA,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function jn(e) {
  return e.split("-")[1];
}
var aA = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function lA(e, n) {
  var t = e.x,
    i = e.y,
    r = n.devicePixelRatio || 1;
  return { x: rr(t * r) / r || 0, y: rr(i * r) / r || 0 };
}
function T1(e) {
  var n,
    t = e.popper,
    i = e.popperRect,
    r = e.placement,
    o = e.variation,
    s = e.offsets,
    a = e.position,
    l = e.gpuAcceleration,
    c = e.adaptive,
    u = e.roundOffsets,
    d = e.isFixed,
    _ = s.x,
    h = _ === void 0 ? 0 : _,
    D = s.y,
    I = D === void 0 ? 0 : D,
    P = typeof u == "function" ? u({ x: h, y: I }) : { x: h, y: I };
  (h = P.x), (I = P.y);
  var F = s.hasOwnProperty("x"),
    R = s.hasOwnProperty("y"),
    T = Pt,
    U = xt,
    K = window;
  if (c) {
    var ee = li(t),
      ce = "clientHeight",
      Z = "clientWidth";
    if (
      (ee === vt(t) &&
        ((ee = Yt(t)),
        sn(ee).position !== "static" &&
          a === "absolute" &&
          ((ce = "scrollHeight"), (Z = "scrollWidth"))),
      (ee = ee),
      r === xt || ((r === Pt || r === Ut) && o === wo))
    ) {
      U = Zt;
      var Ee =
        d && ee === K && K.visualViewport ? K.visualViewport.height : ee[ce];
      (I -= Ee - i.height), (I *= l ? 1 : -1);
    }
    if (r === Pt || ((r === xt || r === Zt) && o === wo)) {
      T = Ut;
      var le =
        d && ee === K && K.visualViewport ? K.visualViewport.width : ee[Z];
      (h -= le - i.width), (h *= l ? 1 : -1);
    }
  }
  var se = Object.assign({ position: a }, c && aA),
    ae = u === !0 ? lA({ x: h, y: I }, vt(t)) : { x: h, y: I };
  if (((h = ae.x), (I = ae.y), l)) {
    var fe;
    return Object.assign(
      {},
      se,
      ((fe = {}),
      (fe[U] = R ? "0" : ""),
      (fe[T] = F ? "0" : ""),
      (fe.transform =
        (K.devicePixelRatio || 1) <= 1
          ? "translate(" + h + "px, " + I + "px)"
          : "translate3d(" + h + "px, " + I + "px, 0)"),
      fe)
    );
  }
  return Object.assign(
    {},
    se,
    ((n = {}),
    (n[U] = R ? I + "px" : ""),
    (n[T] = F ? h + "px" : ""),
    (n.transform = ""),
    n)
  );
}
function cA(e) {
  var n = e.state,
    t = e.options,
    i = t.gpuAcceleration,
    r = i === void 0 ? !0 : i,
    o = t.adaptive,
    s = o === void 0 ? !0 : o,
    a = t.roundOffsets,
    l = a === void 0 ? !0 : a,
    c = {
      placement: zt(n.placement),
      variation: jn(n.placement),
      popper: n.elements.popper,
      popperRect: n.rects.popper,
      gpuAcceleration: r,
      isFixed: n.options.strategy === "fixed",
    };
  n.modifiersData.popperOffsets != null &&
    (n.styles.popper = Object.assign(
      {},
      n.styles.popper,
      T1(
        Object.assign({}, c, {
          offsets: n.modifiersData.popperOffsets,
          position: n.options.strategy,
          adaptive: s,
          roundOffsets: l,
        })
      )
    )),
    n.modifiersData.arrow != null &&
      (n.styles.arrow = Object.assign(
        {},
        n.styles.arrow,
        T1(
          Object.assign({}, c, {
            offsets: n.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l,
          })
        )
      )),
    (n.attributes.popper = Object.assign({}, n.attributes.popper, {
      "data-popper-placement": n.placement,
    }));
}
var S1 = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: cA,
  data: {},
};
var Fd = { passive: !0 };
function uA(e) {
  var n = e.state,
    t = e.instance,
    i = e.options,
    r = i.scroll,
    o = r === void 0 ? !0 : r,
    s = i.resize,
    a = s === void 0 ? !0 : s,
    l = vt(n.elements.popper),
    c = [].concat(n.scrollParents.reference, n.scrollParents.popper);
  return (
    o &&
      c.forEach(function (u) {
        u.addEventListener("scroll", t.update, Fd);
      }),
    a && l.addEventListener("resize", t.update, Fd),
    function () {
      o &&
        c.forEach(function (u) {
          u.removeEventListener("scroll", t.update, Fd);
        }),
        a && l.removeEventListener("resize", t.update, Fd);
    }
  );
}
var x1 = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: uA,
  data: {},
};
var dA = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Bs(e) {
  return e.replace(/left|right|bottom|top/g, function (n) {
    return dA[n];
  });
}
var fA = { start: "end", end: "start" };
function Ld(e) {
  return e.replace(/start|end/g, function (n) {
    return fA[n];
  });
}
function To(e) {
  var n = vt(e),
    t = n.pageXOffset,
    i = n.pageYOffset;
  return { scrollLeft: t, scrollTop: i };
}
function So(e) {
  return Vn(Yt(e)).left + To(e).scrollLeft;
}
function dm(e, n) {
  var t = vt(e),
    i = Yt(e),
    r = t.visualViewport,
    o = i.clientWidth,
    s = i.clientHeight,
    a = 0,
    l = 0;
  if (r) {
    (o = r.width), (s = r.height);
    var c = ul();
    (c || (!c && n === "fixed")) && ((a = r.offsetLeft), (l = r.offsetTop));
  }
  return { width: o, height: s, x: a + So(e), y: l };
}
function fm(e) {
  var n,
    t = Yt(e),
    i = To(e),
    r = (n = e.ownerDocument) == null ? void 0 : n.body,
    o = ai(
      t.scrollWidth,
      t.clientWidth,
      r ? r.scrollWidth : 0,
      r ? r.clientWidth : 0
    ),
    s = ai(
      t.scrollHeight,
      t.clientHeight,
      r ? r.scrollHeight : 0,
      r ? r.clientHeight : 0
    ),
    a = -i.scrollLeft + So(e),
    l = -i.scrollTop;
  return (
    sn(r || t).direction === "rtl" &&
      (a += ai(t.clientWidth, r ? r.clientWidth : 0) - o),
    { width: o, height: s, x: a, y: l }
  );
}
function xo(e) {
  var n = sn(e),
    t = n.overflow,
    i = n.overflowX,
    r = n.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + r + i);
}
function Vd(e) {
  return ["html", "body", "#document"].indexOf($t(e)) >= 0
    ? e.ownerDocument.body
    : At(e) && xo(e)
    ? e
    : Vd(or(e));
}
function Ur(e, n) {
  var t;
  n === void 0 && (n = []);
  var i = Vd(e),
    r = i === ((t = e.ownerDocument) == null ? void 0 : t.body),
    o = vt(i),
    s = r ? [o].concat(o.visualViewport || [], xo(i) ? i : []) : i,
    a = n.concat(s);
  return r ? a : a.concat(Ur(or(s)));
}
function Hs(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function hA(e, n) {
  var t = Vn(e, !1, n === "fixed");
  return (
    (t.top = t.top + e.clientTop),
    (t.left = t.left + e.clientLeft),
    (t.bottom = t.top + e.clientHeight),
    (t.right = t.left + e.clientWidth),
    (t.width = e.clientWidth),
    (t.height = e.clientHeight),
    (t.x = t.left),
    (t.y = t.top),
    t
  );
}
function O1(e, n, t) {
  return n === Rd ? Hs(dm(e, t)) : Ln(n) ? hA(n, t) : Hs(fm(Yt(e)));
}
function pA(e) {
  var n = Ur(or(e)),
    t = ["absolute", "fixed"].indexOf(sn(e).position) >= 0,
    i = t && At(e) ? li(e) : e;
  return Ln(i)
    ? n.filter(function (r) {
        return Ln(r) && dl(r, i) && $t(r) !== "body";
      })
    : [];
}
function hm(e, n, t, i) {
  var r = n === "clippingParents" ? pA(e) : [].concat(n),
    o = [].concat(r, [t]),
    s = o[0],
    a = o.reduce(function (l, c) {
      var u = O1(e, c, i);
      return (
        (l.top = ai(u.top, l.top)),
        (l.right = Do(u.right, l.right)),
        (l.bottom = Do(u.bottom, l.bottom)),
        (l.left = ai(u.left, l.left)),
        l
      );
    }, O1(e, s, i));
  return (
    (a.width = a.right - a.left),
    (a.height = a.bottom - a.top),
    (a.x = a.left),
    (a.y = a.top),
    a
  );
}
function gl(e) {
  var n = e.reference,
    t = e.element,
    i = e.placement,
    r = i ? zt(i) : null,
    o = i ? jn(i) : null,
    s = n.x + n.width / 2 - t.width / 2,
    a = n.y + n.height / 2 - t.height / 2,
    l;
  switch (r) {
    case xt:
      l = { x: s, y: n.y - t.height };
      break;
    case Zt:
      l = { x: s, y: n.y + n.height };
      break;
    case Ut:
      l = { x: n.x + n.width, y: a };
      break;
    case Pt:
      l = { x: n.x - t.width, y: a };
      break;
    default:
      l = { x: n.x, y: n.y };
  }
  var c = r ? Mo(r) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (o) {
      case ir:
        l[c] = l[c] - (n[u] / 2 - t[u] / 2);
        break;
      case wo:
        l[c] = l[c] + (n[u] / 2 - t[u] / 2);
        break;
      default:
    }
  }
  return l;
}
function $r(e, n) {
  n === void 0 && (n = {});
  var t = n,
    i = t.placement,
    r = i === void 0 ? e.placement : i,
    o = t.strategy,
    s = o === void 0 ? e.strategy : o,
    a = t.boundary,
    l = a === void 0 ? C1 : a,
    c = t.rootBoundary,
    u = c === void 0 ? Rd : c,
    d = t.elementContext,
    _ = d === void 0 ? Ls : d,
    h = t.altBoundary,
    D = h === void 0 ? !1 : h,
    I = t.padding,
    P = I === void 0 ? 0 : I,
    F = hl(typeof P != "number" ? P : pl(P, Hr)),
    R = _ === Ls ? w1 : Ls,
    T = e.rects.popper,
    U = e.elements[D ? R : _],
    K = hm(Ln(U) ? U : U.contextElement || Yt(e.elements.popper), l, u, s),
    ee = Vn(e.elements.reference),
    ce = gl({ reference: ee, element: T, strategy: "absolute", placement: r }),
    Z = Hs(Object.assign({}, T, ce)),
    Ee = _ === Ls ? Z : ee,
    le = {
      top: K.top - Ee.top + F.top,
      bottom: Ee.bottom - K.bottom + F.bottom,
      left: K.left - Ee.left + F.left,
      right: Ee.right - K.right + F.right,
    },
    se = e.modifiersData.offset;
  if (_ === Ls && se) {
    var ae = se[r];
    Object.keys(le).forEach(function (fe) {
      var ct = [Ut, Zt].indexOf(fe) >= 0 ? 1 : -1,
        ze = [xt, Zt].indexOf(fe) >= 0 ? "y" : "x";
      le[fe] += ae[ze] * ct;
    });
  }
  return le;
}
function pm(e, n) {
  n === void 0 && (n = {});
  var t = n,
    i = t.placement,
    r = t.boundary,
    o = t.rootBoundary,
    s = t.padding,
    a = t.flipVariations,
    l = t.allowedAutoPlacements,
    c = l === void 0 ? kd : l,
    u = jn(i),
    d = u
      ? a
        ? lm
        : lm.filter(function (D) {
            return jn(D) === u;
          })
      : Hr,
    _ = d.filter(function (D) {
      return c.indexOf(D) >= 0;
    });
  _.length === 0 && (_ = d);
  var h = _.reduce(function (D, I) {
    return (
      (D[I] = $r(e, { placement: I, boundary: r, rootBoundary: o, padding: s })[
        zt(I)
      ]),
      D
    );
  }, {});
  return Object.keys(h).sort(function (D, I) {
    return h[D] - h[I];
  });
}
function gA(e) {
  if (zt(e) === Ad) return [];
  var n = Bs(e);
  return [Ld(e), n, Ld(n)];
}
function mA(e) {
  var n = e.state,
    t = e.options,
    i = e.name;
  if (!n.modifiersData[i]._skip) {
    for (
      var r = t.mainAxis,
        o = r === void 0 ? !0 : r,
        s = t.altAxis,
        a = s === void 0 ? !0 : s,
        l = t.fallbackPlacements,
        c = t.padding,
        u = t.boundary,
        d = t.rootBoundary,
        _ = t.altBoundary,
        h = t.flipVariations,
        D = h === void 0 ? !0 : h,
        I = t.allowedAutoPlacements,
        P = n.options.placement,
        F = zt(P),
        R = F === P,
        T = l || (R || !D ? [Bs(P)] : gA(P)),
        U = [P].concat(T).reduce(function (Ot, yt) {
          return Ot.concat(
            zt(yt) === Ad
              ? pm(n, {
                  placement: yt,
                  boundary: u,
                  rootBoundary: d,
                  padding: c,
                  flipVariations: D,
                  allowedAutoPlacements: I,
                })
              : yt
          );
        }, []),
        K = n.rects.reference,
        ee = n.rects.popper,
        ce = new Map(),
        Z = !0,
        Ee = U[0],
        le = 0;
      le < U.length;
      le++
    ) {
      var se = U[le],
        ae = zt(se),
        fe = jn(se) === ir,
        ct = [xt, Zt].indexOf(ae) >= 0,
        ze = ct ? "width" : "height",
        _e = $r(n, {
          placement: se,
          boundary: u,
          rootBoundary: d,
          altBoundary: _,
          padding: c,
        }),
        te = ct ? (fe ? Ut : Pt) : fe ? Zt : xt;
      K[ze] > ee[ze] && (te = Bs(te));
      var y = Bs(te),
        b = [];
      if (
        (o && b.push(_e[ae] <= 0),
        a && b.push(_e[te] <= 0, _e[y] <= 0),
        b.every(function (Ot) {
          return Ot;
        }))
      ) {
        (Ee = se), (Z = !1);
        break;
      }
      ce.set(se, b);
    }
    if (Z)
      for (
        var he = D ? 3 : 1,
          ne = function (yt) {
            var wt = U.find(function (kt) {
              var H = ce.get(kt);
              if (H)
                return H.slice(0, yt).every(function (L) {
                  return L;
                });
            });
            if (wt) return (Ee = wt), "break";
          },
          We = he;
        We > 0;
        We--
      ) {
        var Oe = ne(We);
        if (Oe === "break") break;
      }
    n.placement !== Ee &&
      ((n.modifiersData[i]._skip = !0), (n.placement = Ee), (n.reset = !0));
  }
}
var gm = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: mA,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function _A(e, n, t) {
  var i = zt(e),
    r = [Pt, xt].indexOf(i) >= 0 ? -1 : 1,
    o = typeof t == "function" ? t(Object.assign({}, n, { placement: e })) : t,
    s = o[0],
    a = o[1];
  return (
    (s = s || 0),
    (a = (a || 0) * r),
    [Pt, Ut].indexOf(i) >= 0 ? { x: a, y: s } : { x: s, y: a }
  );
}
function vA(e) {
  var n = e.state,
    t = e.options,
    i = e.name,
    r = t.offset,
    o = r === void 0 ? [0, 0] : r,
    s = kd.reduce(function (u, d) {
      return (u[d] = _A(d, n.rects, o)), u;
    }, {}),
    a = s[n.placement],
    l = a.x,
    c = a.y;
  n.modifiersData.popperOffsets != null &&
    ((n.modifiersData.popperOffsets.x += l),
    (n.modifiersData.popperOffsets.y += c)),
    (n.modifiersData[i] = s);
}
var mm = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: vA,
};
function yA(e) {
  var n = e.state,
    t = e.name;
  n.modifiersData[t] = gl({
    reference: n.rects.reference,
    element: n.rects.popper,
    strategy: "absolute",
    placement: n.placement,
  });
}
var N1 = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: yA,
  data: {},
};
function _m(e) {
  return e === "x" ? "y" : "x";
}
function bA(e) {
  var n = e.state,
    t = e.options,
    i = e.name,
    r = t.mainAxis,
    o = r === void 0 ? !0 : r,
    s = t.altAxis,
    a = s === void 0 ? !1 : s,
    l = t.boundary,
    c = t.rootBoundary,
    u = t.altBoundary,
    d = t.padding,
    _ = t.tether,
    h = _ === void 0 ? !0 : _,
    D = t.tetherOffset,
    I = D === void 0 ? 0 : D,
    P = $r(n, { boundary: l, rootBoundary: c, padding: d, altBoundary: u }),
    F = zt(n.placement),
    R = jn(n.placement),
    T = !R,
    U = Mo(F),
    K = _m(U),
    ee = n.modifiersData.popperOffsets,
    ce = n.rects.reference,
    Z = n.rects.popper,
    Ee =
      typeof I == "function"
        ? I(Object.assign({}, n.rects, { placement: n.placement }))
        : I,
    le =
      typeof Ee == "number"
        ? { mainAxis: Ee, altAxis: Ee }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, Ee),
    se = n.modifiersData.offset ? n.modifiersData.offset[n.placement] : null,
    ae = { x: 0, y: 0 };
  if (ee) {
    if (o) {
      var fe,
        ct = U === "y" ? xt : Pt,
        ze = U === "y" ? Zt : Ut,
        _e = U === "y" ? "height" : "width",
        te = ee[U],
        y = te + P[ct],
        b = te - P[ze],
        he = h ? -Z[_e] / 2 : 0,
        ne = R === ir ? ce[_e] : Z[_e],
        We = R === ir ? -Z[_e] : -ce[_e],
        Oe = n.elements.arrow,
        Ot = h && Oe ? Eo(Oe) : { width: 0, height: 0 },
        yt = n.modifiersData["arrow#persistent"]
          ? n.modifiersData["arrow#persistent"].padding
          : fl(),
        wt = yt[ct],
        kt = yt[ze],
        H = Io(0, ce[_e], Ot[_e]),
        L = T
          ? ce[_e] / 2 - he - H - wt - le.mainAxis
          : ne - H - wt - le.mainAxis,
        M = T
          ? -ce[_e] / 2 + he + H + kt + le.mainAxis
          : We + H + kt + le.mainAxis,
        k = n.elements.arrow && li(n.elements.arrow),
        re = k ? (U === "y" ? k.clientTop || 0 : k.clientLeft || 0) : 0,
        ge = (fe = se?.[U]) != null ? fe : 0,
        ue = te + L - ge - re,
        Se = te + M - ge,
        De = Io(h ? Do(y, ue) : y, te, h ? ai(b, Se) : b);
      (ee[U] = De), (ae[U] = De - te);
    }
    if (a) {
      var xe,
        qe = U === "x" ? xt : Pt,
        Ze = U === "x" ? Zt : Ut,
        Be = ee[K],
        Ft = K === "y" ? "height" : "width",
        In = Be + P[qe],
        Ni = Be - P[Ze],
        Un = [xt, Pt].indexOf(F) !== -1,
        fr = (xe = se?.[K]) != null ? xe : 0,
        hr = Un ? In : Be - ce[Ft] - Z[Ft] - fr + le.altAxis,
        Gr = Un ? Be + ce[Ft] + Z[Ft] - fr - le.altAxis : Ni,
        $n = h && Un ? I1(hr, Be, Gr) : Io(h ? hr : In, Be, h ? Gr : Ni);
      (ee[K] = $n), (ae[K] = $n - Be);
    }
    n.modifiersData[i] = ae;
  }
}
var vm = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: bA,
  requiresIfExists: ["offset"],
};
function ym(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function bm(e) {
  return e === vt(e) || !At(e) ? To(e) : ym(e);
}
function CA(e) {
  var n = e.getBoundingClientRect(),
    t = rr(n.width) / e.offsetWidth || 1,
    i = rr(n.height) / e.offsetHeight || 1;
  return t !== 1 || i !== 1;
}
function Cm(e, n, t) {
  t === void 0 && (t = !1);
  var i = At(n),
    r = At(n) && CA(n),
    o = Yt(n),
    s = Vn(e, r, t),
    a = { scrollLeft: 0, scrollTop: 0 },
    l = { x: 0, y: 0 };
  return (
    (i || (!i && !t)) &&
      (($t(n) !== "body" || xo(o)) && (a = bm(n)),
      At(n)
        ? ((l = Vn(n, !0)), (l.x += n.clientLeft), (l.y += n.clientTop))
        : o && (l.x = So(o))),
    {
      x: s.left + a.scrollLeft - l.x,
      y: s.top + a.scrollTop - l.y,
      width: s.width,
      height: s.height,
    }
  );
}
function wA(e) {
  var n = new Map(),
    t = new Set(),
    i = [];
  e.forEach(function (o) {
    n.set(o.name, o);
  });
  function r(o) {
    t.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function (a) {
      if (!t.has(a)) {
        var l = n.get(a);
        l && r(l);
      }
    }),
      i.push(o);
  }
  return (
    e.forEach(function (o) {
      t.has(o.name) || r(o);
    }),
    i
  );
}
function wm(e) {
  var n = wA(e);
  return D1.reduce(function (t, i) {
    return t.concat(
      n.filter(function (r) {
        return r.phase === i;
      })
    );
  }, []);
}
function Dm(e) {
  var n;
  return function () {
    return (
      n ||
        (n = new Promise(function (t) {
          Promise.resolve().then(function () {
            (n = void 0), t(e());
          });
        })),
      n
    );
  };
}
function Em(e) {
  var n = e.reduce(function (t, i) {
    var r = t[i.name];
    return (
      (t[i.name] = r
        ? Object.assign({}, r, i, {
            options: Object.assign({}, r.options, i.options),
            data: Object.assign({}, r.data, i.data),
          })
        : i),
      t
    );
  }, {});
  return Object.keys(n).map(function (t) {
    return n[t];
  });
}
var P1 = { placement: "bottom", modifiers: [], strategy: "absolute" };
function A1() {
  for (var e = arguments.length, n = new Array(e), t = 0; t < e; t++)
    n[t] = arguments[t];
  return !n.some(function (i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function R1(e) {
  e === void 0 && (e = {});
  var n = e,
    t = n.defaultModifiers,
    i = t === void 0 ? [] : t,
    r = n.defaultOptions,
    o = r === void 0 ? P1 : r;
  return function (a, l, c) {
    c === void 0 && (c = o);
    var u = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, P1, o),
        modifiersData: {},
        elements: { reference: a, popper: l },
        attributes: {},
        styles: {},
      },
      d = [],
      _ = !1,
      h = {
        state: u,
        setOptions: function (F) {
          var R = typeof F == "function" ? F(u.options) : F;
          I(),
            (u.options = Object.assign({}, o, u.options, R)),
            (u.scrollParents = {
              reference: Ln(a)
                ? Ur(a)
                : a.contextElement
                ? Ur(a.contextElement)
                : [],
              popper: Ur(l),
            });
          var T = wm(Em([].concat(i, u.options.modifiers)));
          return (
            (u.orderedModifiers = T.filter(function (U) {
              return U.enabled;
            })),
            D(),
            h.update()
          );
        },
        forceUpdate: function () {
          if (!_) {
            var F = u.elements,
              R = F.reference,
              T = F.popper;
            if (A1(R, T)) {
              (u.rects = {
                reference: Cm(R, li(T), u.options.strategy === "fixed"),
                popper: Eo(T),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function (le) {
                  return (u.modifiersData[le.name] = Object.assign(
                    {},
                    le.data
                  ));
                });
              for (var U = 0; U < u.orderedModifiers.length; U++) {
                if (u.reset === !0) {
                  (u.reset = !1), (U = -1);
                  continue;
                }
                var K = u.orderedModifiers[U],
                  ee = K.fn,
                  ce = K.options,
                  Z = ce === void 0 ? {} : ce,
                  Ee = K.name;
                typeof ee == "function" &&
                  (u =
                    ee({ state: u, options: Z, name: Ee, instance: h }) || u);
              }
            }
          }
        },
        update: Dm(function () {
          return new Promise(function (P) {
            h.forceUpdate(), P(u);
          });
        }),
        destroy: function () {
          I(), (_ = !0);
        },
      };
    if (!A1(a, l)) return h;
    h.setOptions(c).then(function (P) {
      !_ && c.onFirstUpdate && c.onFirstUpdate(P);
    });
    function D() {
      u.orderedModifiers.forEach(function (P) {
        var F = P.name,
          R = P.options,
          T = R === void 0 ? {} : R,
          U = P.effect;
        if (typeof U == "function") {
          var K = U({ state: u, name: F, instance: h, options: T }),
            ee = function () {};
          d.push(K || ee);
        }
      });
    }
    function I() {
      d.forEach(function (P) {
        return P();
      }),
        (d = []);
    }
    return h;
  };
}
var DA = [x1, N1, S1, E1],
  Mm = R1({ defaultModifiers: DA });
var IA = ["*"];
var j1 = { animation: !0, transitionTimerDelayMs: 5 },
  TA = (() => {
    class e {
      constructor() {
        this.animation = j1.animation;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function SA(e) {
  let { transitionDelay: n, transitionDuration: t } =
      window.getComputedStyle(e),
    i = parseFloat(n),
    r = parseFloat(t);
  return (i + r) * 1e3;
}
function xA(e) {
  return typeof e == "string";
}
function OA(e, n) {
  return !n || typeof e.closest > "u" ? null : e.closest(n);
}
function NA(e) {
  return (n) =>
    new Me((t) => {
      let i = (s) => e.run(() => t.next(s)),
        r = (s) => e.run(() => t.error(s)),
        o = () => e.run(() => t.complete());
      return n.subscribe({ next: i, error: r, complete: o });
    });
}
var PA = () => {},
  { transitionTimerDelayMs: AA } = j1,
  jd = new Map(),
  k1 = (e, n, t, i) => {
    let r = i.context || {},
      o = jd.get(n);
    if (o)
      switch (i.runningTransition) {
        case "continue":
          return Wt;
        case "stop":
          e.run(() => o.transition$.complete()),
            (r = Object.assign(o.context, r)),
            jd.delete(n);
      }
    let s = t(n, i.animation, r) || PA;
    if (
      !i.animation ||
      window.getComputedStyle(n).transitionProperty === "none"
    )
      return e.run(() => s()), J(void 0).pipe(NA(e));
    let a = new He(),
      l = new He(),
      c = a.pipe(Sf(!0));
    jd.set(n, {
      transition$: a,
      complete: () => {
        l.next(), l.complete();
      },
      context: r,
    });
    let u = SA(n);
    return (
      e.runOutsideAngular(() => {
        let d = Gn(n, "transitionend").pipe(
            Xt(c),
            It(({ target: h }) => h === n)
          ),
          _ = Fi(u + AA).pipe(Xt(c));
        dc(_, d, l)
          .pipe(Xt(c))
          .subscribe(() => {
            jd.delete(n),
              e.run(() => {
                s(), a.next(), a.complete();
              });
          });
      }),
      a.asObservable()
    );
  };
var Bd = (e, n) => (n ? n.some((t) => t.contains(e)) : !1),
  F1 = (e, n) => !n || OA(e, n) != null,
  RA = (() => {
    let e = () =>
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2),
      n = () => /Android/.test(navigator.userAgent);
    return typeof navigator < "u" ? !!navigator.userAgent && (e() || n()) : !1;
  })(),
  kA = (e) => (RA ? () => setTimeout(() => e(), 100) : e);
function FA(e, n, t, i, r, o, s, a) {
  t &&
    e.runOutsideAngular(
      kA(() => {
        let l = (_) => {
            let h = _.target;
            return _.button === 2 || Bd(h, s)
              ? !1
              : t === "inside"
              ? Bd(h, o) && F1(h, a)
              : t === "outside"
              ? !Bd(h, o)
              : F1(h, a) || !Bd(h, o);
          },
          c = Gn(n, "keydown").pipe(
            Xt(r),
            It((_) => _.key === "Escape"),
            Dt((_) => _.preventDefault())
          ),
          u = Gn(n, "mousedown").pipe(Ce(l), Xt(r)),
          d = Gn(n, "mouseup").pipe(
            Af(u),
            It(([_, h]) => h),
            Tf(0),
            Xt(r)
          );
        dc([c.pipe(Ce((_) => 0)), d.pipe(Ce((_) => 1))]).subscribe((_) =>
          e.run(() => i(_))
        );
      })
    );
}
var $6 = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");
var LA = (() => {
    class e {
      constructor() {
        this._element = O(ht).documentElement;
      }
      isRTL() {
        return (
          (this._element.getAttribute("dir") || "").toLowerCase() === "rtl"
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  VA = /\s+/,
  jA = /  +/gi,
  BA = {
    top: ["top"],
    bottom: ["bottom"],
    start: ["left", "right"],
    left: ["left"],
    end: ["right", "left"],
    right: ["right"],
    "top-start": ["top-start", "top-end"],
    "top-left": ["top-start"],
    "top-end": ["top-end", "top-start"],
    "top-right": ["top-end"],
    "bottom-start": ["bottom-start", "bottom-end"],
    "bottom-left": ["bottom-start"],
    "bottom-end": ["bottom-end", "bottom-start"],
    "bottom-right": ["bottom-end"],
    "start-top": ["left-start", "right-start"],
    "left-top": ["left-start"],
    "start-bottom": ["left-end", "right-end"],
    "left-bottom": ["left-end"],
    "end-top": ["right-start", "left-start"],
    "right-top": ["right-start"],
    "end-bottom": ["right-end", "left-end"],
    "right-bottom": ["right-end"],
  };
function HA(e, n) {
  let [t, i] = BA[e];
  return (n && i) || t;
}
var UA = /^left/,
  $A = /^right/,
  zA = /^start/,
  GA = /^end/;
function WA(e, n) {
  let [t, i] = n.split("-"),
    r = t.replace(UA, "start").replace($A, "end"),
    o = [r];
  if (i) {
    let s = i;
    (t === "left" || t === "right") &&
      (s = s.replace(zA, "top").replace(GA, "bottom")),
      o.push(`${r}-${s}`);
  }
  return e && (o = o.map((s) => `${e}-${s}`)), o.join(" ");
}
function L1({ placement: e, baseClass: n }, t) {
  let i = Array.isArray(e) ? e : e.split(VA),
    r = [
      "top",
      "bottom",
      "start",
      "end",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
      "start-top",
      "start-bottom",
      "end-top",
      "end-bottom",
    ],
    o = i.findIndex((c) => c === "auto");
  o >= 0 &&
    r.forEach(function (c) {
      i.find((u) => u.search("^" + c) !== -1) == null && i.splice(o++, 1, c);
    });
  let s = i.map((c) => HA(c, t.isRTL()));
  return {
    placement: s.shift(),
    modifiers: [
      {
        name: "bootstrapClasses",
        enabled: !!n,
        phase: "write",
        fn({ state: c }) {
          let u = new RegExp(n + "(-[a-z]+)*", "gi"),
            d = c.elements.popper,
            _ = c.placement,
            h = d.className;
          (h = h.replace(u, "")),
            (h += ` ${WA(n, _)}`),
            (h = h.trim().replace(jA, " ")),
            (d.className = h);
        },
      },
      gm,
      vm,
      um,
      { enabled: !0, name: "flip", options: { fallbackPlacements: s } },
      {
        enabled: !0,
        name: "preventOverflow",
        phase: "main",
        fn: function () {},
      },
    ],
  };
}
function V1(e) {
  return e;
}
function qA() {
  let e = O(LA),
    n = null;
  return {
    createPopper(t) {
      if (!n) {
        let r = (t.updatePopperOptions || V1)(L1(t, e));
        n = Mm(t.hostElement, t.targetElement, r);
      }
    },
    update() {
      n && n.update();
    },
    setOptions(t) {
      if (n) {
        let r = (t.updatePopperOptions || V1)(L1(t, e));
        n.setOptions(r);
      }
    },
    destroy() {
      n && (n.destroy(), (n = null));
    },
  };
}
function ZA(e) {
  return (n) => (
    n.modifiers.push(mm, { name: "offset", options: { offset: () => e } }), n
  );
}
var z6 = new Date(1882, 10, 12),
  G6 = new Date(2174, 10, 25);
var W6 = 1e3 * 60 * 60 * 24;
var Tm = 1080,
  YA = 24 * Tm,
  QA = 12 * Tm + 793,
  q6 = 29 * YA + QA,
  Z6 = 11 * Tm + 204;
var ml = class {
    constructor(n, t, i) {
      (this.nodes = n), (this.viewRef = t), (this.componentRef = i);
    }
  },
  Im = class {
    constructor(n) {
      (this._componentType = n),
        (this._windowRef = null),
        (this._contentRef = null),
        (this._document = O(ht)),
        (this._applicationRef = O(hn)),
        (this._injector = O(mt)),
        (this._viewContainerRef = O(bn)),
        (this._ngZone = O(Re));
    }
    open(n, t, i = !1) {
      this._windowRef ||
        ((this._contentRef = this._getContentRef(n, t)),
        (this._windowRef = this._viewContainerRef.createComponent(
          this._componentType,
          { injector: this._injector, projectableNodes: this._contentRef.nodes }
        )));
      let { nativeElement: r } = this._windowRef.location,
        o = new He();
      ho(
        () => {
          o.next(), o.complete();
        },
        { injector: this._injector, phase: Li.MixedReadWrite }
      );
      let s = o.pipe(
        at(() =>
          k1(this._ngZone, r, ({ classList: a }) => a.add("show"), {
            animation: i,
            runningTransition: "continue",
          })
        )
      );
      return { windowRef: this._windowRef, transition$: s };
    }
    close(n = !1) {
      return this._windowRef
        ? k1(
            this._ngZone,
            this._windowRef.location.nativeElement,
            ({ classList: t }) => t.remove("show"),
            { animation: n, runningTransition: "stop" }
          ).pipe(
            Dt(() => {
              this._windowRef?.destroy(),
                this._contentRef?.viewRef?.destroy(),
                (this._windowRef = null),
                (this._contentRef = null);
            })
          )
        : J(void 0);
    }
    _getContentRef(n, t) {
      if (n)
        if (n instanceof Kn) {
          let i = n.createEmbeddedView(t);
          return this._applicationRef.attachView(i), new ml([i.rootNodes], i);
        } else return new ml([[this._document.createTextNode(`${n}`)]]);
      else return new ml([]);
    }
  };
var KA = {
  hover: ["mouseenter", "mouseleave"],
  focus: ["focusin", "focusout"],
};
function JA(e) {
  let n = (e || "").trim();
  if (n.length === 0) return [];
  let t = n
      .split(/\s+/)
      .map((r) => r.split(":"))
      .map((r) => KA[r[0]] || r),
    i = t.filter((r) => r.includes("manual"));
  if (i.length > 1)
    throw "Triggers parse error: only one manual trigger is allowed";
  if (i.length === 1 && t.length > 1)
    throw "Triggers parse error: manual trigger can't be mixed with other triggers";
  return i.length ? [] : t;
}
function XA(e, n, t, i, r, o = 0, s = 0) {
  let a = JA(n);
  if (a.length === 0) return () => {};
  let l = new Set(),
    c = [],
    u;
  function d(h, D) {
    e.addEventListener(h, D), c.push(() => e.removeEventListener(h, D));
  }
  function _(h, D) {
    clearTimeout(u), D > 0 ? (u = setTimeout(h, D)) : h();
  }
  for (let [h, D] of a)
    D
      ? (d(h, () => {
          l.add(h), _(() => l.size > 0 && i(), o);
        }),
        d(D, () => {
          l.delete(h), _(() => l.size === 0 && r(), s);
        }))
      : d(h, () => (t() ? _(r, s) : _(i, o)));
  return () => c.forEach((h) => h());
}
var eR = (() => {
    class e {
      constructor() {
        (this._ngbConfig = O(TA)),
          (this.autoClose = !0),
          (this.placement = "auto"),
          (this.popperOptions = (t) => t),
          (this.triggers = "hover focus"),
          (this.disableTooltip = !1),
          (this.openDelay = 0),
          (this.closeDelay = 0);
      }
      get animation() {
        return this._animation ?? this._ngbConfig.animation;
      }
      set animation(t) {
        this._animation = t;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  tR = 0,
  nR = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵcmp = ot({
          type: e,
          selectors: [["ngb-tooltip-window"]],
          hostAttrs: ["role", "tooltip"],
          hostVars: 5,
          hostBindings: function (i, r) {
            i & 2 &&
              (xp("id", r.id),
              wu("tooltip" + (r.tooltipClass ? " " + r.tooltipClass : "")),
              _t("fade", r.animation));
          },
          inputs: {
            animation: "animation",
            id: "id",
            tooltipClass: "tooltipClass",
          },
          standalone: !0,
          features: [mo],
          ngContentSelectors: IA,
          decls: 3,
          vars: 0,
          consts: [
            ["data-popper-arrow", "", 1, "tooltip-arrow"],
            [1, "tooltip-inner"],
          ],
          template: function (i, r) {
            i & 1 && (Jn(), Y(0, "div", 0), g(1, "div", 1), Xn(2), m());
          },
          styles: [
            `ngb-tooltip-window{pointer-events:none;position:absolute}ngb-tooltip-window .tooltip-inner{pointer-events:auto}ngb-tooltip-window.bs-tooltip-top,ngb-tooltip-window.bs-tooltip-bottom{padding-left:0;padding-right:0}ngb-tooltip-window.bs-tooltip-start,ngb-tooltip-window.bs-tooltip-end{padding-top:0;padding-bottom:0}
`,
          ],
          encapsulation: 2,
          changeDetection: 0,
        });
      }
    }
    return e;
  })(),
  Us = (() => {
    class e {
      constructor() {
        (this._config = O(eR)),
          (this.animation = this._config.animation),
          (this.autoClose = this._config.autoClose),
          (this.placement = this._config.placement),
          (this.popperOptions = this._config.popperOptions),
          (this.triggers = this._config.triggers),
          (this.container = this._config.container),
          (this.disableTooltip = this._config.disableTooltip),
          (this.tooltipClass = this._config.tooltipClass),
          (this.openDelay = this._config.openDelay),
          (this.closeDelay = this._config.closeDelay),
          (this.shown = new Ne()),
          (this.hidden = new Ne()),
          (this._nativeElement = O(Ct).nativeElement),
          (this._ngZone = O(Re)),
          (this._document = O(ht)),
          (this._changeDetector = O(jt)),
          (this._injector = O(mt)),
          (this._ngbTooltipWindowId = `ngb-tooltip-${tR++}`),
          (this._popupService = new Im(nR)),
          (this._windowRef = null),
          (this._positioning = qA());
      }
      set ngbTooltip(t) {
        (this._ngbTooltip = t), !t && this._windowRef && this.close();
      }
      get ngbTooltip() {
        return this._ngbTooltip;
      }
      open(t) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
          let { windowRef: i, transition$: r } = this._popupService.open(
            this._ngbTooltip,
            t ?? this.tooltipContext,
            this.animation
          );
          (this._windowRef = i),
            this._windowRef.setInput("animation", this.animation),
            this._windowRef.setInput("tooltipClass", this.tooltipClass),
            this._windowRef.setInput("id", this._ngbTooltipWindowId),
            this._getPositionTargetElement().setAttribute(
              "aria-describedby",
              this._ngbTooltipWindowId
            ),
            this.container === "body" &&
              this._document.body.appendChild(
                this._windowRef.location.nativeElement
              ),
            this._windowRef.changeDetectorRef.detectChanges(),
            this._windowRef.changeDetectorRef.markForCheck(),
            this._ngZone.runOutsideAngular(() => {
              this._positioning.createPopper({
                hostElement: this._getPositionTargetElement(),
                targetElement: this._windowRef.location.nativeElement,
                placement: this.placement,
                baseClass: "bs-tooltip",
                updatePopperOptions: (o) => this.popperOptions(ZA([0, 6])(o)),
              }),
                Promise.resolve().then(() => {
                  this._positioning.update();
                }),
                (this._afterRenderRef = Sp(
                  () => {
                    this._positioning.update();
                  },
                  { phase: Li.MixedReadWrite, injector: this._injector }
                ));
            }),
            FA(
              this._ngZone,
              this._document,
              this.autoClose,
              () => this.close(),
              this.hidden,
              [this._windowRef.location.nativeElement],
              [this._nativeElement]
            ),
            r.subscribe(() => this.shown.emit());
        }
      }
      close(t = this.animation) {
        this._windowRef != null &&
          (this._getPositionTargetElement().removeAttribute("aria-describedby"),
          this._popupService.close(t).subscribe(() => {
            (this._windowRef = null),
              this._positioning.destroy(),
              this._afterRenderRef?.destroy(),
              this.hidden.emit(),
              this._changeDetector.markForCheck();
          }));
      }
      toggle() {
        this._windowRef ? this.close() : this.open();
      }
      isOpen() {
        return this._windowRef != null;
      }
      ngOnInit() {
        this._unregisterListenersFn = XA(
          this._nativeElement,
          this.triggers,
          this.isOpen.bind(this),
          this.open.bind(this),
          this.close.bind(this),
          +this.openDelay,
          +this.closeDelay
        );
      }
      ngOnChanges({ tooltipClass: t }) {
        t &&
          this.isOpen() &&
          this._windowRef.setInput("tooltipClass", t.currentValue);
      }
      ngOnDestroy() {
        this.close(!1), this._unregisterListenersFn?.();
      }
      _getPositionTargetElement() {
        return (
          (xA(this.positionTarget)
            ? this._document.querySelector(this.positionTarget)
            : this.positionTarget) || this._nativeElement
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [["", "ngbTooltip", ""]],
          inputs: {
            animation: "animation",
            autoClose: "autoClose",
            placement: "placement",
            popperOptions: "popperOptions",
            triggers: "triggers",
            positionTarget: "positionTarget",
            container: "container",
            disableTooltip: "disableTooltip",
            tooltipClass: "tooltipClass",
            tooltipContext: "tooltipContext",
            openDelay: "openDelay",
            closeDelay: "closeDelay",
            ngbTooltip: "ngbTooltip",
          },
          outputs: { shown: "shown", hidden: "hidden" },
          exportAs: ["ngbTooltip"],
          standalone: !0,
          features: [Vt],
        });
      }
    }
    return e;
  })(),
  B1 = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵmod = et({ type: e });
      }
      static {
        this.ɵinj = Xe({});
      }
    }
    return e;
  })();
var Y6 = new z("live announcer delay", {
  providedIn: "root",
  factory: () => 100,
});
function iR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 13)(1, "span", 8),
      Y(2, "i", 14),
      m(),
      g(3, "div", 10)(4, "span", 5),
      E(5),
      m(),
      g(6, "div", 15)(7, "span"),
      E(8),
      m(),
      g(9, "span", 16),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(r.copyTextToClipboard(r.support));
      }),
      E(10),
      m()()()();
  }
  if (e & 2) {
    let t = W();
    f(5),
      de("CMSService::Footer:Support"),
      f(3),
      B(" ext: ", t.code, " "),
      f(),
      Tt("ngbTooltip", "::Copy"),
      f(),
      B(" ", t.support, " ");
  }
}
function rR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "span", 19),
      me("click", function () {
        ve(t);
        let r = W(3);
        return ye(r.copyTextToClipboard(r.phone[0]));
      }),
      E(1),
      m();
  }
  if (e & 2) {
    let t = W(3);
    Tt("ngbTooltip", "::Copy"), f(), B(" ", t.phone[0], " ");
  }
}
function oR(e, n) {
  e & 1 && (g(0, "span"), E(1, "/"), m());
}
function sR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "span", 19),
      me("click", function () {
        ve(t);
        let r = W(3);
        return ye(r.copyTextToClipboard(r.phone[1]));
      }),
      ie(1, oR, 2, 0, "span", 20),
      E(2),
      m();
  }
  if (e & 2) {
    let t = W(3);
    Tt("ngbTooltip", "::Copy"),
      f(),
      x("ngIf", t.phone[1]),
      f(),
      B(" ", t.phone[1], " ");
  }
}
function aR(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 11),
      ie(1, rR, 2, 2, "span", 18)(2, sR, 3, 3, "span", 18),
      m()),
    e & 2)
  ) {
    let t = W(2);
    f(), x("ngIf", t.phone[0]), f(), x("ngIf", t.phone[1]);
  }
}
function lR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 11)(1, "span", 19),
      me("click", function () {
        ve(t);
        let r = W(3);
        return ye(r.copyTextToClipboard(r.phone));
      }),
      E(2),
      m()();
  }
  if (e & 2) {
    let t = W(3);
    f(), Tt("ngbTooltip", "::Copy"), f(), B(" ", t.phone, " ");
  }
}
function cR(e, n) {
  if ((e & 1 && ie(0, lR, 3, 2, "div", 21), e & 2)) {
    let t = W(2);
    x("ngIf", t.phone);
  }
}
function uR(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 13)(1, "span", 8),
      Y(2, "i", 14),
      m(),
      g(3, "div", 10)(4, "span", 5),
      E(5),
      m(),
      ie(6, aR, 3, 2, "div", 17)(7, cR, 1, 1, "ng-template", null, 0, wn),
      m()()),
    e & 2)
  ) {
    let t = ni(8),
      i = W();
    f(5),
      de("CMSService::Footer:Phone"),
      f(),
      x("ngIf", i.isMultiplePhones)("ngIfElse", t);
  }
}
function dR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "span", 25),
      me("click", function () {
        ve(t);
        let r = W(3);
        return ye(r.copyTextToClipboard(r.email[0]));
      }),
      E(1),
      m();
  }
  if (e & 2) {
    let t = W(3);
    Tt("ngbTooltip", "::Copy"), f(), B(" ", t.email[0], " ");
  }
}
function fR(e, n) {
  e & 1 && (g(0, "span", 26), E(1, "/"), m());
}
function hR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "span", 25),
      me("click", function () {
        ve(t);
        let r = W(3);
        return ye(r.copyTextToClipboard(r.email[1]));
      }),
      E(1),
      m();
  }
  if (e & 2) {
    let t = W(3);
    Tt("ngbTooltip", "::Copy"), f(), B(" ", t.email[1], " ");
  }
}
function pR(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 11),
      ie(1, dR, 2, 2, "span", 23)(2, fR, 2, 0, "span", 24)(
        3,
        hR,
        2,
        2,
        "span",
        23
      ),
      m()),
    e & 2)
  ) {
    let t = W(2);
    f(),
      x("ngIf", t.email[0]),
      f(),
      x("ngIf", t.email[1]),
      f(),
      x("ngIf", t.email[1]);
  }
}
function gR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "span", 19),
      me("click", function () {
        ve(t);
        let r = W(3);
        return ye(r.copyTextToClipboard(r.email));
      }),
      E(1),
      m();
  }
  if (e & 2) {
    let t = W(3);
    Tt("ngbTooltip", "::Copy"), f(), B(" ", t.email, " ");
  }
}
function mR(e, n) {
  if ((e & 1 && (g(0, "div", 11), ie(1, gR, 2, 2, "span", 18), m()), e & 2)) {
    let t = W(2);
    f(), x("ngIf", t.email);
  }
}
function _R(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 13)(1, "span", 8),
      Y(2, "i", 22),
      m(),
      g(3, "div", 10)(4, "span", 5),
      E(5),
      m(),
      ie(6, pR, 4, 3, "div", 17)(7, mR, 2, 1, "ng-template", null, 1, wn),
      m()()),
    e & 2)
  ) {
    let t = ni(8),
      i = W();
    f(5),
      de("CMSService::Footer:Email"),
      f(),
      x("ngIf", i.isMultipleEmails)("ngIfElse", t);
  }
}
var _l = class e {
  constructor(n) {
    this._FooterService = n;
    console.log("From footer!!!!!!!!!");
  }
  url;
  email;
  isMultipleEmails;
  isMultiplePhones;
  phone;
  support;
  code;
  data;
  ngOnInit() {
    this._getSupportDetails();
  }
  _getSupportDetails() {
    this._FooterService.getContactUsFooter().subscribe((n) => {
      (this.data = n),
        (this.url = this.data.find((r) => r.contactUsEnum === 1008)?.url);
      let t = this.data.find((r) => r.contactUsEnum === 1006)?.emails;
      t.includes(",")
        ? ((this.isMultipleEmails = !0), (this.email = t.split(",")))
        : ((this.isMultipleEmails = !1), (this.email = t));
      let i = this.data.find((r) => r.contactUsEnum === 1005).phoneNumber;
      i.includes(",")
        ? ((this.isMultiplePhones = !0), (this.phone = i.split(",")))
        : ((this.isMultiplePhones = !1), (this.phone = i)),
        (this.support = this.data
          .find((r) => r.contactUsEnum === 1007)
          .phoneNumber.split(",")[0]),
        (this.code = this.data
          .find((r) => r.contactUsEnum === 1007)
          .phoneNumber.split(",")[1]);
    });
  }
  openUrl() {
    this.url && window.open(this.url);
  }
  copyTextToClipboard(n) {
    let t = n?.length ? n.join(",") : n;
    t != null && t != "";
  }
  static ɵfac = function (t) {
    return new (t || e)(X(Id));
  };
  static ɵcmp = ot({
    type: e,
    selectors: [["app-cst-footer"]],
    decls: 18,
    vars: 11,
    consts: [
      ["noPhones", ""],
      ["noEmails", ""],
      [1, "card", "mb-0"],
      [1, "card-body"],
      [1, "contact"],
      [1, "title"],
      [1, "contact-details"],
      [1, "support", "request", 3, "click", "ngbTooltip"],
      [1, "icon"],
      [1, "icon-support"],
      [1, "details"],
      [1, "name"],
      ["class", "support", 4, "ngIf"],
      [1, "support"],
      [1, "icon-phone"],
      [1, "suuport-code"],
      ["container", "body", 1, "phone", 3, "click", "ngbTooltip"],
      ["class", "name", 4, "ngIf", "ngIfElse"],
      ["container", "body", 3, "ngbTooltip", "click", 4, "ngIf"],
      ["container", "body", 3, "click", "ngbTooltip"],
      [4, "ngIf"],
      ["class", "name", 4, "ngIf"],
      [1, "icon-mail"],
      [
        "container",
        "body",
        "class",
        "email",
        3,
        "ngbTooltip",
        "click",
        4,
        "ngIf",
      ],
      ["class", "email-sep", 4, "ngIf"],
      ["container", "body", 1, "email", 3, "click", "ngbTooltip"],
      [1, "email-sep"],
    ],
    template: function (t, i) {
      t & 1 &&
        (g(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "span", 5),
        E(4),
        A(5, "translate"),
        m(),
        g(6, "div", 6)(7, "div", 7),
        me("click", function () {
          return i.openUrl();
        }),
        g(8, "span", 8),
        Y(9, "i", 9),
        m(),
        g(10, "div", 10)(11, "span", 5),
        E(12),
        m(),
        g(13, "span", 11),
        E(14),
        m()()(),
        ie(15, iR, 11, 4, "div", 12)(16, uR, 9, 3, "div", 12)(
          17,
          _R,
          9,
          3,
          "div",
          12
        ),
        m()()()()),
        t & 2 &&
          (f(4),
          de($(5, 9, "Hello")),
          f(3),
          _t("disabled", !i.url),
          Tt(
            "ngbTooltip",
            i.url
              ? "CMSService::Footer:RequestHint"
              : "CMSService::Footer:NotAvailable"
          ),
          f(5),
          de("CMSService::Footer:Request"),
          f(2),
          de("CMSService::Footer:TechnicalSupport"),
          f(),
          x("ngIf", i.support),
          f(),
          x("ngIf", i.phone),
          f(),
          x("ngIf", i.email));
    },
    dependencies: [Bt, Us, Jt],
    styles: [
      '.card[_ngcontent-%COMP%]{margin-top:24px;margin-bottom:0}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{padding:32px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:32px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--Text-Body, #1e293b);font-size:1rem;font-weight:700;line-height:24px;flex-grow:2}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:flex-end;flex-grow:1;gap:24px;pointer-events:none}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{display:flex;align-items:center;border-radius:24px;border:1px solid var(--neutral-300, #cbd5e1);gap:8px;pointer-events:fill;transition:.2s all ease-out}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{padding:3px 4px;border-radius:24px;background:linear-gradient(270deg,#000062 -27.72%,#5e1ad5 91.54%);display:flex;justify-content:center;align-items:center}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem;color:#fff}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--Text-Placeholder, #94a3b8);font-size:.625rem;font-weight:500;line-height:16px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{color:var(--Text-Body, #1e293b);font-size:.75rem;font-weight:700;line-height:22px;margin-top:-2px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover{cursor:pointer;color:var(--secondary-dark-purple-100, #5e1ad5)}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]{display:flex;margin-top:-2px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--Text-Body, #1e293b);font-size:.75rem;font-weight:700;line-height:22px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:hover{cursor:pointer;color:var(--secondary-dark-purple-100, #5e1ad5)}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]:hover{border-color:var(--secondary-dark-purple-50, #af8deb);box-shadow:0 6px 16px #0000000a}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support.request[_ngcontent-%COMP%]:hover{cursor:pointer}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support.request[_ngcontent-%COMP%]:hover   .name[_ngcontent-%COMP%]{color:var(--secondary-dark-purple-100, #5e1ad5)}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]:hover   .support[_ngcontent-%COMP%]{opacity:.75}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]:hover   .support[_ngcontent-%COMP%]:hover{opacity:1}.disabled[_ngcontent-%COMP%], .disabled[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{cursor:default!important}.disabled[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{opacity:.5}.disabled[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{color:var(--Text-Placeholder, #94a3b8)!important}.disabled[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover{cursor:pointer;color:var(--Text-Placeholder, #94a3b8)!important}.disabled[_ngcontent-%COMP%]:hover{background-color:#f8fafc!important;border:1px solid var(--neutral-300, #cbd5e1)!important;box-shadow:none!important}html[dir=rtl][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%], html[dir=rtl]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{padding:4px 4px 4px 24px}html[dir=rtl][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:before, html[dir=rtl]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:before{content:"."}html[dir=ltr][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{padding:6px 24px 6px 6px}html[dir=ltr][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]{flex-direction:row-reverse}html[dir=ltr][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:after, html[dir=ltr]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:after{content:"."}@media (max-width: 1399px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{gap:16px}}@media (max-width: 1199px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]{gap:16px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{flex:1 1 100%}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{flex:1 1 auto}}@media (max-width: 991px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{gap:12px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{flex:1 1 48%}}@media (max-width: 767px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{gap:12px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{flex:1 1 100%}}@media (max-width: 575px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{flex-direction:column;width:100%;gap:12px}}@media (max-width: 460px){.email-sep[_ngcontent-%COMP%]{display:none}.email[_ngcontent-%COMP%]{display:block;line-height:1;margin:8px 0}}',
    ],
  });
};
var $s = (function (e) {
  return (
    (e[(e.State = 0)] = "State"),
    (e[(e.Transition = 1)] = "Transition"),
    (e[(e.Sequence = 2)] = "Sequence"),
    (e[(e.Group = 3)] = "Group"),
    (e[(e.Animate = 4)] = "Animate"),
    (e[(e.Keyframes = 5)] = "Keyframes"),
    (e[(e.Style = 6)] = "Style"),
    (e[(e.Trigger = 7)] = "Trigger"),
    (e[(e.Reference = 8)] = "Reference"),
    (e[(e.AnimateChild = 9)] = "AnimateChild"),
    (e[(e.AnimateRef = 10)] = "AnimateRef"),
    (e[(e.Query = 11)] = "Query"),
    (e[(e.Stagger = 12)] = "Stagger"),
    e
  );
})($s || {});
function zr(e, n) {
  return { type: $s.Trigger, name: e, definitions: n, options: {} };
}
function Si(e, n = null) {
  return { type: $s.Animate, styles: n, timings: e };
}
function pn(e) {
  return { type: $s.Style, styles: e, offset: null };
}
function ar(e, n, t) {
  return { type: $s.State, name: e, styles: n, options: t };
}
function xi(e, n, t = null) {
  return { type: $s.Transition, expr: e, animation: n, options: t };
}
var zs = class e {
  getPosition() {
    return new Promise((n, t) => {
      navigator.geolocation.getCurrentPosition(
        (i) => {
          n({ lng: i.coords.longitude, lat: i.coords.latitude });
        },
        (i) => {
          t(i);
        }
      );
    });
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
};
var vl = class e {
  transform(n) {
    let t = /\d+:\d+/;
    if (!n) return new Date();
    let [i, r] = n.match(t)[0].split(":").map(Number),
      o = new Date();
    return o.setHours(i, r, 0, 0), o;
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵpipe = yi({ name: "timeToDate", type: e, pure: !0 });
};
function bR(e, n) {
  e & 1 && (bi(0), E(1), A(2, "translate"), Ci()),
    e & 2 && (f(), de($(2, 1, "CMSService::PrayerAzan")));
}
function CR(e, n) {
  e & 1 && (bi(0), E(1), A(2, "translate"), Ci()),
    e & 2 && (f(), de($(2, 1, "CMSService::PrayerAzan")));
}
var yl = class e {
  constructor(n, t) {
    this.locationService = n;
    this.localization = t;
  }
  showPrayerTime = !1;
  prayerTime;
  AppConsts = Ti;
  nextPrayer;
  isNextSunrise;
  next;
  remanning;
  Tolayout;
  sub$;
  Remmaning = new Ne();
  isToggle;
  ngOnInit() {
    this.getLocation();
  }
  getLocation() {
    let n = { latitude: null, longitude: null };
    this.locationService
      .getPosition()
      .then((t) => {
        n = { latitude: t.lat, longitude: t.lng };
      })
      .finally(() => {
        this.getPrayerTime(n);
      });
  }
  getPrayerTime(n) {
    this.sub$ = J({
      date: "0001-01-01T00:00:00+00:00",
      fajr: "04:47:00",
      sunrise: "06:08:00",
      dhuhr: "11:38:00",
      asr: "14:45:00",
      sunset: "17:07:00",
      maghrib: "17:07:00",
      isha: "18:37:00",
    })
      .pipe()
      .subscribe((t) => {
        (this.prayerTime = t),
          this.getNextPrayer(t),
          this.getPrayerList(t),
          Fi((60 - new Date().getSeconds()) * 1e3, 60 * 1e3).subscribe(() => {
            this.getNextPrayer(t), this.getPrayerList(t);
          });
      });
  }
  getNextPrayer(n) {
    delete n.date;
    let t = /\d+:\d+/,
      i = Object.entries(n)
        .map(([a, l]) => {
          let [c, u] = l.match(t)[0].split(":").map(Number),
            d = new Date();
          return d.setHours(c, u, 0, 0), { key: a, date: d };
        })
        .sort((a, l) => a.date.getTime() - l.date.getTime()),
      r = new Date(),
      o = i.find(({ date: a }) => r <= a),
      s = !1;
    o || ((o = i[0]), (s = r.getHours() > 0)),
      (this.next = n[o.key]),
      this.calculateRemmanning(s);
  }
  calculateRemmanning(n) {
    let t = /\d+:\d+/,
      [i, r] = this.next.match(t)[0].split(":").map(Number),
      o = new Date();
    o.setHours(i, r, 0, 0), n && o.setDate(o.getDate() + 1);
    let s = new Date(),
      l = (o.getTime() - s.getTime()) / (3600 * 1e3),
      c = Math.floor(l),
      u = Math.floor((l % 1) * 60);
    (this.remanning = `${this.localization.instant(
      "CMSService::PrayerRemmaing"
    )} ${c} ${this.localization.instant(
      "CMSService::PrayerHourAnd"
    )} ${u} ${this.localization.instant("CMSService::PrayerMinute")}`),
      (this.Tolayout = `${c} ${this.localization.instant(
        "CMSService::PrayerHourAnd"
      )} ${u} ${this.localization.instant("CMSService::PrayerMinute")}`);
  }
  togglePrayerTime() {
    (this.isToggle = !0), (this.showPrayerTime = !this.showPrayerTime);
  }
  getPrayerList(n) {
    let t = [
      {
        id: 1,
        name: this.localization.instant("CMSService::PrayerFajr"),
        time: n.fajr,
      },
      {
        id: 2,
        name: this.localization.instant("CMSService::PrayerSunRises"),
        time: n.sunrise,
      },
      {
        id: 3,
        name: this.localization.instant("CMSService::PrayerDuhr"),
        time: n.dhuhr,
      },
      {
        id: 4,
        name: this.localization.instant("CMSService::PrayerAsr"),
        time: n.asr,
      },
      {
        id: 5,
        name: this.localization.instant("CMSService::PrayerMaghrib"),
        time: n.maghrib,
      },
      {
        id: 6,
        name: this.localization.instant("CMSService::PrayerIsha"),
        time: n.isha,
      },
    ];
    (this.nextPrayer = t.find((i) => i.time === this.next.toString())),
      (this.isNextSunrise = this.nextPrayer.id === 2),
      this.Remmaning.emit({
        prayer: this.nextPrayer,
        remanning: this.Tolayout,
        isNextSunrise: this.isNextSunrise,
      });
  }
  ngOnDestroy() {
    this.sub$?.unsubscribe();
  }
  static ɵfac = function (t) {
    return new (t || e)(X(zs), X(tr));
  };
  static ɵcmp = ot({
    type: e,
    selectors: [["app-prayer-time"]],
    outputs: { Remmaning: "Remmaning" },
    decls: 141,
    vars: 127,
    consts: [
      [1, "prayer-time-lg", 3, "ngClass"],
      [1, "next-prayer"],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/mousqe.svg",
        "alt",
        "Mousqe",
      ],
      [1, "details"],
      [1, "title"],
      [4, "ngIf"],
      [1, "time"],
      [1, "remaining"],
      [1, "remaining-prayers"],
      [1, "logo", "fajr-logo"],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/fajr.svg",
        "alt",
        "Fajr",
        1,
        "fajr",
      ],
      [1, "logo"],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/sun-rise.svg",
        "alt",
        "Sunrise",
        1,
        "sunrise",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Duhr.svg",
        "alt",
        "Duhr",
        1,
        "duhr",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Asr.svg",
        "alt",
        "Asr",
        1,
        "asr",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Maghrib.svg",
        "alt",
        "Maghrib",
        1,
        "maghrib",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Isha.svg",
        "alt",
        "Isha",
        1,
        "isha",
      ],
      [1, "prayer-time-sm", 3, "ngClass"],
      [1, "layout"],
      [1, "time-details"],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/mousqe.svg",
        "alt",
        "Sun",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/fajr.svg",
        "alt",
        "Fajr",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/sun-rise.svg",
        "alt",
        "Sun Rises",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Duhr.svg",
        "alt",
        "Duhr",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Asr.svg",
        "alt",
        "Asr",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Maghrib.svg",
        "alt",
        "Maghrib",
      ],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/Isha.svg",
        "alt",
        "Isha",
      ],
    ],
    template: function (t, i) {
      t & 1 &&
        (g(0, "div", 0)(1, "div", 1),
        Y(2, "img", 2),
        g(3, "div", 3)(4, "span", 4),
        ie(5, bR, 3, 3, "ng-container", 5),
        E(6),
        m(),
        g(7, "span", 6),
        E(8),
        A(9, "timeToDate"),
        A(10, "date"),
        m(),
        g(11, "span", 7),
        E(12),
        m()()(),
        g(13, "div", 8)(14, "span", 9),
        Y(15, "img", 10),
        m(),
        g(16, "span", 4),
        E(17),
        A(18, "translate"),
        m(),
        g(19, "span", 6),
        E(20),
        A(21, "timeToDate"),
        A(22, "date"),
        m()(),
        g(23, "div", 8)(24, "span", 11),
        Y(25, "img", 12),
        m(),
        g(26, "span", 4),
        E(27),
        A(28, "translate"),
        m(),
        g(29, "span", 6),
        E(30),
        A(31, "timeToDate"),
        A(32, "date"),
        m()(),
        g(33, "div", 8)(34, "span", 11),
        Y(35, "img", 13),
        m(),
        g(36, "span", 4),
        E(37),
        A(38, "translate"),
        m(),
        g(39, "span", 6),
        E(40),
        A(41, "timeToDate"),
        A(42, "date"),
        m()(),
        g(43, "div", 8)(44, "span", 11),
        Y(45, "img", 14),
        m(),
        g(46, "span", 4),
        E(47),
        A(48, "translate"),
        m(),
        g(49, "span", 6),
        E(50),
        A(51, "timeToDate"),
        A(52, "date"),
        m()(),
        g(53, "div", 8)(54, "span", 11),
        Y(55, "img", 15),
        m(),
        g(56, "span", 4),
        E(57),
        A(58, "translate"),
        m(),
        g(59, "span", 6),
        E(60),
        A(61, "timeToDate"),
        A(62, "date"),
        m()(),
        g(63, "div", 8)(64, "span", 11),
        Y(65, "img", 16),
        m(),
        g(66, "span", 4),
        E(67),
        A(68, "translate"),
        m(),
        g(69, "span", 6),
        E(70),
        A(71, "timeToDate"),
        A(72, "date"),
        m()()(),
        g(73, "div", 17)(74, "div", 18)(75, "div", 4)(76, "span"),
        ie(77, CR, 3, 3, "ng-container", 5),
        E(78),
        m(),
        g(79, "span"),
        E(80),
        A(81, "translate"),
        m(),
        g(82, "span"),
        E(83),
        A(84, "translate"),
        m(),
        g(85, "span"),
        E(86),
        A(87, "translate"),
        m(),
        g(88, "span"),
        E(89),
        A(90, "translate"),
        m(),
        g(91, "span"),
        E(92),
        A(93, "translate"),
        m(),
        g(94, "span"),
        E(95),
        A(96, "translate"),
        m()(),
        g(97, "div", 6)(98, "div", 19),
        E(99),
        g(100, "span"),
        E(101),
        m()(),
        g(102, "span"),
        E(103),
        A(104, "timeToDate"),
        A(105, "date"),
        m(),
        g(106, "span"),
        E(107),
        A(108, "timeToDate"),
        A(109, "date"),
        m(),
        g(110, "span"),
        E(111),
        A(112, "timeToDate"),
        A(113, "date"),
        m(),
        g(114, "span"),
        E(115),
        A(116, "timeToDate"),
        A(117, "date"),
        m(),
        g(118, "span"),
        E(119),
        A(120, "timeToDate"),
        A(121, "date"),
        m(),
        g(122, "span"),
        E(123),
        A(124, "timeToDate"),
        A(125, "date"),
        m()(),
        g(126, "div", 11)(127, "span"),
        Y(128, "img", 20),
        m(),
        g(129, "span"),
        Y(130, "img", 21),
        m(),
        g(131, "span"),
        Y(132, "img", 22),
        m(),
        g(133, "span"),
        Y(134, "img", 23),
        m(),
        g(135, "span"),
        Y(136, "img", 24),
        m(),
        g(137, "span"),
        Y(138, "img", 25),
        m(),
        g(139, "span"),
        Y(140, "img", 26),
        m()()()()),
        t & 2 &&
          (Cn("visibility", i.isToggle ? "visible" : "hidden"),
          x("ngClass", i.showPrayerTime ? "showPrayerTime" : "hidePrayerTime"),
          f(5),
          x("ngIf", !i.isNextSunrise),
          f(),
          B(" ", i.nextPrayer == null ? null : i.nextPrayer.name, ""),
          f(2),
          B(
            "",
            ft(
              10,
              40,
              $(9, 38, i.nextPrayer == null ? null : i.nextPrayer.time),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(4),
          de(i.remanning),
          f(5),
          B(" ", $(18, 43, "CMSService::PrayerFajr"), " "),
          f(3),
          B(
            " ",
            ft(
              22,
              47,
              $(21, 45, i.prayerTime == null ? null : i.prayerTime.fajr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(7),
          B(" ", $(28, 50, "CMSService::PrayerSunRises"), " "),
          f(3),
          B(
            " ",
            ft(
              32,
              54,
              $(31, 52, i.prayerTime == null ? null : i.prayerTime.sunrise),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(7),
          B(" ", $(38, 57, "CMSService::PrayerDuhr"), " "),
          f(3),
          B(
            " ",
            ft(
              42,
              61,
              $(41, 59, i.prayerTime == null ? null : i.prayerTime.dhuhr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(7),
          B(" ", $(48, 64, "CMSService::PrayerAsr"), " "),
          f(3),
          B(
            "",
            ft(
              52,
              68,
              $(51, 66, i.prayerTime == null ? null : i.prayerTime.asr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(7),
          B(" ", $(58, 71, "CMSService::PrayerMaghrib"), " "),
          f(3),
          B(
            " ",
            ft(
              62,
              75,
              $(61, 73, i.prayerTime == null ? null : i.prayerTime.maghrib),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(7),
          B(" ", $(68, 78, "CMSService::PrayerIsha"), " "),
          f(3),
          B(
            "",
            ft(
              72,
              82,
              $(71, 80, i.prayerTime == null ? null : i.prayerTime.isha),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(3),
          Cn("visibility", i.isToggle ? "visible" : "hidden"),
          x("ngClass", i.showPrayerTime ? "showPrayerTime" : "hidePrayerTime"),
          f(4),
          x("ngIf", !i.isNextSunrise),
          f(),
          B(" ", i.nextPrayer == null ? null : i.nextPrayer.name, ""),
          f(2),
          de($(81, 85, "CMSService::PrayerFajr")),
          f(3),
          de($(84, 87, "CMSService::PrayerSunRises")),
          f(3),
          de($(87, 89, "CMSService::PrayerDuhr")),
          f(3),
          de($(90, 91, "CMSService::PrayerAsr")),
          f(3),
          de($(93, 93, "CMSService::PrayerMaghrib")),
          f(3),
          de($(96, 95, "CMSService::PrayerIsha")),
          f(4),
          B("", i.nextPrayer == null ? null : i.nextPrayer.time, " "),
          f(2),
          B(" ", i.remanning, " "),
          f(2),
          B(
            "",
            ft(
              105,
              99,
              $(104, 97, i.prayerTime == null ? null : i.prayerTime.fajr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(4),
          B(
            "",
            ft(
              109,
              104,
              $(108, 102, i.prayerTime == null ? null : i.prayerTime.sunrise),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(4),
          B(
            "",
            ft(
              113,
              109,
              $(112, 107, i.prayerTime == null ? null : i.prayerTime.dhuhr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(4),
          B(
            "",
            ft(
              117,
              114,
              $(116, 112, i.prayerTime == null ? null : i.prayerTime.asr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(4),
          B(
            "",
            ft(
              121,
              119,
              $(120, 117, i.prayerTime == null ? null : i.prayerTime.maghrib),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          f(4),
          B(
            "",
            ft(
              125,
              124,
              $(124, 122, i.prayerTime == null ? null : i.prayerTime.isha),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ));
    },
    dependencies: [bs, Bt, Pr, Jt, vl],
    styles: [
      ".prayer-time-lg[_ngcontent-%COMP%]{background:#0f172acc;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);padding:41px 80px;display:flex;justify-content:space-between;align-items:center;position:fixed;z-index:99;bottom:0;width:100vw;transition:padding .9s ease}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]{display:flex;align-items:center;margin-left:40px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-left:16px;width:96px;height:110px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{display:grid;color:#fff}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{border-radius:4px;background:var(--neutral-900, #0f172a);padding:6px 12px;font-size:.875rem;text-align:center;width:fit-content}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{color:var(--basic-white, #fff);font-size:2.5rem}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]{color:var(--basic-white, #fff);font-size:1rem;font-style:normal}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]{color:#fff;display:grid;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{border-radius:4px;background:var(--neutral-900, #0F172A);padding:6px 12px;font-size:.75rem;color:#fff;text-align:center;width:fit-content}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{display:flex;justify-content:center}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:48px;height:48px}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{color:var(--basic-white, #fff);text-align:center;font-size:1.25rem}.prayer-time-sm[_ngcontent-%COMP%]{display:none;background:#0f172acc;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);padding:16px;justify-content:space-between;align-items:center;position:fixed;z-index:var(--z-index-bottom-layer);bottom:0;width:100vw;border-radius:12px 12px 0 0}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between;align-items:center;margin-bottom:20px}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:grid;grid-gap:45px;justify-content:center;align-items:center;color:var(--basic-white, #fff);font-size:.875rem}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:6px 12px;border-radius:4px;background:var(--neutral-900, #0f172a);text-align:center}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{color:var(--basic-white, #fff);text-align:center;font-size:1.25rem;display:grid;grid-gap:49px}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]   .time-details[_ngcontent-%COMP%]{display:grid}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]   .time-details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.75rem}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{display:grid;grid-gap:37px}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:42px;height:42px}.showPrayerTime[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideFromBottom .3s forwards}.hidePrayerTime[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideToBottom .4s forwards}@keyframes _ngcontent-%COMP%_slideFromBottom{0%{bottom:-100px;opacity:0}to{bottom:0;opacity:1}}@keyframes _ngcontent-%COMP%_slideToBottom{0%{transform:translateY(0);opacity:1}to{transform:translateY(100%);opacity:0}}@media (min-width: 1200px){.prayer-time-sm[_ngcontent-%COMP%]{display:none}}@media (max-width: 1199px){.prayer-time-lg[_ngcontent-%COMP%]{grid-gap:5px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:95px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{grid-gap:10px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:.875rem;font-weight:500;margin-bottom:0}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{font-size:1.25rem}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%], .prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:.625rem;font-weight:500}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{font-size:.625rem;font-weight:700}.prayer-time-sm[_ngcontent-%COMP%]{display:none}}@media (max-width: 991px){.prayer-time-lg[_ngcontent-%COMP%]{display:none}.prayer-time-sm[_ngcontent-%COMP%]{display:block}}",
    ],
    data: {
      animation: [
        zr("smoothToggle", [
          ar("show", pn({ opacity: 1, visibility: "visible" })),
          xi("show <=> hide", Si("200ms ease-out")),
          ar("hide", pn({ opacity: 0, bottom: 0, visibility: "hidden" })),
        ]),
      ],
    },
  });
};
function DR(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 12)(1, "div", 4)(2, "span", 5),
      E(3),
      A(4, "date"),
      m(),
      g(5, "span", 13),
      Y(6, "img", 14),
      m(),
      g(7, "span", 6),
      E(8),
      m()()()),
    e & 2)
  ) {
    let t = n.$implicit;
    f(3),
      de(ft(4, 4, t.day, "EEEE")),
      f(3),
      Tt("src", t.conditionIcon, yn),
      f(2),
      Eu(" \u0652 ", t.maxtemp, " / \u0652 ", t.mintemp, " ");
  }
}
function ER(e, n) {
  if ((e & 1 && (g(0, "div", 15), E(1), m()), e & 2)) {
    let t = W();
    f(), de(t.locationText);
  }
}
function MR(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 16)(1, "div", 2)(2, "span", 5),
      E(3),
      A(4, "date"),
      m(),
      g(5, "span", 6),
      E(6),
      m(),
      g(7, "span", 13),
      Y(8, "img", 17),
      m()()()),
    e & 2)
  ) {
    let t = n.$implicit;
    f(3),
      de(ft(4, 4, t.day, "EEEE")),
      f(3),
      Eu(" \u0652 ", t.maxtemp, " / \u0652 ", t.mintemp, " "),
      f(2),
      Tt("src", t.conditionIcon, yn);
  }
}
var bl = class e {
  constructor(n) {
    this.locationService = n;
  }
  showWeather = !1;
  weatherList;
  AllWeatherList;
  today;
  locationText;
  sub$;
  todayWeather = new Ne();
  location = new Ne();
  isToggle;
  ngOnInit() {
    this.getLocation();
  }
  getLocation() {
    let n = { latitude: null, longitude: null };
    this.locationService
      .getPosition()
      .then((t) => {
        n = { latitude: t.lat, longitude: t.lng };
      })
      .finally(() => {
        this.getWeather(n);
      });
  }
  getWeather(n) {
    this.sub$ = J({
      location: "Riyadh",
      dayWeatherDtos: [
        {
          day: "2024-11-13",
          maxtemp: 30.3,
          mintemp: 20.8,
          condition: "Sunny",
          conditionIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        },
        {
          day: "2024-11-14",
          maxtemp: 28.6,
          mintemp: 19,
          condition: "Sunny",
          conditionIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        },
        {
          day: "2024-11-15",
          maxtemp: 27.3,
          mintemp: 17.4,
          condition: "Sunny",
          conditionIcon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
        },
      ],
    }).subscribe((t) => {
      t &&
        ((this.AllWeatherList = t.dayWeatherDtos.map((i) =>
          Pe(j({}, i), {
            mintemp: +i.mintemp.toFixed(),
            maxtemp: +i.maxtemp.toFixed(),
          })
        )),
        (this.weatherList = this.AllWeatherList.slice(1)),
        (this.today = this.AllWeatherList[0]),
        (this.locationText = t.location),
        this.todayWeather.emit(this.today),
        this.location.emit(t.location));
    });
  }
  displayWeather() {
    (this.isToggle = !0), (this.showWeather = !this.showWeather);
  }
  ngOnDestroy() {
    this.sub$?.unsubscribe();
  }
  static ɵfac = function (t) {
    return new (t || e)(X(zs));
  };
  static ɵcmp = ot({
    type: e,
    selectors: [["app-weather"]],
    outputs: { todayWeather: "todayWeather", location: "location" },
    decls: 21,
    vars: 13,
    consts: [
      [1, "weather-layout", 3, "ngClass"],
      [1, "layout-lg"],
      [1, "current"],
      [3, "src", "alt"],
      [1, "details"],
      [1, "title"],
      [1, "temperature"],
      [1, "degree"],
      [1, "icon"],
      ["class", "remaining", 4, "ngFor", "ngForOf"],
      ["class", "location", 4, "ngIf"],
      ["class", "layout-sm", 4, "ngFor", "ngForOf"],
      [1, "remaining"],
      [1, "logo"],
      ["alt", "", 3, "src"],
      [1, "location"],
      [1, "layout-sm"],
      ["alt", "", "width", "40", 3, "src"],
    ],
    template: function (t, i) {
      t & 1 &&
        (g(0, "div", 0)(1, "div", 1)(2, "div", 2),
        Y(3, "img", 3),
        g(4, "div", 4)(5, "span", 5),
        E(6),
        A(7, "translate"),
        m(),
        g(8, "div", 6)(9, "span", 7)(10, "span", 8),
        E(11, " \u0652"),
        m(),
        E(12),
        m(),
        E(13, " / "),
        g(14, "span", 7)(15, "span", 8),
        E(16, " \u0652"),
        m(),
        E(17),
        m()()()(),
        ie(18, DR, 9, 7, "div", 9),
        m(),
        ie(19, ER, 2, 1, "div", 10)(20, MR, 9, 7, "div", 11),
        m()),
        t & 2 &&
          (Cn("visibility", i.isToggle ? "visible" : "hidden"),
          x("ngClass", i.showWeather ? "showWeather" : "hideWeather"),
          f(3),
          Tt("src", i.today == null ? null : i.today.conditionIcon, yn),
          Tt("alt", i.today == null ? null : i.today.condition),
          f(3),
          de($(7, 11, "CMSService::WeatherToday")),
          f(6),
          B(" ", i.today == null ? null : i.today.maxtemp, ""),
          f(5),
          B(" ", i.today == null ? null : i.today.mintemp, " "),
          f(),
          x("ngForOf", i.weatherList),
          f(),
          x("ngIf", i.locationText),
          f(),
          x("ngForOf", i.AllWeatherList));
    },
    dependencies: [bs, Nb, Bt, Pr, Jt],
    styles: [
      ".weather-layout[_ngcontent-%COMP%]{background:#0f172acc;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);padding:41px 0;position:fixed;z-index:99;bottom:0;width:100vw}.weather-layout[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]{display:none;justify-content:center;color:var(--basic-white, #FFF);font-size:1.25rem;font-weight:700}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px;flex-grow:1;justify-content:center}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:84px;height:84px;padding:6px}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{display:grid;grid-gap:8px;color:#fff}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{border-radius:4px;background:var(--neutral-900, #0F172A);padding:6px 12px;font-size:.875rem;font-weight:700;width:fit-content;height:fit-content}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]{color:var(--basic-white, #FFF);font-size:2.5rem;font-weight:700}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]{flex-grow:1}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;border-right:1px solid rgb(71,85,105);border-left:1px solid rgb(71,85,105)}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{border-radius:4px;background:var(--neutral-900, #0F172A);padding:6px 12px;font-size:.75rem;color:#fff;text-align:center;width:fit-content}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{text-align:center}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:42px;height:42px}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]{color:var(--basic-white, #FFF);font-size:1.25rem;font-weight:700;text-align:center}.weather-layout[_ngcontent-%COMP%]   .layout-sm[_ngcontent-%COMP%]{display:none}.weather-layout[_ngcontent-%COMP%]   .layout-sm[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin:0 36px}.weather-layout[_ngcontent-%COMP%]   .layout-sm[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:6px 12px;border-radius:4px;background:var(--neutral-900, #0F172A);color:var(--basic-white, #FFF);font-size:.875rem;font-weight:700}.weather-layout[_ngcontent-%COMP%]   .layout-sm[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]{color:var(--basic-white, #FFF);font-size:1.25rem;font-weight:700}html[dir=rtl][_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]:last-of-type, html[dir=rtl]   [_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]:last-of-type{border-left:none}html[dir=ltr][_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]   .degree[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]   .degree[_ngcontent-%COMP%]{position:relative}html[dir=ltr][_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]   .degree[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]   .degree[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{position:absolute;right:-6px}html[dir=ltr][_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .temperature[_ngcontent-%COMP%]{direction:rtl}html[dir=ltr][_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]:last-of-type, html[dir=ltr]   [_nghost-%COMP%]   .weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]:last-of-type{border-right:none}.showWeather[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideFromBottom .3s forwards}.hideWeather[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideToBottom .4s forwards}@keyframes _ngcontent-%COMP%_slideFromBottom{0%{bottom:-100px;opacity:0}to{bottom:0;opacity:1}}@keyframes _ngcontent-%COMP%_slideToBottom{0%{transform:translateY(0);opacity:1}to{transform:translateY(100%);opacity:0}}@media (min-width: 1200px){.weather-layout[_ngcontent-%COMP%]   .layout-sm[_ngcontent-%COMP%]{display:none}}@media (max-width: 575px){.weather-layout[_ngcontent-%COMP%]{padding:16px}.weather-layout[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]{display:flex}.weather-layout[_ngcontent-%COMP%]   .layout-lg[_ngcontent-%COMP%]{display:none}.weather-layout[_ngcontent-%COMP%]   .layout-sm[_ngcontent-%COMP%]{display:block;padding:8px 0}.title[_ngcontent-%COMP%]{width:5.975rem}}",
    ],
    data: {
      animation: [
        zr("smoothToggle", [
          ar("show", pn({ opacity: 1, visibility: "visible" })),
          xi("show <=> hide", Si("200ms ease-out")),
          ar("hide", pn({ opacity: 0, bottom: 0, visibility: "hidden" })),
        ]),
      ],
    },
  });
};
var wl = class {};
function U1(e) {
  return e && typeof e.connect == "function" && !(e instanceof gr);
}
var Hd = class extends wl {
    constructor(n) {
      super(), (this._data = n);
    }
    connect() {
      return mn(this._data) ? this._data : J(this._data);
    }
    disconnect() {}
  },
  Cl = (function (e) {
    return (
      (e[(e.REPLACED = 0)] = "REPLACED"),
      (e[(e.INSERTED = 1)] = "INSERTED"),
      (e[(e.MOVED = 2)] = "MOVED"),
      (e[(e.REMOVED = 3)] = "REMOVED"),
      e
    );
  })(Cl || {}),
  xm = new z("_ViewRepeater");
var Ud = class {
  constructor() {
    (this.viewCacheSize = 20), (this._viewCache = []);
  }
  applyChanges(n, t, i, r, o) {
    n.forEachOperation((s, a, l) => {
      let c, u;
      if (s.previousIndex == null) {
        let d = () => i(s, a, l);
        (c = this._insertView(d, l, t, r(s))),
          (u = c ? Cl.INSERTED : Cl.REPLACED);
      } else
        l == null
          ? (this._detachAndCacheView(a, t), (u = Cl.REMOVED))
          : ((c = this._moveView(a, l, t, r(s))), (u = Cl.MOVED));
      o && o({ context: c?.context, operation: u, record: s });
    });
  }
  detach() {
    for (let n of this._viewCache) n.destroy();
    this._viewCache = [];
  }
  _insertView(n, t, i, r) {
    let o = this._insertViewFromCache(t, i);
    if (o) {
      o.context.$implicit = r;
      return;
    }
    let s = n();
    return i.createEmbeddedView(s.templateRef, s.context, s.index);
  }
  _detachAndCacheView(n, t) {
    let i = t.detach(n);
    this._maybeCacheView(i, t);
  }
  _moveView(n, t, i, r) {
    let o = i.get(n);
    return i.move(o, t), (o.context.$implicit = r), o;
  }
  _maybeCacheView(n, t) {
    if (this._viewCache.length < this.viewCacheSize) this._viewCache.push(n);
    else {
      let i = t.indexOf(n);
      i === -1 ? n.destroy() : t.remove(i);
    }
  }
  _insertViewFromCache(n, t) {
    let i = this._viewCache.pop();
    return i && t.insert(i, n), i || null;
  }
};
var $d = class extends wl {
  _length = 0;
  get length() {
    return this._length;
  }
  _pageSize = 1;
  _cachedData = Array.from({ length: this._length });
  get cachedData() {
    return this._cachedData.filter((n) => n != null);
  }
  _fetchedPages = new Set();
  _dataStream = new Mt(this._cachedData);
  _subscription = new nt();
  soruce;
  functionName;
  constructor(n, t, i) {
    if ((super(), !n[t]))
      throw `Cannot Implment unkow function ${t} Name for DataSoucre ${typeof n}`;
    (this._pageSize = i),
      (this.soruce = n),
      (this.functionName = t),
      (this._cachedData = Array.from({ length: this._length })),
      (this._fetchedPages = new Set()),
      this._fetchPage(0);
  }
  connect(n) {
    return (
      this._subscription.add(
        n.viewChange.subscribe((t) => {
          let i = this._getPageForIndex(t.start),
            r = this._getPageForIndex(t.end - 1);
          for (let o = i; o <= r; o++) this._fetchPage(o);
        })
      ),
      this._dataStream
    );
  }
  disconnect() {}
  clear() {
    (this._length = 0),
      (this._cachedData = Array.from({ length: this._length })),
      (this._fetchedPages = new Set()),
      this._dataStream.next([]),
      this._fetchPage(0);
  }
  _getPageForIndex(n) {
    return Math.floor(n / this._pageSize);
  }
  _fetchPage(n) {
    this._fetchedPages.has(n) ||
      (this._fetchedPages.add(n),
      this.soruce[this.functionName](n).subscribe(
        (t) => {
          this._length != t.totalCount &&
            ((this._length = t.totalCount),
            (this._cachedData = Array.from({ length: this._length })),
            (this._fetchedPages = new Set()));
          let i = n * this._pageSize;
          t.items.forEach((r, o) => {
            this._cachedData[i + o] = r;
          }),
            this._dataStream.next(this._cachedData);
        },
        () => {
          this._fetchedPages.delete(n);
        }
      ));
  }
};
function Dl(e, n = 0) {
  return TR(e) ? Number(e) : arguments.length === 2 ? n : 0;
}
function TR(e) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e));
}
function $1(e) {
  return e instanceof Ct ? e.nativeElement : e;
}
var Om;
try {
  Om = typeof Intl < "u" && Intl.v8BreakIterator;
} catch {
  Om = !1;
}
var El = (() => {
  class e {
    constructor(t) {
      (this._platformId = t),
        (this.isBrowser = this._platformId
          ? qu(this._platformId)
          : typeof document == "object" && !!document),
        (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
        (this.TRIDENT =
          this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
        (this.BLINK =
          this.isBrowser &&
          !!(window.chrome || Om) &&
          typeof CSS < "u" &&
          !this.EDGE &&
          !this.TRIDENT),
        (this.WEBKIT =
          this.isBrowser &&
          /AppleWebKit/i.test(navigator.userAgent) &&
          !this.BLINK &&
          !this.EDGE &&
          !this.TRIDENT),
        (this.IOS =
          this.isBrowser &&
          /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !("MSStream" in window)),
        (this.FIREFOX =
          this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
        (this.ANDROID =
          this.isBrowser &&
          /android/i.test(navigator.userAgent) &&
          !this.TRIDENT),
        (this.SAFARI =
          this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(q(fn));
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var ci = (function (e) {
    return (
      (e[(e.NORMAL = 0)] = "NORMAL"),
      (e[(e.NEGATED = 1)] = "NEGATED"),
      (e[(e.INVERTED = 2)] = "INVERTED"),
      e
    );
  })(ci || {}),
  zd,
  Oo;
function z1() {
  if (Oo == null) {
    if (
      typeof document != "object" ||
      !document ||
      typeof Element != "function" ||
      !Element
    )
      return (Oo = !1), Oo;
    if ("scrollBehavior" in document.documentElement.style) Oo = !0;
    else {
      let e = Element.prototype.scrollTo;
      e ? (Oo = !/\{\s*\[native code\]\s*\}/.test(e.toString())) : (Oo = !1);
    }
  }
  return Oo;
}
function Gs() {
  if (typeof document != "object" || !document) return ci.NORMAL;
  if (zd == null) {
    let e = document.createElement("div"),
      n = e.style;
    (e.dir = "rtl"),
      (n.width = "1px"),
      (n.overflow = "auto"),
      (n.visibility = "hidden"),
      (n.pointerEvents = "none"),
      (n.position = "absolute");
    let t = document.createElement("div"),
      i = t.style;
    (i.width = "2px"),
      (i.height = "1px"),
      e.appendChild(t),
      document.body.appendChild(e),
      (zd = ci.NORMAL),
      e.scrollLeft === 0 &&
        ((e.scrollLeft = 1),
        (zd = e.scrollLeft === 0 ? ci.NEGATED : ci.INVERTED)),
      e.remove();
  }
  return zd;
}
var xR = new z("cdk-dir-doc", { providedIn: "root", factory: OR });
function OR() {
  return O(ht);
}
var NR =
  /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function PR(e) {
  let n = e?.toLowerCase() || "";
  return n === "auto" && typeof navigator < "u" && navigator?.language
    ? NR.test(navigator.language)
      ? "rtl"
      : "ltr"
    : n === "rtl"
    ? "rtl"
    : "ltr";
}
var Gd = (() => {
  class e {
    constructor(t) {
      if (((this.value = "ltr"), (this.change = new Ne()), t)) {
        let i = t.body ? t.body.dir : null,
          r = t.documentElement ? t.documentElement.dir : null;
        this.value = PR(i || r || "ltr");
      }
    }
    ngOnDestroy() {
      this.change.complete();
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(q(xR, 8));
      };
    }
    static {
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var Nm = (() => {
  class e {
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵmod = et({ type: e });
    }
    static {
      this.ɵinj = Xe({});
    }
  }
  return e;
})();
var RR = ["contentWrapper"],
  kR = ["*"],
  q1 = new z("VIRTUAL_SCROLL_STRATEGY"),
  Pm = class {
    constructor(n, t, i) {
      (this._scrolledIndexChange = new He()),
        (this.scrolledIndexChange = this._scrolledIndexChange.pipe(fc())),
        (this._viewport = null),
        (this._itemSize = n),
        (this._minBufferPx = t),
        (this._maxBufferPx = i);
    }
    attach(n) {
      (this._viewport = n),
        this._updateTotalContentSize(),
        this._updateRenderedRange();
    }
    detach() {
      this._scrolledIndexChange.complete(), (this._viewport = null);
    }
    updateItemAndBufferSize(n, t, i) {
      i < t,
        (this._itemSize = n),
        (this._minBufferPx = t),
        (this._maxBufferPx = i),
        this._updateTotalContentSize(),
        this._updateRenderedRange();
    }
    onContentScrolled() {
      this._updateRenderedRange();
    }
    onDataLengthChanged() {
      this._updateTotalContentSize(), this._updateRenderedRange();
    }
    onContentRendered() {}
    onRenderedOffsetChanged() {}
    scrollToIndex(n, t) {
      this._viewport && this._viewport.scrollToOffset(n * this._itemSize, t);
    }
    _updateTotalContentSize() {
      this._viewport &&
        this._viewport.setTotalContentSize(
          this._viewport.getDataLength() * this._itemSize
        );
    }
    _updateRenderedRange() {
      if (!this._viewport) return;
      let n = this._viewport.getRenderedRange(),
        t = { start: n.start, end: n.end },
        i = this._viewport.getViewportSize(),
        r = this._viewport.getDataLength(),
        o = this._viewport.measureScrollOffset(),
        s = this._itemSize > 0 ? o / this._itemSize : 0;
      if (t.end > r) {
        let l = Math.ceil(i / this._itemSize),
          c = Math.max(0, Math.min(s, r - l));
        s != c &&
          ((s = c), (o = c * this._itemSize), (t.start = Math.floor(s))),
          (t.end = Math.max(0, Math.min(r, t.start + l)));
      }
      let a = o - t.start * this._itemSize;
      if (a < this._minBufferPx && t.start != 0) {
        let l = Math.ceil((this._maxBufferPx - a) / this._itemSize);
        (t.start = Math.max(0, t.start - l)),
          (t.end = Math.min(
            r,
            Math.ceil(s + (i + this._minBufferPx) / this._itemSize)
          ));
      } else {
        let l = t.end * this._itemSize - (o + i);
        if (l < this._minBufferPx && t.end != r) {
          let c = Math.ceil((this._maxBufferPx - l) / this._itemSize);
          c > 0 &&
            ((t.end = Math.min(r, t.end + c)),
            (t.start = Math.max(
              0,
              Math.floor(s - this._minBufferPx / this._itemSize)
            )));
        }
      }
      this._viewport.setRenderedRange(t),
        this._viewport.setRenderedContentOffset(this._itemSize * t.start),
        this._scrolledIndexChange.next(Math.floor(s));
    }
  };
function FR(e) {
  return e._scrollStrategy;
}
var Z1 = (() => {
    class e {
      constructor() {
        (this._itemSize = 20),
          (this._minBufferPx = 100),
          (this._maxBufferPx = 200),
          (this._scrollStrategy = new Pm(
            this.itemSize,
            this.minBufferPx,
            this.maxBufferPx
          ));
      }
      get itemSize() {
        return this._itemSize;
      }
      set itemSize(t) {
        this._itemSize = Dl(t);
      }
      get minBufferPx() {
        return this._minBufferPx;
      }
      set minBufferPx(t) {
        this._minBufferPx = Dl(t);
      }
      get maxBufferPx() {
        return this._maxBufferPx;
      }
      set maxBufferPx(t) {
        this._maxBufferPx = Dl(t);
      }
      ngOnChanges() {
        this._scrollStrategy.updateItemAndBufferSize(
          this.itemSize,
          this.minBufferPx,
          this.maxBufferPx
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]],
          inputs: {
            itemSize: "itemSize",
            minBufferPx: "minBufferPx",
            maxBufferPx: "maxBufferPx",
          },
          standalone: !0,
          features: [
            ii([{ provide: q1, useFactory: FR, deps: [Ui(() => e)] }]),
            Vt,
          ],
        });
      }
    }
    return e;
  })(),
  LR = 20,
  Am = (() => {
    class e {
      constructor(t, i, r) {
        (this._ngZone = t),
          (this._platform = i),
          (this._scrolled = new He()),
          (this._globalSubscription = null),
          (this._scrolledCount = 0),
          (this.scrollContainers = new Map()),
          (this._document = r);
      }
      register(t) {
        this.scrollContainers.has(t) ||
          this.scrollContainers.set(
            t,
            t.elementScrolled().subscribe(() => this._scrolled.next(t))
          );
      }
      deregister(t) {
        let i = this.scrollContainers.get(t);
        i && (i.unsubscribe(), this.scrollContainers.delete(t));
      }
      scrolled(t = LR) {
        return this._platform.isBrowser
          ? new Me((i) => {
              this._globalSubscription || this._addGlobalListener();
              let r =
                t > 0
                  ? this._scrolled.pipe(ra(t)).subscribe(i)
                  : this._scrolled.subscribe(i);
              return (
                this._scrolledCount++,
                () => {
                  r.unsubscribe(),
                    this._scrolledCount--,
                    this._scrolledCount || this._removeGlobalListener();
                }
              );
            })
          : J();
      }
      ngOnDestroy() {
        this._removeGlobalListener(),
          this.scrollContainers.forEach((t, i) => this.deregister(i)),
          this._scrolled.complete();
      }
      ancestorScrolled(t, i) {
        let r = this.getAncestorScrollContainers(t);
        return this.scrolled(i).pipe(It((o) => !o || r.indexOf(o) > -1));
      }
      getAncestorScrollContainers(t) {
        let i = [];
        return (
          this.scrollContainers.forEach((r, o) => {
            this._scrollableContainsElement(o, t) && i.push(o);
          }),
          i
        );
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _scrollableContainsElement(t, i) {
        let r = $1(i),
          o = t.getElementRef().nativeElement;
        do if (r == o) return !0;
        while ((r = r.parentElement));
        return !1;
      }
      _addGlobalListener() {
        this._globalSubscription = this._ngZone.runOutsideAngular(() => {
          let t = this._getWindow();
          return Gn(t.document, "scroll").subscribe(() =>
            this._scrolled.next()
          );
        });
      }
      _removeGlobalListener() {
        this._globalSubscription &&
          (this._globalSubscription.unsubscribe(),
          (this._globalSubscription = null));
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(Re), q(El), q(ht, 8));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Y1 = (() => {
    class e {
      constructor(t, i, r, o) {
        (this.elementRef = t),
          (this.scrollDispatcher = i),
          (this.ngZone = r),
          (this.dir = o),
          (this._destroyed = new He()),
          (this._elementScrolled = new Me((s) =>
            this.ngZone.runOutsideAngular(() =>
              Gn(this.elementRef.nativeElement, "scroll")
                .pipe(Xt(this._destroyed))
                .subscribe(s)
            )
          ));
      }
      ngOnInit() {
        this.scrollDispatcher.register(this);
      }
      ngOnDestroy() {
        this.scrollDispatcher.deregister(this),
          this._destroyed.next(),
          this._destroyed.complete();
      }
      elementScrolled() {
        return this._elementScrolled;
      }
      getElementRef() {
        return this.elementRef;
      }
      scrollTo(t) {
        let i = this.elementRef.nativeElement,
          r = this.dir && this.dir.value == "rtl";
        t.left == null && (t.left = r ? t.end : t.start),
          t.right == null && (t.right = r ? t.start : t.end),
          t.bottom != null &&
            (t.top = i.scrollHeight - i.clientHeight - t.bottom),
          r && Gs() != ci.NORMAL
            ? (t.left != null &&
                (t.right = i.scrollWidth - i.clientWidth - t.left),
              Gs() == ci.INVERTED
                ? (t.left = t.right)
                : Gs() == ci.NEGATED && (t.left = t.right ? -t.right : t.right))
            : t.right != null &&
              (t.left = i.scrollWidth - i.clientWidth - t.right),
          this._applyScrollToOptions(t);
      }
      _applyScrollToOptions(t) {
        let i = this.elementRef.nativeElement;
        z1()
          ? i.scrollTo(t)
          : (t.top != null && (i.scrollTop = t.top),
            t.left != null && (i.scrollLeft = t.left));
      }
      measureScrollOffset(t) {
        let i = "left",
          r = "right",
          o = this.elementRef.nativeElement;
        if (t == "top") return o.scrollTop;
        if (t == "bottom") return o.scrollHeight - o.clientHeight - o.scrollTop;
        let s = this.dir && this.dir.value == "rtl";
        return (
          t == "start" ? (t = s ? r : i) : t == "end" && (t = s ? i : r),
          s && Gs() == ci.INVERTED
            ? t == i
              ? o.scrollWidth - o.clientWidth - o.scrollLeft
              : o.scrollLeft
            : s && Gs() == ci.NEGATED
            ? t == i
              ? o.scrollLeft + o.scrollWidth - o.clientWidth
              : -o.scrollLeft
            : t == i
            ? o.scrollLeft
            : o.scrollWidth - o.clientWidth - o.scrollLeft
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(Ct), X(Am), X(Re), X(Gd, 8));
        };
      }
      static {
        this.ɵdir = dt({
          type: e,
          selectors: [
            ["", "cdk-scrollable", ""],
            ["", "cdkScrollable", ""],
          ],
          standalone: !0,
        });
      }
    }
    return e;
  })(),
  VR = 20,
  jR = (() => {
    class e {
      constructor(t, i, r) {
        (this._platform = t),
          (this._change = new He()),
          (this._changeListener = (o) => {
            this._change.next(o);
          }),
          (this._document = r),
          i.runOutsideAngular(() => {
            if (t.isBrowser) {
              let o = this._getWindow();
              o.addEventListener("resize", this._changeListener),
                o.addEventListener("orientationchange", this._changeListener);
            }
            this.change().subscribe(() => (this._viewportSize = null));
          });
      }
      ngOnDestroy() {
        if (this._platform.isBrowser) {
          let t = this._getWindow();
          t.removeEventListener("resize", this._changeListener),
            t.removeEventListener("orientationchange", this._changeListener);
        }
        this._change.complete();
      }
      getViewportSize() {
        this._viewportSize || this._updateViewportSize();
        let t = {
          width: this._viewportSize.width,
          height: this._viewportSize.height,
        };
        return this._platform.isBrowser || (this._viewportSize = null), t;
      }
      getViewportRect() {
        let t = this.getViewportScrollPosition(),
          { width: i, height: r } = this.getViewportSize();
        return {
          top: t.top,
          left: t.left,
          bottom: t.top + r,
          right: t.left + i,
          height: r,
          width: i,
        };
      }
      getViewportScrollPosition() {
        if (!this._platform.isBrowser) return { top: 0, left: 0 };
        let t = this._document,
          i = this._getWindow(),
          r = t.documentElement,
          o = r.getBoundingClientRect(),
          s = -o.top || t.body.scrollTop || i.scrollY || r.scrollTop || 0,
          a = -o.left || t.body.scrollLeft || i.scrollX || r.scrollLeft || 0;
        return { top: s, left: a };
      }
      change(t = VR) {
        return t > 0 ? this._change.pipe(ra(t)) : this._change;
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _updateViewportSize() {
        let t = this._getWindow();
        this._viewportSize = this._platform.isBrowser
          ? { width: t.innerWidth, height: t.innerHeight }
          : { width: 0, height: 0 };
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(q(El), q(Re), q(ht, 8));
        };
      }
      static {
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  G1 = new z("VIRTUAL_SCROLLABLE"),
  BR = (() => {
    class e extends Y1 {
      constructor(t, i, r, o) {
        super(t, i, r, o);
      }
      measureViewportSize(t) {
        let i = this.elementRef.nativeElement;
        return t === "horizontal" ? i.clientWidth : i.clientHeight;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(X(Ct), X(Am), X(Re), X(Gd, 8));
        };
      }
      static {
        this.ɵdir = dt({ type: e, features: [An] });
      }
    }
    return e;
  })();
function HR(e, n) {
  return e.start == n.start && e.end == n.end;
}
var UR = typeof requestAnimationFrame < "u" ? Ef : Df,
  Rm = (() => {
    class e extends BR {
      get orientation() {
        return this._orientation;
      }
      set orientation(t) {
        this._orientation !== t &&
          ((this._orientation = t), this._calculateSpacerSize());
      }
      constructor(t, i, r, o, s, a, l, c) {
        super(t, a, r, s),
          (this.elementRef = t),
          (this._changeDetectorRef = i),
          (this._scrollStrategy = o),
          (this.scrollable = c),
          (this._platform = O(El)),
          (this._detachedSubject = new He()),
          (this._renderedRangeSubject = new He()),
          (this._orientation = "vertical"),
          (this.appendOnly = !1),
          (this.scrolledIndexChange = new Me((u) =>
            this._scrollStrategy.scrolledIndexChange.subscribe((d) =>
              Promise.resolve().then(() => this.ngZone.run(() => u.next(d)))
            )
          )),
          (this.renderedRangeStream = this._renderedRangeSubject),
          (this._totalContentSize = 0),
          (this._totalContentWidth = ""),
          (this._totalContentHeight = ""),
          (this._renderedRange = { start: 0, end: 0 }),
          (this._dataLength = 0),
          (this._viewportSize = 0),
          (this._renderedContentOffset = 0),
          (this._renderedContentOffsetNeedsRewrite = !1),
          (this._isChangeDetectionPending = !1),
          (this._runAfterChangeDetection = []),
          (this._viewportChanges = nt.EMPTY),
          (this._injector = O(mt)),
          (this._isDestroyed = !1),
          (this._viewportChanges = l.change().subscribe(() => {
            this.checkViewportSize();
          })),
          this.scrollable ||
            (this.elementRef.nativeElement.classList.add(
              "cdk-virtual-scrollable"
            ),
            (this.scrollable = this));
      }
      ngOnInit() {
        this._platform.isBrowser &&
          (this.scrollable === this && super.ngOnInit(),
          this.ngZone.runOutsideAngular(() =>
            Promise.resolve().then(() => {
              this._measureViewportSize(),
                this._scrollStrategy.attach(this),
                this.scrollable
                  .elementScrolled()
                  .pipe(Jr(null), ra(0, UR), Xt(this._destroyed))
                  .subscribe(() => this._scrollStrategy.onContentScrolled()),
                this._markChangeDetectionNeeded();
            })
          ));
      }
      ngOnDestroy() {
        this.detach(),
          this._scrollStrategy.detach(),
          this._renderedRangeSubject.complete(),
          this._detachedSubject.complete(),
          this._viewportChanges.unsubscribe(),
          (this._isDestroyed = !0),
          super.ngOnDestroy();
      }
      attach(t) {
        this._forOf,
          this.ngZone.runOutsideAngular(() => {
            (this._forOf = t),
              this._forOf.dataStream
                .pipe(Xt(this._detachedSubject))
                .subscribe((i) => {
                  let r = i.length;
                  r !== this._dataLength &&
                    ((this._dataLength = r),
                    this._scrollStrategy.onDataLengthChanged()),
                    this._doChangeDetection();
                });
          });
      }
      detach() {
        (this._forOf = null), this._detachedSubject.next();
      }
      getDataLength() {
        return this._dataLength;
      }
      getViewportSize() {
        return this._viewportSize;
      }
      getRenderedRange() {
        return this._renderedRange;
      }
      measureBoundingClientRectWithScrollOffset(t) {
        return this.getElementRef().nativeElement.getBoundingClientRect()[t];
      }
      setTotalContentSize(t) {
        this._totalContentSize !== t &&
          ((this._totalContentSize = t),
          this._calculateSpacerSize(),
          this._markChangeDetectionNeeded());
      }
      setRenderedRange(t) {
        HR(this._renderedRange, t) ||
          (this.appendOnly &&
            (t = { start: 0, end: Math.max(this._renderedRange.end, t.end) }),
          this._renderedRangeSubject.next((this._renderedRange = t)),
          this._markChangeDetectionNeeded(() =>
            this._scrollStrategy.onContentRendered()
          ));
      }
      getOffsetToRenderedContentStart() {
        return this._renderedContentOffsetNeedsRewrite
          ? null
          : this._renderedContentOffset;
      }
      setRenderedContentOffset(t, i = "to-start") {
        t = this.appendOnly && i === "to-start" ? 0 : t;
        let r = this.dir && this.dir.value == "rtl",
          o = this.orientation == "horizontal",
          s = o ? "X" : "Y",
          l = `translate${s}(${Number((o && r ? -1 : 1) * t)}px)`;
        (this._renderedContentOffset = t),
          i === "to-end" &&
            ((l += ` translate${s}(-100%)`),
            (this._renderedContentOffsetNeedsRewrite = !0)),
          this._renderedContentTransform != l &&
            ((this._renderedContentTransform = l),
            this._markChangeDetectionNeeded(() => {
              this._renderedContentOffsetNeedsRewrite
                ? ((this._renderedContentOffset -=
                    this.measureRenderedContentSize()),
                  (this._renderedContentOffsetNeedsRewrite = !1),
                  this.setRenderedContentOffset(this._renderedContentOffset))
                : this._scrollStrategy.onRenderedOffsetChanged();
            }));
      }
      scrollToOffset(t, i = "auto") {
        let r = { behavior: i };
        this.orientation === "horizontal" ? (r.start = t) : (r.top = t),
          this.scrollable.scrollTo(r);
      }
      scrollToIndex(t, i = "auto") {
        this._scrollStrategy.scrollToIndex(t, i);
      }
      measureScrollOffset(t) {
        let i;
        return (
          this.scrollable == this
            ? (i = (r) => super.measureScrollOffset(r))
            : (i = (r) => this.scrollable.measureScrollOffset(r)),
          Math.max(
            0,
            i(t ?? (this.orientation === "horizontal" ? "start" : "top")) -
              this.measureViewportOffset()
          )
        );
      }
      measureViewportOffset(t) {
        let i,
          r = "left",
          o = "right",
          s = this.dir?.value == "rtl";
        t == "start"
          ? (i = s ? o : r)
          : t == "end"
          ? (i = s ? r : o)
          : t
          ? (i = t)
          : (i = this.orientation === "horizontal" ? "left" : "top");
        let a = this.scrollable.measureBoundingClientRectWithScrollOffset(i);
        return this.elementRef.nativeElement.getBoundingClientRect()[i] - a;
      }
      measureRenderedContentSize() {
        let t = this._contentWrapper.nativeElement;
        return this.orientation === "horizontal"
          ? t.offsetWidth
          : t.offsetHeight;
      }
      measureRangeSize(t) {
        return this._forOf
          ? this._forOf.measureRangeSize(t, this.orientation)
          : 0;
      }
      checkViewportSize() {
        this._measureViewportSize(), this._scrollStrategy.onDataLengthChanged();
      }
      _measureViewportSize() {
        this._viewportSize = this.scrollable.measureViewportSize(
          this.orientation
        );
      }
      _markChangeDetectionNeeded(t) {
        t && this._runAfterChangeDetection.push(t),
          this._isChangeDetectionPending ||
            ((this._isChangeDetectionPending = !0),
            this.ngZone.runOutsideAngular(() =>
              Promise.resolve().then(() => {
                this._doChangeDetection();
              })
            ));
      }
      _doChangeDetection() {
        this._isDestroyed ||
          this.ngZone.run(() => {
            this._changeDetectorRef.markForCheck(),
              (this._contentWrapper.nativeElement.style.transform =
                this._renderedContentTransform),
              ho(
                () => {
                  this._isChangeDetectionPending = !1;
                  let t = this._runAfterChangeDetection;
                  this._runAfterChangeDetection = [];
                  for (let i of t) i();
                },
                { injector: this._injector }
              );
          });
      }
      _calculateSpacerSize() {
        (this._totalContentHeight =
          this.orientation === "horizontal"
            ? ""
            : `${this._totalContentSize}px`),
          (this._totalContentWidth =
            this.orientation === "horizontal"
              ? `${this._totalContentSize}px`
              : "");
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(
            X(Ct),
            X(jt),
            X(Re),
            X(q1, 8),
            X(Gd, 8),
            X(Am),
            X(jR),
            X(G1, 8)
          );
        };
      }
      static {
        this.ɵcmp = ot({
          type: e,
          selectors: [["cdk-virtual-scroll-viewport"]],
          viewQuery: function (i, r) {
            if ((i & 1 && go(RR, 7), i & 2)) {
              let o;
              ei((o = ti())) && (r._contentWrapper = o.first);
            }
          },
          hostAttrs: [1, "cdk-virtual-scroll-viewport"],
          hostVars: 4,
          hostBindings: function (i, r) {
            i & 2 &&
              _t(
                "cdk-virtual-scroll-orientation-horizontal",
                r.orientation === "horizontal"
              )(
                "cdk-virtual-scroll-orientation-vertical",
                r.orientation !== "horizontal"
              );
          },
          inputs: {
            orientation: "orientation",
            appendOnly: [2, "appendOnly", "appendOnly", wi],
          },
          outputs: { scrolledIndexChange: "scrolledIndexChange" },
          standalone: !0,
          features: [
            ii([
              {
                provide: Y1,
                useFactory: (t, i) => t || i,
                deps: [[new fs(), new F0(G1)], e],
              },
            ]),
            _s,
            An,
            mo,
          ],
          ngContentSelectors: kR,
          decls: 4,
          vars: 4,
          consts: [
            ["contentWrapper", ""],
            [1, "cdk-virtual-scroll-content-wrapper"],
            [1, "cdk-virtual-scroll-spacer"],
          ],
          template: function (i, r) {
            i & 1 && (Jn(), g(0, "div", 1, 0), Xn(2), m(), Y(3, "div", 2)),
              i & 2 &&
                (f(3),
                Cn("width", r._totalContentWidth)(
                  "height",
                  r._totalContentHeight
                ));
          },
          styles: [
            "cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}",
          ],
          encapsulation: 2,
          changeDetection: 0,
        });
      }
    }
    return e;
  })();
function W1(e, n, t) {
  let i = t;
  if (!i.getBoundingClientRect) return 0;
  let r = i.getBoundingClientRect();
  return e === "horizontal"
    ? n === "start"
      ? r.left
      : r.right
    : n === "start"
    ? r.top
    : r.bottom;
}
var Q1 = (() => {
  class e {
    get cdkVirtualForOf() {
      return this._cdkVirtualForOf;
    }
    set cdkVirtualForOf(t) {
      (this._cdkVirtualForOf = t),
        U1(t)
          ? this._dataSourceChanges.next(t)
          : this._dataSourceChanges.next(
              new Hd(mn(t) ? t : Array.from(t || []))
            );
    }
    get cdkVirtualForTrackBy() {
      return this._cdkVirtualForTrackBy;
    }
    set cdkVirtualForTrackBy(t) {
      (this._needsUpdate = !0),
        (this._cdkVirtualForTrackBy = t
          ? (i, r) =>
              t(i + (this._renderedRange ? this._renderedRange.start : 0), r)
          : void 0);
    }
    set cdkVirtualForTemplate(t) {
      t && ((this._needsUpdate = !0), (this._template = t));
    }
    get cdkVirtualForTemplateCacheSize() {
      return this._viewRepeater.viewCacheSize;
    }
    set cdkVirtualForTemplateCacheSize(t) {
      this._viewRepeater.viewCacheSize = Dl(t);
    }
    constructor(t, i, r, o, s, a) {
      (this._viewContainerRef = t),
        (this._template = i),
        (this._differs = r),
        (this._viewRepeater = o),
        (this._viewport = s),
        (this.viewChange = new He()),
        (this._dataSourceChanges = new He()),
        (this.dataStream = this._dataSourceChanges.pipe(
          Jr(null),
          Of(),
          ut(([l, c]) => this._changeDataSource(l, c)),
          Yo(1)
        )),
        (this._differ = null),
        (this._needsUpdate = !1),
        (this._destroyed = new He()),
        this.dataStream.subscribe((l) => {
          (this._data = l), this._onRenderedDataChange();
        }),
        this._viewport.renderedRangeStream
          .pipe(Xt(this._destroyed))
          .subscribe((l) => {
            (this._renderedRange = l),
              this.viewChange.observers.length &&
                a.run(() => this.viewChange.next(this._renderedRange)),
              this._onRenderedDataChange();
          }),
        this._viewport.attach(this);
    }
    measureRangeSize(t, i) {
      if (t.start >= t.end) return 0;
      t.start < this._renderedRange.start || t.end > this._renderedRange.end;
      let r = t.start - this._renderedRange.start,
        o = t.end - t.start,
        s,
        a;
      for (let l = 0; l < o; l++) {
        let c = this._viewContainerRef.get(l + r);
        if (c && c.rootNodes.length) {
          s = a = c.rootNodes[0];
          break;
        }
      }
      for (let l = o - 1; l > -1; l--) {
        let c = this._viewContainerRef.get(l + r);
        if (c && c.rootNodes.length) {
          a = c.rootNodes[c.rootNodes.length - 1];
          break;
        }
      }
      return s && a ? W1(i, "end", a) - W1(i, "start", s) : 0;
    }
    ngDoCheck() {
      if (this._differ && this._needsUpdate) {
        let t = this._differ.diff(this._renderedItems);
        t ? this._applyChanges(t) : this._updateContext(),
          (this._needsUpdate = !1);
      }
    }
    ngOnDestroy() {
      this._viewport.detach(),
        this._dataSourceChanges.next(void 0),
        this._dataSourceChanges.complete(),
        this.viewChange.complete(),
        this._destroyed.next(),
        this._destroyed.complete(),
        this._viewRepeater.detach();
    }
    _onRenderedDataChange() {
      this._renderedRange &&
        ((this._renderedItems = this._data.slice(
          this._renderedRange.start,
          this._renderedRange.end
        )),
        this._differ ||
          (this._differ = this._differs
            .find(this._renderedItems)
            .create((t, i) =>
              this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(t, i) : i
            )),
        (this._needsUpdate = !0));
    }
    _changeDataSource(t, i) {
      return (
        t && t.disconnect(this),
        (this._needsUpdate = !0),
        i ? i.connect(this) : J()
      );
    }
    _updateContext() {
      let t = this._data.length,
        i = this._viewContainerRef.length;
      for (; i--; ) {
        let r = this._viewContainerRef.get(i);
        (r.context.index = this._renderedRange.start + i),
          (r.context.count = t),
          this._updateComputedContextProperties(r.context),
          r.detectChanges();
      }
    }
    _applyChanges(t) {
      this._viewRepeater.applyChanges(
        t,
        this._viewContainerRef,
        (o, s, a) => this._getEmbeddedViewArgs(o, a),
        (o) => o.item
      ),
        t.forEachIdentityChange((o) => {
          let s = this._viewContainerRef.get(o.currentIndex);
          s.context.$implicit = o.item;
        });
      let i = this._data.length,
        r = this._viewContainerRef.length;
      for (; r--; ) {
        let o = this._viewContainerRef.get(r);
        (o.context.index = this._renderedRange.start + r),
          (o.context.count = i),
          this._updateComputedContextProperties(o.context);
      }
    }
    _updateComputedContextProperties(t) {
      (t.first = t.index === 0),
        (t.last = t.index === t.count - 1),
        (t.even = t.index % 2 === 0),
        (t.odd = !t.even);
    }
    _getEmbeddedViewArgs(t, i) {
      return {
        templateRef: this._template,
        context: {
          $implicit: t.item,
          cdkVirtualForOf: this._cdkVirtualForOf,
          index: -1,
          count: -1,
          first: !1,
          last: !1,
          odd: !1,
          even: !1,
        },
        index: i,
      };
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(X(bn), X(Kn), X(Ia), X(xm), X(Rm, 4), X(Re));
      };
    }
    static {
      this.ɵdir = dt({
        type: e,
        selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]],
        inputs: {
          cdkVirtualForOf: "cdkVirtualForOf",
          cdkVirtualForTrackBy: "cdkVirtualForTrackBy",
          cdkVirtualForTemplate: "cdkVirtualForTemplate",
          cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize",
        },
        standalone: !0,
        features: [ii([{ provide: xm, useClass: Ud }])],
      });
    }
  }
  return e;
})();
var Wd = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵmod = et({ type: e });
      }
      static {
        this.ɵinj = Xe({});
      }
    }
    return e;
  })(),
  K1 = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵmod = et({ type: e });
      }
      static {
        this.ɵinj = Xe({ imports: [Nm, Wd, Nm, Wd] });
      }
    }
    return e;
  })();
var zR = ["defaultImage"],
  GR = ["customLinkTemplate"];
function WR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "img", 5),
      me("error", function (r) {
        ve(t);
        let o = W(2);
        return ye(o.error(r));
      }),
      m();
  }
  if (e & 2) {
    let t = W(2);
    wu(t.previewClass), x("src", t.imageUrl, yn);
  }
}
function qR(e, n) {
  if ((e & 1 && (g(0, "div", 6), Du(1, 7), m()), e & 2)) {
    let t = W(2);
    f(), x("ngTemplateOutlet", t.defaultImage);
  }
}
function ZR(e, n) {
  if (
    (e & 1 && (bi(0), ie(1, WR, 1, 3, "img", 3)(2, qR, 2, 1, "div", 4), Ci()),
    e & 2)
  ) {
    let t = W();
    f(), x("ngIf", t.imageUrl), f(), x("ngIf", !t.imageUrl);
  }
}
function YR(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 8),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(r.downloadFile());
      }),
      Du(1, 7),
      m();
  }
  if (e & 2) {
    let t = W(),
      i = ni(3);
    f(), x("ngTemplateOutlet", t.customLinkTemplate || i);
  }
}
function QR(e, n) {
  e & 1 && (g(0, "button", 9), E(1, "Download"), m());
}
var J1 = ((t) => ((t[(t.Image = 0)] = "Image"), (t[(t.Link = 1)] = "Link"), t))(
    J1 || {}
  ),
  No = class e {
    constructor(n) {
      this._cd = n;
    }
    defaultImage;
    customLinkTemplate;
    entity;
    base64File;
    previewClass;
    _base64File;
    imageUrl;
    previewMode;
    PreviewModeEnum = J1;
    isLoadingImage = !1;
    sub$;
    ngOnChanges() {
      (this.imageUrl = void 0), this.downloadImage();
    }
    ngOnDestroy() {
      this.sub$?.unsubscribe();
    }
    downloadImage() {
      (this._base64File = null), this._downloadImage();
    }
    downloadFile() {
      this._base64File ||
        (this.sub$ = this.base64File.base64File.subscribe((n) => {
          this._base64File = n;
        }));
    }
    retryCount = 0;
    error(n) {
      if ((this.retryCount++, this.retryCount == 3)) {
        (this.imageUrl = void 0), this._cd.markForCheck();
        return;
      }
      n.type == "error" && this._downloadImage();
    }
    _downloadImage() {
      (this.imageUrl = void 0),
        this._cd.markForCheck(),
        this.base64File && this.previewMode;
    }
    static ɵfac = function (t) {
      return new (t || e)(X(jt));
    };
    static ɵcmp = ot({
      type: e,
      selectors: [["app-base64-file-preview"]],
      contentQueries: function (t, i, r) {
        if ((t & 1 && (Da(r, zR, 5), Da(r, GR, 5)), t & 2)) {
          let o;
          ei((o = ti())) && (i.defaultImage = o.first),
            ei((o = ti())) && (i.customLinkTemplate = o.first);
        }
      },
      inputs: {
        entity: "entity",
        base64File: "base64File",
        previewClass: "previewClass",
        previewMode: "previewMode",
      },
      features: [Vt],
      decls: 4,
      vars: 2,
      consts: [
        ["defaultTemplate", ""],
        [4, "ngIf"],
        [3, "click", 4, "ngIf"],
        [
          "alt",
          "loading..",
          "class",
          "image",
          3,
          "src",
          "class",
          "error",
          4,
          "ngIf",
        ],
        ["class", "image-container", 4, "ngIf"],
        ["alt", "loading..", 1, "image", 3, "error", "src"],
        [1, "image-container"],
        [3, "ngTemplateOutlet"],
        [3, "click"],
        ["type", "button"],
      ],
      template: function (t, i) {
        t & 1 &&
          ie(0, ZR, 3, 2, "ng-container", 1)(1, YR, 2, 1, "div", 2)(
            2,
            QR,
            2,
            0,
            "ng-template",
            null,
            0,
            wn
          ),
          t & 2 &&
            (x("ngIf", i.previewMode === i.PreviewModeEnum.Image),
            f(),
            x("ngIf", i.previewMode === i.PreviewModeEnum.Link));
      },
      dependencies: [Bt, Wp],
      styles: [
        ".image[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}",
      ],
    });
  };
function KR(e, n) {
  e & 1 && (g(0, "div", 23), Y(1, "img", 24), m());
}
function JR(e, n) {
  if ((e & 1 && Y(0, "div", 25), e & 2)) {
    let t = n.ngIf,
      i = W(2);
    _t("badge-status-success", t === i.EmployeeAvailableEnum.Available)(
      "badge-status-danger",
      t === i.EmployeeAvailableEnum.Unavailable
    )("badge-status-warning", t === i.EmployeeAvailableEnum.Remotely);
  }
}
function XR(e, n) {
  e & 1 && (g(0, "span", 26), E(1), A(2, "translate"), m()),
    e & 2 &&
      (f(), B("( ", $(2, 1, "CMSService::EmployeeGuide:Unavailable"), " )"));
}
function ek(e, n) {
  e & 1 && (g(0, "span", 27), E(1), A(2, "translate"), m()),
    e & 2 &&
      (f(), B("( ", $(2, 1, "CMSService::EmployeeGuide:Remotely"), " )"));
}
function tk(e, n) {
  if ((e & 1 && (g(0, "li"), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function nk(e, n) {
  if ((e & 1 && (g(0, "li"), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function ik(e, n) {
  if ((e & 1 && (g(0, "li"), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function rk(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "li", 28),
      me("click", function () {
        let r = ve(t).ngIf,
          o = W(2);
        return ye(o.copyTextToClipboard(r));
      }),
      Y(1, "i", 29),
      g(2, "span"),
      E(3),
      m()();
  }
  if (e & 2) {
    let t = n.ngIf;
    x("ngbTooltip", (t == null ? null : t.length) > 28 ? t : ""), f(3), de(t);
  }
}
function ok(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "li", 30),
      me("click", function () {
        let r = ve(t).ngIf,
          o = W(2);
        return ye(o.copyTextToClipboard(r));
      }),
      Y(1, "i", 31),
      g(2, "span", 32),
      E(3),
      m()();
  }
  if (e & 2) {
    let t = n.ngIf;
    f(3), de(t);
  }
}
function sk(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "li", 30),
      me("click", function () {
        let r = ve(t).ngIf,
          o = W(2);
        return ye(o.copyTextToClipboard(r));
      }),
      Y(1, "i", 33),
      g(2, "span", 32),
      E(3),
      m()();
  }
  if (e & 2) {
    let t = n.ngIf;
    f(3), de(t);
  }
}
function ak(e, n) {
  e & 1 && (g(0, "div"), Y(1, "i", 34), m());
}
function lk(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 22),
      Y(1, "div", 35),
      g(2, "div", 36),
      E(3),
      m(),
      g(4, "div", 6)(5, "div", 37)(6, "span", 38),
      E(7),
      A(8, "translate"),
      m(),
      g(9, "span", 39),
      E(10),
      A(11, "date"),
      m()(),
      g(12, "div", 37)(13, "span", 38),
      E(14),
      A(15, "translate"),
      m(),
      g(16, "span", 39),
      E(17),
      A(18, "date"),
      m()()()()),
    e & 2)
  ) {
    let t = W(2);
    f(3),
      de(t.employee.unavailableReason),
      f(4),
      B("", $(8, 5, "CMSService::EmployeeGuide:VactionFrom"), " :"),
      f(3),
      de(ft(11, 7, t.employee.unavailableFrom, t.AppConsts.DateOnlyFormat)),
      f(4),
      B("", $(15, 10, "CMSService::EmployeeGuide:VactionTo"), " :"),
      f(3),
      B(
        "",
        ft(18, 12, t.employee.unavailableTo, t.AppConsts.DateOnlyFormat),
        " "
      );
  }
}
function ck(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "li")(1, "div", 30),
      me("click", function () {
        let r = ve(t).ngIf,
          o = W(3);
        return ye(o.copyTextToClipboard(r));
      }),
      Y(2, "i", 29),
      g(3, "span", 32),
      E(4),
      m()()();
  }
  if (e & 2) {
    let t = n.ngIf;
    f(4), de(t);
  }
}
function uk(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "li")(1, "div", 30),
      me("click", function () {
        let r = ve(t).ngIf,
          o = W(3);
        return ye(o.copyTextToClipboard(r));
      }),
      Y(2, "i", 45),
      g(3, "span", 32),
      E(4),
      m()()();
  }
  if (e & 2) {
    let t = n.ngIf;
    f(4), de(t);
  }
}
function dk(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div"),
      Y(1, "div", 35),
      g(2, "div")(3, "div", 40),
      me("click", function () {
        ve(t);
        let r = W(2);
        return ye((r.isShowDelegateDetails = !r.isShowDelegateDetails));
      }),
      g(4, "span", 37)(5, "span", 38),
      E(6),
      A(7, "translate"),
      m(),
      g(8, "span", 41),
      E(9),
      m()(),
      g(10, "span"),
      Y(11, "i"),
      m()(),
      g(12, "div", 42),
      Y(13, "div", 43),
      g(14, "ul", 44),
      ie(15, ck, 5, 1, "li", 18)(16, uk, 5, 1, "li", 18),
      m()()()();
  }
  if (e & 2) {
    let t = W(2);
    f(6),
      B("", $(7, 9, "CMSService::EmployeeGuide:Delegator"), ":"),
      f(3),
      B(" ", t.employee.delegatorName, ""),
      f(2),
      _t("icon-chevron-down", !t.isShowDelegateDetails)(
        "icon-chevron-up",
        t.isShowDelegateDetails
      ),
      f(),
      x("@smoothCollapse", t.isShowDelegateDetails ? "final" : "initial"),
      f(3),
      x("ngIf", t.employee.delegatorEmail),
      f(),
      x("ngIf", t.employee.delegatorMobile);
  }
}
function fk(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 4)(1, "div", 5)(2, "div", 6)(3, "div", 7)(4, "div", 8),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(r.itemClicked.emit(r.employee));
      }),
      g(5, "div", 9)(6, "app-base64-file-preview", 10),
      ie(7, KR, 2, 0, "ng-template", null, 1, wn),
      m(),
      ie(9, JR, 1, 6, "div", 11),
      m(),
      g(10, "div", 12)(11, "label", 13),
      E(12),
      m(),
      ie(13, XR, 3, 3, "span", 14)(14, ek, 3, 3, "span", 15),
      m()(),
      g(15, "div", 16)(16, "ul", 17),
      ie(17, tk, 2, 1, "li", 18)(18, nk, 2, 1, "li", 18)(
        19,
        ik,
        2,
        1,
        "li",
        18
      )(20, rk, 4, 2, "li", 19)(21, ok, 4, 1, "li", 20)(22, sk, 4, 1, "li", 20),
      m()()(),
      ie(23, ak, 2, 0, "div", 18),
      m(),
      ie(24, lk, 19, 15, "div", 21),
      m(),
      g(25, "div", 22),
      ie(26, dk, 17, 11, "div", 18),
      m()();
  }
  if (e & 2) {
    let t = W();
    f(6),
      x("previewMode", t.PreviewModeEnum.Image),
      f(3),
      x("ngIf", t.employee.availability),
      f(3),
      de(t.employee.empFullName),
      f(),
      x(
        "ngIf",
        t.employee.availability === t.EmployeeAvailableEnum.Unavailable
      ),
      f(),
      x("ngIf", t.employee.availability === t.EmployeeAvailableEnum.Remotely),
      f(3),
      x("ngIf", t.employee.jobTitle),
      f(),
      x("ngIf", t.employee.sectorName),
      f(),
      x("ngIf", t.employee.generalDepartmentName),
      f(),
      x("ngIf", t.employee.email),
      f(),
      x("ngIf", t.employee.mobileNumber),
      f(),
      x("ngIf", t.employee.phoneNumber),
      f(),
      x("ngIf", t.employee.isRelated),
      f(),
      x("ngIf", t.employee.unavailableReason),
      f(2),
      x("ngIf", t.employee.delegatorName);
  }
}
function hk(e, n) {
  e & 1 && (g(0, "div", 46), Y(1, "img", 47), m());
}
var qd = ((i) => (
    (i[(i.Available = 1)] = "Available"),
    (i[(i.Unavailable = 2)] = "Unavailable"),
    (i[(i.Remotely = 3)] = "Remotely"),
    i
  ))(qd || {}),
  Zd = ((t) => ((t[(t.Image = 0)] = "Image"), (t[(t.Link = 1)] = "Link"), t))(
    Zd || {}
  ),
  pk = zr("smoothCollapse", [
    ar("initial", pn({ height: "0", overflow: "hidden", opacity: "0" })),
    ar("final", pn({ height: "43px", overflow: "hidden", opacity: "1" })),
    xi("initial=>final", Si("200ms")),
    xi("final=>initial", Si("200ms")),
  ]),
  Ml = class e {
    itemClicked = new Ne();
    employee;
    isShowDelegateDetails = !1;
    EmployeeAvailableEnum = qd;
    AttachmentEntities = Br;
    PreviewModeEnum = Zd;
    AppConsts = Ti;
    constructor() {}
    copyTextToClipboard(n) {
      n != null && n != "";
    }
    static ɵfac = function (t) {
      return new (t || e)();
    };
    static ɵcmp = ot({
      type: e,
      selectors: [["app-employee-guide-card"]],
      inputs: { employee: "employee" },
      outputs: { itemClicked: "itemClicked" },
      decls: 4,
      vars: 2,
      consts: [
        ["loadingData", ""],
        ["defaultImage", ""],
        [1, "card", "standing-card"],
        ["class", "card-body", 4, "ngIf", "ngIfElse"],
        [1, "card-body"],
        [1, "main-card"],
        [1, "d-flex", "justify-content-between"],
        [1, "d-flex", "flex-column"],
        [1, "img-flex-width", 3, "click"],
        [1, "circle-img"],
        [3, "previewMode"],
        [
          "class",
          "badge-status",
          3,
          "badge-status-success",
          "badge-status-danger",
          "badge-status-warning",
          4,
          "ngIf",
        ],
        [1, "d-flex", "flex-wrap", "align-items-center"],
        [1, "main-card-title"],
        ["class", "badge badge-error", 4, "ngIf"],
        ["class", "badge badge-warning", 4, "ngIf"],
        [1, "d-grid", "gap-1"],
        [1, "contact-container"],
        [4, "ngIf"],
        [
          "isEllipsisActive",
          "",
          "class",
          "grid-link email-link",
          3,
          "ngbTooltip",
          "click",
          4,
          "ngIf",
        ],
        ["class", "grid-link", 3, "click", 4, "ngIf"],
        ["class", "mx-1", 4, "ngIf"],
        [1, "mx-1"],
        [1, "avatar-image"],
        [
          "src",
          "../../../../assets/images/profile-avatar.svg",
          "alt",
          "Profile",
        ],
        [1, "badge-status"],
        [1, "badge", "badge-error"],
        [1, "badge", "badge-warning"],
        [
          "isEllipsisActive",
          "",
          1,
          "grid-link",
          "email-link",
          3,
          "click",
          "ngbTooltip",
        ],
        [1, "icon-mail"],
        [1, "grid-link", 3, "click"],
        [1, "icon-device-mobile", "fw-bold"],
        [1, "ltr-text"],
        [1, "icon-phone", "fw-bold"],
        [1, "icon-paper-clip", "employee-icons"],
        [1, "divider"],
        [1, "fw-bold", "mb-1"],
        [1, "fw-bold"],
        [1, "text-placeholder"],
        [1, "px-1", "text-dark"],
        [
          1,
          "d-flex",
          "justify-content-between",
          "mt-1",
          "mb-2",
          "cursor-pointer",
          "delegated-card",
          3,
          "click",
        ],
        [1, "px-1", "text-dark", "delegated-person"],
        [1, "d-flex"],
        [1, "img-flex-width"],
        [1, "contact-container", "d-grid", "gap-1"],
        [1, "icon-phone", "ltr-text"],
        [1, "card-body", "waiting-card"],
        ["src", "../../../assets/images/loaders/employee-card.svg", "alt", ""],
      ],
      template: function (t, i) {
        if (
          (t & 1 &&
            (g(0, "div", 2),
            ie(1, fk, 27, 14, "div", 3)(
              2,
              hk,
              2,
              0,
              "ng-template",
              null,
              0,
              wn
            ),
            m()),
          t & 2)
        ) {
          let r = ni(3);
          f(), x("ngIf", i.employee)("ngIfElse", r);
        }
      },
      dependencies: [Bt, Us, No, Pr, Jt],
      styles: [
        "[_nghost-%COMP%]{font-size:.75rem}.card.standing-card[_ngcontent-%COMP%]{border:1px solid var(--neutral-200, #E2E8F0);box-shadow:0 1px 2px #0000000d;margin-bottom:8px!important;width:calc(100% - 10px)}.card.standing-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{padding:8px}.card.standing-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .main-card[_ngcontent-%COMP%]   .circle-img[_ngcontent-%COMP%]   .avatar-image[_ngcontent-%COMP%]{width:32px;height:32px;font-size:.75rem;border-radius:100px;box-shadow:0 6px 16px #00000014}.card.standing-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .main-card[_ngcontent-%COMP%]   .main-card-title[_ngcontent-%COMP%]{font-size:.875rem;margin-bottom:0;font-weight:700;pointer-events:none}.card.standing-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .delegated-card[_ngcontent-%COMP%]:hover   .delegated-person[_ngcontent-%COMP%]{color:var(--secondary-dark-purple-100)!important}.card.standing-card[_ngcontent-%COMP%]:hover{transition:all .25s ease-in-out;box-shadow:0 4px 6px -2px #0000000d,0 10px 15px -3px #0000001a}.card.standing-card[_ngcontent-%COMP%]   .card-body.waiting-card[_ngcontent-%COMP%]{min-height:136px}.card.standing-card[_ngcontent-%COMP%]   .card-body.waiting-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{min-height:126px}.img-flex-width[_ngcontent-%COMP%]{display:flex;gap:8px;cursor:pointer}.img-flex-width[_ngcontent-%COMP%]:hover{color:var(--lpx-primary)}[_nghost-%COMP%]  .img-flex-width:hover .circle-img img, .img-flex-width[_ngcontent-%COMP%]:hover   .circle-img[_ngcontent-%COMP%]   .avatar-image[_ngcontent-%COMP%]{box-shadow:0 0 1px 2px var(--secondary-dark-purple-100)!important}ul.contact-container[_ngcontent-%COMP%]{list-style:none;margin-bottom:0;gap:.375rem;display:flex;flex-direction:column}html:not([dir=ltr])[_nghost-%COMP%]   ul.contact-container[_ngcontent-%COMP%], html:not([dir=ltr])   [_nghost-%COMP%]   ul.contact-container[_ngcontent-%COMP%]{padding-right:44px}html[dir=ltr][_nghost-%COMP%]   ul.contact-container[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   ul.contact-container[_ngcontent-%COMP%]{padding-left:44px}ul.contact-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style:none;padding:0;gap:.375rem;margin-bottom:0;display:flex;flex-wrap:wrap;justify-content:space-between;width:215px}ul.contact-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{color:var(--text-placeholder, #94A3B8);font-weight:700;display:flex;flex-wrap:wrap;align-items:center}ul.contact-container[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem;line-height:0}.employee-icons[_ngcontent-%COMP%]{font-size:1rem;color:var(--text-placeholder)}.email-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;direction:ltr}",
      ],
      data: { animation: [pk] },
      changeDetection: 0,
    });
  };
var mk = ["*"];
function _k(e, n) {
  e & 1 && Xn(0, 0, ["*ngIf", "!isLoadingData && isDataNotEmpty"]);
}
function vk(e, n) {
  if ((e & 1 && Y(0, "img", 5), e & 2)) {
    let t = W(2);
    Cn("height", t.loaderImageHeight),
      _t("flip-icon", t.flipLoadingImage),
      x("src", "./assets/images/loaders/" + t.loaderImage, yn);
  }
}
function yk(e, n) {
  e & 1 && (g(0, "span"), E(1), A(2, "translate"), m()),
    e & 2 && (f(), de($(2, 1, "CMSService::LoadingData")));
}
function bk(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 3), ie(1, vk, 1, 5, "img", 4)(2, yk, 3, 3, "span", 0), m()),
    e & 2)
  ) {
    let t = W();
    f(), x("ngIf", t.loaderImage), f(), x("ngIf", !t.loaderImage);
  }
}
function Ck(e, n) {
  if ((e & 1 && (g(0, "div", 11), Y(1, "img", 12), m()), e & 2)) {
    let t = W(2);
    f(), x("src", "./assets/images/nodata/" + t.nodataImage, yn);
  }
}
function wk(e, n) {
  e & 1 && (g(0, "div", 13), E(1), A(2, "translate"), m()),
    e & 2 && (f(), de($(2, 1, "CMSService::NoData")));
}
function Dk(e, n) {
  if ((e & 1 && (g(0, "div", 13), E(1), A(2, "translate"), m()), e & 2)) {
    let t = W(2);
    f(), de($(2, 1, t.nodataMessage));
  }
}
function Ek(e, n) {
  if ((e & 1 && (g(0, "span", 16), E(1), A(2, "translate"), m()), e & 2)) {
    let t = W(3);
    x("routerLink", t.nodataLink), f(), de($(2, 2, "::FromHere"));
  }
}
function Mk(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 14),
      E(1),
      A(2, "translate"),
      ie(3, Ek, 3, 4, "span", 15),
      m()),
    e & 2)
  ) {
    let t = W(2);
    f(), B(" ", $(2, 2, t.nodataHint), " "), f(2), x("ngIf", t.nodataLink);
  }
}
function Ik(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div")(1, "button", 17),
      me("click", function () {
        ve(t);
        let r = W(2);
        return ye(r.actionEvent());
      }),
      E(2),
      A(3, "translate"),
      m()();
  }
  if (e & 2) {
    let t = W(2);
    f(2), B(" ", $(3, 1, t.buttonText), " ");
  }
}
function Tk(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 6),
      ie(1, Ck, 2, 1, "div", 7),
      g(2, "div", 8),
      ie(3, wk, 3, 3, "div", 9)(4, Dk, 3, 3, "div", 9)(5, Mk, 4, 4, "div", 10)(
        6,
        Ik,
        4,
        3,
        "div",
        0
      ),
      m()()),
    e & 2)
  ) {
    let t = W();
    f(),
      x("ngIf", t.nodataImage),
      f(2),
      x("ngIf", !t.nodataMessage && !t.nodataHint),
      f(),
      x("ngIf", t.nodataMessage),
      f(),
      x("ngIf", t.nodataHint),
      f(),
      x("ngIf", t.showBtn);
  }
}
function Sk(e, n) {
  if ((e & 1 && (g(0, "div", 11), Y(1, "img", 12), m()), e & 2)) {
    let t = W(2);
    f(), x("src", "./assets/images/nodata/" + t.noFilterResultImage, yn);
  }
}
function xk(e, n) {
  e & 1 && (g(0, "div", 13), E(1), A(2, "translate"), m()),
    e & 2 && (f(), de($(2, 1, "CMSService::NoDataAfterFiltering")));
}
function Ok(e, n) {
  if ((e & 1 && (g(0, "div", 13), E(1), A(2, "translate"), m()), e & 2)) {
    let t = W(2);
    f(), de($(2, 1, t.noFilterResultMessage));
  }
}
function Nk(e, n) {
  if ((e & 1 && (g(0, "div", 14), E(1), A(2, "translate"), m()), e & 2)) {
    let t = W(2);
    f(), B(" ", $(2, 1, t.noFilterResultHint), " ");
  }
}
function Pk(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 6),
      ie(1, Sk, 2, 1, "div", 7),
      g(2, "div", 8),
      ie(3, xk, 3, 3, "div", 9)(4, Ok, 3, 3, "div", 9)(5, Nk, 3, 3, "div", 10),
      m()()),
    e & 2)
  ) {
    let t = W();
    f(),
      x("ngIf", t.noFilterResultImage),
      f(2),
      x("ngIf", !t.noFilterResultMessage && !t.noFilterResultHint),
      f(),
      x("ngIf", t.noFilterResultMessage),
      f(),
      x("ngIf", t.noFilterResultHint);
  }
}
var Po = class e {
  isLoadingData;
  loaderImage;
  loaderImageHeight;
  flipLoadingImage = !0;
  isDataNotEmpty;
  nodataImage;
  nodataMessage;
  nodataHint;
  nodataLink;
  isDataFiltered;
  noFilterResultImage;
  noFilterResultMessage;
  noFilterResultHint;
  showBtn;
  buttonText;
  buttonClicked = new Ne();
  actionEvent() {
    this.buttonClicked.emit();
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = ot({
    type: e,
    selectors: [["app-nodata-or-loading"]],
    inputs: {
      isLoadingData: "isLoadingData",
      loaderImage: "loaderImage",
      loaderImageHeight: "loaderImageHeight",
      flipLoadingImage: "flipLoadingImage",
      isDataNotEmpty: "isDataNotEmpty",
      nodataImage: "nodataImage",
      nodataMessage: "nodataMessage",
      nodataHint: "nodataHint",
      nodataLink: "nodataLink",
      isDataFiltered: "isDataFiltered",
      noFilterResultImage: "noFilterResultImage",
      noFilterResultMessage: "noFilterResultMessage",
      noFilterResultHint: "noFilterResultHint",
      showBtn: "showBtn",
      buttonText: "buttonText",
    },
    outputs: { buttonClicked: "buttonClicked" },
    ngContentSelectors: mk,
    decls: 4,
    vars: 4,
    consts: [
      [4, "ngIf"],
      ["class", "w-100 loader-image", 4, "ngIf"],
      ["class", "nodata-container", 4, "ngIf"],
      [1, "w-100", "loader-image"],
      [
        "class",
        "shimmer w-100 img-fluid",
        "alt",
        "loader",
        3,
        "height",
        "flip-icon",
        "src",
        4,
        "ngIf",
      ],
      ["alt", "loader", 1, "shimmer", "w-100", "img-fluid", 3, "src"],
      [1, "nodata-container"],
      ["class", "nodata-image", 4, "ngIf"],
      [1, "nodata-text"],
      ["class", "nodata-message", 4, "ngIf"],
      ["class", "nodata-hint", 4, "ngIf"],
      [1, "nodata-image"],
      ["alt", "nodata", 3, "src"],
      [1, "nodata-message"],
      [1, "nodata-hint"],
      ["role", "button", "class", "nodata-link", 3, "routerLink", 4, "ngIf"],
      ["role", "button", 1, "nodata-link", 3, "routerLink"],
      [
        1,
        "btn",
        "btn-sm",
        "btn-primary",
        "d-flex",
        "align-items-center",
        3,
        "click",
      ],
    ],
    template: function (t, i) {
      t & 1 &&
        (Jn(),
        ie(0, _k, 1, 0, "ng-content", 0)(1, bk, 3, 2, "div", 1)(
          2,
          Tk,
          7,
          5,
          "div",
          2
        )(3, Pk, 6, 4, "div", 2)),
        t & 2 &&
          (x("ngIf", !i.isLoadingData && i.isDataNotEmpty),
          f(),
          x("ngIf", i.isLoadingData),
          f(),
          x("ngIf", !i.isLoadingData && !i.isDataNotEmpty && !i.isDataFiltered),
          f(),
          x("ngIf", !i.isLoadingData && !i.isDataNotEmpty && i.isDataFiltered));
    },
    dependencies: [Bt, WC, Jt],
    styles: [
      ".nodata-container[_ngcontent-%COMP%]{flex-direction:column;display:flex;align-items:center;gap:24px;padding:10vh 0}.nodata-container[_ngcontent-%COMP%]   .nodata-image[_ngcontent-%COMP%]{border-radius:24px;padding:12px;opacity:.8;background:var(--basic-white, #FFF);box-shadow:0 6px 16px #00000014}.nodata-container[_ngcontent-%COMP%]   .nodata-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:84px;height:84px}.nodata-container[_ngcontent-%COMP%]   .nodata-text[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:12px;font-style:normal;font-weight:500;line-height:22px}.nodata-container[_ngcontent-%COMP%]   .nodata-text[_ngcontent-%COMP%]   .nodata-message[_ngcontent-%COMP%]{color:var(--basic-black, #000)}.nodata-container[_ngcontent-%COMP%]   .nodata-text[_ngcontent-%COMP%]   .nodata-hint[_ngcontent-%COMP%]{text-align:center;color:var(--neutral-600, #475569)}.nodata-container[_ngcontent-%COMP%]   .nodata-text[_ngcontent-%COMP%]   .nodata-hint[_ngcontent-%COMP%]   .nodata-link[_ngcontent-%COMP%]{color:var(--secondary-dark-purple-100, #5E1AD5)}.shimmer[_ngcontent-%COMP%]{mask:linear-gradient(-60deg,#000 30%,rgba(0,0,0,.3333333333),#000 70%) right/300% 100%;-webkit-mask:linear-gradient(-60deg,#000 30%,rgba(0,0,0,.3333333333),#000 70%) right/300% 100%;background-repeat:no-repeat;animation:_ngcontent-%COMP%_shimmer 2.5s infinite}@keyframes _ngcontent-%COMP%_shimmer{to{-webkit-mask-position:left}}@media (max-width: 991px){.nodata-container[_ngcontent-%COMP%]{padding:3vh 0!important}}",
    ],
  });
};
var Ao = class e {
  transform(n) {
    return n == null
      ? !1
      : n instanceof String || typeof n == "string"
      ? n.trim() != ""
      : !0;
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵpipe = yi({ name: "isNotNullOrEmpty", type: e, pure: !0 });
};
function Ak(e, n) {
  e & 1 && Y(0, "img", 29);
}
function Rk(e, n) {
  if ((e & 1 && Y(0, "div", 30), e & 2)) {
    let t = n.ngIf,
      i = W(2);
    _t("badge-status-success", t === i.EmployeeAvailableEnum.Available)(
      "badge-status-danger",
      t === i.EmployeeAvailableEnum.Unavailable
    )("badge-status-warning", t === i.EmployeeAvailableEnum.Remotely);
  }
}
function kk(e, n) {
  if ((e & 1 && (g(0, "div", 31), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function Fk(e, n) {
  e & 1 && (g(0, "span", 32), E(1), A(2, "translate"), m()),
    e & 2 &&
      (f(),
      B(
        "( ",
        $(2, 1, "UserProfileService::Profile:EmployeeAvailabilityStatus:1"),
        " )"
      ));
}
function Lk(e, n) {
  e & 1 && (g(0, "span", 33), E(1), A(2, "translate"), m()),
    e & 2 &&
      (f(),
      B(
        "( ",
        $(2, 1, "UserProfileService::Profile:EmployeeAvailabilityStatus:2"),
        " )"
      ));
}
function Vk(e, n) {
  e & 1 && (g(0, "span", 34), E(1), A(2, "translate"), m()),
    e & 2 &&
      (f(),
      B(
        "( ",
        $(2, 1, "UserProfileService::Profile:EmployeeAvailabilityStatus:3"),
        " )"
      ));
}
function jk(e, n) {
  if ((e & 1 && (g(0, "span", 35), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function Bk(e, n) {
  if ((e & 1 && (g(0, "span", 35), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function Hk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function Uk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), B(" ", t, "");
  }
}
function $k(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), B("", t, " ");
  }
}
function zk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), B("", t, " ");
  }
}
function Gk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), B(" ", t, "");
  }
}
function Wk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), de(t);
  }
}
function qk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), B(" ", t, "");
  }
}
function Zk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), B(" ", t, "");
  }
}
function Yk(e, n) {
  if ((e & 1 && (g(0, "span", 36), E(1), m()), e & 2)) {
    let t = n.ngIf;
    f(), B(" ", t, "");
  }
}
function Qk(e, n) {
  if ((e & 1 && (g(0, "span", 40), E(1), A(2, "date"), m()), e & 2)) {
    let t = n.ngIf,
      i = W(3);
    f(), B("", ft(2, 1, t, i.AppConsts.DateOnlyFormat), '" />');
  }
}
function Kk(e, n) {
  if ((e & 1 && (g(0, "span", 40), E(1), A(2, "date"), m()), e & 2)) {
    let t = n.ngIf,
      i = W(3);
    f(), B("", ft(2, 1, t, i.AppConsts.DateOnlyFormat), '" /> ');
  }
}
function Jk(e, n) {
  if (
    (e & 1 &&
      (Y(0, "hr", 16),
      g(1, "ul", 17)(2, "li", 37),
      E(3),
      m(),
      g(4, "li", 38)(5, "div")(6, "span"),
      E(7),
      A(8, "translate"),
      m(),
      ie(9, Qk, 3, 4, "span", 39),
      m(),
      g(10, "div")(11, "span"),
      E(12),
      A(13, "translate"),
      m(),
      ie(14, Kk, 3, 4, "span", 39),
      m()()()),
    e & 2)
  ) {
    let t = W(2);
    f(3),
      de(t.employeeData == null ? null : t.employeeData.unavailableResone),
      f(4),
      B("", $(8, 5, "CMSService::EmployeeGuide:VactionFrom"), " :"),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.unavailableFrom),
      f(3),
      B("", $(13, 7, "CMSService::EmployeeGuide:VactionTo"), " :"),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.unavailableTo);
  }
}
function Xk(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "li"),
      Y(1, "i", 23),
      E(2),
      A(3, "translate"),
      g(4, "div", 24),
      me("click", function () {
        let r = ve(t).ngIf,
          o = W(3);
        return ye(o.copyTextToClipboard(r));
      }),
      g(5, "span", 36),
      E(6),
      m()()();
  }
  if (e & 2) {
    let t = n.ngIf;
    f(2),
      B(" ", $(3, 3, "CMSService::EmployeeGuide:Email"), ": "),
      f(2),
      x("ngbTooltip", t),
      f(2),
      de(t);
  }
}
function eF(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "li"),
      Y(1, "i", 22),
      E(2),
      A(3, "translate"),
      g(4, "a", 20),
      me("click", function () {
        let r = ve(t).ngIf,
          o = W(3);
        return ye(o.copyTextToClipboard(r));
      }),
      g(5, "span", 35),
      E(6),
      m()()();
  }
  if (e & 2) {
    let t = n.ngIf;
    f(2),
      B(" ", $(3, 2, "CMSService::EmployeeGuide:MobileNumber"), ": "),
      f(4),
      B(" ", t, "");
  }
}
function tF(e, n) {
  if (
    (e & 1 &&
      (Y(0, "hr", 16),
      g(1, "ul", 17)(2, "li")(3, "span", 26),
      E(4),
      A(5, "translate"),
      m(),
      g(6, "span", 36),
      E(7),
      m()(),
      ie(8, Xk, 7, 5, "li", 41)(9, eF, 7, 4, "li", 41),
      m()),
    e & 2)
  ) {
    let t = W(2);
    f(4),
      B("", $(5, 4, "CMSService::EmployeeGuide:Delegator"), " :"),
      f(3),
      B("", t.employeeData == null ? null : t.employeeData.delegatorName, " "),
      f(),
      x("ngIf", t.employeeData == null ? null : t.employeeData.delegatorEmail),
      f(),
      x("ngIf", t.employeeData == null ? null : t.employeeData.delegatorMobile);
  }
}
function nF(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "app-nodata-or-loading", 4),
      A(1, "isNotNullOrEmpty"),
      g(2, "div", 5)(3, "i", 6),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(r.closeSidebar());
      }),
      m(),
      g(4, "div", 7)(5, "app-base64-file-preview", 8),
      ie(6, Ak, 1, 0, "ng-template", null, 0, wn),
      m(),
      ie(8, Rk, 1, 6, "div", 9),
      m(),
      g(9, "div", 10)(10, "h5", 11),
      E(11),
      m(),
      ie(12, kk, 2, 1, "div", 12)(13, Fk, 3, 3, "span", 13)(
        14,
        Lk,
        3,
        3,
        "span",
        14
      )(15, Vk, 3, 3, "span", 15),
      m(),
      Y(16, "hr", 16),
      g(17, "ul", 17)(18, "label"),
      E(19),
      A(20, "translate"),
      m(),
      g(21, "li"),
      Y(22, "i", 18),
      g(23, "span", 19),
      E(24),
      A(25, "translate"),
      m(),
      g(26, "div", 20),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(
          r.copyTextToClipboard(
            r.employeeData == null ? null : r.employeeData.phoneNumber
          )
        );
      }),
      ie(27, jk, 2, 1, "span", 21),
      m()(),
      g(28, "li"),
      Y(29, "i", 22),
      g(30, "span", 19),
      E(31),
      A(32, "translate"),
      m(),
      g(33, "div", 20),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(
          r.copyTextToClipboard(
            r.employeeData == null ? null : r.employeeData.mobileNumber
          )
        );
      }),
      ie(34, Bk, 2, 1, "span", 21),
      m()(),
      g(35, "li"),
      Y(36, "i", 23),
      g(37, "span", 19),
      E(38),
      A(39, "translate"),
      m(),
      g(40, "div", 24),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(
          r.copyTextToClipboard(
            r.employeeData == null ? null : r.employeeData.email
          )
        );
      }),
      ie(41, Hk, 2, 1, "span", 25),
      m()()(),
      Y(42, "hr", 16),
      g(43, "ul", 17)(44, "label"),
      E(45),
      A(46, "translate"),
      m(),
      g(47, "li"),
      E(48),
      A(49, "translate"),
      ie(50, Uk, 2, 1, "span", 25),
      m(),
      g(51, "li"),
      E(52),
      A(53, "translate"),
      ie(54, $k, 2, 1, "span", 25),
      m(),
      g(55, "li"),
      E(56),
      A(57, "translate"),
      ie(58, zk, 2, 1, "span", 25),
      m(),
      g(59, "li"),
      E(60),
      A(61, "translate"),
      ie(62, Gk, 2, 1, "span", 25),
      m()(),
      Y(63, "hr", 16),
      g(64, "ul", 17)(65, "label"),
      E(66),
      A(67, "translate"),
      m(),
      g(68, "li", 26),
      E(69),
      A(70, "translate"),
      ie(71, Wk, 2, 1, "span", 25),
      m(),
      g(72, "li", 26),
      E(73),
      A(74, "translate"),
      ie(75, qk, 2, 1, "span", 25),
      m(),
      g(76, "li", 26),
      E(77),
      A(78, "translate"),
      ie(79, Zk, 2, 1, "span", 25),
      m(),
      g(80, "li", 26),
      E(81),
      A(82, "translate"),
      ie(83, Yk, 2, 1, "span", 25),
      m()(),
      ie(84, Jk, 15, 9, "ng-template", 27)(85, tF, 10, 6, "ng-template", 27),
      Y(86, "div", 28),
      m()();
  }
  if (e & 2) {
    let t = W();
    x("isLoadingData", t.isLoading)("isDataNotEmpty", $(1, 37, t.employeeData)),
      f(5),
      x("previewMode", t.PreviewModeEnum.Image),
      f(3),
      x("ngIf", t.employeeData == null ? null : t.employeeData.availability),
      f(3),
      de(t.employeeData == null ? null : t.employeeData.empFullName),
      f(),
      x("ngIf", t.employeeData == null ? null : t.employeeData.jobTitle),
      f(),
      x(
        "ngIf",
        (t.employeeData == null ? null : t.employeeData.availability) ===
          t.EmployeeAvailableEnum.Available
      ),
      f(),
      x(
        "ngIf",
        (t.employeeData == null ? null : t.employeeData.availability) ===
          t.EmployeeAvailableEnum.Unavailable
      ),
      f(),
      x(
        "ngIf",
        (t.employeeData == null ? null : t.employeeData.availability) ===
          t.EmployeeAvailableEnum.Remotely
      ),
      f(4),
      de($(20, 39, "CMSService::EmployeeGuide:ContactInfo")),
      f(5),
      B("", $(25, 41, "CMSService::EmployeeGuide:WorkNumber"), " :"),
      f(3),
      x("ngIf", t.employeeData == null ? null : t.employeeData.phoneNumber),
      f(4),
      B(" ", $(32, 43, "CMSService::EmployeeGuide:MobileNumber"), " :"),
      f(3),
      x("ngIf", t.employeeData == null ? null : t.employeeData.mobileNumber),
      f(4),
      B("", $(39, 45, "CMSService::EmployeeGuide:Email"), " : "),
      f(2),
      x("ngbTooltip", t.employeeData == null ? null : t.employeeData.email),
      f(),
      x("ngIf", t.employeeData == null ? null : t.employeeData.email),
      f(4),
      de($(46, 47, "CMSService::EmployeeGuide:JobInfo")),
      f(3),
      B(" ", $(49, 49, "CMSService::EmployeeGuide:Sector"), " : "),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.sectorName),
      f(2),
      B(" ", $(53, 51, "CMSService::EmployeeGuide:PublicDepartment"), " : "),
      f(2),
      x(
        "ngIf",
        t.employeeData == null ? null : t.employeeData.generalDepartmentName
      ),
      f(2),
      B(" ", $(57, 53, "CMSService::EmployeeGuide:Department"), " : "),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.departmentName),
      f(2),
      B(" ", $(61, 55, "CMSService::EmployeeGuide:DirectManager"), " : "),
      f(2),
      x(
        "ngIf",
        t.employeeData == null ? null : t.employeeData.directManagerName
      ),
      f(4),
      de($(67, 57, "CMSService::EmployeeGuide:JobLocationInfo")),
      f(3),
      B(" ", $(70, 59, "CMSService::EmployeeGuide:BuildingNo"), " : "),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.buildingName),
      f(2),
      B(" ", $(74, 61, "CMSService::EmployeeGuide:WingNo"), " : "),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.sectionName),
      f(2),
      B(" ", $(78, 63, "CMSService::EmployeeGuide:FloorNo"), " : "),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.floorNumber),
      f(2),
      B(" ", $(82, 65, "CMSService::EmployeeGuide:OfficeNo"), " : "),
      f(2),
      x("ngIf", t.employeeData == null ? null : t.employeeData.officeNumber),
      f(),
      x(
        "ngIf",
        t.employeeData == null ? null : t.employeeData.unavailableResone
      ),
      f(),
      x("ngIf", t.employeeData == null ? null : t.employeeData.delegatorName);
  }
}
var Il = class e {
  AppConsts = Ti;
  sideBarClosed = new Ne(!0);
  _isOpen = !1;
  get isOpen() {
    return this._isOpen;
  }
  isLoading = !0;
  employeeData;
  EmployeeAvailableEnum = qd;
  PreviewModeEnum = Zd;
  AttachmentEntities = Br;
  constructor() {}
  openSidebar(n) {
    (this.isLoading = !0),
      J({
        username: "aeskef",
        empFullName:
          "\u0645\u0648\u0636\u064A \u0633\u0644\u064A\u0645\u0627\u0646 \u0623\u062D\u0645\u062F \u0628\u0646 \u0639\u062A\u064A\u0642",
        directManagerUserName: "msofi",
        directManagerName:
          "\u062A\u0648\u0641\u064A\u0642 \u0635\u0627\u0644\u062D \u0645\u0646\u0635\u0648\u0631 \u0627\u0644 \u0633\u0641\u0631\u0627\u0646",
        imageId: null,
        jobTitle: "\u0645\u062F\u064A\u0631 \u0627\u062F\u0627\u0631\u0629",
        phoneNumber: "+9666461411008",
        email: "sendmail-test-discard@oracle.com",
        mobileNumber: "+9666461411008",
        buildingName:
          "\u0627\u0644\u0645\u0642\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u0649 \u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0623\u062A\u0635\u0627\u0644\u0627\u062A",
        sectionName: "",
        officeNumber: "",
        floorNumber: "",
        sectorName:
          "\u0642\u0637\u0627\u0639 \u0627\u0644\u062A\u0646\u0638\u064A\u0645 \u0648\u0627\u0644\u0645\u0646\u0627\u0641\u0633\u0629",
        generalDepartmentName:
          "\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u062A\u0646\u0638\u064A\u0645\u0627\u062A \u0648\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635",
        departmentName:
          "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635",
        availability: 1,
        unavailableResone: null,
        unavailableFrom: null,
        unavailableTo: null,
        delegatorName: null,
        delegatorEmail: null,
        delegatorMobile: null,
        isRelated: null,
      })
        .pipe(ln(() => (this.isLoading = !1)))
        .subscribe((t) => {
          this.employeeData = t;
        }),
      (this._isOpen = !0);
  }
  closeSidebar() {
    (this.employeeData = null),
      (this._isOpen = !1),
      this.sideBarClosed.emit(!0);
  }
  copyTextToClipboard(n) {}
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = ot({
    type: e,
    selectors: [["app-employee-details-view"]],
    outputs: { sideBarClosed: "sideBarClosed" },
    decls: 3,
    vars: 5,
    consts: [
      ["defaultImage", ""],
      [3, "click"],
      [1, "guide-sidebar", "scroll-bar"],
      [
        "loaderImage",
        "employee-details-loader.svg",
        3,
        "isLoadingData",
        "isDataNotEmpty",
        4,
        "ngIf",
      ],
      [
        "loaderImage",
        "employee-details-loader.svg",
        3,
        "isLoadingData",
        "isDataNotEmpty",
      ],
      [1, "guide-sidebar-container"],
      [1, "flip-icon", "icon-arrow-left", "return-icon", 3, "click"],
      [1, "circle-img", "align-self-center"],
      [3, "previewMode"],
      [
        "class",
        "badge-status",
        3,
        "badge-status-success",
        "badge-status-danger",
        "badge-status-warning",
        4,
        "ngIf",
      ],
      [
        1,
        "d-flex",
        "flex-column",
        "align-self-center",
        "align-items-center",
        "gap-point-5",
      ],
      [1, "fw-bold", "text-center", "text-dark", "my-0"],
      ["class", "text-placeholder fw-bold", 4, "ngIf"],
      ["class", "badge badge-success", 4, "ngIf"],
      ["class", "badge badge-error", 4, "ngIf"],
      ["class", "badge badge-warning", 4, "ngIf"],
      [1, "my-0"],
      [1, "section-card"],
      [1, "icon-phone"],
      [1, "px-1"],
      [1, "grid-link", 3, "click"],
      ["class", "text-black ltr-text", 4, "ngIf"],
      [1, "icon-device-mobile"],
      [1, "icon-mail"],
      [1, "grid-link", "email-link", 3, "click", "ngbTooltip"],
      ["class", "text-black", 4, "ngIf"],
      [1, "text-placeholder"],
      [3, "ngIf"],
      [1, "mb-2"],
      [
        "src",
        "../../../../assets/images/profile-avatar.svg",
        "alt",
        "Profile",
        1,
        "avatar-image",
      ],
      [1, "badge-status"],
      [1, "text-placeholder", "fw-bold"],
      [1, "badge", "badge-success"],
      [1, "badge", "badge-error"],
      [1, "badge", "badge-warning"],
      [1, "text-black", "ltr-text"],
      [1, "text-black"],
      [1, "text-dark"],
      [1, "d-flex", "justify-content-between"],
      ["class", "ms-1 text-black", 4, "ngIf"],
      [1, "ms-1", "text-black"],
      [4, "ngIf"],
    ],
    template: function (t, i) {
      t & 1 &&
        (g(0, "div", 1),
        me("click", function () {
          return i.closeSidebar();
        }),
        m(),
        g(1, "div", 2),
        ie(2, nF, 87, 67, "app-nodata-or-loading", 3),
        m()),
        t & 2 &&
          (_t("guide-sidebar-backdrop", i.isOpen),
          f(),
          _t("active", i.isOpen),
          f(),
          x("ngIf", i.isOpen));
    },
    dependencies: [Bt, Us, Po, No, Pr, Jt, Ao],
    styles: [
      "[_nghost-%COMP%]{font-size:.75rem}.guide-sidebar[_ngcontent-%COMP%]{background:#fff;box-shadow:0 0 40px 8px #a3a3a340;overflow:auto}.guide-sidebar.active[_ngcontent-%COMP%]{padding:1rem 2rem 0rem}[_nghost-%COMP%]  .guide-sidebar .circle-img app-base64-file-preview img, [_nghost-%COMP%]  .guide-sidebar .circle-img app-base64-file-preview .avatar-image{width:120px;height:120px;border:3px solid var(--neutral-50, #F8FAFC);font-size:1.2rem;border-radius:154px}.guide-sidebar[_ngcontent-%COMP%]   .circle-img[_ngcontent-%COMP%]   .badge-status[_ngcontent-%COMP%]{width:18px;height:18px;border-radius:11px;left:13px;right:unset;bottom:7px;border-width:3px;top:96px}.guide-sidebar[_ngcontent-%COMP%]   .guide-sidebar-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.guide-sidebar[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%]{border-radius:.3125rem;padding:4px 10px;font-size:.625rem;background:var(--status-danger-50, #FFF1F2)}.guide-sidebar[_ngcontent-%COMP%]   .badge-success[_ngcontent-%COMP%]{background:var(--status-success-50, #F0FDFA)}html[dir=rtl][_nghost-%COMP%]   .guide-sidebar[_ngcontent-%COMP%]   .circle-img[_ngcontent-%COMP%]   .badge-status[_ngcontent-%COMP%], html[dir=rtl]   [_nghost-%COMP%]   .guide-sidebar[_ngcontent-%COMP%]   .circle-img[_ngcontent-%COMP%]   .badge-status[_ngcontent-%COMP%]{right:13px;left:unset}html[dir=rtl][_nghost-%COMP%]   .return-icon[_ngcontent-%COMP%], html[dir=rtl]   [_nghost-%COMP%]   .return-icon[_ngcontent-%COMP%]{left:16px;right:unset}.return-icon[_ngcontent-%COMP%]{position:absolute;right:16px;top:23px;color:var(--text-placeholder, #94A3B8);font-size:1rem;cursor:pointer}.return-icon[_ngcontent-%COMP%]:hover{color:var(--text-primary, #000)}ul.section-card[_ngcontent-%COMP%]{list-style:none;padding:0;margin-bottom:0;gap:.5rem;display:flex;flex-direction:column;font-weight:700;line-height:1.375rem}ul.section-card[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding-bottom:.25rem;color:var(--lpx-primary);font-weight:700}ul.section-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{color:var(--text-secondary, #94A3B8);display:flex;align-items:center;flex-wrap:wrap;gap:4px}ul.section-card[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1rem;line-height:0}a.grid-link[_ngcontent-%COMP%]{display:flex;color:var(--text-placeholder);text-decoration:none;align-items:center}a.grid-link[_ngcontent-%COMP%]:hover{text-decoration:underline}.email-link[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;direction:ltr}",
    ],
  });
};
var Tl = class e {
  transform(n) {
    return n.toString();
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵpipe = yi({ name: "asString", type: e, pure: !0 });
};
var oF = (e) => ({ count: e });
function sF(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "i", 19),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(r.clearSearch());
      }),
      m();
  }
}
function aF(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 20),
      Y(1, "app-nodata-or-loading", 21),
      A(2, "isNotNullOrEmpty"),
      A(3, "translate"),
      A(4, "translate"),
      A(5, "translate"),
      A(6, "translate"),
      m()),
    e & 2)
  ) {
    let t = W();
    x("ngClass", t.isLoading ? "pt-2" : "align-items-center"),
      f(),
      x("isLoadingData", t.isLoading)("isDataNotEmpty", !1)(
        "isDataFiltered",
        $(2, 8, t.filter.filterText)
      )(
        "nodataMessage",
        $(
          3,
          10,
          t.filter.filterText
            ? "CMSService::EmployeesGuideNoFilterResult"
            : "CMSService::EmployeesGuideNoData"
        )
      )(
        "nodataHint",
        $(
          4,
          12,
          t.filter.filterText
            ? "CMSService::ChangeFilters"
            : "CMSService::ReturnLater"
        )
      )(
        "noFilterResultMessage",
        $(5, 14, "CMSService::EmployeesGuideNoFilterResult")
      )("noFilterResultHint", $(6, 16, "CMSService::ChangeFilters"));
  }
}
function lF(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 25)(1, "app-employee-guide-card", 26),
      me("itemClicked", function () {
        let r = ve(t).$implicit,
          o = W(2),
          s = ni(24);
        return o.closeSidebar(), ye(s.openSidebar(r.username));
      }),
      m()();
  }
  if (e & 2) {
    let t = n.$implicit;
    f(), x("employee", t);
  }
}
function cF(e, n) {
  if (
    (e & 1 &&
      (g(0, "div", 22),
      E(1),
      A(2, "asString"),
      A(3, "translate"),
      m(),
      g(4, "cdk-virtual-scroll-viewport", 23),
      ie(5, lF, 2, 1, "div", 24),
      m()),
    e & 2)
  ) {
    let t = W();
    f(),
      B(
        " ",
        ft(
          3,
          4,
          t.isFiltering
            ? "CMSService::EmployeeGuide:FilteringEmployeeCount"
            : "CMSService::EmployeeGuide:TotalEmployeCount",
          Np(7, oF, $(2, 2, t.totalCount))
        ),
        " "
      ),
      f(4),
      x("cdkVirtualForOf", t.dataSource);
  }
}
var Sl = class e {
  _isOpen = !1;
  get isOpen() {
    return this._isOpen;
  }
  isLoading = !0;
  totalCount = 0;
  filter = { maxResultCount: 10, skipCount: 0, isRelated: !1 };
  isFiltering = !1;
  dataSource;
  constructor() {}
  _initDataSource() {
    this.dataSource ??= new $d(
      this,
      "searchByPageNumber",
      this.filter.maxResultCount
    );
  }
  openSidebar() {
    this._initDataSource(), (this._isOpen = !0);
  }
  closeSidebar(n = !1) {
    n && ((this.isLoading = !0), (this.dataSource = void 0)),
      (this._isOpen = !1);
  }
  filterTextChange() {
    (this.isLoading = !0), this.dataSource.clear();
  }
  clearSearch() {
    (this.filter.filterText = void 0), this.filterTextChange();
  }
  identify(n, t) {
    return t.id;
  }
  searchByPageNumber(n) {
    return (
      (this.isFiltering =
        this.filter.isRelated || !this.isNullOrEmpty(this.filter.filterText)),
      (this.filter.skipCount = n * this.filter.maxResultCount),
      J({
        totalCount: 5,
        items: [
          {
            imageId: null,
            availability: 1,
            username: "aeskef",
            empFullName:
              "\u0645\u0648\u0636\u064A \u0633\u0644\u064A\u0645\u0627\u0646 \u0623\u062D\u0645\u062F \u0628\u0646 \u0639\u062A\u064A\u0642",
            jobTitle: "\u0645\u062F\u064A\u0631 \u0627\u062F\u0627\u0631\u0629",
            sectorName:
              "\u0642\u0637\u0627\u0639 \u0627\u0644\u062A\u0646\u0638\u064A\u0645 \u0648\u0627\u0644\u0645\u0646\u0627\u0641\u0633\u0629",
            generalDepartmentName:
              "\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u062A\u0646\u0638\u064A\u0645\u0627\u062A \u0648\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635",
            departmentName:
              "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635",
            email: "sendmail-test-discard@oracle.com",
            mobileNumber: "+9666461411008",
            phoneNumber: "+9666461411008",
            delegatorName: null,
            delegatorEmail: null,
            delegatorMobile: null,
            unavailableReason: null,
            unavailableFrom: null,
            unavailableTo: null,
            isRelated: !1,
          },
          {
            imageId: null,
            availability: 1,
            username: "akellizy",
            empFullName: "akellizy",
            jobTitle: "\u0642\u0627\u0626\u062F \u0641\u0631\u064A\u0642",
            sectorName:
              "\u0642\u0637\u0627\u0639 \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0645\u0624\u0633\u0633\u064A",
            generalDepartmentName:
              "\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629",
            departmentName:
              "\u0625\u062F\u0627\u0631\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629",
            email: "akellizy@citc.gov.sa",
            mobileNumber: "+9664000000053",
            phoneNumber: "+9664000000053",
            delegatorName: null,
            delegatorEmail: null,
            delegatorMobile: null,
            unavailableReason: null,
            unavailableFrom: null,
            unavailableTo: null,
            isRelated: !0,
          },
          {
            imageId: 22,
            availability: 1,
            username: "allen",
            empFullName:
              "\u0627\u0644\u0645\u0647\u0646\u062F \u0639\u062F\u0646\u0627\u0646 \u0627\u062D\u0645\u062F",
            jobTitle:
              "\u0643\u0628\u064A\u0631 \u0625\u062F\u0627\u0631\u064A\u064A\u0646",
            sectorName: "\u0627\u0644\u0645\u062D\u0627\u0641\u0638",
            generalDepartmentName:
              "\u0642\u0637\u0627\u0639 \u062D\u0645\u0627\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646",
            departmentName:
              "\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u062A\u0641\u062A\u064A\u0634",
            email: "Direct1@citc.gov.sa",
            mobileNumber: "+9665854006000",
            phoneNumber: "+9665854006360",
            delegatorName: null,
            delegatorEmail: null,
            delegatorMobile: null,
            unavailableReason: null,
            unavailableFrom: null,
            unavailableTo: null,
            isRelated: !1,
          },
          {
            imageId: null,
            availability: 1,
            username: "msofi",
            empFullName: "msofi",
            jobTitle: "\u0642\u0627\u0626\u062F \u0641\u0631\u064A\u0642",
            sectorName:
              "\u0642\u0637\u0627\u0639 \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0645\u0624\u0633\u0633\u064A",
            generalDepartmentName:
              "\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629",
            departmentName:
              "\u0625\u062F\u0627\u0631\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629",
            email: "msofi@cst.gov.sa",
            mobileNumber: "+9664000000053",
            phoneNumber: "+9664000000053",
            delegatorName: null,
            delegatorEmail: null,
            delegatorMobile: null,
            unavailableReason: null,
            unavailableFrom: null,
            unavailableTo: null,
            isRelated: !0,
          },
          {
            imageId: 0,
            availability: 1,
            username: "yhamali",
            empFullName:
              "\u0639\u0628\u062F\u0627\u0644\u0643\u0631\u064A\u0645 \u062D\u0645\u062F \u0639\u0628\u062F\u0627\u0644\u0639\u0632\u064A\u0632 \u0627\u0644\u0639\u062B\u064A\u0645\u064A\u0646",
            jobTitle: "\u0645\u062F\u064A\u0631 \u0627\u062F\u0627\u0631\u0629",
            sectorName:
              "\u0642\u0637\u0627\u0639 \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0645\u0624\u0633\u0633\u064A",
            generalDepartmentName:
              "\u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0644\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629",
            departmentName:
              "\u0625\u062F\u0627\u0631\u0629 \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629",
            email: "isayed@starways.com.sa",
            mobileNumber: "+9666150702885",
            phoneNumber: "+9666150702885",
            delegatorName: null,
            delegatorEmail: null,
            delegatorMobile: null,
            unavailableReason: null,
            unavailableFrom: null,
            unavailableTo: null,
            isRelated: !1,
          },
        ],
      }).pipe(
        ut((t) => ((this.totalCount = t.totalCount), J(t))),
        ln(() => (this.isLoading = !1))
      )
    );
  }
  isNullOrEmpty(n) {
    return n == null || n.trim() === "";
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = ot({
    type: e,
    selectors: [["app-employee-guide"]],
    decls: 25,
    vars: 18,
    consts: [
      ["scrollingData", ""],
      ["employeeDetails", ""],
      [3, "click"],
      [1, "guide-sidebar"],
      [1, "d-flex", "justify-content-between"],
      [1, "guide-header"],
      [1, "close-icon", 3, "click"],
      [1, "icon-x"],
      [1, "my-0"],
      [1, "flex-grow-1", "d-flex", "flex-column", "px-16"],
      [1, "mb-2", "switch-employee"],
      [1, "form-check", "form-switch", "form-switch-reverse"],
      [
        "type",
        "checkbox",
        "role",
        "switch",
        "id",
        "RelatedEmployeeCheckbox",
        1,
        "form-check-input",
        "toggle",
        3,
        "ngModelChange",
        "ngModel",
      ],
      [
        "for",
        "RelatedEmployeeCheckbox",
        1,
        "form-check-label",
        "fw-bold",
        "my-auto",
      ],
      [1, "search-form-control"],
      [
        "id",
        "employee-guide-search-input",
        1,
        "form-control",
        "py-3",
        3,
        "ngModelChange",
        "ngModelChangeDebounced",
        "ngModel",
        "placeholder",
      ],
      ["class", "icon-x ", 3, "click", 4, "ngIf"],
      [
        "class",
        "flex-grow-1 d-flex justify-content-center",
        3,
        "ngClass",
        4,
        "ngIf",
        "ngIfElse",
      ],
      [3, "sideBarClosed"],
      [1, "icon-x", 3, "click"],
      [1, "flex-grow-1", "d-flex", "justify-content-center", 3, "ngClass"],
      [
        "loaderImage",
        "employee-guide-loader.svg",
        "nodataImage",
        "id-card.svg",
        "noFilterResultImage",
        "no-filter-result.svg",
        3,
        "isLoadingData",
        "isDataNotEmpty",
        "isDataFiltered",
        "nodataMessage",
        "nodataHint",
        "noFilterResultMessage",
        "noFilterResultHint",
      ],
      [1, "text-placeholder", "my-1", "text-small", "fw-bold"],
      ["itemSize", "220", 1, "guide-list", "animate-card"],
      [
        "class",
        "",
        4,
        "cdkVirtualFor",
        "cdkVirtualForIdentify",
        "cdkVirtualForOf",
      ],
      [1, ""],
      [3, "itemClicked", "employee"],
    ],
    template: function (t, i) {
      if (t & 1) {
        let r = $e();
        g(0, "div", 2),
          me("click", function () {
            return ve(r), ye(i.closeSidebar());
          }),
          m(),
          g(1, "div", 3)(2, "div", 4)(3, "div", 5),
          E(4),
          A(5, "translate"),
          m(),
          g(6, "div", 6),
          me("click", function () {
            return ve(r), ye(i.closeSidebar(!0));
          }),
          Y(7, "i", 7),
          m()(),
          Y(8, "hr", 8),
          g(9, "div", 9)(10, "div", 10)(11, "div", 11)(12, "input", 12),
          Iu("ngModelChange", function (s) {
            return (
              ve(r),
              Op(i.filter.isRelated, s) || (i.filter.isRelated = s),
              ye(s)
            );
          }),
          me("ngModelChange", function () {
            return ve(r), ye(i.filterTextChange());
          }),
          m(),
          g(13, "label", 13),
          E(14),
          A(15, "translate"),
          m()()(),
          g(16, "div", 14)(17, "input", 15),
          A(18, "translate"),
          Iu("ngModelChange", function (s) {
            return (
              ve(r),
              Op(i.filter.filterText, s) || (i.filter.filterText = s),
              ye(s)
            );
          }),
          me("ngModelChangeDebounced", function () {
            return ve(r), ye(i.filterTextChange());
          }),
          m(),
          ie(19, sF, 1, 0, "i", 16),
          m(),
          ie(20, aF, 7, 18, "div", 17)(
            21,
            cF,
            6,
            9,
            "ng-template",
            null,
            0,
            wn
          ),
          m()(),
          g(23, "app-employee-details-view", 18, 1),
          me("sideBarClosed", function () {
            return ve(r), ye(i.openSidebar());
          }),
          m();
      }
      if (t & 2) {
        let r = ni(22);
        _t("guide-sidebar-backdrop", i.isOpen),
          f(),
          _t("active", i.isOpen),
          f(3),
          de($(5, 12, "CMSService::EmployeeGuide:Title")),
          f(8),
          Mu("ngModel", i.filter.isRelated),
          f(2),
          de($(15, 14, "CMSService::EmployeeGuide:ReleatedWithMe")),
          f(3),
          Tt("placeholder", $(18, 16, "CMSService::EmployeeGuide:Search")),
          Mu("ngModel", i.filter.filterText),
          f(2),
          x("ngIf", i.filter.filterText),
          f(),
          x(
            "ngIf",
            i.isLoading || !(i.dataSource != null && i.dataSource.length)
          )("ngIfElse", r);
      }
    },
    dependencies: [bs, Bt, Nd, om, _1, am, Z1, Q1, Rm, Ml, Po, Il, Jt, Tl, Ao],
    styles: [
      "[_nghost-%COMP%]  app-nodata-or-loading .img-container{padding-top:15px}[_nghost-%COMP%]  app-nodata-or-loading .filter-container{height:calc(100vh - 224px);display:flex;justify-content:center}[_nghost-%COMP%]  app-nodata-or-loading .filter-container .filter-text{font-size:.75rem}[_nghost-%COMP%]  app-nodata-or-loading .loader-image>img{width:294px!important;height:419px!important}.px-16[_ngcontent-%COMP%]{padding-right:16px;padding-left:16px}.toggle[_ngcontent-%COMP%]{transition:all .5s ease}.animate-card[_ngcontent-%COMP%]{opacity:0;transform:translateY(100px);animation:_ngcontent-%COMP%_appear .7s ease forwards}@keyframes _ngcontent-%COMP%_appear{to{opacity:1;transform:translateY(0)}}",
    ],
    data: {
      animation: [
        zr("fadeAnimation", [
          xi(":enter", [pn({ opacity: 0 }), Si("300ms", pn({ opacity: 1 }))]),
          xi(":leave", [pn({ opacity: 1 }), Si("300ms", pn({ opacity: 0 }))]),
        ]),
      ],
    },
  });
};
var dF = ["prayerTime"],
  fF = ["weather"],
  hF = ["employeeGuide"],
  pF = ["*"];
function gF(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 33)(1, "div", 34),
      me("click", function () {
        ve(t);
        let r = W();
        return ye((r.showCustomizationMenuInOverlay = !1));
      }),
      m()();
  }
}
function mF(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 35)(1, "div", 34),
      me("click", function () {
        ve(t);
        let r = W();
        return ye((r.showNotificationsMenu = !1));
      }),
      m()();
  }
}
function _F(e, n) {
  if ((e & 1 && (g(0, "div", 36), E(1), m()), e & 2)) {
    let t = W();
    f(), de(t.location);
  }
}
function vF(e, n) {
  e & 1 && Y(0, "div", 37);
}
function yF(e, n) {
  e & 1 && (bi(0), E(1), A(2, "translate"), Ci()),
    e & 2 && (f(), de($(2, 1, "CMSService::PrayerToPrayer")));
}
function bF(e, n) {
  e & 1 && Y(0, "div", 37);
}
function CF(e, n) {
  if (e & 1) {
    let t = $e();
    g(0, "div", 38),
      me("click", function () {
        ve(t);
        let r = W();
        return ye(r.showWeather());
      }),
      Y(1, "img", 39),
      g(2, "div", 40)(3, "span", 41),
      E(4, " \u0652"),
      m(),
      E(5),
      g(6, "span", 42),
      E(7, " \u0652"),
      m(),
      E(8),
      m()();
  }
  if (e & 2) {
    let t = W();
    f(),
      Tt(
        "src",
        t.todayWeather == null ? null : t.todayWeather.conditionIcon,
        yn
      ),
      Tt("alt", t.todayWeather == null ? null : t.todayWeather.condition),
      f(4),
      B(" ", t.todayWeather == null ? null : t.todayWeather.maxtemp, " /"),
      f(3),
      B(" ", t.todayWeather == null ? null : t.todayWeather.mintemp, " ");
  }
}
function wF(e, n) {
  e & 1 && Y(0, "app-cst-footer");
}
var xl = class e {
  constructor(n) {
    this.router = n;
  }
  AppConsts = Ti;
  inHomePage = !1;
  remmaing;
  todayWeather;
  location;
  showCustomizationMenu = !1;
  showCustomizationMenuInOverlay = !1;
  showNotificationsMenu = !1;
  isShowFooter = !1;
  PreviewModeEnum = Xg;
  AttachmentEntities = Br;
  prayerTime;
  weather;
  employeeGuide;
  serviceContent = !1;
  backgroundImageId = 0;
  backgroundImageUrl;
  backgroundImageUrlSm;
  backgroundImageUrlMd;
  backgroundImageUrlLg;
  profileImageId = 0;
  profileFullName;
  swapImagesInterval;
  totalCount;
  isNotificationShow;
  ngOnChanges(n) {
    n.inHomePage &&
      setTimeout(() => {
        this.isShowFooter = !this.inHomePage;
      }, 0);
  }
  searchInRouterStateChildren(n) {
    return (
      n?.data?.inHomePage ||
      (n?.children?.length > 0 &&
        this.searchInRouterStateChildren(n.children[0]))
    );
  }
  ngOnInit() {}
  closeNotification(n) {}
  goToHome() {
    this.router.navigate(["/"]);
  }
  openSideBar(n) {
    n.stopPropagation();
  }
  dismissSidebar() {}
  getNotificationsCount(n) {
    this.totalCount = n;
  }
  hideWetherAndPrayertime() {
    this.weather.showWeather && (this.weather.showWeather = !1),
      this.prayerTime.showPrayerTime && (this.prayerTime.showPrayerTime = !1);
  }
  showPrayerTime() {
    (this.weather.showWeather = !1), this.prayerTime.togglePrayerTime();
  }
  showWeather() {
    (this.prayerTime.showPrayerTime = !1), this.weather.displayWeather();
  }
  getRemmaining(n) {
    this.remmaing = n;
  }
  getTodayWeather(n) {
    this.todayWeather = n;
  }
  getLocation(n) {
    this.location = n;
  }
  openEmployeeGuid() {
    this.employeeGuide.openSidebar();
  }
  openPublicSearch() {}
  setBackgroundImageUrl() {}
  runSwapImagesInterval() {}
  static ɵfac = function (t) {
    return new (t || e)(X(Ii));
  };
  static ɵcmp = ot({
    type: e,
    selectors: [["cst-workspace-cst-master-layaout"]],
    viewQuery: function (t, i) {
      if ((t & 1 && (go(dF, 7), go(fF, 7), go(hF, 7)), t & 2)) {
        let r;
        ei((r = ti())) && (i.prayerTime = r.first),
          ei((r = ti())) && (i.weather = r.first),
          ei((r = ti())) && (i.employeeGuide = r.first);
      }
    },
    inputs: { inHomePage: "inHomePage" },
    features: [Vt],
    ngContentSelectors: pF,
    decls: 47,
    vars: 18,
    consts: [
      ["prayerTime", ""],
      ["weather", ""],
      ["employeeGuide", ""],
      [1, "layout-container"],
      [1, "background"],
      [
        "src",
        "https://testing-convert-my-static-files-to-cdn-link.vercel.app/assets/images/0-lg.webp",
        "alt",
        "",
      ],
      [1, "header-shadow"],
      ["class", "menu-ovelay customization-menu", 4, "ngIf"],
      ["class", "menu-ovelay notifications-menu", 4, "ngIf"],
      [3, "click"],
      [1, "header"],
      [1, "header-info-section"],
      [1, "logo"],
      ["src", "../../assets/images/TheKey Logo.svg", "alt", "", 3, "click"],
      [1, "info-section"],
      [1, "location-section"],
      ["class", "country", 4, "ngIf"],
      ["class", "seperator", 4, "ngIf"],
      [1, "info-section-item", "prayer-item", 3, "click"],
      ["src", "../../assets/images/mousqe-icon.svg", "alt", ""],
      [4, "ngIf"],
      ["class", "info-section-item", 3, "click", 4, "ngIf"],
      [1, "header-content-section"],
      [1, "header-shortcuts"],
      [1, "header-content-item", "employee-guide-item", 3, "click"],
      [1, "icon-user-group"],
      [1, "employee-guide-title"],
      [1, "header-content-item-tooltip"],
      [1, "header-content-item", "icon-menu-container", 3, "click"],
      [1, "icon-menu", "header-icon"],
      [1, "outlet", 3, "click"],
      [3, "Remmaning"],
      [3, "todayWeather", "location"],
      [1, "menu-ovelay", "customization-menu"],
      [1, "menu-ovelay-backdrop", 3, "click"],
      [1, "menu-ovelay", "notifications-menu"],
      [1, "country"],
      [1, "seperator"],
      [1, "info-section-item", 3, "click"],
      [3, "src", "alt"],
      [1, "degree"],
      [1, "icon-max"],
      [1, "icon-min"],
    ],
    template: function (t, i) {
      if (t & 1) {
        let r = $e();
        Jn(),
          g(0, "div", 3)(1, "div", 4)(2, "picture"),
          Y(3, "img", 5),
          m()(),
          g(4, "div"),
          Y(5, "div", 6),
          m(),
          ie(6, gF, 2, 0, "div", 7)(7, mF, 2, 0, "div", 8),
          g(8, "div", 9),
          me("click", function () {
            return ve(r), ye(i.dismissSidebar());
          }),
          g(9, "div", 10)(10, "div", 11)(11, "div", 12)(12, "img", 13),
          me("click", function () {
            return ve(r), ye(i.goToHome());
          }),
          m()(),
          g(13, "div", 14)(14, "div", 15),
          ie(15, _F, 2, 1, "div", 16)(16, vF, 1, 0, "div", 17),
          m(),
          g(17, "div", 18),
          me("click", function () {
            return ve(r), ye(i.showPrayerTime());
          }),
          Y(18, "img", 19),
          g(19, "span"),
          E(20),
          ie(21, yF, 3, 3, "ng-container", 20),
          E(22),
          m()(),
          ie(23, bF, 1, 0, "div", 17)(24, CF, 9, 4, "div", 21),
          m()(),
          g(25, "div", 22)(26, "div", 23)(27, "div", 24),
          me("click", function () {
            return ve(r), ye(i.openEmployeeGuid());
          }),
          Y(28, "i", 25),
          g(29, "span", 26),
          E(30),
          A(31, "translate"),
          m(),
          g(32, "span", 27),
          E(33),
          A(34, "translate"),
          m()()(),
          g(35, "div", 28),
          me("click", function (s) {
            return ve(r), ye(i.openSideBar(s));
          }),
          Y(36, "i", 29),
          m()()(),
          g(37, "div", 30),
          me("click", function () {
            return ve(r), ye(i.hideWetherAndPrayertime());
          }),
          Xn(38),
          ie(39, wF, 1, 0, "app-cst-footer", 20),
          m(),
          g(40, "div", 9),
          me("click", function () {
            return ve(r), ye(i.hideWetherAndPrayertime());
          }),
          g(41, "app-prayer-time", 31, 0),
          me("Remmaning", function (s) {
            return ve(r), ye(i.getRemmaining(s));
          }),
          m(),
          g(43, "app-weather", 32, 1),
          me("todayWeather", function (s) {
            return ve(r), ye(i.getTodayWeather(s));
          })("location", function (s) {
            return ve(r), ye(i.getLocation(s));
          }),
          m()()()(),
          Y(45, "app-employee-guide", null, 2);
      }
      t & 2 &&
        (_t("in-home-page", i.inHomePage),
        f(6),
        x("ngIf", i.showCustomizationMenuInOverlay),
        f(),
        x("ngIf", i.showNotificationsMenu),
        f(8),
        x("ngIf", i.location),
        f(),
        x("ngIf", i.location),
        f(4),
        B(" ", i.remmaing == null ? null : i.remmaing.remanning, " "),
        f(),
        x("ngIf", !(i.remmaing != null && i.remmaing.isNextSunrise)),
        f(),
        B(
          " \xA0",
          i.remmaing == null || i.remmaing.prayer == null
            ? null
            : i.remmaing.prayer.name,
          " "
        ),
        f(),
        x("ngIf", i.todayWeather),
        f(),
        x("ngIf", i.todayWeather),
        f(6),
        B(" ", $(31, 14, "CMSService::EmployeesGuide"), " "),
        f(3),
        de($(34, 16, "CMSService::EmployeesGuide")),
        f(6),
        x("ngIf", i.isShowFooter));
    },
    dependencies: [Bt, _l, yl, bl, Sl, Jt],
    styles: [
      '@keyframes _ngcontent-%COMP%_breath{25%{filter:blur(.5px)}50%{scale:1.15;filter:blur(1px)}to{scale:1.15;filter:blur(1.5px)}}  body{background-color:#f0f0f6}.dropdown-toggle[_ngcontent-%COMP%]:after{display:none}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{position:absolute;z-index:-1;inset:0;background-size:cover;background-attachment:fixed;background-repeat:no-repeat;height:200px;background-color:#0003;background-blend-mode:color}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:100%;object-fit:cover}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]:before{content:"";display:block;position:absolute;background:#0003;width:100%;height:100%}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]   .header-shadow[_ngcontent-%COMP%]{height:100%;width:100%;background:linear-gradient(180deg,#000000bf,#0000)}.layout-container[_ngcontent-%COMP%]   .outlet[_ngcontent-%COMP%]{padding:2rem 2rem 1rem;min-height:calc(100vh - 95px);display:flex;flex-direction:column;justify-content:space-between}.layout-container[_ngcontent-%COMP%]   .outlet[_ngcontent-%COMP%]   router-outlet[_ngcontent-%COMP%]{display:none}.in-home-page[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{height:unset!important;position:fixed;animation:_ngcontent-%COMP%_breath 5s forwards;background-position:center;filter:none}.in-home-page[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]   .header-shadow[_ngcontent-%COMP%]{height:160px}.in-home-page[_ngcontent-%COMP%]   .outlet[_ngcontent-%COMP%]{padding:unset}.header[_ngcontent-%COMP%]{padding:24px 33px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}.header[_ngcontent-%COMP%]:before{content:" ";width:100%;height:100px;background:linear-gradient(180deg,#000000bf,#0000);position:absolute;inset:0;z-index:-1}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem;color:var(--basic-white, #fff);font-size:.75rem;font-style:normal;font-weight:700;line-height:1rem}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{cursor:pointer}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:70px;width:110px}@media (max-width: 575px){.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:54px;width:85px}}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .location-section[_ngcontent-%COMP%]{display:flex;gap:1rem}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .seperator[_ngcontent-%COMP%]{background:#d9d9d9;width:1px;height:16px}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]{gap:.5rem;padding:.375rem .75rem;display:flex;align-items:center;font-size:.6875rem;cursor:pointer}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px;height:20px}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]:hover{border-radius:24px;background:#ffffff1a;transition:all .2s ease-out}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.75rem}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%]{display:flex;gap:.75rem}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{cursor:pointer}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;gap:.25rem;padding:.75rem;border-radius:24px;background:#ffffff1a;color:var(--basic-white, #fff);font-size:.75rem;font-style:normal;font-weight:700;line-height:1rem;cursor:pointer}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--basic-white, #fff);font-size:20px;line-height:20px;width:20px;height:20px;display:flex}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:before{margin:0}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]   .header-content-item-tooltip[_ngcontent-%COMP%]{display:flex;opacity:0;border-radius:6px;background:#ffffff1a;padding:.125rem .5rem;position:absolute;right:50%;translate:50%;transition:all .4s ease-out;font-size:.625rem;font-style:normal;font-weight:700;line-height:1rem;white-space:nowrap}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]:hover{background:#fff3}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]:hover   .header-content-item-tooltip[_ngcontent-%COMP%]{opacity:1;transform:translateY(40px)}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .icon-menu-container[_ngcontent-%COMP%]{border:1px solid rgba(255,255,255,.25);padding:calc(.75rem - 1px)}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .employee-guide-item[_ngcontent-%COMP%]   .header-content-item-tooltip[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .drop-down-item[_ngcontent-%COMP%]{padding:0}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .drop-down-item[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]{padding:.75rem;position:relative}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .drop-down-item[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:0;left:0}.menu-ovelay[_ngcontent-%COMP%]{position:fixed;inset:0;display:flex;justify-content:center;z-index:-1;background-color:#00000040}.menu-ovelay[_ngcontent-%COMP%]   .menu-ovelay-backdrop[_ngcontent-%COMP%]{position:absolute;inset:0}.customization-menu[_ngcontent-%COMP%], .notifications-menu[_ngcontent-%COMP%]{padding-top:70px;padding-bottom:30px}html[dir=ltr][_nghost-%COMP%]   .degree[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .degree[_ngcontent-%COMP%]{position:relative}html[dir=ltr][_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-max[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-max[_ngcontent-%COMP%]{position:absolute;right:20px;padding-right:1px}html[dir=ltr][_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-min[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-min[_ngcontent-%COMP%]{position:absolute;right:-3px}[_nghost-%COMP%]  .profile .dropdown-toggle{text-decoration:none}[_nghost-%COMP%]  .profile .dropdown-toggle img{width:44px;height:44px;border-radius:50%}@media screen and (max-width: 1199px){.header[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%]   .employee-guide-item[_ngcontent-%COMP%]   .employee-guide-title[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%]   .employee-guide-item[_ngcontent-%COMP%]   .header-content-item-tooltip[_ngcontent-%COMP%]{display:flex}}@media screen and (max-width: 991px){.header[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item.prayer-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .location-section[_ngcontent-%COMP%]{display:none!important}}@media screen and (min-width: 360px) and (max-width: 425px){.header[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]   .degree[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]{gap:0}}@media screen and (max-width: 767px){.header[_ngcontent-%COMP%]{gap:.5rem}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%] > .header-content-item[_ngcontent-%COMP%]:not(.fixed-header-shortcut){display:none}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .location-section[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%], .header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]{gap:0}}@media screen and (max-width: 575px){.outlet[_ngcontent-%COMP%]{padding:.75rem 1rem 1rem!important}.header[_ngcontent-%COMP%]{padding:.625rem 1rem 0;gap:.25rem;position:sticky}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{height:115px}}.container-xxxl[_ngcontent-%COMP%]{--bs-gutter-x: 1.5rem;--bs-gutter-y: 0;width:100%;padding-left:calc(var(--bs-gutter-x) * .5);padding-right:calc(var(--bs-gutter-x) * .5);margin-left:auto;margin-right:auto}@media (min-width: 2180px){.container-xxxl[_ngcontent-%COMP%], .container-xxl[_ngcontent-%COMP%], .container-xl[_ngcontent-%COMP%], .container-lg[_ngcontent-%COMP%], .container-md[_ngcontent-%COMP%], .container-sm[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]{max-width:2100px}}.avatar-image[_ngcontent-%COMP%]{width:45px;height:45px;border-radius:100px;font-size:14px}',
    ],
  });
};
var EF = ["*"],
  Yd = class e {
    constructor(n) {
      this.translate = n;
      this.translate.addLangs(["ar", "en"]),
        this.translate.setDefaultLang("en"),
        this.translate.use("ar");
      debugger;
      document.addEventListener("valueChange", (t) => {
        console.log("event", t), (this.inHomePage = t.detail?.inHomePage);
      });
    }
    inHomePage = !1;
    ngOnChanges(n) {
      debugger;
      console.log(n);
    }
    change() {
      this.translate.use(this.translate.currentLang == "ar" ? "en" : "ar");
    }
    static ɵfac = function (t) {
      return new (t || e)(X(tr));
    };
    static ɵcmp = ot({
      type: e,
      selectors: [["app-root"]],
      features: [Vt],
      ngContentSelectors: EF,
      decls: 2,
      vars: 1,
      consts: [[3, "inHomePage"]],
      template: function (t, i) {
        t & 1 &&
          (Jn(), g(0, "cst-workspace-cst-master-layaout", 0), Xn(1), m()),
          t & 2 && x("inHomePage", i.inHomePage);
      },
      dependencies: [xl],
    });
  };
var Qd = class {
  http;
  prefix;
  suffix;
  constructor(n, t = "/assets/i18n/", i = ".json") {
    (this.http = n), (this.prefix = t), (this.suffix = i);
  }
  getTranslation(n) {
    return this.http.get(`${this.prefix}${n}${this.suffix}`);
  }
};
var Kd = {
  schedule(e, n) {
    let t = setTimeout(e, n);
    return () => clearTimeout(t);
  },
  scheduleBeforeRender(e) {
    if (typeof window > "u") return Kd.schedule(e, 0);
    if (typeof window.requestAnimationFrame > "u") return Kd.schedule(e, 16);
    let n = window.requestAnimationFrame(e);
    return () => window.cancelAnimationFrame(n);
  },
};
function MF(e) {
  return e.replace(/[A-Z]/g, (n) => `-${n.toLowerCase()}`);
}
function IF(e) {
  return !!e && e.nodeType === Node.ELEMENT_NODE;
}
function TF(e) {
  return typeof e == "function";
}
var km;
function SF(e, n) {
  if (!km) {
    let t = Element.prototype;
    km =
      t.matches ||
      t.matchesSelector ||
      t.mozMatchesSelector ||
      t.msMatchesSelector ||
      t.oMatchesSelector ||
      t.webkitMatchesSelector;
  }
  return e.nodeType === Node.ELEMENT_NODE ? km.call(e, n) : !1;
}
function xF(e, n) {
  return e === n || (e !== e && n !== n);
}
function OF(e) {
  let n = {};
  return (
    e.forEach(({ propName: t, templateName: i, transform: r }) => {
      n[MF(i)] = [t, r];
    }),
    n
  );
}
function NF(e, n) {
  return n.get(Hi).resolveComponentFactory(e).inputs;
}
function PF(e, n) {
  let t = e.childNodes,
    i = n.map(() => []),
    r = -1;
  n.some((o, s) => (o === "*" ? ((r = s), !0) : !1));
  for (let o = 0, s = t.length; o < s; ++o) {
    let a = t[o],
      l = AF(a, n, r);
    l !== -1 && i[l].push(a);
  }
  return i;
}
function AF(e, n, t) {
  let i = t;
  return (
    IF(e) && n.some((r, o) => (r !== "*" && SF(e, r) ? ((i = o), !0) : !1)), i
  );
}
var RF = 10,
  Fm = class {
    constructor(n, t) {
      this.componentFactory = t.get(Hi).resolveComponentFactory(n);
    }
    create(n) {
      return new Lm(this.componentFactory, n);
    }
  },
  Lm = class {
    constructor(n, t) {
      (this.componentFactory = n),
        (this.injector = t),
        (this.eventEmitters = new Yr(1)),
        (this.events = this.eventEmitters.pipe(ut((i) => uc(...i)))),
        (this.componentRef = null),
        (this.viewChangeDetectorRef = null),
        (this.inputChanges = null),
        (this.hasInputChanges = !1),
        (this.implementsOnChanges = !1),
        (this.scheduledChangeDetectionFn = null),
        (this.scheduledDestroyFn = null),
        (this.initialInputValues = new Map()),
        (this.unchangedInputs = new Set(
          this.componentFactory.inputs.map(({ propName: i }) => i)
        )),
        (this.ngZone = this.injector.get(Re)),
        (this.elementZone =
          typeof Zone > "u" ? null : this.ngZone.run(() => Zone.current));
    }
    connect(n) {
      this.runInZone(() => {
        if (this.scheduledDestroyFn !== null) {
          this.scheduledDestroyFn(), (this.scheduledDestroyFn = null);
          return;
        }
        this.componentRef === null && this.initializeComponent(n);
      });
    }
    disconnect() {
      this.runInZone(() => {
        this.componentRef === null ||
          this.scheduledDestroyFn !== null ||
          (this.scheduledDestroyFn = Kd.schedule(() => {
            this.componentRef !== null &&
              (this.componentRef.destroy(),
              (this.componentRef = null),
              (this.viewChangeDetectorRef = null));
          }, RF));
      });
    }
    getInputValue(n) {
      return this.runInZone(() =>
        this.componentRef === null
          ? this.initialInputValues.get(n)
          : this.componentRef.instance[n]
      );
    }
    setInputValue(n, t, i) {
      this.runInZone(() => {
        if (
          (i && (t = i.call(this.componentRef?.instance, t)),
          this.componentRef === null)
        ) {
          this.initialInputValues.set(n, t);
          return;
        }
        (xF(t, this.getInputValue(n)) &&
          !(t === void 0 && this.unchangedInputs.has(n))) ||
          (this.recordInputChange(n, t),
          this.unchangedInputs.delete(n),
          (this.hasInputChanges = !0),
          (this.componentRef.instance[n] = t),
          this.scheduleDetectChanges());
      });
    }
    initializeComponent(n) {
      let t = mt.create({ providers: [], parent: this.injector }),
        i = PF(n, this.componentFactory.ngContentSelectors);
      (this.componentRef = this.componentFactory.create(t, i, n)),
        (this.viewChangeDetectorRef = this.componentRef.injector.get(jt)),
        (this.implementsOnChanges = TF(this.componentRef.instance.ngOnChanges)),
        this.initializeInputs(),
        this.initializeOutputs(this.componentRef),
        this.detectChanges(),
        this.injector.get(hn).attachView(this.componentRef.hostView);
    }
    initializeInputs() {
      this.componentFactory.inputs.forEach(({ propName: n, transform: t }) => {
        this.initialInputValues.has(n) &&
          this.setInputValue(n, this.initialInputValues.get(n), t);
      }),
        this.initialInputValues.clear();
    }
    initializeOutputs(n) {
      let t = this.componentFactory.outputs.map(
        ({ propName: i, templateName: r }) =>
          n.instance[i].pipe(Ce((s) => ({ name: r, value: s })))
      );
      this.eventEmitters.next(t);
    }
    callNgOnChanges(n) {
      if (!this.implementsOnChanges || this.inputChanges === null) return;
      let t = this.inputChanges;
      (this.inputChanges = null), n.instance.ngOnChanges(t);
    }
    markViewForCheck(n) {
      this.hasInputChanges && ((this.hasInputChanges = !1), n.markForCheck());
    }
    scheduleDetectChanges() {
      this.scheduledChangeDetectionFn ||
        (this.scheduledChangeDetectionFn = Kd.scheduleBeforeRender(() => {
          (this.scheduledChangeDetectionFn = null), this.detectChanges();
        }));
    }
    recordInputChange(n, t) {
      if (!this.implementsOnChanges) return;
      this.inputChanges === null && (this.inputChanges = {});
      let i = this.inputChanges[n];
      if (i) {
        i.currentValue = t;
        return;
      }
      let r = this.unchangedInputs.has(n),
        o = r ? void 0 : this.getInputValue(n);
      this.inputChanges[n] = new pa(o, t, r);
    }
    detectChanges() {
      this.componentRef !== null &&
        (this.callNgOnChanges(this.componentRef),
        this.markViewForCheck(this.viewChangeDetectorRef),
        this.componentRef.changeDetectorRef.detectChanges());
    }
    runInZone(n) {
      return this.elementZone && Zone.current !== this.elementZone
        ? this.ngZone.run(n)
        : n();
    }
  },
  Vm = class extends HTMLElement {
    constructor() {
      super(...arguments), (this.ngElementEventsSubscription = null);
    }
  };
function nw(e, n) {
  let t = NF(e, n.injector),
    i = n.strategyFactory || new Fm(e, n.injector),
    r = OF(t);
  class o extends Vm {
    static {
      this.observedAttributes = Object.keys(r);
    }
    get ngElementStrategy() {
      if (!this._ngElementStrategy) {
        let a = (this._ngElementStrategy = i.create(
          this.injector || n.injector
        ));
        t.forEach(({ propName: l, transform: c }) => {
          if (!this.hasOwnProperty(l)) return;
          let u = this[l];
          delete this[l], a.setInputValue(l, u, c);
        });
      }
      return this._ngElementStrategy;
    }
    constructor(a) {
      super(), (this.injector = a);
    }
    attributeChangedCallback(a, l, c, u) {
      let [d, _] = r[a];
      this.ngElementStrategy.setInputValue(d, c, _);
    }
    connectedCallback() {
      let a = !1;
      this.ngElementStrategy.events && (this.subscribeToEvents(), (a = !0)),
        this.ngElementStrategy.connect(this),
        a || this.subscribeToEvents();
    }
    disconnectedCallback() {
      this._ngElementStrategy && this._ngElementStrategy.disconnect(),
        this.ngElementEventsSubscription &&
          (this.ngElementEventsSubscription.unsubscribe(),
          (this.ngElementEventsSubscription = null));
    }
    subscribeToEvents() {
      this.ngElementEventsSubscription =
        this.ngElementStrategy.events.subscribe((a) => {
          let l = new CustomEvent(a.name, { detail: a.value });
          this.dispatchEvent(l);
        });
    }
  }
  return (
    t.forEach(({ propName: s, transform: a }) => {
      Object.defineProperty(o.prototype, s, {
        get() {
          return this.ngElementStrategy.getInputValue(s);
        },
        set(l) {
          this.ngElementStrategy.setInputValue(s, l, a);
        },
        configurable: !0,
        enumerable: !0,
      });
    }),
    o
  );
}
var r9 = new z("NG_SCROLLBAR"),
  kF = {
    trackClass: "",
    thumbClass: "",
    buttonClass: "",
    orientation: "auto",
    appearance: "native",
    visibility: "native",
    position: "native",
    trackScrollDuration: 50,
    sensorThrottleTime: 0,
    disableSensor: !1,
    disableInteraction: !1,
    buttons: !1,
    hoverOffset: !1,
  },
  FF =
    "https://cdn.statically.io/gist/MurhafSousli/c852b6a672069396953f06ddd4b64620/raw/ef55db72e2abb7bc002ed79f4ad4cf408bfdb72f/scroll-timeline-lite.js";
var o9 = new z("NG_SCROLLBAR_OPTIONS", {
    providedIn: "root",
    factory: () => kF,
  }),
  s9 = new z("NG_SCROLLBAR_POLYFILL", {
    providedIn: "root",
    factory: () => FF,
  });
var a9 = new z("SCROLLBAR_CONTROL");
var iw = (() => {
  class e {
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵmod = et({ type: e });
    }
    static {
      this.ɵinj = Xe({});
    }
  }
  return e;
})();
var Jd = class e {
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵmod = et({ type: e });
  static ɵinj = Xe({
    providers: [tr],
    imports: [Wu, B1, Md, b1, iw, tl, K1, Wd],
  });
};
function LF(e) {
  return new Qd(
    e,
    "https://testing-convert-my-static-files-to-cdn-link.vercel.app/i18n/",
    ".json"
  );
}
var Xd = class e {
  constructor(n) {
    this.injector = n;
  }
  ngDoBootstrap() {
    customElements.define("my-app", nw(Yd, { injector: this.injector }));
  }
  static ɵfac = function (t) {
    return new (t || e)(q(mt));
  };
  static ɵmod = et({ type: e });
  static ɵinj = Xe({
    providers: [Wb(qb())],
    imports: [
      nC,
      Cd,
      Md.forRoot({ loader: { provide: jr, useFactory: LF, deps: [Xp] } }),
      Jd,
    ],
  });
};
var Oi = globalThis;
function Bn(e) {
  return (Oi.__Zone_symbol_prefix || "__zone_symbol__") + e;
}
function VF() {
  let e = Oi.performance;
  function n(_e) {
    e && e.mark && e.mark(_e);
  }
  function t(_e, te) {
    e && e.measure && e.measure(_e, te);
  }
  n("Zone");
  let i = (() => {
      class _e {
        static {
          this.__symbol__ = Bn;
        }
        static assertZonePatched() {
          if (Oi.Promise !== le.ZoneAwarePromise)
            throw new Error(
              "Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)"
            );
        }
        static get root() {
          let y = _e.current;
          for (; y.parent; ) y = y.parent;
          return y;
        }
        static get current() {
          return ae.zone;
        }
        static get currentTask() {
          return fe;
        }
        static __load_patch(y, b, he = !1) {
          if (le.hasOwnProperty(y)) {
            let ne = Oi[Bn("forceDuplicateZoneCheck")] === !0;
            if (!he && ne) throw Error("Already loaded patch: " + y);
          } else if (!Oi["__Zone_disable_" + y]) {
            let ne = "Zone:" + y;
            n(ne), (le[y] = b(Oi, _e, se)), t(ne, ne);
          }
        }
        get parent() {
          return this._parent;
        }
        get name() {
          return this._name;
        }
        constructor(y, b) {
          (this._parent = y),
            (this._name = b ? b.name || "unnamed" : "<root>"),
            (this._properties = (b && b.properties) || {}),
            (this._zoneDelegate = new o(
              this,
              this._parent && this._parent._zoneDelegate,
              b
            ));
        }
        get(y) {
          let b = this.getZoneWith(y);
          if (b) return b._properties[y];
        }
        getZoneWith(y) {
          let b = this;
          for (; b; ) {
            if (b._properties.hasOwnProperty(y)) return b;
            b = b._parent;
          }
          return null;
        }
        fork(y) {
          if (!y) throw new Error("ZoneSpec required!");
          return this._zoneDelegate.fork(this, y);
        }
        wrap(y, b) {
          if (typeof y != "function")
            throw new Error("Expecting function got: " + y);
          let he = this._zoneDelegate.intercept(this, y, b),
            ne = this;
          return function () {
            return ne.runGuarded(he, this, arguments, b);
          };
        }
        run(y, b, he, ne) {
          ae = { parent: ae, zone: this };
          try {
            return this._zoneDelegate.invoke(this, y, b, he, ne);
          } finally {
            ae = ae.parent;
          }
        }
        runGuarded(y, b = null, he, ne) {
          ae = { parent: ae, zone: this };
          try {
            try {
              return this._zoneDelegate.invoke(this, y, b, he, ne);
            } catch (We) {
              if (this._zoneDelegate.handleError(this, We)) throw We;
            }
          } finally {
            ae = ae.parent;
          }
        }
        runTask(y, b, he) {
          if (y.zone != this)
            throw new Error(
              "A task can only be run in the zone of creation! (Creation: " +
                (y.zone || P).name +
                "; Execution: " +
                this.name +
                ")"
            );
          let ne = y,
            {
              type: We,
              data: { isPeriodic: Oe = !1, isRefreshable: Ot = !1 } = {},
            } = y;
          if (y.state === F && (We === Ee || We === Z)) return;
          let yt = y.state != U;
          yt && ne._transitionTo(U, T);
          let wt = fe;
          (fe = ne), (ae = { parent: ae, zone: this });
          try {
            We == Z && y.data && !Oe && !Ot && (y.cancelFn = void 0);
            try {
              return this._zoneDelegate.invokeTask(this, ne, b, he);
            } catch (kt) {
              if (this._zoneDelegate.handleError(this, kt)) throw kt;
            }
          } finally {
            let kt = y.state;
            if (kt !== F && kt !== ee)
              if (We == Ee || Oe || (Ot && kt === R))
                yt && ne._transitionTo(T, U, R);
              else {
                let H = ne._zoneDelegates;
                this._updateTaskCount(ne, -1),
                  yt && ne._transitionTo(F, U, F),
                  Ot && (ne._zoneDelegates = H);
              }
            (ae = ae.parent), (fe = wt);
          }
        }
        scheduleTask(y) {
          if (y.zone && y.zone !== this) {
            let he = this;
            for (; he; ) {
              if (he === y.zone)
                throw Error(
                  `can not reschedule task to ${this.name} which is descendants of the original zone ${y.zone.name}`
                );
              he = he.parent;
            }
          }
          y._transitionTo(R, F);
          let b = [];
          (y._zoneDelegates = b), (y._zone = this);
          try {
            y = this._zoneDelegate.scheduleTask(this, y);
          } catch (he) {
            throw (
              (y._transitionTo(ee, R, F),
              this._zoneDelegate.handleError(this, he),
              he)
            );
          }
          return (
            y._zoneDelegates === b && this._updateTaskCount(y, 1),
            y.state == R && y._transitionTo(T, R),
            y
          );
        }
        scheduleMicroTask(y, b, he, ne) {
          return this.scheduleTask(new s(ce, y, b, he, ne, void 0));
        }
        scheduleMacroTask(y, b, he, ne, We) {
          return this.scheduleTask(new s(Z, y, b, he, ne, We));
        }
        scheduleEventTask(y, b, he, ne, We) {
          return this.scheduleTask(new s(Ee, y, b, he, ne, We));
        }
        cancelTask(y) {
          if (y.zone != this)
            throw new Error(
              "A task can only be cancelled in the zone of creation! (Creation: " +
                (y.zone || P).name +
                "; Execution: " +
                this.name +
                ")"
            );
          if (!(y.state !== T && y.state !== U)) {
            y._transitionTo(K, T, U);
            try {
              this._zoneDelegate.cancelTask(this, y);
            } catch (b) {
              throw (
                (y._transitionTo(ee, K),
                this._zoneDelegate.handleError(this, b),
                b)
              );
            }
            return (
              this._updateTaskCount(y, -1),
              y._transitionTo(F, K),
              (y.runCount = -1),
              y
            );
          }
        }
        _updateTaskCount(y, b) {
          let he = y._zoneDelegates;
          b == -1 && (y._zoneDelegates = null);
          for (let ne = 0; ne < he.length; ne++)
            he[ne]._updateTaskCount(y.type, b);
        }
      }
      return _e;
    })(),
    r = {
      name: "",
      onHasTask: (_e, te, y, b) => _e.hasTask(y, b),
      onScheduleTask: (_e, te, y, b) => _e.scheduleTask(y, b),
      onInvokeTask: (_e, te, y, b, he, ne) => _e.invokeTask(y, b, he, ne),
      onCancelTask: (_e, te, y, b) => _e.cancelTask(y, b),
    };
  class o {
    get zone() {
      return this._zone;
    }
    constructor(te, y, b) {
      (this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 }),
        (this._zone = te),
        (this._parentDelegate = y),
        (this._forkZS = b && (b && b.onFork ? b : y._forkZS)),
        (this._forkDlgt = b && (b.onFork ? y : y._forkDlgt)),
        (this._forkCurrZone = b && (b.onFork ? this._zone : y._forkCurrZone)),
        (this._interceptZS = b && (b.onIntercept ? b : y._interceptZS)),
        (this._interceptDlgt = b && (b.onIntercept ? y : y._interceptDlgt)),
        (this._interceptCurrZone =
          b && (b.onIntercept ? this._zone : y._interceptCurrZone)),
        (this._invokeZS = b && (b.onInvoke ? b : y._invokeZS)),
        (this._invokeDlgt = b && (b.onInvoke ? y : y._invokeDlgt)),
        (this._invokeCurrZone =
          b && (b.onInvoke ? this._zone : y._invokeCurrZone)),
        (this._handleErrorZS = b && (b.onHandleError ? b : y._handleErrorZS)),
        (this._handleErrorDlgt =
          b && (b.onHandleError ? y : y._handleErrorDlgt)),
        (this._handleErrorCurrZone =
          b && (b.onHandleError ? this._zone : y._handleErrorCurrZone)),
        (this._scheduleTaskZS =
          b && (b.onScheduleTask ? b : y._scheduleTaskZS)),
        (this._scheduleTaskDlgt =
          b && (b.onScheduleTask ? y : y._scheduleTaskDlgt)),
        (this._scheduleTaskCurrZone =
          b && (b.onScheduleTask ? this._zone : y._scheduleTaskCurrZone)),
        (this._invokeTaskZS = b && (b.onInvokeTask ? b : y._invokeTaskZS)),
        (this._invokeTaskDlgt = b && (b.onInvokeTask ? y : y._invokeTaskDlgt)),
        (this._invokeTaskCurrZone =
          b && (b.onInvokeTask ? this._zone : y._invokeTaskCurrZone)),
        (this._cancelTaskZS = b && (b.onCancelTask ? b : y._cancelTaskZS)),
        (this._cancelTaskDlgt = b && (b.onCancelTask ? y : y._cancelTaskDlgt)),
        (this._cancelTaskCurrZone =
          b && (b.onCancelTask ? this._zone : y._cancelTaskCurrZone)),
        (this._hasTaskZS = null),
        (this._hasTaskDlgt = null),
        (this._hasTaskDlgtOwner = null),
        (this._hasTaskCurrZone = null);
      let he = b && b.onHasTask,
        ne = y && y._hasTaskZS;
      (he || ne) &&
        ((this._hasTaskZS = he ? b : r),
        (this._hasTaskDlgt = y),
        (this._hasTaskDlgtOwner = this),
        (this._hasTaskCurrZone = this._zone),
        b.onScheduleTask ||
          ((this._scheduleTaskZS = r),
          (this._scheduleTaskDlgt = y),
          (this._scheduleTaskCurrZone = this._zone)),
        b.onInvokeTask ||
          ((this._invokeTaskZS = r),
          (this._invokeTaskDlgt = y),
          (this._invokeTaskCurrZone = this._zone)),
        b.onCancelTask ||
          ((this._cancelTaskZS = r),
          (this._cancelTaskDlgt = y),
          (this._cancelTaskCurrZone = this._zone)));
    }
    fork(te, y) {
      return this._forkZS
        ? this._forkZS.onFork(this._forkDlgt, this.zone, te, y)
        : new i(te, y);
    }
    intercept(te, y, b) {
      return this._interceptZS
        ? this._interceptZS.onIntercept(
            this._interceptDlgt,
            this._interceptCurrZone,
            te,
            y,
            b
          )
        : y;
    }
    invoke(te, y, b, he, ne) {
      return this._invokeZS
        ? this._invokeZS.onInvoke(
            this._invokeDlgt,
            this._invokeCurrZone,
            te,
            y,
            b,
            he,
            ne
          )
        : y.apply(b, he);
    }
    handleError(te, y) {
      return this._handleErrorZS
        ? this._handleErrorZS.onHandleError(
            this._handleErrorDlgt,
            this._handleErrorCurrZone,
            te,
            y
          )
        : !0;
    }
    scheduleTask(te, y) {
      let b = y;
      if (this._scheduleTaskZS)
        this._hasTaskZS && b._zoneDelegates.push(this._hasTaskDlgtOwner),
          (b = this._scheduleTaskZS.onScheduleTask(
            this._scheduleTaskDlgt,
            this._scheduleTaskCurrZone,
            te,
            y
          )),
          b || (b = y);
      else if (y.scheduleFn) y.scheduleFn(y);
      else if (y.type == ce) D(y);
      else throw new Error("Task is missing scheduleFn.");
      return b;
    }
    invokeTask(te, y, b, he) {
      return this._invokeTaskZS
        ? this._invokeTaskZS.onInvokeTask(
            this._invokeTaskDlgt,
            this._invokeTaskCurrZone,
            te,
            y,
            b,
            he
          )
        : y.callback.apply(b, he);
    }
    cancelTask(te, y) {
      let b;
      if (this._cancelTaskZS)
        b = this._cancelTaskZS.onCancelTask(
          this._cancelTaskDlgt,
          this._cancelTaskCurrZone,
          te,
          y
        );
      else {
        if (!y.cancelFn) throw Error("Task is not cancelable");
        b = y.cancelFn(y);
      }
      return b;
    }
    hasTask(te, y) {
      try {
        this._hasTaskZS &&
          this._hasTaskZS.onHasTask(
            this._hasTaskDlgt,
            this._hasTaskCurrZone,
            te,
            y
          );
      } catch (b) {
        this.handleError(te, b);
      }
    }
    _updateTaskCount(te, y) {
      let b = this._taskCounts,
        he = b[te],
        ne = (b[te] = he + y);
      if (ne < 0) throw new Error("More tasks executed then were scheduled.");
      if (he == 0 || ne == 0) {
        let We = {
          microTask: b.microTask > 0,
          macroTask: b.macroTask > 0,
          eventTask: b.eventTask > 0,
          change: te,
        };
        this.hasTask(this._zone, We);
      }
    }
  }
  class s {
    constructor(te, y, b, he, ne, We) {
      if (
        ((this._zone = null),
        (this.runCount = 0),
        (this._zoneDelegates = null),
        (this._state = "notScheduled"),
        (this.type = te),
        (this.source = y),
        (this.data = he),
        (this.scheduleFn = ne),
        (this.cancelFn = We),
        !b)
      )
        throw new Error("callback is not defined");
      this.callback = b;
      let Oe = this;
      te === Ee && he && he.useG
        ? (this.invoke = s.invokeTask)
        : (this.invoke = function () {
            return s.invokeTask.call(Oi, Oe, this, arguments);
          });
    }
    static invokeTask(te, y, b) {
      te || (te = this), ct++;
      try {
        return te.runCount++, te.zone.runTask(te, y, b);
      } finally {
        ct == 1 && I(), ct--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(F, R);
    }
    _transitionTo(te, y, b) {
      if (this._state === y || this._state === b)
        (this._state = te), te == F && (this._zoneDelegates = null);
      else
        throw new Error(
          `${this.type} '${
            this.source
          }': can not transition to '${te}', expecting state '${y}'${
            b ? " or '" + b + "'" : ""
          }, was '${this._state}'.`
        );
    }
    toString() {
      return this.data && typeof this.data.handleId < "u"
        ? this.data.handleId.toString()
        : Object.prototype.toString.call(this);
    }
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount,
      };
    }
  }
  let a = Bn("setTimeout"),
    l = Bn("Promise"),
    c = Bn("then"),
    u = [],
    d = !1,
    _;
  function h(_e) {
    if ((_ || (Oi[l] && (_ = Oi[l].resolve(0))), _)) {
      let te = _[c];
      te || (te = _.then), te.call(_, _e);
    } else Oi[a](_e, 0);
  }
  function D(_e) {
    ct === 0 && u.length === 0 && h(I), _e && u.push(_e);
  }
  function I() {
    if (!d) {
      for (d = !0; u.length; ) {
        let _e = u;
        u = [];
        for (let te = 0; te < _e.length; te++) {
          let y = _e[te];
          try {
            y.zone.runTask(y, null, null);
          } catch (b) {
            se.onUnhandledError(b);
          }
        }
      }
      se.microtaskDrainDone(), (d = !1);
    }
  }
  let P = { name: "NO ZONE" },
    F = "notScheduled",
    R = "scheduling",
    T = "scheduled",
    U = "running",
    K = "canceling",
    ee = "unknown",
    ce = "microTask",
    Z = "macroTask",
    Ee = "eventTask",
    le = {},
    se = {
      symbol: Bn,
      currentZoneFrame: () => ae,
      onUnhandledError: ze,
      microtaskDrainDone: ze,
      scheduleMicroTask: D,
      showUncaughtError: () => !i[Bn("ignoreConsoleErrorUncaughtError")],
      patchEventTarget: () => [],
      patchOnProperties: ze,
      patchMethod: () => ze,
      bindArguments: () => [],
      patchThen: () => ze,
      patchMacroTask: () => ze,
      patchEventPrototype: () => ze,
      isIEOrEdge: () => !1,
      getGlobalObjects: () => {},
      ObjectDefineProperty: () => ze,
      ObjectGetOwnPropertyDescriptor: () => {},
      ObjectCreate: () => {},
      ArraySlice: () => [],
      patchClass: () => ze,
      wrapWithCurrentZone: () => ze,
      filterProperties: () => [],
      attachOriginToPatched: () => ze,
      _redefineProperty: () => ze,
      patchCallbacks: () => ze,
      nativeScheduleMicroTask: h,
    },
    ae = { parent: null, zone: new i(null, null) },
    fe = null,
    ct = 0;
  function ze() {}
  return t("Zone", "Zone"), i;
}
function jF() {
  let e = globalThis,
    n = e[Bn("forceDuplicateZoneCheck")] === !0;
  if (e.Zone && (n || typeof e.Zone.__symbol__ != "function"))
    throw new Error("Zone already loaded.");
  return (e.Zone ??= VF()), e.Zone;
}
var Nl = Object.getOwnPropertyDescriptor,
  $m = Object.defineProperty,
  zm = Object.getPrototypeOf,
  BF = Object.create,
  HF = Array.prototype.slice,
  Gm = "addEventListener",
  Wm = "removeEventListener",
  jm = Bn(Gm),
  Bm = Bn(Wm),
  lr = "true",
  cr = "false",
  Pl = Bn("");
function qm(e, n) {
  return Zone.current.wrap(e, n);
}
function Zm(e, n, t, i, r) {
  return Zone.current.scheduleMacroTask(e, n, t, i, r);
}
var Je = Bn,
  nf = typeof window < "u",
  Zs = nf ? window : void 0,
  Rt = (nf && Zs) || globalThis,
  UF = "removeAttribute";
function Ym(e, n) {
  for (let t = e.length - 1; t >= 0; t--)
    typeof e[t] == "function" && (e[t] = qm(e[t], n + "_" + t));
  return e;
}
function $F(e, n) {
  let t = e.constructor.name;
  for (let i = 0; i < n.length; i++) {
    let r = n[i],
      o = e[r];
    if (o) {
      let s = Nl(e, r);
      if (!uw(s)) continue;
      e[r] = ((a) => {
        let l = function () {
          return a.apply(this, Ym(arguments, t + "." + r));
        };
        return dr(l, a), l;
      })(o);
    }
  }
}
function uw(e) {
  return e
    ? e.writable === !1
      ? !1
      : !(typeof e.get == "function" && typeof e.set > "u")
    : !0;
}
var dw = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
  rf =
    !("nw" in Rt) &&
    typeof Rt.process < "u" &&
    Rt.process.toString() === "[object process]",
  Qm = !rf && !dw && !!(nf && Zs.HTMLElement),
  fw =
    typeof Rt.process < "u" &&
    Rt.process.toString() === "[object process]" &&
    !dw &&
    !!(nf && Zs.HTMLElement),
  tf = {},
  zF = Je("enable_beforeunload"),
  rw = function (e) {
    if (((e = e || Rt.event), !e)) return;
    let n = tf[e.type];
    n || (n = tf[e.type] = Je("ON_PROPERTY" + e.type));
    let t = this || e.target || Rt,
      i = t[n],
      r;
    if (Qm && t === Zs && e.type === "error") {
      let o = e;
      (r =
        i && i.call(this, o.message, o.filename, o.lineno, o.colno, o.error)),
        r === !0 && e.preventDefault();
    } else
      (r = i && i.apply(this, arguments)),
        e.type === "beforeunload" && Rt[zF] && typeof r == "string"
          ? (e.returnValue = r)
          : r != null && !r && e.preventDefault();
    return r;
  };
function ow(e, n, t) {
  let i = Nl(e, n);
  if (
    (!i && t && Nl(t, n) && (i = { enumerable: !0, configurable: !0 }),
    !i || !i.configurable)
  )
    return;
  let r = Je("on" + n + "patched");
  if (e.hasOwnProperty(r) && e[r]) return;
  delete i.writable, delete i.value;
  let o = i.get,
    s = i.set,
    a = n.slice(2),
    l = tf[a];
  l || (l = tf[a] = Je("ON_PROPERTY" + a)),
    (i.set = function (c) {
      let u = this;
      if ((!u && e === Rt && (u = Rt), !u)) return;
      typeof u[l] == "function" && u.removeEventListener(a, rw),
        s && s.call(u, null),
        (u[l] = c),
        typeof c == "function" && u.addEventListener(a, rw, !1);
    }),
    (i.get = function () {
      let c = this;
      if ((!c && e === Rt && (c = Rt), !c)) return null;
      let u = c[l];
      if (u) return u;
      if (o) {
        let d = o.call(this);
        if (d)
          return (
            i.set.call(this, d),
            typeof c[UF] == "function" && c.removeAttribute(n),
            d
          );
      }
      return null;
    }),
    $m(e, n, i),
    (e[r] = !0);
}
function hw(e, n, t) {
  if (n) for (let i = 0; i < n.length; i++) ow(e, "on" + n[i], t);
  else {
    let i = [];
    for (let r in e) r.slice(0, 2) == "on" && i.push(r);
    for (let r = 0; r < i.length; r++) ow(e, i[r], t);
  }
}
var ui = Je("originalInstance");
function Ol(e) {
  let n = Rt[e];
  if (!n) return;
  (Rt[Je(e)] = n),
    (Rt[e] = function () {
      let r = Ym(arguments, e);
      switch (r.length) {
        case 0:
          this[ui] = new n();
          break;
        case 1:
          this[ui] = new n(r[0]);
          break;
        case 2:
          this[ui] = new n(r[0], r[1]);
          break;
        case 3:
          this[ui] = new n(r[0], r[1], r[2]);
          break;
        case 4:
          this[ui] = new n(r[0], r[1], r[2], r[3]);
          break;
        default:
          throw new Error("Arg list too long.");
      }
    }),
    dr(Rt[e], n);
  let t = new n(function () {}),
    i;
  for (i in t)
    (e === "XMLHttpRequest" && i === "responseBlob") ||
      (function (r) {
        typeof t[r] == "function"
          ? (Rt[e].prototype[r] = function () {
              return this[ui][r].apply(this[ui], arguments);
            })
          : $m(Rt[e].prototype, r, {
              set: function (o) {
                typeof o == "function"
                  ? ((this[ui][r] = qm(o, e + "." + r)), dr(this[ui][r], o))
                  : (this[ui][r] = o);
              },
              get: function () {
                return this[ui][r];
              },
            });
      })(i);
  for (i in n) i !== "prototype" && n.hasOwnProperty(i) && (Rt[e][i] = n[i]);
}
function ur(e, n, t) {
  let i = e;
  for (; i && !i.hasOwnProperty(n); ) i = zm(i);
  !i && e[n] && (i = e);
  let r = Je(n),
    o = null;
  if (i && (!(o = i[r]) || !i.hasOwnProperty(r))) {
    o = i[r] = i[n];
    let s = i && Nl(i, n);
    if (uw(s)) {
      let a = t(o, r, n);
      (i[n] = function () {
        return a(this, arguments);
      }),
        dr(i[n], o);
    }
  }
  return o;
}
function GF(e, n, t) {
  let i = null;
  function r(o) {
    let s = o.data;
    return (
      (s.args[s.cbIdx] = function () {
        o.invoke.apply(this, arguments);
      }),
      i.apply(s.target, s.args),
      o
    );
  }
  i = ur(
    e,
    n,
    (o) =>
      function (s, a) {
        let l = t(s, a);
        return l.cbIdx >= 0 && typeof a[l.cbIdx] == "function"
          ? Zm(l.name, a[l.cbIdx], l, r)
          : o.apply(s, a);
      }
  );
}
function dr(e, n) {
  e[Je("OriginalDelegate")] = n;
}
var sw = !1,
  Hm = !1;
function WF() {
  try {
    let e = Zs.navigator.userAgent;
    if (e.indexOf("MSIE ") !== -1 || e.indexOf("Trident/") !== -1) return !0;
  } catch {}
  return !1;
}
function qF() {
  if (sw) return Hm;
  sw = !0;
  try {
    let e = Zs.navigator.userAgent;
    (e.indexOf("MSIE ") !== -1 ||
      e.indexOf("Trident/") !== -1 ||
      e.indexOf("Edge/") !== -1) &&
      (Hm = !0);
  } catch {}
  return Hm;
}
function aw(e) {
  return typeof e == "function";
}
function lw(e) {
  return typeof e == "number";
}
var qs = !1;
if (typeof window < "u")
  try {
    let e = Object.defineProperty({}, "passive", {
      get: function () {
        qs = !0;
      },
    });
    window.addEventListener("test", e, e),
      window.removeEventListener("test", e, e);
  } catch {
    qs = !1;
  }
var ZF = { useG: !0 },
  Hn = {},
  pw = {},
  gw = new RegExp("^" + Pl + "(\\w+)(true|false)$"),
  mw = Je("propagationStopped");
function _w(e, n) {
  let t = (n ? n(e) : e) + cr,
    i = (n ? n(e) : e) + lr,
    r = Pl + t,
    o = Pl + i;
  (Hn[e] = {}), (Hn[e][cr] = r), (Hn[e][lr] = o);
}
function YF(e, n, t, i) {
  let r = (i && i.add) || Gm,
    o = (i && i.rm) || Wm,
    s = (i && i.listeners) || "eventListeners",
    a = (i && i.rmAll) || "removeAllListeners",
    l = Je(r),
    c = "." + r + ":",
    u = "prependListener",
    d = "." + u + ":",
    _ = function (R, T, U) {
      if (R.isRemoved) return;
      let K = R.callback;
      typeof K == "object" &&
        K.handleEvent &&
        ((R.callback = (Z) => K.handleEvent(Z)), (R.originalDelegate = K));
      let ee;
      try {
        R.invoke(R, T, [U]);
      } catch (Z) {
        ee = Z;
      }
      let ce = R.options;
      if (ce && typeof ce == "object" && ce.once) {
        let Z = R.originalDelegate ? R.originalDelegate : R.callback;
        T[o].call(T, U.type, Z, ce);
      }
      return ee;
    };
  function h(R, T, U) {
    if (((T = T || e.event), !T)) return;
    let K = R || T.target || e,
      ee = K[Hn[T.type][U ? lr : cr]];
    if (ee) {
      let ce = [];
      if (ee.length === 1) {
        let Z = _(ee[0], K, T);
        Z && ce.push(Z);
      } else {
        let Z = ee.slice();
        for (let Ee = 0; Ee < Z.length && !(T && T[mw] === !0); Ee++) {
          let le = _(Z[Ee], K, T);
          le && ce.push(le);
        }
      }
      if (ce.length === 1) throw ce[0];
      for (let Z = 0; Z < ce.length; Z++) {
        let Ee = ce[Z];
        n.nativeScheduleMicroTask(() => {
          throw Ee;
        });
      }
    }
  }
  let D = function (R) {
      return h(this, R, !1);
    },
    I = function (R) {
      return h(this, R, !0);
    };
  function P(R, T) {
    if (!R) return !1;
    let U = !0;
    T && T.useG !== void 0 && (U = T.useG);
    let K = T && T.vh,
      ee = !0;
    T && T.chkDup !== void 0 && (ee = T.chkDup);
    let ce = !1;
    T && T.rt !== void 0 && (ce = T.rt);
    let Z = R;
    for (; Z && !Z.hasOwnProperty(r); ) Z = zm(Z);
    if ((!Z && R[r] && (Z = R), !Z || Z[l])) return !1;
    let Ee = T && T.eventNameToString,
      le = {},
      se = (Z[l] = Z[r]),
      ae = (Z[Je(o)] = Z[o]),
      fe = (Z[Je(s)] = Z[s]),
      ct = (Z[Je(a)] = Z[a]),
      ze;
    T && T.prepend && (ze = Z[Je(T.prepend)] = Z[T.prepend]);
    function _e(M, k) {
      return !qs && typeof M == "object" && M
        ? !!M.capture
        : !qs || !k
        ? M
        : typeof M == "boolean"
        ? { capture: M, passive: !0 }
        : M
        ? typeof M == "object" && M.passive !== !1
          ? Pe(j({}, M), { passive: !0 })
          : M
        : { passive: !0 };
    }
    let te = function (M) {
        if (!le.isExisting)
          return se.call(
            le.target,
            le.eventName,
            le.capture ? I : D,
            le.options
          );
      },
      y = function (M) {
        if (!M.isRemoved) {
          let k = Hn[M.eventName],
            re;
          k && (re = k[M.capture ? lr : cr]);
          let ge = re && M.target[re];
          if (ge) {
            for (let ue = 0; ue < ge.length; ue++)
              if (ge[ue] === M) {
                ge.splice(ue, 1),
                  (M.isRemoved = !0),
                  M.removeAbortListener &&
                    (M.removeAbortListener(), (M.removeAbortListener = null)),
                  ge.length === 0 &&
                    ((M.allRemoved = !0), (M.target[re] = null));
                break;
              }
          }
        }
        if (M.allRemoved)
          return ae.call(M.target, M.eventName, M.capture ? I : D, M.options);
      },
      b = function (M) {
        return se.call(le.target, le.eventName, M.invoke, le.options);
      },
      he = function (M) {
        return ze.call(le.target, le.eventName, M.invoke, le.options);
      },
      ne = function (M) {
        return ae.call(M.target, M.eventName, M.invoke, M.options);
      },
      We = U ? te : b,
      Oe = U ? y : ne,
      Ot = function (M, k) {
        let re = typeof k;
        return (
          (re === "function" && M.callback === k) ||
          (re === "object" && M.originalDelegate === k)
        );
      },
      yt = T && T.diff ? T.diff : Ot,
      wt = Zone[Je("UNPATCHED_EVENTS")],
      kt = e[Je("PASSIVE_EVENTS")];
    function H(M) {
      if (typeof M == "object" && M !== null) {
        let k = j({}, M);
        return M.signal && (k.signal = M.signal), k;
      }
      return M;
    }
    let L = function (M, k, re, ge, ue = !1, Se = !1) {
      return function () {
        let De = this || e,
          xe = arguments[0];
        T && T.transferEventName && (xe = T.transferEventName(xe));
        let qe = arguments[1];
        if (!qe) return M.apply(this, arguments);
        if (rf && xe === "uncaughtException") return M.apply(this, arguments);
        let Ze = !1;
        if (typeof qe != "function") {
          if (!qe.handleEvent) return M.apply(this, arguments);
          Ze = !0;
        }
        if (K && !K(M, qe, De, arguments)) return;
        let Be = qs && !!kt && kt.indexOf(xe) !== -1,
          Ft = H(_e(arguments[2], Be)),
          In = Ft?.signal;
        if (In?.aborted) return;
        if (wt) {
          for (let v = 0; v < wt.length; v++)
            if (xe === wt[v])
              return Be ? M.call(De, xe, qe, Ft) : M.apply(this, arguments);
        }
        let Ni = Ft ? (typeof Ft == "boolean" ? !0 : Ft.capture) : !1,
          Un = Ft && typeof Ft == "object" ? Ft.once : !1,
          fr = Zone.current,
          hr = Hn[xe];
        hr || (_w(xe, Ee), (hr = Hn[xe]));
        let Gr = hr[Ni ? lr : cr],
          $n = De[Gr],
          Ys = !1;
        if ($n) {
          if (((Ys = !0), ee)) {
            for (let v = 0; v < $n.length; v++) if (yt($n[v], qe)) return;
          }
        } else $n = De[Gr] = [];
        let Ro,
          Al = De.constructor.name,
          gn = pw[Al];
        gn && (Ro = gn[xe]),
          Ro || (Ro = Al + k + (Ee ? Ee(xe) : xe)),
          (le.options = Ft),
          Un && (le.options.once = !1),
          (le.target = De),
          (le.capture = Ni),
          (le.eventName = xe),
          (le.isExisting = Ys);
        let pr = U ? ZF : void 0;
        pr && (pr.taskData = le), In && (le.options.signal = void 0);
        let p = fr.scheduleEventTask(Ro, qe, pr, re, ge);
        if (In) {
          le.options.signal = In;
          let v = () => p.zone.cancelTask(p);
          M.call(In, "abort", v, { once: !0 }),
            (p.removeAbortListener = () => In.removeEventListener("abort", v));
        }
        if (
          ((le.target = null),
          pr && (pr.taskData = null),
          Un && (le.options.once = !0),
          (!qs && typeof p.options == "boolean") || (p.options = Ft),
          (p.target = De),
          (p.capture = Ni),
          (p.eventName = xe),
          Ze && (p.originalDelegate = qe),
          Se ? $n.unshift(p) : $n.push(p),
          ue)
        )
          return De;
      };
    };
    return (
      (Z[r] = L(se, c, We, Oe, ce)),
      ze && (Z[u] = L(ze, d, he, Oe, ce, !0)),
      (Z[o] = function () {
        let M = this || e,
          k = arguments[0];
        T && T.transferEventName && (k = T.transferEventName(k));
        let re = arguments[2],
          ge = re ? (typeof re == "boolean" ? !0 : re.capture) : !1,
          ue = arguments[1];
        if (!ue) return ae.apply(this, arguments);
        if (K && !K(ae, ue, M, arguments)) return;
        let Se = Hn[k],
          De;
        Se && (De = Se[ge ? lr : cr]);
        let xe = De && M[De];
        if (xe)
          for (let qe = 0; qe < xe.length; qe++) {
            let Ze = xe[qe];
            if (yt(Ze, ue)) {
              if (
                (xe.splice(qe, 1),
                (Ze.isRemoved = !0),
                xe.length === 0 &&
                  ((Ze.allRemoved = !0),
                  (M[De] = null),
                  !ge && typeof k == "string"))
              ) {
                let Be = Pl + "ON_PROPERTY" + k;
                M[Be] = null;
              }
              return Ze.zone.cancelTask(Ze), ce ? M : void 0;
            }
          }
        return ae.apply(this, arguments);
      }),
      (Z[s] = function () {
        let M = this || e,
          k = arguments[0];
        T && T.transferEventName && (k = T.transferEventName(k));
        let re = [],
          ge = vw(M, Ee ? Ee(k) : k);
        for (let ue = 0; ue < ge.length; ue++) {
          let Se = ge[ue],
            De = Se.originalDelegate ? Se.originalDelegate : Se.callback;
          re.push(De);
        }
        return re;
      }),
      (Z[a] = function () {
        let M = this || e,
          k = arguments[0];
        if (k) {
          T && T.transferEventName && (k = T.transferEventName(k));
          let re = Hn[k];
          if (re) {
            let ge = re[cr],
              ue = re[lr],
              Se = M[ge],
              De = M[ue];
            if (Se) {
              let xe = Se.slice();
              for (let qe = 0; qe < xe.length; qe++) {
                let Ze = xe[qe],
                  Be = Ze.originalDelegate ? Ze.originalDelegate : Ze.callback;
                this[o].call(this, k, Be, Ze.options);
              }
            }
            if (De) {
              let xe = De.slice();
              for (let qe = 0; qe < xe.length; qe++) {
                let Ze = xe[qe],
                  Be = Ze.originalDelegate ? Ze.originalDelegate : Ze.callback;
                this[o].call(this, k, Be, Ze.options);
              }
            }
          }
        } else {
          let re = Object.keys(M);
          for (let ge = 0; ge < re.length; ge++) {
            let ue = re[ge],
              Se = gw.exec(ue),
              De = Se && Se[1];
            De && De !== "removeListener" && this[a].call(this, De);
          }
          this[a].call(this, "removeListener");
        }
        if (ce) return this;
      }),
      dr(Z[r], se),
      dr(Z[o], ae),
      ct && dr(Z[a], ct),
      fe && dr(Z[s], fe),
      !0
    );
  }
  let F = [];
  for (let R = 0; R < t.length; R++) F[R] = P(t[R], i);
  return F;
}
function vw(e, n) {
  if (!n) {
    let o = [];
    for (let s in e) {
      let a = gw.exec(s),
        l = a && a[1];
      if (l && (!n || l === n)) {
        let c = e[s];
        if (c) for (let u = 0; u < c.length; u++) o.push(c[u]);
      }
    }
    return o;
  }
  let t = Hn[n];
  t || (_w(n), (t = Hn[n]));
  let i = e[t[cr]],
    r = e[t[lr]];
  return i ? (r ? i.concat(r) : i.slice()) : r ? r.slice() : [];
}
function QF(e, n) {
  let t = e.Event;
  t &&
    t.prototype &&
    n.patchMethod(
      t.prototype,
      "stopImmediatePropagation",
      (i) =>
        function (r, o) {
          (r[mw] = !0), i && i.apply(r, o);
        }
    );
}
function KF(e, n) {
  n.patchMethod(
    e,
    "queueMicrotask",
    (t) =>
      function (i, r) {
        Zone.current.scheduleMicroTask("queueMicrotask", r[0]);
      }
  );
}
var ef = Je("zoneTask");
function Ws(e, n, t, i) {
  let r = null,
    o = null;
  (n += i), (t += i);
  let s = {};
  function a(c) {
    let u = c.data;
    u.args[0] = function () {
      return c.invoke.apply(this, arguments);
    };
    let d = r.apply(e, u.args);
    return (
      lw(d)
        ? (u.handleId = d)
        : ((u.handle = d), (u.isRefreshable = aw(d.refresh))),
      c
    );
  }
  function l(c) {
    let { handle: u, handleId: d } = c.data;
    return o.call(e, u ?? d);
  }
  (r = ur(
    e,
    n,
    (c) =>
      function (u, d) {
        if (aw(d[0])) {
          let _ = {
              isRefreshable: !1,
              isPeriodic: i === "Interval",
              delay: i === "Timeout" || i === "Interval" ? d[1] || 0 : void 0,
              args: d,
            },
            h = d[0];
          d[0] = function () {
            try {
              return h.apply(this, arguments);
            } finally {
              let {
                handle: U,
                handleId: K,
                isPeriodic: ee,
                isRefreshable: ce,
              } = _;
              !ee && !ce && (K ? delete s[K] : U && (U[ef] = null));
            }
          };
          let D = Zm(n, d[0], _, a, l);
          if (!D) return D;
          let {
            handleId: I,
            handle: P,
            isRefreshable: F,
            isPeriodic: R,
          } = D.data;
          if (I) s[I] = D;
          else if (P && ((P[ef] = D), F && !R)) {
            let T = P.refresh;
            P.refresh = function () {
              let { zone: U, state: K } = D;
              return (
                K === "notScheduled"
                  ? ((D._state = "scheduled"), U._updateTaskCount(D, 1))
                  : K === "running" && (D._state = "scheduling"),
                T.call(this)
              );
            };
          }
          return P ?? I ?? D;
        } else return c.apply(e, d);
      }
  )),
    (o = ur(
      e,
      t,
      (c) =>
        function (u, d) {
          let _ = d[0],
            h;
          lw(_)
            ? ((h = s[_]), delete s[_])
            : ((h = _?.[ef]), h ? (_[ef] = null) : (h = _)),
            h?.type ? h.cancelFn && h.zone.cancelTask(h) : c.apply(e, d);
        }
    ));
}
function JF(e, n) {
  let { isBrowser: t, isMix: i } = n.getGlobalObjects();
  if ((!t && !i) || !e.customElements || !("customElements" in e)) return;
  let r = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback",
    "formAssociatedCallback",
    "formDisabledCallback",
    "formResetCallback",
    "formStateRestoreCallback",
  ];
  n.patchCallbacks(n, e.customElements, "customElements", "define", r);
}
function XF(e, n) {
  if (Zone[n.symbol("patchEventTarget")]) return;
  let {
    eventNames: t,
    zoneSymbolEventNames: i,
    TRUE_STR: r,
    FALSE_STR: o,
    ZONE_SYMBOL_PREFIX: s,
  } = n.getGlobalObjects();
  for (let l = 0; l < t.length; l++) {
    let c = t[l],
      u = c + o,
      d = c + r,
      _ = s + u,
      h = s + d;
    (i[c] = {}), (i[c][o] = _), (i[c][r] = h);
  }
  let a = e.EventTarget;
  if (!(!a || !a.prototype))
    return n.patchEventTarget(e, n, [a && a.prototype]), !0;
}
function eL(e, n) {
  n.patchEventPrototype(e, n);
}
function yw(e, n, t) {
  if (!t || t.length === 0) return n;
  let i = t.filter((o) => o.target === e);
  if (!i || i.length === 0) return n;
  let r = i[0].ignoreProperties;
  return n.filter((o) => r.indexOf(o) === -1);
}
function cw(e, n, t, i) {
  if (!e) return;
  let r = yw(e, n, t);
  hw(e, r, i);
}
function Um(e) {
  return Object.getOwnPropertyNames(e)
    .filter((n) => n.startsWith("on") && n.length > 2)
    .map((n) => n.substring(2));
}
function tL(e, n) {
  if ((rf && !fw) || Zone[e.symbol("patchEvents")]) return;
  let t = n.__Zone_ignore_on_properties,
    i = [];
  if (Qm) {
    let r = window;
    i = i.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker",
    ]);
    let o = WF() ? [{ target: r, ignoreProperties: ["error"] }] : [];
    cw(r, Um(r), t && t.concat(o), zm(r));
  }
  i = i.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket",
  ]);
  for (let r = 0; r < i.length; r++) {
    let o = n[i[r]];
    o && o.prototype && cw(o.prototype, Um(o.prototype), t);
  }
}
function nL(e) {
  e.__load_patch("legacy", (n) => {
    let t = n[e.__symbol__("legacyPatch")];
    t && t();
  }),
    e.__load_patch("timers", (n) => {
      let t = "set",
        i = "clear";
      Ws(n, t, i, "Timeout"), Ws(n, t, i, "Interval"), Ws(n, t, i, "Immediate");
    }),
    e.__load_patch("requestAnimationFrame", (n) => {
      Ws(n, "request", "cancel", "AnimationFrame"),
        Ws(n, "mozRequest", "mozCancel", "AnimationFrame"),
        Ws(n, "webkitRequest", "webkitCancel", "AnimationFrame");
    }),
    e.__load_patch("blocking", (n, t) => {
      let i = ["alert", "prompt", "confirm"];
      for (let r = 0; r < i.length; r++) {
        let o = i[r];
        ur(
          n,
          o,
          (s, a, l) =>
            function (c, u) {
              return t.current.run(s, n, u, l);
            }
        );
      }
    }),
    e.__load_patch("EventTarget", (n, t, i) => {
      eL(n, i), XF(n, i);
      let r = n.XMLHttpRequestEventTarget;
      r && r.prototype && i.patchEventTarget(n, i, [r.prototype]);
    }),
    e.__load_patch("MutationObserver", (n, t, i) => {
      Ol("MutationObserver"), Ol("WebKitMutationObserver");
    }),
    e.__load_patch("IntersectionObserver", (n, t, i) => {
      Ol("IntersectionObserver");
    }),
    e.__load_patch("FileReader", (n, t, i) => {
      Ol("FileReader");
    }),
    e.__load_patch("on_property", (n, t, i) => {
      tL(i, n);
    }),
    e.__load_patch("customElements", (n, t, i) => {
      JF(n, i);
    }),
    e.__load_patch("XHR", (n, t) => {
      c(n);
      let i = Je("xhrTask"),
        r = Je("xhrSync"),
        o = Je("xhrListener"),
        s = Je("xhrScheduled"),
        a = Je("xhrURL"),
        l = Je("xhrErrorBeforeScheduled");
      function c(u) {
        let d = u.XMLHttpRequest;
        if (!d) return;
        let _ = d.prototype;
        function h(se) {
          return se[i];
        }
        let D = _[jm],
          I = _[Bm];
        if (!D) {
          let se = u.XMLHttpRequestEventTarget;
          if (se) {
            let ae = se.prototype;
            (D = ae[jm]), (I = ae[Bm]);
          }
        }
        let P = "readystatechange",
          F = "scheduled";
        function R(se) {
          let ae = se.data,
            fe = ae.target;
          (fe[s] = !1), (fe[l] = !1);
          let ct = fe[o];
          D || ((D = fe[jm]), (I = fe[Bm])), ct && I.call(fe, P, ct);
          let ze = (fe[o] = () => {
            if (fe.readyState === fe.DONE)
              if (!ae.aborted && fe[s] && se.state === F) {
                let te = fe[t.__symbol__("loadfalse")];
                if (fe.status !== 0 && te && te.length > 0) {
                  let y = se.invoke;
                  (se.invoke = function () {
                    let b = fe[t.__symbol__("loadfalse")];
                    for (let he = 0; he < b.length; he++)
                      b[he] === se && b.splice(he, 1);
                    !ae.aborted && se.state === F && y.call(se);
                  }),
                    te.push(se);
                } else se.invoke();
              } else !ae.aborted && fe[s] === !1 && (fe[l] = !0);
          });
          return (
            D.call(fe, P, ze),
            fe[i] || (fe[i] = se),
            Ee.apply(fe, ae.args),
            (fe[s] = !0),
            se
          );
        }
        function T() {}
        function U(se) {
          let ae = se.data;
          return (ae.aborted = !0), le.apply(ae.target, ae.args);
        }
        let K = ur(
            _,
            "open",
            () =>
              function (se, ae) {
                return (se[r] = ae[2] == !1), (se[a] = ae[1]), K.apply(se, ae);
              }
          ),
          ee = "XMLHttpRequest.send",
          ce = Je("fetchTaskAborting"),
          Z = Je("fetchTaskScheduling"),
          Ee = ur(
            _,
            "send",
            () =>
              function (se, ae) {
                if (t.current[Z] === !0 || se[r]) return Ee.apply(se, ae);
                {
                  let fe = {
                      target: se,
                      url: se[a],
                      isPeriodic: !1,
                      args: ae,
                      aborted: !1,
                    },
                    ct = Zm(ee, T, fe, R, U);
                  se &&
                    se[l] === !0 &&
                    !fe.aborted &&
                    ct.state === F &&
                    ct.invoke();
                }
              }
          ),
          le = ur(
            _,
            "abort",
            () =>
              function (se, ae) {
                let fe = h(se);
                if (fe && typeof fe.type == "string") {
                  if (fe.cancelFn == null || (fe.data && fe.data.aborted))
                    return;
                  fe.zone.cancelTask(fe);
                } else if (t.current[ce] === !0) return le.apply(se, ae);
              }
          );
      }
    }),
    e.__load_patch("geolocation", (n) => {
      n.navigator &&
        n.navigator.geolocation &&
        $F(n.navigator.geolocation, ["getCurrentPosition", "watchPosition"]);
    }),
    e.__load_patch("PromiseRejectionEvent", (n, t) => {
      function i(r) {
        return function (o) {
          vw(n, r).forEach((a) => {
            let l = n.PromiseRejectionEvent;
            if (l) {
              let c = new l(r, { promise: o.promise, reason: o.rejection });
              a.invoke(c);
            }
          });
        };
      }
      n.PromiseRejectionEvent &&
        ((t[Je("unhandledPromiseRejectionHandler")] = i("unhandledrejection")),
        (t[Je("rejectionHandledHandler")] = i("rejectionhandled")));
    }),
    e.__load_patch("queueMicrotask", (n, t, i) => {
      KF(n, i);
    });
}
function iL(e) {
  e.__load_patch("ZoneAwarePromise", (n, t, i) => {
    let r = Object.getOwnPropertyDescriptor,
      o = Object.defineProperty;
    function s(H) {
      if (H && H.toString === Object.prototype.toString) {
        let L = H.constructor && H.constructor.name;
        return (L || "") + ": " + JSON.stringify(H);
      }
      return H ? H.toString() : Object.prototype.toString.call(H);
    }
    let a = i.symbol,
      l = [],
      c = n[a("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1,
      u = a("Promise"),
      d = a("then"),
      _ = "__creationTrace__";
    (i.onUnhandledError = (H) => {
      if (i.showUncaughtError()) {
        let L = H && H.rejection;
        L
          ? console.error(
              "Unhandled Promise rejection:",
              L instanceof Error ? L.message : L,
              "; Zone:",
              H.zone.name,
              "; Task:",
              H.task && H.task.source,
              "; Value:",
              L,
              L instanceof Error ? L.stack : void 0
            )
          : console.error(H);
      }
    }),
      (i.microtaskDrainDone = () => {
        for (; l.length; ) {
          let H = l.shift();
          try {
            H.zone.runGuarded(() => {
              throw H.throwOriginal ? H.rejection : H;
            });
          } catch (L) {
            D(L);
          }
        }
      });
    let h = a("unhandledPromiseRejectionHandler");
    function D(H) {
      i.onUnhandledError(H);
      try {
        let L = t[h];
        typeof L == "function" && L.call(this, H);
      } catch {}
    }
    function I(H) {
      return H && H.then;
    }
    function P(H) {
      return H;
    }
    function F(H) {
      return Oe.reject(H);
    }
    let R = a("state"),
      T = a("value"),
      U = a("finally"),
      K = a("parentPromiseValue"),
      ee = a("parentPromiseState"),
      ce = "Promise.then",
      Z = null,
      Ee = !0,
      le = !1,
      se = 0;
    function ae(H, L) {
      return (M) => {
        try {
          _e(H, L, M);
        } catch (k) {
          _e(H, !1, k);
        }
      };
    }
    let fe = function () {
        let H = !1;
        return function (M) {
          return function () {
            H || ((H = !0), M.apply(null, arguments));
          };
        };
      },
      ct = "Promise resolved with itself",
      ze = a("currentTaskTrace");
    function _e(H, L, M) {
      let k = fe();
      if (H === M) throw new TypeError(ct);
      if (H[R] === Z) {
        let re = null;
        try {
          (typeof M == "object" || typeof M == "function") &&
            (re = M && M.then);
        } catch (ge) {
          return (
            k(() => {
              _e(H, !1, ge);
            })(),
            H
          );
        }
        if (
          L !== le &&
          M instanceof Oe &&
          M.hasOwnProperty(R) &&
          M.hasOwnProperty(T) &&
          M[R] !== Z
        )
          y(M), _e(H, M[R], M[T]);
        else if (L !== le && typeof re == "function")
          try {
            re.call(M, k(ae(H, L)), k(ae(H, !1)));
          } catch (ge) {
            k(() => {
              _e(H, !1, ge);
            })();
          }
        else {
          H[R] = L;
          let ge = H[T];
          if (
            ((H[T] = M),
            H[U] === U && L === Ee && ((H[R] = H[ee]), (H[T] = H[K])),
            L === le && M instanceof Error)
          ) {
            let ue =
              t.currentTask && t.currentTask.data && t.currentTask.data[_];
            ue &&
              o(M, ze, {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: ue,
              });
          }
          for (let ue = 0; ue < ge.length; )
            b(H, ge[ue++], ge[ue++], ge[ue++], ge[ue++]);
          if (ge.length == 0 && L == le) {
            H[R] = se;
            let ue = M;
            try {
              throw new Error(
                "Uncaught (in promise): " +
                  s(M) +
                  (M && M.stack
                    ? `
` + M.stack
                    : "")
              );
            } catch (Se) {
              ue = Se;
            }
            c && (ue.throwOriginal = !0),
              (ue.rejection = M),
              (ue.promise = H),
              (ue.zone = t.current),
              (ue.task = t.currentTask),
              l.push(ue),
              i.scheduleMicroTask();
          }
        }
      }
      return H;
    }
    let te = a("rejectionHandledHandler");
    function y(H) {
      if (H[R] === se) {
        try {
          let L = t[te];
          L &&
            typeof L == "function" &&
            L.call(this, { rejection: H[T], promise: H });
        } catch {}
        H[R] = le;
        for (let L = 0; L < l.length; L++) H === l[L].promise && l.splice(L, 1);
      }
    }
    function b(H, L, M, k, re) {
      y(H);
      let ge = H[R],
        ue = ge
          ? typeof k == "function"
            ? k
            : P
          : typeof re == "function"
          ? re
          : F;
      L.scheduleMicroTask(
        ce,
        () => {
          try {
            let Se = H[T],
              De = !!M && U === M[U];
            De && ((M[K] = Se), (M[ee] = ge));
            let xe = L.run(ue, void 0, De && ue !== F && ue !== P ? [] : [Se]);
            _e(M, !0, xe);
          } catch (Se) {
            _e(M, !1, Se);
          }
        },
        M
      );
    }
    let he = "function ZoneAwarePromise() { [native code] }",
      ne = function () {},
      We = n.AggregateError;
    class Oe {
      static toString() {
        return he;
      }
      static resolve(L) {
        return L instanceof Oe ? L : _e(new this(null), Ee, L);
      }
      static reject(L) {
        return _e(new this(null), le, L);
      }
      static withResolvers() {
        let L = {};
        return (
          (L.promise = new Oe((M, k) => {
            (L.resolve = M), (L.reject = k);
          })),
          L
        );
      }
      static any(L) {
        if (!L || typeof L[Symbol.iterator] != "function")
          return Promise.reject(new We([], "All promises were rejected"));
        let M = [],
          k = 0;
        try {
          for (let ue of L) k++, M.push(Oe.resolve(ue));
        } catch {
          return Promise.reject(new We([], "All promises were rejected"));
        }
        if (k === 0)
          return Promise.reject(new We([], "All promises were rejected"));
        let re = !1,
          ge = [];
        return new Oe((ue, Se) => {
          for (let De = 0; De < M.length; De++)
            M[De].then(
              (xe) => {
                re || ((re = !0), ue(xe));
              },
              (xe) => {
                ge.push(xe),
                  k--,
                  k === 0 &&
                    ((re = !0), Se(new We(ge, "All promises were rejected")));
              }
            );
        });
      }
      static race(L) {
        let M,
          k,
          re = new this((Se, De) => {
            (M = Se), (k = De);
          });
        function ge(Se) {
          M(Se);
        }
        function ue(Se) {
          k(Se);
        }
        for (let Se of L) I(Se) || (Se = this.resolve(Se)), Se.then(ge, ue);
        return re;
      }
      static all(L) {
        return Oe.allWithCallback(L);
      }
      static allSettled(L) {
        return (
          this && this.prototype instanceof Oe ? this : Oe
        ).allWithCallback(L, {
          thenCallback: (k) => ({ status: "fulfilled", value: k }),
          errorCallback: (k) => ({ status: "rejected", reason: k }),
        });
      }
      static allWithCallback(L, M) {
        let k,
          re,
          ge = new this((xe, qe) => {
            (k = xe), (re = qe);
          }),
          ue = 2,
          Se = 0,
          De = [];
        for (let xe of L) {
          I(xe) || (xe = this.resolve(xe));
          let qe = Se;
          try {
            xe.then(
              (Ze) => {
                (De[qe] = M ? M.thenCallback(Ze) : Ze), ue--, ue === 0 && k(De);
              },
              (Ze) => {
                M
                  ? ((De[qe] = M.errorCallback(Ze)), ue--, ue === 0 && k(De))
                  : re(Ze);
              }
            );
          } catch (Ze) {
            re(Ze);
          }
          ue++, Se++;
        }
        return (ue -= 2), ue === 0 && k(De), ge;
      }
      constructor(L) {
        let M = this;
        if (!(M instanceof Oe))
          throw new Error("Must be an instanceof Promise.");
        (M[R] = Z), (M[T] = []);
        try {
          let k = fe();
          L && L(k(ae(M, Ee)), k(ae(M, le)));
        } catch (k) {
          _e(M, !1, k);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return Oe;
      }
      then(L, M) {
        let k = this.constructor?.[Symbol.species];
        (!k || typeof k != "function") && (k = this.constructor || Oe);
        let re = new k(ne),
          ge = t.current;
        return (
          this[R] == Z ? this[T].push(ge, re, L, M) : b(this, ge, re, L, M), re
        );
      }
      catch(L) {
        return this.then(null, L);
      }
      finally(L) {
        let M = this.constructor?.[Symbol.species];
        (!M || typeof M != "function") && (M = Oe);
        let k = new M(ne);
        k[U] = U;
        let re = t.current;
        return (
          this[R] == Z ? this[T].push(re, k, L, L) : b(this, re, k, L, L), k
        );
      }
    }
    (Oe.resolve = Oe.resolve),
      (Oe.reject = Oe.reject),
      (Oe.race = Oe.race),
      (Oe.all = Oe.all);
    let Ot = (n[u] = n.Promise);
    n.Promise = Oe;
    let yt = a("thenPatched");
    function wt(H) {
      let L = H.prototype,
        M = r(L, "then");
      if (M && (M.writable === !1 || !M.configurable)) return;
      let k = L.then;
      (L[d] = k),
        (H.prototype.then = function (re, ge) {
          return new Oe((Se, De) => {
            k.call(this, Se, De);
          }).then(re, ge);
        }),
        (H[yt] = !0);
    }
    i.patchThen = wt;
    function kt(H) {
      return function (L, M) {
        let k = H.apply(L, M);
        if (k instanceof Oe) return k;
        let re = k.constructor;
        return re[yt] || wt(re), k;
      };
    }
    return (
      Ot && (wt(Ot), ur(n, "fetch", (H) => kt(H))),
      (Promise[t.__symbol__("uncaughtPromiseErrors")] = l),
      Oe
    );
  });
}
function rL(e) {
  e.__load_patch("toString", (n) => {
    let t = Function.prototype.toString,
      i = Je("OriginalDelegate"),
      r = Je("Promise"),
      o = Je("Error"),
      s = function () {
        if (typeof this == "function") {
          let u = this[i];
          if (u)
            return typeof u == "function"
              ? t.call(u)
              : Object.prototype.toString.call(u);
          if (this === Promise) {
            let d = n[r];
            if (d) return t.call(d);
          }
          if (this === Error) {
            let d = n[o];
            if (d) return t.call(d);
          }
        }
        return t.call(this);
      };
    (s[i] = t), (Function.prototype.toString = s);
    let a = Object.prototype.toString,
      l = "[object Promise]";
    Object.prototype.toString = function () {
      return typeof Promise == "function" && this instanceof Promise
        ? l
        : a.call(this);
    };
  });
}
function oL(e, n, t, i, r) {
  let o = Zone.__symbol__(i);
  if (n[o]) return;
  let s = (n[o] = n[i]);
  (n[i] = function (a, l, c) {
    return (
      l &&
        l.prototype &&
        r.forEach(function (u) {
          let d = `${t}.${i}::` + u,
            _ = l.prototype;
          try {
            if (_.hasOwnProperty(u)) {
              let h = e.ObjectGetOwnPropertyDescriptor(_, u);
              h && h.value
                ? ((h.value = e.wrapWithCurrentZone(h.value, d)),
                  e._redefineProperty(l.prototype, u, h))
                : _[u] && (_[u] = e.wrapWithCurrentZone(_[u], d));
            } else _[u] && (_[u] = e.wrapWithCurrentZone(_[u], d));
          } catch {}
        }),
      s.call(n, a, l, c)
    );
  }),
    e.attachOriginToPatched(n[i], s);
}
function sL(e) {
  e.__load_patch("util", (n, t, i) => {
    let r = Um(n);
    (i.patchOnProperties = hw),
      (i.patchMethod = ur),
      (i.bindArguments = Ym),
      (i.patchMacroTask = GF);
    let o = t.__symbol__("BLACK_LISTED_EVENTS"),
      s = t.__symbol__("UNPATCHED_EVENTS");
    n[s] && (n[o] = n[s]),
      n[o] && (t[o] = t[s] = n[o]),
      (i.patchEventPrototype = QF),
      (i.patchEventTarget = YF),
      (i.isIEOrEdge = qF),
      (i.ObjectDefineProperty = $m),
      (i.ObjectGetOwnPropertyDescriptor = Nl),
      (i.ObjectCreate = BF),
      (i.ArraySlice = HF),
      (i.patchClass = Ol),
      (i.wrapWithCurrentZone = qm),
      (i.filterProperties = yw),
      (i.attachOriginToPatched = dr),
      (i._redefineProperty = Object.defineProperty),
      (i.patchCallbacks = oL),
      (i.getGlobalObjects = () => ({
        globalSources: pw,
        zoneSymbolEventNames: Hn,
        eventNames: r,
        isBrowser: Qm,
        isMix: fw,
        isNode: rf,
        TRUE_STR: lr,
        FALSE_STR: cr,
        ZONE_SYMBOL_PREFIX: Pl,
        ADD_EVENT_LISTENER_STR: Gm,
        REMOVE_EVENT_LISTENER_STR: Wm,
      }));
  });
}
function aL(e) {
  iL(e), rL(e), sL(e);
}
var bw = jF();
aL(bw);
nL(bw);
(function () {
  "use strict";
  var e = window.Document.prototype.createElement,
    n = window.Document.prototype.createElementNS,
    t = window.Document.prototype.importNode,
    i = window.Document.prototype.prepend,
    r = window.Document.prototype.append,
    o = window.DocumentFragment.prototype.prepend,
    s = window.DocumentFragment.prototype.append,
    a = window.Node.prototype.cloneNode,
    l = window.Node.prototype.appendChild,
    c = window.Node.prototype.insertBefore,
    u = window.Node.prototype.removeChild,
    d = window.Node.prototype.replaceChild,
    _ = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
    h = window.Element.prototype.attachShadow,
    D = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
    I = window.Element.prototype.getAttribute,
    P = window.Element.prototype.setAttribute,
    F = window.Element.prototype.removeAttribute,
    R = window.Element.prototype.toggleAttribute,
    T = window.Element.prototype.getAttributeNS,
    U = window.Element.prototype.setAttributeNS,
    K = window.Element.prototype.removeAttributeNS,
    ee = window.Element.prototype.insertAdjacentElement,
    ce = window.Element.prototype.insertAdjacentHTML,
    Z = window.Element.prototype.prepend,
    Ee = window.Element.prototype.append,
    le = window.Element.prototype.before,
    se = window.Element.prototype.after,
    ae = window.Element.prototype.replaceWith,
    fe = window.Element.prototype.remove,
    ct = window.HTMLElement,
    ze = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      "innerHTML"
    ),
    _e = window.HTMLElement.prototype.insertAdjacentElement,
    te = window.HTMLElement.prototype.insertAdjacentHTML,
    y = new Set();
  "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph"
    .split(" ")
    .forEach(function (p) {
      return y.add(p);
    });
  function b(p) {
    var v = y.has(p);
    return (p = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(p)), !v && p;
  }
  var he = document.contains
    ? document.contains.bind(document)
    : document.documentElement.contains.bind(document.documentElement);
  function ne(p) {
    var v = p.isConnected;
    if (v !== void 0) return v;
    if (he(p)) return !0;
    for (; p && !(p.__CE_isImportDocument || p instanceof Document); )
      p =
        p.parentNode ||
        (window.ShadowRoot && p instanceof ShadowRoot ? p.host : void 0);
    return !(!p || !(p.__CE_isImportDocument || p instanceof Document));
  }
  function We(p) {
    var v = p.children;
    if (v) return Array.prototype.slice.call(v);
    for (v = [], p = p.firstChild; p; p = p.nextSibling)
      p.nodeType === Node.ELEMENT_NODE && v.push(p);
    return v;
  }
  function Oe(p, v) {
    for (; v && v !== p && !v.nextSibling; ) v = v.parentNode;
    return v && v !== p ? v.nextSibling : null;
  }
  function Ot(p, v, w) {
    for (var N = p; N; ) {
      if (N.nodeType === Node.ELEMENT_NODE) {
        var C = N;
        v(C);
        var S = C.localName;
        if (S === "link" && C.getAttribute("rel") === "import") {
          if (
            ((N = C.import),
            w === void 0 && (w = new Set()),
            N instanceof Node && !w.has(N))
          )
            for (w.add(N), N = N.firstChild; N; N = N.nextSibling) Ot(N, v, w);
          N = Oe(p, C);
          continue;
        } else if (S === "template") {
          N = Oe(p, C);
          continue;
        }
        if ((C = C.__CE_shadowRoot))
          for (C = C.firstChild; C; C = C.nextSibling) Ot(C, v, w);
      }
      N = N.firstChild ? N.firstChild : Oe(p, N);
    }
  }
  function yt() {
    var p = !(gn == null || !gn.noDocumentConstructionObserver),
      v = !(gn == null || !gn.shadyDomFastWalk);
    (this.m = []),
      (this.g = []),
      (this.j = !1),
      (this.shadyDomFastWalk = v),
      (this.I = !p);
  }
  function wt(p, v, w, N) {
    var C = window.ShadyDOM;
    if (p.shadyDomFastWalk && C && C.inUse) {
      if ((v.nodeType === Node.ELEMENT_NODE && w(v), v.querySelectorAll))
        for (
          p = C.nativeMethods.querySelectorAll.call(v, "*"), v = 0;
          v < p.length;
          v++
        )
          w(p[v]);
    } else Ot(v, w, N);
  }
  function kt(p, v) {
    (p.j = !0), p.m.push(v);
  }
  function H(p, v) {
    (p.j = !0), p.g.push(v);
  }
  function L(p, v) {
    p.j &&
      wt(p, v, function (w) {
        return M(p, w);
      });
  }
  function M(p, v) {
    if (p.j && !v.__CE_patched) {
      v.__CE_patched = !0;
      for (var w = 0; w < p.m.length; w++) p.m[w](v);
      for (w = 0; w < p.g.length; w++) p.g[w](v);
    }
  }
  function k(p, v) {
    var w = [];
    for (
      wt(p, v, function (C) {
        return w.push(C);
      }),
        v = 0;
      v < w.length;
      v++
    ) {
      var N = w[v];
      N.__CE_state === 1 ? p.connectedCallback(N) : ue(p, N);
    }
  }
  function re(p, v) {
    var w = [];
    for (
      wt(p, v, function (C) {
        return w.push(C);
      }),
        v = 0;
      v < w.length;
      v++
    ) {
      var N = w[v];
      N.__CE_state === 1 && p.disconnectedCallback(N);
    }
  }
  function ge(p, v, w) {
    w = w === void 0 ? {} : w;
    var N = w.J,
      C =
        w.upgrade ||
        function (V) {
          return ue(p, V);
        },
      S = [];
    for (
      wt(
        p,
        v,
        function (V) {
          if (
            (p.j && M(p, V),
            V.localName === "link" && V.getAttribute("rel") === "import")
          ) {
            var Q = V.import;
            Q instanceof Node &&
              ((Q.__CE_isImportDocument = !0),
              (Q.__CE_registry = document.__CE_registry)),
              Q && Q.readyState === "complete"
                ? (Q.__CE_documentLoadHandled = !0)
                : V.addEventListener("load", function () {
                    var oe = V.import;
                    if (!oe.__CE_documentLoadHandled) {
                      oe.__CE_documentLoadHandled = !0;
                      var Fe = new Set();
                      N &&
                        (N.forEach(function (pt) {
                          return Fe.add(pt);
                        }),
                        Fe.delete(oe)),
                        ge(p, oe, { J: Fe, upgrade: C });
                    }
                  });
          } else S.push(V);
        },
        N
      ),
        v = 0;
      v < S.length;
      v++
    )
      C(S[v]);
  }
  function ue(p, v) {
    try {
      var w = v.ownerDocument,
        N = w.__CE_registry,
        C =
          N && (w.defaultView || w.__CE_isImportDocument)
            ? Un(N, v.localName)
            : void 0;
      if (C && v.__CE_state === void 0) {
        C.constructionStack.push(v);
        try {
          try {
            if (new C.constructorFunction() !== v)
              throw Error(
                "The custom element constructor did not produce the element being upgraded."
              );
          } finally {
            C.constructionStack.pop();
          }
        } catch (oe) {
          throw ((v.__CE_state = 2), oe);
        }
        if (
          ((v.__CE_state = 1),
          (v.__CE_definition = C),
          C.attributeChangedCallback && v.hasAttributes())
        ) {
          var S = C.observedAttributes;
          for (C = 0; C < S.length; C++) {
            var V = S[C],
              Q = v.getAttribute(V);
            Q !== null && p.attributeChangedCallback(v, V, null, Q, null);
          }
        }
        ne(v) && p.connectedCallback(v);
      }
    } catch (oe) {
      De(oe);
    }
  }
  (yt.prototype.connectedCallback = function (p) {
    var v = p.__CE_definition;
    if (v.connectedCallback)
      try {
        v.connectedCallback.call(p);
      } catch (w) {
        De(w);
      }
  }),
    (yt.prototype.disconnectedCallback = function (p) {
      var v = p.__CE_definition;
      if (v.disconnectedCallback)
        try {
          v.disconnectedCallback.call(p);
        } catch (w) {
          De(w);
        }
    }),
    (yt.prototype.attributeChangedCallback = function (p, v, w, N, C) {
      var S = p.__CE_definition;
      if (S.attributeChangedCallback && -1 < S.observedAttributes.indexOf(v))
        try {
          S.attributeChangedCallback.call(p, v, w, N, C);
        } catch (V) {
          De(V);
        }
    });
  function Se(p, v, w, N) {
    var C = v.__CE_registry;
    if (
      C &&
      (N === null || N === "http://www.w3.org/1999/xhtml") &&
      (C = Un(C, w))
    )
      try {
        var S = new C.constructorFunction();
        if (S.__CE_state === void 0 || S.__CE_definition === void 0)
          throw Error(
            "Failed to construct '" +
              w +
              "': The returned value was not constructed with the HTMLElement constructor."
          );
        if (S.namespaceURI !== "http://www.w3.org/1999/xhtml")
          throw Error(
            "Failed to construct '" +
              w +
              "': The constructed element's namespace must be the HTML namespace."
          );
        if (S.hasAttributes())
          throw Error(
            "Failed to construct '" +
              w +
              "': The constructed element must not have any attributes."
          );
        if (S.firstChild !== null)
          throw Error(
            "Failed to construct '" +
              w +
              "': The constructed element must not have any children."
          );
        if (S.parentNode !== null)
          throw Error(
            "Failed to construct '" +
              w +
              "': The constructed element must not have a parent node."
          );
        if (S.ownerDocument !== v)
          throw Error(
            "Failed to construct '" +
              w +
              "': The constructed element's owner document is incorrect."
          );
        if (S.localName !== w)
          throw Error(
            "Failed to construct '" +
              w +
              "': The constructed element's local name is incorrect."
          );
        return S;
      } catch (V) {
        return (
          De(V),
          (v = N === null ? e.call(v, w) : n.call(v, N, w)),
          Object.setPrototypeOf(v, HTMLUnknownElement.prototype),
          (v.__CE_state = 2),
          (v.__CE_definition = void 0),
          M(p, v),
          v
        );
      }
    return (v = N === null ? e.call(v, w) : n.call(v, N, w)), M(p, v), v;
  }
  function De(p) {
    var v = "",
      w = "",
      N = 0,
      C = 0;
    p instanceof Error
      ? ((v = p.message),
        (w = p.sourceURL || p.fileName || ""),
        (N = p.line || p.lineNumber || 0),
        (C = p.column || p.columnNumber || 0))
      : (v = "Uncaught " + String(p));
    var S = void 0;
    ErrorEvent.prototype.initErrorEvent === void 0
      ? (S = new ErrorEvent("error", {
          cancelable: !0,
          message: v,
          filename: w,
          lineno: N,
          colno: C,
          error: p,
        }))
      : ((S = document.createEvent("ErrorEvent")),
        S.initErrorEvent("error", !1, !0, v, w, N),
        (S.preventDefault = function () {
          Object.defineProperty(this, "defaultPrevented", {
            configurable: !0,
            get: function () {
              return !0;
            },
          });
        })),
      S.error === void 0 &&
        Object.defineProperty(S, "error", {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return p;
          },
        }),
      window.dispatchEvent(S),
      S.defaultPrevented || console.error(p);
  }
  function xe() {
    var p = this;
    (this.g = void 0),
      (this.F = new Promise(function (v) {
        p.l = v;
      }));
  }
  xe.prototype.resolve = function (p) {
    if (this.g) throw Error("Already resolved.");
    (this.g = p), this.l(p);
  };
  function qe(p) {
    var v = document;
    (this.l = void 0),
      (this.h = p),
      (this.g = v),
      ge(this.h, this.g),
      this.g.readyState === "loading" &&
        ((this.l = new MutationObserver(this.G.bind(this))),
        this.l.observe(this.g, { childList: !0, subtree: !0 }));
  }
  function Ze(p) {
    p.l && p.l.disconnect();
  }
  qe.prototype.G = function (p) {
    var v = this.g.readyState;
    for (
      (v !== "interactive" && v !== "complete") || Ze(this), v = 0;
      v < p.length;
      v++
    )
      for (var w = p[v].addedNodes, N = 0; N < w.length; N++) ge(this.h, w[N]);
  };
  function Be(p) {
    (this.s = new Map()),
      (this.u = new Map()),
      (this.C = new Map()),
      (this.A = !1),
      (this.B = new Map()),
      (this.o = function (v) {
        return v();
      }),
      (this.i = !1),
      (this.v = []),
      (this.h = p),
      (this.D = p.I ? new qe(p) : void 0);
  }
  (Be.prototype.H = function (p, v) {
    var w = this;
    if (!(v instanceof Function))
      throw new TypeError(
        "Custom element constructor getters must be functions."
      );
    Ft(this, p),
      this.s.set(p, v),
      this.v.push(p),
      this.i ||
        ((this.i = !0),
        this.o(function () {
          return Ni(w);
        }));
  }),
    (Be.prototype.define = function (p, v) {
      var w = this;
      if (!(v instanceof Function))
        throw new TypeError("Custom element constructors must be functions.");
      Ft(this, p),
        In(this, p, v),
        this.v.push(p),
        this.i ||
          ((this.i = !0),
          this.o(function () {
            return Ni(w);
          }));
    });
  function Ft(p, v) {
    if (!b(v))
      throw new SyntaxError("The element name '" + v + "' is not valid.");
    if (Un(p, v))
      throw Error(
        "A custom element with name '" + (v + "' has already been defined.")
      );
    if (p.A) throw Error("A custom element is already being defined.");
  }
  function In(p, v, w) {
    p.A = !0;
    var N;
    try {
      var C = w.prototype;
      if (!(C instanceof Object))
        throw new TypeError(
          "The custom element constructor's prototype is not an object."
        );
      var S = function (pt) {
          var ko = C[pt];
          if (ko !== void 0 && !(ko instanceof Function))
            throw Error("The '" + pt + "' callback must be a function.");
          return ko;
        },
        V = S("connectedCallback"),
        Q = S("disconnectedCallback"),
        oe = S("adoptedCallback"),
        Fe =
          ((N = S("attributeChangedCallback")) && w.observedAttributes) || [];
    } catch (pt) {
      throw pt;
    } finally {
      p.A = !1;
    }
    return (
      (w = {
        localName: v,
        constructorFunction: w,
        connectedCallback: V,
        disconnectedCallback: Q,
        adoptedCallback: oe,
        attributeChangedCallback: N,
        observedAttributes: Fe,
        constructionStack: [],
      }),
      p.u.set(v, w),
      p.C.set(w.constructorFunction, w),
      w
    );
  }
  Be.prototype.upgrade = function (p) {
    ge(this.h, p);
  };
  function Ni(p) {
    if (p.i !== !1) {
      p.i = !1;
      for (var v = [], w = p.v, N = new Map(), C = 0; C < w.length; C++)
        N.set(w[C], []);
      for (
        ge(p.h, document, {
          upgrade: function (oe) {
            if (oe.__CE_state === void 0) {
              var Fe = oe.localName,
                pt = N.get(Fe);
              pt ? pt.push(oe) : p.u.has(Fe) && v.push(oe);
            }
          },
        }),
          C = 0;
        C < v.length;
        C++
      )
        ue(p.h, v[C]);
      for (C = 0; C < w.length; C++) {
        for (var S = w[C], V = N.get(S), Q = 0; Q < V.length; Q++)
          ue(p.h, V[Q]);
        (S = p.B.get(S)) && S.resolve(void 0);
      }
      w.length = 0;
    }
  }
  (Be.prototype.get = function (p) {
    if ((p = Un(this, p))) return p.constructorFunction;
  }),
    (Be.prototype.whenDefined = function (p) {
      if (!b(p))
        return Promise.reject(
          new SyntaxError("'" + p + "' is not a valid custom element name.")
        );
      var v = this.B.get(p);
      if (v) return v.F;
      (v = new xe()), this.B.set(p, v);
      var w = this.u.has(p) || this.s.has(p);
      return (p = this.v.indexOf(p) === -1), w && p && v.resolve(void 0), v.F;
    }),
    (Be.prototype.polyfillWrapFlushCallback = function (p) {
      this.D && Ze(this.D);
      var v = this.o;
      this.o = function (w) {
        return p(function () {
          return v(w);
        });
      };
    });
  function Un(p, v) {
    var w = p.u.get(v);
    if (w) return w;
    if ((w = p.s.get(v))) {
      p.s.delete(v);
      try {
        return In(p, v, w());
      } catch (N) {
        De(N);
      }
    }
  }
  (Be.prototype.define = Be.prototype.define),
    (Be.prototype.upgrade = Be.prototype.upgrade),
    (Be.prototype.get = Be.prototype.get),
    (Be.prototype.whenDefined = Be.prototype.whenDefined),
    (Be.prototype.polyfillDefineLazy = Be.prototype.H),
    (Be.prototype.polyfillWrapFlushCallback =
      Be.prototype.polyfillWrapFlushCallback);
  function fr(p, v, w) {
    function N(C) {
      return function (S) {
        for (var V = [], Q = 0; Q < arguments.length; ++Q) V[Q] = arguments[Q];
        Q = [];
        for (var oe = [], Fe = 0; Fe < V.length; Fe++) {
          var pt = V[Fe];
          if (
            (pt instanceof Element && ne(pt) && oe.push(pt),
            pt instanceof DocumentFragment)
          )
            for (pt = pt.firstChild; pt; pt = pt.nextSibling) Q.push(pt);
          else Q.push(pt);
        }
        for (C.apply(this, V), V = 0; V < oe.length; V++) re(p, oe[V]);
        if (ne(this))
          for (V = 0; V < Q.length; V++)
            (oe = Q[V]), oe instanceof Element && k(p, oe);
      };
    }
    w.prepend !== void 0 && (v.prepend = N(w.prepend)),
      w.append !== void 0 && (v.append = N(w.append));
  }
  function hr(p) {
    (Document.prototype.createElement = function (v) {
      return Se(p, this, v, null);
    }),
      (Document.prototype.importNode = function (v, w) {
        return (
          (v = t.call(this, v, !!w)), this.__CE_registry ? ge(p, v) : L(p, v), v
        );
      }),
      (Document.prototype.createElementNS = function (v, w) {
        return Se(p, this, w, v);
      }),
      fr(p, Document.prototype, { prepend: i, append: r });
  }
  function Gr(p) {
    function v(N) {
      return function (C) {
        for (var S = [], V = 0; V < arguments.length; ++V) S[V] = arguments[V];
        V = [];
        for (var Q = [], oe = 0; oe < S.length; oe++) {
          var Fe = S[oe];
          if (
            (Fe instanceof Element && ne(Fe) && Q.push(Fe),
            Fe instanceof DocumentFragment)
          )
            for (Fe = Fe.firstChild; Fe; Fe = Fe.nextSibling) V.push(Fe);
          else V.push(Fe);
        }
        for (N.apply(this, S), S = 0; S < Q.length; S++) re(p, Q[S]);
        if (ne(this))
          for (S = 0; S < V.length; S++)
            (Q = V[S]), Q instanceof Element && k(p, Q);
      };
    }
    var w = Element.prototype;
    le !== void 0 && (w.before = v(le)),
      se !== void 0 && (w.after = v(se)),
      ae !== void 0 &&
        (w.replaceWith = function (N) {
          for (var C = [], S = 0; S < arguments.length; ++S)
            C[S] = arguments[S];
          S = [];
          for (var V = [], Q = 0; Q < C.length; Q++) {
            var oe = C[Q];
            if (
              (oe instanceof Element && ne(oe) && V.push(oe),
              oe instanceof DocumentFragment)
            )
              for (oe = oe.firstChild; oe; oe = oe.nextSibling) S.push(oe);
            else S.push(oe);
          }
          for (Q = ne(this), ae.apply(this, C), C = 0; C < V.length; C++)
            re(p, V[C]);
          if (Q)
            for (re(p, this), C = 0; C < S.length; C++)
              (V = S[C]), V instanceof Element && k(p, V);
        }),
      fe !== void 0 &&
        (w.remove = function () {
          var N = ne(this);
          fe.call(this), N && re(p, this);
        });
  }
  function $n(p) {
    function v(C, S) {
      Object.defineProperty(C, "innerHTML", {
        enumerable: S.enumerable,
        configurable: !0,
        get: S.get,
        set: function (V) {
          var Q = this,
            oe = void 0;
          if (
            (ne(this) &&
              ((oe = []),
              wt(p, this, function (ko) {
                ko !== Q && oe.push(ko);
              })),
            S.set.call(this, V),
            oe)
          )
            for (var Fe = 0; Fe < oe.length; Fe++) {
              var pt = oe[Fe];
              pt.__CE_state === 1 && p.disconnectedCallback(pt);
            }
          return this.ownerDocument.__CE_registry ? ge(p, this) : L(p, this), V;
        },
      });
    }
    function w(C, S) {
      C.insertAdjacentElement = function (V, Q) {
        var oe = ne(Q);
        return (V = S.call(this, V, Q)), oe && re(p, Q), ne(V) && k(p, Q), V;
      };
    }
    function N(C, S) {
      function V(Q, oe) {
        for (var Fe = []; Q !== oe; Q = Q.nextSibling) Fe.push(Q);
        for (oe = 0; oe < Fe.length; oe++) ge(p, Fe[oe]);
      }
      C.insertAdjacentHTML = function (Q, oe) {
        if (((Q = Q.toLowerCase()), Q === "beforebegin")) {
          var Fe = this.previousSibling;
          S.call(this, Q, oe), V(Fe || this.parentNode.firstChild, this);
        } else if (Q === "afterbegin")
          (Fe = this.firstChild), S.call(this, Q, oe), V(this.firstChild, Fe);
        else if (Q === "beforeend")
          (Fe = this.lastChild),
            S.call(this, Q, oe),
            V(Fe || this.firstChild, null);
        else if (Q === "afterend")
          (Fe = this.nextSibling), S.call(this, Q, oe), V(this.nextSibling, Fe);
        else
          throw new SyntaxError(
            "The value provided (" +
              String(Q) +
              ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
          );
      };
    }
    h &&
      (Element.prototype.attachShadow = function (C) {
        if (((C = h.call(this, C)), p.j && !C.__CE_patched)) {
          C.__CE_patched = !0;
          for (var S = 0; S < p.m.length; S++) p.m[S](C);
        }
        return (this.__CE_shadowRoot = C);
      }),
      D && D.get
        ? v(Element.prototype, D)
        : ze && ze.get
        ? v(HTMLElement.prototype, ze)
        : H(p, function (C) {
            v(C, {
              enumerable: !0,
              configurable: !0,
              get: function () {
                return a.call(this, !0).innerHTML;
              },
              set: function (S) {
                var V = this.localName === "template",
                  Q = V ? this.content : this,
                  oe = n.call(document, this.namespaceURI, this.localName);
                for (oe.innerHTML = S; 0 < Q.childNodes.length; )
                  u.call(Q, Q.childNodes[0]);
                for (S = V ? oe.content : oe; 0 < S.childNodes.length; )
                  l.call(Q, S.childNodes[0]);
              },
            });
          }),
      (Element.prototype.setAttribute = function (C, S) {
        if (this.__CE_state !== 1) return P.call(this, C, S);
        var V = I.call(this, C);
        P.call(this, C, S),
          (S = I.call(this, C)),
          p.attributeChangedCallback(this, C, V, S, null);
      }),
      (Element.prototype.setAttributeNS = function (C, S, V) {
        if (this.__CE_state !== 1) return U.call(this, C, S, V);
        var Q = T.call(this, C, S);
        U.call(this, C, S, V),
          (V = T.call(this, C, S)),
          p.attributeChangedCallback(this, S, Q, V, C);
      }),
      (Element.prototype.removeAttribute = function (C) {
        if (this.__CE_state !== 1) return F.call(this, C);
        var S = I.call(this, C);
        F.call(this, C),
          S !== null && p.attributeChangedCallback(this, C, S, null, null);
      }),
      R &&
        (Element.prototype.toggleAttribute = function (C, S) {
          if (this.__CE_state !== 1) return R.call(this, C, S);
          var V = I.call(this, C),
            Q = V !== null;
          return (
            (S = R.call(this, C, S)),
            Q !== S &&
              p.attributeChangedCallback(this, C, V, S ? "" : null, null),
            S
          );
        }),
      (Element.prototype.removeAttributeNS = function (C, S) {
        if (this.__CE_state !== 1) return K.call(this, C, S);
        var V = T.call(this, C, S);
        K.call(this, C, S);
        var Q = T.call(this, C, S);
        V !== Q && p.attributeChangedCallback(this, S, V, Q, C);
      }),
      _e ? w(HTMLElement.prototype, _e) : ee && w(Element.prototype, ee),
      te ? N(HTMLElement.prototype, te) : ce && N(Element.prototype, ce),
      fr(p, Element.prototype, { prepend: Z, append: Ee }),
      Gr(p);
  }
  var Ys = {};
  function Ro(p) {
    function v() {
      var w = this.constructor,
        N = document.__CE_registry.C.get(w);
      if (!N)
        throw Error(
          "Failed to construct a custom element: The constructor was not registered with `customElements`."
        );
      var C = N.constructionStack;
      if (C.length === 0)
        return (
          (C = e.call(document, N.localName)),
          Object.setPrototypeOf(C, w.prototype),
          (C.__CE_state = 1),
          (C.__CE_definition = N),
          M(p, C),
          C
        );
      var S = C.length - 1,
        V = C[S];
      if (V === Ys)
        throw Error(
          "Failed to construct '" +
            N.localName +
            "': This element was already constructed."
        );
      return (C[S] = Ys), Object.setPrototypeOf(V, w.prototype), M(p, V), V;
    }
    (v.prototype = ct.prototype),
      Object.defineProperty(HTMLElement.prototype, "constructor", {
        writable: !0,
        configurable: !0,
        enumerable: !1,
        value: v,
      }),
      (window.HTMLElement = v);
  }
  function Al(p) {
    function v(w, N) {
      Object.defineProperty(w, "textContent", {
        enumerable: N.enumerable,
        configurable: !0,
        get: N.get,
        set: function (C) {
          if (this.nodeType === Node.TEXT_NODE) N.set.call(this, C);
          else {
            var S = void 0;
            if (this.firstChild) {
              var V = this.childNodes,
                Q = V.length;
              if (0 < Q && ne(this)) {
                S = Array(Q);
                for (var oe = 0; oe < Q; oe++) S[oe] = V[oe];
              }
            }
            if ((N.set.call(this, C), S))
              for (C = 0; C < S.length; C++) re(p, S[C]);
          }
        },
      });
    }
    (Node.prototype.insertBefore = function (w, N) {
      if (w instanceof DocumentFragment) {
        var C = We(w);
        if (((w = c.call(this, w, N)), ne(this)))
          for (N = 0; N < C.length; N++) k(p, C[N]);
        return w;
      }
      return (
        (C = w instanceof Element && ne(w)),
        (N = c.call(this, w, N)),
        C && re(p, w),
        ne(this) && k(p, w),
        N
      );
    }),
      (Node.prototype.appendChild = function (w) {
        if (w instanceof DocumentFragment) {
          var N = We(w);
          if (((w = l.call(this, w)), ne(this)))
            for (var C = 0; C < N.length; C++) k(p, N[C]);
          return w;
        }
        return (
          (N = w instanceof Element && ne(w)),
          (C = l.call(this, w)),
          N && re(p, w),
          ne(this) && k(p, w),
          C
        );
      }),
      (Node.prototype.cloneNode = function (w) {
        return (
          (w = a.call(this, !!w)),
          this.ownerDocument.__CE_registry ? ge(p, w) : L(p, w),
          w
        );
      }),
      (Node.prototype.removeChild = function (w) {
        var N = w instanceof Element && ne(w),
          C = u.call(this, w);
        return N && re(p, w), C;
      }),
      (Node.prototype.replaceChild = function (w, N) {
        if (w instanceof DocumentFragment) {
          var C = We(w);
          if (((w = d.call(this, w, N)), ne(this)))
            for (re(p, N), N = 0; N < C.length; N++) k(p, C[N]);
          return w;
        }
        C = w instanceof Element && ne(w);
        var S = d.call(this, w, N),
          V = ne(this);
        return V && re(p, N), C && re(p, w), V && k(p, w), S;
      }),
      _ && _.get
        ? v(Node.prototype, _)
        : kt(p, function (w) {
            v(w, {
              enumerable: !0,
              configurable: !0,
              get: function () {
                for (var N = [], C = this.firstChild; C; C = C.nextSibling)
                  C.nodeType !== Node.COMMENT_NODE && N.push(C.textContent);
                return N.join("");
              },
              set: function (N) {
                for (; this.firstChild; ) u.call(this, this.firstChild);
                N != null &&
                  N !== "" &&
                  l.call(this, document.createTextNode(N));
              },
            });
          });
  }
  var gn = window.customElements;
  function pr() {
    var p = new yt();
    Ro(p),
      hr(p),
      fr(p, DocumentFragment.prototype, { prepend: o, append: s }),
      Al(p),
      $n(p),
      (window.CustomElementRegistry = Be),
      (p = new Be(p)),
      (document.__CE_registry = p),
      Object.defineProperty(window, "customElements", {
        configurable: !0,
        enumerable: !0,
        value: p,
      });
  }
  (gn &&
    !gn.forcePolyfill &&
    typeof gn.define == "function" &&
    typeof gn.get == "function") ||
    pr(),
    (window.__CE_installPolyfill = pr);
}).call(self);
tC()
  .bootstrapModule(Xd, { ngZoneEventCoalescing: !0 })
  .catch((e) => console.error(e));
