package dto;

import java.util.ArrayList;

public class WestminsterLibraryManager implements LibraryManager {
    private static int bookCount = 0;
    private static int dvdCount = 0;
    private final int maxBookCount = 100;
    private final int maxDvdCount = 50;
    private String type;
    private static ArrayList<Book> books = new ArrayList<Book>();
    private static ArrayList<DVD> dvds = new ArrayList<DVD>();
    private ArrayList<LibraryItem> libraryItems = new ArrayList<>();
    private ArrayList<LibraryItem> overdueItems = new ArrayList<>();

    public void addBook(Book book) {

        if (bookCount <= maxBookCount) {
            books.add(book);
            bookCount++;
        } else {
            System.out.println("No space available for books");
        }
    }

    public void addDvd(DVD dvd) {

        if (dvdCount <= maxDvdCount) {
            dvds.add(dvd);
            dvdCount++;
        } else {
            System.out.println("No space available for DVD");
        }
    }

    public void deleteBook(int isbn) {

        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getIsbn() == isbn) {
                books.remove(i);
                bookCount--;

                System.out.println("A book was removed. " + (maxBookCount - bookCount) + " spaces available");
            }
        }
    }

    public void deleteDvd(int isbn) {

        for (int i = 0; i < dvds.size(); i++) {
            if (dvds.get(i).getIsbn() == isbn) {
                dvds.remove(i);
                dvdCount--;

                System.out.println("A DVD was removed. " + (maxDvdCount - dvdCount) + " spaces available");
            }
        }
    }

    public void displayList() {
        libraryItems.clear();
        libraryItems.addAll(books);
        libraryItems.addAll(dvds);
        for (int i = 0; i < libraryItems.size(); i++) {
            if (libraryItems.get(i) instanceof Book) {
                type = "Book";
            } else if (libraryItems.get(i) instanceof DVD) {
                type = "DVD";
            }
            System.out.println(libraryItems.get(i).getIsbn() + " " + type + " " + libraryItems.get(i).getTitle());
        }
    }

    public void borrowItem(int isbn, Reader reader) {
        for (int i = 0; i < libraryItems.size(); i++) {
            if (libraryItems.get(i).getIsbn() == isbn && libraryItems.get(i).getReader() == null) {
                libraryItems.get(i).setReader(reader);
//                libraryItems.get(i).setBorrowedDate(today);
            } else {
                if (libraryItems.get(i) instanceof Book) {
                    System.out.println("Item not available at the moment. It will be available again on " + (libraryItems.get(i).getBorrowedDate().getDay() + 7) + "/" + String.valueOf(libraryItems.get(i).getBorrowedDate().getMonth() + "/" + String.valueOf(libraryItems.get(i).getBorrowedDate().getYear())));
                } else if (libraryItems.get(i) instanceof DVD) {
                    System.out.println("Item not available at the moment. It will be available again on " + (libraryItems.get(i).getBorrowedDate().getDay() + 3) + "/" + String.valueOf(libraryItems.get(i).getBorrowedDate().getMonth() + "/" + String.valueOf(libraryItems.get(i).getBorrowedDate().getYear())));
                }
            }
        }
    }

    public void returnItem(int isbn, DateTime today) {
        for (int i = 0; i < libraryItems.size(); i++) {
            if (libraryItems.get(i).getIsbn() == isbn) {
                double fine;
                if (libraryItems.get(i) instanceof Book) {
                    if ((today.getDay() - libraryItems.get(i).getBorrowedDate().getDay()) > 7) {
                        if ((today.getDay() - libraryItems.get(i).getBorrowedDate().getDay() - 7) < 4) {
                            fine = ((today.getHour() - libraryItems.get(i).getBorrowedDate().getHour()) + (today.getDay() - libraryItems.get(i).getBorrowedDate().getDay() - 7) * 24) * 0.2;
                            System.out.println(fine);
                        } else {
                            fine = (((today.getHour() - libraryItems.get(i).getBorrowedDate().getHour()) + 3 * 24) * 0.2) + (((today.getDay() - libraryItems.get(i).getBorrowedDate().getDay() - 10) * 24 + (today.getHour() - libraryItems.get(i).getBorrowedDate().getHour())) * 0.5);
                        }
                        overdueItems.add(libraryItems.get(i));
                        if (fine != 0) {
                            System.out.println("You have to pay $" + fine + " extra");
                        }
                    }
                } else if (libraryItems.get(i) instanceof DVD) {
                    if ((today.getDay() - libraryItems.get(i).getBorrowedDate().getDay()) > 3) {
                        if ((today.getDay() - libraryItems.get(i).getBorrowedDate().getDay() - 3) < 4) {
                            fine = ((today.getHour() - libraryItems.get(i).getBorrowedDate().getHour()) + (today.getDay() - libraryItems.get(i).getBorrowedDate().getDay() - 3) * 24) * 0.2;
                        } else {
                            fine = (((today.getHour() - libraryItems.get(i).getBorrowedDate().getHour()) + 3 * 24) * 0.2) + (((today.getDay() - libraryItems.get(i).getBorrowedDate().getDay() - 6) * 24 + (today.getHour() - libraryItems.get(i).getBorrowedDate().getHour())) * 0.5);
                        }
                        overdueItems.add(libraryItems.get(i));
                        if (fine != 0) {
                            System.out.println("You have to pay $" + fine + " extra");
                        }
                    }
                }
                libraryItems.get(i).setBorrowedDate(null);
                libraryItems.get(i).setReader(null);
                System.out.println("Item returned");
            }
        }
    }

    public void generateReport() {
        for (LibraryItem fineItems : overdueItems) {
            int i = 0;
            System.out.println(overdueItems.get(i).getIsbn() + " " + overdueItems.get(i).getTitle() + " " + (overdueItems.get(i).getBorrowedDate().getDay() + 7));
        }
    }
}

