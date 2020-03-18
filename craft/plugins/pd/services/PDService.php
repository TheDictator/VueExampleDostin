<?php
/**
 * PD plugin for Craft CMS
 *
 * PD Service
 *
 * --snip--
 * All of your plugin’s business logic should go in services, including saving data, retrieving data, etc. They
 * provide APIs that your controllers, template variables, and other plugins can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 * --snip--
 *
 * @author    Piccirilli Dorsey
 * @copyright Copyright (c) 2016 Piccirilli Dorsey
 * @link      https://picdorsey.com
 * @package   PD
 * @since     1.0.0
 */

namespace Craft;

class PDService extends BaseApplicationComponent
{
    /**
     * This function can literally be anything you want, and you can have as many service functions as you want
     *
     * From any other plugin file, call it like this:
     *
     *     craft()->pD->exampleService()
     */
    public function exampleService()
    {
    }

}