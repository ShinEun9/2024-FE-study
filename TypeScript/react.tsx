import React, { useState, useCallback, useRef, FC, ReactNode, useEffect } from "react";

interface P {
  name: string;
  title: string;
  children?: ReactNode;
}

const WordRelay: FC<P> = (props) => {
  const [word, setWord] = useState("제로초");
  // const [word, setWord] = useState(복잡한_함수());
  // const [word, setWord] = useState(()=> 복잡한_함수());
  /*
     * useState
      function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
      
      type Dispatch<A> = (value: A) => void;

      type SetStateAction<S> = S | ((prevState: S) => S);

      type Dispatch<A> = (value: S | ((prevState: S) => S)) => void;
  */

  useEffect(() => {
    setWord("제로초");
    setWord((prevState) => prevState + "2");
  });

  /*
  * useEffect
  useEffect(effect: React.EffectCallback, deps?: React.DependencyList | undefined): void
  type DependencyList = readonly unknown[];
  type EffectCallback = () => void | Destructor;

  * await setWord안되는 이유
  useEffect(async () => {
    setWord("제로초");
    await setWord((prevState) => prevState + "2");
  });

  위의 예제처럼 await setWord하는 사람이 종종있는데 setWord에 마우스 올렸을 때 (value: React.SetStateAction<string>) => Promise여야
  await을 붙일 수 있다.
  하지만 setWord에 마우스 올리면 (value: React.SetStateAction<string>) => void.
  항상 함수 return값 부분에 Promise가 있을때만 await을 붙이자!

  * 또한 useEffect에 콜백함수를 async 함수로 만드는 사람이 있는데 안된다. js에서는 문제가 없지만 ts에서는 문제가 된다.
  useEffect 타이핑이 고정되어 있다. 

  useEffect(effect: React.EffectCallback, deps?: React.DependencyList | undefined): void
  type EffectCallback = () => void | Destructor;

  async함수는 return값이 무조건 Promise인데, EffectCallback을 보면 return값이 void | Destructor인 함수만 가능하다.
  따라서 밑과 같이 써야한다.
  useEffect(() => {
    const func = async () => {};
    func();
  });

  * 또한 callback return 값이 Destructor도 가능하다. = clean up function, 만약에 clean up function에 return하면 에러난다. ()=>void여야 하니깐.
  type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
  declare const UNDEFINED_VOID_ONLY: unique symbol;
  // unique symbol은 Symbol()을 타이핑 하는 방법!

  useEffect(()=>{
    console.log('useEffect');
    return ()=>{
      console.log('useEffect cleanup');
    }
  })

 */

  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult("딩동댕");
        setWord(value);
        setValue("");
        if (input) {
          input.focus();
        }
      } else {
        setResult("땡");
        setValue("");
        if (input) {
          input.focus();
        }
      }
    },
    [word, value]
  );

  const onChange = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputEl} value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

const Parent = () => {
  return (
    <WordRelay name="구구콘" title="끝말잇기">
      <div></div>
    </WordRelay>
  );
};

export default WordRelay;

/*
    jsx는 TypeScript나 JavaScript에는 없는 React전용 문법
    따라서 TypeScript가 JSX 부분을 인식할 수 없다.
    ts-config.json에서 "jsx": "react" 로 해야 jsx부분이 인식된다.
 */

/*
    form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

    * DetailHTMLProps
    type DetailedHTMLProps<E extends HTMLAttributes<T>, T> = ClassAttributes<T> & E;

    interface ClassAttributes<T> extends Attributes {
      ref?: LegacyRef<T> | undefined;
    }

    interface Attributes {
      key?: Key | null | undefined;
    }

    * FormHTMLAttributes
    interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
        acceptCharset?: string | undefined;
        action?:
            | string
            | undefined
            | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS[
                keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS
            ];
        autoComplete?: string | undefined;
        encType?: string | undefined;
        method?: string | undefined;
        name?: string | undefined;
        noValidate?: boolean | undefined;
        target?: string | undefined;
    }

    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // React-specific Attributes
        defaultChecked?: boolean | undefined;
        defaultValue?: string | number | readonly string[] | undefined;
        suppressContentEditableWarning?: boolean | undefined;
        suppressHydrationWarning?: boolean | undefined;
        ...
    }
 */

/*
 * ReactNode
  interface FunctionComponent<P = {}> {
      (props: P, context?: any): ReactNode;
      propTypes?: WeakValidationMap<P> | undefined;
      contextTypes?: ValidationMap<any> | undefined;
      defaultProps?: Partial<P> | undefined;
      displayName?: string | undefined;
  }

  type ReactNode =
      | ReactElement
      | string
      | number
      | Iterable<ReactNode>
      | ReactPortal
      | boolean
      | null
      | undefined
      | DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES[
          keyof DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES]
      ;

  * JSX.Element
  namespace JSX {
        interface Element extends React.ReactElement<any, any> {}
        ...
  }

  interface ReactElement<
    P = any,
    T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>,
> {
    type: T;
    props: P;
    key: string | null;
}

type JSXElementConstructor<P> =
        | ((
            props: P,
            deprecatedLegacyContext?: any,
        ) => ReactNode)
        | (new(
            props: P,
            deprecatedLegacyContext?: any,
        ) => Component<any, any>);

*/

// 또한 React 관련 타입은 모두 React의 namespace에서 선언되었는데, JSX는 global namespace로 선언되어 있다. 따라서 React 내에서 JSX를 import하지 않아도 바로 사용이 가능하다.
