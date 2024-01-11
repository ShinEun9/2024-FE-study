import axios, { AxiosError, AxiosResponse } from "axios";
// 브라우저 ky, 노드는 got을 요즘 핫하긴하지만 axios가 가장 기본적임
// f12 눌러서 axios 타입분석 -> axios의 index.d.ts
// * 타입분석할때 제일 마지막에 export default가 있는지 확인(axios export default Axios), common js 모듈이면 import axios = require('axios') 이런식으로 import 해와야한다.
// 위에서부터 아래로 타입분석을 하는것이 아닌 아래에서부터 위로 타입분석을 한다.

// ! Axios = fetch + 여러기능 (XMLHttpRequest)
// * 다양한 방식으로 사용가능한 axios
// new axios(), axios(), axios.get('')
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Created {}
interface Data {
  title: string;
  body: string;
  userId: 1;
}

(async () => {
  try {
    // * get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    const response = await axios.get<Post>("https://jsonplaceholder.typicode.com/posts/1");
    console.log(response.data); // any이므로 axios.get<Data타입 정의>

    //* post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;

    // D = any -> 이부분은 실제로 쓰이는 곳은 하나도 없고 타입 검사용으로 쓰인다. 타입 검사용으로 쓰인다는게 무슨말이냐면 실제 인자에 userId: 1부분 없애면 에러난다. T는 AxiosResponse에서 제네릭으로 쓰이는데 D는 아무데서도 안쓰임.
    const response2 = await axios.post<Created, AxiosResponse<Created>, Data>("https://jsonplaceholder.typicode.com/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });

    const response3 = await axios({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
  } catch (error) {
    // error는 unkown이다. error는 AxiosError만 날거라고 착각한다. 문법에러가 있을 수도 있다. 어떤 에러가 날지 모른다.
    // response가 항상 있지 않을 수 있기 때문에 물음표 붙여줘야한다.
    const errorResponse = error as AxiosError;
    console.log(errorResponse.response?.data);

    // 하지만 위 방법은 좋은 방법이 아니다. 아까도 말했든 위 에러가 AxiosError가 아니면 에러가 나기 때문이다! unknown을 처리하는 좋은 코드 = 타입가드

    if (error instanceof AxiosError) {
      // AxiosError가 클래스이기 때문에 instanceof 를 쓸 수 있다. AxiosError가 인터페이스였으면 타입가드를 쓰지 못한다. 또한 자바스크립트에서도 계속 남아있기 때문에 인터페이스보다 클래스를 쓰는 경우가 있다.
      console.log(error.response?.data);
      // 커스텀 타입가드
    }
    if (axios.isAxiosError<{ message: string }>(error)) {
      // 이것도 위와같은 방법이다.
      // * export function isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;
      console.log(error.response?.data.message);
    }
  }
})();

/*
    export class Axios {
    constructor(config?: AxiosRequestConfig);
    defaults: AxiosDefaults;
    interceptors: {
        request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    postForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    putForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    patchForm<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    }
*/

/*
    * AxiosInstance는 함수이다? : 인터페이스도 무조건 객체가 아니라 이렇게 함수로 되어있으면 함수가 될 수 있음!
    * Axios Instance는 Axios를 상속받음. Axios는 class
    export interface AxiosInstance extends Axios {
    <T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
    <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;

    defaults: Omit<AxiosDefaults, "headers"> & {
        headers: HeadersDefaults & {
        [key: string]: AxiosHeaderValue;
        };
    };
    }
*/

/*
    * 함수를 객체가 상속받음 (line48에서 설명)
    export interface AxiosStatic extends AxiosInstance {
    create(config?: CreateAxiosDefaults): AxiosInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    Axios: typeof Axios;
    AxiosError: typeof AxiosError;
    HttpStatusCode: typeof HttpStatusCode;
    readonly VERSION: string;
    isCancel: typeof isCancel;
    all: typeof all;
    spread: typeof spread;
    isAxiosError: typeof isAxiosError;
    toFormData: typeof toFormData;
    formToJSON: typeof formToJSON;
    getAdapter: typeof getAdapter;
    CanceledError: typeof CanceledError;
    AxiosHeaders: typeof AxiosHeaders;
    }
*/

// 함수를 객체가 어떻게 상속받을 수 있나!
const a = () => {};
a.b = "c";
a.e = "f";
a.z = "123";

const axiosinstance = () => {};
axiosinstance.create = () => {};
axiosinstance.isAxiosError = () => {};

/* 
* AxiosError
export class AxiosError<T = unknown, D = any> extends Error {
    constructor(
        message?: string,
        code?: string,
        config?: InternalAxiosRequestConfig<D>,
        request?: any,
        response?: AxiosResponse<T, D>
    );
...
}

export interface AxiosResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: InternalAxiosRequestConfig<D>;
  request?: any;
}
*/
