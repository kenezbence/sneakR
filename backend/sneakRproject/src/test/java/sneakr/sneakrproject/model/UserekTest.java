/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/UnitTests/JUnit4TestClass.java to edit this template
 */
package sneakr.sneakrproject.model;



/**
 *
 * @author TothKrisztian
 */
import java.util.ArrayList;
import static org.junit.Assert.*;
import org.junit.Test;
import org.json.JSONObject;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class UserekTest {
    
    public UserekTest() {
    }
    
    private static final String BASE_URL = "http://127.0.0.1:8080/sneakRproject-1.0-SNAPSHOT/webresources/userek/";
    private static final String LOGIN_URL = BASE_URL + "login";
    private static final String REGISTER_URL = BASE_URL + "registerUser";
    private static final String DELETE_URL = BASE_URL + "deleteUser/";

    private Client createClient() {
        return ClientBuilder.newClient();
    }
    
    @Test
    public void testLogin_Successful() {
        Client client = createClient();
        
        JSONObject validCredentials = new JSONObject();
        validCredentials.put("email", "nagyzsombi@gmail.com");
        validCredentials.put("password", "zsombika12345");
        
        Response response = client.target(LOGIN_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(validCredentials.toString(), MediaType.APPLICATION_JSON));
        
        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        
        String responseJson = response.readEntity(String.class);
        assertFalse("Response should not be empty", responseJson.trim().isEmpty());
        
        client.close();
    }

    @Test
    public void testLogin_InvalidCredentials() {
        Client client = createClient();
        
        JSONObject invalidCredentials = new JSONObject();
        invalidCredentials.put("email", "nagyzsombi@gmail.com");
        invalidCredentials.put("password", "adshjgjsdhf");
        
        Response response = client.target(LOGIN_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(invalidCredentials.toString(), MediaType.APPLICATION_JSON));
        
        assertTrue("Email or password is wrong!",
                response.getStatus() == Response.Status.UNAUTHORIZED.getStatusCode() ||
                response.getStatus() == Response.Status.BAD_REQUEST.getStatusCode());
        
        client.close();
    }
    
    @Test
    public void testRegister_Successful() {
        Client client = createClient();
        
        JSONObject newUser = new JSONObject();
        newUser.put("nev", "Test User ");
        newUser.put("email", "test@example.com");
        newUser.put("password", "ValidPassword123!");

        Response response = client.target(REGISTER_URL)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.entity(newUser.toString(), MediaType.APPLICATION_JSON));

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        
        String responseJson = response.readEntity(String.class);
        assertFalse("Response should not be empty", responseJson.trim().isEmpty());
        
        client.close();
    }
    
    @Test
    public void testRegister_MissingFields() {
        Client client = createClient();

        JSONObject noPassword = new JSONObject();
        noPassword.put("nev", "No Password");
        noPassword.put("email", "nopass@example.com");
        Response response = client.target(REGISTER_URL)
                .request()
                .post(Entity.entity(noPassword.toString(), MediaType.APPLICATION_JSON));
        assertEquals(Response.Status.BAD_REQUEST.getStatusCode(), response.getStatus());
        
        client.close();
    }
    
    @Test
    public void testDeleteUser_Successful() {
    Client client = createClient();
    
    int existingUserId = 67;
    
    Response response = client.target(DELETE_URL + existingUserId)
            .request(MediaType.APPLICATION_JSON)
            .delete();

    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    
    String responseJson = response.readEntity(String.class);
    assertTrue("Response should indicate success", responseJson.contains("success"));
    
    client.close();
}
    
    
    @Test
    public void testDeleteUser_UserNotFound() {
    Client client = createClient();
    
    int nonExistentUserId = 999999;
    
    Response response = client.target(DELETE_URL + nonExistentUserId)
            .request(MediaType.APPLICATION_JSON)
            .delete();

    assertEquals(Response.Status.NOT_FOUND.getStatusCode(), response.getStatus());
    
    client.close();
}
}


