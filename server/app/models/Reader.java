package models;

import javax.persistence.Entity;

@Entity
public class Reader extends BaseModel {
    public String name;
    public String mobile;
    public String email;
}
