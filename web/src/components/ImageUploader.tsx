import { useEffect, useState } from "react";
import { TfiImage } from "react-icons/tfi";

interface Props {
  id: string;
  image: string | null;
  onImageChanged: (image: File | null) => void;
}
const ImageUploader = ({ id, image, onImageChanged }: Props) => {
  const fetchImage = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    setImage(file);
    onImageChanged(file);
  };

  useEffect(() => {
    if (image) {
      void fetchImage(image);
    }
  }, [image]);

  const [uploadedImage, setImage] = useState<File | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
    onImageChanged(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    setImage(null);
    onImageChanged(null);
  };

  return (
    <div id={id} onDrop={handleDrop} onDragOver={handleDragOver}>
      {uploadedImage ? (
        <div>
          <img src={URL.createObjectURL(uploadedImage)} alt="uploaded" />
          <button
            className="mt-2 mb-10 shadow-md bg-red-900 text-white rounded-md p-3 hover:bg-red-800 hover:shadow-lg"
            onClick={() => {
              handleRemove();
            }}
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div className="flex justify-center w-full mb-10 border-gray-300 border-dashed border-2 items-center">
          <div className="flex flex-col items-center text-gray-500">
            <TfiImage className="w-8 h-8 mt-8" />
            <p className="mb-8">Drag and drop image here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
