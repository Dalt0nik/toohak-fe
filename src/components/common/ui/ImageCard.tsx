import { CardMedia, CircularProgress } from "@mui/material";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { fetchImageById } from "@api/QuizApi";
import { useQuery } from "@tanstack/react-query";

interface ImageCardProps {
  id: string | null;
  alt?: string;
}

const ImageCard = ({ alt = "Cover image", id }: ImageCardProps) => {
  const {
    data: coverImage,
    isLoading: imageLoading,
    error: imageError,
  } = useQuery<string>({
    queryKey: ["coverImage", id],
    queryFn: () => fetchImageById(id!),
    enabled: !!id,
    retry: false,
  });

  if (imageLoading) return <CircularProgress />;

  return !imageError && coverImage ? (
    <CardMedia component="img" image={coverImage} alt={alt} />
  ) : (
    <ImageNotSupportedOutlinedIcon
      sx={{
        fontSize: { xs: 100, sm: 150, md: 200, lg: 250 },
        color: "white",
        opacity: 0.3,
      }}
    />
  );
};

export default ImageCard;
