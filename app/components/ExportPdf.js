import React from 'react';
import { PDFDownloadLink, Document, Page, Text, Font, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  content: {
    fontFamily: 'Helvetica',
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italics',
    fontWeight: 'normal',
    textAlign: 'justify',
  },
});

const ExportPdf = ({ textContent, textPrompt }) => {
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{textPrompt}</Text>
        <Text style={styles.content}>{textContent}</Text>
      </Page>
    </Document>
  );

  return (
    <div className="flex items-center justify-center">
      <PDFDownloadLink document={<MyDocument />} fileName={`haiku_${textPrompt}.pdf`}>
        {({ loading }) => (
          <button
            className={`py-2
              px-4 rounded-md
              bg-transparent border-2 border-blue-200 text-black
              hover:border-blue-400 hover:text-blue-600
              focus:outline-none focus:ring focus:ring-blue-400
              transition duration-300 ease-in-out
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={loading}
          >
            {loading ? 'Generating PDF...' : 'Save PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default ExportPdf;
