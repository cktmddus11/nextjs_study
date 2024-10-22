# Next.js 를 소개합니다. 
## 어떤 기술일까?
- React.js 전용 웹 개발 Framework
- React.js 를 보다 더 강력하고 편하게 사용할 수 있는 기능들을 제공함.
    - 페이지 라우팅
    - 빌트인 최적화 기능
    - 다이나믹 HTML 스트리밍
=> React.js의 확장판
- Next.js는 Library가 아닌 Framework 이기 때문에

``` 
- 기능 구현의 주도권이 누구에게 있는가에 따라 Library, Framework 가 달라짐.

Framework(주도권이 개발자에게 없다) - Next.js, Remix
=> 자유도가 낮다. 
   프레임워크가 제공하는 기능을 이용하거나 허용하는 범위내에서만 
   추가 도구 사용 가능
Library(주도권이 개발자에게 있다) - React.js, JQuery
=> 자유도가 높다. 기본기능 외 제공 X
    기능 구현을 원하는 방향으로 진행한다. 
    쓰고싶은 도구, 쓰고싶은 기술을 쓴다.
```

## 특징?
- Next.js 는 Library가 아닌 Framework 입니다.


# 사전 렌더링 이해하기
## 사전 렌더링 
- 브라우저의 요청에 사전에 렌더링이 완료된 HTML 을 응답하는 렌더링 방식
- Client Side Rendering 의 단점을 효율적으로 해결하는 기술

[사전렌더링](사전렌더링.PNG)  

## Client Side Rendering(CSR)
- React.js 앱의 기본적인 렌더링 방식
- 클라이언트(브라우저)에서 직접 화면을 렌더링하는 방식