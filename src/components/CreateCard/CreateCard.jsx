/* eslint-disable react/prop-types */
import "./CreateCard.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const CreateCard = ({
  open,
  handleClose,
  onSubmit,
  isEdit,
  handleChangeValue,
  value,
}) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">
            {isEdit ? "Edit Card" : "Add Card"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label="Title"
              variant="outlined"
              size="small"
              margin="dense"
              onChange={(e) => handleChangeValue("title", e?.target?.value)}
              value={value?.title}
            />
            {isEdit ? null : (
              <TextField
                label="User ID"
                variant="outlined"
                size="small"
                margin="dense"
                onChange={(e) => handleChangeValue("userId", e?.target?.value)}
                value={value?.userId}
              />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit} autoFocus variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCard;
