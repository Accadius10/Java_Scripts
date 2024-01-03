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
];
const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const targetId = parseInt(priceElement.value);
  const product = products.find(item => item.id === targetId);
  const number = parseInt(numberElement.value);

  if (!product || number <= 0) {
    window.alert("Produit invalide ou quantité incorrecte.");
    return;
  }

  let purchaseIndex = purchases.findIndex(p => p.product.id === product.id);
  if (purchaseIndex === -1) {
    purchases.push({ product, number });
  } else {
    purchases[purchaseIndex].number += number;
  }

  const totalNumber = purchases.reduce((acc, p) => {
    if (p.product.id === product.id) {
      return acc + p.number;
    }
    return acc;
  }, 0);

  window.alert(`Produit ajouté: ${product.name} Prix: ${product.price}円 Quantité Totale: ${totalNumber}`);
  priceElement.value = "";
  numberElement.value = "";
}


function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.product.price * purchase.number;
  }, 0);
}

function display() {
  return purchases.map(purchase => {
    const productTotal = purchase.product.price * purchase.number;
    return `${purchase.product.name} Prix: ${purchase.product.price}円 Quantité: ${purchase.number} Sous-total: ${productTotal}円`;
  }).join("\n");
}

function calcPostageFromPurchase(sum) {
  if (sum >= 3000) {
    return 0;
  } else if (sum >= 2000) {
    return 250;
  } else {
    return 500;
  }
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  const total = sum + postage;
  window.alert(`${display()}\nSous-total: ${sum}円\nFrais d'expédition: ${postage}円\nTotal: ${total}円`);
  purchases = [];
}


