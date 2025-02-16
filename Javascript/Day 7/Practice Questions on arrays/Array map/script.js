// Run analysis
const result = analysis(users);

// Display Active Users Count
document.getElementById("activeUsersCount").textContent =
  result.activeUsersCount;

// Display Average Likes Per Active User
document.getElementById("averageLikes").textContent =
  result.averageLikes.toFixed(2);

// Prepare Data for Chart
const labels = result.popularPostsPerActiveUser.map((user) => user.name);
const data = result.popularPostsPerActiveUser.map((user) =>
  user.posts.reduce((sum, post) => sum + post.likes, 0)
);

// Create Chart
const ctx = document.getElementById("popularPostsChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Total Likes on Popular Posts",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
