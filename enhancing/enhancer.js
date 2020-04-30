module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  item.enhancment != 20 ? item.enhancment += 1 : item.enhancment;
  return { ...item };
}

function fail(item) {
  if(item.enhancment >= 15){
    item.enhancment > 16 ? item.enhancment -= 1 : item.enhancment;
    item.durability -= 10;
  } else {
    item.durability -= 5;
  }

  item.durability < 0 ? item.durability = 0 : item.durability;

  return { ...item };
}

function repair(item) {
  item.durability = 100;
  return { ...item };
}

function get(item) {
  item.enhancment > 0 ? item.name = `[+${item.enhancment}] ${item.name}` : item.name
  return { ...item };
}
