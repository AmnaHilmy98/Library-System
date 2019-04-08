package controllers;

import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

/**
 * Manage a database of computers
 */
public class HomeController extends Controller {

    @Inject
    public HomeController() {

    }

    /**
     * Handle default path requests, redirect to computers list
     */
    public Result index() {
        return ok("Library API");
    }

}
            
