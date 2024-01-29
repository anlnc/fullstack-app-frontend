import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useRef } from "react";
import { useCreateArticle } from "../../hooks/ArticleHooks";

const CreateArticleModal = ({
  open,
  onClose,
  onUpdate,
}: {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}) => {
  const { isLoading: isCreating, createArticle } = useCreateArticle();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleCreate = useCallback(async () => {
    const title = titleRef.current?.value || "";
    const body = bodyRef.current?.value || "";
    await createArticle({ title, body });
    onUpdate();
    onClose();
  }, [createArticle, titleRef, bodyRef, onClose, onClose]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create Article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create an article, please enter the title and body here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            inputRef={titleRef}
          />
          <TextField
            margin="dense"
            label="Body"
            type="text"
            fullWidth
            multiline
            rows={4}
            inputRef={bodyRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isCreating}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateArticleModal;
