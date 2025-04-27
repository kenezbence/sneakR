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
public class CipokTest {
    
    public CipokTest() {
    }

    private static final String BASE_URL = "http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/cipok/";
    private static final String UPLOAD_URL = BASE_URL + "uploadShoes";
    private static final String DELETE_URL = BASE_URL + "deleteShoes/";
    private static final String UPDATE_SHOE_URL = BASE_URL + "updateShoe/";
    private static final String UPDATE_BUYER_URL = BASE_URL + "updateShoeBuyer/";

    private Client createClient() {
        return ClientBuilder.newClient();
    }
    
    @Test
    public void testUploadShoes_Successful() {
        Client client = createClient();
        
        JSONObject shoeData = new JSONObject();
        shoeData.put("nev", "Air Jordan Test " + System.currentTimeMillis());
        shoeData.put("marka", "Nike");
        shoeData.put("nem", "Férfi");
        shoeData.put("allapot", "Új");
        shoeData.put("meret", 42);
        shoeData.put("ar", 89999);
        shoeData.put("img", "https://example.com/shoe_" + System.currentTimeMillis() + ".jpg");

        Response response = client.target(UPLOAD_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(shoeData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertFalse(response.readEntity(String.class).trim().isEmpty());
        client.close();
    }

    @Test
    public void testUploadShoes_InvalidData() {
        Client client = createClient();
        
        JSONObject invalidData = new JSONObject();
        invalidData.put("nev", "Invalid Shoe");
        invalidData.put("ar", -100);  
        invalidData.put("meret", "forty-two"); 

        Response response = client.target(UPLOAD_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(invalidData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        client.close();
    }

    
    @Test
    public void testDeleteShoes_Successful() {
        Client client = createClient();
        int existingShoeId = 42; 
        
        Response response = client.target(DELETE_URL + existingShoeId)
                .request(MediaType.APPLICATION_JSON)
                .delete();

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        client.close();
    }

    @Test
    public void testDeleteShoes_NotFound() {
        Client client = createClient();
        int nonExistentId = 9999;
        
        Response response = client.target(DELETE_URL + nonExistentId)
                .request(MediaType.APPLICATION_JSON)
                .delete();

        assertEquals(Response.Status.NOT_FOUND.getStatusCode(), response.getStatus());
        client.close();
    }

    
    @Test
    public void testUpdateShoe_Successful() {
        Client client = createClient();
        int existingShoeId = 43;
        
        JSONObject updateData = new JSONObject();
        updateData.put("nev", "Air Jordan Test " + System.currentTimeMillis());
        updateData.put("marka", "Nike");
        updateData.put("nem", "Férfi");
        updateData.put("allapot", "Új");
        updateData.put("meret", 45);
        updateData.put("ar", 89999);
        updateData.put("img", "https://example.com/shoe_" + System.currentTimeMillis() + ".jpg");

        Response response = client.target(UPDATE_SHOE_URL + existingShoeId)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.entity(updateData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        client.close();
    }

    @Test
    public void testUpdateShoe_InvalidUpdate() {
        Client client = createClient();
        int existingShoeId = 43;
        
        JSONObject invalidData = new JSONObject();
        invalidData.put("ar", "invalid_price");  
        invalidData.put("meret", 1000);  

        Response response = client.target(UPDATE_SHOE_URL + existingShoeId)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.entity(invalidData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        client.close();
    }

    @Test
    public void testUpdateShoeBuyer_Successful() {
        Client client = createClient();
        int existingShoeId = 43;
        
        JSONObject buyerData = new JSONObject();
        buyerData.put("userId", 62);

        Response response = client.target(UPDATE_BUYER_URL + existingShoeId)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.entity(buyerData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        client.close();
    }

    @Test
    public void testUpdateShoeBuyer_InvalidUser() {
        Client client = createClient();
        int existingShoeId = 43;
        
        JSONObject invalidData = new JSONObject();
        invalidData.put("userId", "invalid_user_id");  

        Response response = client.target(UPDATE_BUYER_URL + existingShoeId)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.entity(invalidData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        client.close();
    }

}
