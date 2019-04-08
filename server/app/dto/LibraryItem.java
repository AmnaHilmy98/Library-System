package dto;

public abstract class LibraryItem {

    private int isbn;
    private String title;
    private String sector;
    private String publicationDate;
    private DateTime borrowedDate;
    private Reader reader;

    public LibraryItem() {
    }

    public LibraryItem(int isbn, String title, String sector, String publicationDate, DateTime borrowedDate, Reader reader) {
        this.isbn = isbn;
        this.title = title;
        this.sector = sector;
        this.publicationDate = publicationDate;
        this.borrowedDate = borrowedDate;
        this.reader = reader;
    }

    public int getIsbn() {
        return isbn;
    }

    public void setIsbn(int isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSector() {
        return sector;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public DateTime getBorrowedDate() {
        return borrowedDate;
    }

    public void setBorrowedDate(DateTime borrowedDate) {
        this.borrowedDate = borrowedDate;
    }

    public Reader getReader() {
        return reader;
    }

    public void setReader(Reader reader){
        this.reader = reader;
    }

    public String toString() {
        return "\nISBN: " + this.isbn
                + "\nTitle: " + this.title
                + "\nSector: " + this.sector
                + "\nPublication date: " + this.publicationDate
                + "\nBorrowed date: " + this.borrowedDate
                + "\nCurrent reader: " + this.reader.getId();
    }

}
