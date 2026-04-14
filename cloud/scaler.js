function scaleSystem(action) {

  if (action === "scale_up") {
    return { status: "Scaling Up Servers 🚀" };
  }

  if (action === "scale_down") {
    return { status: "Scaling Down Servers 📉" };
  }

  return { status: "Stable ⚖️" };
}

module.exports = { scaleSystem };
