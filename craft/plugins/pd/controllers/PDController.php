<?php
/**
 * PD plugin for Craft CMS
 *
 * PD Controller
 *
 * --snip--
 * Generally speaking, controllers are the middlemen between the front end of the CP/website and your plugin’s
 * services. They contain action methods which handle individual tasks.
 *
 * A common pattern used throughout Craft involves a controller action gathering post data, saving it on a model,
 * passing the model off to a service, and then responding to the request appropriately depending on the service
 * method’s response.
 *
 * Action methods begin with the prefix “action”, followed by a description of what the method does (for example,
 * actionSaveIngredient()).
 *
 * https://craftcms.com/docs/plugins/controllers
 * --snip--
 *
 * @author    Piccirilli Dorsey
 * @copyright Copyright (c) 2016 Piccirilli Dorsey
 * @link      https://picdorsey.com
 * @package   PD
 * @since     1.0.0
 */

namespace Craft;

class PDController extends BaseController
{

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     * @access protected
     */
    protected $allowAnonymous = true;

    /**
     * Handle a request going to our plugin's index action URL, e.g.: actions/pD
     */
    public function actionAnujSud()
    {
        HeaderHelper::setHeader([
            'status' => 404
        ]);
        $this->renderTemplate('_pages/individual/anuj-sud-joins-the-firm-as-an-associate');
    }
}
