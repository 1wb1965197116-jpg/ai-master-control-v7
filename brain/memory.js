const memory = [];

function store(event) {
  memory.push({
    event,
    time: Date.now()
  });
}

function getMemory() {
  return memory;
}

module.exports = { store, getMemory };
