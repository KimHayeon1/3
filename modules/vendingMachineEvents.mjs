let items;
const cart = document.querySelector('.section1 .get-list');
const btnGetChange = document.querySelector('#btn-get-change');
const btnGet = document.querySelector('.btn-get');
const myMoney = document.querySelector('.section2 .bg-box strong');
const getList = document.querySelector('.section3 .get-list');
const totalPrice = document.querySelector('.total-price');
const inpDeposit = document.querySelector('#input-money');
const btnDeposit = document.querySelector('#input-money + button');
const balance = document.querySelector('.section1 .bg-box p');

// 숫자 형식 변경
const formatNum = (num) => {
  return new Intl.NumberFormat().format(num);
};

const plusCount = (target) => {
  // 변경
  const count = target.dataset.count;
  target.dataset.count = parseInt(count) + 1;
};

const removeSoldOut = (target) => {
  if (target.disabled) {
    target.disabled = false;
    target.removeChild(target.lastElementChild);
  }
};

const handleCartItem = (e) => {
  const target = e.currentTarget;
  const beforeQuantity = target.querySelector('strong').firstChild.textContent;
  // 수량이 2이상이면, 수량 빼기
  if (beforeQuantity > 1) {
    const quantity = parseInt(beforeQuantity) - 1;
    target.querySelector('strong').firstChild.textContent = quantity;
    // 수량이 1이면, 요소 제거
  } else {
    cart.removeChild(target);
  }

  // 진열대에서 해당 상품 찾기
  let colaListItem;
  for (const item of items) {
    if (item.dataset.name === target.dataset.name) {
      colaListItem = item;
      break;
    }
  }

  // 재고 변경
  plusCount(colaListItem);
  // 품절 표시 제거
  removeSoldOut(colaListItem);
};

const cartItemGenerator = (data) => {
  const li = document.createElement('li');
  li.dataset.name = data.name;
  li.dataset.cost = data.cost;
  li.dataset.img = data.img;
  li.innerHTML = `
              <img src="./img/${data.img}" alt="${data.name}" />
    `;
  cart.appendChild(li);
};

const plusQuantity = (targetCartEl) => {
  const beforeQuantity =
    targetCartEl.querySelector('strong').firstChild.textContent;
  const quantity = parseInt(beforeQuantity) + 1;

  targetCartEl.querySelector('strong').firstChild.textContent = quantity;
};

const renderSoldOut = (target) => {
  const count = parseInt(target.dataset.count);
  if (!count) {
    target.disabled = true;
    target.innerHTML += `
        <strong class="soldout">
          <span>품절</span>
        </strong>
      `;
  }
};

const minusCount = (target) => {
  // 변경
  const count = target.dataset.count;
  target.dataset.count = parseInt(count) - 1;
};

const getCartTotal = () => {
  const cartItems = cart.children;
  let totalPrice = 0;
  [...cartItems].forEach((item) => {
    totalPrice += parseInt(item.dataset.cost);
  });
  return totalPrice;
};

const handleCart = (e) => {
  const target = e.currentTarget;
  const data = target.dataset;

  // 잔액/상품총액 비교
  const cartTotal = getCartTotal();
  const itemCost = parseInt(data.cost);
  console.log(cartTotal);
  const total = cartTotal + itemCost;
  const balanceVal = parseInt(balance.textContent.replace(/[^\d/]/g, ''));
  if (balanceVal < total) {
    alert(`잔액이 ${total - balanceVal}원 부족합니다`);
    return;
  }
  // 카트에 상품 생성
  cartItemGenerator(data);
  // 재고 변경
  minusCount(e.currentTarget);
  // 품절 확인 후 표시
  renderSoldOut(e.currentTarget);
};

const initializeItems = () => {
  items = document.querySelectorAll('.cola-list button');
};
const updateTotalPrice = (cartTotal) => {
  const totalPriceVal = parseInt(totalPrice.textContent.replace(/[^\d]/g, ''));
  const total = formatNum(totalPriceVal + cartTotal);
  totalPrice.textContent = `총금액 : ${total} 원`;
};

// 잔액 업데이트
const updateBalance = (balanceVal) => {
  balance.textContent = `${balanceVal}원`;
};

const renderGetItem = (data) => {
  const li = document.createElement('li');
  li.dataset.name = data.name;
  li.innerHTML = `
              <img src="./img/${data.img}" alt="" />
              ${data.name}
              <strong
                >1<span class="a11y-hidden">개</span>
              </strong>
    `;
  getList.appendChild(li);
};

const handleBtnGet = () => {
  const cartTotal = getCartTotal();
  // 총금액 업데이트
  updateTotalPrice(cartTotal);

  // 잔액 업데이트
  const currBalanceVal = parseInt(balance.textContent.replace(/[^\d/]/g, ''));
  const balanceVal = formatNum(currBalanceVal - cartTotal);
  updateBalance(balanceVal);

  // 획득한 음료 리스트 렌더링
  const cartItems = cart.children;
  [...cartItems].forEach((v) => {
    const data = v.dataset;
    const getItemsName = [...getList.children].map((v) => v.dataset.name);
    // 획득한 음료에 같은 상품이 있다면
    if (getItemsName.includes(data.name)) {
      const target = getList.querySelector(`[
          data-name="${data.name}"] strong`);
      target.textContent = parseInt(target.textContent) + 1;
    } else {
      //획득한 음료에 같은 상품이 없다면
      renderGetItem(data);
    }
  });

  // 장바구니 비우기
  cart.innerHTML = '';
};

// 소지금 업데이트
const updateMyMoney = (myMoneyVal) => {
  myMoney.textContent = `${myMoneyVal} 원`;
};

// 거스름돈 반환
const handleBtnGetChange = (e) => {
  const el = e.currentTarget.previousElementSibling.lastElementChild;
  const balance = parseInt(el.textContent.replace(/[^\d/]/g, ''));
  el.textContent = '0원';

  // 소지금 업데이트
  const currMyMoneyVal = parseInt(myMoney.textContent.replace(/[^\d/]/g, ''));
  const myMoneyVal = formatNum(balance + currMyMoneyVal);
  updateMyMoney(myMoneyVal);
};

const handleBtnDeposit = () => {
  const depositVal = parseInt(inpDeposit.value);

  // 잔액 업데이트
  const currBalanceVal = parseInt(balance.textContent.replace(/[^\d/]/g, ''));
  const balanceVal = formatNum(currBalanceVal + depositVal);
  updateBalance(balanceVal);

  // 입금액 reset
  inpDeposit.value = null;

  // 소지금 업데이트
  const currMyMoneyVal = parseInt(myMoney.textContent.replace(/[^\d/]/g, ''));
  const myMoneyVal = formatNum(currMyMoneyVal - depositVal);
  updateMyMoney(myMoneyVal);
};

const bindEvent = () => {
  initializeItems();
  items.forEach((el) => {
    el.addEventListener('click', (e) => handleCart(e));
  });
  btnGet.addEventListener('click', handleBtnGet);
  btnGetChange.addEventListener('click', handleBtnGetChange);
  btnDeposit.addEventListener('click', handleBtnDeposit);
};

export default bindEvent;
