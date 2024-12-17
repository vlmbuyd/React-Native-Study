import {ForwardedRef} from 'react';

function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  // node : 연결하려는 실제 DOM 요소 또는 React 컴포넌트를 받아서 각 ref에 전달
  // 여기서 node는 TextInput
  return (node: T) => {
    refs.forEach(ref => {
      // 함수로 전달된 ref에 node 전달하여 호출
      if (typeof ref === 'function') ref(node);
      // 객체형 ref.current에 node 할당
      // node에 ref를 연결해주는 느낌인 듯
      else if (ref) ref.current = node;
    });
  };
}

export {mergeRefs};
