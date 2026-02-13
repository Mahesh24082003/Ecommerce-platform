#!/bin/bash

                    echo "Total Number of Arguments: $#"

                    for arg in "$@"; do
                        echo "Executing SQL file: $arg"
                        mysql -u test < "$arg"
                    done
                    