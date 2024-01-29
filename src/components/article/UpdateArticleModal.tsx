import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";

import { useUpdateArticle } from "../../hooks/ArticleHooks";

const UpdateArticleModal: React.FC<{
  article: { id: number; title: string; body: string };
  open: boolean;
  onClose: () => void;
  onOK: () => void;
}> = ({ article, open, onClose, onOK }) => {
  const { id: articleId, title, body } = article;
  const { isLoading: isUpdating, updateArticle } = useUpdateArticle();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleUpdate = async () => {
    const title = titleRef.current?.value ?? "";
    const body = bodyRef.current?.value ?? "";
    await updateArticle(articleId, { title, body });
    onOK();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Article</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To update this article, please modify the title and body here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          defaultValue={title}
          inputRef={titleRef}
        />
        <TextField
          margin="dense"
          label="Body"
          type="text"
          fullWidth
          multiline
          rows={4}
          defaultValue={body}
          inputRef={bodyRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={isUpdating}>
          {isUpdating ? <CircularProgress size={24} /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateArticleModal;
