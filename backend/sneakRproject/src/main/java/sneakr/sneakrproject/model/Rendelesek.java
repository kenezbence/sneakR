/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

/**
 *
 * @author Krisztián
 */
@Entity
@Table(name = "rendelesek")
@NamedQueries({
    @NamedQuery(name = "Rendelesek.findAll", query = "SELECT r FROM Rendelesek r"),
    @NamedQuery(name = "Rendelesek.findById", query = "SELECT r FROM Rendelesek r WHERE r.id = :id"),
    @NamedQuery(name = "Rendelesek.findByRendelesDatum", query = "SELECT r FROM Rendelesek r WHERE r.rendelesDatum = :rendelesDatum"),
    @NamedQuery(name = "Rendelesek.findByRendelesAllapot", query = "SELECT r FROM Rendelesek r WHERE r.rendelesAllapot = :rendelesAllapot")})
public class Rendelesek implements Serializable {

    @Column(name = "szallitasi_cim_id")
    private Integer szallitasiCimId;

    @Column(name = "user_id")
    private Integer userId;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "rendeles_datum")
    @Temporal(TemporalType.DATE)
    private Date rendelesDatum;
    @Size(max = 255)
    @Column(name = "rendeles_allapot")
    private String rendelesAllapot;
    @OneToMany(mappedBy = "rendelesId")
    private Collection<RendelesTetelek> rendelesTetelekCollection;

    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakr_sneakRproject_war_1.0-SNAPSHOTPU");
    
    public Rendelesek() {
    }

    public Rendelesek(Integer id) {
        this.id = id;
    }
    
    public Rendelesek(Integer userId, Integer szallitasiCimId, String rendelesAllapot) {
        this.userId = userId;
        this.szallitasiCimId = szallitasiCimId;
        this.rendelesAllapot = rendelesAllapot;
        
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getRendelesDatum() {
        return rendelesDatum;
    }

    public void setRendelesDatum(Date rendelesDatum) {
        this.rendelesDatum = rendelesDatum;
    }

    public String getRendelesAllapot() {
        return rendelesAllapot;
    }

    public void setRendelesAllapot(String rendelesAllapot) {
        this.rendelesAllapot = rendelesAllapot;
    }

    public Collection<RendelesTetelek> getRendelesTetelekCollection() {
        return rendelesTetelekCollection;
    }

    public void setRendelesTetelekCollection(Collection<RendelesTetelek> rendelesTetelekCollection) {
        this.rendelesTetelekCollection = rendelesTetelekCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Rendelesek)) {
            return false;
        }
        Rendelesek other = (Rendelesek) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sneakr.sneakrproject.model.Rendelesek[ id=" + id + " ]";
    }

    public static ArrayList<Rendelesek> getAllRendeles() {
    EntityManager em = emf.createEntityManager();
    ArrayList<Rendelesek> rendelesList = new ArrayList<>();

    try {
        StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllRendeles", Rendelesek.class);
        spq.execute();
        rendelesList = new ArrayList<>(spq.getResultList());

    } catch (Exception e) {
        System.err.println("Error: " + e.getLocalizedMessage());
    } finally {
        em.clear();
        em.close();
    }

    return rendelesList;
}
    
    public Boolean insertRendeles(Rendelesek u) {
        EntityManager em = emf.createEntityManager();
        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("insertRendeles");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("szallitasIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("allapotIN", String.class, ParameterMode.IN);
            
            spq.setParameter("userIdIN", u.getUserId());
            spq.setParameter("szallitasIN", u.getSzallitasiCimId());
            spq.setParameter("allapotIN", u.getRendelesAllapot());
          
            spq.execute();
            
            return true;
        } catch (Exception e) {
            System.err.println("Hiba: " + e.getLocalizedMessage());
            return false;
        } finally{
            em.clear();
            em.close();
        }
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getSzallitasiCimId() {
        return szallitasiCimId;
    }

    public void setSzallitasiCimId(Integer szallitasiCimId) {
        this.szallitasiCimId = szallitasiCimId;
    }
    
}
