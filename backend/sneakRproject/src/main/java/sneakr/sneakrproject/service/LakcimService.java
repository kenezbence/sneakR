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
import sneakr.sneakrproject.model.Lakcimek;

/**
 *
 * @author TothKrisztian
 */
public class LakcimService {
    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakr_sneakRproject_war_1.0-SNAPSHOTPU");
    
    private Lakcimek layer = new Lakcimek();
    
    public ArrayList<Lakcimek> getAllLakcim() {
    ArrayList<Lakcimek>LakcimekList = new ArrayList<>(); 
    try {
        LakcimekList = layer.getAllLakcim();     
        
    } catch (Exception e) {
        System.err.println("Error fetching shoes: " + e.getMessage());
    }

    return LakcimekList;
}
    
    public JSONObject insertLakcim(Lakcimek u) {
    JSONObject toReturn = new JSONObject();
    String status = "success";
    int statusCode = 200;
    EntityManager em = emf.createEntityManager();

    try {
        // Existing validations
        
            
            StoredProcedureQuery spq = em.createStoredProcedureQuery("insertLakcim");
            // Register parameters (fixed parameter name mismatch)
            spq.registerStoredProcedureParameter("userIdIN", Integer.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("telefonszamIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("varosIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("iranyitoszamIN", String.class, ParameterMode.IN);
            spq.registerStoredProcedureParameter("utcaIN", String.class, ParameterMode.IN);
            
            // Set parameters
            spq.setParameter("userIdIN", u.getUserId());
            spq.setParameter("telefonszamIN", u.getTelefonszam());
            spq.setParameter("varosIN", u.getVaros());
            spq.setParameter("iranyitoszamIN", u.getIranyitoszam());
            spq.setParameter("utcaIN", u.getUtcaHazszam());

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
