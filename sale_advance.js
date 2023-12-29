const products = [
    {
      id: 1,
      name: "オリジナルブレンド200g",
      price: 500,
    },{
      id: 2,
      name: "オリジナルブレンド500g",
      price: 900,
    },{
      id: 3,
      name: "スペシャルブレンド200g",
      price: 700,
    },{
      id: 4,
      name: "オリジナルブレンド200g",
      price: 1200,
    }
  ]
  const priceElement = document.getElementById("product");
  const numberElement = document.getElementById("number");
  let purchases = [];
  
  function add() {
    const targetId  = parseInt(priceElement.value);
    const product = products.find(item => item.id == targetId);
    const number = numberElement.value;

    let purchase = {
      product: product,
      number: parseInt(number),
    };

    const newPurchase = purchases.findIndex((item) => item.product.id === purchase.product.id)
    if(purchases.length < 1 || newPurchase === -1) {
      purchases.push(purchase)
    } else {
      purchases[newPurchase].number += purchase.number
    }

    window.alert(`${display()}\n小計${subtotal()}円`);
    priceElement.value = "";
    numberElement.value = "";
  }

  function subtotal() {
    return purchases.reduce((prev, purchase) => {
      return prev + purchase.product.price * purchase.number;
    }, 0)
  }

  function display() {
    return purchases.map(purchase => {
      return `${purchase.product.name} ${purchase.product.price}円:${purchase.number}点\n`;
    }).join("")
  };

  function calcPostageFromPurchase(sum) {
    if (sum == 0 || sum >= 3000) {
      return 0
    } else if (sum < 1000){
      return 500
    } else {
      return 250
    }
  }

  function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);
    window.alert(`${display()}\n小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
    purchases = [];
    priceElement.value= "";
    numberElement.value = "";
  }