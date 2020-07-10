const moneyName = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  ONE_HUNDRED: 100
};

const findInCashRegister = (change, cid) => {
  for (let index = cid.length - 1; index >= 0; index--) {
    const [name, inCash] = cid[index];

    if (change >= moneyName[name] && change <= inCash) {
      return { index: index, decrease: moneyName[name] };
    }
  }

  return false;
};

const registerOut = (cid, changeRegister) => {
  let change = [];
  let status = "CLOSED";

  for (let index = 0; index < cid.length; index++) {
    if (cid[index][1] === 0) {
      change.push(cid[index]);
    } else if (changeRegister[index][1] > 0) {
      change.push(changeRegister[index]);
    }
  }

  return { status, change };
};

const checkCashRegister = (price, cash, cid) => {
  let change = cash - price;
  let registerFound = findInCashRegister(change, cid);
  let changeRegister = [
    ["PENNY", 0],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ];

  while (registerFound) {
    change -= registerFound.decrease;

    cid[registerFound.index][1] -= registerFound.decrease;
    changeRegister[registerFound.index][1] += registerFound.decrease;

    registerFound = findInCashRegister(change, cid);
  }

  return registerOut(cid, changeRegister);
};

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ])
);