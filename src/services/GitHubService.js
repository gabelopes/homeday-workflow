const GitHubService = {
  async retrieveUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      mode: "no-cors"
    });

    return response.json();
  }
};

export default GitHubService;
