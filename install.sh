# Save the script as jumpdit.ts
# Make sure it is executable 
chmod +x jumpdit.ts

# Remove the existing jumpdit binary
rm -f jumpdit

# Run the build command

bun run build

# Move to ~/.local/bin (user-specific, no sudo needed)
# Replace the old one just in case
mv jumpdit ~/.local/bin/jumpdit
