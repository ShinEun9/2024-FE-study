"use strict";
// const $ = "123"; // js에서 $를 변수명으로 쓸 수 있다. jQuery에서 $는 변수명. $를 들어가보자!
/*
  removeClass(
    className_function?:
    | JQuery.TypeOrArray<string>
    | ((this: TElement, index: number, className: string) => string),
  ): this;

  type TypeOrArray<T> = T | T[];

  * 내가 이해하기 쉽게 바꾸자
  removeClass(
    className_function?: string | string[] | ((this: TElement, index: number, className: string) => string),
  ): this;
*/
$("p").removeClass("myClass noClass").addClass("yourClass");
$("p").removeClass(["myClass", "noClass"]).addClass("yourClass");
// * 타입스크립트 함수에서 첫번째 매개변수가 this면 this가 실제 매개변수가 아니라 this를 타이핑한 것이기 때문에 this를 매개변수에 적지 않아도 된다 -> 특수한 상황
// * removeClass에 메소드체이닝이 가능한 이유는 removeClass return 값이 this이기 때문이다! this는 결국 $("p")
$("p")
    .removeClass((index, className) => {
    return "myClass";
})
    .addClass("yourClass");
/*
  <T extends JQuery.PlainObject>(object: T): JQuery<T>;
  
  * 아무거나 다 되는 객체 그래서 ["p", "t"] 되는것
  interface PlainObject<T = any> {
    [key: string]: T;
  }

    text(
      text_function: string | number | boolean
          | ((this: TElement, index: number, text: string) => string | number | boolean),
    ): this;
*/
$(["p", "t"]).text("hello");
const tag = $("ul li").addClass(function (index) {
    return "item-" + index;
});
/*
  html(
    htmlString_function:
        | JQuery.htmlString
        | JQuery.Node
        | ((this: TElement, index: number, oldhtml: JQuery.htmlString) => JQuery.htmlString | JQuery.Node),
  ): this;

   type Node = Element | Text | Comment | Document | DocumentFragment;
*/
$(tag).html(function (i) {
    console.log(this);
    return $(this).data("name") + "입니다";
});
//  HTMLDivElement < Element => 더 좁은 타입은 넓은 타입에 들어갈 수 있다.
const div = document.createElement("div");
div.innerHTML = "hello";
$(tag).html(div);
// DocumentFragment
const div2 = document.createDocumentFragment();
$(tag).html(div2);
// document
$(tag).html(document);
/////////////////////////////////////////////
// ! JQuery 타입 직접 만들어보기
{
    const $tag = $(["p", "t"]);
    $tag.text("123");
    $tag.text(123);
    $tag.text(function (index) {
        console.log(this, index);
        return true;
    });
    $tag.text().html(document);
    const tag = $("ul li")
        .addClass("hello")
        .addClass(function (index) {
        return "item-" + index;
    });
    // tag자체가 JQuery인데 그것을 다시 JQuery로 감쌈
    $(tag).html(document);
}
