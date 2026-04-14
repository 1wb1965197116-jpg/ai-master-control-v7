async function runCompany() {
  const res = await fetch("/run");
  const data = await res.json();

  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}

async function deployHelper() {
  const res = await fetch("/deploy-helper", { method: "POST" });
  const data = await res.json();

  alert("🚀 Deploy started: " + JSON.stringify(data));
}

async function buildSaaS() {
  const res = await fetch("/build?goal=saas dashboard");
  const data = await res.json();

  document.getElementById("output").innerText =
    JSON.stringify(data, null, 2);
}

async function selfHeal() {
  const res = await fetch("/self-heal", { method: "POST" });
  const data = await res.json();

  alert("🛠 Self-heal triggered: " + JSON.stringify(data));
}
