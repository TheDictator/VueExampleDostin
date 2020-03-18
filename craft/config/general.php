<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return [
    '*' => [
        'omitScriptNameInUrls' => true,
        'siteUrl'              => ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'],
        'siteName'             => 'McNamee Hosea',
        'devMode'              => false,
        'environmentVariables' => [
            'baseUrl'  => ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'],
            'basePath' => $_SERVER['DOCUMENT_ROOT'],
            'imgPath'  => '/assets/imgs/',
            'filePath' => '/assets/files/'
        ],
        'errorTemplatePrefix' => '_errors/'
    ],

    'dev' => [
        'devMode' => true
    ]
];
