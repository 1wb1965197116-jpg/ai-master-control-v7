async function deploy(repo) {

  return {
    status: "deployed",
    url: `https://${repo.name}.app`
  };
}

module.exports = { deploy };
