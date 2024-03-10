import { useEffect, useState } from "react";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlbum,
  deleteAlbum,
  getAlbumList,
  updateAlbum,
} from "../../store/albumPage";
import { Box, Button, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateCard from "../../components/CreateCard/CreateCard";
import AddIcon from "@mui/icons-material/Add";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const initialCardDetails = {
  id: null,
  title: null,
  userId: null,
};

const Home = () => {
  const dispatch = useDispatch();
  const albumData = useSelector((state) => state?.albumPage);
  const albumList = albumData?.albumList;
  // console.log(albumList);

  //////// Add Card /////////////////////////////////////////////////////
  const [addCard, setAddCard] = useState(initialCardDetails);
  const [openAddCard, setOpenAddCard] = useState(false);
  const handleCreateCardOpen = () => {
    setOpenAddCard(true);
  };
  const handleCreateCardClose = () => {
    isEditOpen(false);
    setOpenAddCard(false);
    setAddCard(initialCardDetails);
  };
  //////////////////////////////////////////////////////////////////////
  // ////// Edit Card ////////////////////////////////////////////////
  const [editOpen, isEditOpen] = useState(false);

  const handleEditOpen = (data) => {
    setAddCard({
      id: data?.id,
      title: data?.title,
      userId: data?.userId,
    });
    isEditOpen(true);
    setOpenAddCard(true);
  };

  /////////////////////////////////////////////////////////////////////
  //////// handle Change Value ////////////////////////////////////////////
  const handleChangeValue = (name, value) => {
    setAddCard((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  ///////////////////////////////////////////////////////////////////////
  ///////////////// handle Card Delete ///////////////////////////////////
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDeleteOpen = (id) => {
    setDeleteOpen(true);
    setDeleteId(id);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    await dispatch(deleteAlbum({ deleteId: deleteId }));
    setDeleteOpen(false);
  };
  ////////////////////////////////////////////////////////////////////////

  /////////////////  handle Card Submit /////////////////////////////////
  const handleCardSubmit = async () => {
    const data = {
      id: addCard?.id,
      title: addCard?.title,
      userId: addCard?.userId,
    };
    if (data?.id) {
      await dispatch(updateAlbum(data));
    } else {
      await dispatch(addAlbum(data));
    }
    // await dispatch(getAlbumList());
    setAddCard(initialCardDetails);
    setOpenAddCard(false);
    isEditOpen(false);
  };

  ///////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(getAlbumList());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={2} columnSpacing={2} className="cards-container">
        <Grid item md={12}>
          <Button
            variant="contained"
            color="warning"
            startIcon={<AddIcon />}
            onClick={handleCreateCardOpen}
          >
            Add Card
          </Button>
        </Grid>
        {albumList?.map((list, index) => {
          return (
            <>
              <Grid item md={4} xs={12} key={index} className="card-item">
                <Box className="action-items">
                  <Box className="card-title">
                    <Typography color="error">{`${list?.userId}) ${list?.title}`}</Typography>
                  </Box>
                  <Box className="buttons-box">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DeleteIcon />}
                      sx={{ marginRight: "1rem" }}
                      onClick={() => handleDeleteOpen(list?.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditOpen(list)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </>
          );
        })}
      </Grid>

      <CreateCard
        open={openAddCard}
        handleClose={handleCreateCardClose}
        isEdit={editOpen}
        onSubmit={handleCardSubmit}
        handleChangeValue={handleChangeValue}
        value={addCard}
      />

      <DeleteModal
        open={deleteOpen}
        handleClose={handleDeleteClose}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default Home;
