let items;
const cart = document.querySelector('.section1 .get-list');
const btnGetChange = document.querySelector('#btn-get-change');
const btnGet = document.querySelector('.btn-get');
const myMoney = document.querySelector('.section2 .bg-box strong');
const getList = document.querySelector('.section3 .get-list');
const totalPrice = document.querySelector('.total-price');

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
  li.innerHTML = `
              <img src="./img/${data.img}" alt="" />
              ${data.name}
              <strong
                >1<span class="a11y-hidden">개</span>
              </strong>
    `;
  cart.appendChild(li);

  li.addEventListener('click', (e) => handleCartItem(e));
};

const plusQuantity = (targetCartEl) => {
  const beforeQuantity =
    targetCartEl.querySelector('strong').firstChild.textContent;
  const quantity = parseInt(beforeQuantity) + 1;

  targetCartEl.querySelector('strong').firstChild.textContent = quantity;
};

const drawSoldOut = (target) => {
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

const handleCart = (e) => {
  const target = e.currentTarget;
  const data = target.dataset;
  const cartItems = cart.children;

  let targetCartEl;
  for (const item of cartItems) {
    if (item.dataset.name === data.name) {
      targetCartEl = item;
      break;
    }
  }

  // 장바구니에 있다면 수량 추가
  if (targetCartEl) {
    // 수량 변경
    plusQuantity(targetCartEl);
  } else {
    // 없다면 요소 생성
    cartItemGenerator(data);
  }

  // 재고 변경
  minusCount(e.currentTarget);
  // 품절 확인 후 표시
  drawSoldOut(e.currentTarget);
};

const initializeItems = () => {
  items = document.querySelectorAll('.cola-list button');
};

const handleBtnGet = () => {
  const cartItems = cart.children;
  [...cartItems].forEach((v) => {
    const getItemsName = [...getList.children].map((v) => v.dataset.name);
    // 획득한 음료에 같은 상품이 있다면
    if (getItemsName.includes(v.dataset.name)) {
      const target = getList.querySelector(`[
          data-name="${v.dataset.name}"] strong`);
      target.textContent =
        parseInt(v.querySelector('strong').textContent) +
        parseInt(target.textContent);
    } else {
      //획득한 음료에 같은 상품이 없다면
      const clone = v.cloneNode(true);
      getList.appendChild(clone);
    }
    cart.innerHTML = '';
  });

  // 총금액 변경
  const totalPriceVal = parseInt(totalPrice.textContent.replace(/[^\d]/g, ''));
  console.log(totalPrice.textContent.replace(/[^\d]/g, ''));
  totalPrice.textContent = `총금액 : 9,000 원`;
};

const handleBtnGetChange = (e) => {
  const el = e.currentTarget.previousElementSibling.lastElementChild;
  const balance = parseInt(el.textContent.replace(/[원,]/g, ''));
  console.log(myMoney);
  const myMoneyVal = parseInt(myMoney.textContent.replace(/[원,]/g, ''));
  el.textContent = '0원';
  myMoney.textContent = myMoneyVal + balance;
};

const bindEvent = () => {
  initializeItems();
  items.forEach((el) => {
    el.addEventListener('click', (e) => handleCart(e));
  });
  btnGet.addEventListener('click', handleBtnGet);
  btnGetChange.addEventListener('click', handleBtnGetChange);
};

export default bindEvent;
