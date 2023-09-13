import './FilesContainer.css';

interface ContainerProps {
  name: string;
}

const FilesContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>INSERT FILES HERE</p>
    </div>
  );
};

export default FilesContainer;
