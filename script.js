// Function to show and hide tooltips
function showTooltip(tooltipId) {
    let tooltip = document.getElementById(tooltipId);
    if (tooltip.classList.contains('show')) {
        tooltip.classList.remove('show');
    } else {
        tooltip.classList.add('show');
    }
}

// Function to generate the slug
function generateSlug() {
    let text = document.getElementById("inputText").value;
    let template = document.getElementById("template").value;
    let campaignName = document.getElementById("campaignName").value;
    let version = document.getElementById("version").value;
    let audience = document.getElementById("audience").value;
    let geo = document.getElementById("geo").value;

    // Create base slug
    let slug = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/-+/g, '-')           // Remove multiple hyphens
        .trim();

    // Get the current date
    let currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format

    // Get selected platforms
    let platforms = [];
    if (document.getElementById("facebook").checked) platforms.push("facebook");
    if (document.getElementById("instagram").checked) platforms.push("instagram");
    if (document.getElementById("twitter").checked) platforms.push("twitter");
    if (document.getElementById("tiktok").checked) platforms.push("tiktok");
    if (document.getElementById("spotify").checked) platforms.push("spotify");
    if (document.getElementById("website").checked) platforms.push("website");
    if (document.getElementById("mobileApp").checked) platforms.push("mobileApp");

    // Join selected platforms into one string
    let platformSlug = platforms.length ? platforms.join("_") : "all-platforms";

    // Apply template logic
    if (template === "campaign") {
        slug = `${campaignName}_${platformSlug}_${currentDate}_${slug}`;
    } else if (template === "ad") {
        slug = `${campaignName}_${platformSlug}_${slug}`;
    }

    // Append audience and geographic region
    slug += `_${audience}_${geo}`;

    // Append version
    slug += `_${version}`;

    // Output the generated slug
    document.getElementById("slugOutput").textContent = slug;
}

// Function to download slug data as a CSV file
function downloadCSV() {
    let slugData = document.getElementById("slugOutput").textContent;
    let csvContent = "data:text/csv;charset=utf-8," + slugData;
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "slugs.csv");
    document.body.appendChild(link);
    link.click();
}

// Function to generate hashtags based on input
function generateHashtags() {
    let topic = document.getElementById("hashtagInput").value.trim().toLowerCase();

    if (topic) {
        // Generate a simple list of hashtags related to the input topic
        let hashtags = [
            `#${topic}`,
            `#${topic}Life`,
            `#${topic}Goals`,
            `#${topic}Love`,
            `#${topic}Inspiration`,
            `#${topic}Daily`,
            `#${topic}Trends`,
        ];

        // Display the generated hashtags
        document.getElementById("generatedHashtags").textContent = `Generated Hashtags: ${hashtags.join(', ')}`;
    } else {
        document.getElementById("generatedHashtags").textContent = "Please enter a topic.";
    }
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trending Hashtags</title>
</head>
<body>
    <h1>Trending Hashtags</h1>
    <div id="hashtag-container">
        Loading trending hashtags...
    </div>

    <script>
        // Fetch unified trends from server
        fetch("/unified-trends")
          .then(response => response.json())
          .then(data => {
            console.log("Received data:", data); // Log data to check what's being fetched
            const container = document.getElementById('hashtag-container');
            container.innerHTML = "";  // Clear existing content

            // Check if data exists and render it
            if (data.twitter.length > 0) {
              data.twitter.forEach(hashtag => {
                const hashtagElement = document.createElement('p');
                hashtagElement.textContent = `Twitter: ${hashtag}`;
                container.appendChild(hashtagElement);
              });
            } else {
              const noTwitterElement = document.createElement('p');
              noTwitterElement.textContent = "No Twitter trends found.";
              container.appendChild(noTwitterElement);
            }

            if (data.tiktok.length > 0) {
              data.tiktok.forEach(hashtag => {
                const hashtagElement = document.createElement('p');
                hashtagElement.textContent = `TikTok: ${hashtag}`;
                container.appendChild(hashtagElement);
              });
            } else {
              const noTikTokElement = document.createElement('p');
              noTikTokElement.textContent = "No TikTok trends found.";
              container.appendChild(noTikTokElement);
            }

            if (data.facebook.length > 0) {
              data.facebook.forEach(hashtag => {
                const hashtagElement = document.createElement('p');
                hashtagElement.textContent = `Facebook: ${hashtag}`;
                container.appendChild(hashtagElement);
              });
            } else {
              const noFacebookElement = document.createElement('p');
              noFacebookElement.textContent = "No Facebook trends found.";
              container.appendChild(noFacebookElement);
            }

            if (data.google.length > 0) {
              data.google.forEach(hashtag => {
                const hashtagElement = document.createElement('p');
                hashtagElement.textContent = `Google: ${hashtag}`;
                container.appendChild(hashtagElement);
              });
            } else {
              const noGoogleElement = document.createElement('p');
              noGoogleElement.textContent = "No Google trends found.";
              container.appendChild(noGoogleElement);
            }
          })
          .catch(error => {
            console.error("Error fetching trending hashtags:", error);
          });
    </script>
</body>
</html>