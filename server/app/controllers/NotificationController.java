package controllers;

import io.ebean.PagedList;
import library.Notification;
import models.Book;
import play.data.FormFactory;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import repository.BookRepository;
import util.Constant;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

public class NotificationController extends Controller {
    private final BookRepository bookRepository;
    private final HttpExecutionContext httpExecutionContext;

    @Inject
    public NotificationController(BookRepository bookRepository,
                          HttpExecutionContext httpExecutionContext) {
        this.bookRepository = bookRepository;
        this.httpExecutionContext = httpExecutionContext;
    }


    public CompletionStage<Result> getNotifications() {
        List<Notification> notifications = new ArrayList<>();
        return this.bookRepository.page(1, 1000, "category", "asc", "").thenApplyAsync(list -> {
            List<Book> bookList = list.getList().stream().filter(el -> el.category == "book").collect(Collectors.toList());
            List<Book> dvdList = list.getList().stream().filter(el -> el.category == "dvd").collect(Collectors.toList());

            if(bookList.size() > Constant.TOTAL_BOOKS) {
                Notification notification = new Notification();
                notification.setTitle("Book Storage");
                notification.setBody("Your book storage is about to be full.");
                notification.setSeverity("danger");
                notification.setIcon("book");
                notifications.add(notification);
            } else if(bookList.size() < Constant.TOTAL_BOOKS_LOW) {
                Notification notification = new Notification();
                notification.setTitle("Book Storage");
                notification.setBody("The amount of books you have is significantly low. Please consider purchasing more.");
                notification.setSeverity("warning");
                notification.setIcon("book");
                notifications.add(notification);
            }


            if(dvdList.size() > Constant.TOTAL_DVDS) {
                Notification notification = new Notification();
                notification.setTitle("DVD Storage");
                notification.setBody("Your dvd storage is about to be full.");
                notification.setSeverity("danger");
                notification.setIcon("album");
                notifications.add(notification);
            } else if(dvdList.size() < Constant.TOTAL_DVDS_LOW) {
                Notification notification = new Notification();
                notification.setTitle("DVD Storage");
                notification.setBody("The amount of dvds you have is significantly low. Please consider purchasing more.");
                notification.setSeverity("warning");
                notification.setIcon("album");
                notifications.add(notification);
            }
            return ok(Json.toJson(notifications));
        });
    }
}
