package com.softwareengineering.ebooking.service;

import com.softwareengineering.ebooking.model.Image;
import com.softwareengineering.ebooking.model.ListingImage;
import com.softwareengineering.ebooking.repository.ImageRepo;
import com.softwareengineering.ebooking.repository.ListingImageRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    private final ListingImageRepo listingImageRepo;

    public ImageService(ImageRepo imageRepo, ListingImageRepo listingImageRepo) {
        this.listingImageRepo = listingImageRepo;

    }

    public List<Image> getImagesByListing(Integer id){
        List<ListingImage> listingImages = listingImageRepo.findListingImageByListing_Id(id);
        return listingImages.stream().map(
                ListingImage::getImage
        ) .collect(Collectors.toList());
    }

    public List<ListingImage> getAll(){
        return listingImageRepo.findAll();
    }
}
