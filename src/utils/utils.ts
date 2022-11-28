import { CSSProperties } from 'react';

// 计算一段text加上text相关样式之后的宽度
export function measureTextWidth(
  text: string,
  style?: CSSProperties | CSSStyleDeclaration
) {
  if (typeof window !== 'undefined') {
    const span = document.createElement('span');
    span.style.cssText =
      'position: absolute;top: -9999px;display: inline-block';
    span.innerHTML = text.replace(/\s/g, '&nbsp;');
    if (style) {
      ['font', 'letterSpacing', 'wordSpacing'].forEach(property => {
        if (property in style) {
          span.style[property] = style[property];
        }
      });
    }
    document.body.appendChild(span);
    const { width } = getComputedStyle(span);
    const contentWidth =
      width && width !== 'auto' ? parseFloat(width) : span.offsetWidth;
    document.body.removeChild(span);
    return contentWidth;
  }
  return 0;
}

// 获取一个element的内容宽度
export function getContentWidth(
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration
): number {
  const { width, boxSizing } = computedStyle;
  if (boxSizing === 'content-box' && width && width !== 'auto') {
    return parseFloat(width);
  }
  const contentWidth =
    width && width !== 'auto' ? parseFloat(width) : element.offsetWidth;
  const {
    paddingLeft,
    paddingRight,
    borderLeftWidth,
    borderRightWidth,
  } = computedStyle;
  const pl = paddingLeft ? parseFloat(paddingLeft) : 0;
  const pr = paddingRight ? parseFloat(paddingRight) : 0;
  const bl = borderLeftWidth ? parseFloat(borderLeftWidth) : 0;
  const br = borderRightWidth ? parseFloat(borderRightWidth) : 0;
  return contentWidth - pl - pr - bl - br;
}

// 判断当前element内容是否溢出
export function isOverflow(element: HTMLElement | HTMLInputElement) {
  const { textContent, ownerDocument } = element;
  const { value } = element as HTMLInputElement;
  if ((value || textContent) && ownerDocument) {
    const { clientWidth, scrollWidth } = element;
    if (scrollWidth > clientWidth) {
      return true;
    }
    const { defaultView } = ownerDocument;
    if (defaultView) {
      const computedStyle = defaultView.getComputedStyle(element);
      const contentWidth = getContentWidth(element, computedStyle);
      const textWidth = measureTextWidth(textContent || value, computedStyle);
      return textWidth > contentWidth;
    }
  }
  return false;
}
