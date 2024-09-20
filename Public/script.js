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

    let slug = text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/-+/g, '-')           // Remove multiple hyphens
        .trim();

    let currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    let platforms = [];
    if (document.getElementById("facebook").checked) platforms.push("facebook");
    if (document.getElementById("instagram").checked) platforms.push("instagram");
    if (document.getElementById("twitter").checked) platforms.push("twitter");
    if (document.getElementById("tiktok").checked) platforms.push("tiktok");
    if (document.getElementById("spotify").checked) platforms.push("spotify");
    if (document.getElementById("website").checked) platforms.push("website");
    if (document.getElementById("mobileApp").checked) platforms.push("mobileApp");

    let platformSlug = platforms.length ? platforms.join("_") : "all-platforms";

    if (template === "campaign") {
        slug = `${campaignName}_${platformSlug}_${currentDate}_${slug}`;
    } else if (template === "ad") {
        slug = `${campaignName}_${platformSlug}_${slug}`;
    }

    slug += `_${audience}_${geo}_${version}`;
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
        let hashtags = [
            `#${topic}`,
            `#${topic}Life`,
            `#${topic}Goals`,
            `#${topic}Love`,
            `#${topic}Inspiration`,
            `#${topic}Daily`,
            `#${topic}Trends`,
        ];

        const generatedHashtagsElement = document.getElementById("generatedHashtags");
        if (generatedHashtagsElement) {
            generatedHashtagsElement.textContent = `Generated Hashtags: ${hashtags.join(', ')}`;
        } else {
            console.error("Element with id 'generatedHashtags' not found.");
        }
    } else {
        document.getElementById("generatedHashtags").textContent = "Please enter a topic.";
    }
}

// Fetch and render trending hashtags
fetch("/api/unified-trends")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('hashtag-container');
    container.innerHTML = "";  // Clear existing content

    // Render Twitter trends
    if (data.twitter.length > 0) {
      data.twitter.forEach(row => {
        const rowElement = document.createElement('p');
        rowElement.textContent = `Twitter: ${row.join(' | ')}`;
        container.appendChild(rowElement);
      });
    } else {
      const noTwitterElement = document.createElement('p');
      noTwitterElement.textContent = "No Twitter trends found.";
      container.appendChild(noTwitterElement);
    }

    // Render TikTok trends
    if (data.tiktok.length > 0) {
      data.tiktok.forEach(row => {
        const rowElement = document.createElement('p');
        rowElement.textContent = `TikTok: ${row.join(' | ')}`;
        container.appendChild(rowElement);
      });
    } else {
      const noTikTokElement = document.createElement('p');
      noTikTokElement.textContent = "No TikTok trends found.";
      container.appendChild(noTikTokElement);
    }

    // Render Facebook trends
    if (data.facebook.length > 0) {
      data.facebook.forEach(row => {
        const rowElement = document.createElement('p');
        rowElement.textContent = `Facebook: ${row.join(' | ')}`;
        container.appendChild(rowElement);
      });
    } else {
      const noFacebookElement = document.createElement('p');
      noFacebookElement.textContent = "No Facebook trends found.";
      container.appendChild(noFacebookElement);
    }

    // Render Google trends
    if (data.google.length > 0) {
      data.google.forEach(row => {
        const rowElement = document.createElement('p');
        rowElement.textContent = `Google: ${row.join(' | ')}`;
        container.appendChild(rowElement);
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