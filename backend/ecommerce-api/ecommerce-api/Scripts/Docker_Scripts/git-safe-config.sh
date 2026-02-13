#!/bin/bash

# Configure Git to trust all directories regardless of ownership
/usr/bin/git config --global --add safe.directory '*'

# Print confirmation message
echo "Git safe directory configured successfully"

# Exit with success code
exit 0
