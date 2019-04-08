package dto;

import java.util.ArrayList;

public class DVD extends LibraryItem {

    private final int maxDVDNo = 50;
    private ArrayList availableLang;
    private ArrayList availableSubtitles;
    private String producer;
    private ArrayList actors;

    public DVD(int isbn, String title, String sector, String publicationDate, DateTime borrowedDate, Reader currentReader, ArrayList availableLang, ArrayList availableSubtitles, String producer, ArrayList actors) {
        super(isbn, title, sector, publicationDate, borrowedDate, currentReader);
        this.availableLang = availableLang;
        this.availableSubtitles = availableSubtitles;
        this.producer = producer;
        this.actors = actors;
    }

    public ArrayList getAvailableLang() {
        return availableLang;
    }

    public ArrayList getAvailableSubtitles() {
        return availableSubtitles;
    }

    public String getProducer() {
        return producer;
    }

    public ArrayList getActors() {
        return actors;
    }

    public String toString() {
        return "\tDVD details: "
                + super.toString()
                + "\nAvailable languages: " + this.availableLang
                + "\nAvailable subtitles: " + this.availableSubtitles
                + "\nProducer: " + this.producer
                + "\nActors: " + this.actors;
    }
}
