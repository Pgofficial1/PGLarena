const LEAGUE_TITLES = {
  "PG PRO LEAGUE": "AJart Pro League",
  "PG CHAMPIONSHIP LEAGUE": "AJart Championship",
  "PG UPCOMINGS LEAGUE": "AJart Upcomings League"
};

fetch("https://raw.githubusercontent.com/Pgofficial1/PGLarena/main/fixtures.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("fixtures-container");
    if (!container) return;

    for (const league of Object.keys(LEAGUE_TITLES)) {
      const section = document.createElement("div");
      section.className = "league-section";

      const title = document.createElement("div");
      title.className = "title";
      title.textContent = LEAGUE_TITLES[league];
      section.appendChild(title);

      const matches = data[league] || [];

      if (matches.length === 0) {
        const noData = document.createElement("p");
        noData.textContent = "No matches available.";
        section.appendChild(noData);
      } else {
        matches.sort((a, b) => new Date(b.date) - new Date(a.date));
        for (const match of matches) {
          const box = document.createElement("div");
          box.className = "match-box";

          const matchDate = document.createElement("div");
          matchDate.className = "match-date";
          matchDate.textContent = formatDate(match.date);

          const score = document.createElement("div");
          score.className = "match-score";
          score.textContent = match.played ? `${match.home_goals} - ${match.away_goals}` : "Coming Soon";

          const desc = document.createElement("div");
          desc.className = "match-desc";
          desc.textContent = `${match.home} vs ${match.away}`;

          box.appendChild(matchDate);
          box.appendChild(score);
          box.appendChild(desc);
          section.appendChild(box);
        }
      }

      container.appendChild(section);
    }
  })
  .catch(err => {
    console.error("Failed to load fixtures:", err);
  });

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString(undefined, options);
  }
