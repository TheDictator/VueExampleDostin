# Craft Fresh Installation

Current Version `2.6.2780`

## Introduction

A Fresh Craft installation with everything setup.

## Installation

Copy and Paste files & import the database in `storage/bare-{timesteamp}`

## Compiling Troubleshooting

run `sudo npm install --unsafe-perm` if having troubles running `npm install`

To get Laravel Valet local working add `$_SERVER['PHP_SELF'] = 'mhlawyers.test';
                                        $_SERVER['SCRIPT_NAME'] = 'mhlawyers.test';` to the index.php file

MYSQL Import Query: `mysql -u root -p mhlawyers < mhlawyers.sql`
