import "./Loading.css";
export class Loading {
  constructor() {
    this.node = document.getElementById("loading");
    this.stickList = [];
    this.wrap = this.bar();
    this.off();
  }
  create() {
    const node = document.createElement("div");

    node.id = "loading_cc";

    node.appendChild(this.wrap);
    this.node = node;
    document.body.appendChild(node);
  }

  on() {
    this.off();
    this.bodyAttrs = document.body.getAttributeNames().reduce((o, k) => {
      o[k] = document.body.getAttribute(k);
      return o;
    }, {});
    document.body.classList.add("loading_overflow_cc");
    console.log(window.location.pathname);
    this.create();
  }

  off() {
    document.body.classList.remove("loading_overflow_cc");
    if (this.node) {
      this.node.remove();
    }
  }

  bar() {
    const wrap = document.createElement("div");
    wrap.className = "loading_wrap_cc";
    const c = 6;
    for (var i = 0; i < c; i++) {
      const stick = document.createElement("div");
      stick.className = "loading_bar_cc";
      stick.animate([{ height: `50%` }, { height: "100%" }, { height: "0%" }, { height: `50%` }], {
        duration: 1000,
        delay: (1000 / c) * i,
        iterations: "Infinity",
      });
      this.stickList = [...this.stickList, stick];
      wrap.appendChild(stick);
    }

    return wrap;
  }
}
export const loading = new Loading();
