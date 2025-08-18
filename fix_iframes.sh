#!/bin/bash

# Script to replace all remaining iframes with click-to-open placeholders

FILE="/Users/adityapandey/Downloads/website/a/projects/film-analytics-detail.html"

# Array of chart data: filename, chart-type, icon, description
declare -a charts=(
    "IMDB_top_10_genres_by_avg_rating_light.html|Bar Chart|fas fa-chart-bar|Top 10 genres by average rating"
    "IMDB_avg_rating_by_year_light.html|Line Chart|fas fa-chart-line|Average rating trends over years"
    "AMAZON_number_of_movies_released_per_year_light.html|Line Chart|fas fa-chart-line|Movie release trends by year"
    "AMAZON_top_10_directors_by_movie_count_light.html|Bar Chart|fas fa-chart-bar|Top directors by movie count"
    "AMAZON_top_10_countries_by_movie_count_light.html|Bar Chart|fas fa-chart-bar|Top countries by movie production"
    "AMAZON_movies_vs_tvshows_pie_light.html|Pie Chart|fas fa-chart-pie|Movies vs TV shows distribution"
    "AMAZON_countrywise_count_light.html|Geographic Chart|fas fa-globe|Country-wise content analysis"
    "AMAZON_top_15_release_years_light.html|Bar Chart|fas fa-chart-bar|Top release years analysis"
    "NETFLIX_top10_tvshow_genres_netflix_light.html|Bar Chart|fas fa-chart-bar|Top TV show genres on Netflix"
    "NETFLIX_top_10_actors_by_titles_light.html|Bar Chart|fas fa-chart-bar|Top actors by title count"
    "NETFLIX_topcountriesmapnetflix_light.html|Geographic Chart|fas fa-globe|Netflix content by country"
    "NETFLIX_top_10_countries by country Netflix bar_light.html|Bar Chart|fas fa-chart-bar|Top countries Netflix content"
    "NETFLIX_top_10_countries by country Netflix pie_light.html|Pie Chart|fas fa-chart-pie|Countries distribution pie chart"
)

echo "🔄 Replacing iframe elements with click-to-open placeholders..."

for chart_data in "${charts[@]}"; do
    IFS='|' read -r filename chart_type icon description <<< "$chart_data"
    
    echo "Processing: $filename"
    
    # Create the search pattern for the iframe
    search_pattern="<iframe src=\"\.\.\/images\/projects\/Film-analytics\/${filename}\?v=2025\"><\/iframe>"
    
    # Create the replacement HTML
    replacement="<div class=\"chart-preview\">
                    <div class=\"preview-placeholder\">
                        <i class=\"${icon}\" style=\"font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;\"></i>
                        <p><strong>${chart_type}</strong></p>
                        <p>${description}</p>
                        <p class=\"click-instruction\">🖱️ Click to open interactive chart</p>
                    </div>
                </div>"
    
    # Use sed to replace the iframe
    sed -i.bak "s|${search_pattern}|${replacement}|g" "$FILE"
done

echo "✅ All iframe replacements completed!"
echo "📁 Backup saved as: ${FILE}.bak"
