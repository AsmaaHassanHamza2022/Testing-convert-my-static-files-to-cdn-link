var lb = Object.defineProperty,
  ub = Object.defineProperties;
var db = Object.getOwnPropertyDescriptors;
var Bp = Object.getOwnPropertySymbols;
var fb = Object.prototype.hasOwnProperty,
  hb = Object.prototype.propertyIsEnumerable;
var Vp = (e, t, n) =>
    t in e
      ? lb(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  G = (e, t) => {
    for (var n in (t ||= {})) fb.call(t, n) && Vp(e, n, t[n]);
    if (Bp) for (var n of Bp(t)) hb.call(t, n) && Vp(e, n, t[n]);
    return e;
  },
  We = (e, t) => ub(e, db(t));
var pa = (e, t, n) =>
  new Promise((i, r) => {
    var o = (c) => {
        try {
          a(n.next(c));
        } catch (l) {
          r(l);
        }
      },
      s = (c) => {
        try {
          a(n.throw(c));
        } catch (l) {
          r(l);
        }
      },
      a = (c) => (c.done ? i(c.value) : Promise.resolve(c.value).then(o, s));
    a((n = n.apply(e, t)).next());
  });
var hu = null;
var fu = 1,
  Hp = Symbol("SIGNAL");
function Fe(e) {
  let t = hu;
  return (hu = e), t;
}
function $p() {
  return hu;
}
var pu = {
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
function pb(e) {
  if (!(vu(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === fu)) {
    if (!e.producerMustRecompute(e) && !mu(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = fu);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = fu);
  }
}
function gu(e) {
  return e && (e.nextProducerIndex = 0), Fe(e);
}
function Up(e, t) {
  if (
    (Fe(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (vu(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        yu(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function mu(e) {
  bu(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      i = e.producerLastReadVersion[t];
    if (i !== n.version || (pb(n), i !== n.version)) return !0;
  }
  return !1;
}
function _u(e) {
  if ((bu(e), vu(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      yu(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function yu(e, t) {
  if ((gb(e), e.liveConsumerNode.length === 1 && mb(e)))
    for (let i = 0; i < e.producerNode.length; i++)
      yu(e.producerNode[i], e.producerIndexOfThis[i]);
  let n = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    let i = e.liveConsumerIndexOfThis[t],
      r = e.liveConsumerNode[t];
    bu(r), (r.producerIndexOfThis[i] = t);
  }
}
function vu(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function bu(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function gb(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function mb(e) {
  return e.producerNode !== void 0;
}
function _b() {
  throw new Error();
}
var yb = _b;
function Gp(e) {
  yb = e;
}
function ce(e) {
  return typeof e == "function";
}
function Br(e) {
  let n = e((i) => {
    Error.call(i), (i.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var ga = Br(
  (e) =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((i, r) => `${r + 1}) ${i.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = n);
    }
);
function ir(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var nt = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n)))
          for (let o of n) o.remove(this);
        else n.remove(this);
      let { initialTeardown: i } = this;
      if (ce(i))
        try {
          i();
        } catch (o) {
          t = o instanceof ga ? o.errors : [o];
        }
      let { _finalizers: r } = this;
      if (r) {
        this._finalizers = null;
        for (let o of r)
          try {
            zp(o);
          } catch (s) {
            (t = t ?? []),
              s instanceof ga ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new ga(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) zp(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers =
          (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && ir(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && ir(n, t), t instanceof e && t._removeParent(this);
  }
};
nt.EMPTY = (() => {
  let e = new nt();
  return (e.closed = !0), e;
})();
var Du = nt.EMPTY;
function ma(e) {
  return (
    e instanceof nt ||
    (e && "closed" in e && ce(e.remove) && ce(e.add) && ce(e.unsubscribe))
  );
}
function zp(e) {
  ce(e) ? e() : e.unsubscribe();
}
var En = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Vr = {
  setTimeout(e, t, ...n) {
    let { delegate: i } = Vr;
    return i?.setTimeout ? i.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = Vr;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function _a(e) {
  Vr.setTimeout(() => {
    let { onUnhandledError: t } = En;
    if (t) t(e);
    else throw e;
  });
}
function Kn() {}
var Wp = wu("C", void 0, void 0);
function qp(e) {
  return wu("E", void 0, e);
}
function Zp(e) {
  return wu("N", e, void 0);
}
function wu(e, t, n) {
  return { kind: e, value: t, error: n };
}
var rr = null;
function Hr(e) {
  if (En.useDeprecatedSynchronousErrorHandling) {
    let t = !rr;
    if ((t && (rr = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: i } = rr;
      if (((rr = null), n)) throw i;
    }
  } else e();
}
function Yp(e) {
  En.useDeprecatedSynchronousErrorHandling &&
    rr &&
    ((rr.errorThrown = !0), (rr.error = e));
}
var or = class extends nt {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), ma(t) && t.add(this))
          : (this.destination = Db);
    }
    static create(t, n, i) {
      return new Jn(t, n, i);
    }
    next(t) {
      this.isStopped ? Eu(Zp(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? Eu(qp(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Eu(Wp, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
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
  vb = Function.prototype.bind;
function Cu(e, t) {
  return vb.call(e, t);
}
var Tu = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (i) {
          ya(i);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (i) {
          ya(i);
        }
      else ya(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          ya(n);
        }
    }
  },
  Jn = class extends or {
    constructor(t, n, i) {
      super();
      let r;
      if (ce(t) || !t)
        r = { next: t ?? void 0, error: n ?? void 0, complete: i ?? void 0 };
      else {
        let o;
        this && En.useDeprecatedNextContext
          ? ((o = Object.create(t)),
            (o.unsubscribe = () => this.unsubscribe()),
            (r = {
              next: t.next && Cu(t.next, o),
              error: t.error && Cu(t.error, o),
              complete: t.complete && Cu(t.complete, o),
            }))
          : (r = t);
      }
      this.destination = new Tu(r);
    }
  };
function ya(e) {
  En.useDeprecatedSynchronousErrorHandling ? Yp(e) : _a(e);
}
function bb(e) {
  throw e;
}
function Eu(e, t) {
  let { onStoppedNotification: n } = En;
  n && Vr.setTimeout(() => n(e, t));
}
var Db = { closed: !0, next: Kn, error: bb, complete: Kn };
var $r = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function Bt(e) {
  return e;
}
function Mu(...e) {
  return Iu(e);
}
function Iu(e) {
  return e.length === 0
    ? Bt
    : e.length === 1
    ? e[0]
    : function (n) {
        return e.reduce((i, r) => r(i), n);
      };
}
var ye = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let i = new e();
      return (i.source = this), (i.operator = n), i;
    }
    subscribe(n, i, r) {
      let o = Cb(n) ? n : new Jn(n, i, r);
      return (
        Hr(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (i) {
        n.error(i);
      }
    }
    forEach(n, i) {
      return (
        (i = Qp(i)),
        new i((r, o) => {
          let s = new Jn({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                o(c), s.unsubscribe();
              }
            },
            error: o,
            complete: r,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var i;
      return (i = this.source) === null || i === void 0
        ? void 0
        : i.subscribe(n);
    }
    [$r]() {
      return this;
    }
    pipe(...n) {
      return Iu(n)(this);
    }
    toPromise(n) {
      return (
        (n = Qp(n)),
        new n((i, r) => {
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
  return (e.create = (t) => new e(t)), e;
})();
function Qp(e) {
  var t;
  return (t = e ?? En.Promise) !== null && t !== void 0 ? t : Promise;
}
function wb(e) {
  return e && ce(e.next) && ce(e.error) && ce(e.complete);
}
function Cb(e) {
  return (e && e instanceof or) || (wb(e) && ma(e));
}
function Su(e) {
  return ce(e?.lift);
}
function we(e) {
  return (t) => {
    if (Su(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (i) {
          this.error(i);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function _e(e, t, n, i, r) {
  return new Ou(e, t, n, i, r);
}
var Ou = class extends or {
  constructor(t, n, i, r, o, s) {
    super(t),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              t.error(c);
            }
          }
        : super._next),
      (this._error = r
        ? function (a) {
            try {
              r(a);
            } catch (c) {
              t.error(c);
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
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(),
        !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function Ur() {
  return we((e, t) => {
    let n = null;
    e._refCount++;
    let i = _e(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let r = e._connection,
        o = n;
      (n = null), r && (!o || r === o) && r.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(i), i.closed || (n = e.connect());
  });
}
var Gr = class extends ye {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      Su(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (
      (!t || t.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new nt();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          _e(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (i) => {
              this._teardown(), n.error(i);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = nt.EMPTY));
    }
    return t;
  }
  refCount() {
    return Ur()(this);
  }
};
var Kp = Br(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var tt = (() => {
    class e extends ye {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let i = new va(this, this);
        return (i.operator = n), i;
      }
      _throwIfClosed() {
        if (this.closed) throw new Kp();
      }
      next(n) {
        Hr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let i of this.currentObservers) i.next(n);
          }
        });
      }
      error(n) {
        Hr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: i } = this;
            for (; i.length; ) i.shift().error(n);
          }
        });
      }
      complete() {
        Hr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return (
          ((n = this.observers) === null || n === void 0 ? void 0 : n.length) >
          0
        );
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }
      _innerSubscribe(n) {
        let { hasError: i, isStopped: r, observers: o } = this;
        return i || r
          ? Du
          : ((this.currentObservers = null),
            o.push(n),
            new nt(() => {
              (this.currentObservers = null), ir(o, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: i, thrownError: r, isStopped: o } = this;
        i ? n.error(r) : o && n.complete();
      }
      asObservable() {
        let n = new ye();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new va(t, n)), e;
  })(),
  va = class extends tt {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, i;
      (i =
        (n = this.destination) === null || n === void 0 ? void 0 : n.next) ===
        null ||
        i === void 0 ||
        i.call(n, t);
    }
    error(t) {
      var n, i;
      (i =
        (n = this.destination) === null || n === void 0 ? void 0 : n.error) ===
        null ||
        i === void 0 ||
        i.call(n, t);
    }
    complete() {
      var t, n;
      (n =
        (t = this.destination) === null || t === void 0
          ? void 0
          : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, i;
      return (i =
        (n = this.source) === null || n === void 0
          ? void 0
          : n.subscribe(t)) !== null && i !== void 0
        ? i
        : Du;
    }
  };
var Ct = class extends tt {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: i } = this;
    if (t) throw n;
    return this._throwIfClosed(), i;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var Qo = {
  now() {
    return (Qo.delegate || Date).now();
  },
  delegate: void 0,
};
var sr = class extends tt {
  constructor(t = 1 / 0, n = 1 / 0, i = Qo) {
    super(),
      (this._bufferSize = t),
      (this._windowTime = n),
      (this._timestampProvider = i),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = n === 1 / 0),
      (this._bufferSize = Math.max(1, t)),
      (this._windowTime = Math.max(1, n));
  }
  next(t) {
    let {
      isStopped: n,
      _buffer: i,
      _infiniteTimeWindow: r,
      _timestampProvider: o,
      _windowTime: s,
    } = this;
    n || (i.push(t), !r && i.push(o.now() + s)),
      this._trimBuffer(),
      super.next(t);
  }
  _subscribe(t) {
    this._throwIfClosed(), this._trimBuffer();
    let n = this._innerSubscribe(t),
      { _infiniteTimeWindow: i, _buffer: r } = this,
      o = r.slice();
    for (let s = 0; s < o.length && !t.closed; s += i ? 1 : 2) t.next(o[s]);
    return this._checkFinalizedStatuses(t), n;
  }
  _trimBuffer() {
    let {
        _bufferSize: t,
        _timestampProvider: n,
        _buffer: i,
        _infiniteTimeWindow: r,
      } = this,
      o = (r ? 1 : 2) * t;
    if ((t < 1 / 0 && o < i.length && i.splice(0, i.length - o), !r)) {
      let s = n.now(),
        a = 0;
      for (let c = 1; c < i.length && i[c] <= s; c += 2) a = c;
      a && i.splice(0, a + 1);
    }
  }
};
var ba = class extends nt {
  constructor(t, n) {
    super();
  }
  schedule(t, n = 0) {
    return this;
  }
};
var Ko = {
  setInterval(e, t, ...n) {
    let { delegate: i } = Ko;
    return i?.setInterval ? i.setInterval(e, t, ...n) : setInterval(e, t, ...n);
  },
  clearInterval(e) {
    let { delegate: t } = Ko;
    return (t?.clearInterval || clearInterval)(e);
  },
  delegate: void 0,
};
var Da = class extends ba {
  constructor(t, n) {
    super(t, n), (this.scheduler = t), (this.work = n), (this.pending = !1);
  }
  schedule(t, n = 0) {
    var i;
    if (this.closed) return this;
    this.state = t;
    let r = this.id,
      o = this.scheduler;
    return (
      r != null && (this.id = this.recycleAsyncId(o, r, n)),
      (this.pending = !0),
      (this.delay = n),
      (this.id =
        (i = this.id) !== null && i !== void 0
          ? i
          : this.requestAsyncId(o, this.id, n)),
      this
    );
  }
  requestAsyncId(t, n, i = 0) {
    return Ko.setInterval(t.flush.bind(t, this), i);
  }
  recycleAsyncId(t, n, i = 0) {
    if (i != null && this.delay === i && this.pending === !1) return n;
    n != null && Ko.clearInterval(n);
  }
  execute(t, n) {
    if (this.closed) return new Error("executing a cancelled action");
    this.pending = !1;
    let i = this._execute(t, n);
    if (i) return i;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(t, n) {
    let i = !1,
      r;
    try {
      this.work(t);
    } catch (o) {
      (i = !0), (r = o || new Error("Scheduled action threw falsy error"));
    }
    if (i) return this.unsubscribe(), r;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: t, scheduler: n } = this,
        { actions: i } = n;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        ir(i, this),
        t != null && (this.id = this.recycleAsyncId(n, t, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var zr = class e {
  constructor(t, n = e.now) {
    (this.schedulerActionCtor = t), (this.now = n);
  }
  schedule(t, n = 0, i) {
    return new this.schedulerActionCtor(this, t).schedule(i, n);
  }
};
zr.now = Qo.now;
var wa = class extends zr {
  constructor(t, n = zr.now) {
    super(t, n), (this.actions = []), (this._active = !1);
  }
  flush(t) {
    let { actions: n } = this;
    if (this._active) {
      n.push(t);
      return;
    }
    let i;
    this._active = !0;
    do if ((i = t.execute(t.state, t.delay))) break;
    while ((t = n.shift()));
    if (((this._active = !1), i)) {
      for (; (t = n.shift()); ) t.unsubscribe();
      throw i;
    }
  }
};
var xu = new wa(Da),
  Jp = xu;
var At = new ye((e) => e.complete());
function Ca(e) {
  return e && ce(e.schedule);
}
function Nu(e) {
  return e[e.length - 1];
}
function Wr(e) {
  return ce(Nu(e)) ? e.pop() : void 0;
}
function Bn(e) {
  return Ca(Nu(e)) ? e.pop() : void 0;
}
function Xp(e, t) {
  return typeof Nu(e) == "number" ? e.pop() : t;
}
function tg(e, t, n, i) {
  function r(o) {
    return o instanceof n
      ? o
      : new n(function (s) {
          s(o);
        });
  }
  return new (n || (n = Promise))(function (o, s) {
    function a(u) {
      try {
        l(i.next(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      try {
        l(i.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      u.done ? o(u.value) : r(u.value).then(a, c);
    }
    l((i = i.apply(e, t || [])).next());
  });
}
function eg(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    i = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && i >= e.length && (e = void 0), { value: e && e[i++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function ar(e) {
  return this instanceof ar ? ((this.v = e), this) : new ar(e);
}
function ng(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = n.apply(e, t || []),
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
      ((r[h] = function (w) {
        return new Promise(function (M, P) {
          o.push([h, w, M, P]) > 1 || c(h, w);
        });
      }),
      D && (r[h] = D(r[h])));
  }
  function c(h, D) {
    try {
      l(i[h](D));
    } catch (w) {
      p(o[0][3], w);
    }
  }
  function l(h) {
    h.value instanceof ar
      ? Promise.resolve(h.value.v).then(u, d)
      : p(o[0][2], h);
  }
  function u(h) {
    c("next", h);
  }
  function d(h) {
    c("throw", h);
  }
  function p(h, D) {
    h(D), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function ig(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof eg == "function" ? eg(e) : e[Symbol.iterator]()),
      (n = {}),
      i("next"),
      i("throw"),
      i("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function i(o) {
    n[o] =
      e[o] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[o](s)), r(a, c, s.done, s.value);
        });
      };
  }
  function r(o, s, a, c) {
    Promise.resolve(c).then(function (l) {
      o({ value: l, done: a });
    }, s);
  }
}
var qr = (e) => e && typeof e.length == "number" && typeof e != "function";
function Ea(e) {
  return ce(e?.then);
}
function Ta(e) {
  return ce(e[$r]);
}
function Ma(e) {
  return Symbol.asyncIterator && ce(e?.[Symbol.asyncIterator]);
}
function Ia(e) {
  return new TypeError(
    `You provided ${
      e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Eb() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var Sa = Eb();
function Oa(e) {
  return ce(e?.[Sa]);
}
function xa(e) {
  return ng(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: i, done: r } = yield ar(n.read());
        if (r) return yield ar(void 0);
        yield yield ar(i);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function Na(e) {
  return ce(e?.getReader);
}
function Se(e) {
  if (e instanceof ye) return e;
  if (e != null) {
    if (Ta(e)) return Tb(e);
    if (qr(e)) return Mb(e);
    if (Ea(e)) return Ib(e);
    if (Ma(e)) return rg(e);
    if (Oa(e)) return Sb(e);
    if (Na(e)) return Ob(e);
  }
  throw Ia(e);
}
function Tb(e) {
  return new ye((t) => {
    let n = e[$r]();
    if (ce(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function Mb(e) {
  return new ye((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Ib(e) {
  return new ye((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, _a);
  });
}
function Sb(e) {
  return new ye((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function rg(e) {
  return new ye((t) => {
    xb(e, t).catch((n) => t.error(n));
  });
}
function Ob(e) {
  return rg(xa(e));
}
function xb(e, t) {
  var n, i, r, o;
  return tg(this, void 0, void 0, function* () {
    try {
      for (n = ig(e); (i = yield n.next()), !i.done; ) {
        let s = i.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      r = { error: s };
    } finally {
      try {
        i && !i.done && (o = n.return) && (yield o.call(n));
      } finally {
        if (r) throw r.error;
      }
    }
    t.complete();
  });
}
function Gt(e, t, n, i = 0, r = !1) {
  let o = t.schedule(function () {
    n(), r ? e.add(this.schedule(null, i)) : this.unsubscribe();
  }, i);
  if ((e.add(o), !r)) return o;
}
function Aa(e, t = 0) {
  return we((n, i) => {
    n.subscribe(
      _e(
        i,
        (r) => Gt(i, e, () => i.next(r), t),
        () => Gt(i, e, () => i.complete(), t),
        (r) => Gt(i, e, () => i.error(r), t)
      )
    );
  });
}
function Ra(e, t = 0) {
  return we((n, i) => {
    i.add(e.schedule(() => n.subscribe(i), t));
  });
}
function og(e, t) {
  return Se(e).pipe(Ra(t), Aa(t));
}
function sg(e, t) {
  return Se(e).pipe(Ra(t), Aa(t));
}
function ag(e, t) {
  return new ye((n) => {
    let i = 0;
    return t.schedule(function () {
      i === e.length
        ? n.complete()
        : (n.next(e[i++]), n.closed || this.schedule());
    });
  });
}
function cg(e, t) {
  return new ye((n) => {
    let i;
    return (
      Gt(n, t, () => {
        (i = e[Sa]()),
          Gt(
            n,
            t,
            () => {
              let r, o;
              try {
                ({ value: r, done: o } = i.next());
              } catch (s) {
                n.error(s);
                return;
              }
              o ? n.complete() : n.next(r);
            },
            0,
            !0
          );
      }),
      () => ce(i?.return) && i.return()
    );
  });
}
function Pa(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new ye((n) => {
    Gt(n, t, () => {
      let i = e[Symbol.asyncIterator]();
      Gt(
        n,
        t,
        () => {
          i.next().then((r) => {
            r.done ? n.complete() : n.next(r.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function lg(e, t) {
  return Pa(xa(e), t);
}
function ug(e, t) {
  if (e != null) {
    if (Ta(e)) return og(e, t);
    if (qr(e)) return ag(e, t);
    if (Ea(e)) return sg(e, t);
    if (Ma(e)) return Pa(e, t);
    if (Oa(e)) return cg(e, t);
    if (Na(e)) return lg(e, t);
  }
  throw Ia(e);
}
function Qe(e, t) {
  return t ? ug(e, t) : Se(e);
}
function X(...e) {
  let t = Bn(e);
  return Qe(e, t);
}
function Zr(e, t) {
  let n = ce(e) ? e : () => e,
    i = (r) => r.error(n());
  return new ye(t ? (r) => t.schedule(i, 0, r) : i);
}
function Xn(e) {
  return !!e && (e instanceof ye || (ce(e.lift) && ce(e.subscribe)));
}
var ei = Br(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function dg(e) {
  return e instanceof Date && !isNaN(e);
}
function ue(e, t) {
  return we((n, i) => {
    let r = 0;
    n.subscribe(
      _e(i, (o) => {
        i.next(e.call(t, o, r++));
      })
    );
  });
}
var { isArray: Nb } = Array;
function Ab(e, t) {
  return Nb(t) ? e(...t) : e(t);
}
function Yr(e) {
  return ue((t) => Ab(e, t));
}
var { isArray: Rb } = Array,
  { getPrototypeOf: Pb, prototype: kb, keys: Fb } = Object;
function ka(e) {
  if (e.length === 1) {
    let t = e[0];
    if (Rb(t)) return { args: t, keys: null };
    if (Lb(t)) {
      let n = Fb(t);
      return { args: n.map((i) => t[i]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function Lb(e) {
  return e && typeof e == "object" && Pb(e) === kb;
}
function Fa(e, t) {
  return e.reduce((n, i, r) => ((n[i] = t[r]), n), {});
}
function Qr(...e) {
  let t = Bn(e),
    n = Wr(e),
    { args: i, keys: r } = ka(e);
  if (i.length === 0) return Qe([], t);
  let o = new ye(jb(i, t, r ? (s) => Fa(r, s) : Bt));
  return n ? o.pipe(Yr(n)) : o;
}
function jb(e, t, n = Bt) {
  return (i) => {
    fg(
      t,
      () => {
        let { length: r } = e,
          o = new Array(r),
          s = r,
          a = r;
        for (let c = 0; c < r; c++)
          fg(
            t,
            () => {
              let l = Qe(e[c], t),
                u = !1;
              l.subscribe(
                _e(
                  i,
                  (d) => {
                    (o[c] = d), u || ((u = !0), a--), a || i.next(n(o.slice()));
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
function fg(e, t, n) {
  e ? Gt(n, e, t) : t();
}
function hg(e, t, n, i, r, o, s, a) {
  let c = [],
    l = 0,
    u = 0,
    d = !1,
    p = () => {
      d && !c.length && !l && t.complete();
    },
    h = (w) => (l < i ? D(w) : c.push(w)),
    D = (w) => {
      o && t.next(w), l++;
      let M = !1;
      Se(n(w, u++)).subscribe(
        _e(
          t,
          (P) => {
            r?.(P), o ? h(P) : t.next(P);
          },
          () => {
            M = !0;
          },
          void 0,
          () => {
            if (M)
              try {
                for (l--; c.length && l < i; ) {
                  let P = c.shift();
                  s ? Gt(t, s, () => D(P)) : D(P);
                }
                p();
              } catch (P) {
                t.error(P);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      _e(t, h, () => {
        (d = !0), p();
      })
    ),
    () => {
      a?.();
    }
  );
}
function qe(e, t, n = 1 / 0) {
  return ce(t)
    ? qe((i, r) => ue((o, s) => t(i, o, r, s))(Se(e(i, r))), n)
    : (typeof t == "number" && (n = t), we((i, r) => hg(i, r, e, n)));
}
function Oi(e = 1 / 0) {
  return qe(Bt, e);
}
function pg() {
  return Oi(1);
}
function Qt(...e) {
  return pg()(Qe(e, Bn(e)));
}
function cr(e) {
  return new ye((t) => {
    Se(e()).subscribe(t);
  });
}
function Au(...e) {
  let t = Wr(e),
    { args: n, keys: i } = ka(e),
    r = new ye((o) => {
      let { length: s } = n;
      if (!s) {
        o.complete();
        return;
      }
      let a = new Array(s),
        c = s,
        l = s;
      for (let u = 0; u < s; u++) {
        let d = !1;
        Se(n[u]).subscribe(
          _e(
            o,
            (p) => {
              d || ((d = !0), l--), (a[u] = p);
            },
            () => c--,
            void 0,
            () => {
              (!c || !d) && (l || o.next(i ? Fa(i, a) : a), o.complete());
            }
          )
        );
      }
    });
  return t ? r.pipe(Yr(t)) : r;
}
var Bb = ["addListener", "removeListener"],
  Vb = ["addEventListener", "removeEventListener"],
  Hb = ["on", "off"];
function xi(e, t, n, i) {
  if ((ce(n) && ((i = n), (n = void 0)), i)) return xi(e, t, n).pipe(Yr(i));
  let [r, o] = Gb(e)
    ? Vb.map((s) => (a) => e[s](t, a, n))
    : $b(e)
    ? Bb.map(gg(e, t))
    : Ub(e)
    ? Hb.map(gg(e, t))
    : [];
  if (!r && qr(e)) return qe((s) => xi(s, t, n))(Se(e));
  if (!r) throw new TypeError("Invalid event target");
  return new ye((s) => {
    let a = (...c) => s.next(1 < c.length ? c : c[0]);
    return r(a), () => o(a);
  });
}
function gg(e, t) {
  return (n) => (i) => e[n](t, i);
}
function $b(e) {
  return ce(e.addListener) && ce(e.removeListener);
}
function Ub(e) {
  return ce(e.on) && ce(e.off);
}
function Gb(e) {
  return ce(e.addEventListener) && ce(e.removeEventListener);
}
function lr(e = 0, t, n = Jp) {
  let i = -1;
  return (
    t != null && (Ca(t) ? (n = t) : (i = t)),
    new ye((r) => {
      let o = dg(e) ? +e - n.now() : e;
      o < 0 && (o = 0);
      let s = 0;
      return n.schedule(function () {
        r.closed ||
          (r.next(s++), 0 <= i ? this.schedule(void 0, i) : r.complete());
      }, o);
    })
  );
}
function La(...e) {
  let t = Bn(e),
    n = Xp(e, 1 / 0),
    i = e;
  return i.length ? (i.length === 1 ? Se(i[0]) : Oi(n)(Qe(i, t))) : At;
}
var { isArray: zb } = Array;
function mg(e) {
  return e.length === 1 && zb(e[0]) ? e[0] : e;
}
function Et(e, t) {
  return we((n, i) => {
    let r = 0;
    n.subscribe(_e(i, (o) => e.call(t, o, r++) && i.next(o)));
  });
}
function ja(...e) {
  return (e = mg(e)), e.length === 1 ? Se(e[0]) : new ye(Wb(e));
}
function Wb(e) {
  return (t) => {
    let n = [];
    for (let i = 0; n && !t.closed && i < e.length; i++)
      n.push(
        Se(e[i]).subscribe(
          _e(t, (r) => {
            if (n) {
              for (let o = 0; o < n.length; o++) o !== i && n[o].unsubscribe();
              n = null;
            }
            t.next(r);
          })
        )
      );
  };
}
function Ni(e) {
  return we((t, n) => {
    let i = null,
      r = !1,
      o;
    (i = t.subscribe(
      _e(n, void 0, void 0, (s) => {
        (o = Se(e(s, Ni(e)(t)))),
          i ? (i.unsubscribe(), (i = null), o.subscribe(n)) : (r = !0);
      })
    )),
      r && (i.unsubscribe(), (i = null), o.subscribe(n));
  });
}
function _g(e, t, n, i, r) {
  return (o, s) => {
    let a = n,
      c = t,
      l = 0;
    o.subscribe(
      _e(
        s,
        (u) => {
          let d = l++;
          (c = a ? e(c, u, d) : ((a = !0), u)), i && s.next(c);
        },
        r &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function Tn(e, t) {
  return ce(t) ? qe(e, t, 1) : qe(e, 1);
}
function Ai(e) {
  return we((t, n) => {
    let i = !1;
    t.subscribe(
      _e(
        n,
        (r) => {
          (i = !0), n.next(r);
        },
        () => {
          i || n.next(e), n.complete();
        }
      )
    );
  });
}
function Tt(e) {
  return e <= 0
    ? () => At
    : we((t, n) => {
        let i = 0;
        t.subscribe(
          _e(n, (r) => {
            ++i <= e && (n.next(r), e <= i && n.complete());
          })
        );
      });
}
function yg() {
  return we((e, t) => {
    e.subscribe(_e(t, Kn));
  });
}
function Jo(e) {
  return ue(() => e);
}
function Ru(e, t) {
  return t
    ? (n) => Qt(t.pipe(Tt(1), yg()), n.pipe(Ru(e)))
    : qe((n, i) => Se(e(n, i)).pipe(Tt(1), Jo(n)));
}
function Pu(e, t = xu) {
  let n = lr(e, t);
  return Ru(() => n);
}
function Ba(e = qb) {
  return we((t, n) => {
    let i = !1;
    t.subscribe(
      _e(
        n,
        (r) => {
          (i = !0), n.next(r);
        },
        () => (i ? n.complete() : n.error(e()))
      )
    );
  });
}
function qb() {
  return new ei();
}
function ku(...e) {
  return (t) => Qt(t, X(...e));
}
function ti(e) {
  return we((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Vn(e, t) {
  let n = arguments.length >= 2;
  return (i) =>
    i.pipe(
      e ? Et((r, o) => e(r, o, i)) : Bt,
      Tt(1),
      n ? Ai(t) : Ba(() => new ei())
    );
}
function Kr(e) {
  return e <= 0
    ? () => At
    : we((t, n) => {
        let i = [];
        t.subscribe(
          _e(
            n,
            (r) => {
              i.push(r), e < i.length && i.shift();
            },
            () => {
              for (let r of i) n.next(r);
              n.complete();
            },
            void 0,
            () => {
              i = null;
            }
          )
        );
      });
}
function Fu(e, t) {
  let n = arguments.length >= 2;
  return (i) =>
    i.pipe(
      e ? Et((r, o) => e(r, o, i)) : Bt,
      Kr(1),
      n ? Ai(t) : Ba(() => new ei())
    );
}
function Lu(e, t) {
  return we(_g(e, t, arguments.length >= 2, !0));
}
function vg(e = {}) {
  let {
    connector: t = () => new tt(),
    resetOnError: n = !0,
    resetOnComplete: i = !0,
    resetOnRefCountZero: r = !0,
  } = e;
  return (o) => {
    let s,
      a,
      c,
      l = 0,
      u = !1,
      d = !1,
      p = () => {
        a?.unsubscribe(), (a = void 0);
      },
      h = () => {
        p(), (s = c = void 0), (u = d = !1);
      },
      D = () => {
        let w = s;
        h(), w?.unsubscribe();
      };
    return we((w, M) => {
      l++, !d && !u && p();
      let P = (c = c ?? t());
      M.add(() => {
        l--, l === 0 && !d && !u && (a = ju(D, r));
      }),
        P.subscribe(M),
        !s &&
          l > 0 &&
          ((s = new Jn({
            next: (S) => P.next(S),
            error: (S) => {
              (d = !0), p(), (a = ju(h, n, S)), P.error(S);
            },
            complete: () => {
              (u = !0), p(), (a = ju(h, i)), P.complete();
            },
          })),
          Se(w).subscribe(s));
    })(o);
  };
}
function ju(e, t, ...n) {
  if (t === !0) {
    e();
    return;
  }
  if (t === !1) return;
  let i = new Jn({
    next: () => {
      i.unsubscribe(), e();
    },
  });
  return Se(t(...n)).subscribe(i);
}
function Va(e, t, n) {
  let i,
    r = !1;
  return (
    e && typeof e == "object"
      ? ({
          bufferSize: i = 1 / 0,
          windowTime: t = 1 / 0,
          refCount: r = !1,
          scheduler: n,
        } = e)
      : (i = e ?? 1 / 0),
    vg({
      connector: () => new sr(i, t, n),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: r,
    })
  );
}
function ur(...e) {
  let t = Bn(e);
  return we((n, i) => {
    (t ? Qt(e, n, t) : Qt(e, n)).subscribe(i);
  });
}
function lt(e, t) {
  return we((n, i) => {
    let r = null,
      o = 0,
      s = !1,
      a = () => s && !r && i.complete();
    n.subscribe(
      _e(
        i,
        (c) => {
          r?.unsubscribe();
          let l = 0,
            u = o++;
          Se(e(c, u)).subscribe(
            (r = _e(
              i,
              (d) => i.next(t ? t(c, d, u, l++) : d),
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
function Hn(e) {
  return we((t, n) => {
    Se(e).subscribe(_e(n, () => n.complete(), Kn)), !n.closed && t.subscribe(n);
  });
}
function st(e, t, n) {
  let i = ce(e) || t || n ? { next: e, error: t, complete: n } : e;
  return i
    ? we((r, o) => {
        var s;
        (s = i.subscribe) === null || s === void 0 || s.call(i);
        let a = !0;
        r.subscribe(
          _e(
            o,
            (c) => {
              var l;
              (l = i.next) === null || l === void 0 || l.call(i, c), o.next(c);
            },
            () => {
              var c;
              (a = !1),
                (c = i.complete) === null || c === void 0 || c.call(i),
                o.complete();
            },
            (c) => {
              var l;
              (a = !1),
                (l = i.error) === null || l === void 0 || l.call(i, c),
                o.error(c);
            },
            () => {
              var c, l;
              a && ((c = i.unsubscribe) === null || c === void 0 || c.call(i)),
                (l = i.finalize) === null || l === void 0 || l.call(i);
            }
          )
        );
      })
    : Bt;
}
function Bu(...e) {
  let t = Wr(e);
  return we((n, i) => {
    let r = e.length,
      o = new Array(r),
      s = e.map(() => !1),
      a = !1;
    for (let c = 0; c < r; c++)
      Se(e[c]).subscribe(
        _e(
          i,
          (l) => {
            (o[c] = l),
              !a && !s[c] && ((s[c] = !0), (a = s.every(Bt)) && (s = null));
          },
          Kn
        )
      );
    n.subscribe(
      _e(i, (c) => {
        if (a) {
          let l = [c, ...o];
          i.next(t ? t(...l) : l);
        }
      })
    );
  });
}
var Xg = "https://g.co/ng/security#xss",
  ae = class extends Error {
    constructor(t, n) {
      super(Dc(t, n)), (this.code = t);
    }
  };
function Dc(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`;
}
function ds(e) {
  return { toString: e }.toString();
}
var Ha = "__parameters__";
function Zb(e) {
  return function (...n) {
    if (e) {
      let i = e(...n);
      for (let r in i) this[r] = i[r];
    }
  };
}
function em(e, t, n) {
  return ds(() => {
    let i = Zb(t);
    function r(...o) {
      if (this instanceof r) return i.apply(this, o), this;
      let s = new r(...o);
      return (a.annotation = s), a;
      function a(c, l, u) {
        let d = c.hasOwnProperty(Ha)
          ? c[Ha]
          : Object.defineProperty(c, Ha, { value: [] })[Ha];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(s), c;
      }
    }
    return (
      n && (r.prototype = Object.create(n.prototype)),
      (r.prototype.ngMetadataName = e),
      (r.annotationCls = r),
      r
    );
  });
}
var Kt = globalThis;
function Ge(e) {
  for (let t in e) if (e[t] === Ge) return t;
  throw Error("Could not find renamed property on target object.");
}
function Vt(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(Vt).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return "" + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function Ju(e, t) {
  return e == null || e === ""
    ? t === null
      ? ""
      : t
    : t == null || t === ""
    ? e
    : e + " " + t;
}
var Yb = Ge({ __forward_ref__: Ge });
function $d(e) {
  return (
    (e.__forward_ref__ = $d),
    (e.toString = function () {
      return Vt(this());
    }),
    e
  );
}
function cn(e) {
  return tm(e) ? e() : e;
}
function tm(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(Yb) && e.__forward_ref__ === $d
  );
}
function z(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function Mt(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function wc(e) {
  return bg(e, im) || bg(e, rm);
}
function nm(e) {
  return wc(e) !== null;
}
function bg(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function Qb(e) {
  let t = e && (e[im] || e[rm]);
  return t || null;
}
function Dg(e) {
  return e && (e.hasOwnProperty(wg) || e.hasOwnProperty(Kb)) ? e[wg] : null;
}
var im = Ge({ ɵprov: Ge }),
  wg = Ge({ ɵinj: Ge }),
  rm = Ge({ ngInjectableDef: Ge }),
  Kb = Ge({ ngInjectorDef: Ge }),
  Y = class {
    constructor(t, n) {
      (this._desc = t),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof n == "number"
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = z({
              token: this,
              providedIn: n.providedIn || "root",
              factory: n.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function om(e) {
  return e && !!e.ɵproviders;
}
var Jb = Ge({ ɵcmp: Ge }),
  Xb = Ge({ ɵdir: Ge }),
  e1 = Ge({ ɵpipe: Ge }),
  t1 = Ge({ ɵmod: Ge }),
  Qa = Ge({ ɵfac: Ge }),
  es = Ge({ __NG_ELEMENT_ID__: Ge }),
  Cg = Ge({ __NG_ENV_ID__: Ge });
function Ud(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function n1(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
    ? e.type.name || e.type.toString()
    : Ud(e);
}
function i1(e, t) {
  let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new ae(-200, e);
}
function Gd(e, t) {
  throw new ae(-201, !1);
}
var Ee = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })(Ee || {}),
  Xu;
function sm() {
  return Xu;
}
function zt(e) {
  let t = Xu;
  return (Xu = e), t;
}
function am(e, t, n) {
  let i = wc(e);
  if (i && i.providedIn == "root")
    return i.value === void 0 ? (i.value = i.factory()) : i.value;
  if (n & Ee.Optional) return null;
  if (t !== void 0) return t;
  Gd(e, "Injector");
}
var r1 = {},
  ns = r1,
  ed = "__NG_DI_FLAG__",
  Ka = "ngTempTokenPath",
  o1 = "ngTokenPath",
  s1 = /\n/gm,
  a1 = "\u0275",
  Eg = "__source",
  to;
function c1() {
  return to;
}
function Ri(e) {
  let t = to;
  return (to = e), t;
}
function l1(e, t = Ee.Default) {
  if (to === void 0) throw new ae(-203, !1);
  return to === null
    ? am(e, void 0, t)
    : to.get(e, t & Ee.Optional ? null : void 0, t);
}
function W(e, t = Ee.Default) {
  return (sm() || l1)(cn(e), t);
}
function I(e, t = Ee.Default) {
  return W(e, Cc(t));
}
function Cc(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function td(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let i = cn(e[n]);
    if (Array.isArray(i)) {
      if (i.length === 0) throw new ae(900, !1);
      let r,
        o = Ee.Default;
      for (let s = 0; s < i.length; s++) {
        let a = i[s],
          c = u1(a);
        typeof c == "number" ? (c === -1 ? (r = a.token) : (o |= c)) : (r = a);
      }
      t.push(W(r, o));
    } else t.push(W(i));
  }
  return t;
}
function cm(e, t) {
  return (e[ed] = t), (e.prototype[ed] = t), e;
}
function u1(e) {
  return e[ed];
}
function d1(e, t, n, i) {
  let r = e[Ka];
  throw (
    (t[Eg] && r.unshift(t[Eg]),
    (e.message = f1(
      `
` + e.message,
      r,
      n,
      i
    )),
    (e[o1] = r),
    (e[Ka] = null),
    e)
  );
}
function f1(e, t, n, i = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == a1
      ? e.slice(2)
      : e;
  let r = Vt(t);
  if (Array.isArray(t)) r = t.map(Vt).join(" -> ");
  else if (typeof t == "object") {
    let o = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        o.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : Vt(a)));
      }
    r = `{${o.join(", ")}}`;
  }
  return `${n}${i ? "(" + i + ")" : ""}[${r}]: ${e.replace(
    s1,
    `
  `
  )}`;
}
var zd = cm(em("Optional"), 8);
var lm = cm(em("SkipSelf"), 4);
function hr(e, t) {
  let n = e.hasOwnProperty(Qa);
  return n ? e[Qa] : null;
}
function h1(e, t, n) {
  if (e.length !== t.length) return !1;
  for (let i = 0; i < e.length; i++) {
    let r = e[i],
      o = t[i];
    if ((n && ((r = n(r)), (o = n(o))), o !== r)) return !1;
  }
  return !0;
}
function p1(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function Wd(e, t) {
  e.forEach((n) => (Array.isArray(n) ? Wd(n, t) : t(n)));
}
function um(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Ja(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function g1(e, t) {
  let n = [];
  for (let i = 0; i < e; i++) n.push(t);
  return n;
}
function m1(e, t, n, i) {
  let r = e.length;
  if (r == t) e.push(n, i);
  else if (r === 1) e.push(i, e[0]), (e[0] = n);
  else {
    for (r--, e.push(e[r - 1], e[r]); r > t; ) {
      let o = r - 2;
      (e[r] = e[o]), r--;
    }
    (e[t] = n), (e[t + 1] = i);
  }
}
function qd(e, t, n) {
  let i = fs(e, t);
  return i >= 0 ? (e[i | 1] = n) : ((i = ~i), m1(e, i, t, n)), i;
}
function Vu(e, t) {
  let n = fs(e, t);
  if (n >= 0) return e[n | 1];
}
function fs(e, t) {
  return _1(e, t, 1);
}
function _1(e, t, n) {
  let i = 0,
    r = e.length >> n;
  for (; r !== i; ) {
    let o = i + ((r - i) >> 1),
      s = e[o << n];
    if (t === s) return o << n;
    s > t ? (r = o) : (i = o + 1);
  }
  return ~(r << n);
}
var is = {},
  Jt = [],
  io = new Y(""),
  dm = new Y("", -1),
  fm = new Y(""),
  Xa = class {
    get(t, n = ns) {
      if (n === ns) {
        let i = new Error(`NullInjectorError: No provider for ${Vt(t)}!`);
        throw ((i.name = "NullInjectorError"), i);
      }
      return n;
    }
  },
  hm = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(hm || {}),
  Gn = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(Gn || {}),
  Fi = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(Fi || {});
function y1(e, t, n) {
  let i = e.length;
  for (;;) {
    let r = e.indexOf(t, n);
    if (r === -1) return r;
    if (r === 0 || e.charCodeAt(r - 1) <= 32) {
      let o = t.length;
      if (r + o === i || e.charCodeAt(r + o) <= 32) return r;
    }
    n = r + 1;
  }
}
function nd(e, t, n) {
  let i = 0;
  for (; i < n.length; ) {
    let r = n[i];
    if (typeof r == "number") {
      if (r !== 0) break;
      i++;
      let o = n[i++],
        s = n[i++],
        a = n[i++];
      e.setAttribute(t, s, a, o);
    } else {
      let o = r,
        s = n[++i];
      b1(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), i++;
    }
  }
  return i;
}
function v1(e) {
  return e === 3 || e === 4 || e === 6;
}
function b1(e) {
  return e.charCodeAt(0) === 64;
}
function Zd(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let i = 0; i < t.length; i++) {
        let r = t[i];
        typeof r == "number"
          ? (n = r)
          : n === 0 ||
            (n === -1 || n === 2
              ? Tg(e, n, r, null, t[++i])
              : Tg(e, n, r, null, null));
      }
    }
  return e;
}
function Tg(e, t, n, i, r) {
  let o = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; o < e.length; ) {
      let a = e[o++];
      if (typeof a == "number") {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < e.length; ) {
    let a = e[o];
    if (typeof a == "number") break;
    if (a === n) {
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
  s !== -1 && (e.splice(s, 0, t), (o = s + 1)),
    e.splice(o++, 0, n),
    i !== null && e.splice(o++, 0, i),
    r !== null && e.splice(o++, 0, r);
}
var pm = "ng-template";
function D1(e, t, n, i) {
  let r = 0;
  if (i) {
    for (; r < t.length && typeof t[r] == "string"; r += 2)
      if (t[r] === "class" && y1(t[r + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (Yd(e)) return !1;
  if (((r = t.indexOf(1, r)), r > -1)) {
    let o;
    for (; ++r < t.length && typeof (o = t[r]) == "string"; )
      if (o.toLowerCase() === n) return !0;
  }
  return !1;
}
function Yd(e) {
  return e.type === 4 && e.value !== pm;
}
function w1(e, t, n) {
  let i = e.type === 4 && !n ? pm : e.value;
  return t === i;
}
function C1(e, t, n) {
  let i = 4,
    r = e.attrs,
    o = r !== null ? M1(r) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "number") {
      if (!s && !Mn(i) && !Mn(c)) return !1;
      if (s && Mn(c)) continue;
      (s = !1), (i = c | (i & 1));
      continue;
    }
    if (!s)
      if (i & 4) {
        if (
          ((i = 2 | (i & 1)),
          (c !== "" && !w1(e, c, n)) || (c === "" && t.length === 1))
        ) {
          if (Mn(i)) return !1;
          s = !0;
        }
      } else if (i & 8) {
        if (r === null || !D1(e, r, c, n)) {
          if (Mn(i)) return !1;
          s = !0;
        }
      } else {
        let l = t[++a],
          u = E1(c, r, Yd(e), n);
        if (u === -1) {
          if (Mn(i)) return !1;
          s = !0;
          continue;
        }
        if (l !== "") {
          let d;
          if (
            (u > o ? (d = "") : (d = r[u + 1].toLowerCase()), i & 2 && l !== d)
          ) {
            if (Mn(i)) return !1;
            s = !0;
          }
        }
      }
  }
  return Mn(i) || s;
}
function Mn(e) {
  return (e & 1) === 0;
}
function E1(e, t, n, i) {
  if (t === null) return -1;
  let r = 0;
  if (i || !n) {
    let o = !1;
    for (; r < t.length; ) {
      let s = t[r];
      if (s === e) return r;
      if (s === 3 || s === 6) o = !0;
      else if (s === 1 || s === 2) {
        let a = t[++r];
        for (; typeof a == "string"; ) a = t[++r];
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
  } else return I1(t, e);
}
function gm(e, t, n = !1) {
  for (let i = 0; i < t.length; i++) if (C1(e, t[i], n)) return !0;
  return !1;
}
function T1(e) {
  let t = e.attrs;
  if (t != null) {
    let n = t.indexOf(5);
    if (!(n & 1)) return t[n + 1];
  }
  return null;
}
function M1(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (v1(n)) return t;
  }
  return e.length;
}
function I1(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let i = e[n];
      if (typeof i == "number") return -1;
      if (i === t) return n;
      n++;
    }
  return -1;
}
function S1(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    let i = t[n];
    if (e.length === i.length) {
      for (let r = 0; r < e.length; r++) if (e[r] !== i[r]) continue e;
      return !0;
    }
  }
  return !1;
}
function Mg(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function O1(e) {
  let t = e[0],
    n = 1,
    i = 2,
    r = "",
    o = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == "string")
      if (i & 2) {
        let a = e[++n];
        r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else i & 8 ? (r += "." + s) : i & 4 && (r += " " + s);
    else
      r !== "" && !Mn(s) && ((t += Mg(o, r)), (r = "")),
        (i = s),
        (o = o || !Mn(i));
    n++;
  }
  return r !== "" && (t += Mg(o, r)), t;
}
function x1(e) {
  return e.map(O1).join(",");
}
function N1(e) {
  let t = [],
    n = [],
    i = 1,
    r = 2;
  for (; i < e.length; ) {
    let o = e[i];
    if (typeof o == "string")
      r === 2 ? o !== "" && t.push(o, e[++i]) : r === 8 && n.push(o);
    else {
      if (!Mn(r)) break;
      r = o;
    }
    i++;
  }
  return { attrs: t, classes: n };
}
function dn(e) {
  return ds(() => {
    let t = bm(e),
      n = We(G({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === hm.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || Gn.Emulated,
        styles: e.styles || Jt,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    Dm(n);
    let i = e.dependencies;
    return (
      (n.directiveDefs = Sg(i, !1)), (n.pipeDefs = Sg(i, !0)), (n.id = P1(n)), n
    );
  });
}
function A1(e) {
  return Li(e) || mm(e);
}
function R1(e) {
  return e !== null;
}
function It(e) {
  return ds(() => ({
    type: e.type,
    bootstrap: e.bootstrap || Jt,
    declarations: e.declarations || Jt,
    imports: e.imports || Jt,
    exports: e.exports || Jt,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function Ig(e, t) {
  if (e == null) return is;
  let n = {};
  for (let i in e)
    if (e.hasOwnProperty(i)) {
      let r = e[i],
        o,
        s,
        a = Fi.None;
      Array.isArray(r)
        ? ((a = r[0]), (o = r[1]), (s = r[2] ?? o))
        : ((o = r), (s = r)),
        t ? ((n[o] = a !== Fi.None ? [i, a] : i), (t[o] = s)) : (n[o] = i);
    }
  return n;
}
function $i(e) {
  return ds(() => {
    let t = bm(e);
    return Dm(t), t;
  });
}
function ho(e) {
  return {
    type: e.type,
    name: e.name,
    factory: null,
    pure: e.pure !== !1,
    standalone: e.standalone === !0,
    onDestroy: e.type.prototype.ngOnDestroy || null,
  };
}
function Li(e) {
  return e[Jb] || null;
}
function mm(e) {
  return e[Xb] || null;
}
function _m(e) {
  return e[e1] || null;
}
function ym(e) {
  let t = Li(e) || mm(e) || _m(e);
  return t !== null ? t.standalone : !1;
}
function vm(e, t) {
  let n = e[t1] || null;
  if (!n && t === !0)
    throw new Error(`Type ${Vt(e)} does not have '\u0275mod' property.`);
  return n;
}
function bm(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || is,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || Jt,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Ig(e.inputs, t),
    outputs: Ig(e.outputs),
    debugInfo: null,
  };
}
function Dm(e) {
  e.features?.forEach((t) => t(e));
}
function Sg(e, t) {
  if (!e) return null;
  let n = t ? _m : A1;
  return () => (typeof e == "function" ? e() : e).map((i) => n(i)).filter(R1);
}
function P1(e) {
  let t = 0,
    n = [
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
  for (let r of n) t = (Math.imul(31, t) + r.charCodeAt(0)) << 0;
  return (t += 2147483648), "c" + t;
}
function hs(e) {
  return { ɵproviders: e };
}
function k1(...e) {
  return { ɵproviders: wm(!0, e), ɵfromNgModule: !0 };
}
function wm(e, ...t) {
  let n = [],
    i = new Set(),
    r,
    o = (s) => {
      n.push(s);
    };
  return (
    Wd(t, (s) => {
      let a = s;
      id(a, o, [], i) && ((r ||= []), r.push(a));
    }),
    r !== void 0 && Cm(r, o),
    n
  );
}
function Cm(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: i, providers: r } = e[n];
    Qd(r, (o) => {
      t(o, i);
    });
  }
}
function id(e, t, n, i) {
  if (((e = cn(e)), !e)) return !1;
  let r = null,
    o = Dg(e),
    s = !o && Li(e);
  if (!o && !s) {
    let c = e.ngModule;
    if (((o = Dg(c)), o)) r = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    r = e;
  }
  let a = i.has(r);
  if (s) {
    if (a) return !1;
    if ((i.add(r), s.dependencies)) {
      let c =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let l of c) id(l, t, n, i);
    }
  } else if (o) {
    if (o.imports != null && !a) {
      i.add(r);
      let l;
      try {
        Wd(o.imports, (u) => {
          id(u, t, n, i) && ((l ||= []), l.push(u));
        });
      } finally {
      }
      l !== void 0 && Cm(l, t);
    }
    if (!a) {
      let l = hr(r) || (() => new r());
      t({ provide: r, useFactory: l, deps: Jt }, r),
        t({ provide: fm, useValue: r, multi: !0 }, r),
        t({ provide: io, useValue: () => W(r), multi: !0 }, r);
    }
    let c = o.providers;
    if (c != null && !a) {
      let l = e;
      Qd(c, (u) => {
        t(u, l);
      });
    }
  } else return !1;
  return r !== e && e.providers !== void 0;
}
function Qd(e, t) {
  for (let n of e)
    om(n) && (n = n.ɵproviders), Array.isArray(n) ? Qd(n, t) : t(n);
}
var F1 = Ge({ provide: String, useValue: Ge });
function Em(e) {
  return e !== null && typeof e == "object" && F1 in e;
}
function L1(e) {
  return !!(e && e.useExisting);
}
function j1(e) {
  return !!(e && e.useFactory);
}
function rd(e) {
  return typeof e == "function";
}
var Ec = new Y(""),
  za = {},
  B1 = {},
  Hu;
function Kd() {
  return Hu === void 0 && (Hu = new Xa()), Hu;
}
var Ft = class {},
  rs = class extends Ft {
    get destroyed() {
      return this._destroyed;
    }
    constructor(t, n, i, r) {
      super(),
        (this.parent = n),
        (this.source = i),
        (this.scopes = r),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        sd(t, (s) => this.processProvider(s)),
        this.records.set(dm, Jr(void 0, this)),
        r.has("environment") && this.records.set(Ft, Jr(void 0, this));
      let o = this.records.get(Ec);
      o != null && typeof o.value == "string" && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(fm, Jt, Ee.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let t = Fe(null);
      try {
        for (let i of this._ngOnDestroyHooks) i.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let i of n) i();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          Fe(t);
      }
    }
    onDestroy(t) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(t),
        () => this.removeOnDestroy(t)
      );
    }
    runInContext(t) {
      this.assertNotDestroyed();
      let n = Ri(this),
        i = zt(void 0),
        r;
      try {
        return t();
      } finally {
        Ri(n), zt(i);
      }
    }
    get(t, n = ns, i = Ee.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(Cg))) return t[Cg](this);
      i = Cc(i);
      let r,
        o = Ri(this),
        s = zt(void 0);
      try {
        if (!(i & Ee.SkipSelf)) {
          let c = this.records.get(t);
          if (c === void 0) {
            let l = z1(t) && wc(t);
            l && this.injectableDefInScope(l)
              ? (c = Jr(od(t), za))
              : (c = null),
              this.records.set(t, c);
          }
          if (c != null) return this.hydrate(t, c);
        }
        let a = i & Ee.Self ? Kd() : this.parent;
        return (n = i & Ee.Optional && n === ns ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Ka] = a[Ka] || []).unshift(Vt(t)), o)) throw a;
          return d1(a, t, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        zt(s), Ri(o);
      }
    }
    resolveInjectorInitializers() {
      let t = Fe(null),
        n = Ri(this),
        i = zt(void 0),
        r;
      try {
        let o = this.get(io, Jt, Ee.Self);
        for (let s of o) s();
      } finally {
        Ri(n), zt(i), Fe(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let i of n.keys()) t.push(Vt(i));
      return `R3Injector[${t.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new ae(205, !1);
    }
    processProvider(t) {
      t = cn(t);
      let n = rd(t) ? t : cn(t && t.provide),
        i = H1(t);
      if (!rd(t) && t.multi === !0) {
        let r = this.records.get(n);
        r ||
          ((r = Jr(void 0, za, !0)),
          (r.factory = () => td(r.multi)),
          this.records.set(n, r)),
          (n = t),
          r.multi.push(t);
      }
      this.records.set(n, i);
    }
    hydrate(t, n) {
      let i = Fe(null);
      try {
        return (
          n.value === za && ((n.value = B1), (n.value = n.factory())),
          typeof n.value == "object" &&
            n.value &&
            G1(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        Fe(i);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = cn(t.providedIn);
      return typeof n == "string"
        ? n === "any" || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function od(e) {
  let t = wc(e),
    n = t !== null ? t.factory : hr(e);
  if (n !== null) return n;
  if (e instanceof Y) throw new ae(204, !1);
  if (e instanceof Function) return V1(e);
  throw new ae(204, !1);
}
function V1(e) {
  if (e.length > 0) throw new ae(204, !1);
  let n = Qb(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function H1(e) {
  if (Em(e)) return Jr(void 0, e.useValue);
  {
    let t = $1(e);
    return Jr(t, za);
  }
}
function $1(e, t, n) {
  let i;
  if (rd(e)) {
    let r = cn(e);
    return hr(r) || od(r);
  } else if (Em(e)) i = () => cn(e.useValue);
  else if (j1(e)) i = () => e.useFactory(...td(e.deps || []));
  else if (L1(e)) i = () => W(cn(e.useExisting));
  else {
    let r = cn(e && (e.useClass || e.provide));
    if (U1(e)) i = () => new r(...td(e.deps));
    else return hr(r) || od(r);
  }
  return i;
}
function Jr(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function U1(e) {
  return !!e.deps;
}
function G1(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function z1(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof Y);
}
function sd(e, t) {
  for (let n of e)
    Array.isArray(n) ? sd(n, t) : n && om(n) ? sd(n.ɵproviders, t) : t(n);
}
function fn(e, t) {
  e instanceof rs && e.assertNotDestroyed();
  let n,
    i = Ri(e),
    r = zt(void 0);
  try {
    return t();
  } finally {
    Ri(i), zt(r);
  }
}
function Tm() {
  return sm() !== void 0 || c1() != null;
}
function Mm(e) {
  if (!Tm()) throw new ae(-203, !1);
}
function W1(e) {
  let t = Kt.ng;
  if (t && t.ɵcompilerFacade) return t.ɵcompilerFacade;
  throw new Error("JIT compiler unavailable");
}
function q1(e) {
  return typeof e == "function";
}
var ai = 0,
  Ce = 1,
  fe = 2,
  Lt = 3,
  Sn = 4,
  Wt = 5,
  os = 6,
  ec = 7,
  On = 8,
  ro = 9,
  zn = 10,
  at = 11,
  ss = 12,
  Og = 13,
  po = 14,
  un = 15,
  pr = 16,
  Xr = 17,
  ii = 18,
  Tc = 19,
  Im = 20,
  Pi = 21,
  $u = 22,
  ln = 23,
  Ht = 25,
  Sm = 1;
var gr = 7,
  tc = 8,
  oo = 9,
  Xt = 10,
  nc = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      e
    );
  })(nc || {});
function ki(e) {
  return Array.isArray(e) && typeof e[Sm] == "object";
}
function ci(e) {
  return Array.isArray(e) && e[Sm] === !0;
}
function Jd(e) {
  return (e.flags & 4) !== 0;
}
function Mc(e) {
  return e.componentOffset > -1;
}
function Ic(e) {
  return (e.flags & 1) === 1;
}
function ps(e) {
  return !!e.template;
}
function ad(e) {
  return (e[fe] & 512) !== 0;
}
var as = class {
  constructor(t, n, i) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = i);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Om(e, t, n, i) {
  t !== null ? t.applyValueToInputSignal(t, i) : (e[n] = i);
}
function go() {
  return xm;
}
function xm(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = Y1), Z1;
}
go.ngInherit = !0;
function Z1() {
  let e = Am(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === is) e.previous = t;
    else for (let i in t) n[i] = t[i];
    (e.current = null), this.ngOnChanges(t);
  }
}
function Y1(e, t, n, i, r) {
  let o = this.declaredInputs[i],
    s = Am(e) || Q1(e, { previous: is, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[o];
  (a[o] = new as(l && l.currentValue, n, c === is)), Om(e, t, r, n);
}
var Nm = "__ngSimpleChanges__";
function Am(e) {
  return e[Nm] || null;
}
function Q1(e, t) {
  return (e[Nm] = t);
}
var xg = null;
var $n = function (e, t, n) {
    xg?.(e, t, n);
  },
  K1 = "svg",
  J1 = "math";
function Wn(e) {
  for (; Array.isArray(e); ) e = e[ai];
  return e;
}
function Rm(e, t) {
  return Wn(t[e]);
}
function xn(e, t) {
  return Wn(t[e.index]);
}
function Pm(e, t) {
  return e.data[t];
}
function Xd(e, t) {
  return e[t];
}
function Ui(e, t) {
  let n = t[e];
  return ki(n) ? n : n[ai];
}
function X1(e) {
  return (e[fe] & 4) === 4;
}
function ef(e) {
  return (e[fe] & 128) === 128;
}
function eD(e) {
  return ci(e[Lt]);
}
function so(e, t) {
  return t == null ? null : e[t];
}
function km(e) {
  e[Xr] = 0;
}
function Fm(e) {
  e[fe] & 1024 || ((e[fe] |= 1024), ef(e) && Oc(e));
}
function tD(e, t) {
  for (; e > 0; ) (t = t[po]), e--;
  return t;
}
function Sc(e) {
  return !!(e[fe] & 9216 || e[ln]?.dirty);
}
function cd(e) {
  e[zn].changeDetectionScheduler?.notify(8),
    e[fe] & 64 && (e[fe] |= 1024),
    Sc(e) && Oc(e);
}
function Oc(e) {
  e[zn].changeDetectionScheduler?.notify(0);
  let t = mr(e);
  for (; t !== null && !(t[fe] & 8192 || ((t[fe] |= 8192), !ef(t))); )
    t = mr(t);
}
function Lm(e, t) {
  if ((e[fe] & 256) === 256) throw new ae(911, !1);
  e[Pi] === null && (e[Pi] = []), e[Pi].push(t);
}
function nD(e, t) {
  if (e[Pi] === null) return;
  let n = e[Pi].indexOf(t);
  n !== -1 && e[Pi].splice(n, 1);
}
function mr(e) {
  let t = e[Lt];
  return ci(t) ? t[Lt] : t;
}
var Te = {
  lFrame: Zm(null),
  bindingsEnabled: !0,
  skipHydrationRootTNode: null,
};
var jm = !1;
function iD() {
  return Te.lFrame.elementDepthCount;
}
function rD() {
  Te.lFrame.elementDepthCount++;
}
function oD() {
  Te.lFrame.elementDepthCount--;
}
function Bm() {
  return Te.bindingsEnabled;
}
function Vm() {
  return Te.skipHydrationRootTNode !== null;
}
function sD(e) {
  return Te.skipHydrationRootTNode === e;
}
function aD() {
  Te.skipHydrationRootTNode = null;
}
function xe() {
  return Te.lFrame.lView;
}
function Rt() {
  return Te.lFrame.tView;
}
function mt(e) {
  return (Te.lFrame.contextLView = e), e[On];
}
function _t(e) {
  return (Te.lFrame.contextLView = null), e;
}
function en() {
  let e = Hm();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Hm() {
  return Te.lFrame.currentTNode;
}
function cD() {
  let e = Te.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function br(e, t) {
  let n = Te.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function tf() {
  return Te.lFrame.isParent;
}
function nf() {
  Te.lFrame.isParent = !1;
}
function lD() {
  return Te.lFrame.contextLView;
}
function $m() {
  return jm;
}
function Ng(e) {
  jm = e;
}
function Um() {
  let e = Te.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function uD(e) {
  return (Te.lFrame.bindingIndex = e);
}
function rf() {
  return Te.lFrame.bindingIndex++;
}
function Gm(e) {
  let t = Te.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function dD() {
  return Te.lFrame.inI18n;
}
function fD(e, t) {
  let n = Te.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), ld(t);
}
function hD() {
  return Te.lFrame.currentDirectiveIndex;
}
function ld(e) {
  Te.lFrame.currentDirectiveIndex = e;
}
function pD(e) {
  let t = Te.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function zm() {
  return Te.lFrame.currentQueryIndex;
}
function of(e) {
  Te.lFrame.currentQueryIndex = e;
}
function gD(e) {
  let t = e[Ce];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[Wt] : null;
}
function Wm(e, t, n) {
  if (n & Ee.SkipSelf) {
    let r = t,
      o = e;
    for (; (r = r.parent), r === null && !(n & Ee.Host); )
      if (((r = gD(o)), r === null || ((o = o[po]), r.type & 10))) break;
    if (r === null) return !1;
    (t = r), (e = o);
  }
  let i = (Te.lFrame = qm());
  return (i.currentTNode = t), (i.lView = e), !0;
}
function sf(e) {
  let t = qm(),
    n = e[Ce];
  (Te.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function qm() {
  let e = Te.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Zm(e) : t;
}
function Zm(e) {
  let t = {
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
  return e !== null && (e.child = t), t;
}
function Ym() {
  let e = Te.lFrame;
  return (Te.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var Qm = Ym;
function af() {
  let e = Ym();
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
function mD(e) {
  return (Te.lFrame.contextLView = tD(e, Te.lFrame.contextLView))[On];
}
function Dr() {
  return Te.lFrame.selectedIndex;
}
function _r(e) {
  Te.lFrame.selectedIndex = e;
}
function cf() {
  let e = Te.lFrame;
  return Pm(e.tView, e.selectedIndex);
}
function _D() {
  return Te.lFrame.currentNamespace;
}
var Km = !0;
function xc() {
  return Km;
}
function Nc(e) {
  Km = e;
}
function yD(e, t, n) {
  let { ngOnChanges: i, ngOnInit: r, ngDoCheck: o } = t.type.prototype;
  if (i) {
    let s = xm(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  r && (n.preOrderHooks ??= []).push(0 - e, r),
    o &&
      ((n.preOrderHooks ??= []).push(e, o),
      (n.preOrderCheckHooks ??= []).push(e, o));
}
function Ac(e, t) {
  for (let n = t.directiveStart, i = t.directiveEnd; n < i; n++) {
    let o = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: u,
      } = o;
    s && (e.contentHooks ??= []).push(-n, s),
      a &&
        ((e.contentHooks ??= []).push(n, a),
        (e.contentCheckHooks ??= []).push(n, a)),
      c && (e.viewHooks ??= []).push(-n, c),
      l &&
        ((e.viewHooks ??= []).push(n, l), (e.viewCheckHooks ??= []).push(n, l)),
      u != null && (e.destroyHooks ??= []).push(n, u);
  }
}
function Wa(e, t, n) {
  Jm(e, t, 3, n);
}
function qa(e, t, n, i) {
  (e[fe] & 3) === n && Jm(e, t, n, i);
}
function Uu(e, t) {
  let n = e[fe];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[fe] = n));
}
function Jm(e, t, n, i) {
  let r = i !== void 0 ? e[Xr] & 65535 : 0,
    o = i ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = r; c < s; c++)
    if (typeof t[c + 1] == "number") {
      if (((a = t[c]), i != null && a >= i)) break;
    } else
      t[c] < 0 && (e[Xr] += 65536),
        (a < o || o == -1) &&
          (vD(e, n, t, c), (e[Xr] = (e[Xr] & 4294901760) + c + 2)),
        c++;
}
function Ag(e, t) {
  $n(4, e, t);
  let n = Fe(null);
  try {
    t.call(e);
  } finally {
    Fe(n), $n(5, e, t);
  }
}
function vD(e, t, n, i) {
  let r = n[i] < 0,
    o = n[i + 1],
    s = r ? -n[i] : n[i],
    a = e[s];
  r
    ? e[fe] >> 14 < e[Xr] >> 16 &&
      (e[fe] & 3) === t &&
      ((e[fe] += 16384), Ag(a, o))
    : Ag(a, o);
}
var no = -1,
  cs = class {
    constructor(t, n, i) {
      (this.factory = t),
        (this.resolving = !1),
        (this.canSeeViewProviders = n),
        (this.injectImpl = i);
    }
  };
function bD(e) {
  return e instanceof cs;
}
function DD(e) {
  return (e.flags & 8) !== 0;
}
function wD(e) {
  return (e.flags & 16) !== 0;
}
var Gu = {},
  ud = class {
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, i) {
      i = Cc(i);
      let r = this.injector.get(t, Gu, i);
      return r !== Gu || n === Gu ? r : this.parentInjector.get(t, n, i);
    }
  };
function Xm(e) {
  return e !== no;
}
function ic(e) {
  return e & 32767;
}
function CD(e) {
  return e >> 16;
}
function rc(e, t) {
  let n = CD(e),
    i = t;
  for (; n > 0; ) (i = i[po]), n--;
  return i;
}
var dd = !0;
function oc(e) {
  let t = dd;
  return (dd = e), t;
}
var ED = 256,
  e0 = ED - 1,
  t0 = 5,
  TD = 0,
  Un = {};
function MD(e, t, n) {
  let i;
  typeof n == "string"
    ? (i = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(es) && (i = n[es]),
    i == null && (i = n[es] = TD++);
  let r = i & e0,
    o = 1 << r;
  t.data[e + (r >> t0)] |= o;
}
function n0(e, t) {
  let n = i0(e, t);
  if (n !== -1) return n;
  let i = t[Ce];
  i.firstCreatePass &&
    ((e.injectorIndex = t.length),
    zu(i.data, e),
    zu(t, null),
    zu(i.blueprint, null));
  let r = lf(e, t),
    o = e.injectorIndex;
  if (Xm(r)) {
    let s = ic(r),
      a = rc(r, t),
      c = a[Ce].data;
    for (let l = 0; l < 8; l++) t[o + l] = a[s + l] | c[s + l];
  }
  return (t[o + 8] = r), o;
}
function zu(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function i0(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function lf(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    i = null,
    r = t;
  for (; r !== null; ) {
    if (((i = c0(r)), i === null)) return no;
    if ((n++, (r = r[po]), i.injectorIndex !== -1))
      return i.injectorIndex | (n << 16);
  }
  return no;
}
function ID(e, t, n) {
  MD(e, t, n);
}
function r0(e, t, n) {
  if (n & Ee.Optional || e !== void 0) return e;
  Gd(t, "NodeInjector");
}
function o0(e, t, n, i) {
  if (
    (n & Ee.Optional && i === void 0 && (i = null), !(n & (Ee.Self | Ee.Host)))
  ) {
    let r = e[ro],
      o = zt(void 0);
    try {
      return r ? r.get(t, i, n & Ee.Optional) : am(t, i, n & Ee.Optional);
    } finally {
      zt(o);
    }
  }
  return r0(i, t, n);
}
function s0(e, t, n, i = Ee.Default, r) {
  if (e !== null) {
    if (t[fe] & 2048 && !(i & Ee.Self)) {
      let s = ND(e, t, n, i, Un);
      if (s !== Un) return s;
    }
    let o = a0(e, t, n, i, Un);
    if (o !== Un) return o;
  }
  return o0(t, n, i, r);
}
function a0(e, t, n, i, r) {
  let o = OD(n);
  if (typeof o == "function") {
    if (!Wm(t, e, i)) return i & Ee.Host ? r0(r, n, i) : o0(t, n, i, r);
    try {
      let s;
      if (((s = o(i)), s == null && !(i & Ee.Optional))) Gd(n);
      else return s;
    } finally {
      Qm();
    }
  } else if (typeof o == "number") {
    let s = null,
      a = i0(e, t),
      c = no,
      l = i & Ee.Host ? t[un][Wt] : null;
    for (
      (a === -1 || i & Ee.SkipSelf) &&
      ((c = a === -1 ? lf(e, t) : t[a + 8]),
      c === no || !Pg(i, !1)
        ? (a = -1)
        : ((s = t[Ce]), (a = ic(c)), (t = rc(c, t))));
      a !== -1;

    ) {
      let u = t[Ce];
      if (Rg(o, a, u.data)) {
        let d = SD(a, t, n, s, i, l);
        if (d !== Un) return d;
      }
      (c = t[a + 8]),
        c !== no && Pg(i, t[Ce].data[a + 8] === l) && Rg(o, a, t)
          ? ((s = u), (a = ic(c)), (t = rc(c, t)))
          : (a = -1);
    }
  }
  return r;
}
function SD(e, t, n, i, r, o) {
  let s = t[Ce],
    a = s.data[e + 8],
    c = i == null ? Mc(a) && dd : i != s && (a.type & 3) !== 0,
    l = r & Ee.Host && o === a,
    u = Za(a, s, n, c, l);
  return u !== null ? ao(t, s, u, a) : Un;
}
function Za(e, t, n, i, r) {
  let o = e.providerIndexes,
    s = t.data,
    a = o & 1048575,
    c = e.directiveStart,
    l = e.directiveEnd,
    u = o >> 20,
    d = i ? a : a + u,
    p = r ? a + u : l;
  for (let h = d; h < p; h++) {
    let D = s[h];
    if ((h < c && n === D) || (h >= c && D.type === n)) return h;
  }
  if (r) {
    let h = s[c];
    if (h && ps(h) && h.type === n) return c;
  }
  return null;
}
function ao(e, t, n, i) {
  let r = e[n],
    o = t.data;
  if (bD(r)) {
    let s = r;
    s.resolving && i1(n1(o[n]));
    let a = oc(s.canSeeViewProviders);
    s.resolving = !0;
    let c,
      l = s.injectImpl ? zt(s.injectImpl) : null,
      u = Wm(e, i, Ee.Default);
    try {
      (r = e[n] = s.factory(void 0, o, e, i)),
        t.firstCreatePass && n >= i.directiveStart && yD(n, o[n], t);
    } finally {
      l !== null && zt(l), oc(a), (s.resolving = !1), Qm();
    }
  }
  return r;
}
function OD(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(es) ? e[es] : void 0;
  return typeof t == "number" ? (t >= 0 ? t & e0 : xD) : t;
}
function Rg(e, t, n) {
  let i = 1 << e;
  return !!(n[t + (e >> t0)] & i);
}
function Pg(e, t) {
  return !(e & Ee.Self) && !(e & Ee.Host && t);
}
var fr = class {
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, i) {
    return s0(this._tNode, this._lView, t, Cc(i), n);
  }
};
function xD() {
  return new fr(en(), xe());
}
function Gi(e) {
  return ds(() => {
    let t = e.prototype.constructor,
      n = t[Qa] || fd(t),
      i = Object.prototype,
      r = Object.getPrototypeOf(e.prototype).constructor;
    for (; r && r !== i; ) {
      let o = r[Qa] || fd(r);
      if (o && o !== n) return o;
      r = Object.getPrototypeOf(r);
    }
    return (o) => new o();
  });
}
function fd(e) {
  return tm(e)
    ? () => {
        let t = fd(cn(e));
        return t && t();
      }
    : hr(e);
}
function ND(e, t, n, i, r) {
  let o = e,
    s = t;
  for (; o !== null && s !== null && s[fe] & 2048 && !(s[fe] & 512); ) {
    let a = a0(o, s, n, i | Ee.Self, Un);
    if (a !== Un) return a;
    let c = o.parent;
    if (!c) {
      let l = s[Im];
      if (l) {
        let u = l.get(n, Un, i);
        if (u !== Un) return u;
      }
      (c = c0(s)), (s = s[po]);
    }
    o = c;
  }
  return r;
}
function c0(e) {
  let t = e[Ce],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[Wt] : null;
}
function kg(e, t = null, n = null, i) {
  let r = l0(e, t, n, i);
  return r.resolveInjectorInitializers(), r;
}
function l0(e, t = null, n = null, i, r = new Set()) {
  let o = [n || Jt, k1(e)];
  return (
    (i = i || (typeof e == "object" ? void 0 : Vt(e))),
    new rs(o, t || Kd(), i || null, r)
  );
}
var ut = class e {
  static {
    this.THROW_IF_NOT_FOUND = ns;
  }
  static {
    this.NULL = new Xa();
  }
  static create(t, n) {
    if (Array.isArray(t)) return kg({ name: "" }, n, t, "");
    {
      let i = t.name ?? "";
      return kg({ name: i }, t.parent, t.providers, i);
    }
  }
  static {
    this.ɵprov = z({ token: e, providedIn: "any", factory: () => W(dm) });
  }
  static {
    this.__NG_ELEMENT_ID__ = -1;
  }
};
var AD = new Y("");
AD.__NG_ELEMENT_ID__ = (e) => {
  let t = en();
  if (t === null) throw new ae(204, !1);
  if (t.type & 2) return t.value;
  if (e & Ee.Optional) return null;
  throw new ae(204, !1);
};
var RD = "ngOriginalError";
function Wu(e) {
  return e[RD];
}
var u0 = !0,
  Rc = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = PD;
      }
      static {
        this.__NG_ENV_ID__ = (n) => n;
      }
    }
    return e;
  })(),
  hd = class extends Rc {
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return Lm(this._lView, t), () => nD(this._lView, t);
    }
  };
function PD() {
  return new hd(xe());
}
var li = (() => {
  class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Ct(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
    static {
      this.ɵprov = z({ token: e, providedIn: "root", factory: () => new e() });
    }
  }
  return e;
})();
var pd = class extends tt {
    constructor(t = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = t),
        Tm() &&
          ((this.destroyRef = I(Rc, { optional: !0 }) ?? void 0),
          (this.pendingTasks = I(li, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = Fe(null);
      try {
        super.next(t);
      } finally {
        Fe(n);
      }
    }
    subscribe(t, n, i) {
      let r = t,
        o = n || (() => null),
        s = i;
      if (t && typeof t == "object") {
        let c = t;
        (r = c.next?.bind(c)),
          (o = c.error?.bind(c)),
          (s = c.complete?.bind(c));
      }
      this.__isAsync &&
        ((o = this.wrapInTimeout(o)),
        r && (r = this.wrapInTimeout(r)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: r, error: o, complete: s });
      return t instanceof nt && t.add(a), a;
    }
    wrapInTimeout(t) {
      return (n) => {
        let i = this.pendingTasks?.add();
        setTimeout(() => {
          t(n), i !== void 0 && this.pendingTasks?.remove(i);
        });
      };
    }
  },
  $e = pd;
function sc(...e) {}
function d0(e) {
  let t, n;
  function i() {
    e = sc;
    try {
      n !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), i();
    })),
    typeof requestAnimationFrame == "function" &&
      (n = requestAnimationFrame(() => {
        e(), i();
      })),
    () => i()
  );
}
function Fg(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = sc;
    }
  );
}
var uf = "isAngularZone",
  ac = uf + "_ID",
  kD = 0,
  Oe = class e {
    constructor(t) {
      (this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new $e(!1)),
        (this.onMicrotaskEmpty = new $e(!1)),
        (this.onStable = new $e(!1)),
        (this.onError = new $e(!1));
      let {
        enableLongStackTrace: n = !1,
        shouldCoalesceEventChangeDetection: i = !1,
        shouldCoalesceRunChangeDetection: r = !1,
        scheduleInRootZone: o = u0,
      } = t;
      if (typeof Zone > "u") throw new ae(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n &&
          Zone.longStackTraceZoneSpec &&
          (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !r && i),
        (s.shouldCoalesceRunChangeDetection = r),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = o),
        jD(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(uf) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new ae(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new ae(909, !1);
    }
    run(t, n, i) {
      return this._inner.run(t, n, i);
    }
    runTask(t, n, i, r) {
      let o = this._inner,
        s = o.scheduleEventTask("NgZoneEvent: " + r, t, FD, sc, sc);
      try {
        return o.runTask(s, n, i);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(t, n, i) {
      return this._inner.runGuarded(t, n, i);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  FD = {};
function df(e) {
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
function LD(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    d0(() => {
      (e.callbackScheduled = !1),
        gd(e),
        (e.isCheckStableRunning = !0),
        df(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    gd(e);
}
function jD(e) {
  let t = () => {
      LD(e);
    },
    n = kD++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [uf]: !0, [ac]: n, [ac + n]: !0 },
    onInvokeTask: (i, r, o, s, a, c) => {
      if (BD(c)) return i.invokeTask(o, s, a, c);
      try {
        return Lg(e), i.invokeTask(o, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          jg(e);
      }
    },
    onInvoke: (i, r, o, s, a, c, l) => {
      try {
        return Lg(e), i.invoke(o, s, a, c, l);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !VD(c) &&
          t(),
          jg(e);
      }
    },
    onHasTask: (i, r, o, s) => {
      i.hasTask(o, s),
        r === o &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), gd(e), df(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (i, r, o, s) => (
      i.handleError(o, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function gd(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function Lg(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function jg(e) {
  e._nesting--, df(e);
}
var cc = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new $e()),
      (this.onMicrotaskEmpty = new $e()),
      (this.onStable = new $e()),
      (this.onError = new $e());
  }
  run(t, n, i) {
    return t.apply(n, i);
  }
  runGuarded(t, n, i) {
    return t.apply(n, i);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, i, r) {
    return t.apply(n, i);
  }
};
function BD(e) {
  return f0(e, "__ignore_ng_zone__");
}
function VD(e) {
  return f0(e, "__scheduler_tick__");
}
function f0(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
function HD(e = "zone.js", t) {
  return e === "noop" ? new cc() : e === "zone.js" ? new Oe(t) : e;
}
var ri = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let n = this._findOriginalError(t);
      this._console.error("ERROR", t),
        n && this._console.error("ORIGINAL ERROR", n);
    }
    _findOriginalError(t) {
      let n = t && Wu(t);
      for (; n && Wu(n); ) n = Wu(n);
      return n || null;
    }
  },
  $D = new Y("", {
    providedIn: "root",
    factory: () => {
      let e = I(Oe),
        t = I(ri);
      return (n) => e.runOutsideAngular(() => t.handleError(n));
    },
  });
function UD() {
  return mo(en(), xe());
}
function mo(e, t) {
  return new Nn(xn(e, t));
}
var Nn = (() => {
  class e {
    constructor(n) {
      this.nativeElement = n;
    }
    static {
      this.__NG_ELEMENT_ID__ = UD;
    }
  }
  return e;
})();
function GD(e) {
  return e instanceof Nn ? e.nativeElement : e;
}
function zD() {
  return this._results[Symbol.iterator]();
}
var md = class e {
  get changes() {
    return (this._changes ??= new $e());
  }
  constructor(t = !1) {
    (this._emitDistinctChangesOnly = t),
      (this.dirty = !0),
      (this._onDirty = void 0),
      (this._results = []),
      (this._changesDetected = !1),
      (this._changes = void 0),
      (this.length = 0),
      (this.first = void 0),
      (this.last = void 0);
    let n = e.prototype;
    n[Symbol.iterator] || (n[Symbol.iterator] = zD);
  }
  get(t) {
    return this._results[t];
  }
  map(t) {
    return this._results.map(t);
  }
  filter(t) {
    return this._results.filter(t);
  }
  find(t) {
    return this._results.find(t);
  }
  reduce(t, n) {
    return this._results.reduce(t, n);
  }
  forEach(t) {
    this._results.forEach(t);
  }
  some(t) {
    return this._results.some(t);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(t, n) {
    this.dirty = !1;
    let i = p1(t);
    (this._changesDetected = !h1(this._results, i, n)) &&
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
  onDirty(t) {
    this._onDirty = t;
  }
  setDirty() {
    (this.dirty = !0), this._onDirty?.();
  }
  destroy() {
    this._changes !== void 0 &&
      (this._changes.complete(), this._changes.unsubscribe());
  }
};
function h0(e) {
  return (e.flags & 128) === 128;
}
var p0 = new Map(),
  WD = 0;
function qD() {
  return WD++;
}
function ZD(e) {
  p0.set(e[Tc], e);
}
function _d(e) {
  p0.delete(e[Tc]);
}
var Bg = "__ngContext__";
function ji(e, t) {
  ki(t) ? ((e[Bg] = t[Tc]), ZD(t)) : (e[Bg] = t);
}
function g0(e) {
  return _0(e[ss]);
}
function m0(e) {
  return _0(e[Sn]);
}
function _0(e) {
  for (; e !== null && !ci(e); ) e = e[Sn];
  return e;
}
var yd;
function y0(e) {
  yd = e;
}
function YD() {
  if (yd !== void 0) return yd;
  if (typeof document < "u") return document;
  throw new ae(210, !1);
}
var Pc = new Y("", { providedIn: "root", factory: () => QD }),
  QD = "ng",
  ff = new Y(""),
  An = new Y("", { providedIn: "platform", factory: () => "unknown" });
var hf = new Y("", {
  providedIn: "root",
  factory: () =>
    YD().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
var KD = "h",
  JD = "b";
var XD = () => null;
function pf(e, t, n = !1) {
  return XD(e, t, n);
}
var v0 = !1,
  ew = new Y("", { providedIn: "root", factory: () => v0 });
var lc = class {
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Xg})`;
  }
};
function gs(e) {
  return e instanceof lc ? e.changingThisBreaksApplicationSecurity : e;
}
function b0(e, t) {
  let n = tw(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL") return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${Xg})`);
  }
  return n === t;
}
function tw(e) {
  return (e instanceof lc && e.getTypeName()) || null;
}
var nw = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function D0(e) {
  return (e = String(e)), e.match(nw) ? e : "unsafe:" + e;
}
var gf = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(gf || {});
function w0(e) {
  let t = iw();
  return t ? t.sanitize(gf.URL, e) || "" : b0(e, "URL") ? gs(e) : D0(Ud(e));
}
function iw() {
  let e = xe();
  return e && e[zn].sanitizer;
}
var rw = /^>|^->|<!--|-->|--!>|<!-$/g,
  ow = /(<|>)/g,
  sw = "\u200B$1\u200B";
function aw(e) {
  return e.replace(rw, (t) => t.replace(ow, sw));
}
function C0(e) {
  return e instanceof Function ? e() : e;
}
function E0(e) {
  return (e ?? I(ut)).get(An) === "browser";
}
var oi = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(oi || {}),
  cw;
function mf(e, t) {
  return cw(e, t);
}
function eo(e, t, n, i, r) {
  if (i != null) {
    let o,
      s = !1;
    ci(i) ? (o = i) : ki(i) && ((s = !0), (i = i[ai]));
    let a = Wn(i);
    e === 0 && n !== null
      ? r == null
        ? x0(t, n, a)
        : uc(t, n, a, r || null, !0)
      : e === 1 && n !== null
      ? uc(t, n, a, r || null, !0)
      : e === 2
      ? ww(t, a, s)
      : e === 3 && t.destroyNode(a),
      o != null && Ew(t, e, o, n, r);
  }
}
function lw(e, t) {
  return e.createText(t);
}
function uw(e, t, n) {
  e.setValue(t, n);
}
function dw(e, t) {
  return e.createComment(aw(t));
}
function T0(e, t, n) {
  return e.createElement(t, n);
}
function fw(e, t) {
  M0(e, t), (t[ai] = null), (t[Wt] = null);
}
function hw(e, t, n, i, r, o) {
  (i[ai] = r), (i[Wt] = t), Fc(e, i, n, 1, r, o);
}
function M0(e, t) {
  t[zn].changeDetectionScheduler?.notify(9), Fc(e, t, t[at], 2, null, null);
}
function pw(e) {
  let t = e[ss];
  if (!t) return qu(e[Ce], e);
  for (; t; ) {
    let n = null;
    if (ki(t)) n = t[ss];
    else {
      let i = t[Xt];
      i && (n = i);
    }
    if (!n) {
      for (; t && !t[Sn] && t !== e; ) ki(t) && qu(t[Ce], t), (t = t[Lt]);
      t === null && (t = e), ki(t) && qu(t[Ce], t), (n = t && t[Sn]);
    }
    t = n;
  }
}
function gw(e, t, n, i) {
  let r = Xt + i,
    o = n.length;
  i > 0 && (n[r - 1][Sn] = t),
    i < o - Xt
      ? ((t[Sn] = n[r]), um(n, Xt + i, t))
      : (n.push(t), (t[Sn] = null)),
    (t[Lt] = n);
  let s = t[pr];
  s !== null && n !== s && I0(s, t);
  let a = t[ii];
  a !== null && a.insertView(e), cd(t), (t[fe] |= 128);
}
function I0(e, t) {
  let n = e[oo],
    i = t[Lt];
  if (ki(i)) e[fe] |= nc.HasTransplantedViews;
  else {
    let r = i[Lt][un];
    t[un] !== r && (e[fe] |= nc.HasTransplantedViews);
  }
  n === null ? (e[oo] = [t]) : n.push(t);
}
function _f(e, t) {
  let n = e[oo],
    i = n.indexOf(t);
  n.splice(i, 1);
}
function vd(e, t) {
  if (e.length <= Xt) return;
  let n = Xt + t,
    i = e[n];
  if (i) {
    let r = i[pr];
    r !== null && r !== e && _f(r, i), t > 0 && (e[n - 1][Sn] = i[Sn]);
    let o = Ja(e, Xt + t);
    fw(i[Ce], i);
    let s = o[ii];
    s !== null && s.detachView(o[Ce]),
      (i[Lt] = null),
      (i[Sn] = null),
      (i[fe] &= -129);
  }
  return i;
}
function S0(e, t) {
  if (!(t[fe] & 256)) {
    let n = t[at];
    n.destroyNode && Fc(e, t, n, 3, null, null), pw(t);
  }
}
function qu(e, t) {
  if (t[fe] & 256) return;
  let n = Fe(null);
  try {
    (t[fe] &= -129),
      (t[fe] |= 256),
      t[ln] && _u(t[ln]),
      _w(e, t),
      mw(e, t),
      t[Ce].type === 1 && t[at].destroy();
    let i = t[pr];
    if (i !== null && ci(t[Lt])) {
      i !== t[Lt] && _f(i, t);
      let r = t[ii];
      r !== null && r.detachView(e);
    }
    _d(t);
  } finally {
    Fe(n);
  }
}
function mw(e, t) {
  let n = e.cleanup,
    i = t[ec];
  if (n !== null)
    for (let o = 0; o < n.length - 1; o += 2)
      if (typeof n[o] == "string") {
        let s = n[o + 3];
        s >= 0 ? i[s]() : i[-s].unsubscribe(), (o += 2);
      } else {
        let s = i[n[o + 1]];
        n[o].call(s);
      }
  i !== null && (t[ec] = null);
  let r = t[Pi];
  if (r !== null) {
    t[Pi] = null;
    for (let o = 0; o < r.length; o++) {
      let s = r[o];
      s();
    }
  }
}
function _w(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let i = 0; i < n.length; i += 2) {
      let r = t[n[i]];
      if (!(r instanceof cs)) {
        let o = n[i + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = r[o[s]],
              c = o[s + 1];
            $n(4, a, c);
            try {
              c.call(a);
            } finally {
              $n(5, a, c);
            }
          }
        else {
          $n(4, r, o);
          try {
            o.call(r);
          } finally {
            $n(5, r, o);
          }
        }
      }
    }
}
function O0(e, t, n) {
  return yw(e, t.parent, n);
}
function yw(e, t, n) {
  let i = t;
  for (; i !== null && i.type & 168; ) (t = i), (i = t.parent);
  if (i === null) return n[ai];
  {
    let { componentOffset: r } = i;
    if (r > -1) {
      let { encapsulation: o } = e.data[i.directiveStart + r];
      if (o === Gn.None || o === Gn.Emulated) return null;
    }
    return xn(i, n);
  }
}
function uc(e, t, n, i, r) {
  e.insertBefore(t, n, i, r);
}
function x0(e, t, n) {
  e.appendChild(t, n);
}
function Vg(e, t, n, i, r) {
  i !== null ? uc(e, t, n, i, r) : x0(e, t, n);
}
function N0(e, t) {
  return e.parentNode(t);
}
function vw(e, t) {
  return e.nextSibling(t);
}
function A0(e, t, n) {
  return Dw(e, t, n);
}
function bw(e, t, n) {
  return e.type & 40 ? xn(e, n) : null;
}
var Dw = bw,
  Hg;
function kc(e, t, n, i) {
  let r = O0(e, i, t),
    o = t[at],
    s = i.parent || t[Wt],
    a = A0(s, i, t);
  if (r != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++) Vg(o, r, n[c], a, !1);
    else Vg(o, r, n, a, !1);
  Hg !== void 0 && Hg(o, i, t, n, r);
}
function Xo(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return xn(t, e);
    if (n & 4) return bd(-1, e[t.index]);
    if (n & 8) {
      let i = t.child;
      if (i !== null) return Xo(e, i);
      {
        let r = e[t.index];
        return ci(r) ? bd(-1, r) : Wn(r);
      }
    } else {
      if (n & 128) return Xo(e, t.next);
      if (n & 32) return mf(t, e)() || Wn(e[t.index]);
      {
        let i = R0(e, t);
        if (i !== null) {
          if (Array.isArray(i)) return i[0];
          let r = mr(e[un]);
          return Xo(r, i);
        } else return Xo(e, t.next);
      }
    }
  }
  return null;
}
function R0(e, t) {
  if (t !== null) {
    let i = e[un][Wt],
      r = t.projection;
    return i.projection[r];
  }
  return null;
}
function bd(e, t) {
  let n = Xt + e + 1;
  if (n < t.length) {
    let i = t[n],
      r = i[Ce].firstChild;
    if (r !== null) return Xo(i, r);
  }
  return t[gr];
}
function ww(e, t, n) {
  e.removeChild(null, t, n);
}
function yf(e, t, n, i, r, o, s) {
  for (; n != null; ) {
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let a = i[n.index],
      c = n.type;
    if (
      (s && t === 0 && (a && ji(Wn(a), i), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (c & 8) yf(e, t, n.child, i, r, o, !1), eo(t, e, r, a, o);
      else if (c & 32) {
        let l = mf(n, i),
          u;
        for (; (u = l()); ) eo(t, e, r, u, o);
        eo(t, e, r, a, o);
      } else c & 16 ? P0(e, t, i, n, r, o) : eo(t, e, r, a, o);
    n = s ? n.projectionNext : n.next;
  }
}
function Fc(e, t, n, i, r, o) {
  yf(n, i, e.firstChild, t, r, o, !1);
}
function Cw(e, t, n) {
  let i = t[at],
    r = O0(e, n, t),
    o = n.parent || t[Wt],
    s = A0(o, n, t);
  P0(i, 0, t, n, r, s);
}
function P0(e, t, n, i, r, o) {
  let s = n[un],
    c = s[Wt].projection[i.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      eo(t, e, r, u, o);
    }
  else {
    let l = c,
      u = s[Lt];
    h0(i) && (l.flags |= 128), yf(e, t, l, u, r, o, !0);
  }
}
function Ew(e, t, n, i, r) {
  let o = n[gr],
    s = Wn(n);
  o !== s && eo(t, e, i, o, r);
  for (let a = Xt; a < n.length; a++) {
    let c = n[a];
    Fc(c[Ce], c, e, t, i, o);
  }
}
function Tw(e, t, n, i, r) {
  if (t) r ? e.addClass(n, i) : e.removeClass(n, i);
  else {
    let o = i.indexOf("-") === -1 ? void 0 : oi.DashCase;
    r == null
      ? e.removeStyle(n, i, o)
      : (typeof r == "string" &&
          r.endsWith("!important") &&
          ((r = r.slice(0, -10)), (o |= oi.Important)),
        e.setStyle(n, i, r, o));
  }
}
function Mw(e, t, n) {
  e.setAttribute(t, "style", n);
}
function k0(e, t, n) {
  n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
}
function F0(e, t, n) {
  let { mergedAttrs: i, classes: r, styles: o } = n;
  i !== null && nd(e, t, i),
    r !== null && k0(e, t, r),
    o !== null && Mw(e, t, o);
}
var qn = {};
function L(e = 1) {
  L0(Rt(), xe(), Dr() + e, !1);
}
function L0(e, t, n, i) {
  if (!i)
    if ((t[fe] & 3) === 3) {
      let o = e.preOrderCheckHooks;
      o !== null && Wa(t, o, n);
    } else {
      let o = e.preOrderHooks;
      o !== null && qa(t, o, 0, n);
    }
  _r(n);
}
function Je(e, t = Ee.Default) {
  let n = xe();
  if (n === null) return W(e, t);
  let i = en();
  return s0(i, n, cn(e), t);
}
function j0() {
  let e = "invalid";
  throw new Error(e);
}
function B0(e, t, n, i, r, o) {
  let s = Fe(null);
  try {
    let a = null;
    r & Fi.SignalBased && (a = t[i][Hp]),
      a !== null && a.transformFn !== void 0 && (o = a.transformFn(o)),
      r & Fi.HasDecoratorInputTransform &&
        (o = e.inputTransforms[i].call(t, o)),
      e.setInput !== null ? e.setInput(t, a, o, n, i) : Om(t, a, i, o);
  } finally {
    Fe(s);
  }
}
function Iw(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let i = 0; i < n.length; i++) {
        let r = n[i];
        if (r < 0) _r(~r);
        else {
          let o = r,
            s = n[++i],
            a = n[++i];
          fD(s, o);
          let c = t[o];
          a(2, c);
        }
      }
    } finally {
      _r(-1);
    }
}
function Lc(e, t, n, i, r, o, s, a, c, l, u) {
  let d = t.blueprint.slice();
  return (
    (d[ai] = r),
    (d[fe] = i | 4 | 128 | 8 | 64),
    (l !== null || (e && e[fe] & 2048)) && (d[fe] |= 2048),
    km(d),
    (d[Lt] = d[po] = e),
    (d[On] = n),
    (d[zn] = s || (e && e[zn])),
    (d[at] = a || (e && e[at])),
    (d[ro] = c || (e && e[ro]) || null),
    (d[Wt] = o),
    (d[Tc] = qD()),
    (d[os] = u),
    (d[Im] = l),
    (d[un] = t.type == 2 ? e[un] : d),
    d
  );
}
function _o(e, t, n, i, r) {
  let o = e.data[t];
  if (o === null) (o = Sw(e, t, n, i, r)), dD() && (o.flags |= 32);
  else if (o.type & 64) {
    (o.type = n), (o.value = i), (o.attrs = r);
    let s = cD();
    o.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return br(o, !0), o;
}
function Sw(e, t, n, i, r) {
  let o = Hm(),
    s = tf(),
    a = s ? o : o && o.parent,
    c = (e.data[t] = Pw(e, a, n, t, i, r));
  return (
    e.firstChild === null && (e.firstChild = c),
    o !== null &&
      (s
        ? o.child == null && c.parent !== null && (o.child = c)
        : o.next === null && ((o.next = c), (c.prev = o))),
    c
  );
}
function V0(e, t, n, i) {
  if (n === 0) return -1;
  let r = t.length;
  for (let o = 0; o < n; o++) t.push(i), e.blueprint.push(i), e.data.push(null);
  return r;
}
function H0(e, t, n, i, r) {
  let o = Dr(),
    s = i & 2;
  try {
    _r(-1), s && t.length > Ht && L0(e, t, Ht, !1), $n(s ? 2 : 0, r), n(i, r);
  } finally {
    _r(o), $n(s ? 3 : 1, r);
  }
}
function vf(e, t, n) {
  if (Jd(t)) {
    let i = Fe(null);
    try {
      let r = t.directiveStart,
        o = t.directiveEnd;
      for (let s = r; s < o; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = n[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      Fe(i);
    }
  }
}
function bf(e, t, n) {
  Bm() && (Vw(e, t, n, xn(n, t)), (n.flags & 64) === 64 && G0(e, t, n));
}
function Df(e, t, n = xn) {
  let i = t.localNames;
  if (i !== null) {
    let r = t.index + 1;
    for (let o = 0; o < i.length; o += 2) {
      let s = i[o + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[r++] = a;
    }
  }
}
function $0(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = wf(
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
    : t;
}
function wf(e, t, n, i, r, o, s, a, c, l, u) {
  let d = Ht + i,
    p = d + r,
    h = Ow(d, p),
    D = typeof l == "function" ? l() : l;
  return (h[Ce] = {
    type: e,
    blueprint: h,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: h.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: p,
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
    schemas: c,
    consts: D,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function Ow(e, t) {
  let n = [];
  for (let i = 0; i < t; i++) n.push(i < e ? null : qn);
  return n;
}
function xw(e, t, n, i) {
  let o = i.get(ew, v0) || n === Gn.ShadowDom,
    s = e.selectRootElement(t, o);
  return Nw(s), s;
}
function Nw(e) {
  Aw(e);
}
var Aw = () => null;
function Rw(e, t, n, i) {
  let r = q0(t);
  r.push(n), e.firstCreatePass && Z0(e).push(i, r.length - 1);
}
function Pw(e, t, n, i, r, o) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    Vm() && (a |= 128),
    {
      type: n,
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
      parent: t,
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
function $g(e, t, n, i, r) {
  for (let o in t) {
    if (!t.hasOwnProperty(o)) continue;
    let s = t[o];
    if (s === void 0) continue;
    i ??= {};
    let a,
      c = Fi.None;
    Array.isArray(s) ? ((a = s[0]), (c = s[1])) : (a = s);
    let l = o;
    if (r !== null) {
      if (!r.hasOwnProperty(o)) continue;
      l = r[o];
    }
    e === 0 ? Ug(i, n, l, a, c) : Ug(i, n, l, a);
  }
  return i;
}
function Ug(e, t, n, i, r) {
  let o;
  e.hasOwnProperty(n) ? (o = e[n]).push(t, i) : (o = e[n] = [t, i]),
    r !== void 0 && o.push(r);
}
function kw(e, t, n) {
  let i = t.directiveStart,
    r = t.directiveEnd,
    o = e.data,
    s = t.attrs,
    a = [],
    c = null,
    l = null;
  for (let u = i; u < r; u++) {
    let d = o[u],
      p = n ? n.get(d) : null,
      h = p ? p.inputs : null,
      D = p ? p.outputs : null;
    (c = $g(0, d.inputs, u, c, h)), (l = $g(1, d.outputs, u, l, D));
    let w = c !== null && s !== null && !Yd(t) ? Yw(c, u, s) : null;
    a.push(w);
  }
  c !== null &&
    (c.hasOwnProperty("class") && (t.flags |= 8),
    c.hasOwnProperty("style") && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = c),
    (t.outputs = l);
}
function Fw(e) {
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
function Cf(e, t, n, i, r, o, s, a) {
  let c = xn(t, n),
    l = t.inputs,
    u;
  !a && l != null && (u = l[i])
    ? (Tf(e, n, u, i, r), Mc(t) && Lw(n, t.index))
    : t.type & 3
    ? ((i = Fw(i)),
      (r = s != null ? s(r, t.value || "", i) : r),
      o.setProperty(c, i, r))
    : t.type & 12;
}
function Lw(e, t) {
  let n = Ui(t, e);
  n[fe] & 16 || (n[fe] |= 64);
}
function Ef(e, t, n, i) {
  if (Bm()) {
    let r = i === null ? null : { "": -1 },
      o = $w(e, n),
      s,
      a;
    o === null ? (s = a = null) : ([s, a] = o),
      s !== null && U0(e, t, n, s, r, a),
      r && Uw(n, i, r);
  }
  n.mergedAttrs = Zd(n.mergedAttrs, n.attrs);
}
function U0(e, t, n, i, r, o) {
  for (let l = 0; l < i.length; l++) ID(n0(n, t), e, i[l].type);
  zw(n, e.data.length, i.length);
  for (let l = 0; l < i.length; l++) {
    let u = i[l];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    c = V0(e, t, i.length, null);
  for (let l = 0; l < i.length; l++) {
    let u = i[l];
    (n.mergedAttrs = Zd(n.mergedAttrs, u.hostAttrs)),
      Ww(e, n, t, c, u),
      Gw(c, u, r),
      u.contentQueries !== null && (n.flags |= 4),
      (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) &&
        (n.flags |= 64);
    let d = u.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
      c++;
  }
  kw(e, n, o);
}
function jw(e, t, n, i, r) {
  let o = r.hostBindings;
  if (o) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    Bw(s) != a && s.push(a), s.push(n, i, o);
  }
}
function Bw(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == "number" && n < 0) return n;
  }
  return 0;
}
function Vw(e, t, n, i) {
  let r = n.directiveStart,
    o = n.directiveEnd;
  Mc(n) && qw(t, n, e.data[r + n.componentOffset]),
    e.firstCreatePass || n0(n, t),
    ji(i, t);
  let s = n.initialInputs;
  for (let a = r; a < o; a++) {
    let c = e.data[a],
      l = ao(t, e, a, n);
    if ((ji(l, t), s !== null && Zw(t, a - r, l, c, n, s), ps(c))) {
      let u = Ui(n.index, t);
      u[On] = ao(t, e, a, n);
    }
  }
}
function G0(e, t, n) {
  let i = n.directiveStart,
    r = n.directiveEnd,
    o = n.index,
    s = hD();
  try {
    _r(o);
    for (let a = i; a < r; a++) {
      let c = e.data[a],
        l = t[a];
      ld(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          Hw(c, l);
    }
  } finally {
    _r(-1), ld(s);
  }
}
function Hw(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function $w(e, t) {
  let n = e.directiveRegistry,
    i = null,
    r = null;
  if (n)
    for (let o = 0; o < n.length; o++) {
      let s = n[o];
      if (gm(t, s.selectors, !1))
        if ((i || (i = []), ps(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (r = r || new Map()),
              s.findHostDirectiveDefs(s, a, r),
              i.unshift(...a, s);
            let c = a.length;
            Dd(e, t, c);
          } else i.unshift(s), Dd(e, t, 0);
        else
          (r = r || new Map()), s.findHostDirectiveDefs?.(s, i, r), i.push(s);
    }
  return i === null ? null : [i, r];
}
function Dd(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function Uw(e, t, n) {
  if (t) {
    let i = (e.localNames = []);
    for (let r = 0; r < t.length; r += 2) {
      let o = n[t[r + 1]];
      if (o == null) throw new ae(-301, !1);
      i.push(t[r], o);
    }
  }
}
function Gw(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let i = 0; i < t.exportAs.length; i++) n[t.exportAs[i]] = e;
    ps(t) && (n[""] = e);
  }
}
function zw(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function Ww(e, t, n, i, r) {
  e.data[i] = r;
  let o = r.factory || (r.factory = hr(r.type, !0)),
    s = new cs(o, ps(r), Je);
  (e.blueprint[i] = s), (n[i] = s), jw(e, t, i, V0(e, n, r.hostVars, qn), r);
}
function qw(e, t, n) {
  let i = xn(t, e),
    r = $0(n),
    o = e[zn].rendererFactory,
    s = 16;
  n.signals ? (s = 4096) : n.onPush && (s = 64);
  let a = jc(
    e,
    Lc(e, r, null, s, i, t, null, o.createRenderer(i, n), null, null, null)
  );
  e[t.index] = a;
}
function Zw(e, t, n, i, r, o) {
  let s = o[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let c = s[a++],
        l = s[a++],
        u = s[a++],
        d = s[a++];
      B0(i, n, c, l, u, d);
    }
}
function Yw(e, t, n) {
  let i = null,
    r = 0;
  for (; r < n.length; ) {
    let o = n[r];
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
        if (s[a] === t) {
          i.push(o, s[a + 1], s[a + 2], n[r + 1]);
          break;
        }
    }
    r += 2;
  }
  return i;
}
function z0(e, t, n, i) {
  return [e, !0, 0, t, null, i, null, n, null, null];
}
function W0(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let i = Fe(null);
    try {
      for (let r = 0; r < n.length; r += 2) {
        let o = n[r],
          s = n[r + 1];
        if (s !== -1) {
          let a = e.data[s];
          of(o), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      Fe(i);
    }
  }
}
function jc(e, t) {
  return e[ss] ? (e[Og][Sn] = t) : (e[ss] = t), (e[Og] = t), t;
}
function wd(e, t, n) {
  of(0);
  let i = Fe(null);
  try {
    t(e, n);
  } finally {
    Fe(i);
  }
}
function q0(e) {
  return (e[ec] ??= []);
}
function Z0(e) {
  return (e.cleanup ??= []);
}
function Y0(e, t) {
  let n = e[ro],
    i = n ? n.get(ri, null) : null;
  i && i.handleError(t);
}
function Tf(e, t, n, i, r) {
  for (let o = 0; o < n.length; ) {
    let s = n[o++],
      a = n[o++],
      c = n[o++],
      l = t[s],
      u = e.data[s];
    B0(u, l, i, a, c, r);
  }
}
function Qw(e, t, n) {
  let i = Rm(t, e);
  uw(e[at], i, n);
}
function Kw(e, t) {
  let n = Ui(t, e),
    i = n[Ce];
  Jw(i, n);
  let r = n[ai];
  r !== null && n[os] === null && (n[os] = pf(r, n[ro])), Mf(i, n, n[On]);
}
function Jw(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Mf(e, t, n) {
  sf(t);
  try {
    let i = e.viewQuery;
    i !== null && wd(1, i, n);
    let r = e.template;
    r !== null && H0(e, t, r, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[ii]?.finishViewCreation(e),
      e.staticContentQueries && W0(e, t),
      e.staticViewQueries && wd(2, e.viewQuery, n);
    let o = e.components;
    o !== null && Xw(t, o);
  } catch (i) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      i)
    );
  } finally {
    (t[fe] &= -5), af();
  }
}
function Xw(e, t) {
  for (let n = 0; n < t.length; n++) Kw(e, t[n]);
}
function Q0(e, t, n, i) {
  let r = Fe(null);
  try {
    let o = t.tView,
      a = e[fe] & 4096 ? 4096 : 16,
      c = Lc(
        e,
        o,
        n,
        a,
        null,
        t,
        null,
        null,
        i?.injector ?? null,
        i?.embeddedViewInjector ?? null,
        i?.dehydratedView ?? null
      ),
      l = e[t.index];
    c[pr] = l;
    let u = e[ii];
    return u !== null && (c[ii] = u.createEmbeddedView(o)), Mf(o, c, n), c;
  } finally {
    Fe(r);
  }
}
function Cd(e, t) {
  return !t || t.firstChild === null || h0(e);
}
function K0(e, t, n, i = !0) {
  let r = t[Ce];
  if ((gw(r, t, e, n), i)) {
    let s = bd(n, e),
      a = t[at],
      c = N0(a, e[gr]);
    c !== null && hw(r, e[Wt], a, t, c, s);
  }
  let o = t[os];
  o !== null && o.firstChild !== null && (o.firstChild = null);
}
function dc(e, t, n, i, r = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = r ? n.projectionNext : n.next;
      continue;
    }
    let o = t[n.index];
    o !== null && i.push(Wn(o)), ci(o) && eC(o, i);
    let s = n.type;
    if (s & 8) dc(e, t, n.child, i);
    else if (s & 32) {
      let a = mf(n, t),
        c;
      for (; (c = a()); ) i.push(c);
    } else if (s & 16) {
      let a = R0(t, n);
      if (Array.isArray(a)) i.push(...a);
      else {
        let c = mr(t[un]);
        dc(c[Ce], c, a, i, !0);
      }
    }
    n = r ? n.projectionNext : n.next;
  }
  return i;
}
function eC(e, t) {
  for (let n = Xt; n < e.length; n++) {
    let i = e[n],
      r = i[Ce].firstChild;
    r !== null && dc(i[Ce], i, r, t);
  }
  e[gr] !== e[ai] && t.push(e[gr]);
}
var J0 = [];
function tC(e) {
  return e[ln] ?? nC(e);
}
function nC(e) {
  let t = J0.pop() ?? Object.create(rC);
  return (t.lView = e), t;
}
function iC(e) {
  e.lView[ln] !== e && ((e.lView = null), J0.push(e));
}
var rC = We(G({}, pu), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    Oc(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[ln] = this;
  },
});
function oC(e) {
  let t = e[ln] ?? Object.create(sC);
  return (t.lView = e), t;
}
var sC = We(G({}, pu), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let t = mr(e.lView);
    for (; t && !X0(t[Ce]); ) t = mr(t);
    t && Fm(t);
  },
  consumerOnSignalRead() {
    this.lView[ln] = this;
  },
});
function X0(e) {
  return e.type !== 2;
}
var aC = 100;
function e_(e, t = !0, n = 0) {
  let i = e[zn],
    r = i.rendererFactory,
    o = !1;
  o || r.begin?.();
  try {
    cC(e, n);
  } catch (s) {
    throw (t && Y0(e, s), s);
  } finally {
    o || (r.end?.(), i.inlineEffectRunner?.flush());
  }
}
function cC(e, t) {
  let n = $m();
  try {
    Ng(!0), Ed(e, t);
    let i = 0;
    for (; Sc(e); ) {
      if (i === aC) throw new ae(103, !1);
      i++, Ed(e, 1);
    }
  } finally {
    Ng(n);
  }
}
function lC(e, t, n, i) {
  let r = t[fe];
  if ((r & 256) === 256) return;
  let o = !1,
    s = !1;
  !o && t[zn].inlineEffectRunner?.flush(), sf(t);
  let a = !0,
    c = null,
    l = null;
  o ||
    (X0(e)
      ? ((l = tC(t)), (c = gu(l)))
      : $p() === null
      ? ((a = !1), (l = oC(t)), (c = gu(l)))
      : t[ln] && (_u(t[ln]), (t[ln] = null)));
  try {
    km(t), uD(e.bindingStartIndex), n !== null && H0(e, t, n, 2, i);
    let u = (r & 3) === 3;
    if (!o)
      if (u) {
        let h = e.preOrderCheckHooks;
        h !== null && Wa(t, h, null);
      } else {
        let h = e.preOrderHooks;
        h !== null && qa(t, h, 0, null), Uu(t, 0);
      }
    if ((s || uC(t), t_(t, 0), e.contentQueries !== null && W0(e, t), !o))
      if (u) {
        let h = e.contentCheckHooks;
        h !== null && Wa(t, h);
      } else {
        let h = e.contentHooks;
        h !== null && qa(t, h, 1), Uu(t, 1);
      }
    Iw(e, t);
    let d = e.components;
    d !== null && i_(t, d, 0);
    let p = e.viewQuery;
    if ((p !== null && wd(2, p, i), !o))
      if (u) {
        let h = e.viewCheckHooks;
        h !== null && Wa(t, h);
      } else {
        let h = e.viewHooks;
        h !== null && qa(t, h, 2), Uu(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[$u])) {
      for (let h of t[$u]) h();
      t[$u] = null;
    }
    o || (t[fe] &= -73);
  } catch (u) {
    throw (o || Oc(t), u);
  } finally {
    l !== null && (Up(l, c), a && iC(l)), af();
  }
}
function t_(e, t) {
  for (let n = g0(e); n !== null; n = m0(n))
    for (let i = Xt; i < n.length; i++) {
      let r = n[i];
      n_(r, t);
    }
}
function uC(e) {
  for (let t = g0(e); t !== null; t = m0(t)) {
    if (!(t[fe] & nc.HasTransplantedViews)) continue;
    let n = t[oo];
    for (let i = 0; i < n.length; i++) {
      let r = n[i];
      Fm(r);
    }
  }
}
function dC(e, t, n) {
  let i = Ui(t, e);
  n_(i, n);
}
function n_(e, t) {
  ef(e) && Ed(e, t);
}
function Ed(e, t) {
  let i = e[Ce],
    r = e[fe],
    o = e[ln],
    s = !!(t === 0 && r & 16);
  if (
    ((s ||= !!(r & 64 && t === 0)),
    (s ||= !!(r & 1024)),
    (s ||= !!(o?.dirty && mu(o))),
    (s ||= !1),
    o && (o.dirty = !1),
    (e[fe] &= -9217),
    s)
  )
    lC(i, e, i.template, e[On]);
  else if (r & 8192) {
    t_(e, 1);
    let a = i.components;
    a !== null && i_(e, a, 1);
  }
}
function i_(e, t, n) {
  for (let i = 0; i < t.length; i++) dC(e, t[i], n);
}
function If(e, t) {
  let n = $m() ? 64 : 1088;
  for (e[zn].changeDetectionScheduler?.notify(t); e; ) {
    e[fe] |= n;
    let i = mr(e);
    if (ad(e) && !i) return e;
    e = i;
  }
  return null;
}
var yr = class {
    get rootNodes() {
      let t = this._lView,
        n = t[Ce];
      return dc(n, t, n.firstChild, []);
    }
    constructor(t, n, i = !0) {
      (this._lView = t),
        (this._cdRefInjectingView = n),
        (this.notifyErrorHandler = i),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[On];
    }
    set context(t) {
      this._lView[On] = t;
    }
    get destroyed() {
      return (this._lView[fe] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let t = this._lView[Lt];
        if (ci(t)) {
          let n = t[tc],
            i = n ? n.indexOf(this) : -1;
          i > -1 && (vd(t, i), Ja(n, i));
        }
        this._attachedToViewContainer = !1;
      }
      S0(this._lView[Ce], this._lView);
    }
    onDestroy(t) {
      Lm(this._lView, t);
    }
    markForCheck() {
      If(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[fe] &= -129;
    }
    reattach() {
      cd(this._lView), (this._lView[fe] |= 128);
    }
    detectChanges() {
      (this._lView[fe] |= 1024), e_(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new ae(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let t = ad(this._lView),
        n = this._lView[pr];
      n !== null && !t && _f(n, this._lView), M0(this._lView[Ce], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new ae(902, !1);
      this._appRef = t;
      let n = ad(this._lView),
        i = this._lView[pr];
      i !== null && !n && I0(i, this._lView), cd(this._lView);
    }
  },
  Bi = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = pC;
      }
    }
    return e;
  })(),
  fC = Bi,
  hC = class extends fC {
    constructor(t, n, i) {
      super(),
        (this._declarationLView = t),
        (this._declarationTContainer = n),
        (this.elementRef = i);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(t, n) {
      return this.createEmbeddedViewImpl(t, n);
    }
    createEmbeddedViewImpl(t, n, i) {
      let r = Q0(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: n,
        dehydratedView: i,
      });
      return new yr(r);
    }
  };
function pC() {
  return Bc(en(), xe());
}
function Bc(e, t) {
  return e.type & 4 ? new hC(t, e, mo(e, t)) : null;
}
var j2 = new RegExp(`^(\\d+)*(${JD}|${KD})*(.*)`);
var gC = () => null;
function Td(e, t) {
  return gC(e, t);
}
var co = class {},
  Sf = new Y("", { providedIn: "root", factory: () => !1 });
var r_ = new Y(""),
  o_ = new Y(""),
  Md = class {},
  fc = class {};
function mC(e) {
  let t = Error(`No component factory found for ${Vt(e)}.`);
  return (t[_C] = e), t;
}
var _C = "ngComponent";
var Id = class {
    resolveComponentFactory(t) {
      throw mC(t);
    }
  },
  si = class {
    static {
      this.NULL = new Id();
    }
  },
  lo = class {},
  Vc = (() => {
    class e {
      constructor() {
        this.destroyNode = null;
      }
      static {
        this.__NG_ELEMENT_ID__ = () => yC();
      }
    }
    return e;
  })();
function yC() {
  let e = xe(),
    t = en(),
    n = Ui(t.index, e);
  return (ki(n) ? n : e)[at];
}
var vC = (() => {
  class e {
    static {
      this.ɵprov = z({ token: e, providedIn: "root", factory: () => null });
    }
  }
  return e;
})();
function hc(e, t, n) {
  let i = n ? e.styles : null,
    r = n ? e.classes : null,
    o = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == "number") o = a;
      else if (o == 1) r = Ju(r, a);
      else if (o == 2) {
        let c = a,
          l = t[++s];
        i = Ju(i, c + ": " + l + ";");
      }
    }
  n ? (e.styles = i) : (e.stylesWithoutHost = i),
    n ? (e.classes = r) : (e.classesWithoutHost = r);
}
var pc = class extends si {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = Li(t);
    return new uo(n, this.ngModule);
  }
};
function Gg(e, t) {
  let n = [];
  for (let i in e) {
    if (!e.hasOwnProperty(i)) continue;
    let r = e[i];
    if (r === void 0) continue;
    let o = Array.isArray(r),
      s = o ? r[0] : r,
      a = o ? r[1] : Fi.None;
    t
      ? n.push({
          propName: s,
          templateName: i,
          isSignal: (a & Fi.SignalBased) !== 0,
        })
      : n.push({ propName: s, templateName: i });
  }
  return n;
}
function bC(e) {
  let t = e.toLowerCase();
  return t === "svg" ? K1 : t === "math" ? J1 : null;
}
var uo = class extends fc {
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        i = Gg(t.inputs, !0);
      if (n !== null)
        for (let r of i)
          n.hasOwnProperty(r.propName) && (r.transform = n[r.propName]);
      return i;
    }
    get outputs() {
      return Gg(this.componentDef.outputs, !1);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = x1(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, i, r) {
      let o = Fe(null);
      try {
        r = r || this.ngModule;
        let s = r instanceof Ft ? r : r?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new ud(t, s) : t,
          c = a.get(lo, null);
        if (c === null) throw new ae(407, !1);
        let l = a.get(vC, null),
          u = a.get(co, null),
          d = {
            rendererFactory: c,
            sanitizer: l,
            inlineEffectRunner: null,
            changeDetectionScheduler: u,
          },
          p = c.createRenderer(null, this.componentDef),
          h = this.componentDef.selectors[0][0] || "div",
          D = i
            ? xw(p, i, this.componentDef.encapsulation, a)
            : T0(p, h, bC(h)),
          w = 512;
        this.componentDef.signals
          ? (w |= 4096)
          : this.componentDef.onPush || (w |= 16);
        let M = null;
        D !== null && (M = pf(D, a, !0));
        let P = wf(0, null, null, 1, 0, null, null, null, null, null, null),
          S = Lc(null, P, null, w, null, null, d, p, a, null, M);
        sf(S);
        let C,
          F,
          V = null;
        try {
          let H = this.componentDef,
            ee,
            j = null;
          H.findHostDirectiveDefs
            ? ((ee = []),
              (j = new Map()),
              H.findHostDirectiveDefs(H, ee, j),
              ee.push(H))
            : (ee = [H]);
          let de = DC(S, D);
          (V = wC(de, D, H, ee, S, d, p)),
            (F = Pm(P, Ht)),
            D && TC(p, H, D, i),
            n !== void 0 && MC(F, this.ngContentSelectors, n),
            (C = EC(V, H, ee, j, S, [IC])),
            Mf(P, S, null);
        } catch (H) {
          throw (V !== null && _d(V), _d(S), H);
        } finally {
          af();
        }
        return new Sd(this.componentType, C, mo(F, S), S, F);
      } finally {
        Fe(o);
      }
    }
  },
  Sd = class extends Md {
    constructor(t, n, i, r, o) {
      super(),
        (this.location = i),
        (this._rootLView = r),
        (this._tNode = o),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new yr(r, void 0, !1)),
        (this.componentType = t);
    }
    setInput(t, n) {
      let i = this._tNode.inputs,
        r;
      if (i !== null && (r = i[t])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(t) &&
            Object.is(this.previousInputValues.get(t), n))
        )
          return;
        let o = this._rootLView;
        Tf(o[Ce], o, r, t, n), this.previousInputValues.set(t, n);
        let s = Ui(this._tNode.index, o);
        If(s, 1);
      }
    }
    get injector() {
      return new fr(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function DC(e, t) {
  let n = e[Ce],
    i = Ht;
  return (e[i] = t), _o(n, i, 2, "#host", null);
}
function wC(e, t, n, i, r, o, s) {
  let a = r[Ce];
  CC(i, e, t, s);
  let c = null;
  t !== null && (c = pf(t, r[ro]));
  let l = o.rendererFactory.createRenderer(t, n),
    u = 16;
  n.signals ? (u = 4096) : n.onPush && (u = 64);
  let d = Lc(r, $0(n), null, u, r[e.index], e, o, l, null, null, c);
  return (
    a.firstCreatePass && Dd(a, e, i.length - 1), jc(r, d), (r[e.index] = d)
  );
}
function CC(e, t, n, i) {
  for (let r of e) t.mergedAttrs = Zd(t.mergedAttrs, r.hostAttrs);
  t.mergedAttrs !== null &&
    (hc(t, t.mergedAttrs, !0), n !== null && F0(i, n, t));
}
function EC(e, t, n, i, r, o) {
  let s = en(),
    a = r[Ce],
    c = xn(s, r);
  U0(a, r, s, n, null, i);
  for (let u = 0; u < n.length; u++) {
    let d = s.directiveStart + u,
      p = ao(r, a, d, s);
    ji(p, r);
  }
  G0(a, r, s), c && ji(c, r);
  let l = ao(r, a, s.directiveStart + s.componentOffset, s);
  if (((e[On] = r[On] = l), o !== null)) for (let u of o) u(l, t);
  return vf(a, s, r), l;
}
function TC(e, t, n, i) {
  if (i) nd(e, n, ["ng-version", "18.2.11"]);
  else {
    let { attrs: r, classes: o } = N1(t.selectors[0]);
    r && nd(e, n, r), o && o.length > 0 && k0(e, n, o.join(" "));
  }
}
function MC(e, t, n) {
  let i = (e.projection = []);
  for (let r = 0; r < t.length; r++) {
    let o = n[r];
    i.push(o != null ? Array.from(o) : null);
  }
}
function IC() {
  let e = en();
  Ac(xe()[Ce], e);
}
var ui = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = SC;
    }
  }
  return e;
})();
function SC() {
  let e = en();
  return a_(e, xe());
}
var OC = ui,
  s_ = class extends OC {
    constructor(t, n, i) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = i);
    }
    get element() {
      return mo(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new fr(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = lf(this._hostTNode, this._hostLView);
      if (Xm(t)) {
        let n = rc(t, this._hostLView),
          i = ic(t),
          r = n[Ce].data[i + 8];
        return new fr(r, n);
      } else return new fr(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = zg(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - Xt;
    }
    createEmbeddedView(t, n, i) {
      let r, o;
      typeof i == "number"
        ? (r = i)
        : i != null && ((r = i.index), (o = i.injector));
      let s = Td(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, o, s);
      return this.insertImpl(a, r, Cd(this._hostTNode, s)), a;
    }
    createComponent(t, n, i, r, o) {
      let s = t && !q1(t),
        a;
      if (s) a = n;
      else {
        let D = n || {};
        (a = D.index),
          (i = D.injector),
          (r = D.projectableNodes),
          (o = D.environmentInjector || D.ngModuleRef);
      }
      let c = s ? t : new uo(Li(t)),
        l = i || this.parentInjector;
      if (!o && c.ngModule == null) {
        let w = (s ? l : this.parentInjector).get(Ft, null);
        w && (o = w);
      }
      let u = Li(c.componentType ?? {}),
        d = Td(this._lContainer, u?.id ?? null),
        p = d?.firstChild ?? null,
        h = c.create(l, r, p, o);
      return this.insertImpl(h.hostView, a, Cd(this._hostTNode, d)), h;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, i) {
      let r = t._lView;
      if (eD(r)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let c = r[Lt],
            l = new s_(c, c[Wt], c[Lt]);
          l.detach(l.indexOf(t));
        }
      }
      let o = this._adjustIndex(n),
        s = this._lContainer;
      return K0(s, r, o, i), t.attachToViewContainerRef(), um(Zu(s), o, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = zg(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        i = vd(this._lContainer, n);
      i && (Ja(Zu(this._lContainer), n), S0(i[Ce], i));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        i = vd(this._lContainer, n);
      return i && Ja(Zu(this._lContainer), n) != null ? new yr(i) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function zg(e) {
  return e[tc];
}
function Zu(e) {
  return e[tc] || (e[tc] = []);
}
function a_(e, t) {
  let n,
    i = t[e.index];
  return (
    ci(i) ? (n = i) : ((n = z0(i, t, null, e)), (t[e.index] = n), jc(t, n)),
    NC(n, t, e, i),
    new s_(n, e, t)
  );
}
function xC(e, t) {
  let n = e[at],
    i = n.createComment(""),
    r = xn(t, e),
    o = N0(n, r);
  return uc(n, o, i, vw(n, r), !1), i;
}
var NC = PC,
  AC = () => !1;
function RC(e, t, n) {
  return AC(e, t, n);
}
function PC(e, t, n, i) {
  if (e[gr]) return;
  let r;
  n.type & 8 ? (r = Wn(i)) : (r = xC(t, n)), (e[gr] = r);
}
var Od = class e {
    constructor(t) {
      (this.queryList = t), (this.matches = null);
    }
    clone() {
      return new e(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  xd = class e {
    constructor(t = []) {
      this.queries = t;
    }
    createEmbeddedView(t) {
      let n = t.queries;
      if (n !== null) {
        let i = t.contentQueries !== null ? t.contentQueries[0] : n.length,
          r = [];
        for (let o = 0; o < i; o++) {
          let s = n.getByIndex(o),
            a = this.queries[s.indexInDeclarationView];
          r.push(a.clone());
        }
        return new e(r);
      }
      return null;
    }
    insertView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    detachView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    finishViewCreation(t) {
      this.dirtyQueriesWithMatches(t);
    }
    dirtyQueriesWithMatches(t) {
      for (let n = 0; n < this.queries.length; n++)
        Of(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  Nd = class {
    constructor(t, n, i = null) {
      (this.flags = n),
        (this.read = i),
        typeof t == "string" ? (this.predicate = $C(t)) : (this.predicate = t);
    }
  },
  Ad = class e {
    constructor(t = []) {
      this.queries = t;
    }
    elementStart(t, n) {
      for (let i = 0; i < this.queries.length; i++)
        this.queries[i].elementStart(t, n);
    }
    elementEnd(t) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementEnd(t);
    }
    embeddedTView(t) {
      let n = null;
      for (let i = 0; i < this.length; i++) {
        let r = n !== null ? n.length : 0,
          o = this.getByIndex(i).embeddedTView(t, r);
        o &&
          ((o.indexInDeclarationView = i), n !== null ? n.push(o) : (n = [o]));
      }
      return n !== null ? new e(n) : null;
    }
    template(t, n) {
      for (let i = 0; i < this.queries.length; i++)
        this.queries[i].template(t, n);
    }
    getByIndex(t) {
      return this.queries[t];
    }
    get length() {
      return this.queries.length;
    }
    track(t) {
      this.queries.push(t);
    }
  },
  Rd = class e {
    constructor(t, n = -1) {
      (this.metadata = t),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = n);
    }
    elementStart(t, n) {
      this.isApplyingToNode(n) && this.matchTNode(t, n);
    }
    elementEnd(t) {
      this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
    }
    template(t, n) {
      this.elementStart(t, n);
    }
    embeddedTView(t, n) {
      return this.isApplyingToNode(t)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-t.index, n),
          new e(this.metadata))
        : null;
    }
    isApplyingToNode(t) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let n = this._declarationNodeIndex,
          i = t.parent;
        for (; i !== null && i.type & 8 && i.index !== n; ) i = i.parent;
        return n === (i !== null ? i.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(t, n) {
      let i = this.metadata.predicate;
      if (Array.isArray(i))
        for (let r = 0; r < i.length; r++) {
          let o = i[r];
          this.matchTNodeWithReadOption(t, n, kC(n, o)),
            this.matchTNodeWithReadOption(t, n, Za(n, t, o, !1, !1));
        }
      else
        i === Bi
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, Za(n, t, i, !1, !1));
    }
    matchTNodeWithReadOption(t, n, i) {
      if (i !== null) {
        let r = this.metadata.read;
        if (r !== null)
          if (r === Nn || r === ui || (r === Bi && n.type & 4))
            this.addMatch(n.index, -2);
          else {
            let o = Za(n, t, r, !1, !1);
            o !== null && this.addMatch(n.index, o);
          }
        else this.addMatch(n.index, i);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function kC(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let i = 0; i < n.length; i += 2) if (n[i] === t) return n[i + 1];
  }
  return null;
}
function FC(e, t) {
  return e.type & 11 ? mo(e, t) : e.type & 4 ? Bc(e, t) : null;
}
function LC(e, t, n, i) {
  return n === -1 ? FC(t, e) : n === -2 ? jC(e, t, i) : ao(e, e[Ce], n, t);
}
function jC(e, t, n) {
  if (n === Nn) return mo(t, e);
  if (n === Bi) return Bc(t, e);
  if (n === ui) return a_(t, e);
}
function c_(e, t, n, i) {
  let r = t[ii].queries[i];
  if (r.matches === null) {
    let o = e.data,
      s = n.matches,
      a = [];
    for (let c = 0; s !== null && c < s.length; c += 2) {
      let l = s[c];
      if (l < 0) a.push(null);
      else {
        let u = o[l];
        a.push(LC(t, u, s[c + 1], n.metadata.read));
      }
    }
    r.matches = a;
  }
  return r.matches;
}
function Pd(e, t, n, i) {
  let r = e.queries.getByIndex(n),
    o = r.matches;
  if (o !== null) {
    let s = c_(e, t, r, n);
    for (let a = 0; a < o.length; a += 2) {
      let c = o[a];
      if (c > 0) i.push(s[a / 2]);
      else {
        let l = o[a + 1],
          u = t[-c];
        for (let d = Xt; d < u.length; d++) {
          let p = u[d];
          p[pr] === p[Lt] && Pd(p[Ce], p, l, i);
        }
        if (u[oo] !== null) {
          let d = u[oo];
          for (let p = 0; p < d.length; p++) {
            let h = d[p];
            Pd(h[Ce], h, l, i);
          }
        }
      }
    }
  }
  return i;
}
function BC(e, t) {
  return e[ii].queries[t].queryList;
}
function VC(e, t, n) {
  let i = new md((n & 4) === 4);
  return (
    Rw(e, t, i, i.destroy), (t[ii] ??= new xd()).queries.push(new Od(i)) - 1
  );
}
function HC(e, t, n) {
  let i = Rt();
  return (
    i.firstCreatePass &&
      (UC(i, new Nd(e, t, n), -1), (t & 2) === 2 && (i.staticViewQueries = !0)),
    VC(i, xe(), t)
  );
}
function $C(e) {
  return e.split(",").map((t) => t.trim());
}
function UC(e, t, n) {
  e.queries === null && (e.queries = new Ad()), e.queries.track(new Rd(t, n));
}
function Of(e, t) {
  return e.queries.getByIndex(t);
}
function GC(e, t) {
  let n = e[Ce],
    i = Of(n, t);
  return i.crossesNgTemplate ? Pd(n, e, t, []) : c_(n, e, i, t);
}
var Wg = new Set();
function ms(e) {
  Wg.has(e) ||
    (Wg.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
function zC(e) {
  let t = [],
    n = new Map();
  function i(r) {
    let o = n.get(r);
    if (!o) {
      let s = e(r);
      n.set(r, (o = s.then(YC)));
    }
    return o;
  }
  return (
    gc.forEach((r, o) => {
      let s = [];
      r.templateUrl &&
        s.push(
          i(r.templateUrl).then((l) => {
            r.template = l;
          })
        );
      let a = typeof r.styles == "string" ? [r.styles] : r.styles || [];
      if (((r.styles = a), r.styleUrl && r.styleUrls?.length))
        throw new Error(
          "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"
        );
      if (r.styleUrls?.length) {
        let l = r.styles.length,
          u = r.styleUrls;
        r.styleUrls.forEach((d, p) => {
          a.push(""),
            s.push(
              i(d).then((h) => {
                (a[l + p] = h),
                  u.splice(u.indexOf(d), 1),
                  u.length == 0 && (r.styleUrls = void 0);
              })
            );
        });
      } else
        r.styleUrl &&
          s.push(
            i(r.styleUrl).then((l) => {
              a.push(l), (r.styleUrl = void 0);
            })
          );
      let c = Promise.all(s).then(() => QC(o));
      t.push(c);
    }),
    qC(),
    Promise.all(t).then(() => {})
  );
}
var gc = new Map(),
  WC = new Set();
function qC() {
  let e = gc;
  return (gc = new Map()), e;
}
function ZC() {
  return gc.size === 0;
}
function YC(e) {
  return typeof e == "string" ? e : e.text();
}
function QC(e) {
  WC.delete(e);
}
var Vi = class {},
  ls = class {};
var mc = class extends Vi {
    constructor(t, n, i, r = !0) {
      super(),
        (this.ngModuleType = t),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new pc(this));
      let o = vm(t);
      (this._bootstrapComponents = C0(o.bootstrap)),
        (this._r3Injector = l0(
          t,
          n,
          [
            { provide: Vi, useValue: this },
            { provide: si, useValue: this.componentFactoryResolver },
            ...i,
          ],
          Vt(t),
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
      let t = this._r3Injector;
      !t.destroyed && t.destroy(),
        this.destroyCbs.forEach((n) => n()),
        (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  _c = class extends ls {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new mc(this.moduleType, t, []);
    }
  };
function KC(e, t, n) {
  return new mc(e, t, n, !1);
}
var kd = class extends Vi {
  constructor(t) {
    super(),
      (this.componentFactoryResolver = new pc(this)),
      (this.instance = null);
    let n = new rs(
      [
        ...t.providers,
        { provide: Vi, useValue: this },
        { provide: si, useValue: this.componentFactoryResolver },
      ],
      t.parent || Kd(),
      t.debugName,
      new Set(["environment"])
    );
    (this.injector = n),
      t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function Hc(e, t, n = null) {
  return new kd({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
function l_(e, t, n) {
  return (e[t] = n);
}
function Hi(e, t, n) {
  let i = e[t];
  return Object.is(i, n) ? !1 : ((e[t] = n), !0);
}
function JC(e, t, n, i) {
  let r = Hi(e, t, n);
  return Hi(e, t + 1, i) || r;
}
function XC(e) {
  return (e.flags & 32) === 32;
}
function eE(e, t, n, i, r, o, s, a, c) {
  let l = t.consts,
    u = _o(t, e, 4, s || null, a || null);
  Ef(t, n, u, so(l, c)), Ac(t, u);
  let d = (u.tView = wf(
    2,
    u,
    i,
    r,
    o,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    l,
    null
  ));
  return (
    t.queries !== null &&
      (t.queries.template(t, u), (d.queries = t.queries.embeddedTView(u))),
    u
  );
}
function u_(e, t, n, i, r, o, s, a, c, l) {
  let u = n + Ht,
    d = t.firstCreatePass ? eE(u, t, e, i, r, o, s, a, c) : t.data[u];
  br(d, !1);
  let p = tE(t, e, d, n);
  xc() && kc(t, e, p, d), ji(p, e);
  let h = z0(p, e, p, d);
  return (
    (e[u] = h),
    jc(e, h),
    RC(h, d, e),
    Ic(d) && bf(t, e, d),
    c != null && Df(e, d, l),
    d
  );
}
function dt(e, t, n, i, r, o, s, a) {
  let c = xe(),
    l = Rt(),
    u = so(l.consts, o);
  return u_(c, l, e, t, n, i, r, u, s, a), dt;
}
var tE = nE;
function nE(e, t, n, i) {
  return Nc(!0), t[at].createComment("");
}
var ni = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(ni || {}),
  d_ = (() => {
    class e {
      constructor() {
        this.impl = null;
      }
      execute() {
        this.impl?.execute();
      }
      static {
        this.ɵprov = z({
          token: e,
          providedIn: "root",
          factory: () => new e(),
        });
      }
    }
    return e;
  })(),
  Fd = class e {
    constructor() {
      (this.ngZone = I(Oe)),
        (this.scheduler = I(co)),
        (this.errorHandler = I(ri, { optional: !0 })),
        (this.sequences = new Set()),
        (this.deferredRegistrations = new Set()),
        (this.executing = !1);
    }
    static {
      this.PHASES = [ni.EarlyRead, ni.Write, ni.MixedReadWrite, ni.Read];
    }
    execute() {
      this.executing = !0;
      for (let t of e.PHASES)
        for (let n of this.sequences)
          if (!(n.erroredOrDestroyed || !n.hooks[t]))
            try {
              n.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                n.hooks[t](n.pipelinedValue)
              );
            } catch (i) {
              (n.erroredOrDestroyed = !0), this.errorHandler?.handleError(i);
            }
      this.executing = !1;
      for (let t of this.sequences)
        t.afterRun(), t.once && (this.sequences.delete(t), t.destroy());
      for (let t of this.deferredRegistrations) this.sequences.add(t);
      this.deferredRegistrations.size > 0 && this.scheduler.notify(7),
        this.deferredRegistrations.clear();
    }
    register(t) {
      this.executing
        ? this.deferredRegistrations.add(t)
        : (this.sequences.add(t), this.scheduler.notify(6));
    }
    unregister(t) {
      this.executing && this.sequences.has(t)
        ? ((t.erroredOrDestroyed = !0),
          (t.pipelinedValue = void 0),
          (t.once = !0))
        : (this.sequences.delete(t), this.deferredRegistrations.delete(t));
    }
    static {
      this.ɵprov = z({ token: e, providedIn: "root", factory: () => new e() });
    }
  },
  Ld = class {
    constructor(t, n, i, r) {
      (this.impl = t),
        (this.hooks = n),
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
function xf(e, t) {
  !t?.injector && Mm(xf);
  let n = t?.injector ?? I(ut);
  return E0(n) ? (ms("NgAfterRender"), f_(e, n, t, !1)) : h_;
}
function _s(e, t) {
  !t?.injector && Mm(_s);
  let n = t?.injector ?? I(ut);
  return E0(n) ? (ms("NgAfterNextRender"), f_(e, n, t, !0)) : h_;
}
function iE(e, t) {
  if (e instanceof Function) {
    let n = [void 0, void 0, void 0, void 0];
    return (n[t] = e), n;
  } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read];
}
function f_(e, t, n, i) {
  let r = t.get(d_);
  r.impl ??= t.get(Fd);
  let o = n?.phase ?? ni.MixedReadWrite,
    s = n?.manualCleanup !== !0 ? t.get(Rc) : null,
    a = new Ld(r.impl, iE(e, o), i, s);
  return r.impl.register(a), a;
}
var h_ = { destroy() {} };
function p_(e, t, n, i) {
  return Hi(e, rf(), n) ? t + Ud(n) + i : qn;
}
function $a(e, t) {
  return (e << 17) | (t << 2);
}
function vr(e) {
  return (e >> 17) & 32767;
}
function rE(e) {
  return (e & 2) == 2;
}
function oE(e, t) {
  return (e & 131071) | (t << 17);
}
function jd(e) {
  return e | 2;
}
function fo(e) {
  return (e & 131068) >> 2;
}
function Yu(e, t) {
  return (e & -131069) | (t << 2);
}
function sE(e) {
  return (e & 1) === 1;
}
function Bd(e) {
  return e | 1;
}
function aE(e, t, n, i, r, o) {
  let s = o ? t.classBindings : t.styleBindings,
    a = vr(s),
    c = fo(s);
  e[i] = n;
  let l = !1,
    u;
  if (Array.isArray(n)) {
    let d = n;
    (u = d[1]), (u === null || fs(d, u) > 0) && (l = !0);
  } else u = n;
  if (r)
    if (c !== 0) {
      let p = vr(e[a + 1]);
      (e[i + 1] = $a(p, a)),
        p !== 0 && (e[p + 1] = Yu(e[p + 1], i)),
        (e[a + 1] = oE(e[a + 1], i));
    } else
      (e[i + 1] = $a(a, 0)), a !== 0 && (e[a + 1] = Yu(e[a + 1], i)), (a = i);
  else
    (e[i + 1] = $a(c, 0)),
      a === 0 ? (a = i) : (e[c + 1] = Yu(e[c + 1], i)),
      (c = i);
  l && (e[i + 1] = jd(e[i + 1])),
    qg(e, u, i, !0),
    qg(e, u, i, !1),
    cE(t, u, e, i, o),
    (s = $a(a, c)),
    o ? (t.classBindings = s) : (t.styleBindings = s);
}
function cE(e, t, n, i, r) {
  let o = r ? e.residualClasses : e.residualStyles;
  o != null &&
    typeof t == "string" &&
    fs(o, t) >= 0 &&
    (n[i + 1] = Bd(n[i + 1]));
}
function qg(e, t, n, i) {
  let r = e[n + 1],
    o = t === null,
    s = i ? vr(r) : fo(r),
    a = !1;
  for (; s !== 0 && (a === !1 || o); ) {
    let c = e[s],
      l = e[s + 1];
    lE(c, t) && ((a = !0), (e[s + 1] = i ? Bd(l) : jd(l))),
      (s = i ? vr(l) : fo(l));
  }
  a && (e[n + 1] = i ? jd(r) : Bd(r));
}
function lE(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == "string"
    ? fs(e, t) >= 0
    : !1;
}
var In = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function uE(e) {
  return e.substring(In.key, In.keyEnd);
}
function dE(e) {
  return fE(e), g_(e, m_(e, 0, In.textEnd));
}
function g_(e, t) {
  let n = In.textEnd;
  return n === t ? -1 : ((t = In.keyEnd = hE(e, (In.key = t), n)), m_(e, t, n));
}
function fE(e) {
  (In.key = 0),
    (In.keyEnd = 0),
    (In.value = 0),
    (In.valueEnd = 0),
    (In.textEnd = e.length);
}
function m_(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function hE(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function Be(e, t, n) {
  let i = xe(),
    r = rf();
  if (Hi(i, r, t)) {
    let o = Rt(),
      s = cf();
    Cf(o, s, i, e, t, i[at], n, !1);
  }
  return Be;
}
function Vd(e, t, n, i, r) {
  let o = t.inputs,
    s = r ? "class" : "style";
  Tf(e, n, o[s], s, i);
}
function yo(e, t, n) {
  return y_(e, t, n, !1), yo;
}
function wr(e, t) {
  return y_(e, t, null, !0), wr;
}
function __(e) {
  gE(DE, pE, e, !0);
}
function pE(e, t) {
  for (let n = dE(t); n >= 0; n = g_(t, n)) qd(e, uE(t), !0);
}
function y_(e, t, n, i) {
  let r = xe(),
    o = Rt(),
    s = Gm(2);
  if ((o.firstUpdatePass && b_(o, e, s, i), t !== qn && Hi(r, s, t))) {
    let a = o.data[Dr()];
    D_(o, a, r, r[at], e, (r[s + 1] = CE(t, n)), i, s);
  }
}
function gE(e, t, n, i) {
  let r = Rt(),
    o = Gm(2);
  r.firstUpdatePass && b_(r, null, o, i);
  let s = xe();
  if (n !== qn && Hi(s, o, n)) {
    let a = r.data[Dr()];
    if (w_(a, i) && !v_(r, o)) {
      let c = i ? a.classesWithoutHost : a.stylesWithoutHost;
      c !== null && (n = Ju(c, n || "")), Vd(r, a, s, n, i);
    } else wE(r, a, s, s[at], s[o + 1], (s[o + 1] = bE(e, t, n)), i, o);
  }
}
function v_(e, t) {
  return t >= e.expandoStartIndex;
}
function b_(e, t, n, i) {
  let r = e.data;
  if (r[n + 1] === null) {
    let o = r[Dr()],
      s = v_(e, n);
    w_(o, i) && t === null && !s && (t = !1),
      (t = mE(r, o, t, i)),
      aE(r, o, t, n, s, i);
  }
}
function mE(e, t, n, i) {
  let r = pD(e),
    o = i ? t.residualClasses : t.residualStyles;
  if (r === null)
    (i ? t.classBindings : t.styleBindings) === 0 &&
      ((n = Qu(null, e, t, n, i)), (n = us(n, t.attrs, i)), (o = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== r)
      if (((n = Qu(r, e, t, n, i)), o === null)) {
        let c = _E(e, t, i);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = Qu(null, e, t, c[1], i)),
          (c = us(c, t.attrs, i)),
          yE(e, t, i, c));
      } else o = vE(e, t, i);
  }
  return (
    o !== void 0 && (i ? (t.residualClasses = o) : (t.residualStyles = o)), n
  );
}
function _E(e, t, n) {
  let i = n ? t.classBindings : t.styleBindings;
  if (fo(i) !== 0) return e[vr(i)];
}
function yE(e, t, n, i) {
  let r = n ? t.classBindings : t.styleBindings;
  e[vr(r)] = i;
}
function vE(e, t, n) {
  let i,
    r = t.directiveEnd;
  for (let o = 1 + t.directiveStylingLast; o < r; o++) {
    let s = e[o].hostAttrs;
    i = us(i, s, n);
  }
  return us(i, t.attrs, n);
}
function Qu(e, t, n, i, r) {
  let o = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((o = t[a]), (i = us(i, o.hostAttrs, r)), o !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), i;
}
function us(e, t, n) {
  let i = n ? 1 : 2,
    r = -1;
  if (t !== null)
    for (let o = 0; o < t.length; o++) {
      let s = t[o];
      typeof s == "number"
        ? (r = s)
        : r === i &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          qd(e, s, n ? !0 : t[++o]));
    }
  return e === void 0 ? null : e;
}
function bE(e, t, n) {
  if (n == null || n === "") return Jt;
  let i = [],
    r = gs(n);
  if (Array.isArray(r)) for (let o = 0; o < r.length; o++) e(i, r[o], !0);
  else if (typeof r == "object")
    for (let o in r) r.hasOwnProperty(o) && e(i, o, r[o]);
  else typeof r == "string" && t(i, r);
  return i;
}
function DE(e, t, n) {
  let i = String(t);
  i !== "" && !i.includes(" ") && qd(e, i, n);
}
function wE(e, t, n, i, r, o, s, a) {
  r === qn && (r = Jt);
  let c = 0,
    l = 0,
    u = 0 < r.length ? r[0] : null,
    d = 0 < o.length ? o[0] : null;
  for (; u !== null || d !== null; ) {
    let p = c < r.length ? r[c + 1] : void 0,
      h = l < o.length ? o[l + 1] : void 0,
      D = null,
      w;
    u === d
      ? ((c += 2), (l += 2), p !== h && ((D = d), (w = h)))
      : d === null || (u !== null && u < d)
      ? ((c += 2), (D = u))
      : ((l += 2), (D = d), (w = h)),
      D !== null && D_(e, t, n, i, D, w, s, a),
      (u = c < r.length ? r[c] : null),
      (d = l < o.length ? o[l] : null);
  }
}
function D_(e, t, n, i, r, o, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    l = c[a + 1],
    u = sE(l) ? Zg(c, t, n, r, fo(l), s) : void 0;
  if (!yc(u)) {
    yc(o) || (rE(l) && (o = Zg(c, null, n, r, a, s)));
    let d = Rm(Dr(), n);
    Tw(i, s, d, r, o);
  }
}
function Zg(e, t, n, i, r, o) {
  let s = t === null,
    a;
  for (; r > 0; ) {
    let c = e[r],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      p = n[r + 1];
    p === qn && (p = d ? Jt : void 0);
    let h = d ? Vu(p, i) : u === i ? p : void 0;
    if ((l && !yc(h) && (h = Vu(c, i)), yc(h) && ((a = h), s))) return a;
    let D = e[r + 1];
    r = s ? vr(D) : fo(D);
  }
  if (t !== null) {
    let c = o ? t.residualClasses : t.residualStyles;
    c != null && (a = Vu(c, i));
  }
  return a;
}
function yc(e) {
  return e !== void 0;
}
function CE(e, t) {
  return (
    e == null ||
      e === "" ||
      (typeof t == "string"
        ? (e = e + t)
        : typeof e == "object" && (e = Vt(gs(e)))),
    e
  );
}
function w_(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
function EE(e, t, n, i, r, o) {
  let s = t.consts,
    a = so(s, r),
    c = _o(t, e, 2, i, a);
  return (
    Ef(t, n, c, so(s, o)),
    c.attrs !== null && hc(c, c.attrs, !1),
    c.mergedAttrs !== null && hc(c, c.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
function N(e, t, n, i) {
  let r = xe(),
    o = Rt(),
    s = Ht + e,
    a = r[at],
    c = o.firstCreatePass ? EE(s, o, r, t, n, i) : o.data[s],
    l = TE(o, r, c, a, t, e);
  r[s] = l;
  let u = Ic(c);
  return (
    br(c, !0),
    F0(a, l, c),
    !XC(c) && xc() && kc(o, r, l, c),
    iD() === 0 && ji(l, r),
    rD(),
    u && (bf(o, r, c), vf(o, c, r)),
    i !== null && Df(r, c),
    N
  );
}
function R() {
  let e = en();
  tf() ? nf() : ((e = e.parent), br(e, !1));
  let t = e;
  sD(t) && aD(), oD();
  let n = Rt();
  return (
    n.firstCreatePass && (Ac(n, e), Jd(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      DD(t) &&
      Vd(n, t, xe(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      wD(t) &&
      Vd(n, t, xe(), t.stylesWithoutHost, !1),
    R
  );
}
function Ne(e, t, n, i) {
  return N(e, t, n, i), R(), Ne;
}
var TE = (e, t, n, i, r, o) => (Nc(!0), T0(i, r, _D()));
function ME(e, t, n, i, r) {
  let o = t.consts,
    s = so(o, i),
    a = _o(t, e, 8, "ng-container", s);
  s !== null && hc(a, s, !0);
  let c = so(o, r);
  return Ef(t, n, a, c), t.queries !== null && t.queries.elementStart(t, a), a;
}
function Cr(e, t, n) {
  let i = xe(),
    r = Rt(),
    o = e + Ht,
    s = r.firstCreatePass ? ME(o, r, i, t, n) : r.data[o];
  br(s, !0);
  let a = IE(r, i, s, e);
  return (
    (i[o] = a),
    xc() && kc(r, i, a, s),
    ji(a, i),
    Ic(s) && (bf(r, i, s), vf(r, s, i)),
    n != null && Df(i, s),
    Cr
  );
}
function Er() {
  let e = en(),
    t = Rt();
  return (
    tf() ? nf() : ((e = e.parent), br(e, !1)),
    t.firstCreatePass && (Ac(t, e), Jd(e) && t.queries.elementEnd(e)),
    Er
  );
}
var IE = (e, t, n, i) => (Nc(!0), dw(t[at], ""));
function qt() {
  return xe();
}
function Nf(e, t, n) {
  let i = xe(),
    r = rf();
  if (Hi(i, r, t)) {
    let o = Rt(),
      s = cf();
    Cf(o, s, i, e, t, i[at], n, !0);
  }
  return Nf;
}
var dr = void 0;
function SE(e) {
  let t = e,
    n = Math.floor(Math.abs(e)),
    i = e.toString().replace(/^[^.]*\.?/, "").length;
  return n === 1 && i === 0 ? 1 : 5;
}
var OE = [
    "en",
    [["a", "p"], ["AM", "PM"], dr],
    [["AM", "PM"], dr, dr],
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
    dr,
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
    dr,
    [
      ["B", "A"],
      ["BC", "AD"],
      ["Before Christ", "Anno Domini"],
    ],
    0,
    [6, 0],
    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
    ["{1}, {0}", dr, "{1} 'at' {0}", dr],
    [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
    ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
    "USD",
    "$",
    "US Dollar",
    {},
    "ltr",
    SE,
  ],
  Ku = {};
function hn(e) {
  let t = xE(e),
    n = Yg(t);
  if (n) return n;
  let i = t.split("-")[0];
  if (((n = Yg(i)), n)) return n;
  if (i === "en") return OE;
  throw new ae(701, !1);
}
function Yg(e) {
  return (
    e in Ku ||
      (Ku[e] =
        Kt.ng &&
        Kt.ng.common &&
        Kt.ng.common.locales &&
        Kt.ng.common.locales[e]),
    Ku[e]
  );
}
var ct = (function (e) {
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
})(ct || {});
function xE(e) {
  return e.toLowerCase().replace(/_/g, "-");
}
var vc = "en-US";
var NE = vc;
function AE(e) {
  typeof e == "string" && (NE = e.toLowerCase().replace(/_/g, "-"));
}
var RE = (e, t, n) => {};
function it(e, t, n, i) {
  let r = xe(),
    o = Rt(),
    s = en();
  return kE(o, r, r[at], s, e, t, i), it;
}
function PE(e, t, n, i) {
  let r = e.cleanup;
  if (r != null)
    for (let o = 0; o < r.length - 1; o += 2) {
      let s = r[o];
      if (s === n && r[o + 1] === i) {
        let a = t[ec],
          c = r[o + 2];
        return a.length > c ? a[c] : null;
      }
      typeof s == "string" && (o += 2);
    }
  return null;
}
function kE(e, t, n, i, r, o, s) {
  let a = Ic(i),
    l = e.firstCreatePass && Z0(e),
    u = t[On],
    d = q0(t),
    p = !0;
  if (i.type & 3 || s) {
    let w = xn(i, t),
      M = s ? s(w) : w,
      P = d.length,
      S = s ? (F) => s(Wn(F[i.index])) : i.index,
      C = null;
    if ((!s && a && (C = PE(e, t, r, i.index)), C !== null)) {
      let F = C.__ngLastListenerFn__ || C;
      (F.__ngNextListenerFn__ = o), (C.__ngLastListenerFn__ = o), (p = !1);
    } else {
      (o = Kg(i, t, u, o)), RE(w, r, o);
      let F = n.listen(M, r, o);
      d.push(o, F), l && l.push(r, S, P, P + 1);
    }
  } else o = Kg(i, t, u, o);
  let h = i.outputs,
    D;
  if (p && h !== null && (D = h[r])) {
    let w = D.length;
    if (w)
      for (let M = 0; M < w; M += 2) {
        let P = D[M],
          S = D[M + 1],
          V = t[P][S].subscribe(o),
          H = d.length;
        d.push(o, V), l && l.push(r, i.index, H, -(H + 1));
      }
  }
}
function Qg(e, t, n, i) {
  let r = Fe(null);
  try {
    return $n(6, t, n), n(i) !== !1;
  } catch (o) {
    return Y0(e, o), !1;
  } finally {
    $n(7, t, n), Fe(r);
  }
}
function Kg(e, t, n, i) {
  return function r(o) {
    if (o === Function) return i;
    let s = e.componentOffset > -1 ? Ui(e.index, t) : t;
    If(s, 5);
    let a = Qg(t, n, i, o),
      c = r.__ngNextListenerFn__;
    for (; c; ) (a = Qg(t, n, c, o) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function Ue(e = 1) {
  return mD(e);
}
function FE(e, t) {
  let n = null,
    i = T1(e);
  for (let r = 0; r < t.length; r++) {
    let o = t[r];
    if (o === "*") {
      n = r;
      continue;
    }
    if (i === null ? gm(e, o, !0) : S1(i, o)) return r;
  }
  return n;
}
function vo(e) {
  let t = xe()[un][Wt];
  if (!t.projection) {
    let n = e ? e.length : 1,
      i = (t.projection = g1(n, null)),
      r = i.slice(),
      o = t.child;
    for (; o !== null; ) {
      if (o.type !== 128) {
        let s = e ? FE(o, e) : 0;
        s !== null &&
          (r[s] ? (r[s].projectionNext = o) : (i[s] = o), (r[s] = o));
      }
      o = o.next;
    }
  }
}
function bo(e, t = 0, n, i, r, o) {
  let s = xe(),
    a = Rt(),
    c = i ? e + 1 : null;
  c !== null && u_(s, a, c, i, r, o, null, n);
  let l = _o(a, Ht + e, 16, null, n || null);
  l.projection === null && (l.projection = t), nf();
  let d = !s[os] || Vm();
  s[un][Wt].projection[l.projection] === null && c !== null
    ? LE(s, a, c)
    : d && (l.flags & 32) !== 32 && Cw(a, s, l);
}
function LE(e, t, n) {
  let i = Ht + n,
    r = t.data[i],
    o = e[i],
    s = Td(o, r.tView.ssrId),
    a = Q0(e, r, void 0, { dehydratedView: s });
  K0(o, a, 0, Cd(r, s));
}
function tn(e, t, n) {
  return C_(e, "", t, "", n), tn;
}
function C_(e, t, n, i, r) {
  let o = xe(),
    s = p_(o, t, n, i);
  if (s !== qn) {
    let a = Rt(),
      c = cf();
    Cf(a, c, o, e, s, o[at], r, !1);
  }
  return C_;
}
function Af(e, t, n) {
  HC(e, t, n);
}
function $c(e) {
  let t = xe(),
    n = Rt(),
    i = zm();
  of(i + 1);
  let r = Of(n, i);
  if (e.dirty && X1(t) === ((r.metadata.flags & 2) === 2)) {
    if (r.matches === null) e.reset([]);
    else {
      let o = GC(t, i);
      e.reset(o, GD), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function Uc() {
  return BC(xe(), zm());
}
function jE(e, t, n, i) {
  n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)),
    (t[n] = i);
}
function Gc(e) {
  let t = lD();
  return Xd(t, Ht + e);
}
function re(e, t = "") {
  let n = xe(),
    i = Rt(),
    r = e + Ht,
    o = i.firstCreatePass ? _o(i, r, 1, t, null) : i.data[r],
    s = BE(i, n, o, t, e);
  (n[r] = s), xc() && kc(i, n, s, o), br(o, !1);
}
var BE = (e, t, n, i, r) => (Nc(!0), lw(t[at], i));
function rt(e) {
  return ve("", e, ""), rt;
}
function ve(e, t, n) {
  let i = xe(),
    r = p_(i, e, t, n);
  return r !== qn && Qw(i, Dr(), r), ve;
}
var VE = (() => {
  class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let i = wm(!1, n.type),
          r =
            i.length > 0
              ? Hc([i], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, r);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static {
      this.ɵprov = z({
        token: e,
        providedIn: "environment",
        factory: () => new e(W(Ft)),
      });
    }
  }
  return e;
})();
function zc(e) {
  ms("NgStandalone"),
    (e.getStandaloneInjector = (t) =>
      t.get(VE).getOrCreateStandaloneInjector(e));
}
function E_(e, t) {
  let n = e[t];
  return n === qn ? void 0 : n;
}
function HE(e, t, n, i, r, o) {
  let s = t + n;
  return Hi(e, s, r) ? l_(e, s + 1, o ? i.call(o, r) : i(r)) : E_(e, s + 1);
}
function $E(e, t, n, i, r, o, s) {
  let a = t + n;
  return JC(e, a, r, o)
    ? l_(e, a + 2, s ? i.call(s, r, o) : i(r, o))
    : E_(e, a + 2);
}
function he(e, t) {
  let n = Rt(),
    i,
    r = e + Ht;
  n.firstCreatePass
    ? ((i = UE(t, n.pipeRegistry)),
      (n.data[r] = i),
      i.onDestroy && (n.destroyHooks ??= []).push(r, i.onDestroy))
    : (i = n.data[r]);
  let o = i.factory || (i.factory = hr(i.type, !0)),
    s,
    a = zt(Je);
  try {
    let c = oc(!1),
      l = o();
    return oc(c), jE(n, xe(), r, l), l;
  } finally {
    zt(a);
  }
}
function UE(e, t) {
  if (t)
    for (let n = t.length - 1; n >= 0; n--) {
      let i = t[n];
      if (e === i.name) return i;
    }
}
function Ae(e, t, n) {
  let i = e + Ht,
    r = xe(),
    o = Xd(r, i);
  return T_(r, i) ? HE(r, Um(), t, o.transform, n, o) : o.transform(n);
}
function Zt(e, t, n, i) {
  let r = e + Ht,
    o = xe(),
    s = Xd(o, r);
  return T_(o, r) ? $E(o, Um(), t, s.transform, n, i, s) : s.transform(n, i);
}
function T_(e, t) {
  return e[Ce].data[t].pure;
}
function Wc(e, t) {
  return Bc(e, t);
}
var Ua = null;
function GE(e) {
  (Ua !== null &&
    (e.defaultEncapsulation !== Ua.defaultEncapsulation ||
      e.preserveWhitespaces !== Ua.preserveWhitespaces)) ||
    (Ua = e);
}
var qc = (() => {
  class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "platform" });
    }
  }
  return e;
})();
var Rf = new Y(""),
  ys = new Y(""),
  Zc = (() => {
    class e {
      constructor(n, i, r) {
        (this._ngZone = n),
          (this.registry = i),
          (this._isZoneStable = !0),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          Pf || (zE(r), r.addToWindow(i)),
          this._watchAngularEvents(),
          n.run(() => {
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
                Oe.assertNotInAngularZone(),
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
              let n = this._callbacks.pop();
              clearTimeout(n.timeoutId), n.doneCb();
            }
          });
        else {
          let n = this.getPendingTasks();
          this._callbacks = this._callbacks.filter((i) =>
            i.updateCb && i.updateCb(n) ? (clearTimeout(i.timeoutId), !1) : !0
          );
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((n) => ({
              source: n.source,
              creationLocation: n.creationLocation,
              data: n.data,
            }))
          : [];
      }
      addCallback(n, i, r) {
        let o = -1;
        i &&
          i > 0 &&
          (o = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (s) => s.timeoutId !== o
            )),
              n();
          }, i)),
          this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: r });
      }
      whenStable(n, i, r) {
        if (r && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(n, i, r), this._runCallbacksIfReady();
      }
      registerApplication(n) {
        this.registry.registerApplication(n, this);
      }
      unregisterApplication(n) {
        this.registry.unregisterApplication(n);
      }
      findProviders(n, i, r) {
        return [];
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(Oe), W(Yc), W(ys));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Yc = (() => {
    class e {
      constructor() {
        this._applications = new Map();
      }
      registerApplication(n, i) {
        this._applications.set(n, i);
      }
      unregisterApplication(n) {
        this._applications.delete(n);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(n) {
        return this._applications.get(n) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(n, i = !0) {
        return Pf?.findTestabilityInTree(this, n, i) ?? null;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })();
function zE(e) {
  Pf = e;
}
var Pf;
function vs(e) {
  return !!e && typeof e.then == "function";
}
function M_(e) {
  return !!e && typeof e.subscribe == "function";
}
var Qc = new Y(""),
  I_ = (() => {
    class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, i) => {
            (this.resolve = n), (this.reject = i);
          })),
          (this.appInits = I(Qc, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let r of this.appInits) {
          let o = r();
          if (vs(o)) n.push(o);
          else if (M_(o)) {
            let s = new Promise((a, c) => {
              o.subscribe({ complete: a, error: c });
            });
            n.push(s);
          }
        }
        let i = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            i();
          })
          .catch((r) => {
            this.reject(r);
          }),
          n.length === 0 && i(),
          (this.initialized = !0);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Kc = new Y("");
function WE() {
  Gp(() => {
    throw new ae(600, !1);
  });
}
function qE(e) {
  return e.isBoundToModule;
}
var ZE = 10;
function YE(e, t, n) {
  try {
    let i = n();
    return vs(i)
      ? i.catch((r) => {
          throw (t.runOutsideAngular(() => e.handleError(r)), r);
        })
      : i;
  } catch (i) {
    throw (t.runOutsideAngular(() => e.handleError(i)), i);
  }
}
function S_(e, t) {
  return Array.isArray(t) ? t.reduce(S_, e) : G(G({}, e), t);
}
var nn = (() => {
  class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = I($D)),
        (this.afterRenderManager = I(d_)),
        (this.zonelessEnabled = I(Sf)),
        (this.dirtyFlags = 0),
        (this.deferredDirtyFlags = 0),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new tt()),
        (this.afterTick = new tt()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = I(li).hasPendingTasks.pipe(ue((n) => !n))),
        (this._injector = I(Ft));
    }
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    whenStable() {
      let n;
      return new Promise((i) => {
        n = this.isStable.subscribe({
          next: (r) => {
            r && i();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, i) {
      let r = n instanceof fc;
      if (!this._injector.get(I_).done) {
        let p = !r && ym(n),
          h = !1;
        throw new ae(405, h);
      }
      let s;
      r ? (s = n) : (s = this._injector.get(si).resolveComponentFactory(n)),
        this.componentTypes.push(s.componentType);
      let a = qE(s) ? void 0 : this._injector.get(Vi),
        c = i || s.selector,
        l = s.create(ut.NULL, [], c, a),
        u = l.location.nativeElement,
        d = l.injector.get(Rf, null);
      return (
        d?.registerApplication(u),
        l.onDestroy(() => {
          this.detachView(l.hostView),
            Ya(this.components, l),
            d?.unregisterApplication(u);
        }),
        this._loadComponent(l),
        l
      );
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      if (this._runningTick) throw new ae(101, !1);
      let n = Fe(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (i) {
        this.internalErrorHandler(i);
      } finally {
        (this._runningTick = !1), Fe(n), this.afterTick.next();
      }
    }
    synchronize() {
      let n = null;
      this._injector.destroyed ||
        (n = this._injector.get(lo, null, { optional: !0 })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let i = 0;
      for (; this.dirtyFlags !== 0 && i++ < ZE; ) this.synchronizeOnce(n);
    }
    synchronizeOnce(n) {
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
          QE(r, o, i, this.zonelessEnabled);
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 7)
        )
          return;
      } else n?.begin?.(), n?.end?.();
      this.dirtyFlags & 8 &&
        ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => Sc(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let i = n;
      this._views.push(i), i.attachToAppRef(this);
    }
    detachView(n) {
      let i = n;
      Ya(this._views, i), i.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let i = this._injector.get(Kc, []);
      [...this._bootstrapListeners, ...i].forEach((r) => r(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Ya(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new ae(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
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
      this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function Ya(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function QE(e, t, n, i) {
  if (!n && !Sc(e)) return;
  e_(e, t, n && !i ? 0 : 1);
}
var Hd = class {
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  Jc = (() => {
    class e {
      compileModuleSync(n) {
        return new _c(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let i = this.compileModuleSync(n),
          r = vm(n),
          o = C0(r.declarations).reduce((s, a) => {
            let c = Li(a);
            return c && s.push(new uo(c)), s;
          }, []);
        return new Hd(i, o);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  KE = new Y("");
function JE(e, t, n) {
  let i = new _c(n);
  return Promise.resolve(i);
}
function Jg(e) {
  for (let t = e.length - 1; t >= 0; t--) if (e[t] !== void 0) return e[t];
}
var XE = (() => {
  class e {
    constructor() {
      (this.zone = I(Oe)),
        (this.changeDetectionScheduler = I(co)),
        (this.applicationRef = I(nn));
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
      this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function eT({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: t,
  scheduleInRootZone: n,
}) {
  return (
    (e ??= () => new Oe(We(G({}, O_()), { scheduleInRootZone: n }))),
    [
      { provide: Oe, useFactory: e },
      {
        provide: io,
        multi: !0,
        useFactory: () => {
          let i = I(XE, { optional: !0 });
          return () => i.initialize();
        },
      },
      {
        provide: io,
        multi: !0,
        useFactory: () => {
          let i = I(tT);
          return () => {
            i.initialize();
          };
        },
      },
      t === !0 ? { provide: r_, useValue: !0 } : [],
      { provide: o_, useValue: n ?? u0 },
    ]
  );
}
function O_(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var tT = (() => {
  class e {
    constructor() {
      (this.subscription = new nt()),
        (this.initialized = !1),
        (this.zone = I(Oe)),
        (this.pendingTasks = I(li));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              Oe.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            Oe.assertInAngularZone(), (n ??= this.pendingTasks.add());
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
      this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var nT = (() => {
  class e {
    constructor() {
      (this.appRef = I(nn)),
        (this.taskService = I(li)),
        (this.ngZone = I(Oe)),
        (this.zonelessEnabled = I(Sf)),
        (this.disableScheduling = I(r_, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new nt()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(ac)
          : null),
        (this.scheduleInRootZone =
          !this.zonelessEnabled &&
          this.zoneIsDefined &&
          (I(o_, { optional: !0 }) ?? !1)),
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
          (this.ngZone instanceof cc || !this.zoneIsDefined));
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      switch (n) {
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
      let i = this.useMicrotaskScheduler ? Fg : d0;
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
          Zone.current.get(ac + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (i) {
        throw (this.taskService.remove(n), i);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        Fg(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(n);
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
        let n = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(n);
      }
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)();
      };
    }
    static {
      this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function iT() {
  return (typeof $localize < "u" && $localize.locale) || vc;
}
var bs = new Y("", {
  providedIn: "root",
  factory: () => I(bs, Ee.Optional | Ee.SkipSelf) || iT(),
});
var bc = new Y("");
function Ga(e) {
  return !e.moduleRef;
}
function rT(e) {
  let t = Ga(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(Oe);
  return n.run(() => {
    Ga(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let i = t.get(ri, null),
      r;
    if (
      (n.runOutsideAngular(() => {
        r = n.onError.subscribe({
          next: (o) => {
            i.handleError(o);
          },
        });
      }),
      Ga(e))
    ) {
      let o = () => t.destroy(),
        s = e.platformInjector.get(bc);
      s.add(o),
        t.onDestroy(() => {
          r.unsubscribe(), s.delete(o);
        });
    } else {
      let o = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(bc);
      s.add(o),
        e.moduleRef.onDestroy(() => {
          Ya(e.allPlatformModules, e.moduleRef), r.unsubscribe(), s.delete(o);
        });
    }
    return YE(i, n, () => {
      let o = t.get(I_);
      return (
        o.runInitializers(),
        o.donePromise.then(() => {
          let s = t.get(bs, vc);
          if ((AE(s || vc), Ga(e))) {
            let a = t.get(nn);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return oT(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function oT(e, t) {
  let n = e.injector.get(nn);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((i) => n.bootstrap(i));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
  else throw new ae(-403, !1);
  t.push(e);
}
var x_ = (() => {
    class e {
      constructor(n) {
        (this._injector = n),
          (this._modules = []),
          (this._destroyListeners = []),
          (this._destroyed = !1);
      }
      bootstrapModuleFactory(n, i) {
        let r = i?.scheduleInRootZone,
          o = () =>
            HD(
              i?.ngZone,
              We(
                G(
                  {},
                  O_({
                    eventCoalescing: i?.ngZoneEventCoalescing,
                    runCoalescing: i?.ngZoneRunCoalescing,
                  })
                ),
                { scheduleInRootZone: r }
              )
            ),
          s = i?.ignoreChangesOutsideZone,
          a = [
            eT({ ngZoneFactory: o, ignoreChangesOutsideZone: s }),
            { provide: co, useExisting: nT },
          ],
          c = KC(n.moduleType, this.injector, a);
        return rT({
          moduleRef: c,
          allPlatformModules: this._modules,
          platformInjector: this.injector,
        });
      }
      bootstrapModule(n, i = []) {
        let r = S_({}, i);
        return JE(this.injector, r, n).then((o) =>
          this.bootstrapModuleFactory(o, r)
        );
      }
      onDestroy(n) {
        this._destroyListeners.push(n);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new ae(404, !1);
        this._modules.slice().forEach((i) => i.destroy()),
          this._destroyListeners.forEach((i) => i());
        let n = this._injector.get(bc, null);
        n && (n.forEach((i) => i()), n.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(ut));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })(),
  ts = null,
  N_ = new Y("");
function sT(e) {
  if (ts && !ts.get(N_, !1)) throw new ae(400, !1);
  WE(), (ts = e);
  let t = e.get(x_);
  return lT(e), t;
}
function kf(e, t, n = []) {
  let i = `Platform: ${t}`,
    r = new Y(i);
  return (o = []) => {
    let s = A_();
    if (!s || s.injector.get(N_, !1)) {
      let a = [...n, ...o, { provide: r, useValue: !0 }];
      e ? e(a) : sT(aT(a, i));
    }
    return cT(r);
  };
}
function aT(e = [], t) {
  return ut.create({
    name: t,
    providers: [
      { provide: Ec, useValue: "platform" },
      { provide: bc, useValue: new Set([() => (ts = null)]) },
      ...e,
    ],
  });
}
function cT(e) {
  let t = A_();
  if (!t) throw new ae(401, !1);
  return t;
}
function A_() {
  return ts?.get(x_) ?? null;
}
function lT(e) {
  e.get(ff, null)?.forEach((n) => n());
}
var pn = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = uT;
    }
  }
  return e;
})();
function uT(e) {
  return dT(en(), xe(), (e & 16) === 16);
}
function dT(e, t, n) {
  if (Mc(e) && !n) {
    let i = Ui(e.index, t);
    return new yr(i, i);
  } else if (e.type & 175) {
    let i = t[un];
    return new yr(i, t);
  }
  return null;
}
var R_ = kf(null, "core", []),
  P_ = (() => {
    class e {
      constructor(n) {}
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(nn));
        };
      }
      static {
        this.ɵmod = It({ type: e });
      }
      static {
        this.ɵinj = Mt({});
      }
    }
    return e;
  })();
function k_(e) {
  let t = Li(e);
  if (!t) return null;
  let n = new uo(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    },
  };
}
var $_ = null;
function Tr() {
  return $_;
}
function U_(e) {
  $_ ??= e;
}
var al = class {};
var ht = new Y(""),
  Gf = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({
          token: e,
          factory: () => I(gT),
          providedIn: "platform",
        });
      }
    }
    return e;
  })(),
  G_ = new Y(""),
  gT = (() => {
    class e extends Gf {
      constructor() {
        super(),
          (this._doc = I(ht)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return Tr().getBaseHref(this._doc);
      }
      onPopState(n) {
        let i = Tr().getGlobalEventTarget(this._doc, "window");
        return (
          i.addEventListener("popstate", n, !1),
          () => i.removeEventListener("popstate", n)
        );
      }
      onHashChange(n) {
        let i = Tr().getGlobalEventTarget(this._doc, "window");
        return (
          i.addEventListener("hashchange", n, !1),
          () => i.removeEventListener("hashchange", n)
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
      set pathname(n) {
        this._location.pathname = n;
      }
      pushState(n, i, r) {
        this._history.pushState(n, i, r);
      }
      replaceState(n, i, r) {
        this._history.replaceState(n, i, r);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(n = 0) {
        this._history.go(n);
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
        this.ɵprov = z({
          token: e,
          factory: () => new e(),
          providedIn: "platform",
        });
      }
    }
    return e;
  })();
function zf(e, t) {
  if (e.length == 0) return t;
  if (t.length == 0) return e;
  let n = 0;
  return (
    e.endsWith("/") && n++,
    t.startsWith("/") && n++,
    n == 2 ? e + t.substring(1) : n == 1 ? e + t : e + "/" + t
  );
}
function F_(e) {
  let t = e.match(/#|\?|$/),
    n = (t && t.index) || e.length,
    i = n - (e[n - 1] === "/" ? 1 : 0);
  return e.slice(0, i) + e.slice(n);
}
function fi(e) {
  return e && e[0] !== "?" ? "?" + e : e;
}
var Mr = (() => {
    class e {
      historyGo(n) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: () => I(Wf), providedIn: "root" });
      }
    }
    return e;
  })(),
  z_ = new Y(""),
  Wf = (() => {
    class e extends Mr {
      constructor(n, i) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            i ??
            this._platformLocation.getBaseHrefFromDOM() ??
            I(ht).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return zf(this._baseHref, n);
      }
      path(n = !1) {
        let i =
            this._platformLocation.pathname + fi(this._platformLocation.search),
          r = this._platformLocation.hash;
        return r && n ? `${i}${r}` : i;
      }
      pushState(n, i, r, o) {
        let s = this.prepareExternalUrl(r + fi(o));
        this._platformLocation.pushState(n, i, s);
      }
      replaceState(n, i, r, o) {
        let s = this.prepareExternalUrl(r + fi(o));
        this._platformLocation.replaceState(n, i, s);
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
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(Gf), W(z_, 8));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  W_ = (() => {
    class e extends Mr {
      constructor(n, i) {
        super(),
          (this._platformLocation = n),
          (this._baseHref = ""),
          (this._removeListenerFns = []),
          i != null && (this._baseHref = i);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(n = !1) {
        let i = this._platformLocation.hash ?? "#";
        return i.length > 0 ? i.substring(1) : i;
      }
      prepareExternalUrl(n) {
        let i = zf(this._baseHref, n);
        return i.length > 0 ? "#" + i : i;
      }
      pushState(n, i, r, o) {
        let s = this.prepareExternalUrl(r + fi(o));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.pushState(n, i, s);
      }
      replaceState(n, i, r, o) {
        let s = this.prepareExternalUrl(r + fi(o));
        s.length == 0 && (s = this._platformLocation.pathname),
          this._platformLocation.replaceState(n, i, s);
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
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(Gf), W(z_, 8));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  wo = (() => {
    class e {
      constructor(n) {
        (this._subject = new $e()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = n);
        let i = this._locationStrategy.getBaseHref();
        (this._basePath = yT(F_(L_(i)))),
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
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, i = "") {
        return this.path() == this.normalize(n + fi(i));
      }
      normalize(n) {
        return e.stripTrailingSlash(_T(this._basePath, L_(n)));
      }
      prepareExternalUrl(n) {
        return (
          n && n[0] !== "/" && (n = "/" + n),
          this._locationStrategy.prepareExternalUrl(n)
        );
      }
      go(n, i = "", r = null) {
        this._locationStrategy.pushState(r, "", n, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + fi(i)), r);
      }
      replaceState(n, i = "", r = null) {
        this._locationStrategy.replaceState(r, "", n, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + fi(i)), r);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          (this._urlChangeSubscription ??= this.subscribe((i) => {
            this._notifyUrlChangeListeners(i.url, i.state);
          })),
          () => {
            let i = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(i, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = "", i) {
        this._urlChangeListeners.forEach((r) => r(n, i));
      }
      subscribe(n, i, r) {
        return this._subject.subscribe({ next: n, error: i, complete: r });
      }
      static {
        this.normalizeQueryParams = fi;
      }
      static {
        this.joinWithSlash = zf;
      }
      static {
        this.stripTrailingSlash = F_;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(Mr));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: () => mT(), providedIn: "root" });
      }
    }
    return e;
  })();
function mT() {
  return new wo(W(Mr));
}
function _T(e, t) {
  if (!e || !t.startsWith(e)) return t;
  let n = t.substring(e.length);
  return n === "" || ["/", ";", "?", "#"].includes(n[0]) ? n : t;
}
function L_(e) {
  return e.replace(/\/index.html$/, "");
}
function yT(e) {
  if (new RegExp("^(https?:)?//").test(e)) {
    let [, n] = e.split(/\/\/[^\/]+/);
    return n;
  }
  return e;
}
var $t = (function (e) {
    return (
      (e[(e.Format = 0)] = "Format"), (e[(e.Standalone = 1)] = "Standalone"), e
    );
  })($t || {}),
  ze = (function (e) {
    return (
      (e[(e.Narrow = 0)] = "Narrow"),
      (e[(e.Abbreviated = 1)] = "Abbreviated"),
      (e[(e.Wide = 2)] = "Wide"),
      (e[(e.Short = 3)] = "Short"),
      e
    );
  })(ze || {}),
  rn = (function (e) {
    return (
      (e[(e.Short = 0)] = "Short"),
      (e[(e.Medium = 1)] = "Medium"),
      (e[(e.Long = 2)] = "Long"),
      (e[(e.Full = 3)] = "Full"),
      e
    );
  })(rn || {}),
  zi = {
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
function vT(e) {
  return hn(e)[ct.LocaleId];
}
function bT(e, t, n) {
  let i = hn(e),
    r = [i[ct.DayPeriodsFormat], i[ct.DayPeriodsStandalone]],
    o = gn(r, t);
  return gn(o, n);
}
function DT(e, t, n) {
  let i = hn(e),
    r = [i[ct.DaysFormat], i[ct.DaysStandalone]],
    o = gn(r, t);
  return gn(o, n);
}
function wT(e, t, n) {
  let i = hn(e),
    r = [i[ct.MonthsFormat], i[ct.MonthsStandalone]],
    o = gn(r, t);
  return gn(o, n);
}
function CT(e, t) {
  let i = hn(e)[ct.Eras];
  return gn(i, t);
}
function Xc(e, t) {
  let n = hn(e);
  return gn(n[ct.DateFormat], t);
}
function el(e, t) {
  let n = hn(e);
  return gn(n[ct.TimeFormat], t);
}
function tl(e, t) {
  let i = hn(e)[ct.DateTimeFormat];
  return gn(i, t);
}
function ll(e, t) {
  let n = hn(e),
    i = n[ct.NumberSymbols][t];
  if (typeof i > "u") {
    if (t === zi.CurrencyDecimal) return n[ct.NumberSymbols][zi.Decimal];
    if (t === zi.CurrencyGroup) return n[ct.NumberSymbols][zi.Group];
  }
  return i;
}
function q_(e) {
  if (!e[ct.ExtraData])
    throw new Error(
      `Missing extra locale data for the locale "${
        e[ct.LocaleId]
      }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
    );
}
function ET(e) {
  let t = hn(e);
  return (
    q_(t),
    (t[ct.ExtraData][2] || []).map((i) =>
      typeof i == "string" ? Ff(i) : [Ff(i[0]), Ff(i[1])]
    )
  );
}
function TT(e, t, n) {
  let i = hn(e);
  q_(i);
  let r = [i[ct.ExtraData][0], i[ct.ExtraData][1]],
    o = gn(r, t) || [];
  return gn(o, n) || [];
}
function gn(e, t) {
  for (let n = t; n > -1; n--) if (typeof e[n] < "u") return e[n];
  throw new Error("Locale data API: locale data undefined");
}
function Ff(e) {
  let [t, n] = e.split(":");
  return { hours: +t, minutes: +n };
}
var MT =
    /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
  nl = {},
  IT =
    /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
  hi = (function (e) {
    return (
      (e[(e.Short = 0)] = "Short"),
      (e[(e.ShortGMT = 1)] = "ShortGMT"),
      (e[(e.Long = 2)] = "Long"),
      (e[(e.Extended = 3)] = "Extended"),
      e
    );
  })(hi || {}),
  je = (function (e) {
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
  })(je || {}),
  Le = (function (e) {
    return (
      (e[(e.DayPeriods = 0)] = "DayPeriods"),
      (e[(e.Days = 1)] = "Days"),
      (e[(e.Months = 2)] = "Months"),
      (e[(e.Eras = 3)] = "Eras"),
      e
    );
  })(Le || {});
function Z_(e, t, n, i) {
  let r = FT(e);
  t = di(n, t) || t;
  let s = [],
    a;
  for (; t; )
    if (((a = IT.exec(t)), a)) {
      s = s.concat(a.slice(1));
      let u = s.pop();
      if (!u) break;
      t = u;
    } else {
      s.push(t);
      break;
    }
  let c = r.getTimezoneOffset();
  i && ((c = Q_(i, c)), (r = kT(r, i, !0)));
  let l = "";
  return (
    s.forEach((u) => {
      let d = RT(u);
      l += d
        ? d(r, n, c)
        : u === "''"
        ? "'"
        : u.replace(/(^'|'$)/g, "").replace(/''/g, "'");
    }),
    l
  );
}
function cl(e, t, n) {
  let i = new Date(0);
  return i.setFullYear(e, t, n), i.setHours(0, 0, 0), i;
}
function di(e, t) {
  let n = vT(e);
  if (((nl[n] ??= {}), nl[n][t])) return nl[n][t];
  let i = "";
  switch (t) {
    case "shortDate":
      i = Xc(e, rn.Short);
      break;
    case "mediumDate":
      i = Xc(e, rn.Medium);
      break;
    case "longDate":
      i = Xc(e, rn.Long);
      break;
    case "fullDate":
      i = Xc(e, rn.Full);
      break;
    case "shortTime":
      i = el(e, rn.Short);
      break;
    case "mediumTime":
      i = el(e, rn.Medium);
      break;
    case "longTime":
      i = el(e, rn.Long);
      break;
    case "fullTime":
      i = el(e, rn.Full);
      break;
    case "short":
      let r = di(e, "shortTime"),
        o = di(e, "shortDate");
      i = il(tl(e, rn.Short), [r, o]);
      break;
    case "medium":
      let s = di(e, "mediumTime"),
        a = di(e, "mediumDate");
      i = il(tl(e, rn.Medium), [s, a]);
      break;
    case "long":
      let c = di(e, "longTime"),
        l = di(e, "longDate");
      i = il(tl(e, rn.Long), [c, l]);
      break;
    case "full":
      let u = di(e, "fullTime"),
        d = di(e, "fullDate");
      i = il(tl(e, rn.Full), [u, d]);
      break;
  }
  return i && (nl[n][t] = i), i;
}
function il(e, t) {
  return (
    t &&
      (e = e.replace(/\{([^}]+)}/g, function (n, i) {
        return t != null && i in t ? t[i] : n;
      })),
    e
  );
}
function Rn(e, t, n = "-", i, r) {
  let o = "";
  (e < 0 || (r && e <= 0)) && (r ? (e = -e + 1) : ((e = -e), (o = n)));
  let s = String(e);
  for (; s.length < t; ) s = "0" + s;
  return i && (s = s.slice(s.length - t)), o + s;
}
function ST(e, t) {
  return Rn(e, 3).substring(0, t);
}
function ft(e, t, n = 0, i = !1, r = !1) {
  return function (o, s) {
    let a = OT(e, o);
    if (((n > 0 || a > -n) && (a += n), e === je.Hours))
      a === 0 && n === -12 && (a = 12);
    else if (e === je.FractionalSeconds) return ST(a, t);
    let c = ll(s, zi.MinusSign);
    return Rn(a, t, c, i, r);
  };
}
function OT(e, t) {
  switch (e) {
    case je.FullYear:
      return t.getFullYear();
    case je.Month:
      return t.getMonth();
    case je.Date:
      return t.getDate();
    case je.Hours:
      return t.getHours();
    case je.Minutes:
      return t.getMinutes();
    case je.Seconds:
      return t.getSeconds();
    case je.FractionalSeconds:
      return t.getMilliseconds();
    case je.Day:
      return t.getDay();
    default:
      throw new Error(`Unknown DateType value "${e}".`);
  }
}
function Ze(e, t, n = $t.Format, i = !1) {
  return function (r, o) {
    return xT(r, o, e, t, n, i);
  };
}
function xT(e, t, n, i, r, o) {
  switch (n) {
    case Le.Months:
      return wT(t, r, i)[e.getMonth()];
    case Le.Days:
      return DT(t, r, i)[e.getDay()];
    case Le.DayPeriods:
      let s = e.getHours(),
        a = e.getMinutes();
      if (o) {
        let l = ET(t),
          u = TT(t, r, i),
          d = l.findIndex((p) => {
            if (Array.isArray(p)) {
              let [h, D] = p,
                w = s >= h.hours && a >= h.minutes,
                M = s < D.hours || (s === D.hours && a < D.minutes);
              if (h.hours < D.hours) {
                if (w && M) return !0;
              } else if (w || M) return !0;
            } else if (p.hours === s && p.minutes === a) return !0;
            return !1;
          });
        if (d !== -1) return u[d];
      }
      return bT(t, r, i)[s < 12 ? 0 : 1];
    case Le.Eras:
      return CT(t, i)[e.getFullYear() <= 0 ? 0 : 1];
    default:
      let c = n;
      throw new Error(`unexpected translation type ${c}`);
  }
}
function rl(e) {
  return function (t, n, i) {
    let r = -1 * i,
      o = ll(n, zi.MinusSign),
      s = r > 0 ? Math.floor(r / 60) : Math.ceil(r / 60);
    switch (e) {
      case hi.Short:
        return (r >= 0 ? "+" : "") + Rn(s, 2, o) + Rn(Math.abs(r % 60), 2, o);
      case hi.ShortGMT:
        return "GMT" + (r >= 0 ? "+" : "") + Rn(s, 1, o);
      case hi.Long:
        return (
          "GMT" +
          (r >= 0 ? "+" : "") +
          Rn(s, 2, o) +
          ":" +
          Rn(Math.abs(r % 60), 2, o)
        );
      case hi.Extended:
        return i === 0
          ? "Z"
          : (r >= 0 ? "+" : "") +
              Rn(s, 2, o) +
              ":" +
              Rn(Math.abs(r % 60), 2, o);
      default:
        throw new Error(`Unknown zone width "${e}"`);
    }
  };
}
var NT = 0,
  sl = 4;
function AT(e) {
  let t = cl(e, NT, 1).getDay();
  return cl(e, 0, 1 + (t <= sl ? sl : sl + 7) - t);
}
function Y_(e) {
  let t = e.getDay(),
    n = t === 0 ? -3 : sl - t;
  return cl(e.getFullYear(), e.getMonth(), e.getDate() + n);
}
function Lf(e, t = !1) {
  return function (n, i) {
    let r;
    if (t) {
      let o = new Date(n.getFullYear(), n.getMonth(), 1).getDay() - 1,
        s = n.getDate();
      r = 1 + Math.floor((s + o) / 7);
    } else {
      let o = Y_(n),
        s = AT(o.getFullYear()),
        a = o.getTime() - s.getTime();
      r = 1 + Math.round(a / 6048e5);
    }
    return Rn(r, e, ll(i, zi.MinusSign));
  };
}
function ol(e, t = !1) {
  return function (n, i) {
    let o = Y_(n).getFullYear();
    return Rn(o, e, ll(i, zi.MinusSign), t);
  };
}
var jf = {};
function RT(e) {
  if (jf[e]) return jf[e];
  let t;
  switch (e) {
    case "G":
    case "GG":
    case "GGG":
      t = Ze(Le.Eras, ze.Abbreviated);
      break;
    case "GGGG":
      t = Ze(Le.Eras, ze.Wide);
      break;
    case "GGGGG":
      t = Ze(Le.Eras, ze.Narrow);
      break;
    case "y":
      t = ft(je.FullYear, 1, 0, !1, !0);
      break;
    case "yy":
      t = ft(je.FullYear, 2, 0, !0, !0);
      break;
    case "yyy":
      t = ft(je.FullYear, 3, 0, !1, !0);
      break;
    case "yyyy":
      t = ft(je.FullYear, 4, 0, !1, !0);
      break;
    case "Y":
      t = ol(1);
      break;
    case "YY":
      t = ol(2, !0);
      break;
    case "YYY":
      t = ol(3);
      break;
    case "YYYY":
      t = ol(4);
      break;
    case "M":
    case "L":
      t = ft(je.Month, 1, 1);
      break;
    case "MM":
    case "LL":
      t = ft(je.Month, 2, 1);
      break;
    case "MMM":
      t = Ze(Le.Months, ze.Abbreviated);
      break;
    case "MMMM":
      t = Ze(Le.Months, ze.Wide);
      break;
    case "MMMMM":
      t = Ze(Le.Months, ze.Narrow);
      break;
    case "LLL":
      t = Ze(Le.Months, ze.Abbreviated, $t.Standalone);
      break;
    case "LLLL":
      t = Ze(Le.Months, ze.Wide, $t.Standalone);
      break;
    case "LLLLL":
      t = Ze(Le.Months, ze.Narrow, $t.Standalone);
      break;
    case "w":
      t = Lf(1);
      break;
    case "ww":
      t = Lf(2);
      break;
    case "W":
      t = Lf(1, !0);
      break;
    case "d":
      t = ft(je.Date, 1);
      break;
    case "dd":
      t = ft(je.Date, 2);
      break;
    case "c":
    case "cc":
      t = ft(je.Day, 1);
      break;
    case "ccc":
      t = Ze(Le.Days, ze.Abbreviated, $t.Standalone);
      break;
    case "cccc":
      t = Ze(Le.Days, ze.Wide, $t.Standalone);
      break;
    case "ccccc":
      t = Ze(Le.Days, ze.Narrow, $t.Standalone);
      break;
    case "cccccc":
      t = Ze(Le.Days, ze.Short, $t.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      t = Ze(Le.Days, ze.Abbreviated);
      break;
    case "EEEE":
      t = Ze(Le.Days, ze.Wide);
      break;
    case "EEEEE":
      t = Ze(Le.Days, ze.Narrow);
      break;
    case "EEEEEE":
      t = Ze(Le.Days, ze.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      t = Ze(Le.DayPeriods, ze.Abbreviated);
      break;
    case "aaaa":
      t = Ze(Le.DayPeriods, ze.Wide);
      break;
    case "aaaaa":
      t = Ze(Le.DayPeriods, ze.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      t = Ze(Le.DayPeriods, ze.Abbreviated, $t.Standalone, !0);
      break;
    case "bbbb":
      t = Ze(Le.DayPeriods, ze.Wide, $t.Standalone, !0);
      break;
    case "bbbbb":
      t = Ze(Le.DayPeriods, ze.Narrow, $t.Standalone, !0);
      break;
    case "B":
    case "BB":
    case "BBB":
      t = Ze(Le.DayPeriods, ze.Abbreviated, $t.Format, !0);
      break;
    case "BBBB":
      t = Ze(Le.DayPeriods, ze.Wide, $t.Format, !0);
      break;
    case "BBBBB":
      t = Ze(Le.DayPeriods, ze.Narrow, $t.Format, !0);
      break;
    case "h":
      t = ft(je.Hours, 1, -12);
      break;
    case "hh":
      t = ft(je.Hours, 2, -12);
      break;
    case "H":
      t = ft(je.Hours, 1);
      break;
    case "HH":
      t = ft(je.Hours, 2);
      break;
    case "m":
      t = ft(je.Minutes, 1);
      break;
    case "mm":
      t = ft(je.Minutes, 2);
      break;
    case "s":
      t = ft(je.Seconds, 1);
      break;
    case "ss":
      t = ft(je.Seconds, 2);
      break;
    case "S":
      t = ft(je.FractionalSeconds, 1);
      break;
    case "SS":
      t = ft(je.FractionalSeconds, 2);
      break;
    case "SSS":
      t = ft(je.FractionalSeconds, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      t = rl(hi.Short);
      break;
    case "ZZZZZ":
      t = rl(hi.Extended);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      t = rl(hi.ShortGMT);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      t = rl(hi.Long);
      break;
    default:
      return null;
  }
  return (jf[e] = t), t;
}
function Q_(e, t) {
  e = e.replace(/:/g, "");
  let n = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
  return isNaN(n) ? t : n;
}
function PT(e, t) {
  return (e = new Date(e.getTime())), e.setMinutes(e.getMinutes() + t), e;
}
function kT(e, t, n) {
  let i = n ? -1 : 1,
    r = e.getTimezoneOffset(),
    o = Q_(t, r);
  return PT(e, i * (o - r));
}
function FT(e) {
  if (j_(e)) return e;
  if (typeof e == "number" && !isNaN(e)) return new Date(e);
  if (typeof e == "string") {
    if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
      let [r, o = 1, s = 1] = e.split("-").map((a) => +a);
      return cl(r, o - 1, s);
    }
    let n = parseFloat(e);
    if (!isNaN(e - n)) return new Date(n);
    let i;
    if ((i = e.match(MT))) return LT(i);
  }
  let t = new Date(e);
  if (!j_(t)) throw new Error(`Unable to convert "${e}" into a date`);
  return t;
}
function LT(e) {
  let t = new Date(0),
    n = 0,
    i = 0,
    r = e[8] ? t.setUTCFullYear : t.setFullYear,
    o = e[8] ? t.setUTCHours : t.setHours;
  e[9] && ((n = Number(e[9] + e[10])), (i = Number(e[9] + e[11]))),
    r.call(t, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
  let s = Number(e[4] || 0) - n,
    a = Number(e[5] || 0) - i,
    c = Number(e[6] || 0),
    l = Math.floor(parseFloat("0." + (e[7] || 0)) * 1e3);
  return o.call(t, s, a, c, l), t;
}
function j_(e) {
  return e instanceof Date && !isNaN(e.valueOf());
}
function ul(e, t) {
  t = encodeURIComponent(t);
  for (let n of e.split(";")) {
    let i = n.indexOf("="),
      [r, o] = i == -1 ? [n, ""] : [n.slice(0, i), n.slice(i + 1)];
    if (r.trim() === t) return decodeURIComponent(o);
  }
  return null;
}
var Bf = /\s+/,
  B_ = [],
  K_ = (() => {
    class e {
      constructor(n, i) {
        (this._ngEl = n),
          (this._renderer = i),
          (this.initialClasses = B_),
          (this.stateMap = new Map());
      }
      set klass(n) {
        this.initialClasses = n != null ? n.trim().split(Bf) : B_;
      }
      set ngClass(n) {
        this.rawClass = typeof n == "string" ? n.trim().split(Bf) : n;
      }
      ngDoCheck() {
        for (let i of this.initialClasses) this._updateState(i, !0);
        let n = this.rawClass;
        if (Array.isArray(n) || n instanceof Set)
          for (let i of n) this._updateState(i, !0);
        else if (n != null)
          for (let i of Object.keys(n)) this._updateState(i, !!n[i]);
        this._applyStateDiff();
      }
      _updateState(n, i) {
        let r = this.stateMap.get(n);
        r !== void 0
          ? (r.enabled !== i && ((r.changed = !0), (r.enabled = i)),
            (r.touched = !0))
          : this.stateMap.set(n, { enabled: i, changed: !0, touched: !0 });
      }
      _applyStateDiff() {
        for (let n of this.stateMap) {
          let i = n[0],
            r = n[1];
          r.changed
            ? (this._toggleClass(i, r.enabled), (r.changed = !1))
            : r.touched ||
              (r.enabled && this._toggleClass(i, !1), this.stateMap.delete(i)),
            (r.touched = !1);
        }
      }
      _toggleClass(n, i) {
        (n = n.trim()),
          n.length > 0 &&
            n.split(Bf).forEach((r) => {
              i
                ? this._renderer.addClass(this._ngEl.nativeElement, r)
                : this._renderer.removeClass(this._ngEl.nativeElement, r);
            });
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(Je(Nn), Je(Vc));
        };
      }
      static {
        this.ɵdir = $i({
          type: e,
          selectors: [["", "ngClass", ""]],
          inputs: { klass: [0, "class", "klass"], ngClass: "ngClass" },
          standalone: !0,
        });
      }
    }
    return e;
  })();
var Co = (() => {
    class e {
      constructor(n, i) {
        (this._viewContainer = n),
          (this._context = new Vf()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = i);
      }
      set ngIf(n) {
        (this._context.$implicit = this._context.ngIf = n), this._updateView();
      }
      set ngIfThen(n) {
        V_("ngIfThen", n),
          (this._thenTemplateRef = n),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(n) {
        V_("ngIfElse", n),
          (this._elseTemplateRef = n),
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
      static ngTemplateContextGuard(n, i) {
        return !0;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(Je(ui), Je(Bi));
        };
      }
      static {
        this.ɵdir = $i({
          type: e,
          selectors: [["", "ngIf", ""]],
          inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
          standalone: !0,
        });
      }
    }
    return e;
  })(),
  Vf = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function V_(e, t) {
  if (!!!(!t || t.createEmbeddedView))
    throw new Error(`${e} must be a TemplateRef, but received '${Vt(t)}'.`);
}
function jT(e, t) {
  return new ae(2100, !1);
}
var BT = "mediumDate",
  VT = new Y(""),
  HT = new Y(""),
  J_ = (() => {
    class e {
      constructor(n, i, r) {
        (this.locale = n),
          (this.defaultTimezone = i),
          (this.defaultOptions = r);
      }
      transform(n, i, r, o) {
        if (n == null || n === "" || n !== n) return null;
        try {
          let s = i ?? this.defaultOptions?.dateFormat ?? BT,
            a =
              r ??
              this.defaultOptions?.timezone ??
              this.defaultTimezone ??
              void 0;
          return Z_(n, s, o || this.locale, a);
        } catch (s) {
          throw jT(e, s.message);
        }
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(Je(bs, 16), Je(VT, 24), Je(HT, 24));
        };
      }
      static {
        this.ɵpipe = ho({ name: "date", type: e, pure: !0, standalone: !0 });
      }
    }
    return e;
  })();
var dl = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵmod = It({ type: e });
      }
      static {
        this.ɵinj = Mt({});
      }
    }
    return e;
  })(),
  qf = "browser",
  $T = "server";
function X_(e) {
  return e === qf;
}
function fl(e) {
  return e === $T;
}
var ey = (() => {
    class e {
      static {
        this.ɵprov = z({
          token: e,
          providedIn: "root",
          factory: () => (X_(I(An)) ? new Hf(I(ht), window) : new $f()),
        });
      }
    }
    return e;
  })(),
  Hf = class {
    constructor(t, n) {
      (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
    }
    setOffset(t) {
      Array.isArray(t) ? (this.offset = () => t) : (this.offset = t);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(t) {
      this.window.scrollTo(t[0], t[1]);
    }
    scrollToAnchor(t) {
      let n = UT(this.document, t);
      n && (this.scrollToElement(n), n.focus());
    }
    setHistoryScrollRestoration(t) {
      this.window.history.scrollRestoration = t;
    }
    scrollToElement(t) {
      let n = t.getBoundingClientRect(),
        i = n.left + this.window.pageXOffset,
        r = n.top + this.window.pageYOffset,
        o = this.offset();
      this.window.scrollTo(i - o[0], r - o[1]);
    }
  };
function UT(e, t) {
  let n = e.getElementById(t) || e.getElementsByName(t)[0];
  if (n) return n;
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
        let s = o.getElementById(t) || o.querySelector(`[name="${t}"]`);
        if (s) return s;
      }
      r = i.nextNode();
    }
  }
  return null;
}
var $f = class {
    setOffset(t) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(t) {}
    scrollToAnchor(t) {}
    setHistoryScrollRestoration(t) {}
  },
  Do = class {};
var ws = class {},
  gl = class {},
  pi = class e {
    constructor(t) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        t
          ? typeof t == "string"
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  t
                    .split(
                      `
`
                    )
                    .forEach((n) => {
                      let i = n.indexOf(":");
                      if (i > 0) {
                        let r = n.slice(0, i),
                          o = r.toLowerCase(),
                          s = n.slice(i + 1).trim();
                        this.maybeSetNormalizedName(r, o),
                          this.headers.has(o)
                            ? this.headers.get(o).push(s)
                            : this.headers.set(o, [s]);
                      }
                    });
              })
            : typeof Headers < "u" && t instanceof Headers
            ? ((this.headers = new Map()),
              t.forEach((n, i) => {
                this.setHeaderEntries(i, n);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(t).forEach(([n, i]) => {
                    this.setHeaderEntries(n, i);
                  });
              })
          : (this.headers = new Map());
    }
    has(t) {
      return this.init(), this.headers.has(t.toLowerCase());
    }
    get(t) {
      this.init();
      let n = this.headers.get(t.toLowerCase());
      return n && n.length > 0 ? n[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(t) {
      return this.init(), this.headers.get(t.toLowerCase()) || null;
    }
    append(t, n) {
      return this.clone({ name: t, value: n, op: "a" });
    }
    set(t, n) {
      return this.clone({ name: t, value: n, op: "s" });
    }
    delete(t, n) {
      return this.clone({ name: t, value: n, op: "d" });
    }
    maybeSetNormalizedName(t, n) {
      this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof e
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
          (this.lazyUpdate = null)));
    }
    copyFrom(t) {
      t.init(),
        Array.from(t.headers.keys()).forEach((n) => {
          this.headers.set(n, t.headers.get(n)),
            this.normalizedNames.set(n, t.normalizedNames.get(n));
        });
    }
    clone(t) {
      let n = new e();
      return (
        (n.lazyInit =
          this.lazyInit && this.lazyInit instanceof e ? this.lazyInit : this),
        (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
        n
      );
    }
    applyUpdate(t) {
      let n = t.name.toLowerCase();
      switch (t.op) {
        case "a":
        case "s":
          let i = t.value;
          if ((typeof i == "string" && (i = [i]), i.length === 0)) return;
          this.maybeSetNormalizedName(t.name, n);
          let r = (t.op === "a" ? this.headers.get(n) : void 0) || [];
          r.push(...i), this.headers.set(n, r);
          break;
        case "d":
          let o = t.value;
          if (!o) this.headers.delete(n), this.normalizedNames.delete(n);
          else {
            let s = this.headers.get(n);
            if (!s) return;
            (s = s.filter((a) => o.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(n), this.normalizedNames.delete(n))
                : this.headers.set(n, s);
          }
          break;
      }
    }
    setHeaderEntries(t, n) {
      let i = (Array.isArray(n) ? n : [n]).map((o) => o.toString()),
        r = t.toLowerCase();
      this.headers.set(r, i), this.maybeSetNormalizedName(t, r);
    }
    forEach(t) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((n) =>
          t(this.normalizedNames.get(n), this.headers.get(n))
        );
    }
  };
var Yf = class {
  encodeKey(t) {
    return ty(t);
  }
  encodeValue(t) {
    return ty(t);
  }
  decodeKey(t) {
    return decodeURIComponent(t);
  }
  decodeValue(t) {
    return decodeURIComponent(t);
  }
};
function GT(e, t) {
  let n = new Map();
  return (
    e.length > 0 &&
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((r) => {
          let o = r.indexOf("="),
            [s, a] =
              o == -1
                ? [t.decodeKey(r), ""]
                : [t.decodeKey(r.slice(0, o)), t.decodeValue(r.slice(o + 1))],
            c = n.get(s) || [];
          c.push(a), n.set(s, c);
        }),
    n
  );
}
var zT = /%(\d[a-f0-9])/gi,
  WT = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function ty(e) {
  return encodeURIComponent(e).replace(zT, (t, n) => WT[n] ?? t);
}
function pl(e) {
  return `${e}`;
}
var qi = class e {
  constructor(t = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = t.encoder || new Yf()),
      t.fromString)
    ) {
      if (t.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = GT(t.fromString, this.encoder);
    } else
      t.fromObject
        ? ((this.map = new Map()),
          Object.keys(t.fromObject).forEach((n) => {
            let i = t.fromObject[n],
              r = Array.isArray(i) ? i.map(pl) : [pl(i)];
            this.map.set(n, r);
          }))
        : (this.map = null);
  }
  has(t) {
    return this.init(), this.map.has(t);
  }
  get(t) {
    this.init();
    let n = this.map.get(t);
    return n ? n[0] : null;
  }
  getAll(t) {
    return this.init(), this.map.get(t) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(t, n) {
    return this.clone({ param: t, value: n, op: "a" });
  }
  appendAll(t) {
    let n = [];
    return (
      Object.keys(t).forEach((i) => {
        let r = t[i];
        Array.isArray(r)
          ? r.forEach((o) => {
              n.push({ param: i, value: o, op: "a" });
            })
          : n.push({ param: i, value: r, op: "a" });
      }),
      this.clone(n)
    );
  }
  set(t, n) {
    return this.clone({ param: t, value: n, op: "s" });
  }
  delete(t, n) {
    return this.clone({ param: t, value: n, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((t) => {
          let n = this.encoder.encodeKey(t);
          return this.map
            .get(t)
            .map((i) => n + "=" + this.encoder.encodeValue(i))
            .join("&");
        })
        .filter((t) => t !== "")
        .join("&")
    );
  }
  clone(t) {
    let n = new e({ encoder: this.encoder });
    return (
      (n.cloneFrom = this.cloneFrom || this),
      (n.updates = (this.updates || []).concat(t)),
      n
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
        this.updates.forEach((t) => {
          switch (t.op) {
            case "a":
            case "s":
              let n = (t.op === "a" ? this.map.get(t.param) : void 0) || [];
              n.push(pl(t.value)), this.map.set(t.param, n);
              break;
            case "d":
              if (t.value !== void 0) {
                let i = this.map.get(t.param) || [],
                  r = i.indexOf(pl(t.value));
                r !== -1 && i.splice(r, 1),
                  i.length > 0
                    ? this.map.set(t.param, i)
                    : this.map.delete(t.param);
              } else {
                this.map.delete(t.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Qf = class {
  constructor() {
    this.map = new Map();
  }
  set(t, n) {
    return this.map.set(t, n), this;
  }
  get(t) {
    return (
      this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t)
    );
  }
  delete(t) {
    return this.map.delete(t), this;
  }
  has(t) {
    return this.map.has(t);
  }
  keys() {
    return this.map.keys();
  }
};
function qT(e) {
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
function ny(e) {
  return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
}
function iy(e) {
  return typeof Blob < "u" && e instanceof Blob;
}
function ry(e) {
  return typeof FormData < "u" && e instanceof FormData;
}
function ZT(e) {
  return typeof URLSearchParams < "u" && e instanceof URLSearchParams;
}
var Ds = class e {
    constructor(t, n, i, r) {
      (this.url = n),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = "json"),
        (this.method = t.toUpperCase());
      let o;
      if (
        (qT(this.method) || r
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
        (this.headers ??= new pi()),
        (this.context ??= new Qf()),
        !this.params)
      )
        (this.params = new qi()), (this.urlWithParams = n);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = n;
        else {
          let a = n.indexOf("?"),
            c = a === -1 ? "?" : a < n.length - 1 ? "&" : "";
          this.urlWithParams = n + c + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          ny(this.body) ||
          iy(this.body) ||
          ry(this.body) ||
          ZT(this.body)
        ? this.body
        : this.body instanceof qi
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || ry(this.body)
        ? null
        : iy(this.body)
        ? this.body.type || null
        : ny(this.body)
        ? null
        : typeof this.body == "string"
        ? "text/plain"
        : this.body instanceof qi
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? "application/json"
        : null;
    }
    clone(t = {}) {
      let n = t.method || this.method,
        i = t.url || this.url,
        r = t.responseType || this.responseType,
        o = t.transferCache ?? this.transferCache,
        s = t.body !== void 0 ? t.body : this.body,
        a = t.withCredentials ?? this.withCredentials,
        c = t.reportProgress ?? this.reportProgress,
        l = t.headers || this.headers,
        u = t.params || this.params,
        d = t.context ?? this.context;
      return (
        t.setHeaders !== void 0 &&
          (l = Object.keys(t.setHeaders).reduce(
            (p, h) => p.set(h, t.setHeaders[h]),
            l
          )),
        t.setParams &&
          (u = Object.keys(t.setParams).reduce(
            (p, h) => p.set(h, t.setParams[h]),
            u
          )),
        new e(n, i, s, {
          params: u,
          headers: l,
          context: d,
          reportProgress: c,
          responseType: r,
          withCredentials: a,
          transferCache: o,
        })
      );
    }
  },
  Zi = (function (e) {
    return (
      (e[(e.Sent = 0)] = "Sent"),
      (e[(e.UploadProgress = 1)] = "UploadProgress"),
      (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
      (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
      (e[(e.Response = 4)] = "Response"),
      (e[(e.User = 5)] = "User"),
      e
    );
  })(Zi || {}),
  Cs = class {
    constructor(t, n = 200, i = "OK") {
      (this.headers = t.headers || new pi()),
        (this.status = t.status !== void 0 ? t.status : n),
        (this.statusText = t.statusText || i),
        (this.url = t.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  ml = class e extends Cs {
    constructor(t = {}) {
      super(t), (this.type = Zi.ResponseHeader);
    }
    clone(t = {}) {
      return new e({
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  Es = class e extends Cs {
    constructor(t = {}) {
      super(t),
        (this.type = Zi.Response),
        (this.body = t.body !== void 0 ? t.body : null);
    }
    clone(t = {}) {
      return new e({
        body: t.body !== void 0 ? t.body : this.body,
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  Wi = class extends Cs {
    constructor(t) {
      super(t, 0, "Unknown Error"),
        (this.name = "HttpErrorResponse"),
        (this.ok = !1),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              t.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              t.url || "(unknown url)"
            }: ${t.status} ${t.statusText}`),
        (this.error = t.error || null);
    }
  },
  ly = 200,
  YT = 204;
function Zf(e, t) {
  return {
    body: t,
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
var Xf = (() => {
    class e {
      constructor(n) {
        this.handler = n;
      }
      request(n, i, r = {}) {
        let o;
        if (n instanceof Ds) o = n;
        else {
          let c;
          r.headers instanceof pi ? (c = r.headers) : (c = new pi(r.headers));
          let l;
          r.params &&
            (r.params instanceof qi
              ? (l = r.params)
              : (l = new qi({ fromObject: r.params }))),
            (o = new Ds(n, i, r.body !== void 0 ? r.body : null, {
              headers: c,
              context: r.context,
              params: l,
              reportProgress: r.reportProgress,
              responseType: r.responseType || "json",
              withCredentials: r.withCredentials,
              transferCache: r.transferCache,
            }));
        }
        let s = X(o).pipe(Tn((c) => this.handler.handle(c)));
        if (n instanceof Ds || r.observe === "events") return s;
        let a = s.pipe(Et((c) => c instanceof Es));
        switch (r.observe || "body") {
          case "body":
            switch (o.responseType) {
              case "arraybuffer":
                return a.pipe(
                  ue((c) => {
                    if (c.body !== null && !(c.body instanceof ArrayBuffer))
                      throw new Error("Response is not an ArrayBuffer.");
                    return c.body;
                  })
                );
              case "blob":
                return a.pipe(
                  ue((c) => {
                    if (c.body !== null && !(c.body instanceof Blob))
                      throw new Error("Response is not a Blob.");
                    return c.body;
                  })
                );
              case "text":
                return a.pipe(
                  ue((c) => {
                    if (c.body !== null && typeof c.body != "string")
                      throw new Error("Response is not a string.");
                    return c.body;
                  })
                );
              case "json":
              default:
                return a.pipe(ue((c) => c.body));
            }
          case "response":
            return a;
          default:
            throw new Error(
              `Unreachable: unhandled observe type ${r.observe}}`
            );
        }
      }
      delete(n, i = {}) {
        return this.request("DELETE", n, i);
      }
      get(n, i = {}) {
        return this.request("GET", n, i);
      }
      head(n, i = {}) {
        return this.request("HEAD", n, i);
      }
      jsonp(n, i) {
        return this.request("JSONP", n, {
          params: new qi().append(i, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(n, i = {}) {
        return this.request("OPTIONS", n, i);
      }
      patch(n, i, r = {}) {
        return this.request("PATCH", n, Zf(r, i));
      }
      post(n, i, r = {}) {
        return this.request("POST", n, Zf(r, i));
      }
      put(n, i, r = {}) {
        return this.request("PUT", n, Zf(r, i));
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(ws));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  QT = /^\)\]\}',?\n/,
  KT = "X-Request-URL";
function oy(e) {
  if (e.url) return e.url;
  let t = KT.toLocaleLowerCase();
  return e.headers.get(t);
}
var JT = (() => {
    class e {
      constructor() {
        (this.fetchImpl =
          I(Kf, { optional: !0 })?.fetch ?? ((...n) => globalThis.fetch(...n))),
          (this.ngZone = I(Oe));
      }
      handle(n) {
        return new ye((i) => {
          let r = new AbortController();
          return (
            this.doRequest(n, r.signal, i).then(Jf, (o) =>
              i.error(new Wi({ error: o }))
            ),
            () => r.abort()
          );
        });
      }
      doRequest(n, i, r) {
        return pa(this, null, function* () {
          let o = this.createRequestInit(n),
            s;
          try {
            let h = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(n.urlWithParams, G({ signal: i }, o))
            );
            XT(h), r.next({ type: Zi.Sent }), (s = yield h);
          } catch (h) {
            r.error(
              new Wi({
                error: h,
                status: h.status ?? 0,
                statusText: h.statusText,
                url: n.urlWithParams,
                headers: h.headers,
              })
            );
            return;
          }
          let a = new pi(s.headers),
            c = s.statusText,
            l = oy(s) ?? n.urlWithParams,
            u = s.status,
            d = null;
          if (
            (n.reportProgress &&
              r.next(new ml({ headers: a, status: u, statusText: c, url: l })),
            s.body)
          ) {
            let h = s.headers.get("content-length"),
              D = [],
              w = s.body.getReader(),
              M = 0,
              P,
              S,
              C = typeof Zone < "u" && Zone.current;
            yield this.ngZone.runOutsideAngular(() =>
              pa(this, null, function* () {
                for (;;) {
                  let { done: V, value: H } = yield w.read();
                  if (V) break;
                  if ((D.push(H), (M += H.length), n.reportProgress)) {
                    S =
                      n.responseType === "text"
                        ? (S ?? "") +
                          (P ??= new TextDecoder()).decode(H, { stream: !0 })
                        : void 0;
                    let ee = () =>
                      r.next({
                        type: Zi.DownloadProgress,
                        total: h ? +h : void 0,
                        loaded: M,
                        partialText: S,
                      });
                    C ? C.run(ee) : ee();
                  }
                }
              })
            );
            let F = this.concatChunks(D, M);
            try {
              let V = s.headers.get("Content-Type") ?? "";
              d = this.parseBody(n, F, V);
            } catch (V) {
              r.error(
                new Wi({
                  error: V,
                  headers: new pi(s.headers),
                  status: s.status,
                  statusText: s.statusText,
                  url: oy(s) ?? n.urlWithParams,
                })
              );
              return;
            }
          }
          u === 0 && (u = d ? ly : 0),
            u >= 200 && u < 300
              ? (r.next(
                  new Es({
                    body: d,
                    headers: a,
                    status: u,
                    statusText: c,
                    url: l,
                  })
                ),
                r.complete())
              : r.error(
                  new Wi({
                    error: d,
                    headers: a,
                    status: u,
                    statusText: c,
                    url: l,
                  })
                );
        });
      }
      parseBody(n, i, r) {
        switch (n.responseType) {
          case "json":
            let o = new TextDecoder().decode(i).replace(QT, "");
            return o === "" ? null : JSON.parse(o);
          case "text":
            return new TextDecoder().decode(i);
          case "blob":
            return new Blob([i], { type: r });
          case "arraybuffer":
            return i.buffer;
        }
      }
      createRequestInit(n) {
        let i = {},
          r = n.withCredentials ? "include" : void 0;
        if (
          (n.headers.forEach((o, s) => (i[o] = s.join(","))),
          n.headers.has("Accept") ||
            (i.Accept = "application/json, text/plain, */*"),
          !n.headers.has("Content-Type"))
        ) {
          let o = n.detectContentTypeHeader();
          o !== null && (i["Content-Type"] = o);
        }
        return {
          body: n.serializeBody(),
          method: n.method,
          headers: i,
          credentials: r,
        };
      }
      concatChunks(n, i) {
        let r = new Uint8Array(i),
          o = 0;
        for (let s of n) r.set(s, o), (o += s.length);
        return r;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Kf = class {};
function Jf() {}
function XT(e) {
  e.then(Jf, Jf);
}
function uy(e, t) {
  return t(e);
}
function eM(e, t) {
  return (n, i) => t.intercept(n, { handle: (r) => e(r, i) });
}
function tM(e, t, n) {
  return (i, r) => fn(n, () => t(i, (o) => e(o, r)));
}
var nM = new Y(""),
  eh = new Y(""),
  iM = new Y(""),
  dy = new Y("", { providedIn: "root", factory: () => !0 });
function rM() {
  let e = null;
  return (t, n) => {
    e === null && (e = (I(nM, { optional: !0 }) ?? []).reduceRight(eM, uy));
    let i = I(li);
    if (I(dy)) {
      let o = i.add();
      return e(t, n).pipe(ti(() => i.remove(o)));
    } else return e(t, n);
  };
}
var sy = (() => {
  class e extends ws {
    constructor(n, i) {
      super(),
        (this.backend = n),
        (this.injector = i),
        (this.chain = null),
        (this.pendingTasks = I(li)),
        (this.contributeToStability = I(dy));
    }
    handle(n) {
      if (this.chain === null) {
        let i = Array.from(
          new Set([...this.injector.get(eh), ...this.injector.get(iM, [])])
        );
        this.chain = i.reduceRight((r, o) => tM(r, o, this.injector), uy);
      }
      if (this.contributeToStability) {
        let i = this.pendingTasks.add();
        return this.chain(n, (r) => this.backend.handle(r)).pipe(
          ti(() => this.pendingTasks.remove(i))
        );
      } else return this.chain(n, (i) => this.backend.handle(i));
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(W(gl), W(Ft));
      };
    }
    static {
      this.ɵprov = z({ token: e, factory: e.ɵfac });
    }
  }
  return e;
})();
var oM = /^\)\]\}',?\n/;
function sM(e) {
  return "responseURL" in e && e.responseURL
    ? e.responseURL
    : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
    ? e.getResponseHeader("X-Request-URL")
    : null;
}
var ay = (() => {
    class e {
      constructor(n) {
        this.xhrFactory = n;
      }
      handle(n) {
        if (n.method === "JSONP") throw new ae(-2800, !1);
        let i = this.xhrFactory;
        return (i.ɵloadImpl ? Qe(i.ɵloadImpl()) : X(null)).pipe(
          lt(
            () =>
              new ye((o) => {
                let s = i.build();
                if (
                  (s.open(n.method, n.urlWithParams),
                  n.withCredentials && (s.withCredentials = !0),
                  n.headers.forEach((w, M) =>
                    s.setRequestHeader(w, M.join(","))
                  ),
                  n.headers.has("Accept") ||
                    s.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !n.headers.has("Content-Type"))
                ) {
                  let w = n.detectContentTypeHeader();
                  w !== null && s.setRequestHeader("Content-Type", w);
                }
                if (n.responseType) {
                  let w = n.responseType.toLowerCase();
                  s.responseType = w !== "json" ? w : "text";
                }
                let a = n.serializeBody(),
                  c = null,
                  l = () => {
                    if (c !== null) return c;
                    let w = s.statusText || "OK",
                      M = new pi(s.getAllResponseHeaders()),
                      P = sM(s) || n.url;
                    return (
                      (c = new ml({
                        headers: M,
                        status: s.status,
                        statusText: w,
                        url: P,
                      })),
                      c
                    );
                  },
                  u = () => {
                    let { headers: w, status: M, statusText: P, url: S } = l(),
                      C = null;
                    M !== YT &&
                      (C =
                        typeof s.response > "u" ? s.responseText : s.response),
                      M === 0 && (M = C ? ly : 0);
                    let F = M >= 200 && M < 300;
                    if (n.responseType === "json" && typeof C == "string") {
                      let V = C;
                      C = C.replace(oM, "");
                      try {
                        C = C !== "" ? JSON.parse(C) : null;
                      } catch (H) {
                        (C = V), F && ((F = !1), (C = { error: H, text: C }));
                      }
                    }
                    F
                      ? (o.next(
                          new Es({
                            body: C,
                            headers: w,
                            status: M,
                            statusText: P,
                            url: S || void 0,
                          })
                        ),
                        o.complete())
                      : o.error(
                          new Wi({
                            error: C,
                            headers: w,
                            status: M,
                            statusText: P,
                            url: S || void 0,
                          })
                        );
                  },
                  d = (w) => {
                    let { url: M } = l(),
                      P = new Wi({
                        error: w,
                        status: s.status || 0,
                        statusText: s.statusText || "Unknown Error",
                        url: M || void 0,
                      });
                    o.error(P);
                  },
                  p = !1,
                  h = (w) => {
                    p || (o.next(l()), (p = !0));
                    let M = { type: Zi.DownloadProgress, loaded: w.loaded };
                    w.lengthComputable && (M.total = w.total),
                      n.responseType === "text" &&
                        s.responseText &&
                        (M.partialText = s.responseText),
                      o.next(M);
                  },
                  D = (w) => {
                    let M = { type: Zi.UploadProgress, loaded: w.loaded };
                    w.lengthComputable && (M.total = w.total), o.next(M);
                  };
                return (
                  s.addEventListener("load", u),
                  s.addEventListener("error", d),
                  s.addEventListener("timeout", d),
                  s.addEventListener("abort", d),
                  n.reportProgress &&
                    (s.addEventListener("progress", h),
                    a !== null &&
                      s.upload &&
                      s.upload.addEventListener("progress", D)),
                  s.send(a),
                  o.next({ type: Zi.Sent }),
                  () => {
                    s.removeEventListener("error", d),
                      s.removeEventListener("abort", d),
                      s.removeEventListener("load", u),
                      s.removeEventListener("timeout", d),
                      n.reportProgress &&
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
          return new (i || e)(W(Do));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  fy = new Y(""),
  aM = "XSRF-TOKEN",
  cM = new Y("", { providedIn: "root", factory: () => aM }),
  lM = "X-XSRF-TOKEN",
  uM = new Y("", { providedIn: "root", factory: () => lM }),
  _l = class {},
  dM = (() => {
    class e {
      constructor(n, i, r) {
        (this.doc = n),
          (this.platform = i),
          (this.cookieName = r),
          (this.lastCookieString = ""),
          (this.lastToken = null),
          (this.parseCount = 0);
      }
      getToken() {
        if (this.platform === "server") return null;
        let n = this.doc.cookie || "";
        return (
          n !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = ul(n, this.cookieName)),
            (this.lastCookieString = n)),
          this.lastToken
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(ht), W(An), W(cM));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function fM(e, t) {
  let n = e.url.toLowerCase();
  if (
    !I(fy) ||
    e.method === "GET" ||
    e.method === "HEAD" ||
    n.startsWith("http://") ||
    n.startsWith("https://")
  )
    return t(e);
  let i = I(_l).getToken(),
    r = I(uM);
  return (
    i != null &&
      !e.headers.has(r) &&
      (e = e.clone({ headers: e.headers.set(r, i) })),
    t(e)
  );
}
var hy = (function (e) {
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
})(hy || {});
function hM(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function py(...e) {
  let t = [
    Xf,
    ay,
    sy,
    { provide: ws, useExisting: sy },
    { provide: gl, useFactory: () => I(JT, { optional: !0 }) ?? I(ay) },
    { provide: eh, useValue: fM, multi: !0 },
    { provide: fy, useValue: !0 },
    { provide: _l, useClass: dM },
  ];
  for (let n of e) t.push(...n.ɵproviders);
  return hs(t);
}
var cy = new Y("");
function gy() {
  return hM(hy.LegacyInterceptors, [
    { provide: cy, useFactory: rM },
    { provide: eh, useExisting: cy, multi: !0 },
  ]);
}
var ih = class extends al {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  rh = class e extends ih {
    static makeCurrent() {
      U_(new e());
    }
    onAndCancel(t, n, i) {
      return (
        t.addEventListener(n, i),
        () => {
          t.removeEventListener(n, i);
        }
      );
    }
    dispatchEvent(t, n) {
      t.dispatchEvent(n);
    }
    remove(t) {
      t.remove();
    }
    createElement(t, n) {
      return (n = n || this.getDefaultDocument()), n.createElement(t);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, n) {
      return n === "window"
        ? window
        : n === "document"
        ? t
        : n === "body"
        ? t.body
        : null;
    }
    getBaseHref(t) {
      let n = pM();
      return n == null ? null : gM(n);
    }
    resetBaseElement() {
      Ts = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return ul(document.cookie, t);
    }
  },
  Ts = null;
function pM() {
  return (
    (Ts = Ts || document.querySelector("base")),
    Ts ? Ts.getAttribute("href") : null
  );
}
function gM(e) {
  return new URL(e, document.baseURI).pathname;
}
var oh = class {
    addToWindow(t) {
      (Kt.getAngularTestability = (i, r = !0) => {
        let o = t.findTestabilityInTree(i, r);
        if (o == null) throw new ae(5103, !1);
        return o;
      }),
        (Kt.getAllAngularTestabilities = () => t.getAllTestabilities()),
        (Kt.getAllAngularRootElements = () => t.getAllRootElements());
      let n = (i) => {
        let r = Kt.getAllAngularTestabilities(),
          o = r.length,
          s = function () {
            o--, o == 0 && i();
          };
        r.forEach((a) => {
          a.whenStable(s);
        });
      };
      Kt.frameworkStabilizers || (Kt.frameworkStabilizers = []),
        Kt.frameworkStabilizers.push(n);
    }
    findTestabilityInTree(t, n, i) {
      if (n == null) return null;
      let r = t.getTestability(n);
      return (
        r ??
        (i
          ? Tr().isShadowRoot(n)
            ? this.findTestabilityInTree(t, n.host, !0)
            : this.findTestabilityInTree(t, n.parentElement, !0)
          : null)
      );
    }
  },
  mM = (() => {
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
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  sh = new Y(""),
  vy = (() => {
    class e {
      constructor(n, i) {
        (this._zone = i),
          (this._eventNameToPlugin = new Map()),
          n.forEach((r) => {
            r.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, i, r) {
        return this._findPluginFor(i).addEventListener(n, i, r);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let i = this._eventNameToPlugin.get(n);
        if (i) return i;
        if (((i = this._plugins.find((o) => o.supports(n))), !i))
          throw new ae(5101, !1);
        return this._eventNameToPlugin.set(n, i), i;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(sh), W(Oe));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  yl = class {
    constructor(t) {
      this._doc = t;
    }
  },
  th = "ng-app-id",
  by = (() => {
    class e {
      constructor(n, i, r, o = {}) {
        (this.doc = n),
          (this.appId = i),
          (this.nonce = r),
          (this.platformId = o),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = fl(o)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let i of n)
          this.changeUsageCount(i, 1) === 1 && this.onStyleAdded(i);
      }
      removeStyles(n) {
        for (let i of n)
          this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((i) => i.remove()), n.clear());
        for (let i of this.getAllStyles()) this.onStyleRemoved(i);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let i of this.getAllStyles()) this.addStyleToHost(n, i);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let i of this.hostNodes) this.addStyleToHost(i, n);
      }
      onStyleRemoved(n) {
        let i = this.styleRef;
        i.get(n)?.elements?.forEach((r) => r.remove()), i.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${th}="${this.appId}"]`);
        if (n?.length) {
          let i = new Map();
          return (
            n.forEach((r) => {
              r.textContent != null && i.set(r.textContent, r);
            }),
            i
          );
        }
        return null;
      }
      changeUsageCount(n, i) {
        let r = this.styleRef;
        if (r.has(n)) {
          let o = r.get(n);
          return (o.usage += i), o.usage;
        }
        return r.set(n, { usage: i, elements: [] }), i;
      }
      getStyleElement(n, i) {
        let r = this.styleNodesInDOM,
          o = r?.get(i);
        if (o?.parentNode === n) return r.delete(i), o.removeAttribute(th), o;
        {
          let s = this.doc.createElement("style");
          return (
            this.nonce && s.setAttribute("nonce", this.nonce),
            (s.textContent = i),
            this.platformIsServer && s.setAttribute(th, this.appId),
            n.appendChild(s),
            s
          );
        }
      }
      addStyleToHost(n, i) {
        let r = this.getStyleElement(n, i),
          o = this.styleRef,
          s = o.get(i)?.elements;
        s ? s.push(r) : o.set(i, { elements: [r], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(ht), W(Pc), W(hf, 8), W(An));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  nh = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  ch = /%COMP%/g,
  Dy = "%COMP%",
  _M = `_nghost-${Dy}`,
  yM = `_ngcontent-${Dy}`,
  vM = !0,
  bM = new Y("", { providedIn: "root", factory: () => vM });
function DM(e) {
  return yM.replace(ch, e);
}
function wM(e) {
  return _M.replace(ch, e);
}
function wy(e, t) {
  return t.map((n) => n.replace(ch, e));
}
var my = (() => {
    class e {
      constructor(n, i, r, o, s, a, c, l = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = i),
          (this.appId = r),
          (this.removeStylesOnCompDestroy = o),
          (this.doc = s),
          (this.platformId = a),
          (this.ngZone = c),
          (this.nonce = l),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = fl(a)),
          (this.defaultRenderer = new Ms(n, s, c, this.platformIsServer));
      }
      createRenderer(n, i) {
        if (!n || !i) return this.defaultRenderer;
        this.platformIsServer &&
          i.encapsulation === Gn.ShadowDom &&
          (i = We(G({}, i), { encapsulation: Gn.Emulated }));
        let r = this.getOrCreateRenderer(n, i);
        return (
          r instanceof vl
            ? r.applyToHost(n)
            : r instanceof Is && r.applyStyles(),
          r
        );
      }
      getOrCreateRenderer(n, i) {
        let r = this.rendererByCompId,
          o = r.get(i.id);
        if (!o) {
          let s = this.doc,
            a = this.ngZone,
            c = this.eventManager,
            l = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.platformIsServer;
          switch (i.encapsulation) {
            case Gn.Emulated:
              o = new vl(c, l, i, this.appId, u, s, a, d);
              break;
            case Gn.ShadowDom:
              return new ah(c, l, n, i, s, a, this.nonce, d);
            default:
              o = new Is(c, l, i, u, s, a, d);
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
            W(vy),
            W(by),
            W(Pc),
            W(bM),
            W(ht),
            W(An),
            W(Oe),
            W(hf)
          );
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  Ms = class {
    constructor(t, n, i, r) {
      (this.eventManager = t),
        (this.doc = n),
        (this.ngZone = i),
        (this.platformIsServer = r),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(t, n) {
      return n
        ? this.doc.createElementNS(nh[n] || n, t)
        : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, n) {
      (_y(t) ? t.content : t).appendChild(n);
    }
    insertBefore(t, n, i) {
      t && (_y(t) ? t.content : t).insertBefore(n, i);
    }
    removeChild(t, n) {
      n.remove();
    }
    selectRootElement(t, n) {
      let i = typeof t == "string" ? this.doc.querySelector(t) : t;
      if (!i) throw new ae(-5104, !1);
      return n || (i.textContent = ""), i;
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, n, i, r) {
      if (r) {
        n = r + ":" + n;
        let o = nh[r];
        o ? t.setAttributeNS(o, n, i) : t.setAttribute(n, i);
      } else t.setAttribute(n, i);
    }
    removeAttribute(t, n, i) {
      if (i) {
        let r = nh[i];
        r ? t.removeAttributeNS(r, n) : t.removeAttribute(`${i}:${n}`);
      } else t.removeAttribute(n);
    }
    addClass(t, n) {
      t.classList.add(n);
    }
    removeClass(t, n) {
      t.classList.remove(n);
    }
    setStyle(t, n, i, r) {
      r & (oi.DashCase | oi.Important)
        ? t.style.setProperty(n, i, r & oi.Important ? "important" : "")
        : (t.style[n] = i);
    }
    removeStyle(t, n, i) {
      i & oi.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
    }
    setProperty(t, n, i) {
      t != null && (t[n] = i);
    }
    setValue(t, n) {
      t.nodeValue = n;
    }
    listen(t, n, i) {
      if (
        typeof t == "string" &&
        ((t = Tr().getGlobalEventTarget(this.doc, t)), !t)
      )
        throw new Error(`Unsupported event target ${t} for event ${n}`);
      return this.eventManager.addEventListener(
        t,
        n,
        this.decoratePreventDefault(i)
      );
    }
    decoratePreventDefault(t) {
      return (n) => {
        if (n === "__ngUnwrap__") return t;
        (this.platformIsServer ? this.ngZone.runGuarded(() => t(n)) : t(n)) ===
          !1 && n.preventDefault();
      };
    }
  };
function _y(e) {
  return e.tagName === "TEMPLATE" && e.content !== void 0;
}
var ah = class extends Ms {
    constructor(t, n, i, r, o, s, a, c) {
      super(t, o, s, c),
        (this.sharedStylesHost = n),
        (this.hostEl = i),
        (this.shadowRoot = i.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let l = wy(r.id, r.styles);
      for (let u of l) {
        let d = document.createElement("style");
        a && d.setAttribute("nonce", a),
          (d.textContent = u),
          this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, n) {
      return super.appendChild(this.nodeOrShadowRoot(t), n);
    }
    insertBefore(t, n, i) {
      return super.insertBefore(this.nodeOrShadowRoot(t), n, i);
    }
    removeChild(t, n) {
      return super.removeChild(null, n);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Is = class extends Ms {
    constructor(t, n, i, r, o, s, a, c) {
      super(t, o, s, a),
        (this.sharedStylesHost = n),
        (this.removeStylesOnCompDestroy = r),
        (this.styles = c ? wy(c, i.styles) : i.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  vl = class extends Is {
    constructor(t, n, i, r, o, s, a, c) {
      let l = r + "-" + i.id;
      super(t, n, i, o, s, a, c, l),
        (this.contentAttr = DM(l)),
        (this.hostAttr = wM(l));
    }
    applyToHost(t) {
      this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
    }
    createElement(t, n) {
      let i = super.createElement(t, n);
      return super.setAttribute(i, this.contentAttr, ""), i;
    }
  },
  CM = (() => {
    class e extends yl {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, i, r) {
        return (
          n.addEventListener(i, r, !1), () => this.removeEventListener(n, i, r)
        );
      }
      removeEventListener(n, i, r) {
        return n.removeEventListener(i, r);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(ht));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  yy = ["alt", "control", "meta", "shift"],
  EM = {
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
  TM = {
    alt: (e) => e.altKey,
    control: (e) => e.ctrlKey,
    meta: (e) => e.metaKey,
    shift: (e) => e.shiftKey,
  },
  MM = (() => {
    class e extends yl {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, i, r) {
        let o = e.parseEventName(i),
          s = e.eventCallback(o.fullKey, r, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => Tr().onAndCancel(n, o.domEventName, s));
      }
      static parseEventName(n) {
        let i = n.toLowerCase().split("."),
          r = i.shift();
        if (i.length === 0 || !(r === "keydown" || r === "keyup")) return null;
        let o = e._normalizeKey(i.pop()),
          s = "",
          a = i.indexOf("code");
        if (
          (a > -1 && (i.splice(a, 1), (s = "code.")),
          yy.forEach((l) => {
            let u = i.indexOf(l);
            u > -1 && (i.splice(u, 1), (s += l + "."));
          }),
          (s += o),
          i.length != 0 || o.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = r), (c.fullKey = s), c;
      }
      static matchEventFullKeyCode(n, i) {
        let r = EM[n.key] || n.key,
          o = "";
        return (
          i.indexOf("code.") > -1 && ((r = n.code), (o = "code.")),
          r == null || !r
            ? !1
            : ((r = r.toLowerCase()),
              r === " " ? (r = "space") : r === "." && (r = "dot"),
              yy.forEach((s) => {
                if (s !== r) {
                  let a = TM[s];
                  a(n) && (o += s + ".");
                }
              }),
              (o += r),
              o === i)
        );
      }
      static eventCallback(n, i, r) {
        return (o) => {
          e.matchEventFullKeyCode(o, n) && r.runGuarded(() => i(o));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(ht));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function IM() {
  rh.makeCurrent();
}
function SM() {
  return new ri();
}
function OM() {
  return y0(document), document;
}
var xM = [
    { provide: An, useValue: qf },
    { provide: ff, useValue: IM, multi: !0 },
    { provide: ht, useFactory: OM, deps: [] },
  ],
  Cy = kf(R_, "browser", xM),
  NM = new Y(""),
  AM = [
    { provide: ys, useClass: oh, deps: [] },
    { provide: Rf, useClass: Zc, deps: [Oe, Yc, ys] },
    { provide: Zc, useClass: Zc, deps: [Oe, Yc, ys] },
  ],
  RM = [
    { provide: Ec, useValue: "root" },
    { provide: ri, useFactory: SM, deps: [] },
    { provide: sh, useClass: CM, multi: !0, deps: [ht, Oe, An] },
    { provide: sh, useClass: MM, multi: !0, deps: [ht] },
    my,
    by,
    vy,
    { provide: lo, useExisting: my },
    { provide: Do, useClass: mM, deps: [] },
    [],
  ],
  Ey = (() => {
    class e {
      constructor(n) {}
      static withServerTransition(n) {
        return { ngModule: e, providers: [{ provide: Pc, useValue: n.appId }] };
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(NM, 12));
        };
      }
      static {
        this.ɵmod = It({ type: e });
      }
      static {
        this.ɵinj = Mt({ providers: [...RM, ...AM], imports: [dl, P_] });
      }
    }
    return e;
  })();
var Ty = (() => {
  class e {
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || "";
    }
    static {
      this.ɵfac = function (i) {
        return new (i || e)(W(ht));
      };
    }
    static {
      this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var be = "primary",
  Us = Symbol("RouteTitle"),
  hh = class {
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n[0] : n;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let n = this.params[t];
        return Array.isArray(n) ? n : [n];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Oo(e) {
  return new hh(e);
}
function FM(e, t, n) {
  let i = n.path.split("/");
  if (
    i.length > e.length ||
    (n.pathMatch === "full" && (t.hasChildren() || i.length < e.length))
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
function LM(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; ++n) if (!Zn(e[n], t[n])) return !1;
  return !0;
}
function Zn(e, t) {
  let n = e ? ph(e) : void 0,
    i = t ? ph(t) : void 0;
  if (!n || !i || n.length != i.length) return !1;
  let r;
  for (let o = 0; o < n.length; o++)
    if (((r = n[o]), !Ly(e[r], t[r]))) return !1;
  return !0;
}
function ph(e) {
  return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
}
function Ly(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    let n = [...e].sort(),
      i = [...t].sort();
    return n.every((r, o) => i[o] === r);
  } else return e === t;
}
function jy(e) {
  return e.length > 0 ? e[e.length - 1] : null;
}
function Qi(e) {
  return Xn(e) ? e : vs(e) ? Qe(Promise.resolve(e)) : X(e);
}
var jM = { exact: Vy, subset: Hy },
  By = { exact: BM, subset: VM, ignored: () => !0 };
function Iy(e, t, n) {
  return (
    jM[n.paths](e.root, t.root, n.matrixParams) &&
    By[n.queryParams](e.queryParams, t.queryParams) &&
    !(n.fragment === "exact" && e.fragment !== t.fragment)
  );
}
function BM(e, t) {
  return Zn(e, t);
}
function Vy(e, t, n) {
  if (
    !Sr(e.segments, t.segments) ||
    !wl(e.segments, t.segments, n) ||
    e.numberOfChildren !== t.numberOfChildren
  )
    return !1;
  for (let i in t.children)
    if (!e.children[i] || !Vy(e.children[i], t.children[i], n)) return !1;
  return !0;
}
function VM(e, t) {
  return (
    Object.keys(t).length <= Object.keys(e).length &&
    Object.keys(t).every((n) => Ly(e[n], t[n]))
  );
}
function Hy(e, t, n) {
  return $y(e, t, t.segments, n);
}
function $y(e, t, n, i) {
  if (e.segments.length > n.length) {
    let r = e.segments.slice(0, n.length);
    return !(!Sr(r, n) || t.hasChildren() || !wl(r, n, i));
  } else if (e.segments.length === n.length) {
    if (!Sr(e.segments, n) || !wl(e.segments, n, i)) return !1;
    for (let r in t.children)
      if (!e.children[r] || !Hy(e.children[r], t.children[r], i)) return !1;
    return !0;
  } else {
    let r = n.slice(0, e.segments.length),
      o = n.slice(e.segments.length);
    return !Sr(e.segments, r) || !wl(e.segments, r, i) || !e.children[be]
      ? !1
      : $y(e.children[be], t, o, i);
  }
}
function wl(e, t, n) {
  return t.every((i, r) => By[n](e[r].parameters, i.parameters));
}
var mi = class {
    constructor(t = new Ve([], {}), n = {}, i = null) {
      (this.root = t), (this.queryParams = n), (this.fragment = i);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Oo(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return UM.serialize(this);
    }
  },
  Ve = class {
    constructor(t, n) {
      (this.segments = t),
        (this.children = n),
        (this.parent = null),
        Object.values(n).forEach((i) => (i.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Cl(this);
    }
  },
  Ir = class {
    constructor(t, n) {
      (this.path = t), (this.parameters = n);
    }
    get parameterMap() {
      return (this._parameterMap ??= Oo(this.parameters)), this._parameterMap;
    }
    toString() {
      return Gy(this);
    }
  };
function HM(e, t) {
  return Sr(e, t) && e.every((n, i) => Zn(n.parameters, t[i].parameters));
}
function Sr(e, t) {
  return e.length !== t.length ? !1 : e.every((n, i) => n.path === t[i].path);
}
function $M(e, t) {
  let n = [];
  return (
    Object.entries(e.children).forEach(([i, r]) => {
      i === be && (n = n.concat(t(r, i)));
    }),
    Object.entries(e.children).forEach(([i, r]) => {
      i !== be && (n = n.concat(t(r, i)));
    }),
    n
  );
}
var Gs = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({
          token: e,
          factory: () => new xo(),
          providedIn: "root",
        });
      }
    }
    return e;
  })(),
  xo = class {
    parse(t) {
      let n = new mh(t);
      return new mi(
        n.parseRootSegment(),
        n.parseQueryParams(),
        n.parseFragment()
      );
    }
    serialize(t) {
      let n = `/${Ss(t.root, !0)}`,
        i = WM(t.queryParams),
        r = typeof t.fragment == "string" ? `#${GM(t.fragment)}` : "";
      return `${n}${i}${r}`;
    }
  },
  UM = new xo();
function Cl(e) {
  return e.segments.map((t) => Gy(t)).join("/");
}
function Ss(e, t) {
  if (!e.hasChildren()) return Cl(e);
  if (t) {
    let n = e.children[be] ? Ss(e.children[be], !1) : "",
      i = [];
    return (
      Object.entries(e.children).forEach(([r, o]) => {
        r !== be && i.push(`${r}:${Ss(o, !1)}`);
      }),
      i.length > 0 ? `${n}(${i.join("//")})` : n
    );
  } else {
    let n = $M(e, (i, r) =>
      r === be ? [Ss(e.children[be], !1)] : [`${r}:${Ss(i, !1)}`]
    );
    return Object.keys(e.children).length === 1 && e.children[be] != null
      ? `${Cl(e)}/${n[0]}`
      : `${Cl(e)}/(${n.join("//")})`;
  }
}
function Uy(e) {
  return encodeURIComponent(e)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function bl(e) {
  return Uy(e).replace(/%3B/gi, ";");
}
function GM(e) {
  return encodeURI(e);
}
function gh(e) {
  return Uy(e)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function El(e) {
  return decodeURIComponent(e);
}
function Sy(e) {
  return El(e.replace(/\+/g, "%20"));
}
function Gy(e) {
  return `${gh(e.path)}${zM(e.parameters)}`;
}
function zM(e) {
  return Object.entries(e)
    .map(([t, n]) => `;${gh(t)}=${gh(n)}`)
    .join("");
}
function WM(e) {
  let t = Object.entries(e)
    .map(([n, i]) =>
      Array.isArray(i)
        ? i.map((r) => `${bl(n)}=${bl(r)}`).join("&")
        : `${bl(n)}=${bl(i)}`
    )
    .filter((n) => n);
  return t.length ? `?${t.join("&")}` : "";
}
var qM = /^[^\/()?;#]+/;
function lh(e) {
  let t = e.match(qM);
  return t ? t[0] : "";
}
var ZM = /^[^\/()?;=#]+/;
function YM(e) {
  let t = e.match(ZM);
  return t ? t[0] : "";
}
var QM = /^[^=?&#]+/;
function KM(e) {
  let t = e.match(QM);
  return t ? t[0] : "";
}
var JM = /^[^&#]+/;
function XM(e) {
  let t = e.match(JM);
  return t ? t[0] : "";
}
var mh = class {
  constructor(t) {
    (this.url = t), (this.remaining = t);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new Ve([], {})
        : new Ve([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(t);
      while (this.consumeOptional("&"));
    return t;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let t = [];
    for (
      this.peekStartsWith("(") || t.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), t.push(this.parseSegment());
    let n = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (n = this.parseParens(!0)));
    let i = {};
    return (
      this.peekStartsWith("(") && (i = this.parseParens(!1)),
      (t.length > 0 || Object.keys(n).length > 0) && (i[be] = new Ve(t, n)),
      i
    );
  }
  parseSegment() {
    let t = lh(this.remaining);
    if (t === "" && this.peekStartsWith(";")) throw new ae(4009, !1);
    return this.capture(t), new Ir(El(t), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(";"); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let n = YM(this.remaining);
    if (!n) return;
    this.capture(n);
    let i = "";
    if (this.consumeOptional("=")) {
      let r = lh(this.remaining);
      r && ((i = r), this.capture(i));
    }
    t[El(n)] = El(i);
  }
  parseQueryParam(t) {
    let n = KM(this.remaining);
    if (!n) return;
    this.capture(n);
    let i = "";
    if (this.consumeOptional("=")) {
      let s = XM(this.remaining);
      s && ((i = s), this.capture(i));
    }
    let r = Sy(n),
      o = Sy(i);
    if (t.hasOwnProperty(r)) {
      let s = t[r];
      Array.isArray(s) || ((s = [s]), (t[r] = s)), s.push(o);
    } else t[r] = o;
  }
  parseParens(t) {
    let n = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let i = lh(this.remaining),
        r = this.remaining[i.length];
      if (r !== "/" && r !== ")" && r !== ";") throw new ae(4010, !1);
      let o;
      i.indexOf(":") > -1
        ? ((o = i.slice(0, i.indexOf(":"))), this.capture(o), this.capture(":"))
        : t && (o = be);
      let s = this.parseChildren();
      (n[o] = Object.keys(s).length === 1 ? s[be] : new Ve([], s)),
        this.consumeOptional("//");
    }
    return n;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t)
      ? ((this.remaining = this.remaining.substring(t.length)), !0)
      : !1;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new ae(4011, !1);
  }
};
function zy(e) {
  return e.segments.length > 0 ? new Ve([], { [be]: e }) : e;
}
function Wy(e) {
  let t = {};
  for (let [i, r] of Object.entries(e.children)) {
    let o = Wy(r);
    if (i === be && o.segments.length === 0 && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) t[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (t[i] = o);
  }
  let n = new Ve(e.segments, t);
  return eI(n);
}
function eI(e) {
  if (e.numberOfChildren === 1 && e.children[be]) {
    let t = e.children[be];
    return new Ve(e.segments.concat(t.segments), t.children);
  }
  return e;
}
function Ps(e) {
  return e instanceof mi;
}
function tI(e, t, n = null, i = null) {
  let r = qy(e);
  return Zy(r, t, n, i);
}
function qy(e) {
  let t;
  function n(o) {
    let s = {};
    for (let c of o.children) {
      let l = n(c);
      s[c.outlet] = l;
    }
    let a = new Ve(o.url, s);
    return o === e && (t = a), a;
  }
  let i = n(e.root),
    r = zy(i);
  return t ?? r;
}
function Zy(e, t, n, i) {
  let r = e;
  for (; r.parent; ) r = r.parent;
  if (t.length === 0) return uh(r, r, r, n, i);
  let o = nI(t);
  if (o.toRoot()) return uh(r, r, new Ve([], {}), n, i);
  let s = iI(o, r, e),
    a = s.processChildren
      ? Ns(s.segmentGroup, s.index, o.commands)
      : Qy(s.segmentGroup, s.index, o.commands);
  return uh(r, s.segmentGroup, a, n, i);
}
function Tl(e) {
  return typeof e == "object" && e != null && !e.outlets && !e.segmentPath;
}
function ks(e) {
  return typeof e == "object" && e != null && e.outlets;
}
function uh(e, t, n, i, r) {
  let o = {};
  i &&
    Object.entries(i).forEach(([c, l]) => {
      o[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
    });
  let s;
  e === t ? (s = n) : (s = Yy(e, t, n));
  let a = zy(Wy(s));
  return new mi(a, o, r);
}
function Yy(e, t, n) {
  let i = {};
  return (
    Object.entries(e.children).forEach(([r, o]) => {
      o === t ? (i[r] = n) : (i[r] = Yy(o, t, n));
    }),
    new Ve(e.segments, i)
  );
}
var Ml = class {
  constructor(t, n, i) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = n),
      (this.commands = i),
      t && i.length > 0 && Tl(i[0]))
    )
      throw new ae(4003, !1);
    let r = i.find(ks);
    if (r && r !== jy(i)) throw new ae(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function nI(e) {
  if (typeof e[0] == "string" && e.length === 1 && e[0] === "/")
    return new Ml(!0, 0, e);
  let t = 0,
    n = !1,
    i = e.reduce((r, o, s) => {
      if (typeof o == "object" && o != null) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([c, l]) => {
              a[c] = typeof l == "string" ? l.split("/") : l;
            }),
            [...r, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...r, o.segmentPath];
      }
      return typeof o != "string"
        ? [...r, o]
        : s === 0
        ? (o.split("/").forEach((a, c) => {
            (c == 0 && a === ".") ||
              (c == 0 && a === ""
                ? (n = !0)
                : a === ".."
                ? t++
                : a != "" && r.push(a));
          }),
          r)
        : [...r, o];
    }, []);
  return new Ml(n, t, i);
}
var Mo = class {
  constructor(t, n, i) {
    (this.segmentGroup = t), (this.processChildren = n), (this.index = i);
  }
};
function iI(e, t, n) {
  if (e.isAbsolute) return new Mo(t, !0, 0);
  if (!n) return new Mo(t, !1, NaN);
  if (n.parent === null) return new Mo(n, !0, 0);
  let i = Tl(e.commands[0]) ? 0 : 1,
    r = n.segments.length - 1 + i;
  return rI(n, r, e.numberOfDoubleDots);
}
function rI(e, t, n) {
  let i = e,
    r = t,
    o = n;
  for (; o > r; ) {
    if (((o -= r), (i = i.parent), !i)) throw new ae(4005, !1);
    r = i.segments.length;
  }
  return new Mo(i, !1, r - o);
}
function oI(e) {
  return ks(e[0]) ? e[0].outlets : { [be]: e };
}
function Qy(e, t, n) {
  if (((e ??= new Ve([], {})), e.segments.length === 0 && e.hasChildren()))
    return Ns(e, t, n);
  let i = sI(e, t, n),
    r = n.slice(i.commandIndex);
  if (i.match && i.pathIndex < e.segments.length) {
    let o = new Ve(e.segments.slice(0, i.pathIndex), {});
    return (
      (o.children[be] = new Ve(e.segments.slice(i.pathIndex), e.children)),
      Ns(o, 0, r)
    );
  } else
    return i.match && r.length === 0
      ? new Ve(e.segments, {})
      : i.match && !e.hasChildren()
      ? _h(e, t, n)
      : i.match
      ? Ns(e, 0, r)
      : _h(e, t, n);
}
function Ns(e, t, n) {
  if (n.length === 0) return new Ve(e.segments, {});
  {
    let i = oI(n),
      r = {};
    if (
      Object.keys(i).some((o) => o !== be) &&
      e.children[be] &&
      e.numberOfChildren === 1 &&
      e.children[be].segments.length === 0
    ) {
      let o = Ns(e.children[be], t, n);
      return new Ve(e.segments, o.children);
    }
    return (
      Object.entries(i).forEach(([o, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (r[o] = Qy(e.children[o], t, s));
      }),
      Object.entries(e.children).forEach(([o, s]) => {
        i[o] === void 0 && (r[o] = s);
      }),
      new Ve(e.segments, r)
    );
  }
}
function sI(e, t, n) {
  let i = 0,
    r = t,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; r < e.segments.length; ) {
    if (i >= n.length) return o;
    let s = e.segments[r],
      a = n[i];
    if (ks(a)) break;
    let c = `${a}`,
      l = i < n.length - 1 ? n[i + 1] : null;
    if (r > 0 && c === void 0) break;
    if (c && l && typeof l == "object" && l.outlets === void 0) {
      if (!xy(c, l, s)) return o;
      i += 2;
    } else {
      if (!xy(c, {}, s)) return o;
      i++;
    }
    r++;
  }
  return { match: !0, pathIndex: r, commandIndex: i };
}
function _h(e, t, n) {
  let i = e.segments.slice(0, t),
    r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (ks(o)) {
      let c = aI(o.outlets);
      return new Ve(i, c);
    }
    if (r === 0 && Tl(n[0])) {
      let c = e.segments[t];
      i.push(new Ir(c.path, Oy(n[0]))), r++;
      continue;
    }
    let s = ks(o) ? o.outlets[be] : `${o}`,
      a = r < n.length - 1 ? n[r + 1] : null;
    s && a && Tl(a)
      ? (i.push(new Ir(s, Oy(a))), (r += 2))
      : (i.push(new Ir(s, {})), r++);
  }
  return new Ve(i, {});
}
function aI(e) {
  let t = {};
  return (
    Object.entries(e).forEach(([n, i]) => {
      typeof i == "string" && (i = [i]),
        i !== null && (t[n] = _h(new Ve([], {}), 0, i));
    }),
    t
  );
}
function Oy(e) {
  let t = {};
  return Object.entries(e).forEach(([n, i]) => (t[n] = `${i}`)), t;
}
function xy(e, t, n) {
  return e == n.path && Zn(t, n.parameters);
}
var As = "imperative",
  St = (function (e) {
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
  })(St || {}),
  mn = class {
    constructor(t, n) {
      (this.id = t), (this.url = n);
    }
  },
  No = class extends mn {
    constructor(t, n, i = "imperative", r = null) {
      super(t, n),
        (this.type = St.NavigationStart),
        (this.navigationTrigger = i),
        (this.restoredState = r);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  _i = class extends mn {
    constructor(t, n, i) {
      super(t, n), (this.urlAfterRedirects = i), (this.type = St.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  sn = (function (e) {
    return (
      (e[(e.Redirect = 0)] = "Redirect"),
      (e[(e.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (e[(e.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (e[(e.GuardRejected = 3)] = "GuardRejected"),
      e
    );
  })(sn || {}),
  Il = (function (e) {
    return (
      (e[(e.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (e[(e.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      e
    );
  })(Il || {}),
  gi = class extends mn {
    constructor(t, n, i, r) {
      super(t, n),
        (this.reason = i),
        (this.code = r),
        (this.type = St.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Yi = class extends mn {
    constructor(t, n, i, r) {
      super(t, n),
        (this.reason = i),
        (this.code = r),
        (this.type = St.NavigationSkipped);
    }
  },
  Fs = class extends mn {
    constructor(t, n, i, r) {
      super(t, n),
        (this.error = i),
        (this.target = r),
        (this.type = St.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Sl = class extends mn {
    constructor(t, n, i, r) {
      super(t, n),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = St.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  yh = class extends mn {
    constructor(t, n, i, r) {
      super(t, n),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = St.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  vh = class extends mn {
    constructor(t, n, i, r, o) {
      super(t, n),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.shouldActivate = o),
        (this.type = St.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  bh = class extends mn {
    constructor(t, n, i, r) {
      super(t, n),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = St.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Dh = class extends mn {
    constructor(t, n, i, r) {
      super(t, n),
        (this.urlAfterRedirects = i),
        (this.state = r),
        (this.type = St.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  wh = class {
    constructor(t) {
      (this.route = t), (this.type = St.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Ch = class {
    constructor(t) {
      (this.route = t), (this.type = St.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Eh = class {
    constructor(t) {
      (this.snapshot = t), (this.type = St.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Th = class {
    constructor(t) {
      (this.snapshot = t), (this.type = St.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Mh = class {
    constructor(t) {
      (this.snapshot = t), (this.type = St.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Ls = class {
    constructor(t) {
      (this.snapshot = t), (this.type = St.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Ol = class {
    constructor(t, n, i) {
      (this.routerEvent = t),
        (this.position = n),
        (this.anchor = i),
        (this.type = St.Scroll);
    }
    toString() {
      let t = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${t}')`;
    }
  },
  js = class {},
  Ao = class {
    constructor(t, n) {
      (this.url = t), (this.navigationBehaviorOptions = n);
    }
  };
function cI(e, t) {
  return (
    e.providers &&
      !e._injector &&
      (e._injector = Hc(e.providers, t, `Route: ${e.path}`)),
    e._injector ?? t
  );
}
function Pn(e) {
  return e.outlet || be;
}
function lI(e, t) {
  let n = e.filter((i) => Pn(i) === t);
  return n.push(...e.filter((i) => Pn(i) !== t)), n;
}
function zs(e) {
  if (!e) return null;
  if (e.routeConfig?._injector) return e.routeConfig._injector;
  for (let t = e.parent; t; t = t.parent) {
    let n = t.routeConfig;
    if (n?._loadedInjector) return n._loadedInjector;
    if (n?._injector) return n._injector;
  }
  return null;
}
var Ih = class {
    get injector() {
      return zs(this.route?.snapshot) ?? this.rootInjector;
    }
    set injector(t) {}
    constructor(t) {
      (this.rootInjector = t),
        (this.outlet = null),
        (this.route = null),
        (this.children = new Ws(this.rootInjector)),
        (this.attachRef = null);
    }
  },
  Ws = (() => {
    class e {
      constructor(n) {
        (this.rootInjector = n), (this.contexts = new Map());
      }
      onChildOutletCreated(n, i) {
        let r = this.getOrCreateContext(n);
        (r.outlet = i), this.contexts.set(n, r);
      }
      onChildOutletDestroyed(n) {
        let i = this.getContext(n);
        i && ((i.outlet = null), (i.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let i = this.getContext(n);
        return (
          i || ((i = new Ih(this.rootInjector)), this.contexts.set(n, i)), i
        );
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(Ft));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  xl = class {
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let n = this.pathFromRoot(t);
      return n.length > 1 ? n[n.length - 2] : null;
    }
    children(t) {
      let n = Sh(t, this._root);
      return n ? n.children.map((i) => i.value) : [];
    }
    firstChild(t) {
      let n = Sh(t, this._root);
      return n && n.children.length > 0 ? n.children[0].value : null;
    }
    siblings(t) {
      let n = Oh(t, this._root);
      return n.length < 2
        ? []
        : n[n.length - 2].children.map((r) => r.value).filter((r) => r !== t);
    }
    pathFromRoot(t) {
      return Oh(t, this._root).map((n) => n.value);
    }
  };
function Sh(e, t) {
  if (e === t.value) return t;
  for (let n of t.children) {
    let i = Sh(e, n);
    if (i) return i;
  }
  return null;
}
function Oh(e, t) {
  if (e === t.value) return [t];
  for (let n of t.children) {
    let i = Oh(e, n);
    if (i.length) return i.unshift(t), i;
  }
  return [];
}
var on = class {
  constructor(t, n) {
    (this.value = t), (this.children = n);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function To(e) {
  let t = {};
  return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
}
var Nl = class extends xl {
  constructor(t, n) {
    super(t), (this.snapshot = n), jh(this, t);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Ky(e) {
  let t = uI(e),
    n = new Ct([new Ir("", {})]),
    i = new Ct({}),
    r = new Ct({}),
    o = new Ct({}),
    s = new Ct(""),
    a = new Ro(n, i, o, s, r, be, e, t.root);
  return (a.snapshot = t.root), new Nl(new on(a, []), t);
}
function uI(e) {
  let t = {},
    n = {},
    i = {},
    r = "",
    o = new Io([], t, i, r, n, be, e, null, {});
  return new Rl("", new on(o, []));
}
var Ro = class {
  constructor(t, n, i, r, o, s, a, c) {
    (this.urlSubject = t),
      (this.paramsSubject = n),
      (this.queryParamsSubject = i),
      (this.fragmentSubject = r),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(ue((l) => l[Us])) ?? X(void 0)),
      (this.url = t),
      (this.params = n),
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
      (this._paramMap ??= this.params.pipe(ue((t) => Oo(t)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(ue((t) => Oo(t)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function Al(e, t, n = "emptyOnly") {
  let i,
    { routeConfig: r } = e;
  return (
    t !== null &&
    (n === "always" ||
      r?.path === "" ||
      (!t.component && !t.routeConfig?.loadComponent))
      ? (i = {
          params: G(G({}, t.params), e.params),
          data: G(G({}, t.data), e.data),
          resolve: G(G(G(G({}, e.data), t.data), r?.data), e._resolvedData),
        })
      : (i = {
          params: G({}, e.params),
          data: G({}, e.data),
          resolve: G(G({}, e.data), e._resolvedData ?? {}),
        }),
    r && Xy(r) && (i.resolve[Us] = r.title),
    i
  );
}
var Io = class {
    get title() {
      return this.data?.[Us];
    }
    constructor(t, n, i, r, o, s, a, c, l) {
      (this.url = t),
        (this.params = n),
        (this.queryParams = i),
        (this.fragment = r),
        (this.data = o),
        (this.outlet = s),
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
      return (this._paramMap ??= Oo(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= Oo(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let t = this.url.map((i) => i.toString()).join("/"),
        n = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${t}', path:'${n}')`;
    }
  },
  Rl = class extends xl {
    constructor(t, n) {
      super(n), (this.url = t), jh(this, n);
    }
    toString() {
      return Jy(this._root);
    }
  };
function jh(e, t) {
  (t.value._routerState = e), t.children.forEach((n) => jh(e, n));
}
function Jy(e) {
  let t = e.children.length > 0 ? ` { ${e.children.map(Jy).join(", ")} } ` : "";
  return `${e.value}${t}`;
}
function dh(e) {
  if (e.snapshot) {
    let t = e.snapshot,
      n = e._futureSnapshot;
    (e.snapshot = n),
      Zn(t.queryParams, n.queryParams) ||
        e.queryParamsSubject.next(n.queryParams),
      t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
      Zn(t.params, n.params) || e.paramsSubject.next(n.params),
      LM(t.url, n.url) || e.urlSubject.next(n.url),
      Zn(t.data, n.data) || e.dataSubject.next(n.data);
  } else
    (e.snapshot = e._futureSnapshot),
      e.dataSubject.next(e._futureSnapshot.data);
}
function xh(e, t) {
  let n = Zn(e.params, t.params) && HM(e.url, t.url),
    i = !e.parent != !t.parent;
  return n && !i && (!e.parent || xh(e.parent, t.parent));
}
function Xy(e) {
  return typeof e.title == "string" || e.title === null;
}
var dI = (() => {
    class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = be),
          (this.activateEvents = new $e()),
          (this.deactivateEvents = new $e()),
          (this.attachEvents = new $e()),
          (this.detachEvents = new $e()),
          (this.parentContexts = I(Ws)),
          (this.location = I(ui)),
          (this.changeDetector = I(pn)),
          (this.inputBinder = I(jl, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: i, previousValue: r } = n.name;
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
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
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
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new ae(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new ae(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new ae(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, i) {
        (this.activated = n),
          (this._activatedRoute = i),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, i) {
        if (this.isActivated) throw new ae(4013, !1);
        this._activatedRoute = n;
        let r = this.location,
          s = n.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          c = new Nh(n, a, r.injector);
        (this.activated = r.createComponent(s, {
          index: r.length,
          injector: c,
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
        this.ɵdir = $i({
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
          features: [go],
        });
      }
    }
    return e;
  })(),
  Nh = class e {
    __ngOutletInjector(t) {
      return new e(this.route, this.childContexts, t);
    }
    constructor(t, n, i) {
      (this.route = t), (this.childContexts = n), (this.parent = i);
    }
    get(t, n) {
      return t === Ro
        ? this.route
        : t === Ws
        ? this.childContexts
        : this.parent.get(t, n);
    }
  },
  jl = new Y(""),
  Ny = (() => {
    class e {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(n) {
        this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
      }
      unsubscribeFromRouteData(n) {
        this.outletDataSubscriptions.get(n)?.unsubscribe(),
          this.outletDataSubscriptions.delete(n);
      }
      subscribeToRouteData(n) {
        let { activatedRoute: i } = n,
          r = Qr([i.queryParams, i.params, i.data])
            .pipe(
              lt(
                ([o, s, a], c) => (
                  (a = G(G(G({}, o), s), a)),
                  c === 0 ? X(a) : Promise.resolve(a)
                )
              )
            )
            .subscribe((o) => {
              if (
                !n.isActivated ||
                !n.activatedComponentRef ||
                n.activatedRoute !== i ||
                i.component === null
              ) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              let s = k_(i.component);
              if (!s) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              for (let { templateName: a } of s.inputs)
                n.activatedComponentRef.setInput(a, o[a]);
            });
        this.outletDataSubscriptions.set(n, r);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function fI(e, t, n) {
  let i = Bs(e, t._root, n ? n._root : void 0);
  return new Nl(i, t);
}
function Bs(e, t, n) {
  if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
    let i = n.value;
    i._futureSnapshot = t.value;
    let r = hI(e, t, n);
    return new on(i, r);
  } else {
    if (e.shouldAttach(t.value)) {
      let o = e.retrieve(t.value);
      if (o !== null) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = t.value),
          (s.children = t.children.map((a) => Bs(e, a))),
          s
        );
      }
    }
    let i = pI(t.value),
      r = t.children.map((o) => Bs(e, o));
    return new on(i, r);
  }
}
function hI(e, t, n) {
  return t.children.map((i) => {
    for (let r of n.children)
      if (e.shouldReuseRoute(i.value, r.value.snapshot)) return Bs(e, i, r);
    return Bs(e, i);
  });
}
function pI(e) {
  return new Ro(
    new Ct(e.url),
    new Ct(e.params),
    new Ct(e.queryParams),
    new Ct(e.fragment),
    new Ct(e.data),
    e.outlet,
    e.component,
    e
  );
}
var Vs = class {
    constructor(t, n) {
      (this.redirectTo = t), (this.navigationBehaviorOptions = n);
    }
  },
  ev = "ngNavigationCancelingError";
function Pl(e, t) {
  let { redirectTo: n, navigationBehaviorOptions: i } = Ps(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    r = tv(!1, sn.Redirect);
  return (r.url = n), (r.navigationBehaviorOptions = i), r;
}
function tv(e, t) {
  let n = new Error(`NavigationCancelingError: ${e || ""}`);
  return (n[ev] = !0), (n.cancellationCode = t), n;
}
function gI(e) {
  return nv(e) && Ps(e.url);
}
function nv(e) {
  return !!e && e[ev];
}
var mI = (e, t, n, i) =>
    ue(
      (r) => (
        new Ah(t, r.targetRouterState, r.currentRouterState, n, i).activate(e),
        r
      )
    ),
  Ah = class {
    constructor(t, n, i, r, o) {
      (this.routeReuseStrategy = t),
        (this.futureState = n),
        (this.currState = i),
        (this.forwardEvent = r),
        (this.inputBindingEnabled = o);
    }
    activate(t) {
      let n = this.futureState._root,
        i = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(n, i, t),
        dh(this.futureState.root),
        this.activateChildRoutes(n, i, t);
    }
    deactivateChildRoutes(t, n, i) {
      let r = To(n);
      t.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, r[s], i), delete r[s];
      }),
        Object.values(r).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, i);
        });
    }
    deactivateRoutes(t, n, i) {
      let r = t.value,
        o = n ? n.value : null;
      if (r === o)
        if (r.component) {
          let s = i.getContext(r.outlet);
          s && this.deactivateChildRoutes(t, n, s.children);
        } else this.deactivateChildRoutes(t, n, i);
      else o && this.deactivateRouteAndItsChildren(n, i);
    }
    deactivateRouteAndItsChildren(t, n) {
      t.value.component &&
      this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, n)
        : this.deactivateRouteAndOutlet(t, n);
    }
    detachAndStoreRouteSubtree(t, n) {
      let i = n.getContext(t.value.outlet),
        r = i && t.value.component ? i.children : n,
        o = To(t);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, r);
      if (i && i.outlet) {
        let s = i.outlet.detach(),
          a = i.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, {
          componentRef: s,
          route: t,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(t, n) {
      let i = n.getContext(t.value.outlet),
        r = i && t.value.component ? i.children : n,
        o = To(t);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, r);
      i &&
        (i.outlet && (i.outlet.deactivate(), i.children.onOutletDeactivated()),
        (i.attachRef = null),
        (i.route = null));
    }
    activateChildRoutes(t, n, i) {
      let r = To(n);
      t.children.forEach((o) => {
        this.activateRoutes(o, r[o.value.outlet], i),
          this.forwardEvent(new Ls(o.value.snapshot));
      }),
        t.children.length && this.forwardEvent(new Th(t.value.snapshot));
    }
    activateRoutes(t, n, i) {
      let r = t.value,
        o = n ? n.value : null;
      if ((dh(r), r === o))
        if (r.component) {
          let s = i.getOrCreateContext(r.outlet);
          this.activateChildRoutes(t, n, s.children);
        } else this.activateChildRoutes(t, n, i);
      else if (r.component) {
        let s = i.getOrCreateContext(r.outlet);
        if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(r.snapshot);
          this.routeReuseStrategy.store(r.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            dh(a.route.value),
            this.activateChildRoutes(t, null, s.children);
        } else
          (s.attachRef = null),
            (s.route = r),
            s.outlet && s.outlet.activateWith(r, s.injector),
            this.activateChildRoutes(t, null, s.children);
      } else this.activateChildRoutes(t, null, i);
    }
  },
  kl = class {
    constructor(t) {
      (this.path = t), (this.route = this.path[this.path.length - 1]);
    }
  },
  So = class {
    constructor(t, n) {
      (this.component = t), (this.route = n);
    }
  };
function _I(e, t, n) {
  let i = e._root,
    r = t ? t._root : null;
  return Os(i, r, n, [i.value]);
}
function yI(e) {
  let t = e.routeConfig ? e.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: e, guards: t };
}
function ko(e, t) {
  let n = Symbol(),
    i = t.get(e, n);
  return i === n ? (typeof e == "function" && !nm(e) ? e : t.get(e)) : i;
}
function Os(
  e,
  t,
  n,
  i,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = To(t);
  return (
    e.children.forEach((s) => {
      vI(s, o[s.value.outlet], n, i.concat([s.value]), r),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => Rs(a, n.getContext(s), r)),
    r
  );
}
function vI(
  e,
  t,
  n,
  i,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = e.value,
    s = t ? t.value : null,
    a = n ? n.getContext(e.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let c = bI(s, o, o.routeConfig.runGuardsAndResolvers);
    c
      ? r.canActivateChecks.push(new kl(i))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? Os(e, t, a ? a.children : null, i, r) : Os(e, t, n, i, r),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        r.canDeactivateChecks.push(new So(a.outlet.component, s));
  } else
    s && Rs(t, a, r),
      r.canActivateChecks.push(new kl(i)),
      o.component
        ? Os(e, null, a ? a.children : null, i, r)
        : Os(e, null, n, i, r);
  return r;
}
function bI(e, t, n) {
  if (typeof n == "function") return n(e, t);
  switch (n) {
    case "pathParamsChange":
      return !Sr(e.url, t.url);
    case "pathParamsOrQueryParamsChange":
      return !Sr(e.url, t.url) || !Zn(e.queryParams, t.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !xh(e, t) || !Zn(e.queryParams, t.queryParams);
    case "paramsChange":
    default:
      return !xh(e, t);
  }
}
function Rs(e, t, n) {
  let i = To(e),
    r = e.value;
  Object.entries(i).forEach(([o, s]) => {
    r.component
      ? t
        ? Rs(s, t.children.getContext(o), n)
        : Rs(s, null, n)
      : Rs(s, t, n);
  }),
    r.component
      ? t && t.outlet && t.outlet.isActivated
        ? n.canDeactivateChecks.push(new So(t.outlet.component, r))
        : n.canDeactivateChecks.push(new So(null, r))
      : n.canDeactivateChecks.push(new So(null, r));
}
function qs(e) {
  return typeof e == "function";
}
function DI(e) {
  return typeof e == "boolean";
}
function wI(e) {
  return e && qs(e.canLoad);
}
function CI(e) {
  return e && qs(e.canActivate);
}
function EI(e) {
  return e && qs(e.canActivateChild);
}
function TI(e) {
  return e && qs(e.canDeactivate);
}
function MI(e) {
  return e && qs(e.canMatch);
}
function iv(e) {
  return e instanceof ei || e?.name === "EmptyError";
}
var Dl = Symbol("INITIAL_VALUE");
function Po() {
  return lt((e) =>
    Qr(e.map((t) => t.pipe(Tt(1), ur(Dl)))).pipe(
      ue((t) => {
        for (let n of t)
          if (n !== !0) {
            if (n === Dl) return Dl;
            if (n === !1 || II(n)) return n;
          }
        return !0;
      }),
      Et((t) => t !== Dl),
      Tt(1)
    )
  );
}
function II(e) {
  return Ps(e) || e instanceof Vs;
}
function SI(e, t) {
  return qe((n) => {
    let {
      targetSnapshot: i,
      currentSnapshot: r,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = n;
    return s.length === 0 && o.length === 0
      ? X(We(G({}, n), { guardsResult: !0 }))
      : OI(s, i, r, e).pipe(
          qe((a) => (a && DI(a) ? xI(i, o, e, t) : X(a))),
          ue((a) => We(G({}, n), { guardsResult: a }))
        );
  });
}
function OI(e, t, n, i) {
  return Qe(e).pipe(
    qe((r) => kI(r.component, r.route, n, t, i)),
    Vn((r) => r !== !0, !0)
  );
}
function xI(e, t, n, i) {
  return Qe(t).pipe(
    Tn((r) =>
      Qt(
        AI(r.route.parent, i),
        NI(r.route, i),
        PI(e, r.path, n),
        RI(e, r.route, n)
      )
    ),
    Vn((r) => r !== !0, !0)
  );
}
function NI(e, t) {
  return e !== null && t && t(new Mh(e)), X(!0);
}
function AI(e, t) {
  return e !== null && t && t(new Eh(e)), X(!0);
}
function RI(e, t, n) {
  let i = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!i || i.length === 0) return X(!0);
  let r = i.map((o) =>
    cr(() => {
      let s = zs(t) ?? n,
        a = ko(o, s),
        c = CI(a) ? a.canActivate(t, e) : fn(s, () => a(t, e));
      return Qi(c).pipe(Vn());
    })
  );
  return X(r).pipe(Po());
}
function PI(e, t, n) {
  let i = t[t.length - 1],
    o = t
      .slice(0, t.length - 1)
      .reverse()
      .map((s) => yI(s))
      .filter((s) => s !== null)
      .map((s) =>
        cr(() => {
          let a = s.guards.map((c) => {
            let l = zs(s.node) ?? n,
              u = ko(c, l),
              d = EI(u) ? u.canActivateChild(i, e) : fn(l, () => u(i, e));
            return Qi(d).pipe(Vn());
          });
          return X(a).pipe(Po());
        })
      );
  return X(o).pipe(Po());
}
function kI(e, t, n, i, r) {
  let o = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!o || o.length === 0) return X(!0);
  let s = o.map((a) => {
    let c = zs(t) ?? r,
      l = ko(a, c),
      u = TI(l) ? l.canDeactivate(e, t, n, i) : fn(c, () => l(e, t, n, i));
    return Qi(u).pipe(Vn());
  });
  return X(s).pipe(Po());
}
function FI(e, t, n, i) {
  let r = t.canLoad;
  if (r === void 0 || r.length === 0) return X(!0);
  let o = r.map((s) => {
    let a = ko(s, e),
      c = wI(a) ? a.canLoad(t, n) : fn(e, () => a(t, n));
    return Qi(c);
  });
  return X(o).pipe(Po(), rv(i));
}
function rv(e) {
  return Mu(
    st((t) => {
      if (typeof t != "boolean") throw Pl(e, t);
    }),
    ue((t) => t === !0)
  );
}
function LI(e, t, n, i) {
  let r = t.canMatch;
  if (!r || r.length === 0) return X(!0);
  let o = r.map((s) => {
    let a = ko(s, e),
      c = MI(a) ? a.canMatch(t, n) : fn(e, () => a(t, n));
    return Qi(c);
  });
  return X(o).pipe(Po(), rv(i));
}
var Hs = class {
    constructor(t) {
      this.segmentGroup = t || null;
    }
  },
  $s = class extends Error {
    constructor(t) {
      super(), (this.urlTree = t);
    }
  };
function Eo(e) {
  return Zr(new Hs(e));
}
function jI(e) {
  return Zr(new ae(4e3, !1));
}
function BI(e) {
  return Zr(tv(!1, sn.GuardRejected));
}
var Rh = class {
    constructor(t, n) {
      (this.urlSerializer = t), (this.urlTree = n);
    }
    lineralizeSegments(t, n) {
      let i = [],
        r = n.root;
      for (;;) {
        if (((i = i.concat(r.segments)), r.numberOfChildren === 0)) return X(i);
        if (r.numberOfChildren > 1 || !r.children[be])
          return jI(`${t.redirectTo}`);
        r = r.children[be];
      }
    }
    applyRedirectCommands(t, n, i, r, o) {
      if (typeof n != "string") {
        let a = n,
          {
            queryParams: c,
            fragment: l,
            routeConfig: u,
            url: d,
            outlet: p,
            params: h,
            data: D,
            title: w,
          } = r,
          M = fn(o, () =>
            a({
              params: h,
              data: D,
              queryParams: c,
              fragment: l,
              routeConfig: u,
              url: d,
              outlet: p,
              title: w,
            })
          );
        if (M instanceof mi) throw new $s(M);
        n = M;
      }
      let s = this.applyRedirectCreateUrlTree(
        n,
        this.urlSerializer.parse(n),
        t,
        i
      );
      if (n[0] === "/") throw new $s(s);
      return s;
    }
    applyRedirectCreateUrlTree(t, n, i, r) {
      let o = this.createSegmentGroup(t, n.root, i, r);
      return new mi(
        o,
        this.createQueryParams(n.queryParams, this.urlTree.queryParams),
        n.fragment
      );
    }
    createQueryParams(t, n) {
      let i = {};
      return (
        Object.entries(t).forEach(([r, o]) => {
          if (typeof o == "string" && o[0] === ":") {
            let a = o.substring(1);
            i[r] = n[a];
          } else i[r] = o;
        }),
        i
      );
    }
    createSegmentGroup(t, n, i, r) {
      let o = this.createSegments(t, n.segments, i, r),
        s = {};
      return (
        Object.entries(n.children).forEach(([a, c]) => {
          s[a] = this.createSegmentGroup(t, c, i, r);
        }),
        new Ve(o, s)
      );
    }
    createSegments(t, n, i, r) {
      return n.map((o) =>
        o.path[0] === ":" ? this.findPosParam(t, o, r) : this.findOrReturn(o, i)
      );
    }
    findPosParam(t, n, i) {
      let r = i[n.path.substring(1)];
      if (!r) throw new ae(4001, !1);
      return r;
    }
    findOrReturn(t, n) {
      let i = 0;
      for (let r of n) {
        if (r.path === t.path) return n.splice(i), r;
        i++;
      }
      return t;
    }
  },
  Ph = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function VI(e, t, n, i, r) {
  let o = ov(e, t, n);
  return o.matched
    ? ((i = cI(t, i)),
      LI(i, t, n, r).pipe(ue((s) => (s === !0 ? o : G({}, Ph)))))
    : X(o);
}
function ov(e, t, n) {
  if (t.path === "**") return HI(n);
  if (t.path === "")
    return t.pathMatch === "full" && (e.hasChildren() || n.length > 0)
      ? G({}, Ph)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: n,
          parameters: {},
          positionalParamSegments: {},
        };
  let r = (t.matcher || FM)(n, e, t);
  if (!r) return G({}, Ph);
  let o = {};
  Object.entries(r.posParams ?? {}).forEach(([a, c]) => {
    o[a] = c.path;
  });
  let s =
    r.consumed.length > 0
      ? G(G({}, o), r.consumed[r.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: r.consumed,
    remainingSegments: n.slice(r.consumed.length),
    parameters: s,
    positionalParamSegments: r.posParams ?? {},
  };
}
function HI(e) {
  return {
    matched: !0,
    parameters: e.length > 0 ? jy(e).parameters : {},
    consumedSegments: e,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Ay(e, t, n, i) {
  return n.length > 0 && GI(e, n, i)
    ? {
        segmentGroup: new Ve(t, UI(i, new Ve(n, e.children))),
        slicedSegments: [],
      }
    : n.length === 0 && zI(e, n, i)
    ? {
        segmentGroup: new Ve(e.segments, $I(e, n, i, e.children)),
        slicedSegments: n,
      }
    : { segmentGroup: new Ve(e.segments, e.children), slicedSegments: n };
}
function $I(e, t, n, i) {
  let r = {};
  for (let o of n)
    if (Bl(e, t, o) && !i[Pn(o)]) {
      let s = new Ve([], {});
      r[Pn(o)] = s;
    }
  return G(G({}, i), r);
}
function UI(e, t) {
  let n = {};
  n[be] = t;
  for (let i of e)
    if (i.path === "" && Pn(i) !== be) {
      let r = new Ve([], {});
      n[Pn(i)] = r;
    }
  return n;
}
function GI(e, t, n) {
  return n.some((i) => Bl(e, t, i) && Pn(i) !== be);
}
function zI(e, t, n) {
  return n.some((i) => Bl(e, t, i));
}
function Bl(e, t, n) {
  return (e.hasChildren() || t.length > 0) && n.pathMatch === "full"
    ? !1
    : n.path === "";
}
function WI(e, t, n) {
  return t.length === 0 && !e.children[n];
}
var kh = class {};
function qI(e, t, n, i, r, o, s = "emptyOnly") {
  return new Fh(e, t, n, i, r, s, o).recognize();
}
var ZI = 31,
  Fh = class {
    constructor(t, n, i, r, o, s, a) {
      (this.injector = t),
        (this.configLoader = n),
        (this.rootComponentType = i),
        (this.config = r),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new Rh(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(t) {
      return new ae(4002, `'${t.segmentGroup}'`);
    }
    recognize() {
      let t = Ay(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(t).pipe(
        ue(({ children: n, rootSnapshot: i }) => {
          let r = new on(i, n),
            o = new Rl("", r),
            s = tI(i, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            { state: o, tree: s }
          );
        })
      );
    }
    match(t) {
      let n = new Io(
        [],
        Object.freeze({}),
        Object.freeze(G({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        be,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(
        this.injector,
        this.config,
        t,
        be,
        n
      ).pipe(
        ue((i) => ({ children: i, rootSnapshot: n })),
        Ni((i) => {
          if (i instanceof $s)
            return (this.urlTree = i.urlTree), this.match(i.urlTree.root);
          throw i instanceof Hs ? this.noMatchError(i) : i;
        })
      );
    }
    processSegmentGroup(t, n, i, r, o) {
      return i.segments.length === 0 && i.hasChildren()
        ? this.processChildren(t, n, i, o)
        : this.processSegment(t, n, i, i.segments, r, !0, o).pipe(
            ue((s) => (s instanceof on ? [s] : []))
          );
    }
    processChildren(t, n, i, r) {
      let o = [];
      for (let s of Object.keys(i.children))
        s === "primary" ? o.unshift(s) : o.push(s);
      return Qe(o).pipe(
        Tn((s) => {
          let a = i.children[s],
            c = lI(n, s);
          return this.processSegmentGroup(t, c, a, s, r);
        }),
        Lu((s, a) => (s.push(...a), s)),
        Ai(null),
        Fu(),
        qe((s) => {
          if (s === null) return Eo(i);
          let a = sv(s);
          return YI(a), X(a);
        })
      );
    }
    processSegment(t, n, i, r, o, s, a) {
      return Qe(n).pipe(
        Tn((c) =>
          this.processSegmentAgainstRoute(
            c._injector ?? t,
            n,
            c,
            i,
            r,
            o,
            s,
            a
          ).pipe(
            Ni((l) => {
              if (l instanceof Hs) return X(null);
              throw l;
            })
          )
        ),
        Vn((c) => !!c),
        Ni((c) => {
          if (iv(c)) return WI(i, r, o) ? X(new kh()) : Eo(i);
          throw c;
        })
      );
    }
    processSegmentAgainstRoute(t, n, i, r, o, s, a, c) {
      return Pn(i) !== s && (s === be || !Bl(r, o, i))
        ? Eo(r)
        : i.redirectTo === void 0
        ? this.matchSegmentAgainstRoute(t, r, i, o, s, c)
        : this.allowRedirects && a
        ? this.expandSegmentAgainstRouteUsingRedirect(t, r, n, i, o, s, c)
        : Eo(r);
    }
    expandSegmentAgainstRouteUsingRedirect(t, n, i, r, o, s, a) {
      let {
        matched: c,
        parameters: l,
        consumedSegments: u,
        positionalParamSegments: d,
        remainingSegments: p,
      } = ov(n, r, o);
      if (!c) return Eo(n);
      typeof r.redirectTo == "string" &&
        r.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > ZI && (this.allowRedirects = !1));
      let h = new Io(
          o,
          l,
          Object.freeze(G({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          Ry(r),
          Pn(r),
          r.component ?? r._loadedComponent ?? null,
          r,
          Py(r)
        ),
        D = Al(h, a, this.paramsInheritanceStrategy);
      (h.params = Object.freeze(D.params)), (h.data = Object.freeze(D.data));
      let w = this.applyRedirects.applyRedirectCommands(
        u,
        r.redirectTo,
        d,
        h,
        t
      );
      return this.applyRedirects
        .lineralizeSegments(r, w)
        .pipe(qe((M) => this.processSegment(t, i, n, M.concat(p), s, !1, a)));
    }
    matchSegmentAgainstRoute(t, n, i, r, o, s) {
      let a = VI(n, i, r, t, this.urlSerializer);
      return (
        i.path === "**" && (n.children = {}),
        a.pipe(
          lt((c) =>
            c.matched
              ? ((t = i._injector ?? t),
                this.getChildConfig(t, i, r).pipe(
                  lt(({ routes: l }) => {
                    let u = i._loadedInjector ?? t,
                      {
                        parameters: d,
                        consumedSegments: p,
                        remainingSegments: h,
                      } = c,
                      D = new Io(
                        p,
                        d,
                        Object.freeze(G({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        Ry(i),
                        Pn(i),
                        i.component ?? i._loadedComponent ?? null,
                        i,
                        Py(i)
                      ),
                      w = Al(D, s, this.paramsInheritanceStrategy);
                    (D.params = Object.freeze(w.params)),
                      (D.data = Object.freeze(w.data));
                    let { segmentGroup: M, slicedSegments: P } = Ay(n, p, h, l);
                    if (P.length === 0 && M.hasChildren())
                      return this.processChildren(u, l, M, D).pipe(
                        ue((C) => new on(D, C))
                      );
                    if (l.length === 0 && P.length === 0)
                      return X(new on(D, []));
                    let S = Pn(i) === o;
                    return this.processSegment(
                      u,
                      l,
                      M,
                      P,
                      S ? be : o,
                      !0,
                      D
                    ).pipe(ue((C) => new on(D, C instanceof on ? [C] : [])));
                  })
                ))
              : Eo(n)
          )
        )
      );
    }
    getChildConfig(t, n, i) {
      return n.children
        ? X({ routes: n.children, injector: t })
        : n.loadChildren
        ? n._loadedRoutes !== void 0
          ? X({ routes: n._loadedRoutes, injector: n._loadedInjector })
          : FI(t, n, i, this.urlSerializer).pipe(
              qe((r) =>
                r
                  ? this.configLoader.loadChildren(t, n).pipe(
                      st((o) => {
                        (n._loadedRoutes = o.routes),
                          (n._loadedInjector = o.injector);
                      })
                    )
                  : BI(n)
              )
            )
        : X({ routes: [], injector: t });
    }
  };
function YI(e) {
  e.sort((t, n) =>
    t.value.outlet === be
      ? -1
      : n.value.outlet === be
      ? 1
      : t.value.outlet.localeCompare(n.value.outlet)
  );
}
function QI(e) {
  let t = e.value.routeConfig;
  return t && t.path === "";
}
function sv(e) {
  let t = [],
    n = new Set();
  for (let i of e) {
    if (!QI(i)) {
      t.push(i);
      continue;
    }
    let r = t.find((o) => i.value.routeConfig === o.value.routeConfig);
    r !== void 0 ? (r.children.push(...i.children), n.add(r)) : t.push(i);
  }
  for (let i of n) {
    let r = sv(i.children);
    t.push(new on(i.value, r));
  }
  return t.filter((i) => !n.has(i));
}
function Ry(e) {
  return e.data || {};
}
function Py(e) {
  return e.resolve || {};
}
function KI(e, t, n, i, r, o) {
  return qe((s) =>
    qI(e, t, n, i, s.extractedUrl, r, o).pipe(
      ue(({ state: a, tree: c }) =>
        We(G({}, s), { targetSnapshot: a, urlAfterRedirects: c })
      )
    )
  );
}
function JI(e, t) {
  return qe((n) => {
    let {
      targetSnapshot: i,
      guards: { canActivateChecks: r },
    } = n;
    if (!r.length) return X(n);
    let o = new Set(r.map((c) => c.route)),
      s = new Set();
    for (let c of o) if (!s.has(c)) for (let l of av(c)) s.add(l);
    let a = 0;
    return Qe(s).pipe(
      Tn((c) =>
        o.has(c)
          ? XI(c, i, e, t)
          : ((c.data = Al(c, c.parent, e).resolve), X(void 0))
      ),
      st(() => a++),
      Kr(1),
      qe((c) => (a === s.size ? X(n) : At))
    );
  });
}
function av(e) {
  let t = e.children.map((n) => av(n)).flat();
  return [e, ...t];
}
function XI(e, t, n, i) {
  let r = e.routeConfig,
    o = e._resolve;
  return (
    r?.title !== void 0 && !Xy(r) && (o[Us] = r.title),
    eS(o, e, t, i).pipe(
      ue(
        (s) => (
          (e._resolvedData = s), (e.data = Al(e, e.parent, n).resolve), null
        )
      )
    )
  );
}
function eS(e, t, n, i) {
  let r = ph(e);
  if (r.length === 0) return X({});
  let o = {};
  return Qe(r).pipe(
    qe((s) =>
      tS(e[s], t, n, i).pipe(
        Vn(),
        st((a) => {
          if (a instanceof Vs) throw Pl(new xo(), a);
          o[s] = a;
        })
      )
    ),
    Kr(1),
    Jo(o),
    Ni((s) => (iv(s) ? At : Zr(s)))
  );
}
function tS(e, t, n, i) {
  let r = zs(t) ?? i,
    o = ko(e, r),
    s = o.resolve ? o.resolve(t, n) : fn(r, () => o(t, n));
  return Qi(s);
}
function fh(e) {
  return lt((t) => {
    let n = e(t);
    return n ? Qe(n).pipe(ue(() => t)) : X(t);
  });
}
var cv = (() => {
    class e {
      buildTitle(n) {
        let i,
          r = n.root;
        for (; r !== void 0; )
          (i = this.getResolvedTitleForRoute(r) ?? i),
            (r = r.children.find((o) => o.outlet === be));
        return i;
      }
      getResolvedTitleForRoute(n) {
        return n.data[Us];
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: () => I(nS), providedIn: "root" });
      }
    }
    return e;
  })(),
  nS = (() => {
    class e extends cv {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let i = this.buildTitle(n);
        i !== void 0 && this.title.setTitle(i);
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(Ty));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  Zs = new Y("", { providedIn: "root", factory: () => ({}) }),
  iS = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵcmp = dn({
          type: e,
          selectors: [["ng-component"]],
          standalone: !0,
          features: [zc],
          decls: 1,
          vars: 0,
          template: function (i, r) {
            i & 1 && Ne(0, "router-outlet");
          },
          dependencies: [dI],
          encapsulation: 2,
        });
      }
    }
    return e;
  })();
function Bh(e) {
  let t = e.children && e.children.map(Bh),
    n = t ? We(G({}, e), { children: t }) : G({}, e);
  return (
    !n.component &&
      !n.loadComponent &&
      (t || n.loadChildren) &&
      n.outlet &&
      n.outlet !== be &&
      (n.component = iS),
    n
  );
}
var Fl = new Y(""),
  Vh = (() => {
    class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = I(Jc));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return X(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let i = Qi(n.loadComponent()).pipe(
            ue(lv),
            st((o) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = o);
            }),
            ti(() => {
              this.componentLoaders.delete(n);
            })
          ),
          r = new Gr(i, () => new tt()).pipe(Ur());
        return this.componentLoaders.set(n, r), r;
      }
      loadChildren(n, i) {
        if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
        if (i._loadedRoutes)
          return X({ routes: i._loadedRoutes, injector: i._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(i);
        let o = rS(i, this.compiler, n, this.onLoadEndListener).pipe(
            ti(() => {
              this.childrenLoaders.delete(i);
            })
          ),
          s = new Gr(o, () => new tt()).pipe(Ur());
        return this.childrenLoaders.set(i, s), s;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function rS(e, t, n, i) {
  return Qi(e.loadChildren()).pipe(
    ue(lv),
    qe((r) =>
      r instanceof ls || Array.isArray(r) ? X(r) : Qe(t.compileModuleAsync(r))
    ),
    ue((r) => {
      i && i(e);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(r)
          ? ((s = r), (a = !0))
          : ((o = r.create(n).injector),
            (s = o.get(Fl, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(Bh), injector: o }
      );
    })
  );
}
function oS(e) {
  return e && typeof e == "object" && "default" in e;
}
function lv(e) {
  return oS(e) ? e.default : e;
}
var Hh = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: () => I(sS), providedIn: "root" });
      }
    }
    return e;
  })(),
  sS = (() => {
    class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, i) {
        return n;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  uv = new Y(""),
  dv = new Y("");
function aS(e, t, n) {
  let i = e.get(dv),
    r = e.get(ht);
  return e.get(Oe).runOutsideAngular(() => {
    if (!r.startViewTransition || i.skipNextTransition)
      return (i.skipNextTransition = !1), new Promise((l) => setTimeout(l));
    let o,
      s = new Promise((l) => {
        o = l;
      }),
      a = r.startViewTransition(() => (o(), cS(e))),
      { onViewTransitionCreated: c } = i;
    return c && fn(e, () => c({ transition: a, from: t, to: n })), s;
  });
}
function cS(e) {
  return new Promise((t) => {
    _s({ read: () => setTimeout(t) }, { injector: e });
  });
}
var lS = new Y(""),
  $h = (() => {
    class e {
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      constructor() {
        (this.currentNavigation = null),
          (this.currentTransition = null),
          (this.lastSuccessfulNavigation = null),
          (this.events = new tt()),
          (this.transitionAbortSubject = new tt()),
          (this.configLoader = I(Vh)),
          (this.environmentInjector = I(Ft)),
          (this.urlSerializer = I(Gs)),
          (this.rootContexts = I(Ws)),
          (this.location = I(wo)),
          (this.inputBindingEnabled = I(jl, { optional: !0 }) !== null),
          (this.titleStrategy = I(cv)),
          (this.options = I(Zs, { optional: !0 }) || {}),
          (this.paramsInheritanceStrategy =
            this.options.paramsInheritanceStrategy || "emptyOnly"),
          (this.urlHandlingStrategy = I(Hh)),
          (this.createViewTransition = I(uv, { optional: !0 })),
          (this.navigationErrorHandler = I(lS, { optional: !0 })),
          (this.navigationId = 0),
          (this.afterPreactivation = () => X(void 0)),
          (this.rootComponentType = null);
        let n = (r) => this.events.next(new wh(r)),
          i = (r) => this.events.next(new Ch(r));
        (this.configLoader.onLoadEndListener = i),
          (this.configLoader.onLoadStartListener = n);
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(n) {
        let i = ++this.navigationId;
        this.transitions?.next(
          We(G(G({}, this.transitions.value), n), { id: i })
        );
      }
      setupNavigations(n, i, r) {
        return (
          (this.transitions = new Ct({
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
            source: As,
            restoredState: null,
            currentSnapshot: r.snapshot,
            targetSnapshot: null,
            currentRouterState: r,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
          })),
          this.transitions.pipe(
            Et((o) => o.id !== 0),
            ue((o) =>
              We(G({}, o), {
                extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
              })
            ),
            lt((o) => {
              let s = !1,
                a = !1;
              return X(o).pipe(
                lt((c) => {
                  if (this.navigationId > o.id)
                    return (
                      this.cancelNavigationTransition(
                        o,
                        "",
                        sn.SupersededByNewNavigation
                      ),
                      At
                    );
                  (this.currentTransition = o),
                    (this.currentNavigation = {
                      id: c.id,
                      initialUrl: c.rawUrl,
                      extractedUrl: c.extractedUrl,
                      targetBrowserUrl:
                        typeof c.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(c.extras.browserUrl)
                          : c.extras.browserUrl,
                      trigger: c.source,
                      extras: c.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? We(G({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                    });
                  let l =
                      !n.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    u = c.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                  if (!l && u !== "reload") {
                    let d = "";
                    return (
                      this.events.next(
                        new Yi(
                          c.id,
                          this.urlSerializer.serialize(c.rawUrl),
                          d,
                          Il.IgnoredSameUrlNavigation
                        )
                      ),
                      c.resolve(!1),
                      At
                    );
                  }
                  if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                    return X(c).pipe(
                      lt((d) => {
                        let p = this.transitions?.getValue();
                        return (
                          this.events.next(
                            new No(
                              d.id,
                              this.urlSerializer.serialize(d.extractedUrl),
                              d.source,
                              d.restoredState
                            )
                          ),
                          p !== this.transitions?.getValue()
                            ? At
                            : Promise.resolve(d)
                        );
                      }),
                      KI(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        n.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      st((d) => {
                        (o.targetSnapshot = d.targetSnapshot),
                          (o.urlAfterRedirects = d.urlAfterRedirects),
                          (this.currentNavigation = We(
                            G({}, this.currentNavigation),
                            { finalUrl: d.urlAfterRedirects }
                          ));
                        let p = new Sl(
                          d.id,
                          this.urlSerializer.serialize(d.extractedUrl),
                          this.urlSerializer.serialize(d.urlAfterRedirects),
                          d.targetSnapshot
                        );
                        this.events.next(p);
                      })
                    );
                  if (
                    l &&
                    this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                  ) {
                    let {
                        id: d,
                        extractedUrl: p,
                        source: h,
                        restoredState: D,
                        extras: w,
                      } = c,
                      M = new No(d, this.urlSerializer.serialize(p), h, D);
                    this.events.next(M);
                    let P = Ky(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = o =
                        We(G({}, c), {
                          targetSnapshot: P,
                          urlAfterRedirects: p,
                          extras: We(G({}, w), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      (this.currentNavigation.finalUrl = p),
                      X(o)
                    );
                  } else {
                    let d = "";
                    return (
                      this.events.next(
                        new Yi(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          d,
                          Il.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      c.resolve(!1),
                      At
                    );
                  }
                }),
                st((c) => {
                  let l = new yh(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot
                  );
                  this.events.next(l);
                }),
                ue(
                  (c) => (
                    (this.currentTransition = o =
                      We(G({}, c), {
                        guards: _I(
                          c.targetSnapshot,
                          c.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    o
                  )
                ),
                SI(this.environmentInjector, (c) => this.events.next(c)),
                st((c) => {
                  if (
                    ((o.guardsResult = c.guardsResult),
                    c.guardsResult && typeof c.guardsResult != "boolean")
                  )
                    throw Pl(this.urlSerializer, c.guardsResult);
                  let l = new vh(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                    !!c.guardsResult
                  );
                  this.events.next(l);
                }),
                Et((c) =>
                  c.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(c, "", sn.GuardRejected),
                      !1)
                ),
                fh((c) => {
                  if (c.guards.canActivateChecks.length)
                    return X(c).pipe(
                      st((l) => {
                        let u = new bh(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          this.urlSerializer.serialize(l.urlAfterRedirects),
                          l.targetSnapshot
                        );
                        this.events.next(u);
                      }),
                      lt((l) => {
                        let u = !1;
                        return X(l).pipe(
                          JI(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          st({
                            next: () => (u = !0),
                            complete: () => {
                              u ||
                                this.cancelNavigationTransition(
                                  l,
                                  "",
                                  sn.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      st((l) => {
                        let u = new Dh(
                          l.id,
                          this.urlSerializer.serialize(l.extractedUrl),
                          this.urlSerializer.serialize(l.urlAfterRedirects),
                          l.targetSnapshot
                        );
                        this.events.next(u);
                      })
                    );
                }),
                fh((c) => {
                  let l = (u) => {
                    let d = [];
                    u.routeConfig?.loadComponent &&
                      !u.routeConfig._loadedComponent &&
                      d.push(
                        this.configLoader.loadComponent(u.routeConfig).pipe(
                          st((p) => {
                            u.component = p;
                          }),
                          ue(() => {})
                        )
                      );
                    for (let p of u.children) d.push(...l(p));
                    return d;
                  };
                  return Qr(l(c.targetSnapshot.root)).pipe(Ai(null), Tt(1));
                }),
                fh(() => this.afterPreactivation()),
                lt(() => {
                  let { currentSnapshot: c, targetSnapshot: l } = o,
                    u = this.createViewTransition?.(
                      this.environmentInjector,
                      c.root,
                      l.root
                    );
                  return u ? Qe(u).pipe(ue(() => o)) : X(o);
                }),
                ue((c) => {
                  let l = fI(
                    n.routeReuseStrategy,
                    c.targetSnapshot,
                    c.currentRouterState
                  );
                  return (
                    (this.currentTransition = o =
                      We(G({}, c), { targetRouterState: l })),
                    (this.currentNavigation.targetRouterState = l),
                    o
                  );
                }),
                st(() => {
                  this.events.next(new js());
                }),
                mI(
                  this.rootContexts,
                  n.routeReuseStrategy,
                  (c) => this.events.next(c),
                  this.inputBindingEnabled
                ),
                Tt(1),
                st({
                  next: (c) => {
                    (s = !0),
                      (this.lastSuccessfulNavigation = this.currentNavigation),
                      this.events.next(
                        new _i(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        c.targetRouterState.snapshot
                      ),
                      c.resolve(!0);
                  },
                  complete: () => {
                    s = !0;
                  },
                }),
                Hn(
                  this.transitionAbortSubject.pipe(
                    st((c) => {
                      throw c;
                    })
                  )
                ),
                ti(() => {
                  !s &&
                    !a &&
                    this.cancelNavigationTransition(
                      o,
                      "",
                      sn.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === o.id &&
                      ((this.currentNavigation = null),
                      (this.currentTransition = null));
                }),
                Ni((c) => {
                  if (((a = !0), nv(c)))
                    this.events.next(
                      new gi(
                        o.id,
                        this.urlSerializer.serialize(o.extractedUrl),
                        c.message,
                        c.cancellationCode
                      )
                    ),
                      gI(c)
                        ? this.events.next(
                            new Ao(c.url, c.navigationBehaviorOptions)
                          )
                        : o.resolve(!1);
                  else {
                    let l = new Fs(
                      o.id,
                      this.urlSerializer.serialize(o.extractedUrl),
                      c,
                      o.targetSnapshot ?? void 0
                    );
                    try {
                      let u = fn(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(l)
                      );
                      if (u instanceof Vs) {
                        let { message: d, cancellationCode: p } = Pl(
                          this.urlSerializer,
                          u
                        );
                        this.events.next(
                          new gi(
                            o.id,
                            this.urlSerializer.serialize(o.extractedUrl),
                            d,
                            p
                          )
                        ),
                          this.events.next(
                            new Ao(u.redirectTo, u.navigationBehaviorOptions)
                          );
                      } else {
                        this.events.next(l);
                        let d = n.errorHandler(c);
                        o.resolve(!!d);
                      }
                    } catch (u) {
                      this.options.resolveNavigationPromiseOnError
                        ? o.resolve(!1)
                        : o.reject(u);
                    }
                  }
                  return At;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(n, i, r) {
        let o = new gi(
          n.id,
          this.urlSerializer.serialize(n.extractedUrl),
          i,
          r
        );
        this.events.next(o), n.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let n = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          i =
            this.currentNavigation?.targetBrowserUrl ??
            this.currentNavigation?.extractedUrl;
        return (
          n.toString() !== i?.toString() &&
          !this.currentNavigation?.extras.skipLocationChange
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function uS(e) {
  return e !== As;
}
var dS = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: () => I(fS), providedIn: "root" });
      }
    }
    return e;
  })(),
  Lh = class {
    shouldDetach(t) {
      return !1;
    }
    store(t, n) {}
    shouldAttach(t) {
      return !1;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, n) {
      return t.routeConfig === n.routeConfig;
    }
  },
  fS = (() => {
    class e extends Lh {
      static {
        this.ɵfac = (() => {
          let n;
          return function (r) {
            return (n || (n = Gi(e)))(r || e);
          };
        })();
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  fv = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: () => I(hS), providedIn: "root" });
      }
    }
    return e;
  })(),
  hS = (() => {
    class e extends fv {
      constructor() {
        super(...arguments),
          (this.location = I(wo)),
          (this.urlSerializer = I(Gs)),
          (this.options = I(Zs, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = I(Hh)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new mi()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = Ky(null)),
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
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((i) => {
          i.type === "popstate" && n(i.url, i.state);
        });
      }
      handleRouterEvent(n, i) {
        if (n instanceof No) this.stateMemento = this.createStateMemento();
        else if (n instanceof Yi) this.rawUrlTree = i.initialUrl;
        else if (n instanceof Sl) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !i.extras.skipLocationChange
          ) {
            let r = this.urlHandlingStrategy.merge(i.finalUrl, i.initialUrl);
            this.setBrowserUrl(i.targetBrowserUrl ?? r, i);
          }
        } else
          n instanceof js
            ? ((this.currentUrlTree = i.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                i.finalUrl,
                i.initialUrl
              )),
              (this.routerState = i.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                !i.extras.skipLocationChange &&
                this.setBrowserUrl(i.targetBrowserUrl ?? this.rawUrlTree, i))
            : n instanceof gi &&
              (n.code === sn.GuardRejected || n.code === sn.NoDataFromResolver)
            ? this.restoreHistory(i)
            : n instanceof Fs
            ? this.restoreHistory(i, !0)
            : n instanceof _i &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, i) {
        let r = n instanceof mi ? this.urlSerializer.serialize(n) : n;
        if (this.location.isCurrentPathEqualTo(r) || i.extras.replaceUrl) {
          let o = this.browserPageId,
            s = G(G({}, i.extras.state), this.generateNgRouterState(i.id, o));
          this.location.replaceState(r, "", s);
        } else {
          let o = G(
            G({}, i.extras.state),
            this.generateNgRouterState(i.id, this.browserPageId + 1)
          );
          this.location.go(r, "", o);
        }
      }
      restoreHistory(n, i = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let r = this.browserPageId,
            o = this.currentPageId - r;
          o !== 0
            ? this.location.historyGo(o)
            : this.currentUrlTree === n.finalUrl &&
              o === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (i && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, i) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: i }
          : { navigationId: n };
      }
      static {
        this.ɵfac = (() => {
          let n;
          return function (r) {
            return (n || (n = Gi(e)))(r || e);
          };
        })();
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  xs = (function (e) {
    return (
      (e[(e.COMPLETE = 0)] = "COMPLETE"),
      (e[(e.FAILED = 1)] = "FAILED"),
      (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
      e
    );
  })(xs || {});
function hv(e, t) {
  e.events
    .pipe(
      Et(
        (n) =>
          n instanceof _i ||
          n instanceof gi ||
          n instanceof Fs ||
          n instanceof Yi
      ),
      ue((n) =>
        n instanceof _i || n instanceof Yi
          ? xs.COMPLETE
          : (
              n instanceof gi
                ? n.code === sn.Redirect ||
                  n.code === sn.SupersededByNewNavigation
                : !1
            )
          ? xs.REDIRECTING
          : xs.FAILED
      ),
      Et((n) => n !== xs.REDIRECTING),
      Tt(1)
    )
    .subscribe(() => {
      t();
    });
}
function pS(e) {
  throw e;
}
var gS = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  mS = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  kn = (() => {
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
          (this.console = I(qc)),
          (this.stateManager = I(fv)),
          (this.options = I(Zs, { optional: !0 }) || {}),
          (this.pendingTasks = I(li)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = I($h)),
          (this.urlSerializer = I(Gs)),
          (this.location = I(wo)),
          (this.urlHandlingStrategy = I(Hh)),
          (this._events = new tt()),
          (this.errorHandler = this.options.errorHandler || pS),
          (this.navigated = !1),
          (this.routeReuseStrategy = I(dS)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = I(Fl, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!I(jl, { optional: !0 })),
          (this.eventsSubscription = new nt()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((i) => {
          try {
            let r = this.navigationTransitions.currentTransition,
              o = this.navigationTransitions.currentNavigation;
            if (r !== null && o !== null) {
              if (
                (this.stateManager.handleRouterEvent(i, o),
                i instanceof gi &&
                  i.code !== sn.Redirect &&
                  i.code !== sn.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (i instanceof _i) this.navigated = !0;
              else if (i instanceof Ao) {
                let s = i.navigationBehaviorOptions,
                  a = this.urlHandlingStrategy.merge(i.url, r.currentRawUrl),
                  c = G(
                    {
                      browserUrl: r.extras.browserUrl,
                      info: r.extras.info,
                      skipLocationChange: r.extras.skipLocationChange,
                      replaceUrl:
                        r.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        uS(r.source),
                    },
                    s
                  );
                this.scheduleNavigation(a, As, null, c, {
                  resolve: r.resolve,
                  reject: r.reject,
                  promise: r.promise,
                });
              }
            }
            yS(i) && this._events.next(i);
          } catch (r) {
            this.navigationTransitions.transitionAbortSubject.next(r);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              As,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, i) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(n, "popstate", i);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(n, i, r) {
        let o = { replaceUrl: !0 },
          s = r?.navigationId ? r : null;
        if (r) {
          let c = G({}, r);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (o.state = c);
        }
        let a = this.parseUrl(n);
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
      resetConfig(n) {
        (this.config = n.map(Bh)), (this.navigated = !1);
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
      createUrlTree(n, i = {}) {
        let {
            relativeTo: r,
            queryParams: o,
            fragment: s,
            queryParamsHandling: a,
            preserveFragment: c,
          } = i,
          l = c ? this.currentUrlTree.fragment : s,
          u = null;
        switch (a ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            u = G(G({}, this.currentUrlTree.queryParams), o);
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
          let p = r ? r.snapshot : this.routerState.snapshot.root;
          d = qy(p);
        } catch {
          (typeof n[0] != "string" || n[0][0] !== "/") && (n = []),
            (d = this.currentUrlTree.root);
        }
        return Zy(d, n, u, l ?? null);
      }
      navigateByUrl(n, i = { skipLocationChange: !1 }) {
        let r = Ps(n) ? n : this.parseUrl(n),
          o = this.urlHandlingStrategy.merge(r, this.rawUrlTree);
        return this.scheduleNavigation(o, As, null, i);
      }
      navigate(n, i = { skipLocationChange: !1 }) {
        return _S(n), this.navigateByUrl(this.createUrlTree(n, i), i);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, i) {
        let r;
        if (
          (i === !0 ? (r = G({}, gS)) : i === !1 ? (r = G({}, mS)) : (r = i),
          Ps(n))
        )
          return Iy(this.currentUrlTree, n, r);
        let o = this.parseUrl(n);
        return Iy(this.currentUrlTree, o, r);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (i, [r, o]) => (o != null && (i[r] = o), i),
          {}
        );
      }
      scheduleNavigation(n, i, r, o, s) {
        if (this.disposed) return Promise.resolve(!1);
        let a, c, l;
        s
          ? ((a = s.resolve), (c = s.reject), (l = s.promise))
          : (l = new Promise((d, p) => {
              (a = d), (c = p);
            }));
        let u = this.pendingTasks.add();
        return (
          hv(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: i,
            restoredState: r,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: o,
            resolve: a,
            reject: c,
            promise: l,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          l.catch((d) => Promise.reject(d))
        );
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function _S(e) {
  for (let t = 0; t < e.length; t++) if (e[t] == null) throw new ae(4008, !1);
}
function yS(e) {
  return !(e instanceof js) && !(e instanceof Ao);
}
var Ll = class {};
var vS = (() => {
    class e {
      constructor(n, i, r, o, s) {
        (this.router = n),
          (this.injector = r),
          (this.preloadingStrategy = o),
          (this.loader = s);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            Et((n) => n instanceof _i),
            Tn(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(n, i) {
        let r = [];
        for (let o of i) {
          o.providers &&
            !o._injector &&
            (o._injector = Hc(o.providers, n, `Route: ${o.path}`));
          let s = o._injector ?? n,
            a = o._loadedInjector ?? s;
          ((o.loadChildren && !o._loadedRoutes && o.canLoad === void 0) ||
            (o.loadComponent && !o._loadedComponent)) &&
            r.push(this.preloadConfig(s, o)),
            (o.children || o._loadedRoutes) &&
              r.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
        }
        return Qe(r).pipe(Oi());
      }
      preloadConfig(n, i) {
        return this.preloadingStrategy.preload(i, () => {
          let r;
          i.loadChildren && i.canLoad === void 0
            ? (r = this.loader.loadChildren(n, i))
            : (r = X(null));
          let o = r.pipe(
            qe((s) =>
              s === null
                ? X(void 0)
                : ((i._loadedRoutes = s.routes),
                  (i._loadedInjector = s.injector),
                  this.processRoutes(s.injector ?? n, s.routes))
            )
          );
          if (i.loadComponent && !i._loadedComponent) {
            let s = this.loader.loadComponent(i);
            return Qe([o, s]).pipe(Oi());
          } else return o;
        });
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(kn), W(Jc), W(Ft), W(Ll), W(Vh));
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  pv = new Y(""),
  bS = (() => {
    class e {
      constructor(n, i, r, o, s = {}) {
        (this.urlSerializer = n),
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
        return this.transitions.events.subscribe((n) => {
          n instanceof No
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = n.navigationTrigger),
              (this.restoredId = n.restoredState
                ? n.restoredState.navigationId
                : 0))
            : n instanceof _i
            ? ((this.lastId = n.id),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.urlAfterRedirects).fragment
              ))
            : n instanceof Yi &&
              n.code === Il.IgnoredSameUrlNavigation &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof Ol &&
            (n.position
              ? this.options.scrollPositionRestoration === "top"
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === "enabled" &&
                  this.viewportScroller.scrollToPosition(n.position)
              : n.anchor && this.options.anchorScrolling === "enabled"
              ? this.viewportScroller.scrollToAnchor(n.anchor)
              : this.options.scrollPositionRestoration !== "disabled" &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(n, i) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new Ol(
                  n,
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
          j0();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })();
function DS(e) {
  return e.routerState.root;
}
function Ys(e, t) {
  return { ɵkind: e, ɵproviders: t };
}
function wS() {
  let e = I(ut);
  return (t) => {
    let n = e.get(nn);
    if (t !== n.components[0]) return;
    let i = e.get(kn),
      r = e.get(gv);
    e.get(Uh) === 1 && i.initialNavigation(),
      e.get(mv, null, Ee.Optional)?.setUpPreloading(),
      e.get(pv, null, Ee.Optional)?.init(),
      i.resetRootComponentType(n.componentTypes[0]),
      r.closed || (r.next(), r.complete(), r.unsubscribe());
  };
}
var gv = new Y("", { factory: () => new tt() }),
  Uh = new Y("", { providedIn: "root", factory: () => 1 });
function CS() {
  return Ys(2, [
    { provide: Uh, useValue: 0 },
    {
      provide: Qc,
      multi: !0,
      deps: [ut],
      useFactory: (t) => {
        let n = t.get(G_, Promise.resolve());
        return () =>
          n.then(
            () =>
              new Promise((i) => {
                let r = t.get(kn),
                  o = t.get(gv);
                hv(r, () => {
                  i(!0);
                }),
                  (t.get($h).afterPreactivation = () => (
                    i(!0), o.closed ? X(void 0) : o
                  )),
                  r.initialNavigation();
              })
          );
      },
    },
  ]);
}
function ES() {
  return Ys(3, [
    {
      provide: Qc,
      multi: !0,
      useFactory: () => {
        let t = I(kn);
        return () => {
          t.setUpLocationChangeListener();
        };
      },
    },
    { provide: Uh, useValue: 2 },
  ]);
}
var mv = new Y("");
function TS(e) {
  return Ys(0, [
    { provide: mv, useExisting: vS },
    { provide: Ll, useExisting: e },
  ]);
}
function MS() {
  return Ys(8, [Ny, { provide: jl, useExisting: Ny }]);
}
function IS(e) {
  let t = [
    { provide: uv, useValue: aS },
    {
      provide: dv,
      useValue: G({ skipNextTransition: !!e?.skipInitialTransition }, e),
    },
  ];
  return Ys(9, t);
}
var ky = new Y("ROUTER_FORROOT_GUARD"),
  SS = [
    wo,
    { provide: Gs, useClass: xo },
    kn,
    Ws,
    { provide: Ro, useFactory: DS, deps: [kn] },
    Vh,
    [],
  ],
  Gh = (() => {
    class e {
      constructor(n) {}
      static forRoot(n, i) {
        return {
          ngModule: e,
          providers: [
            SS,
            [],
            { provide: Fl, multi: !0, useValue: n },
            { provide: ky, useFactory: AS, deps: [[kn, new zd(), new lm()]] },
            { provide: Zs, useValue: i || {} },
            i?.useHash ? xS() : NS(),
            OS(),
            i?.preloadingStrategy ? TS(i.preloadingStrategy).ɵproviders : [],
            i?.initialNavigation ? RS(i) : [],
            i?.bindToComponentInputs ? MS().ɵproviders : [],
            i?.enableViewTransitions ? IS().ɵproviders : [],
            PS(),
          ],
        };
      }
      static forChild(n) {
        return {
          ngModule: e,
          providers: [{ provide: Fl, multi: !0, useValue: n }],
        };
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)(W(ky, 8));
        };
      }
      static {
        this.ɵmod = It({ type: e });
      }
      static {
        this.ɵinj = Mt({});
      }
    }
    return e;
  })();
function OS() {
  return {
    provide: pv,
    useFactory: () => {
      let e = I(ey),
        t = I(Oe),
        n = I(Zs),
        i = I($h),
        r = I(Gs);
      return (
        n.scrollOffset && e.setOffset(n.scrollOffset), new bS(r, i, e, t, n)
      );
    },
  };
}
function xS() {
  return { provide: Mr, useClass: W_ };
}
function NS() {
  return { provide: Mr, useClass: Wf };
}
function AS(e) {
  return "guarded";
}
function RS(e) {
  return [
    e.initialNavigation === "disabled" ? ES().ɵproviders : [],
    e.initialNavigation === "enabledBlocking" ? CS().ɵproviders : [],
  ];
}
var Fy = new Y("");
function PS() {
  return [
    { provide: Fy, useFactory: wS },
    { provide: Kc, multi: !0, useExisting: Fy },
  ];
}
var FS = [],
  Vl = class e {
    static ɵfac = function (n) {
      return new (n || e)();
    };
    static ɵmod = It({ type: e });
    static ɵinj = Mt({ imports: [Gh.forRoot(FS), Gh] });
  };
var Ji = class {},
  _v = (() => {
    class e extends Ji {
      getTranslation(n) {
        return X({});
      }
      static ɵfac = (() => {
        let n;
        return function (r) {
          return (n || (n = Gi(e)))(r || e);
        };
      })();
      static ɵprov = z({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ks = class {},
  yv = (() => {
    class e {
      handle(n) {
        return n.key;
      }
      static ɵfac = function (i) {
        return new (i || e)();
      };
      static ɵprov = z({ token: e, factory: e.ɵfac });
    }
    return e;
  })();
function $l(e, t) {
  if (e === t) return !0;
  if (e === null || t === null) return !1;
  if (e !== e && t !== t) return !0;
  let n = typeof e,
    i = typeof t,
    r,
    o,
    s;
  if (n == i && n == "object")
    if (Array.isArray(e)) {
      if (!Array.isArray(t)) return !1;
      if ((r = e.length) == t.length) {
        for (o = 0; o < r; o++) if (!$l(e[o], t[o])) return !1;
        return !0;
      }
    } else {
      if (Array.isArray(t)) return !1;
      s = Object.create(null);
      for (o in e) {
        if (!$l(e[o], t[o])) return !1;
        s[o] = !0;
      }
      for (o in t) if (!(o in s) && typeof t[o] < "u") return !1;
      return !0;
    }
  return !1;
}
function Ki(e) {
  return typeof e < "u" && e !== null;
}
function Js(e) {
  return Hl(e) && !Kh(e);
}
function Hl(e) {
  return typeof e == "object";
}
function Kh(e) {
  return Array.isArray(e);
}
function Jh(e) {
  return typeof e == "string";
}
function LS(e) {
  return typeof e == "function";
}
function zh(e, t) {
  let n = Object.assign({}, e);
  return Hl(e)
    ? (Hl(e) &&
        Hl(t) &&
        Object.keys(t).forEach((i) => {
          Js(t[i])
            ? i in e
              ? (n[i] = zh(e[i], t[i]))
              : Object.assign(n, { [i]: t[i] })
            : Object.assign(n, { [i]: t[i] });
        }),
      n)
    : zh({}, t);
}
function Wh(e, t) {
  let n = t.split(".");
  t = "";
  do
    (t += n.shift()),
      Ki(e) && Ki(e[t]) && (Js(e[t]) || Kh(e[t]) || !n.length)
        ? ((e = e[t]), (t = ""))
        : n.length
        ? (t += ".")
        : (e = void 0);
  while (n.length);
  return e;
}
function jS(e, t, n) {
  let i = t.split("."),
    r = e;
  for (let o = 0; o < i.length; o++) {
    let s = i[o];
    o === i.length - 1
      ? (r[s] = n)
      : ((!r[s] || !Js(r[s])) && (r[s] = {}), (r = r[s]));
  }
}
var Fo = class {},
  vv = (() => {
    class e extends Fo {
      templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
      interpolate(n, i) {
        if (Jh(n)) return this.interpolateString(n, i);
        if (LS(n)) return this.interpolateFunction(n, i);
      }
      interpolateFunction(n, i) {
        return n(i);
      }
      interpolateString(n, i) {
        return i
          ? n.replace(this.templateMatcher, (r, o) => {
              let s = Wh(i, o);
              return Ki(s) ? s : r;
            })
          : n;
      }
      static ɵfac = (() => {
        let n;
        return function (r) {
          return (n || (n = Gi(e)))(r || e);
        };
      })();
      static ɵprov = z({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Lo = class {},
  bv = (() => {
    class e extends Lo {
      compile(n, i) {
        return n;
      }
      compileTranslations(n, i) {
        return n;
      }
      static ɵfac = (() => {
        let n;
        return function (r) {
          return (n || (n = Gi(e)))(r || e);
        };
      })();
      static ɵprov = z({ token: e, factory: e.ɵfac });
    }
    return e;
  })(),
  Ul = class {
    defaultLang;
    currentLang = this.defaultLang;
    translations = {};
    langs = [];
    onTranslationChange = new $e();
    onLangChange = new $e();
    onDefaultLangChange = new $e();
  },
  qh = new Y("ISOALTE_TRANSLATE_SERVICE"),
  Zh = new Y("USE_DEFAULT_LANG"),
  Yh = new Y("DEFAULT_LANGUAGE"),
  Qh = new Y("USE_EXTEND"),
  Qs = (e) => (Xn(e) ? e : X(e)),
  yi = (() => {
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
      _onTranslationChange = new $e();
      _onLangChange = new $e();
      _onDefaultLangChange = new $e();
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
      set defaultLang(n) {
        this.isolate ? (this._defaultLang = n) : (this.store.defaultLang = n);
      }
      get currentLang() {
        return this.isolate ? this._currentLang : this.store.currentLang;
      }
      set currentLang(n) {
        this.isolate ? (this._currentLang = n) : (this.store.currentLang = n);
      }
      get langs() {
        return this.isolate ? this._langs : this.store.langs;
      }
      set langs(n) {
        this.isolate ? (this._langs = n) : (this.store.langs = n);
      }
      get translations() {
        return this.isolate ? this._translations : this.store.translations;
      }
      set translations(n) {
        this.isolate ? (this._translations = n) : (this.store.translations = n);
      }
      constructor(n, i, r, o, s, a = !0, c = !1, l = !1, u) {
        (this.store = n),
          (this.currentLoader = i),
          (this.compiler = r),
          (this.parser = o),
          (this.missingTranslationHandler = s),
          (this.useDefaultLang = a),
          (this.isolate = c),
          (this.extend = l),
          u && this.setDefaultLang(u);
      }
      setDefaultLang(n) {
        if (n === this.defaultLang) return;
        let i = this.retrieveTranslations(n);
        typeof i < "u"
          ? (this.defaultLang == null && (this.defaultLang = n),
            i.pipe(Tt(1)).subscribe(() => {
              this.changeDefaultLang(n);
            }))
          : this.changeDefaultLang(n);
      }
      getDefaultLang() {
        return this.defaultLang;
      }
      use(n) {
        if (((this.lastUseLanguage = n), n === this.currentLang))
          return X(this.translations[n]);
        this.currentLang || (this.currentLang = n);
        let i = this.retrieveTranslations(n);
        return Xn(i)
          ? (i.pipe(Tt(1)).subscribe(() => {
              this.changeLang(n);
            }),
            i)
          : (this.changeLang(n), X(this.translations[n]));
      }
      changeLang(n) {
        n === this.lastUseLanguage &&
          ((this.currentLang = n),
          this.onLangChange.emit({
            lang: n,
            translations: this.translations[n],
          }),
          this.defaultLang == null && this.changeDefaultLang(n));
      }
      retrieveTranslations(n) {
        if (typeof this.translations[n] > "u" || this.extend)
          return (
            (this._translationRequests[n] =
              this._translationRequests[n] ||
              this.loadAndCompileTranslations(n)),
            this._translationRequests[n]
          );
      }
      getTranslation(n) {
        return this.loadAndCompileTranslations(n);
      }
      loadAndCompileTranslations(n) {
        this.pending = !0;
        let i = this.currentLoader.getTranslation(n).pipe(Va(1), Tt(1));
        return (
          (this.loadingTranslations = i.pipe(
            ue((r) => this.compiler.compileTranslations(r, n)),
            Va(1),
            Tt(1)
          )),
          this.loadingTranslations.subscribe({
            next: (r) => {
              (this.translations[n] =
                this.extend && this.translations[n]
                  ? G(G({}, r), this.translations[n])
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
      setTranslation(n, i, r = !1) {
        let o = this.compiler.compileTranslations(i, n);
        (r || this.extend) && this.translations[n]
          ? (this.translations[n] = zh(this.translations[n], o))
          : (this.translations[n] = o),
          this.updateLangs(),
          this.onTranslationChange.emit({
            lang: n,
            translations: this.translations[n],
          });
      }
      getLangs() {
        return this.langs;
      }
      addLangs(n) {
        n.forEach((i) => {
          this.langs.indexOf(i) === -1 && this.langs.push(i);
        });
      }
      updateLangs() {
        this.addLangs(Object.keys(this.translations));
      }
      getParsedResultForKey(n, i, r) {
        let o;
        if (
          (n && (o = this.runInterpolation(Wh(n, i), r)),
          o === void 0 &&
            this.defaultLang != null &&
            this.defaultLang !== this.currentLang &&
            this.useDefaultLang &&
            (o = this.runInterpolation(
              Wh(this.translations[this.defaultLang], i),
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
      runInterpolation(n, i) {
        if (Kh(n)) return n.map((r) => this.runInterpolation(r, i));
        if (Js(n)) {
          let r = {};
          for (let o in n) r[o] = this.runInterpolation(n[o], i);
          return r;
        } else return this.parser.interpolate(n, i);
      }
      getParsedResult(n, i, r) {
        if (i instanceof Array) {
          let o = {},
            s = !1;
          for (let c of i)
            (o[c] = this.getParsedResultForKey(n, c, r)), (s = s || Xn(o[c]));
          if (!s) return o;
          let a = i.map((c) => Qs(o[c]));
          return Au(a).pipe(
            ue((c) => {
              let l = {};
              return (
                c.forEach((u, d) => {
                  l[i[d]] = u;
                }),
                l
              );
            })
          );
        }
        return this.getParsedResultForKey(n, i, r);
      }
      get(n, i) {
        if (!Ki(n) || !n.length)
          throw new Error('Parameter "key" is required and cannot be empty');
        return this.pending
          ? this.loadingTranslations.pipe(
              Tn((r) => Qs(this.getParsedResult(r, n, i)))
            )
          : Qs(this.getParsedResult(this.translations[this.currentLang], n, i));
      }
      getStreamOnTranslationChange(n, i) {
        if (!Ki(n) || !n.length)
          throw new Error('Parameter "key" is required and cannot be empty');
        return Qt(
          cr(() => this.get(n, i)),
          this.onTranslationChange.pipe(
            lt((r) => {
              let o = this.getParsedResult(r.translations, n, i);
              return Qs(o);
            })
          )
        );
      }
      stream(n, i) {
        if (!Ki(n) || !n.length) throw new Error('Parameter "key" required');
        return Qt(
          cr(() => this.get(n, i)),
          this.onLangChange.pipe(
            lt((r) => {
              let o = this.getParsedResult(r.translations, n, i);
              return Qs(o);
            })
          )
        );
      }
      instant(n, i) {
        if (!Ki(n) || n.length === 0)
          throw new Error('Parameter "key" is required and cannot be empty');
        let r = this.getParsedResult(this.translations[this.currentLang], n, i);
        return Xn(r)
          ? Array.isArray(n)
            ? n.reduce((o, s) => ((o[s] = s), o), {})
            : n
          : r;
      }
      set(n, i, r = this.currentLang) {
        jS(
          this.translations[r],
          n,
          Jh(i)
            ? this.compiler.compile(i, r)
            : this.compiler.compileTranslations(i, r)
        ),
          this.updateLangs(),
          this.onTranslationChange.emit({
            lang: r,
            translations: this.translations[r],
          });
      }
      changeDefaultLang(n) {
        (this.defaultLang = n),
          this.onDefaultLangChange.emit({
            lang: n,
            translations: this.translations[n],
          });
      }
      reloadLang(n) {
        return this.resetLang(n), this.loadAndCompileTranslations(n);
      }
      resetLang(n) {
        delete this._translationRequests[n], delete this.translations[n];
      }
      getBrowserLang() {
        if (typeof window > "u" || !window.navigator) return;
        let n = this.getBrowserCultureLang();
        return n ? n.split(/[-_]/)[0] : void 0;
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
          W(Ul),
          W(Ji),
          W(Lo),
          W(Fo),
          W(Ks),
          W(Zh),
          W(qh),
          W(Qh),
          W(Yh)
        );
      };
      static ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
    return e;
  })();
var jo = (() => {
  class e {
    translate;
    _ref;
    value = "";
    lastKey = null;
    lastParams = [];
    onTranslationChange;
    onLangChange;
    onDefaultLangChange;
    constructor(n, i) {
      (this.translate = n), (this._ref = i);
    }
    updateValue(n, i, r) {
      let o = (s) => {
        (this.value = s !== void 0 ? s : n),
          (this.lastKey = n),
          this._ref.markForCheck();
      };
      if (r) {
        let s = this.translate.getParsedResult(r, n, i);
        Xn(s) ? s.subscribe(o) : o(s);
      }
      this.translate.get(n, i).subscribe(o);
    }
    transform(n, ...i) {
      if (!n || !n.length) return n;
      if ($l(n, this.lastKey) && $l(i, this.lastParams)) return this.value;
      let r;
      if (Ki(i[0]) && i.length)
        if (Jh(i[0]) && i[0].length) {
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
        } else Js(i[0]) && (r = i[0]);
      return (
        (this.lastKey = n),
        (this.lastParams = i),
        this.updateValue(n, r),
        this._dispose(),
        this.onTranslationChange ||
          (this.onTranslationChange =
            this.translate.onTranslationChange.subscribe((o) => {
              this.lastKey &&
                o.lang === this.translate.currentLang &&
                ((this.lastKey = null), this.updateValue(n, r, o.translations));
            })),
        this.onLangChange ||
          (this.onLangChange = this.translate.onLangChange.subscribe((o) => {
            this.lastKey &&
              ((this.lastKey = null), this.updateValue(n, r, o.translations));
          })),
        this.onDefaultLangChange ||
          (this.onDefaultLangChange =
            this.translate.onDefaultLangChange.subscribe(() => {
              this.lastKey && ((this.lastKey = null), this.updateValue(n, r));
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
      return new (i || e)(Je(yi, 16), Je(pn, 16));
    };
    static ɵpipe = ho({ name: "translate", type: e, pure: !1, standalone: !0 });
    static ɵprov = z({ token: e, factory: e.ɵfac });
  }
  return e;
})();
var Gl = (() => {
  class e {
    static forRoot(n = {}) {
      return {
        ngModule: e,
        providers: [
          n.loader || { provide: Ji, useClass: _v },
          n.compiler || { provide: Lo, useClass: bv },
          n.parser || { provide: Fo, useClass: vv },
          n.missingTranslationHandler || { provide: Ks, useClass: yv },
          Ul,
          { provide: qh, useValue: n.isolate },
          { provide: Zh, useValue: n.useDefaultLang },
          { provide: Qh, useValue: n.extend },
          { provide: Yh, useValue: n.defaultLanguage },
          yi,
        ],
      };
    }
    static forChild(n = {}) {
      return {
        ngModule: e,
        providers: [
          n.loader || { provide: Ji, useClass: _v },
          n.compiler || { provide: Lo, useClass: bv },
          n.parser || { provide: Fo, useClass: vv },
          n.missingTranslationHandler || { provide: Ks, useClass: yv },
          { provide: qh, useValue: n.isolate },
          { provide: Zh, useValue: n.useDefaultLang },
          { provide: Qh, useValue: n.extend },
          { provide: Yh, useValue: n.defaultLanguage },
          yi,
        ],
      };
    }
    static ɵfac = function (i) {
      return new (i || e)();
    };
    static ɵmod = It({ type: e });
    static ɵinj = Mt({});
  }
  return e;
})();
var Bo = class {
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
var Wl = class {
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
var Xh = ((n) => ((n[(n.Image = 0)] = "Image"), (n[(n.Link = 1)] = "Link"), n))(
  Xh || {}
);
var ql = class e {
  BASE_URL = "https://dev-cstgateway.starwayseg.com/api/";
  getContactUsFooter() {
    return X([
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
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
};
var pt = "top",
  Pt = "bottom",
  Ot = "right",
  yt = "left",
  Zl = "auto",
  Xi = [pt, Pt, Ot, yt],
  vi = "start",
  Or = "end",
  Dv = "clippingParents",
  Yl = "viewport",
  Vo = "popper",
  wv = "reference",
  ep = Xi.reduce(function (e, t) {
    return e.concat([t + "-" + vi, t + "-" + Or]);
  }, []),
  Ql = [].concat(Xi, [Zl]).reduce(function (e, t) {
    return e.concat([t, t + "-" + vi, t + "-" + Or]);
  }, []),
  VS = "beforeRead",
  HS = "read",
  $S = "afterRead",
  US = "beforeMain",
  GS = "main",
  zS = "afterMain",
  WS = "beforeWrite",
  qS = "write",
  ZS = "afterWrite",
  Cv = [VS, HS, $S, US, GS, zS, WS, qS, ZS];
function xt(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Xe(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function _n(e) {
  var t = Xe(e).Element;
  return e instanceof t || e instanceof Element;
}
function vt(e) {
  var t = Xe(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Ho(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = Xe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function YS(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (n) {
    var i = t.styles[n] || {},
      r = t.attributes[n] || {},
      o = t.elements[n];
    !vt(o) ||
      !xt(o) ||
      (Object.assign(o.style, i),
      Object.keys(r).forEach(function (s) {
        var a = r[s];
        a === !1 ? o.removeAttribute(s) : o.setAttribute(s, a === !0 ? "" : a);
      }));
  });
}
function QS(e) {
  var t = e.state,
    n = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, n.popper),
    (t.styles = n),
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function () {
      Object.keys(t.elements).forEach(function (i) {
        var r = t.elements[i],
          o = t.attributes[i] || {},
          s = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : n[i]),
          a = s.reduce(function (c, l) {
            return (c[l] = ""), c;
          }, {});
        !vt(r) ||
          !xt(r) ||
          (Object.assign(r.style, a),
          Object.keys(o).forEach(function (c) {
            r.removeAttribute(c);
          }));
      });
    }
  );
}
var Ev = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: YS,
  effect: QS,
  requires: ["computeStyles"],
};
function Nt(e) {
  return e.split("-")[0];
}
var Fn = Math.max,
  xr = Math.min,
  bi = Math.round;
function $o() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + "/" + t.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function Xs() {
  return !/^((?!chrome|android).)*safari/i.test($o());
}
function yn(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var i = e.getBoundingClientRect(),
    r = 1,
    o = 1;
  t &&
    vt(e) &&
    ((r = (e.offsetWidth > 0 && bi(i.width) / e.offsetWidth) || 1),
    (o = (e.offsetHeight > 0 && bi(i.height) / e.offsetHeight) || 1));
  var s = _n(e) ? Xe(e) : window,
    a = s.visualViewport,
    c = !Xs() && n,
    l = (i.left + (c && a ? a.offsetLeft : 0)) / r,
    u = (i.top + (c && a ? a.offsetTop : 0)) / o,
    d = i.width / r,
    p = i.height / o;
  return {
    width: d,
    height: p,
    top: u,
    right: l + d,
    bottom: u + p,
    left: l,
    x: l,
    y: u,
  };
}
function Nr(e) {
  var t = yn(e),
    n = e.offsetWidth,
    i = e.offsetHeight;
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - i) <= 1 && (i = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
  );
}
function ea(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && Ho(n)) {
    var i = t;
    do {
      if (i && e.isSameNode(i)) return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function Ut(e) {
  return Xe(e).getComputedStyle(e);
}
function tp(e) {
  return ["table", "td", "th"].indexOf(xt(e)) >= 0;
}
function kt(e) {
  return ((_n(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function Di(e) {
  return xt(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (Ho(e) ? e.host : null) || kt(e);
}
function Tv(e) {
  return !vt(e) || Ut(e).position === "fixed" ? null : e.offsetParent;
}
function KS(e) {
  var t = /firefox/i.test($o()),
    n = /Trident/i.test($o());
  if (n && vt(e)) {
    var i = Ut(e);
    if (i.position === "fixed") return null;
  }
  var r = Di(e);
  for (Ho(r) && (r = r.host); vt(r) && ["html", "body"].indexOf(xt(r)) < 0; ) {
    var o = Ut(r);
    if (
      o.transform !== "none" ||
      o.perspective !== "none" ||
      o.contain === "paint" ||
      ["transform", "perspective"].indexOf(o.willChange) !== -1 ||
      (t && o.willChange === "filter") ||
      (t && o.filter && o.filter !== "none")
    )
      return r;
    r = r.parentNode;
  }
  return null;
}
function Ln(e) {
  for (var t = Xe(e), n = Tv(e); n && tp(n) && Ut(n).position === "static"; )
    n = Tv(n);
  return n &&
    (xt(n) === "html" || (xt(n) === "body" && Ut(n).position === "static"))
    ? t
    : n || KS(e) || t;
}
function Ar(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Rr(e, t, n) {
  return Fn(e, xr(t, n));
}
function Mv(e, t, n) {
  var i = Rr(e, t, n);
  return i > n ? n : i;
}
function ta() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function na(e) {
  return Object.assign({}, ta(), e);
}
function ia(e, t) {
  return t.reduce(function (n, i) {
    return (n[i] = e), n;
  }, {});
}
var JS = function (t, n) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, n.rects, { placement: n.placement }))
        : t),
    na(typeof t != "number" ? t : ia(t, Xi))
  );
};
function XS(e) {
  var t,
    n = e.state,
    i = e.name,
    r = e.options,
    o = n.elements.arrow,
    s = n.modifiersData.popperOffsets,
    a = Nt(n.placement),
    c = Ar(a),
    l = [yt, Ot].indexOf(a) >= 0,
    u = l ? "height" : "width";
  if (!(!o || !s)) {
    var d = JS(r.padding, n),
      p = Nr(o),
      h = c === "y" ? pt : yt,
      D = c === "y" ? Pt : Ot,
      w =
        n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u],
      M = s[c] - n.rects.reference[c],
      P = Ln(o),
      S = P ? (c === "y" ? P.clientHeight || 0 : P.clientWidth || 0) : 0,
      C = w / 2 - M / 2,
      F = d[h],
      V = S - p[u] - d[D],
      H = S / 2 - p[u] / 2 + C,
      ee = Rr(F, H, V),
      j = c;
    n.modifiersData[i] = ((t = {}), (t[j] = ee), (t.centerOffset = ee - H), t);
  }
}
function eO(e) {
  var t = e.state,
    n = e.options,
    i = n.element,
    r = i === void 0 ? "[data-popper-arrow]" : i;
  r != null &&
    ((typeof r == "string" && ((r = t.elements.popper.querySelector(r)), !r)) ||
      (ea(t.elements.popper, r) && (t.elements.arrow = r)));
}
var np = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: XS,
  effect: eO,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function vn(e) {
  return e.split("-")[1];
}
var tO = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function nO(e, t) {
  var n = e.x,
    i = e.y,
    r = t.devicePixelRatio || 1;
  return { x: bi(n * r) / r || 0, y: bi(i * r) / r || 0 };
}
function Iv(e) {
  var t,
    n = e.popper,
    i = e.popperRect,
    r = e.placement,
    o = e.variation,
    s = e.offsets,
    a = e.position,
    c = e.gpuAcceleration,
    l = e.adaptive,
    u = e.roundOffsets,
    d = e.isFixed,
    p = s.x,
    h = p === void 0 ? 0 : p,
    D = s.y,
    w = D === void 0 ? 0 : D,
    M = typeof u == "function" ? u({ x: h, y: w }) : { x: h, y: w };
  (h = M.x), (w = M.y);
  var P = s.hasOwnProperty("x"),
    S = s.hasOwnProperty("y"),
    C = yt,
    F = pt,
    V = window;
  if (l) {
    var H = Ln(n),
      ee = "clientHeight",
      j = "clientWidth";
    if (
      (H === Xe(n) &&
        ((H = kt(n)),
        Ut(H).position !== "static" &&
          a === "absolute" &&
          ((ee = "scrollHeight"), (j = "scrollWidth"))),
      (H = H),
      r === pt || ((r === yt || r === Ot) && o === Or))
    ) {
      F = Pt;
      var de =
        d && H === V && V.visualViewport ? V.visualViewport.height : H[ee];
      (w -= de - i.height), (w *= c ? 1 : -1);
    }
    if (r === yt || ((r === pt || r === Pt) && o === Or)) {
      C = Ot;
      var J = d && H === V && V.visualViewport ? V.visualViewport.width : H[j];
      (h -= J - i.width), (h *= c ? 1 : -1);
    }
  }
  var Q = Object.assign({ position: a }, l && tO),
    K = u === !0 ? nO({ x: h, y: w }, Xe(n)) : { x: h, y: w };
  if (((h = K.x), (w = K.y), c)) {
    var ne;
    return Object.assign(
      {},
      Q,
      ((ne = {}),
      (ne[F] = S ? "0" : ""),
      (ne[C] = P ? "0" : ""),
      (ne.transform =
        (V.devicePixelRatio || 1) <= 1
          ? "translate(" + h + "px, " + w + "px)"
          : "translate3d(" + h + "px, " + w + "px, 0)"),
      ne)
    );
  }
  return Object.assign(
    {},
    Q,
    ((t = {}),
    (t[F] = S ? w + "px" : ""),
    (t[C] = P ? h + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function iO(e) {
  var t = e.state,
    n = e.options,
    i = n.gpuAcceleration,
    r = i === void 0 ? !0 : i,
    o = n.adaptive,
    s = o === void 0 ? !0 : o,
    a = n.roundOffsets,
    c = a === void 0 ? !0 : a,
    l = {
      placement: Nt(t.placement),
      variation: vn(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: r,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      Iv(
        Object.assign({}, l, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: s,
          roundOffsets: c,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        Iv(
          Object.assign({}, l, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: c,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
var Sv = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: iO,
  data: {},
};
var Kl = { passive: !0 };
function rO(e) {
  var t = e.state,
    n = e.instance,
    i = e.options,
    r = i.scroll,
    o = r === void 0 ? !0 : r,
    s = i.resize,
    a = s === void 0 ? !0 : s,
    c = Xe(t.elements.popper),
    l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    o &&
      l.forEach(function (u) {
        u.addEventListener("scroll", n.update, Kl);
      }),
    a && c.addEventListener("resize", n.update, Kl),
    function () {
      o &&
        l.forEach(function (u) {
          u.removeEventListener("scroll", n.update, Kl);
        }),
        a && c.removeEventListener("resize", n.update, Kl);
    }
  );
}
var Ov = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: rO,
  data: {},
};
var oO = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Uo(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return oO[t];
  });
}
var sO = { start: "end", end: "start" };
function Jl(e) {
  return e.replace(/start|end/g, function (t) {
    return sO[t];
  });
}
function Pr(e) {
  var t = Xe(e),
    n = t.pageXOffset,
    i = t.pageYOffset;
  return { scrollLeft: n, scrollTop: i };
}
function kr(e) {
  return yn(kt(e)).left + Pr(e).scrollLeft;
}
function ip(e, t) {
  var n = Xe(e),
    i = kt(e),
    r = n.visualViewport,
    o = i.clientWidth,
    s = i.clientHeight,
    a = 0,
    c = 0;
  if (r) {
    (o = r.width), (s = r.height);
    var l = Xs();
    (l || (!l && t === "fixed")) && ((a = r.offsetLeft), (c = r.offsetTop));
  }
  return { width: o, height: s, x: a + kr(e), y: c };
}
function rp(e) {
  var t,
    n = kt(e),
    i = Pr(e),
    r = (t = e.ownerDocument) == null ? void 0 : t.body,
    o = Fn(
      n.scrollWidth,
      n.clientWidth,
      r ? r.scrollWidth : 0,
      r ? r.clientWidth : 0
    ),
    s = Fn(
      n.scrollHeight,
      n.clientHeight,
      r ? r.scrollHeight : 0,
      r ? r.clientHeight : 0
    ),
    a = -i.scrollLeft + kr(e),
    c = -i.scrollTop;
  return (
    Ut(r || n).direction === "rtl" &&
      (a += Fn(n.clientWidth, r ? r.clientWidth : 0) - o),
    { width: o, height: s, x: a, y: c }
  );
}
function Fr(e) {
  var t = Ut(e),
    n = t.overflow,
    i = t.overflowX,
    r = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + r + i);
}
function Xl(e) {
  return ["html", "body", "#document"].indexOf(xt(e)) >= 0
    ? e.ownerDocument.body
    : vt(e) && Fr(e)
    ? e
    : Xl(Di(e));
}
function er(e, t) {
  var n;
  t === void 0 && (t = []);
  var i = Xl(e),
    r = i === ((n = e.ownerDocument) == null ? void 0 : n.body),
    o = Xe(i),
    s = r ? [o].concat(o.visualViewport || [], Fr(i) ? i : []) : i,
    a = t.concat(s);
  return r ? a : a.concat(er(Di(s)));
}
function Go(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function aO(e, t) {
  var n = yn(e, !1, t === "fixed");
  return (
    (n.top = n.top + e.clientTop),
    (n.left = n.left + e.clientLeft),
    (n.bottom = n.top + e.clientHeight),
    (n.right = n.left + e.clientWidth),
    (n.width = e.clientWidth),
    (n.height = e.clientHeight),
    (n.x = n.left),
    (n.y = n.top),
    n
  );
}
function xv(e, t, n) {
  return t === Yl ? Go(ip(e, n)) : _n(t) ? aO(t, n) : Go(rp(kt(e)));
}
function cO(e) {
  var t = er(Di(e)),
    n = ["absolute", "fixed"].indexOf(Ut(e).position) >= 0,
    i = n && vt(e) ? Ln(e) : e;
  return _n(i)
    ? t.filter(function (r) {
        return _n(r) && ea(r, i) && xt(r) !== "body";
      })
    : [];
}
function op(e, t, n, i) {
  var r = t === "clippingParents" ? cO(e) : [].concat(t),
    o = [].concat(r, [n]),
    s = o[0],
    a = o.reduce(function (c, l) {
      var u = xv(e, l, i);
      return (
        (c.top = Fn(u.top, c.top)),
        (c.right = xr(u.right, c.right)),
        (c.bottom = xr(u.bottom, c.bottom)),
        (c.left = Fn(u.left, c.left)),
        c
      );
    }, xv(e, s, i));
  return (
    (a.width = a.right - a.left),
    (a.height = a.bottom - a.top),
    (a.x = a.left),
    (a.y = a.top),
    a
  );
}
function ra(e) {
  var t = e.reference,
    n = e.element,
    i = e.placement,
    r = i ? Nt(i) : null,
    o = i ? vn(i) : null,
    s = t.x + t.width / 2 - n.width / 2,
    a = t.y + t.height / 2 - n.height / 2,
    c;
  switch (r) {
    case pt:
      c = { x: s, y: t.y - n.height };
      break;
    case Pt:
      c = { x: s, y: t.y + t.height };
      break;
    case Ot:
      c = { x: t.x + t.width, y: a };
      break;
    case yt:
      c = { x: t.x - n.width, y: a };
      break;
    default:
      c = { x: t.x, y: t.y };
  }
  var l = r ? Ar(r) : null;
  if (l != null) {
    var u = l === "y" ? "height" : "width";
    switch (o) {
      case vi:
        c[l] = c[l] - (t[u] / 2 - n[u] / 2);
        break;
      case Or:
        c[l] = c[l] + (t[u] / 2 - n[u] / 2);
        break;
      default:
    }
  }
  return c;
}
function tr(e, t) {
  t === void 0 && (t = {});
  var n = t,
    i = n.placement,
    r = i === void 0 ? e.placement : i,
    o = n.strategy,
    s = o === void 0 ? e.strategy : o,
    a = n.boundary,
    c = a === void 0 ? Dv : a,
    l = n.rootBoundary,
    u = l === void 0 ? Yl : l,
    d = n.elementContext,
    p = d === void 0 ? Vo : d,
    h = n.altBoundary,
    D = h === void 0 ? !1 : h,
    w = n.padding,
    M = w === void 0 ? 0 : w,
    P = na(typeof M != "number" ? M : ia(M, Xi)),
    S = p === Vo ? wv : Vo,
    C = e.rects.popper,
    F = e.elements[D ? S : p],
    V = op(_n(F) ? F : F.contextElement || kt(e.elements.popper), c, u, s),
    H = yn(e.elements.reference),
    ee = ra({ reference: H, element: C, strategy: "absolute", placement: r }),
    j = Go(Object.assign({}, C, ee)),
    de = p === Vo ? j : H,
    J = {
      top: V.top - de.top + P.top,
      bottom: de.bottom - V.bottom + P.bottom,
      left: V.left - de.left + P.left,
      right: de.right - V.right + P.right,
    },
    Q = e.modifiersData.offset;
  if (p === Vo && Q) {
    var K = Q[r];
    Object.keys(J).forEach(function (ne) {
      var Ye = [Ot, Pt].indexOf(ne) >= 0 ? 1 : -1,
        Ie = [pt, Pt].indexOf(ne) >= 0 ? "y" : "x";
      J[ne] += K[Ie] * Ye;
    });
  }
  return J;
}
function sp(e, t) {
  t === void 0 && (t = {});
  var n = t,
    i = n.placement,
    r = n.boundary,
    o = n.rootBoundary,
    s = n.padding,
    a = n.flipVariations,
    c = n.allowedAutoPlacements,
    l = c === void 0 ? Ql : c,
    u = vn(i),
    d = u
      ? a
        ? ep
        : ep.filter(function (D) {
            return vn(D) === u;
          })
      : Xi,
    p = d.filter(function (D) {
      return l.indexOf(D) >= 0;
    });
  p.length === 0 && (p = d);
  var h = p.reduce(function (D, w) {
    return (
      (D[w] = tr(e, { placement: w, boundary: r, rootBoundary: o, padding: s })[
        Nt(w)
      ]),
      D
    );
  }, {});
  return Object.keys(h).sort(function (D, w) {
    return h[D] - h[w];
  });
}
function lO(e) {
  if (Nt(e) === Zl) return [];
  var t = Uo(e);
  return [Jl(e), t, Jl(t)];
}
function uO(e) {
  var t = e.state,
    n = e.options,
    i = e.name;
  if (!t.modifiersData[i]._skip) {
    for (
      var r = n.mainAxis,
        o = r === void 0 ? !0 : r,
        s = n.altAxis,
        a = s === void 0 ? !0 : s,
        c = n.fallbackPlacements,
        l = n.padding,
        u = n.boundary,
        d = n.rootBoundary,
        p = n.altBoundary,
        h = n.flipVariations,
        D = h === void 0 ? !0 : h,
        w = n.allowedAutoPlacements,
        M = t.options.placement,
        P = Nt(M),
        S = P === M,
        C = c || (S || !D ? [Uo(M)] : lO(M)),
        F = [M].concat(C).reduce(function (gt, et) {
          return gt.concat(
            Nt(et) === Zl
              ? sp(t, {
                  placement: et,
                  boundary: u,
                  rootBoundary: d,
                  padding: l,
                  flipVariations: D,
                  allowedAutoPlacements: w,
                })
              : et
          );
        }, []),
        V = t.rects.reference,
        H = t.rects.popper,
        ee = new Map(),
        j = !0,
        de = F[0],
        J = 0;
      J < F.length;
      J++
    ) {
      var Q = F[J],
        K = Nt(Q),
        ne = vn(Q) === vi,
        Ye = [pt, Pt].indexOf(K) >= 0,
        Ie = Ye ? "width" : "height",
        se = tr(t, {
          placement: Q,
          boundary: u,
          rootBoundary: d,
          altBoundary: p,
          padding: l,
        }),
        $ = Ye ? (ne ? Ot : yt) : ne ? Pt : pt;
      V[Ie] > H[Ie] && ($ = Uo($));
      var m = Uo($),
        _ = [];
      if (
        (o && _.push(se[K] <= 0),
        a && _.push(se[$] <= 0, se[m] <= 0),
        _.every(function (gt) {
          return gt;
        }))
      ) {
        (de = Q), (j = !1);
        break;
      }
      ee.set(Q, _);
    }
    if (j)
      for (
        var ie = D ? 3 : 1,
          U = function (et) {
            var ot = F.find(function (Dt) {
              var k = ee.get(Dt);
              if (k)
                return k.slice(0, et).every(function (x) {
                  return x;
                });
            });
            if (ot) return (de = ot), "break";
          },
          Re = ie;
        Re > 0;
        Re--
      ) {
        var me = U(Re);
        if (me === "break") break;
      }
    t.placement !== de &&
      ((t.modifiersData[i]._skip = !0), (t.placement = de), (t.reset = !0));
  }
}
var ap = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: uO,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function dO(e, t, n) {
  var i = Nt(e),
    r = [yt, pt].indexOf(i) >= 0 ? -1 : 1,
    o = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
    s = o[0],
    a = o[1];
  return (
    (s = s || 0),
    (a = (a || 0) * r),
    [yt, Ot].indexOf(i) >= 0 ? { x: a, y: s } : { x: s, y: a }
  );
}
function fO(e) {
  var t = e.state,
    n = e.options,
    i = e.name,
    r = n.offset,
    o = r === void 0 ? [0, 0] : r,
    s = Ql.reduce(function (u, d) {
      return (u[d] = dO(d, t.rects, o)), u;
    }, {}),
    a = s[t.placement],
    c = a.x,
    l = a.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += c),
    (t.modifiersData.popperOffsets.y += l)),
    (t.modifiersData[i] = s);
}
var cp = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: fO,
};
function hO(e) {
  var t = e.state,
    n = e.name;
  t.modifiersData[n] = ra({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
var Nv = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: hO,
  data: {},
};
function lp(e) {
  return e === "x" ? "y" : "x";
}
function pO(e) {
  var t = e.state,
    n = e.options,
    i = e.name,
    r = n.mainAxis,
    o = r === void 0 ? !0 : r,
    s = n.altAxis,
    a = s === void 0 ? !1 : s,
    c = n.boundary,
    l = n.rootBoundary,
    u = n.altBoundary,
    d = n.padding,
    p = n.tether,
    h = p === void 0 ? !0 : p,
    D = n.tetherOffset,
    w = D === void 0 ? 0 : D,
    M = tr(t, { boundary: c, rootBoundary: l, padding: d, altBoundary: u }),
    P = Nt(t.placement),
    S = vn(t.placement),
    C = !S,
    F = Ar(P),
    V = lp(F),
    H = t.modifiersData.popperOffsets,
    ee = t.rects.reference,
    j = t.rects.popper,
    de =
      typeof w == "function"
        ? w(Object.assign({}, t.rects, { placement: t.placement }))
        : w,
    J =
      typeof de == "number"
        ? { mainAxis: de, altAxis: de }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, de),
    Q = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    K = { x: 0, y: 0 };
  if (H) {
    if (o) {
      var ne,
        Ye = F === "y" ? pt : yt,
        Ie = F === "y" ? Pt : Ot,
        se = F === "y" ? "height" : "width",
        $ = H[F],
        m = $ + M[Ye],
        _ = $ - M[Ie],
        ie = h ? -j[se] / 2 : 0,
        U = S === vi ? ee[se] : j[se],
        Re = S === vi ? -j[se] : -ee[se],
        me = t.elements.arrow,
        gt = h && me ? Nr(me) : { width: 0, height: 0 },
        et = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : ta(),
        ot = et[Ye],
        Dt = et[Ie],
        k = Rr(0, ee[se], gt[se]),
        x = C ? ee[se] / 2 - ie - k - ot - J.mainAxis : U - k - ot - J.mainAxis,
        b = C
          ? -ee[se] / 2 + ie + k + Dt + J.mainAxis
          : Re + k + Dt + J.mainAxis,
        O = t.elements.arrow && Ln(t.elements.arrow),
        q = O ? (F === "y" ? O.clientTop || 0 : O.clientLeft || 0) : 0,
        oe = (ne = Q?.[F]) != null ? ne : 0,
        te = $ + x - oe - q,
        pe = $ + b - oe,
        le = Rr(h ? xr(m, te) : m, $, h ? Fn(_, pe) : _);
      (H[F] = le), (K[F] = le - $);
    }
    if (a) {
      var ge,
        Pe = F === "x" ? pt : yt,
        ke = F === "x" ? Pt : Ot,
        Me = H[V],
        wt = V === "y" ? "height" : "width",
        an = Me + M[Pe],
        Qn = Me - M[ke],
        wn = [pt, yt].indexOf(P) !== -1,
        Mi = (ge = Q?.[V]) != null ? ge : 0,
        Ii = wn ? an : Me - ee[wt] - j[wt] - Mi + J.altAxis,
        nr = wn ? Me + ee[wt] + j[wt] - Mi - J.altAxis : Qn,
        Cn = h && wn ? Mv(Ii, Me, nr) : Rr(h ? Ii : an, Me, h ? nr : Qn);
      (H[V] = Cn), (K[V] = Cn - Me);
    }
    t.modifiersData[i] = K;
  }
}
var up = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: pO,
  requiresIfExists: ["offset"],
};
function dp(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function fp(e) {
  return e === Xe(e) || !vt(e) ? Pr(e) : dp(e);
}
function gO(e) {
  var t = e.getBoundingClientRect(),
    n = bi(t.width) / e.offsetWidth || 1,
    i = bi(t.height) / e.offsetHeight || 1;
  return n !== 1 || i !== 1;
}
function hp(e, t, n) {
  n === void 0 && (n = !1);
  var i = vt(t),
    r = vt(t) && gO(t),
    o = kt(t),
    s = yn(e, r, n),
    a = { scrollLeft: 0, scrollTop: 0 },
    c = { x: 0, y: 0 };
  return (
    (i || (!i && !n)) &&
      ((xt(t) !== "body" || Fr(o)) && (a = fp(t)),
      vt(t)
        ? ((c = yn(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
        : o && (c.x = kr(o))),
    {
      x: s.left + a.scrollLeft - c.x,
      y: s.top + a.scrollTop - c.y,
      width: s.width,
      height: s.height,
    }
  );
}
function mO(e) {
  var t = new Map(),
    n = new Set(),
    i = [];
  e.forEach(function (o) {
    t.set(o.name, o);
  });
  function r(o) {
    n.add(o.name);
    var s = [].concat(o.requires || [], o.requiresIfExists || []);
    s.forEach(function (a) {
      if (!n.has(a)) {
        var c = t.get(a);
        c && r(c);
      }
    }),
      i.push(o);
  }
  return (
    e.forEach(function (o) {
      n.has(o.name) || r(o);
    }),
    i
  );
}
function pp(e) {
  var t = mO(e);
  return Cv.reduce(function (n, i) {
    return n.concat(
      t.filter(function (r) {
        return r.phase === i;
      })
    );
  }, []);
}
function gp(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (n) {
          Promise.resolve().then(function () {
            (t = void 0), n(e());
          });
        })),
      t
    );
  };
}
function mp(e) {
  var t = e.reduce(function (n, i) {
    var r = n[i.name];
    return (
      (n[i.name] = r
        ? Object.assign({}, r, i, {
            options: Object.assign({}, r.options, i.options),
            data: Object.assign({}, r.data, i.data),
          })
        : i),
      n
    );
  }, {});
  return Object.keys(t).map(function (n) {
    return t[n];
  });
}
var Av = { placement: "bottom", modifiers: [], strategy: "absolute" };
function Rv() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function (i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function Pv(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.defaultModifiers,
    i = n === void 0 ? [] : n,
    r = t.defaultOptions,
    o = r === void 0 ? Av : r;
  return function (a, c, l) {
    l === void 0 && (l = o);
    var u = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, Av, o),
        modifiersData: {},
        elements: { reference: a, popper: c },
        attributes: {},
        styles: {},
      },
      d = [],
      p = !1,
      h = {
        state: u,
        setOptions: function (P) {
          var S = typeof P == "function" ? P(u.options) : P;
          w(),
            (u.options = Object.assign({}, o, u.options, S)),
            (u.scrollParents = {
              reference: _n(a)
                ? er(a)
                : a.contextElement
                ? er(a.contextElement)
                : [],
              popper: er(c),
            });
          var C = pp(mp([].concat(i, u.options.modifiers)));
          return (
            (u.orderedModifiers = C.filter(function (F) {
              return F.enabled;
            })),
            D(),
            h.update()
          );
        },
        forceUpdate: function () {
          if (!p) {
            var P = u.elements,
              S = P.reference,
              C = P.popper;
            if (Rv(S, C)) {
              (u.rects = {
                reference: hp(S, Ln(C), u.options.strategy === "fixed"),
                popper: Nr(C),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function (J) {
                  return (u.modifiersData[J.name] = Object.assign({}, J.data));
                });
              for (var F = 0; F < u.orderedModifiers.length; F++) {
                if (u.reset === !0) {
                  (u.reset = !1), (F = -1);
                  continue;
                }
                var V = u.orderedModifiers[F],
                  H = V.fn,
                  ee = V.options,
                  j = ee === void 0 ? {} : ee,
                  de = V.name;
                typeof H == "function" &&
                  (u = H({ state: u, options: j, name: de, instance: h }) || u);
              }
            }
          }
        },
        update: gp(function () {
          return new Promise(function (M) {
            h.forceUpdate(), M(u);
          });
        }),
        destroy: function () {
          w(), (p = !0);
        },
      };
    if (!Rv(a, c)) return h;
    h.setOptions(l).then(function (M) {
      !p && l.onFirstUpdate && l.onFirstUpdate(M);
    });
    function D() {
      u.orderedModifiers.forEach(function (M) {
        var P = M.name,
          S = M.options,
          C = S === void 0 ? {} : S,
          F = M.effect;
        if (typeof F == "function") {
          var V = F({ state: u, name: P, instance: h, options: C }),
            H = function () {};
          d.push(V || H);
        }
      });
    }
    function w() {
      d.forEach(function (M) {
        return M();
      }),
        (d = []);
    }
    return h;
  };
}
var _O = [Ov, Nv, Sv, Ev],
  _p = Pv({ defaultModifiers: _O });
var yO = ["*"];
var Bv = { animation: !0, transitionTimerDelayMs: 5 },
  vO = (() => {
    class e {
      constructor() {
        this.animation = Bv.animation;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
function bO(e) {
  let { transitionDelay: t, transitionDuration: n } =
      window.getComputedStyle(e),
    i = parseFloat(t),
    r = parseFloat(n);
  return (i + r) * 1e3;
}
function DO(e) {
  return typeof e == "string";
}
function wO(e, t) {
  return !t || typeof e.closest > "u" ? null : e.closest(t);
}
function CO(e) {
  return (t) =>
    new ye((n) => {
      let i = (s) => e.run(() => n.next(s)),
        r = (s) => e.run(() => n.error(s)),
        o = () => e.run(() => n.complete());
      return t.subscribe({ next: i, error: r, complete: o });
    });
}
var EO = () => {},
  { transitionTimerDelayMs: TO } = Bv,
  eu = new Map(),
  kv = (e, t, n, i) => {
    let r = i.context || {},
      o = eu.get(t);
    if (o)
      switch (i.runningTransition) {
        case "continue":
          return At;
        case "stop":
          e.run(() => o.transition$.complete()),
            (r = Object.assign(o.context, r)),
            eu.delete(t);
      }
    let s = n(t, i.animation, r) || EO;
    if (
      !i.animation ||
      window.getComputedStyle(t).transitionProperty === "none"
    )
      return e.run(() => s()), X(void 0).pipe(CO(e));
    let a = new tt(),
      c = new tt(),
      l = a.pipe(ku(!0));
    eu.set(t, {
      transition$: a,
      complete: () => {
        c.next(), c.complete();
      },
      context: r,
    });
    let u = bO(t);
    return (
      e.runOutsideAngular(() => {
        let d = xi(t, "transitionend").pipe(
            Hn(l),
            Et(({ target: h }) => h === t)
          ),
          p = lr(u + TO).pipe(Hn(l));
        ja(p, d, c)
          .pipe(Hn(l))
          .subscribe(() => {
            eu.delete(t),
              e.run(() => {
                s(), a.next(), a.complete();
              });
          });
      }),
      a.asObservable()
    );
  };
var tu = (e, t) => (t ? t.some((n) => n.contains(e)) : !1),
  Fv = (e, t) => !t || wO(e, t) != null,
  MO = (() => {
    let e = () =>
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (/Macintosh/.test(navigator.userAgent) &&
          navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2),
      t = () => /Android/.test(navigator.userAgent);
    return typeof navigator < "u" ? !!navigator.userAgent && (e() || t()) : !1;
  })(),
  IO = (e) => (MO ? () => setTimeout(() => e(), 100) : e);
function SO(e, t, n, i, r, o, s, a) {
  n &&
    e.runOutsideAngular(
      IO(() => {
        let c = (p) => {
            let h = p.target;
            return p.button === 2 || tu(h, s)
              ? !1
              : n === "inside"
              ? tu(h, o) && Fv(h, a)
              : n === "outside"
              ? !tu(h, o)
              : Fv(h, a) || !tu(h, o);
          },
          l = xi(t, "keydown").pipe(
            Hn(r),
            Et((p) => p.key === "Escape"),
            st((p) => p.preventDefault())
          ),
          u = xi(t, "mousedown").pipe(ue(c), Hn(r)),
          d = xi(t, "mouseup").pipe(
            Bu(u),
            Et(([p, h]) => h),
            Pu(0),
            Hn(r)
          );
        ja([l.pipe(ue((p) => 0)), d.pipe(ue((p) => 1))]).subscribe((p) =>
          e.run(() => i(p))
        );
      })
    );
}
var e3 = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");
var OO = (() => {
    class e {
      constructor() {
        this._element = I(ht).documentElement;
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
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  xO = /\s+/,
  NO = /  +/gi,
  AO = {
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
function RO(e, t) {
  let [n, i] = AO[e];
  return (t && i) || n;
}
var PO = /^left/,
  kO = /^right/,
  FO = /^start/,
  LO = /^end/;
function jO(e, t) {
  let [n, i] = t.split("-"),
    r = n.replace(PO, "start").replace(kO, "end"),
    o = [r];
  if (i) {
    let s = i;
    (n === "left" || n === "right") &&
      (s = s.replace(FO, "top").replace(LO, "bottom")),
      o.push(`${r}-${s}`);
  }
  return e && (o = o.map((s) => `${e}-${s}`)), o.join(" ");
}
function Lv({ placement: e, baseClass: t }, n) {
  let i = Array.isArray(e) ? e : e.split(xO),
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
    o = i.findIndex((l) => l === "auto");
  o >= 0 &&
    r.forEach(function (l) {
      i.find((u) => u.search("^" + l) !== -1) == null && i.splice(o++, 1, l);
    });
  let s = i.map((l) => RO(l, n.isRTL()));
  return {
    placement: s.shift(),
    modifiers: [
      {
        name: "bootstrapClasses",
        enabled: !!t,
        phase: "write",
        fn({ state: l }) {
          let u = new RegExp(t + "(-[a-z]+)*", "gi"),
            d = l.elements.popper,
            p = l.placement,
            h = d.className;
          (h = h.replace(u, "")),
            (h += ` ${jO(t, p)}`),
            (h = h.trim().replace(NO, " ")),
            (d.className = h);
        },
      },
      ap,
      up,
      np,
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
function jv(e) {
  return e;
}
function BO() {
  let e = I(OO),
    t = null;
  return {
    createPopper(n) {
      if (!t) {
        let r = (n.updatePopperOptions || jv)(Lv(n, e));
        t = _p(n.hostElement, n.targetElement, r);
      }
    },
    update() {
      t && t.update();
    },
    setOptions(n) {
      if (t) {
        let r = (n.updatePopperOptions || jv)(Lv(n, e));
        t.setOptions(r);
      }
    },
    destroy() {
      t && (t.destroy(), (t = null));
    },
  };
}
function VO(e) {
  return (t) => (
    t.modifiers.push(cp, { name: "offset", options: { offset: () => e } }), t
  );
}
var t3 = new Date(1882, 10, 12),
  n3 = new Date(2174, 10, 25);
var i3 = 1e3 * 60 * 60 * 24;
var vp = 1080,
  HO = 24 * vp,
  $O = 12 * vp + 793,
  r3 = 29 * HO + $O,
  o3 = 11 * vp + 204;
var oa = class {
    constructor(t, n, i) {
      (this.nodes = t), (this.viewRef = n), (this.componentRef = i);
    }
  },
  yp = class {
    constructor(t) {
      (this._componentType = t),
        (this._windowRef = null),
        (this._contentRef = null),
        (this._document = I(ht)),
        (this._applicationRef = I(nn)),
        (this._injector = I(ut)),
        (this._viewContainerRef = I(ui)),
        (this._ngZone = I(Oe));
    }
    open(t, n, i = !1) {
      this._windowRef ||
        ((this._contentRef = this._getContentRef(t, n)),
        (this._windowRef = this._viewContainerRef.createComponent(
          this._componentType,
          { injector: this._injector, projectableNodes: this._contentRef.nodes }
        )));
      let { nativeElement: r } = this._windowRef.location,
        o = new tt();
      _s(
        () => {
          o.next(), o.complete();
        },
        { injector: this._injector, phase: ni.MixedReadWrite }
      );
      let s = o.pipe(
        qe(() =>
          kv(this._ngZone, r, ({ classList: a }) => a.add("show"), {
            animation: i,
            runningTransition: "continue",
          })
        )
      );
      return { windowRef: this._windowRef, transition$: s };
    }
    close(t = !1) {
      return this._windowRef
        ? kv(
            this._ngZone,
            this._windowRef.location.nativeElement,
            ({ classList: n }) => n.remove("show"),
            { animation: t, runningTransition: "stop" }
          ).pipe(
            st(() => {
              this._windowRef?.destroy(),
                this._contentRef?.viewRef?.destroy(),
                (this._windowRef = null),
                (this._contentRef = null);
            })
          )
        : X(void 0);
    }
    _getContentRef(t, n) {
      if (t)
        if (t instanceof Bi) {
          let i = t.createEmbeddedView(n);
          return this._applicationRef.attachView(i), new oa([i.rootNodes], i);
        } else return new oa([[this._document.createTextNode(`${t}`)]]);
      else return new oa([]);
    }
  };
var UO = {
  hover: ["mouseenter", "mouseleave"],
  focus: ["focusin", "focusout"],
};
function GO(e) {
  let t = (e || "").trim();
  if (t.length === 0) return [];
  let n = t
      .split(/\s+/)
      .map((r) => r.split(":"))
      .map((r) => UO[r[0]] || r),
    i = n.filter((r) => r.includes("manual"));
  if (i.length > 1)
    throw "Triggers parse error: only one manual trigger is allowed";
  if (i.length === 1 && n.length > 1)
    throw "Triggers parse error: manual trigger can't be mixed with other triggers";
  return i.length ? [] : n;
}
function zO(e, t, n, i, r, o = 0, s = 0) {
  let a = GO(t);
  if (a.length === 0) return () => {};
  let c = new Set(),
    l = [],
    u;
  function d(h, D) {
    e.addEventListener(h, D), l.push(() => e.removeEventListener(h, D));
  }
  function p(h, D) {
    clearTimeout(u), D > 0 ? (u = setTimeout(h, D)) : h();
  }
  for (let [h, D] of a)
    D
      ? (d(h, () => {
          c.add(h), p(() => c.size > 0 && i(), o);
        }),
        d(D, () => {
          c.delete(h), p(() => c.size === 0 && r(), s);
        }))
      : d(h, () => (n() ? p(r, s) : p(i, o)));
  return () => l.forEach((h) => h());
}
var WO = (() => {
    class e {
      constructor() {
        (this._ngbConfig = I(vO)),
          (this.autoClose = !0),
          (this.placement = "auto"),
          (this.popperOptions = (n) => n),
          (this.triggers = "hover focus"),
          (this.disableTooltip = !1),
          (this.openDelay = 0),
          (this.closeDelay = 0);
      }
      get animation() {
        return this._animation ?? this._ngbConfig.animation;
      }
      set animation(n) {
        this._animation = n;
      }
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  qO = 0,
  ZO = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵcmp = dn({
          type: e,
          selectors: [["ngb-tooltip-window"]],
          hostAttrs: ["role", "tooltip"],
          hostVars: 5,
          hostBindings: function (i, r) {
            i & 2 &&
              (Nf("id", r.id),
              __("tooltip" + (r.tooltipClass ? " " + r.tooltipClass : "")),
              wr("fade", r.animation));
          },
          inputs: {
            animation: "animation",
            id: "id",
            tooltipClass: "tooltipClass",
          },
          standalone: !0,
          features: [zc],
          ngContentSelectors: yO,
          decls: 3,
          vars: 0,
          consts: [
            ["data-popper-arrow", "", 1, "tooltip-arrow"],
            [1, "tooltip-inner"],
          ],
          template: function (i, r) {
            i & 1 && (vo(), Ne(0, "div", 0), N(1, "div", 1), bo(2), R());
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
  Vv = (() => {
    class e {
      constructor() {
        (this._config = I(WO)),
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
          (this.shown = new $e()),
          (this.hidden = new $e()),
          (this._nativeElement = I(Nn).nativeElement),
          (this._ngZone = I(Oe)),
          (this._document = I(ht)),
          (this._changeDetector = I(pn)),
          (this._injector = I(ut)),
          (this._ngbTooltipWindowId = `ngb-tooltip-${qO++}`),
          (this._popupService = new yp(ZO)),
          (this._windowRef = null),
          (this._positioning = BO());
      }
      set ngbTooltip(n) {
        (this._ngbTooltip = n), !n && this._windowRef && this.close();
      }
      get ngbTooltip() {
        return this._ngbTooltip;
      }
      open(n) {
        if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
          let { windowRef: i, transition$: r } = this._popupService.open(
            this._ngbTooltip,
            n ?? this.tooltipContext,
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
                updatePopperOptions: (o) => this.popperOptions(VO([0, 6])(o)),
              }),
                Promise.resolve().then(() => {
                  this._positioning.update();
                }),
                (this._afterRenderRef = xf(
                  () => {
                    this._positioning.update();
                  },
                  { phase: ni.MixedReadWrite, injector: this._injector }
                ));
            }),
            SO(
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
      close(n = this.animation) {
        this._windowRef != null &&
          (this._getPositionTargetElement().removeAttribute("aria-describedby"),
          this._popupService.close(n).subscribe(() => {
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
        this._unregisterListenersFn = zO(
          this._nativeElement,
          this.triggers,
          this.isOpen.bind(this),
          this.open.bind(this),
          this.close.bind(this),
          +this.openDelay,
          +this.closeDelay
        );
      }
      ngOnChanges({ tooltipClass: n }) {
        n &&
          this.isOpen() &&
          this._windowRef.setInput("tooltipClass", n.currentValue);
      }
      ngOnDestroy() {
        this.close(!1), this._unregisterListenersFn?.();
      }
      _getPositionTargetElement() {
        return (
          (DO(this.positionTarget)
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
        this.ɵdir = $i({
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
          features: [go],
        });
      }
    }
    return e;
  })(),
  Hv = (() => {
    class e {
      static {
        this.ɵfac = function (i) {
          return new (i || e)();
        };
      }
      static {
        this.ɵmod = It({ type: e });
      }
      static {
        this.ɵinj = Mt({});
      }
    }
    return e;
  })();
var s3 = new Y("live announcer delay", {
  providedIn: "root",
  factory: () => 100,
});
function QO(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "div", 13)(1, "span", 8),
      Ne(2, "i", 14),
      R(),
      N(3, "div", 10)(4, "span", 5),
      re(5),
      R(),
      N(6, "div", 15)(7, "span"),
      re(8),
      R(),
      N(9, "span", 16),
      it("click", function () {
        mt(n);
        let r = Ue();
        return _t(r.copyTextToClipboard(r.support));
      }),
      re(10),
      R()()()();
  }
  if (e & 2) {
    let n = Ue();
    L(5),
      rt("CMSService::Footer:Support"),
      L(3),
      ve(" ext: ", n.code, " "),
      L(),
      tn("ngbTooltip", "::Copy"),
      L(),
      ve(" ", n.support, " ");
  }
}
function KO(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "span", 19),
      it("click", function () {
        mt(n);
        let r = Ue(3);
        return _t(r.copyTextToClipboard(r.phone[0]));
      }),
      re(1),
      R();
  }
  if (e & 2) {
    let n = Ue(3);
    tn("ngbTooltip", "::Copy"), L(), ve(" ", n.phone[0], " ");
  }
}
function JO(e, t) {
  e & 1 && (N(0, "span"), re(1, "/"), R());
}
function XO(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "span", 19),
      it("click", function () {
        mt(n);
        let r = Ue(3);
        return _t(r.copyTextToClipboard(r.phone[1]));
      }),
      dt(1, JO, 2, 0, "span", 20),
      re(2),
      R();
  }
  if (e & 2) {
    let n = Ue(3);
    tn("ngbTooltip", "::Copy"),
      L(),
      Be("ngIf", n.phone[1]),
      L(),
      ve(" ", n.phone[1], " ");
  }
}
function ex(e, t) {
  if (
    (e & 1 &&
      (N(0, "div", 11),
      dt(1, KO, 2, 2, "span", 18)(2, XO, 3, 3, "span", 18),
      R()),
    e & 2)
  ) {
    let n = Ue(2);
    L(), Be("ngIf", n.phone[0]), L(), Be("ngIf", n.phone[1]);
  }
}
function tx(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "div", 11)(1, "span", 19),
      it("click", function () {
        mt(n);
        let r = Ue(3);
        return _t(r.copyTextToClipboard(r.phone));
      }),
      re(2),
      R()();
  }
  if (e & 2) {
    let n = Ue(3);
    L(), tn("ngbTooltip", "::Copy"), L(), ve(" ", n.phone, " ");
  }
}
function nx(e, t) {
  if ((e & 1 && dt(0, tx, 3, 2, "div", 21), e & 2)) {
    let n = Ue(2);
    Be("ngIf", n.phone);
  }
}
function ix(e, t) {
  if (
    (e & 1 &&
      (N(0, "div", 13)(1, "span", 8),
      Ne(2, "i", 14),
      R(),
      N(3, "div", 10)(4, "span", 5),
      re(5),
      R(),
      dt(6, ex, 3, 2, "div", 17)(7, nx, 1, 1, "ng-template", null, 0, Wc),
      R()()),
    e & 2)
  ) {
    let n = Gc(8),
      i = Ue();
    L(5),
      rt("CMSService::Footer:Phone"),
      L(),
      Be("ngIf", i.isMultiplePhones)("ngIfElse", n);
  }
}
function rx(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "span", 25),
      it("click", function () {
        mt(n);
        let r = Ue(3);
        return _t(r.copyTextToClipboard(r.email[0]));
      }),
      re(1),
      R();
  }
  if (e & 2) {
    let n = Ue(3);
    tn("ngbTooltip", "::Copy"), L(), ve(" ", n.email[0], " ");
  }
}
function ox(e, t) {
  e & 1 && (N(0, "span", 26), re(1, "/"), R());
}
function sx(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "span", 25),
      it("click", function () {
        mt(n);
        let r = Ue(3);
        return _t(r.copyTextToClipboard(r.email[1]));
      }),
      re(1),
      R();
  }
  if (e & 2) {
    let n = Ue(3);
    tn("ngbTooltip", "::Copy"), L(), ve(" ", n.email[1], " ");
  }
}
function ax(e, t) {
  if (
    (e & 1 &&
      (N(0, "div", 11),
      dt(1, rx, 2, 2, "span", 23)(2, ox, 2, 0, "span", 24)(
        3,
        sx,
        2,
        2,
        "span",
        23
      ),
      R()),
    e & 2)
  ) {
    let n = Ue(2);
    L(),
      Be("ngIf", n.email[0]),
      L(),
      Be("ngIf", n.email[1]),
      L(),
      Be("ngIf", n.email[1]);
  }
}
function cx(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "span", 19),
      it("click", function () {
        mt(n);
        let r = Ue(3);
        return _t(r.copyTextToClipboard(r.email));
      }),
      re(1),
      R();
  }
  if (e & 2) {
    let n = Ue(3);
    tn("ngbTooltip", "::Copy"), L(), ve(" ", n.email, " ");
  }
}
function lx(e, t) {
  if ((e & 1 && (N(0, "div", 11), dt(1, cx, 2, 2, "span", 18), R()), e & 2)) {
    let n = Ue(2);
    L(), Be("ngIf", n.email);
  }
}
function ux(e, t) {
  if (
    (e & 1 &&
      (N(0, "div", 13)(1, "span", 8),
      Ne(2, "i", 22),
      R(),
      N(3, "div", 10)(4, "span", 5),
      re(5),
      R(),
      dt(6, ax, 4, 3, "div", 17)(7, lx, 2, 1, "ng-template", null, 1, Wc),
      R()()),
    e & 2)
  ) {
    let n = Gc(8),
      i = Ue();
    L(5),
      rt("CMSService::Footer:Email"),
      L(),
      Be("ngIf", i.isMultipleEmails)("ngIfElse", n);
  }
}
var sa = class e {
  constructor(t) {
    this._FooterService = t;
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
    this._FooterService.getContactUsFooter().subscribe((t) => {
      (this.data = t),
        (this.url = this.data.find((r) => r.contactUsEnum === 1008)?.url);
      let n = this.data.find((r) => r.contactUsEnum === 1006)?.emails;
      n.includes(",")
        ? ((this.isMultipleEmails = !0), (this.email = n.split(",")))
        : ((this.isMultipleEmails = !1), (this.email = n));
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
  copyTextToClipboard(t) {
    let n = t?.length ? t.join(",") : t;
    n != null && n != "";
  }
  static ɵfac = function (n) {
    return new (n || e)(Je(ql));
  };
  static ɵcmp = dn({
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
    template: function (n, i) {
      n & 1 &&
        (N(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "span", 5),
        re(4),
        he(5, "translate"),
        R(),
        N(6, "div", 6)(7, "div", 7),
        it("click", function () {
          return i.openUrl();
        }),
        N(8, "span", 8),
        Ne(9, "i", 9),
        R(),
        N(10, "div", 10)(11, "span", 5),
        re(12),
        R(),
        N(13, "span", 11),
        re(14),
        R()()(),
        dt(15, QO, 11, 4, "div", 12)(16, ix, 9, 3, "div", 12)(
          17,
          ux,
          9,
          3,
          "div",
          12
        ),
        R()()()()),
        n & 2 &&
          (L(4),
          rt(Ae(5, 9, "Hello")),
          L(3),
          wr("disabled", !i.url),
          tn(
            "ngbTooltip",
            i.url
              ? "CMSService::Footer:RequestHint"
              : "CMSService::Footer:NotAvailable"
          ),
          L(5),
          rt("CMSService::Footer:Request"),
          L(2),
          rt("CMSService::Footer:TechnicalSupport"),
          L(),
          Be("ngIf", i.support),
          L(),
          Be("ngIf", i.phone),
          L(),
          Be("ngIf", i.email));
    },
    dependencies: [Co, Vv, jo],
    styles: [
      '.card[_ngcontent-%COMP%]{margin-top:24px;margin-bottom:0}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]{padding:32px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:32px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--Text-Body, #1e293b);font-size:1rem;font-weight:700;line-height:24px;flex-grow:2}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:flex-end;flex-grow:1;gap:24px;pointer-events:none}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{display:flex;align-items:center;border-radius:24px;border:1px solid var(--neutral-300, #cbd5e1);gap:8px;pointer-events:fill;transition:.2s all ease-out}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{padding:3px 4px;border-radius:24px;background:linear-gradient(270deg,#000062 -27.72%,#5e1ad5 91.54%);display:flex;justify-content:center;align-items:center}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.25rem;color:#fff}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:var(--Text-Placeholder, #94a3b8);font-size:.625rem;font-weight:500;line-height:16px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{color:var(--Text-Body, #1e293b);font-size:.75rem;font-weight:700;line-height:22px;margin-top:-2px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover{cursor:pointer;color:var(--secondary-dark-purple-100, #5e1ad5)}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]{display:flex;margin-top:-2px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--Text-Body, #1e293b);font-size:.75rem;font-weight:700;line-height:22px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:hover{cursor:pointer;color:var(--secondary-dark-purple-100, #5e1ad5)}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]:hover{border-color:var(--secondary-dark-purple-50, #af8deb);box-shadow:0 6px 16px #0000000a}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support.request[_ngcontent-%COMP%]:hover{cursor:pointer}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support.request[_ngcontent-%COMP%]:hover   .name[_ngcontent-%COMP%]{color:var(--secondary-dark-purple-100, #5e1ad5)}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]:hover   .support[_ngcontent-%COMP%]{opacity:.75}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]:hover   .support[_ngcontent-%COMP%]:hover{opacity:1}.disabled[_ngcontent-%COMP%], .disabled[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{cursor:default!important}.disabled[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{opacity:.5}.disabled[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{color:var(--Text-Placeholder, #94a3b8)!important}.disabled[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:hover{cursor:pointer;color:var(--Text-Placeholder, #94a3b8)!important}.disabled[_ngcontent-%COMP%]:hover{background-color:#f8fafc!important;border:1px solid var(--neutral-300, #cbd5e1)!important;box-shadow:none!important}html[dir=rtl][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%], html[dir=rtl]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{padding:4px 4px 4px 24px}html[dir=rtl][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:before, html[dir=rtl]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:before{content:"."}html[dir=ltr][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{padding:6px 24px 6px 6px}html[dir=ltr][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]{flex-direction:row-reverse}html[dir=ltr][_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:after, html[dir=ltr]   [_nghost-%COMP%]   .card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .suuport-code[_ngcontent-%COMP%]   .phone[_ngcontent-%COMP%]:after{content:"."}@media (max-width: 1399px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{gap:16px}}@media (max-width: 1199px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]{gap:16px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{flex:1 1 100%}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{flex:1 1 auto}}@media (max-width: 991px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{gap:12px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{flex:1 1 48%}}@media (max-width: 767px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{gap:12px}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]   .support[_ngcontent-%COMP%]{flex:1 1 100%}}@media (max-width: 575px){.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   div.contact[_ngcontent-%COMP%]   .contact-details[_ngcontent-%COMP%]{flex-direction:column;width:100%;gap:12px}}@media (max-width: 460px){.email-sep[_ngcontent-%COMP%]{display:none}.email[_ngcontent-%COMP%]{display:block;line-height:1;margin:8px 0}}',
    ],
  });
};
var zo = (function (e) {
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
})(zo || {});
function $v(e, t) {
  return { type: zo.Trigger, name: e, definitions: t, options: {} };
}
function Uv(e, t = null) {
  return { type: zo.Animate, styles: t, timings: e };
}
function Dp(e) {
  return { type: zo.Style, styles: e, offset: null };
}
function wp(e, t, n) {
  return { type: zo.State, name: e, styles: t, options: n };
}
function Gv(e, t, n = null) {
  return { type: zo.Transition, expr: e, animation: t, options: n };
}
var nu = class e {
  getPosition() {
    return new Promise((t, n) => {
      navigator.geolocation.getCurrentPosition(
        (i) => {
          t({ lng: i.coords.longitude, lat: i.coords.latitude });
        },
        (i) => {
          n(i);
        }
      );
    });
  }
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" });
};
var aa = class e {
  transform(t) {
    let n = /\d+:\d+/;
    if (!t) return new Date();
    let [i, r] = t.match(n)[0].split(":").map(Number),
      o = new Date();
    return o.setHours(i, r, 0, 0), o;
  }
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵpipe = ho({ name: "timeToDate", type: e, pure: !0 });
};
function px(e, t) {
  e & 1 && (Cr(0), re(1), he(2, "translate"), Er()),
    e & 2 && (L(), rt(Ae(2, 1, "CMSService::PrayerAzan")));
}
function gx(e, t) {
  e & 1 && (Cr(0), re(1), he(2, "translate"), Er()),
    e & 2 && (L(), rt(Ae(2, 1, "CMSService::PrayerAzan")));
}
var ca = class e {
  constructor(t, n) {
    this.locationService = t;
    this.localization = n;
  }
  showPrayerTime = !1;
  prayerTime;
  AppConsts = Bo;
  nextPrayer;
  isNextSunrise;
  next;
  remanning;
  Tolayout;
  sub$;
  Remmaning = new $e();
  isToggle;
  ngOnInit() {
    this.getLocation();
  }
  getLocation() {
    let t = { latitude: null, longitude: null };
    this.locationService
      .getPosition()
      .then((n) => {
        t = { latitude: n.lat, longitude: n.lng };
      })
      .finally(() => {
        this.getPrayerTime(t);
      });
  }
  getPrayerTime(t) {
    this.sub$ = X({
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
      .subscribe((n) => {
        (this.prayerTime = n),
          this.getNextPrayer(n),
          this.getPrayerList(n),
          lr((60 - new Date().getSeconds()) * 1e3, 60 * 1e3).subscribe(() => {
            this.getNextPrayer(n), this.getPrayerList(n);
          });
      });
  }
  getNextPrayer(t) {
    delete t.date;
    let n = /\d+:\d+/,
      i = Object.entries(t)
        .map(([a, c]) => {
          let [l, u] = c.match(n)[0].split(":").map(Number),
            d = new Date();
          return d.setHours(l, u, 0, 0), { key: a, date: d };
        })
        .sort((a, c) => a.date.getTime() - c.date.getTime()),
      r = new Date(),
      o = i.find(({ date: a }) => r <= a),
      s = !1;
    o || ((o = i[0]), (s = r.getHours() > 0)),
      (this.next = t[o.key]),
      this.calculateRemmanning(s);
  }
  calculateRemmanning(t) {
    let n = /\d+:\d+/,
      [i, r] = this.next.match(n)[0].split(":").map(Number),
      o = new Date();
    o.setHours(i, r, 0, 0), t && o.setDate(o.getDate() + 1);
    let s = new Date(),
      c = (o.getTime() - s.getTime()) / (3600 * 1e3),
      l = Math.floor(c),
      u = Math.floor((c % 1) * 60);
    (this.remanning = `${this.localization.instant(
      "CMSService::PrayerRemmaing"
    )} ${l} ${this.localization.instant(
      "CMSService::PrayerHourAnd"
    )} ${u} ${this.localization.instant("CMSService::PrayerMinute")}`),
      (this.Tolayout = `${l} ${this.localization.instant(
        "CMSService::PrayerHourAnd"
      )} ${u} ${this.localization.instant("CMSService::PrayerMinute")}`);
  }
  togglePrayerTime() {
    (this.isToggle = !0), (this.showPrayerTime = !this.showPrayerTime);
  }
  getPrayerList(t) {
    let n = [
      {
        id: 1,
        name: this.localization.instant("CMSService::PrayerFajr"),
        time: t.fajr,
      },
      {
        id: 2,
        name: this.localization.instant("CMSService::PrayerSunRises"),
        time: t.sunrise,
      },
      {
        id: 3,
        name: this.localization.instant("CMSService::PrayerDuhr"),
        time: t.dhuhr,
      },
      {
        id: 4,
        name: this.localization.instant("CMSService::PrayerAsr"),
        time: t.asr,
      },
      {
        id: 5,
        name: this.localization.instant("CMSService::PrayerMaghrib"),
        time: t.maghrib,
      },
      {
        id: 6,
        name: this.localization.instant("CMSService::PrayerIsha"),
        time: t.isha,
      },
    ];
    (this.nextPrayer = n.find((i) => i.time === this.next.toString())),
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
  static ɵfac = function (n) {
    return new (n || e)(Je(nu), Je(yi));
  };
  static ɵcmp = dn({
    type: e,
    selectors: [["app-prayer-time"]],
    outputs: { Remmaning: "Remmaning" },
    decls: 141,
    vars: 127,
    consts: [
      [1, "prayer-time-lg", 3, "ngClass"],
      [1, "next-prayer"],
      ["src", "assets/images/mousqe.svg", "alt", "Mousqe"],
      [1, "details"],
      [1, "title"],
      [4, "ngIf"],
      [1, "time"],
      [1, "remaining"],
      [1, "remaining-prayers"],
      [1, "logo", "fajr-logo"],
      ["src", "assets/images/fajr.svg", "alt", "Fajr", 1, "fajr"],
      [1, "logo"],
      ["src", "assets/images/sun-rise.svg", "alt", "Sunrise", 1, "sunrise"],
      ["src", "assets/images/Duhr.svg", "alt", "Duhr", 1, "duhr"],
      ["src", "assets/images/Asr.svg", "alt", "Asr", 1, "asr"],
      ["src", "assets/images/Maghrib.svg", "alt", "Maghrib", 1, "maghrib"],
      ["src", "assets/images/Isha.svg", "alt", "Isha", 1, "isha"],
      [1, "prayer-time-sm", 3, "ngClass"],
      [1, "layout"],
      [1, "time-details"],
      ["src", "assets/images/mousqe.svg", "alt", "Sun"],
      ["src", "assets/images/fajr.svg", "alt", "Fajr"],
      ["src", "assets/images/sun-rise.svg", "alt", "Sun Rises"],
      ["src", "assets/images/Duhr.svg", "alt", "Duhr"],
      ["src", "assets/images/Asr.svg", "alt", "Asr"],
      ["src", "assets/images/Maghrib.svg", "alt", "Maghrib"],
      ["src", "assets/images/Isha.svg", "alt", "Isha"],
    ],
    template: function (n, i) {
      n & 1 &&
        (N(0, "div", 0)(1, "div", 1),
        Ne(2, "img", 2),
        N(3, "div", 3)(4, "span", 4),
        dt(5, px, 3, 3, "ng-container", 5),
        re(6),
        R(),
        N(7, "span", 6),
        re(8),
        he(9, "timeToDate"),
        he(10, "date"),
        R(),
        N(11, "span", 7),
        re(12),
        R()()(),
        N(13, "div", 8)(14, "span", 9),
        Ne(15, "img", 10),
        R(),
        N(16, "span", 4),
        re(17),
        he(18, "translate"),
        R(),
        N(19, "span", 6),
        re(20),
        he(21, "timeToDate"),
        he(22, "date"),
        R()(),
        N(23, "div", 8)(24, "span", 11),
        Ne(25, "img", 12),
        R(),
        N(26, "span", 4),
        re(27),
        he(28, "translate"),
        R(),
        N(29, "span", 6),
        re(30),
        he(31, "timeToDate"),
        he(32, "date"),
        R()(),
        N(33, "div", 8)(34, "span", 11),
        Ne(35, "img", 13),
        R(),
        N(36, "span", 4),
        re(37),
        he(38, "translate"),
        R(),
        N(39, "span", 6),
        re(40),
        he(41, "timeToDate"),
        he(42, "date"),
        R()(),
        N(43, "div", 8)(44, "span", 11),
        Ne(45, "img", 14),
        R(),
        N(46, "span", 4),
        re(47),
        he(48, "translate"),
        R(),
        N(49, "span", 6),
        re(50),
        he(51, "timeToDate"),
        he(52, "date"),
        R()(),
        N(53, "div", 8)(54, "span", 11),
        Ne(55, "img", 15),
        R(),
        N(56, "span", 4),
        re(57),
        he(58, "translate"),
        R(),
        N(59, "span", 6),
        re(60),
        he(61, "timeToDate"),
        he(62, "date"),
        R()(),
        N(63, "div", 8)(64, "span", 11),
        Ne(65, "img", 16),
        R(),
        N(66, "span", 4),
        re(67),
        he(68, "translate"),
        R(),
        N(69, "span", 6),
        re(70),
        he(71, "timeToDate"),
        he(72, "date"),
        R()()(),
        N(73, "div", 17)(74, "div", 18)(75, "div", 4)(76, "span"),
        dt(77, gx, 3, 3, "ng-container", 5),
        re(78),
        R(),
        N(79, "span"),
        re(80),
        he(81, "translate"),
        R(),
        N(82, "span"),
        re(83),
        he(84, "translate"),
        R(),
        N(85, "span"),
        re(86),
        he(87, "translate"),
        R(),
        N(88, "span"),
        re(89),
        he(90, "translate"),
        R(),
        N(91, "span"),
        re(92),
        he(93, "translate"),
        R(),
        N(94, "span"),
        re(95),
        he(96, "translate"),
        R()(),
        N(97, "div", 6)(98, "div", 19),
        re(99),
        N(100, "span"),
        re(101),
        R()(),
        N(102, "span"),
        re(103),
        he(104, "timeToDate"),
        he(105, "date"),
        R(),
        N(106, "span"),
        re(107),
        he(108, "timeToDate"),
        he(109, "date"),
        R(),
        N(110, "span"),
        re(111),
        he(112, "timeToDate"),
        he(113, "date"),
        R(),
        N(114, "span"),
        re(115),
        he(116, "timeToDate"),
        he(117, "date"),
        R(),
        N(118, "span"),
        re(119),
        he(120, "timeToDate"),
        he(121, "date"),
        R(),
        N(122, "span"),
        re(123),
        he(124, "timeToDate"),
        he(125, "date"),
        R()(),
        N(126, "div", 11)(127, "span"),
        Ne(128, "img", 20),
        R(),
        N(129, "span"),
        Ne(130, "img", 21),
        R(),
        N(131, "span"),
        Ne(132, "img", 22),
        R(),
        N(133, "span"),
        Ne(134, "img", 23),
        R(),
        N(135, "span"),
        Ne(136, "img", 24),
        R(),
        N(137, "span"),
        Ne(138, "img", 25),
        R(),
        N(139, "span"),
        Ne(140, "img", 26),
        R()()()()),
        n & 2 &&
          (yo("visibility", i.isToggle ? "visible" : "hidden"),
          Be("ngClass", i.showPrayerTime ? "showPrayerTime" : "hidePrayerTime"),
          L(5),
          Be("ngIf", !i.isNextSunrise),
          L(),
          ve(" ", i.nextPrayer == null ? null : i.nextPrayer.name, ""),
          L(2),
          ve(
            "",
            Zt(
              10,
              40,
              Ae(9, 38, i.nextPrayer == null ? null : i.nextPrayer.time),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(4),
          rt(i.remanning),
          L(5),
          ve(" ", Ae(18, 43, "CMSService::PrayerFajr"), " "),
          L(3),
          ve(
            " ",
            Zt(
              22,
              47,
              Ae(21, 45, i.prayerTime == null ? null : i.prayerTime.fajr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(7),
          ve(" ", Ae(28, 50, "CMSService::PrayerSunRises"), " "),
          L(3),
          ve(
            " ",
            Zt(
              32,
              54,
              Ae(31, 52, i.prayerTime == null ? null : i.prayerTime.sunrise),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(7),
          ve(" ", Ae(38, 57, "CMSService::PrayerDuhr"), " "),
          L(3),
          ve(
            " ",
            Zt(
              42,
              61,
              Ae(41, 59, i.prayerTime == null ? null : i.prayerTime.dhuhr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(7),
          ve(" ", Ae(48, 64, "CMSService::PrayerAsr"), " "),
          L(3),
          ve(
            "",
            Zt(
              52,
              68,
              Ae(51, 66, i.prayerTime == null ? null : i.prayerTime.asr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(7),
          ve(" ", Ae(58, 71, "CMSService::PrayerMaghrib"), " "),
          L(3),
          ve(
            " ",
            Zt(
              62,
              75,
              Ae(61, 73, i.prayerTime == null ? null : i.prayerTime.maghrib),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(7),
          ve(" ", Ae(68, 78, "CMSService::PrayerIsha"), " "),
          L(3),
          ve(
            "",
            Zt(
              72,
              82,
              Ae(71, 80, i.prayerTime == null ? null : i.prayerTime.isha),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(3),
          yo("visibility", i.isToggle ? "visible" : "hidden"),
          Be("ngClass", i.showPrayerTime ? "showPrayerTime" : "hidePrayerTime"),
          L(4),
          Be("ngIf", !i.isNextSunrise),
          L(),
          ve(" ", i.nextPrayer == null ? null : i.nextPrayer.name, ""),
          L(2),
          rt(Ae(81, 85, "CMSService::PrayerFajr")),
          L(3),
          rt(Ae(84, 87, "CMSService::PrayerSunRises")),
          L(3),
          rt(Ae(87, 89, "CMSService::PrayerDuhr")),
          L(3),
          rt(Ae(90, 91, "CMSService::PrayerAsr")),
          L(3),
          rt(Ae(93, 93, "CMSService::PrayerMaghrib")),
          L(3),
          rt(Ae(96, 95, "CMSService::PrayerIsha")),
          L(4),
          ve("", i.nextPrayer == null ? null : i.nextPrayer.time, " "),
          L(2),
          ve(" ", i.remanning, " "),
          L(2),
          ve(
            "",
            Zt(
              105,
              99,
              Ae(104, 97, i.prayerTime == null ? null : i.prayerTime.fajr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(4),
          ve(
            "",
            Zt(
              109,
              104,
              Ae(108, 102, i.prayerTime == null ? null : i.prayerTime.sunrise),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(4),
          ve(
            "",
            Zt(
              113,
              109,
              Ae(112, 107, i.prayerTime == null ? null : i.prayerTime.dhuhr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(4),
          ve(
            "",
            Zt(
              117,
              114,
              Ae(116, 112, i.prayerTime == null ? null : i.prayerTime.asr),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(4),
          ve(
            "",
            Zt(
              121,
              119,
              Ae(120, 117, i.prayerTime == null ? null : i.prayerTime.maghrib),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ),
          L(4),
          ve(
            "",
            Zt(
              125,
              124,
              Ae(124, 122, i.prayerTime == null ? null : i.prayerTime.isha),
              i.AppConsts.TimeOnlyFormat
            ),
            " "
          ));
    },
    dependencies: [K_, Co, J_, jo, aa],
    styles: [
      ".prayer-time-lg[_ngcontent-%COMP%]{background:#0f172acc;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);padding:41px 80px;display:flex;justify-content:space-between;align-items:center;position:fixed;z-index:99;bottom:0;width:100vw;transition:padding .9s ease}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]{display:flex;align-items:center;margin-left:40px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-left:16px;width:96px;height:110px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{display:grid;color:#fff}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{border-radius:4px;background:var(--neutral-900, #0f172a);padding:6px 12px;font-size:.875rem;text-align:center;width:fit-content}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{color:var(--basic-white, #fff);font-size:2.5rem}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%]{color:var(--basic-white, #fff);font-size:1rem;font-style:normal}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]{color:#fff;display:grid;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{border-radius:4px;background:var(--neutral-900, #0F172A);padding:6px 12px;font-size:.75rem;color:#fff;text-align:center;width:fit-content}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{display:flex;justify-content:center}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:48px;height:48px}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{color:var(--basic-white, #fff);text-align:center;font-size:1.25rem}.prayer-time-sm[_ngcontent-%COMP%]{display:none;background:#0f172acc;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);padding:16px;justify-content:space-between;align-items:center;position:fixed;z-index:var(--z-index-bottom-layer);bottom:0;width:100vw;border-radius:12px 12px 0 0}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between;align-items:center;margin-bottom:20px}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{display:grid;grid-gap:45px;justify-content:center;align-items:center;color:var(--basic-white, #fff);font-size:.875rem}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:6px 12px;border-radius:4px;background:var(--neutral-900, #0f172a);text-align:center}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{color:var(--basic-white, #fff);text-align:center;font-size:1.25rem;display:grid;grid-gap:49px}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]   .time-details[_ngcontent-%COMP%]{display:grid}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]   .time-details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.75rem}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{display:grid;grid-gap:37px}.prayer-time-sm[_ngcontent-%COMP%]   .layout[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:42px;height:42px}.showPrayerTime[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideFromBottom .3s forwards}.hidePrayerTime[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_slideToBottom .4s forwards}@keyframes _ngcontent-%COMP%_slideFromBottom{0%{bottom:-100px;opacity:0}to{bottom:0;opacity:1}}@keyframes _ngcontent-%COMP%_slideToBottom{0%{transform:translateY(0);opacity:1}to{transform:translateY(100%);opacity:0}}@media (min-width: 1200px){.prayer-time-sm[_ngcontent-%COMP%]{display:none}}@media (max-width: 1199px){.prayer-time-lg[_ngcontent-%COMP%]{grid-gap:5px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:95px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]{grid-gap:10px}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:.875rem;font-weight:500;margin-bottom:0}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{font-size:1.25rem}.prayer-time-lg[_ngcontent-%COMP%]   .next-prayer[_ngcontent-%COMP%]   .details[_ngcontent-%COMP%]   .remaining[_ngcontent-%COMP%], .prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:.625rem;font-weight:500}.prayer-time-lg[_ngcontent-%COMP%]   .remaining-prayers[_ngcontent-%COMP%]   .time[_ngcontent-%COMP%]{font-size:.625rem;font-weight:700}.prayer-time-sm[_ngcontent-%COMP%]{display:none}}@media (max-width: 991px){.prayer-time-lg[_ngcontent-%COMP%]{display:none}.prayer-time-sm[_ngcontent-%COMP%]{display:block}}",
    ],
    data: {
      animation: [
        $v("smoothToggle", [
          wp("show", Dp({ opacity: 1, visibility: "visible" })),
          Gv("show <=> hide", Uv("200ms ease-out")),
          wp("hide", Dp({ opacity: 0, bottom: 0, visibility: "hidden" })),
        ]),
      ],
    },
  });
};
var _x = ["prayerTime"],
  yx = ["*"];
function vx(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "div", 22)(1, "div", 23),
      it("click", function () {
        mt(n);
        let r = Ue();
        return _t((r.showCustomizationMenuInOverlay = !1));
      }),
      R()();
  }
}
function bx(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "div", 24)(1, "div", 23),
      it("click", function () {
        mt(n);
        let r = Ue();
        return _t((r.showNotificationsMenu = !1));
      }),
      R()();
  }
}
function Dx(e, t) {
  if ((e & 1 && (N(0, "div", 25), re(1), R()), e & 2)) {
    let n = Ue();
    L(), rt(n.location);
  }
}
function wx(e, t) {
  e & 1 && Ne(0, "div", 26);
}
function Cx(e, t) {
  e & 1 && (Cr(0), re(1), he(2, "translate"), Er()),
    e & 2 && (L(), rt(Ae(2, 1, "CMSService::PrayerToPrayer")));
}
function Ex(e, t) {
  e & 1 && Ne(0, "div", 26);
}
function Tx(e, t) {
  if (e & 1) {
    let n = qt();
    N(0, "div", 27),
      it("click", function () {
        mt(n);
        let r = Ue();
        return _t(r.showWeather());
      }),
      Ne(1, "img", 28),
      N(2, "div", 29)(3, "span", 30),
      re(4, " \u0652"),
      R(),
      re(5),
      N(6, "span", 31),
      re(7, " \u0652"),
      R(),
      re(8),
      R()();
  }
  if (e & 2) {
    let n = Ue();
    L(),
      tn(
        "src",
        n.todayWeather == null ? null : n.todayWeather.conditionIcon,
        w0
      ),
      tn("alt", n.todayWeather == null ? null : n.todayWeather.condition),
      L(4),
      ve(" ", n.todayWeather == null ? null : n.todayWeather.maxtemp, " /"),
      L(3),
      ve(" ", n.todayWeather == null ? null : n.todayWeather.mintemp, " ");
  }
}
function Mx(e, t) {
  e & 1 && Ne(0, "app-cst-footer");
}
var la = class e {
  constructor(t) {
    this.router = t;
    this.router.events.pipe(ur(this.router)).subscribe((n) => {
      n instanceof Ls && n?.snapshot?.component
        ? (this.inHomePage = n?.snapshot?.data?.inHomePage ?? !1)
        : n instanceof kn &&
          (this.inHomePage =
            t.routerState.snapshot.root.children.length > 0 &&
            this.searchInRouterStateChildren(
              t.routerState.snapshot.root.children[0]
            )),
        setTimeout(() => {
          this.isShowFooter = !this.inHomePage;
        }, 0);
    });
  }
  AppConsts = Bo;
  inHomePage = !1;
  remmaing;
  todayWeather;
  location;
  showCustomizationMenu = !1;
  showCustomizationMenuInOverlay = !1;
  showNotificationsMenu = !1;
  isShowFooter = !1;
  PreviewModeEnum = Xh;
  AttachmentEntities = Wl;
  prayerTime;
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
  searchInRouterStateChildren(t) {
    return (
      t?.data?.inHomePage ||
      (t?.children?.length > 0 &&
        this.searchInRouterStateChildren(t.children[0]))
    );
  }
  ngOnInit() {}
  closeNotification(t) {}
  goToHome() {
    this.router.navigate(["/"]);
  }
  dismissSidebar() {}
  getNotificationsCount(t) {
    this.totalCount = t;
  }
  hideWetherAndPrayertime() {
    this.prayerTime.showPrayerTime && (this.prayerTime.showPrayerTime = !1);
  }
  showPrayerTime() {
    this.prayerTime.togglePrayerTime();
  }
  showWeather() {}
  getRemmaining(t) {
    this.remmaing = t;
  }
  getTodayWeather(t) {
    this.todayWeather = t;
  }
  getLocation(t) {
    this.location = t;
  }
  openEmployeeGuid() {}
  openPublicSearch() {}
  setBackgroundImageUrl() {}
  runSwapImagesInterval() {}
  static ɵfac = function (n) {
    return new (n || e)(Je(kn));
  };
  static ɵcmp = dn({
    type: e,
    selectors: [["cst-workspace-cst-master-layaout"]],
    viewQuery: function (n, i) {
      if ((n & 1 && Af(_x, 7), n & 2)) {
        let r;
        $c((r = Uc())) && (i.prayerTime = r.first);
      }
    },
    ngContentSelectors: yx,
    decls: 31,
    vars: 12,
    consts: [
      ["prayerTime", ""],
      [1, "layout-container"],
      [1, "background"],
      ["src", "assets/images/0-lg.webp", "alt", ""],
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
      [1, "outlet", 3, "click"],
      [3, "Remmaning"],
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
    template: function (n, i) {
      if (n & 1) {
        let r = qt();
        vo(),
          N(0, "div", 1)(1, "div", 2)(2, "picture"),
          Ne(3, "img", 3),
          R()(),
          N(4, "div"),
          Ne(5, "div", 4),
          R(),
          dt(6, vx, 2, 0, "div", 5)(7, bx, 2, 0, "div", 6),
          N(8, "div", 7),
          it("click", function () {
            return mt(r), _t(i.dismissSidebar());
          }),
          N(9, "div", 8)(10, "div", 9)(11, "div", 10)(12, "img", 11),
          it("click", function () {
            return mt(r), _t(i.goToHome());
          }),
          R()(),
          N(13, "div", 12)(14, "div", 13),
          dt(15, Dx, 2, 1, "div", 14)(16, wx, 1, 0, "div", 15),
          R(),
          N(17, "div", 16),
          it("click", function () {
            return mt(r), _t(i.showPrayerTime());
          }),
          Ne(18, "img", 17),
          N(19, "span"),
          re(20),
          dt(21, Cx, 3, 3, "ng-container", 18),
          re(22),
          R()(),
          dt(23, Ex, 1, 0, "div", 15)(24, Tx, 9, 4, "div", 19),
          R()()(),
          N(25, "div", 20),
          it("click", function () {
            return mt(r), _t(i.hideWetherAndPrayertime());
          }),
          bo(26),
          dt(27, Mx, 1, 0, "app-cst-footer", 18),
          R(),
          N(28, "div", 7),
          it("click", function () {
            return mt(r), _t(i.hideWetherAndPrayertime());
          }),
          N(29, "app-prayer-time", 21, 0),
          it("Remmaning", function (s) {
            return mt(r), _t(i.getRemmaining(s));
          }),
          R()()()();
      }
      n & 2 &&
        (wr("in-home-page", i.inHomePage),
        L(6),
        Be("ngIf", i.showCustomizationMenuInOverlay),
        L(),
        Be("ngIf", i.showNotificationsMenu),
        L(8),
        Be("ngIf", i.location),
        L(),
        Be("ngIf", i.location),
        L(4),
        ve(" ", i.remmaing == null ? null : i.remmaing.remanning, " "),
        L(),
        Be("ngIf", !(i.remmaing != null && i.remmaing.isNextSunrise)),
        L(),
        ve(
          " \xA0",
          i.remmaing == null || i.remmaing.prayer == null
            ? null
            : i.remmaing.prayer.name,
          " "
        ),
        L(),
        Be("ngIf", i.todayWeather),
        L(),
        Be("ngIf", i.todayWeather),
        L(3),
        Be("ngIf", i.isShowFooter));
    },
    dependencies: [Co, sa, ca, jo],
    styles: [
      '@keyframes _ngcontent-%COMP%_breath{25%{filter:blur(.5px)}50%{scale:1.15;filter:blur(1px)}to{scale:1.15;filter:blur(1.5px)}}  body{background-color:#f0f0f6}.dropdown-toggle[_ngcontent-%COMP%]:after{display:none}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{position:absolute;z-index:-1;inset:0;background-size:cover;background-attachment:fixed;background-repeat:no-repeat;height:200px;background-color:#0003;background-blend-mode:color}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:100%;object-fit:cover}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]:before{content:"";display:block;position:absolute;background:#0003;width:100%;height:100%}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]   .header-shadow[_ngcontent-%COMP%]{height:100%;width:100%;background:linear-gradient(180deg,#000000bf,#0000)}.layout-container[_ngcontent-%COMP%]   .outlet[_ngcontent-%COMP%]{padding:2rem 2rem 1rem;min-height:calc(100vh - 95px);display:flex;flex-direction:column;justify-content:space-between}.layout-container[_ngcontent-%COMP%]   .outlet[_ngcontent-%COMP%]   router-outlet[_ngcontent-%COMP%]{display:none}.in-home-page[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{height:unset!important;position:fixed;animation:_ngcontent-%COMP%_breath 5s forwards;background-position:center;filter:none}.in-home-page[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]   .header-shadow[_ngcontent-%COMP%]{height:160px}.in-home-page[_ngcontent-%COMP%]   .outlet[_ngcontent-%COMP%]{padding:unset}.header[_ngcontent-%COMP%]{padding:24px 33px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}.header[_ngcontent-%COMP%]:before{content:" ";width:100%;height:100px;background:linear-gradient(180deg,#000000bf,#0000);position:absolute;inset:0;z-index:-1}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem;color:var(--basic-white, #fff);font-size:.75rem;font-style:normal;font-weight:700;line-height:1rem}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{cursor:pointer}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:70px;width:110px}@media (max-width: 575px){.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:54px;width:85px}}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.25rem}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .location-section[_ngcontent-%COMP%]{display:flex;gap:1rem}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .seperator[_ngcontent-%COMP%]{background:#d9d9d9;width:1px;height:16px}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]{gap:.5rem;padding:.375rem .75rem;display:flex;align-items:center;font-size:.6875rem;cursor:pointer}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:20px;height:20px}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]:hover{border-radius:24px;background:#ffffff1a;transition:all .2s ease-out}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:.75rem}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%]{display:flex;gap:.75rem}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .profile[_ngcontent-%COMP%]{cursor:pointer}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center;gap:.25rem;padding:.75rem;border-radius:24px;background:#ffffff1a;color:var(--basic-white, #fff);font-size:.75rem;font-style:normal;font-weight:700;line-height:1rem;cursor:pointer}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--basic-white, #fff);font-size:20px;line-height:20px;width:20px;height:20px;display:flex}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:before{margin:0}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]   .header-content-item-tooltip[_ngcontent-%COMP%]{display:flex;opacity:0;border-radius:6px;background:#ffffff1a;padding:.125rem .5rem;position:absolute;right:50%;translate:50%;transition:all .4s ease-out;font-size:.625rem;font-style:normal;font-weight:700;line-height:1rem;white-space:nowrap}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]:hover{background:#fff3}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-content-item[_ngcontent-%COMP%]:hover   .header-content-item-tooltip[_ngcontent-%COMP%]{opacity:1;transform:translateY(40px)}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .icon-menu-container[_ngcontent-%COMP%]{border:1px solid rgba(255,255,255,.25);padding:calc(.75rem - 1px)}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .employee-guide-item[_ngcontent-%COMP%]   .header-content-item-tooltip[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .drop-down-item[_ngcontent-%COMP%]{padding:0}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .drop-down-item[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]{padding:.75rem;position:relative}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .drop-down-item[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;top:0;left:0}.menu-ovelay[_ngcontent-%COMP%]{position:fixed;inset:0;display:flex;justify-content:center;z-index:-1;background-color:#00000040}.menu-ovelay[_ngcontent-%COMP%]   .menu-ovelay-backdrop[_ngcontent-%COMP%]{position:absolute;inset:0}.customization-menu[_ngcontent-%COMP%], .notifications-menu[_ngcontent-%COMP%]{padding-top:70px;padding-bottom:30px}html[dir=ltr][_nghost-%COMP%]   .degree[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .degree[_ngcontent-%COMP%]{position:relative}html[dir=ltr][_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-max[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-max[_ngcontent-%COMP%]{position:absolute;right:20px;padding-right:1px}html[dir=ltr][_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-min[_ngcontent-%COMP%], html[dir=ltr]   [_nghost-%COMP%]   .degree[_ngcontent-%COMP%]   .icon-min[_ngcontent-%COMP%]{position:absolute;right:-3px}[_nghost-%COMP%]  .profile .dropdown-toggle{text-decoration:none}[_nghost-%COMP%]  .profile .dropdown-toggle img{width:44px;height:44px;border-radius:50%}@media screen and (max-width: 1199px){.header[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%]   .employee-guide-item[_ngcontent-%COMP%]   .employee-guide-title[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%]   .employee-guide-item[_ngcontent-%COMP%]   .header-content-item-tooltip[_ngcontent-%COMP%]{display:flex}}@media screen and (max-width: 991px){.header[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item.prayer-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .location-section[_ngcontent-%COMP%]{display:none!important}}@media screen and (min-width: 360px) and (max-width: 425px){.header[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .info-section-item[_ngcontent-%COMP%]   .degree[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]{gap:0}}@media screen and (max-width: 767px){.header[_ngcontent-%COMP%]{gap:.5rem}.header[_ngcontent-%COMP%]   .header-content-section[_ngcontent-%COMP%]   .header-shortcuts[_ngcontent-%COMP%] > .header-content-item[_ngcontent-%COMP%]:not(.fixed-header-shortcut){display:none}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]   .location-section[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%], .header[_ngcontent-%COMP%]   .header-info-section[_ngcontent-%COMP%]   .info-section[_ngcontent-%COMP%]{gap:0}}@media screen and (max-width: 575px){.outlet[_ngcontent-%COMP%]{padding:.75rem 1rem 1rem!important}.header[_ngcontent-%COMP%]{padding:.625rem 1rem 0;gap:.25rem;position:sticky}.layout-container[_ngcontent-%COMP%]   .background[_ngcontent-%COMP%]{height:115px}}.container-xxxl[_ngcontent-%COMP%]{--bs-gutter-x: 1.5rem;--bs-gutter-y: 0;width:100%;padding-left:calc(var(--bs-gutter-x) * .5);padding-right:calc(var(--bs-gutter-x) * .5);margin-left:auto;margin-right:auto}@media (min-width: 2180px){.container-xxxl[_ngcontent-%COMP%], .container-xxl[_ngcontent-%COMP%], .container-xl[_ngcontent-%COMP%], .container-lg[_ngcontent-%COMP%], .container-md[_ngcontent-%COMP%], .container-sm[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]{max-width:2100px}}.avatar-image[_ngcontent-%COMP%]{width:45px;height:45px;border-radius:100px;font-size:14px}',
    ],
  });
};
var Sx = ["*"],
  iu = class e {
    constructor(t) {
      this.translate = t;
      this.translate.addLangs(["ar", "en"]),
        this.translate.setDefaultLang("en"),
        this.translate.use("en");
    }
    title = "shared-localized-layout";
    change() {
      this.translate.use(this.translate.currentLang == "ar" ? "en" : "ar");
    }
    static ɵfac = function (n) {
      return new (n || e)(Je(yi));
    };
    static ɵcmp = dn({
      type: e,
      selectors: [["app-root"]],
      ngContentSelectors: Sx,
      decls: 2,
      vars: 0,
      template: function (n, i) {
        n & 1 && (vo(), N(0, "cst-workspace-cst-master-layaout"), bo(1), R());
      },
      dependencies: [la],
    });
  };
var ru = class {
  http;
  prefix;
  suffix;
  constructor(t, n = "/assets/i18n/", i = ".json") {
    (this.http = t), (this.prefix = n), (this.suffix = i);
  }
  getTranslation(t) {
    return this.http.get(`${this.prefix}${t}${this.suffix}`);
  }
};
var ou = {
  schedule(e, t) {
    let n = setTimeout(e, t);
    return () => clearTimeout(n);
  },
  scheduleBeforeRender(e) {
    if (typeof window > "u") return ou.schedule(e, 0);
    if (typeof window.requestAnimationFrame > "u") return ou.schedule(e, 16);
    let t = window.requestAnimationFrame(e);
    return () => window.cancelAnimationFrame(t);
  },
};
function Ox(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function xx(e) {
  return !!e && e.nodeType === Node.ELEMENT_NODE;
}
function Nx(e) {
  return typeof e == "function";
}
var Cp;
function Ax(e, t) {
  if (!Cp) {
    let n = Element.prototype;
    Cp =
      n.matches ||
      n.matchesSelector ||
      n.mozMatchesSelector ||
      n.msMatchesSelector ||
      n.oMatchesSelector ||
      n.webkitMatchesSelector;
  }
  return e.nodeType === Node.ELEMENT_NODE ? Cp.call(e, t) : !1;
}
function Rx(e, t) {
  return e === t || (e !== e && t !== t);
}
function Px(e) {
  let t = {};
  return (
    e.forEach(({ propName: n, templateName: i, transform: r }) => {
      t[Ox(i)] = [n, r];
    }),
    t
  );
}
function kx(e, t) {
  return t.get(si).resolveComponentFactory(e).inputs;
}
function Fx(e, t) {
  let n = e.childNodes,
    i = t.map(() => []),
    r = -1;
  t.some((o, s) => (o === "*" ? ((r = s), !0) : !1));
  for (let o = 0, s = n.length; o < s; ++o) {
    let a = n[o],
      c = Lx(a, t, r);
    c !== -1 && i[c].push(a);
  }
  return i;
}
function Lx(e, t, n) {
  let i = n;
  return (
    xx(e) && t.some((r, o) => (r !== "*" && Ax(e, r) ? ((i = o), !0) : !1)), i
  );
}
var jx = 10,
  Ep = class {
    constructor(t, n) {
      this.componentFactory = n.get(si).resolveComponentFactory(t);
    }
    create(t) {
      return new Tp(this.componentFactory, t);
    }
  },
  Tp = class {
    constructor(t, n) {
      (this.componentFactory = t),
        (this.injector = n),
        (this.eventEmitters = new sr(1)),
        (this.events = this.eventEmitters.pipe(lt((i) => La(...i)))),
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
        (this.ngZone = this.injector.get(Oe)),
        (this.elementZone =
          typeof Zone > "u" ? null : this.ngZone.run(() => Zone.current));
    }
    connect(t) {
      this.runInZone(() => {
        if (this.scheduledDestroyFn !== null) {
          this.scheduledDestroyFn(), (this.scheduledDestroyFn = null);
          return;
        }
        this.componentRef === null && this.initializeComponent(t);
      });
    }
    disconnect() {
      this.runInZone(() => {
        this.componentRef === null ||
          this.scheduledDestroyFn !== null ||
          (this.scheduledDestroyFn = ou.schedule(() => {
            this.componentRef !== null &&
              (this.componentRef.destroy(),
              (this.componentRef = null),
              (this.viewChangeDetectorRef = null));
          }, jx));
      });
    }
    getInputValue(t) {
      return this.runInZone(() =>
        this.componentRef === null
          ? this.initialInputValues.get(t)
          : this.componentRef.instance[t]
      );
    }
    setInputValue(t, n, i) {
      this.runInZone(() => {
        if (
          (i && (n = i.call(this.componentRef?.instance, n)),
          this.componentRef === null)
        ) {
          this.initialInputValues.set(t, n);
          return;
        }
        (Rx(n, this.getInputValue(t)) &&
          !(n === void 0 && this.unchangedInputs.has(t))) ||
          (this.recordInputChange(t, n),
          this.unchangedInputs.delete(t),
          (this.hasInputChanges = !0),
          (this.componentRef.instance[t] = n),
          this.scheduleDetectChanges());
      });
    }
    initializeComponent(t) {
      let n = ut.create({ providers: [], parent: this.injector }),
        i = Fx(t, this.componentFactory.ngContentSelectors);
      (this.componentRef = this.componentFactory.create(n, i, t)),
        (this.viewChangeDetectorRef = this.componentRef.injector.get(pn)),
        (this.implementsOnChanges = Nx(this.componentRef.instance.ngOnChanges)),
        this.initializeInputs(),
        this.initializeOutputs(this.componentRef),
        this.detectChanges(),
        this.injector.get(nn).attachView(this.componentRef.hostView);
    }
    initializeInputs() {
      this.componentFactory.inputs.forEach(({ propName: t, transform: n }) => {
        this.initialInputValues.has(t) &&
          this.setInputValue(t, this.initialInputValues.get(t), n);
      }),
        this.initialInputValues.clear();
    }
    initializeOutputs(t) {
      let n = this.componentFactory.outputs.map(
        ({ propName: i, templateName: r }) =>
          t.instance[i].pipe(ue((s) => ({ name: r, value: s })))
      );
      this.eventEmitters.next(n);
    }
    callNgOnChanges(t) {
      if (!this.implementsOnChanges || this.inputChanges === null) return;
      let n = this.inputChanges;
      (this.inputChanges = null), t.instance.ngOnChanges(n);
    }
    markViewForCheck(t) {
      this.hasInputChanges && ((this.hasInputChanges = !1), t.markForCheck());
    }
    scheduleDetectChanges() {
      this.scheduledChangeDetectionFn ||
        (this.scheduledChangeDetectionFn = ou.scheduleBeforeRender(() => {
          (this.scheduledChangeDetectionFn = null), this.detectChanges();
        }));
    }
    recordInputChange(t, n) {
      if (!this.implementsOnChanges) return;
      this.inputChanges === null && (this.inputChanges = {});
      let i = this.inputChanges[t];
      if (i) {
        i.currentValue = n;
        return;
      }
      let r = this.unchangedInputs.has(t),
        o = r ? void 0 : this.getInputValue(t);
      this.inputChanges[t] = new as(o, n, r);
    }
    detectChanges() {
      this.componentRef !== null &&
        (this.callNgOnChanges(this.componentRef),
        this.markViewForCheck(this.viewChangeDetectorRef),
        this.componentRef.changeDetectorRef.detectChanges());
    }
    runInZone(t) {
      return this.elementZone && Zone.current !== this.elementZone
        ? this.ngZone.run(t)
        : t();
    }
  },
  Mp = class extends HTMLElement {
    constructor() {
      super(...arguments), (this.ngElementEventsSubscription = null);
    }
  };
function zv(e, t) {
  let n = kx(e, t.injector),
    i = t.strategyFactory || new Ep(e, t.injector),
    r = Px(n);
  class o extends Mp {
    static {
      this.observedAttributes = Object.keys(r);
    }
    get ngElementStrategy() {
      if (!this._ngElementStrategy) {
        let a = (this._ngElementStrategy = i.create(
          this.injector || t.injector
        ));
        n.forEach(({ propName: c, transform: l }) => {
          if (!this.hasOwnProperty(c)) return;
          let u = this[c];
          delete this[c], a.setInputValue(c, u, l);
        });
      }
      return this._ngElementStrategy;
    }
    constructor(a) {
      super(), (this.injector = a);
    }
    attributeChangedCallback(a, c, l, u) {
      let [d, p] = r[a];
      this.ngElementStrategy.setInputValue(d, l, p);
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
          let c = new CustomEvent(a.name, { detail: a.value });
          this.dispatchEvent(c);
        });
    }
  }
  return (
    n.forEach(({ propName: s, transform: a }) => {
      Object.defineProperty(o.prototype, s, {
        get() {
          return this.ngElementStrategy.getInputValue(s);
        },
        set(c) {
          this.ngElementStrategy.setInputValue(s, c, a);
        },
        configurable: !0,
        enumerable: !0,
      });
    }),
    o
  );
}
var su = class e {
  static ɵfac = function (n) {
    return new (n || e)();
  };
  static ɵmod = It({ type: e });
  static ɵinj = Mt({ providers: [yi], imports: [dl, Hv, Gl] });
};
function Bx(e) {
  return new ru(e, "./i18n/", ".json");
}
var au = class e {
  constructor(t) {
    this.injector = t;
  }
  ngDoBootstrap() {
    customElements.define("my-app", zv(iu, { injector: this.injector }));
  }
  static ɵfac = function (n) {
    return new (n || e)(W(ut));
  };
  static ɵmod = It({ type: e });
  static ɵinj = Mt({
    providers: [py(gy())],
    imports: [
      Ey,
      Vl,
      Gl.forRoot({ loader: { provide: Ji, useFactory: Bx, deps: [Xf] } }),
      su,
    ],
  });
};
var Yn = globalThis;
function bn(e) {
  return (Yn.__Zone_symbol_prefix || "__zone_symbol__") + e;
}
function Vx() {
  let e = Yn.performance;
  function t(se) {
    e && e.mark && e.mark(se);
  }
  function n(se, $) {
    e && e.measure && e.measure(se, $);
  }
  t("Zone");
  let i = (() => {
      class se {
        static {
          this.__symbol__ = bn;
        }
        static assertZonePatched() {
          if (Yn.Promise !== J.ZoneAwarePromise)
            throw new Error(
              "Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)"
            );
        }
        static get root() {
          let m = se.current;
          for (; m.parent; ) m = m.parent;
          return m;
        }
        static get current() {
          return K.zone;
        }
        static get currentTask() {
          return ne;
        }
        static __load_patch(m, _, ie = !1) {
          if (J.hasOwnProperty(m)) {
            let U = Yn[bn("forceDuplicateZoneCheck")] === !0;
            if (!ie && U) throw Error("Already loaded patch: " + m);
          } else if (!Yn["__Zone_disable_" + m]) {
            let U = "Zone:" + m;
            t(U), (J[m] = _(Yn, se, Q)), n(U, U);
          }
        }
        get parent() {
          return this._parent;
        }
        get name() {
          return this._name;
        }
        constructor(m, _) {
          (this._parent = m),
            (this._name = _ ? _.name || "unnamed" : "<root>"),
            (this._properties = (_ && _.properties) || {}),
            (this._zoneDelegate = new o(
              this,
              this._parent && this._parent._zoneDelegate,
              _
            ));
        }
        get(m) {
          let _ = this.getZoneWith(m);
          if (_) return _._properties[m];
        }
        getZoneWith(m) {
          let _ = this;
          for (; _; ) {
            if (_._properties.hasOwnProperty(m)) return _;
            _ = _._parent;
          }
          return null;
        }
        fork(m) {
          if (!m) throw new Error("ZoneSpec required!");
          return this._zoneDelegate.fork(this, m);
        }
        wrap(m, _) {
          if (typeof m != "function")
            throw new Error("Expecting function got: " + m);
          let ie = this._zoneDelegate.intercept(this, m, _),
            U = this;
          return function () {
            return U.runGuarded(ie, this, arguments, _);
          };
        }
        run(m, _, ie, U) {
          K = { parent: K, zone: this };
          try {
            return this._zoneDelegate.invoke(this, m, _, ie, U);
          } finally {
            K = K.parent;
          }
        }
        runGuarded(m, _ = null, ie, U) {
          K = { parent: K, zone: this };
          try {
            try {
              return this._zoneDelegate.invoke(this, m, _, ie, U);
            } catch (Re) {
              if (this._zoneDelegate.handleError(this, Re)) throw Re;
            }
          } finally {
            K = K.parent;
          }
        }
        runTask(m, _, ie) {
          if (m.zone != this)
            throw new Error(
              "A task can only be run in the zone of creation! (Creation: " +
                (m.zone || M).name +
                "; Execution: " +
                this.name +
                ")"
            );
          let U = m,
            {
              type: Re,
              data: { isPeriodic: me = !1, isRefreshable: gt = !1 } = {},
            } = m;
          if (m.state === P && (Re === de || Re === j)) return;
          let et = m.state != F;
          et && U._transitionTo(F, C);
          let ot = ne;
          (ne = U), (K = { parent: K, zone: this });
          try {
            Re == j && m.data && !me && !gt && (m.cancelFn = void 0);
            try {
              return this._zoneDelegate.invokeTask(this, U, _, ie);
            } catch (Dt) {
              if (this._zoneDelegate.handleError(this, Dt)) throw Dt;
            }
          } finally {
            let Dt = m.state;
            if (Dt !== P && Dt !== H)
              if (Re == de || me || (gt && Dt === S))
                et && U._transitionTo(C, F, S);
              else {
                let k = U._zoneDelegates;
                this._updateTaskCount(U, -1),
                  et && U._transitionTo(P, F, P),
                  gt && (U._zoneDelegates = k);
              }
            (K = K.parent), (ne = ot);
          }
        }
        scheduleTask(m) {
          if (m.zone && m.zone !== this) {
            let ie = this;
            for (; ie; ) {
              if (ie === m.zone)
                throw Error(
                  `can not reschedule task to ${this.name} which is descendants of the original zone ${m.zone.name}`
                );
              ie = ie.parent;
            }
          }
          m._transitionTo(S, P);
          let _ = [];
          (m._zoneDelegates = _), (m._zone = this);
          try {
            m = this._zoneDelegate.scheduleTask(this, m);
          } catch (ie) {
            throw (
              (m._transitionTo(H, S, P),
              this._zoneDelegate.handleError(this, ie),
              ie)
            );
          }
          return (
            m._zoneDelegates === _ && this._updateTaskCount(m, 1),
            m.state == S && m._transitionTo(C, S),
            m
          );
        }
        scheduleMicroTask(m, _, ie, U) {
          return this.scheduleTask(new s(ee, m, _, ie, U, void 0));
        }
        scheduleMacroTask(m, _, ie, U, Re) {
          return this.scheduleTask(new s(j, m, _, ie, U, Re));
        }
        scheduleEventTask(m, _, ie, U, Re) {
          return this.scheduleTask(new s(de, m, _, ie, U, Re));
        }
        cancelTask(m) {
          if (m.zone != this)
            throw new Error(
              "A task can only be cancelled in the zone of creation! (Creation: " +
                (m.zone || M).name +
                "; Execution: " +
                this.name +
                ")"
            );
          if (!(m.state !== C && m.state !== F)) {
            m._transitionTo(V, C, F);
            try {
              this._zoneDelegate.cancelTask(this, m);
            } catch (_) {
              throw (
                (m._transitionTo(H, V),
                this._zoneDelegate.handleError(this, _),
                _)
              );
            }
            return (
              this._updateTaskCount(m, -1),
              m._transitionTo(P, V),
              (m.runCount = -1),
              m
            );
          }
        }
        _updateTaskCount(m, _) {
          let ie = m._zoneDelegates;
          _ == -1 && (m._zoneDelegates = null);
          for (let U = 0; U < ie.length; U++) ie[U]._updateTaskCount(m.type, _);
        }
      }
      return se;
    })(),
    r = {
      name: "",
      onHasTask: (se, $, m, _) => se.hasTask(m, _),
      onScheduleTask: (se, $, m, _) => se.scheduleTask(m, _),
      onInvokeTask: (se, $, m, _, ie, U) => se.invokeTask(m, _, ie, U),
      onCancelTask: (se, $, m, _) => se.cancelTask(m, _),
    };
  class o {
    get zone() {
      return this._zone;
    }
    constructor($, m, _) {
      (this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 }),
        (this._zone = $),
        (this._parentDelegate = m),
        (this._forkZS = _ && (_ && _.onFork ? _ : m._forkZS)),
        (this._forkDlgt = _ && (_.onFork ? m : m._forkDlgt)),
        (this._forkCurrZone = _ && (_.onFork ? this._zone : m._forkCurrZone)),
        (this._interceptZS = _ && (_.onIntercept ? _ : m._interceptZS)),
        (this._interceptDlgt = _ && (_.onIntercept ? m : m._interceptDlgt)),
        (this._interceptCurrZone =
          _ && (_.onIntercept ? this._zone : m._interceptCurrZone)),
        (this._invokeZS = _ && (_.onInvoke ? _ : m._invokeZS)),
        (this._invokeDlgt = _ && (_.onInvoke ? m : m._invokeDlgt)),
        (this._invokeCurrZone =
          _ && (_.onInvoke ? this._zone : m._invokeCurrZone)),
        (this._handleErrorZS = _ && (_.onHandleError ? _ : m._handleErrorZS)),
        (this._handleErrorDlgt =
          _ && (_.onHandleError ? m : m._handleErrorDlgt)),
        (this._handleErrorCurrZone =
          _ && (_.onHandleError ? this._zone : m._handleErrorCurrZone)),
        (this._scheduleTaskZS =
          _ && (_.onScheduleTask ? _ : m._scheduleTaskZS)),
        (this._scheduleTaskDlgt =
          _ && (_.onScheduleTask ? m : m._scheduleTaskDlgt)),
        (this._scheduleTaskCurrZone =
          _ && (_.onScheduleTask ? this._zone : m._scheduleTaskCurrZone)),
        (this._invokeTaskZS = _ && (_.onInvokeTask ? _ : m._invokeTaskZS)),
        (this._invokeTaskDlgt = _ && (_.onInvokeTask ? m : m._invokeTaskDlgt)),
        (this._invokeTaskCurrZone =
          _ && (_.onInvokeTask ? this._zone : m._invokeTaskCurrZone)),
        (this._cancelTaskZS = _ && (_.onCancelTask ? _ : m._cancelTaskZS)),
        (this._cancelTaskDlgt = _ && (_.onCancelTask ? m : m._cancelTaskDlgt)),
        (this._cancelTaskCurrZone =
          _ && (_.onCancelTask ? this._zone : m._cancelTaskCurrZone)),
        (this._hasTaskZS = null),
        (this._hasTaskDlgt = null),
        (this._hasTaskDlgtOwner = null),
        (this._hasTaskCurrZone = null);
      let ie = _ && _.onHasTask,
        U = m && m._hasTaskZS;
      (ie || U) &&
        ((this._hasTaskZS = ie ? _ : r),
        (this._hasTaskDlgt = m),
        (this._hasTaskDlgtOwner = this),
        (this._hasTaskCurrZone = this._zone),
        _.onScheduleTask ||
          ((this._scheduleTaskZS = r),
          (this._scheduleTaskDlgt = m),
          (this._scheduleTaskCurrZone = this._zone)),
        _.onInvokeTask ||
          ((this._invokeTaskZS = r),
          (this._invokeTaskDlgt = m),
          (this._invokeTaskCurrZone = this._zone)),
        _.onCancelTask ||
          ((this._cancelTaskZS = r),
          (this._cancelTaskDlgt = m),
          (this._cancelTaskCurrZone = this._zone)));
    }
    fork($, m) {
      return this._forkZS
        ? this._forkZS.onFork(this._forkDlgt, this.zone, $, m)
        : new i($, m);
    }
    intercept($, m, _) {
      return this._interceptZS
        ? this._interceptZS.onIntercept(
            this._interceptDlgt,
            this._interceptCurrZone,
            $,
            m,
            _
          )
        : m;
    }
    invoke($, m, _, ie, U) {
      return this._invokeZS
        ? this._invokeZS.onInvoke(
            this._invokeDlgt,
            this._invokeCurrZone,
            $,
            m,
            _,
            ie,
            U
          )
        : m.apply(_, ie);
    }
    handleError($, m) {
      return this._handleErrorZS
        ? this._handleErrorZS.onHandleError(
            this._handleErrorDlgt,
            this._handleErrorCurrZone,
            $,
            m
          )
        : !0;
    }
    scheduleTask($, m) {
      let _ = m;
      if (this._scheduleTaskZS)
        this._hasTaskZS && _._zoneDelegates.push(this._hasTaskDlgtOwner),
          (_ = this._scheduleTaskZS.onScheduleTask(
            this._scheduleTaskDlgt,
            this._scheduleTaskCurrZone,
            $,
            m
          )),
          _ || (_ = m);
      else if (m.scheduleFn) m.scheduleFn(m);
      else if (m.type == ee) D(m);
      else throw new Error("Task is missing scheduleFn.");
      return _;
    }
    invokeTask($, m, _, ie) {
      return this._invokeTaskZS
        ? this._invokeTaskZS.onInvokeTask(
            this._invokeTaskDlgt,
            this._invokeTaskCurrZone,
            $,
            m,
            _,
            ie
          )
        : m.callback.apply(_, ie);
    }
    cancelTask($, m) {
      let _;
      if (this._cancelTaskZS)
        _ = this._cancelTaskZS.onCancelTask(
          this._cancelTaskDlgt,
          this._cancelTaskCurrZone,
          $,
          m
        );
      else {
        if (!m.cancelFn) throw Error("Task is not cancelable");
        _ = m.cancelFn(m);
      }
      return _;
    }
    hasTask($, m) {
      try {
        this._hasTaskZS &&
          this._hasTaskZS.onHasTask(
            this._hasTaskDlgt,
            this._hasTaskCurrZone,
            $,
            m
          );
      } catch (_) {
        this.handleError($, _);
      }
    }
    _updateTaskCount($, m) {
      let _ = this._taskCounts,
        ie = _[$],
        U = (_[$] = ie + m);
      if (U < 0) throw new Error("More tasks executed then were scheduled.");
      if (ie == 0 || U == 0) {
        let Re = {
          microTask: _.microTask > 0,
          macroTask: _.macroTask > 0,
          eventTask: _.eventTask > 0,
          change: $,
        };
        this.hasTask(this._zone, Re);
      }
    }
  }
  class s {
    constructor($, m, _, ie, U, Re) {
      if (
        ((this._zone = null),
        (this.runCount = 0),
        (this._zoneDelegates = null),
        (this._state = "notScheduled"),
        (this.type = $),
        (this.source = m),
        (this.data = ie),
        (this.scheduleFn = U),
        (this.cancelFn = Re),
        !_)
      )
        throw new Error("callback is not defined");
      this.callback = _;
      let me = this;
      $ === de && ie && ie.useG
        ? (this.invoke = s.invokeTask)
        : (this.invoke = function () {
            return s.invokeTask.call(Yn, me, this, arguments);
          });
    }
    static invokeTask($, m, _) {
      $ || ($ = this), Ye++;
      try {
        return $.runCount++, $.zone.runTask($, m, _);
      } finally {
        Ye == 1 && w(), Ye--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(P, S);
    }
    _transitionTo($, m, _) {
      if (this._state === m || this._state === _)
        (this._state = $), $ == P && (this._zoneDelegates = null);
      else
        throw new Error(
          `${this.type} '${
            this.source
          }': can not transition to '${$}', expecting state '${m}'${
            _ ? " or '" + _ + "'" : ""
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
  let a = bn("setTimeout"),
    c = bn("Promise"),
    l = bn("then"),
    u = [],
    d = !1,
    p;
  function h(se) {
    if ((p || (Yn[c] && (p = Yn[c].resolve(0))), p)) {
      let $ = p[l];
      $ || ($ = p.then), $.call(p, se);
    } else Yn[a](se, 0);
  }
  function D(se) {
    Ye === 0 && u.length === 0 && h(w), se && u.push(se);
  }
  function w() {
    if (!d) {
      for (d = !0; u.length; ) {
        let se = u;
        u = [];
        for (let $ = 0; $ < se.length; $++) {
          let m = se[$];
          try {
            m.zone.runTask(m, null, null);
          } catch (_) {
            Q.onUnhandledError(_);
          }
        }
      }
      Q.microtaskDrainDone(), (d = !1);
    }
  }
  let M = { name: "NO ZONE" },
    P = "notScheduled",
    S = "scheduling",
    C = "scheduled",
    F = "running",
    V = "canceling",
    H = "unknown",
    ee = "microTask",
    j = "macroTask",
    de = "eventTask",
    J = {},
    Q = {
      symbol: bn,
      currentZoneFrame: () => K,
      onUnhandledError: Ie,
      microtaskDrainDone: Ie,
      scheduleMicroTask: D,
      showUncaughtError: () => !i[bn("ignoreConsoleErrorUncaughtError")],
      patchEventTarget: () => [],
      patchOnProperties: Ie,
      patchMethod: () => Ie,
      bindArguments: () => [],
      patchThen: () => Ie,
      patchMacroTask: () => Ie,
      patchEventPrototype: () => Ie,
      isIEOrEdge: () => !1,
      getGlobalObjects: () => {},
      ObjectDefineProperty: () => Ie,
      ObjectGetOwnPropertyDescriptor: () => {},
      ObjectCreate: () => {},
      ArraySlice: () => [],
      patchClass: () => Ie,
      wrapWithCurrentZone: () => Ie,
      filterProperties: () => [],
      attachOriginToPatched: () => Ie,
      _redefineProperty: () => Ie,
      patchCallbacks: () => Ie,
      nativeScheduleMicroTask: h,
    },
    K = { parent: null, zone: new i(null, null) },
    ne = null,
    Ye = 0;
  function Ie() {}
  return n("Zone", "Zone"), i;
}
function Hx() {
  let e = globalThis,
    t = e[bn("forceDuplicateZoneCheck")] === !0;
  if (e.Zone && (t || typeof e.Zone.__symbol__ != "function"))
    throw new Error("Zone already loaded.");
  return (e.Zone ??= Vx()), e.Zone;
}
var da = Object.getOwnPropertyDescriptor,
  Np = Object.defineProperty,
  Ap = Object.getPrototypeOf,
  $x = Object.create,
  Ux = Array.prototype.slice,
  Rp = "addEventListener",
  Pp = "removeEventListener",
  Ip = bn(Rp),
  Sp = bn(Pp),
  wi = "true",
  Ci = "false",
  fa = bn("");
function kp(e, t) {
  return Zone.current.wrap(e, t);
}
function Fp(e, t, n, i, r) {
  return Zone.current.scheduleMacroTask(e, t, n, i, r);
}
var He = bn,
  uu = typeof window < "u",
  Zo = uu ? window : void 0,
  bt = (uu && Zo) || globalThis,
  Gx = "removeAttribute";
function Lp(e, t) {
  for (let n = e.length - 1; n >= 0; n--)
    typeof e[n] == "function" && (e[n] = kp(e[n], t + "_" + n));
  return e;
}
function zx(e, t) {
  let n = e.constructor.name;
  for (let i = 0; i < t.length; i++) {
    let r = t[i],
      o = e[r];
    if (o) {
      let s = da(e, r);
      if (!Jv(s)) continue;
      e[r] = ((a) => {
        let c = function () {
          return a.apply(this, Lp(arguments, n + "." + r));
        };
        return Ti(c, a), c;
      })(o);
    }
  }
}
function Jv(e) {
  return e
    ? e.writable === !1
      ? !1
      : !(typeof e.get == "function" && typeof e.set > "u")
    : !0;
}
var Xv = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
  du =
    !("nw" in bt) &&
    typeof bt.process < "u" &&
    bt.process.toString() === "[object process]",
  jp = !du && !Xv && !!(uu && Zo.HTMLElement),
  eb =
    typeof bt.process < "u" &&
    bt.process.toString() === "[object process]" &&
    !Xv &&
    !!(uu && Zo.HTMLElement),
  lu = {},
  Wx = He("enable_beforeunload"),
  Wv = function (e) {
    if (((e = e || bt.event), !e)) return;
    let t = lu[e.type];
    t || (t = lu[e.type] = He("ON_PROPERTY" + e.type));
    let n = this || e.target || bt,
      i = n[t],
      r;
    if (jp && n === Zo && e.type === "error") {
      let o = e;
      (r =
        i && i.call(this, o.message, o.filename, o.lineno, o.colno, o.error)),
        r === !0 && e.preventDefault();
    } else
      (r = i && i.apply(this, arguments)),
        e.type === "beforeunload" && bt[Wx] && typeof r == "string"
          ? (e.returnValue = r)
          : r != null && !r && e.preventDefault();
    return r;
  };
function qv(e, t, n) {
  let i = da(e, t);
  if (
    (!i && n && da(n, t) && (i = { enumerable: !0, configurable: !0 }),
    !i || !i.configurable)
  )
    return;
  let r = He("on" + t + "patched");
  if (e.hasOwnProperty(r) && e[r]) return;
  delete i.writable, delete i.value;
  let o = i.get,
    s = i.set,
    a = t.slice(2),
    c = lu[a];
  c || (c = lu[a] = He("ON_PROPERTY" + a)),
    (i.set = function (l) {
      let u = this;
      if ((!u && e === bt && (u = bt), !u)) return;
      typeof u[c] == "function" && u.removeEventListener(a, Wv),
        s && s.call(u, null),
        (u[c] = l),
        typeof l == "function" && u.addEventListener(a, Wv, !1);
    }),
    (i.get = function () {
      let l = this;
      if ((!l && e === bt && (l = bt), !l)) return null;
      let u = l[c];
      if (u) return u;
      if (o) {
        let d = o.call(this);
        if (d)
          return (
            i.set.call(this, d),
            typeof l[Gx] == "function" && l.removeAttribute(t),
            d
          );
      }
      return null;
    }),
    Np(e, t, i),
    (e[r] = !0);
}
function tb(e, t, n) {
  if (t) for (let i = 0; i < t.length; i++) qv(e, "on" + t[i], n);
  else {
    let i = [];
    for (let r in e) r.slice(0, 2) == "on" && i.push(r);
    for (let r = 0; r < i.length; r++) qv(e, i[r], n);
  }
}
var jn = He("originalInstance");
function ua(e) {
  let t = bt[e];
  if (!t) return;
  (bt[He(e)] = t),
    (bt[e] = function () {
      let r = Lp(arguments, e);
      switch (r.length) {
        case 0:
          this[jn] = new t();
          break;
        case 1:
          this[jn] = new t(r[0]);
          break;
        case 2:
          this[jn] = new t(r[0], r[1]);
          break;
        case 3:
          this[jn] = new t(r[0], r[1], r[2]);
          break;
        case 4:
          this[jn] = new t(r[0], r[1], r[2], r[3]);
          break;
        default:
          throw new Error("Arg list too long.");
      }
    }),
    Ti(bt[e], t);
  let n = new t(function () {}),
    i;
  for (i in n)
    (e === "XMLHttpRequest" && i === "responseBlob") ||
      (function (r) {
        typeof n[r] == "function"
          ? (bt[e].prototype[r] = function () {
              return this[jn][r].apply(this[jn], arguments);
            })
          : Np(bt[e].prototype, r, {
              set: function (o) {
                typeof o == "function"
                  ? ((this[jn][r] = kp(o, e + "." + r)), Ti(this[jn][r], o))
                  : (this[jn][r] = o);
              },
              get: function () {
                return this[jn][r];
              },
            });
      })(i);
  for (i in t) i !== "prototype" && t.hasOwnProperty(i) && (bt[e][i] = t[i]);
}
function Ei(e, t, n) {
  let i = e;
  for (; i && !i.hasOwnProperty(t); ) i = Ap(i);
  !i && e[t] && (i = e);
  let r = He(t),
    o = null;
  if (i && (!(o = i[r]) || !i.hasOwnProperty(r))) {
    o = i[r] = i[t];
    let s = i && da(i, t);
    if (Jv(s)) {
      let a = n(o, r, t);
      (i[t] = function () {
        return a(this, arguments);
      }),
        Ti(i[t], o);
    }
  }
  return o;
}
function qx(e, t, n) {
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
  i = Ei(
    e,
    t,
    (o) =>
      function (s, a) {
        let c = n(s, a);
        return c.cbIdx >= 0 && typeof a[c.cbIdx] == "function"
          ? Fp(c.name, a[c.cbIdx], c, r)
          : o.apply(s, a);
      }
  );
}
function Ti(e, t) {
  e[He("OriginalDelegate")] = t;
}
var Zv = !1,
  Op = !1;
function Zx() {
  try {
    let e = Zo.navigator.userAgent;
    if (e.indexOf("MSIE ") !== -1 || e.indexOf("Trident/") !== -1) return !0;
  } catch {}
  return !1;
}
function Yx() {
  if (Zv) return Op;
  Zv = !0;
  try {
    let e = Zo.navigator.userAgent;
    (e.indexOf("MSIE ") !== -1 ||
      e.indexOf("Trident/") !== -1 ||
      e.indexOf("Edge/") !== -1) &&
      (Op = !0);
  } catch {}
  return Op;
}
function Yv(e) {
  return typeof e == "function";
}
function Qv(e) {
  return typeof e == "number";
}
var qo = !1;
if (typeof window < "u")
  try {
    let e = Object.defineProperty({}, "passive", {
      get: function () {
        qo = !0;
      },
    });
    window.addEventListener("test", e, e),
      window.removeEventListener("test", e, e);
  } catch {
    qo = !1;
  }
var Qx = { useG: !0 },
  Dn = {},
  nb = {},
  ib = new RegExp("^" + fa + "(\\w+)(true|false)$"),
  rb = He("propagationStopped");
function ob(e, t) {
  let n = (t ? t(e) : e) + Ci,
    i = (t ? t(e) : e) + wi,
    r = fa + n,
    o = fa + i;
  (Dn[e] = {}), (Dn[e][Ci] = r), (Dn[e][wi] = o);
}
function Kx(e, t, n, i) {
  let r = (i && i.add) || Rp,
    o = (i && i.rm) || Pp,
    s = (i && i.listeners) || "eventListeners",
    a = (i && i.rmAll) || "removeAllListeners",
    c = He(r),
    l = "." + r + ":",
    u = "prependListener",
    d = "." + u + ":",
    p = function (S, C, F) {
      if (S.isRemoved) return;
      let V = S.callback;
      typeof V == "object" &&
        V.handleEvent &&
        ((S.callback = (j) => V.handleEvent(j)), (S.originalDelegate = V));
      let H;
      try {
        S.invoke(S, C, [F]);
      } catch (j) {
        H = j;
      }
      let ee = S.options;
      if (ee && typeof ee == "object" && ee.once) {
        let j = S.originalDelegate ? S.originalDelegate : S.callback;
        C[o].call(C, F.type, j, ee);
      }
      return H;
    };
  function h(S, C, F) {
    if (((C = C || e.event), !C)) return;
    let V = S || C.target || e,
      H = V[Dn[C.type][F ? wi : Ci]];
    if (H) {
      let ee = [];
      if (H.length === 1) {
        let j = p(H[0], V, C);
        j && ee.push(j);
      } else {
        let j = H.slice();
        for (let de = 0; de < j.length && !(C && C[rb] === !0); de++) {
          let J = p(j[de], V, C);
          J && ee.push(J);
        }
      }
      if (ee.length === 1) throw ee[0];
      for (let j = 0; j < ee.length; j++) {
        let de = ee[j];
        t.nativeScheduleMicroTask(() => {
          throw de;
        });
      }
    }
  }
  let D = function (S) {
      return h(this, S, !1);
    },
    w = function (S) {
      return h(this, S, !0);
    };
  function M(S, C) {
    if (!S) return !1;
    let F = !0;
    C && C.useG !== void 0 && (F = C.useG);
    let V = C && C.vh,
      H = !0;
    C && C.chkDup !== void 0 && (H = C.chkDup);
    let ee = !1;
    C && C.rt !== void 0 && (ee = C.rt);
    let j = S;
    for (; j && !j.hasOwnProperty(r); ) j = Ap(j);
    if ((!j && S[r] && (j = S), !j || j[c])) return !1;
    let de = C && C.eventNameToString,
      J = {},
      Q = (j[c] = j[r]),
      K = (j[He(o)] = j[o]),
      ne = (j[He(s)] = j[s]),
      Ye = (j[He(a)] = j[a]),
      Ie;
    C && C.prepend && (Ie = j[He(C.prepend)] = j[C.prepend]);
    function se(b, O) {
      return !qo && typeof b == "object" && b
        ? !!b.capture
        : !qo || !O
        ? b
        : typeof b == "boolean"
        ? { capture: b, passive: !0 }
        : b
        ? typeof b == "object" && b.passive !== !1
          ? We(G({}, b), { passive: !0 })
          : b
        : { passive: !0 };
    }
    let $ = function (b) {
        if (!J.isExisting)
          return Q.call(J.target, J.eventName, J.capture ? w : D, J.options);
      },
      m = function (b) {
        if (!b.isRemoved) {
          let O = Dn[b.eventName],
            q;
          O && (q = O[b.capture ? wi : Ci]);
          let oe = q && b.target[q];
          if (oe) {
            for (let te = 0; te < oe.length; te++)
              if (oe[te] === b) {
                oe.splice(te, 1),
                  (b.isRemoved = !0),
                  b.removeAbortListener &&
                    (b.removeAbortListener(), (b.removeAbortListener = null)),
                  oe.length === 0 &&
                    ((b.allRemoved = !0), (b.target[q] = null));
                break;
              }
          }
        }
        if (b.allRemoved)
          return K.call(b.target, b.eventName, b.capture ? w : D, b.options);
      },
      _ = function (b) {
        return Q.call(J.target, J.eventName, b.invoke, J.options);
      },
      ie = function (b) {
        return Ie.call(J.target, J.eventName, b.invoke, J.options);
      },
      U = function (b) {
        return K.call(b.target, b.eventName, b.invoke, b.options);
      },
      Re = F ? $ : _,
      me = F ? m : U,
      gt = function (b, O) {
        let q = typeof O;
        return (
          (q === "function" && b.callback === O) ||
          (q === "object" && b.originalDelegate === O)
        );
      },
      et = C && C.diff ? C.diff : gt,
      ot = Zone[He("UNPATCHED_EVENTS")],
      Dt = e[He("PASSIVE_EVENTS")];
    function k(b) {
      if (typeof b == "object" && b !== null) {
        let O = G({}, b);
        return b.signal && (O.signal = b.signal), O;
      }
      return b;
    }
    let x = function (b, O, q, oe, te = !1, pe = !1) {
      return function () {
        let le = this || e,
          ge = arguments[0];
        C && C.transferEventName && (ge = C.transferEventName(ge));
        let Pe = arguments[1];
        if (!Pe) return b.apply(this, arguments);
        if (du && ge === "uncaughtException") return b.apply(this, arguments);
        let ke = !1;
        if (typeof Pe != "function") {
          if (!Pe.handleEvent) return b.apply(this, arguments);
          ke = !0;
        }
        if (V && !V(b, Pe, le, arguments)) return;
        let Me = qo && !!Dt && Dt.indexOf(ge) !== -1,
          wt = k(se(arguments[2], Me)),
          an = wt?.signal;
        if (an?.aborted) return;
        if (ot) {
          for (let g = 0; g < ot.length; g++)
            if (ge === ot[g])
              return Me ? b.call(le, ge, Pe, wt) : b.apply(this, arguments);
        }
        let Qn = wt ? (typeof wt == "boolean" ? !0 : wt.capture) : !1,
          wn = wt && typeof wt == "object" ? wt.once : !1,
          Mi = Zone.current,
          Ii = Dn[ge];
        Ii || (ob(ge, de), (Ii = Dn[ge]));
        let nr = Ii[Qn ? wi : Ci],
          Cn = le[nr],
          Yo = !1;
        if (Cn) {
          if (((Yo = !0), H)) {
            for (let g = 0; g < Cn.length; g++) if (et(Cn[g], Pe)) return;
          }
        } else Cn = le[nr] = [];
        let Lr,
          ha = le.constructor.name,
          Yt = nb[ha];
        Yt && (Lr = Yt[ge]),
          Lr || (Lr = ha + O + (de ? de(ge) : ge)),
          (J.options = wt),
          wn && (J.options.once = !1),
          (J.target = le),
          (J.capture = Qn),
          (J.eventName = ge),
          (J.isExisting = Yo);
        let Si = F ? Qx : void 0;
        Si && (Si.taskData = J), an && (J.options.signal = void 0);
        let f = Mi.scheduleEventTask(Lr, Pe, Si, q, oe);
        if (an) {
          J.options.signal = an;
          let g = () => f.zone.cancelTask(f);
          b.call(an, "abort", g, { once: !0 }),
            (f.removeAbortListener = () => an.removeEventListener("abort", g));
        }
        if (
          ((J.target = null),
          Si && (Si.taskData = null),
          wn && (J.options.once = !0),
          (!qo && typeof f.options == "boolean") || (f.options = wt),
          (f.target = le),
          (f.capture = Qn),
          (f.eventName = ge),
          ke && (f.originalDelegate = Pe),
          pe ? Cn.unshift(f) : Cn.push(f),
          te)
        )
          return le;
      };
    };
    return (
      (j[r] = x(Q, l, Re, me, ee)),
      Ie && (j[u] = x(Ie, d, ie, me, ee, !0)),
      (j[o] = function () {
        let b = this || e,
          O = arguments[0];
        C && C.transferEventName && (O = C.transferEventName(O));
        let q = arguments[2],
          oe = q ? (typeof q == "boolean" ? !0 : q.capture) : !1,
          te = arguments[1];
        if (!te) return K.apply(this, arguments);
        if (V && !V(K, te, b, arguments)) return;
        let pe = Dn[O],
          le;
        pe && (le = pe[oe ? wi : Ci]);
        let ge = le && b[le];
        if (ge)
          for (let Pe = 0; Pe < ge.length; Pe++) {
            let ke = ge[Pe];
            if (et(ke, te)) {
              if (
                (ge.splice(Pe, 1),
                (ke.isRemoved = !0),
                ge.length === 0 &&
                  ((ke.allRemoved = !0),
                  (b[le] = null),
                  !oe && typeof O == "string"))
              ) {
                let Me = fa + "ON_PROPERTY" + O;
                b[Me] = null;
              }
              return ke.zone.cancelTask(ke), ee ? b : void 0;
            }
          }
        return K.apply(this, arguments);
      }),
      (j[s] = function () {
        let b = this || e,
          O = arguments[0];
        C && C.transferEventName && (O = C.transferEventName(O));
        let q = [],
          oe = sb(b, de ? de(O) : O);
        for (let te = 0; te < oe.length; te++) {
          let pe = oe[te],
            le = pe.originalDelegate ? pe.originalDelegate : pe.callback;
          q.push(le);
        }
        return q;
      }),
      (j[a] = function () {
        let b = this || e,
          O = arguments[0];
        if (O) {
          C && C.transferEventName && (O = C.transferEventName(O));
          let q = Dn[O];
          if (q) {
            let oe = q[Ci],
              te = q[wi],
              pe = b[oe],
              le = b[te];
            if (pe) {
              let ge = pe.slice();
              for (let Pe = 0; Pe < ge.length; Pe++) {
                let ke = ge[Pe],
                  Me = ke.originalDelegate ? ke.originalDelegate : ke.callback;
                this[o].call(this, O, Me, ke.options);
              }
            }
            if (le) {
              let ge = le.slice();
              for (let Pe = 0; Pe < ge.length; Pe++) {
                let ke = ge[Pe],
                  Me = ke.originalDelegate ? ke.originalDelegate : ke.callback;
                this[o].call(this, O, Me, ke.options);
              }
            }
          }
        } else {
          let q = Object.keys(b);
          for (let oe = 0; oe < q.length; oe++) {
            let te = q[oe],
              pe = ib.exec(te),
              le = pe && pe[1];
            le && le !== "removeListener" && this[a].call(this, le);
          }
          this[a].call(this, "removeListener");
        }
        if (ee) return this;
      }),
      Ti(j[r], Q),
      Ti(j[o], K),
      Ye && Ti(j[a], Ye),
      ne && Ti(j[s], ne),
      !0
    );
  }
  let P = [];
  for (let S = 0; S < n.length; S++) P[S] = M(n[S], i);
  return P;
}
function sb(e, t) {
  if (!t) {
    let o = [];
    for (let s in e) {
      let a = ib.exec(s),
        c = a && a[1];
      if (c && (!t || c === t)) {
        let l = e[s];
        if (l) for (let u = 0; u < l.length; u++) o.push(l[u]);
      }
    }
    return o;
  }
  let n = Dn[t];
  n || (ob(t), (n = Dn[t]));
  let i = e[n[Ci]],
    r = e[n[wi]];
  return i ? (r ? i.concat(r) : i.slice()) : r ? r.slice() : [];
}
function Jx(e, t) {
  let n = e.Event;
  n &&
    n.prototype &&
    t.patchMethod(
      n.prototype,
      "stopImmediatePropagation",
      (i) =>
        function (r, o) {
          (r[rb] = !0), i && i.apply(r, o);
        }
    );
}
function Xx(e, t) {
  t.patchMethod(
    e,
    "queueMicrotask",
    (n) =>
      function (i, r) {
        Zone.current.scheduleMicroTask("queueMicrotask", r[0]);
      }
  );
}
var cu = He("zoneTask");
function Wo(e, t, n, i) {
  let r = null,
    o = null;
  (t += i), (n += i);
  let s = {};
  function a(l) {
    let u = l.data;
    u.args[0] = function () {
      return l.invoke.apply(this, arguments);
    };
    let d = r.apply(e, u.args);
    return (
      Qv(d)
        ? (u.handleId = d)
        : ((u.handle = d), (u.isRefreshable = Yv(d.refresh))),
      l
    );
  }
  function c(l) {
    let { handle: u, handleId: d } = l.data;
    return o.call(e, u ?? d);
  }
  (r = Ei(
    e,
    t,
    (l) =>
      function (u, d) {
        if (Yv(d[0])) {
          let p = {
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
                handle: F,
                handleId: V,
                isPeriodic: H,
                isRefreshable: ee,
              } = p;
              !H && !ee && (V ? delete s[V] : F && (F[cu] = null));
            }
          };
          let D = Fp(t, d[0], p, a, c);
          if (!D) return D;
          let {
            handleId: w,
            handle: M,
            isRefreshable: P,
            isPeriodic: S,
          } = D.data;
          if (w) s[w] = D;
          else if (M && ((M[cu] = D), P && !S)) {
            let C = M.refresh;
            M.refresh = function () {
              let { zone: F, state: V } = D;
              return (
                V === "notScheduled"
                  ? ((D._state = "scheduled"), F._updateTaskCount(D, 1))
                  : V === "running" && (D._state = "scheduling"),
                C.call(this)
              );
            };
          }
          return M ?? w ?? D;
        } else return l.apply(e, d);
      }
  )),
    (o = Ei(
      e,
      n,
      (l) =>
        function (u, d) {
          let p = d[0],
            h;
          Qv(p)
            ? ((h = s[p]), delete s[p])
            : ((h = p?.[cu]), h ? (p[cu] = null) : (h = p)),
            h?.type ? h.cancelFn && h.zone.cancelTask(h) : l.apply(e, d);
        }
    ));
}
function eN(e, t) {
  let { isBrowser: n, isMix: i } = t.getGlobalObjects();
  if ((!n && !i) || !e.customElements || !("customElements" in e)) return;
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
  t.patchCallbacks(t, e.customElements, "customElements", "define", r);
}
function tN(e, t) {
  if (Zone[t.symbol("patchEventTarget")]) return;
  let {
    eventNames: n,
    zoneSymbolEventNames: i,
    TRUE_STR: r,
    FALSE_STR: o,
    ZONE_SYMBOL_PREFIX: s,
  } = t.getGlobalObjects();
  for (let c = 0; c < n.length; c++) {
    let l = n[c],
      u = l + o,
      d = l + r,
      p = s + u,
      h = s + d;
    (i[l] = {}), (i[l][o] = p), (i[l][r] = h);
  }
  let a = e.EventTarget;
  if (!(!a || !a.prototype))
    return t.patchEventTarget(e, t, [a && a.prototype]), !0;
}
function nN(e, t) {
  t.patchEventPrototype(e, t);
}
function ab(e, t, n) {
  if (!n || n.length === 0) return t;
  let i = n.filter((o) => o.target === e);
  if (!i || i.length === 0) return t;
  let r = i[0].ignoreProperties;
  return t.filter((o) => r.indexOf(o) === -1);
}
function Kv(e, t, n, i) {
  if (!e) return;
  let r = ab(e, t, n);
  tb(e, r, i);
}
function xp(e) {
  return Object.getOwnPropertyNames(e)
    .filter((t) => t.startsWith("on") && t.length > 2)
    .map((t) => t.substring(2));
}
function iN(e, t) {
  if ((du && !eb) || Zone[e.symbol("patchEvents")]) return;
  let n = t.__Zone_ignore_on_properties,
    i = [];
  if (jp) {
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
    let o = Zx() ? [{ target: r, ignoreProperties: ["error"] }] : [];
    Kv(r, xp(r), n && n.concat(o), Ap(r));
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
    let o = t[i[r]];
    o && o.prototype && Kv(o.prototype, xp(o.prototype), n);
  }
}
function rN(e) {
  e.__load_patch("legacy", (t) => {
    let n = t[e.__symbol__("legacyPatch")];
    n && n();
  }),
    e.__load_patch("timers", (t) => {
      let n = "set",
        i = "clear";
      Wo(t, n, i, "Timeout"), Wo(t, n, i, "Interval"), Wo(t, n, i, "Immediate");
    }),
    e.__load_patch("requestAnimationFrame", (t) => {
      Wo(t, "request", "cancel", "AnimationFrame"),
        Wo(t, "mozRequest", "mozCancel", "AnimationFrame"),
        Wo(t, "webkitRequest", "webkitCancel", "AnimationFrame");
    }),
    e.__load_patch("blocking", (t, n) => {
      let i = ["alert", "prompt", "confirm"];
      for (let r = 0; r < i.length; r++) {
        let o = i[r];
        Ei(
          t,
          o,
          (s, a, c) =>
            function (l, u) {
              return n.current.run(s, t, u, c);
            }
        );
      }
    }),
    e.__load_patch("EventTarget", (t, n, i) => {
      nN(t, i), tN(t, i);
      let r = t.XMLHttpRequestEventTarget;
      r && r.prototype && i.patchEventTarget(t, i, [r.prototype]);
    }),
    e.__load_patch("MutationObserver", (t, n, i) => {
      ua("MutationObserver"), ua("WebKitMutationObserver");
    }),
    e.__load_patch("IntersectionObserver", (t, n, i) => {
      ua("IntersectionObserver");
    }),
    e.__load_patch("FileReader", (t, n, i) => {
      ua("FileReader");
    }),
    e.__load_patch("on_property", (t, n, i) => {
      iN(i, t);
    }),
    e.__load_patch("customElements", (t, n, i) => {
      eN(t, i);
    }),
    e.__load_patch("XHR", (t, n) => {
      l(t);
      let i = He("xhrTask"),
        r = He("xhrSync"),
        o = He("xhrListener"),
        s = He("xhrScheduled"),
        a = He("xhrURL"),
        c = He("xhrErrorBeforeScheduled");
      function l(u) {
        let d = u.XMLHttpRequest;
        if (!d) return;
        let p = d.prototype;
        function h(Q) {
          return Q[i];
        }
        let D = p[Ip],
          w = p[Sp];
        if (!D) {
          let Q = u.XMLHttpRequestEventTarget;
          if (Q) {
            let K = Q.prototype;
            (D = K[Ip]), (w = K[Sp]);
          }
        }
        let M = "readystatechange",
          P = "scheduled";
        function S(Q) {
          let K = Q.data,
            ne = K.target;
          (ne[s] = !1), (ne[c] = !1);
          let Ye = ne[o];
          D || ((D = ne[Ip]), (w = ne[Sp])), Ye && w.call(ne, M, Ye);
          let Ie = (ne[o] = () => {
            if (ne.readyState === ne.DONE)
              if (!K.aborted && ne[s] && Q.state === P) {
                let $ = ne[n.__symbol__("loadfalse")];
                if (ne.status !== 0 && $ && $.length > 0) {
                  let m = Q.invoke;
                  (Q.invoke = function () {
                    let _ = ne[n.__symbol__("loadfalse")];
                    for (let ie = 0; ie < _.length; ie++)
                      _[ie] === Q && _.splice(ie, 1);
                    !K.aborted && Q.state === P && m.call(Q);
                  }),
                    $.push(Q);
                } else Q.invoke();
              } else !K.aborted && ne[s] === !1 && (ne[c] = !0);
          });
          return (
            D.call(ne, M, Ie),
            ne[i] || (ne[i] = Q),
            de.apply(ne, K.args),
            (ne[s] = !0),
            Q
          );
        }
        function C() {}
        function F(Q) {
          let K = Q.data;
          return (K.aborted = !0), J.apply(K.target, K.args);
        }
        let V = Ei(
            p,
            "open",
            () =>
              function (Q, K) {
                return (Q[r] = K[2] == !1), (Q[a] = K[1]), V.apply(Q, K);
              }
          ),
          H = "XMLHttpRequest.send",
          ee = He("fetchTaskAborting"),
          j = He("fetchTaskScheduling"),
          de = Ei(
            p,
            "send",
            () =>
              function (Q, K) {
                if (n.current[j] === !0 || Q[r]) return de.apply(Q, K);
                {
                  let ne = {
                      target: Q,
                      url: Q[a],
                      isPeriodic: !1,
                      args: K,
                      aborted: !1,
                    },
                    Ye = Fp(H, C, ne, S, F);
                  Q &&
                    Q[c] === !0 &&
                    !ne.aborted &&
                    Ye.state === P &&
                    Ye.invoke();
                }
              }
          ),
          J = Ei(
            p,
            "abort",
            () =>
              function (Q, K) {
                let ne = h(Q);
                if (ne && typeof ne.type == "string") {
                  if (ne.cancelFn == null || (ne.data && ne.data.aborted))
                    return;
                  ne.zone.cancelTask(ne);
                } else if (n.current[ee] === !0) return J.apply(Q, K);
              }
          );
      }
    }),
    e.__load_patch("geolocation", (t) => {
      t.navigator &&
        t.navigator.geolocation &&
        zx(t.navigator.geolocation, ["getCurrentPosition", "watchPosition"]);
    }),
    e.__load_patch("PromiseRejectionEvent", (t, n) => {
      function i(r) {
        return function (o) {
          sb(t, r).forEach((a) => {
            let c = t.PromiseRejectionEvent;
            if (c) {
              let l = new c(r, { promise: o.promise, reason: o.rejection });
              a.invoke(l);
            }
          });
        };
      }
      t.PromiseRejectionEvent &&
        ((n[He("unhandledPromiseRejectionHandler")] = i("unhandledrejection")),
        (n[He("rejectionHandledHandler")] = i("rejectionhandled")));
    }),
    e.__load_patch("queueMicrotask", (t, n, i) => {
      Xx(t, i);
    });
}
function oN(e) {
  e.__load_patch("ZoneAwarePromise", (t, n, i) => {
    let r = Object.getOwnPropertyDescriptor,
      o = Object.defineProperty;
    function s(k) {
      if (k && k.toString === Object.prototype.toString) {
        let x = k.constructor && k.constructor.name;
        return (x || "") + ": " + JSON.stringify(k);
      }
      return k ? k.toString() : Object.prototype.toString.call(k);
    }
    let a = i.symbol,
      c = [],
      l = t[a("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1,
      u = a("Promise"),
      d = a("then"),
      p = "__creationTrace__";
    (i.onUnhandledError = (k) => {
      if (i.showUncaughtError()) {
        let x = k && k.rejection;
        x
          ? console.error(
              "Unhandled Promise rejection:",
              x instanceof Error ? x.message : x,
              "; Zone:",
              k.zone.name,
              "; Task:",
              k.task && k.task.source,
              "; Value:",
              x,
              x instanceof Error ? x.stack : void 0
            )
          : console.error(k);
      }
    }),
      (i.microtaskDrainDone = () => {
        for (; c.length; ) {
          let k = c.shift();
          try {
            k.zone.runGuarded(() => {
              throw k.throwOriginal ? k.rejection : k;
            });
          } catch (x) {
            D(x);
          }
        }
      });
    let h = a("unhandledPromiseRejectionHandler");
    function D(k) {
      i.onUnhandledError(k);
      try {
        let x = n[h];
        typeof x == "function" && x.call(this, k);
      } catch {}
    }
    function w(k) {
      return k && k.then;
    }
    function M(k) {
      return k;
    }
    function P(k) {
      return me.reject(k);
    }
    let S = a("state"),
      C = a("value"),
      F = a("finally"),
      V = a("parentPromiseValue"),
      H = a("parentPromiseState"),
      ee = "Promise.then",
      j = null,
      de = !0,
      J = !1,
      Q = 0;
    function K(k, x) {
      return (b) => {
        try {
          se(k, x, b);
        } catch (O) {
          se(k, !1, O);
        }
      };
    }
    let ne = function () {
        let k = !1;
        return function (b) {
          return function () {
            k || ((k = !0), b.apply(null, arguments));
          };
        };
      },
      Ye = "Promise resolved with itself",
      Ie = a("currentTaskTrace");
    function se(k, x, b) {
      let O = ne();
      if (k === b) throw new TypeError(Ye);
      if (k[S] === j) {
        let q = null;
        try {
          (typeof b == "object" || typeof b == "function") && (q = b && b.then);
        } catch (oe) {
          return (
            O(() => {
              se(k, !1, oe);
            })(),
            k
          );
        }
        if (
          x !== J &&
          b instanceof me &&
          b.hasOwnProperty(S) &&
          b.hasOwnProperty(C) &&
          b[S] !== j
        )
          m(b), se(k, b[S], b[C]);
        else if (x !== J && typeof q == "function")
          try {
            q.call(b, O(K(k, x)), O(K(k, !1)));
          } catch (oe) {
            O(() => {
              se(k, !1, oe);
            })();
          }
        else {
          k[S] = x;
          let oe = k[C];
          if (
            ((k[C] = b),
            k[F] === F && x === de && ((k[S] = k[H]), (k[C] = k[V])),
            x === J && b instanceof Error)
          ) {
            let te =
              n.currentTask && n.currentTask.data && n.currentTask.data[p];
            te &&
              o(b, Ie, {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: te,
              });
          }
          for (let te = 0; te < oe.length; )
            _(k, oe[te++], oe[te++], oe[te++], oe[te++]);
          if (oe.length == 0 && x == J) {
            k[S] = Q;
            let te = b;
            try {
              throw new Error(
                "Uncaught (in promise): " +
                  s(b) +
                  (b && b.stack
                    ? `
` + b.stack
                    : "")
              );
            } catch (pe) {
              te = pe;
            }
            l && (te.throwOriginal = !0),
              (te.rejection = b),
              (te.promise = k),
              (te.zone = n.current),
              (te.task = n.currentTask),
              c.push(te),
              i.scheduleMicroTask();
          }
        }
      }
      return k;
    }
    let $ = a("rejectionHandledHandler");
    function m(k) {
      if (k[S] === Q) {
        try {
          let x = n[$];
          x &&
            typeof x == "function" &&
            x.call(this, { rejection: k[C], promise: k });
        } catch {}
        k[S] = J;
        for (let x = 0; x < c.length; x++) k === c[x].promise && c.splice(x, 1);
      }
    }
    function _(k, x, b, O, q) {
      m(k);
      let oe = k[S],
        te = oe
          ? typeof O == "function"
            ? O
            : M
          : typeof q == "function"
          ? q
          : P;
      x.scheduleMicroTask(
        ee,
        () => {
          try {
            let pe = k[C],
              le = !!b && F === b[F];
            le && ((b[V] = pe), (b[H] = oe));
            let ge = x.run(te, void 0, le && te !== P && te !== M ? [] : [pe]);
            se(b, !0, ge);
          } catch (pe) {
            se(b, !1, pe);
          }
        },
        b
      );
    }
    let ie = "function ZoneAwarePromise() { [native code] }",
      U = function () {},
      Re = t.AggregateError;
    class me {
      static toString() {
        return ie;
      }
      static resolve(x) {
        return x instanceof me ? x : se(new this(null), de, x);
      }
      static reject(x) {
        return se(new this(null), J, x);
      }
      static withResolvers() {
        let x = {};
        return (
          (x.promise = new me((b, O) => {
            (x.resolve = b), (x.reject = O);
          })),
          x
        );
      }
      static any(x) {
        if (!x || typeof x[Symbol.iterator] != "function")
          return Promise.reject(new Re([], "All promises were rejected"));
        let b = [],
          O = 0;
        try {
          for (let te of x) O++, b.push(me.resolve(te));
        } catch {
          return Promise.reject(new Re([], "All promises were rejected"));
        }
        if (O === 0)
          return Promise.reject(new Re([], "All promises were rejected"));
        let q = !1,
          oe = [];
        return new me((te, pe) => {
          for (let le = 0; le < b.length; le++)
            b[le].then(
              (ge) => {
                q || ((q = !0), te(ge));
              },
              (ge) => {
                oe.push(ge),
                  O--,
                  O === 0 &&
                    ((q = !0), pe(new Re(oe, "All promises were rejected")));
              }
            );
        });
      }
      static race(x) {
        let b,
          O,
          q = new this((pe, le) => {
            (b = pe), (O = le);
          });
        function oe(pe) {
          b(pe);
        }
        function te(pe) {
          O(pe);
        }
        for (let pe of x) w(pe) || (pe = this.resolve(pe)), pe.then(oe, te);
        return q;
      }
      static all(x) {
        return me.allWithCallback(x);
      }
      static allSettled(x) {
        return (
          this && this.prototype instanceof me ? this : me
        ).allWithCallback(x, {
          thenCallback: (O) => ({ status: "fulfilled", value: O }),
          errorCallback: (O) => ({ status: "rejected", reason: O }),
        });
      }
      static allWithCallback(x, b) {
        let O,
          q,
          oe = new this((ge, Pe) => {
            (O = ge), (q = Pe);
          }),
          te = 2,
          pe = 0,
          le = [];
        for (let ge of x) {
          w(ge) || (ge = this.resolve(ge));
          let Pe = pe;
          try {
            ge.then(
              (ke) => {
                (le[Pe] = b ? b.thenCallback(ke) : ke), te--, te === 0 && O(le);
              },
              (ke) => {
                b
                  ? ((le[Pe] = b.errorCallback(ke)), te--, te === 0 && O(le))
                  : q(ke);
              }
            );
          } catch (ke) {
            q(ke);
          }
          te++, pe++;
        }
        return (te -= 2), te === 0 && O(le), oe;
      }
      constructor(x) {
        let b = this;
        if (!(b instanceof me))
          throw new Error("Must be an instanceof Promise.");
        (b[S] = j), (b[C] = []);
        try {
          let O = ne();
          x && x(O(K(b, de)), O(K(b, J)));
        } catch (O) {
          se(b, !1, O);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return me;
      }
      then(x, b) {
        let O = this.constructor?.[Symbol.species];
        (!O || typeof O != "function") && (O = this.constructor || me);
        let q = new O(U),
          oe = n.current;
        return (
          this[S] == j ? this[C].push(oe, q, x, b) : _(this, oe, q, x, b), q
        );
      }
      catch(x) {
        return this.then(null, x);
      }
      finally(x) {
        let b = this.constructor?.[Symbol.species];
        (!b || typeof b != "function") && (b = me);
        let O = new b(U);
        O[F] = F;
        let q = n.current;
        return this[S] == j ? this[C].push(q, O, x, x) : _(this, q, O, x, x), O;
      }
    }
    (me.resolve = me.resolve),
      (me.reject = me.reject),
      (me.race = me.race),
      (me.all = me.all);
    let gt = (t[u] = t.Promise);
    t.Promise = me;
    let et = a("thenPatched");
    function ot(k) {
      let x = k.prototype,
        b = r(x, "then");
      if (b && (b.writable === !1 || !b.configurable)) return;
      let O = x.then;
      (x[d] = O),
        (k.prototype.then = function (q, oe) {
          return new me((pe, le) => {
            O.call(this, pe, le);
          }).then(q, oe);
        }),
        (k[et] = !0);
    }
    i.patchThen = ot;
    function Dt(k) {
      return function (x, b) {
        let O = k.apply(x, b);
        if (O instanceof me) return O;
        let q = O.constructor;
        return q[et] || ot(q), O;
      };
    }
    return (
      gt && (ot(gt), Ei(t, "fetch", (k) => Dt(k))),
      (Promise[n.__symbol__("uncaughtPromiseErrors")] = c),
      me
    );
  });
}
function sN(e) {
  e.__load_patch("toString", (t) => {
    let n = Function.prototype.toString,
      i = He("OriginalDelegate"),
      r = He("Promise"),
      o = He("Error"),
      s = function () {
        if (typeof this == "function") {
          let u = this[i];
          if (u)
            return typeof u == "function"
              ? n.call(u)
              : Object.prototype.toString.call(u);
          if (this === Promise) {
            let d = t[r];
            if (d) return n.call(d);
          }
          if (this === Error) {
            let d = t[o];
            if (d) return n.call(d);
          }
        }
        return n.call(this);
      };
    (s[i] = n), (Function.prototype.toString = s);
    let a = Object.prototype.toString,
      c = "[object Promise]";
    Object.prototype.toString = function () {
      return typeof Promise == "function" && this instanceof Promise
        ? c
        : a.call(this);
    };
  });
}
function aN(e, t, n, i, r) {
  let o = Zone.__symbol__(i);
  if (t[o]) return;
  let s = (t[o] = t[i]);
  (t[i] = function (a, c, l) {
    return (
      c &&
        c.prototype &&
        r.forEach(function (u) {
          let d = `${n}.${i}::` + u,
            p = c.prototype;
          try {
            if (p.hasOwnProperty(u)) {
              let h = e.ObjectGetOwnPropertyDescriptor(p, u);
              h && h.value
                ? ((h.value = e.wrapWithCurrentZone(h.value, d)),
                  e._redefineProperty(c.prototype, u, h))
                : p[u] && (p[u] = e.wrapWithCurrentZone(p[u], d));
            } else p[u] && (p[u] = e.wrapWithCurrentZone(p[u], d));
          } catch {}
        }),
      s.call(t, a, c, l)
    );
  }),
    e.attachOriginToPatched(t[i], s);
}
function cN(e) {
  e.__load_patch("util", (t, n, i) => {
    let r = xp(t);
    (i.patchOnProperties = tb),
      (i.patchMethod = Ei),
      (i.bindArguments = Lp),
      (i.patchMacroTask = qx);
    let o = n.__symbol__("BLACK_LISTED_EVENTS"),
      s = n.__symbol__("UNPATCHED_EVENTS");
    t[s] && (t[o] = t[s]),
      t[o] && (n[o] = n[s] = t[o]),
      (i.patchEventPrototype = Jx),
      (i.patchEventTarget = Kx),
      (i.isIEOrEdge = Yx),
      (i.ObjectDefineProperty = Np),
      (i.ObjectGetOwnPropertyDescriptor = da),
      (i.ObjectCreate = $x),
      (i.ArraySlice = Ux),
      (i.patchClass = ua),
      (i.wrapWithCurrentZone = kp),
      (i.filterProperties = ab),
      (i.attachOriginToPatched = Ti),
      (i._redefineProperty = Object.defineProperty),
      (i.patchCallbacks = aN),
      (i.getGlobalObjects = () => ({
        globalSources: nb,
        zoneSymbolEventNames: Dn,
        eventNames: r,
        isBrowser: jp,
        isMix: eb,
        isNode: du,
        TRUE_STR: wi,
        FALSE_STR: Ci,
        ZONE_SYMBOL_PREFIX: fa,
        ADD_EVENT_LISTENER_STR: Rp,
        REMOVE_EVENT_LISTENER_STR: Pp,
      }));
  });
}
function lN(e) {
  oN(e), sN(e), cN(e);
}
var cb = Hx();
lN(cb);
rN(cb);
(function () {
  "use strict";
  var e = window.Document.prototype.createElement,
    t = window.Document.prototype.createElementNS,
    n = window.Document.prototype.importNode,
    i = window.Document.prototype.prepend,
    r = window.Document.prototype.append,
    o = window.DocumentFragment.prototype.prepend,
    s = window.DocumentFragment.prototype.append,
    a = window.Node.prototype.cloneNode,
    c = window.Node.prototype.appendChild,
    l = window.Node.prototype.insertBefore,
    u = window.Node.prototype.removeChild,
    d = window.Node.prototype.replaceChild,
    p = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
    h = window.Element.prototype.attachShadow,
    D = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
    w = window.Element.prototype.getAttribute,
    M = window.Element.prototype.setAttribute,
    P = window.Element.prototype.removeAttribute,
    S = window.Element.prototype.toggleAttribute,
    C = window.Element.prototype.getAttributeNS,
    F = window.Element.prototype.setAttributeNS,
    V = window.Element.prototype.removeAttributeNS,
    H = window.Element.prototype.insertAdjacentElement,
    ee = window.Element.prototype.insertAdjacentHTML,
    j = window.Element.prototype.prepend,
    de = window.Element.prototype.append,
    J = window.Element.prototype.before,
    Q = window.Element.prototype.after,
    K = window.Element.prototype.replaceWith,
    ne = window.Element.prototype.remove,
    Ye = window.HTMLElement,
    Ie = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      "innerHTML"
    ),
    se = window.HTMLElement.prototype.insertAdjacentElement,
    $ = window.HTMLElement.prototype.insertAdjacentHTML,
    m = new Set();
  "annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph"
    .split(" ")
    .forEach(function (f) {
      return m.add(f);
    });
  function _(f) {
    var g = m.has(f);
    return (f = /^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(f)), !g && f;
  }
  var ie = document.contains
    ? document.contains.bind(document)
    : document.documentElement.contains.bind(document.documentElement);
  function U(f) {
    var g = f.isConnected;
    if (g !== void 0) return g;
    if (ie(f)) return !0;
    for (; f && !(f.__CE_isImportDocument || f instanceof Document); )
      f =
        f.parentNode ||
        (window.ShadowRoot && f instanceof ShadowRoot ? f.host : void 0);
    return !(!f || !(f.__CE_isImportDocument || f instanceof Document));
  }
  function Re(f) {
    var g = f.children;
    if (g) return Array.prototype.slice.call(g);
    for (g = [], f = f.firstChild; f; f = f.nextSibling)
      f.nodeType === Node.ELEMENT_NODE && g.push(f);
    return g;
  }
  function me(f, g) {
    for (; g && g !== f && !g.nextSibling; ) g = g.parentNode;
    return g && g !== f ? g.nextSibling : null;
  }
  function gt(f, g, v) {
    for (var T = f; T; ) {
      if (T.nodeType === Node.ELEMENT_NODE) {
        var y = T;
        g(y);
        var E = y.localName;
        if (E === "link" && y.getAttribute("rel") === "import") {
          if (
            ((T = y.import),
            v === void 0 && (v = new Set()),
            T instanceof Node && !v.has(T))
          )
            for (v.add(T), T = T.firstChild; T; T = T.nextSibling) gt(T, g, v);
          T = me(f, y);
          continue;
        } else if (E === "template") {
          T = me(f, y);
          continue;
        }
        if ((y = y.__CE_shadowRoot))
          for (y = y.firstChild; y; y = y.nextSibling) gt(y, g, v);
      }
      T = T.firstChild ? T.firstChild : me(f, T);
    }
  }
  function et() {
    var f = !(Yt == null || !Yt.noDocumentConstructionObserver),
      g = !(Yt == null || !Yt.shadyDomFastWalk);
    (this.m = []),
      (this.g = []),
      (this.j = !1),
      (this.shadyDomFastWalk = g),
      (this.I = !f);
  }
  function ot(f, g, v, T) {
    var y = window.ShadyDOM;
    if (f.shadyDomFastWalk && y && y.inUse) {
      if ((g.nodeType === Node.ELEMENT_NODE && v(g), g.querySelectorAll))
        for (
          f = y.nativeMethods.querySelectorAll.call(g, "*"), g = 0;
          g < f.length;
          g++
        )
          v(f[g]);
    } else gt(g, v, T);
  }
  function Dt(f, g) {
    (f.j = !0), f.m.push(g);
  }
  function k(f, g) {
    (f.j = !0), f.g.push(g);
  }
  function x(f, g) {
    f.j &&
      ot(f, g, function (v) {
        return b(f, v);
      });
  }
  function b(f, g) {
    if (f.j && !g.__CE_patched) {
      g.__CE_patched = !0;
      for (var v = 0; v < f.m.length; v++) f.m[v](g);
      for (v = 0; v < f.g.length; v++) f.g[v](g);
    }
  }
  function O(f, g) {
    var v = [];
    for (
      ot(f, g, function (y) {
        return v.push(y);
      }),
        g = 0;
      g < v.length;
      g++
    ) {
      var T = v[g];
      T.__CE_state === 1 ? f.connectedCallback(T) : te(f, T);
    }
  }
  function q(f, g) {
    var v = [];
    for (
      ot(f, g, function (y) {
        return v.push(y);
      }),
        g = 0;
      g < v.length;
      g++
    ) {
      var T = v[g];
      T.__CE_state === 1 && f.disconnectedCallback(T);
    }
  }
  function oe(f, g, v) {
    v = v === void 0 ? {} : v;
    var T = v.J,
      y =
        v.upgrade ||
        function (A) {
          return te(f, A);
        },
      E = [];
    for (
      ot(
        f,
        g,
        function (A) {
          if (
            (f.j && b(f, A),
            A.localName === "link" && A.getAttribute("rel") === "import")
          ) {
            var B = A.import;
            B instanceof Node &&
              ((B.__CE_isImportDocument = !0),
              (B.__CE_registry = document.__CE_registry)),
              B && B.readyState === "complete"
                ? (B.__CE_documentLoadHandled = !0)
                : A.addEventListener("load", function () {
                    var Z = A.import;
                    if (!Z.__CE_documentLoadHandled) {
                      Z.__CE_documentLoadHandled = !0;
                      var De = new Set();
                      T &&
                        (T.forEach(function (Ke) {
                          return De.add(Ke);
                        }),
                        De.delete(Z)),
                        oe(f, Z, { J: De, upgrade: y });
                    }
                  });
          } else E.push(A);
        },
        T
      ),
        g = 0;
      g < E.length;
      g++
    )
      y(E[g]);
  }
  function te(f, g) {
    try {
      var v = g.ownerDocument,
        T = v.__CE_registry,
        y =
          T && (v.defaultView || v.__CE_isImportDocument)
            ? wn(T, g.localName)
            : void 0;
      if (y && g.__CE_state === void 0) {
        y.constructionStack.push(g);
        try {
          try {
            if (new y.constructorFunction() !== g)
              throw Error(
                "The custom element constructor did not produce the element being upgraded."
              );
          } finally {
            y.constructionStack.pop();
          }
        } catch (Z) {
          throw ((g.__CE_state = 2), Z);
        }
        if (
          ((g.__CE_state = 1),
          (g.__CE_definition = y),
          y.attributeChangedCallback && g.hasAttributes())
        ) {
          var E = y.observedAttributes;
          for (y = 0; y < E.length; y++) {
            var A = E[y],
              B = g.getAttribute(A);
            B !== null && f.attributeChangedCallback(g, A, null, B, null);
          }
        }
        U(g) && f.connectedCallback(g);
      }
    } catch (Z) {
      le(Z);
    }
  }
  (et.prototype.connectedCallback = function (f) {
    var g = f.__CE_definition;
    if (g.connectedCallback)
      try {
        g.connectedCallback.call(f);
      } catch (v) {
        le(v);
      }
  }),
    (et.prototype.disconnectedCallback = function (f) {
      var g = f.__CE_definition;
      if (g.disconnectedCallback)
        try {
          g.disconnectedCallback.call(f);
        } catch (v) {
          le(v);
        }
    }),
    (et.prototype.attributeChangedCallback = function (f, g, v, T, y) {
      var E = f.__CE_definition;
      if (E.attributeChangedCallback && -1 < E.observedAttributes.indexOf(g))
        try {
          E.attributeChangedCallback.call(f, g, v, T, y);
        } catch (A) {
          le(A);
        }
    });
  function pe(f, g, v, T) {
    var y = g.__CE_registry;
    if (
      y &&
      (T === null || T === "http://www.w3.org/1999/xhtml") &&
      (y = wn(y, v))
    )
      try {
        var E = new y.constructorFunction();
        if (E.__CE_state === void 0 || E.__CE_definition === void 0)
          throw Error(
            "Failed to construct '" +
              v +
              "': The returned value was not constructed with the HTMLElement constructor."
          );
        if (E.namespaceURI !== "http://www.w3.org/1999/xhtml")
          throw Error(
            "Failed to construct '" +
              v +
              "': The constructed element's namespace must be the HTML namespace."
          );
        if (E.hasAttributes())
          throw Error(
            "Failed to construct '" +
              v +
              "': The constructed element must not have any attributes."
          );
        if (E.firstChild !== null)
          throw Error(
            "Failed to construct '" +
              v +
              "': The constructed element must not have any children."
          );
        if (E.parentNode !== null)
          throw Error(
            "Failed to construct '" +
              v +
              "': The constructed element must not have a parent node."
          );
        if (E.ownerDocument !== g)
          throw Error(
            "Failed to construct '" +
              v +
              "': The constructed element's owner document is incorrect."
          );
        if (E.localName !== v)
          throw Error(
            "Failed to construct '" +
              v +
              "': The constructed element's local name is incorrect."
          );
        return E;
      } catch (A) {
        return (
          le(A),
          (g = T === null ? e.call(g, v) : t.call(g, T, v)),
          Object.setPrototypeOf(g, HTMLUnknownElement.prototype),
          (g.__CE_state = 2),
          (g.__CE_definition = void 0),
          b(f, g),
          g
        );
      }
    return (g = T === null ? e.call(g, v) : t.call(g, T, v)), b(f, g), g;
  }
  function le(f) {
    var g = "",
      v = "",
      T = 0,
      y = 0;
    f instanceof Error
      ? ((g = f.message),
        (v = f.sourceURL || f.fileName || ""),
        (T = f.line || f.lineNumber || 0),
        (y = f.column || f.columnNumber || 0))
      : (g = "Uncaught " + String(f));
    var E = void 0;
    ErrorEvent.prototype.initErrorEvent === void 0
      ? (E = new ErrorEvent("error", {
          cancelable: !0,
          message: g,
          filename: v,
          lineno: T,
          colno: y,
          error: f,
        }))
      : ((E = document.createEvent("ErrorEvent")),
        E.initErrorEvent("error", !1, !0, g, v, T),
        (E.preventDefault = function () {
          Object.defineProperty(this, "defaultPrevented", {
            configurable: !0,
            get: function () {
              return !0;
            },
          });
        })),
      E.error === void 0 &&
        Object.defineProperty(E, "error", {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return f;
          },
        }),
      window.dispatchEvent(E),
      E.defaultPrevented || console.error(f);
  }
  function ge() {
    var f = this;
    (this.g = void 0),
      (this.F = new Promise(function (g) {
        f.l = g;
      }));
  }
  ge.prototype.resolve = function (f) {
    if (this.g) throw Error("Already resolved.");
    (this.g = f), this.l(f);
  };
  function Pe(f) {
    var g = document;
    (this.l = void 0),
      (this.h = f),
      (this.g = g),
      oe(this.h, this.g),
      this.g.readyState === "loading" &&
        ((this.l = new MutationObserver(this.G.bind(this))),
        this.l.observe(this.g, { childList: !0, subtree: !0 }));
  }
  function ke(f) {
    f.l && f.l.disconnect();
  }
  Pe.prototype.G = function (f) {
    var g = this.g.readyState;
    for (
      (g !== "interactive" && g !== "complete") || ke(this), g = 0;
      g < f.length;
      g++
    )
      for (var v = f[g].addedNodes, T = 0; T < v.length; T++) oe(this.h, v[T]);
  };
  function Me(f) {
    (this.s = new Map()),
      (this.u = new Map()),
      (this.C = new Map()),
      (this.A = !1),
      (this.B = new Map()),
      (this.o = function (g) {
        return g();
      }),
      (this.i = !1),
      (this.v = []),
      (this.h = f),
      (this.D = f.I ? new Pe(f) : void 0);
  }
  (Me.prototype.H = function (f, g) {
    var v = this;
    if (!(g instanceof Function))
      throw new TypeError(
        "Custom element constructor getters must be functions."
      );
    wt(this, f),
      this.s.set(f, g),
      this.v.push(f),
      this.i ||
        ((this.i = !0),
        this.o(function () {
          return Qn(v);
        }));
  }),
    (Me.prototype.define = function (f, g) {
      var v = this;
      if (!(g instanceof Function))
        throw new TypeError("Custom element constructors must be functions.");
      wt(this, f),
        an(this, f, g),
        this.v.push(f),
        this.i ||
          ((this.i = !0),
          this.o(function () {
            return Qn(v);
          }));
    });
  function wt(f, g) {
    if (!_(g))
      throw new SyntaxError("The element name '" + g + "' is not valid.");
    if (wn(f, g))
      throw Error(
        "A custom element with name '" + (g + "' has already been defined.")
      );
    if (f.A) throw Error("A custom element is already being defined.");
  }
  function an(f, g, v) {
    f.A = !0;
    var T;
    try {
      var y = v.prototype;
      if (!(y instanceof Object))
        throw new TypeError(
          "The custom element constructor's prototype is not an object."
        );
      var E = function (Ke) {
          var jr = y[Ke];
          if (jr !== void 0 && !(jr instanceof Function))
            throw Error("The '" + Ke + "' callback must be a function.");
          return jr;
        },
        A = E("connectedCallback"),
        B = E("disconnectedCallback"),
        Z = E("adoptedCallback"),
        De =
          ((T = E("attributeChangedCallback")) && v.observedAttributes) || [];
    } catch (Ke) {
      throw Ke;
    } finally {
      f.A = !1;
    }
    return (
      (v = {
        localName: g,
        constructorFunction: v,
        connectedCallback: A,
        disconnectedCallback: B,
        adoptedCallback: Z,
        attributeChangedCallback: T,
        observedAttributes: De,
        constructionStack: [],
      }),
      f.u.set(g, v),
      f.C.set(v.constructorFunction, v),
      v
    );
  }
  Me.prototype.upgrade = function (f) {
    oe(this.h, f);
  };
  function Qn(f) {
    if (f.i !== !1) {
      f.i = !1;
      for (var g = [], v = f.v, T = new Map(), y = 0; y < v.length; y++)
        T.set(v[y], []);
      for (
        oe(f.h, document, {
          upgrade: function (Z) {
            if (Z.__CE_state === void 0) {
              var De = Z.localName,
                Ke = T.get(De);
              Ke ? Ke.push(Z) : f.u.has(De) && g.push(Z);
            }
          },
        }),
          y = 0;
        y < g.length;
        y++
      )
        te(f.h, g[y]);
      for (y = 0; y < v.length; y++) {
        for (var E = v[y], A = T.get(E), B = 0; B < A.length; B++)
          te(f.h, A[B]);
        (E = f.B.get(E)) && E.resolve(void 0);
      }
      v.length = 0;
    }
  }
  (Me.prototype.get = function (f) {
    if ((f = wn(this, f))) return f.constructorFunction;
  }),
    (Me.prototype.whenDefined = function (f) {
      if (!_(f))
        return Promise.reject(
          new SyntaxError("'" + f + "' is not a valid custom element name.")
        );
      var g = this.B.get(f);
      if (g) return g.F;
      (g = new ge()), this.B.set(f, g);
      var v = this.u.has(f) || this.s.has(f);
      return (f = this.v.indexOf(f) === -1), v && f && g.resolve(void 0), g.F;
    }),
    (Me.prototype.polyfillWrapFlushCallback = function (f) {
      this.D && ke(this.D);
      var g = this.o;
      this.o = function (v) {
        return f(function () {
          return g(v);
        });
      };
    });
  function wn(f, g) {
    var v = f.u.get(g);
    if (v) return v;
    if ((v = f.s.get(g))) {
      f.s.delete(g);
      try {
        return an(f, g, v());
      } catch (T) {
        le(T);
      }
    }
  }
  (Me.prototype.define = Me.prototype.define),
    (Me.prototype.upgrade = Me.prototype.upgrade),
    (Me.prototype.get = Me.prototype.get),
    (Me.prototype.whenDefined = Me.prototype.whenDefined),
    (Me.prototype.polyfillDefineLazy = Me.prototype.H),
    (Me.prototype.polyfillWrapFlushCallback =
      Me.prototype.polyfillWrapFlushCallback);
  function Mi(f, g, v) {
    function T(y) {
      return function (E) {
        for (var A = [], B = 0; B < arguments.length; ++B) A[B] = arguments[B];
        B = [];
        for (var Z = [], De = 0; De < A.length; De++) {
          var Ke = A[De];
          if (
            (Ke instanceof Element && U(Ke) && Z.push(Ke),
            Ke instanceof DocumentFragment)
          )
            for (Ke = Ke.firstChild; Ke; Ke = Ke.nextSibling) B.push(Ke);
          else B.push(Ke);
        }
        for (y.apply(this, A), A = 0; A < Z.length; A++) q(f, Z[A]);
        if (U(this))
          for (A = 0; A < B.length; A++)
            (Z = B[A]), Z instanceof Element && O(f, Z);
      };
    }
    v.prepend !== void 0 && (g.prepend = T(v.prepend)),
      v.append !== void 0 && (g.append = T(v.append));
  }
  function Ii(f) {
    (Document.prototype.createElement = function (g) {
      return pe(f, this, g, null);
    }),
      (Document.prototype.importNode = function (g, v) {
        return (
          (g = n.call(this, g, !!v)), this.__CE_registry ? oe(f, g) : x(f, g), g
        );
      }),
      (Document.prototype.createElementNS = function (g, v) {
        return pe(f, this, v, g);
      }),
      Mi(f, Document.prototype, { prepend: i, append: r });
  }
  function nr(f) {
    function g(T) {
      return function (y) {
        for (var E = [], A = 0; A < arguments.length; ++A) E[A] = arguments[A];
        A = [];
        for (var B = [], Z = 0; Z < E.length; Z++) {
          var De = E[Z];
          if (
            (De instanceof Element && U(De) && B.push(De),
            De instanceof DocumentFragment)
          )
            for (De = De.firstChild; De; De = De.nextSibling) A.push(De);
          else A.push(De);
        }
        for (T.apply(this, E), E = 0; E < B.length; E++) q(f, B[E]);
        if (U(this))
          for (E = 0; E < A.length; E++)
            (B = A[E]), B instanceof Element && O(f, B);
      };
    }
    var v = Element.prototype;
    J !== void 0 && (v.before = g(J)),
      Q !== void 0 && (v.after = g(Q)),
      K !== void 0 &&
        (v.replaceWith = function (T) {
          for (var y = [], E = 0; E < arguments.length; ++E)
            y[E] = arguments[E];
          E = [];
          for (var A = [], B = 0; B < y.length; B++) {
            var Z = y[B];
            if (
              (Z instanceof Element && U(Z) && A.push(Z),
              Z instanceof DocumentFragment)
            )
              for (Z = Z.firstChild; Z; Z = Z.nextSibling) E.push(Z);
            else E.push(Z);
          }
          for (B = U(this), K.apply(this, y), y = 0; y < A.length; y++)
            q(f, A[y]);
          if (B)
            for (q(f, this), y = 0; y < E.length; y++)
              (A = E[y]), A instanceof Element && O(f, A);
        }),
      ne !== void 0 &&
        (v.remove = function () {
          var T = U(this);
          ne.call(this), T && q(f, this);
        });
  }
  function Cn(f) {
    function g(y, E) {
      Object.defineProperty(y, "innerHTML", {
        enumerable: E.enumerable,
        configurable: !0,
        get: E.get,
        set: function (A) {
          var B = this,
            Z = void 0;
          if (
            (U(this) &&
              ((Z = []),
              ot(f, this, function (jr) {
                jr !== B && Z.push(jr);
              })),
            E.set.call(this, A),
            Z)
          )
            for (var De = 0; De < Z.length; De++) {
              var Ke = Z[De];
              Ke.__CE_state === 1 && f.disconnectedCallback(Ke);
            }
          return this.ownerDocument.__CE_registry ? oe(f, this) : x(f, this), A;
        },
      });
    }
    function v(y, E) {
      y.insertAdjacentElement = function (A, B) {
        var Z = U(B);
        return (A = E.call(this, A, B)), Z && q(f, B), U(A) && O(f, B), A;
      };
    }
    function T(y, E) {
      function A(B, Z) {
        for (var De = []; B !== Z; B = B.nextSibling) De.push(B);
        for (Z = 0; Z < De.length; Z++) oe(f, De[Z]);
      }
      y.insertAdjacentHTML = function (B, Z) {
        if (((B = B.toLowerCase()), B === "beforebegin")) {
          var De = this.previousSibling;
          E.call(this, B, Z), A(De || this.parentNode.firstChild, this);
        } else if (B === "afterbegin")
          (De = this.firstChild), E.call(this, B, Z), A(this.firstChild, De);
        else if (B === "beforeend")
          (De = this.lastChild),
            E.call(this, B, Z),
            A(De || this.firstChild, null);
        else if (B === "afterend")
          (De = this.nextSibling), E.call(this, B, Z), A(this.nextSibling, De);
        else
          throw new SyntaxError(
            "The value provided (" +
              String(B) +
              ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'."
          );
      };
    }
    h &&
      (Element.prototype.attachShadow = function (y) {
        if (((y = h.call(this, y)), f.j && !y.__CE_patched)) {
          y.__CE_patched = !0;
          for (var E = 0; E < f.m.length; E++) f.m[E](y);
        }
        return (this.__CE_shadowRoot = y);
      }),
      D && D.get
        ? g(Element.prototype, D)
        : Ie && Ie.get
        ? g(HTMLElement.prototype, Ie)
        : k(f, function (y) {
            g(y, {
              enumerable: !0,
              configurable: !0,
              get: function () {
                return a.call(this, !0).innerHTML;
              },
              set: function (E) {
                var A = this.localName === "template",
                  B = A ? this.content : this,
                  Z = t.call(document, this.namespaceURI, this.localName);
                for (Z.innerHTML = E; 0 < B.childNodes.length; )
                  u.call(B, B.childNodes[0]);
                for (E = A ? Z.content : Z; 0 < E.childNodes.length; )
                  c.call(B, E.childNodes[0]);
              },
            });
          }),
      (Element.prototype.setAttribute = function (y, E) {
        if (this.__CE_state !== 1) return M.call(this, y, E);
        var A = w.call(this, y);
        M.call(this, y, E),
          (E = w.call(this, y)),
          f.attributeChangedCallback(this, y, A, E, null);
      }),
      (Element.prototype.setAttributeNS = function (y, E, A) {
        if (this.__CE_state !== 1) return F.call(this, y, E, A);
        var B = C.call(this, y, E);
        F.call(this, y, E, A),
          (A = C.call(this, y, E)),
          f.attributeChangedCallback(this, E, B, A, y);
      }),
      (Element.prototype.removeAttribute = function (y) {
        if (this.__CE_state !== 1) return P.call(this, y);
        var E = w.call(this, y);
        P.call(this, y),
          E !== null && f.attributeChangedCallback(this, y, E, null, null);
      }),
      S &&
        (Element.prototype.toggleAttribute = function (y, E) {
          if (this.__CE_state !== 1) return S.call(this, y, E);
          var A = w.call(this, y),
            B = A !== null;
          return (
            (E = S.call(this, y, E)),
            B !== E &&
              f.attributeChangedCallback(this, y, A, E ? "" : null, null),
            E
          );
        }),
      (Element.prototype.removeAttributeNS = function (y, E) {
        if (this.__CE_state !== 1) return V.call(this, y, E);
        var A = C.call(this, y, E);
        V.call(this, y, E);
        var B = C.call(this, y, E);
        A !== B && f.attributeChangedCallback(this, E, A, B, y);
      }),
      se ? v(HTMLElement.prototype, se) : H && v(Element.prototype, H),
      $ ? T(HTMLElement.prototype, $) : ee && T(Element.prototype, ee),
      Mi(f, Element.prototype, { prepend: j, append: de }),
      nr(f);
  }
  var Yo = {};
  function Lr(f) {
    function g() {
      var v = this.constructor,
        T = document.__CE_registry.C.get(v);
      if (!T)
        throw Error(
          "Failed to construct a custom element: The constructor was not registered with `customElements`."
        );
      var y = T.constructionStack;
      if (y.length === 0)
        return (
          (y = e.call(document, T.localName)),
          Object.setPrototypeOf(y, v.prototype),
          (y.__CE_state = 1),
          (y.__CE_definition = T),
          b(f, y),
          y
        );
      var E = y.length - 1,
        A = y[E];
      if (A === Yo)
        throw Error(
          "Failed to construct '" +
            T.localName +
            "': This element was already constructed."
        );
      return (y[E] = Yo), Object.setPrototypeOf(A, v.prototype), b(f, A), A;
    }
    (g.prototype = Ye.prototype),
      Object.defineProperty(HTMLElement.prototype, "constructor", {
        writable: !0,
        configurable: !0,
        enumerable: !1,
        value: g,
      }),
      (window.HTMLElement = g);
  }
  function ha(f) {
    function g(v, T) {
      Object.defineProperty(v, "textContent", {
        enumerable: T.enumerable,
        configurable: !0,
        get: T.get,
        set: function (y) {
          if (this.nodeType === Node.TEXT_NODE) T.set.call(this, y);
          else {
            var E = void 0;
            if (this.firstChild) {
              var A = this.childNodes,
                B = A.length;
              if (0 < B && U(this)) {
                E = Array(B);
                for (var Z = 0; Z < B; Z++) E[Z] = A[Z];
              }
            }
            if ((T.set.call(this, y), E))
              for (y = 0; y < E.length; y++) q(f, E[y]);
          }
        },
      });
    }
    (Node.prototype.insertBefore = function (v, T) {
      if (v instanceof DocumentFragment) {
        var y = Re(v);
        if (((v = l.call(this, v, T)), U(this)))
          for (T = 0; T < y.length; T++) O(f, y[T]);
        return v;
      }
      return (
        (y = v instanceof Element && U(v)),
        (T = l.call(this, v, T)),
        y && q(f, v),
        U(this) && O(f, v),
        T
      );
    }),
      (Node.prototype.appendChild = function (v) {
        if (v instanceof DocumentFragment) {
          var T = Re(v);
          if (((v = c.call(this, v)), U(this)))
            for (var y = 0; y < T.length; y++) O(f, T[y]);
          return v;
        }
        return (
          (T = v instanceof Element && U(v)),
          (y = c.call(this, v)),
          T && q(f, v),
          U(this) && O(f, v),
          y
        );
      }),
      (Node.prototype.cloneNode = function (v) {
        return (
          (v = a.call(this, !!v)),
          this.ownerDocument.__CE_registry ? oe(f, v) : x(f, v),
          v
        );
      }),
      (Node.prototype.removeChild = function (v) {
        var T = v instanceof Element && U(v),
          y = u.call(this, v);
        return T && q(f, v), y;
      }),
      (Node.prototype.replaceChild = function (v, T) {
        if (v instanceof DocumentFragment) {
          var y = Re(v);
          if (((v = d.call(this, v, T)), U(this)))
            for (q(f, T), T = 0; T < y.length; T++) O(f, y[T]);
          return v;
        }
        y = v instanceof Element && U(v);
        var E = d.call(this, v, T),
          A = U(this);
        return A && q(f, T), y && q(f, v), A && O(f, v), E;
      }),
      p && p.get
        ? g(Node.prototype, p)
        : Dt(f, function (v) {
            g(v, {
              enumerable: !0,
              configurable: !0,
              get: function () {
                for (var T = [], y = this.firstChild; y; y = y.nextSibling)
                  y.nodeType !== Node.COMMENT_NODE && T.push(y.textContent);
                return T.join("");
              },
              set: function (T) {
                for (; this.firstChild; ) u.call(this, this.firstChild);
                T != null &&
                  T !== "" &&
                  c.call(this, document.createTextNode(T));
              },
            });
          });
  }
  var Yt = window.customElements;
  function Si() {
    var f = new et();
    Lr(f),
      Ii(f),
      Mi(f, DocumentFragment.prototype, { prepend: o, append: s }),
      ha(f),
      Cn(f),
      (window.CustomElementRegistry = Me),
      (f = new Me(f)),
      (document.__CE_registry = f),
      Object.defineProperty(window, "customElements", {
        configurable: !0,
        enumerable: !0,
        value: f,
      });
  }
  (Yt &&
    !Yt.forcePolyfill &&
    typeof Yt.define == "function" &&
    typeof Yt.get == "function") ||
    Si(),
    (window.__CE_installPolyfill = Si);
}).call(self);
Cy()
  .bootstrapModule(au, { ngZoneEventCoalescing: !0 })
  .catch((e) => console.error(e));
