/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.controller;

import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import sneakr.sneakrproject.model.Rendelesek;
import sneakr.sneakrproject.service.RendelesService;

/**
 *
 * @author TothKrisztian
 */
@Path("rendelesek")
public class RendelesController {
    
    @Context
    
    private UriInfo context;
    private RendelesService layer = new RendelesService();
    
     public RendelesController() {
    }
    @GET
@Path("getAllRendeles")
@Produces(MediaType.APPLICATION_JSON)
public Response getAllRendeles() {
    JSONObject responseObj = new JSONObject();

    try {
        // Call the service to get the list of users
        ArrayList<Rendelesek> RendelesekList = layer.getAllRendeles();  // Assuming layer.getAllUsers() returns an ArrayList<User>

        // Initialize a JSON array to store user data
        JSONArray RendelesekArray = new JSONArray();

        // Iterate over the user list and convert each user to a JSONObject
        for (Rendelesek u : RendelesekList) {
            JSONObject rendelesekJson = new JSONObject();
            rendelesekJson.put("id", u.getId()); 
            rendelesekJson.put("user_id", u.getUserId());
            rendelesekJson.put("szallitasiCimId", u.getSzallitasiCimId());
            rendelesekJson.put("osszeg", u.getOsszeg());
            rendelesekJson.put("rendelesDatum", u.getRendelesDatum());
            rendelesekJson.put("rendelesAllapot", u.getRendelesAllapot());
            
            // Add the user JSON object to the array
            RendelesekArray.put(rendelesekJson);
        }

        // Add the users array to the response object
        responseObj.put("statusCode", 200);
        responseObj.put("Rendelesek", RendelesekArray);

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

@POST
@Path("insertRendeles")
@Consumes(MediaType.APPLICATION_JSON)
public Response insertRendeles(String bodyString) {
    try {
        JSONObject body = new JSONObject(bodyString);
        
        Rendelesek u = new Rendelesek(
            body.getInt("userId"),
            body.getInt("szallitasiCimId"),
            body.getInt("osszeg"),
            body.getString("rendelesAllapot")
        );
        
        JSONObject obj = layer.insertRendeles(u);
        return Response.status(obj.getInt("statusCode"))
                       .entity(obj.toString())
                       .build();
    } catch (JSONException e) {
        JSONObject error = new JSONObject();
        error.put("status", "InvalidRequest");
        error.put("statusCode", 400);
        error.put("message", "Malformed JSON input");
        return Response.status(400).entity(error.toString()).build();
    }
}
}
