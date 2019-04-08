package models;

import javax.persistence.Entity;
import java.math.BigDecimal;

@Entity
public class Lending extends BaseModel {
    public BigDecimal borrowDate;
    public BigDecimal returnDate;
    public BigDecimal amount;
    public String reader;
    public Long bookId;
    public int status;
}
