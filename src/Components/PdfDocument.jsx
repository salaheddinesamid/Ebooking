import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import HouseboatIcon from '@mui/icons-material/Houseboat';
import { Icon } from '@mui/material';
import jsPDF from "jspdf";
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
// Create Document Component
