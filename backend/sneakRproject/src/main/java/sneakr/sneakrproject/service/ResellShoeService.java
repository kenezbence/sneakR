/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.service;

import java.util.ArrayList;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import sneakr.sneakrproject.model.ResellCipok;

/**
 *
 * @author Krisztián
 */
public class ResellShoeService {
    
    static EntityManagerFactory emf = Persistence.createEntityManagerFactory("sneakr_sneakRproject_war_1.0-SNAPSHOTPU");
    
    private ResellCipok layer = new ResellCipok();
    
    public ArrayList<ResellCipok> getAllResellShoesData() {
    ArrayList<ResellCipok>ResellShoesList = new ArrayList<>(); 
    try {
        ResellShoesList = layer.getAllResellShoesData();     
        
    } catch (Exception e) {
        System.err.println("Error fetching shoes: " + e.getMessage());
    }

    return ResellShoesList;
}
    
    
}
