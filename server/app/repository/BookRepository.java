package repository;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
import io.ebean.PagedList;
import io.ebean.Transaction;
import models.Book;
import models.Lending;
import play.db.ebean.EbeanConfig;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletionStage;

import static java.util.concurrent.CompletableFuture.supplyAsync;

public class BookRepository {
    private final EbeanServer ebeanServer;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public BookRepository(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
        this.executionContext = executionContext;
    }

    public CompletionStage<PagedList<Book>> page(int page, int pageSize, String sortBy, String order, String filter) {
        return supplyAsync(() ->
                ebeanServer.find(Book.class).where()
                        .ilike("name", "%" + filter + "%")
                        .orderBy("category" + " " + order)
                        .setFirstRow(page * pageSize)
                        .setMaxRows(pageSize)
                        .findPagedList(), executionContext);
    }

    public CompletionStage<PagedList<Book>> search(String id, String name) {
        String qname = (name == null) ? "" : name;
        String qid = (id == null) ? "" : id;

        System.out.println("Name : " + qname);
        System.out.println("ID   : " + qid);

        return supplyAsync(() ->
                ebeanServer.find(Book.class).where()
                        .ilike("name", "%" + qname + "%")
                        .ilike("id", "%" + qid + "%")
                        .orderBy("category asc")
                        .setFirstRow(0)
                        .setMaxRows(1000)
                        .findPagedList(), executionContext);
    }

    public CompletionStage<Optional<Book>> getById(Long id) {
        return supplyAsync(() -> Optional.ofNullable(ebeanServer.find(Book.class).setId(id).findOne()), executionContext);
    }

    public List<Lending> getLendings(Long id) {
        List<Lending> lendings = ebeanServer.find(Lending.class).setParameter("book_id", id).findList();
        if(lendings != null && lendings.size() > 0) {
            return lendings;
        } else {
            return new ArrayList<>();
        }
    }

    public CompletionStage<Optional<Long>> update(Long id, Book newBookData) {
        return supplyAsync(() -> {
            Transaction txn = ebeanServer.beginTransaction();
            Optional<Long> value = Optional.empty();
            try {
                Book savedBook = ebeanServer.find(Book.class).setId(id).findOne();
                if (savedBook != null) {
                    savedBook.name = newBookData.name;
                    savedBook.pages = newBookData.pages;
                    savedBook.category = newBookData.category;
                    savedBook.status = newBookData.status;

                    savedBook.update();
                    txn.commit();
                    value = Optional.of(id);
                }
            } finally {
                txn.end();
            }
            return value;
        }, executionContext);
    }

    public CompletionStage<Long> insert(Book book) {
        return supplyAsync(() -> {
            book.status = 1; // not ideal, but it works
            ebeanServer.insert(book);
            return book.id;
        }, executionContext);
    }
}
