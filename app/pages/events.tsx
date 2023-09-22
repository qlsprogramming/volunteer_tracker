import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import MaterialTable, { Column } from "@material-table/core";
import {
  CardContent,
  Checkbox,
  LinearProgress,
  Tooltip,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { headers } from 'next/dist/client/components/headers';
import Paper from '@mui/material/Paper';
// pages/index.tsx


type SheetData = {
  name: string;
};

const SheetPage: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/sheet')
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
    <Header/>
    <Container>
      <Box mt={2} style={{ padding: '20px' }}>
        <Typography variant="h4">Events</Typography>
      </Box>
      <Box mt={2}>
        {data.map((row, rowIndex) => (
          <Paper key={rowIndex} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            {row.map((item, columnIndex) => (
              <div key={columnIndex}>{item}</div>
            ))}
          </Paper>
        ))}
      </Box>
    </Container>
    </>
  );

};

export default SheetPage;