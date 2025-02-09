/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package sneakr.sneakrproject.controller;

import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import sneakr.sneakrproject.model.Cipok;
import sneakr.sneakrproject.service.ShoeService;

/**
 *
 * @author Krisztián
 */
@Path("cipok")
public class ShoeController {
    
    @Context
    
    private UriInfo context;
    private ShoeService layer = new ShoeService();
    
     public ShoeController() {
    }
     

