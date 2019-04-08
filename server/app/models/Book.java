package models;

import play.data.validation.Constraints;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class Book extends LibraryItem {
    private static final long serialVersionUID = 1L;

    @Constraints.Required
    public String name;
    public String category;
    public String genre;
    public String isbn;
    public String author;
    public int status;
    public int pages;
    public BigDecimal lastLended;
}
