#!/bin/bash

# Directory containing the JSON chunks (relative to this script's location)
chunks_dir="outputs/chunks"

# Define project root relative to script location (e.g. if script is in my_project/src/scripts, project_root is ../../)
# Assuming this script is in lia_hoss/src/LIA_FC_Sectorforth/
PROJECT_ROOT_REL_FROM_SCRIPT_DIR="../../"
PUBLIC_ASSET_DIR="${PROJECT_ROOT_REL_FROM_SCRIPT_DIR}public/LIA_FC_Sectorforth"

# Create the public asset directory if it doesn't exist
mkdir -p "$PUBLIC_ASSET_DIR"

# The HTML file to be created in the public asset directory
output_html="${PUBLIC_ASSET_DIR}/chunky.html"

# Start the HTML file with some basic structure
echo '<!DOCTYPE html>' > $output_html
echo '<html><head><title>Chunky</title></head><body>' >> $output_html
echo '<script>' >> $output_html
echo 'let data = "";' >> $output_html

# Sort files and concatenate their contents into the HTML file
for file in $(ls $chunks_dir | sort -V); do
    # Extract the base filename or file identifier
    file_identifier=$(echo $file | sed 's/_chunks_chunk[0-9]*\.json//')

    # Start JSON object
    echo "data += \`{\"file\": \"$file_identifier\", \"content\": " >> $output_html
    
    # Add actual JSON content
    cat "$chunks_dir/$file" >> $output_html

    # Close JSON object
    echo "}\`;" >> $output_html
done

# Close the script and HTML tags
echo '</script>' >> $output_html
echo '</body></html>' >> $output_html

echo "Chunky.html has been created with embedded JSON data."
