module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  let enhancment;

  item.enhancment != 20 ? enhancment = item.enhancment + 1 : enhancment = item.enhancment;
  
  return { ...item, enhancment};
}

function fail(item) {
  let enhancment = item.enhancment
  let durability = item.durability
  if(item.enhancment >= 15){
    item.enhancment > 16 ? enhancment = item.enhancment - 1 : enhancment = item.enhancment;
    durability = item.durability - 10
  } else {
    durability = item.durability - 5;
  }

  item.durability <= 0 ? durability = 0 : durability = durability;

  return { ...item, durability, enhancment };
}

function repair(item) {
  let durability = 100;
  return { ...item, durability };
}

function get(item) {
  let name;
  item.enhancment > 0 ? name = `[+${item.enhancment}] ${item.name}` : name = item.name
  return { ...item, name };
}
