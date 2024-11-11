`async`는 **JavaScript**에서 비동기 코드를 더 간편하고 읽기 쉽게 작성할 수 있도록 해주는 키워드입니다. `async` 키워드는 함수 앞에 붙여서 해당 함수를 **비동기 함수**로 만들며, 자동으로 `Promise`를 반환합니다.

### 기본 개념
- `async` 함수는 항상 `Promise` 객체를 반환합니다.
- 함수 내에서 `await` 키워드를 사용하여 `Promise`의 결과를 기다릴 수 있습니다.
- `await`는 `async` 함수 내에서만 사용할 수 있습니다.

### 예시
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
```

### 설명
1. `async` 키워드가 붙은 함수는 항상 `Promise`를 반환합니다. 함수 내에서 `return`한 값은 자동으로 `Promise.resolve()`로 감싸집니다.
2. `await` 키워드는 `Promise`가 완료될 때까지 함수의 실행을 일시 정지하고, `Promise`가 완료되면 그 결과를 반환합니다.
3. `try...catch` 블록을 사용하여 `async` 함수 내의 비동기 작업에서 발생할 수 있는 오류를 처리할 수 있습니다.

### 장점
- **가독성**: `async/await`를 사용하면 `then()` 체인을 사용하는 것보다 코드가 더 직관적이고 읽기 쉬워집니다.
- **에러 핸들링**: `try...catch` 구문을 통해 비동기 코드의 에러를 동기 코드처럼 처리할 수 있습니다.

### 동작 예시
```javascript
async function example() {
  return 'Hello, World!';
}

example().then(result => console.log(result)); // "Hello, World!"
```

위 코드에서 `example` 함수는 `async`로 선언되어 `Promise`를 반환합니다. `return 'Hello, World!'`는 자동으로 `Promise.resolve('Hello, World!')`가 됩니다.