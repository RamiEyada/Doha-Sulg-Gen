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

        document.getElementById("generatedHashtags").textContent = `Generated Hashtags: ${hashtags.join(', ')}`;
    } else {
        document.getElementById("generatedHashtags").textContent = "Please enter a topic.";
    }
}