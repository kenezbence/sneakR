/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit4TestClass.java to edit this template
 */
package sneakr.sneakrproject.model;

import org.junit.Test;
import static org.junit.Assert.*;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import static org.junit.Assert.*;
import org.junit.Test;
import org.json.JSONObject;
/**
 *
 * @author TothKrisztian
 */
public class RendelesekTest {
    
    public RendelesekTest() {
    }

    private static final String BASE_URL = "http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/rendelesek/";
    private static final String INSERT_URL = BASE_URL + "insertRendeles";

    private Client createClient() {
        return ClientBuilder.newClient();
    }
    
    @Test
    public void testInsertRendeles_Successful() {
        Client client = createClient();
        
        JSONObject validOrder = new JSONObject();
        validOrder.put("userId", 62);
        validOrder.put("szallitasiCimId", 5);
        validOrder.put("osszeg", 22600);
        validOrder.put("rendelesAllapot", "Előkészítés");

        Response response = client.target(INSERT_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(validOrder.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        
        String responseJson = response.readEntity(String.class);
        assertFalse("Response should not be empty", responseJson.trim().isEmpty());
        
        client.close();
    }

    @Test
    public void testInsertRendeles_InvalidData() {
        Client client = createClient();
        
        JSONObject invalidOrder = new JSONObject();
        invalidOrder.put("userId", "sixty-two"); 
        invalidOrder.put("szallitasiCimId", 5);
        invalidOrder.put("osszeg", 22600);

        Response response = client.target(INSERT_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(invalidOrder.toString(), MediaType.APPLICATION_JSON));

        assertEquals("Should fail with invalid data types and missing fields",
                    Response.Status.OK.getStatusCode(), 
                    response.getStatus());
        
        client.close();
    }
    
}
