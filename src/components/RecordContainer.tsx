import './RecordContainer.css';

interface ContainerProps {
  name: string;
}

const RecordContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <p>BEEP BOOP BOP</p>
    </div>
  );
};

export default RecordContainer;
