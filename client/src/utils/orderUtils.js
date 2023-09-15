export const calculatePaychecks = (itemState, candidateIds) => {
  const methodMeta = itemState.methodMeta;
  const paychecks = [];
  const total = Number.parseFloat(itemState.price * itemState.quantity * (itemState.taxed ? 1 + import.meta.env.TAX_RATE : 1));
  if (itemState.method === 'EQUAL') {
    candidateIds.forEach(id => {
      paychecks.push({
        candidate: id,
        shouldPay: total / candidateIds.length,
      });
    });
  }
  else if (itemState.method === 'RATIO') {
    let totalRatio = 0;
    candidateIds.forEach(id => {
      totalRatio += Number.parseFloat(methodMeta.ratio[id]);
    });
    console.log(totalRatio);
    candidateIds.forEach(id => {
      paychecks.push({
        candidate: id,
        shouldPay: total * Number.parseFloat(methodMeta.ratio[id]) / totalRatio,
      });
    });
  }
  else if (itemState.method === 'MANUAL') {
    candidateIds.forEach(id => {
      paychecks.push({
        candidate: id,
        shouldPay: Number.parseFloat(methodMeta.manual[id]),
      });
    });
  }
  return paychecks;
}

export const formatOrderForUpload = (orderState) => {
  const order = {};
  // deal with metadata
  order.type = orderState.type;
  order.candidates = orderState.candidateIds;
  order.payer = orderState.payerId;
  // deal with items
  order.items = orderState.items.map(item => {
    const newItem = {};
    newItem.name = item.name;
    newItem.thumbnail = item.thumbnail;
    newItem.type = item.type;
    newItem.method = item.method;
    newItem.price = item.price;
    newItem.quantity = item.quantity;
    newItem.taxed = item.taxed;
    newItem.paychecks = calculatePaychecks(item, orderState.candidateIds);
    return newItem;
  });
  return order;
}