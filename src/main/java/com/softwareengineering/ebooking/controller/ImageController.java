package com.softwareengineering.ebooking.controller;

import com.softwareengineering.ebooking.model.Image;
import com.softwareengineering.ebooking.model.ListingImage;
import com.softwareengineering.ebooking.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/listing/images")
public class ImageController {
    @Autowired
    ImageService imageService;

    @GetMapping("{id}")
    public List<Image> getAllImages(@PathVariable Integer id){
        return imageService.getImagesByListing(id);
    }

    @GetMapping("")
    public List<ListingImage> getAll(){
        return imageService.getAll();
    }
}
