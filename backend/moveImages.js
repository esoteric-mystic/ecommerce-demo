const fs = require('fs');
const path = require('path');

const sourceDir = 'c:\\Users\\PRATIK YADAV\\.gemini\\antigravity\\brain\\32dafd86-0149-4fa5-8191-3bc413b7954e';
const targetDir = 'c:\\Users\\PRATIK YADAV\\Downloads\\Shopping site\\Shopping site\\frontend\\public\\product-images\\';

const images = [
    'wallet', 'travel_tote', 'minimalist_watch', 'laptop_backpack', 'silk_scarf',
    'sunglasses', 'leather_belt', 'silk_tie', 'pearl_earrings', 'gold_necklace',
    'beaded_bracelet', 'phone_case', 'leather_keychain', 'headband_set', 'wool_beanie',
    'leather_gloves', 'umbrella', 'passport_holder', 'messenger_bag', 'crossbody_bag'
];

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Find files containing the name and move them
fs.readdir(sourceDir, (err, files) => {
    if (err) {
        console.error('Error reading source directory:', err);
        return;
    }

    images.forEach(imageName => {
        // Find the most recent file matching the base name
        const matchingFiles = files.filter(file => file.startsWith(imageName) && file.endsWith('.png'));

        if (matchingFiles.length > 0) {
            // Sort by creation time logic if needed, but here simple match is likely fine as names are unique enough with timestamps
            // We just take the last one as it's likely the most recent if multiple exist
            const fileToMove = matchingFiles[matchingFiles.length - 1];
            const sourcePath = path.join(sourceDir, fileToMove);
            const targetPath = path.join(targetDir, `${imageName}.png`);

            try {
                fs.copyFileSync(sourcePath, targetPath); // Copy instead of move to be safe with permissions
                console.log(`Moved ${fileToMove} to ${targetPath}`);
            } catch (copyErr) {
                console.error(`Error moving ${fileToMove}:`, copyErr);
            }
        } else {
            console.log(`No file found for ${imageName}`);
        }
    });
});
