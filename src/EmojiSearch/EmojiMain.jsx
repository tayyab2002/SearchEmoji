import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import axios from "axios";
const EmojiMain = () => {
  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [searchEmoji, setSearchEmoji] = useState("");
  const [loading, setLoading] = useState(true);

  const emojiUrl =
    "https://emoji-api.com/emojis?access_key=11066f7ba9a4c66a3585e9230714e3b6095c0734";
  const EmojiApiData = async () => {
    try {
      const apiResponse = await axios.get(emojiUrl);
      let emojiData = await apiResponse.data;
      emojiData = emojiData.map((emoji) => {
        return {
          ...emoji,
          unicodeName: emoji.unicodeName
            .replace(/^E\d+\.\d+\s*/, "")
            .replace(/\s+/g, ""),
        };
      });
      setEmojis(emojiData);
      setFilteredEmojis(emojiData);
    } catch (error) {
      console.error("Error fetching emojis:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
    }
  };

  const searchEmojisValue = () => {
    const searchValue = searchEmoji.toLocaleLowerCase().replace(/\s+/g, "");
    const regex = new RegExp(`(^${searchValue}|${searchValue}$)`, "i");
    if (searchValue) {
      const filtered = emojis.filter((emoji) => {
        return regex.test(emoji.unicodeName);
      });
      setFilteredEmojis(filtered);
    } else {
      setFilteredEmojis(emojis);
    }
  };

  useEffect(() => {
    EmojiApiData();
  }, []);
  return (
    <>
      <Grid container my={3} rowSpacing={2} columnSpacing={1}>
        <Grid item lg={7}>
          <Box component="h1">𓂀 𝔼𝕞𝕠𝕛𝕚'𝕤 𓂀</Box>
        </Grid>
        <Grid item lg={3}>
          <TextField
            variant="outlined"
            label="Search Emoji"
            color="success"
            name="searching"
            fullWidth
            value={searchEmoji}
            onChange={(e) => setSearchEmoji(e.target.value)}
          />
        </Grid>
        <Grid item lg={2} my={1}>
          <Button
            variant="contained"
            color="success"
            onClick={searchEmojisValue}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredEmojis?.map((emojiData, index) => {
            return (
              <Grid item lg={1} sm={1} xs={1} key={index}>
                <Stack direction="column">
                  <Box
                    sx={{
                      border: "1px solid gray",
                      textAlign: "center",
                      borderRadius: "10px",
                    }}
                  >
                    {emojiData.character}
                  </Box>
                  <Box
                    component="span"
                    sx={{ fontSize: "10px", textAlign: "center" }}
                  >
                    {emojiData.unicodeName}
                  </Box>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};
export default EmojiMain;
