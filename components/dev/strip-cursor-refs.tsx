const script = `(function () {
  var blocked = "data-cursor-ref";
  var proto = Element.prototype;
  var setAttribute = proto.setAttribute;
  var setAttributeNS = proto.setAttributeNS;
  proto.setAttribute = function (name, value) {
    if (name === blocked) return;
    return setAttribute.call(this, name, value);
  };
  proto.setAttributeNS = function (ns, name, value) {
    if (name === blocked) return;
    return setAttributeNS.call(this, ns, name, value);
  };
  var strip = function (node) {
    if (!node || node.nodeType !== 1 || !node.hasAttribute(blocked)) return;
    node.removeAttribute(blocked);
  };
  var stripTree = function (node) {
    strip(node);
    if (!node || !node.querySelectorAll) return;
    node.querySelectorAll("[" + blocked + "]").forEach(strip);
  };
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      if (mutation.type === "attributes") strip(mutation.target);
      var added = mutation.addedNodes;
      for (var j = 0; j < added.length; j++) stripTree(added[j]);
    }
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: [blocked],
  });
  addEventListener(
    "load",
    function () {
      observer.disconnect();
      proto.setAttribute = setAttribute;
      proto.setAttributeNS = setAttributeNS;
    },
    { once: true },
  );
})();`;

export function StripCursorRefs() {
  if (process.env.NODE_ENV !== "development") return null;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
