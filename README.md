vendingMachineEvents copy.mjs/style copy.css는 기존 ui
vendingMachineEvents.mjs/style.css는 변형 ui

[실행 URL](https://kimhayeon1.github.io/vending-machine-study/)
## 기능

### 1. 상품 생성

- 상품 데이터 파일 세팅
- 상품 요소 생성
- 품절 상품 표시

### 2. 장바구니

- 진열대 상품 클릭 시
  - **예외** 잔액 부족 시, 부족한 금액 안내창 (아직)
  - 장바구니에 있을 시, 수량 증가
  - 없을 시 요소 생성
  - 재고 변경
  - 재고 소진 시, 품절 표시
- 장바구니 상품 클릭 시
  - 1개 : 요소 삭제
  - 2개 이상 : 수량 감소
  - 재고 변경
  - 재고 소진 시, 품절 표시

### 3. 획득한 음료

- 획득 클릭 시

  - 획득한 음료에 있는 상품은 수량 증가
  - 없는 상품은 요소 생성

- 총금액 변경

### 4. 거스름돈 반환
- 반환 기능
  - 소지금 += 잔액
  - 잔액 = 0원

### 5. 입금
- 입금 기능
- 한글 예외처리

### 6. 숫자 형식
- replace로 ','과 '원' 제거 시, /[^\d]/g 사용. 외국은 숫자 형식이 다르기 때문(공백, 온점 등)
