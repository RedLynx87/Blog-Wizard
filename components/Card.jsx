import React from "react";
import Cards from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CardActionArea from "@mui/material/CardActionArea";

function Card({ title, author, date, summary, category }) {
  return (
    <Cards
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {author} • {date}
          </Typography>
          <Typography variant="body2" color="text.primary" paragraph>
            {summary}
          </Typography>
          <Chip label={category} size="small" />
        </CardContent>
      </CardActionArea>
    </Cards>
  );
}

export default Card;
