import {ForwardedRef} from 'react';

function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  // ref={fn} 형태로 ref에 콜백이 들어가면 해당 요소의 인스턴스나 DOM 요소를 자동으로 전달함 : node
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        // 함수 ref일 경우, 직접 node를 전달
        ref(node);
      } else if (ref) {
        // 객체 ref일 경우, current 속성에 node를 할당
        ref.current = node;
      }
    });
  };
}

export {mergeRefs};
