package dto;

public class DateTime {
    private int day;
    private int month;
    private int year;
    private int hour;
    private int minute;

    public DateTime(int day, int month, int year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    public DateTime(int day, int month, int year, int hour, int minute) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minute = minute;
    }

    public void setDateTime(int day, int month, int year, int hour, int minute) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.hour = hour;
        this.minute = minute;
    }

    public String toString() {
        return "Date: " + day + "/" + month + "/" + year;                                   //time?
    }

    public String getDate() {
        String getDay = "";
        String getMonth = "";
        if (day < 10) {
            getDay = "0" + String.valueOf(day);
        }
        if (month < 10) {
            getMonth = "0" + String.valueOf(month);
        }
        return "Date: " + getDay + "/" + getMonth + "/" + year;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getMinute() {
        return minute;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }
}
