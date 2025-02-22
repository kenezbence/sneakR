/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
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
import javax.validation.constraints.Size;

/**
 *
 * @author Krisztián
 */
@Entity
@Table(name = "lakcimek")
@NamedQueries({
    @NamedQuery(name = "Lakcimek.findAll", query = "SELECT l FROM Lakcimek l"),
    @NamedQuery(name = "Lakcimek.findById", query = "SELECT l FROM Lakcimek l WHERE l.id = :id"),
    @NamedQuery(name = "Lakcimek.findByVaros", query = "SELECT l FROM Lakcimek l WHERE l.varos = :varos"),
    @NamedQuery(name = "Lakcimek.findByIranyitoszam", query = "SELECT l FROM Lakcimek l WHERE l.iranyitoszam = :iranyitoszam")})
public class Lakcimek implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Size(max = 40)
    @Column(name = "telefonszam")
    private String telefonszam;
    @Size(max = 255)
    @Column(name = "utca_hazszam")
    private String utcaHazszam;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 255)
    @Column(name = "varos")
    private String varos;
    @Size(max = 255)
    @Column(name = "iranyitoszam")
    private String iranyitoszam;
    @Size(max = 255)
    
    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakr_sneakRproject_war_1.0-SNAPSHOTPU");

    public Lakcimek() {
    }

    public Lakcimek(Integer id) {
        this.id = id;
    }
    
    public Lakcimek(Integer userId, String telefonszam, String varos, String iranyitoszam,String utcaHazszam){
        EntityManager em = emf.createEntityManager();
        this.userId = userId;
        this.telefonszam = telefonszam;
        this.varos = varos;
        this.iranyitoszam = iranyitoszam;
        this.utcaHazszam = utcaHazszam;
    }
    
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVaros() {
        return varos;
    }

    public void setVaros(String varos) {
        this.varos = varos;
    }

    public String getIranyitoszam() {
        return iranyitoszam;
    }

    public void setIranyitoszam(String iranyitoszam) {
        this.iranyitoszam = iranyitoszam;
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
        if (!(object instanceof Lakcimek)) {
            return false;
        }
        Lakcimek other = (Lakcimek) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "sneakr.sneakrproject.model.Lakcimek[ id=" + id + " ]";
    }

    public String getTelefonszam() {
        return telefonszam;
    }

    public void setTelefonszam(String telefonszam) {
        this.telefonszam = telefonszam;
    }

    public String getUtcaHazszam() {
        return utcaHazszam;
    }

    public void setUtcaHazszam(String utcaHazszam) {
        this.utcaHazszam = utcaHazszam;
    }
    
    
    public static ArrayList<Lakcimek> getAllLakcim() {
    EntityManager em = emf.createEntityManager();
    ArrayList<Lakcimek> lakcimList = new ArrayList<>();

    try {
        StoredProcedureQuery spq = em.createStoredProcedureQuery("getAllLakcim", Lakcimek.class);
        spq.execute();
        lakcimList = new ArrayList<>(spq.getResultList());

    } catch (Exception e) {
        System.err.println("Error: " + e.getLocalizedMessage());
    } finally {
        em.clear();
        em.close();
    }

    return lakcimList;
}
    
    public Boolean insertLakcim(Lakcimek u) {
        EntityManager em = emf.createEntityManager();
        try {
            StoredProcedureQuery spq = em.createStoredProcedureQuery("insertLakcim");
            
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("telefonszamIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("varosIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("iranyitoszamIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("utcaIN", String.class, ParameterMode.IN);
            
            spq.setParameter("userIdIN", u.getUserId());
            spq.setParameter("telefonszamIN", u.getTelefonszam());
            spq.setParameter("varosIN", u.getVaros());
            spq.setParameter("iranyitoszamIN", u.getIranyitoszam());
            spq.setParameter("utcaIN", u.getUtcaHazszam());
          
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


}
