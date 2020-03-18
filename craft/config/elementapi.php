<?php

namespace Craft;

function getPracticeAreaModel($id)
{
    return craft()->elements->getElementById($id);
}

function buildSearchQuery()
{
    $str = '';
    if (craft()->request->getParam('name')) {
        $str .= ' title:*' . craft()->request->getParam('name') . '*';
    }
    if (craft()->request->getParam('location')) {
        $str .= ' attorneyLocation:' . craft()->request->getParam('location');
    }
    if (craft()->request->getParam('letter')) {
        $str .= ' attorneyLastName:' . craft()->request->getParam('letter') . '*';
    }

    return trim($str);
}

return [
    'endpoints' => [
        'json/attorneys' => [
            'elementType' => 'Entry',
            'criteria' => [
                'section' => 'attorneys',
                'order' => 'title',
                'search' => buildSearchQuery(),
                'relatedTo' => craft()->request->getParam('practiceArea')
                            ? getPracticeAreaModel(craft()->request->getParam('practiceArea'))
                            : '',
            ],
            'elementsPerPage' => 12,
            'transformer' => function (EntryModel $entry) {
                return [
                    'name' => $entry->title,
                    'position' => $entry->attorneyPosition,
                    'headshot' => $entry->attorneyHeadshot->first()
                                ? $entry->attorneyHeadshot->first()->getUrl([
                                    'mode' => 'crop',
                                    'width' => 350,
                                    'height' => 450,
                                    'quality' => 100,
                                    'position' => 'center-center'
                                ])
                                : null,
                    'url' => $entry->url,
                ];
            },
        ],
    ]
];
