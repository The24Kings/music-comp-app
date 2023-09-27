import './FilesContainer.css';

interface ContainerProps {
  name: string;
}

const FilesContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>PULL FILES FROM SYSTEM</p>
    </div>
  );
};

export default FilesContainer;
