package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.Book;
import models.Lending;
import play.data.Form;
import play.data.FormFactory;
import play.libs.Json;
import play.libs.concurrent.HttpExecutionContext;
import play.mvc.Controller;
import play.mvc.Result;
import repository.BookRepository;
import repository.LendingRepository;
import util.Constant;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletionStage;
import java.util.stream.Collectors;

public class BookController extends Controller {
    private final BookRepository bookRepository;
    private final LendingRepository lendingRepository;
    private final FormFactory formFactory;
    private final HttpExecutionContext httpExecutionContext;

    @Inject
    public BookController(FormFactory formFactory,
                          BookRepository bookRepository,
                          LendingRepository lendingRepository,
                          HttpExecutionContext httpExecutionContext) {
        this.bookRepository = bookRepository;
        this.lendingRepository = lendingRepository;
        this.formFactory = formFactory;
        this.httpExecutionContext = httpExecutionContext;
    }

    public CompletionStage<Result> getLending(Long id) {
        return lendingRepository.search(id).thenApplyAsync(list -> {
            // This is the HTTP rendering thread context
            JsonNode json = Json.toJson(list.getList());
            System.out.println("Result: " + json);
            return ok(json);
        }, httpExecutionContext.current());
    }


    public CompletionStage<Result> getAllBooks(int page, String sortBy, String order, String filter) {
        // Run a db operation in another thread (using DatabaseExecutionContext)
        return bookRepository.page(page, 10, sortBy, order, filter).thenApplyAsync(list -> {
            // This is the HTTP rendering thread context
            JsonNode json = Json.toJson(list.getList());
            System.out.println("Result: " + json);
            return ok(json);
        }, httpExecutionContext.current());
    }

    public CompletionStage<Result> searchBooks(String id, String name) {
        // Run a db operation in another thread (using DatabaseExecutionContext)
        return bookRepository.search(id, name).thenApplyAsync(list -> {
            // This is the HTTP rendering thread context
            JsonNode json = Json.toJson(list.getList());
            System.out.println("Result: " + json);
            return ok(json);
        }, httpExecutionContext.current());
    }

    public CompletionStage<Result> getById(Long id) {
        return bookRepository.getById(id).thenApplyAsync(list -> {
            // This is the HTTP rendering thread context
            JsonNode json = Json.toJson(list.get());
            System.out.println("Result: " + json);
            return ok(json);
        }, httpExecutionContext.current());
    }

    public CompletionStage<Result> borrowBook(Long id, String r) {
        return bookRepository.getById(id).thenApplyAsync(item -> {
            // This is the HTTP rendering thread context
            Book book = item.get();
            book.status = 2;
            book.lastLended = new BigDecimal(new Date().getTime());
            book.save();

            Lending lending = new Lending();
            lending.bookId = book.id;
            lending.reader = (r != null) ? r : "";
            lending.borrowDate = new BigDecimal(new Date().getTime());
            lending.status = 2;

            lendingRepository.insert(lending);

            return ok(Json.toJson("success"));
        }, httpExecutionContext.current());
    }

    public CompletionStage<Result> returnBook(Long id) {
        return bookRepository.getById(id).thenApplyAsync(item -> {
            ObjectNode objectNode = Json.newObject();

            // This is the HTTP rendering thread context
            Book book = item.get();
            book.status = 1;
            book.save();
            long amount = 0;

            List<Lending> lendings = bookRepository.getLendings(id).stream().filter(el -> el.status == 2).collect(Collectors.toList());
            for(Lending lending: lendings) {
                lending.status = 1;
                lending.returnDate = new BigDecimal(new Date().getTime());
                Date returnDate =  new Date(lending.returnDate.longValue());
                Date borrowDate =  new Date(lending.borrowDate.longValue());

                long diff = borrowDate.getTime() - returnDate.getTime();
                long diffDays = diff / (60 * 60 * 1000 * 24);


                System.out.println("Days Since Borrow: " + diffDays);

                if(book.category == "book") {
                    if(diffDays > Constant.BOOK_MAX_DAYS) {
                        amount = (diffDays - Constant.BOOK_MAX_DAYS) * Constant.LATE_PENALTY_PER_DAY;
                        lending.amount = new BigDecimal(amount);
                    } else {
                        lending.amount = BigDecimal.ZERO;
                    }
                } else {
                    if(diffDays > Constant.DVD_MAX_DAYS) {
                        amount = (diffDays - Constant.DVD_MAX_DAYS) * Constant.LATE_PENALTY_PER_DAY;
                        lending.amount = new BigDecimal(amount);
                    } else {
                        lending.amount = BigDecimal.ZERO;
                    }
                }
                lending.save();
            }

            objectNode.set("status", Json.toJson("success"));
            objectNode.set("amount", Json.toJson(amount));


            return ok(Json.toJson(objectNode));
        }, httpExecutionContext.current());
    }

    public CompletionStage<Result> deleteBook(Long id) {
        return bookRepository.getById(id).thenApplyAsync(item -> {
            // This is the HTTP rendering thread context
            Book book = item.get();
            book.delete();
            return ok(Json.toJson("success"));
        }, httpExecutionContext.current());
    }

    public CompletionStage<Result> saveBook() {
        Form<Book> bookForm = formFactory.form(Book.class).bindFromRequest();
        Book book = bookForm.get();
        // Run insert db operation, then redirect
        return bookRepository.insert(book).thenApplyAsync(data -> {
            // This is the HTTP rendering thread context
            flash("success", "Book " + book.name + " has been created");
            return ok(Json.toJson("success"));
        }, httpExecutionContext.current());
    }
}
