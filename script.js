const repositoryList = document.querySelector('#repo-list');
const statusMessage = document.querySelector('.status');

const formatStars = (stars) => new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1
}).format(stars);

const formatDate = (date) => new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
}).format(new Date(`${date}T00:00:00`));

const renderRepositories = (repositories) => {
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repo">
      <div>
        <h2 class="repo-name">
          <a href="https://github.com/${repository.repo}" target="_blank" rel="noreferrer">
            ${repository.repo}
          </a>
        </h2>
        <p class="repo-description">${repository.description}</p>
        <div class="repo-meta">
          <span class="repo-language">${repository.language}</span>
          <span class="repo-date">Starred ${formatDate(repository.starredAt)}</span>
        </div>
      </div>
      <span class="repo-stars" aria-label="${repository.stars} stars">&#9733; ${formatStars(repository.stars)}</span>
    </li>
  `).join('');
  statusMessage.textContent = `${repositories.length} repositories in your log`;
};

const loadRepositories = async () => {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    statusMessage.textContent = 'Could not load the repository log.';
    console.error(error);
  }
};

loadRepositories();
