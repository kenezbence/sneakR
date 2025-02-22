/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.service;

import java.util.ArrayList;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.ParameterMode;
import javax.persistence.Persistence;
import javax.persistence.StoredProcedureQuery;
import org.json.JSONObject;
import sneakr.sneakrproject.model.Rendelesek;

/**
 *
 * @author TothKrisztian
 */
public class RendelesService {
    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakr_sneakRproject_war_1.0-SNAPSHOTPU");
    
    private Rendelesek layer = new Rendelesek();
    
    public ArrayList<Rendelesek> getAllRendeles() {
    ArrayList<Rendelesek>RendelesekList = new ArrayList<>(); 
    try {
        RendelesekList = layer.getAllRendeles();     
        
    } catch (Exception e) {
        System.err.println("Error fetching shoes: " + e.getMessage());
    }

    return RendelesekList;
}
    
    public JSONObject insertRendeles(Rendelesek u) {
    JSONObject toReturn = new JSONObject();
    String status = "success";
    int statusCode = 200;
    EntityManager em = emf.createEntityManager();

    try {
        // Existing validations
        
            
            StoredProcedureQuery spq = em.createStoredProcedureQuery("insertRendeles");
            // Register parameters (fixed parameter name mismatch)
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("szallitasIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("allapotIN", String.class, ParameterMode.IN);
            
            // Set parameters
            spq.setParameter("userIdIN", u.getUserId());
            spq.setParameter("szallitasIN", u.getSzallitasiCimId());
            spq.setParameter("allapotIN", u.getRendelesAllapot());

            spq.execute();
        
    } catch (Exception e) {
        status = "ServerError";
        statusCode = 500;
        System.err.println("Error during shoe upload: " + e.getMessage());
    } finally {
        if (em != null) {
            em.clear();
            em.close();
        }
    }

    toReturn.put("status", status);
    toReturn.put("statusCode", statusCode);
    return toReturn;
}
}
