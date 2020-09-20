export function copyStyles(sourceDoc: any, targetDoc: any) {
  Array.from(sourceDoc.styleSheets).forEach((styleSheet: any) => {
    if (styleSheet.cssRules) {
      // true for inline styles
      const newStyleEl = targetDoc.createElement("style");

      Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
        newStyleEl.appendChild(targetDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) {
      // true for stylesheets loaded from a URL
      const newLinkEl = targetDoc.createElement("link");

      newLinkEl.rel = "stylesheet";
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}
