/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.controller;

import java.util.ArrayList;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONObject;
import sneakr.sneakrproject.model.ResellCipok;
import sneakr.sneakrproject.service.ResellShoeService;

/**
 *
 * @author Krisztián
 */

@Path("resellCipok")
public class ResellShoeController {
    
    @Context
    
    private UriInfo context;
    private ResellShoeService layer = new ResellShoeService();
    
     public ResellShoeController() {
    }
    
@GET
@Path("getAllResellShoesData")
@Produces(MediaType.APPLICATION_JSON)
public Response getAllResellShoesData() {
    JSONObject responseObj = new JSONObject();

    try {
        // Call the service to get the list of users
        ArrayList<ResellCipok> ResellShoesList = layer.getAllResellShoesData();  // Assuming layer.getAllUsers() returns an ArrayList<User>

        // Initialize a JSON array to store user data
        JSONArray ResellShoesArray = new JSONArray();

        // Iterate over the user list and convert each user to a JSONObject
        for (ResellCipok u : ResellShoesList) {
            JSONObject resellShoeJson = new JSONObject();
            resellShoeJson.put("id", u.getId());
            resellShoeJson.put("nev", u.getNev());
            resellShoeJson.put("marka", u.getMarka());
            resellShoeJson.put("nem", u.getNem());
            resellShoeJson.put("allapot", u.getAllapot());
            resellShoeJson.put("meret", u.getMeret());
            resellShoeJson.put("ar", u.getAr());
            resellShoeJson.put("img", u.getImg());       
            resellShoeJson.put("user_id", u.getUserId());

            // Add the user JSON object to the array
            ResellShoesArray.put(resellShoeJson);
        }

        // Add the users array to the response object
        responseObj.put("statusCode", 200);
        responseObj.put("ResellShoes", ResellShoesArray);

        // Return the response with a 200 OK status
        return Response.ok(responseObj.toString(), MediaType.APPLICATION_JSON).build();

    } catch (Exception e) {
        // Handle any exceptions
        responseObj.put("statusCode", 500);
        responseObj.put("message", "Failed to retrieve users");
        responseObj.put("error", e.getMessage());
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(responseObj.toString()).type(MediaType.APPLICATION_JSON).build();
    }
}  
     
     
     
     
     
     
     
     
     
     
     
     
}
