import AddIcon from "@mui/icons-material/Add";
import { Backdrop, Box, CircularProgress, Container, Fab, List } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ArticleCard from "../components/article/ArticleCard";
import CreateArticleModal from "../components/article/CreateArticleModal";
import { useListArticles } from "../hooks/ArticleHooks";
import { ArticleModel } from "../models/ArticleModel";

const ArticlePage: React.FC = () => {
  const [articles, setArticles] = React.useState<ArticleModel[]>([]);
  const { isLoading, listArticles } = useListArticles();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, [setIsCreateModalOpen]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await listArticles();
      setArticles(articles);
    };
    fetchArticles();
  }, []);

  const handleUpdateArticle = useCallback(() => {
    const fetchArticles = async () => {
      const articles = await listArticles();
      setArticles(articles);
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ margin: 0 }}>
        <List>
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} onUpdate={handleUpdateArticle} />
          ))}
        </List>

        <Box sx={{ position: "fixed", bottom: "2em", right: "2em" }}>
          <Fab color="primary" aria-label="add" onClick={handleOpenCreateModal}>
            <AddIcon />
          </Fab>
        </Box>

        <CreateArticleModal
          open={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onUpdate={handleUpdateArticle}
        />
      </Container>
      <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ArticlePage;
