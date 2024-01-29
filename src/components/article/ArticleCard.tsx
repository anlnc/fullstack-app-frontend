import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoodIcon from "@mui/icons-material/Mood";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  useDeleteArticle,
  useFavoriteArticle,
  useUnfavoriteArticle,
} from "../../hooks/ArticleHooks";
import { ArticleModel } from "../../models/ArticleModel";
import UpdateArticleModal from "./UpdateArticleModal";
export interface ArticleCardProps {
  article: ArticleModel;
  onUpdate: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isLoading: isDeleting, deleteArticle } = useDeleteArticle();
  const { isLoading: isFavoriting, favoriteArticle } = useFavoriteArticle();
  const { isLoading: isUnfavoriting, unfavoriteArticle } = useUnfavoriteArticle();

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleEditClick = useCallback(() => {
    handleCloseMenu();
    setShowModalUpdate(true);
  }, [handleCloseMenu, article]);

  const handleDeleteClick = useCallback(async () => {
    handleCloseMenu();
    setShowModalConfirm(true);
  }, [handleCloseMenu, article]);

  const handleDeleteArticle = useCallback(async () => {
    await deleteArticle(article.id);
    onUpdate();
    handleCloseMenu();
    setShowModalConfirm(false);
  }, [deleteArticle, handleCloseMenu, article.id]);

  const handleFavoriteClick = useCallback(async () => {
    await favoriteArticle(article.id);
    onUpdate();
  }, [article.id]);

  const handleUnfavoriteClick = useCallback(async () => {
    await unfavoriteArticle(article.id);
    onUpdate();
  }, [article.id]);

  return (
    <>
      <Box sx={{ marginTop: 2 }}>
        <Card key={article.id}>
          <CardHeader
            title={article.title}
            action={
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              {article.body}
            </Typography>
            <Box display="flex" justifyContent="space-between" sx={{ marginTop: "2em" }}>
              <Box>
                <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography variant="body2" color="textSecondary" component="p">
                    Created at: {new Date(article.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
                  <MoodIcon fontSize="small" />
                  <Typography variant="body2" color="textSecondary" component="p">
                    Favorite count: {article.favoriteCount}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="flex-end">
                <IconButton aria-label="like" onClick={handleFavoriteClick}>
                  <ThumbUpAltIcon />
                </IconButton>
                <IconButton aria-label="dislike" onClick={handleUnfavoriteClick}>
                  <ThumbDownAltIcon />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={handleEditClick}>
              <ListItemIcon>
                <EditIcon color="primary" />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>
              <ListItemIcon>
                <DeleteIcon color="secondary" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </Card>
      </Box>

      <Dialog
        open={showModalConfirm}
        onClose={() => setShowModalConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this article?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModalConfirm(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteArticle} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <UpdateArticleModal
        article={article}
        open={showModalUpdate}
        onClose={() => setShowModalUpdate(false)}
        onOK={onUpdate}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isDeleting || isFavoriting || isUnfavoriting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ArticleCard;
