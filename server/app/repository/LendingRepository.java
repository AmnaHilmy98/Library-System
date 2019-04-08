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

public class LendingRepository {
     private final EbeanServer ebeanServer;
    private final DatabaseExecutionContext executionContext;

    @Inject
    public LendingRepository(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
        this.executionContext = executionContext;
    }

    public CompletionStage<PagedList<Lending>> search(Long id) {

        return supplyAsync(() ->
                ebeanServer.find(Lending.class).where()
                        .ilike("book_id", id.toString())
                        .orderBy("borrow_date desc")
                        .setFirstRow(0)
                        .setMaxRows(1000)
                        .findPagedList(), executionContext);
    }

    public CompletionStage<Long> insert(Lending lending) {
        return supplyAsync(() -> {
            ebeanServer.insert(lending);
            return lending.id;
        }, executionContext);
    }
}
