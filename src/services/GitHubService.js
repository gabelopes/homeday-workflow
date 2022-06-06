const GitHubService = {
  async retrieveUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    return response.json();
  }
};

export default GitHubService;
