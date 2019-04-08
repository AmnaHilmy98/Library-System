package dto;

public interface LibraryManager {
    void addBook(Book book);

    void addDvd(DVD dvd);

    void deleteBook(int isbn);

    void deleteDvd(int isbn);

    void displayList();

    void borrowItem(int isbn, Reader reader);

    void returnItem(int isbn, DateTime today);

    void generateReport();
}
