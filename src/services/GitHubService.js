const GitHubService = {
  async retrieveUser(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw "User not found";
    }

    return response.json();
  }
};

export default GitHubService;
