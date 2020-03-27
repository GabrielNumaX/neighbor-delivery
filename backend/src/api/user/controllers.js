
async function fetchById(req, res) {
  const { UserStore } = req.container.cradle;
  const { id } = req.params;
  const user = await UserStore.fetchById(id);
  return user
    ? res.json(user)
    : res.status(404).send();
}

async function fetchMe(req, res) {
  const { user } = req.container.cradle;
  res.json(user);
}

module.exports = {
  fetchById,
  fetchMe,
};
