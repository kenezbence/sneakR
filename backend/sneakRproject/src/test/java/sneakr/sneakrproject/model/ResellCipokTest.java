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
public class ResellCipokTest {
    
    public ResellCipokTest() {
    }
    
    private static final String BASE_URL = "http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/resellCipok/";
    private static final String UPLOAD_URL = BASE_URL + "uploadResellShoes";
    private static final String DELETE_URL = BASE_URL + "deleteResellShoes/";
    private static final String UPDATE_BUYER_URL = BASE_URL + "updateResellShoeBuyer/";

    private Client createClient() {
        return ClientBuilder.newClient();
    }


    @Test
    public void testUploadResellShoes_Successful() {
        Client client = createClient();
        
        JSONObject shoeData = new JSONObject();
        shoeData.put("nev", "Nike Air Max 97");
        shoeData.put("marka", "Nike");
        shoeData.put("nem", "Férfi");
        shoeData.put("allapot", "Új");
        shoeData.put("meret", 42);
        shoeData.put("ar", 89999);
        shoeData.put("img", "https://example.com/shoe_" + System.currentTimeMillis() + ".jpg");
        shoeData.put("userId", 6);

        Response response = client.target(UPLOAD_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(shoeData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        
        String responseJson = response.readEntity(String.class);
        assertFalse("Response should not be empty", responseJson.trim().isEmpty());
        
        client.close();
    }

    @Test
    public void testDeleteResellShoes_Successful() {
        Client client = createClient();
        
        int existingShoeId = 20;
        
        Response response = client.target(DELETE_URL + existingShoeId)
                .request(MediaType.APPLICATION_JSON)
                .delete();

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        
        String responseJson = response.readEntity(String.class);
        assertTrue("Response should indicate success", responseJson.contains("success"));
        
        client.close();
    }

    @Test
    public void testDeleteResellShoes_NotFound() {
        Client client = createClient();
        
        int nonExistentShoeId = 9999;
        
        Response response = client.target(DELETE_URL + nonExistentShoeId)
                .request(MediaType.APPLICATION_JSON)
                .delete();

        assertEquals(Response.Status.NOT_FOUND.getStatusCode(), response.getStatus());
        
        client.close();
    }

    @Test
    public void testUpdateResellShoeBuyer_Successful() {
        Client client = createClient();

        int existingShoeId = 17;
        
        JSONObject updateData = new JSONObject();
        updateData.put("buyerId", 62);
        updateData.put("isBought", "igen");

        Response response = client.target(UPDATE_BUYER_URL + existingShoeId)
                .request(MediaType.APPLICATION_JSON)
                .put(Entity.entity(updateData.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        
        String responseJson = response.readEntity(String.class);
        assertTrue("Response should indicate success", responseJson.contains("success"));
        
        client.close();
    }
    
    @Test
    public void testUpdateResellShoeBuyer_NonExistentShoe() {
    Client client = createClient();
    
    int nonExistentShoeId = 9999;
    
    JSONObject validData = new JSONObject();
    validData.put("buyerId", 62);
    validData.put("isBought", "igen");

    Response response = client.target(UPDATE_BUYER_URL + nonExistentShoeId)
            .request(MediaType.APPLICATION_JSON)
            .put(Entity.entity(validData.toString(), MediaType.APPLICATION_JSON));

    assertEquals(Response.Status.NOT_FOUND.getStatusCode(), response.getStatus());
    
    client.close();
}
  
    @Test
    public void testUpdateResellShoeBuyer_InvalidData() {
    Client client = createClient();
    
    int existingShoeId = 17; 
    
    JSONObject invalidUpdateData = new JSONObject();
    invalidUpdateData.put("buyerId", "not_a_number"); 
    invalidUpdateData.put("isBought", "invalid_status"); 

    Response response = client.target(UPDATE_BUYER_URL + existingShoeId)
            .request(MediaType.APPLICATION_JSON)
            .put(Entity.entity(invalidUpdateData.toString(), MediaType.APPLICATION_JSON));

    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    
    client.close();
}

}
