package dto;

import java.util.List;

public class Book extends LibraryItem {

    private final int maxBookNo = 100;
    private Author author;
    private String publisher;
    private int totalPages;
    private List<Author> authors;

    public Book() {
    }

    public Book(int isbn, String title, String sector, String publicationDate, DateTime borrowedDate, Reader currentReader, Author author, String publisher, int totalPages) {
        super(isbn, title, sector, publicationDate, borrowedDate, currentReader);
        this.author = author;
        this.publisher = publisher;
        this.totalPages = totalPages;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    public String getPublisher() {
        return publisher;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public String toString() {
        return "\tBook details: "
                + super.toString()
                + "\nAuthor/s: " + this.author
                + "\nPublisher: " + this.publisher
                + "\nTotal pages: " + this.totalPages;
    }
}
