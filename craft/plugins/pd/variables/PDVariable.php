<?php
/**
 * PD plugin for Craft CMS
 *
 * PD Variable
 *
 * --snip--
 * Craft allows plugins to provide their own template variables, accessible from the {{ craft }} global variable
 * (e.g. {{ craft.pluginName }}).
 *
 * https://craftcms.com/docs/plugins/variables
 * --snip--
 *
 * @author    Piccirilli Dorsey
 * @copyright Copyright (c) 2016 Piccirilli Dorsey
 * @link      https://picdorsey.com
 * @package   PD
 * @since     1.0.0
 */

namespace Craft;

class PDVariable
{

    /**
     * Passes in a phone number entered through the cms and returns
     * proper formatting.
     *
     * @param  string phoneNumber
     * @return array phoneNumber numbers & pretty
     */
    public function formatPhone($phone)
    {
        $numbers = preg_replace('/[^0-9]/', '', $phone);
        $pretty = '(' .substr($numbers, 0, 3) . ') ' . substr($numbers, 3, 3) . '-' . substr($numbers, 6);

        return [
            'numbers' => $numbers,
            'pretty' => $pretty
        ];
    }


    /**
     * Checks if a twig template exists
     */
    public function templateExists($template)
    {
        $basePath = craft()->config->get('environmentVariables')['basePath'];
        $templatePath = '/../craft/templates/';
        $fullPath = $basePath . $templatePath . $template . '.twig';

        return file_exists($fullPath);
    }

      /**
       * Returns list of states
       */
      public function getStates()
      {
            return [
                'AL' => 'Alabama',
                'AK' => 'Alaska',
                'AZ' => 'Arizona',
                'AR' => 'Arkansas',
                'CA' => 'California',
                'CO' => 'Colorado',
                'CT' => 'Connecticut',
                'DE' => 'Delaware',
                'DC' => 'District of Columbia',
                'FL' => 'Florida',
                'GA' => 'Georgia',
                'HI' => 'Hawaii',
                'ID' => 'Idaho',
                'IL' => 'Illinois',
                'IN' => 'Indiana',
                'IA' => 'Iowa',
                'KS' => 'Kansas',
                'KY' => 'Kentucky',
                'LA' => 'Louisiana',
                'ME' => 'Maine',
                'MD' => 'Maryland',
                'MA' => 'Massachusetts',
                'MI' => 'Michigan',
                'MN' => 'Minnesota',
                'MS' => 'Mississippi',
                'MO' => 'Missouri',
                'MT' => 'Montana',
                'NE' => 'Nebraska',
                'NV' => 'Nevada',
                'NH' => 'New Hampshire',
                'NJ' => 'New Jersey',
                'NM' => 'New Mexico',
                'NY' => 'New York',
                'NC' => 'North Carolina',
                'ND' => 'North Dakota',
                'OH' => 'Ohio',
                'OK' => 'Oklahoma',
                'OR' => 'Oregon',
                'PA' => 'Pennsylvania',
                'RI' => 'Rhode Island',
                'SC' => 'South Carolina',
                'SD' => 'South Dakota',
                'TN' => 'Tennessee',
                'TX' => 'Texas',
                'UT' => 'Utah',
                'VT' => 'Vermont',
                'VA' => 'Virginia',
                'WA' => 'Washington',
                'WV' => 'West Virginia',
                'WI' => 'Wisconsin',
                'WY' => 'Wyoming',
            ];
    }

    /**
    * Check if a substring exsits in a string (used for doante widget)
    */
    public function stringContains($haystack, $needle)
    {
        return strpos($haystack, $needle) !== false;
    }

}
