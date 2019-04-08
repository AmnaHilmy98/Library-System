package dto;

public class Reader {

    private int id;
    private String name;
    private int mobile;
    private String email;

    public Reader() {
    }

    public Reader(int id, String name, int mobile, String email) {
        this.id = id;
        this.name = name;
        this.mobile = mobile;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMobile() {
        return mobile;
    }

    public void setMobile(int mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String toString() {
        return "\tReader details: "
                + "\nID: " + this.id
                + "\nName: " + this.name
                + "\nMobile: " + this.mobile
                + "\nE mail: " + this.email;
    }
}
